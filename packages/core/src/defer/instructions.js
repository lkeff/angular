"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵdefer = ɵɵdefer;
exports.ɵɵdeferWhen = ɵɵdeferWhen;
exports.ɵɵdeferPrefetchWhen = ɵɵdeferPrefetchWhen;
exports.ɵɵdeferHydrateWhen = ɵɵdeferHydrateWhen;
exports.ɵɵdeferHydrateNever = ɵɵdeferHydrateNever;
exports.ɵɵdeferOnIdle = ɵɵdeferOnIdle;
exports.ɵɵdeferPrefetchOnIdle = ɵɵdeferPrefetchOnIdle;
exports.ɵɵdeferHydrateOnIdle = ɵɵdeferHydrateOnIdle;
exports.ɵɵdeferOnImmediate = ɵɵdeferOnImmediate;
exports.ɵɵdeferPrefetchOnImmediate = ɵɵdeferPrefetchOnImmediate;
exports.ɵɵdeferHydrateOnImmediate = ɵɵdeferHydrateOnImmediate;
exports.ɵɵdeferOnTimer = ɵɵdeferOnTimer;
exports.ɵɵdeferPrefetchOnTimer = ɵɵdeferPrefetchOnTimer;
exports.ɵɵdeferHydrateOnTimer = ɵɵdeferHydrateOnTimer;
exports.ɵɵdeferOnHover = ɵɵdeferOnHover;
exports.ɵɵdeferPrefetchOnHover = ɵɵdeferPrefetchOnHover;
exports.ɵɵdeferHydrateOnHover = ɵɵdeferHydrateOnHover;
exports.ɵɵdeferOnInteraction = ɵɵdeferOnInteraction;
exports.ɵɵdeferPrefetchOnInteraction = ɵɵdeferPrefetchOnInteraction;
exports.ɵɵdeferHydrateOnInteraction = ɵɵdeferHydrateOnInteraction;
exports.ɵɵdeferOnViewport = ɵɵdeferOnViewport;
exports.ɵɵdeferPrefetchOnViewport = ɵɵdeferPrefetchOnViewport;
exports.ɵɵdeferHydrateOnViewport = ɵɵdeferHydrateOnViewport;
const signals_1 = require("../../primitives/signals");
const interfaces_1 = require("../hydration/interfaces");
const view_container_ref_1 = require("../linker/view_container_ref");
const bindings_1 = require("../render3/bindings");
const template_1 = require("../render3/instructions/template");
const container_1 = require("../render3/interfaces/container");
const view_1 = require("../render3/interfaces/view");
const state_1 = require("../render3/state");
const view_utils_1 = require("../render3/util/view_utils");
const performance_1 = require("../util/performance");
const cleanup_1 = require("./cleanup");
const dom_triggers_1 = require("./dom_triggers");
const idle_scheduler_1 = require("./idle_scheduler");
const interfaces_2 = require("./interfaces");
const timer_scheduler_1 = require("./timer_scheduler");
const utils_1 = require("./utils");
const registry_1 = require("./registry");
const utils_2 = require("../hydration/utils");
const rendering_1 = require("./rendering");
const triggering_1 = require("./triggering");
const errors_1 = require("../errors");
const console_1 = require("../console");
/**
 * Indicates whether we've already produced a warning,
 * prevents the logic from producing it multiple times.
 */
let _hmrWarningProduced = false;
/**
 * Logs a message into the console to indicate that `@defer` block
 * dependencies are loaded eagerly when the HMR mode is enabled.
 */
