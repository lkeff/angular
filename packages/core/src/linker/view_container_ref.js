"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewContainerRef = void 0;
exports.injectViewContainerRef = injectViewContainerRef;
exports.createContainerRef = createContainerRef;
exports.populateDehydratedViewsInLContainer = populateDehydratedViewsInLContainer;
exports.enableLocateOrCreateContainerRefImpl = enableLocateOrCreateContainerRefImpl;
const r3_injector_1 = require("../di/r3_injector");
const error_handling_1 = require("../hydration/error_handling");
const interfaces_1 = require("../hydration/interfaces");
const skip_hydration_1 = require("../hydration/skip_hydration");
const utils_1 = require("../hydration/utils");
const views_1 = require("../hydration/views");
const type_1 = require("../interface/type");
const assert_1 = require("../render3/assert");
const component_ref_1 = require("../render3/component_ref");
const def_getters_1 = require("../render3/def_getters");
const di_1 = require("../render3/di");
const container_1 = require("../render3/interfaces/container");
const type_checks_1 = require("../render3/interfaces/type_checks");
const view_1 = require("../render3/interfaces/view");
const node_assert_1 = require("../render3/node_assert");
const node_manipulation_1 = require("../render3/node_manipulation");
const dom_node_manipulation_1 = require("../render3/dom_node_manipulation");
const state_1 = require("../render3/state");
const injector_utils_1 = require("../render3/util/injector_utils");
const view_utils_1 = require("../render3/util/view_utils");
const view_manipulation_1 = require("../render3/view_manipulation");
const view_ref_1 = require("../render3/view_ref");
const array_utils_1 = require("../util/array_utils");
const assert_2 = require("../util/assert");
const element_ref_1 = require("./element_ref");
const container_2 = require("../render3/view/container");
const construction_1 = require("../render3/view/construction");
/**
 * Represents a container where one or more views can be attached to a component.
 *
 * Can contain *host views* (created by instantiating a
 * component with the `createComponent()` method), and *embedded views*
 * (created by instantiating a `TemplateRef` with the `createEmbeddedView()` method).
 *
 * A view container instance can contain other view containers,
 * creating a view hierarchy.
 *
 * @usageNotes
 *
 * The example below demonstrates how the `createComponent` function can be used
 * to create an instance of a ComponentRef dynamically and attach it to an ApplicationRef,
 * so that it gets included into change detection cycles.
 *
 * Note: the example uses standalone components, but the function can also be used for
 * non-standalone components (declared in an NgModule) as well.
 *
 * ```angular-ts
 * @Component({
 *   standalone: true,
 *   selector: 'dynamic',
 *   template: `<span>This is a content of a dynamic component.</span>`,
 * })
 * class DynamicComponent {
 *   vcr = inject(ViewContainerRef);
 * }
 *
 * @Component({
 *   standalone: true,
 *   selector: 'app',
 *   template: `<main>Hi! This is the main content.</main>`,
 * })
 * class AppComponent {
 *   vcr = inject(ViewContainerRef);
 *
 *   ngAfterViewInit() {
 *     const compRef = this.vcr.createComponent(DynamicComponent);
 *     compRef.changeDetectorRef.detectChanges();
 *   }
 * }
 * ```
 *
 * @see {@link ComponentRef}
 * @see {@link EmbeddedViewRef}
 *
 * @publicApi
 */
class ViewContainerRef {
}
exports.ViewContainerRef = ViewContainerRef;
/**
 * @internal
 * @nocollapse
 */
ViewContainerRef.__NG_ELEMENT_ID__ = injectViewContainerRef;
/**
 * Creates a ViewContainerRef and stores it on the injector. Or, if the ViewContainerRef
 * already exists, retrieves the existing ViewContainerRef.
 *
 * @returns The ViewContainerRef instance to use
 */
