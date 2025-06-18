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
exports.taskSymbol = void 0;
exports.patchTimer = patchTimer;
const utils_1 = require("./utils");
exports.taskSymbol = (0, utils_1.zoneSymbol)('zoneTask');
function patchTimer(window, setName, cancelName, nameSuffix) {
    let setNative = null;
    let clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    const tasksByHandleId = {};
    function scheduleTask(task) {
        const data = task.data;
        data.args[0] = function () {
            return task.invoke.apply(this, arguments);
        };
        const handleOrId = setNative.apply(window, data.args);
        // Whlist on Node.js when get can the ID by using `[Symbol.toPrimitive]()` we do
        // to this so that we do not cause potentally leaks when using `setTimeout`
        // since this can be periodic when using `.refresh`.
        if ((0, utils_1.isNumber)(handleOrId)) {
            data.handleId = handleOrId;
        }
        else {
            data.handle = handleOrId;
            // On Node.js a timeout and interval can be restarted over and over again by using the `.refresh` method.
            data.isRefreshable = (0, utils_1.isFunction)(handleOrId.refresh);
        }
        return task;
    }
    function clearTask(task) {
        const { handle, handleId } = task.data;
        return clearNative.call(window, handle !== null && handle !== void 0 ? handle : handleId);
    }
    setNative = (0, utils_1.patchMethod)(window, setName, (delegate) => function (self, args) {
        var _a;
        if ((0, utils_1.isFunction)(args[0])) {
            const options = {
                isRefreshable: false,
                isPeriodic: nameSuffix === 'Interval',
                delay: nameSuffix === 'Timeout' || nameSuffix === 'Interval' ? args[1] || 0 : undefined,
                args: args,
            };
            const callback = args[0];
            args[0] = function timer() {
                try {
                    return callback.apply(this, arguments);
                }
                finally {
                    // issue-934, task will be cancelled
                    // even it is a periodic task such as
                    // setInterval
                    // https://github.com/angular/angular/issues/40387
                    // Cleanup tasksByHandleId should be handled before scheduleTask
                    // Since some zoneSpec may intercept and doesn't trigger
                    // scheduleFn(scheduleTask) provided here.
                    const { handle, handleId, isPeriodic, isRefreshable } = options;
                    if (!isPeriodic && !isRefreshable) {
                        if (handleId) {
                            // in non-nodejs env, we remove timerId
                            // from local cache
                            delete tasksByHandleId[handleId];
                        }
                        else if (handle) {
                            // Node returns complex objects as handleIds
                            // we remove task reference from timer object
                            handle[exports.taskSymbol] = null;
                        }
                    }
                }
            };
            const task = (0, utils_1.scheduleMacroTaskWithCurrentZone)(setName, args[0], options, scheduleTask, clearTask);
            if (!task) {
                return task;
            }
            // Node.js must additionally support the ref and unref functions.
            const { handleId, handle, isRefreshable, isPeriodic } = task.data;
            if (handleId) {
                // for non nodejs env, we save handleId: task
                // mapping in local cache for clearTimeout
                tasksByHandleId[handleId] = task;
            }
            else if (handle) {
                // for nodejs env, we save task
                // reference in timerId Object for clearTimeout
                handle[exports.taskSymbol] = task;
                if (isRefreshable && !isPeriodic) {
                    const originalRefresh = handle.refresh;
                    handle.refresh = function () {
                        const { zone, state } = task;
                        if (state === 'notScheduled') {
                            task._state = 'scheduled';
                            zone._updateTaskCount(task, 1);
                        }
                        else if (state === 'running') {
                            task._state = 'scheduling';
                        }
                        return originalRefresh.call(this);
                    };
                }
            }
            return (_a = handle !== null && handle !== void 0 ? handle : handleId) !== null && _a !== void 0 ? _a : task;
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(window, args);
        }
    });
    clearNative = (0, utils_1.patchMethod)(window, cancelName, (delegate) => function (self, args) {
        const id = args[0];
        let task;
        if ((0, utils_1.isNumber)(id)) {
            // non nodejs env.
            task = tasksByHandleId[id];
            delete tasksByHandleId[id];
        }
        else {
            // nodejs env ?? other environments.
            task = id === null || id === void 0 ? void 0 : id[exports.taskSymbol];
            if (task) {
                id[exports.taskSymbol] = null;
            }
            else {
                task = id;
            }
        }
        if (task === null || task === void 0 ? void 0 : task.type) {
            if (task.cancelFn) {
                // Do not cancel already canceled functions
                task.zone.cancelTask(task);
            }
        }
        else {
            // cause an error by calling it directly.
            delegate.apply(window, args);
        }
    });
}
