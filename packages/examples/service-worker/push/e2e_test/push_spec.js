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
const test_utils_1 = require("../../../test-utils");
describe('SW `SwPush` example', () => {
    const pageUrl = '/push';
    const appElem = (0, protractor_1.element)(protractor_1.by.css('example-app'));
    afterEach(test_utils_1.verifyNoBrowserErrors);
    it('should be enabled', () => {
        protractor_1.browser.get(pageUrl);
        expect(appElem.getText()).toBe('SW enabled: true');
    });
});
