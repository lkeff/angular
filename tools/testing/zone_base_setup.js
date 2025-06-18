"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const long_stack_trace_1 = require("zone.js/lib/zone-spec/long-stack-trace");
const task_tracking_1 = require("zone.js/lib/zone-spec/task-tracking");
const proxy_1 = require("zone.js/lib/zone-spec/proxy");
const sync_test_1 = require("zone.js/lib/zone-spec/sync-test");
const async_test_1 = require("zone.js/lib/zone-spec/async-test");
const fake_async_test_1 = require("zone.js/lib/zone-spec/fake-async-test");
const jasmine_1 = require("zone.js/lib/jasmine/jasmine");
(0, long_stack_trace_1.patchLongStackTrace)(Zone);
(0, task_tracking_1.patchTaskTracking)(Zone);
(0, proxy_1.patchProxyZoneSpec)(Zone);
(0, sync_test_1.patchSyncTest)(Zone);
(0, async_test_1.patchAsyncTest)(Zone);
(0, fake_async_test_1.patchFakeAsyncTest)(Zone);
(0, jasmine_1.patchJasmine)(Zone);
