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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgCompiler = exports.CompilationTicketKind = void 0;
exports.freshCompilationTicket = freshCompilationTicket;
exports.incrementalFromCompilerTicket = incrementalFromCompilerTicket;
exports.incrementalFromStateTicket = incrementalFromStateTicket;
exports.resourceChangeTicket = resourceChangeTicket;
exports.isAngularCorePackage = isAngularCorePackage;
const typescript_1 = __importDefault(require("typescript"));
const annotations_1 = require("../../annotations");
const common_1 = require("../../annotations/common");
const cycles_1 = require("../../cycles");
const diagnostics_1 = require("../../diagnostics");
const docs_1 = require("../../docs");
const entry_point_1 = require("../../entry_point");
const file_system_1 = require("../../file_system");
const imports_1 = require("../../imports");
const incremental_1 = require("../../incremental");
const indexer_1 = require("../../indexer");
const metadata_1 = require("../../metadata");
const ng_module_index_1 = require("../../metadata/src/ng_module_index");
const partial_evaluator_1 = require("../../partial_evaluator");
const perf_1 = require("../../perf");
const reflection_1 = require("../../reflection");
const resource_1 = require("../../resource");
const scope_1 = require("../../scope");
const standalone_1 = require("../../scope/src/standalone");
const transform_1 = require("../../transform");
const typecheck_1 = require("../../typecheck");
const api_1 = require("../../typecheck/api");
const extended_1 = require("../../typecheck/extended");
const template_semantics_checker_1 = require("../../typecheck/template_semantics/src/template_semantics_checker");
const typescript_2 = require("../../util/src/typescript");
const validation_1 = require("../../validation");
const api_2 = require("../api");
const feature_detection_1 = require("./feature_detection");
const jit_1 = require("../../transform/jit");
const shims_1 = require("../../shims");
/**
 * Discriminant type for a `CompilationTicket`.
 */
var CompilationTicketKind;
(function (CompilationTicketKind) {
    CompilationTicketKind[CompilationTicketKind["Fresh"] = 0] = "Fresh";
    CompilationTicketKind[CompilationTicketKind["IncrementalTypeScript"] = 1] = "IncrementalTypeScript";
    CompilationTicketKind[CompilationTicketKind["IncrementalResource"] = 2] = "IncrementalResource";
})(CompilationTicketKind || (exports.CompilationTicketKind = CompilationTicketKind = {}));
/**
 * Create a `CompilationTicket` for a brand new compilation, using no prior state.
 */
function freshCompilationTicket(tsProgram, options, incrementalBuildStrategy, programDriver, perfRecorder, enableTemplateTypeChecker, usePoisonedData) {
    return {
        kind: CompilationTicketKind.Fresh,
        tsProgram,
        options,
        incrementalBuildStrategy,
        programDriver,
        enableTemplateTypeChecker,
        usePoisonedData,
        perfRecorder: perfRecorder !== null && perfRecorder !== void 0 ? perfRecorder : perf_1.ActivePerfRecorder.zeroedToNow(),
    };
}
/**
 * Create a `CompilationTicket` as efficiently as possible, based on a previous `NgCompiler`
 * instance and a new `ts.Program`.
 */
function incrementalFromCompilerTicket(oldCompiler, newProgram, incrementalBuildStrategy, programDriver, modifiedResourceFiles, perfRecorder) {
    const oldProgram = oldCompiler.getCurrentProgram();
    const oldState = oldCompiler.incrementalStrategy.getIncrementalState(oldProgram);
    if (oldState === null) {
        // No incremental step is possible here, since no IncrementalState was found for the old
        // program.
        return freshCompilationTicket(newProgram, oldCompiler.options, incrementalBuildStrategy, programDriver, perfRecorder, oldCompiler.enableTemplateTypeChecker, oldCompiler.usePoisonedData);
    }
    if (perfRecorder === null) {
        perfRecorder = perf_1.ActivePerfRecorder.zeroedToNow();
    }
    const incrementalCompilation = incremental_1.IncrementalCompilation.incremental(newProgram, versionMapFromProgram(newProgram, programDriver), oldProgram, oldState, modifiedResourceFiles, perfRecorder);
    return {
        kind: CompilationTicketKind.IncrementalTypeScript,
        enableTemplateTypeChecker: oldCompiler.enableTemplateTypeChecker,
        usePoisonedData: oldCompiler.usePoisonedData,
        options: oldCompiler.options,
        incrementalBuildStrategy,
        incrementalCompilation,
        programDriver,
        newProgram,
        perfRecorder,
    };
}
/**
 * Create a `CompilationTicket` directly from an old `ts.Program` and associated Angular compilation
 * state, along with a new `ts.Program`.
 */
function incrementalFromStateTicket(oldProgram, oldState, newProgram, options, incrementalBuildStrategy, programDriver, modifiedResourceFiles, perfRecorder, enableTemplateTypeChecker, usePoisonedData) {
    if (perfRecorder === null) {
        perfRecorder = perf_1.ActivePerfRecorder.zeroedToNow();
    }
    const incrementalCompilation = incremental_1.IncrementalCompilation.incremental(newProgram, versionMapFromProgram(newProgram, programDriver), oldProgram, oldState, modifiedResourceFiles, perfRecorder);
    return {
        kind: CompilationTicketKind.IncrementalTypeScript,
        newProgram,
        options,
        incrementalBuildStrategy,
        incrementalCompilation,
        programDriver,
        enableTemplateTypeChecker,
        usePoisonedData,
        perfRecorder,
    };
}
function resourceChangeTicket(compiler, modifiedResourceFiles) {
    return {
        kind: CompilationTicketKind.IncrementalResource,
        compiler,
        modifiedResourceFiles,
        perfRecorder: perf_1.ActivePerfRecorder.zeroedToNow(),
    };
}
/**
 * The heart of the Angular Ivy compiler.
 *
 * The `NgCompiler` provides an API for performing Angular compilation within a custom TypeScript
 * compiler. Each instance of `NgCompiler` supports a single compilation, which might be
 * incremental.
 *
 * `NgCompiler` is lazy, and does not perform any of the work of the compilation until one of its
 * output methods (e.g. `getDiagnostics`) is called.
 *
 * See the README.md for more information.
 */