function logHmrWarning(injector) {
    if (!_hmrWarningProduced) {
        _hmrWarningProduced = true;
        const console = injector.get(console_1.Console);
        // tslint:disable-next-line:no-console
        console.log((0, errors_1.formatRuntimeError)(-751 /* RuntimeErrorCode.DEFER_IN_HMR_MODE */, 'Angular has detected that this application contains `@defer` blocks ' +
            'and the hot module replacement (HMR) mode is enabled. All `@defer` ' +
            'block dependencies will be loaded eagerly.'));
    }
}
/**
 * Creates runtime data structures for defer blocks.
 *
 * @param index Index of the `defer` instruction.
 * @param primaryTmplIndex Index of the template with the primary block content.
 * @param dependencyResolverFn Function that contains dependencies for this defer block.
 * @param loadingTmplIndex Index of the template with the loading block content.
 * @param placeholderTmplIndex Index of the template with the placeholder block content.
 * @param errorTmplIndex Index of the template with the error block content.
 * @param loadingConfigIndex Index in the constants array of the configuration of the loading.
 *     block.
 * @param placeholderConfigIndex Index in the constants array of the configuration of the
 *     placeholder block.
 * @param enableTimerScheduling Function that enables timer-related scheduling if `after`
 *     or `minimum` parameters are setup on the `@loading` or `@placeholder` blocks.
 * @param flags A set of flags to define a particular behavior (e.g. to indicate that
 *              hydrate triggers are present and regular triggers should be deactivated
 *              in certain scenarios).
 *
 * @codeGenApi
 */
function ɵɵdefer(index, primaryTmplIndex, dependencyResolverFn, loadingTmplIndex, placeholderTmplIndex, errorTmplIndex, loadingConfigIndex, placeholderConfigIndex, enableTimerScheduling, flags) {
    var _a, _b;
    const lView = (0, state_1.getLView)();
    const tView = (0, state_1.getTView)();
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    const tNode = (0, template_1.declareTemplate)(lView, tView, index, null, 0, 0);
    const injector = lView[view_1.INJECTOR];
    if (tView.firstCreatePass) {
        (0, performance_1.performanceMarkFeature)('NgDefer');
        if (ngDevMode && typeof ngHmrMode !== 'undefined' && ngHmrMode) {
            logHmrWarning(injector);
        }
        const tDetails = {
            primaryTmplIndex,
            loadingTmplIndex: loadingTmplIndex !== null && loadingTmplIndex !== void 0 ? loadingTmplIndex : null,
            placeholderTmplIndex: placeholderTmplIndex !== null && placeholderTmplIndex !== void 0 ? placeholderTmplIndex : null,
            errorTmplIndex: errorTmplIndex !== null && errorTmplIndex !== void 0 ? errorTmplIndex : null,
            placeholderBlockConfig: null,
            loadingBlockConfig: null,
            dependencyResolverFn: dependencyResolverFn !== null && dependencyResolverFn !== void 0 ? dependencyResolverFn : null,
            loadingState: interfaces_2.DeferDependenciesLoadingState.NOT_STARTED,
            loadingPromise: null,
            providers: null,
            hydrateTriggers: null,
            debug: null,
            flags: flags !== null && flags !== void 0 ? flags : 0 /* TDeferDetailsFlags.Default */,
        };
        enableTimerScheduling === null || enableTimerScheduling === void 0 ? void 0 : enableTimerScheduling(tView, tDetails, placeholderConfigIndex, loadingConfigIndex);
        (0, utils_1.setTDeferBlockDetails)(tView, adjustedIndex, tDetails);
    }
    const lContainer = lView[adjustedIndex];
    // If hydration is enabled, looks up dehydrated views in the DOM
    // using hydration annotation info and stores those views on LContainer.
    // In client-only mode, this function is a noop.
    (0, view_container_ref_1.populateDehydratedViewsInLContainer)(lContainer, tNode, lView);
    let ssrBlockState = null;
    let ssrUniqueId = null;
    if (((_a = lContainer[container_1.DEHYDRATED_VIEWS]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const info = lContainer[container_1.DEHYDRATED_VIEWS][0].data;
        ssrUniqueId = (_b = info[interfaces_1.DEFER_BLOCK_ID]) !== null && _b !== void 0 ? _b : null;
        ssrBlockState = info[interfaces_1.DEFER_BLOCK_STATE];
    }
    // Init instance-specific defer details and store it.
    const lDetails = [
        null, // NEXT_DEFER_BLOCK_STATE
        interfaces_2.DeferBlockInternalState.Initial, // DEFER_BLOCK_STATE
        null, // STATE_IS_FROZEN_UNTIL
        null, // LOADING_AFTER_CLEANUP_FN
        null, // TRIGGER_CLEANUP_FNS
        null, // PREFETCH_TRIGGER_CLEANUP_FNS
        ssrUniqueId, // SSR_UNIQUE_ID
        ssrBlockState, // SSR_BLOCK_STATE
        null, // ON_COMPLETE_FNS
        null, // HYDRATE_TRIGGER_CLEANUP_FNS
    ];
    (0, utils_1.setLDeferBlockDetails)(lView, adjustedIndex, lDetails);
    let registry = null;
    if (ssrUniqueId !== null) {
        ngDevMode && (0, utils_2.assertIncrementalHydrationIsConfigured)(injector);
        // Store this defer block in the registry, to have an access to
        // internal data structures from hydration runtime code.
        registry = injector.get(registry_1.DEHYDRATED_BLOCK_REGISTRY);
        registry.add(ssrUniqueId, { lView, tNode, lContainer });
    }
    const onLViewDestroy = () => {
        (0, cleanup_1.invokeAllTriggerCleanupFns)(lDetails);
        if (ssrUniqueId !== null) {
            registry === null || registry === void 0 ? void 0 : registry.cleanup([ssrUniqueId]);
        }
    };
    // When defer block is triggered - unsubscribe from LView destroy cleanup.
    (0, cleanup_1.storeTriggerCleanupFn)(0 /* TriggerType.Regular */, lDetails, () => (0, view_utils_1.removeLViewOnDestroy)(lView, onLViewDestroy));
    (0, view_utils_1.storeLViewOnDestroy)(lView, onLViewDestroy);
}
/**
 * Loads defer block dependencies when a trigger value becomes truthy.
 * @codeGenApi
 */
function ɵɵdeferWhen(rawValue) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getSelectedTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'when <expression>');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(0 /* TriggerType.Regular */, lView, tNode))
        return;
    const bindingIndex = (0, state_1.nextBindingIndex)();
    if ((0, bindings_1.bindingUpdated)(lView, bindingIndex, rawValue)) {
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            const value = Boolean(rawValue); // handle truthy or falsy values
            const lDetails = (0, utils_1.getLDeferBlockDetails)(lView, tNode);
            const renderedState = lDetails[interfaces_2.DEFER_BLOCK_STATE];
            if (value === false && renderedState === interfaces_2.DeferBlockInternalState.Initial) {
                // If nothing is rendered yet, render a placeholder (if defined).
                (0, rendering_1.renderPlaceholder)(lView, tNode);
            }
            else if (value === true &&
                (renderedState === interfaces_2.DeferBlockInternalState.Initial ||
                    renderedState === interfaces_2.DeferBlockState.Placeholder)) {
                (0, triggering_1.triggerDeferBlock)(0 /* TriggerType.Regular */, lView, tNode);
            }
        }
        finally {
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    }
}
/**
 * Prefetches the deferred content when a value becomes truthy.
 * @codeGenApi
 */
