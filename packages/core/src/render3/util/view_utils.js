"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapRNode = unwrapRNode;
exports.unwrapLView = unwrapLView;
exports.getNativeByIndex = getNativeByIndex;
exports.getNativeByTNode = getNativeByTNode;
exports.getNativeByTNodeOrNull = getNativeByTNodeOrNull;
exports.getTNode = getTNode;
exports.load = load;
exports.getComponentLViewByIndex = getComponentLViewByIndex;
exports.isCreationMode = isCreationMode;
exports.viewAttachedToChangeDetector = viewAttachedToChangeDetector;
exports.viewAttachedToContainer = viewAttachedToContainer;
exports.getConstant = getConstant;
exports.resetPreOrderHookFlags = resetPreOrderHookFlags;
exports.markViewForRefresh = markViewForRefresh;
exports.walkUpViews = walkUpViews;
exports.requiresRefreshOrTraversal = requiresRefreshOrTraversal;
exports.updateAncestorTraversalFlagsOnAttach = updateAncestorTraversalFlagsOnAttach;
exports.markAncestorsForTraversal = markAncestorsForTraversal;
exports.storeLViewOnDestroy = storeLViewOnDestroy;
exports.removeLViewOnDestroy = removeLViewOnDestroy;
exports.getLViewParent = getLViewParent;
exports.getOrCreateLViewCleanup = getOrCreateLViewCleanup;
exports.getOrCreateTViewCleanup = getOrCreateTViewCleanup;
exports.storeCleanupWithContext = storeCleanupWithContext;
const errors_1 = require("../../errors");
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const container_1 = require("../interfaces/container");
const type_checks_1 = require("../interfaces/type_checks");
const view_1 = require("../interfaces/view");
/**
 * For efficiency reasons we often put several different data types (`RNode`, `LView`, `LContainer`)
 * in same location in `LView`. This is because we don't want to pre-allocate space for it
 * because the storage is sparse. This file contains utilities for dealing with such data types.
 *
 * How do we know what is stored at a given location in `LView`.
 * - `Array.isArray(value) === false` => `RNode` (The normal storage value)
 * - `Array.isArray(value) === true` => then the `value[0]` represents the wrapped value.
 *   - `typeof value[TYPE] === 'object'` => `LView`
 *      - This happens when we have a component at a given location
 *   - `typeof value[TYPE] === true` => `LContainer`
 *      - This happens when we have `LContainer` binding at a given location.
 *
 *
 * NOTE: it is assumed that `Array.isArray` and `typeof` operations are very efficient.
 */
/**
 * Returns `RNode`.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
function unwrapRNode(value) {
    while (Array.isArray(value)) {
        value = value[view_1.HOST];
    }
    return value;
}
/**
 * Returns `LView` or `null` if not found.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
function unwrapLView(value) {
    while (Array.isArray(value)) {
        // This check is same as `isLView()` but we don't call at as we don't want to call
        // `Array.isArray()` twice and give JITer more work for inlining.
        if (typeof value[container_1.TYPE] === 'object')
            return value;
        value = value[view_1.HOST];
    }
    return null;
}
/**
 * Retrieves an element value from the provided `viewData`, by unwrapping
 * from any containers, component views, or style contexts.
 */
function getNativeByIndex(index, lView) {
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, index);
    ngDevMode && (0, assert_1.assertGreaterThanOrEqual)(index, view_1.HEADER_OFFSET, 'Expected to be past HEADER_OFFSET');
    return unwrapRNode(lView[index]);
}
/**
 * Retrieve an `RNode` for a given `TNode` and `LView`.
 *
 * This function guarantees in dev mode to retrieve a non-null `RNode`.
 *
 * @param tNode
 * @param lView
 */
function getNativeByTNode(tNode, lView) {
    ngDevMode && (0, assert_2.assertTNodeForLView)(tNode, lView);
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, tNode.index);
    const node = unwrapRNode(lView[tNode.index]);
    return node;
}
/**
 * Retrieve an `RNode` or `null` for a given `TNode` and `LView`.
 *
 * Some `TNode`s don't have associated `RNode`s. For example `Projection`
 *
 * @param tNode
 * @param lView
 */
