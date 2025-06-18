"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentRef = exports.ComponentFactory = exports.ComponentFactoryResolver = void 0;
const signals_1 = require("../../primitives/signals");
const zoneless_scheduling_1 = require("../change_detection/scheduling/zoneless_scheduling");
const r3_injector_1 = require("../di/r3_injector");
const errors_1 = require("../errors");
const component_factory_1 = require("../linker/component_factory");
const component_factory_resolver_1 = require("../linker/component_factory_resolver");
const element_ref_1 = require("../linker/element_ref");
const api_1 = require("../render/api");
const sanitizer_1 = require("../sanitization/sanitizer");
const assert_1 = require("./assert");
const context_discovery_1 = require("./context_discovery");
const def_getters_1 = require("./def_getters");
const deps_tracker_1 = require("./deps_tracker/deps_tracker");
const di_1 = require("./di");
const element_validation_1 = require("./instructions/element_validation");
const mark_view_dirty_1 = require("./instructions/mark_view_dirty");
const render_1 = require("./instructions/render");
const shared_1 = require("./instructions/shared");
const input_flags_1 = require("./interfaces/input_flags");
const view_1 = require("./interfaces/view");
const namespaces_1 = require("./namespaces");
const utils_1 = require("../hydration/utils");
const chained_injector_1 = require("./chained_injector");
const dom_node_manipulation_1 = require("./dom_node_manipulation");
const lview_tracking_1 = require("./interfaces/lview_tracking");
const node_selector_matcher_1 = require("./node_selector_matcher");
const profiler_1 = require("./profiler");
const query_execution_1 = require("./queries/query_execution");
const state_1 = require("./state");
const stringify_utils_1 = require("./util/stringify_utils");
const view_utils_1 = require("./util/view_utils");
const elements_1 = require("./view/elements");
const view_ref_1 = require("./view_ref");
const construction_1 = require("./view/construction");
const dynamic_bindings_1 = require("./dynamic_bindings");
const ng_reflect_1 = require("../ng_reflect");
class ComponentFactoryResolver extends component_factory_resolver_1.ComponentFactoryResolver {
    /**
     * @param ngModule The NgModuleRef to which all resolved factories are bound.
     */
    constructor(ngModule) {
        super();
        this.ngModule = ngModule;
    }
    resolveComponentFactory(component) {
        ngDevMode && (0, assert_1.assertComponentType)(component);
        const componentDef = (0, def_getters_1.getComponentDef)(component);
        return new ComponentFactory(componentDef, this.ngModule);
    }
}
exports.ComponentFactoryResolver = ComponentFactoryResolver;
function toInputRefArray(map) {
    return Object.keys(map).map((name) => {
        const [propName, flags, transform] = map[name];
        const inputData = {
            propName: propName,
            templateName: name,
            isSignal: (flags & input_flags_1.InputFlags.SignalBased) !== 0,
        };
        if (transform) {
            inputData.transform = transform;
        }
        return inputData;
    });
}
function toOutputRefArray(map) {
    return Object.keys(map).map((name) => ({ propName: map[name], templateName: name }));
}
function verifyNotAnOrphanComponent(componentDef) {
    var _a;
    // TODO(pk): create assert that verifies ngDevMode
    if ((typeof ngJitMode === 'undefined' || ngJitMode) &&
        ((_a = componentDef.debugInfo) === null || _a === void 0 ? void 0 : _a.forbidOrphanRendering)) {
        if (deps_tracker_1.depsTracker.isOrphanComponent(componentDef.type)) {
            throw new errors_1.RuntimeError(981 /* RuntimeErrorCode.RUNTIME_DEPS_ORPHAN_COMPONENT */, `Orphan component found! Trying to render the component ${(0, stringify_utils_1.debugStringifyTypeForError)(componentDef.type)} without first loading the NgModule that declares it. It is recommended to make this component standalone in order to avoid this error. If this is not possible now, import the component's NgModule in the appropriate NgModule, or the standalone component in which you are trying to render this component. If this is a lazy import, load the NgModule lazily as well and use its module injector.`);
        }
    }
}
function createRootViewInjector(componentDef, environmentInjector, injector) {
    let realEnvironmentInjector = environmentInjector instanceof r3_injector_1.EnvironmentInjector
        ? environmentInjector
        : environmentInjector === null || environmentInjector === void 0 ? void 0 : environmentInjector.injector;
    if (realEnvironmentInjector && componentDef.getStandaloneInjector !== null) {
        realEnvironmentInjector =
            componentDef.getStandaloneInjector(realEnvironmentInjector) || realEnvironmentInjector;
    }
    const rootViewInjector = realEnvironmentInjector
        ? new chained_injector_1.ChainedInjector(injector, realEnvironmentInjector)
        : injector;
    return rootViewInjector;
}
function createRootLViewEnvironment(rootLViewInjector) {
    const rendererFactory = rootLViewInjector.get(api_1.RendererFactory2, null);
    if (rendererFactory === null) {
        throw new errors_1.RuntimeError(407 /* RuntimeErrorCode.RENDERER_NOT_FOUND */, ngDevMode &&
            'Angular was not able to inject a renderer (RendererFactory2). ' +
                'Likely this is due to a broken DI hierarchy. ' +
                'Make sure that any injector used to create this component has a correct parent.');
    }
    const sanitizer = rootLViewInjector.get(sanitizer_1.Sanitizer, null);
    const changeDetectionScheduler = rootLViewInjector.get(zoneless_scheduling_1.ChangeDetectionScheduler, null);
    let ngReflect = false;
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        ngReflect = rootLViewInjector.get(ng_reflect_1.NG_REFLECT_ATTRS_FLAG, ng_reflect_1.NG_REFLECT_ATTRS_FLAG_DEFAULT);
    }
    return {
        rendererFactory,
        sanitizer,
        changeDetectionScheduler,
        ngReflect,
    };
}
function createHostElement(componentDef, render) {
    // Determine a tag name used for creating host elements when this component is created
    // dynamically. Default to 'div' if this component did not specify any tag name in its
    // selector.
    const tagName = (componentDef.selectors[0][0] || 'div').toLowerCase();
    const namespace = tagName === 'svg' ? namespaces_1.SVG_NAMESPACE : tagName === 'math' ? namespaces_1.MATH_ML_NAMESPACE : null;
    return (0, dom_node_manipulation_1.createElementNode)(render, tagName, namespace);
}
/**
 * ComponentFactory interface implementation.
 */
