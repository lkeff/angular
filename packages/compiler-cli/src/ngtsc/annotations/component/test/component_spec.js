"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StubResourceLoader = void 0;
const compiler_1 = require("@angular/compiler");
const cycles_1 = require("../../../cycles");
const diagnostics_1 = require("../../../diagnostics");
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
class StubResourceLoader {
    constructor() {
        this.canPreload = false;
        this.canPreprocess = false;
    }
    resolve(v) {
        return v;
    }
    load(v) {
        return '';
    }
    preload() {
        throw new Error('Not implemented');
    }
    preprocessInline(_data, _context) {
        throw new Error('Not implemented');
    }
}
exports.StubResourceLoader = StubResourceLoader;
function setup(program, options, host, opts = {}) {
    const { compilationMode = transform_1.CompilationMode.FULL, usePoisonedData, externalRuntimeStyles = false, } = opts;
    const checker = program.getTypeChecker();
    const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
    const evaluator = new partial_evaluator_1.PartialEvaluator(reflectionHost, checker, /* dependencyTracker */ null);
    const moduleResolver = new imports_1.ModuleResolver(program, options, host, 
    /* moduleResolutionCache */ null);
    const importGraph = new cycles_1.ImportGraph(checker, perf_1.NOOP_PERF_RECORDER);
    const cycleAnalyzer = new cycles_1.CycleAnalyzer(importGraph);
    const metaRegistry = new metadata_1.LocalMetadataRegistry();
    const dtsReader = new metadata_1.DtsMetadataReader(checker, reflectionHost);
    const dtsResolver = new scope_1.MetadataDtsModuleScopeResolver(dtsReader, null);
    const metaReader = new metadata_1.CompoundMetadataReader([metaRegistry, dtsReader]);
    const scopeRegistry = new scope_1.LocalModuleScopeRegistry(metaRegistry, metaReader, dtsResolver, new imports_1.ReferenceEmitter([]), null);
    const refEmitter = new imports_1.ReferenceEmitter([]);
    const referencesRegistry = new common_1.NoopReferencesRegistry();
    const injectableRegistry = new common_1.InjectableClassRegistry(reflectionHost, /* isCore */ false);
    const resourceRegistry = new metadata_1.ResourceRegistry();
    const hostDirectivesResolver = new metadata_1.HostDirectivesResolver(metaReader);
    const typeCheckScopeRegistry = new scope_1.TypeCheckScopeRegistry(scopeRegistry, metaReader, hostDirectivesResolver);
    const resourceLoader = new StubResourceLoader();
    const importTracker = new imports_1.ImportedSymbolsTracker();
    const jitDeclarationRegistry = new common_1.JitDeclarationRegistry();
    const handler = new handler_1.ComponentDecoratorHandler(reflectionHost, evaluator, metaRegistry, metaReader, scopeRegistry, {
        getCanonicalFileName: (fileName) => fileName,
    }, scopeRegistry, typeCheckScopeRegistry, resourceRegistry, 
    /* isCore */ false, 
    /* strictCtorDeps */ false, resourceLoader, 
    /* rootDirs */ ['/'], 
    /* defaultPreserveWhitespaces */ false, 
    /* i18nUseExternalIds */ true, 
    /* enableI18nLegacyMessageIdFormat */ false, !!usePoisonedData, 
    /* i18nNormalizeLineEndingsInICUs */ false, moduleResolver, cycleAnalyzer, 0 /* CycleHandlingStrategy.UseRemoteScoping */, refEmitter, referencesRegistry, 
    /* depTracker */ null, injectableRegistry, 
    /* semanticDepGraphUpdater */ null, 
    /* annotateForClosureCompiler */ false, perf_1.NOOP_PERF_RECORDER, hostDirectivesResolver, importTracker, true, compilationMode, new imports_1.DeferredSymbolTracker(checker, /* onlyExplicitDeferDependencyImports */ false), 
    /* forbidOrphanRenderering */ false, 
    /* enableBlockSyntax */ true, 
    /* enableLetSyntax */ true, externalRuntimeStyles, 
    /* localCompilationExtraImportsTracker */ null, jitDeclarationRegistry, 
    /* i18nPreserveSignificantWhitespace */ true, 
    /* strictStandalone */ false, 
    /* enableHmr */ false, 
    /* implicitStandaloneValue */ true, 
    /* typeCheckHostBindings */ true, 
    /* enableSelectorless */ false);
    return { reflectionHost, handler, resourceLoader, metaRegistry };
}
(0, testing_1.runInEachFileSystem)(() => {
    describe('ComponentDecoratorHandler', () => {
        let _;
        beforeEach(() => (_ = file_system_1.absoluteFrom));
        it('should produce a diagnostic when @Component has non-literal argument', () => {
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          const TEST = '';
          @Component(TEST) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host);
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            try {
                handler.analyze(TestCmp, detected.metadata);
                return fail('Analysis should have failed');
            }
            catch (err) {
                if (!(err instanceof diagnostics_1.FatalDiagnosticError)) {
                    return fail('Error should be a FatalDiagnosticError');
                }
                const diag = err.toDiagnostic();
                expect(diag.code).toEqual(ivyCode(diagnostics_1.ErrorCode.DECORATOR_ARG_NOT_LITERAL));
                expect(diag.file.fileName.endsWith('entry.ts')).toBe(true);
                expect(diag.start).toBe(detected.metadata.args[0].getStart());
            }
        });
        it('should keep track of inline template', () => {
            var _a, _b;
            const template = '<span>inline</span>';
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '${template}',
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host);
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.template) === null || _a === void 0 ? void 0 : _a.path).toBeNull();
            expect((_b = analysis === null || analysis === void 0 ? void 0 : analysis.resources.template) === null || _b === void 0 ? void 0 : _b.node.getText()).toEqual(`'${template}'`);
        });
        it('should keep track of external template', () => {
            var _a, _b;
            const templateUrl = '/myTemplate.ng.html';
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _(templateUrl),
                    contents: '<div>hello world</div>',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            templateUrl: '${templateUrl}',
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host);
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.template) === null || _a === void 0 ? void 0 : _a.path).toContain(templateUrl);
            expect((_b = analysis === null || analysis === void 0 ? void 0 : analysis.resources.template) === null || _b === void 0 ? void 0 : _b.node.getText()).toContain(`'${templateUrl}'`);
        });
        it('should keep track of internal and external styles', () => {
            var _a;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/myStyle.css'),
                    contents: '<div>hello world</div>',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          // These are ignored because we only attempt to store string literals
          const ignoredStyleUrl = 'asdlfkj';
          const ignoredStyle = '';
          @Component({
            template: '',
            styleUrls: ['/myStyle.css', ignoredStyleUrl],
            styles: ['a { color: red; }', 'b { color: blue; }', ignoredStyle, ...[ignoredStyle]],
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host);
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.styles) === null || _a === void 0 ? void 0 : _a.size).toBe(3);
        });
        it('should use an empty source map URL for an indirect template', () => {
            var _a;
            const template = '<span>indirect</span>';
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          const TEMPLATE = '${template}';

          @Component({
            template: TEMPLATE,
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host);
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.template.file) === null || _a === void 0 ? void 0 : _a.url).toEqual('');
        });
        it('does not emit a program with template parse errors', () => {
            const template = '{{x ? y }}';
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';
          @Component({
            template: '${template}',
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host);
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            const symbol = handler.symbol(TestCmp, analysis);
            const resolution = handler.resolve(TestCmp, analysis, symbol);
            const compileResult = handler.compileFull(TestCmp, analysis, resolution.data, new compiler_1.ConstantPool());
            expect(compileResult).toEqual([]);
        });
        it('should populate externalStyles from styleUrl when externalRuntimeStyles is enabled', () => {
            var _a;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/myStyle.css'),
                    contents: '<div>hello world</div>',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '',
            styleUrl: '/myStyle.css',
            styles: ['a { color: red; }', 'b { color: blue; }'],
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host, {
                externalRuntimeStyles: true,
            });
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.styles) === null || _a === void 0 ? void 0 : _a.size).toBe(2);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.externalStyles).toEqual(['/myStyle.css']);
        });
        it('should populate externalStyles from styleUrls when externalRuntimeStyles is enabled', () => {
            var _a;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/myStyle.css'),
                    contents: '<div>hello world</div>',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '',
            styleUrls: ['/myStyle.css', '/myOtherStyle.css'],
            styles: ['a { color: red; }', 'b { color: blue; }'],
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host, {
                externalRuntimeStyles: true,
            });
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.styles) === null || _a === void 0 ? void 0 : _a.size).toBe(2);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.externalStyles).toEqual(['/myStyle.css', '/myOtherStyle.css']);
        });
        it('should keep default emulated view encapsulation with styleUrls when externalRuntimeStyles is enabled', () => {
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/myStyle.css'),
                    contents: '<div>hello world</div>',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '',
            styleUrls: ['/myStyle.css', '/myOtherStyle.css'],
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host, {
                externalRuntimeStyles: true,
            });
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.encapsulation).toBe(compiler_1.ViewEncapsulation.Emulated);
        });
        it('should populate externalStyles from template link element when externalRuntimeStyles is enabled', () => {
            var _a;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/myStyle.css'),
                    contents: '<div>hello world</div>',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '<link rel="stylesheet" href="myTemplateStyle.css" />',
            styles: ['a { color: red; }', 'b { color: blue; }'],
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host, {
                externalRuntimeStyles: true,
            });
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.styles) === null || _a === void 0 ? void 0 : _a.size).toBe(2);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.externalStyles).toEqual(['myTemplateStyle.css']);
        });
        it('should populate externalStyles with resolve return values when externalRuntimeStyles is enabled', () => {
            var _a;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/myStyle.css'),
                    contents: '<div>hello world</div>',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '<link rel="stylesheet" href="myTemplateStyle.css" />',
            styleUrl: '/myStyle.css',
            styles: ['a { color: red; }', 'b { color: blue; }'],
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, resourceLoader } = setup(program, options, host, {
                externalRuntimeStyles: true,
            });
            resourceLoader.resolve = (v) => 'abc/' + v;
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.styles) === null || _a === void 0 ? void 0 : _a.size).toBe(2);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.externalStyles).toEqual([
                'abc//myStyle.css',
                'abc/myTemplateStyle.css',
            ]);
        });
        it('should populate externalStyles from inline style transform when externalRuntimeStyles is enabled', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '',
            styles: ['.abc {}']
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, resourceLoader } = setup(program, options, host, {
                externalRuntimeStyles: true,
            });
            resourceLoader.canPreload = true;
            resourceLoader.canPreprocess = true;
            resourceLoader.preprocessInline = function (data, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    expect(data).toBe('.abc {}');
                    expect(context.containingFile).toBe(_('/entry.ts').toLowerCase());
                    expect(context.type).toBe('style');
                    expect(context.order).toBe(0);
                    return 'abc/myInlineStyle.css';
                });
            };
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            yield handler.preanalyze(TestCmp, detected.metadata);
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.styles) === null || _a === void 0 ? void 0 : _a.size).toBe(1);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.externalStyles).toEqual(['abc/myInlineStyle.css']);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.styles).toEqual([]);
        }));
        it('should not populate externalStyles from inline style when externalRuntimeStyles is enabled and no transform', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '',
            styles: ['.abc {}']
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host, {
                externalRuntimeStyles: true,
            });
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            yield handler.preanalyze(TestCmp, detected.metadata);
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.styles) === null || _a === void 0 ? void 0 : _a.size).toBe(1);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.externalStyles).toEqual([]);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.styles).toEqual(['.abc {}']);
        }));
        it('should not populate externalStyles from inline style when externalRuntimeStyles is enabled and no preanalyze', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '',
            styles: ['.abc {}']
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler } = setup(program, options, host, {
                externalRuntimeStyles: true,
            });
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect((_a = analysis === null || analysis === void 0 ? void 0 : analysis.resources.styles) === null || _a === void 0 ? void 0 : _a.size).toBe(1);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.externalStyles).toEqual([]);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.meta.styles).toEqual(['.abc {}']);
        }));
        it('should replace inline style content with transformed content', () => __awaiter(void 0, void 0, void 0, function* () {
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '',
            styles: ['.abc {}']
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, resourceLoader } = setup(program, options, host);
            resourceLoader.canPreload = true;
            resourceLoader.canPreprocess = true;
            resourceLoader.preprocessInline = function (data, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    expect(data).toBe('.abc {}');
                    expect(context.containingFile).toBe(_('/entry.ts').toLowerCase());
                    expect(context.type).toBe('style');
                    return '.xyz {}';
                });
            };
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            yield handler.preanalyze(TestCmp, detected.metadata);
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.inlineStyles).toEqual(jasmine.arrayWithExactContents(['.xyz {}']));
        }));
        it('should replace template style element content for inline template with transformed content', () => __awaiter(void 0, void 0, void 0, function* () {
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '<style>.abc {}</style>',
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, resourceLoader } = setup(program, options, host);
            resourceLoader.canPreload = true;
            resourceLoader.canPreprocess = true;
            resourceLoader.preprocessInline = function (data, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    expect(data).toBe('.abc {}');
                    expect(context.containingFile).toBe(_('/entry.ts').toLowerCase());
                    expect(context.type).toBe('style');
                    return '.xyz {}';
                });
            };
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            yield handler.preanalyze(TestCmp, detected.metadata);
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.inlineStyles).toEqual(jasmine.arrayWithExactContents(['.xyz {}']));
        }));
        it('should replace template style element content for external template with transformed content', () => __awaiter(void 0, void 0, void 0, function* () {
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/component.ng.html'),
                    contents: '<style>.abc {}</style>',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            templateUrl: '/component.ng.html',
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, resourceLoader } = setup(program, options, host);
            resourceLoader.canPreload = true;
            resourceLoader.canPreprocess = true;
            resourceLoader.resolve = function (v) {
                return _(v).toLowerCase();
            };
            resourceLoader.load = function (v) {
                var _a;
                return (_a = host.readFile(v)) !== null && _a !== void 0 ? _a : '';
            };
            resourceLoader.preload = () => Promise.resolve();
            resourceLoader.preprocessInline = function (data, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    expect(data).toBe('.abc {}');
                    expect(context.containingFile).toBe(_('/component.ng.html').toLowerCase());
                    expect(context.type).toBe('style');
                    return '.xyz {}';
                });
            };
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            yield handler.preanalyze(TestCmp, detected.metadata);
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            expect(analysis === null || analysis === void 0 ? void 0 : analysis.inlineStyles).toEqual(jasmine.arrayWithExactContents(['.xyz {}']));
        }));
        it('should error if canPreprocess is true and async analyze is not used', () => __awaiter(void 0, void 0, void 0, function* () {
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '',
            styles: ['.abc {}']
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, resourceLoader } = setup(program, options, host);
            resourceLoader.canPreload = true;
            resourceLoader.canPreprocess = true;
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            expect(() => handler.analyze(TestCmp, detected.metadata)).toThrowError('Inline resource processing requires asynchronous preanalyze.');
        }));
        it('should not error if component has no inline styles and canPreprocess is true', () => __awaiter(void 0, void 0, void 0, function* () {
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';

          @Component({
            template: '',
          }) class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, resourceLoader } = setup(program, options, host);
            resourceLoader.canPreload = true;
            resourceLoader.canPreprocess = true;
            resourceLoader.preprocessInline = function (data, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    fail('preprocessInline should not have been called.');
                    return data;
                });
            };
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            yield handler.preanalyze(TestCmp, detected.metadata);
            expect(() => handler.analyze(TestCmp, detected.metadata)).not.toThrow();
        }));
        it('should evaluate the name of animations', () => {
            var _a, _b;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/node_modules/@angular/animations/index.d.ts'),
                    contents: 'export declare function trigger(name: any): any',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';
          import {trigger} from '@angular/animations';

          @Component({
            template: '',
            animations: [
              trigger('animationName'),
              [trigger('nestedAnimationName')],
            ],
          })
          class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, metaRegistry } = setup(program, options, host);
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            handler.register(TestCmp, analysis);
            const meta = metaRegistry.getDirectiveMetadata(new imports_1.Reference(TestCmp));
            expect((_a = meta === null || meta === void 0 ? void 0 : meta.animationTriggerNames) === null || _a === void 0 ? void 0 : _a.staticTriggerNames).toEqual([
                'animationName',
                'nestedAnimationName',
            ]);
            expect((_b = meta === null || meta === void 0 ? void 0 : meta.animationTriggerNames) === null || _b === void 0 ? void 0 : _b.includesDynamicAnimations).toBeFalse();
        });
        it('should tell if the animations include a dynamic value', () => {
            var _a, _b;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/node_modules/@angular/animations/index.d.ts'),
                    contents: 'export declare function trigger(name: any): any',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';
          import {trigger} from '@angular/animations';

          function buildComplexAnimations() {
            const name = 'complex';
            return [trigger(name)];
          }
          @Component({
            template: '',
            animations: [
              trigger('animationName'),
              buildComplexAnimations(),
            ],
          })
          class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, metaRegistry } = setup(program, options, host);
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            handler.register(TestCmp, analysis);
            const meta = metaRegistry.getDirectiveMetadata(new imports_1.Reference(TestCmp));
            expect((_a = meta === null || meta === void 0 ? void 0 : meta.animationTriggerNames) === null || _a === void 0 ? void 0 : _a.staticTriggerNames).toEqual(['animationName']);
            expect((_b = meta === null || meta === void 0 ? void 0 : meta.animationTriggerNames) === null || _b === void 0 ? void 0 : _b.includesDynamicAnimations).toBeTrue();
        });
        it('should treat complex animations expressions as dynamic', () => {
            var _a, _b;
            const { program, options, host } = (0, testing_2.makeProgram)([
                {
                    name: _('/node_modules/@angular/core/index.d.ts'),
                    contents: 'export const Component: any;',
                },
                {
                    name: _('/node_modules/@angular/animations/index.d.ts'),
                    contents: 'export declare function trigger(name: any): any',
                },
                {
                    name: _('/entry.ts'),
                    contents: `
          import {Component} from '@angular/core';
          import {trigger} from '@angular/animations';

          function buildComplexAnimations() {
            const name = 'complex';
            return [trigger(name)];
          }
          @Component({
            template: '',
            animations: buildComplexAnimations(),
          })
          class TestCmp {}
      `,
                },
            ]);
            const { reflectionHost, handler, metaRegistry } = setup(program, options, host);
            const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
            const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
            if (detected === undefined) {
                return fail('Failed to recognize @Component');
            }
            const { analysis } = handler.analyze(TestCmp, detected.metadata);
            handler.register(TestCmp, analysis);
            const meta = metaRegistry.getDirectiveMetadata(new imports_1.Reference(TestCmp));
            expect((_a = meta === null || meta === void 0 ? void 0 : meta.animationTriggerNames) === null || _a === void 0 ? void 0 : _a.includesDynamicAnimations).toBeTrue();
            expect((_b = meta === null || meta === void 0 ? void 0 : meta.animationTriggerNames) === null || _b === void 0 ? void 0 : _b.staticTriggerNames.length).toBe(0);
        });
        describe('localCompilation', () => {
            it('should not produce diagnostic for cross-file imports in standalone component', () => {
                const { program, options, host } = (0, testing_2.makeProgram)([
                    {
                        name: _('/node_modules/@angular/core/index.d.ts'),
                        contents: 'export const Component: any;',
                    },
                    {
                        name: _('/entry.ts'),
                        contents: `
            import {Component} from '@angular/core';
            import {SomeModule} from './some_where';

            @Component({
              standalone: true,
              selector: 'main',
              template: '<span>Hi!</span>',
              imports: [SomeModule],
            }) class TestCmp {}
        `,
                    },
                ], undefined, undefined, false);
                const { reflectionHost, handler } = setup(program, options, host, {
                    compilationMode: transform_1.CompilationMode.LOCAL,
                });
                const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
                const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
                if (detected === undefined) {
                    return fail('Failed to recognize @Component');
                }
                const { diagnostics } = handler.analyze(TestCmp, detected.metadata);
                expect(diagnostics).toBeUndefined();
            });
            it('should produce diagnostic for imports in non-standalone component', () => {
                const { program, options, host } = (0, testing_2.makeProgram)([
                    {
                        name: _('/node_modules/@angular/core/index.d.ts'),
                        contents: 'export const Component: any;',
                    },
                    {
                        name: _('/entry.ts'),
                        contents: `
            import {Component} from '@angular/core';
            import {SomeModule} from './some_where';

            @Component({
              selector: 'main',
              template: '<span>Hi!</span>',
              imports: [SomeModule],
              standalone: false,
            }) class TestCmp {}
        `,
                    },
                ], undefined, undefined, false);
                const { reflectionHost, handler } = setup(program, options, host, {
                    compilationMode: transform_1.CompilationMode.LOCAL,
                });
                const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
                const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
                if (detected === undefined) {
                    return fail('Failed to recognize @Component');
                }
                const { diagnostics } = handler.analyze(TestCmp, detected.metadata);
                expect(diagnostics).toContain(jasmine.objectContaining({
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.COMPONENT_NOT_STANDALONE),
                    messageText: jasmine.stringContaining(`'imports' is only valid`),
                }));
            });
            it('should not produce diagnostic for cross-file schemas in standalone component', () => {
                const { program, options, host } = (0, testing_2.makeProgram)([
                    {
                        name: _('/node_modules/@angular/core/index.d.ts'),
                        contents: 'export const Component: any; export const CUSTOM_ELEMENTS_SCHEMA: any;',
                    },
                    {
                        name: _('/entry.ts'),
                        contents: `
            import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
            import {SomeModule} from './some_where';

            @Component({
              standalone: true,
              selector: 'main',
              template: '<span>Hi!</span>',
              schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }) class TestCmp {}
        `,
                    },
                ], undefined, undefined, false);
                const { reflectionHost, handler } = setup(program, options, host, {
                    compilationMode: transform_1.CompilationMode.LOCAL,
                });
                const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
                const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
                if (detected === undefined) {
                    return fail('Failed to recognize @Component');
                }
                const { diagnostics } = handler.analyze(TestCmp, detected.metadata);
                expect(diagnostics).toBeUndefined();
            });
            it('should produce diagnostic for schemas in non-standalone component', () => {
                const { program, options, host } = (0, testing_2.makeProgram)([
                    {
                        name: _('/node_modules/@angular/core/index.d.ts'),
                        contents: 'export const Component: any; export const CUSTOM_ELEMENTS_SCHEMA: any;',
                    },
                    {
                        name: _('/entry.ts'),
                        contents: `
            import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
            import {SomeModule} from './some_where';

            @Component({
              selector: 'main',
              standalone: false,
              template: '<span>Hi!</span>',
              schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }) class TestCmp {}
        `,
                    },
                ], undefined, undefined, false);
                const { reflectionHost, handler } = setup(program, options, host, {
                    compilationMode: transform_1.CompilationMode.LOCAL,
                });
                const TestCmp = (0, testing_2.getDeclaration)(program, _('/entry.ts'), 'TestCmp', reflection_1.isNamedClassDeclaration);
                const detected = handler.detect(TestCmp, reflectionHost.getDecoratorsOfDeclaration(TestCmp));
                if (detected === undefined) {
                    return fail('Failed to recognize @Component');
                }
                const { diagnostics } = handler.analyze(TestCmp, detected.metadata);
                expect(diagnostics).toContain(jasmine.objectContaining({
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.COMPONENT_NOT_STANDALONE),
                    messageText: jasmine.stringContaining(`'schemas' is only valid`),
                }));
            });
        });
    });
    function ivyCode(code) {
        return Number('-99' + code.valueOf());
    }
});
