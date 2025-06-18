"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const test_utils_1 = require("../../../../test-utils");
function waitForElement(selector) {
    const EC = protractor_1.protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    protractor_1.browser.wait(EC.presenceOf((0, protractor_1.$)(selector)), 20000);
}
describe('Location', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    it('should verify paths', () => {
        protractor_1.browser.get('/location/#/bar/baz');
        waitForElement('hash-location');
        expect(protractor_1.element.all(protractor_1.by.css('path-location code')).get(0).getText()).toEqual('/location');
        expect(protractor_1.element.all(protractor_1.by.css('hash-location code')).get(0).getText()).toEqual('/bar/baz');
    });
});
