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
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const reflection_1 = require("../../reflection");
const testing_2 = require("../../testing");
const emitter_1 = require("../src/emitter");
const references_1 = require("../src/references");
const resolver_1 = require("../src/resolver");
(0, testing_1.runInEachFileSystem)(() => {
    describe('AbsoluteModuleStrategy', () => {
        function makeStrategy(files) {
            const { program, host } = (0, testing_2.makeProgram)(files);
            const checker = program.getTypeChecker();
            const moduleResolver = new resolver_1.ModuleResolver(program, program.getCompilerOptions(), host, 
            /* moduleResolutionCache */ null);
            const strategy = new emitter_1.AbsoluteModuleStrategy(program, checker, moduleResolver, new reflection_1.TypeScriptReflectionHost(checker));
            return { strategy, program };
        }
        it('should not generate an import for a reference without owning module', () => {
            const { strategy, program } = makeStrategy([
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'),
                    contents: `export declare class Foo {}`,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/context.ts'),
                    contents: 'export class Context {}',
                },
            ]);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/context.ts'));
            const reference = new references_1.Reference(decl);
            const emitted = strategy.emit(reference, context, emitter_1.ImportFlags.None);
            expect(emitted).toBeNull();
        });
        it('should prefer non-aliased exports', () => {
            const { strategy, program } = makeStrategy([
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'),
                    contents: `
             declare class Foo {}
             export {Foo as A};
             export {Foo};
             export {Foo as B};
           `,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/context.ts'),
                    contents: 'export class Context {}',
                },
            ]);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/context.ts'));
            const reference = new references_1.Reference(decl, {
                specifier: 'external',
                resolutionContext: context.fileName,
            });
            const emitted = strategy.emit(reference, context, emitter_1.ImportFlags.None);
            if (emitted === null || emitted.kind !== emitter_1.ReferenceEmitKind.Success) {
                return fail('Reference should be emitted');
            }
            if (!(emitted.expression instanceof compiler_1.ExternalExpr)) {
                return fail('Reference should be emitted as ExternalExpr');
            }
            expect(emitted.expression.value.name).toEqual('Foo');
            expect(emitted.expression.value.moduleName).toEqual('external');
        });
        it('should generate an import using the exported name of the declaration', () => {
            const { strategy, program } = makeStrategy([
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'),
                    contents: `
            declare class Foo {}
            export {Foo as Bar};
          `,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/context.ts'),
                    contents: 'export class Context {}',
                },
            ]);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/context.ts'));
            const reference = new references_1.Reference(decl, {
                specifier: 'external',
                resolutionContext: context.fileName,
            });
            const emitted = strategy.emit(reference, context, emitter_1.ImportFlags.None);
            if (emitted === null || emitted.kind !== emitter_1.ReferenceEmitKind.Success) {
                return fail('Reference should be emitted');
            }
            if (!(emitted.expression instanceof compiler_1.ExternalExpr)) {
                return fail('Reference should be emitted as ExternalExpr');
            }
            expect(emitted.expression.value.name).toEqual('Bar');
            expect(emitted.expression.value.moduleName).toEqual('external');
        });
        it('should throw when generating an import to a type-only declaration when not allowed', () => {
            const { strategy, program } = makeStrategy([
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'),
                    contents: `export declare interface Foo {}`,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/context.ts'),
                    contents: 'export class Context {}',
                },
            ]);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'), 'Foo', typescript_1.default.isInterfaceDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/context.ts'));
            const reference = new references_1.Reference(decl, {
                specifier: 'external',
                resolutionContext: context.fileName,
            });
            expect(() => strategy.emit(reference, context, emitter_1.ImportFlags.None)).toThrowError('Importing a type-only declaration of type InterfaceDeclaration in a value position is not allowed.');
        });
        it('should generate an import to a type-only declaration when allowed', () => {
            const { strategy, program } = makeStrategy([
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'),
                    contents: `export declare interface Foo {}`,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/context.ts'),
                    contents: 'export class Context {}',
                },
            ]);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/node_modules/external.d.ts'), 'Foo', typescript_1.default.isInterfaceDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/context.ts'));
            const reference = new references_1.Reference(decl, {
                specifier: 'external',
                resolutionContext: context.fileName,
            });
            const emitted = strategy.emit(reference, context, emitter_1.ImportFlags.AllowTypeImports);
            if (emitted === null || emitted.kind !== emitter_1.ReferenceEmitKind.Success) {
                return fail('Reference should be emitted');
            }
            if (!(emitted.expression instanceof compiler_1.ExternalExpr)) {
                return fail('Reference should be emitted as ExternalExpr');
            }
            expect(emitted.expression.value.name).toEqual('Foo');
            expect(emitted.expression.value.moduleName).toEqual('external');
        });
    });
    describe('LogicalProjectStrategy', () => {
        it('should enumerate exports with the ReflectionHost', () => {
            // Use a modified ReflectionHost that prefixes all export names that it enumerates.
            class TestHost extends reflection_1.TypeScriptReflectionHost {
                getExportsOfModule(node) {
                    const realExports = super.getExportsOfModule(node);
                    if (realExports === null) {
                        return null;
                    }
                    const fakeExports = new Map();
                    realExports.forEach((decl, name) => {
                        fakeExports.set(`test${name}`, decl);
                    });
                    return fakeExports;
                }
            }
            const { program, host } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/index.ts'),
                    contents: `export class Foo {}`,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/context.ts'),
                    contents: 'export class Context {}',
                },
            ]);
            const checker = program.getTypeChecker();
            const logicalFs = new file_system_1.LogicalFileSystem([(0, file_system_1.absoluteFrom)('/')], host);
            const strategy = new emitter_1.LogicalProjectStrategy(new TestHost(checker), logicalFs);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/index.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/context.ts'));
            const ref = strategy.emit(new references_1.Reference(decl), context, emitter_1.ImportFlags.None);
            if (ref === null || ref.kind !== emitter_1.ReferenceEmitKind.Success) {
                return fail('Reference should be emitted');
            }
            // Expect the prefixed name from the TestHost.
            expect(ref.expression.value.name).toEqual('testFoo');
        });
        it('should prefer non-aliased exports', () => {
            const { program, host } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/index.ts'),
                    contents: `
             declare class Foo {}
             export {Foo as A};
             export {Foo};
             export {Foo as B};
           `,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/context.ts'),
                    contents: 'export class Context {}',
                },
            ]);
            const checker = program.getTypeChecker();
            const logicalFs = new file_system_1.LogicalFileSystem([(0, file_system_1.absoluteFrom)('/')], host);
            const strategy = new emitter_1.LogicalProjectStrategy(new reflection_1.TypeScriptReflectionHost(checker), logicalFs);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/index.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/context.ts'));
            const emitted = strategy.emit(new references_1.Reference(decl), context, emitter_1.ImportFlags.None);
            if (emitted === null || emitted.kind !== emitter_1.ReferenceEmitKind.Success) {
                return fail('Reference should be emitted');
            }
            if (!(emitted.expression instanceof compiler_1.ExternalExpr)) {
                return fail('Reference should be emitted as ExternalExpr');
            }
            expect(emitted.expression.value.name).toEqual('Foo');
            expect(emitted.expression.value.moduleName).toEqual('./index');
        });
        it('should never use relative imports outside of the logical filesystem for source files', () => {
            const { program, host } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/app/context.ts'),
                    contents: `
             export {};
           `,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/foo.ts'),
                    contents: 'export declare class Foo {}',
                },
            ]);
            const checker = program.getTypeChecker();
            const logicalFs = new file_system_1.LogicalFileSystem([(0, file_system_1.absoluteFrom)('/app')], host);
            const strategy = new emitter_1.LogicalProjectStrategy(new reflection_1.TypeScriptReflectionHost(checker), logicalFs);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/foo.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/app/context.ts'));
            const emitted = strategy.emit(new references_1.Reference(decl), context, emitter_1.ImportFlags.AllowRelativeDtsImports);
            if (emitted === null || emitted.kind !== emitter_1.ReferenceEmitKind.Failed) {
                return fail('Reference emit should have failed');
            }
            expect(emitted.reason).toEqual(`The file ${decl.getSourceFile().fileName} is outside of the configured 'rootDir'.`);
        });
        it('should use relative imports outside of the logical filesystem for declaration files if allowed', () => {
            const { program, host } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/app/context.ts'),
                    contents: `
             export {};
           `,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/foo.d.ts'),
                    contents: 'export declare class Foo {}',
                },
            ]);
            const checker = program.getTypeChecker();
            const logicalFs = new file_system_1.LogicalFileSystem([(0, file_system_1.absoluteFrom)('/app')], host);
            const strategy = new emitter_1.LogicalProjectStrategy(new reflection_1.TypeScriptReflectionHost(checker), logicalFs);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/foo.d.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/app/context.ts'));
            const emitted = strategy.emit(new references_1.Reference(decl), context, emitter_1.ImportFlags.AllowRelativeDtsImports);
            if (emitted === null || emitted.kind !== emitter_1.ReferenceEmitKind.Success) {
                return fail('Reference should be emitted');
            }
            if (!(emitted.expression instanceof compiler_1.ExternalExpr)) {
                return fail('Reference should be emitted as ExternalExpr');
            }
            expect(emitted.expression.value.name).toEqual('Foo');
            expect(emitted.expression.value.moduleName).toEqual('../foo');
        });
        it('should not use relative imports outside of the logical filesystem for declaration files if not allowed', () => {
            const { program, host } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/app/context.ts'),
                    contents: `
             export {};
           `,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/foo.d.ts'),
                    contents: 'export declare class Foo {}',
                },
            ]);
            const checker = program.getTypeChecker();
            const logicalFs = new file_system_1.LogicalFileSystem([(0, file_system_1.absoluteFrom)('/app')], host);
            const strategy = new emitter_1.LogicalProjectStrategy(new reflection_1.TypeScriptReflectionHost(checker), logicalFs);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/foo.d.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/app/context.ts'));
            const emitted = strategy.emit(new references_1.Reference(decl), context, emitter_1.ImportFlags.None);
            if (emitted === null || emitted.kind !== emitter_1.ReferenceEmitKind.Failed) {
                return fail('Reference emit should have failed');
            }
            expect(emitted.reason).toEqual(`The file ${decl.getSourceFile().fileName} is outside of the configured 'rootDir'.`);
        });
    });
    describe('RelativePathStrategy', () => {
        it('should prefer non-aliased exports', () => {
            const { program } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/index.ts'),
                    contents: `
             declare class Foo {}
             export {Foo as A};
             export {Foo};
             export {Foo as B};
           `,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/context.ts'),
                    contents: 'export class Context {}',
                },
            ]);
            const checker = program.getTypeChecker();
            const strategy = new emitter_1.RelativePathStrategy(new reflection_1.TypeScriptReflectionHost(checker));
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/index.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/context.ts'));
            const emitted = strategy.emit(new references_1.Reference(decl), context);
            if (emitted === null || emitted.kind !== emitter_1.ReferenceEmitKind.Success) {
                return fail('Reference should be emitted');
            }
            if (!(emitted.expression instanceof compiler_1.ExternalExpr)) {
                return fail('Reference should be emitted as ExternalExpr');
            }
            expect(emitted.expression.value.name).toEqual('Foo');
            expect(emitted.expression.value.moduleName).toEqual('./index');
        });
    });
    describe('UnifiedModulesStrategy', () => {
        it('should prefer non-aliased exports', () => {
            const { program } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/index.ts'),
                    contents: `
             declare class Foo {}
             export {Foo as A};
             export {Foo};
             export {Foo as B};
           `,
                },
                {
                    name: (0, file_system_1.absoluteFrom)('/context.ts'),
                    contents: 'export class Context {}',
                },
            ]);
            const checker = program.getTypeChecker();
            const host = {
                fileNameToModuleName(importedFilePath) {
                    return (0, file_system_1.basename)(importedFilePath, '.ts');
                },
            };
            const strategy = new emitter_1.UnifiedModulesStrategy(new reflection_1.TypeScriptReflectionHost(checker), host);
            const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/index.ts'), 'Foo', typescript_1.default.isClassDeclaration);
            const context = program.getSourceFile((0, file_system_1.absoluteFrom)('/context.ts'));
            const emitted = strategy.emit(new references_1.Reference(decl), context);
            if (emitted === null) {
                return fail('Reference should be emitted');
            }
            if (!(emitted.expression instanceof compiler_1.ExternalExpr)) {
                return fail('Reference should be emitted as ExternalExpr');
            }
            expect(emitted.expression.value.name).toEqual('Foo');
            expect(emitted.expression.value.moduleName).toEqual('index');
        });
    });
});
