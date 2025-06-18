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
exports.NgModuleDecoratorHandler = exports.NgModuleSymbol = void 0;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../diagnostics");
const imports_1 = require("../../../imports");
const semantic_graph_1 = require("../../../incremental/semantic_graph");
const metadata_1 = require("../../../metadata");
const partial_evaluator_1 = require("../../../partial_evaluator");
const perf_1 = require("../../../perf");
const reflection_1 = require("../../../reflection");
const util_1 = require("../../../scope/src/util");
const transform_1 = require("../../../transform");
const typescript_2 = require("../../../util/src/typescript");
const common_1 = require("../../common");
const module_with_providers_1 = require("./module_with_providers");
/**
 * Represents an Angular NgModule.
 */
class NgModuleSymbol extends semantic_graph_1.SemanticSymbol {
    constructor(decl, hasProviders) {
        super(decl);
        this.hasProviders = hasProviders;
        this.remotelyScopedComponents = [];
        /**
         * `SemanticSymbol`s of the transitive imports of this NgModule which came from imported
         * standalone components.
         *
         * Standalone components are excluded/included in the `InjectorDef` emit output of the NgModule
         * based on whether the compiler can prove that their transitive imports may contain exported
         * providers, so a change in this set of symbols may affect the compilation output of this
         * NgModule.
         */
        this.transitiveImportsFromStandaloneComponents = new Set();
    }
    isPublicApiAffected(previousSymbol) {
        if (!(previousSymbol instanceof NgModuleSymbol)) {
            return true;
        }
        // Changes in the provider status of this NgModule affect downstream dependencies, which may
        // consider provider status in their own emits.
        if (previousSymbol.hasProviders !== this.hasProviders) {
            return true;
        }
        return false;
    }
    isEmitAffected(previousSymbol) {
        if (!(previousSymbol instanceof NgModuleSymbol)) {
            return true;
        }
        // compare our remotelyScopedComponents to the previous symbol
        if (previousSymbol.remotelyScopedComponents.length !== this.remotelyScopedComponents.length) {
            return true;
        }
        for (const currEntry of this.remotelyScopedComponents) {
            const prevEntry = previousSymbol.remotelyScopedComponents.find((prevEntry) => {
                return (0, semantic_graph_1.isSymbolEqual)(prevEntry.component, currEntry.component);
            });
            if (prevEntry === undefined) {
                // No previous entry was found, which means that this component became remotely scoped and
                // hence this NgModule needs to be re-emitted.
                return true;
            }
            if (!(0, semantic_graph_1.isArrayEqual)(currEntry.usedDirectives, prevEntry.usedDirectives, semantic_graph_1.isReferenceEqual)) {
                // The list of used directives or their order has changed. Since this NgModule emits
                // references to the list of used directives, it should be re-emitted to update this list.
                // Note: the NgModule does not have to be re-emitted when any of the directives has had
                // their public API changed, as the NgModule only emits a reference to the symbol by its
                // name. Therefore, testing for symbol equality is sufficient.
                return true;
            }
            if (!(0, semantic_graph_1.isArrayEqual)(currEntry.usedPipes, prevEntry.usedPipes, semantic_graph_1.isReferenceEqual)) {
                return true;
            }
        }
        if (previousSymbol.transitiveImportsFromStandaloneComponents.size !==
            this.transitiveImportsFromStandaloneComponents.size) {
            return true;
        }
        const previousImports = Array.from(previousSymbol.transitiveImportsFromStandaloneComponents);
        for (const transitiveImport of this.transitiveImportsFromStandaloneComponents) {
            const prevEntry = previousImports.find((prevEntry) => (0, semantic_graph_1.isSymbolEqual)(prevEntry, transitiveImport));
            if (prevEntry === undefined) {
                return true;
            }
            if (transitiveImport.isPublicApiAffected(prevEntry)) {
                return true;
            }
        }
        return false;
    }
    isTypeCheckApiAffected(previousSymbol) {
        if (!(previousSymbol instanceof NgModuleSymbol)) {
            return true;
        }
        return false;
    }
    addRemotelyScopedComponent(component, usedDirectives, usedPipes) {
        this.remotelyScopedComponents.push({ component, usedDirectives, usedPipes });
    }
    addTransitiveImportFromStandaloneComponent(importedSymbol) {
        this.transitiveImportsFromStandaloneComponents.add(importedSymbol);
    }
}
exports.NgModuleSymbol = NgModuleSymbol;
/**
 * Compiles @NgModule annotations to ngModuleDef fields.
 */
