"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
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
const index_1 = require("../index");
(0, testing_1.runInEachFileSystem)(() => {
    let _;
    beforeEach(() => (_ = file_system_1.absoluteFrom));
    describe('DirectiveDecoratorHandler', () => {
        it('should use the `ReflectionHost` to detect class inheritance', () => {
            const { program } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Directive: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Directive} from '@angular/core';

          @Directive({selector: 'test-dir-1'})
          export class TestDir1 {}

          @Directive({selector: 'test-dir-2'})
          export class TestDir2 {}
        `,
                },
            ]);
            const analysis1 = analyzeDirective(program, 'TestDir1', /*hasBaseClass*/ false);
            expect(analysis1.meta.usesInheritance).toBe(false);
            const analysis2 = analyzeDirective(program, 'TestDir2', /*hasBaseClass*/ true);
            expect(analysis2.meta.usesInheritance).toBe(true);
        });
        it('should record the source span of a Directive class type', () => {
            const src = `
        import {Directive} from '@angular/core';

        @Directive({selector: 'test-dir'})
        export class TestDir {}
      `;
            const { program } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Directive: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: src,
                },
            ]);
            const analysis = analyzeDirective(program, 'TestDir');
            const span = analysis.meta.typeSourceSpan;
            expect(span.toString()).toBe('TestDir');
            expect(span.start.toString()).toContain('/entry.ts@5:22');
            expect(span.end.toString()).toContain('/entry.ts@5:29');
        });
        it('should produce metadata compatible with template binding', () => {
            const src = `
        import {Directive, Input} from '@angular/core';

        @Directive({selector: '[dir]'})
        export class TestDir {
          @Input('propName')
          fieldName: string;
        }
      `;
            const { program } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Directive: any; export const Input: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: src,
                },
            ]);
            const analysis = analyzeDirective(program, 'TestDir');
            const matcher = new compiler_1.SelectorMatcher();
            const dirMeta = {
                exportAs: null,
                inputs: analysis.inputs,
                outputs: analysis.outputs,
                isComponent: false,
                name: 'Dir',
                selector: '[dir]',
                isStructural: false,
                animationTriggerNames: null,
                ngContentSelectors: null,
                preserveWhitespaces: false,
            };
            matcher.addSelectables(compiler_1.CssSelector.parse('[dir]'), [dirMeta]);
            const { nodes } = (0, compiler_1.parseTemplate)('<div dir [propName]="expr"></div>', 'unimportant.html');
            const binder = new compiler_1.R3TargetBinder(matcher).bind({ template: nodes });
            const propBinding = nodes[0].inputs[0];
            const propBindingConsumer = binder.getConsumerOfBinding(propBinding);
            // Assert that the consumer of the binding is the directive, which means that the metadata
            // fed into the SelectorMatcher was compatible with the binder, and did not confuse property
            // and field names.
            expect(propBindingConsumer).toBe(dirMeta);
        });
        it('should identify a structural directive', () => {
            const src = `
        import {Directive, TemplateRef} from '@angular/core';

        @Directive({selector: 'test-dir'})
        export class TestDir {
          constructor(private ref: TemplateRef) {}
        }
      `;
            const { program } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Directive: any; export declare class TemplateRef {}',
                },
                {
                    name: _('/entry.ts'),
                    contents: src,
                },
            ]);
            const analysis = analyzeDirective(program, 'TestDir');
            expect(analysis.isStructural).toBeTrue();
        });
    });
    // Helpers
    function analyzeDirective(program, dirName, hasBaseClass = false) {
        class TestReflectionHost extends reflection_1.TypeScriptReflectionHost {
            constructor(checker) {
                super(checker);
            }
            hasBaseClass(_class) {
                return hasBaseClass;
            }
        }
        const checker = program.getTypeChecker();
        const reflectionHost = new TestReflectionHost(checker);
        const evaluator = new partial_evaluator_1.PartialEvaluator(reflectionHost, checker, /*dependencyTracker*/ null);
        const metaReader = new metadata_1.LocalMetadataRegistry();
        const dtsReader = new metadata_1.DtsMetadataReader(checker, reflectionHost);
        const refEmitter = new imports_1.ReferenceEmitter([]);
        const referenceRegistry = new common_1.NoopReferencesRegistry();
        const scopeRegistry = new scope_1.LocalModuleScopeRegistry(metaReader, new metadata_1.CompoundMetadataReader([metaReader, dtsReader]), new scope_1.MetadataDtsModuleScopeResolver(dtsReader, null), refEmitter, null);
        const injectableRegistry = new common_1.InjectableClassRegistry(reflectionHost, /* isCore */ false);
        const importTracker = new imports_1.ImportedSymbolsTracker();
        const jitDeclarationRegistry = new common_1.JitDeclarationRegistry();
        const resourceRegistry = new metadata_1.ResourceRegistry();
        const hostDirectivesResolver = new metadata_1.HostDirectivesResolver(metaReader);
        const typeCheckScopeRegistry = new scope_1.TypeCheckScopeRegistry(scopeRegistry, metaReader, hostDirectivesResolver);
        const handler = new index_1.DirectiveDecoratorHandler(reflectionHost, evaluator, scopeRegistry, scopeRegistry, metaReader, injectableRegistry, refEmitter, referenceRegistry, 
        /*isCore*/ false, 
        /*strictCtorDeps*/ false, 
        /*semanticDepGraphUpdater*/ null, 
        /*annotateForClosureCompiler*/ false, perf_1.NOOP_PERF_RECORDER, importTracker, 
        /*includeClassMetadata*/ true, typeCheckScopeRegistry, 
        /*compilationMode */ transform_1.CompilationMode.FULL, jitDeclarationRegistry, resourceRegistry, 
        /* strictStandalone */ false, 
        /* implicitStandaloneValue */ true, 
        /* usePoisonedData */ false, 
        /* typeCheckHostBindings */ true);
        const DirNode = (0, testing_2.getDeclaration)(program, _('/entry.ts'), dirName, reflection_1.isNamedClassDeclaration);
        const detected = handler.detect(DirNode, reflectionHost.getDecoratorsOfDeclaration(DirNode));
        if (detected === undefined) {
            throw new Error(`Failed to recognize @Directive (${dirName}).`);
        }
        const { analysis } = handler.analyze(DirNode, detected.metadata);
        if (analysis === undefined) {
            throw new Error(`Failed to analyze @Directive (${dirName}).`);
        }
        return analysis;
    }
});
