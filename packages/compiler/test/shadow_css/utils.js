"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.shim = shim;
const shadow_css_1 = require("../../src/shadow_css");
function shim(css, contentAttr, hostAttr = '') {
    const shadowCss = new shadow_css_1.ShadowCss();
    return shadowCss.shimCssText(css, contentAttr, hostAttr);
}
const shadowCssMatchers = {
    toEqualCss: function () {
        return {
            compare: function (actual, expected) {
                const actualCss = extractCssContent(actual);
                const expectedCss = extractCssContent(expected);
                const passes = actualCss === expectedCss;
                return {
                    pass: passes,
                    message: passes
                        ? 'CSS equals as expected'
                        : `Expected '${actualCss}' to equal '${expectedCss}'`,
                };
            },
        };
    },
};
function extractCssContent(css) {
    return css
        .replace(/^\n\s+/, '')
        .replace(/\n\s+$/, '')
        .replace(/\s+/g, ' ')
        .replace(/:\s/g, ':')
        .replace(/ }/g, '}');
}
beforeEach(function () {
    jasmine.addMatchers(shadowCssMatchers);
});
