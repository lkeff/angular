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
describe('formBuilder example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    let inputs;
    let paragraphs;
    beforeEach(() => {
        protractor_1.browser.get('/formBuilder');
        inputs = protractor_1.element.all(protractor_1.by.css('input'));
        paragraphs = protractor_1.element.all(protractor_1.by.css('p'));
    });
    it('should populate the UI with initial values', () => {
        expect(inputs.get(0).getAttribute('value')).toEqual('Nancy');
        expect(inputs.get(1).getAttribute('value')).toEqual('Drew');
    });
    it('should update the validation status', () => {
        expect(paragraphs.get(1).getText()).toEqual('Validation status: VALID');
        inputs.get(0).click();
        inputs.get(0).clear();
        inputs.get(0).sendKeys('a');
        expect(paragraphs.get(1).getText()).toEqual('Validation status: INVALID');
    });
});
