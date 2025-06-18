"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileComponent = compileComponent;
exports.compileDirective = compileDirective;
exports.extendsDirectlyFromObject = extendsDirectlyFromObject;
exports.directiveMetadata = directiveMetadata;
exports.convertToR3QueryMetadata = convertToR3QueryMetadata;
const compiler_facade_1 = require("../../compiler/compiler_facade");
const forward_ref_1 = require("../../di/forward_ref");
const util_1 = require("../../di/jit/util");
const resource_loading_1 = require("../../metadata/resource_loading");
const view_1 = require("../../metadata/view");
const array_utils_1 = require("../../util/array_utils");
const empty_1 = require("../../util/empty");
const ng_dev_mode_1 = require("../../util/ng_dev_mode");
const def_getters_1 = require("../def_getters");
const deps_tracker_1 = require("../deps_tracker/deps_tracker");
const fields_1 = require("../fields");
const stringify_utils_1 = require("../util/stringify_utils");
const environment_1 = require("./environment");
const jit_options_1 = require("./jit_options");
const module_1 = require("./module");
const util_2 = require("./util");
/**
 * Keep track of the compilation depth to avoid reentrancy issues during JIT compilation. This
 * matters in the following scenario:
 *
 * Consider a component 'A' that extends component 'B', both declared in module 'M'. During
 * the compilation of 'A' the definition of 'B' is requested to capture the inheritance chain,
 * potentially triggering compilation of 'B'. If this nested compilation were to trigger
 * `flushModuleScopingQueueAsMuchAsPossible` it may happen that module 'M' is still pending in the
 * queue, resulting in 'A' and 'B' to be patched with the NgModule scope. As the compilation of
 * 'A' is still in progress, this would introduce a circular dependency on its compilation. To avoid
 * this issue, the module scope queue is only flushed for compilations at the depth 0, to ensure
 * all compilations have finished.
 */
let compilationDepth = 0;
/**
 * Compile an Angular component according to its decorator metadata, and patch the resulting
 * component def (ɵcmp) onto the component type.
 *
 * Compilation may be asynchronous (due to the need to resolve URLs for the component template or
 * other resources, for example). In the event that compilation is not immediate, `compileComponent`
 * will enqueue resource resolution into a global queue and will fail to return the `ɵcmp`
 * until the global queue has been resolved with a call to `resolveComponentResources`.
 */
