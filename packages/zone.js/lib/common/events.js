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
exports.globalSources = exports.zoneSymbolEventNames = void 0;
exports.patchEventTarget = patchEventTarget;
exports.findEventTasks = findEventTasks;
exports.patchEventPrototype = patchEventPrototype;
const utils_1 = require("./utils");
// an identifier to tell ZoneTask do not create a new invoke closure
const OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true,
};
exports.zoneSymbolEventNames = {};
exports.globalSources = {};
const EVENT_NAME_SYMBOL_REGX = new RegExp('^' + utils_1.ZONE_SYMBOL_PREFIX + '(\\w+)(true|false)$');
const IMMEDIATE_PROPAGATION_SYMBOL = (0, utils_1.zoneSymbol)('propagationStopped');
function prepareEventNames(eventName, eventNameToString) {
    const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + utils_1.FALSE_STR;
    const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + utils_1.TRUE_STR;
    const symbol = utils_1.ZONE_SYMBOL_PREFIX + falseEventName;
    const symbolCapture = utils_1.ZONE_SYMBOL_PREFIX + trueEventName;
    exports.zoneSymbolEventNames[eventName] = {};
    exports.zoneSymbolEventNames[eventName][utils_1.FALSE_STR] = symbol;
    exports.zoneSymbolEventNames[eventName][utils_1.TRUE_STR] = symbolCapture;
}
function patchEventTarget(_global, api, apis, patchOptions) {
    const ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || utils_1.ADD_EVENT_LISTENER_STR;
    const REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || utils_1.REMOVE_EVENT_LISTENER_STR;
    const LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
    const REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
    const zoneSymbolAddEventListener = (0, utils_1.zoneSymbol)(ADD_EVENT_LISTENER);
    const ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    const PREPEND_EVENT_LISTENER = 'prependListener';
    const PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    const invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        const delegate = task.callback;
        if (typeof delegate === 'object' && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = (event) => delegate.handleEvent(event);
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        // need to try/catch error here, otherwise, the error in one event listener
        // will break the executions of the other event listeners. Also error will
        // not remove the event listener when `once` options is true.
        let error;
        try {
            task.invoke(task, target, [event]);
        }
        catch (err) {
            error = err;
        }
        const options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            const delegate = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate, options);
        }
        return error;
    };
    function globalCallback(context, event, isCapture) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        const target = context || event.target || _global;
        const tasks = target[exports.zoneSymbolEventNames[event.type][isCapture ? utils_1.TRUE_STR : utils_1.FALSE_STR]];
        if (tasks) {
            const errors = [];
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                const err = invokeTask(tasks[0], target, event);
                err && errors.push(err);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                const copyTasks = tasks.slice();
                for (let i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    const err = invokeTask(copyTasks[i], target, event);
                    err && errors.push(err);
                }
            }
            // Since there is only one error, we don't need to schedule microTask
            // to throw the error.
            if (errors.length === 1) {
                throw errors[0];
            }
            else {
                for (let i = 0; i < errors.length; i++) {
                    const err = errors[i];
                    api.nativeScheduleMicroTask(() => {
                        throw err;
                    });
                }
            }
        }
    }
    // global shared zoneAwareCallback to handle all event callback with capture = false
    const globalZoneAwareCallback = function (event) {
        return globalCallback(this, event, false);
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    const globalZoneAwareCaptureCallback = function (event) {
        return globalCallback(this, event, true);
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        let useGlobalCallback = true;
        if (patchOptions && patchOptions.useG !== undefined) {
            useGlobalCallback = patchOptions.useG;
        }
        const validateHandler = patchOptions && patchOptions.vh;
        let checkDuplicate = true;
        if (patchOptions && patchOptions.chkDup !== undefined) {
            checkDuplicate = patchOptions.chkDup;
        }
        let returnTarget = false;
        if (patchOptions && patchOptions.rt !== undefined) {
            returnTarget = patchOptions.rt;
        }
        let proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = (0, utils_1.ObjectGetPrototypeOf)(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        const eventNameToString = patchOptions && patchOptions.eventNameToString;
        // We use a shared global `taskData` to pass data for `scheduleEventTask`,
        // eliminating the need to create a new object solely for passing data.
        // WARNING: This object has a static lifetime, meaning it is not created
        // each time `addEventListener` is called. It is instantiated only once
        // and captured by reference inside the `addEventListener` and
        // `removeEventListener` functions. Do not add any new properties to this
        // object, as doing so would necessitate maintaining the information
        // between `addEventListener` calls.
        const taskData = {};
        const nativeAddEventListener = (proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER]);
        const nativeRemoveEventListener = (proto[(0, utils_1.zoneSymbol)(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER]);
        const nativeListeners = (proto[(0, utils_1.zoneSymbol)(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER]);
        const nativeRemoveAllListeners = (proto[(0, utils_1.zoneSymbol)(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER]);
        let nativePrependEventListener;
        if (patchOptions && patchOptions.prepend) {
            nativePrependEventListener = proto[(0, utils_1.zoneSymbol)(patchOptions.prepend)] =
                proto[patchOptions.prepend];
        }
        /**
         * This util function will build an option object with passive option
         * to handle all possible input from the user.
         */
        function buildEventListenerOptions(options, passive) {
            if (!passive) {
                return options;
            }
            if (typeof options === 'boolean') {
                return { capture: options, passive: true };
            }
            if (!options) {
                return { passive: true };
            }
            if (typeof options === 'object' && options.passive !== false) {
                return Object.assign(Object.assign({}, options), { passive: true });
            }
            return options;
        }
        const customScheduleGlobal = function (task) {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
        };
        /**
         * In the context of events and listeners, this function will be
         * called at the end by `cancelTask`, which, in turn, calls `task.cancelFn`.
         * Cancelling a task is primarily used to remove event listeners from
         * the task target.
         */
        const customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                const symbolEventNames = exports.zoneSymbolEventNames[task.eventName];
                let symbolEventName;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? utils_1.TRUE_STR : utils_1.FALSE_STR];
                }
                const existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (let i = 0; i < existingTasks.length; i++) {
                        const existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (task.removeAbortListener) {
                                task.removeAbortListener();
                                task.removeAbortListener = null;
                            }
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
        };
        const customScheduleNonGlobal = function (task) {
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        const customSchedulePrepend = function (task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        const customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
        };
        const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        const compareTaskCallbackVsDelegate = function (task, delegate) {
            const typeOfDelegate = typeof delegate;
            return ((typeOfDelegate === 'function' && task.callback === delegate) ||
                (typeOfDelegate === 'object' && task.originalDelegate === delegate));
        };
        const compare = (patchOptions === null || patchOptions === void 0 ? void 0 : patchOptions.diff) || compareTaskCallbackVsDelegate;
        const unpatchedEvents = Zone[(0, utils_1.zoneSymbol)('UNPATCHED_EVENTS')];
        const passiveEvents = _global[(0, utils_1.zoneSymbol)('PASSIVE_EVENTS')];
        function copyEventListenerOptions(options) {
            if (typeof options === 'object' && options !== null) {
                // We need to destructure the target `options` object since it may
                // be frozen or sealed (possibly provided implicitly by a third-party
                // library), or its properties may be readonly.
                const newOptions = Object.assign({}, options);
                // The `signal` option was recently introduced, which caused regressions in
                // third-party scenarios where `AbortController` was directly provided to
                // `addEventListener` as options. For instance, in cases like
                // `document.addEventListener('keydown', callback, abortControllerInstance)`,
                // which is valid because `AbortController` includes a `signal` getter, spreading
                // `{...options}` wouldn't copy the `signal`. Additionally, using `Object.create`
                // isn't feasible since `AbortController` is a built-in object type, and attempting
                // to create a new object directly with it as the prototype might result in
                // unexpected behavior.
                if (options.signal) {
                    newOptions.signal = options.signal;
                }
                return newOptions;
            }
            return options;
        }
        const makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget = false, prepend = false) {
            return function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                let delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                if (utils_1.isNode && eventName === 'uncaughtException') {
                    // don't patch uncaughtException of nodejs to prevent endless loop
                    return nativeListener.apply(this, arguments);
                }
                // To improve `addEventListener` performance, we will create the callback
                // for the task later when the task is invoked.
                let isEventListenerObject = false;
                if (typeof delegate !== 'function') {
                    // This checks whether the provided listener argument is an object with
                    // a `handleEvent` method (since we can call `addEventListener` with a
                    // function `event => ...` or with an object `{ handleEvent: event => ... }`).
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isEventListenerObject = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                const passive = !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
                const options = copyEventListenerOptions(buildEventListenerOptions(arguments[2], passive));
                const signal = options === null || options === void 0 ? void 0 : options.signal;
                if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
                    // the signal is an aborted one, just return without attaching the event listener.
                    return;
                }
                if (unpatchedEvents) {
                    // check unpatched list
                    for (let i = 0; i < unpatchedEvents.length; i++) {
                        if (eventName === unpatchedEvents[i]) {
                            if (passive) {
                                return nativeListener.call(target, eventName, delegate, options);
                            }
                            else {
                                return nativeListener.apply(this, arguments);
                            }
                        }
                    }
                }
                const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                const once = options && typeof options === 'object' ? options.once : false;
                const zone = Zone.current;
                let symbolEventNames = exports.zoneSymbolEventNames[eventName];
                if (!symbolEventNames) {
                    prepareEventNames(eventName, eventNameToString);
                    symbolEventNames = exports.zoneSymbolEventNames[eventName];
                }
                const symbolEventName = symbolEventNames[capture ? utils_1.TRUE_STR : utils_1.FALSE_STR];
                let existingTasks = target[symbolEventName];
                let isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (let i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                let source;
                const constructorName = target.constructor['name'];
                const targetSource = exports.globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source =
                        constructorName +
                            addSource +
                            (eventNameToString ? eventNameToString(eventName) : eventName);
                }
                // In the code below, `options` should no longer be reassigned; instead, it
                // should only be mutated. This is because we pass that object to the native
                // `addEventListener`.
                // It's generally recommended to use the same object reference for options.
                // This ensures consistency and avoids potential issues.
                taskData.options = options;
                if (once) {
                    // When using `addEventListener` with the `once` option, we don't pass
                    // the `once` option directly to the native `addEventListener` method.
                    // Instead, we keep the `once` setting and handle it ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined;
                // keep taskData into data to allow onScheduleEventTask to access the task information
                if (data) {
                    data.taskData = taskData;
                }
                if (signal) {
                    // When using `addEventListener` with the `signal` option, we don't pass
                    // the `signal` option directly to the native `addEventListener` method.
                    // Instead, we keep the `signal` setting and handle it ourselves.
                    taskData.options.signal = undefined;
                }
                // The `scheduleEventTask` function will ultimately call `customScheduleGlobal`,
                // which in turn calls the native `addEventListener`. This is why `taskData.options`
                // is updated before scheduling the task, as `customScheduleGlobal` uses
                // `taskData.options` to pass it to the native `addEventListener`.
                const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                if (signal) {
                    // after task is scheduled, we need to store the signal back to task.options
                    taskData.options.signal = signal;
                    // Wrapping `task` in a weak reference would not prevent memory leaks. Weak references are
                    // primarily used for preventing strong references cycles. `onAbort` is always reachable
                    // as it's an event listener, so its closure retains a strong reference to the `task`.
                    const onAbort = () => task.zone.cancelTask(task);
                    nativeListener.call(signal, 'abort', onAbort, { once: true });
                    // We need to remove the `abort` listener when the event listener is going to be removed,
                    // as it creates a closure that captures `task`. This closure retains a reference to the
                    // `task` object even after it goes out of scope, preventing `task` from being garbage
                    // collected.
                    task.removeAbortListener = () => signal.removeEventListener('abort', onAbort);
                }
                // should clear taskData.target to avoid memory leak
                // issue, https://github.com/angular/angular/issues/20442
                taskData.target = null;
                // need to clear up taskData because it is a global object
                if (data) {
                    data.taskData = null;
                }
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    taskData.options.once = true;
                }
                if (typeof task.options !== 'boolean') {
                    // We should save the options on the task (if it's an object) because
                    // we'll be using `task.options` later when removing the event listener
                    // and passing it back to `removeEventListener`.
                    task.options = options;
                }
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isEventListenerObject) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            const target = this || _global;
            let eventName = arguments[0];
            if (patchOptions && patchOptions.transferEventName) {
                eventName = patchOptions.transferEventName(eventName);
            }
            const options = arguments[2];
            const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
            const delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            const symbolEventNames = exports.zoneSymbolEventNames[eventName];
            let symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? utils_1.TRUE_STR : utils_1.FALSE_STR];
            }
            const existingTasks = symbolEventName && target[symbolEventName];
            // `existingTasks` may not exist if the `addEventListener` was called before
            // it was patched by zone.js. Please refer to the attached issue for
            // clarification, particularly after the `if` condition, before calling
            // the native `removeEventListener`.
            if (existingTasks) {
                for (let i = 0; i < existingTasks.length; i++) {
                    const existingTask = existingTasks[i];
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                            // in the target, we have an event listener which is added by on_property
                            // such as target.onclick = function() {}, so we need to clear this internal
                            // property too if all delegates with capture=false were removed
                            // https:// github.com/angular/angular/issues/31643
                            // https://github.com/angular/angular/issues/54581
                            if (!capture && typeof eventName === 'string') {
                                const onPropertySymbol = utils_1.ZONE_SYMBOL_PREFIX + 'ON_PROPERTY' + eventName;
                                target[onPropertySymbol] = null;
                            }
                        }
                        // In all other conditions, when `addEventListener` is called after being
                        // patched by zone.js, we would always find an event task on the `EventTarget`.
                        // This will trigger `cancelFn` on the `existingTask`, leading to `customCancelGlobal`,
                        // which ultimately removes an event listener and cleans up the abort listener
                        // (if an `AbortSignal` was provided when scheduling a task).
                        existingTask.zone.cancelTask(existingTask);
                        if (returnTarget) {
                            return target;
                        }
                        return;
                    }
                }
            }
            // https://github.com/angular/zone.js/issues/930
            // We may encounter a situation where the `addEventListener` was
            // called on the event target before zone.js is loaded, resulting
            // in no task being stored on the event target due to its invocation
            // of the native implementation. In this scenario, we simply need to
            // invoke the native `removeEventListener`.
            return nativeRemoveEventListener.apply(this, arguments);
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            const target = this || _global;
            let eventName = arguments[0];
            if (patchOptions && patchOptions.transferEventName) {
                eventName = patchOptions.transferEventName(eventName);
            }
            const listeners = [];
            const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            const target = this || _global;
            let eventName = arguments[0];
            if (!eventName) {
                const keys = Object.keys(target);
                for (let i = 0; i < keys.length; i++) {
                    const prop = keys[i];
                    const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    let evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
            }
            else {
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                const symbolEventNames = exports.zoneSymbolEventNames[eventName];
                if (symbolEventNames) {
                    const symbolEventName = symbolEventNames[utils_1.FALSE_STR];
                    const symbolCaptureEventName = symbolEventNames[utils_1.TRUE_STR];
                    const tasks = target[symbolEventName];
                    const captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        const removeTasks = tasks.slice();
                        for (let i = 0; i < removeTasks.length; i++) {
                            const task = removeTasks[i];
                            let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                    if (captureTasks) {
                        const removeTasks = captureTasks.slice();
                        for (let i = 0; i < removeTasks.length; i++) {
                            const task = removeTasks[i];
                            let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                }
            }
            if (returnTarget) {
                return this;
            }
        };
        // for native toString patch
        (0, utils_1.attachOriginToPatched)(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        (0, utils_1.attachOriginToPatched)(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            (0, utils_1.attachOriginToPatched)(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            (0, utils_1.attachOriginToPatched)(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    let results = [];
    for (let i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
function findEventTasks(target, eventName) {
    if (!eventName) {
        const foundTasks = [];
        for (let prop in target) {
            const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
            let evtName = match && match[1];
            if (evtName && (!eventName || evtName === eventName)) {
                const tasks = target[prop];
                if (tasks) {
                    for (let i = 0; i < tasks.length; i++) {
                        foundTasks.push(tasks[i]);
                    }
                }
            }
        }
        return foundTasks;
    }
    let symbolEventName = exports.zoneSymbolEventNames[eventName];
    if (!symbolEventName) {
        prepareEventNames(eventName);
        symbolEventName = exports.zoneSymbolEventNames[eventName];
    }
    const captureFalseTasks = target[symbolEventName[utils_1.FALSE_STR]];
    const captureTrueTasks = target[symbolEventName[utils_1.TRUE_STR]];
    if (!captureFalseTasks) {
        return captureTrueTasks ? captureTrueTasks.slice() : [];
    }
    else {
        return captureTrueTasks
            ? captureFalseTasks.concat(captureTrueTasks)
            : captureFalseTasks.slice();
    }
}
function patchEventPrototype(global, api) {
    const Event = global['Event'];
    if (Event && Event.prototype) {
        api.patchMethod(Event.prototype, 'stopImmediatePropagation', (delegate) => function (self, args) {
            self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
            // we need to call the native stopImmediatePropagation
            // in case in some hybrid application, some part of
            // application will be controlled by zone, some are not
            delegate && delegate.apply(self, args);
        });
    }
}