function injectViewContainerRef() {
    const previousTNode = (0, state_1.getCurrentTNode)();
    return createContainerRef(previousTNode, (0, state_1.getLView)());
}
const VE_ViewContainerRef = ViewContainerRef;
// TODO(alxhub): cleaning up this indirection triggers a subtle bug in Closure in g3. Once the fix
// for that lands, this can be cleaned up.
const R3ViewContainerRef = class ViewContainerRef extends VE_ViewContainerRef {
    constructor(_lContainer, _hostTNode, _hostLView) {
        super();
        this._lContainer = _lContainer;
        this._hostTNode = _hostTNode;
        this._hostLView = _hostLView;
    }
    get element() {
        return (0, element_ref_1.createElementRef)(this._hostTNode, this._hostLView);
    }
    get injector() {
        return new di_1.NodeInjector(this._hostTNode, this._hostLView);
    }
    /** @deprecated No replacement */
    get parentInjector() {
        const parentLocation = (0, di_1.getParentInjectorLocation)(this._hostTNode, this._hostLView);
        if ((0, injector_utils_1.hasParentInjector)(parentLocation)) {
            const parentView = (0, injector_utils_1.getParentInjectorView)(parentLocation, this._hostLView);
            const injectorIndex = (0, injector_utils_1.getParentInjectorIndex)(parentLocation);
            ngDevMode && (0, assert_1.assertNodeInjector)(parentView, injectorIndex);
            const parentTNode = parentView[view_1.TVIEW].data[injectorIndex + 8 /* NodeInjectorOffset.TNODE */];
            return new di_1.NodeInjector(parentTNode, parentView);
        }
        else {
            return new di_1.NodeInjector(null, this._hostLView);
        }
    }
    clear() {
        while (this.length > 0) {
            this.remove(this.length - 1);
        }
    }
    get(index) {
        const viewRefs = getViewRefs(this._lContainer);
        return (viewRefs !== null && viewRefs[index]) || null;
    }
    get length() {
        return this._lContainer.length - container_1.CONTAINER_HEADER_OFFSET;
    }
    createEmbeddedView(templateRef, context, indexOrOptions) {
        let index;
        let injector;
        if (typeof indexOrOptions === 'number') {
            index = indexOrOptions;
        }
        else if (indexOrOptions != null) {
            index = indexOrOptions.index;
            injector = indexOrOptions.injector;
        }
        const dehydratedView = (0, views_1.findMatchingDehydratedView)(this._lContainer, templateRef.ssrId);
        const viewRef = templateRef.createEmbeddedViewImpl(context || {}, injector, dehydratedView);
        this.insertImpl(viewRef, index, (0, view_manipulation_1.shouldAddViewToDom)(this._hostTNode, dehydratedView));
        return viewRef;
    }
    createComponent(componentFactoryOrType, indexOrOptions, injector, projectableNodes, environmentInjector, directives, bindings) {
        var _a, _b, _c;
        const isComponentFactory = componentFactoryOrType && !(0, type_1.isType)(componentFactoryOrType);
        let index;
        // This function supports 2 signatures and we need to handle options correctly for both:
        //   1. When first argument is a Component type. This signature also requires extra
        //      options to be provided as object (more ergonomic option).
        //   2. First argument is a Component factory. In this case extra options are represented as
        //      positional arguments. This signature is less ergonomic and will be deprecated.
        if (isComponentFactory) {
            if (ngDevMode) {
                (0, assert_2.assertEqual)(typeof indexOrOptions !== 'object', true, 'It looks like Component factory was provided as the first argument ' +
                    'and an options object as the second argument. This combination of arguments ' +
                    'is incompatible. You can either change the first argument to provide Component ' +
                    'type or change the second argument to be a number (representing an index at ' +
                    "which to insert the new component's host view into this container)");
            }
            index = indexOrOptions;
        }
        else {
            if (ngDevMode) {
                (0, assert_2.assertDefined)((0, def_getters_1.getComponentDef)(componentFactoryOrType), `Provided Component class doesn't contain Component definition. ` +
                    `Please check whether provided class has @Component decorator.`);
                (0, assert_2.assertEqual)(typeof indexOrOptions !== 'number', true, 'It looks like Component type was provided as the first argument ' +
                    "and a number (representing an index at which to insert the new component's " +
                    'host view into this container as the second argument. This combination of arguments ' +
                    'is incompatible. Please use an object as the second argument instead.');
            }
            const options = (indexOrOptions || {});
            if (ngDevMode && options.environmentInjector && options.ngModuleRef) {
                (0, assert_2.throwError)(`Cannot pass both environmentInjector and ngModuleRef options to createComponent().`);
            }
            index = options.index;
            injector = options.injector;
            projectableNodes = options.projectableNodes;
            environmentInjector = options.environmentInjector || options.ngModuleRef;
            directives = options.directives;
            bindings = options.bindings;
        }
        const componentFactory = isComponentFactory
            ? componentFactoryOrType
            : new component_ref_1.ComponentFactory((0, def_getters_1.getComponentDef)(componentFactoryOrType));
        const contextInjector = injector || this.parentInjector;
        // If an `NgModuleRef` is not provided explicitly, try retrieving it from the DI tree.
        if (!environmentInjector && componentFactory.ngModule == null) {
            // For the `ComponentFactory` case, entering this logic is very unlikely, since we expect that
            // an instance of a `ComponentFactory`, resolved via `ComponentFactoryResolver` would have an
            // `ngModule` field. This is possible in some test scenarios and potentially in some JIT-based
            // use-cases. For the `ComponentFactory` case we preserve backwards-compatibility and try
            // using a provided injector first, then fall back to the parent injector of this
            // `ViewContainerRef` instance.
            //
            // For the factory-less case, it's critical to establish a connection with the module
            // injector tree (by retrieving an instance of an `NgModuleRef` and accessing its injector),
            // so that a component can use DI tokens provided in MgModules. For this reason, we can not
            // rely on the provided injector, since it might be detached from the DI tree (for example, if
            // it was created via `Injector.create` without specifying a parent injector, or if an
            // injector is retrieved from an `NgModuleRef` created via `createNgModule` using an
            // NgModule outside of a module tree). Instead, we always use `ViewContainerRef`'s parent
            // injector, which is normally connected to the DI tree, which includes module injector
            // subtree.
            const _injector = isComponentFactory ? contextInjector : this.parentInjector;
            // DO NOT REFACTOR. The code here used to have a `injector.get(NgModuleRef, null) ||
            // undefined` expression which seems to cause internal google apps to fail. This is documented
            // in the following internal bug issue: go/b/142967802
            const result = _injector.get(r3_injector_1.EnvironmentInjector, null);
            if (result) {
                environmentInjector = result;
            }
        }
        const componentDef = (0, def_getters_1.getComponentDef)((_a = componentFactory.componentType) !== null && _a !== void 0 ? _a : {});
        const dehydratedView = (0, views_1.findMatchingDehydratedView)(this._lContainer, (_b = componentDef === null || componentDef === void 0 ? void 0 : componentDef.id) !== null && _b !== void 0 ? _b : null);
        const rNode = (_c = dehydratedView === null || dehydratedView === void 0 ? void 0 : dehydratedView.firstChild) !== null && _c !== void 0 ? _c : null;
        const componentRef = componentFactory.create(contextInjector, projectableNodes, rNode, environmentInjector, directives, bindings);
        this.insertImpl(componentRef.hostView, index, (0, view_manipulation_1.shouldAddViewToDom)(this._hostTNode, dehydratedView));
        return componentRef;
    }
    insert(viewRef, index) {
        return this.insertImpl(viewRef, index, true);
    }
    insertImpl(viewRef, index, addToDOM) {
        const lView = viewRef._lView;
        if (ngDevMode && viewRef.destroyed) {
            throw new Error('Cannot insert a destroyed View in a ViewContainer!');
        }
        if ((0, view_utils_1.viewAttachedToContainer)(lView)) {
            // If view is already attached, detach it first so we clean up references appropriately.
            const prevIdx = this.indexOf(viewRef);
            // A view might be attached either to this or a different container. The `prevIdx` for
            // those cases will be:
            // equal to -1 for views attached to this ViewContainerRef
            // >= 0 for views attached to a different ViewContainerRef
            if (prevIdx !== -1) {
                this.detach(prevIdx);
            }
            else {
                const prevLContainer = lView[view_1.PARENT];
                ngDevMode &&
                    (0, assert_2.assertEqual)((0, type_checks_1.isLContainer)(prevLContainer), true, 'An attached view should have its PARENT point to a container.');
                // We need to re-create a R3ViewContainerRef instance since those are not stored on
                // LView (nor anywhere else).
                const prevVCRef = new R3ViewContainerRef(prevLContainer, prevLContainer[view_1.T_HOST], prevLContainer[view_1.PARENT]);
                prevVCRef.detach(prevVCRef.indexOf(viewRef));
            }
        }
        // Logical operation of adding `LView` to `LContainer`
        const adjustedIdx = this._adjustIndex(index);
        const lContainer = this._lContainer;
        (0, container_2.addLViewToLContainer)(lContainer, lView, adjustedIdx, addToDOM);
        viewRef.attachToViewContainerRef();
        (0, array_utils_1.addToArray)(getOrCreateViewRefs(lContainer), adjustedIdx, viewRef);
        return viewRef;
    }
    move(viewRef, newIndex) {
        if (ngDevMode && viewRef.destroyed) {
            throw new Error('Cannot move a destroyed View in a ViewContainer!');
        }
        return this.insert(viewRef, newIndex);
    }
    indexOf(viewRef) {
        const viewRefsArr = getViewRefs(this._lContainer);
        return viewRefsArr !== null ? viewRefsArr.indexOf(viewRef) : -1;
    }
    remove(index) {
        const adjustedIdx = this._adjustIndex(index, -1);
        const detachedView = (0, container_2.detachView)(this._lContainer, adjustedIdx);
        if (detachedView) {
            // Before destroying the view, remove it from the container's array of `ViewRef`s.
            // This ensures the view container length is updated before calling
            // `destroyLView`, which could recursively call view container methods that
            // rely on an accurate container length.
            // (e.g. a method on this view container being called by a child directive's OnDestroy
            // lifecycle hook)
            (0, array_utils_1.removeFromArray)(getOrCreateViewRefs(this._lContainer), adjustedIdx);
            (0, node_manipulation_1.destroyLView)(detachedView[view_1.TVIEW], detachedView);
        }
    }
    detach(index) {
        const adjustedIdx = this._adjustIndex(index, -1);
        const view = (0, container_2.detachView)(this._lContainer, adjustedIdx);
        const wasDetached = view && (0, array_utils_1.removeFromArray)(getOrCreateViewRefs(this._lContainer), adjustedIdx) != null;
        return wasDetached ? new view_ref_1.ViewRef(view) : null;
    }
    _adjustIndex(index, shift = 0) {
        if (index == null) {
            return this.length + shift;
        }
        if (ngDevMode) {
            (0, assert_2.assertGreaterThan)(index, -1, `ViewRef index must be positive, got ${index}`);
            // +1 because it's legal to insert at the end.
            (0, assert_2.assertLessThan)(index, this.length + 1 + shift, 'index');
        }
        return index;
    }
};
function getViewRefs(lContainer) {
    return lContainer[container_1.VIEW_REFS];
}
function getOrCreateViewRefs(lContainer) {
    return (lContainer[container_1.VIEW_REFS] || (lContainer[container_1.VIEW_REFS] = []));
}
/**
 * Creates a ViewContainerRef and stores it on the injector.
 *
 * @param hostTNode The node that is requesting a ViewContainerRef
 * @param hostLView The view to which the node belongs
 * @returns The ViewContainerRef instance to use
 */
