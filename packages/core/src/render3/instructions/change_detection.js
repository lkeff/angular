"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAXIMUM_REFRESH_RERUNS = void 0;
exports.detectChangesInternal = detectChangesInternal;
exports.checkNoChangesInternal = checkNoChangesInternal;
exports.refreshView = refreshView;
const signals_1 = require("../../../primitives/signals");
const errors_1 = require("../../errors");
const assert_1 = require("../../util/assert");
const view_1 = require("../after_render/view");
const hooks_1 = require("../hooks");
const container_1 = require("../interfaces/container");
const view_2 = require("../interfaces/view");
const reactive_lview_consumer_1 = require("../reactive_lview_consumer");
const state_1 = require("../state");
const view_traversal_utils_1 = require("../util/view_traversal_utils");
const view_utils_1 = require("../util/view_utils");
const type_checks_1 = require("../interfaces/type_checks");
const profiler_1 = require("../profiler");
const query_execution_1 = require("../queries/query_execution");
const view_effect_runner_1 = require("../reactivity/view_effect_runner");
const shared_1 = require("./shared");
/**
 * The maximum number of times the change detection traversal will rerun before throwing an error.
 */
exports.MAXIMUM_REFRESH_RERUNS = 100;
function detectChangesInternal(lView, mode = 0 /* ChangeDetectionMode.Global */) {
    var _a, _b;
    const environment = lView[view_2.ENVIRONMENT];
    const rendererFactory = environment.rendererFactory;
    // Check no changes mode is a dev only mode used to verify that bindings have not changed
    // since they were assigned. We do not want to invoke renderer factory functions in that mode
    // to avoid any possible side-effects.
    const checkNoChangesMode = !!ngDevMode && (0, state_1.isInCheckNoChangesMode)();
    if (!checkNoChangesMode) {
        (_a = rendererFactory.begin) === null || _a === void 0 ? void 0 : _a.call(rendererFactory);
    }
    try {
        detectChangesInViewWhileDirty(lView, mode);
    }
    finally {
        if (!checkNoChangesMode) {
            (_b = rendererFactory.end) === null || _b === void 0 ? void 0 : _b.call(rendererFactory);
        }
    }
}
function detectChangesInViewWhileDirty(lView, mode) {
    const lastIsRefreshingViewsValue = (0, state_1.isRefreshingViews)();
    try {
        (0, state_1.setIsRefreshingViews)(true);
        detectChangesInView(lView, mode);
        // We don't need or want to do any looping when in exhaustive checkNoChanges because we
        // already traverse all the views and nothing should change so we shouldn't have to do
        // another pass to pick up new changes.
        if (ngDevMode && (0, state_1.isExhaustiveCheckNoChanges)()) {
            return;
        }
        let retries = 0;
        // If after running change detection, this view still needs to be refreshed or there are
        // descendants views that need to be refreshed due to re-dirtying during the change detection
        // run, detect changes on the view again. We run change detection in `Targeted` mode to only
        // refresh views with the `RefreshView` flag.
        while ((0, view_utils_1.requiresRefreshOrTraversal)(lView)) {
            if (retries === exports.MAXIMUM_REFRESH_RERUNS) {
                throw new errors_1.RuntimeError(103 /* RuntimeErrorCode.INFINITE_CHANGE_DETECTION */, ngDevMode &&
                    'Infinite change detection while trying to refresh views. ' +
                        'There may be components which each cause the other to require a refresh, ' +
                        'causing an infinite loop.');
            }
            retries++;
            // Even if this view is detached, we still detect changes in targeted mode because this was
            // the root of the change detection run.
            detectChangesInView(lView, 1 /* ChangeDetectionMode.Targeted */);
        }
    }
    finally {
        // restore state to what it was before entering this change detection loop
        (0, state_1.setIsRefreshingViews)(lastIsRefreshingViewsValue);
    }
}
function checkNoChangesInternal(lView, exhaustive) {
    (0, state_1.setIsInCheckNoChangesMode)(exhaustive ? state_1.CheckNoChangesMode.Exhaustive : state_1.CheckNoChangesMode.OnlyDirtyViews);
    try {
        detectChangesInternal(lView);
    }
    finally {
        (0, state_1.setIsInCheckNoChangesMode)(state_1.CheckNoChangesMode.Off);
    }
}
/**
 * Processes a view in update mode. This includes a number of steps in a specific order:
 * - executing a template function in update mode;
 * - executing hooks;
 * - refreshing queries;
 * - setting host bindings;
 * - refreshing child (embedded and component) views.
 */
