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
describe('formControlName example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    describe('index view', () => {
        let firstInput;
        let lastInput;
        beforeEach(() => {
            protractor_1.browser.get('/simpleFormGroup');
            firstInput = (0, protractor_1.element)(protractor_1.by.css('[formControlName="first"]'));
            lastInput = (0, protractor_1.element)(protractor_1.by.css('[formControlName="last"]'));
        });
        it('should populate the form control values in the DOM', () => {
            expect(firstInput.getAttribute('value')).toEqual('Nancy');
            expect(lastInput.getAttribute('value')).toEqual('Drew');
        });
        it('should show the error when the form is invalid', () => {
            firstInput.click();
            firstInput.clear();
            firstInput.sendKeys('a');
            expect((0, protractor_1.element)(protractor_1.by.css('div')).getText()).toEqual('Name is too short.');
        });
        it('should set the value programmatically', () => {
            (0, protractor_1.element)(protractor_1.by.css('button:not([type="submit"])')).click();
            expect(firstInput.getAttribute('value')).toEqual('Carson');
            expect(lastInput.getAttribute('value')).toEqual('Drew');
        });
    });
});
