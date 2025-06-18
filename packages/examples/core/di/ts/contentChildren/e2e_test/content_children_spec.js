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
const test_utils_1 = require("../../../../../test-utils");
describe('contentChildren example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    let button;
    let resultTopLevel;
    let resultNested;
    beforeEach(() => {
        protractor_1.browser.get('/di/contentChildren');
        button = (0, protractor_1.element)(protractor_1.by.css('button'));
        resultTopLevel = (0, protractor_1.element)(protractor_1.by.css('.top-level'));
        resultNested = (0, protractor_1.element)(protractor_1.by.css('.nested'));
    });
    it('should query content children', () => {
        expect(resultTopLevel.getText()).toEqual('Top level panes: 1, 2');
        button.click();
        expect(resultTopLevel.getText()).toEqual('Top level panes: 1, 2, 3');
    });
    it('should query nested content children', () => {
        expect(resultNested.getText()).toEqual('Arbitrary nested panes: 1, 2');
        button.click();
        expect(resultNested.getText()).toEqual('Arbitrary nested panes: 1, 2, 3, 3_1, 3_2');
    });
});
