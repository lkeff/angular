"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStashFn = setStashFn;
exports.clearStashFn = clearStashFn;
exports.wrapListener = wrapListener;
exports.listenToDomEvent = listenToDomEvent;
exports.storeListenerCleanup = storeListenerCleanup;
const signals_1 = require("@angular/core/primitives/signals");
const type_checks_1 = require("../interfaces/type_checks");
const view_1 = require("../interfaces/view");
const view_utils_1 = require("../util/view_utils");
const profiler_1 = require("../profiler");
const mark_view_dirty_1 = require("../instructions/mark_view_dirty");
const assert_1 = require("../../util/assert");
const shared_1 = require("../instructions/shared");
const application_tokens_1 = require("../../application/application_tokens");
const stashEventListeners = new Map();
function setStashFn(appId, fn) {
    stashEventListeners.set(appId, fn);
}
function clearStashFn(appId) {
    stashEventListeners.delete(appId);
}
/**
 * Wraps an event listener with a function that marks ancestors dirty and prevents default behavior,
 * if applicable.
 *
 * @param tNode The TNode associated with this listener
 * @param lView The LView that contains this listener
 * @param listenerFn The listener function to call
 * @param wrapWithPreventDefault Whether or not to prevent default behavior
 * (the procedural renderer does this already, so in those cases, we should skip)
 */
function wrapListener(tNode, lView, listenerFn) {
    // Note: we are performing most of the work in the listener function itself
    // to optimize listener registration.
    return function wrapListenerIn_markDirtyAndPreventDefault(event) {
        // In order to be backwards compatible with View Engine, events on component host nodes
        // must also mark the component view itself dirty (i.e. the view that it owns).
        const startView = (0, type_checks_1.isComponentHost)(tNode) ? (0, view_utils_1.getComponentLViewByIndex)(tNode.index, lView) : lView;
        (0, mark_view_dirty_1.markViewDirty)(startView, 5 /* NotificationSource.Listener */);
        const context = lView[view_1.CONTEXT];
        let result = executeListenerWithErrorHandling(lView, context, listenerFn, event);
        // A just-invoked listener function might have coalesced listeners so we need to check for
        // their presence and invoke as needed.
        let nextListenerFn = wrapListenerIn_markDirtyAndPreventDefault.__ngNextListenerFn__;
        while (nextListenerFn) {
            // We should prevent default if any of the listeners explicitly return false
            result = executeListenerWithErrorHandling(lView, context, nextListenerFn, event) && result;
            nextListenerFn = nextListenerFn.__ngNextListenerFn__;
        }
        return result;
    };
}
function executeListenerWithErrorHandling(lView, context, listenerFn, e) {
    const prevConsumer = (0, signals_1.setActiveConsumer)(null);
    try {
        (0, profiler_1.profiler)(6 /* ProfilerEvent.OutputStart */, context, listenerFn);
        // Only explicitly returning false from a listener should preventDefault
        return listenerFn(e) !== false;
    }
    catch (error) {
        (0, shared_1.handleUncaughtError)(lView, error);
        return false;
    }
    finally {
        (0, profiler_1.profiler)(7 /* ProfilerEvent.OutputEnd */, context, listenerFn);
        (0, signals_1.setActiveConsumer)(prevConsumer);
    }
}
/**
 * Listen to a DOM event on a specific node.
 * @param tNode TNode on which to listen.
 * @param tView TView in which the node is placed.
 * @param lView LView in which the node instance is placed.
 * @param eventTargetResolver Resolver for global event targets.
 * @param renderer Renderer to use for listening to the event.
 * @param eventName Name of the event.
 * @param originalListener Original listener as it was created by the compiler. Necessary for event
 *   coalescing.
 * @param wrappedListener Listener wrapped with additional logic like marking for check and error
 *   handling.
 * @returns Boolean indicating whether the event was bound or was coalesced into an existing
 *   listener.
 */
