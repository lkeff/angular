"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const o = __importStar(require("@angular/compiler/src/output/output_ast"));
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const incremental_1 = require("../../incremental");
const perf_1 = require("../../perf");
const reflection_1 = require("../../reflection");
const testing_2 = require("../../testing");
const transform_1 = require("../../transform");
const api_1 = require("../src/api");
const fakeSfTypeIdentifier = {
    isShim: () => false,
    isResource: () => false,
};
(0, testing_1.runInEachFileSystem)(() => {
    describe('TraitCompiler', () => {
        let _;
        beforeEach(() => (_ = file_system_1.absoluteFrom));
        function setup(programContents, handlers, compilationMode, makeDtsSourceFile = false) {
            const filename = makeDtsSourceFile ? 'test.d.ts' : 'test.ts';
            const { program } = (0, testing_2.makeProgram)([
                {
                    name: _('/' + filename),
                    contents: programContents,
                },
            ]);
            const checker = program.getTypeChecker();
            const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
            const compiler = new transform_1.TraitCompiler(handlers, reflectionHost, perf_1.NOOP_PERF_RECORDER, incremental_1.NOOP_INCREMENTAL_BUILD, true, compilationMode, new transform_1.DtsTransformRegistry(), null, fakeSfTypeIdentifier);
            const sourceFile = program.getSourceFile(filename);
            return { compiler, sourceFile, program, filename: _('/' + filename) };
        }
        it('should not run decoration handlers against declaration files', () => {
            class FakeDecoratorHandler {
                constructor() {
                    this.name = 'FakeDecoratorHandler';
                    this.precedence = api_1.HandlerPrecedence.PRIMARY;
                }
                detect() {
                    throw new Error('detect should not have been called');
                }
                analyze() {
                    throw new Error('analyze should not have been called');
                }
                symbol() {
                    throw new Error('symbol should not have been called');
                }
                compileFull() {
                    throw new Error('compileFull should not have been called');
                }
                compileLocal() {
                    throw new Error('compileLocal should not have been called');
                }
            }
            const contents = `export declare class SomeDirective {}`;
            const { compiler, sourceFile } = setup(contents, [new FakeDecoratorHandler()], transform_1.CompilationMode.FULL, true);
            const analysis = compiler.analyzeSync(sourceFile);
            expect(sourceFile.isDeclarationFile).toBe(true);
            expect(analysis).toBeFalsy();
        });
        describe('compilation mode', () => {
            class LocalDecoratorHandler {
                constructor() {
                    this.name = 'LocalDecoratorHandler';
                    this.precedence = api_1.HandlerPrecedence.PRIMARY;
                }
                detect(node, decorators) {
                    if (node.name.text !== 'Local') {
                        return undefined;
                    }
                    return { trigger: node, decorator: null, metadata: {} };
                }
                analyze() {
                    return { analysis: {} };
                }
                symbol() {
                    return null;
                }
                compileFull() {
                    return {
                        name: 'compileFull',
                        initializer: o.literal(true),
                        statements: [],
                        type: o.BOOL_TYPE,
                        deferrableImports: null,
                    };
                }
                compileLocal() {
                    return {
                        name: 'compileLocal',
                        initializer: o.literal(true),
                        statements: [],
                        type: o.BOOL_TYPE,
                        deferrableImports: null,
                    };
                }
            }
            class PartialDecoratorHandler {
                constructor() {
                    this.name = 'PartialDecoratorHandler';
                    this.precedence = api_1.HandlerPrecedence.PRIMARY;
                }
                detect(node, decorators) {
                    if (node.name.text !== 'Partial') {
                        return undefined;
                    }
                    return { trigger: node, decorator: null, metadata: {} };
                }
                analyze() {
                    return { analysis: {} };
                }
                symbol() {
                    return null;
                }
                compileFull() {
                    return {
                        name: 'compileFull',
                        initializer: o.literal(true),
                        statements: [],
                        type: o.BOOL_TYPE,
                        deferrableImports: null,
                    };
                }
                compilePartial() {
                    return {
                        name: 'compilePartial',
                        initializer: o.literal(true),
                        statements: [],
                        type: o.BOOL_TYPE,
                        deferrableImports: null,
                    };
                }
                compileLocal() {
                    return {
                        name: 'compileLocal',
                        initializer: o.literal(true),
                        statements: [],
                        type: o.BOOL_TYPE,
                        deferrableImports: null,
                    };
                }
            }
            class FullDecoratorHandler {
                constructor() {
                    this.name = 'FullDecoratorHandler';
                    this.precedence = api_1.HandlerPrecedence.PRIMARY;
                }
                detect(node, decorators) {
                    if (node.name.text !== 'Full') {
                        return undefined;
                    }
                    return { trigger: node, decorator: null, metadata: {} };
                }
                analyze() {
                    return { analysis: {} };
                }
                symbol() {
                    return null;
                }
                compileFull() {
                    return {
                        name: 'compileFull',
                        initializer: o.literal(true),
                        statements: [],
                        type: o.BOOL_TYPE,
                        deferrableImports: null,
                    };
                }
                compileLocal() {
                    return {
                        name: 'compileLocal',
                        initializer: o.literal(true),
                        statements: [],
                        type: o.BOOL_TYPE,
                        deferrableImports: null,
                    };
                }
            }
            it('should run partial compilation when implemented if compilation mode is partial', () => {
                const contents = `
          export class Full {}
          export class Partial {}
        `;
                const { compiler, sourceFile, program, filename } = setup(contents, [new PartialDecoratorHandler(), new FullDecoratorHandler()], transform_1.CompilationMode.PARTIAL);
                compiler.analyzeSync(sourceFile);
                compiler.resolve();
                const partialDecl = (0, testing_2.getDeclaration)(program, filename, 'Partial', reflection_1.isNamedClassDeclaration);
                const partialResult = compiler.compile(partialDecl, new compiler_1.ConstantPool());
                expect(partialResult.length).toBe(1);
                expect(partialResult[0].name).toBe('compilePartial');
                const fullDecl = (0, testing_2.getDeclaration)(program, filename, 'Full', reflection_1.isNamedClassDeclaration);
                const fullResult = compiler.compile(fullDecl, new compiler_1.ConstantPool());
                expect(fullResult.length).toBe(1);
                expect(fullResult[0].name).toBe('compileFull');
            });
            it('should run local compilation when compilation mode is local', () => {
                const contents = `
          export class Full {}
          export class Local {}
        `;
                const { compiler, sourceFile, program, filename } = setup(contents, [new LocalDecoratorHandler(), new FullDecoratorHandler()], transform_1.CompilationMode.LOCAL);
                compiler.analyzeSync(sourceFile);
                compiler.resolve();
                const localDecl = (0, testing_2.getDeclaration)(program, filename, 'Local', reflection_1.isNamedClassDeclaration);
                const localResult = compiler.compile(localDecl, new compiler_1.ConstantPool());
                expect(localResult.length).toBe(1);
                expect(localResult[0].name).toBe('compileLocal');
                const fullDecl = (0, testing_2.getDeclaration)(program, filename, 'Full', reflection_1.isNamedClassDeclaration);
                const fullResult = compiler.compile(fullDecl, new compiler_1.ConstantPool());
                expect(fullResult.length).toBe(1);
                expect(fullResult[0].name).toBe('compileLocal');
            });
            it('should run full compilation if compilation mode is full', () => {
                const contents = `
          export class Full {}
          export class Partial {}
          export class Local {}
        `;
                const { compiler, sourceFile, program, filename } = setup(contents, [new LocalDecoratorHandler(), new PartialDecoratorHandler(), new FullDecoratorHandler()], transform_1.CompilationMode.FULL);
                compiler.analyzeSync(sourceFile);
                compiler.resolve();
                const localDecl = (0, testing_2.getDeclaration)(program, filename, 'Local', reflection_1.isNamedClassDeclaration);
                const localResult = compiler.compile(localDecl, new compiler_1.ConstantPool());
                expect(localResult.length).toBe(1);
                expect(localResult[0].name).toBe('compileFull');
                const partialDecl = (0, testing_2.getDeclaration)(program, filename, 'Partial', reflection_1.isNamedClassDeclaration);
                const partialResult = compiler.compile(partialDecl, new compiler_1.ConstantPool());
                expect(partialResult.length).toBe(1);
                expect(partialResult[0].name).toBe('compileFull');
                const fullDecl = (0, testing_2.getDeclaration)(program, filename, 'Full', reflection_1.isNamedClassDeclaration);
                const fullResult = compiler.compile(fullDecl, new compiler_1.ConstantPool());
                expect(fullResult.length).toBe(1);
                expect(fullResult[0].name).toBe('compileFull');
            });
        });
        describe('local compilation', () => {
            class TestDecoratorHandler {
                constructor() {
                    this.name = 'TestDecoratorHandler';
                    this.precedence = api_1.HandlerPrecedence.PRIMARY;
                }
                detect(node, decorators) {
                    if (node.name.text !== 'Test') {
                        return undefined;
                    }
                    return { trigger: node, decorator: null, metadata: {} };
                }
                analyze() {
                    return { analysis: {} };
                }
                resolve() {
                    return {};
                }
                register() { }
                updateResources() { }
                symbol() {
                    return null;
                }
                compileFull() {
                    return {
                        name: 'compileFull',
                        initializer: o.literal(true),
                        statements: [],
                        type: o.BOOL_TYPE,
                        deferrableImports: null,
                    };
                }
                compileLocal() {
                    return {
                        name: 'compileLocal',
                        initializer: o.literal(true),
                        statements: [],
                        type: o.BOOL_TYPE,
                        deferrableImports: null,
                    };
                }
            }
            it('should invoke `resolve` phase', () => {
                const contents = `
          export class Test {}
        `;
                const handler = new TestDecoratorHandler();
                spyOn(handler, 'resolve').and.callThrough();
                const { compiler, sourceFile } = setup(contents, [handler], transform_1.CompilationMode.LOCAL);
                compiler.analyzeSync(sourceFile);
                compiler.resolve();
                expect(handler.resolve).toHaveBeenCalled();
            });
            it('should invoke `register` phase', () => {
                const contents = `
          export class Test {}
        `;
                const handler = new TestDecoratorHandler();
                spyOn(handler, 'register');
                const { compiler, sourceFile } = setup(contents, [handler], transform_1.CompilationMode.LOCAL);
                compiler.analyzeSync(sourceFile);
                compiler.resolve();
                expect(handler.register).toHaveBeenCalled();
            });
            it('should not call updateResources', () => {
                const contents = `
          export class Test {}
        `;
                const handler = new TestDecoratorHandler();
                spyOn(handler, 'updateResources');
                const { compiler, sourceFile, program, filename } = setup(contents, [handler], transform_1.CompilationMode.LOCAL);
                const decl = (0, testing_2.getDeclaration)(program, filename, 'Test', reflection_1.isNamedClassDeclaration);
                compiler.analyzeSync(sourceFile);
                compiler.resolve();
                compiler.updateResources(decl);
                expect(handler.updateResources).not.toHaveBeenCalled();
            });
        });
    });
});
