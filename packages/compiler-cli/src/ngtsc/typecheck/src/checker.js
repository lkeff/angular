"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateTypeCheckerImpl = void 0;
const compiler_1 = require("@angular/compiler");
const diagnostics_1 = require("../../diagnostics");
const file_system_1 = require("../../file_system");
const imports_1 = require("../../imports");
const metadata_1 = require("../../metadata");
const perf_1 = require("../../perf");
const program_driver_1 = require("../../program_driver");
const reflection_1 = require("../../reflection");
const scope_1 = require("../../scope");
const shims_1 = require("../../shims");
const typescript_1 = require("../../util/src/typescript");
const api_1 = require("../api");
const diagnostics_2 = require("../diagnostics");
const completion_1 = require("./completion");
const context_1 = require("./context");
const diagnostics_3 = require("./diagnostics");
const shim_1 = require("./shim");
const source_1 = require("./source");
const tcb_util_1 = require("./tcb_util");
const template_symbol_builder_1 = require("./template_symbol_builder");
const REGISTRY = new compiler_1.DomElementSchemaRegistry();
/**
 * Primary template type-checking engine, which performs type-checking using a
 * `TypeCheckingProgramStrategy` for type-checking program maintenance, and the
 * `ProgramTypeCheckAdapter` for generation of template type-checking code.
 */
