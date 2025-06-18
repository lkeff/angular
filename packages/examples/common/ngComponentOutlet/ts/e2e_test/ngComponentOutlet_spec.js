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
    const EC = protractor_1.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    protractor_1.browser.wait(EC.presenceOf((0, protractor_1.$)(selector)), 20000);
}
describe('ngComponentOutlet', () => {
    const URL = '/ngComponentOutlet';
    afterEach(test_utils_1.verifyNoBrowserErrors);
    describe('ng-component-outlet-example', () => {
        it('should render simple', () => {
            protractor_1.browser.get(URL);
            waitForElement('ng-component-outlet-simple-example');
            expect(protractor_1.element.all(protractor_1.by.css('hello-world')).getText()).toEqual(['Hello World!']);
        });
    });
});
