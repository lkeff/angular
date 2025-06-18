"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTView = createTView;
exports.getOrCreateComponentTView = getOrCreateComponentTView;
exports.createLView = createLView;
exports.createComponentLView = createComponentLView;
exports.getInitialLViewFlagsFromDef = getInitialLViewFlagsFromDef;
exports.allocExpando = allocExpando;
exports.addToEndOfViewTree = addToEndOfViewTree;
const view_1 = require("../interfaces/view");
const assert_1 = require("../assert");
const assert_2 = require("../../util/assert");
const view_utils_1 = require("../util/view_utils");
const lview_tracking_1 = require("../interfaces/lview_tracking");
const tokens_1 = require("../tokens");
/**
 * Creates a TView instance
 *
 * @param type Type of `TView`.
 * @param declTNode Declaration location of this `TView`.
 * @param templateFn Template function
 * @param decls The number of nodes, local refs, and pipes in this template
 * @param directives Registry of directives for this view
 * @param pipes Registry of pipes for this view
 * @param viewQuery View queries for this view
 * @param schemas Schemas for this view
 * @param consts Constants for this view
 */
function createTView(type, declTNode, templateFn, decls, vars, directives, pipes, viewQuery, schemas, constsOrFactory, ssrId) {
    const bindingStartIndex = view_1.HEADER_OFFSET + decls;
    // This length does not yet contain host bindings from child directives because at this point,
    // we don't know which directives are active on this template. As soon as a directive is matched
    // that has a host binding, we will update the blueprint with that def's hostVars count.
    const initialViewLength = bindingStartIndex + vars;
    const blueprint = createViewBlueprint(bindingStartIndex, initialViewLength);
    const consts = typeof constsOrFactory === 'function' ? constsOrFactory() : constsOrFactory;
    const tView = (blueprint[view_1.TVIEW] = {
        type: type,
        blueprint: blueprint,
        template: templateFn,
        queries: null,
        viewQuery: viewQuery,
        declTNode: declTNode,
        data: blueprint.slice().fill(null, bindingStartIndex),
        bindingStartIndex: bindingStartIndex,
        expandoStartIndex: initialViewLength,
        hostBindingOpCodes: null,
        firstCreatePass: true,
        firstUpdatePass: true,
        staticViewQueries: false,
        staticContentQueries: false,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: typeof directives === 'function' ? directives() : directives,
        pipeRegistry: typeof pipes === 'function' ? pipes() : pipes,
        firstChild: null,
        schemas: schemas,
        consts: consts,
        incompleteFirstPass: false,
        ssrId,
    });
    if (ngDevMode) {
        // For performance reasons it is important that the tView retains the same shape during runtime.
        // (To make sure that all of the code is monomorphic.) For this reason we seal the object to
        // prevent class transitions.
        Object.seal(tView);
    }
    return tView;
}
function createViewBlueprint(bindingStartIndex, initialViewLength) {
    const blueprint = [];
    for (let i = 0; i < initialViewLength; i++) {
        blueprint.push(i < bindingStartIndex ? null : tokens_1.NO_CHANGE);
    }
    return blueprint;
}
/**
 * Gets TView from a template function or creates a new TView
 * if it doesn't already exist.
 *
 * @param def ComponentDef
 * @returns TView
 */