class NgModuleDecoratorHandler {
    constructor(reflector, evaluator, metaReader, metaRegistry, scopeRegistry, referencesRegistry, exportedProviderStatusResolver, semanticDepGraphUpdater, isCore, refEmitter, annotateForClosureCompiler, onlyPublishPublicTypings, injectableRegistry, perf, includeClassMetadata, includeSelectorScope, compilationMode, localCompilationExtraImportsTracker, jitDeclarationRegistry) {
        this.reflector = reflector;
        this.evaluator = evaluator;
        this.metaReader = metaReader;
        this.metaRegistry = metaRegistry;
        this.scopeRegistry = scopeRegistry;
        this.referencesRegistry = referencesRegistry;
        this.exportedProviderStatusResolver = exportedProviderStatusResolver;
        this.semanticDepGraphUpdater = semanticDepGraphUpdater;
        this.isCore = isCore;
        this.refEmitter = refEmitter;
        this.annotateForClosureCompiler = annotateForClosureCompiler;
        this.onlyPublishPublicTypings = onlyPublishPublicTypings;
        this.injectableRegistry = injectableRegistry;
        this.perf = perf;
        this.includeClassMetadata = includeClassMetadata;
        this.includeSelectorScope = includeSelectorScope;
        this.compilationMode = compilationMode;
        this.localCompilationExtraImportsTracker = localCompilationExtraImportsTracker;
        this.jitDeclarationRegistry = jitDeclarationRegistry;
        this.precedence = transform_1.HandlerPrecedence.PRIMARY;
        this.name = 'NgModuleDecoratorHandler';
    }
    detect(node, decorators) {
        if (!decorators) {
            return undefined;
        }
        const decorator = (0, common_1.findAngularDecorator)(decorators, 'NgModule', this.isCore);
        if (decorator !== undefined) {
            return {
                trigger: decorator.node,
                decorator: decorator,
                metadata: decorator,
            };
        }
        else {
            return undefined;
        }
    }
    analyze(node, decorator) {
        var _a, _b, _c, _d, _e;
        this.perf.eventCount(perf_1.PerfEvent.AnalyzeNgModule);
        const name = node.name.text;
        if (decorator.args === null || decorator.args.length > 1) {
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARITY_WRONG, decorator.node, `Incorrect number of arguments to @NgModule decorator`);
        }
        // @NgModule can be invoked without arguments. In case it is, pretend as if a blank object
        // literal was specified. This simplifies the code below.
        const meta = decorator.args.length === 1
            ? (0, common_1.unwrapExpression)(decorator.args[0])
            : typescript_1.default.factory.createObjectLiteralExpression([]);
        if (!typescript_1.default.isObjectLiteralExpression(meta)) {
            throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DECORATOR_ARG_NOT_LITERAL, meta, '@NgModule argument must be an object literal');
        }
        const ngModule = (0, reflection_1.reflectObjectLiteral)(meta);
        if (ngModule.has('jit')) {
            this.jitDeclarationRegistry.jitDeclarations.add(node);
            // The only allowed value is true, so there's no need to expand further.
            return {};
        }
        const forwardRefResolver = (0, common_1.createForwardRefResolver)(this.isCore);
        const moduleResolvers = (0, common_1.combineResolvers)([
            (0, module_with_providers_1.createModuleWithProvidersResolver)(this.reflector, this.isCore),
            forwardRefResolver,
        ]);
        const diagnostics = [];
        // Resolving declarations
        let declarationRefs = [];
        const rawDeclarations = (_a = ngModule.get('declarations')) !== null && _a !== void 0 ? _a : null;
        if (rawDeclarations !== null) {
            const declarationMeta = this.evaluator.evaluate(rawDeclarations, forwardRefResolver);
            declarationRefs = this.resolveTypeList(rawDeclarations, declarationMeta, name, 'declarations', 0, this.compilationMode === transform_1.CompilationMode.LOCAL).references;
            // Look through the declarations to make sure they're all a part of the current compilation.
            for (const ref of declarationRefs) {
                if (ref.node.getSourceFile().isDeclarationFile) {
                    const errorNode = ref.getOriginForDiagnostics(rawDeclarations);
                    diagnostics.push((0, diagnostics_1.makeDiagnostic)(diagnostics_1.ErrorCode.NGMODULE_INVALID_DECLARATION, errorNode, `Cannot declare '${ref.node.name.text}' in an NgModule as it's not a part of the current compilation.`, [(0, diagnostics_1.makeRelatedInformation)(ref.node.name, `'${ref.node.name.text}' is declared here.`)]));
                }
            }
        }
        if (diagnostics.length > 0) {
            return { diagnostics };
        }
        // Resolving imports
        let importRefs = [];
        let rawImports = (_b = ngModule.get('imports')) !== null && _b !== void 0 ? _b : null;
        if (rawImports !== null) {
            const importsMeta = this.evaluator.evaluate(rawImports, moduleResolvers);
            const result = this.resolveTypeList(rawImports, importsMeta, name, 'imports', 0, this.compilationMode === transform_1.CompilationMode.LOCAL);
            if (this.compilationMode === transform_1.CompilationMode.LOCAL &&
                this.localCompilationExtraImportsTracker !== null) {
                // For generating extra imports in local mode, the NgModule imports that are from external
                // files (i.e., outside of the compilation unit) are to be added to all the files in the
                // compilation unit. This is because any external component that is a dependency of some
                // component in the compilation unit must be imported by one of these NgModule's external
                // imports (or the external component cannot be a dependency of that internal component).
                // This approach can be further optimized by adding these NgModule external imports to a
                // subset of files in the compilation unit and not all. See comments in {@link
                // LocalCompilationExtraImportsTracker} and {@link
                // LocalCompilationExtraImportsTracker#addGlobalImportFromIdentifier} for more details.
                for (const d of result.dynamicValues) {
                    this.localCompilationExtraImportsTracker.addGlobalImportFromIdentifier(d.node);
                }
            }
            importRefs = result.references;
        }
        // Resolving exports
        let exportRefs = [];
        const rawExports = (_c = ngModule.get('exports')) !== null && _c !== void 0 ? _c : null;
        if (rawExports !== null) {
            const exportsMeta = this.evaluator.evaluate(rawExports, moduleResolvers);
            exportRefs = this.resolveTypeList(rawExports, exportsMeta, name, 'exports', 0, this.compilationMode === transform_1.CompilationMode.LOCAL).references;
            this.referencesRegistry.add(node, ...exportRefs);
        }
        // Resolving bootstrap
        let bootstrapRefs = [];
        const rawBootstrap = (_d = ngModule.get('bootstrap')) !== null && _d !== void 0 ? _d : null;
        if (this.compilationMode !== transform_1.CompilationMode.LOCAL && rawBootstrap !== null) {
            const bootstrapMeta = this.evaluator.evaluate(rawBootstrap, forwardRefResolver);
            bootstrapRefs = this.resolveTypeList(rawBootstrap, bootstrapMeta, name, 'bootstrap', 0, 
            /* allowUnresolvedReferences */ false).references;
            // Verify that the `@NgModule.bootstrap` list doesn't have Standalone Components.
            for (const ref of bootstrapRefs) {
                const dirMeta = this.metaReader.getDirectiveMetadata(ref);
                if (dirMeta === null || dirMeta === void 0 ? void 0 : dirMeta.isStandalone) {
                    diagnostics.push(makeStandaloneBootstrapDiagnostic(node, ref, rawBootstrap));
                }
            }
        }
        const schemas = this.compilationMode !== transform_1.CompilationMode.LOCAL && ngModule.has('schemas')
            ? (0, common_1.extractSchemas)(ngModule.get('schemas'), this.evaluator, 'NgModule')
            : [];
        let id = null;
        if (ngModule.has('id')) {
            const idExpr = ngModule.get('id');
            if (!isModuleIdExpression(idExpr)) {
                id = new compiler_1.WrappedNodeExpr(idExpr);
            }
            else {
                const diag = (0, diagnostics_1.makeDiagnostic)(diagnostics_1.ErrorCode.WARN_NGMODULE_ID_UNNECESSARY, idExpr, `Using 'module.id' for NgModule.id is a common anti-pattern that is ignored by the Angular compiler.`);
                diag.category = typescript_1.default.DiagnosticCategory.Warning;
                diagnostics.push(diag);
            }
        }
        const valueContext = node.getSourceFile();
        const exportedNodes = new Set(exportRefs.map((ref) => ref.node));
        const declarations = [];
        const exportedDeclarations = [];
        const bootstrap = bootstrapRefs.map((bootstrap) => this._toR3Reference(bootstrap.getOriginForDiagnostics(meta, node.name), bootstrap, valueContext));
        for (const ref of declarationRefs) {
            const decl = this._toR3Reference(ref.getOriginForDiagnostics(meta, node.name), ref, valueContext);
            declarations.push(decl);
            if (exportedNodes.has(ref.node)) {
                exportedDeclarations.push(decl.type);
            }
        }
        const imports = importRefs.map((imp) => this._toR3Reference(imp.getOriginForDiagnostics(meta, node.name), imp, valueContext));
        const exports = exportRefs.map((exp) => this._toR3Reference(exp.getOriginForDiagnostics(meta, node.name), exp, valueContext));
        const isForwardReference = (ref) => (0, common_1.isExpressionForwardReference)(ref.value, node.name, valueContext);
        const containsForwardDecls = bootstrap.some(isForwardReference) ||
            declarations.some(isForwardReference) ||
            imports.some(isForwardReference) ||
            exports.some(isForwardReference);
        const type = (0, common_1.wrapTypeReference)(this.reflector, node);
        let ngModuleMetadata;
        if (this.compilationMode === transform_1.CompilationMode.LOCAL) {
            ngModuleMetadata = {
                kind: compiler_1.R3NgModuleMetadataKind.Local,
                type,
                bootstrapExpression: rawBootstrap ? new compiler_1.WrappedNodeExpr(rawBootstrap) : null,
                declarationsExpression: rawDeclarations ? new compiler_1.WrappedNodeExpr(rawDeclarations) : null,
                exportsExpression: rawExports ? new compiler_1.WrappedNodeExpr(rawExports) : null,
                importsExpression: rawImports ? new compiler_1.WrappedNodeExpr(rawImports) : null,
                id,
                // Use `ɵɵsetNgModuleScope` to patch selector scopes onto the generated definition in a
                // tree-shakeable way.
                selectorScopeMode: compiler_1.R3SelectorScopeMode.SideEffect,
                // TODO: to be implemented as a part of FW-1004.
                schemas: [],
            };
        }
        else {
            ngModuleMetadata = {
                kind: compiler_1.R3NgModuleMetadataKind.Global,
                type,
                bootstrap,
                declarations,
                publicDeclarationTypes: this.onlyPublishPublicTypings ? exportedDeclarations : null,
                exports,
                imports,
                // Imported types are generally private, so include them unless restricting the .d.ts emit
                // to only public types.
                includeImportTypes: !this.onlyPublishPublicTypings,
                containsForwardDecls,
                id,
                // Use `ɵɵsetNgModuleScope` to patch selector scopes onto the generated definition in a
                // tree-shakeable way.
                selectorScopeMode: this.includeSelectorScope
                    ? compiler_1.R3SelectorScopeMode.SideEffect
                    : compiler_1.R3SelectorScopeMode.Omit,
                // TODO: to be implemented as a part of FW-1004.
                schemas: [],
            };
        }
        const rawProviders = ngModule.has('providers') ? ngModule.get('providers') : null;
        let wrappedProviders = null;
        // In most cases the providers will be an array literal. Check if it has any elements
        // and don't include the providers if it doesn't which saves us a few bytes.
        if (rawProviders !== null &&
            (!typescript_1.default.isArrayLiteralExpression(rawProviders) || rawProviders.elements.length > 0)) {
            wrappedProviders = new compiler_1.WrappedNodeExpr(this.annotateForClosureCompiler
                ? (0, common_1.wrapFunctionExpressionsInParens)(rawProviders)
                : rawProviders);
        }
        const topLevelImports = [];
        if (this.compilationMode !== transform_1.CompilationMode.LOCAL && ngModule.has('imports')) {
            const rawImports = (0, common_1.unwrapExpression)(ngModule.get('imports'));
            let topLevelExpressions = [];
            if (typescript_1.default.isArrayLiteralExpression(rawImports)) {
                for (const element of rawImports.elements) {
                    if (typescript_1.default.isSpreadElement(element)) {
                        // Because `imports` allows nested arrays anyway, a spread expression (`...foo`) can be
                        // treated the same as a direct reference to `foo`.
                        topLevelExpressions.push(element.expression);
                        continue;
                    }
                    topLevelExpressions.push(element);
                }
            }
            else {
                // Treat the whole `imports` expression as top-level.
                topLevelExpressions.push(rawImports);
            }
            let absoluteIndex = 0;
            for (const importExpr of topLevelExpressions) {
                const resolved = this.evaluator.evaluate(importExpr, moduleResolvers);
                const { references, hasModuleWithProviders } = this.resolveTypeList(importExpr, [resolved], node.name.text, 'imports', absoluteIndex, 
                /* allowUnresolvedReferences */ false);
                absoluteIndex += references.length;
                topLevelImports.push({
                    expression: importExpr,
                    resolvedReferences: references,
                    hasModuleWithProviders,
                });
            }
        }
        const injectorMetadata = {
            name,
            type,
            providers: wrappedProviders,
            imports: [],
        };
        if (this.compilationMode === transform_1.CompilationMode.LOCAL) {
            // Adding NgModule's raw imports/exports to the injector's imports field in local compilation
            // mode.
            for (const exp of [rawImports, rawExports]) {
                if (exp === null) {
                    continue;
                }
                if (typescript_1.default.isArrayLiteralExpression(exp)) {
                    // If array expression then add it entry-by-entry to the injector imports
                    if (exp.elements) {
                        injectorMetadata.imports.push(...exp.elements.map((n) => new compiler_1.WrappedNodeExpr(n)));
                    }
                }
                else {
                    // if not array expression then add it as is to the injector's imports field.
                    injectorMetadata.imports.push(new compiler_1.WrappedNodeExpr(exp));
                }
            }
        }
        const factoryMetadata = {
            name,
            type,
            typeArgumentCount: 0,
            deps: (0, common_1.getValidConstructorDependencies)(node, this.reflector, this.isCore),
            target: compiler_1.FactoryTarget.NgModule,
        };
        // Remote scoping is used when adding imports to a component file would create a cycle. In such
        // circumstances the component scope is monkey-patched from the NgModule file instead.
        //
        // However, if the NgModule itself has a cycle with the desired component/directive
        // reference(s), then we need to be careful. This can happen for example if an NgModule imports
        // a standalone component and the component also imports the NgModule.
        //
        // In this case, it'd be tempting to rely on the compiler's cycle detector to automatically put
        // such circular references behind a function/closure. This requires global knowledge of the
        // import graph though, and we don't want to depend on such techniques for new APIs like
        // standalone components.
        //
        // Instead, we look for `forwardRef`s in the NgModule dependencies - an explicit signal from the
        // user that a reference may not be defined until a circular import is resolved. If an NgModule
        // contains forward-referenced declarations or imports, we assume that remotely scoped
        // components should also guard against cycles using a closure-wrapped scope.
        //
        // The actual detection here is done heuristically. The compiler doesn't actually know whether
        // any given `Reference` came from a `forwardRef`, but it does know when a `Reference` came from
        // a `ForeignFunctionResolver` _like_ the `forwardRef` resolver. So we know when it's safe to
        // not use a closure, and will use one just in case otherwise.
        const remoteScopesMayRequireCycleProtection = declarationRefs.some(isSyntheticReference) || importRefs.some(isSyntheticReference);
        return {
            diagnostics: diagnostics.length > 0 ? diagnostics : undefined,
            analysis: {
                id,
                schemas,
                mod: ngModuleMetadata,
                inj: injectorMetadata,
                fac: factoryMetadata,
                declarations: declarationRefs,
                rawDeclarations,
                imports: topLevelImports,
                rawImports,
                importRefs,
                exports: exportRefs,
                rawExports,
                providers: rawProviders,
                providersRequiringFactory: rawProviders
                    ? (0, common_1.resolveProvidersRequiringFactory)(rawProviders, this.reflector, this.evaluator)
                    : null,
                classMetadata: this.includeClassMetadata
                    ? (0, common_1.extractClassMetadata)(node, this.reflector, this.isCore, this.annotateForClosureCompiler)
                    : null,
                factorySymbolName: node.name.text,
                remoteScopesMayRequireCycleProtection,
                decorator: (_e = decorator === null || decorator === void 0 ? void 0 : decorator.node) !== null && _e !== void 0 ? _e : null,
            },
        };
    }
    symbol(node, analysis) {
        return new NgModuleSymbol(node, analysis.providers !== null);
    }
    register(node, analysis) {
        // Register this module's information with the LocalModuleScopeRegistry. This ensures that
        // during the compile() phase, the module's metadata is available for selector scope
        // computation.
        this.metaRegistry.registerNgModuleMetadata({
            kind: metadata_1.MetaKind.NgModule,
            ref: new imports_1.Reference(node),
            schemas: analysis.schemas,
            declarations: analysis.declarations,
            imports: analysis.importRefs,
            exports: analysis.exports,
            rawDeclarations: analysis.rawDeclarations,
            rawImports: analysis.rawImports,
            rawExports: analysis.rawExports,
            decorator: analysis.decorator,
            mayDeclareProviders: analysis.providers !== null,
            isPoisoned: false,
        });
        this.injectableRegistry.registerInjectable(node, {
            ctorDeps: analysis.fac.deps,
        });
    }
    resolve(node, analysis) {
        if (this.compilationMode === transform_1.CompilationMode.LOCAL) {
            return {};
        }
        const scope = this.scopeRegistry.getScopeOfModule(node);
        const diagnostics = [];
        const scopeDiagnostics = this.scopeRegistry.getDiagnosticsOfModule(node);
        if (scopeDiagnostics !== null) {
            diagnostics.push(...scopeDiagnostics);
        }
        if (analysis.providersRequiringFactory !== null) {
            const providerDiagnostics = (0, common_1.getProviderDiagnostics)(analysis.providersRequiringFactory, analysis.providers, this.injectableRegistry);
            diagnostics.push(...providerDiagnostics);
        }
        const data = {
            injectorImports: [],
        };
        // Add all top-level imports from the `imports` field to the injector imports.
        for (const topLevelImport of analysis.imports) {
            if (topLevelImport.hasModuleWithProviders) {
                // We have no choice but to emit expressions which contain MWPs, as we cannot filter on
                // individual references.
                data.injectorImports.push(new compiler_1.WrappedNodeExpr(topLevelImport.expression));
                continue;
            }
            const refsToEmit = [];
            let symbol = null;
            if (this.semanticDepGraphUpdater !== null) {
                const sym = this.semanticDepGraphUpdater.getSymbol(node);
                if (sym instanceof NgModuleSymbol) {
                    symbol = sym;
                }
            }
            for (const ref of topLevelImport.resolvedReferences) {
                const dirMeta = this.metaReader.getDirectiveMetadata(ref);
                if (dirMeta !== null) {
                    if (!dirMeta.isComponent) {
                        // Skip emit of directives in imports - directives can't carry providers.
                        continue;
                    }
                    // Check whether this component has providers.
                    const mayExportProviders = this.exportedProviderStatusResolver.mayExportProviders(dirMeta.ref, (importRef) => {
                        // We need to keep track of which transitive imports were used to decide
                        // `mayExportProviders`, since if those change in a future compilation this
                        // NgModule will need to be re-emitted.
                        if (symbol !== null && this.semanticDepGraphUpdater !== null) {
                            const importSymbol = this.semanticDepGraphUpdater.getSymbol(importRef.node);
                            symbol.addTransitiveImportFromStandaloneComponent(importSymbol);
                        }
                    });
                    if (!mayExportProviders) {
                        // Skip emit of components that don't carry providers.
                        continue;
                    }
                }
                const pipeMeta = dirMeta === null ? this.metaReader.getPipeMetadata(ref) : null;
                if (pipeMeta !== null) {
                    // Skip emit of pipes in imports - pipes can't carry providers.
                    continue;
                }
                refsToEmit.push(ref);
            }
            if (refsToEmit.length === topLevelImport.resolvedReferences.length) {
                // All references within this top-level import should be emitted, so just use the user's
                // expression.
                data.injectorImports.push(new compiler_1.WrappedNodeExpr(topLevelImport.expression));
            }
            else {
                // Some references have been filtered out. Emit references to individual classes.
                const context = node.getSourceFile();
                for (const ref of refsToEmit) {
                    const emittedRef = this.refEmitter.emit(ref, context);
                    (0, imports_1.assertSuccessfulReferenceEmit)(emittedRef, topLevelImport.expression, 'class');
                    data.injectorImports.push(emittedRef.expression);
                }
            }
        }
        if (scope !== null && !scope.compilation.isPoisoned) {
            // Using the scope information, extend the injector's imports using the modules that are
            // specified as module exports.
            const context = (0, typescript_2.getSourceFile)(node);
            for (const exportRef of analysis.exports) {
                if (isNgModule(exportRef.node, scope.compilation)) {
                    const type = this.refEmitter.emit(exportRef, context);
                    (0, imports_1.assertSuccessfulReferenceEmit)(type, node, 'NgModule');
                    data.injectorImports.push(type.expression);
                }
            }
            for (const decl of analysis.declarations) {
                const dirMeta = this.metaReader.getDirectiveMetadata(decl);
                if (dirMeta !== null) {
                    const refType = dirMeta.isComponent ? 'Component' : 'Directive';
                    if (dirMeta.selector === null) {
                        throw new diagnostics_1.FatalDiagnosticError(diagnostics_1.ErrorCode.DIRECTIVE_MISSING_SELECTOR, decl.node, `${refType} ${decl.node.name.text} has no selector, please add it!`);
                    }
                    continue;
                }
            }
        }
        if (diagnostics.length > 0) {
            return { diagnostics };
        }
        if (scope === null ||
            scope.compilation.isPoisoned ||
            scope.exported.isPoisoned ||
            scope.reexports === null) {
            return { data };
        }
        else {
            return {
                data,
                reexports: scope.reexports,
            };
        }
    }
    compileFull(node, { inj, mod, fac, classMetadata, declarations, remoteScopesMayRequireCycleProtection, }, { injectorImports }) {
        const factoryFn = (0, common_1.compileNgFactoryDefField)(fac);
        const ngInjectorDef = (0, compiler_1.compileInjector)(Object.assign(Object.assign({}, inj), { imports: injectorImports }));
        const ngModuleDef = (0, compiler_1.compileNgModule)(mod);
        const statements = ngModuleDef.statements;
        const metadata = classMetadata !== null ? (0, compiler_1.compileClassMetadata)(classMetadata) : null;
        this.insertMetadataStatement(statements, metadata);
        this.appendRemoteScopingStatements(statements, node, declarations, remoteScopesMayRequireCycleProtection);
        return this.compileNgModule(factoryFn, ngInjectorDef, ngModuleDef);
    }
    compilePartial(node, { inj, fac, mod, classMetadata }, { injectorImports }) {
        const factoryFn = (0, common_1.compileDeclareFactory)(fac);
        const injectorDef = (0, compiler_1.compileDeclareInjectorFromMetadata)(Object.assign(Object.assign({}, inj), { imports: injectorImports }));
        const ngModuleDef = (0, compiler_1.compileDeclareNgModuleFromMetadata)(mod);
        const metadata = classMetadata !== null ? (0, compiler_1.compileDeclareClassMetadata)(classMetadata) : null;
        this.insertMetadataStatement(ngModuleDef.statements, metadata);
        // NOTE: no remote scoping required as this is banned in partial compilation.
        return this.compileNgModule(factoryFn, injectorDef, ngModuleDef);
    }
    compileLocal(node, { inj, mod, fac, classMetadata, declarations, remoteScopesMayRequireCycleProtection, }) {
        const factoryFn = (0, common_1.compileNgFactoryDefField)(fac);
        const ngInjectorDef = (0, compiler_1.compileInjector)(Object.assign({}, inj));
        const ngModuleDef = (0, compiler_1.compileNgModule)(mod);
        const statements = ngModuleDef.statements;
        const metadata = classMetadata !== null ? (0, compiler_1.compileClassMetadata)(classMetadata) : null;
        this.insertMetadataStatement(statements, metadata);
        this.appendRemoteScopingStatements(statements, node, declarations, remoteScopesMayRequireCycleProtection);
        return this.compileNgModule(factoryFn, ngInjectorDef, ngModuleDef);
    }
    /**
     * Add class metadata statements, if provided, to the `ngModuleStatements`.
     */
    insertMetadataStatement(ngModuleStatements, metadata) {
        if (metadata !== null) {
            ngModuleStatements.unshift(metadata.toStmt());
        }
    }
    /**
     * Add remote scoping statements, as needed, to the `ngModuleStatements`.
     */
    appendRemoteScopingStatements(ngModuleStatements, node, declarations, remoteScopesMayRequireCycleProtection) {
        // Local compilation mode generates its own runtimes to compute the dependencies. So there no
        // need to add remote scope statements (which also conflicts with local compilation runtimes)
        if (this.compilationMode === transform_1.CompilationMode.LOCAL) {
            return;
        }
        const context = (0, typescript_2.getSourceFile)(node);
        for (const decl of declarations) {
            const remoteScope = this.scopeRegistry.getRemoteScope(decl.node);
            if (remoteScope !== null) {
                const directives = remoteScope.directives.map((directive) => {
                    const type = this.refEmitter.emit(directive, context);
                    (0, imports_1.assertSuccessfulReferenceEmit)(type, node, 'directive');
                    return type.expression;
                });
                const pipes = remoteScope.pipes.map((pipe) => {
                    const type = this.refEmitter.emit(pipe, context);
                    (0, imports_1.assertSuccessfulReferenceEmit)(type, node, 'pipe');
                    return type.expression;
                });
                const directiveArray = new compiler_1.LiteralArrayExpr(directives);
                const pipesArray = new compiler_1.LiteralArrayExpr(pipes);
                const directiveExpr = remoteScopesMayRequireCycleProtection && directives.length > 0
                    ? new compiler_1.FunctionExpr([], [new compiler_1.ReturnStatement(directiveArray)])
                    : directiveArray;
                const pipesExpr = remoteScopesMayRequireCycleProtection && pipes.length > 0
                    ? new compiler_1.FunctionExpr([], [new compiler_1.ReturnStatement(pipesArray)])
                    : pipesArray;
                const componentType = this.refEmitter.emit(decl, context);
                (0, imports_1.assertSuccessfulReferenceEmit)(componentType, node, 'component');
                const declExpr = componentType.expression;
                const setComponentScope = new compiler_1.ExternalExpr(compiler_1.R3Identifiers.setComponentScope);
                const callExpr = new compiler_1.InvokeFunctionExpr(setComponentScope, [
                    declExpr,
                    directiveExpr,
                    pipesExpr,
                ]);
                ngModuleStatements.push(callExpr.toStmt());
            }
        }
    }
    compileNgModule(factoryFn, injectorDef, ngModuleDef) {
        const res = [
            factoryFn,
            {
                name: 'ɵmod',
                initializer: ngModuleDef.expression,
                statements: ngModuleDef.statements,
                type: ngModuleDef.type,
                deferrableImports: null,
            },
            {
                name: 'ɵinj',
                initializer: injectorDef.expression,
                statements: injectorDef.statements,
                type: injectorDef.type,
                deferrableImports: null,
            },
        ];
        return res;
    }
    _toR3Reference(origin, valueRef, valueContext) {
        if (valueRef.hasOwningModuleGuess) {
            return (0, common_1.toR3Reference)(origin, valueRef, valueContext, this.refEmitter);
        }
        else {
            return (0, common_1.toR3Reference)(origin, valueRef, valueContext, this.refEmitter);
        }
    }
    // Verify that a "Declaration" reference is a `ClassDeclaration` reference.
    isClassDeclarationReference(ref) {
        return this.reflector.isClass(ref.node);
    }
    /**
     * Compute a list of `Reference`s from a resolved metadata value.
     */
    resolveTypeList(expr, resolvedList, className, arrayName, absoluteIndex, allowUnresolvedReferences) {
        let hasModuleWithProviders = false;
        const refList = [];
        const dynamicValueSet = new Set();
        if (!Array.isArray(resolvedList)) {
            if (allowUnresolvedReferences) {
                return {
                    references: [],
                    hasModuleWithProviders: false,
                    dynamicValues: [],
                };
            }
            throw (0, common_1.createValueHasWrongTypeError)(expr, resolvedList, `Expected array when reading the NgModule.${arrayName} of ${className}`);
        }
        for (let idx = 0; idx < resolvedList.length; idx++) {
            let entry = resolvedList[idx];
            // Unwrap ModuleWithProviders for modules that are locally declared (and thus static
            // resolution was able to descend into the function and return an object literal, a Map).
            if (entry instanceof partial_evaluator_1.SyntheticValue && (0, module_with_providers_1.isResolvedModuleWithProviders)(entry)) {
                entry = entry.value.ngModule;
                hasModuleWithProviders = true;
            }
            else if (entry instanceof Map && entry.has('ngModule')) {
                entry = entry.get('ngModule');
                hasModuleWithProviders = true;
            }
            if (Array.isArray(entry)) {
                // Recurse into nested arrays.
                const recursiveResult = this.resolveTypeList(expr, entry, className, arrayName, absoluteIndex, allowUnresolvedReferences);
                refList.push(...recursiveResult.references);
                for (const d of recursiveResult.dynamicValues) {
                    dynamicValueSet.add(d);
                }
                absoluteIndex += recursiveResult.references.length;
                hasModuleWithProviders = hasModuleWithProviders || recursiveResult.hasModuleWithProviders;
            }
            else if (entry instanceof imports_1.Reference) {
                if (!this.isClassDeclarationReference(entry)) {
                    throw (0, common_1.createValueHasWrongTypeError)(entry.node, entry, `Value at position ${absoluteIndex} in the NgModule.${arrayName} of ${className} is not a class`);
                }
                refList.push(entry);
                absoluteIndex += 1;
            }
            else if (entry instanceof partial_evaluator_1.DynamicValue && allowUnresolvedReferences) {
                dynamicValueSet.add(entry);
                continue;
            }
            else {
                // TODO(alxhub): Produce a better diagnostic here - the array index may be an inner array.
                throw (0, common_1.createValueHasWrongTypeError)(expr, entry, `Value at position ${absoluteIndex} in the NgModule.${arrayName} of ${className} is not a reference`);
            }
        }
        return {
            references: refList,
            hasModuleWithProviders,
            dynamicValues: [...dynamicValueSet],
        };
    }
}
exports.NgModuleDecoratorHandler = NgModuleDecoratorHandler;
function isNgModule(node, compilation) {
    return !compilation.dependencies.some((dep) => dep.ref.node === node);
}
/**
 * Checks whether the given `ts.Expression` is the expression `module.id`.
 */