function ɵɵdeferPrefetchWhen(rawValue) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getSelectedTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'prefetch when <expression>');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(1 /* TriggerType.Prefetch */, lView, tNode))
        return;
    const bindingIndex = (0, state_1.nextBindingIndex)();
    if ((0, bindings_1.bindingUpdated)(lView, bindingIndex, rawValue)) {
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            const value = Boolean(rawValue); // handle truthy or falsy values
            const tView = lView[view_1.TVIEW];
            const tNode = (0, state_1.getSelectedTNode)();
            const tDetails = (0, utils_1.getTDeferBlockDetails)(tView, tNode);
            if (value === true && tDetails.loadingState === interfaces_2.DeferDependenciesLoadingState.NOT_STARTED) {
                // If loading has not been started yet, trigger it now.
                (0, triggering_1.triggerPrefetching)(tDetails, lView, tNode);
            }
        }
        finally {
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    }
}
/**
 * Hydrates the deferred content when a value becomes truthy.
 * @codeGenApi
 */
function ɵɵdeferHydrateWhen(rawValue) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getSelectedTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'hydrate when <expression>');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(2 /* TriggerType.Hydrate */, lView, tNode))
        return;
    // TODO(incremental-hydration): audit all defer instructions to reduce unnecessary work by
    // moving function calls inside their relevant control flow blocks
    const bindingIndex = (0, state_1.nextBindingIndex)();
    const tView = (0, state_1.getTView)();
    const hydrateTriggers = (0, triggering_1.getHydrateTriggers)(tView, tNode);
    hydrateTriggers.set(6 /* DeferBlockTrigger.When */, null);
    if ((0, bindings_1.bindingUpdated)(lView, bindingIndex, rawValue)) {
        if (typeof ngServerMode !== 'undefined' && ngServerMode) {
            // We are on the server and SSR for defer blocks is enabled.
            (0, triggering_1.triggerDeferBlock)(2 /* TriggerType.Hydrate */, lView, tNode);
        }
        else {
            const injector = lView[view_1.INJECTOR];
            const prevConsumer = (0, signals_1.setActiveConsumer)(null);
            try {
                const value = Boolean(rawValue); // handle truthy or falsy values
                if (value === true) {
                    // The `when` condition has changed to `true`, trigger defer block loading
                    // if the block is either in initial (nothing is rendered) or a placeholder
                    // state.
                    const lDetails = (0, utils_1.getLDeferBlockDetails)(lView, tNode);
                    const ssrUniqueId = lDetails[interfaces_2.SSR_UNIQUE_ID];
                    ngDevMode && (0, utils_2.assertSsrIdDefined)(ssrUniqueId);
                    (0, triggering_1.triggerHydrationFromBlockName)(injector, ssrUniqueId);
                }
            }
            finally {
                (0, signals_1.setActiveConsumer)(prevConsumer);
            }
        }
    }
}
/**
 * Specifies that hydration never occurs.
 * @codeGenApi
 */
