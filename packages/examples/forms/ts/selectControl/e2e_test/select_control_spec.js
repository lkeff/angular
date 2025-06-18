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
describe('selectControl example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    let select;
    let options;
    let p;
    beforeEach(() => {
        protractor_1.browser.get('/selectControl');
        select = (0, protractor_1.element)(protractor_1.by.css('select'));
        options = protractor_1.element.all(protractor_1.by.css('option'));
        p = (0, protractor_1.element)(protractor_1.by.css('p'));
    });
    it('should initially select the placeholder option', () => {
        expect(options.get(0).getAttribute('selected')).toBe('true');
    });
    it('should update the model when the value changes in the UI', () => {
        select.click();
        options.get(1).click();
        expect(p.getText()).toEqual('Form value: { "state": { "name": "Arizona", "abbrev": "AZ" } }');
    });
});
