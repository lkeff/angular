"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const driver_utilities_1 = require("@angular/build-tooling/bazel/benchmark/driver-utilities");
const protractor_1 = require("protractor");
describe('Model-Driven Forms', function () {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    const URL = '/';
    it('should display errors', function () {
        protractor_1.browser.get(URL);
        const form = protractor_1.element.all(protractor_1.by.css('form')).first();
        const input = protractor_1.element.all(protractor_1.by.css('#creditCard')).first();
        const firstName = protractor_1.element.all(protractor_1.by.css('#firstName')).first();
        input.sendKeys('invalid');
        firstName.click();
        expect(form.getAttribute('innerHTML')).toContain('is invalid credit card number');
    });
});