function refreshView(tView, lView, templateFn, context) {
    ngDevMode && (0, assert_1.assertEqual)((0, view_utils_1.isCreationMode)(lView), false, 'Should be run in update mode');
    if ((0, type_checks_1.isDestroyed)(lView))
        return;
    const flags = lView[view_2.FLAGS];
    // Check no changes mode is a dev only mode used to verify that bindings have not changed
    // since they were assigned. We do not want to execute lifecycle hooks in that mode.
    const isInCheckNoChangesPass = ngDevMode && (0, state_1.isInCheckNoChangesMode)();
    const isInExhaustiveCheckNoChangesPass = ngDevMode && (0, state_1.isExhaustiveCheckNoChanges)();
    // Start component reactive context
    // - We might already be in a reactive context if this is an embedded view of the host.
    // - We might be descending into a view that needs a consumer.
    (0, state_1.enterView)(lView);
    let returnConsumerToPool = true;
    let prevConsumer = null;
    let currentConsumer = null;
    if (!isInCheckNoChangesPass) {
        if ((0, reactive_lview_consumer_1.viewShouldHaveReactiveConsumer)(tView)) {
            currentConsumer = (0, reactive_lview_consumer_1.getOrBorrowReactiveLViewConsumer)(lView);
            prevConsumer = (0, signals_1.consumerBeforeComputation)(currentConsumer);
        }
        else if ((0, signals_1.getActiveConsumer)() === null) {
            // If the current view should not have a reactive consumer but we don't have an active consumer,
            // we still need to create a temporary consumer to track any signal reads in this template.
            // This is a rare case that can happen with `viewContainerRef.createEmbeddedView(...).detectChanges()`.
            // This temporary consumer marks the first parent that _should_ have a consumer for refresh.
            // Once that refresh happens, the signals will be tracked in the parent consumer and we can destroy
            // the temporary one.
            returnConsumerToPool = false;
            currentConsumer = (0, reactive_lview_consumer_1.getOrCreateTemporaryConsumer)(lView);
            prevConsumer = (0, signals_1.consumerBeforeComputation)(currentConsumer);
        }
        else if (lView[view_2.REACTIVE_TEMPLATE_CONSUMER]) {
            (0, signals_1.consumerDestroy)(lView[view_2.REACTIVE_TEMPLATE_CONSUMER]);
            lView[view_2.REACTIVE_TEMPLATE_CONSUMER] = null;
        }
    }
    try {
        (0, view_utils_1.resetPreOrderHookFlags)(lView);
        (0, state_1.setBindingIndex)(tView.bindingStartIndex);
        if (templateFn !== null) {
            (0, shared_1.executeTemplate)(tView, lView, templateFn, 2 /* RenderFlags.Update */, context);
        }
        const hooksInitPhaseCompleted = (flags & 3 /* LViewFlags.InitPhaseStateMask */) === 3 /* InitPhaseState.InitPhaseCompleted */;
        // execute pre-order hooks (OnInit, OnChanges, DoCheck)
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!isInCheckNoChangesPass) {
            if (hooksInitPhaseCompleted) {
                const preOrderCheckHooks = tView.preOrderCheckHooks;
                if (preOrderCheckHooks !== null) {
                    (0, hooks_1.executeCheckHooks)(lView, preOrderCheckHooks, null);
                }
            }
            else {
                const preOrderHooks = tView.preOrderHooks;
                if (preOrderHooks !== null) {
                    (0, hooks_1.executeInitAndCheckHooks)(lView, preOrderHooks, 0 /* InitPhaseState.OnInitHooksToBeRun */, null);
                }
                (0, hooks_1.incrementInitPhaseFlags)(lView, 0 /* InitPhaseState.OnInitHooksToBeRun */);
            }
        }
        // We do not need to mark transplanted views for refresh when doing exhaustive checks
        // because all views will be reached anyways during the traversal.
        if (!isInExhaustiveCheckNoChangesPass) {
            // First mark transplanted views that are declared in this lView as needing a refresh at their
            // insertion points. This is needed to avoid the situation where the template is defined in this
            // `LView` but its declaration appears after the insertion component.
            markTransplantedViewsForRefresh(lView);
        }
        (0, view_effect_runner_1.runEffectsInView)(lView);
        detectChangesInEmbeddedViews(lView, 0 /* ChangeDetectionMode.Global */);
        // Content query results must be refreshed before content hooks are called.
        if (tView.contentQueries !== null) {
            (0, query_execution_1.refreshContentQueries)(tView, lView);
        }
        // execute content hooks (AfterContentInit, AfterContentChecked)
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!isInCheckNoChangesPass) {
            if (hooksInitPhaseCompleted) {
                const contentCheckHooks = tView.contentCheckHooks;
                if (contentCheckHooks !== null) {
                    (0, hooks_1.executeCheckHooks)(lView, contentCheckHooks);
                }
            }
            else {
                const contentHooks = tView.contentHooks;
                if (contentHooks !== null) {
                    (0, hooks_1.executeInitAndCheckHooks)(lView, contentHooks, 1 /* InitPhaseState.AfterContentInitHooksToBeRun */);
                }
                (0, hooks_1.incrementInitPhaseFlags)(lView, 1 /* InitPhaseState.AfterContentInitHooksToBeRun */);
            }
        }
        processHostBindingOpCodes(tView, lView);
        // Refresh child component views.
        const components = tView.components;
        if (components !== null) {
            detectChangesInChildComponents(lView, components, 0 /* ChangeDetectionMode.Global */);
        }
        // View queries must execute after refreshing child components because a template in this view
        // could be inserted in a child component. If the view query executes before child component
        // refresh, the template might not yet be inserted.
        const viewQuery = tView.viewQuery;
        if (viewQuery !== null) {
            (0, query_execution_1.executeViewQueryFn)(2 /* RenderFlags.Update */, viewQuery, context);
        }
        // execute view hooks (AfterViewInit, AfterViewChecked)
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!isInCheckNoChangesPass) {
            if (hooksInitPhaseCompleted) {
                const viewCheckHooks = tView.viewCheckHooks;
                if (viewCheckHooks !== null) {
                    (0, hooks_1.executeCheckHooks)(lView, viewCheckHooks);
                }
            }
            else {
                const viewHooks = tView.viewHooks;
                if (viewHooks !== null) {
                    (0, hooks_1.executeInitAndCheckHooks)(lView, viewHooks, 2 /* InitPhaseState.AfterViewInitHooksToBeRun */);
                }
                (0, hooks_1.incrementInitPhaseFlags)(lView, 2 /* InitPhaseState.AfterViewInitHooksToBeRun */);
            }
        }
        if (tView.firstUpdatePass === true) {
            // We need to make sure that we only flip the flag on successful `refreshView` only
            // Don't do this in `finally` block.
            // If we did this in `finally` block then an exception could block the execution of styling
            // instructions which in turn would be unable to insert themselves into the styling linked
            // list. The result of this would be that if the exception would not be throw on subsequent CD
            // the styling would be unable to process it data and reflect to the DOM.
            tView.firstUpdatePass = false;
        }
        // Schedule any effects that are waiting on the update pass of this view.
        if (lView[view_2.EFFECTS_TO_SCHEDULE]) {
            for (const notifyEffect of lView[view_2.EFFECTS_TO_SCHEDULE]) {
                notifyEffect();
            }
            // Once they've been run, we can drop the array.
            lView[view_2.EFFECTS_TO_SCHEDULE] = null;
        }
        // Do not reset the dirty state when running in check no changes mode. We don't want components
        // to behave differently depending on whether check no changes is enabled or not. For example:
        // Marking an OnPush component as dirty from within the `ngAfterViewInit` hook in order to
        // refresh a `NgClass` binding should work. If we would reset the dirty state in the check
        // no changes cycle, the component would be not be dirty for the next update pass. This would
        // be different in production mode where the component dirty state is not reset.
        if (!isInCheckNoChangesPass) {
            (0, view_1.addAfterRenderSequencesForView)(lView);
            lView[view_2.FLAGS] &= ~(64 /* LViewFlags.Dirty */ | 8 /* LViewFlags.FirstLViewPass */);
        }
    }
    catch (e) {
        if (!isInCheckNoChangesPass) {
            // If refreshing a view causes an error, we need to remark the ancestors as needing traversal
            // because the error might have caused a situation where views below the current location are
            // dirty but will be unreachable because the "has dirty children" flag in the ancestors has been
            // cleared during change detection and we failed to run to completion.
            (0, view_utils_1.markAncestorsForTraversal)(lView);
        }
        throw e;
    }
    finally {
        if (currentConsumer !== null) {
            (0, signals_1.consumerAfterComputation)(currentConsumer, prevConsumer);
            if (returnConsumerToPool) {
                (0, reactive_lview_consumer_1.maybeReturnReactiveLViewConsumer)(currentConsumer);
            }
        }
        (0, state_1.leaveView)();
    }
}
/**
 * Goes over embedded views (ones created through ViewContainerRef APIs) and refreshes
 * them by executing an associated template function.
 */