function isModuleIdExpression(expr) {
    return (typescript_1.default.isPropertyAccessExpression(expr) &&
        typescript_1.default.isIdentifier(expr.expression) &&
        expr.expression.text === 'module' &&
        expr.name.text === 'id');
}
/**
 * Helper method to produce a diagnostics for a situation when a standalone component
 * is referenced in the `@NgModule.bootstrap` array.
 */
function makeStandaloneBootstrapDiagnostic(ngModuleClass, bootstrappedClassRef, rawBootstrapExpr) {
    const componentClassName = bootstrappedClassRef.node.name.text;
    // Note: this error message should be aligned with the one produced by JIT.
    const message = //
     `The \`${componentClassName}\` class is a standalone component, which can ` +
        `not be used in the \`@NgModule.bootstrap\` array. Use the \`bootstrapApplication\` ` +
        `function for bootstrap instead.`;
    const relatedInformation = [
        (0, diagnostics_1.makeRelatedInformation)(ngModuleClass, `The 'bootstrap' array is present on this NgModule.`),
    ];
    return (0, diagnostics_1.makeDiagnostic)(diagnostics_1.ErrorCode.NGMODULE_BOOTSTRAP_IS_STANDALONE, (0, util_1.getDiagnosticNode)(bootstrappedClassRef, rawBootstrapExpr), message, relatedInformation);
}
function isSyntheticReference(ref) {
    return ref.synthetic;
}
