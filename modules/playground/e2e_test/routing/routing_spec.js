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
describe('routing inbox-app', () => {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    describe('index view', () => {
        const URL = '/';
        it('should list out the current collection of items', () => {
            protractor_1.browser.get(URL);
            waitForElement('.inbox-item-record');
            expect(protractor_1.element.all(protractor_1.by.css('.inbox-item-record')).count()).toEqual(200);
        });
    });
});