function detectChangesInEmbeddedViews(lView, mode) {
    for (let lContainer = (0, view_traversal_utils_1.getFirstLContainer)(lView); lContainer !== null; lContainer = (0, view_traversal_utils_1.getNextLContainer)(lContainer)) {
        for (let i = container_1.CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
            const embeddedLView = lContainer[i];
            detectChangesInViewIfAttached(embeddedLView, mode);
        }
    }
}
/**
 * Mark transplanted views as needing to be refreshed at their attachment points.
 *
 * @param lView The `LView` that may have transplanted views.
 */
function markTransplantedViewsForRefresh(lView) {
    for (let lContainer = (0, view_traversal_utils_1.getFirstLContainer)(lView); lContainer !== null; lContainer = (0, view_traversal_utils_1.getNextLContainer)(lContainer)) {
        if (!(lContainer[view_2.FLAGS] & 2 /* LContainerFlags.HasTransplantedViews */))
            continue;
        const movedViews = lContainer[container_1.MOVED_VIEWS];
        ngDevMode && (0, assert_1.assertDefined)(movedViews, 'Transplanted View flags set but missing MOVED_VIEWS');
        for (let i = 0; i < movedViews.length; i++) {
            const movedLView = movedViews[i];
            (0, view_utils_1.markViewForRefresh)(movedLView);
        }
    }
}
/**
 * Detects changes in a component by entering the component view and processing its bindings,
 * queries, etc. if it is CheckAlways, OnPush and Dirty, etc.
 *
 * @param componentHostIdx  Element index in LView[] (adjusted for HEADER_OFFSET)
 */
