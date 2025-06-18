"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hoverEventNames = exports.interactionEventNames = void 0;
exports.onInteraction = onInteraction;
exports.onHover = onHover;
exports.onViewport = onViewport;
exports.getTriggerLView = getTriggerLView;
exports.getTriggerElement = getTriggerElement;
exports.registerDomTrigger = registerDomTrigger;
const hooks_1 = require("../render3/after_render/hooks");
const assert_1 = require("../render3/assert");
const container_1 = require("../render3/interfaces/container");
const type_checks_1 = require("../render3/interfaces/type_checks");
const view_1 = require("../render3/interfaces/view");
const view_utils_1 = require("../render3/util/view_utils");
const assert_2 = require("../util/assert");
const zone_1 = require("../zone");
const cleanup_1 = require("./cleanup");
const interfaces_1 = require("./interfaces");
const utils_1 = require("./utils");
/** Configuration object used to register passive and capturing events. */
const eventListenerOptions = {
    passive: true,
    capture: true,
};
/** Keeps track of the currently-registered `on hover` triggers. */
const hoverTriggers = new WeakMap();
/** Keeps track of the currently-registered `on interaction` triggers. */
const interactionTriggers = new WeakMap();
/** Currently-registered `viewport` triggers. */
const viewportTriggers = new WeakMap();
/** Names of the events considered as interaction events. */
exports.interactionEventNames = ['click', 'keydown'];
/** Names of the events considered as hover events. */
exports.hoverEventNames = ['mouseenter', 'mouseover', 'focusin'];
/** `IntersectionObserver` used to observe `viewport` triggers. */
let intersectionObserver = null;
/** Number of elements currently observed with `viewport` triggers. */
let observedViewportElements = 0;
/** Object keeping track of registered callbacks for a deferred block trigger. */
class DeferEventEntry {
    constructor() {
        this.callbacks = new Set();
        this.listener = () => {
            for (const callback of this.callbacks) {
                callback();
            }
        };
    }
}
/**
 * Registers an interaction trigger.
 * @param trigger Element that is the trigger.
 * @param callback Callback to be invoked when the trigger is interacted with.
 */
function onInteraction(trigger, callback) {
    let entry = interactionTriggers.get(trigger);
    // If this is the first entry for this element, add the listeners.
    if (!entry) {
        // Note that managing events centrally like this lends itself well to using global
        // event delegation. It currently does delegation at the element level, rather than the
        // document level, because:
        // 1. Global delegation is the most effective when there are a lot of events being registered
        // at the same time. Deferred blocks are unlikely to be used in such a way.
        // 2. Matching events to their target isn't free. For each `click` and `keydown` event we
        // would have look through all the triggers and check if the target either is the element
        // itself or it's contained within the element. Given that `click` and `keydown` are some
        // of the most common events, this may end up introducing a lot of runtime overhead.
        // 3. We're still registering only two events per element, no matter how many deferred blocks
        // are referencing it.
        entry = new DeferEventEntry();
        interactionTriggers.set(trigger, entry);
        for (const name of exports.interactionEventNames) {
            trigger.addEventListener(name, entry.listener, eventListenerOptions);
        }
    }
    entry.callbacks.add(callback);
    return () => {
        const { callbacks, listener } = entry;
        callbacks.delete(callback);
        if (callbacks.size === 0) {
            interactionTriggers.delete(trigger);
            for (const name of exports.interactionEventNames) {
                trigger.removeEventListener(name, listener, eventListenerOptions);
            }
        }
    };
}
/**
 * Registers a hover trigger.
 * @param trigger Element that is the trigger.
 * @param callback Callback to be invoked when the trigger is hovered over.
 */
function onHover(trigger, callback) {
    let entry = hoverTriggers.get(trigger);
    // If this is the first entry for this element, add the listener.
    if (!entry) {
        entry = new DeferEventEntry();
        hoverTriggers.set(trigger, entry);
        for (const name of exports.hoverEventNames) {
            trigger.addEventListener(name, entry.listener, eventListenerOptions);
        }
    }
    entry.callbacks.add(callback);
    return () => {
        const { callbacks, listener } = entry;
        callbacks.delete(callback);
        if (callbacks.size === 0) {
            for (const name of exports.hoverEventNames) {
                trigger.removeEventListener(name, listener, eventListenerOptions);
            }
            hoverTriggers.delete(trigger);
        }
    };
}
/**
 * Registers a viewport trigger.
 * @param trigger Element that is the trigger.
 * @param callback Callback to be invoked when the trigger comes into the viewport.
 * @param injector Injector that can be used by the trigger to resolve DI tokens.
 */
function onViewport(trigger, callback, injector) {
    const ngZone = injector.get(zone_1.NgZone);
    let entry = viewportTriggers.get(trigger);
    intersectionObserver =
        intersectionObserver ||
            ngZone.runOutsideAngular(() => {
                return new IntersectionObserver((entries) => {
                    for (const current of entries) {
                        // Only invoke the callbacks if the specific element is intersecting.
                        if (current.isIntersecting && viewportTriggers.has(current.target)) {
                            ngZone.run(viewportTriggers.get(current.target).listener);
                        }
                    }
                });
            });
    if (!entry) {
        entry = new DeferEventEntry();
        ngZone.runOutsideAngular(() => intersectionObserver.observe(trigger));
        viewportTriggers.set(trigger, entry);
        observedViewportElements++;
    }
    entry.callbacks.add(callback);
    return () => {
        // It's possible that a different cleanup callback fully removed this element already.
        if (!viewportTriggers.has(trigger)) {
            return;
        }
        entry.callbacks.delete(callback);
        if (entry.callbacks.size === 0) {
            intersectionObserver === null || intersectionObserver === void 0 ? void 0 : intersectionObserver.unobserve(trigger);
            viewportTriggers.delete(trigger);
            observedViewportElements--;
        }
        if (observedViewportElements === 0) {
            intersectionObserver === null || intersectionObserver === void 0 ? void 0 : intersectionObserver.disconnect();
            intersectionObserver = null;
        }
    };
}
/**
 * Helper function to get the LView in which a deferred block's trigger is rendered.
 * @param deferredHostLView LView in which the deferred block is defined.
 * @param deferredTNode TNode defining the deferred block.
 * @param walkUpTimes Number of times to go up in the view hierarchy to find the trigger's view.
 *   A negative value means that the trigger is inside the block's placeholder, while an undefined
 *   value means that the trigger is in the same LView as the deferred block.
 */