class NgCompiler {
    /**
     * Convert a `CompilationTicket` into an `NgCompiler` instance for the requested compilation.
     *
     * Depending on the nature of the compilation request, the `NgCompiler` instance may be reused
     * from a previous compilation and updated with any changes, it may be a new instance which
     * incrementally reuses state from a previous compilation, or it may represent a fresh
     * compilation entirely.
     */
    static fromTicket(ticket, adapter) {
        switch (ticket.kind) {
            case CompilationTicketKind.Fresh:
                return new NgCompiler(adapter, ticket.options, ticket.tsProgram, ticket.programDriver, ticket.incrementalBuildStrategy, incremental_1.IncrementalCompilation.fresh(ticket.tsProgram, versionMapFromProgram(ticket.tsProgram, ticket.programDriver)), ticket.enableTemplateTypeChecker, ticket.usePoisonedData, ticket.perfRecorder);
            case CompilationTicketKind.IncrementalTypeScript:
                return new NgCompiler(adapter, ticket.options, ticket.newProgram, ticket.programDriver, ticket.incrementalBuildStrategy, ticket.incrementalCompilation, ticket.enableTemplateTypeChecker, ticket.usePoisonedData, ticket.perfRecorder);
            case CompilationTicketKind.IncrementalResource:
                const compiler = ticket.compiler;
                compiler.updateWithChangedResources(ticket.modifiedResourceFiles, ticket.perfRecorder);
                return compiler;
        }
    }
    constructor(adapter, options, inputProgram, programDriver, incrementalStrategy, incrementalCompilation, enableTemplateTypeChecker, usePoisonedData, livePerfRecorder) {
        var _a, _b, _c, _d;
        this.adapter = adapter;
        this.options = options;
        this.inputProgram = inputProgram;
        this.programDriver = programDriver;
        this.incrementalStrategy = incrementalStrategy;
        this.incrementalCompilation = incrementalCompilation;
        this.usePoisonedData = usePoisonedData;
        this.livePerfRecorder = livePerfRecorder;
        /**
         * Lazily evaluated state of the compilation.
         *
         * This is created on demand by calling `ensureAnalyzed`.
         */
        this.compilation = null;
        /**
         * Any diagnostics related to the construction of the compilation.
         *
         * These are diagnostics which arose during setup of the host and/or program.
         */
        this.constructionDiagnostics = [];
        /**
         * Non-template diagnostics related to the program itself. Does not include template
         * diagnostics because the template type checker memoizes them itself.
         *
         * This is set by (and memoizes) `getNonTemplateDiagnostics`.
         */
        this.nonTemplateDiagnostics = null;
        this.angularCoreVersion = (_a = options['_angularCoreVersion']) !== null && _a !== void 0 ? _a : null;
        this.delegatingPerfRecorder = new perf_1.DelegatingPerfRecorder(this.perfRecorder);
        this.usePoisonedData = usePoisonedData || !!options._compilePoisonedComponents;
        this.enableTemplateTypeChecker =
            enableTemplateTypeChecker || !!options._enableTemplateTypeChecker;
        // TODO(crisbeto): remove this flag and base `enableBlockSyntax` on the `angularCoreVersion`.
        this.enableBlockSyntax = (_b = options['_enableBlockSyntax']) !== null && _b !== void 0 ? _b : true;
        this.enableLetSyntax = (_c = options['_enableLetSyntax']) !== null && _c !== void 0 ? _c : true;
        this.enableSelectorless = (_d = options['_enableSelectorless']) !== null && _d !== void 0 ? _d : false;
        // Standalone by default is enabled since v19. We need to toggle it here,
        // because the language service extension may be running with the latest
        // version of the compiler against an older version of Angular.
        this.implicitStandaloneValue =
            this.angularCoreVersion === null ||
                (0, feature_detection_1.coreVersionSupportsFeature)(this.angularCoreVersion, '>= 19.0.0');
        this.enableHmr = !!options['_enableHmr'];
        this.constructionDiagnostics.push(...this.adapter.constructionDiagnostics, ...verifyCompatibleTypeCheckOptions(this.options));
        this.currentProgram = inputProgram;
        this.closureCompilerEnabled = !!this.options.annotateForClosureCompiler;
        this.entryPoint =
            adapter.entryPoint !== null ? (0, typescript_2.getSourceFileOrNull)(inputProgram, adapter.entryPoint) : null;
        const moduleResolutionCache = typescript_1.default.createModuleResolutionCache(this.adapter.getCurrentDirectory(), 
        // doen't retain a reference to `this`, if other closures in the constructor here reference
        // `this` internally then a closure created here would retain them. This can cause major
        // memory leak issues since the `moduleResolutionCache` is a long-lived object and finds its
        // way into all kinds of places inside TS internal objects.
        this.adapter.getCanonicalFileName.bind(this.adapter));
        this.moduleResolver = new imports_1.ModuleResolver(inputProgram, this.options, this.adapter, moduleResolutionCache);
        this.resourceManager = new resource_1.AdapterResourceLoader(adapter, this.options);
        this.cycleAnalyzer = new cycles_1.CycleAnalyzer(new cycles_1.ImportGraph(inputProgram.getTypeChecker(), this.delegatingPerfRecorder));
        this.incrementalStrategy.setIncrementalState(this.incrementalCompilation.state, inputProgram);
        this.ignoreForDiagnostics = new Set(inputProgram.getSourceFiles().filter((sf) => this.adapter.isShim(sf)));
        this.ignoreForEmit = this.adapter.ignoreForEmit;
        let dtsFileCount = 0;
        let nonDtsFileCount = 0;
        for (const sf of inputProgram.getSourceFiles()) {
            if (sf.isDeclarationFile) {
                dtsFileCount++;
            }
            else {
                nonDtsFileCount++;
            }
        }
        livePerfRecorder.eventCount(perf_1.PerfEvent.InputDtsFile, dtsFileCount);
        livePerfRecorder.eventCount(perf_1.PerfEvent.InputTsFile, nonDtsFileCount);
    }
    get perfRecorder() {
        return this.livePerfRecorder;
    }
    updateWithChangedResources(changedResources, perfRecorder) {
        this.livePerfRecorder = perfRecorder;
        this.delegatingPerfRecorder.target = perfRecorder;
        perfRecorder.inPhase(perf_1.PerfPhase.ResourceUpdate, () => {
            if (this.compilation === null) {
                // Analysis hasn't happened yet, so no update is necessary - any changes to resources will
                // be captured by the initial analysis pass itself.
                return;
            }
            this.resourceManager.invalidate();
            const classesToUpdate = new Set();
            for (const resourceFile of changedResources) {
                for (const templateClass of this.getComponentsWithTemplateFile(resourceFile)) {
                    classesToUpdate.add(templateClass);
                }
                for (const styleClass of this.getComponentsWithStyleFile(resourceFile)) {
                    classesToUpdate.add(styleClass);
                }
            }
            for (const clazz of classesToUpdate) {
                this.compilation.traitCompiler.updateResources(clazz);
                if (!typescript_1.default.isClassDeclaration(clazz)) {
                    continue;
                }
                this.compilation.templateTypeChecker.invalidateClass(clazz);
            }
        });
    }
    /**
     * Get the resource dependencies of a file.
     *
     * If the file is not part of the compilation, an empty array will be returned.
     */
    getResourceDependencies(file) {
        this.ensureAnalyzed();
        return this.incrementalCompilation.depGraph.getResourceDependencies(file);
    }
    /**
     * Get all Angular-related diagnostics for this compilation.
     */
    getDiagnostics() {
        const diagnostics = [...this.getNonTemplateDiagnostics()];
        // Type check code may throw fatal diagnostic errors if e.g. the type check
        // block cannot be generated. Gracefully return the associated diagnostic.
        // Note: If a fatal diagnostic is raised, do not repeat the same diagnostics
        // by running the extended template checking code, which will attempt to
        // generate the same TCB.
        try {
            diagnostics.push(...this.getTemplateDiagnostics(), ...this.runAdditionalChecks());
        }
        catch (err) {
            if (!(0, diagnostics_1.isFatalDiagnosticError)(err)) {
                throw err;
            }
            diagnostics.push(err.toDiagnostic());
        }
        return this.addMessageTextDetails(diagnostics);
    }
    /**
     * Get all Angular-related diagnostics for this compilation.
     *
     * If a `ts.SourceFile` is passed, only diagnostics related to that file are returned.
     */
    getDiagnosticsForFile(file, optimizeFor) {
        const diagnostics = [
            ...this.getNonTemplateDiagnostics().filter((diag) => diag.file === file),
        ];
        // Type check code may throw fatal diagnostic errors if e.g. the type check
        // block cannot be generated. Gracefully return the associated diagnostic.
        // Note: If a fatal diagnostic is raised, do not repeat the same diagnostics
        // by running the extended template checking code, which will attempt to
        // generate the same TCB.
        try {
            diagnostics.push(...this.getTemplateDiagnosticsForFile(file, optimizeFor), ...this.runAdditionalChecks(file));
        }
        catch (err) {
            if (!(0, diagnostics_1.isFatalDiagnosticError)(err)) {
                throw err;
            }
            diagnostics.push(err.toDiagnostic());
        }
        return this.addMessageTextDetails(diagnostics);
    }
    /**
     * Get all `ts.Diagnostic`s currently available that pertain to the given component.
     */
    getDiagnosticsForComponent(component) {
        const compilation = this.ensureAnalyzed();
        const ttc = compilation.templateTypeChecker;
        const diagnostics = [];
        // Type check code may throw fatal diagnostic errors if e.g. the type check
        // block cannot be generated. Gracefully return the associated diagnostic.
        // Note: If a fatal diagnostic is raised, do not repeat the same diagnostics
        // by running the extended template checking code, which will attempt to
        // generate the same TCB.
        try {
            diagnostics.push(...ttc.getDiagnosticsForComponent(component));
            const { extendedTemplateChecker, templateSemanticsChecker } = compilation;
            if (templateSemanticsChecker !== null) {
                diagnostics.push(...templateSemanticsChecker.getDiagnosticsForComponent(component));
            }
            if (this.options.strictTemplates && extendedTemplateChecker !== null) {
                diagnostics.push(...extendedTemplateChecker.getDiagnosticsForComponent(component));
            }
        }
        catch (err) {
            if (!(0, diagnostics_1.isFatalDiagnosticError)(err)) {
                throw err;
            }
            diagnostics.push(err.toDiagnostic());
        }
        return this.addMessageTextDetails(diagnostics);
    }
    /**
     * Add Angular.io error guide links to diagnostics for this compilation.
     */
    addMessageTextDetails(diagnostics) {
        return diagnostics.map((diag) => {
            if (diag.code && diagnostics_1.COMPILER_ERRORS_WITH_GUIDES.has((0, diagnostics_1.ngErrorCode)(diag.code))) {
                return Object.assign(Object.assign({}, diag), { messageText: diag.messageText +
                        `. Find more at ${diagnostics_1.ERROR_DETAILS_PAGE_BASE_URL}/NG${(0, diagnostics_1.ngErrorCode)(diag.code)}` });
            }
            return diag;
        });
    }
    /**
     * Get all setup-related diagnostics for this compilation.
     */
    getOptionDiagnostics() {
        return this.constructionDiagnostics;
    }
    /**
     * Get the current `ts.Program` known to this `NgCompiler`.
     *
     * Compilation begins with an input `ts.Program`, and during template type-checking operations new
     * `ts.Program`s may be produced using the `ProgramDriver`. The most recent such `ts.Program` to
     * be produced is available here.
     *
     * This `ts.Program` serves two key purposes:
     *
     * * As an incremental starting point for creating the next `ts.Program` based on files that the
     *   user has changed (for clients using the TS compiler program APIs).
     *
     * * As the "before" point for an incremental compilation invocation, to determine what's changed
     *   between the old and new programs (for all compilations).
     */
    getCurrentProgram() {
        return this.currentProgram;
    }
    getTemplateTypeChecker() {
        if (!this.enableTemplateTypeChecker) {
            throw new Error('The `TemplateTypeChecker` does not work without `enableTemplateTypeChecker`.');
        }
        return this.ensureAnalyzed().templateTypeChecker;
    }
    /**
     * Retrieves the `ts.Declaration`s for any component(s) which use the given template file.
     */
    getComponentsWithTemplateFile(templateFilePath) {
        const { resourceRegistry } = this.ensureAnalyzed();
        return resourceRegistry.getComponentsWithTemplate((0, file_system_1.resolve)(templateFilePath));
    }
    /**
     * Retrieves the `ts.Declaration`s for any component(s) which use the given template file.
     */
    getComponentsWithStyleFile(styleFilePath) {
        const { resourceRegistry } = this.ensureAnalyzed();
        return resourceRegistry.getComponentsWithStyle((0, file_system_1.resolve)(styleFilePath));
    }
    /**
     * Retrieves external resources for the given directive.
     */
    getDirectiveResources(classDecl) {
        if (!(0, reflection_1.isNamedClassDeclaration)(classDecl)) {
            return null;
        }
        const { resourceRegistry } = this.ensureAnalyzed();
        const styles = resourceRegistry.getStyles(classDecl);
        const template = resourceRegistry.getTemplate(classDecl);
        const hostBindings = resourceRegistry.getHostBindings(classDecl);
        return { styles, template, hostBindings };
    }
    getMeta(classDecl) {
        var _a;
        if (!(0, reflection_1.isNamedClassDeclaration)(classDecl)) {
            return null;
        }
        const ref = new imports_1.Reference(classDecl);
        const { metaReader } = this.ensureAnalyzed();
        const meta = (_a = metaReader.getPipeMetadata(ref)) !== null && _a !== void 0 ? _a : metaReader.getDirectiveMetadata(ref);
        if (meta === null) {
            return null;
        }
        return meta;
    }
    /**
     * Perform Angular's analysis step (as a precursor to `getDiagnostics` or `prepareEmit`)
     * asynchronously.
     *
     * Normally, this operation happens lazily whenever `getDiagnostics` or `prepareEmit` are called.
     * However, certain consumers may wish to allow for an asynchronous phase of analysis, where
     * resources such as `styleUrls` are resolved asynchronously. In these cases `analyzeAsync` must
     * be called first, and its `Promise` awaited prior to calling any other APIs of `NgCompiler`.
     */
    analyzeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.compilation !== null) {
                return;
            }
            yield this.perfRecorder.inPhase(perf_1.PerfPhase.Analysis, () => __awaiter(this, void 0, void 0, function* () {
                this.compilation = this.makeCompilation();
                const promises = [];
                for (const sf of this.inputProgram.getSourceFiles()) {
                    if (sf.isDeclarationFile) {
                        continue;
                    }
                    let analysisPromise = this.compilation.traitCompiler.analyzeAsync(sf);
                    if (analysisPromise !== undefined) {
                        promises.push(analysisPromise);
                    }
                }
                yield Promise.all(promises);
                this.perfRecorder.memory(perf_1.PerfCheckpoint.Analysis);
                this.resolveCompilation(this.compilation.traitCompiler);
            }));
        });
    }
    /**
     * Fetch transformers and other information which is necessary for a consumer to `emit` the
     * program with Angular-added definitions.
     */
    prepareEmit() {
        const compilation = this.ensureAnalyzed();
        // Untag all the files, otherwise TS 5.4 may end up emitting
        // references to typecheck files (see #56945 and #57135).
        (0, shims_1.untagAllTsFiles)(this.inputProgram);
        const coreImportsFrom = compilation.isCore ? getR3SymbolsFile(this.inputProgram) : null;
        let importRewriter;
        if (coreImportsFrom !== null) {
            importRewriter = new imports_1.R3SymbolsImportRewriter(coreImportsFrom.fileName);
        }
        else {
            importRewriter = new imports_1.NoopImportRewriter();
        }
        const defaultImportTracker = new imports_1.DefaultImportTracker();
        const before = [
            (0, transform_1.ivyTransformFactory)(compilation.traitCompiler, compilation.reflector, importRewriter, defaultImportTracker, compilation.localCompilationExtraImportsTracker, this.delegatingPerfRecorder, compilation.isCore, this.closureCompilerEnabled),
            (0, transform_1.aliasTransformFactory)(compilation.traitCompiler.exportStatements),
            defaultImportTracker.importPreservingTransformer(),
        ];
        // If there are JIT declarations, wire up the JIT transform and efficiently
        // run it against the target declarations.
        if (compilation.supportJitMode && compilation.jitDeclarationRegistry.jitDeclarations.size > 0) {
            const { jitDeclarations } = compilation.jitDeclarationRegistry;
            const jitDeclarationsArray = Array.from(jitDeclarations);
            const jitDeclarationOriginalNodes = new Set(jitDeclarationsArray.map((d) => typescript_1.default.getOriginalNode(d)));
            const sourceFilesWithJit = new Set(jitDeclarationsArray.map((d) => d.getSourceFile().fileName));
            before.push((ctx) => {
                const reflectionHost = new reflection_1.TypeScriptReflectionHost(this.inputProgram.getTypeChecker());
                const jitTransform = (0, jit_1.angularJitApplicationTransform)(this.inputProgram, compilation.isCore, (node) => {
                    // Class may be synthetic at this point due to Ivy transform.
                    node = typescript_1.default.getOriginalNode(node, typescript_1.default.isClassDeclaration);
                    return reflectionHost.isClass(node) && jitDeclarationOriginalNodes.has(node);
                })(ctx);
                return (sourceFile) => {
                    if (!sourceFilesWithJit.has(sourceFile.fileName)) {
                        return sourceFile;
                    }
                    return jitTransform(sourceFile);
                };
            });
        }
        const afterDeclarations = [];
        // In local compilation mode we don't make use of .d.ts files for Angular compilation, so their
        // transformation can be ditched.
        if (this.options.compilationMode !== 'experimental-local' &&
            compilation.dtsTransforms !== null) {
            afterDeclarations.push((0, transform_1.declarationTransformFactory)(compilation.dtsTransforms, compilation.reflector, compilation.refEmitter, importRewriter));
        }
        // Only add aliasing re-exports to the .d.ts output if the `AliasingHost` requests it.
        if (compilation.aliasingHost !== null && compilation.aliasingHost.aliasExportsInDts) {
            afterDeclarations.push((0, transform_1.aliasTransformFactory)(compilation.traitCompiler.exportStatements));
        }
        return { transformers: { before, afterDeclarations } };
    }
    /**
     * Run the indexing process and return a `Map` of all indexed components.
     *
     * See the `indexing` package for more details.
     */
    getIndexedComponents() {
        const compilation = this.ensureAnalyzed();
        const context = new indexer_1.IndexingContext();
        compilation.traitCompiler.index(context);
        return (0, indexer_1.generateAnalysis)(context);
    }
    /**
     * Gets information for the current program that may be used to generate API
     * reference documentation. This includes Angular-specific information, such
     * as component inputs and outputs.
     *
     * @param entryPoint Path to the entry point for the package for which API
     *     docs should be extracted.
     *
     * @returns A map of symbols with their associated module, eg: ApplicationRef => @angular/core
     */
    getApiDocumentation(entryPoint, privateModules) {
        const compilation = this.ensureAnalyzed();
        const checker = this.inputProgram.getTypeChecker();
        const docsExtractor = new docs_1.DocsExtractor(checker, compilation.metaReader);
        const entryPointSourceFile = this.inputProgram.getSourceFiles().find((sourceFile) => {
            // TODO: this will need to be more specific than `.includes`, but the exact path comparison
            //     will be easier to figure out when the pipeline is running end-to-end.
            return sourceFile.fileName.includes(entryPoint);
        });
        if (!entryPointSourceFile) {
            throw new Error(`Entry point "${entryPoint}" not found in program sources.`);
        }
        // TODO: Technically the current directory is not the root dir.
        // Should probably be derived from the config.
        const rootDir = this.inputProgram.getCurrentDirectory();
        return docsExtractor.extractAll(entryPointSourceFile, rootDir, privateModules);
    }
    /**
     * Collect i18n messages into the `Xi18nContext`.
     */
    xi18n(ctx) {
        // Note that the 'resolve' phase is not strictly necessary for xi18n, but this is not currently
        // optimized.
        const compilation = this.ensureAnalyzed();
        compilation.traitCompiler.xi18n(ctx);
    }
    /**
     * Emits the JavaScript module that can be used to replace the metadata of a class during HMR.
     * @param node Class for which to generate the update module.
     */
    emitHmrUpdateModule(node) {
        const { traitCompiler, reflector } = this.ensureAnalyzed();
        if (!reflector.isClass(node)) {
            return null;
        }
        const callback = traitCompiler.compileHmrUpdateCallback(node);
        if (callback === null) {
            return null;
        }
        const sourceFile = node.getSourceFile();
        const printer = typescript_1.default.createPrinter();
        const nodeText = printer.printNode(typescript_1.default.EmitHint.Unspecified, callback, sourceFile);
        return typescript_1.default.transpileModule(nodeText, {
            compilerOptions: Object.assign(Object.assign({}, this.options), { 
                // Some module types can produce additional code (see #60795) whereas we need the
                // HMR update module to use a native `export`. Override the `target` and `module`
                // to ensure that it looks as expected.
                module: typescript_1.default.ModuleKind.ES2022, target: typescript_1.default.ScriptTarget.ES2022 }),
            fileName: sourceFile.fileName,
            reportDiagnostics: false,
        }).outputText;
    }
    ensureAnalyzed() {
        if (this.compilation === null) {
            this.analyzeSync();
        }
        return this.compilation;
    }
    analyzeSync() {
        this.perfRecorder.inPhase(perf_1.PerfPhase.Analysis, () => {
            this.compilation = this.makeCompilation();
            for (const sf of this.inputProgram.getSourceFiles()) {
                if (sf.isDeclarationFile) {
                    continue;
                }
                this.compilation.traitCompiler.analyzeSync(sf);
            }
            this.perfRecorder.memory(perf_1.PerfCheckpoint.Analysis);
            this.resolveCompilation(this.compilation.traitCompiler);
        });
    }
    resolveCompilation(traitCompiler) {
        this.perfRecorder.inPhase(perf_1.PerfPhase.Resolve, () => {
            traitCompiler.resolve();
            // At this point, analysis is complete and the compiler can now calculate which files need to
            // be emitted, so do that.
            this.incrementalCompilation.recordSuccessfulAnalysis(traitCompiler);
            this.perfRecorder.memory(perf_1.PerfCheckpoint.Resolve);
        });
    }
    get fullTemplateTypeCheck() {
        // Determine the strictness level of type checking based on compiler options. As
        // `strictTemplates` is a superset of `fullTemplateTypeCheck`, the former implies the latter.
        // Also see `verifyCompatibleTypeCheckOptions` where it is verified that `fullTemplateTypeCheck`
        // is not disabled when `strictTemplates` is enabled.
        const strictTemplates = !!this.options.strictTemplates;
        return strictTemplates || !!this.options.fullTemplateTypeCheck;
    }
    getTypeCheckingConfig() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // Determine the strictness level of type checking based on compiler options. As
        // `strictTemplates` is a superset of `fullTemplateTypeCheck`, the former implies the latter.
        // Also see `verifyCompatibleTypeCheckOptions` where it is verified that `fullTemplateTypeCheck`
        // is not disabled when `strictTemplates` is enabled.
        const strictTemplates = !!this.options.strictTemplates;
        const useInlineTypeConstructors = this.programDriver.supportsInlineOperations;
        const checkTwoWayBoundEvents = (_a = this.options['_checkTwoWayBoundEvents']) !== null && _a !== void 0 ? _a : false;
        // Check whether the loaded version of `@angular/core` in the `ts.Program` supports unwrapping
        // writable signals for type-checking. Only Angular versions greater than 17.2 have the necessary
        // symbols to type check signals in two-way bindings. We also allow version 0.0.0 in case somebody is
        // using Angular at head.
        const allowSignalsInTwoWayBindings = this.angularCoreVersion === null ||
            (0, feature_detection_1.coreVersionSupportsFeature)(this.angularCoreVersion, '>= 17.2.0-0');
        // First select a type-checking configuration, based on whether full template type-checking is
        // requested.
        let typeCheckingConfig;
        if (this.fullTemplateTypeCheck) {
            typeCheckingConfig = {
                applyTemplateContextGuards: strictTemplates,
                checkQueries: false,
                checkTemplateBodies: true,
                alwaysCheckSchemaInTemplateBodies: true,
                checkTypeOfInputBindings: strictTemplates,
                honorAccessModifiersForInputBindings: false,
                checkControlFlowBodies: true,
                strictNullInputBindings: strictTemplates,
                checkTypeOfAttributes: strictTemplates,
                // Even in full template type-checking mode, DOM binding checks are not quite ready yet.
                checkTypeOfDomBindings: false,
                checkTypeOfOutputEvents: strictTemplates,
                checkTypeOfAnimationEvents: strictTemplates,
                // Checking of DOM events currently has an adverse effect on developer experience,
                // e.g. for `<input (blur)="update($event.target.value)">` enabling this check results in:
                // - error TS2531: Object is possibly 'null'.
                // - error TS2339: Property 'value' does not exist on type 'EventTarget'.
                checkTypeOfDomEvents: strictTemplates,
                checkTypeOfDomReferences: strictTemplates,
                // Non-DOM references have the correct type in View Engine so there is no strictness flag.
                checkTypeOfNonDomReferences: true,
                // Pipes are checked in View Engine so there is no strictness flag.
                checkTypeOfPipes: true,
                strictSafeNavigationTypes: strictTemplates,
                useContextGenericType: strictTemplates,
                strictLiteralTypes: true,
                enableTemplateTypeChecker: this.enableTemplateTypeChecker,
                useInlineTypeConstructors,
                // Warnings for suboptimal type inference are only enabled if in Language Service mode
                // (providing the full TemplateTypeChecker API) and if strict mode is not enabled. In strict
                // mode, the user is in full control of type inference.
                suggestionsForSuboptimalTypeInference: this.enableTemplateTypeChecker && !strictTemplates,
                controlFlowPreventingContentProjection: ((_b = this.options.extendedDiagnostics) === null || _b === void 0 ? void 0 : _b.defaultCategory) || api_2.DiagnosticCategoryLabel.Warning,
                unusedStandaloneImports: ((_c = this.options.extendedDiagnostics) === null || _c === void 0 ? void 0 : _c.defaultCategory) || api_2.DiagnosticCategoryLabel.Warning,
                allowSignalsInTwoWayBindings,
                checkTwoWayBoundEvents,
            };
        }
        else {
            typeCheckingConfig = {
                applyTemplateContextGuards: false,
                checkQueries: false,
                checkTemplateBodies: false,
                checkControlFlowBodies: false,
                // Enable deep schema checking in "basic" template type-checking mode only if Closure
                // compilation is requested, which is a good proxy for "only in google3".
                alwaysCheckSchemaInTemplateBodies: this.closureCompilerEnabled,
                checkTypeOfInputBindings: false,
                strictNullInputBindings: false,
                honorAccessModifiersForInputBindings: false,
                checkTypeOfAttributes: false,
                checkTypeOfDomBindings: false,
                checkTypeOfOutputEvents: false,
                checkTypeOfAnimationEvents: false,
                checkTypeOfDomEvents: false,
                checkTypeOfDomReferences: false,
                checkTypeOfNonDomReferences: false,
                checkTypeOfPipes: false,
                strictSafeNavigationTypes: false,
                useContextGenericType: false,
                strictLiteralTypes: false,
                enableTemplateTypeChecker: this.enableTemplateTypeChecker,
                useInlineTypeConstructors,
                // In "basic" template type-checking mode, no warnings are produced since most things are
                // not checked anyways.
                suggestionsForSuboptimalTypeInference: false,
                controlFlowPreventingContentProjection: ((_d = this.options.extendedDiagnostics) === null || _d === void 0 ? void 0 : _d.defaultCategory) || api_2.DiagnosticCategoryLabel.Warning,
                unusedStandaloneImports: ((_e = this.options.extendedDiagnostics) === null || _e === void 0 ? void 0 : _e.defaultCategory) || api_2.DiagnosticCategoryLabel.Warning,
                allowSignalsInTwoWayBindings,
                checkTwoWayBoundEvents,
            };
        }
        // Apply explicitly configured strictness flags on top of the default configuration
        // based on "fullTemplateTypeCheck".
        if (this.options.strictInputTypes !== undefined) {
            typeCheckingConfig.checkTypeOfInputBindings = this.options.strictInputTypes;
            typeCheckingConfig.applyTemplateContextGuards = this.options.strictInputTypes;
        }
        if (this.options.strictInputAccessModifiers !== undefined) {
            typeCheckingConfig.honorAccessModifiersForInputBindings =
                this.options.strictInputAccessModifiers;
        }
        if (this.options.strictNullInputTypes !== undefined) {
            typeCheckingConfig.strictNullInputBindings = this.options.strictNullInputTypes;
        }
        if (this.options.strictOutputEventTypes !== undefined) {
            typeCheckingConfig.checkTypeOfOutputEvents = this.options.strictOutputEventTypes;
            typeCheckingConfig.checkTypeOfAnimationEvents = this.options.strictOutputEventTypes;
        }
        if (this.options.strictDomEventTypes !== undefined) {
            typeCheckingConfig.checkTypeOfDomEvents = this.options.strictDomEventTypes;
        }
        if (this.options.strictSafeNavigationTypes !== undefined) {
            typeCheckingConfig.strictSafeNavigationTypes = this.options.strictSafeNavigationTypes;
        }
        if (this.options.strictDomLocalRefTypes !== undefined) {
            typeCheckingConfig.checkTypeOfDomReferences = this.options.strictDomLocalRefTypes;
        }
        if (this.options.strictAttributeTypes !== undefined) {
            typeCheckingConfig.checkTypeOfAttributes = this.options.strictAttributeTypes;
        }
        if (this.options.strictContextGenerics !== undefined) {
            typeCheckingConfig.useContextGenericType = this.options.strictContextGenerics;
        }
        if (this.options.strictLiteralTypes !== undefined) {
            typeCheckingConfig.strictLiteralTypes = this.options.strictLiteralTypes;
        }
        if (((_g = (_f = this.options.extendedDiagnostics) === null || _f === void 0 ? void 0 : _f.checks) === null || _g === void 0 ? void 0 : _g.controlFlowPreventingContentProjection) !== undefined) {
            typeCheckingConfig.controlFlowPreventingContentProjection =
                this.options.extendedDiagnostics.checks.controlFlowPreventingContentProjection;
        }
        if (((_j = (_h = this.options.extendedDiagnostics) === null || _h === void 0 ? void 0 : _h.checks) === null || _j === void 0 ? void 0 : _j.unusedStandaloneImports) !== undefined) {
            typeCheckingConfig.unusedStandaloneImports =
                this.options.extendedDiagnostics.checks.unusedStandaloneImports;
        }
        return typeCheckingConfig;
    }
    getTemplateDiagnostics() {
        const compilation = this.ensureAnalyzed();
        const diagnostics = [];
        // Get diagnostics for all files.
        for (const sf of this.inputProgram.getSourceFiles()) {
            if (sf.isDeclarationFile || this.adapter.isShim(sf)) {
                continue;
            }
            diagnostics.push(...compilation.templateTypeChecker.getDiagnosticsForFile(sf, api_1.OptimizeFor.WholeProgram));
        }
        const program = this.programDriver.getProgram();
        this.incrementalStrategy.setIncrementalState(this.incrementalCompilation.state, program);
        this.currentProgram = program;
        return diagnostics;
    }
    getTemplateDiagnosticsForFile(sf, optimizeFor) {
        const compilation = this.ensureAnalyzed();
        // Get the diagnostics.
        const diagnostics = [];
        if (!sf.isDeclarationFile && !this.adapter.isShim(sf)) {
            diagnostics.push(...compilation.templateTypeChecker.getDiagnosticsForFile(sf, optimizeFor));
        }
        const program = this.programDriver.getProgram();
        this.incrementalStrategy.setIncrementalState(this.incrementalCompilation.state, program);
        this.currentProgram = program;
        return diagnostics;
    }
    getNonTemplateDiagnostics() {
        if (this.nonTemplateDiagnostics === null) {
            const compilation = this.ensureAnalyzed();
            this.nonTemplateDiagnostics = [...compilation.traitCompiler.diagnostics];
            if (this.entryPoint !== null && compilation.exportReferenceGraph !== null) {
                this.nonTemplateDiagnostics.push(...(0, entry_point_1.checkForPrivateExports)(this.entryPoint, this.inputProgram.getTypeChecker(), compilation.exportReferenceGraph));
            }
        }
        return this.nonTemplateDiagnostics;
    }
    runAdditionalChecks(sf) {
        const diagnostics = [];
        const compilation = this.ensureAnalyzed();
        const { extendedTemplateChecker, templateSemanticsChecker, sourceFileValidator } = compilation;
        const files = sf ? [sf] : this.inputProgram.getSourceFiles();
        for (const sf of files) {
            if (sourceFileValidator !== null) {
                const sourceFileDiagnostics = sourceFileValidator.getDiagnosticsForFile(sf);
                if (sourceFileDiagnostics !== null) {
                    diagnostics.push(...sourceFileDiagnostics);
                }
            }
            if (templateSemanticsChecker !== null) {
                diagnostics.push(...compilation.traitCompiler.runAdditionalChecks(sf, (clazz, handler) => {
                    var _a;
                    return ((_a = handler.templateSemanticsCheck) === null || _a === void 0 ? void 0 : _a.call(handler, clazz, templateSemanticsChecker)) || null;
                }));
            }
            if (this.options.strictTemplates && extendedTemplateChecker !== null) {
                diagnostics.push(...compilation.traitCompiler.runAdditionalChecks(sf, (clazz, handler) => {
                    var _a;
                    return ((_a = handler.extendedTemplateCheck) === null || _a === void 0 ? void 0 : _a.call(handler, clazz, extendedTemplateChecker)) || null;
                }));
            }
        }
        return diagnostics;
    }
    makeCompilation() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const isCore = (_a = this.options._isAngularCoreCompilation) !== null && _a !== void 0 ? _a : isAngularCorePackage(this.inputProgram);
        // Note: If this compilation builds `@angular/core`, we always build in full compilation
        // mode. Code inside the core package is always compatible with itself, so it does not
        // make sense to go through the indirection of partial compilation
        let compilationMode = transform_1.CompilationMode.FULL;
        if (!isCore) {
            switch (this.options.compilationMode) {
                case 'full':
                    compilationMode = transform_1.CompilationMode.FULL;
                    break;
                case 'partial':
                    compilationMode = transform_1.CompilationMode.PARTIAL;
                    break;
                case 'experimental-local':
                    compilationMode = transform_1.CompilationMode.LOCAL;
                    break;
            }
        }
        const checker = this.inputProgram.getTypeChecker();
        const reflector = new reflection_1.TypeScriptReflectionHost(checker, compilationMode === transform_1.CompilationMode.LOCAL);
        // Construct the ReferenceEmitter.
        let refEmitter;
        let aliasingHost = null;
        if (this.adapter.unifiedModulesHost === null ||
            (!this.options['_useHostForImportGeneration'] &&
                !this.options['_useHostForImportAndAliasGeneration'])) {
            let localImportStrategy;
            // The strategy used for local, in-project imports depends on whether TS has been configured
            // with rootDirs. If so, then multiple directories may be mapped in the same "module
            // namespace" and the logic of `LogicalProjectStrategy` is required to generate correct
            // imports which may cross these multiple directories. Otherwise, plain relative imports are
            // sufficient.
            if (this.options.rootDirs !== undefined && this.options.rootDirs.length > 0) {
                // rootDirs logic is in effect - use the `LogicalProjectStrategy` for in-project relative
                // imports.
                localImportStrategy = new imports_1.LogicalProjectStrategy(reflector, new file_system_1.LogicalFileSystem([...this.adapter.rootDirs], this.adapter));
            }
            else {
                // Plain relative imports are all that's needed.
                localImportStrategy = new imports_1.RelativePathStrategy(reflector);
            }
            // The CompilerHost doesn't have fileNameToModuleName, so build an NPM-centric reference
            // resolution strategy.
            refEmitter = new imports_1.ReferenceEmitter([
                // First, try to use local identifiers if available.
                new imports_1.LocalIdentifierStrategy(),
                // Next, attempt to use an absolute import.
                new imports_1.AbsoluteModuleStrategy(this.inputProgram, checker, this.moduleResolver, reflector),
                // Finally, check if the reference is being written into a file within the project's .ts
                // sources, and use a relative import if so. If this fails, ReferenceEmitter will throw
                // an error.
                localImportStrategy,
            ]);
            // If an entrypoint is present, then all user imports should be directed through the
            // entrypoint and private exports are not needed. The compiler will validate that all
            // publicly visible directives/pipes are importable via this entrypoint.
            if (this.entryPoint === null && this.options.generateDeepReexports === true) {
                // No entrypoint is present and deep re-exports were requested, so configure the aliasing
                // system to generate them.
                aliasingHost = new imports_1.PrivateExportAliasingHost(reflector);
            }
        }
        else {
            // The CompilerHost supports fileNameToModuleName, so use that to emit imports.
            refEmitter = new imports_1.ReferenceEmitter([
                // First, try to use local identifiers if available.
                new imports_1.LocalIdentifierStrategy(),
                // Then use aliased references (this is a workaround to StrictDeps checks).
                ...(this.options['_useHostForImportAndAliasGeneration'] ? [new imports_1.AliasStrategy()] : []),
                // Then use fileNameToModuleName to emit imports.
                new imports_1.UnifiedModulesStrategy(reflector, this.adapter.unifiedModulesHost),
            ]);
            if (this.options['_useHostForImportAndAliasGeneration']) {
                aliasingHost = new imports_1.UnifiedModulesAliasingHost(this.adapter.unifiedModulesHost);
            }
        }
        const evaluator = new partial_evaluator_1.PartialEvaluator(reflector, checker, this.incrementalCompilation.depGraph);
        const dtsReader = new metadata_1.DtsMetadataReader(checker, reflector);
        const localMetaRegistry = new metadata_1.LocalMetadataRegistry();
        const localMetaReader = localMetaRegistry;
        const depScopeReader = new scope_1.MetadataDtsModuleScopeResolver(dtsReader, aliasingHost);
        const metaReader = new metadata_1.CompoundMetadataReader([localMetaReader, dtsReader]);
        const ngModuleIndex = new ng_module_index_1.NgModuleIndexImpl(metaReader, localMetaReader);
        const ngModuleScopeRegistry = new scope_1.LocalModuleScopeRegistry(localMetaReader, metaReader, depScopeReader, refEmitter, aliasingHost);
        const standaloneScopeReader = new standalone_1.StandaloneComponentScopeReader(metaReader, ngModuleScopeRegistry, depScopeReader);
        const selectorlessScopeReader = new scope_1.SelectorlessComponentScopeReader(metaReader, reflector);
        const scopeReader = new scope_1.CompoundComponentScopeReader([
            ngModuleScopeRegistry,
            selectorlessScopeReader,
            standaloneScopeReader,
        ]);
        const semanticDepGraphUpdater = this.incrementalCompilation.semanticDepGraphUpdater;
        const metaRegistry = new metadata_1.CompoundMetadataRegistry([localMetaRegistry, ngModuleScopeRegistry]);
        const injectableRegistry = new common_1.InjectableClassRegistry(reflector, isCore);
        const hostDirectivesResolver = new metadata_1.HostDirectivesResolver(metaReader);
        const exportedProviderStatusResolver = new metadata_1.ExportedProviderStatusResolver(metaReader);
        const importTracker = new imports_1.ImportedSymbolsTracker();
        const typeCheckScopeRegistry = new scope_1.TypeCheckScopeRegistry(scopeReader, metaReader, hostDirectivesResolver);
        // If a flat module entrypoint was specified, then track references via a `ReferenceGraph` in
        // order to produce proper diagnostics for incorrectly exported directives/pipes/etc. If there
        // is no flat module entrypoint then don't pay the cost of tracking references.
        let referencesRegistry;
        let exportReferenceGraph = null;
        if (this.entryPoint !== null) {
            exportReferenceGraph = new entry_point_1.ReferenceGraph();
            referencesRegistry = new ReferenceGraphAdapter(exportReferenceGraph);
        }
        else {
            referencesRegistry = new annotations_1.NoopReferencesRegistry();
        }
        const dtsTransforms = new transform_1.DtsTransformRegistry();
        const resourceRegistry = new metadata_1.ResourceRegistry();
        const deferredSymbolsTracker = new imports_1.DeferredSymbolTracker(this.inputProgram.getTypeChecker(), (_b = this.options.onlyExplicitDeferDependencyImports) !== null && _b !== void 0 ? _b : false);
        let localCompilationExtraImportsTracker = null;
        if (compilationMode === transform_1.CompilationMode.LOCAL && this.options.generateExtraImportsInLocalMode) {
            localCompilationExtraImportsTracker = new imports_1.LocalCompilationExtraImportsTracker(checker);
        }
        // Cycles are handled in full and local compilation modes by "remote scoping".
        // "Remote scoping" does not work well with tree shaking for libraries.
        // So in partial compilation mode, when building a library, a cycle will cause an error.
        const cycleHandlingStrategy = compilationMode === transform_1.CompilationMode.PARTIAL
            ? 1 /* CycleHandlingStrategy.Error */
            : 0 /* CycleHandlingStrategy.UseRemoteScoping */;
        const strictCtorDeps = this.options.strictInjectionParameters || false;
        const supportJitMode = (_c = this.options['supportJitMode']) !== null && _c !== void 0 ? _c : true;
        const supportTestBed = (_d = this.options['supportTestBed']) !== null && _d !== void 0 ? _d : true;
        const externalRuntimeStyles = (_e = this.options['externalRuntimeStyles']) !== null && _e !== void 0 ? _e : false;
        const typeCheckHostBindings = (_f = this.options.typeCheckHostBindings) !== null && _f !== void 0 ? _f : false;
        // Libraries compiled in partial mode could potentially be used with TestBed within an
        // application. Since this is not known at library compilation time, support is required to
        // prevent potential downstream application testing breakage.
        if (supportTestBed === false && compilationMode === transform_1.CompilationMode.PARTIAL) {
            throw new Error('TestBed support ("supportTestBed" option) cannot be disabled in partial compilation mode.');
        }
        if (supportJitMode === false && compilationMode === transform_1.CompilationMode.PARTIAL) {
            throw new Error('JIT mode support ("supportJitMode" option) cannot be disabled in partial compilation mode.');
        }
        // Currently forbidOrphanComponents depends on the code generated behind ngJitMode flag. Until
        // we come up with a better design for these flags, it is necessary to have the JIT mode in
        // order for forbidOrphanComponents to be able to work properly.
        if (supportJitMode === false && this.options.forbidOrphanComponents) {
            throw new Error('JIT mode support ("supportJitMode" option) cannot be disabled when forbidOrphanComponents is set to true');
        }
        const jitDeclarationRegistry = new common_1.JitDeclarationRegistry();
        // Set up the IvyCompilation, which manages state for the Ivy transformer.
        const handlers = [
            new annotations_1.ComponentDecoratorHandler(reflector, evaluator, metaRegistry, metaReader, scopeReader, this.adapter, ngModuleScopeRegistry, typeCheckScopeRegistry, resourceRegistry, isCore, strictCtorDeps, this.resourceManager, this.adapter.rootDirs, this.options.preserveWhitespaces || false, this.options.i18nUseExternalIds !== false, this.options.enableI18nLegacyMessageIdFormat !== false, this.usePoisonedData, this.options.i18nNormalizeLineEndingsInICUs === true, this.moduleResolver, this.cycleAnalyzer, cycleHandlingStrategy, refEmitter, referencesRegistry, this.incrementalCompilation.depGraph, injectableRegistry, semanticDepGraphUpdater, this.closureCompilerEnabled, this.delegatingPerfRecorder, hostDirectivesResolver, importTracker, supportTestBed, compilationMode, deferredSymbolsTracker, !!this.options.forbidOrphanComponents, this.enableBlockSyntax, this.enableLetSyntax, externalRuntimeStyles, localCompilationExtraImportsTracker, jitDeclarationRegistry, (_g = this.options.i18nPreserveWhitespaceForLegacyExtraction) !== null && _g !== void 0 ? _g : true, !!this.options.strictStandalone, this.enableHmr, this.implicitStandaloneValue, typeCheckHostBindings, this.enableSelectorless),
            // TODO(alxhub): understand why the cast here is necessary (something to do with `null`
            // not being assignable to `unknown` when wrapped in `Readonly`).
            new annotations_1.DirectiveDecoratorHandler(reflector, evaluator, metaRegistry, ngModuleScopeRegistry, metaReader, injectableRegistry, refEmitter, referencesRegistry, isCore, strictCtorDeps, semanticDepGraphUpdater, this.closureCompilerEnabled, this.delegatingPerfRecorder, importTracker, supportTestBed, typeCheckScopeRegistry, compilationMode, jitDeclarationRegistry, resourceRegistry, !!this.options.strictStandalone, this.implicitStandaloneValue, this.usePoisonedData, typeCheckHostBindings),
            // Pipe handler must be before injectable handler in list so pipe factories are printed
            // before injectable factories (so injectable factories can delegate to them)
            new annotations_1.PipeDecoratorHandler(reflector, evaluator, metaRegistry, ngModuleScopeRegistry, injectableRegistry, isCore, this.delegatingPerfRecorder, supportTestBed, compilationMode, !!this.options.generateExtraImportsInLocalMode, !!this.options.strictStandalone, this.implicitStandaloneValue),
            new annotations_1.InjectableDecoratorHandler(reflector, evaluator, isCore, strictCtorDeps, injectableRegistry, this.delegatingPerfRecorder, supportTestBed, compilationMode),
            new annotations_1.NgModuleDecoratorHandler(reflector, evaluator, metaReader, metaRegistry, ngModuleScopeRegistry, referencesRegistry, exportedProviderStatusResolver, semanticDepGraphUpdater, isCore, refEmitter, this.closureCompilerEnabled, (_h = this.options.onlyPublishPublicTypingsForNgModules) !== null && _h !== void 0 ? _h : false, injectableRegistry, this.delegatingPerfRecorder, supportTestBed, supportJitMode, compilationMode, localCompilationExtraImportsTracker, jitDeclarationRegistry),
        ];
        const traitCompiler = new transform_1.TraitCompiler(handlers, reflector, this.delegatingPerfRecorder, this.incrementalCompilation, this.options.compileNonExportedClasses !== false, compilationMode, dtsTransforms, semanticDepGraphUpdater, this.adapter);
        // Template type-checking may use the `ProgramDriver` to produce new `ts.Program`(s). If this
        // happens, they need to be tracked by the `NgCompiler`.
        const notifyingDriver = new NotifyingProgramDriverWrapper(this.programDriver, (program) => {
            this.incrementalStrategy.setIncrementalState(this.incrementalCompilation.state, program);
            this.currentProgram = program;
        });
        const typeCheckingConfig = this.getTypeCheckingConfig();
        const templateTypeChecker = new typecheck_1.TemplateTypeCheckerImpl(this.inputProgram, notifyingDriver, traitCompiler, typeCheckingConfig, refEmitter, reflector, this.adapter, this.incrementalCompilation, metaReader, localMetaReader, ngModuleIndex, scopeReader, typeCheckScopeRegistry, this.delegatingPerfRecorder);
        // Only construct the extended template checker if the configuration is valid and usable.
        const extendedTemplateChecker = this.constructionDiagnostics.length === 0
            ? new extended_1.ExtendedTemplateCheckerImpl(templateTypeChecker, checker, extended_1.ALL_DIAGNOSTIC_FACTORIES, this.options)
            : null;
        const templateSemanticsChecker = this.constructionDiagnostics.length === 0
            ? new template_semantics_checker_1.TemplateSemanticsCheckerImpl(templateTypeChecker)
            : null;
        const sourceFileValidator = this.constructionDiagnostics.length === 0
            ? new validation_1.SourceFileValidator(reflector, importTracker, templateTypeChecker, typeCheckingConfig)
            : null;
        return {
            isCore,
            traitCompiler,
            reflector,
            scopeRegistry: ngModuleScopeRegistry,
            dtsTransforms,
            exportReferenceGraph,
            metaReader,
            typeCheckScopeRegistry,
            aliasingHost,
            refEmitter,
            templateTypeChecker,
            resourceRegistry,
            extendedTemplateChecker,
            localCompilationExtraImportsTracker,
            jitDeclarationRegistry,
            templateSemanticsChecker,
            sourceFileValidator,
            supportJitMode,
        };
    }
}
exports.NgCompiler = NgCompiler;
/**
 * Determine if the given `Program` is @angular/core.
 */