function createContainerRef(hostTNode, hostLView) {
    ngDevMode && (0, node_assert_1.assertTNodeType)(hostTNode, 12 /* TNodeType.AnyContainer */ | 3 /* TNodeType.AnyRNode */);
    let lContainer;
    const slotValue = hostLView[hostTNode.index];
    if ((0, type_checks_1.isLContainer)(slotValue)) {
        // If the host is a container, we don't need to create a new LContainer
        lContainer = slotValue;
    }
    else {
        // An LContainer anchor can not be `null`, but we set it here temporarily
        // and update to the actual value later in this function (see
        // `_locateOrCreateAnchorNode`).
        lContainer = (0, container_2.createLContainer)(slotValue, hostLView, null, hostTNode);
        hostLView[hostTNode.index] = lContainer;
        (0, construction_1.addToEndOfViewTree)(hostLView, lContainer);
    }
    _locateOrCreateAnchorNode(lContainer, hostLView, hostTNode, slotValue);
    return new R3ViewContainerRef(lContainer, hostTNode, hostLView);
}
/**
 * Creates and inserts a comment node that acts as an anchor for a view container.
 *
 * If the host is a regular element, we have to insert a comment node manually which will
 * be used as an anchor when inserting elements. In this specific case we use low-level DOM
 * manipulation to insert it.
 */
