"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_system_1 = require("../../../file_system");
const testing_1 = require("../../../file_system/testing");
const imports_1 = require("../../../imports");
const metadata_1 = require("../../../metadata");
const partial_evaluator_1 = require("../../../partial_evaluator");
const perf_1 = require("../../../perf");
const reflection_1 = require("../../../reflection");
const scope_1 = require("../../../scope");
const testing_2 = require("../../../testing");
const transform_1 = require("../../../transform");
const common_1 = require("../../common");
const handler_1 = require("../src/handler");
function setup(program, compilationMode = transform_1.CompilationMode.FULL) {
    const checker = program.getTypeChecker();
    const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker, compilationMode === transform_1.CompilationMode.LOCAL);
    const evaluator = new partial_evaluator_1.PartialEvaluator(reflectionHost, checker, /* dependencyTracker */ null);
    const referencesRegistry = new common_1.NoopReferencesRegistry();
    const metaRegistry = new metadata_1.LocalMetadataRegistry();
    const dtsReader = new metadata_1.DtsMetadataReader(checker, reflectionHost);
    const metaReader = new metadata_1.CompoundMetadataReader([metaRegistry, dtsReader]);
    const scopeRegistry = new scope_1.LocalModuleScopeRegistry(metaRegistry, metaReader, new scope_1.MetadataDtsModuleScopeResolver(dtsReader, null), new imports_1.ReferenceEmitter([]), null);
    const refEmitter = new imports_1.ReferenceEmitter([new imports_1.LocalIdentifierStrategy()]);
    const injectableRegistry = new common_1.InjectableClassRegistry(reflectionHost, /* isCore */ false);
    const exportedProviderStatusResolver = new metadata_1.ExportedProviderStatusResolver(metaReader);
    const jitDeclarationRegistry = new common_1.JitDeclarationRegistry();
    const handler = new handler_1.NgModuleDecoratorHandler(reflectionHost, evaluator, metaReader, metaRegistry, scopeRegistry, referencesRegistry, exportedProviderStatusResolver, 
    /* semanticDepGraphUpdater */ null, 
    /* isCore */ false, refEmitter, 
    /* annotateForClosureCompiler */ false, 
    /* onlyPublishPublicTypings */ false, injectableRegistry, perf_1.NOOP_PERF_RECORDER, true, true, compilationMode, 
    /* localCompilationExtraImportsTracker */ null, jitDeclarationRegistry);
    return { handler, reflectionHost };
}
function detectNgModule(module, handler, reflectionHost) {
    const detected = handler.detect(module, reflectionHost.getDecoratorsOfDeclaration(module));
    if (detected === undefined) {
        throw new Error('Failed to recognize @NgModule');
    }
    return detected;
}
(0, testing_1.runInEachFileSystem)(() => {
    describe('NgModuleDecoratorHandler', () => {
        const _ = file_system_1.absoluteFrom;
        it('should resolve forwardRef', () => {
            const { program } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: `
          export const Component: any;
          export const NgModule: any;
          export declare function forwardRef(fn: () => any): any;
        `,
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component, forwardRef, NgModule} from '@angular/core';

          @Component({
            template: '',
          })
          export class TestComp {}

          @NgModule()
          export class TestModuleDependency {}

          @NgModule({
            declarations: [forwardRef(() => TestComp)],
            exports: [forwardRef(() => TestComp)],
            imports: [forwardRef(() => TestModuleDependency)]
          })
          export class TestModule {}
        `,
                },
            ]);
            const { handler, reflectionHost } = setup(program);
            const TestModule = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestModule', reflection_1.isNamedClassDeclaration);
            const detected = detectNgModule(TestModule, handler, reflectionHost);
            const moduleDef = handler.analyze(TestModule, detected.metadata).analysis
                .mod;
            expect(getReferenceIdentifierTexts(moduleDef.declarations)).toEqual(['TestComp']);
            expect(getReferenceIdentifierTexts(moduleDef.exports)).toEqual(['TestComp']);
            expect(getReferenceIdentifierTexts(moduleDef.imports)).toEqual(['TestModuleDependency']);
            function getReferenceIdentifierTexts(references) {
                return references.map((ref) => ref.value.node.text);
            }
        });
        describe('local compilation mode', () => {
            it('should not produce diagnostic for cross-file imports', () => {
                const { program } = (0, testing_2.makeProgram)([
                    {
                        name: _('/node_modules/@angular/core/index.d.ts'),
                        contents: 'export const NgModule: any;',
                    },
                    {
                        name: _('/entry.ts'),
                        contents: `
                  import {NgModule} from '@angular/core';
                  import {SomeModule} from './some_where';

                  @NgModule({
                    imports: [SomeModule],
                  }) class TestModule {}
              `,
                    },
                ], undefined, undefined, false);
                const { reflectionHost, handler } = setup(program, transform_1.CompilationMode.LOCAL);
                const TestModule = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestModule', reflection_1.isNamedClassDeclaration);
                const detected = detectNgModule(TestModule, handler, reflectionHost);
                const { diagnostics } = handler.analyze(TestModule, detected.metadata);
                expect(diagnostics).toBeUndefined();
            });
            it('should not produce diagnostic for cross-file exports', () => {
                const { program } = (0, testing_2.makeProgram)([
                    {
                        name: _('/node_modules/@angular/core/index.d.ts'),
                        contents: 'export const NgModule: any;',
                    },
                    {
                        name: _('/entry.ts'),
                        contents: `
                  import {NgModule} from '@angular/core';
                  import {SomeModule} from './some_where';

                  @NgModule({
                    exports: [SomeModule],
                  }) class TestModule {}
              `,
                    },
                ], undefined, undefined, false);
                const { reflectionHost, handler } = setup(program, transform_1.CompilationMode.LOCAL);
                const TestModule = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestModule', reflection_1.isNamedClassDeclaration);
                const detected = detectNgModule(TestModule, handler, reflectionHost);
                const { diagnostics } = handler.analyze(TestModule, detected.metadata);
                expect(diagnostics).toBeUndefined();
            });
            it('should not produce diagnostic for cross-file declarations', () => {
                const { program } = (0, testing_2.makeProgram)([
                    {
                        name: _('/node_modules/@angular/core/index.d.ts'),
                        contents: 'export const NgModule: any;',
                    },
                    {
                        name: _('/entry.ts'),
                        contents: `
                  import {NgModule} from '@angular/core';
                  import {SomeComponent} from './some_where';

                  @NgModule({
                    declarations: [SomeComponent],
                  }) class TestModule {}
              `,
                    },
                ], undefined, undefined, false);
                const { reflectionHost, handler } = setup(program, transform_1.CompilationMode.LOCAL);
                const TestModule = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestModule', reflection_1.isNamedClassDeclaration);
                const detected = detectNgModule(TestModule, handler, reflectionHost);
                const { diagnostics } = handler.analyze(TestModule, detected.metadata);
                expect(diagnostics).toBeUndefined();
            });
            it('should not produce diagnostic for cross-file bootstrap', () => {
                const { program } = (0, testing_2.makeProgram)([
                    {
                        name: _('/node_modules/@angular/core/index.d.ts'),
                        contents: 'export const NgModule: any;',
                    },
                    {
                        name: _('/entry.ts'),
                        contents: `
                  import {NgModule} from '@angular/core';
                  import {SomeComponent} from './some_where';

                  @NgModule({
                    bootstrap: [SomeComponent],
                  }) class TestModule {}
              `,
                    },
                ], undefined, undefined, false);
                const { reflectionHost, handler } = setup(program, transform_1.CompilationMode.LOCAL);
                const TestModule = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestModule', reflection_1.isNamedClassDeclaration);
                const detected = detectNgModule(TestModule, handler, reflectionHost);
                const { diagnostics } = handler.analyze(TestModule, detected.metadata);
                expect(diagnostics).toBeUndefined();
            });
            it('should not produce diagnostic for schemas', () => {
                const { program } = (0, testing_2.makeProgram)([
                    {
                        name: _('/node_modules/@angular/core/index.d.ts'),
                        contents: 'export const NgModule: any; export const CUSTOM_ELEMENTS_SCHEMA: any;',
                    },
                    {
                        name: _('/entry.ts'),
                        contents: `
                  import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
                  import {SomeComponent} from './some_where';

                  @NgModule({
                    schemas: [CUSTOM_ELEMENTS_SCHEMA],
                  }) class TestModule {}
              `,
                    },
                ], undefined, undefined, false);
                const { reflectionHost, handler } = setup(program, transform_1.CompilationMode.LOCAL);
                const TestModule = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestModule', reflection_1.isNamedClassDeclaration);
                const detected = detectNgModule(TestModule, handler, reflectionHost);
                const { diagnostics } = handler.analyze(TestModule, detected.metadata);
                expect(diagnostics).toBeUndefined();
            });
        });
    });
});