function isAngularCorePackage(program) {
    // Look for its_just_angular.ts somewhere in the program.
    const r3Symbols = getR3SymbolsFile(program);
    if (r3Symbols === null) {
        return false;
    }
    // Look for the constant ITS_JUST_ANGULAR in that file.
    return r3Symbols.statements.some((stmt) => {
        // The statement must be a variable declaration statement.
        if (!typescript_1.default.isVariableStatement(stmt)) {
            return false;
        }
        // It must be exported.
        const modifiers = typescript_1.default.getModifiers(stmt);
        if (modifiers === undefined ||
            !modifiers.some((mod) => mod.kind === typescript_1.default.SyntaxKind.ExportKeyword)) {
            return false;
        }
        // It must declare ITS_JUST_ANGULAR.
        return stmt.declarationList.declarations.some((decl) => {
            // The declaration must match the name.
            if (!typescript_1.default.isIdentifier(decl.name) || decl.name.text !== 'ITS_JUST_ANGULAR') {
                return false;
            }
            // It must initialize the variable to true.
            if (decl.initializer === undefined || decl.initializer.kind !== typescript_1.default.SyntaxKind.TrueKeyword) {
                return false;
            }
            // This definition matches.
            return true;
        });
    });
}
/**
 * Find the 'r3_symbols.ts' file in the given `Program`, or return `null` if it wasn't there.
 */
