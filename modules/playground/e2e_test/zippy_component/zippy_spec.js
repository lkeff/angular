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
describe('Zippy Component', function () {
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    describe('zippy', function () {
        const URL = '/';
        beforeEach(function () {
            protractor_1.browser.get(URL);
        });
        it("should change the zippy title depending on it's state", function () {
            const zippyTitle = (0, protractor_1.element)(protractor_1.by.css('.zippy__title'));
            expect(zippyTitle.getText()).toEqual('▾ Details');
            zippyTitle.click();
            expect(zippyTitle.getText()).toEqual('▸ Details');
        });
        it('should have zippy content', function () {
            expect((0, protractor_1.element)(protractor_1.by.css('.zippy__content')).getText()).toEqual('This is some content.');
        });
        it('should toggle when the zippy title is clicked', function () {
            (0, protractor_1.element)(protractor_1.by.css('.zippy__title')).click();
            expect((0, protractor_1.element)(protractor_1.by.css('.zippy__content')).isDisplayed()).toEqual(false);
            (0, protractor_1.element)(protractor_1.by.css('.zippy__title')).click();
            expect((0, protractor_1.element)(protractor_1.by.css('.zippy__content')).isDisplayed()).toEqual(true);
        });
    });
});