function getNativeByTNodeOrNull(tNode, lView) {
    const index = tNode === null ? -1 : tNode.index;
    if (index !== -1) {
        ngDevMode && (0, assert_2.assertTNodeForLView)(tNode, lView);
        const node = unwrapRNode(lView[index]);
        return node;
    }
    return null;
}
// fixme(misko): The return Type should be `TNode|null`
function getTNode(tView, index) {
    ngDevMode && (0, assert_1.assertGreaterThan)(index, -1, 'wrong index for TNode');
    ngDevMode && (0, assert_1.assertLessThan)(index, tView.data.length, 'wrong index for TNode');
    const tNode = tView.data[index];
    ngDevMode && tNode !== null && (0, assert_2.assertTNode)(tNode);
    return tNode;
}
/** Retrieves a value from any `LView` or `TData`. */
function load(view, index) {
    ngDevMode && (0, assert_1.assertIndexInRange)(view, index);
    return view[index];
}
function getComponentLViewByIndex(nodeIndex, hostView) {
    // Could be an LView or an LContainer. If LContainer, unwrap to find LView.
    ngDevMode && (0, assert_1.assertIndexInRange)(hostView, nodeIndex);
    const slotValue = hostView[nodeIndex];
    const lView = (0, type_checks_1.isLView)(slotValue) ? slotValue : slotValue[view_1.HOST];
    return lView;
}
/** Checks whether a given view is in creation mode */
function isCreationMode(view) {
    return (view[view_1.FLAGS] & 4 /* LViewFlags.CreationMode */) === 4 /* LViewFlags.CreationMode */;
}
/**
 * Returns a boolean for whether the view is attached to the change detection tree.
 *
 * Note: This determines whether a view should be checked, not whether it's inserted
 * into a container. For that, you'll want `viewAttachedToContainer` below.
 */
function viewAttachedToChangeDetector(view) {
    return (view[view_1.FLAGS] & 128 /* LViewFlags.Attached */) === 128 /* LViewFlags.Attached */;
}
/** Returns a boolean for whether the view is attached to a container. */
function viewAttachedToContainer(view) {
    return (0, type_checks_1.isLContainer)(view[view_1.PARENT]);
}
function getConstant(consts, index) {
    if (index === null || index === undefined)
        return null;
    ngDevMode && (0, assert_1.assertIndexInRange)(consts, index);
    return consts[index];
}
/**
 * Resets the pre-order hook flags of the view.
 * @param lView the LView on which the flags are reset
 */
function resetPreOrderHookFlags(lView) {
    lView[view_1.PREORDER_HOOK_FLAGS] = 0;
}
/**
 * Adds the `RefreshView` flag from the lView and updates HAS_CHILD_VIEWS_TO_REFRESH flag of
 * parents.
 */
function markViewForRefresh(lView) {
    if (lView[view_1.FLAGS] & 1024 /* LViewFlags.RefreshView */) {
        return;
    }
    lView[view_1.FLAGS] |= 1024 /* LViewFlags.RefreshView */;
    if (viewAttachedToChangeDetector(lView)) {
        markAncestorsForTraversal(lView);
    }
}
/**
 * Walks up the LView hierarchy.
 * @param nestingLevel Number of times to walk up in hierarchy.
 * @param currentView View from which to start the lookup.
 */
function walkUpViews(nestingLevel, currentView) {
    while (nestingLevel > 0) {
        ngDevMode &&
            (0, assert_1.assertDefined)(currentView[view_1.DECLARATION_VIEW], 'Declaration view should be defined if nesting level is greater than 0.');
        currentView = currentView[view_1.DECLARATION_VIEW];
        nestingLevel--;
    }
    return currentView;
}
function requiresRefreshOrTraversal(lView) {
    var _a;
    return !!(lView[view_1.FLAGS] & (1024 /* LViewFlags.RefreshView */ | 8192 /* LViewFlags.HasChildViewsToRefresh */) ||
        ((_a = lView[view_1.REACTIVE_TEMPLATE_CONSUMER]) === null || _a === void 0 ? void 0 : _a.dirty));
}
/**
 * Updates the `HasChildViewsToRefresh` flag on the parents of the `LView` as well as the
 * parents above.
 */
function updateAncestorTraversalFlagsOnAttach(lView) {
    var _a;
    (_a = lView[view_1.ENVIRONMENT].changeDetectionScheduler) === null || _a === void 0 ? void 0 : _a.notify(8 /* NotificationSource.ViewAttached */);
    if (lView[view_1.FLAGS] & 64 /* LViewFlags.Dirty */) {
        lView[view_1.FLAGS] |= 1024 /* LViewFlags.RefreshView */;
    }
    if (requiresRefreshOrTraversal(lView)) {
        markAncestorsForTraversal(lView);
    }
}
/**
 * Ensures views above the given `lView` are traversed during change detection even when they are
 * not dirty.
 *
 * This is done by setting the `HAS_CHILD_VIEWS_TO_REFRESH` flag up to the root, stopping when the
 * flag is already `true` or the `lView` is detached.
 */
