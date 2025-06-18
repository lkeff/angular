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
exports.DirectiveDecoratorHandler = void 0;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../../imports");
const semantic_graph_1 = require("../../../incremental/semantic_graph");
const metadata_1 = require("../../../metadata");
const perf_1 = require("../../../perf");
const reflection_1 = require("../../../reflection");
const transform_1 = require("../../../transform");
const common_1 = require("../../common");
const shared_1 = require("./shared");
const symbol_1 = require("./symbol");
const typecheck_1 = require("../../../typecheck");
const FIELD_DECORATORS = [
    'Input',
    'Output',
    'ViewChild',
    'ViewChildren',
    'ContentChild',
    'ContentChildren',
    'HostBinding',
    'HostListener',
];
const LIFECYCLE_HOOKS = new Set([
    'ngOnChanges',
    'ngOnInit',
    'ngOnDestroy',
    'ngDoCheck',
    'ngAfterViewInit',
    'ngAfterViewChecked',
    'ngAfterContentInit',
    'ngAfterContentChecked',
]);
class DirectiveDecoratorHandler {
    constructor(reflector, evaluator, metaRegistry, scopeRegistry, metaReader, injectableRegistry, refEmitter, referencesRegistry, isCore, strictCtorDeps, semanticDepGraphUpdater, annotateForClosureCompiler, perf, importTracker, includeClassMetadata, typeCheckScopeRegistry, compilationMode, jitDeclarationRegistry, resourceRegistry, strictStandalone, implicitStandaloneValue, usePoisonedData, typeCheckHostBindings) {
        this.reflector = reflector;
        this.evaluator = evaluator;
        this.metaRegistry = metaRegistry;
        this.scopeRegistry = scopeRegistry;
        this.metaReader = metaReader;
        this.injectableRegistry = injectableRegistry;
        this.refEmitter = refEmitter;
        this.referencesRegistry = referencesRegistry;
        this.isCore = isCore;
        this.strictCtorDeps = strictCtorDeps;
        this.semanticDepGraphUpdater = semanticDepGraphUpdater;
        this.annotateForClosureCompiler = annotateForClosureCompiler;
        this.perf = perf;
        this.importTracker = importTracker;
        this.includeClassMetadata = includeClassMetadata;
        this.typeCheckScopeRegistry = typeCheckScopeRegistry;
        this.compilationMode = compilationMode;
        this.jitDeclarationRegistry = jitDeclarationRegistry;
        this.resourceRegistry = resourceRegistry;
        this.strictStandalone = strictStandalone;
        this.implicitStandaloneValue = implicitStandaloneValue;
        this.usePoisonedData = usePoisonedData;
        this.typeCheckHostBindings = typeCheckHostBindings;
        this.precedence = transform_1.HandlerPrecedence.PRIMARY;
        this.name = 'DirectiveDecoratorHandler';
    }
    detect(node, decorators) {
        // If a class is undecorated but uses Angular features, we detect it as an
        // abstract directive. This is an unsupported pattern as of v10, but we want
        // to still detect these patterns so that we can report diagnostics.
        if (!decorators) {
            const angularField = this.findClassFieldWithAngularFeatures(node);
            return angularField
                ? { trigger: angularField.node, decorator: null, metadata: null }
                : undefined;
        }
        else {
            const decorator = (0, common_1.findAngularDecorator)(decorators, 'Directive', this.isCore);
            return decorator ? { trigger: decorator.node, decorator, metadata: decorator } : undefined;
        }
    }
    analyze(node, decorator) {
        var _a;
        // Skip processing of the class declaration if compilation of undecorated classes
        // with Angular features is disabled. Previously in ngtsc, such classes have always
        // been processed, but we want to enforce a consistent decorator mental model.
        // See: https://v9.angular.io/guide/migration-undecorated-classes.
        if (decorator === null) {
            // If compiling @angular/core, skip the diagnostic as core occasionally hand-writes
            // definitions.
            if (this.isCore) {
                return {};
            }
            return { diagnostics: [(0, common_1.getUndecoratedClassWithAngularFeaturesDiagnostic)(node)] };
        }
        this.perf.eventCount(perf_1.PerfEvent.AnalyzeDirective);
        const directiveResult = (0, shared_1.extractDirectiveMetadata)(node, decorator, this.reflector, this.importTracker, this.evaluator, this.refEmitter, this.referencesRegistry, this.isCore, this.annotateForClosureCompiler, this.compilationMode, 
        /* defaultSelector */ null, this.strictStandalone, this.implicitStandaloneValue);
        // `extractDirectiveMetadata` returns `jitForced = true` when the `@Directive` has
        // set `jit: true`. In this case, compilation of the decorator is skipped. Returning
        // an empty object signifies that no analysis was produced.
        if (directiveResult.jitForced) {
            this.jitDeclarationRegistry.jitDeclarations.add(node);
            return {};
        }
        const analysis = directiveResult.metadata;
        let providersRequiringFactory = null;
        if (directiveResult !== undefined && directiveResult.decorator.has('providers')) {
            providersRequiringFactory = (0, common_1.resolveProvidersRequiringFactory)(directiveResult.decorator.get('providers'), this.reflector, this.evaluator);
        }
        return {
            analysis: {
                inputs: directiveResult.inputs,
                inputFieldNamesFromMetadataArray: directiveResult.inputFieldNamesFromMetadataArray,
                outputs: directiveResult.outputs,
                meta: analysis,
                hostDirectives: directiveResult.hostDirectives,
                rawHostDirectives: directiveResult.rawHostDirectives,
                classMetadata: this.includeClassMetadata
                    ? (0, common_1.extractClassMetadata)(node, this.reflector, this.isCore, this.annotateForClosureCompiler)
                    : null,
                baseClass: (0, common_1.readBaseClass)(node, this.reflector, this.evaluator),
                typeCheckMeta: (0, metadata_1.extractDirectiveTypeCheckMeta)(node, directiveResult.inputs, this.reflector),
                providersRequiringFactory,
                isPoisoned: false,
                isStructural: directiveResult.isStructural,
                decorator: (_a = decorator === null || decorator === void 0 ? void 0 : decorator.node) !== null && _a !== void 0 ? _a : null,
                hostBindingNodes: directiveResult.hostBindingNodes,
                resources: {
                    template: null,
                    styles: null,
                    hostBindings: (0, shared_1.extractHostBindingResources)(directiveResult.hostBindingNodes),
                },
            },
        };
    }
    symbol(node, analysis) {
        const typeParameters = (0, semantic_graph_1.extractSemanticTypeParameters)(node);
        return new symbol_1.DirectiveSymbol(node, analysis.meta.selector, analysis.inputs, analysis.outputs, analysis.meta.exportAs, analysis.typeCheckMeta, typeParameters);
    }
    register(node, analysis) {
        // Register this directive's information with the `MetadataRegistry`. This ensures that
        // the information about the directive is available during the compile() phase.
        const ref = new imports_1.Reference(node);
        this.metaRegistry.registerDirectiveMetadata(Object.assign(Object.assign({ kind: metadata_1.MetaKind.Directive, matchSource: metadata_1.MatchSource.Selector, ref, name: node.name.text, selector: analysis.meta.selector, exportAs: analysis.meta.exportAs, inputs: analysis.inputs, inputFieldNamesFromMetadataArray: analysis.inputFieldNamesFromMetadataArray, outputs: analysis.outputs, queries: analysis.meta.queries.map((query) => query.propertyName), isComponent: false, baseClass: analysis.baseClass, hostDirectives: analysis.hostDirectives }, analysis.typeCheckMeta), { isPoisoned: analysis.isPoisoned, isStructural: analysis.isStructural, animationTriggerNames: null, isStandalone: analysis.meta.isStandalone, isSignal: analysis.meta.isSignal, imports: null, rawImports: null, deferredImports: null, schemas: null, ngContentSelectors: null, decorator: analysis.decorator, preserveWhitespaces: false, 
            // Directives analyzed within our own compilation are not _assumed_ to export providers.
            // Instead, we statically analyze their imports to make a direct determination.
            assumedToExportProviders: false, isExplicitlyDeferred: false, selectorlessEnabled: false, localReferencedSymbols: null }));
        this.resourceRegistry.registerResources(analysis.resources, node);
        this.injectableRegistry.registerInjectable(node, {
            ctorDeps: analysis.meta.deps,
        });
    }
    typeCheck(ctx, node, meta) {
        // Currently type checking in directives is only supported for host bindings
        // so we can skip everything below if type checking is disabled.
        if (!this.typeCheckHostBindings) {
            return;
        }
        if (!typescript_1.default.isClassDeclaration(node) || (meta.isPoisoned && !this.usePoisonedData)) {
            return;
        }
        const scope = this.typeCheckScopeRegistry.getTypeCheckScope(node);
        if (scope.isPoisoned && !this.usePoisonedData) {
            // Don't type-check components that had errors in their scopes, unless requested.
            return;
        }
        const hostElement = (0, typecheck_1.createHostElement)('directive', meta.meta.selector, node, meta.hostBindingNodes.literal, meta.hostBindingNodes.bindingDecorators, meta.hostBindingNodes.listenerDecorators);
        if (hostElement !== null) {
            const binder = new compiler_1.R3TargetBinder(scope.matcher);
            const hostBindingsContext = {
                node: hostElement,
                sourceMapping: { type: 'direct', node },
            };
            ctx.addDirective(new imports_1.Reference(node), binder, scope.schemas, null, hostBindingsContext, meta.meta.isStandalone);
        }
    }
    resolve(node, analysis, symbol) {
        if (this.compilationMode === transform_1.CompilationMode.LOCAL) {
            return {};
        }
        if (this.semanticDepGraphUpdater !== null && analysis.baseClass instanceof imports_1.Reference) {
            symbol.baseClass = this.semanticDepGraphUpdater.getSymbol(analysis.baseClass.node);
        }
        const diagnostics = [];
        if (analysis.providersRequiringFactory !== null &&
            analysis.meta.providers instanceof compiler_1.WrappedNodeExpr) {
            const providerDiagnostics = (0, common_1.getProviderDiagnostics)(analysis.providersRequiringFactory, analysis.meta.providers.node, this.injectableRegistry);
            diagnostics.push(...providerDiagnostics);
        }
        const directiveDiagnostics = (0, common_1.getDirectiveDiagnostics)(node, this.injectableRegistry, this.evaluator, this.reflector, this.scopeRegistry, this.strictCtorDeps, 'Directive');
        if (directiveDiagnostics !== null) {
            diagnostics.push(...directiveDiagnostics);
        }
        const hostDirectivesDiagnotics = analysis.hostDirectives && analysis.rawHostDirectives
            ? (0, common_1.validateHostDirectives)(analysis.rawHostDirectives, analysis.hostDirectives, this.metaReader)
            : null;
        if (hostDirectivesDiagnotics !== null) {
            diagnostics.push(...hostDirectivesDiagnotics);
        }
        if (diagnostics.length > 0) {
            return { diagnostics };
        }
        // Note: we need to produce *some* sort of the data in order
        // for the host binding diagnostics to be surfaced.
        return { data: {} };
    }
    compileFull(node, analysis, resolution, pool) {
        const fac = (0, common_1.compileNgFactoryDefField)((0, common_1.toFactoryMetadata)(analysis.meta, compiler_1.FactoryTarget.Directive));
        const def = (0, compiler_1.compileDirectiveFromMetadata)(analysis.meta, pool, (0, compiler_1.makeBindingParser)());
        const inputTransformFields = (0, common_1.compileInputTransformFields)(analysis.inputs);
        const classMetadata = analysis.classMetadata !== null
            ? (0, compiler_1.compileClassMetadata)(analysis.classMetadata).toStmt()
            : null;
        return (0, common_1.compileResults)(fac, def, classMetadata, 'ɵdir', inputTransformFields, null /* deferrableImports */);
    }
    compilePartial(node, analysis, resolution) {
        const fac = (0, common_1.compileDeclareFactory)((0, common_1.toFactoryMetadata)(analysis.meta, compiler_1.FactoryTarget.Directive));
        const def = (0, compiler_1.compileDeclareDirectiveFromMetadata)(analysis.meta);
        const inputTransformFields = (0, common_1.compileInputTransformFields)(analysis.inputs);
        const classMetadata = analysis.classMetadata !== null
            ? (0, compiler_1.compileDeclareClassMetadata)(analysis.classMetadata).toStmt()
            : null;
        return (0, common_1.compileResults)(fac, def, classMetadata, 'ɵdir', inputTransformFields, null /* deferrableImports */);
    }
    compileLocal(node, analysis, resolution, pool) {
        const fac = (0, common_1.compileNgFactoryDefField)((0, common_1.toFactoryMetadata)(analysis.meta, compiler_1.FactoryTarget.Directive));
        const def = (0, compiler_1.compileDirectiveFromMetadata)(analysis.meta, pool, (0, compiler_1.makeBindingParser)());
        const inputTransformFields = (0, common_1.compileInputTransformFields)(analysis.inputs);
        const classMetadata = analysis.classMetadata !== null
            ? (0, compiler_1.compileClassMetadata)(analysis.classMetadata).toStmt()
            : null;
        return (0, common_1.compileResults)(fac, def, classMetadata, 'ɵdir', inputTransformFields, null /* deferrableImports */);
    }
    /**
     * Checks if a given class uses Angular features and returns the TypeScript node
     * that indicated the usage. Classes are considered using Angular features if they
     * contain class members that are either decorated with a known Angular decorator,
     * or if they correspond to a known Angular lifecycle hook.
     */
    findClassFieldWithAngularFeatures(node) {
        return this.reflector.getMembersOfClass(node).find((member) => {
            if (!member.isStatic &&
                member.kind === reflection_1.ClassMemberKind.Method &&
                LIFECYCLE_HOOKS.has(member.name)) {
                return true;
            }
            if (member.decorators) {
                return member.decorators.some((decorator) => FIELD_DECORATORS.some((decoratorName) => (0, common_1.isAngularDecorator)(decorator, decoratorName, this.isCore)));
            }
            return false;
        });
    }
}
exports.DirectiveDecoratorHandler = DirectiveDecoratorHandler;
