"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLContainer = createLContainer;
exports.getLViewFromLContainer = getLViewFromLContainer;
exports.addLViewToLContainer = addLViewToLContainer;
exports.removeLViewFromLContainer = removeLViewFromLContainer;
exports.detachView = detachView;
exports.trackMovedView = trackMovedView;
const array_utils_1 = require("../../util/array_utils");
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const container_1 = require("../interfaces/container");
const type_checks_1 = require("../interfaces/type_checks");
const view_1 = require("../interfaces/view");
const node_manipulation_1 = require("../node_manipulation");
const view_utils_1 = require("../util/view_utils");
/**
 * Creates a LContainer, either from a container instruction, or for a ViewContainerRef.
 *
 * @param hostNative The host element for the LContainer
 * @param hostTNode The host TNode for the LContainer
 * @param currentView The parent view of the LContainer
 * @param native The native comment element
 * @param isForViewContainerRef Optional a flag indicating the ViewContainerRef case
 * @returns LContainer
 */
function createLContainer(hostNative, currentView, native, tNode) {
    ngDevMode && (0, assert_2.assertLView)(currentView);
    const lContainer = [
        hostNative, // host native
        true, // Boolean `true` in this position signifies that this is an `LContainer`
        0, // flags
        currentView, // parent
        null, // next
        tNode, // t_host
        null, // dehydrated views
        native, // native,
        null, // view refs
        null, // moved views
    ];
    ngDevMode &&
        (0, assert_1.assertEqual)(lContainer.length, container_1.CONTAINER_HEADER_OFFSET, 'Should allocate correct number of slots for LContainer header.');
    return lContainer;
}
function getLViewFromLContainer(lContainer, index) {
    const adjustedIndex = container_1.CONTAINER_HEADER_OFFSET + index;
    // avoid reading past the array boundaries
    if (adjustedIndex < lContainer.length) {
        const lView = lContainer[adjustedIndex];
        ngDevMode && (0, assert_2.assertLView)(lView);
        return lView;
    }
    return undefined;
}
function addLViewToLContainer(lContainer, lView, index, addToDOM = true) {
    const tView = lView[view_1.TVIEW];
    // Insert into the view tree so the new view can be change-detected
    insertView(tView, lView, lContainer, index);
    // Insert elements that belong to this view into the DOM tree
    if (addToDOM) {
        const beforeNode = (0, node_manipulation_1.getBeforeNodeForView)(index, lContainer);
        const renderer = lView[view_1.RENDERER];
        const parentRNode = renderer.parentNode(lContainer[container_1.NATIVE]);
        if (parentRNode !== null) {
            (0, node_manipulation_1.addViewToDOM)(tView, lContainer[view_1.T_HOST], renderer, lView, parentRNode, beforeNode);
        }
    }
    // When in hydration mode, reset the pointer to the first child in
    // the dehydrated view. This indicates that the view was hydrated and
    // further attaching/detaching should work with this view as normal.
    const hydrationInfo = lView[view_1.HYDRATION];
    if (hydrationInfo !== null && hydrationInfo.firstChild !== null) {
        hydrationInfo.firstChild = null;
    }
}
function removeLViewFromLContainer(lContainer, index) {
    const lView = detachView(lContainer, index);
    if (lView !== undefined) {
        (0, node_manipulation_1.destroyLView)(lView[view_1.TVIEW], lView);
    }
    return lView;
}
/**
 * Detaches a view from a container.
 *
 * This method removes the view from the container's array of active views. It also
 * removes the view's elements from the DOM.
 *
 * @param lContainer The container from which to detach a view
 * @param removeIndex The index of the view to detach
 * @returns Detached LView instance.
 */
