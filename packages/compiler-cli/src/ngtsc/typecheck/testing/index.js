"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopOobRecorder = exports.NoopSchemaChecker = exports.ALL_ENABLED_CONFIG = void 0;
exports.typescriptLibDts = typescriptLibDts;
exports.angularCoreDtsFiles = angularCoreDtsFiles;
exports.angularAnimationsDts = angularAnimationsDts;
exports.ngIfDeclaration = ngIfDeclaration;
exports.ngIfDts = ngIfDts;
exports.ngForDeclaration = ngForDeclaration;
exports.ngForDts = ngForDts;
exports.ngForTypeCheckTarget = ngForTypeCheckTarget;
exports.tcb = tcb;
exports.setup = setup;
exports.diagnose = diagnose;
exports.getClass = getClass;
exports.createNgCompilerForFile = createNgCompilerForFile;
const compiler_1 = require("@angular/compiler");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const tinyglobby_1 = require("tinyglobby");
const file_system_1 = require("../../file_system");
const imports_1 = require("../../imports");
const incremental_1 = require("../../incremental");
const metadata_1 = require("../../metadata");
const perf_1 = require("../../perf");
const program_driver_1 = require("../../program_driver");
const reflection_1 = require("../../reflection");
const scope_1 = require("../../scope");
const testing_1 = require("../../testing");
const typescript_2 = require("../../util/src/typescript");
const api_1 = require("../api");
const checker_1 = require("../src/checker");
const shim_1 = require("../src/shim");
const type_check_block_1 = require("../src/type_check_block");
const type_check_file_1 = require("../src/type_check_file");
const shims_1 = require("../../shims");
const core_1 = require("../../core");
function typescriptLibDts() {
    return {
        name: (0, file_system_1.absoluteFrom)('/lib.d.ts'),
        contents: `
      type Partial<T> = { [P in keyof T]?: T[P]; };
      type Pick<T, K extends keyof T> = { [P in K]: T[P]; };
      type NonNullable<T> = T extends null | undefined ? never : T;

      // The following native type declarations are required for proper type inference
      declare interface Function {
        call(...args: any[]): any;
      }
      declare interface Array<T> {
        [index: number]: T;
        length: number;
      }
      declare interface Iterable<T> {}
      declare interface String {
        length: number;
      }

      declare interface Event {
        preventDefault(): void;
      }
      declare interface MouseEvent extends Event {
        readonly x: number;
        readonly y: number;
      }

      declare interface HTMLElementEventMap {
        "click": MouseEvent;
      }
      declare interface HTMLElement {
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void;
        addEventListener(type: string, listener: (evt: Event) => void): void;
      }
      declare interface HTMLDivElement extends HTMLElement {}
      declare interface HTMLImageElement extends HTMLElement {
        src: string;
        alt: string;
        width: number;
        height: number;
      }
      declare interface HTMLQuoteElement extends HTMLElement {
        cite: string;
      }
      declare interface HTMLElementTagNameMap {
        "blockquote": HTMLQuoteElement;
        "div": HTMLDivElement;
        "img": HTMLImageElement;
      }
      declare interface Document {
        createElement<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K];
        createElement(tagName: string): HTMLElement;
      }
      declare const document: Document;
   `,
    };
}
let _angularCoreDts = null;
function angularCoreDtsFiles() {
    if (_angularCoreDts !== null) {
        return _angularCoreDts;
    }
    const directory = (0, testing_1.resolveFromRunfiles)('angular/packages/core/npm_package');
    const dtsFiles = (0, tinyglobby_1.globSync)('**/*.d.ts', { cwd: directory });
    return (_angularCoreDts = dtsFiles.map((fileName) => ({
        name: (0, file_system_1.absoluteFrom)(`/node_modules/@angular/core/${fileName}`),
        contents: (0, fs_1.readFileSync)(path_1.default.join(directory, fileName), 'utf8'),
    })));
}
function angularAnimationsDts() {
    return {
        name: (0, file_system_1.absoluteFrom)('/node_modules/@angular/animations/index.d.ts'),
        contents: `
    export declare class AnimationEvent {
      element: any;
    }
   `,
    };
}
function ngIfDeclaration() {
    return {
        type: 'directive',
        file: (0, file_system_1.absoluteFrom)('/ngif.d.ts'),
        selector: '[ngIf]',
        name: 'NgIf',
        inputs: { ngIf: 'ngIf' },
        ngTemplateGuards: [{ type: 'binding', inputName: 'ngIf' }],
        hasNgTemplateContextGuard: true,
        isGeneric: true,
    };
}
function ngIfDts() {
    return {
        name: (0, file_system_1.absoluteFrom)('/ngif.d.ts'),
        contents: `
    export declare class NgIf<T> {
      ngIf: T;
      static ngTemplateContextGuard<T>(dir: NgIf<T>, ctx: any): ctx is NgIfContext<Exclude<T, false|0|''|null|undefined>>
    }

    export declare class NgIfContext<T> {
      $implicit: T;
      ngIf: T;
    }`,
    };
}
function ngForDeclaration() {
    return {
        type: 'directive',
        file: (0, file_system_1.absoluteFrom)('/ngfor.d.ts'),
        selector: '[ngForOf]',
        name: 'NgForOf',
        inputs: { ngForOf: 'ngForOf', ngForTrackBy: 'ngForTrackBy', ngForTemplate: 'ngForTemplate' },
        hasNgTemplateContextGuard: true,
        isGeneric: true,
    };
}
function ngForDts() {
    return {
        name: (0, file_system_1.absoluteFrom)('/ngfor.d.ts'),
        contents: `
    export declare class NgForOf<T> {
      ngForOf: T[];
      ngForTrackBy: TrackByFunction<T>;
      static ngTemplateContextGuard<T>(dir: NgForOf<T>, ctx: any): ctx is NgForOfContext<T>;
    }

    export interface TrackByFunction<T> {
      (index: number, item: T): any;
    }

    export declare class NgForOfContext<T> {
      $implicit: T;
      index: number;
      count: number;
      readonly odd: boolean;
      readonly even: boolean;
      readonly first: boolean;
      readonly last: boolean;
    }`,
    };
}
function ngForTypeCheckTarget() {
    const dts = ngForDts();
    return Object.assign(Object.assign({}, dts), { fileName: dts.name, source: dts.contents, templates: {} });
}
exports.ALL_ENABLED_CONFIG = {
    applyTemplateContextGuards: true,
    checkQueries: false,
    checkTemplateBodies: true,
    checkControlFlowBodies: true,
    alwaysCheckSchemaInTemplateBodies: true,
    checkTypeOfInputBindings: true,
    honorAccessModifiersForInputBindings: true,
    strictNullInputBindings: true,
    checkTypeOfAttributes: true,
    // Feature is still in development.
    // TODO(alxhub): enable when DOM checking via lib.dom.d.ts is further along.
    checkTypeOfDomBindings: false,
    checkTypeOfOutputEvents: true,
    checkTypeOfAnimationEvents: true,
    checkTypeOfDomEvents: true,
    checkTypeOfDomReferences: true,
    checkTypeOfNonDomReferences: true,
    checkTypeOfPipes: true,
    strictSafeNavigationTypes: true,
    useContextGenericType: true,
    strictLiteralTypes: true,
    enableTemplateTypeChecker: false,
    useInlineTypeConstructors: true,
    suggestionsForSuboptimalTypeInference: false,
    controlFlowPreventingContentProjection: 'warning',
    unusedStandaloneImports: 'warning',
    allowSignalsInTwoWayBindings: true,
    checkTwoWayBoundEvents: true,
};
function tcb(template, declarations = [], config, options, templateParserOptions) {
    var _a;
    const codeLines = [`export class Test<T extends string> {}`];
    (function addCodeLines(currentDeclarations) {
        var _a;
        for (const decl of currentDeclarations) {
            if (decl.type === 'directive' && decl.hostDirectives) {
                addCodeLines(decl.hostDirectives.map((hostDir) => hostDir.directive));
            }
            codeLines.push((_a = decl.code) !== null && _a !== void 0 ? _a : `export class ${decl.name}<T extends string> {}`);
        }
    })(declarations);
    const rootFilePath = (0, file_system_1.absoluteFrom)('/synthetic.ts');
    const { program, host } = (0, testing_1.makeProgram)([
        { name: rootFilePath, contents: codeLines.join('\n'), isRoot: true },
    ]);
    const sf = (0, file_system_1.getSourceFileOrError)(program, rootFilePath);
    const clazz = getClass(sf, 'Test');
    const templateUrl = 'synthetic.html';
    const { nodes, errors } = (0, compiler_1.parseTemplate)(template, templateUrl, templateParserOptions);
    const selectorlessEnabled = (_a = templateParserOptions === null || templateParserOptions === void 0 ? void 0 : templateParserOptions.enableSelectorless) !== null && _a !== void 0 ? _a : false;
    if (errors !== null) {
        throw new Error('Template parse errors: \n' + errors.join('\n'));
    }
    const { matcher, pipes } = prepareDeclarations(declarations, (decl) => getClass(sf, decl.name), new Map(), selectorlessEnabled);
    const binder = new compiler_1.R3TargetBinder(matcher);
    const boundTarget = binder.bind({ template: nodes });
    const id = 'tcb';
    const meta = {
        id,
        boundTarget,
        pipes,
        schemas: [],
        isStandalone: false,
        preserveWhitespaces: false,
    };
    const fullConfig = Object.assign({ applyTemplateContextGuards: true, checkQueries: false, checkTypeOfInputBindings: true, honorAccessModifiersForInputBindings: false, strictNullInputBindings: true, checkTypeOfAttributes: true, checkTypeOfDomBindings: false, checkTypeOfOutputEvents: true, checkTypeOfAnimationEvents: true, checkTypeOfDomEvents: true, checkTypeOfDomReferences: true, checkTypeOfNonDomReferences: true, checkTypeOfPipes: true, checkTemplateBodies: true, checkControlFlowBodies: true, alwaysCheckSchemaInTemplateBodies: true, controlFlowPreventingContentProjection: 'warning', unusedStandaloneImports: 'warning', strictSafeNavigationTypes: true, useContextGenericType: true, strictLiteralTypes: true, enableTemplateTypeChecker: false, useInlineTypeConstructors: true, suggestionsForSuboptimalTypeInference: false, allowSignalsInTwoWayBindings: true, checkTwoWayBoundEvents: true }, config);
    options = options || { emitSpans: false };
    const fileName = (0, file_system_1.absoluteFrom)('/type-check-file.ts');
    const reflectionHost = new reflection_1.TypeScriptReflectionHost(program.getTypeChecker());
    const refEmmiter = new imports_1.ReferenceEmitter([
        new imports_1.LocalIdentifierStrategy(),
        new imports_1.RelativePathStrategy(reflectionHost),
    ]);
    const env = new type_check_file_1.TypeCheckFile(fileName, fullConfig, refEmmiter, reflectionHost, host);
    env.addTypeCheckBlock(new imports_1.Reference(clazz), meta, new NoopSchemaChecker(), new NoopOobRecorder(), type_check_block_1.TcbGenericContextBehavior.UseEmitter);
    const rendered = env.render(!options.emitSpans /* removeComments */);
    return rendered.replace(/\s+/g, ' ');
}
/**
 * Create a testing environment for template type-checking which contains a number of given test
 * targets.
 *
 * A full Angular environment is not necessary to exercise the template type-checking system.
 * Components only need to be classes which exist, with templates specified in the target
 * configuration. In many cases, it's not even necessary to include source code for test files, as
 * that can be auto-generated based on the provided target configuration.
 */
