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
describe('contentChild example', () => {
    afterEach(test_utils_1.verifyNoBrowserErrors);
    let button;
    let result;
    beforeEach(() => {
        protractor_1.browser.get('/di/contentChild');
        button = (0, protractor_1.element)(protractor_1.by.css('button'));
        result = (0, protractor_1.element)(protractor_1.by.css('div'));
    });
    it('should query content child', () => {
        expect(result.getText()).toEqual('pane: 1');
        button.click();
        expect(result.getText()).toEqual('pane: 2');
    });
});