class TemplateTypeCheckerImpl {
    constructor(originalProgram, programDriver, typeCheckAdapter, config, refEmitter, reflector, compilerHost, priorBuild, metaReader, localMetaReader, ngModuleIndex, componentScopeReader, typeCheckScopeRegistry, perf) {
        this.originalProgram = originalProgram;
        this.programDriver = programDriver;
        this.typeCheckAdapter = typeCheckAdapter;
        this.config = config;
        this.refEmitter = refEmitter;
        this.reflector = reflector;
        this.compilerHost = compilerHost;
        this.priorBuild = priorBuild;
        this.metaReader = metaReader;
        this.localMetaReader = localMetaReader;
        this.ngModuleIndex = ngModuleIndex;
        this.componentScopeReader = componentScopeReader;
        this.typeCheckScopeRegistry = typeCheckScopeRegistry;
        this.perf = perf;
        this.state = new Map();
        /**
         * Stores the `CompletionEngine` which powers autocompletion for each component class.
         *
         * Must be invalidated whenever the component's template or the `ts.Program` changes. Invalidation
         * on template changes is performed within this `TemplateTypeCheckerImpl` instance. When the
         * `ts.Program` changes, the `TemplateTypeCheckerImpl` as a whole is destroyed and replaced.
         */
        this.completionCache = new Map();
        /**
         * Stores the `SymbolBuilder` which creates symbols for each component class.
         *
         * Must be invalidated whenever the component's template or the `ts.Program` changes. Invalidation
         * on template changes is performed within this `TemplateTypeCheckerImpl` instance. When the
         * `ts.Program` changes, the `TemplateTypeCheckerImpl` as a whole is destroyed and replaced.
         */
        this.symbolBuilderCache = new Map();
        /**
         * Stores directives and pipes that are in scope for each component.
         *
         * Unlike other caches, the scope of a component is not affected by its template. It will be
         * destroyed when the `ts.Program` changes and the `TemplateTypeCheckerImpl` as a whole is
         * destroyed and replaced.
         */
        this.scopeCache = new Map();
        /**
         * Stores potential element tags for each component (a union of DOM tags as well as directive
         * tags).
         *
         * Unlike other caches, the scope of a component is not affected by its template. It will be
         * destroyed when the `ts.Program` changes and the `TemplateTypeCheckerImpl` as a whole is
         * destroyed and replaced.
         */
        this.elementTagCache = new Map();
        this.isComplete = false;
    }
    getTemplate(component, optimizeFor) {
        var _a;
        const { data } = this.getLatestComponentState(component, optimizeFor);
        return (_a = data === null || data === void 0 ? void 0 : data.template) !== null && _a !== void 0 ? _a : null;
    }
    getHostElement(directive, optimizeFor) {
        var _a;
        const { data } = this.getLatestComponentState(directive, optimizeFor);
        return (_a = data === null || data === void 0 ? void 0 : data.hostElement) !== null && _a !== void 0 ? _a : null;
    }
    getUsedDirectives(component) {
        var _a, _b;
        return (_b = (_a = this.getLatestComponentState(component).data) === null || _a === void 0 ? void 0 : _a.boundTarget.getUsedDirectives()) !== null && _b !== void 0 ? _b : null;
    }
    getUsedPipes(component) {
        var _a, _b;
        return (_b = (_a = this.getLatestComponentState(component).data) === null || _a === void 0 ? void 0 : _a.boundTarget.getUsedPipes()) !== null && _b !== void 0 ? _b : null;
    }
    getLatestComponentState(component, optimizeFor = api_1.OptimizeFor.SingleFile) {
        switch (optimizeFor) {
            case api_1.OptimizeFor.WholeProgram:
                this.ensureAllShimsForAllFiles();
                break;
            case api_1.OptimizeFor.SingleFile:
                this.ensureShimForComponent(component);
                break;
        }
        const sf = component.getSourceFile();
        const sfPath = (0, file_system_1.absoluteFromSourceFile)(sf);
        const shimPath = shim_1.TypeCheckShimGenerator.shimFor(sfPath);
        const fileRecord = this.getFileData(sfPath);
        if (!fileRecord.shimData.has(shimPath)) {
            return { data: null, tcb: null, tcbPath: shimPath, tcbIsShim: true };
        }
        const id = fileRecord.sourceManager.getTypeCheckId(component);
        const shimRecord = fileRecord.shimData.get(shimPath);
        const program = this.programDriver.getProgram();
        const shimSf = (0, typescript_1.getSourceFileOrNull)(program, shimPath);
        if (shimSf === null || !fileRecord.shimData.has(shimPath)) {
            throw new Error(`Error: no shim file in program: ${shimPath}`);
        }
        let tcb = (0, tcb_util_1.findTypeCheckBlock)(shimSf, id, /*isDiagnosticsRequest*/ false);
        let tcbPath = shimPath;
        if (tcb === null) {
            // Try for an inline block.
            const inlineSf = (0, file_system_1.getSourceFileOrError)(program, sfPath);
            tcb = (0, tcb_util_1.findTypeCheckBlock)(inlineSf, id, /*isDiagnosticsRequest*/ false);
            if (tcb !== null) {
                tcbPath = sfPath;
            }
        }
        let data = null;
        if (shimRecord.data.has(id)) {
            data = shimRecord.data.get(id);
        }
        return { data, tcb, tcbPath, tcbIsShim: tcbPath === shimPath };
    }
    isTrackedTypeCheckFile(filePath) {
        return this.getFileAndShimRecordsForPath(filePath) !== null;
    }
    getFileRecordForTcbLocation({ tcbPath, isShimFile, }) {
        if (!isShimFile) {
            // The location is not within a shim file but corresponds with an inline TCB in an original
            // source file; we can obtain the record directly by its path.
            if (this.state.has(tcbPath)) {
                return this.state.get(tcbPath);
            }
            else {
                return null;
            }
        }
        // The location is within a type-checking shim file; find the type-checking data that owns this
        // shim path.
        const records = this.getFileAndShimRecordsForPath(tcbPath);
        if (records !== null) {
            return records.fileRecord;
        }
        else {
            return null;
        }
    }
    getFileAndShimRecordsForPath(shimPath) {
        for (const fileRecord of this.state.values()) {
            if (fileRecord.shimData.has(shimPath)) {
                return { fileRecord, shimRecord: fileRecord.shimData.get(shimPath) };
            }
        }
        return null;
    }
    getSourceMappingAtTcbLocation(tcbLocation) {
        const fileRecord = this.getFileRecordForTcbLocation(tcbLocation);
        if (fileRecord === null) {
            return null;
        }
        const shimSf = this.programDriver.getProgram().getSourceFile(tcbLocation.tcbPath);
        if (shimSf === undefined) {
            return null;
        }
        return (0, tcb_util_1.getSourceMapping)(shimSf, tcbLocation.positionInFile, fileRecord.sourceManager, 
        /*isDiagnosticsRequest*/ false);
    }
    generateAllTypeCheckBlocks() {
        this.ensureAllShimsForAllFiles();
    }
    /**
     * Retrieve type-checking and template parse diagnostics from the given `ts.SourceFile` using the
     * most recent type-checking program.
     */
    getDiagnosticsForFile(sf, optimizeFor) {
        switch (optimizeFor) {
            case api_1.OptimizeFor.WholeProgram:
                this.ensureAllShimsForAllFiles();
                break;
            case api_1.OptimizeFor.SingleFile:
                this.ensureAllShimsForOneFile(sf);
                break;
        }
        return this.perf.inPhase(perf_1.PerfPhase.TtcDiagnostics, () => {
            const sfPath = (0, file_system_1.absoluteFromSourceFile)(sf);
            const fileRecord = this.state.get(sfPath);
            const typeCheckProgram = this.programDriver.getProgram();
            const diagnostics = [];
            if (fileRecord.hasInlines) {
                const inlineSf = (0, file_system_1.getSourceFileOrError)(typeCheckProgram, sfPath);
                diagnostics.push(...typeCheckProgram
                    .getSemanticDiagnostics(inlineSf)
                    .map((diag) => convertDiagnostic(diag, fileRecord.sourceManager)));
            }
            for (const [shimPath, shimRecord] of fileRecord.shimData) {
                const shimSf = (0, file_system_1.getSourceFileOrError)(typeCheckProgram, shimPath);
                diagnostics.push(...typeCheckProgram
                    .getSemanticDiagnostics(shimSf)
                    .map((diag) => convertDiagnostic(diag, fileRecord.sourceManager)));
                diagnostics.push(...shimRecord.genesisDiagnostics);
                for (const templateData of shimRecord.data.values()) {
                    diagnostics.push(...templateData.templateParsingDiagnostics);
                }
            }
            return diagnostics.filter((diag) => diag !== null);
        });
    }
    getDiagnosticsForComponent(component) {
        this.ensureShimForComponent(component);
        return this.perf.inPhase(perf_1.PerfPhase.TtcDiagnostics, () => {
            const sf = component.getSourceFile();
            const sfPath = (0, file_system_1.absoluteFromSourceFile)(sf);
            const shimPath = shim_1.TypeCheckShimGenerator.shimFor(sfPath);
            const fileRecord = this.getFileData(sfPath);
            if (!fileRecord.shimData.has(shimPath)) {
                return [];
            }
            const id = fileRecord.sourceManager.getTypeCheckId(component);
            const shimRecord = fileRecord.shimData.get(shimPath);
            const typeCheckProgram = this.programDriver.getProgram();
            const diagnostics = [];
            if (shimRecord.hasInlines) {
                const inlineSf = (0, file_system_1.getSourceFileOrError)(typeCheckProgram, sfPath);
                diagnostics.push(...typeCheckProgram
                    .getSemanticDiagnostics(inlineSf)
                    .map((diag) => convertDiagnostic(diag, fileRecord.sourceManager)));
            }
            const shimSf = (0, file_system_1.getSourceFileOrError)(typeCheckProgram, shimPath);
            diagnostics.push(...typeCheckProgram
                .getSemanticDiagnostics(shimSf)
                .map((diag) => convertDiagnostic(diag, fileRecord.sourceManager)));
            diagnostics.push(...shimRecord.genesisDiagnostics);
            for (const templateData of shimRecord.data.values()) {
                diagnostics.push(...templateData.templateParsingDiagnostics);
            }
            return diagnostics.filter((diag) => diag !== null && diag.typeCheckId === id);
        });
    }
    getTypeCheckBlock(component) {
        return this.getLatestComponentState(component).tcb;
    }
    getGlobalCompletions(context, component, node) {
        const engine = this.getOrCreateCompletionEngine(component);
        if (engine === null) {
            return null;
        }
        return this.perf.inPhase(perf_1.PerfPhase.TtcAutocompletion, () => engine.getGlobalCompletions(context, node));
    }
    getExpressionCompletionLocation(ast, component) {
        const engine = this.getOrCreateCompletionEngine(component);
        if (engine === null) {
            return null;
        }
        return this.perf.inPhase(perf_1.PerfPhase.TtcAutocompletion, () => engine.getExpressionCompletionLocation(ast));
    }
    getLiteralCompletionLocation(node, component) {
        const engine = this.getOrCreateCompletionEngine(component);
        if (engine === null) {
            return null;
        }
        return this.perf.inPhase(perf_1.PerfPhase.TtcAutocompletion, () => engine.getLiteralCompletionLocation(node));
    }
    invalidateClass(clazz) {
        this.completionCache.delete(clazz);
        this.symbolBuilderCache.delete(clazz);
        this.scopeCache.delete(clazz);
        this.elementTagCache.delete(clazz);
        const sf = clazz.getSourceFile();
        const sfPath = (0, file_system_1.absoluteFromSourceFile)(sf);
        const shimPath = shim_1.TypeCheckShimGenerator.shimFor(sfPath);
        const fileData = this.getFileData(sfPath);
        const id = fileData.sourceManager.getTypeCheckId(clazz);
        fileData.shimData.delete(shimPath);
        fileData.isComplete = false;
        this.isComplete = false;
    }
    getExpressionTarget(expression, clazz) {
        var _a, _b;
        return ((_b = (_a = this.getLatestComponentState(clazz).data) === null || _a === void 0 ? void 0 : _a.boundTarget.getExpressionTarget(expression)) !== null && _b !== void 0 ? _b : null);
    }
    makeTemplateDiagnostic(clazz, sourceSpan, category, errorCode, message, relatedInformation) {
        const sfPath = (0, file_system_1.absoluteFromSourceFile)(clazz.getSourceFile());
        const fileRecord = this.state.get(sfPath);
        const id = fileRecord.sourceManager.getTypeCheckId(clazz);
        const mapping = fileRecord.sourceManager.getTemplateSourceMapping(id);
        return Object.assign(Object.assign({}, (0, diagnostics_2.makeTemplateDiagnostic)(id, mapping, sourceSpan, category, (0, diagnostics_1.ngErrorCode)(errorCode), message, relatedInformation)), { __ngCode: errorCode });
    }
    getOrCreateCompletionEngine(component) {
        if (this.completionCache.has(component)) {
            return this.completionCache.get(component);
        }
        const { tcb, data, tcbPath, tcbIsShim } = this.getLatestComponentState(component);
        if (tcb === null || data === null) {
            return null;
        }
        const engine = new completion_1.CompletionEngine(tcb, data, tcbPath, tcbIsShim);
        this.completionCache.set(component, engine);
        return engine;
    }
    maybeAdoptPriorResultsForFile(sf) {
        const sfPath = (0, file_system_1.absoluteFromSourceFile)(sf);
        if (this.state.has(sfPath)) {
            const existingResults = this.state.get(sfPath);
            if (existingResults.isComplete) {
                // All data for this file has already been generated, so no need to adopt anything.
                return;
            }
        }
        const previousResults = this.priorBuild.priorTypeCheckingResultsFor(sf);
        if (previousResults === null || !previousResults.isComplete) {
            return;
        }
        this.perf.eventCount(perf_1.PerfEvent.ReuseTypeCheckFile);
        this.state.set(sfPath, previousResults);
    }
    ensureAllShimsForAllFiles() {
        if (this.isComplete) {
            return;
        }
        this.perf.inPhase(perf_1.PerfPhase.TcbGeneration, () => {
            const host = new WholeProgramTypeCheckingHost(this);
            const ctx = this.newContext(host);
            for (const sf of this.originalProgram.getSourceFiles()) {
                if (sf.isDeclarationFile || (0, shims_1.isShim)(sf)) {
                    continue;
                }
                this.maybeAdoptPriorResultsForFile(sf);
                const sfPath = (0, file_system_1.absoluteFromSourceFile)(sf);
                const fileData = this.getFileData(sfPath);
                if (fileData.isComplete) {
                    continue;
                }
                this.typeCheckAdapter.typeCheck(sf, ctx);
                fileData.isComplete = true;
            }
            this.updateFromContext(ctx);
            this.isComplete = true;
        });
    }
    ensureAllShimsForOneFile(sf) {
        this.perf.inPhase(perf_1.PerfPhase.TcbGeneration, () => {
            this.maybeAdoptPriorResultsForFile(sf);
            const sfPath = (0, file_system_1.absoluteFromSourceFile)(sf);
            const fileData = this.getFileData(sfPath);
            if (fileData.isComplete) {
                // All data for this file is present and accounted for already.
                return;
            }
            const host = new SingleFileTypeCheckingHost(sfPath, fileData, this);
            const ctx = this.newContext(host);
            this.typeCheckAdapter.typeCheck(sf, ctx);
            fileData.isComplete = true;
            this.updateFromContext(ctx);
        });
    }
    ensureShimForComponent(component) {
        const sf = component.getSourceFile();
        const sfPath = (0, file_system_1.absoluteFromSourceFile)(sf);
        const shimPath = shim_1.TypeCheckShimGenerator.shimFor(sfPath);
        this.maybeAdoptPriorResultsForFile(sf);
        const fileData = this.getFileData(sfPath);
        if (fileData.shimData.has(shimPath)) {
            // All data for this component is available.
            return;
        }
        const host = new SingleShimTypeCheckingHost(sfPath, fileData, this, shimPath);
        const ctx = this.newContext(host);
        this.typeCheckAdapter.typeCheck(sf, ctx);
        this.updateFromContext(ctx);
    }
    newContext(host) {
        const inlining = this.programDriver.supportsInlineOperations
            ? context_1.InliningMode.InlineOps
            : context_1.InliningMode.Error;
        return new context_1.TypeCheckContextImpl(this.config, this.compilerHost, this.refEmitter, this.reflector, host, inlining, this.perf);
    }
    /**
     * Remove any shim data that depends on inline operations applied to the type-checking program.
     *
     * This can be useful if new inlines need to be applied, and it's not possible to guarantee that
     * they won't overwrite or corrupt existing inlines that are used by such shims.
     */
    clearAllShimDataUsingInlines() {
        for (const fileData of this.state.values()) {
            if (!fileData.hasInlines) {
                continue;
            }
            for (const [shimFile, shimData] of fileData.shimData.entries()) {
                if (shimData.hasInlines) {
                    fileData.shimData.delete(shimFile);
                }
            }
            fileData.hasInlines = false;
            fileData.isComplete = false;
            this.isComplete = false;
        }
    }
    updateFromContext(ctx) {
        const updates = ctx.finalize();
        return this.perf.inPhase(perf_1.PerfPhase.TcbUpdateProgram, () => {
            if (updates.size > 0) {
                this.perf.eventCount(perf_1.PerfEvent.UpdateTypeCheckProgram);
            }
            this.programDriver.updateFiles(updates, program_driver_1.UpdateMode.Incremental);
            this.priorBuild.recordSuccessfulTypeCheck(this.state);
            this.perf.memory(perf_1.PerfCheckpoint.TtcUpdateProgram);
        });
    }
    getFileData(path) {
        if (!this.state.has(path)) {
            this.state.set(path, {
                hasInlines: false,
                sourceManager: new source_1.DirectiveSourceManager(),
                isComplete: false,
                shimData: new Map(),
            });
        }
        return this.state.get(path);
    }
    getSymbolOfNode(node, component) {
        const builder = this.getOrCreateSymbolBuilder(component);
        if (builder === null) {
            return null;
        }
        return this.perf.inPhase(perf_1.PerfPhase.TtcSymbol, () => builder.getSymbol(node));
    }
    getOrCreateSymbolBuilder(component) {
        if (this.symbolBuilderCache.has(component)) {
            return this.symbolBuilderCache.get(component);
        }
        const { tcb, data, tcbPath, tcbIsShim } = this.getLatestComponentState(component);
        if (tcb === null || data === null) {
            return null;
        }
        const builder = new template_symbol_builder_1.SymbolBuilder(tcbPath, tcbIsShim, tcb, data, this.componentScopeReader, () => this.programDriver.getProgram().getTypeChecker());
        this.symbolBuilderCache.set(component, builder);
        return builder;
    }
    getPotentialTemplateDirectives(component) {
        var _a, _b;
        const scope = this.getComponentScope(component);
        // Don't resolve directives for selectorless components since they're already in the file.
        if ((scope === null || scope === void 0 ? void 0 : scope.kind) === scope_1.ComponentScopeKind.Selectorless) {
            return [];
        }
        const typeChecker = this.programDriver.getProgram().getTypeChecker();
        const resultingDirectives = new Map();
        if (scope !== null) {
            const inScopeDirectives = (_b = (_a = this.getScopeData(component, scope)) === null || _a === void 0 ? void 0 : _a.directives) !== null && _b !== void 0 ? _b : [];
            // First, all in scope directives can be used.
            for (const d of inScopeDirectives) {
                resultingDirectives.set(d.ref.node, d);
            }
        }
        // Any additional directives found from the global registry can be used, but are not in scope.
        // In the future, we can also walk other registries for .d.ts files, or traverse the
        // import/export graph.
        for (const directiveClass of this.localMetaReader.getKnown(metadata_1.MetaKind.Directive)) {
            const directiveMeta = this.metaReader.getDirectiveMetadata(new imports_1.Reference(directiveClass));
            if (directiveMeta === null)
                continue;
            if (resultingDirectives.has(directiveClass))
                continue;
            const withScope = this.scopeDataOfDirectiveMeta(typeChecker, directiveMeta);
            if (withScope === null)
                continue;
            resultingDirectives.set(directiveClass, Object.assign(Object.assign({}, withScope), { isInScope: false }));
        }
        return Array.from(resultingDirectives.values());
    }
    getPotentialPipes(component) {
        var _a, _b;
        const scope = this.getComponentScope(component);
        // Don't resolve pipes for selectorless components since they're already in the file.
        if ((scope === null || scope === void 0 ? void 0 : scope.kind) === scope_1.ComponentScopeKind.Selectorless) {
            return [];
        }
        // Very similar to the above `getPotentialTemplateDirectives`, but on pipes.
        const typeChecker = this.programDriver.getProgram().getTypeChecker();
        const resultingPipes = new Map();
        if (scope !== null) {
            const inScopePipes = (_b = (_a = this.getScopeData(component, scope)) === null || _a === void 0 ? void 0 : _a.pipes) !== null && _b !== void 0 ? _b : [];
            for (const p of inScopePipes) {
                resultingPipes.set(p.ref.node, p);
            }
        }
        for (const pipeClass of this.localMetaReader.getKnown(metadata_1.MetaKind.Pipe)) {
            const pipeMeta = this.metaReader.getPipeMetadata(new imports_1.Reference(pipeClass));
            if (pipeMeta === null)
                continue;
            if (resultingPipes.has(pipeClass))
                continue;
            const withScope = this.scopeDataOfPipeMeta(typeChecker, pipeMeta);
            if (withScope === null)
                continue;
            resultingPipes.set(pipeClass, Object.assign(Object.assign({}, withScope), { isInScope: false }));
        }
        return Array.from(resultingPipes.values());
    }
    getDirectiveMetadata(dir) {
        if (!(0, reflection_1.isNamedClassDeclaration)(dir)) {
            return null;
        }
        return this.typeCheckScopeRegistry.getTypeCheckDirectiveMetadata(new imports_1.Reference(dir));
    }
    getNgModuleMetadata(module) {
        if (!(0, reflection_1.isNamedClassDeclaration)(module)) {
            return null;
        }
        return this.metaReader.getNgModuleMetadata(new imports_1.Reference(module));
    }
    getPipeMetadata(pipe) {
        if (!(0, reflection_1.isNamedClassDeclaration)(pipe)) {
            return null;
        }
        return this.metaReader.getPipeMetadata(new imports_1.Reference(pipe));
    }
    getPotentialElementTags(component) {
        if (this.elementTagCache.has(component)) {
            return this.elementTagCache.get(component);
        }
        const tagMap = new Map();
        for (const tag of REGISTRY.allKnownElementNames()) {
            tagMap.set(tag, null);
        }
        const potentialDirectives = this.getPotentialTemplateDirectives(component);
        for (const directive of potentialDirectives) {
            if (directive.selector === null) {
                continue;
            }
            for (const selector of compiler_1.CssSelector.parse(directive.selector)) {
                if (selector.element === null || tagMap.has(selector.element)) {
                    // Skip this directive if it doesn't match an element tag, or if another directive has
                    // already been included with the same element name.
                    continue;
                }
                tagMap.set(selector.element, directive);
            }
        }
        this.elementTagCache.set(component, tagMap);
        return tagMap;
    }
    getPotentialDomBindings(tagName) {
        const attributes = REGISTRY.allKnownAttributesOfElement(tagName);
        return attributes.map((attribute) => ({
            attribute,
            property: REGISTRY.getMappedPropName(attribute),
        }));
    }
    getPotentialDomEvents(tagName) {
        return REGISTRY.allKnownEventsOfElement(tagName);
    }
    getPrimaryAngularDecorator(target) {
        this.ensureAllShimsForOneFile(target.getSourceFile());
        if (!(0, reflection_1.isNamedClassDeclaration)(target)) {
            return null;
        }
        const ref = new imports_1.Reference(target);
        const dirMeta = this.metaReader.getDirectiveMetadata(ref);
        if (dirMeta !== null) {
            return dirMeta.decorator;
        }
        const pipeMeta = this.metaReader.getPipeMetadata(ref);
        if (pipeMeta !== null) {
            return pipeMeta.decorator;
        }
        const ngModuleMeta = this.metaReader.getNgModuleMetadata(ref);
        if (ngModuleMeta !== null) {
            return ngModuleMeta.decorator;
        }
        return null;
    }
    getOwningNgModule(component) {
        if (!(0, reflection_1.isNamedClassDeclaration)(component)) {
            return null;
        }
        const dirMeta = this.metaReader.getDirectiveMetadata(new imports_1.Reference(component));
        if (dirMeta !== null && dirMeta.isStandalone) {
            return null;
        }
        const scope = this.componentScopeReader.getScopeForComponent(component);
        if (scope === null ||
            scope.kind !== scope_1.ComponentScopeKind.NgModule ||
            !(0, reflection_1.isNamedClassDeclaration)(scope.ngModule)) {
            return null;
        }
        return scope.ngModule;
    }
    emit(kind, refTo, inContext) {
        var _a, _b;
        const emittedRef = this.refEmitter.emit(refTo, inContext.getSourceFile());
        if (emittedRef.kind === imports_1.ReferenceEmitKind.Failed) {
            return null;
        }
        const emitted = emittedRef.expression;
        if (emitted instanceof compiler_1.WrappedNodeExpr) {
            if (refTo.node === inContext) {
                // Suppress self-imports since components do not have to import themselves.
                return null;
            }
            let isForwardReference = false;
            if (emitted.node.getStart() > inContext.getStart()) {
                const declaration = (_b = (_a = this.programDriver
                    .getProgram()
                    .getTypeChecker()
                    .getTypeAtLocation(emitted.node)
                    .getSymbol()) === null || _a === void 0 ? void 0 : _a.declarations) === null || _b === void 0 ? void 0 : _b[0];
                if (declaration && declaration.getSourceFile() === inContext.getSourceFile()) {
                    isForwardReference = true;
                }
            }
            // An appropriate identifier is already in scope.
            return { kind, symbolName: emitted.node.text, isForwardReference };
        }
        else if (emitted instanceof compiler_1.ExternalExpr &&
            emitted.value.moduleName !== null &&
            emitted.value.name !== null) {
            return {
                kind,
                moduleSpecifier: emitted.value.moduleName,
                symbolName: emitted.value.name,
                isForwardReference: false,
            };
        }
        return null;
    }
    getPotentialImportsFor(toImport, inContext, importMode) {
        var _a;
        const imports = [];
        const meta = (_a = this.metaReader.getDirectiveMetadata(toImport)) !== null && _a !== void 0 ? _a : this.metaReader.getPipeMetadata(toImport);
        if (meta === null) {
            return imports;
        }
        if (meta.isStandalone || importMode === api_1.PotentialImportMode.ForceDirect) {
            const emitted = this.emit(api_1.PotentialImportKind.Standalone, toImport, inContext);
            if (emitted !== null) {
                imports.push(emitted);
            }
        }
        const exportingNgModules = this.ngModuleIndex.getNgModulesExporting(meta.ref.node);
        if (exportingNgModules !== null) {
            for (const exporter of exportingNgModules) {
                const emittedRef = this.emit(api_1.PotentialImportKind.NgModule, exporter, inContext);
                if (emittedRef !== null) {
                    imports.push(emittedRef);
                }
            }
        }
        return imports;
    }
    getComponentScope(component) {
        if (!(0, reflection_1.isNamedClassDeclaration)(component)) {
            throw new Error(`AssertionError: components must have names`);
        }
        return this.componentScopeReader.getScopeForComponent(component);
    }
    getScopeData(component, scope) {
        if (this.scopeCache.has(component)) {
            return this.scopeCache.get(component);
        }
        const dependencies = scope.kind === scope_1.ComponentScopeKind.NgModule
            ? scope.compilation.dependencies
            : scope.dependencies;
        const data = {
            directives: [],
            pipes: [],
            isPoisoned: scope.kind === scope_1.ComponentScopeKind.NgModule
                ? scope.compilation.isPoisoned
                : scope.isPoisoned,
        };
        const typeChecker = this.programDriver.getProgram().getTypeChecker();
        for (const dep of dependencies) {
            if (dep.kind === metadata_1.MetaKind.Directive) {
                const dirScope = this.scopeDataOfDirectiveMeta(typeChecker, dep);
                if (dirScope === null)
                    continue;
                data.directives.push(Object.assign(Object.assign({}, dirScope), { isInScope: true }));
            }
            else if (dep.kind === metadata_1.MetaKind.Pipe) {
                const pipeScope = this.scopeDataOfPipeMeta(typeChecker, dep);
                if (pipeScope === null)
                    continue;
                data.pipes.push(Object.assign(Object.assign({}, pipeScope), { isInScope: true }));
            }
        }
        this.scopeCache.set(component, data);
        return data;
    }
    scopeDataOfDirectiveMeta(typeChecker, dep) {
        if (dep.selector === null) {
            // Skip this directive, it can't be added to a template anyway.
            return null;
        }
        const tsSymbol = typeChecker.getSymbolAtLocation(dep.ref.node.name);
        if (!(0, typescript_1.isSymbolWithValueDeclaration)(tsSymbol)) {
            return null;
        }
        let ngModule = null;
        const moduleScopeOfDir = this.componentScopeReader.getScopeForComponent(dep.ref.node);
        if (moduleScopeOfDir !== null && moduleScopeOfDir.kind === scope_1.ComponentScopeKind.NgModule) {
            ngModule = moduleScopeOfDir.ngModule;
        }
        return {
            ref: dep.ref,
            isComponent: dep.isComponent,
            isStructural: dep.isStructural,
            selector: dep.selector,
            tsSymbol,
            ngModule,
        };
    }
    scopeDataOfPipeMeta(typeChecker, dep) {
        const tsSymbol = typeChecker.getSymbolAtLocation(dep.ref.node.name);
        if (tsSymbol === undefined) {
            return null;
        }
        return {
            ref: dep.ref,
            name: dep.name,
            tsSymbol,
        };
    }
}
exports.TemplateTypeCheckerImpl = TemplateTypeCheckerImpl;
function convertDiagnostic(diag, sourceResolver) {
    if (!(0, diagnostics_3.shouldReportDiagnostic)(diag)) {
        return null;
    }
    return (0, diagnostics_3.translateDiagnostic)(diag, sourceResolver);
}
/**
 * Drives a `TypeCheckContext` to generate type-checking code for every component in the program.
 */
