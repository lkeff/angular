"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const driver_utilities_1 = require("@angular/build-tooling/bazel/benchmark/driver-utilities");
const protractor_1 = require("protractor");
describe('Order Management CRUD', function () {
    const URL = '/';
    it('should work', function () {
        protractor_1.browser.get(URL);
        (0, driver_utilities_1.verifyNoBrowserErrors)();
    });
});
