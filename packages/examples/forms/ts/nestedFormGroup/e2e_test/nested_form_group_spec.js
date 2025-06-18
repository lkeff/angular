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
describe('nestedFormGroup example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    let firstInput;
    let lastInput;
    let button;
    beforeEach(() => {
        protractor_1.browser.get('/nestedFormGroup');
        firstInput = (0, protractor_1.element)(protractor_1.by.css('[formControlName="first"]'));
        lastInput = (0, protractor_1.element)(protractor_1.by.css('[formControlName="last"]'));
        button = (0, protractor_1.element)(protractor_1.by.css('button:not([type="submit"])'));
    });
    it('should populate the UI with initial values', () => {
        expect(firstInput.getAttribute('value')).toEqual('Nancy');
        expect(lastInput.getAttribute('value')).toEqual('Drew');
    });
    it('should show the error when name is invalid', () => {
        firstInput.click();
        firstInput.clear();
        firstInput.sendKeys('a');
        expect((0, protractor_1.element)(protractor_1.by.css('p')).getText()).toEqual('Name is invalid.');
    });
    it('should set the value programmatically', () => {
        button.click();
        expect(firstInput.getAttribute('value')).toEqual('Bess');
        expect(lastInput.getAttribute('value')).toEqual('Marvin');
    });
});
