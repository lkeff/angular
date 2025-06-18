"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollupTesting = rollupTesting;
const jasmine_1 = require("../jasmine/jasmine");
const jest_1 = require("../jest/jest");
const mocha_1 = require("../mocha/mocha");
const async_test_1 = require("../zone-spec/async-test");
const fake_async_test_1 = require("../zone-spec/fake-async-test");
const long_stack_trace_1 = require("../zone-spec/long-stack-trace");
const proxy_1 = require("../zone-spec/proxy");
const sync_test_1 = require("../zone-spec/sync-test");
const promise_testing_1 = require("./promise-testing");
function rollupTesting(Zone) {
    (0, long_stack_trace_1.patchLongStackTrace)(Zone);
    (0, proxy_1.patchProxyZoneSpec)(Zone);
    (0, sync_test_1.patchSyncTest)(Zone);
    (0, jasmine_1.patchJasmine)(Zone);
    (0, jest_1.patchJest)(Zone);
    (0, mocha_1.patchMocha)(Zone);
    (0, async_test_1.patchAsyncTest)(Zone);
    (0, fake_async_test_1.patchFakeAsyncTest)(Zone);
    (0, promise_testing_1.patchPromiseTesting)(Zone);
}