class ComponentFactory extends component_factory_1.ComponentFactory {
    get inputs() {
        var _a;
        (_a = this.cachedInputs) !== null && _a !== void 0 ? _a : (this.cachedInputs = toInputRefArray(this.componentDef.inputs));
        return this.cachedInputs;
    }
    get outputs() {
        var _a;
        (_a = this.cachedOutputs) !== null && _a !== void 0 ? _a : (this.cachedOutputs = toOutputRefArray(this.componentDef.outputs));
        return this.cachedOutputs;
    }
    /**
     * @param componentDef The component definition.
     * @param ngModule The NgModuleRef to which the factory is bound.
     */
    constructor(componentDef, ngModule) {
        var _a;
        super();
        this.componentDef = componentDef;
        this.ngModule = ngModule;
        this.cachedInputs = null;
        this.cachedOutputs = null;
        this.componentType = componentDef.type;
        this.selector = (0, node_selector_matcher_1.stringifyCSSSelectorList)(componentDef.selectors);
        this.ngContentSelectors = (_a = componentDef.ngContentSelectors) !== null && _a !== void 0 ? _a : [];
        this.isBoundToModule = !!ngModule;
    }
    create(injector, projectableNodes, rootSelectorOrNode, environmentInjector, directives, componentBindings) {
        (0, profiler_1.profiler)(22 /* ProfilerEvent.DynamicComponentStart */);
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            const cmpDef = this.componentDef;
            ngDevMode && verifyNotAnOrphanComponent(cmpDef);
            const rootTView = createRootTView(rootSelectorOrNode, cmpDef, componentBindings, directives);
            const rootViewInjector = createRootViewInjector(cmpDef, environmentInjector || this.ngModule, injector);
            const environment = createRootLViewEnvironment(rootViewInjector);
            const hostRenderer = environment.rendererFactory.createRenderer(null, cmpDef);
            const hostElement = rootSelectorOrNode
                ? (0, shared_1.locateHostElement)(hostRenderer, rootSelectorOrNode, cmpDef.encapsulation, rootViewInjector)
                : createHostElement(cmpDef, hostRenderer);
            const hasInputBindings = (componentBindings === null || componentBindings === void 0 ? void 0 : componentBindings.some(isInputBinding)) ||
                (directives === null || directives === void 0 ? void 0 : directives.some((d) => typeof d !== 'function' && d.bindings.some(isInputBinding)));
            const rootLView = (0, construction_1.createLView)(null, rootTView, null, 512 /* LViewFlags.IsRoot */ | (0, construction_1.getInitialLViewFlagsFromDef)(cmpDef), null, null, environment, hostRenderer, rootViewInjector, null, (0, utils_1.retrieveHydrationInfo)(hostElement, rootViewInjector, true /* isRootView */));
            rootLView[view_1.HEADER_OFFSET] = hostElement;
            // rootView is the parent when bootstrapping
            // TODO(misko): it looks like we are entering view here but we don't really need to as
            // `renderView` does that. However as the code is written it is needed because
            // `createRootComponentView` and `createRootComponent` both read global state. Fixing those
            // issues would allow us to drop this.
            (0, state_1.enterView)(rootLView);
            let componentView = null;
            try {
                const hostTNode = (0, elements_1.elementStartFirstCreatePass)(view_1.HEADER_OFFSET, rootTView, rootLView, '#host', () => rootTView.directiveRegistry, true, 0);
                // ---- element instruction
                // TODO(crisbeto): in practice `hostElement` should always be defined, but there are some
                // tests where the renderer is mocked out and `undefined` is returned. We should update the
                // tests so that this check can be removed.
                if (hostElement) {
                    (0, dom_node_manipulation_1.setupStaticAttributes)(hostRenderer, hostElement, hostTNode);
                    (0, context_discovery_1.attachPatchData)(hostElement, rootLView);
                }
                // TODO(pk): this logic is similar to the instruction code where a node can have directives
                (0, shared_1.createDirectivesInstances)(rootTView, rootLView, hostTNode);
                (0, query_execution_1.executeContentQueries)(rootTView, hostTNode, rootLView);
                (0, elements_1.elementEndFirstCreatePass)(rootTView, hostTNode);
                if (projectableNodes !== undefined) {
                    projectNodes(hostTNode, this.ngContentSelectors, projectableNodes);
                }
                componentView = (0, view_utils_1.getComponentLViewByIndex)(hostTNode.index, rootLView);
                // TODO(pk): why do we need this logic?
                rootLView[view_1.CONTEXT] = componentView[view_1.CONTEXT];
                (0, render_1.renderView)(rootTView, rootLView, null);
            }
            catch (e) {
                // Stop tracking the views if creation failed since
                // the consumer won't have a way to dereference them.
                if (componentView !== null) {
                    (0, lview_tracking_1.unregisterLView)(componentView);
                }
                (0, lview_tracking_1.unregisterLView)(rootLView);
                throw e;
            }
            finally {
                (0, profiler_1.profiler)(23 /* ProfilerEvent.DynamicComponentEnd */);
                (0, state_1.leaveView)();
            }
            return new ComponentRef(this.componentType, rootLView, !!hasInputBindings);
        }
        finally {
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    }
}
exports.ComponentFactory = ComponentFactory;
function createRootTView(rootSelectorOrNode, componentDef, componentBindings, directives) {
    const tAttributes = rootSelectorOrNode
        ? ['ng-version', '0.0.0-PLACEHOLDER']
        : // Extract attributes and classes from the first selector only to match VE behavior.
            (0, node_selector_matcher_1.extractAttrsAndClassesFromSelector)(componentDef.selectors[0]);
    let creationBindings = null;
    let updateBindings = null;
    let varsToAllocate = 0;
    if (componentBindings) {
        for (const binding of componentBindings) {
            varsToAllocate += binding[dynamic_bindings_1.BINDING].requiredVars;
            if (binding.create) {
                binding.targetIdx = 0;
                (creationBindings !== null && creationBindings !== void 0 ? creationBindings : (creationBindings = [])).push(binding);
            }
            if (binding.update) {
                binding.targetIdx = 0;
                (updateBindings !== null && updateBindings !== void 0 ? updateBindings : (updateBindings = [])).push(binding);
            }
        }
    }
    if (directives) {
        for (let i = 0; i < directives.length; i++) {
            const directive = directives[i];
            if (typeof directive !== 'function') {
                for (const binding of directive.bindings) {
                    varsToAllocate += binding[dynamic_bindings_1.BINDING].requiredVars;
                    const targetDirectiveIdx = i + 1;
                    if (binding.create) {
                        binding.targetIdx = targetDirectiveIdx;
                        (creationBindings !== null && creationBindings !== void 0 ? creationBindings : (creationBindings = [])).push(binding);
                    }
                    if (binding.update) {
                        binding.targetIdx = targetDirectiveIdx;
                        (updateBindings !== null && updateBindings !== void 0 ? updateBindings : (updateBindings = [])).push(binding);
                    }
                }
            }
        }
    }
    const directivesToApply = [componentDef];
    if (directives) {
        for (const directive of directives) {
            const directiveType = typeof directive === 'function' ? directive : directive.type;
            const directiveDef = ngDevMode
                ? (0, def_getters_1.getDirectiveDefOrThrow)(directiveType)
                : (0, def_getters_1.getDirectiveDef)(directiveType);
            if (ngDevMode && !directiveDef.standalone) {
                throw new errors_1.RuntimeError(907 /* RuntimeErrorCode.TYPE_IS_NOT_STANDALONE */, `The ${(0, stringify_utils_1.stringifyForError)(directiveType)} directive must be standalone in ` +
                    `order to be applied to a dynamically-created component.`);
            }
            directivesToApply.push(directiveDef);
        }
    }
    const rootTView = (0, construction_1.createTView)(0 /* TViewType.Root */, null, getRootTViewTemplate(creationBindings, updateBindings), 1, varsToAllocate, directivesToApply, null, null, null, [tAttributes], null);
    return rootTView;
}
function getRootTViewTemplate(creationBindings, updateBindings) {
    if (!creationBindings && !updateBindings) {
        return null;
    }
    return (flags) => {
        if (flags & 1 /* RenderFlags.Create */ && creationBindings) {
            for (const binding of creationBindings) {
                binding.create();
            }
        }
        if (flags & 2 /* RenderFlags.Update */ && updateBindings) {
            for (const binding of updateBindings) {
                binding.update();
            }
        }
    };
}
function isInputBinding(binding) {
    const kind = binding[dynamic_bindings_1.BINDING].kind;
    return kind === 'input' || kind === 'twoWay';
}
/**
 * Represents an instance of a Component created via a {@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
 * method.
 *
 */
