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
describe('SVG', function () {
    const URL = '/';
    afterEach(driver_utilities_1.verifyNoBrowserErrors);
    beforeEach(() => {
        protractor_1.browser.get(URL);
    });
    it('should display SVG component contents', function () {
        const svgText = protractor_1.element.all(protractor_1.by.css('g text')).get(0);
        expect(svgText.getText()).toEqual('Hello');
    });
});
