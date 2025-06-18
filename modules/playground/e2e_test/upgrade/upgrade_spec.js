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
describe('ngUpgrade', function () {
    const URL = '/';
    beforeEach(function () {
        protractor_1.browser.rootEl = 'body';
        protractor_1.browser.get(URL);
    });
    afterEach(function () {
        protractor_1.browser.useAllAngular2AppRoots();
        (0, driver_utilities_1.verifyNoBrowserErrors)();
    });
    it('should bootstrap AngularJS and Angular apps together', function () {
        const ng1NameInput = (0, protractor_1.element)(protractor_1.by.css('input[ng-model="name"]'));
        expect(ng1NameInput.getAttribute('value')).toEqual('World');
        const projectedGreetingEl = (0, protractor_1.element)(protractor_1.by.css('.projected-content .greeting'));
        const upgradedNg1ComponentEl = (0, protractor_1.element)(protractor_1.by.css('ng1-user'));
        expect(projectedGreetingEl.getText()).toMatch(/World!$/);
        expect(upgradedNg1ComponentEl.getText()).toMatch(/^User: World/);
    });
});
