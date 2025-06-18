"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.withEventReplay = withEventReplay;
exports.collectDomEventsInfo = collectDomEventsInfo;
exports.invokeRegisteredReplayListeners = invokeRegisteredReplayListeners;
const event_dispatch_1 = require("../../primitives/event-dispatch");
const application_ref_1 = require("../application/application_ref");
const di_1 = require("../di");
const injector_compatibility_1 = require("../di/injector_compatibility");
const view_1 = require("../render3/interfaces/view");
const view_utils_1 = require("../render3/util/view_utils");
const tokens_1 = require("./tokens");
const event_delegation_utils_1 = require("../event_delegation_utils");
const application_tokens_1 = require("../application/application_tokens");
const performance_1 = require("../util/performance");
const triggering_1 = require("../defer/triggering");
const utils_1 = require("./utils");
const listeners_1 = require("../render3/view/listeners");
/** Apps in which we've enabled event replay.
 *  This is to prevent initializing event replay more than once per app.
 */
const appsWithEventReplay = new WeakSet();
/**
 * The key that represents all replayable elements that are not in defer blocks.
 */
const EAGER_CONTENT_LISTENERS_KEY = '';
/**
 * A list of block events that need to be replayed
 */
let blockEventQueue = [];
/**
 * Determines whether Event Replay feature should be activated on the client.
 */
function shouldEnableEventReplay(injector) {
    return injector.get(tokens_1.IS_EVENT_REPLAY_ENABLED, tokens_1.EVENT_REPLAY_ENABLED_DEFAULT);
}
/**
 * Returns a set of providers required to setup support for event replay.
 * Requires hydration to be enabled separately.
 */
