"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDehydratedViews = removeDehydratedViews;
exports.removeDehydratedViewList = removeDehydratedViewList;
exports.cleanupLContainer = cleanupLContainer;
exports.cleanupDehydratedViews = cleanupDehydratedViews;
exports.cleanupHydratedDeferBlocks = cleanupHydratedDeferBlocks;
const container_1 = require("../render3/interfaces/container");
const type_checks_1 = require("../render3/interfaces/type_checks");
const view_1 = require("../render3/interfaces/view");
const dom_node_manipulation_1 = require("../render3/dom_node_manipulation");
const error_handling_1 = require("./error_handling");
const i18n_1 = require("./i18n");
const interfaces_1 = require("./interfaces");
const utils_1 = require("./utils");
/**
 * Removes all dehydrated views from a given LContainer:
 * both in internal data structure, as well as removing
 * corresponding DOM nodes that belong to that dehydrated view.
 */
function removeDehydratedViews(lContainer) {
    var _a;
    const views = (_a = lContainer[container_1.DEHYDRATED_VIEWS]) !== null && _a !== void 0 ? _a : [];
    const parentLView = lContainer[view_1.PARENT];
    const renderer = parentLView[view_1.RENDERER];
    const retainedViews = [];
    for (const view of views) {
        // Do not clean up contents of `@defer` blocks.
        // The cleanup for this content would happen once a given block
        // is triggered and hydrated.
        if (view.data[interfaces_1.DEFER_BLOCK_ID] !== undefined) {
            retainedViews.push(view);
        }
        else {
            removeDehydratedView(view, renderer);
            ngDevMode && ngDevMode.dehydratedViewsRemoved++;
        }
    }
    // Reset the value to an array to indicate that no
    // further processing of dehydrated views is needed for
    // this view container (i.e. do not trigger the lookup process
    // once again in case a `ViewContainerRef` is created later).
    lContainer[container_1.DEHYDRATED_VIEWS] = retainedViews;
}
function removeDehydratedViewList(deferBlock) {
    const { lContainer } = deferBlock;
    const dehydratedViews = lContainer[container_1.DEHYDRATED_VIEWS];
    if (dehydratedViews === null)
        return;
    const parentLView = lContainer[view_1.PARENT];
    const renderer = parentLView[view_1.RENDERER];
    for (const view of dehydratedViews) {
        removeDehydratedView(view, renderer);
        ngDevMode && ngDevMode.dehydratedViewsRemoved++;
    }
}
/**
 * Helper function to remove all nodes from a dehydrated view.
 */
function removeDehydratedView(dehydratedView, renderer) {
    let nodesRemoved = 0;
    let currentRNode = dehydratedView.firstChild;
    if (currentRNode) {
        const numNodes = dehydratedView.data[interfaces_1.NUM_ROOT_NODES];
        while (nodesRemoved < numNodes) {
            ngDevMode && (0, error_handling_1.validateSiblingNodeExists)(currentRNode);
            const nextSibling = currentRNode.nextSibling;
            (0, dom_node_manipulation_1.nativeRemoveNode)(renderer, currentRNode, false);
            currentRNode = nextSibling;
            nodesRemoved++;
        }
    }
}
/**
 * Walks over all views within this LContainer invokes dehydrated views
 * cleanup function for each one.
 */
function cleanupLContainer(lContainer) {
    removeDehydratedViews(lContainer);
    // The host could be an LView if this container is on a component node.
    // In this case, descend into host LView for further cleanup. See also
    // LContainer[HOST] docs for additional information.
    const hostLView = lContainer[view_1.HOST];
    if ((0, type_checks_1.isLView)(hostLView)) {
        cleanupLView(hostLView);
    }
    for (let i = container_1.CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
        cleanupLView(lContainer[i]);
    }
}
/**
 * Walks over `LContainer`s and components registered within
 * this LView and invokes dehydrated views cleanup function for each one.
 */
function cleanupLView(lView) {
    (0, i18n_1.cleanupI18nHydrationData)(lView);
    const tView = lView[view_1.TVIEW];
    for (let i = view_1.HEADER_OFFSET; i < tView.bindingStartIndex; i++) {
        if ((0, type_checks_1.isLContainer)(lView[i])) {
            const lContainer = lView[i];
            cleanupLContainer(lContainer);
        }
        else if ((0, type_checks_1.isLView)(lView[i])) {
            // This is a component, enter the `cleanupLView` recursively.
            cleanupLView(lView[i]);
        }
    }
}
/**
 * Walks over all views registered within the ApplicationRef and removes
 * all dehydrated views from all `LContainer`s along the way.
 */
function cleanupDehydratedViews(appRef) {
    const viewRefs = appRef._views;
    for (const viewRef of viewRefs) {
        const lNode = (0, utils_1.getLNodeForHydration)(viewRef);
        // An `lView` might be `null` if a `ViewRef` represents
        // an embedded view (not a component view).
        if (lNode !== null && lNode[view_1.HOST] !== null) {
            if ((0, type_checks_1.isLView)(lNode)) {
                cleanupLView(lNode);
            }
            else {
                // Cleanup in all views within this view container
                cleanupLContainer(lNode);
            }
            ngDevMode && ngDevMode.dehydratedViewsCleanupRuns++;
        }
    }
}
/**
 * post hydration cleanup handling for defer blocks that were incrementally
 * hydrated. This removes all the jsaction attributes, timers, observers,
 * dehydrated views and containers
 */
function cleanupHydratedDeferBlocks(deferBlock, hydratedBlocks, registry, appRef) {
    if (deferBlock !== null) {
        registry.cleanup(hydratedBlocks);
        cleanupLContainer(deferBlock.lContainer);
        cleanupDehydratedViews(appRef);
    }
}
