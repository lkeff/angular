"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe('ShadowCss, polyfills', () => {
    it('should support polyfill-next-selector', () => {
        let css = (0, utils_1.shim)("polyfill-next-selector {content: 'x > y'} z {}", 'contenta');
        expect(css).toEqualCss('x[contenta] > y[contenta]{}');
        css = (0, utils_1.shim)('polyfill-next-selector {content: "x > y"} z {}', 'contenta');
        expect(css).toEqualCss('x[contenta] > y[contenta]{}');
        css = (0, utils_1.shim)(`polyfill-next-selector {content: 'button[priority="1"]'} z {}`, 'contenta');
        expect(css).toEqualCss('button[priority="1"][contenta]{}');
    });
    it('should support polyfill-unscoped-rule', () => {
        let css = (0, utils_1.shim)("polyfill-unscoped-rule {content: '#menu > .bar';color: blue;}", 'contenta');
        expect(css).toContain('#menu > .bar {;color: blue;}');
        css = (0, utils_1.shim)('polyfill-unscoped-rule {content: "#menu > .bar";color: blue;}', 'contenta');
        expect(css).toContain('#menu > .bar {;color: blue;}');
        css = (0, utils_1.shim)(`polyfill-unscoped-rule {content: 'button[priority="1"]'}`, 'contenta');
        expect(css).toContain('button[priority="1"] {}');
    });
    it('should support multiple instances polyfill-unscoped-rule', () => {
        const css = (0, utils_1.shim)("polyfill-unscoped-rule {content: 'foo';color: blue;}" +
            "polyfill-unscoped-rule {content: 'bar';color: blue;}", 'contenta');
        expect(css).toContain('foo {;color: blue;}');
        expect(css).toContain('bar {;color: blue;}');
    });
    it('should support polyfill-rule', () => {
        let css = (0, utils_1.shim)("polyfill-rule {content: ':host.foo .bar';color: blue;}", 'contenta', 'a-host');
        expect(css).toEqualCss('.foo[a-host] .bar[contenta] {;color:blue;}');
        css = (0, utils_1.shim)('polyfill-rule {content: ":host.foo .bar";color:blue;}', 'contenta', 'a-host');
        expect(css).toEqualCss('.foo[a-host] .bar[contenta] {;color:blue;}');
        css = (0, utils_1.shim)(`polyfill-rule {content: 'button[priority="1"]'}`, 'contenta', 'a-host');
        expect(css).toEqualCss('button[priority="1"][contenta] {}');
    });
});
