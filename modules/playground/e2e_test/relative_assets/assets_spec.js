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
function waitForElement(selector) {
    // Waits for the element with id 'abc' to be present on the dom.
    protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf((0, protractor_1.$)(selector)), 20000);
}
describe('relative assets relative-app', () => {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    const URL = '/';
    it('should load in the templateUrl relative to the my-cmp component', () => {
        protractor_1.browser.get(URL);
        waitForElement('my-cmp .inner-container');
        expect(protractor_1.element.all(protractor_1.by.css('my-cmp .inner-container')).count()).toEqual(1);
    });
    it('should load in the styleUrls relative to the my-cmp component', () => {
        protractor_1.browser.get(URL);
        waitForElement('my-cmp .inner-container');
        const elem = (0, protractor_1.element)(protractor_1.by.css('my-cmp .inner-container'));
        const width = protractor_1.browser.executeScript((e) => parseInt(window.getComputedStyle(e).width), elem.getWebElement());
        expect(width).toBe(432);
    });
});