function detectChangesInComponent(hostLView, componentHostIdx, mode) {
    ngDevMode && (0, assert_1.assertEqual)((0, view_utils_1.isCreationMode)(hostLView), false, 'Should be run in update mode');
    (0, profiler_1.profiler)(18 /* ProfilerEvent.ComponentStart */);
    const componentView = (0, view_utils_1.getComponentLViewByIndex)(componentHostIdx, hostLView);
    detectChangesInViewIfAttached(componentView, mode);
    (0, profiler_1.profiler)(19 /* ProfilerEvent.ComponentEnd */, componentView[view_2.CONTEXT]);
}
/**
 * Visits a view as part of change detection traversal.
 *
 * If the view is detached, no additional traversal happens.
 */
function detectChangesInViewIfAttached(lView, mode) {
    if (!(0, view_utils_1.viewAttachedToChangeDetector)(lView)) {
        return;
    }
    detectChangesInView(lView, mode);
}
/**
 * Visits a view as part of change detection traversal.
 *
 * The view is refreshed if:
 * - If the view is CheckAlways or Dirty and ChangeDetectionMode is `Global`
 * - If the view has the `RefreshView` flag
 *
 * The view is not refreshed, but descendants are traversed in `ChangeDetectionMode.Targeted` if the
 * view HasChildViewsToRefresh flag is set.
 */
