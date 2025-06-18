"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fatal_linker_error_1 = require("../src/fatal_linker_error");
describe('FatalLinkerError', () => {
    it('should expose the `node` and `message`', () => {
        const node = {};
        expect(new fatal_linker_error_1.FatalLinkerError(node, 'Some message')).toEqual(jasmine.objectContaining({ node, message: 'Some message' }));
    });
});
describe('isFatalLinkerError()', () => {
    it('should return true if the error is of type `FatalLinkerError`', () => {
        const error = new fatal_linker_error_1.FatalLinkerError({}, 'Some message');
        expect((0, fatal_linker_error_1.isFatalLinkerError)(error)).toBe(true);
    });
    it('should return false if the error is not of type `FatalLinkerError`', () => {
        const error = new Error('Some message');
        expect((0, fatal_linker_error_1.isFatalLinkerError)(error)).toBe(false);
    });
});