function withEventReplay() {
    const providers = [
        {
            provide: tokens_1.IS_EVENT_REPLAY_ENABLED,
            useFactory: () => {
                var _a;
                let isEnabled = true;
                if (typeof ngServerMode === 'undefined' || !ngServerMode) {
                    // Note: globalThis[CONTRACT_PROPERTY] may be undefined in case Event Replay feature
                    // is enabled, but there are no events configured in this application, in which case
                    // we don't activate this feature, since there are no events to replay.
                    const appId = (0, injector_compatibility_1.inject)(application_tokens_1.APP_ID);
                    isEnabled = !!((_a = window._ejsas) === null || _a === void 0 ? void 0 : _a[appId]);
                }
                if (isEnabled) {
                    (0, performance_1.performanceMarkFeature)('NgEventReplay');
                }
                return isEnabled;
            },
        },
    ];
    if (typeof ngServerMode === 'undefined' || !ngServerMode) {
        providers.push({
            provide: di_1.ENVIRONMENT_INITIALIZER,
            useValue: () => {
                const appRef = (0, injector_compatibility_1.inject)(application_ref_1.ApplicationRef);
                const { injector } = appRef;
                // We have to check for the appRef here due to the possibility of multiple apps
                // being present on the same page. We only want to enable event replay for the
                // apps that actually want it.
                if (!appsWithEventReplay.has(appRef)) {
                    const jsActionMap = (0, injector_compatibility_1.inject)(tokens_1.JSACTION_BLOCK_ELEMENT_MAP);
                    if (shouldEnableEventReplay(injector)) {
                        const appId = injector.get(application_tokens_1.APP_ID);
                        (0, listeners_1.setStashFn)(appId, (rEl, eventName, listenerFn) => {
                            // If a user binds to a ng-container and uses a directive that binds using a host listener,
                            // this element could be a comment node. So we need to ensure we have an actual element
                            // node before stashing anything.
                            if (rEl.nodeType !== Node.ELEMENT_NODE)
                                return;
                            (0, event_delegation_utils_1.sharedStashFunction)(rEl, eventName, listenerFn);
                            (0, event_delegation_utils_1.sharedMapFunction)(rEl, jsActionMap);
                        });
                    }
                }
            },
            multi: true,
        }, {
            provide: application_ref_1.APP_BOOTSTRAP_LISTENER,
            useFactory: () => {
                const appRef = (0, injector_compatibility_1.inject)(application_ref_1.ApplicationRef);
                const { injector } = appRef;
                return () => {
                    // We have to check for the appRef here due to the possibility of multiple apps
                    // being present on the same page. We only want to enable event replay for the
                    // apps that actually want it.
                    if (!shouldEnableEventReplay(injector) || appsWithEventReplay.has(appRef)) {
                        return;
                    }
                    appsWithEventReplay.add(appRef);
                    appRef.onDestroy(() => {
                        appsWithEventReplay.delete(appRef);
                        // Ensure that we're always safe calling this in the browser.
                        if (typeof ngServerMode !== 'undefined' && !ngServerMode) {
                            const appId = injector.get(application_tokens_1.APP_ID);
                            // `_ejsa` should be deleted when the app is destroyed, ensuring that
                            // no elements are still captured in the global list and are not prevented
                            // from being garbage collected.
                            (0, event_dispatch_1.clearAppScopedEarlyEventContract)(appId);
                            // Clean up the reference to the function set by the environment initializer,
                            // as the function closure may capture injected elements and prevent them
                            // from being properly garbage collected.
                            (0, listeners_1.clearStashFn)(appId);
                        }
                    });
                    // Kick off event replay logic once hydration for the initial part
                    // of the application is completed. This timing is similar to the unclaimed
                    // dehydrated views cleanup timing.
                    appRef.whenStable().then(() => {
                        var _a;
                        // Note: we have to check whether the application is destroyed before
                        // performing other operations with the `injector`.
                        // The application may be destroyed **before** it becomes stable, so when
                        // the `whenStable` resolves, the injector might already be in
                        // a destroyed state. Thus, calling `injector.get` would throw an error
                        // indicating that the injector has already been destroyed.
                        if (appRef.destroyed) {
                            return;
                        }
                        const eventContractDetails = injector.get(event_delegation_utils_1.JSACTION_EVENT_CONTRACT);
                        initEventReplay(eventContractDetails, injector);
                        const jsActionMap = injector.get(tokens_1.JSACTION_BLOCK_ELEMENT_MAP);
                        (_a = jsActionMap.get(EAGER_CONTENT_LISTENERS_KEY)) === null || _a === void 0 ? void 0 : _a.forEach(event_delegation_utils_1.removeListeners);
                        jsActionMap.delete(EAGER_CONTENT_LISTENERS_KEY);
                        const eventContract = eventContractDetails.instance;
                        // This removes event listeners registered through the container manager,
                        // as listeners registered on `document.body` might never be removed if we
                        // don't clean up the contract.
                        if ((0, utils_1.isIncrementalHydrationEnabled)(injector)) {
                            // When incremental hydration is enabled, we cannot clean up the event
                            // contract immediately because we're unaware if there are any deferred
                            // blocks to hydrate. We can only schedule a contract cleanup when the
                            // app is destroyed.
                            appRef.onDestroy(() => eventContract.cleanUp());
                        }
                        else {
                            eventContract.cleanUp();
                        }
                    });
                };
            },
            multi: true,
        });
    }
    return providers;
}
const initEventReplay = (eventDelegation, injector) => {
    const appId = injector.get(application_tokens_1.APP_ID);
    // This is set in packages/platform-server/src/utils.ts
    const earlyJsactionData = window._ejsas[appId];
    const eventContract = (eventDelegation.instance = new event_dispatch_1.EventContract(new event_dispatch_1.EventContractContainer(earlyJsactionData.c)));
    for (const et of earlyJsactionData.et) {
        eventContract.addEvent(et);
    }
    for (const et of earlyJsactionData.etc) {
        eventContract.addEvent(et);
    }
    const eventInfos = (0, event_dispatch_1.getAppScopedQueuedEventInfos)(appId);
    eventContract.replayEarlyEventInfos(eventInfos);
    (0, event_dispatch_1.clearAppScopedEarlyEventContract)(appId);
    const dispatcher = new event_dispatch_1.EventDispatcher((event) => {
        invokeRegisteredReplayListeners(injector, event, event.currentTarget);
    });
    (0, event_dispatch_1.registerDispatcher)(eventContract, dispatcher);
};
/**
 * Extracts information about all DOM events (added in a template) registered on elements in a give
 * LView. Maps collected events to a corresponding DOM element (an element is used as a key).
 */