function listenToDomEvent(tNode, tView, lView, eventTargetResolver, renderer, eventName, originalListener, wrappedListener) {
    ngDevMode &&
        (0, assert_1.assertNotSame)(wrappedListener, originalListener, 'Expected wrapped and original listeners to be different.');
    const isTNodeDirectiveHost = (0, type_checks_1.isDirectiveHost)(tNode);
    let hasCoalesced = false;
    // In order to match current behavior, native DOM event listeners must be added for all
    // events (including outputs).
    // There might be cases where multiple directives on the same element try to register an event
    // handler function for the same event. In this situation we want to avoid registration of
    // several native listeners as each registration would be intercepted by NgZone and
    // trigger change detection. This would mean that a single user action would result in several
    // change detections being invoked. To avoid this situation we want to have only one call to
    // native handler registration (for the same element and same type of event).
    //
    // In order to have just one native event handler in presence of multiple handler functions,
    // we just register a first handler function as a native event listener and then chain
    // (coalesce) other handler functions on top of the first native handler function.
    let existingListener = null;
    // Please note that the coalescing described here doesn't happen for events specifying an
    // alternative target (ex. (document:click)) - this is to keep backward compatibility with the
    // view engine.
    // Also, we don't have to search for existing listeners if there are no directives
    // matching on a given node as we can't register multiple event handlers for the same event in
    // a template (this would mean having duplicate attributes).
    if (!eventTargetResolver && isTNodeDirectiveHost) {
        existingListener = findExistingListener(tView, lView, eventName, tNode.index);
    }
    if (existingListener !== null) {
        // Attach a new listener to coalesced listeners list, maintaining the order in which
        // listeners are registered. For performance reasons, we keep a reference to the last
        // listener in that list (in `__ngLastListenerFn__` field), so we can avoid going through
        // the entire set each time we need to add a new listener.
        const lastListenerFn = existingListener.__ngLastListenerFn__ || existingListener;
        lastListenerFn.__ngNextListenerFn__ = originalListener;
        existingListener.__ngLastListenerFn__ = originalListener;
        hasCoalesced = true;
    }
    else {
        const native = (0, view_utils_1.getNativeByTNode)(tNode, lView);
        const target = eventTargetResolver ? eventTargetResolver(native) : native;
        const appId = lView[view_1.INJECTOR].get(application_tokens_1.APP_ID);
        const stashEventListener = stashEventListeners.get(appId);
        stashEventListener === null || stashEventListener === void 0 ? void 0 : stashEventListener(target, eventName, wrappedListener);
        const cleanupFn = renderer.listen(target, eventName, wrappedListener);
        const idxOrTargetGetter = eventTargetResolver
            ? (_lView) => eventTargetResolver((0, view_utils_1.unwrapRNode)(_lView[tNode.index]))
            : tNode.index;
        storeListenerCleanup(idxOrTargetGetter, tView, lView, eventName, wrappedListener, cleanupFn, false);
    }
    return hasCoalesced;
}
/**
 * A utility function that checks if a given element has already an event handler registered for an
 * event with a specified name. The TView.cleanup data structure is used to find out which events
 * are registered for a given element.
 */
function findExistingListener(tView, lView, eventName, tNodeIndex) {
    const tCleanup = tView.cleanup;
    if (tCleanup != null) {
        for (let i = 0; i < tCleanup.length - 1; i += 2) {
            const cleanupEventName = tCleanup[i];
            if (cleanupEventName === eventName && tCleanup[i + 1] === tNodeIndex) {
                // We have found a matching event name on the same node but it might not have been
                // registered yet, so we must explicitly verify entries in the LView cleanup data
                // structures.
                const lCleanup = lView[view_1.CLEANUP];
                const listenerIdxInLCleanup = tCleanup[i + 2];
                return lCleanup && lCleanup.length > listenerIdxInLCleanup
                    ? lCleanup[listenerIdxInLCleanup]
                    : null;
            }
            // TView.cleanup can have a mix of 4-elements entries (for event handler cleanups) or
            // 2-element entries (for directive and queries destroy hooks). As such we can encounter
            // blocks of 4 or 2 items in the tView.cleanup and this is why we iterate over 2 elements
            // first and jump another 2 elements if we detect listeners cleanup (4 elements). Also check
            // documentation of TView.cleanup for more details of this data structure layout.
            if (typeof cleanupEventName === 'string') {
                i += 2;
            }
        }
    }
    return null;
}
/**
 * Stores a cleanup function for an event listener.
 * @param indexOrTargetGetter Either the index of the TNode on which the event is bound or a
 *  function that when invoked will return the event target.
 * @param tView TView in which the event is bound.
 * @param lView LView in which the event is bound.
 * @param eventName Name of the event.
 * @param listenerFn Final callback of the event.
 * @param cleanup Function to invoke during cleanup.
 * @param isOutput Whether this is an output listener or a native DOM listener.
 */
function storeListenerCleanup(indexOrTargetGetter, tView, lView, eventName, listenerFn, cleanup, isOutput) {
    const tCleanup = tView.firstCreatePass ? (0, view_utils_1.getOrCreateTViewCleanup)(tView) : null;
    const lCleanup = (0, view_utils_1.getOrCreateLViewCleanup)(lView);
    const index = lCleanup.length;
    lCleanup.push(listenerFn, cleanup);
    tCleanup &&
        tCleanup.push(eventName, indexOrTargetGetter, index, (index + 1) * (isOutput ? -1 : 1));
}
