"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeferBlockBehavior = exports.HYDRATE_TRIGGER_CLEANUP_FNS = exports.ON_COMPLETE_FNS = exports.SSR_BLOCK_STATE = exports.SSR_UNIQUE_ID = exports.PREFETCH_TRIGGER_CLEANUP_FNS = exports.TRIGGER_CLEANUP_FNS = exports.LOADING_AFTER_CLEANUP_FN = exports.STATE_IS_FROZEN_UNTIL = exports.DEFER_BLOCK_STATE = exports.NEXT_DEFER_BLOCK_STATE = exports.DeferBlockInternalState = exports.DeferBlockState = exports.LOADING_AFTER_SLOT = exports.MINIMUM_SLOT = exports.DeferDependenciesLoadingState = void 0;
/**
 * Describes the state of defer block dependency loading.
 */
var DeferDependenciesLoadingState;
(function (DeferDependenciesLoadingState) {
    /** Initial state, dependency loading is not yet triggered */
    DeferDependenciesLoadingState[DeferDependenciesLoadingState["NOT_STARTED"] = 0] = "NOT_STARTED";
    /** Dependency loading is in progress */
    DeferDependenciesLoadingState[DeferDependenciesLoadingState["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    /** Dependency loading has completed successfully */
    DeferDependenciesLoadingState[DeferDependenciesLoadingState["COMPLETE"] = 2] = "COMPLETE";
    /** Dependency loading has failed */
    DeferDependenciesLoadingState[DeferDependenciesLoadingState["FAILED"] = 3] = "FAILED";
})(DeferDependenciesLoadingState || (exports.DeferDependenciesLoadingState = DeferDependenciesLoadingState = {}));
/** Slot index where `minimum` parameter value is stored. */
exports.MINIMUM_SLOT = 0;
/** Slot index where `after` parameter value is stored. */
exports.LOADING_AFTER_SLOT = 1;
/**
 * Describes the current state of this defer block instance.
 *
 * @publicApi
 */
var DeferBlockState;
(function (DeferBlockState) {
    /** The placeholder block content is rendered */
    DeferBlockState[DeferBlockState["Placeholder"] = 0] = "Placeholder";
    /** The loading block content is rendered */
    DeferBlockState[DeferBlockState["Loading"] = 1] = "Loading";
    /** The main content block content is rendered */
    DeferBlockState[DeferBlockState["Complete"] = 2] = "Complete";
    /** The error block content is rendered */
    DeferBlockState[DeferBlockState["Error"] = 3] = "Error";
})(DeferBlockState || (exports.DeferBlockState = DeferBlockState = {}));
/**
 * Describes the initial state of this defer block instance.
 *
 * Note: this state is internal only and *must* be represented
 * with a number lower than any value in the `DeferBlockState` enum.
 */
var DeferBlockInternalState;
(function (DeferBlockInternalState) {
    /** Initial state. Nothing is rendered yet. */
    DeferBlockInternalState[DeferBlockInternalState["Initial"] = -1] = "Initial";
})(DeferBlockInternalState || (exports.DeferBlockInternalState = DeferBlockInternalState = {}));
exports.NEXT_DEFER_BLOCK_STATE = 0;
// Note: it's *important* to keep the state in this slot, because this slot
// is used by runtime logic to differentiate between LViews, LContainers and
// other types (see `isLView` and `isLContainer` functions). In case of defer
// blocks, this slot would always be a number.
exports.DEFER_BLOCK_STATE = 1;
exports.STATE_IS_FROZEN_UNTIL = 2;
exports.LOADING_AFTER_CLEANUP_FN = 3;
exports.TRIGGER_CLEANUP_FNS = 4;
exports.PREFETCH_TRIGGER_CLEANUP_FNS = 5;
exports.SSR_UNIQUE_ID = 6;
exports.SSR_BLOCK_STATE = 7;
exports.ON_COMPLETE_FNS = 8;
exports.HYDRATE_TRIGGER_CLEANUP_FNS = 9;
/**
 * Options for configuring defer blocks behavior.
 * @publicApi
 */
var DeferBlockBehavior;
(function (DeferBlockBehavior) {
    /**
     * Manual triggering mode for defer blocks. Provides control over when defer blocks render
     * and which state they render.
     */
    DeferBlockBehavior[DeferBlockBehavior["Manual"] = 0] = "Manual";
    /**
     * Playthrough mode for defer blocks. This mode behaves like defer blocks would in a browser.
     * This is the default behavior in test environments.
     */
    DeferBlockBehavior[DeferBlockBehavior["Playthrough"] = 1] = "Playthrough";
})(DeferBlockBehavior || (exports.DeferBlockBehavior = DeferBlockBehavior = {}));
