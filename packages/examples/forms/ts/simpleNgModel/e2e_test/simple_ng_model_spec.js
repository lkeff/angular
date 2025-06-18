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
describe('simpleNgModel example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    let input;
    let paragraphs;
    let button;
    beforeEach(() => {
        protractor_1.browser.get('/simpleNgModel');
        input = (0, protractor_1.element)(protractor_1.by.css('input'));
        paragraphs = protractor_1.element.all(protractor_1.by.css('p'));
        button = (0, protractor_1.element)(protractor_1.by.css('button'));
    });
    it('should update the domain model as you type', () => {
        input.click();
        input.sendKeys('Carson');
        expect(paragraphs.get(0).getText()).toEqual('Value: Carson');
    });
    it('should report the validity correctly', () => {
        expect(paragraphs.get(1).getText()).toEqual('Valid: false');
        input.click();
        input.sendKeys('a');
        expect(paragraphs.get(1).getText()).toEqual('Valid: true');
    });
    it('should set the value by changing the domain model', () => {
        button.click();
        expect(input.getAttribute('value')).toEqual('Nancy');
    });
});
