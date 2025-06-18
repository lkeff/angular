"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const style_url_resolver_1 = require("../src/style_url_resolver");
describe('isStyleUrlResolvable', () => {
    it('should resolve relative urls', () => {
        expect((0, style_url_resolver_1.isStyleUrlResolvable)('someUrl.css')).toBe(true);
    });
    it('should resolve package: urls', () => {
        expect((0, style_url_resolver_1.isStyleUrlResolvable)('package:someUrl.css')).toBe(true);
    });
    it('should not resolve empty urls', () => {
        expect((0, style_url_resolver_1.isStyleUrlResolvable)(null)).toBe(false);
        expect((0, style_url_resolver_1.isStyleUrlResolvable)('')).toBe(false);
    });
    it('should not resolve urls with other schema', () => {
        expect((0, style_url_resolver_1.isStyleUrlResolvable)('http://otherurl')).toBe(false);
    });
    it('should not resolve urls with absolute paths', () => {
        expect((0, style_url_resolver_1.isStyleUrlResolvable)('/otherurl')).toBe(false);
        expect((0, style_url_resolver_1.isStyleUrlResolvable)('//otherurl')).toBe(false);
    });
});
