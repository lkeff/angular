"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const trusted_types_sinks_1 = require("../../src/schema/trusted_types_sinks");
describe('isTrustedTypesSink', () => {
    it('should classify Trusted Types sinks', () => {
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('iframe', 'srcdoc')).toBeTrue();
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('p', 'innerHTML')).toBeTrue();
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('embed', 'src')).toBeTrue();
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('a', 'href')).toBeFalse();
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('base', 'href')).toBeFalse();
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('div', 'style')).toBeFalse();
    });
    it('should classify Trusted Types sinks case insensitive', () => {
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('p', 'iNnErHtMl')).toBeTrue();
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('p', 'formaction')).toBeFalse();
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('p', 'formAction')).toBeFalse();
    });
    it('should classify attributes as Trusted Types sinks', () => {
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('p', 'innerHtml')).toBeTrue();
        expect((0, trusted_types_sinks_1.isTrustedTypesSink)('p', 'formaction')).toBeFalse();
    });
});