function setup(targets, overrides = {}) {
    var _a, _b, _c;
    const files = [typescriptLibDts(), ...angularCoreDtsFiles(), angularAnimationsDts()];
    const fakeMetadataRegistry = new Map();
    const shims = new Map();
    for (const target of targets) {
        let contents;
        if (target.source !== undefined) {
            contents = target.source;
        }
        else {
            contents = `// generated from templates\n\nexport const MODULE = true;\n\n`;
            for (const className of Object.keys(target.templates)) {
                contents += `export class ${className} {}\n`;
            }
        }
        files.push({ name: target.fileName, contents });
        if (!target.fileName.endsWith('.d.ts')) {
            const shimName = shim_1.TypeCheckShimGenerator.shimFor(target.fileName);
            shims.set(target.fileName, shimName);
            files.push({ name: shimName, contents: 'export const MODULE = true;' });
        }
    }
    const opts = (_a = overrides.options) !== null && _a !== void 0 ? _a : {};
    const config = (_b = overrides.config) !== null && _b !== void 0 ? _b : {};
    const { program, host, options } = (0, testing_1.makeProgram)(files, Object.assign({ strictNullChecks: true, skipLibCheck: true, noImplicitAny: true }, opts), 
    /* host */ undefined, 
    /* checkForErrors */ false);
    const checker = program.getTypeChecker();
    const logicalFs = new file_system_1.LogicalFileSystem((0, typescript_2.getRootDirs)(host, options), host);
    const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
    const moduleResolver = new imports_1.ModuleResolver(program, options, host, 
    /* moduleResolutionCache */ null);
    const emitter = new imports_1.ReferenceEmitter([
        new imports_1.LocalIdentifierStrategy(),
        new imports_1.AbsoluteModuleStrategy(program, checker, moduleResolver, new reflection_1.TypeScriptReflectionHost(checker)),
        new imports_1.LogicalProjectStrategy(reflectionHost, logicalFs),
    ]);
    const fullConfig = Object.assign(Object.assign(Object.assign({}, exports.ALL_ENABLED_CONFIG), { useInlineTypeConstructors: overrides.inlining !== undefined
            ? overrides.inlining
            : exports.ALL_ENABLED_CONFIG.useInlineTypeConstructors }), config);
    // Map out the scope of each target component, which is needed for the ComponentScopeReader.
    const scopeMap = new Map();
    for (const target of targets) {
        const sf = (0, file_system_1.getSourceFileOrError)(program, target.fileName);
        const scope = makeScope(program, sf, (_c = target.declarations) !== null && _c !== void 0 ? _c : []);
        if (shims.has(target.fileName)) {
            const shimFileName = shims.get(target.fileName);
            const shimSf = (0, file_system_1.getSourceFileOrError)(program, shimFileName);
            (0, shims_1.sfExtensionData)(shimSf).fileShim = { extension: 'ngtypecheck', generatedFrom: target.fileName };
        }
        for (const className of Object.keys(target.templates)) {
            const classDecl = getClass(sf, className);
            scopeMap.set(classDecl, scope);
        }
    }
    const checkAdapter = createTypeCheckAdapter((sf, ctx) => {
        var _a, _b, _c;
        for (const target of targets) {
            if ((0, file_system_1.getSourceFileOrError)(program, target.fileName) !== sf) {
                continue;
            }
            const declarations = (_a = target.declarations) !== null && _a !== void 0 ? _a : [];
            for (const className of Object.keys(target.templates)) {
                const classDecl = getClass(sf, className);
                const template = target.templates[className];
                const templateUrl = `${className}.html`;
                const templateFile = new compiler_1.ParseSourceFile(template, templateUrl);
                const { nodes, errors } = (0, compiler_1.parseTemplate)(template, templateUrl, overrides.parseOptions);
                if (errors !== null) {
                    throw new Error('Template parse errors: \n' + errors.join('\n'));
                }
                const { matcher, pipes } = prepareDeclarations(declarations, (decl) => {
                    let declFile = sf;
                    if (decl.file !== undefined) {
                        declFile = program.getSourceFile(decl.file);
                        if (declFile === undefined) {
                            throw new Error(`Unable to locate ${decl.file} for ${decl.type} ${decl.name}`);
                        }
                    }
                    return getClass(declFile, decl.name);
                }, fakeMetadataRegistry, (_c = (_b = overrides.parseOptions) === null || _b === void 0 ? void 0 : _b.enableSelectorless) !== null && _c !== void 0 ? _c : false);
                const binder = new compiler_1.R3TargetBinder(matcher);
                const classRef = new imports_1.Reference(classDecl);
                const templateContext = {
                    nodes,
                    pipes,
                    sourceMapping: {
                        type: 'external',
                        template,
                        templateUrl,
                        componentClass: classRef.node,
                        node: classRef.node.name, // Use the class's name for error mappings.
                    },
                    file: templateFile,
                    parseErrors: errors,
                    preserveWhitespaces: false,
                };
                ctx.addDirective(classRef, binder, [], templateContext, null, false);
            }
        }
    });
    const programStrategy = new program_driver_1.TsCreateProgramDriver(program, host, options, ['ngtypecheck']);
    if (overrides.inlining !== undefined) {
        programStrategy.supportsInlineOperations = overrides.inlining;
    }
    const fakeScopeReader = {
        getRemoteScope() {
            return null;
        },
        // If there is a module with [className] + 'Module' in the same source file, that will be
        // returned as the NgModule for the class.
        getScopeForComponent(clazz) {
            try {
                const ngModule = getClass(clazz.getSourceFile(), `${clazz.name.getText()}Module`);
                if (!scopeMap.has(clazz)) {
                    // This class wasn't part of the target set of components with templates, but is
                    // probably a declaration used in one of them. Return an empty scope.
                    const emptyScope = { dependencies: [], isPoisoned: false };
                    return {
                        kind: scope_1.ComponentScopeKind.NgModule,
                        ngModule,
                        compilation: emptyScope,
                        reexports: [],
                        schemas: [],
                        exported: emptyScope,
                    };
                }
                const scope = scopeMap.get(clazz);
                return {
                    kind: scope_1.ComponentScopeKind.NgModule,
                    ngModule,
                    compilation: scope,
                    reexports: [],
                    schemas: [],
                    exported: scope,
                };
            }
            catch (e) {
                // No NgModule was found for this class, so it has no scope.
                return null;
            }
        },
    };
    const fakeMetadataReader = getFakeMetadataReader(fakeMetadataRegistry);
    const fakeNgModuleIndex = getFakeNgModuleIndex(fakeMetadataRegistry);
    const typeCheckScopeRegistry = new scope_1.TypeCheckScopeRegistry(fakeScopeReader, new metadata_1.CompoundMetadataReader([fakeMetadataReader]), new metadata_1.HostDirectivesResolver(fakeMetadataReader));
    const templateTypeChecker = new checker_1.TemplateTypeCheckerImpl(program, programStrategy, checkAdapter, fullConfig, emitter, reflectionHost, host, incremental_1.NOOP_INCREMENTAL_BUILD, fakeMetadataReader, fakeMetadataReader, fakeNgModuleIndex, fakeScopeReader, typeCheckScopeRegistry, perf_1.NOOP_PERF_RECORDER);
    return { templateTypeChecker, program, programStrategy };
}
/**
 * Diagnoses the given template with the specified declarations.
 *
 * @returns a list of error diagnostics.
 */