function insertAnchorNode(hostLView, hostTNode) {
    const renderer = hostLView[view_1.RENDERER];
    const commentNode = renderer.createComment(ngDevMode ? 'container' : '');
    const hostNative = (0, view_utils_1.getNativeByTNode)(hostTNode, hostLView);
    const parentOfHostNative = renderer.parentNode(hostNative);
    (0, dom_node_manipulation_1.nativeInsertBefore)(renderer, parentOfHostNative, commentNode, renderer.nextSibling(hostNative), false);
    return commentNode;
}
let _locateOrCreateAnchorNode = createAnchorNode;
let _populateDehydratedViewsInLContainer = () => false; // noop by default
/**
 * Looks up dehydrated views that belong to a given LContainer and populates
 * this information into the `LContainer[DEHYDRATED_VIEWS]` slot. When running
 * in client-only mode, this function is a noop.
 *
 * @param lContainer LContainer that should be populated.
 * @param tNode Corresponding TNode.
 * @param hostLView LView that hosts LContainer.
 * @returns a boolean flag that indicates whether a populating operation
 *   was successful. The operation might be unsuccessful in case is has completed
 *   previously, we are rendering in client-only mode or this content is located
 *   in a skip hydration section.
 */
function populateDehydratedViewsInLContainer(lContainer, tNode, hostLView) {
    return _populateDehydratedViewsInLContainer(lContainer, tNode, hostLView);
}
/**
 * Regular creation mode: an anchor is created and
 * assigned to the `lContainer[NATIVE]` slot.
 */