function collectDomEventsInfo(tView, lView, eventTypesToReplay) {
    const domEventsInfo = new Map();
    const lCleanup = lView[view_1.CLEANUP];
    const tCleanup = tView.cleanup;
    if (!tCleanup || !lCleanup) {
        return domEventsInfo;
    }
    for (let i = 0; i < tCleanup.length;) {
        const firstParam = tCleanup[i++];
        const secondParam = tCleanup[i++];
        if (typeof firstParam !== 'string') {
            continue;
        }
        const eventType = firstParam;
        if (!(0, event_dispatch_1.isEarlyEventType)(eventType)) {
            continue;
        }
        if ((0, event_dispatch_1.isCaptureEventType)(eventType)) {
            eventTypesToReplay.capture.add(eventType);
        }
        else {
            eventTypesToReplay.regular.add(eventType);
        }
        const listenerElement = (0, view_utils_1.unwrapRNode)(lView[secondParam]);
        i++; // move the cursor to the next position (location of the listener idx)
        const useCaptureOrIndx = tCleanup[i++];
        // if useCaptureOrIndx is boolean then report it as is.
        // if useCaptureOrIndx is positive number then it in unsubscribe method
        // if useCaptureOrIndx is negative number then it is a Subscription
        const isDomEvent = typeof useCaptureOrIndx === 'boolean' || useCaptureOrIndx >= 0;
        if (!isDomEvent) {
            continue;
        }
        if (!domEventsInfo.has(listenerElement)) {
            domEventsInfo.set(listenerElement, [eventType]);
        }
        else {
            domEventsInfo.get(listenerElement).push(eventType);
        }
    }
    return domEventsInfo;
}
function invokeRegisteredReplayListeners(injector, event, currentTarget) {
    var _a;
    const blockName = (_a = (currentTarget && currentTarget.getAttribute(event_delegation_utils_1.DEFER_BLOCK_SSR_ID_ATTRIBUTE))) !== null && _a !== void 0 ? _a : '';
    if (/d\d+/.test(blockName)) {
        hydrateAndInvokeBlockListeners(blockName, injector, event, currentTarget);
    }
    else if (event.eventPhase === event_dispatch_1.EventPhase.REPLAY) {
        (0, event_delegation_utils_1.invokeListeners)(event, currentTarget);
    }
}
function hydrateAndInvokeBlockListeners(blockName, injector, event, currentTarget) {
    blockEventQueue.push({ event, currentTarget });
    (0, triggering_1.triggerHydrationFromBlockName)(injector, blockName, replayQueuedBlockEvents);
}
function replayQueuedBlockEvents(hydratedBlocks) {
    // clone the queue
    const queue = [...blockEventQueue];
    const hydrated = new Set(hydratedBlocks);
    // empty it
    blockEventQueue = [];
    for (let { event, currentTarget } of queue) {
        const blockName = currentTarget.getAttribute(event_delegation_utils_1.DEFER_BLOCK_SSR_ID_ATTRIBUTE);
        if (hydrated.has(blockName)) {
            (0, event_delegation_utils_1.invokeListeners)(event, currentTarget);
        }
        else {
            // requeue events that weren't yet hydrated
            blockEventQueue.push({ event, currentTarget });
        }
    }
}