class ComponentRef extends component_factory_1.ComponentRef {
    constructor(componentType, _rootLView, _hasInputBindings) {
        super();
        this._rootLView = _rootLView;
        this._hasInputBindings = _hasInputBindings;
        this.previousInputValues = null;
        this._tNode = (0, view_utils_1.getTNode)(_rootLView[view_1.TVIEW], view_1.HEADER_OFFSET);
        this.location = (0, element_ref_1.createElementRef)(this._tNode, _rootLView);
        this.instance = (0, view_utils_1.getComponentLViewByIndex)(this._tNode.index, _rootLView)[view_1.CONTEXT];
        this.hostView = this.changeDetectorRef = new view_ref_1.ViewRef(_rootLView, undefined /* _cdRefInjectingView */);
        this.componentType = componentType;
    }
    setInput(name, value) {
        var _a;
        if (this._hasInputBindings && ngDevMode) {
            throw new errors_1.RuntimeError(317 /* RuntimeErrorCode.INVALID_SET_INPUT_CALL */, 'Cannot call `setInput` on a component that is using the `inputBinding` or `twoWayBinding` functions.');
        }
        const tNode = this._tNode;
        (_a = this.previousInputValues) !== null && _a !== void 0 ? _a : (this.previousInputValues = new Map());
        // Do not set the input if it is the same as the last value
        // This behavior matches `bindingUpdated` when binding inputs in templates.
        if (this.previousInputValues.has(name) &&
            Object.is(this.previousInputValues.get(name), value)) {
            return;
        }
        const lView = this._rootLView;
        const hasSetInput = (0, shared_1.setAllInputsForProperty)(tNode, lView[view_1.TVIEW], lView, name, value);
        this.previousInputValues.set(name, value);
        const childComponentLView = (0, view_utils_1.getComponentLViewByIndex)(tNode.index, lView);
        (0, mark_view_dirty_1.markViewDirty)(childComponentLView, 1 /* NotificationSource.SetInput */);
        if (ngDevMode && !hasSetInput) {
            const cmpNameForError = (0, stringify_utils_1.stringifyForError)(this.componentType);
            let message = `Can't set value of the '${name}' input on the '${cmpNameForError}' component. `;
            message += `Make sure that the '${name}' property is annotated with @Input() or a mapped @Input('${name}') exists.`;
            (0, element_validation_1.reportUnknownPropertyError)(message);
        }
    }
    get injector() {
        return new di_1.NodeInjector(this._tNode, this._rootLView);
    }
    destroy() {
        this.hostView.destroy();
    }
    onDestroy(callback) {
        this.hostView.onDestroy(callback);
    }
}
exports.ComponentRef = ComponentRef;
/** Projects the `projectableNodes` that were specified when creating a root component. */
function projectNodes(tNode, ngContentSelectors, projectableNodes) {
    const projection = (tNode.projection = []);
    for (let i = 0; i < ngContentSelectors.length; i++) {
        const nodesforSlot = projectableNodes[i];
        // Projectable nodes can be passed as array of arrays or an array of iterables (ngUpgrade
        // case). Here we do normalize passed data structure to be an array of arrays to avoid
        // complex checks down the line.
        // We also normalize the length of the passed in projectable nodes (to match the number of
        // <ng-container> slots defined by a component).
        projection.push(nodesforSlot != null && nodesforSlot.length ? Array.from(nodesforSlot) : null);
    }
}