function createAnchorNode(lContainer, hostLView, hostTNode, slotValue) {
    // We already have a native element (anchor) set, return.
    if (lContainer[container_1.NATIVE])
        return;
    let commentNode;
    // If the host is an element container, the native host element is guaranteed to be a
    // comment and we can reuse that comment as anchor element for the new LContainer.
    // The comment node in question is already part of the DOM structure so we don't need to append
    // it again.
    if (hostTNode.type & 8 /* TNodeType.ElementContainer */) {
        commentNode = (0, view_utils_1.unwrapRNode)(slotValue);
    }
    else {
        commentNode = insertAnchorNode(hostLView, hostTNode);
    }
    lContainer[container_1.NATIVE] = commentNode;
}
/**
 * Hydration logic that looks up all dehydrated views in this container
 * and puts them into `lContainer[DEHYDRATED_VIEWS]` slot.
 *
 * @returns a boolean flag that indicates whether a populating operation
 *   was successful. The operation might be unsuccessful in case is has completed
 *   previously, we are rendering in client-only mode or this content is located
 *   in a skip hydration section.
 */
function populateDehydratedViewsInLContainerImpl(lContainer, tNode, hostLView) {
    var _a;
    // We already have a native element (anchor) set and the process
    // of finding dehydrated views happened (so the `lContainer[DEHYDRATED_VIEWS]`
    // is not null), exit early.
    if (lContainer[container_1.NATIVE] && lContainer[container_1.DEHYDRATED_VIEWS]) {
        return true;
    }
    const hydrationInfo = hostLView[view_1.HYDRATION];
    const noOffsetIndex = tNode.index - view_1.HEADER_OFFSET;
    const isNodeCreationMode = !hydrationInfo ||
        (0, skip_hydration_1.isInSkipHydrationBlock)(tNode) ||
        (0, utils_1.isDisconnectedNode)(hydrationInfo, noOffsetIndex);
    // Regular creation mode.
    if (isNodeCreationMode) {
        return false;
    }
    // Hydration mode, looking up an anchor node and dehydrated views in DOM.
    const currentRNode = (0, utils_1.getSegmentHead)(hydrationInfo, noOffsetIndex);
    const serializedViews = (_a = hydrationInfo.data[interfaces_1.CONTAINERS]) === null || _a === void 0 ? void 0 : _a[noOffsetIndex];
    ngDevMode &&
        (0, assert_2.assertDefined)(serializedViews, 'Unexpected state: no hydration info available for a given TNode, ' +
            'which represents a view container.');
    const [commentNode, dehydratedViews] = (0, views_1.locateDehydratedViewsInContainer)(currentRNode, serializedViews);
    if (ngDevMode) {
        (0, error_handling_1.validateMatchingNode)(commentNode, Node.COMMENT_NODE, null, hostLView, tNode, true);
        // Do not throw in case this node is already claimed (thus `false` as a second
        // argument). If this container is created based on an `<ng-template>`, the comment
        // node would be already claimed from the `template` instruction. If an element acts
        // as an anchor (e.g. <div #vcRef>), a separate comment node would be created/located,
        // so we need to claim it here.
        (0, utils_1.markRNodeAsClaimedByHydration)(commentNode, false);
    }
    lContainer[container_1.NATIVE] = commentNode;
    lContainer[container_1.DEHYDRATED_VIEWS] = dehydratedViews;
    return true;
}
function locateOrCreateAnchorNode(lContainer, hostLView, hostTNode, slotValue) {
    if (!_populateDehydratedViewsInLContainer(lContainer, hostTNode, hostLView)) {
        // Populating dehydrated views operation returned `false`, which indicates
        // that the logic was running in client-only mode, this an anchor comment
        // node should be created for this container.
        createAnchorNode(lContainer, hostLView, hostTNode, slotValue);
    }
}
function enableLocateOrCreateContainerRefImpl() {
    _locateOrCreateAnchorNode = locateOrCreateAnchorNode;
    _populateDehydratedViewsInLContainer = populateDehydratedViewsInLContainerImpl;
}
