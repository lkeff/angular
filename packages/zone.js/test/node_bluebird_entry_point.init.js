"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Setup test environment
require("./test-env-setup-jasmine");
require("./wtf_mock");
const promise_1 = require("../lib/common/promise");
const to_string_1 = require("../lib/common/to-string");
const node_1 = require("../lib/node/node");
const rxjs_1 = require("../lib/rxjs/rxjs");
const promise_testing_1 = require("../lib/testing/promise-testing");
const zone_1 = require("../lib/zone");
const async_test_1 = require("../lib/zone-spec/async-test");
const fake_async_test_1 = require("../lib/zone-spec/fake-async-test");
const long_stack_trace_1 = require("../lib/zone-spec/long-stack-trace");
const proxy_1 = require("../lib/zone-spec/proxy");
const sync_test_1 = require("../lib/zone-spec/sync-test");
const task_tracking_1 = require("../lib/zone-spec/task-tracking");
const wtf_1 = require("../lib/zone-spec/wtf");
const test_fake_polyfill_1 = require("./test_fake_polyfill");
// Must be loaded before zone loads, so that zone can detect WTF.
(0, test_fake_polyfill_1.setupFakePolyfill)();
// Setup tests for Zone without microtask support
const Zone = (0, zone_1.loadZone)();
(0, promise_1.patchPromise)(Zone);
(0, to_string_1.patchToString)(Zone);
(0, node_1.patchNode)(Zone);
(0, async_test_1.patchAsyncTest)(Zone);
(0, fake_async_test_1.patchFakeAsyncTest)(Zone);
(0, long_stack_trace_1.patchLongStackTrace)(Zone);
(0, proxy_1.patchProxyZoneSpec)(Zone);
(0, sync_test_1.patchSyncTest)(Zone);
(0, task_tracking_1.patchTaskTracking)(Zone);
(0, wtf_1.patchWtf)(Zone);
(0, rxjs_1.patchRxJs)(Zone);
(0, promise_testing_1.patchPromiseTesting)(Zone);
const globalErrors = jasmine.GlobalErrors;
const symbol = Zone.__symbol__;
if (globalErrors && !jasmine[symbol('GlobalErrors')]) {
    jasmine[symbol('GlobalErrors')] = globalErrors;
    jasmine.GlobalErrors = function () {
        const instance = new globalErrors();
        const originalInstall = instance.install;
        if (originalInstall && !instance[symbol('install')]) {
            instance[symbol('install')] = originalInstall;
            instance.install = function () {
                const originalHandlers = process.listeners('unhandledRejection');
                const r = originalInstall.apply(this, arguments);
                process.removeAllListeners('unhandledRejection');
                if (originalHandlers) {
                    originalHandlers.forEach((h) => process.on('unhandledRejection', h));
                }
                return r;
            };
        }
        return instance;
    };
}
