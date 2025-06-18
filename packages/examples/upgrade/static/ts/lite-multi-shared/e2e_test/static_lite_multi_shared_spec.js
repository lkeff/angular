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
describe('upgrade/static (lite with multiple downgraded modules and shared root module)', () => {
    const compA = (0, protractor_1.element)(protractor_1.by.css('ng2-a'));
    const compB = (0, protractor_1.element)(protractor_1.by.css('ng2-b'));
    const compC = (0, protractor_1.element)(protractor_1.by.css('ng2-c'));
    beforeEach(() => protractor_1.browser.get('/'));
    afterEach(test_utils_1.verifyNoBrowserErrors);
    it('should share the same injectable instance across downgraded modules A and B', () => {
        expect(compA.getText()).toBe('Component A (Service ID: 2)');
        expect(compB.getText()).toBe('Component B (Service ID: 2)');
    });
    it('should use a different injectable instance on downgraded module C', () => {
        expect(compC.getText()).toBe('Component C (Service ID: 1)');
    });
});
