"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeferBlockDataIndex = getDeferBlockDataIndex;
exports.getLDeferBlockDetails = getLDeferBlockDetails;
exports.setLDeferBlockDetails = setLDeferBlockDetails;
exports.getTDeferBlockDetails = getTDeferBlockDetails;
exports.setTDeferBlockDetails = setTDeferBlockDetails;
exports.getTemplateIndexForState = getTemplateIndexForState;
exports.getMinimumDurationForState = getMinimumDurationForState;
exports.getLoadingBlockAfter = getLoadingBlockAfter;
exports.addDepsToRegistry = addDepsToRegistry;
exports.getPrimaryBlockTNode = getPrimaryBlockTNode;
exports.assertDeferredDependenciesLoaded = assertDeferredDependenciesLoaded;
exports.isTDeferBlockDetails = isTDeferBlockDetails;
exports.isDeferBlock = isDeferBlock;
exports.trackTriggerForDebugging = trackTriggerForDebugging;
const assert_1 = require("../render3/assert");
const view_1 = require("../render3/interfaces/view");
const view_utils_1 = require("../render3/util/view_utils");
const assert_2 = require("../util/assert");
const interfaces_1 = require("./interfaces");
/**
 * Calculates a data slot index for defer block info (either static or
 * instance-specific), given an index of a defer instruction.
 */
function getDeferBlockDataIndex(deferBlockIndex) {
    // Instance state is located at the *next* position
    // after the defer block slot in an LView or TView.data.
    return deferBlockIndex + 1;
}
/** Retrieves a defer block state from an LView, given a TNode that represents a block. */
function getLDeferBlockDetails(lView, tNode) {
    const tView = lView[view_1.TVIEW];
    const slotIndex = getDeferBlockDataIndex(tNode.index);
    ngDevMode && (0, assert_1.assertIndexInDeclRange)(tView, slotIndex);
    return lView[slotIndex];
}
/** Stores a defer block instance state in LView. */
function setLDeferBlockDetails(lView, deferBlockIndex, lDetails) {
    const tView = lView[view_1.TVIEW];
    const slotIndex = getDeferBlockDataIndex(deferBlockIndex);
    ngDevMode && (0, assert_1.assertIndexInDeclRange)(tView, slotIndex);
    lView[slotIndex] = lDetails;
}
/** Retrieves static info about a defer block, given a TView and a TNode that represents a block. */
function getTDeferBlockDetails(tView, tNode) {
    const slotIndex = getDeferBlockDataIndex(tNode.index);
    ngDevMode && (0, assert_1.assertIndexInDeclRange)(tView, slotIndex);
    return tView.data[slotIndex];
}
/** Stores a defer block static info in `TView.data`. */
function setTDeferBlockDetails(tView, deferBlockIndex, deferBlockConfig) {
    const slotIndex = getDeferBlockDataIndex(deferBlockIndex);
    ngDevMode && (0, assert_1.assertIndexInDeclRange)(tView, slotIndex);
    tView.data[slotIndex] = deferBlockConfig;
}
function getTemplateIndexForState(newState, hostLView, tNode) {
    const tView = hostLView[view_1.TVIEW];
    const tDetails = getTDeferBlockDetails(tView, tNode);
    switch (newState) {
        case interfaces_1.DeferBlockState.Complete:
            return tDetails.primaryTmplIndex;
        case interfaces_1.DeferBlockState.Loading:
            return tDetails.loadingTmplIndex;
        case interfaces_1.DeferBlockState.Error:
            return tDetails.errorTmplIndex;
        case interfaces_1.DeferBlockState.Placeholder:
            return tDetails.placeholderTmplIndex;
        default:
            ngDevMode && (0, assert_2.throwError)(`Unexpected defer block state: ${newState}`);
            return null;
    }
}
/**
 * Returns a minimum amount of time that a given state should be rendered for,
 * taking into account `minimum` parameter value. If the `minimum` value is
 * not specified - returns `null`.
 */
