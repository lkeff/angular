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
describe('simpleFormControl example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    describe('index view', () => {
        let input;
        let valueP;
        let statusP;
        beforeEach(() => {
            protractor_1.browser.get('/simpleFormControl');
            input = (0, protractor_1.element)(protractor_1.by.css('input'));
            valueP = (0, protractor_1.element)(protractor_1.by.css('p:first-of-type'));
            statusP = (0, protractor_1.element)(protractor_1.by.css('p:last-of-type'));
        });
        it('should populate the form control value in the DOM', () => {
            expect(input.getAttribute('value')).toEqual('value');
            expect(valueP.getText()).toEqual('Value: value');
        });
        it('should update the value as user types', () => {
            input.click();
            input.sendKeys('s!');
            expect(valueP.getText()).toEqual('Value: values!');
        });
        it('should show the correct validity state', () => {
            expect(statusP.getText()).toEqual('Validation status: VALID');
            input.click();
            input.clear();
            input.sendKeys('a');
            expect(statusP.getText()).toEqual('Validation status: INVALID');
        });
        it('should set the value programmatically', () => {
            (0, protractor_1.element)(protractor_1.by.css('button')).click();
            expect(input.getAttribute('value')).toEqual('new value');
        });
    });
});
