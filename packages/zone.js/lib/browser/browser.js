"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchBrowser = patchBrowser;
const events_1 = require("../common/events");
const queue_microtask_1 = require("../common/queue-microtask");
const timers_1 = require("../common/timers");
const utils_1 = require("../common/utils");
const custom_elements_1 = require("./custom-elements");
const event_target_1 = require("./event-target");
const property_descriptor_1 = require("./property-descriptor");
function patchBrowser(Zone) {
    Zone.__load_patch('legacy', (global) => {
        const legacyPatch = global[Zone.__symbol__('legacyPatch')];
        if (legacyPatch) {
            legacyPatch();
        }
    });
    Zone.__load_patch('timers', (global) => {
        const set = 'set';
        const clear = 'clear';
        (0, timers_1.patchTimer)(global, set, clear, 'Timeout');
        (0, timers_1.patchTimer)(global, set, clear, 'Interval');
        (0, timers_1.patchTimer)(global, set, clear, 'Immediate');
    });
    Zone.__load_patch('requestAnimationFrame', (global) => {
        (0, timers_1.patchTimer)(global, 'request', 'cancel', 'AnimationFrame');
        (0, timers_1.patchTimer)(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
        (0, timers_1.patchTimer)(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
    });
    Zone.__load_patch('blocking', (global, Zone) => {
        const blockingMethods = ['alert', 'prompt', 'confirm'];
        for (let i = 0; i < blockingMethods.length; i++) {
            const name = blockingMethods[i];
            (0, utils_1.patchMethod)(global, name, (delegate, symbol, name) => {
                return function (s, args) {
                    return Zone.current.run(delegate, global, args, name);
                };
            });
        }
    });
    Zone.__load_patch('EventTarget', (global, Zone, api) => {
        (0, event_target_1.patchEvent)(global, api);
        (0, event_target_1.eventTargetPatch)(global, api);
        // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
        const XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
            api.patchEventTarget(global, api, [XMLHttpRequestEventTarget.prototype]);
        }
    });
    Zone.__load_patch('MutationObserver', (global, Zone, api) => {
        (0, utils_1.patchClass)('MutationObserver');
        (0, utils_1.patchClass)('WebKitMutationObserver');
    });
    Zone.__load_patch('IntersectionObserver', (global, Zone, api) => {
        (0, utils_1.patchClass)('IntersectionObserver');
    });
    Zone.__load_patch('FileReader', (global, Zone, api) => {
        (0, utils_1.patchClass)('FileReader');
    });
    Zone.__load_patch('on_property', (global, Zone, api) => {
        (0, property_descriptor_1.propertyDescriptorPatch)(api, global);
    });
    Zone.__load_patch('customElements', (global, Zone, api) => {
        (0, custom_elements_1.patchCustomElements)(global, api);
    });
    Zone.__load_patch('XHR', (global, Zone) => {
        // Treat XMLHttpRequest as a macrotask.
        patchXHR(global);
        const XHR_TASK = (0, utils_1.zoneSymbol)('xhrTask');
        const XHR_SYNC = (0, utils_1.zoneSymbol)('xhrSync');
        const XHR_LISTENER = (0, utils_1.zoneSymbol)('xhrListener');
        const XHR_SCHEDULED = (0, utils_1.zoneSymbol)('xhrScheduled');
        const XHR_URL = (0, utils_1.zoneSymbol)('xhrURL');
        const XHR_ERROR_BEFORE_SCHEDULED = (0, utils_1.zoneSymbol)('xhrErrorBeforeScheduled');
        function patchXHR(window) {
            const XMLHttpRequest = window['XMLHttpRequest'];
            if (!XMLHttpRequest) {
                // XMLHttpRequest is not available in service worker
                return;
            }
            const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
            function findPendingTask(target) {
                return target[XHR_TASK];
            }
            let oriAddListener = XMLHttpRequestPrototype[utils_1.ZONE_SYMBOL_ADD_EVENT_LISTENER];
            let oriRemoveListener = XMLHttpRequestPrototype[utils_1.ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            if (!oriAddListener) {
                const XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
                if (XMLHttpRequestEventTarget) {
                    const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                    oriAddListener = XMLHttpRequestEventTargetPrototype[utils_1.ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = XMLHttpRequestEventTargetPrototype[utils_1.ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
            }
            const READY_STATE_CHANGE = 'readystatechange';
            const SCHEDULED = 'scheduled';
            function scheduleTask(task) {
                const data = task.data;
                const target = data.target;
                target[XHR_SCHEDULED] = false;
                target[XHR_ERROR_BEFORE_SCHEDULED] = false;
                // remove existing event listener
                const listener = target[XHR_LISTENER];
                if (!oriAddListener) {
                    oriAddListener = target[utils_1.ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = target[utils_1.ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
                if (listener) {
                    oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
                }
                const newListener = (target[XHR_LISTENER] = () => {
                    if (target.readyState === target.DONE) {
                        // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                        // readyState=4 multiple times, so we need to check task state here
                        if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                            // check whether the xhr has registered onload listener
                            // if that is the case, the task should invoke after all
                            // onload listeners finish.
                            // Also if the request failed without response (status = 0), the load event handler
                            // will not be triggered, in that case, we should also invoke the placeholder callback
                            // to close the XMLHttpRequest::send macroTask.
                            // https://github.com/angular/angular/issues/38795
                            const loadTasks = target[Zone.__symbol__('loadfalse')];
                            if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
                                const oriInvoke = task.invoke;
                                task.invoke = function () {
                                    // need to load the tasks again, because in other
                                    // load listener, they may remove themselves
                                    const loadTasks = target[Zone.__symbol__('loadfalse')];
                                    for (let i = 0; i < loadTasks.length; i++) {
                                        if (loadTasks[i] === task) {
                                            loadTasks.splice(i, 1);
                                        }
                                    }
                                    if (!data.aborted && task.state === SCHEDULED) {
                                        oriInvoke.call(task);
                                    }
                                };
                                loadTasks.push(task);
                            }
                            else {
                                task.invoke();
                            }
                        }
                        else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                            // error occurs when xhr.send()
                            target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                        }
                    }
                });
                oriAddListener.call(target, READY_STATE_CHANGE, newListener);
                const storedTask = target[XHR_TASK];
                if (!storedTask) {
                    target[XHR_TASK] = task;
                }
                sendNative.apply(target, data.args);
                target[XHR_SCHEDULED] = true;
                return task;
            }
            function placeholderCallback() { }
            function clearTask(task) {
                const data = task.data;
                // Note - ideally, we would call data.target.removeEventListener here, but it's too late
                // to prevent it from firing. So instead, we store info for the event listener.
                data.aborted = true;
                return abortNative.apply(data.target, data.args);
            }
            const openNative = (0, utils_1.patchMethod)(XMLHttpRequestPrototype, 'open', () => function (self, args) {
                self[XHR_SYNC] = args[2] == false;
                self[XHR_URL] = args[1];
                return openNative.apply(self, args);
            });
            const XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
            const fetchTaskAborting = (0, utils_1.zoneSymbol)('fetchTaskAborting');
            const fetchTaskScheduling = (0, utils_1.zoneSymbol)('fetchTaskScheduling');
            const sendNative = (0, utils_1.patchMethod)(XMLHttpRequestPrototype, 'send', () => function (self, args) {
                if (Zone.current[fetchTaskScheduling] === true) {
                    // a fetch is scheduling, so we are using xhr to polyfill fetch
                    // and because we already schedule macroTask for fetch, we should
                    // not schedule a macroTask for xhr again
                    return sendNative.apply(self, args);
                }
                if (self[XHR_SYNC]) {
                    // if the XHR is sync there is no task to schedule, just execute the code.
                    return sendNative.apply(self, args);
                }
                else {
                    const options = {
                        target: self,
                        url: self[XHR_URL],
                        isPeriodic: false,
                        args: args,
                        aborted: false,
                    };
                    const task = (0, utils_1.scheduleMacroTaskWithCurrentZone)(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                    if (self &&
                        self[XHR_ERROR_BEFORE_SCHEDULED] === true &&
                        !options.aborted &&
                        task.state === SCHEDULED) {
                        // xhr request throw error when send
                        // we should invoke task instead of leaving a scheduled
                        // pending macroTask
                        task.invoke();
                    }
                }
            });
            const abortNative = (0, utils_1.patchMethod)(XMLHttpRequestPrototype, 'abort', () => function (self, args) {
                const task = findPendingTask(self);
                if (task && typeof task.type == 'string') {
                    // If the XHR has already completed, do nothing.
                    // If the XHR has already been aborted, do nothing.
                    // Fix #569, call abort multiple times before done will cause
                    // macroTask task count be negative number
                    if (task.cancelFn == null || (task.data && task.data.aborted)) {
                        return;
                    }
                    task.zone.cancelTask(task);
                }
                else if (Zone.current[fetchTaskAborting] === true) {
                    // the abort is called from fetch polyfill, we need to call native abort of XHR.
                    return abortNative.apply(self, args);
                }
                // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
                // task
                // to cancel. Do nothing.
            });
        }
    });
    Zone.__load_patch('geolocation', (global) => {
        /// GEO_LOCATION
        if (global['navigator'] && global['navigator'].geolocation) {
            (0, utils_1.patchPrototype)(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
        }
    });
    Zone.__load_patch('PromiseRejectionEvent', (global, Zone) => {
        // handle unhandled promise rejection
        function findPromiseRejectionHandler(evtName) {
            return function (e) {
                const eventTasks = (0, events_1.findEventTasks)(global, evtName);
                eventTasks.forEach((eventTask) => {
                    // windows has added unhandledrejection event listener
                    // trigger the event listener
                    const PromiseRejectionEvent = global['PromiseRejectionEvent'];
                    if (PromiseRejectionEvent) {
                        const evt = new PromiseRejectionEvent(evtName, {
                            promise: e.promise,
                            reason: e.rejection,
                        });
                        eventTask.invoke(evt);
                    }
                });
            };
        }
        if (global['PromiseRejectionEvent']) {
            Zone[(0, utils_1.zoneSymbol)('unhandledPromiseRejectionHandler')] =
                findPromiseRejectionHandler('unhandledrejection');
            Zone[(0, utils_1.zoneSymbol)('rejectionHandledHandler')] =
                findPromiseRejectionHandler('rejectionhandled');
        }
    });
    Zone.__load_patch('queueMicrotask', (global, Zone, api) => {
        (0, queue_microtask_1.patchQueueMicrotask)(global, api);
    });
}
