"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFER_BLOCK_CONFIG = exports.DEFER_BLOCK_DEPENDENCY_INTERCEPTOR = void 0;
exports.renderDeferBlockState = renderDeferBlockState;
exports.renderPlaceholder = renderPlaceholder;
exports.renderDeferStateAfterResourceLoading = renderDeferStateAfterResourceLoading;
exports.ɵɵdeferEnableTimerScheduling = ɵɵdeferEnableTimerScheduling;
const cached_injector_service_1 = require("../cached_injector_service");
const di_1 = require("../di");
const interfaces_1 = require("../hydration/interfaces");
const assert_1 = require("../render3/assert");
const chained_injector_1 = require("../render3/chained_injector");
const mark_view_dirty_1 = require("../render3/instructions/mark_view_dirty");
const shared_1 = require("../render3/instructions/shared");
const container_1 = require("../render3/interfaces/container");
const type_checks_1 = require("../render3/interfaces/type_checks");
const view_1 = require("../render3/interfaces/view");
const view_utils_1 = require("../render3/util/view_utils");
const view_manipulation_1 = require("../render3/view_manipulation");
const assert_2 = require("../util/assert");
const interfaces_2 = require("./interfaces");
const timer_scheduler_1 = require("./timer_scheduler");
const utils_1 = require("./utils");
const profiler_1 = require("../render3/profiler");
const container_2 = require("../render3/view/container");
/**
 * **INTERNAL**, avoid referencing it in application code.
 * *
 * Injector token that allows to provide `DeferBlockDependencyInterceptor` class
 * implementation.
 *
 * This token is only injected in devMode
 */
exports.DEFER_BLOCK_DEPENDENCY_INTERCEPTOR = 
/* @__PURE__ */ new di_1.InjectionToken('DEFER_BLOCK_DEPENDENCY_INTERCEPTOR');
/**
 * **INTERNAL**, token used for configuring defer block behavior.
 */
exports.DEFER_BLOCK_CONFIG = new di_1.InjectionToken(ngDevMode ? 'DEFER_BLOCK_CONFIG' : '');
/**
 * Checks whether there is a cached injector associated with a given defer block
 * declaration and returns if it exists. If there is no cached injector present -
 * creates a new injector and stores in the cache.
 */
function getOrCreateEnvironmentInjector(parentInjector, tDetails, providers) {
    return parentInjector
        .get(cached_injector_service_1.CachedInjectorService)
        .getOrCreateInjector(tDetails, parentInjector, providers, ngDevMode ? 'DeferBlock Injector' : '');
}
/** Injector Helpers */
/**
 * Creates a new injector, which contains providers collected from dependencies (NgModules) of
 * defer-loaded components. This function detects different types of parent injectors and creates
 * a new injector based on that.
 */
function createDeferBlockInjector(parentInjector, tDetails, providers) {
    // Check if the parent injector is an instance of a `ChainedInjector`.
    //
    // In this case, we retain the shape of the injector and use a newly created
    // `EnvironmentInjector` as a parent in the `ChainedInjector`. That is needed to
    // make sure that the primary injector gets consulted first (since it's typically
    // a NodeInjector) and `EnvironmentInjector` tree is consulted after that.
    if (parentInjector instanceof chained_injector_1.ChainedInjector) {
        const origInjector = parentInjector.injector;
        // Guaranteed to be an environment injector
        const parentEnvInjector = parentInjector.parentInjector;
        const envInjector = getOrCreateEnvironmentInjector(parentEnvInjector, tDetails, providers);
        return new chained_injector_1.ChainedInjector(origInjector, envInjector);
    }
    const parentEnvInjector = parentInjector.get(di_1.EnvironmentInjector);
    // If the `parentInjector` is *not* an `EnvironmentInjector` - we need to create
    // a new `ChainedInjector` with the following setup:
    //
    //  - the provided `parentInjector` becomes a primary injector
    //  - an existing (real) `EnvironmentInjector` becomes a parent injector for
    //    a newly-created one, which contains extra providers
    //
    // So the final order in which injectors would be consulted in this case would look like this:
    //
    //  1. Provided `parentInjector`
    //  2. Newly-created `EnvironmentInjector` with extra providers
    //  3. `EnvironmentInjector` from the `parentInjector`
    if (parentEnvInjector !== parentInjector) {
        const envInjector = getOrCreateEnvironmentInjector(parentEnvInjector, tDetails, providers);
        return new chained_injector_1.ChainedInjector(parentInjector, envInjector);
    }
    // The `parentInjector` is an instance of an `EnvironmentInjector`.
    // No need for special handling, we can use `parentInjector` as a
    // parent injector directly.
    return getOrCreateEnvironmentInjector(parentInjector, tDetails, providers);
}
/** Rendering Helpers */
/**
 * Transitions a defer block to the new state. Updates the  necessary
 * data structures and renders corresponding block.
 *
 * @param newState New state that should be applied to the defer block.
 * @param tNode TNode that represents a defer block.
 * @param lContainer Represents an instance of a defer block.
 * @param skipTimerScheduling Indicates that `@loading` and `@placeholder` block
 *   should be rendered immediately, even if they have `after` or `minimum` config
 *   options setup. This flag to needed for testing APIs to transition defer block
 *   between states via `DeferFixture.render` method.
 */
