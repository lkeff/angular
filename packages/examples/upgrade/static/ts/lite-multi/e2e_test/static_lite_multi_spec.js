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
describe('upgrade/static (lite with multiple downgraded modules)', () => {
    const navButtons = protractor_1.element.all(protractor_1.by.css('nav button'));
    const mainContent = (0, protractor_1.element)(protractor_1.by.css('main'));
    beforeEach(() => protractor_1.browser.get('/'));
    afterEach(test_utils_1.verifyNoBrowserErrors);
    it('should correctly bootstrap multiple downgraded modules', () => {
        navButtons.get(1).click();
        expect(mainContent.getText()).toBe('Component B');
        navButtons.get(0).click();
        expect(mainContent.getText()).toBe('Component A | ng1(ng2)');
    });
});