function ɵɵdeferHydrateNever() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'hydrate never');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(2 /* TriggerType.Hydrate */, lView, tNode))
        return;
    const hydrateTriggers = (0, triggering_1.getHydrateTriggers)((0, state_1.getTView)(), tNode);
    hydrateTriggers.set(7 /* DeferBlockTrigger.Never */, null);
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        // We are on the server and SSR for defer blocks is enabled.
        (0, triggering_1.triggerDeferBlock)(2 /* TriggerType.Hydrate */, lView, tNode);
    }
}
/**
 * Sets up logic to handle the `on idle` deferred trigger.
 * @codeGenApi
 */
function ɵɵdeferOnIdle() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'on idle');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(0 /* TriggerType.Regular */, lView, tNode))
        return;
    (0, triggering_1.scheduleDelayedTrigger)(idle_scheduler_1.onIdle);
}
/**
 * Sets up logic to handle the `prefetch on idle` deferred trigger.
 * @codeGenApi
 */
function ɵɵdeferPrefetchOnIdle() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'prefetch on idle');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(1 /* TriggerType.Prefetch */, lView, tNode))
        return;
    (0, triggering_1.scheduleDelayedPrefetching)(idle_scheduler_1.onIdle, 0 /* DeferBlockTrigger.Idle */);
}
/**
 * Sets up logic to handle the `on idle` deferred trigger.
 * @codeGenApi
 */
function ɵɵdeferHydrateOnIdle() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'hydrate on idle');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(2 /* TriggerType.Hydrate */, lView, tNode))
        return;
    const hydrateTriggers = (0, triggering_1.getHydrateTriggers)((0, state_1.getTView)(), tNode);
    hydrateTriggers.set(0 /* DeferBlockTrigger.Idle */, null);
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        // We are on the server and SSR for defer blocks is enabled.
        (0, triggering_1.triggerDeferBlock)(2 /* TriggerType.Hydrate */, lView, tNode);
    }
    else {
        (0, triggering_1.scheduleDelayedHydrating)(idle_scheduler_1.onIdle, lView, tNode);
    }
}
/**
 * Sets up logic to handle the `on immediate` deferred trigger.
 * @codeGenApi
 */