function renderDeferBlockState(newState, tNode, lContainer, skipTimerScheduling = false) {
    var _a;
    const hostLView = lContainer[view_1.PARENT];
    const hostTView = hostLView[view_1.TVIEW];
    // Check if this view is not destroyed. Since the loading process was async,
    // the view might end up being destroyed by the time rendering happens.
    if ((0, type_checks_1.isDestroyed)(hostLView))
        return;
    // Make sure this TNode belongs to TView that represents host LView.
    ngDevMode && (0, assert_1.assertTNodeForLView)(tNode, hostLView);
    const lDetails = (0, utils_1.getLDeferBlockDetails)(hostLView, tNode);
    ngDevMode && (0, assert_2.assertDefined)(lDetails, 'Expected a defer block state defined');
    const currentState = lDetails[interfaces_2.DEFER_BLOCK_STATE];
    const ssrState = lDetails[interfaces_2.SSR_BLOCK_STATE];
    if (ssrState !== null && newState < ssrState) {
        return; // trying to render a previous state, exit
    }
    if (isValidStateChange(currentState, newState) &&
        isValidStateChange((_a = lDetails[interfaces_2.NEXT_DEFER_BLOCK_STATE]) !== null && _a !== void 0 ? _a : -1, newState)) {
        const tDetails = (0, utils_1.getTDeferBlockDetails)(hostTView, tNode);
        // Skips scheduling on the server since it can delay the server response.
        const needsScheduling = !skipTimerScheduling &&
            (typeof ngServerMode === 'undefined' || !ngServerMode) &&
            ((0, utils_1.getLoadingBlockAfter)(tDetails) !== null ||
                (0, utils_1.getMinimumDurationForState)(tDetails, interfaces_2.DeferBlockState.Loading) !== null ||
                (0, utils_1.getMinimumDurationForState)(tDetails, interfaces_2.DeferBlockState.Placeholder));
        if (ngDevMode && needsScheduling) {
            (0, assert_2.assertDefined)(applyDeferBlockStateWithSchedulingImpl, 'Expected scheduling function to be defined');
        }
        const applyStateFn = needsScheduling
            ? applyDeferBlockStateWithSchedulingImpl
            : applyDeferBlockState;
        try {
            applyStateFn(newState, lDetails, lContainer, tNode, hostLView);
        }
        catch (error) {
            (0, shared_1.handleUncaughtError)(hostLView, error);
        }
    }
}
function findMatchingDehydratedViewForDeferBlock(lContainer, lDetails) {
    var _a, _b;
    const dehydratedViewIx = (_b = (_a = lContainer[container_1.DEHYDRATED_VIEWS]) === null || _a === void 0 ? void 0 : _a.findIndex((view) => view.data[interfaces_1.DEFER_BLOCK_STATE] === lDetails[interfaces_2.DEFER_BLOCK_STATE])) !== null && _b !== void 0 ? _b : -1;
    const dehydratedView = dehydratedViewIx > -1 ? lContainer[container_1.DEHYDRATED_VIEWS][dehydratedViewIx] : null;
    return { dehydratedView, dehydratedViewIx };
}
/**
 * Applies changes to the DOM to reflect a given state.
 */