function getTriggerLView(deferredHostLView, deferredTNode, walkUpTimes) {
    var _a;
    // The trigger is in the same view, we don't need to traverse.
    if (walkUpTimes == null) {
        return deferredHostLView;
    }
    // A positive value or zero means that the trigger is in a parent view.
    if (walkUpTimes >= 0) {
        return (0, view_utils_1.walkUpViews)(walkUpTimes, deferredHostLView);
    }
    // If the value is negative, it means that the trigger is inside the placeholder.
    const deferredContainer = deferredHostLView[deferredTNode.index];
    ngDevMode && (0, assert_1.assertLContainer)(deferredContainer);
    const triggerLView = (_a = deferredContainer[container_1.CONTAINER_HEADER_OFFSET]) !== null && _a !== void 0 ? _a : null;
    // We need to null check, because the placeholder might not have been rendered yet.
    if (ngDevMode && triggerLView !== null) {
        const lDetails = (0, utils_1.getLDeferBlockDetails)(deferredHostLView, deferredTNode);
        const renderedState = lDetails[interfaces_1.DEFER_BLOCK_STATE];
        (0, assert_2.assertEqual)(renderedState, interfaces_1.DeferBlockState.Placeholder, 'Expected a placeholder to be rendered in this defer block.');
        (0, assert_1.assertLView)(triggerLView);
    }
    return triggerLView;
}
/**
 * Gets the element that a deferred block's trigger is pointing to.
 * @param triggerLView LView in which the trigger is defined.
 * @param triggerIndex Index at which the trigger element should've been rendered.
 */
function getTriggerElement(triggerLView, triggerIndex) {
    const element = (0, view_utils_1.getNativeByIndex)(view_1.HEADER_OFFSET + triggerIndex, triggerLView);
    ngDevMode && (0, assert_2.assertElement)(element);
    return element;
}
/**
 * Registers a DOM-node based trigger.
 * @param initialLView LView in which the defer block is rendered.
 * @param tNode TNode representing the defer block.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to go up/down in the view hierarchy to find the trigger.
 * @param registerFn Function that will register the DOM events.
 * @param callback Callback to be invoked when the trigger receives the event that should render
 *     the deferred block.
 * @param type Trigger type to distinguish between regular and prefetch triggers.
 */
function registerDomTrigger(initialLView, tNode, triggerIndex, walkUpTimes, registerFn, callback, type) {
    const injector = initialLView[view_1.INJECTOR];
    const zone = injector.get(zone_1.NgZone);
    let poll;
    function pollDomTrigger() {
        // If the initial view was destroyed, we don't need to do anything.
        if ((0, type_checks_1.isDestroyed)(initialLView)) {
            poll.destroy();
            return;
        }
        const lDetails = (0, utils_1.getLDeferBlockDetails)(initialLView, tNode);
        const renderedState = lDetails[interfaces_1.DEFER_BLOCK_STATE];
        // If the block was loaded before the trigger was resolved, we don't need to do anything.
        if (renderedState !== interfaces_1.DeferBlockInternalState.Initial &&
            renderedState !== interfaces_1.DeferBlockState.Placeholder) {
            poll.destroy();
            return;
        }
        const triggerLView = getTriggerLView(initialLView, tNode, walkUpTimes);
        // Keep polling until we resolve the trigger's LView.
        if (!triggerLView) {
            // Keep polling.
            return;
        }
        poll.destroy();
        // It's possible that the trigger's view was destroyed before we resolved the trigger element.
        if ((0, type_checks_1.isDestroyed)(triggerLView)) {
            return;
        }
        const element = getTriggerElement(triggerLView, triggerIndex);
        const cleanup = registerFn(element, () => {
            // `pollDomTrigger` runs outside the zone (because of `afterNextRender`) and registers its
            // listeners outside the zone, so we jump back into the zone prior to running the callback.
            zone.run(() => {
                if (initialLView !== triggerLView) {
                    (0, view_utils_1.removeLViewOnDestroy)(triggerLView, cleanup);
                }
                callback();
            });
        }, injector);
        // The trigger and deferred block might be in different LViews.
        // For the main LView the cleanup would happen as a part of
        // `storeTriggerCleanupFn` logic. For trigger LView we register
        // a cleanup function there to remove event handlers in case an
        // LView gets destroyed before a trigger is invoked.
        if (initialLView !== triggerLView) {
            (0, view_utils_1.storeLViewOnDestroy)(triggerLView, cleanup);
        }
        (0, cleanup_1.storeTriggerCleanupFn)(type, lDetails, cleanup);
    }
    // Begin polling for the trigger.
    poll = (0, hooks_1.afterEveryRender)({ read: pollDomTrigger }, { injector });
}
