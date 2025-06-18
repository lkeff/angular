"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCleanupHook = getCleanupHook;
/**
 * Public Test Library for unit testing Angular applications. Assumes that you are running
 * with Jasmine, Mocha, or a similar framework which exports a beforeEach function and
 * allows tests to be asynchronous by either returning a promise or using a 'done' parameter.
 */
const fake_async_1 = require("./fake_async");
const test_bed_1 = require("./test_bed");
// Reset the test providers and the fake async zone before each test.
// We keep a guard because somehow this file can make it into a bundle and be executed
// beforeEach is only defined when executing the tests
(_a = globalThis.beforeEach) === null || _a === void 0 ? void 0 : _a.call(globalThis, getCleanupHook(false));
// We provide both a `beforeEach` and `afterEach`, because the updated behavior for
// tearing down the module is supposed to run after the test so that we can associate
// teardown errors with the correct test.
// We keep a guard because somehow this file can make it into a bundle and be executed
// afterEach is only defined when executing the tests
(_b = globalThis.afterEach) === null || _b === void 0 ? void 0 : _b.call(globalThis, getCleanupHook(true));
function getCleanupHook(expectedTeardownValue) {
    return () => {
        const testBed = test_bed_1.TestBedImpl.INSTANCE;
        if (testBed.shouldTearDownTestingModule() === expectedTeardownValue) {
            testBed.resetTestingModule();
            (0, fake_async_1.resetFakeAsyncZoneIfExists)();
        }
    };
}