function getR3SymbolsFile(program) {
    return (program.getSourceFiles().find((file) => file.fileName.indexOf('r3_symbols.ts') >= 0) || null);
}
/**
 * Since "strictTemplates" is a true superset of type checking capabilities compared to
 * "fullTemplateTypeCheck", it is required that the latter is not explicitly disabled if the
 * former is enabled.
 */
function* verifyCompatibleTypeCheckOptions(options) {
    var _a, _b, _c;
    if (options.fullTemplateTypeCheck === false && options.strictTemplates === true) {
        yield makeConfigDiagnostic({
            category: typescript_1.default.DiagnosticCategory.Error,
            code: diagnostics_1.ErrorCode.CONFIG_STRICT_TEMPLATES_IMPLIES_FULL_TEMPLATE_TYPECHECK,
            messageText: `
Angular compiler option "strictTemplates" is enabled, however "fullTemplateTypeCheck" is disabled.

Having the "strictTemplates" flag enabled implies that "fullTemplateTypeCheck" is also enabled, so
the latter can not be explicitly disabled.

One of the following actions is required:
1. Remove the "fullTemplateTypeCheck" option.
2. Remove "strictTemplates" or set it to 'false'.

More information about the template type checking compiler options can be found in the documentation:
https://angular.dev/tools/cli/template-typecheck
      `.trim(),
        });
    }
    if (options.extendedDiagnostics && options.strictTemplates === false) {
        yield makeConfigDiagnostic({
            category: typescript_1.default.DiagnosticCategory.Error,
            code: diagnostics_1.ErrorCode.CONFIG_EXTENDED_DIAGNOSTICS_IMPLIES_STRICT_TEMPLATES,
            messageText: `
Angular compiler option "extendedDiagnostics" is configured, however "strictTemplates" is disabled.

Using "extendedDiagnostics" requires that "strictTemplates" is also enabled.

One of the following actions is required:
1. Remove "strictTemplates: false" to enable it.
2. Remove "extendedDiagnostics" configuration to disable them.
      `.trim(),
        });
    }
    const allowedCategoryLabels = Array.from(Object.values(api_2.DiagnosticCategoryLabel));
    const defaultCategory = (_a = options.extendedDiagnostics) === null || _a === void 0 ? void 0 : _a.defaultCategory;
    if (defaultCategory && !allowedCategoryLabels.includes(defaultCategory)) {
        yield makeConfigDiagnostic({
            category: typescript_1.default.DiagnosticCategory.Error,
            code: diagnostics_1.ErrorCode.CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CATEGORY_LABEL,
            messageText: `
Angular compiler option "extendedDiagnostics.defaultCategory" has an unknown diagnostic category: "${defaultCategory}".

Allowed diagnostic categories are:
${allowedCategoryLabels.join('\n')}
      `.trim(),
        });
    }
    for (const [checkName, category] of Object.entries((_c = (_b = options.extendedDiagnostics) === null || _b === void 0 ? void 0 : _b.checks) !== null && _c !== void 0 ? _c : {})) {
        if (!extended_1.SUPPORTED_DIAGNOSTIC_NAMES.has(checkName)) {
            yield makeConfigDiagnostic({
                category: typescript_1.default.DiagnosticCategory.Error,
                code: diagnostics_1.ErrorCode.CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CHECK,
                messageText: `
Angular compiler option "extendedDiagnostics.checks" has an unknown check: "${checkName}".

Allowed check names are:
${Array.from(extended_1.SUPPORTED_DIAGNOSTIC_NAMES).join('\n')}
        `.trim(),
            });
        }
        if (!allowedCategoryLabels.includes(category)) {
            yield makeConfigDiagnostic({
                category: typescript_1.default.DiagnosticCategory.Error,
                code: diagnostics_1.ErrorCode.CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CATEGORY_LABEL,
                messageText: `
Angular compiler option "extendedDiagnostics.checks['${checkName}']" has an unknown diagnostic category: "${category}".

Allowed diagnostic categories are:
${allowedCategoryLabels.join('\n')}
        `.trim(),
            });
        }
    }
}
function makeConfigDiagnostic({ category, code, messageText, }) {
    return {
        category,
        code: (0, diagnostics_1.ngErrorCode)(code),
        file: undefined,
        start: undefined,
        length: undefined,
        messageText,
    };
}
class ReferenceGraphAdapter {
    constructor(graph) {
        this.graph = graph;
    }
    add(source, ...references) {
        for (const { node } of references) {
            let sourceFile = node.getSourceFile();
            if (sourceFile === undefined) {
                sourceFile = typescript_1.default.getOriginalNode(node).getSourceFile();
            }
            // Only record local references (not references into .d.ts files).
            if (sourceFile === undefined || !(0, typescript_2.isDtsPath)(sourceFile.fileName)) {
                this.graph.add(source, node);
            }
        }
    }
}
class NotifyingProgramDriverWrapper {
    constructor(delegate, notifyNewProgram) {
        var _a;
        this.delegate = delegate;
        this.notifyNewProgram = notifyNewProgram;
        this.getSourceFileVersion = (_a = this.delegate.getSourceFileVersion) === null || _a === void 0 ? void 0 : _a.bind(this);
    }
    get supportsInlineOperations() {
        return this.delegate.supportsInlineOperations;
    }
    getProgram() {
        return this.delegate.getProgram();
    }
    updateFiles(contents, updateMode) {
        this.delegate.updateFiles(contents, updateMode);
        this.notifyNewProgram(this.delegate.getProgram());
    }
}
function versionMapFromProgram(program, driver) {
    if (driver.getSourceFileVersion === undefined) {
        return null;
    }
    const versions = new Map();
    for (const possiblyRedirectedSourceFile of program.getSourceFiles()) {
        const sf = (0, typescript_2.toUnredirectedSourceFile)(possiblyRedirectedSourceFile);
        versions.set((0, file_system_1.absoluteFromSourceFile)(sf), driver.getSourceFileVersion(sf));
    }
    return versions;
}