function ɵɵdeferOnImmediate() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'on immediate');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(0 /* TriggerType.Regular */, lView, tNode))
        return;
    // Render placeholder block only if loading template is not present and we're on
    // the client to avoid content flickering, since it would be immediately replaced
    // by the loading block.
    const tDetails = (0, utils_1.getTDeferBlockDetails)(lView[view_1.TVIEW], tNode);
    if (tDetails.loadingTmplIndex === null) {
        (0, rendering_1.renderPlaceholder)(lView, tNode);
    }
    (0, triggering_1.triggerDeferBlock)(0 /* TriggerType.Regular */, lView, tNode);
}
/**
 * Sets up logic to handle the `prefetch on immediate` deferred trigger.
 * @codeGenApi
 */
function ɵɵdeferPrefetchOnImmediate() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'prefetch on immediate');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(1 /* TriggerType.Prefetch */, lView, tNode))
        return;
    const tView = lView[view_1.TVIEW];
    const tDetails = (0, utils_1.getTDeferBlockDetails)(tView, tNode);
    if (tDetails.loadingState === interfaces_2.DeferDependenciesLoadingState.NOT_STARTED) {
        (0, triggering_1.triggerResourceLoading)(tDetails, lView, tNode);
    }
}
/**
 * Sets up logic to handle the `on immediate` hydrate trigger.
 * @codeGenApi
 */
function ɵɵdeferHydrateOnImmediate() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'hydrate on immediate');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(2 /* TriggerType.Hydrate */, lView, tNode))
        return;
    const hydrateTriggers = (0, triggering_1.getHydrateTriggers)((0, state_1.getTView)(), tNode);
    hydrateTriggers.set(1 /* DeferBlockTrigger.Immediate */, null);
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        (0, triggering_1.triggerDeferBlock)(2 /* TriggerType.Hydrate */, lView, tNode);
    }
    else {
        const injector = lView[view_1.INJECTOR];
        const lDetails = (0, utils_1.getLDeferBlockDetails)(lView, tNode);
        const ssrUniqueId = lDetails[interfaces_2.SSR_UNIQUE_ID];
        ngDevMode && (0, utils_2.assertSsrIdDefined)(ssrUniqueId);
        (0, triggering_1.triggerHydrationFromBlockName)(injector, ssrUniqueId);
    }
}
/**
 * Creates runtime data structures for the `on timer` deferred trigger.
 * @param delay Amount of time to wait before loading the content.
 * @codeGenApi
 */
function ɵɵdeferOnTimer(delay) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, `on timer(${delay}ms)`);
    }
    if (!(0, triggering_1.shouldAttachTrigger)(0 /* TriggerType.Regular */, lView, tNode))
        return;
    (0, triggering_1.scheduleDelayedTrigger)((0, timer_scheduler_1.onTimer)(delay));
}
/**
 * Creates runtime data structures for the `prefetch on timer` deferred trigger.
 * @param delay Amount of time to wait before prefetching the content.
 * @codeGenApi
 */
function ɵɵdeferPrefetchOnTimer(delay) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, `prefetch on timer(${delay}ms)`);
    }
    if (!(0, triggering_1.shouldAttachTrigger)(1 /* TriggerType.Prefetch */, lView, tNode))
        return;
    (0, triggering_1.scheduleDelayedPrefetching)((0, timer_scheduler_1.onTimer)(delay), 5 /* DeferBlockTrigger.Timer */);
}
/**
 * Creates runtime data structures for the `on timer` hydrate trigger.
 * @param delay Amount of time to wait before loading the content.
 * @codeGenApi
 */
