"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const imports_1 = require("../../imports");
const metadata_1 = require("../../metadata");
const perf_1 = require("../../perf");
const program_driver_1 = require("../../program_driver");
const reflection_1 = require("../../reflection");
const testing_2 = require("../../testing");
const typescript_2 = require("../../util/src/typescript");
const context_1 = require("../src/context");
const source_1 = require("../src/source");
const type_check_file_1 = require("../src/type_check_file");
const testing_3 = require("../testing");
(0, testing_1.runInEachFileSystem)(() => {
    describe('ngtsc typechecking', () => {
        let _;
        let LIB_D_TS;
        beforeEach(() => {
            _ = file_system_1.absoluteFrom;
            LIB_D_TS = {
                name: _('/lib.d.ts'),
                contents: `
    type Partial<T> = { [P in keyof T]?: T[P]; };
    type Pick<T, K extends keyof T> = { [P in K]: T[P]; };
    type NonNullable<T> = T extends null | undefined ? never : T;`,
            };
        });
        it('should not produce an empty SourceFile when there is nothing to typecheck', () => {
            const host = new file_system_1.NgtscCompilerHost((0, file_system_1.getFileSystem)());
            const file = new type_check_file_1.TypeCheckFile(_('/_typecheck_.ts'), testing_3.ALL_ENABLED_CONFIG, new imports_1.ReferenceEmitter([]), 
            /* reflector */ null, host);
            const sf = file.render(false /* removeComments */);
            expect(sf).toContain('export const IS_A_MODULE = true;');
        });
        describe('ctors', () => {
            it('compiles a basic type constructor', () => {
                const files = [
                    LIB_D_TS,
                    {
                        name: _('/main.ts'),
                        contents: `
class TestClass<T extends string> {
  value: T;
}

TestClass.ngTypeCtor({value: 'test'});
        `,
                    },
                ];
                const { program, host, options } = (0, testing_2.makeProgram)(files, undefined, undefined, false);
                const checker = program.getTypeChecker();
                const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
                const logicalFs = new file_system_1.LogicalFileSystem((0, typescript_2.getRootDirs)(host, options), host);
                const moduleResolver = new imports_1.ModuleResolver(program, options, host, 
                /* moduleResolutionCache */ null);
                const emitter = new imports_1.ReferenceEmitter([
                    new imports_1.LocalIdentifierStrategy(),
                    new imports_1.AbsoluteModuleStrategy(program, checker, moduleResolver, reflectionHost),
                    new imports_1.LogicalProjectStrategy(reflectionHost, logicalFs),
                ]);
                const ctx = new context_1.TypeCheckContextImpl(testing_3.ALL_ENABLED_CONFIG, host, emitter, reflectionHost, new TestTypeCheckingHost(), context_1.InliningMode.InlineOps, perf_1.NOOP_PERF_RECORDER);
                const TestClass = (0, testing_2.getDeclaration)(program, _('/main.ts'), 'TestClass', reflection_1.isNamedClassDeclaration);
                const pendingFile = makePendingFile();
                ctx.addInlineTypeCtor(pendingFile, (0, file_system_1.getSourceFileOrError)(program, _('/main.ts')), new imports_1.Reference(TestClass), {
                    fnName: 'ngTypeCtor',
                    body: true,
                    fields: {
                        inputs: metadata_1.ClassPropertyMapping.fromMappedObject({ value: 'value' }),
                        queries: [],
                    },
                    coercedInputFields: new Set(),
                });
                ctx.finalize();
            });
            it('should not consider query fields', () => {
                const files = [
                    LIB_D_TS,
                    {
                        name: _('/main.ts'),
                        contents: `class TestClass { value: any; }`,
                    },
                ];
                const { program, host, options } = (0, testing_2.makeProgram)(files, undefined, undefined, false);
                const checker = program.getTypeChecker();
                const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
                const logicalFs = new file_system_1.LogicalFileSystem((0, typescript_2.getRootDirs)(host, options), host);
                const moduleResolver = new imports_1.ModuleResolver(program, options, host, 
                /* moduleResolutionCache */ null);
                const emitter = new imports_1.ReferenceEmitter([
                    new imports_1.LocalIdentifierStrategy(),
                    new imports_1.AbsoluteModuleStrategy(program, checker, moduleResolver, reflectionHost),
                    new imports_1.LogicalProjectStrategy(reflectionHost, logicalFs),
                ]);
                const pendingFile = makePendingFile();
                const ctx = new context_1.TypeCheckContextImpl(testing_3.ALL_ENABLED_CONFIG, host, emitter, reflectionHost, new TestTypeCheckingHost(), context_1.InliningMode.InlineOps, perf_1.NOOP_PERF_RECORDER);
                const TestClass = (0, testing_2.getDeclaration)(program, _('/main.ts'), 'TestClass', reflection_1.isNamedClassDeclaration);
                ctx.addInlineTypeCtor(pendingFile, (0, file_system_1.getSourceFileOrError)(program, _('/main.ts')), new imports_1.Reference(TestClass), {
                    fnName: 'ngTypeCtor',
                    body: true,
                    fields: {
                        inputs: metadata_1.ClassPropertyMapping.fromMappedObject({ value: 'value' }),
                        queries: ['queryField'],
                    },
                    coercedInputFields: new Set(),
                });
                const programStrategy = new program_driver_1.TsCreateProgramDriver(program, host, options, []);
                programStrategy.updateFiles(ctx.finalize(), program_driver_1.UpdateMode.Complete);
                const TestClassWithCtor = (0, testing_2.getDeclaration)(programStrategy.getProgram(), _('/main.ts'), 'TestClass', reflection_1.isNamedClassDeclaration);
                const typeCtor = TestClassWithCtor.members.find(isTypeCtor);
                expect(typeCtor.getText()).not.toContain('queryField');
            });
        });
        describe('input type coercion', () => {
            it('should coerce input types', () => {
                const files = [
                    LIB_D_TS,
                    {
                        name: _('/main.ts'),
                        contents: `class TestClass { value: any; }`,
                    },
                ];
                const { program, host, options } = (0, testing_2.makeProgram)(files, undefined, undefined, false);
                const checker = program.getTypeChecker();
                const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
                const logicalFs = new file_system_1.LogicalFileSystem((0, typescript_2.getRootDirs)(host, options), host);
                const moduleResolver = new imports_1.ModuleResolver(program, options, host, 
                /* moduleResolutionCache */ null);
                const emitter = new imports_1.ReferenceEmitter([
                    new imports_1.LocalIdentifierStrategy(),
                    new imports_1.AbsoluteModuleStrategy(program, checker, moduleResolver, reflectionHost),
                    new imports_1.LogicalProjectStrategy(reflectionHost, logicalFs),
                ]);
                const pendingFile = makePendingFile();
                const ctx = new context_1.TypeCheckContextImpl(testing_3.ALL_ENABLED_CONFIG, host, emitter, reflectionHost, new TestTypeCheckingHost(), context_1.InliningMode.InlineOps, perf_1.NOOP_PERF_RECORDER);
                const TestClass = (0, testing_2.getDeclaration)(program, _('/main.ts'), 'TestClass', reflection_1.isNamedClassDeclaration);
                ctx.addInlineTypeCtor(pendingFile, (0, file_system_1.getSourceFileOrError)(program, _('/main.ts')), new imports_1.Reference(TestClass), {
                    fnName: 'ngTypeCtor',
                    body: true,
                    fields: {
                        inputs: metadata_1.ClassPropertyMapping.fromMappedObject({
                            foo: 'foo',
                            bar: 'bar',
                            baz: {
                                classPropertyName: 'baz',
                                bindingPropertyName: 'baz',
                                required: false,
                                isSignal: false,
                                transform: {
                                    type: new imports_1.Reference(typescript_1.default.factory.createUnionTypeNode([
                                        typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.BooleanKeyword),
                                        typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.StringKeyword),
                                    ])),
                                    node: typescript_1.default.factory.createFunctionDeclaration(undefined, undefined, undefined, undefined, [], undefined, undefined),
                                },
                            },
                        }),
                        queries: [],
                    },
                    coercedInputFields: new Set(['bar', 'baz']),
                });
                const programStrategy = new program_driver_1.TsCreateProgramDriver(program, host, options, []);
                programStrategy.updateFiles(ctx.finalize(), program_driver_1.UpdateMode.Complete);
                const TestClassWithCtor = (0, testing_2.getDeclaration)(programStrategy.getProgram(), _('/main.ts'), 'TestClass', reflection_1.isNamedClassDeclaration);
                const typeCtor = TestClassWithCtor.members.find(isTypeCtor);
                const ctorText = typeCtor.getText().replace(/[ \r\n]+/g, ' ');
                expect(ctorText).toContain('init: Pick<TestClass, "foo"> & { bar: typeof TestClass.ngAcceptInputType_bar; baz: boolean | string; }');
            });
        });
    });
    function isTypeCtor(el) {
        return typescript_1.default.isMethodDeclaration(el) && typescript_1.default.isIdentifier(el.name) && el.name.text === 'ngTypeCtor';
    }
});
function makePendingFile() {
    return {
        hasInlines: false,
        sourceManager: new source_1.DirectiveSourceManager(),
        shimData: new Map(),
    };
}
class TestTypeCheckingHost {
    constructor() {
        this.sourceManager = new source_1.DirectiveSourceManager();
    }
    getSourceManager() {
        return this.sourceManager;
    }
    shouldCheckClass() {
        return true;
    }
    getTemplateOverride() {
        return null;
    }
    recordShimData() { }
    recordComplete() { }
}
