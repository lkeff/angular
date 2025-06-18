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
describe('ngModelGroup example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    let inputs;
    let buttons;
    beforeEach(() => {
        protractor_1.browser.get('/ngModelGroup');
        inputs = protractor_1.element.all(protractor_1.by.css('input'));
        buttons = protractor_1.element.all(protractor_1.by.css('button'));
    });
    it('should populate the UI with initial values', () => {
        expect(inputs.get(0).getAttribute('value')).toEqual('Nancy');
        expect(inputs.get(1).getAttribute('value')).toEqual('J');
        expect(inputs.get(2).getAttribute('value')).toEqual('Drew');
    });
    it('should show the error when name is invalid', () => {
        inputs.get(0).click();
        inputs.get(0).clear();
        inputs.get(0).sendKeys('a');
        expect((0, protractor_1.element)(protractor_1.by.css('p')).getText()).toEqual('Name is invalid.');
    });
    it('should set the value when changing the domain model', () => {
        buttons.get(1).click();
        expect(inputs.get(0).getAttribute('value')).toEqual('Bess');
        expect(inputs.get(1).getAttribute('value')).toEqual('S');
        expect(inputs.get(2).getAttribute('value')).toEqual('Marvin');
    });
});
