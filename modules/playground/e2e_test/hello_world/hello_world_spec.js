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
describe('hello world', function () {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    describe('hello world app', function () {
        const URL = '/';
        it('should greet', function () {
            protractor_1.browser.get(URL);
            expect(getComponentText('hello-app', '.greeting')).toEqual('hello world!');
        });
        it('should change greeting', function () {
            protractor_1.browser.get(URL);
            clickComponentButton('hello-app', '.changeButton');
            expect(getComponentText('hello-app', '.greeting')).toEqual('howdy world!');
        });
    });
});
function getComponentText(selector, innerSelector) {
    return protractor_1.browser.executeScript(`return document.querySelector("${selector}").querySelector("${innerSelector}").textContent`);
}
function clickComponentButton(selector, innerSelector) {
    return protractor_1.browser.executeScript(`return document.querySelector("${selector}").querySelector("${innerSelector}").click()`);
}
