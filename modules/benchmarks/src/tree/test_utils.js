"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTreeBenchmark = runTreeBenchmark;
exports.openTreeBenchmark = openTreeBenchmark;
const driver_utilities_1 = require("@angular/build-tooling/bazel/benchmark/driver-utilities");
const protractor_1 = require("protractor");
function runTreeBenchmark({ id, prepare, setup, work, }) {
    protractor_1.browser.rootEl = '#root';
    return (0, driver_utilities_1.runBenchmark)({
        id: id,
        url: '',
        ignoreBrowserSynchronization: true,
        params: [],
        work: work,
        prepare: prepare,
        setup: setup,
    });
}
function openTreeBenchmark() {
    protractor_1.browser.rootEl = '#root';
    (0, driver_utilities_1.openBrowser)({
        url: '',
        ignoreBrowserSynchronization: true,
        params: [{ name: 'depth', value: 4 }],
    });
}