function detectChangesInView(lView, mode) {
    const isInCheckNoChangesPass = ngDevMode && (0, state_1.isInCheckNoChangesMode)();
    const tView = lView[view_2.TVIEW];
    const flags = lView[view_2.FLAGS];
    const consumer = lView[view_2.REACTIVE_TEMPLATE_CONSUMER];
    // Refresh CheckAlways views in Global mode.
    let shouldRefreshView = !!(mode === 0 /* ChangeDetectionMode.Global */ && flags & 16 /* LViewFlags.CheckAlways */);
    // Refresh Dirty views in Global mode, as long as we're not in checkNoChanges.
    // CheckNoChanges never worked with `OnPush` components because the `Dirty` flag was
    // cleared before checkNoChanges ran. Because there is now a loop for to check for
    // backwards views, it gives an opportunity for `OnPush` components to be marked `Dirty`
    // before the CheckNoChanges pass. We don't want existing errors that are hidden by the
    // current CheckNoChanges bug to surface when making unrelated changes.
    shouldRefreshView || (shouldRefreshView = !!(flags & 64 /* LViewFlags.Dirty */ &&
        mode === 0 /* ChangeDetectionMode.Global */ &&
        !isInCheckNoChangesPass));
    // Always refresh views marked for refresh, regardless of mode.
    shouldRefreshView || (shouldRefreshView = !!(flags & 1024 /* LViewFlags.RefreshView */));
    // Refresh views when they have a dirty reactive consumer, regardless of mode.
    shouldRefreshView || (shouldRefreshView = !!((consumer === null || consumer === void 0 ? void 0 : consumer.dirty) && (0, signals_1.consumerPollProducersForChange)(consumer)));
    shouldRefreshView || (shouldRefreshView = !!(ngDevMode && (0, state_1.isExhaustiveCheckNoChanges)()));
    // Mark the Flags and `ReactiveNode` as not dirty before refreshing the component, so that they
    // can be re-dirtied during the refresh process.
    if (consumer) {
        consumer.dirty = false;
    }
    lView[view_2.FLAGS] &= ~(8192 /* LViewFlags.HasChildViewsToRefresh */ | 1024 /* LViewFlags.RefreshView */);
    if (shouldRefreshView) {
        refreshView(tView, lView, tView.template, lView[view_2.CONTEXT]);
    }
    else if (flags & 8192 /* LViewFlags.HasChildViewsToRefresh */) {
        if (!isInCheckNoChangesPass) {
            (0, view_effect_runner_1.runEffectsInView)(lView);
        }
        detectChangesInEmbeddedViews(lView, 1 /* ChangeDetectionMode.Targeted */);
        const components = tView.components;
        if (components !== null) {
            detectChangesInChildComponents(lView, components, 1 /* ChangeDetectionMode.Targeted */);
        }
        if (!isInCheckNoChangesPass) {
            (0, view_1.addAfterRenderSequencesForView)(lView);
        }
    }
}
/** Refreshes child components in the current view (update mode). */
function detectChangesInChildComponents(hostLView, components, mode) {
    for (let i = 0; i < components.length; i++) {
        detectChangesInComponent(hostLView, components[i], mode);
    }
}
/**
 * Invoke `HostBindingsFunction`s for view.
 *
 * This methods executes `TView.hostBindingOpCodes`. It is used to execute the
 * `HostBindingsFunction`s associated with the current `LView`.
 *
 * @param tView Current `TView`.
 * @param lView Current `LView`.
 */
function processHostBindingOpCodes(tView, lView) {
    const hostBindingOpCodes = tView.hostBindingOpCodes;
    if (hostBindingOpCodes === null)
        return;
    try {
        for (let i = 0; i < hostBindingOpCodes.length; i++) {
            const opCode = hostBindingOpCodes[i];
            if (opCode < 0) {
                // Negative numbers are element indexes.
                (0, state_1.setSelectedIndex)(~opCode);
            }
            else {
                // Positive numbers are NumberTuple which store bindingRootIndex and directiveIndex.
                const directiveIdx = opCode;
                const bindingRootIndx = hostBindingOpCodes[++i];
                const hostBindingFn = hostBindingOpCodes[++i];
                (0, state_1.setBindingRootForHostBindings)(bindingRootIndx, directiveIdx);
                const context = lView[directiveIdx];
                (0, profiler_1.profiler)(24 /* ProfilerEvent.HostBindingsUpdateStart */, context);
                hostBindingFn(2 /* RenderFlags.Update */, context);
                (0, profiler_1.profiler)(25 /* ProfilerEvent.HostBindingsUpdateEnd */, context);
            }
        }
    }
    finally {
        (0, state_1.setSelectedIndex)(-1);
    }
}