function ɵɵdeferHydrateOnTimer(delay) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, `hydrate on timer(${delay}ms)`);
    }
    if (!(0, triggering_1.shouldAttachTrigger)(2 /* TriggerType.Hydrate */, lView, tNode))
        return;
    const hydrateTriggers = (0, triggering_1.getHydrateTriggers)((0, state_1.getTView)(), tNode);
    hydrateTriggers.set(5 /* DeferBlockTrigger.Timer */, { delay });
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        // We are on the server and SSR for defer blocks is enabled.
        (0, triggering_1.triggerDeferBlock)(2 /* TriggerType.Hydrate */, lView, tNode);
    }
    else {
        (0, triggering_1.scheduleDelayedHydrating)((0, timer_scheduler_1.onTimer)(delay), lView, tNode);
    }
}
/**
 * Creates runtime data structures for the `on hover` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
function ɵɵdeferOnHover(triggerIndex, walkUpTimes) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, `on hover${walkUpTimes === -1 ? '' : '(<target>)'}`);
    }
    if (!(0, triggering_1.shouldAttachTrigger)(0 /* TriggerType.Regular */, lView, tNode))
        return;
    (0, rendering_1.renderPlaceholder)(lView, tNode);
    // Avoid adding event listeners when this instruction is invoked on the server.
    if (!(typeof ngServerMode !== 'undefined' && ngServerMode)) {
        (0, dom_triggers_1.registerDomTrigger)(lView, tNode, triggerIndex, walkUpTimes, dom_triggers_1.onHover, () => (0, triggering_1.triggerDeferBlock)(0 /* TriggerType.Regular */, lView, tNode), 0 /* TriggerType.Regular */);
    }
}
/**
 * Creates runtime data structures for the `prefetch on hover` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
function ɵɵdeferPrefetchOnHover(triggerIndex, walkUpTimes) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, `prefetch on hover${walkUpTimes === -1 ? '' : '(<target>)'}`);
    }
    if (!(0, triggering_1.shouldAttachTrigger)(1 /* TriggerType.Prefetch */, lView, tNode))
        return;
    const tView = lView[view_1.TVIEW];
    const tDetails = (0, utils_1.getTDeferBlockDetails)(tView, tNode);
    if (tDetails.loadingState === interfaces_2.DeferDependenciesLoadingState.NOT_STARTED) {
        (0, dom_triggers_1.registerDomTrigger)(lView, tNode, triggerIndex, walkUpTimes, dom_triggers_1.onHover, () => (0, triggering_1.triggerPrefetching)(tDetails, lView, tNode), 1 /* TriggerType.Prefetch */);
    }
}
/**
 * Creates runtime data structures for the `on hover` hydrate trigger.
 * @codeGenApi
 */
function ɵɵdeferHydrateOnHover() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'hydrate on hover');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(2 /* TriggerType.Hydrate */, lView, tNode))
        return;
    const hydrateTriggers = (0, triggering_1.getHydrateTriggers)((0, state_1.getTView)(), tNode);
    hydrateTriggers.set(4 /* DeferBlockTrigger.Hover */, null);
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        // We are on the server and SSR for defer blocks is enabled.
        (0, triggering_1.triggerDeferBlock)(2 /* TriggerType.Hydrate */, lView, tNode);
    }
    // The actual triggering of hydration on hover is handled by JSAction in
    // event_replay.ts.
}
/**
 * Creates runtime data structures for the `on interaction` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
function ɵɵdeferOnInteraction(triggerIndex, walkUpTimes) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, `on interaction${walkUpTimes === -1 ? '' : '(<target>)'}`);
    }
    if (!(0, triggering_1.shouldAttachTrigger)(0 /* TriggerType.Regular */, lView, tNode))
        return;
    (0, rendering_1.renderPlaceholder)(lView, tNode);
    // Avoid adding event listeners when this instruction is invoked on the server.
    if (!(typeof ngServerMode !== 'undefined' && ngServerMode)) {
        (0, dom_triggers_1.registerDomTrigger)(lView, tNode, triggerIndex, walkUpTimes, dom_triggers_1.onInteraction, () => (0, triggering_1.triggerDeferBlock)(0 /* TriggerType.Regular */, lView, tNode), 0 /* TriggerType.Regular */);
    }
}
/**
 * Creates runtime data structures for the `prefetch on interaction` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
function ɵɵdeferPrefetchOnInteraction(triggerIndex, walkUpTimes) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, `prefetch on interaction${walkUpTimes === -1 ? '' : '(<target>)'}`);
    }
    if (!(0, triggering_1.shouldAttachTrigger)(1 /* TriggerType.Prefetch */, lView, tNode))
        return;
    const tView = lView[view_1.TVIEW];
    const tDetails = (0, utils_1.getTDeferBlockDetails)(tView, tNode);
    if (tDetails.loadingState === interfaces_2.DeferDependenciesLoadingState.NOT_STARTED) {
        (0, dom_triggers_1.registerDomTrigger)(lView, tNode, triggerIndex, walkUpTimes, dom_triggers_1.onInteraction, () => (0, triggering_1.triggerPrefetching)(tDetails, lView, tNode), 1 /* TriggerType.Prefetch */);
    }
}
/**
 * Creates runtime data structures for the `on interaction` hydrate trigger.
 * @codeGenApi
 */