function markAncestorsForTraversal(lView) {
    var _a;
    (_a = lView[view_1.ENVIRONMENT].changeDetectionScheduler) === null || _a === void 0 ? void 0 : _a.notify(0 /* NotificationSource.MarkAncestorsForTraversal */);
    let parent = getLViewParent(lView);
    while (parent !== null) {
        // We stop adding markers to the ancestors once we reach one that already has the marker. This
        // is to avoid needlessly traversing all the way to the root when the marker already exists.
        if (parent[view_1.FLAGS] & 8192 /* LViewFlags.HasChildViewsToRefresh */) {
            break;
        }
        parent[view_1.FLAGS] |= 8192 /* LViewFlags.HasChildViewsToRefresh */;
        if (!viewAttachedToChangeDetector(parent)) {
            break;
        }
        parent = getLViewParent(parent);
    }
}
/**
 * Stores a LView-specific destroy callback.
 */
function storeLViewOnDestroy(lView, onDestroyCallback) {
    if ((0, type_checks_1.isDestroyed)(lView)) {
        throw new errors_1.RuntimeError(911 /* RuntimeErrorCode.VIEW_ALREADY_DESTROYED */, ngDevMode && 'View has already been destroyed.');
    }
    if (lView[view_1.ON_DESTROY_HOOKS] === null) {
        lView[view_1.ON_DESTROY_HOOKS] = [];
    }
    lView[view_1.ON_DESTROY_HOOKS].push(onDestroyCallback);
}
/**
 * Removes previously registered LView-specific destroy callback.
 */
function removeLViewOnDestroy(lView, onDestroyCallback) {
    if (lView[view_1.ON_DESTROY_HOOKS] === null)
        return;
    const destroyCBIdx = lView[view_1.ON_DESTROY_HOOKS].indexOf(onDestroyCallback);
    if (destroyCBIdx !== -1) {
        lView[view_1.ON_DESTROY_HOOKS].splice(destroyCBIdx, 1);
    }
}
/**
 * Gets the parent LView of the passed LView, if the PARENT is an LContainer, will get the parent of
 * that LContainer, which is an LView
 * @param lView the lView whose parent to get
 */
function getLViewParent(lView) {
    ngDevMode && (0, assert_2.assertLView)(lView);
    const parent = lView[view_1.PARENT];
    return (0, type_checks_1.isLContainer)(parent) ? parent[view_1.PARENT] : parent;
}
function getOrCreateLViewCleanup(view) {
    var _a;
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return ((_a = view[view_1.CLEANUP]) !== null && _a !== void 0 ? _a : (view[view_1.CLEANUP] = []));
}
function getOrCreateTViewCleanup(tView) {
    var _a;
    return ((_a = tView.cleanup) !== null && _a !== void 0 ? _a : (tView.cleanup = []));
}
/**
 * Saves context for this cleanup function in LView.cleanupInstances.
 *
 * On the first template pass, saves in TView:
 * - Cleanup function
 * - Index of context we just saved in LView.cleanupInstances
 */
function storeCleanupWithContext(tView, lView, context, cleanupFn) {
    const lCleanup = getOrCreateLViewCleanup(lView);
    // Historically the `storeCleanupWithContext` was used to register both framework-level and
    // user-defined cleanup callbacks, but over time those two types of cleanups were separated.
    // This dev mode checks assures that user-level cleanup callbacks are _not_ stored in data
    // structures reserved for framework-specific hooks.
    ngDevMode &&
        (0, assert_1.assertDefined)(context, 'Cleanup context is mandatory when registering framework-level destroy hooks');
    lCleanup.push(context);
    if (tView.firstCreatePass) {
        getOrCreateTViewCleanup(tView).push(cleanupFn, lCleanup.length - 1);
    }
    else {
        // Make sure that no new framework-level cleanup functions are registered after the first
        // template pass is done (and TView data structures are meant to fully constructed).
        if (ngDevMode) {
            Object.freeze(getOrCreateTViewCleanup(tView));
        }
    }
}
