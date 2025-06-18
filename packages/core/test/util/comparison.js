"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const comparison_1 = require("../../src/util/comparison");
describe('Comparison util', () => {
    describe('devModeEqual', () => {
        it('should do the deep comparison of iterables', () => {
            expect((0, comparison_1.devModeEqual)([['one']], [['one']])).toBe(true);
            expect((0, comparison_1.devModeEqual)(['one'], ['one', 'two'])).toBe(false);
            expect((0, comparison_1.devModeEqual)(['one', 'two'], ['one'])).toBe(false);
            expect((0, comparison_1.devModeEqual)(['one'], 'one')).toBe(false);
            expect((0, comparison_1.devModeEqual)(['one'], {})).toBe(false);
            expect((0, comparison_1.devModeEqual)('one', ['one'])).toBe(false);
            expect((0, comparison_1.devModeEqual)({}, ['one'])).toBe(false);
        });
        it('should compare primitive numbers', () => {
            expect((0, comparison_1.devModeEqual)(1, 1)).toBe(true);
            expect((0, comparison_1.devModeEqual)(1, 2)).toBe(false);
            expect((0, comparison_1.devModeEqual)({}, 2)).toBe(false);
            expect((0, comparison_1.devModeEqual)(1, {})).toBe(false);
        });
        it('should compare primitive strings', () => {
            expect((0, comparison_1.devModeEqual)('one', 'one')).toBe(true);
            expect((0, comparison_1.devModeEqual)('one', 'two')).toBe(false);
            expect((0, comparison_1.devModeEqual)({}, 'one')).toBe(false);
            expect((0, comparison_1.devModeEqual)('one', {})).toBe(false);
        });
        it('should compare primitive booleans', () => {
            expect((0, comparison_1.devModeEqual)(true, true)).toBe(true);
            expect((0, comparison_1.devModeEqual)(true, false)).toBe(false);
            expect((0, comparison_1.devModeEqual)({}, true)).toBe(false);
            expect((0, comparison_1.devModeEqual)(true, {})).toBe(false);
        });
        it('should compare null', () => {
            expect((0, comparison_1.devModeEqual)(null, null)).toBe(true);
            expect((0, comparison_1.devModeEqual)(null, 1)).toBe(false);
            expect((0, comparison_1.devModeEqual)({}, null)).toBe(false);
            expect((0, comparison_1.devModeEqual)(null, {})).toBe(false);
        });
        it('should return true for other objects', () => {
            expect((0, comparison_1.devModeEqual)({}, {})).toBe(true);
        });
    });
});