function detachView(lContainer, removeIndex) {
    if (lContainer.length <= container_1.CONTAINER_HEADER_OFFSET)
        return;
    const indexInContainer = container_1.CONTAINER_HEADER_OFFSET + removeIndex;
    const viewToDetach = lContainer[indexInContainer];
    if (viewToDetach) {
        const declarationLContainer = viewToDetach[view_1.DECLARATION_LCONTAINER];
        if (declarationLContainer !== null && declarationLContainer !== lContainer) {
            (0, node_manipulation_1.detachMovedView)(declarationLContainer, viewToDetach);
        }
        if (removeIndex > 0) {
            lContainer[indexInContainer - 1][view_1.NEXT] = viewToDetach[view_1.NEXT];
        }
        const removedLView = (0, array_utils_1.removeFromArray)(lContainer, container_1.CONTAINER_HEADER_OFFSET + removeIndex);
        (0, node_manipulation_1.removeViewFromDOM)(viewToDetach[view_1.TVIEW], viewToDetach);
        // notify query that a view has been removed
        const lQueries = removedLView[view_1.QUERIES];
        if (lQueries !== null) {
            lQueries.detachView(removedLView[view_1.TVIEW]);
        }
        viewToDetach[view_1.PARENT] = null;
        viewToDetach[view_1.NEXT] = null;
        // Unsets the attached flag
        viewToDetach[view_1.FLAGS] &= ~128 /* LViewFlags.Attached */;
    }
    return viewToDetach;
}
/**
 * Inserts a view into a container.
 *
 * This adds the view to the container's array of active views in the correct
 * position. It also adds the view's elements to the DOM if the container isn't a
 * root node of another view (in that case, the view's elements will be added when
 * the container's parent view is added later).
 *
 * @param tView The `TView' of the `LView` to insert
 * @param lView The view to insert
 * @param lContainer The container into which the view should be inserted
 * @param index Which index in the container to insert the child view into
 */
function insertView(tView, lView, lContainer, index) {
    ngDevMode && (0, assert_2.assertLView)(lView);
    ngDevMode && (0, assert_2.assertLContainer)(lContainer);
    const indexInContainer = container_1.CONTAINER_HEADER_OFFSET + index;
    const containerLength = lContainer.length;
    if (index > 0) {
        // This is a new view, we need to add it to the children.
        lContainer[indexInContainer - 1][view_1.NEXT] = lView;
    }
    if (index < containerLength - container_1.CONTAINER_HEADER_OFFSET) {
        lView[view_1.NEXT] = lContainer[indexInContainer];
        (0, array_utils_1.addToArray)(lContainer, container_1.CONTAINER_HEADER_OFFSET + index, lView);
    }
    else {
        lContainer.push(lView);
        lView[view_1.NEXT] = null;
    }
    lView[view_1.PARENT] = lContainer;
    // track views where declaration and insertion points are different
    const declarationLContainer = lView[view_1.DECLARATION_LCONTAINER];
    if (declarationLContainer !== null && lContainer !== declarationLContainer) {
        trackMovedView(declarationLContainer, lView);
    }
    // notify query that a new view has been added
    const lQueries = lView[view_1.QUERIES];
    if (lQueries !== null) {
        lQueries.insertView(tView);
    }
    (0, view_utils_1.updateAncestorTraversalFlagsOnAttach)(lView);
    // Sets the attached flag
    lView[view_1.FLAGS] |= 128 /* LViewFlags.Attached */;
}
/**
 * Track views created from the declaration container (TemplateRef) and inserted into a
 * different LContainer or attached directly to ApplicationRef.
 */
function trackMovedView(declarationContainer, lView) {
    ngDevMode && (0, assert_1.assertDefined)(lView, 'LView required');
    ngDevMode && (0, assert_2.assertLContainer)(declarationContainer);
    const movedViews = declarationContainer[container_1.MOVED_VIEWS];
    const parent = lView[view_1.PARENT];
    ngDevMode && (0, assert_1.assertDefined)(parent, 'missing parent');
    if ((0, type_checks_1.isLView)(parent)) {
        declarationContainer[view_1.FLAGS] |= 2 /* LContainerFlags.HasTransplantedViews */;
    }
    else {
        const insertedComponentLView = parent[view_1.PARENT][view_1.DECLARATION_COMPONENT_VIEW];
        ngDevMode && (0, assert_1.assertDefined)(insertedComponentLView, 'Missing insertedComponentLView');
        const declaredComponentLView = lView[view_1.DECLARATION_COMPONENT_VIEW];
        ngDevMode && (0, assert_1.assertDefined)(declaredComponentLView, 'Missing declaredComponentLView');
        if (declaredComponentLView !== insertedComponentLView) {
            // At this point the declaration-component is not same as insertion-component; this means that
            // this is a transplanted view. Mark the declared lView as having transplanted views so that
            // those views can participate in CD.
            declarationContainer[view_1.FLAGS] |= 2 /* LContainerFlags.HasTransplantedViews */;
        }
    }
    if (movedViews === null) {
        declarationContainer[container_1.MOVED_VIEWS] = [lView];
    }
    else {
        movedViews.push(lView);
    }
}
