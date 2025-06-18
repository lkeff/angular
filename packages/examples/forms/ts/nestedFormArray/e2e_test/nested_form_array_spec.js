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
describe('nestedFormArray example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    let inputs;
    let buttons;
    beforeEach(() => {
        protractor_1.browser.get('/nestedFormArray');
        inputs = protractor_1.element.all(protractor_1.by.css('input'));
        buttons = protractor_1.element.all(protractor_1.by.css('button'));
    });
    it('should populate the UI with initial values', () => {
        expect(inputs.get(0).getAttribute('value')).toEqual('SF');
        expect(inputs.get(1).getAttribute('value')).toEqual('NY');
    });
    it('should add inputs programmatically', () => {
        expect(inputs.count()).toBe(2);
        buttons.get(1).click();
        inputs = protractor_1.element.all(protractor_1.by.css('input'));
        expect(inputs.count()).toBe(3);
    });
    it('should set the value programmatically', () => {
        buttons.get(2).click();
        expect(inputs.get(0).getAttribute('value')).toEqual('LA');
        expect(inputs.get(1).getAttribute('value')).toEqual('MTV');
    });
});