class WholeProgramTypeCheckingHost {
    constructor(impl) {
        this.impl = impl;
    }
    getSourceManager(sfPath) {
        return this.impl.getFileData(sfPath).sourceManager;
    }
    shouldCheckClass(node) {
        const sfPath = (0, file_system_1.absoluteFromSourceFile)(node.getSourceFile());
        const shimPath = shim_1.TypeCheckShimGenerator.shimFor(sfPath);
        const fileData = this.impl.getFileData(sfPath);
        // The component needs to be checked unless the shim which would contain it already exists.
        return !fileData.shimData.has(shimPath);
    }
    recordShimData(sfPath, data) {
        const fileData = this.impl.getFileData(sfPath);
        fileData.shimData.set(data.path, data);
        if (data.hasInlines) {
            fileData.hasInlines = true;
        }
    }
    recordComplete(sfPath) {
        this.impl.getFileData(sfPath).isComplete = true;
    }
}
/**
 * Drives a `TypeCheckContext` to generate type-checking code efficiently for a single input file.
 */
class SingleFileTypeCheckingHost {
    constructor(sfPath, fileData, impl) {
        this.sfPath = sfPath;
        this.fileData = fileData;
        this.impl = impl;
        this.seenInlines = false;
    }
    assertPath(sfPath) {
        if (this.sfPath !== sfPath) {
            throw new Error(`AssertionError: querying TypeCheckingHost outside of assigned file`);
        }
    }
    getSourceManager(sfPath) {
        this.assertPath(sfPath);
        return this.fileData.sourceManager;
    }
    shouldCheckClass(node) {
        if (this.sfPath !== (0, file_system_1.absoluteFromSourceFile)(node.getSourceFile())) {
            return false;
        }
        const shimPath = shim_1.TypeCheckShimGenerator.shimFor(this.sfPath);
        // Only need to generate a TCB for the class if no shim exists for it currently.
        return !this.fileData.shimData.has(shimPath);
    }
    recordShimData(sfPath, data) {
        this.assertPath(sfPath);
        // Previous type-checking state may have required the use of inlines (assuming they were
        // supported). If the current operation also requires inlines, this presents a problem:
        // generating new inlines may invalidate any old inlines that old state depends on.
        //
        // Rather than resolve this issue by tracking specific dependencies on inlines, if the new state
        // relies on inlines, any old state that relied on them is simply cleared. This happens when the
        // first new state that uses inlines is encountered.
        if (data.hasInlines && !this.seenInlines) {
            this.impl.clearAllShimDataUsingInlines();
            this.seenInlines = true;
        }
        this.fileData.shimData.set(data.path, data);
        if (data.hasInlines) {
            this.fileData.hasInlines = true;
        }
    }
    recordComplete(sfPath) {
        this.assertPath(sfPath);
        this.fileData.isComplete = true;
    }
}
/**
 * Drives a `TypeCheckContext` to generate type-checking code efficiently for only those components
 * which map to a single shim of a single input file.
 */
class SingleShimTypeCheckingHost extends SingleFileTypeCheckingHost {
    constructor(sfPath, fileData, impl, shimPath) {
        super(sfPath, fileData, impl);
        this.shimPath = shimPath;
    }
    shouldCheckNode(node) {
        if (this.sfPath !== (0, file_system_1.absoluteFromSourceFile)(node.getSourceFile())) {
            return false;
        }
        // Only generate a TCB for the component if it maps to the requested shim file.
        const shimPath = shim_1.TypeCheckShimGenerator.shimFor(this.sfPath);
        if (shimPath !== this.shimPath) {
            return false;
        }
        // Only need to generate a TCB for the class if no shim exists for it currently.
        return !this.fileData.shimData.has(shimPath);
    }
}