function ɵɵdeferHydrateOnInteraction() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'hydrate on interaction');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(2 /* TriggerType.Hydrate */, lView, tNode))
        return;
    const hydrateTriggers = (0, triggering_1.getHydrateTriggers)((0, state_1.getTView)(), tNode);
    hydrateTriggers.set(3 /* DeferBlockTrigger.Interaction */, null);
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        // We are on the server and SSR for defer blocks is enabled.
        (0, triggering_1.triggerDeferBlock)(2 /* TriggerType.Hydrate */, lView, tNode);
    }
    // The actual triggering of hydration on interaction is handled by JSAction in
    // event_replay.ts.
}
/**
 * Creates runtime data structures for the `on viewport` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
function ɵɵdeferOnViewport(triggerIndex, walkUpTimes) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, `on viewport${walkUpTimes === -1 ? '' : '(<target>)'}`);
    }
    if (!(0, triggering_1.shouldAttachTrigger)(0 /* TriggerType.Regular */, lView, tNode))
        return;
    (0, rendering_1.renderPlaceholder)(lView, tNode);
    // Avoid adding event listeners when this instruction is invoked on the server.
    if (!(typeof ngServerMode !== 'undefined' && ngServerMode)) {
        (0, dom_triggers_1.registerDomTrigger)(lView, tNode, triggerIndex, walkUpTimes, dom_triggers_1.onViewport, () => (0, triggering_1.triggerDeferBlock)(0 /* TriggerType.Regular */, lView, tNode), 0 /* TriggerType.Regular */);
    }
}
/**
 * Creates runtime data structures for the `prefetch on viewport` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
function ɵɵdeferPrefetchOnViewport(triggerIndex, walkUpTimes) {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, `prefetch on viewport${walkUpTimes === -1 ? '' : '(<target>)'}`);
    }
    if (!(0, triggering_1.shouldAttachTrigger)(1 /* TriggerType.Prefetch */, lView, tNode))
        return;
    const tView = lView[view_1.TVIEW];
    const tDetails = (0, utils_1.getTDeferBlockDetails)(tView, tNode);
    if (tDetails.loadingState === interfaces_2.DeferDependenciesLoadingState.NOT_STARTED) {
        (0, dom_triggers_1.registerDomTrigger)(lView, tNode, triggerIndex, walkUpTimes, dom_triggers_1.onViewport, () => (0, triggering_1.triggerPrefetching)(tDetails, lView, tNode), 1 /* TriggerType.Prefetch */);
    }
}
/**
 * Creates runtime data structures for the `on viewport` hydrate trigger.
 * @codeGenApi
 */
function ɵɵdeferHydrateOnViewport() {
    const lView = (0, state_1.getLView)();
    const tNode = (0, state_1.getCurrentTNode)();
    if (ngDevMode) {
        (0, utils_1.trackTriggerForDebugging)(lView[view_1.TVIEW], tNode, 'hydrate on viewport');
    }
    if (!(0, triggering_1.shouldAttachTrigger)(2 /* TriggerType.Hydrate */, lView, tNode))
        return;
    const hydrateTriggers = (0, triggering_1.getHydrateTriggers)((0, state_1.getTView)(), tNode);
    hydrateTriggers.set(2 /* DeferBlockTrigger.Viewport */, null);
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        // We are on the server and SSR for defer blocks is enabled.
        (0, triggering_1.triggerDeferBlock)(2 /* TriggerType.Hydrate */, lView, tNode);
    }
    // The actual triggering of hydration on viewport happens in triggering.ts,
    // since these instructions won't exist for dehydrated content.
}
