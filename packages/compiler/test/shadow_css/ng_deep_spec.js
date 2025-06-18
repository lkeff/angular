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
describe('ShadowCss, ng-deep', () => {
    it('should handle /deep/', () => {
        const css = (0, utils_1.shim)('x /deep/ y {}', 'contenta');
        expect(css).toEqualCss('x[contenta] y {}');
    });
    it('should handle >>>', () => {
        const css = (0, utils_1.shim)('x >>> y {}', 'contenta');
        expect(css).toEqualCss('x[contenta] y {}');
    });
    it('should handle ::ng-deep', () => {
        let css = '::ng-deep y {}';
        expect((0, utils_1.shim)(css, 'contenta')).toEqualCss('y {}');
        css = 'x ::ng-deep y {}';
        expect((0, utils_1.shim)(css, 'contenta')).toEqualCss('x[contenta] y {}');
        css = ':host > ::ng-deep .x {}';
        expect((0, utils_1.shim)(css, 'contenta', 'h')).toEqualCss('[h] > .x {}');
        css = ':host ::ng-deep > .x {}';
        expect((0, utils_1.shim)(css, 'contenta', 'h')).toEqualCss('[h] > .x {}');
        css = ':host > ::ng-deep > .x {}';
        expect((0, utils_1.shim)(css, 'contenta', 'h')).toEqualCss('[h] > > .x {}');
    });
});