function getOrCreateComponentTView(def) {
    const tView = def.tView;
    // Create a TView if there isn't one, or recreate it if the first create pass didn't
    // complete successfully since we can't know for sure whether it's in a usable shape.
    if (tView === null || tView.incompleteFirstPass) {
        // Declaration node here is null since this function is called when we dynamically create a
        // component and hence there is no declaration.
        const declTNode = null;
        return (def.tView = createTView(1 /* TViewType.Component */, declTNode, def.template, def.decls, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery, def.schemas, def.consts, def.id));
    }
    return tView;
}
function createLView(parentLView, tView, context, flags, host, tHostNode, environment, renderer, injector, embeddedViewInjector, hydrationInfo) {
    const lView = tView.blueprint.slice();
    lView[view_1.HOST] = host;
    lView[view_1.FLAGS] =
        flags |
            4 /* LViewFlags.CreationMode */ |
            128 /* LViewFlags.Attached */ |
            8 /* LViewFlags.FirstLViewPass */ |
            64 /* LViewFlags.Dirty */ |
            1024 /* LViewFlags.RefreshView */;
    if (embeddedViewInjector !== null ||
        (parentLView && parentLView[view_1.FLAGS] & 2048 /* LViewFlags.HasEmbeddedViewInjector */)) {
        lView[view_1.FLAGS] |= 2048 /* LViewFlags.HasEmbeddedViewInjector */;
    }
    (0, view_utils_1.resetPreOrderHookFlags)(lView);
    ngDevMode && tView.declTNode && parentLView && (0, assert_1.assertTNodeForLView)(tView.declTNode, parentLView);
    lView[view_1.PARENT] = lView[view_1.DECLARATION_VIEW] = parentLView;
    lView[view_1.CONTEXT] = context;
    lView[view_1.ENVIRONMENT] = (environment || (parentLView && parentLView[view_1.ENVIRONMENT]));
    ngDevMode && (0, assert_2.assertDefined)(lView[view_1.ENVIRONMENT], 'LViewEnvironment is required');
    lView[view_1.RENDERER] = (renderer || (parentLView && parentLView[view_1.RENDERER]));
    ngDevMode && (0, assert_2.assertDefined)(lView[view_1.RENDERER], 'Renderer is required');
    lView[view_1.INJECTOR] = injector || (parentLView && parentLView[view_1.INJECTOR]) || null;
    lView[view_1.T_HOST] = tHostNode;
    lView[view_1.ID] = (0, lview_tracking_1.getUniqueLViewId)();
    lView[view_1.HYDRATION] = hydrationInfo;
    lView[view_1.EMBEDDED_VIEW_INJECTOR] = embeddedViewInjector;
    ngDevMode &&
        (0, assert_2.assertEqual)(tView.type == 2 /* TViewType.Embedded */ ? parentLView !== null : true, true, 'Embedded views must have parentLView');
    lView[view_1.DECLARATION_COMPONENT_VIEW] =
        tView.type == 2 /* TViewType.Embedded */ ? parentLView[view_1.DECLARATION_COMPONENT_VIEW] : lView;
    return lView;
}
function createComponentLView(lView, hostTNode, def) {
    const native = (0, view_utils_1.getNativeByTNode)(hostTNode, lView);
    const tView = getOrCreateComponentTView(def);
    // Only component views should be added to the view tree directly. Embedded views are
    // accessed through their containers because they may be removed / re-added later.
    const rendererFactory = lView[view_1.ENVIRONMENT].rendererFactory;
    const componentView = addToEndOfViewTree(lView, createLView(lView, tView, null, getInitialLViewFlagsFromDef(def), native, hostTNode, null, rendererFactory.createRenderer(native, def), null, null, null));
    // Component view will always be created before any injected LContainers,
    // so this is a regular element, wrap it with the component view
    return (lView[hostTNode.index] = componentView);
}
/**
 * Gets the initial set of LView flags based on the component definition that the LView represents.
 * @param def Component definition from which to determine the flags.
 */
function getInitialLViewFlagsFromDef(def) {
    let flags = 16 /* LViewFlags.CheckAlways */;
    if (def.signals) {
        flags = 4096 /* LViewFlags.SignalView */;
    }
    else if (def.onPush) {
        flags = 64 /* LViewFlags.Dirty */;
    }
    return flags;
}
/**
 * When elements are created dynamically after a view blueprint is created (e.g. through
 * i18nApply()), we need to adjust the blueprint for future template passes.
 *
 * @param tView `TView` associated with `LView`
 * @param lView The `LView` containing the blueprint to adjust
 * @param numSlotsToAlloc The number of slots to alloc in the LView, should be >0
 * @param initialValue Initial value to store in blueprint
 */
function allocExpando(tView, lView, numSlotsToAlloc, initialValue) {
    if (numSlotsToAlloc === 0)
        return -1;
    if (ngDevMode) {
        (0, assert_1.assertFirstCreatePass)(tView);
        (0, assert_2.assertSame)(tView, lView[view_1.TVIEW], '`LView` must be associated with `TView`!');
        (0, assert_2.assertEqual)(tView.data.length, lView.length, 'Expecting LView to be same size as TView');
        (0, assert_2.assertEqual)(tView.data.length, tView.blueprint.length, 'Expecting Blueprint to be same size as TView');
        (0, assert_1.assertFirstUpdatePass)(tView);
    }
    const allocIdx = lView.length;
    for (let i = 0; i < numSlotsToAlloc; i++) {
        lView.push(initialValue);
        tView.blueprint.push(initialValue);
        tView.data.push(null);
    }
    return allocIdx;
}
/**
 * Adds LView or LContainer to the end of the current view tree.
 *
 * This structure will be used to traverse through nested views to remove listeners
 * and call onDestroy callbacks.
 *
 * @param lView The view where LView or LContainer should be added
 * @param adjustedHostIndex Index of the view's host node in LView[], adjusted for header
 * @param lViewOrLContainer The LView or LContainer to add to the view tree
 * @returns The state passed in
 */
function addToEndOfViewTree(lView, lViewOrLContainer) {
    // TODO(benlesh/misko): This implementation is incorrect, because it always adds the LContainer
    // to the end of the queue, which means if the developer retrieves the LContainers from RNodes out
    // of order, the change detection will run out of order, as the act of retrieving the the
    // LContainer from the RNode is what adds it to the queue.
    if (lView[view_1.CHILD_HEAD]) {
        lView[view_1.CHILD_TAIL][view_1.NEXT] = lViewOrLContainer;
    }
    else {
        lView[view_1.CHILD_HEAD] = lViewOrLContainer;
    }
    lView[view_1.CHILD_TAIL] = lViewOrLContainer;
    return lViewOrLContainer;
}