function applyDeferBlockState(newState, lDetails, lContainer, tNode, hostLView) {
    var _a;
    (0, profiler_1.profiler)(20 /* ProfilerEvent.DeferBlockStateStart */);
    const stateTmplIndex = (0, utils_1.getTemplateIndexForState)(newState, hostLView, tNode);
    if (stateTmplIndex !== null) {
        lDetails[interfaces_2.DEFER_BLOCK_STATE] = newState;
        const hostTView = hostLView[view_1.TVIEW];
        const adjustedIndex = stateTmplIndex + view_1.HEADER_OFFSET;
        // The TNode that represents a template that will activated in the defer block
        const activeBlockTNode = (0, view_utils_1.getTNode)(hostTView, adjustedIndex);
        // There is only 1 view that can be present in an LContainer that
        // represents a defer block, so always refer to the first one.
        const viewIndex = 0;
        (0, container_2.removeLViewFromLContainer)(lContainer, viewIndex);
        let injector;
        if (newState === interfaces_2.DeferBlockState.Complete) {
            // When we render a defer block in completed state, there might be
            // newly loaded standalone components used within the block, which may
            // import NgModules with providers. In order to make those providers
            // available for components declared in that NgModule, we create an instance
            // of an environment injector to host those providers and pass this injector
            // to the logic that creates a view.
            const tDetails = (0, utils_1.getTDeferBlockDetails)(hostTView, tNode);
            const providers = tDetails.providers;
            if (providers && providers.length > 0) {
                injector = createDeferBlockInjector(hostLView[view_1.INJECTOR], tDetails, providers);
            }
        }
        const { dehydratedView, dehydratedViewIx } = findMatchingDehydratedViewForDeferBlock(lContainer, lDetails);
        const embeddedLView = (0, view_manipulation_1.createAndRenderEmbeddedLView)(hostLView, activeBlockTNode, null, {
            injector,
            dehydratedView,
        });
        (0, container_2.addLViewToLContainer)(lContainer, embeddedLView, viewIndex, (0, view_manipulation_1.shouldAddViewToDom)(activeBlockTNode, dehydratedView));
        (0, mark_view_dirty_1.markViewDirty)(embeddedLView, 2 /* NotificationSource.DeferBlockStateUpdate */);
        if (dehydratedViewIx > -1) {
            // Erase dehydrated view info in a given LContainer, so that the view is not
            // removed later by post-hydration cleanup process (which iterates over all
            // dehydrated views in component tree). This clears only the dehydrated view
            // that was found for this render, which in most cases will be the only view.
            // In the case that there was control flow that changed, there may be either
            // more than one or the views would not match up due to the server rendered
            // content being a different branch of the control flow.
            (_a = lContainer[container_1.DEHYDRATED_VIEWS]) === null || _a === void 0 ? void 0 : _a.splice(dehydratedViewIx, 1);
        }
        if ((newState === interfaces_2.DeferBlockState.Complete || newState === interfaces_2.DeferBlockState.Error) &&
            Array.isArray(lDetails[interfaces_2.ON_COMPLETE_FNS])) {
            for (const callback of lDetails[interfaces_2.ON_COMPLETE_FNS]) {
                callback();
            }
            lDetails[interfaces_2.ON_COMPLETE_FNS] = null;
        }
    }
    (0, profiler_1.profiler)(21 /* ProfilerEvent.DeferBlockStateEnd */);
}
/**
 * Extends the `applyDeferBlockState` with timer-based scheduling.
 * This function becomes available on a page if there are defer blocks
 * that use `after` or `minimum` parameters in the `@loading` or
 * `@placeholder` blocks.
 */
function applyDeferBlockStateWithScheduling(newState, lDetails, lContainer, tNode, hostLView) {
    const now = Date.now();
    const hostTView = hostLView[view_1.TVIEW];
    const tDetails = (0, utils_1.getTDeferBlockDetails)(hostTView, tNode);
    if (lDetails[interfaces_2.STATE_IS_FROZEN_UNTIL] === null || lDetails[interfaces_2.STATE_IS_FROZEN_UNTIL] <= now) {
        lDetails[interfaces_2.STATE_IS_FROZEN_UNTIL] = null;
        const loadingAfter = (0, utils_1.getLoadingBlockAfter)(tDetails);
        const inLoadingAfterPhase = lDetails[interfaces_2.LOADING_AFTER_CLEANUP_FN] !== null;
        if (newState === interfaces_2.DeferBlockState.Loading && loadingAfter !== null && !inLoadingAfterPhase) {
            // Trying to render loading, but it has an `after` config,
            // so schedule an update action after a timeout.
            lDetails[interfaces_2.NEXT_DEFER_BLOCK_STATE] = newState;
            const cleanupFn = scheduleDeferBlockUpdate(loadingAfter, lDetails, tNode, lContainer, hostLView);
            lDetails[interfaces_2.LOADING_AFTER_CLEANUP_FN] = cleanupFn;
        }
        else {
            // If we transition to a complete or an error state and there is a pending
            // operation to render loading after a timeout - invoke a cleanup operation,
            // which stops the timer.
            if (newState > interfaces_2.DeferBlockState.Loading && inLoadingAfterPhase) {
                lDetails[interfaces_2.LOADING_AFTER_CLEANUP_FN]();
                lDetails[interfaces_2.LOADING_AFTER_CLEANUP_FN] = null;
                lDetails[interfaces_2.NEXT_DEFER_BLOCK_STATE] = null;
            }
            applyDeferBlockState(newState, lDetails, lContainer, tNode, hostLView);
            const duration = (0, utils_1.getMinimumDurationForState)(tDetails, newState);
            if (duration !== null) {
                lDetails[interfaces_2.STATE_IS_FROZEN_UNTIL] = now + duration;
                scheduleDeferBlockUpdate(duration, lDetails, tNode, lContainer, hostLView);
            }
        }
    }
    else {
        // We are still rendering the previous state.
        // Update the `NEXT_DEFER_BLOCK_STATE`, which would be
        // picked up once it's time to transition to the next state.
        lDetails[interfaces_2.NEXT_DEFER_BLOCK_STATE] = newState;
    }
}
/**
 * Schedules an update operation after a specified timeout.
 */