function getMinimumDurationForState(tDetails, currentState) {
    var _a, _b, _c, _d;
    if (currentState === interfaces_1.DeferBlockState.Placeholder) {
        return (_b = (_a = tDetails.placeholderBlockConfig) === null || _a === void 0 ? void 0 : _a[interfaces_1.MINIMUM_SLOT]) !== null && _b !== void 0 ? _b : null;
    }
    else if (currentState === interfaces_1.DeferBlockState.Loading) {
        return (_d = (_c = tDetails.loadingBlockConfig) === null || _c === void 0 ? void 0 : _c[interfaces_1.MINIMUM_SLOT]) !== null && _d !== void 0 ? _d : null;
    }
    return null;
}
/** Retrieves the value of the `after` parameter on the @loading block. */
function getLoadingBlockAfter(tDetails) {
    var _a, _b;
    return (_b = (_a = tDetails.loadingBlockConfig) === null || _a === void 0 ? void 0 : _a[interfaces_1.LOADING_AFTER_SLOT]) !== null && _b !== void 0 ? _b : null;
}
/**
 * Adds downloaded dependencies into a directive or a pipe registry,
 * making sure that a dependency doesn't yet exist in the registry.
 */
function addDepsToRegistry(currentDeps, newDeps) {
    if (!currentDeps || currentDeps.length === 0) {
        return newDeps;
    }
    const currentDepSet = new Set(currentDeps);
    for (const dep of newDeps) {
        currentDepSet.add(dep);
    }
    // If `currentDeps` is the same length, there were no new deps and can
    // return the original array.
    return currentDeps.length === currentDepSet.size ? currentDeps : Array.from(currentDepSet);
}
/** Retrieves a TNode that represents main content of a defer block. */
function getPrimaryBlockTNode(tView, tDetails) {
    const adjustedIndex = tDetails.primaryTmplIndex + view_1.HEADER_OFFSET;
    return (0, view_utils_1.getTNode)(tView, adjustedIndex);
}
/**
 * Asserts whether all dependencies for a defer block are loaded.
 * Always run this function (in dev mode) before rendering a defer
 * block in completed state.
 */
function assertDeferredDependenciesLoaded(tDetails) {
    (0, assert_2.assertEqual)(tDetails.loadingState, interfaces_1.DeferDependenciesLoadingState.COMPLETE, 'Expecting all deferred dependencies to be loaded.');
}
/**
 * Determines if a given value matches the expected structure of a defer block
 *
 * We can safely rely on the primaryTmplIndex because every defer block requires
 * that a primary template exists. All the other template options are optional.
 */
function isTDeferBlockDetails(value) {
    return (value !== null &&
        typeof value === 'object' &&
        typeof value.primaryTmplIndex === 'number');
}
/**
 * Whether a given TNode represents a defer block.
 */
function isDeferBlock(tView, tNode) {
    let tDetails = null;
    const slotIndex = getDeferBlockDataIndex(tNode.index);
    // Check if a slot index is in the reasonable range.
    // Note: we do `-1` on the right border, since defer block details are stored
    // in the `n+1` slot, see `getDeferBlockDataIndex` for more info.
    if (view_1.HEADER_OFFSET < slotIndex && slotIndex < tView.bindingStartIndex) {
        tDetails = getTDeferBlockDetails(tView, tNode);
    }
    return !!tDetails && isTDeferBlockDetails(tDetails);
}
/**
 * Tracks debugging information about a trigger.
 * @param tView TView in which the trigger is declared.
 * @param tNode TNode on which the trigger is declared.
 * @param textRepresentation Text representation of the trigger to be used for debugging purposes.
 */
function trackTriggerForDebugging(tView, tNode, textRepresentation) {
    var _a, _b;
    var _c;
    const tDetails = getTDeferBlockDetails(tView, tNode);
    (_a = tDetails.debug) !== null && _a !== void 0 ? _a : (tDetails.debug = {});
    (_b = (_c = tDetails.debug).triggers) !== null && _b !== void 0 ? _b : (_c.triggers = new Set());
    tDetails.debug.triggers.add(textRepresentation);
}
