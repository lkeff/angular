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
describe('SW `SwRegistrationOptions` example', () => {
    const pageUrl = '/registration-options';
    const appElem = (0, protractor_1.element)(protractor_1.by.css('example-app'));
    afterEach(test_utils_1.verifyNoBrowserErrors);
    it('not register the SW by default', () => {
        protractor_1.browser.get(pageUrl);
        expect(appElem.getText()).toBe('SW enabled: false');
    });
    it('register the SW when navigating to `?sw=true`', () => {
        protractor_1.browser.get(`${pageUrl}?sw=true`);
        expect(appElem.getText()).toBe('SW enabled: true');
    });
});