function scheduleDeferBlockUpdate(timeout, lDetails, tNode, lContainer, hostLView) {
    const callback = () => {
        const nextState = lDetails[interfaces_2.NEXT_DEFER_BLOCK_STATE];
        lDetails[interfaces_2.STATE_IS_FROZEN_UNTIL] = null;
        lDetails[interfaces_2.NEXT_DEFER_BLOCK_STATE] = null;
        if (nextState !== null) {
            renderDeferBlockState(nextState, tNode, lContainer);
        }
    };
    return (0, timer_scheduler_1.scheduleTimerTrigger)(timeout, callback, hostLView[view_1.INJECTOR]);
}
/**
 * Checks whether we can transition to the next state.
 *
 * We transition to the next state if the previous state was represented
 * with a number that is less than the next state. For example, if the current
 * state is "loading" (represented as `1`), we should not show a placeholder
 * (represented as `0`), but we can show a completed state (represented as `2`)
 * or an error state (represented as `3`).
 */
function isValidStateChange(currentState, newState) {
    return currentState < newState;
}
/** Utility function to render placeholder content (if present) */
function renderPlaceholder(lView, tNode) {
    const lContainer = lView[tNode.index];
    ngDevMode && (0, assert_1.assertLContainer)(lContainer);
    renderDeferBlockState(interfaces_2.DeferBlockState.Placeholder, tNode, lContainer);
}
/**
 * Subscribes to the "loading" Promise and renders corresponding defer sub-block,
 * based on the loading results.
 *
 * @param lContainer Represents an instance of a defer block.
 * @param tNode Represents defer block info shared across all instances.
 */
function renderDeferStateAfterResourceLoading(tDetails, tNode, lContainer) {
    ngDevMode &&
        (0, assert_2.assertDefined)(tDetails.loadingPromise, 'Expected loading Promise to exist on this defer block');
    tDetails.loadingPromise.then(() => {
        if (tDetails.loadingState === interfaces_2.DeferDependenciesLoadingState.COMPLETE) {
            ngDevMode && (0, utils_1.assertDeferredDependenciesLoaded)(tDetails);
            // Everything is loaded, show the primary block content
            renderDeferBlockState(interfaces_2.DeferBlockState.Complete, tNode, lContainer);
        }
        else if (tDetails.loadingState === interfaces_2.DeferDependenciesLoadingState.FAILED) {
            renderDeferBlockState(interfaces_2.DeferBlockState.Error, tNode, lContainer);
        }
    });
}
/**
 * Reference to the timer-based scheduler implementation of defer block state
 * rendering method. It's used to make timer-based scheduling tree-shakable.
 * If `minimum` or `after` parameters are used, compiler generates an extra
 * argument for the `ɵɵdefer` instruction, which references a timer-based
 * implementation.
 */
let applyDeferBlockStateWithSchedulingImpl = null;
/**
 * Enables timer-related scheduling if `after` or `minimum` parameters are setup
 * on the `@loading` or `@placeholder` blocks.
 */
function ɵɵdeferEnableTimerScheduling(tView, tDetails, placeholderConfigIndex, loadingConfigIndex) {
    const tViewConsts = tView.consts;
    if (placeholderConfigIndex != null) {
        tDetails.placeholderBlockConfig = (0, view_utils_1.getConstant)(tViewConsts, placeholderConfigIndex);
    }
    if (loadingConfigIndex != null) {
        tDetails.loadingBlockConfig = (0, view_utils_1.getConstant)(tViewConsts, loadingConfigIndex);
    }
    // Enable implementation that supports timer-based scheduling.
    if (applyDeferBlockStateWithSchedulingImpl === null) {
        applyDeferBlockStateWithSchedulingImpl = applyDeferBlockStateWithScheduling;
    }
}
