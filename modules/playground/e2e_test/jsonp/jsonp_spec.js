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
describe('jsonp', function () {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    describe('fetching', function () {
        const URL = '/';
        it('should fetch and display people', function () {
            protractor_1.browser.get(URL);
            expect(getComponentText('jsonp-app', '.people')).toEqual('hello, caitp');
        });
    });
});
function getComponentText(selector, innerSelector) {
    return protractor_1.browser.executeScript(`return document.querySelector("${selector}").querySelector("${innerSelector}").textContent.trim()`);
}