function diagnose(template, source, declarations, additionalSources = [], config, options) {
    const sfPath = (0, file_system_1.absoluteFrom)('/main.ts');
    const { program, templateTypeChecker } = setup([
        { fileName: sfPath, templates: { 'TestComponent': template }, source, declarations },
        ...additionalSources.map((testFile) => ({
            fileName: testFile.name,
            source: testFile.contents,
            templates: {},
        })),
    ], { config, options });
    const sf = (0, file_system_1.getSourceFileOrError)(program, sfPath);
    const diagnostics = templateTypeChecker.getDiagnosticsForFile(sf, api_1.OptimizeFor.WholeProgram);
    return diagnostics.map((diag) => {
        const text = typescript_1.default.flattenDiagnosticMessageText(diag.messageText, '\n');
        const fileName = diag.file.fileName;
        const { line, character } = typescript_1.default.getLineAndCharacterOfPosition(diag.file, diag.start);
        return `${fileName}(${line + 1}, ${character + 1}): ${text}`;
    });
}
function createTypeCheckAdapter(fn) {
    return { typeCheck: fn };
}
function getFakeMetadataReader(fakeMetadataRegistry) {
    return {
        getDirectiveMetadata(node) {
            var _a;
            return (_a = fakeMetadataRegistry.get(node.debugName)) !== null && _a !== void 0 ? _a : null;
        },
        getKnown(kind) {
            switch (kind) {
                // TODO: This is not needed for these ngtsc tests, but may be wanted in the future.
                default:
                    return [];
            }
        },
    };
}
function getFakeNgModuleIndex(fakeMetadataRegistry) {
    return {
        getNgModulesExporting(trait) {
            return [];
        },
    };
}
function prepareDeclarations(declarations, resolveDeclaration, metadataRegistry, selectorlessEnabled) {
    const pipes = new Map();
    const hostDirectiveResolder = new metadata_1.HostDirectivesResolver(getFakeMetadataReader(metadataRegistry));
    const directives = [];
    const registerDirective = (decl) => {
        var _a;
        const meta = getDirectiveMetaFromDeclaration(decl, resolveDeclaration);
        directives.push(meta);
        metadataRegistry.set(decl.name, meta);
        (_a = decl.hostDirectives) === null || _a === void 0 ? void 0 : _a.forEach((hostDecl) => registerDirective(hostDecl.directive));
    };
    for (const decl of declarations) {
        if (decl.type === 'directive') {
            registerDirective(decl);
        }
        else if (decl.type === 'pipe') {
            pipes.set(decl.pipeName, {
                kind: metadata_1.MetaKind.Pipe,
                ref: new imports_1.Reference(resolveDeclaration(decl)),
                name: decl.pipeName,
                nameExpr: null,
                isStandalone: false,
                decorator: null,
                isExplicitlyDeferred: false,
                isPure: true,
            });
        }
    }
    // We need to make two passes over the directives so that all declarations
    // have been registered by the time we resolve the host directives.
    if (selectorlessEnabled) {
        const registry = new Map();
        for (const meta of directives) {
            registry.set(meta.name, [meta, ...hostDirectiveResolder.resolve(meta)]);
        }
        return { matcher: new compiler_1.SelectorlessMatcher(registry), pipes };
    }
    else {
        const matcher = new compiler_1.SelectorMatcher();
        for (const meta of directives) {
            const selector = compiler_1.CssSelector.parse(meta.selector || '');
            const matches = [...hostDirectiveResolder.resolve(meta), meta];
            matcher.addSelectables(selector, matches);
        }
        return { matcher, pipes };
    }
}
function getClass(sf, name) {
    for (const stmt of sf.statements) {
        if ((0, reflection_1.isNamedClassDeclaration)(stmt) && stmt.name.text === name) {
            return stmt;
        }
    }
    throw new Error(`Class ${name} not found in file: ${sf.fileName}: ${sf.text}`);
}
function getDirectiveMetaFromDeclaration(decl, resolveDeclaration) {
    var _a, _b;
    return {
        name: decl.name,
        ref: new imports_1.Reference(resolveDeclaration(decl)),
        exportAs: decl.exportAs || null,
        selector: decl.selector || null,
        hasNgTemplateContextGuard: decl.hasNgTemplateContextGuard || false,
        inputs: metadata_1.ClassPropertyMapping.fromMappedObject(decl.inputs || {}),
        isComponent: decl.isComponent || false,
        ngTemplateGuards: decl.ngTemplateGuards || [],
        coercedInputFields: new Set(decl.coercedInputFields || []),
        restrictedInputFields: new Set(decl.restrictedInputFields || []),
        stringLiteralInputFields: new Set(decl.stringLiteralInputFields || []),
        undeclaredInputFields: new Set(decl.undeclaredInputFields || []),
        isGeneric: (_a = decl.isGeneric) !== null && _a !== void 0 ? _a : false,
        outputs: metadata_1.ClassPropertyMapping.fromMappedObject(decl.outputs || {}),
        queries: decl.queries || [],
        isStructural: false,
        isStandalone: !!decl.isStandalone,
        isSignal: !!decl.isSignal,
        baseClass: null,
        animationTriggerNames: null,
        decorator: null,
        ngContentSelectors: decl.ngContentSelectors || null,
        preserveWhitespaces: (_b = decl.preserveWhitespaces) !== null && _b !== void 0 ? _b : false,
        isExplicitlyDeferred: false,
        imports: decl.imports,
        rawImports: null,
        hostDirectives: decl.hostDirectives === undefined
            ? null
            : decl.hostDirectives.map((hostDecl) => {
                return {
                    directive: new imports_1.Reference(resolveDeclaration(hostDecl.directive)),
                    inputs: parseInputOutputMappingArray(hostDecl.inputs || []),
                    outputs: parseInputOutputMappingArray(hostDecl.outputs || []),
                };
            }),
    };
}
/**
 * Synthesize `ScopeData` metadata from an array of `TestDeclaration`s.
 */