function compileComponent(type, metadata) {
    // Initialize ngDevMode. This must be the first statement in compileComponent.
    // See the `initNgDevMode` docstring for more information.
    (typeof ngDevMode === 'undefined' || ngDevMode) && (0, ng_dev_mode_1.initNgDevMode)();
    let ngComponentDef = null;
    // Metadata may have resources which need to be resolved.
    (0, resource_loading_1.maybeQueueResolutionOfComponentResources)(type, metadata);
    // Note that we're using the same function as `Directive`, because that's only subset of metadata
    // that we need to create the ngFactoryDef. We're avoiding using the component metadata
    // because we'd have to resolve the asynchronous templates.
    addDirectiveFactoryDef(type, metadata);
    Object.defineProperty(type, fields_1.NG_COMP_DEF, {
        get: () => {
            if (ngComponentDef === null) {
                const compiler = (0, compiler_facade_1.getCompilerFacade)({
                    usage: 0 /* JitCompilerUsage.Decorator */,
                    kind: 'component',
                    type: type,
                });
                if ((0, resource_loading_1.componentNeedsResolution)(metadata)) {
                    const error = [`Component '${type.name}' is not resolved:`];
                    if (metadata.templateUrl) {
                        error.push(` - templateUrl: ${metadata.templateUrl}`);
                    }
                    if (metadata.styleUrls && metadata.styleUrls.length) {
                        error.push(` - styleUrls: ${JSON.stringify(metadata.styleUrls)}`);
                    }
                    if (metadata.styleUrl) {
                        error.push(` - styleUrl: ${metadata.styleUrl}`);
                    }
                    error.push(`Did you run and wait for 'resolveComponentResources()'?`);
                    throw new Error(error.join('\n'));
                }
                // This const was called `jitOptions` previously but had to be renamed to `options` because
                // of a bug with Terser that caused optimized JIT builds to throw a `ReferenceError`.
                // This bug was investigated in https://github.com/angular/angular-cli/issues/17264.
                // We should not rename it back until https://github.com/terser/terser/issues/615 is fixed.
                const options = (0, jit_options_1.getJitOptions)();
                let preserveWhitespaces = metadata.preserveWhitespaces;
                if (preserveWhitespaces === undefined) {
                    if (options !== null && options.preserveWhitespaces !== undefined) {
                        preserveWhitespaces = options.preserveWhitespaces;
                    }
                    else {
                        preserveWhitespaces = false;
                    }
                }
                let encapsulation = metadata.encapsulation;
                if (encapsulation === undefined) {
                    if (options !== null && options.defaultEncapsulation !== undefined) {
                        encapsulation = options.defaultEncapsulation;
                    }
                    else {
                        encapsulation = view_1.ViewEncapsulation.Emulated;
                    }
                }
                const templateUrl = metadata.templateUrl || `ng:///${type.name}/template.html`;
                const meta = Object.assign(Object.assign({}, directiveMetadata(type, metadata)), { typeSourceSpan: compiler.createParseSourceSpan('Component', type.name, templateUrl), template: metadata.template || '', preserveWhitespaces, styles: typeof metadata.styles === 'string'
                        ? [metadata.styles]
                        : metadata.styles || empty_1.EMPTY_ARRAY, animations: metadata.animations, 
                    // JIT components are always compiled against an empty set of `declarations`. Instead, the
                    // `directiveDefs` and `pipeDefs` are updated at a later point:
                    //  * for NgModule-based components, they're set when the NgModule which declares the
                    //    component resolves in the module scoping queue
                    //  * for standalone components, they're set just below, after `compileComponent`.
                    declarations: [], changeDetection: metadata.changeDetection, encapsulation, interpolation: metadata.interpolation, viewProviders: metadata.viewProviders || null });
                compilationDepth++;
                try {
                    if (meta.usesInheritance) {
                        addDirectiveDefToUndecoratedParents(type);
                    }
                    ngComponentDef = compiler.compileComponent(environment_1.angularCoreEnv, templateUrl, meta);
                    if (meta.isStandalone) {
                        // Patch the component definition for standalone components with `directiveDefs` and
                        // `pipeDefs` functions which lazily compute the directives/pipes available in the
                        // standalone component. Also set `dependencies` to the lazily resolved list of imports.
                        const imports = (0, array_utils_1.flatten)(metadata.imports || empty_1.EMPTY_ARRAY);
                        const { directiveDefs, pipeDefs } = getStandaloneDefFunctions(type, imports);
                        ngComponentDef.directiveDefs = directiveDefs;
                        ngComponentDef.pipeDefs = pipeDefs;
                        ngComponentDef.dependencies = () => imports.map(forward_ref_1.resolveForwardRef);
                    }
                }
                finally {
                    // Ensure that the compilation depth is decremented even when the compilation failed.
                    compilationDepth--;
                }
                if (compilationDepth === 0) {
                    // When NgModule decorator executed, we enqueued the module definition such that
                    // it would only dequeue and add itself as module scope to all of its declarations,
                    // but only if  if all of its declarations had resolved. This call runs the check
                    // to see if any modules that are in the queue can be dequeued and add scope to
                    // their declarations.
                    (0, module_1.flushModuleScopingQueueAsMuchAsPossible)();
                }
                // If component compilation is async, then the @NgModule annotation which declares the
                // component may execute and set an ngSelectorScope property on the component type. This
                // allows the component to patch itself with directiveDefs from the module after it
                // finishes compiling.
                if (hasSelectorScope(type)) {
                    const scopes = (0, module_1.transitiveScopesFor)(type.ngSelectorScope);
                    (0, module_1.patchComponentDefWithScope)(ngComponentDef, scopes);
                }
                if (metadata.schemas) {
                    if (meta.isStandalone) {
                        ngComponentDef.schemas = metadata.schemas;
                    }
                    else {
                        throw new Error(`The 'schemas' was specified for the ${(0, stringify_utils_1.stringifyForError)(type)} but is only valid on a component that is standalone.`);
                    }
                }
                else if (meta.isStandalone) {
                    ngComponentDef.schemas = [];
                }
            }
            return ngComponentDef;
        },
        set: (def) => {
            ngComponentDef = def;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
/**
 * Build memoized `directiveDefs` and `pipeDefs` functions for the component definition of a
 * standalone component, which process `imports` and filter out directives and pipes. The use of
 * memoized functions here allows for the delayed resolution of any `forwardRef`s present in the
 * component's `imports`.
 */
function getStandaloneDefFunctions(type, imports) {
    let cachedDirectiveDefs = null;
    let cachedPipeDefs = null;
    const directiveDefs = () => {
        if (!deps_tracker_1.USE_RUNTIME_DEPS_TRACKER_FOR_JIT) {
            if (cachedDirectiveDefs === null) {
                // Standalone components are always able to self-reference, so include the component's own
                // definition in its `directiveDefs`.
                cachedDirectiveDefs = [(0, def_getters_1.getComponentDef)(type)];
                const seen = new Set([type]);
                for (const rawDep of imports) {
                    ngDevMode && (0, util_2.verifyStandaloneImport)(rawDep, type);
                    const dep = (0, forward_ref_1.resolveForwardRef)(rawDep);
                    if (seen.has(dep)) {
                        continue;
                    }
                    seen.add(dep);
                    if (!!(0, def_getters_1.getNgModuleDef)(dep)) {
                        const scope = (0, module_1.transitiveScopesFor)(dep);
                        for (const dir of scope.exported.directives) {
                            const def = (0, def_getters_1.getComponentDef)(dir) || (0, def_getters_1.getDirectiveDef)(dir);
                            if (def && !seen.has(dir)) {
                                seen.add(dir);
                                cachedDirectiveDefs.push(def);
                            }
                        }
                    }
                    else {
                        const def = (0, def_getters_1.getComponentDef)(dep) || (0, def_getters_1.getDirectiveDef)(dep);
                        if (def) {
                            cachedDirectiveDefs.push(def);
                        }
                    }
                }
            }
            return cachedDirectiveDefs;
        }
        else {
            if (ngDevMode) {
                for (const rawDep of imports) {
                    (0, util_2.verifyStandaloneImport)(rawDep, type);
                }
            }
            if (!(0, util_2.isComponent)(type)) {
                return [];
            }
            const scope = deps_tracker_1.depsTracker.getStandaloneComponentScope(type, imports);
            return [...scope.compilation.directives]
                .map((p) => ((0, def_getters_1.getComponentDef)(p) || (0, def_getters_1.getDirectiveDef)(p)))
                .filter((d) => d !== null);
        }
    };
    const pipeDefs = () => {
        if (!deps_tracker_1.USE_RUNTIME_DEPS_TRACKER_FOR_JIT) {
            if (cachedPipeDefs === null) {
                cachedPipeDefs = [];
                const seen = new Set();
                for (const rawDep of imports) {
                    const dep = (0, forward_ref_1.resolveForwardRef)(rawDep);
                    if (seen.has(dep)) {
                        continue;
                    }
                    seen.add(dep);
                    if (!!(0, def_getters_1.getNgModuleDef)(dep)) {
                        const scope = (0, module_1.transitiveScopesFor)(dep);
                        for (const pipe of scope.exported.pipes) {
                            const def = (0, def_getters_1.getPipeDef)(pipe);
                            if (def && !seen.has(pipe)) {
                                seen.add(pipe);
                                cachedPipeDefs.push(def);
                            }
                        }
                    }
                    else {
                        const def = (0, def_getters_1.getPipeDef)(dep);
                        if (def) {
                            cachedPipeDefs.push(def);
                        }
                    }
                }
            }
            return cachedPipeDefs;
        }
        else {
            if (ngDevMode) {
                for (const rawDep of imports) {
                    (0, util_2.verifyStandaloneImport)(rawDep, type);
                }
            }
            if (!(0, util_2.isComponent)(type)) {
                return [];
            }
            const scope = deps_tracker_1.depsTracker.getStandaloneComponentScope(type, imports);
            return [...scope.compilation.pipes].map((p) => (0, def_getters_1.getPipeDef)(p)).filter((d) => d !== null);
        }
    };
    return {
        directiveDefs,
        pipeDefs,
    };
}
function hasSelectorScope(component) {
    return component.ngSelectorScope !== undefined;
}
/**
 * Compile an Angular directive according to its decorator metadata, and patch the resulting
 * directive def onto the component type.
 *
 * In the event that compilation is not immediate, `compileDirective` will return a `Promise` which
 * will resolve when compilation completes and the directive becomes usable.
 */
function compileDirective(type, directive) {
    let ngDirectiveDef = null;
    addDirectiveFactoryDef(type, directive || {});
    Object.defineProperty(type, fields_1.NG_DIR_DEF, {
        get: () => {
            if (ngDirectiveDef === null) {
                // `directive` can be null in the case of abstract directives as a base class
                // that use `@Directive()` with no selector. In that case, pass empty object to the
                // `directiveMetadata` function instead of null.
                const meta = getDirectiveMetadata(type, directive || {});
                const compiler = (0, compiler_facade_1.getCompilerFacade)({
                    usage: 0 /* JitCompilerUsage.Decorator */,
                    kind: 'directive',
                    type,
                });
                ngDirectiveDef = compiler.compileDirective(environment_1.angularCoreEnv, meta.sourceMapUrl, meta.metadata);
            }
            return ngDirectiveDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
function getDirectiveMetadata(type, metadata) {
    const name = type && type.name;
    const sourceMapUrl = `ng:///${name}/ɵdir.js`;
    const compiler = (0, compiler_facade_1.getCompilerFacade)({ usage: 0 /* JitCompilerUsage.Decorator */, kind: 'directive', type });
    const facade = directiveMetadata(type, metadata);
    facade.typeSourceSpan = compiler.createParseSourceSpan('Directive', name, sourceMapUrl);
    if (facade.usesInheritance) {
        addDirectiveDefToUndecoratedParents(type);
    }
    return { metadata: facade, sourceMapUrl };
}
function addDirectiveFactoryDef(type, metadata) {
    let ngFactoryDef = null;
    Object.defineProperty(type, fields_1.NG_FACTORY_DEF, {
        get: () => {
            if (ngFactoryDef === null) {
                const meta = getDirectiveMetadata(type, metadata);
                const compiler = (0, compiler_facade_1.getCompilerFacade)({
                    usage: 0 /* JitCompilerUsage.Decorator */,
                    kind: 'directive',
                    type,
                });
                ngFactoryDef = compiler.compileFactory(environment_1.angularCoreEnv, `ng:///${type.name}/ɵfac.js`, {
                    name: meta.metadata.name,
                    type: meta.metadata.type,
                    typeArgumentCount: 0,
                    deps: (0, util_1.reflectDependencies)(type),
                    target: compiler.FactoryTarget.Directive,
                });
            }
            return ngFactoryDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
function extendsDirectlyFromObject(type) {
    return Object.getPrototypeOf(type.prototype) === Object.prototype;
}
/**
 * Extract the `R3DirectiveMetadata` for a particular directive (either a `Directive` or a
 * `Component`).
 */
function directiveMetadata(type, metadata) {
    var _a;
    // Reflect inputs and outputs.
    const reflect = (0, util_1.getReflect)();
    const propMetadata = reflect.ownPropMetadata(type);
    return {
        name: type.name,
        type: type,
        selector: metadata.selector !== undefined ? metadata.selector : null,
        host: metadata.host || empty_1.EMPTY_OBJ,
        propMetadata: propMetadata,
        inputs: metadata.inputs || empty_1.EMPTY_ARRAY,
        outputs: metadata.outputs || empty_1.EMPTY_ARRAY,
        queries: extractQueriesMetadata(type, propMetadata, isContentQuery),
        lifecycle: { usesOnChanges: reflect.hasLifecycleHook(type, 'ngOnChanges') },
        typeSourceSpan: null,
        usesInheritance: !extendsDirectlyFromObject(type),
        exportAs: extractExportAs(metadata.exportAs),
        providers: metadata.providers || null,
        viewQueries: extractQueriesMetadata(type, propMetadata, isViewQuery),
        isStandalone: metadata.standalone === undefined ? true : !!metadata.standalone,
        isSignal: !!metadata.signals,
        hostDirectives: ((_a = metadata.hostDirectives) === null || _a === void 0 ? void 0 : _a.map((directive) => typeof directive === 'function' ? { directive } : directive)) || null,
    };
}
/**
 * Adds a directive definition to all parent classes of a type that don't have an Angular decorator.
 */
function addDirectiveDefToUndecoratedParents(type) {
    const objPrototype = Object.prototype;
    let parent = Object.getPrototypeOf(type.prototype).constructor;
    // Go up the prototype until we hit `Object`.
    while (parent && parent !== objPrototype) {
        // Since inheritance works if the class was annotated already, we only need to add
        // the def if there are no annotations and the def hasn't been created already.
        if (!(0, def_getters_1.getDirectiveDef)(parent) &&
            !(0, def_getters_1.getComponentDef)(parent) &&
            shouldAddAbstractDirective(parent)) {
            compileDirective(parent, null);
        }
        parent = Object.getPrototypeOf(parent);
    }
}
function convertToR3QueryPredicate(selector) {
    return typeof selector === 'string' ? splitByComma(selector) : (0, forward_ref_1.resolveForwardRef)(selector);
}
function convertToR3QueryMetadata(propertyName, ann) {
    return {
        propertyName: propertyName,
        predicate: convertToR3QueryPredicate(ann.selector),
        descendants: ann.descendants,
        first: ann.first,
        read: ann.read ? ann.read : null,
        static: !!ann.static,
        emitDistinctChangesOnly: !!ann.emitDistinctChangesOnly,
        isSignal: !!ann.isSignal,
    };
}
function extractQueriesMetadata(type, propMetadata, isQueryAnn) {
    const queriesMeta = [];
    for (const field in propMetadata) {
        if (propMetadata.hasOwnProperty(field)) {
            const annotations = propMetadata[field];
            annotations.forEach((ann) => {
                if (isQueryAnn(ann)) {
                    if (!ann.selector) {
                        throw new Error(`Can't construct a query for the property "${field}" of ` +
                            `"${(0, stringify_utils_1.stringifyForError)(type)}" since the query selector wasn't defined.`);
                    }
                    if (annotations.some(isInputAnnotation)) {
                        throw new Error(`Cannot combine @Input decorators with query decorators`);
                    }
                    queriesMeta.push(convertToR3QueryMetadata(field, ann));
                }
            });
        }
    }
    return queriesMeta;
}
function extractExportAs(exportAs) {
    return exportAs === undefined ? null : splitByComma(exportAs);
}
function isContentQuery(value) {
    const name = value.ngMetadataName;
    return name === 'ContentChild' || name === 'ContentChildren';
}
function isViewQuery(value) {
    const name = value.ngMetadataName;
    return name === 'ViewChild' || name === 'ViewChildren';
}
function isInputAnnotation(value) {
    return value.ngMetadataName === 'Input';
}
function splitByComma(value) {
    return value.split(',').map((piece) => piece.trim());
}
const LIFECYCLE_HOOKS = [
    'ngOnChanges',
    'ngOnInit',
    'ngOnDestroy',
    'ngDoCheck',
    'ngAfterViewInit',
    'ngAfterViewChecked',
    'ngAfterContentInit',
    'ngAfterContentChecked',
];
function shouldAddAbstractDirective(type) {
    const reflect = (0, util_1.getReflect)();
    if (LIFECYCLE_HOOKS.some((hookName) => reflect.hasLifecycleHook(type, hookName))) {
        return true;
    }
    const propMetadata = reflect.propMetadata(type);
    for (const field in propMetadata) {
        const annotations = propMetadata[field];
        for (let i = 0; i < annotations.length; i++) {
            const current = annotations[i];
            const metadataName = current.ngMetadataName;
            if (isInputAnnotation(current) ||
                isContentQuery(current) ||
                isViewQuery(current) ||
                metadataName === 'Output' ||
                metadataName === 'HostBinding' ||
                metadataName === 'HostListener') {
                return true;
            }
        }
    }
    return false;
}
