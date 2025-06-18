"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchNode = patchNode;
const events_1 = require("../common/events");
const queue_microtask_1 = require("../common/queue-microtask");
const timers_1 = require("../common/timers");
const utils_1 = require("../common/utils");
const events_2 = require("./events");
const fs_1 = require("./fs");
const node_util_1 = require("./node_util");
const set = 'set';
const clear = 'clear';
function patchNode(Zone) {
    (0, node_util_1.patchNodeUtil)(Zone);
    (0, events_2.patchEvents)(Zone);
    (0, fs_1.patchFs)(Zone);
    Zone.__load_patch('node_timers', (global, Zone) => {
        // Timers
        let globalUseTimeoutFromTimer = false;
        try {
            const timers = require('timers');
            let globalEqualTimersTimeout = global.setTimeout === timers.setTimeout;
            if (!globalEqualTimersTimeout && !utils_1.isMix) {
                // 1. if isMix, then we are in mix environment such as Electron
                // we should only patch timers.setTimeout because global.setTimeout
                // have been patched
                // 2. if global.setTimeout not equal timers.setTimeout, check
                // whether global.setTimeout use timers.setTimeout or not
                const originSetTimeout = timers.setTimeout;
                timers.setTimeout = function () {
                    globalUseTimeoutFromTimer = true;
                    return originSetTimeout.apply(this, arguments);
                };
                const detectTimeout = global.setTimeout(() => { }, 100);
                clearTimeout(detectTimeout);
                timers.setTimeout = originSetTimeout;
            }
            (0, timers_1.patchTimer)(timers, set, clear, 'Timeout');
            (0, timers_1.patchTimer)(timers, set, clear, 'Interval');
            (0, timers_1.patchTimer)(timers, set, clear, 'Immediate');
        }
        catch (error) {
            // timers module not exists, for example, when we using nativeScript
            // timers is not available
        }
        if (utils_1.isMix) {
            // if we are in mix environment, such as Electron,
            // the global.setTimeout has already been patched,
            // so we just patch timers.setTimeout
            return;
        }
        if (!globalUseTimeoutFromTimer) {
            // 1. global setTimeout equals timers setTimeout
            // 2. or global don't use timers setTimeout(maybe some other library patch setTimeout)
            // 3. or load timers module error happens, we should patch global setTimeout
            (0, timers_1.patchTimer)(global, set, clear, 'Timeout');
            (0, timers_1.patchTimer)(global, set, clear, 'Interval');
            (0, timers_1.patchTimer)(global, set, clear, 'Immediate');
        }
        else {
            // global use timers setTimeout, but not equals
            // this happens when use nodejs v0.10.x, global setTimeout will
            // use a lazy load version of timers setTimeout
            // we should not double patch timer's setTimeout
            // so we only store the __symbol__ for consistency
            global[Zone.__symbol__('setTimeout')] = global.setTimeout;
            global[Zone.__symbol__('setInterval')] = global.setInterval;
            global[Zone.__symbol__('setImmediate')] = global.setImmediate;
        }
    });
    // patch process related methods
    Zone.__load_patch('nextTick', () => {
        // patch nextTick as microTask
        (0, utils_1.patchMicroTask)(process, 'nextTick', (self, args) => {
            return {
                name: 'process.nextTick',
                args: args,
                cbIdx: args.length > 0 && typeof args[0] === 'function' ? 0 : -1,
                target: process,
            };
        });
    });
    Zone.__load_patch('handleUnhandledPromiseRejection', (global, Zone, api) => {
        Zone[api.symbol('unhandledPromiseRejectionHandler')] =
            findProcessPromiseRejectionHandler('unhandledRejection');
        Zone[api.symbol('rejectionHandledHandler')] =
            findProcessPromiseRejectionHandler('rejectionHandled');
        // handle unhandled promise rejection
        function findProcessPromiseRejectionHandler(evtName) {
            return function (e) {
                const eventTasks = (0, events_1.findEventTasks)(process, evtName);
                eventTasks.forEach((eventTask) => {
                    // process has added unhandledrejection event listener
                    // trigger the event listener
                    if (evtName === 'unhandledRejection') {
                        eventTask.invoke(e.rejection, e.promise);
                    }
                    else if (evtName === 'rejectionHandled') {
                        eventTask.invoke(e.promise);
                    }
                });
            };
        }
    });
    // Crypto
    Zone.__load_patch('crypto', () => {
        let crypto;
        try {
            crypto = require('crypto');
        }
        catch (err) { }
        // use the generic patchMacroTask to patch crypto
        if (crypto) {
            const methodNames = ['randomBytes', 'pbkdf2'];
            methodNames.forEach((name) => {
                (0, utils_1.patchMacroTask)(crypto, name, (self, args) => {
                    return {
                        name: 'crypto.' + name,
                        args: args,
                        cbIdx: args.length > 0 && typeof args[args.length - 1] === 'function' ? args.length - 1 : -1,
                        target: crypto,
                    };
                });
            });
        }
    });
    Zone.__load_patch('console', (global, Zone) => {
        const consoleMethods = [
            'dir',
            'log',
            'info',
            'error',
            'warn',
            'assert',
            'debug',
            'timeEnd',
            'trace',
        ];
        consoleMethods.forEach((m) => {
            const originalMethod = (console[Zone.__symbol__(m)] = console[m]);
            if (originalMethod) {
                console[m] = function () {
                    const args = utils_1.ArraySlice.call(arguments);
                    if (Zone.current === Zone.root) {
                        return originalMethod.apply(this, args);
                    }
                    else {
                        return Zone.root.run(originalMethod, this, args);
                    }
                };
            }
        });
    });
    Zone.__load_patch('queueMicrotask', (global, Zone, api) => {
        (0, queue_microtask_1.patchQueueMicrotask)(global, api);
    });
}