function makeScope(program, sf, decls) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const scope = { dependencies: [], isPoisoned: false };
    for (const decl of decls) {
        let declSf = sf;
        if (decl.file !== undefined) {
            declSf = (0, file_system_1.getSourceFileOrError)(program, decl.file);
        }
        const declClass = getClass(declSf, decl.name);
        if (decl.type === 'directive') {
            scope.dependencies.push({
                kind: metadata_1.MetaKind.Directive,
                matchSource: metadata_1.MatchSource.Selector,
                ref: new imports_1.Reference(declClass),
                baseClass: null,
                name: decl.name,
                selector: decl.selector,
                queries: [],
                inputs: metadata_1.ClassPropertyMapping.fromMappedObject(decl.inputs || {}),
                outputs: metadata_1.ClassPropertyMapping.fromMappedObject(decl.outputs || {}),
                isComponent: (_a = decl.isComponent) !== null && _a !== void 0 ? _a : false,
                exportAs: (_b = decl.exportAs) !== null && _b !== void 0 ? _b : null,
                ngTemplateGuards: (_c = decl.ngTemplateGuards) !== null && _c !== void 0 ? _c : [],
                hasNgTemplateContextGuard: (_d = decl.hasNgTemplateContextGuard) !== null && _d !== void 0 ? _d : false,
                coercedInputFields: new Set((_e = decl.coercedInputFields) !== null && _e !== void 0 ? _e : []),
                restrictedInputFields: new Set((_f = decl.restrictedInputFields) !== null && _f !== void 0 ? _f : []),
                stringLiteralInputFields: new Set((_g = decl.stringLiteralInputFields) !== null && _g !== void 0 ? _g : []),
                undeclaredInputFields: new Set((_h = decl.undeclaredInputFields) !== null && _h !== void 0 ? _h : []),
                isGeneric: (_j = decl.isGeneric) !== null && _j !== void 0 ? _j : false,
                isPoisoned: false,
                isStructural: false,
                animationTriggerNames: null,
                isStandalone: false,
                isSignal: false,
                imports: null,
                rawImports: null,
                deferredImports: null,
                schemas: null,
                decorator: null,
                assumedToExportProviders: false,
                ngContentSelectors: decl.ngContentSelectors || null,
                preserveWhitespaces: (_k = decl.preserveWhitespaces) !== null && _k !== void 0 ? _k : false,
                isExplicitlyDeferred: false,
                inputFieldNamesFromMetadataArray: null,
                selectorlessEnabled: false,
                localReferencedSymbols: null,
                hostDirectives: decl.hostDirectives === undefined
                    ? null
                    : decl.hostDirectives.map((hostDecl) => {
                        return {
                            directive: new imports_1.Reference(getClass(hostDecl.directive.file
                                ? (0, file_system_1.getSourceFileOrError)(program, hostDecl.directive.file)
                                : sf, hostDecl.directive.name)),
                            origin: sf,
                            isForwardReference: false,
                            inputs: hostDecl.inputs || {},
                            outputs: hostDecl.outputs || {},
                        };
                    }),
            });
        }
        else if (decl.type === 'pipe') {
            scope.dependencies.push({
                kind: metadata_1.MetaKind.Pipe,
                ref: new imports_1.Reference(declClass),
                name: decl.pipeName,
                nameExpr: null,
                isStandalone: false,
                decorator: null,
                isExplicitlyDeferred: false,
                isPure: true,
            });
        }
    }
    return scope;
}
function parseInputOutputMappingArray(values) {
    return values.reduce((results, value) => {
        // Either the value is 'field' or 'field: property'. In the first case, `property` will
        // be undefined, in which case the field name should also be used as the property name.
        const [field, property] = value.split(':', 2).map((str) => str.trim());
        results[field] = property || field;
        return results;
    }, {});
}
class NoopSchemaChecker {
    get diagnostics() {
        return [];
    }
    checkElement() { }
    checkTemplateElementProperty() { }
    checkHostElementProperty() { }
}
exports.NoopSchemaChecker = NoopSchemaChecker;
class NoopOobRecorder {
    get diagnostics() {
        return [];
    }
    missingReferenceTarget() { }
    missingPipe() { }
    deferredPipeUsedEagerly(id, ast) { }
    deferredComponentUsedEagerly(id, element) { }
    duplicateTemplateVar() { }
    requiresInlineTcb() { }
    requiresInlineTypeConstructors() { }
    suboptimalTypeInference() { }
    splitTwoWayBinding() { }
    missingRequiredInputs() { }
    illegalForLoopTrackAccess() { }
    inaccessibleDeferredTriggerElement() { }
    controlFlowPreventingContentProjection() { }
    illegalWriteToLetDeclaration(id, node, target) { }
    letUsedBeforeDefinition(id, node, target) { }
    conflictingDeclaration(id, current) { }
    missingNamedTemplateDependency(id, node) { }
    unclaimedDirectiveBinding(id, directive, node) { }
    incorrectTemplateDependencyType(id, node) { }
}
exports.NoopOobRecorder = NoopOobRecorder;
function createNgCompilerForFile(fileContent) {
    const fs = (0, file_system_1.getFileSystem)();
    fs.ensureDir((0, file_system_1.absoluteFrom)('/node_modules/@angular/core'));
    const FILE = (0, file_system_1.absoluteFrom)('/main.ts');
    fs.writeFile(FILE, fileContent);
    const options = {
        strictTemplates: true,
        lib: ['dom', 'dom.iterable', 'esnext'],
    };
    const baseHost = new file_system_1.NgtscCompilerHost((0, file_system_1.getFileSystem)(), options);
    const host = core_1.NgCompilerHost.wrap(baseHost, [FILE], options, /* oldProgram */ null);
    const program = typescript_1.default.createProgram({ host, options, rootNames: host.inputFiles });
    const ticket = (0, core_1.freshCompilationTicket)(program, options, new incremental_1.NoopIncrementalBuildStrategy(), new program_driver_1.TsCreateProgramDriver(program, host, options, []), 
    /* perfRecorder */ null, 
    /*enableTemplateTypeChecker*/ true, 
    /*usePoisonedData*/ false);
    const compiler = core_1.NgCompiler.fromTicket(ticket, host);
    return { compiler, sourceFile: program.getSourceFile(FILE) };
}
