"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const stringify_1 = require("../../src/util/stringify");
describe('stringify', () => {
    describe('concatStringsWithSpace', () => {
        it('should concat with null', () => {
            expect((0, stringify_1.concatStringsWithSpace)(null, null)).toEqual('');
            expect((0, stringify_1.concatStringsWithSpace)('a', null)).toEqual('a');
            expect((0, stringify_1.concatStringsWithSpace)(null, 'b')).toEqual('b');
        });
        it('should concat when empty', () => {
            expect((0, stringify_1.concatStringsWithSpace)('', '')).toEqual('');
            expect((0, stringify_1.concatStringsWithSpace)('a', '')).toEqual('a');
            expect((0, stringify_1.concatStringsWithSpace)('', 'b')).toEqual('b');
        });
        it('should concat when not empty', () => {
            expect((0, stringify_1.concatStringsWithSpace)('before', 'after')).toEqual('before after');
        });
    });
});
