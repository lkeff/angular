"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const array_utils_1 = require("../../src/util/array_utils");
describe('array_utils', () => {
    describe('flatten', () => {
        it('should flatten an empty array', () => {
            expect((0, array_utils_1.flatten)([])).toEqual([]);
        });
        it('should flatten a flat array', () => {
            expect((0, array_utils_1.flatten)([1, 2, 3])).toEqual([1, 2, 3]);
        });
        it('should flatten a nested array depth-first', () => {
            expect((0, array_utils_1.flatten)([1, [2], 3])).toEqual([1, 2, 3]);
            expect((0, array_utils_1.flatten)([[1], 2, [3]])).toEqual([1, 2, 3]);
            expect((0, array_utils_1.flatten)([1, [2, [3]], 4])).toEqual([1, 2, 3, 4]);
            expect((0, array_utils_1.flatten)([1, [2, [3]], [4]])).toEqual([1, 2, 3, 4]);
            expect((0, array_utils_1.flatten)([1, [2, [3]], [[[4]]]])).toEqual([1, 2, 3, 4]);
            expect((0, array_utils_1.flatten)([1, [], 2])).toEqual([1, 2]);
        });
    });
    describe('fast arraySplice', () => {
        function expectArraySplice(array, index) {
            (0, array_utils_1.arraySplice)(array, index, 1);
            return expect(array);
        }
        it('should remove items', () => {
            expectArraySplice([0, 1, 2], 0).toEqual([1, 2]);
            expectArraySplice([0, 1, 2], 1).toEqual([0, 2]);
            expectArraySplice([0, 1, 2], 2).toEqual([0, 1]);
        });
    });
    describe('arrayInsertSorted', () => {
        function expectArrayInsert(array, index, value) {
            (0, array_utils_1.arrayInsert)(array, index, value);
            return expect(array);
        }
        function expectArrayInsert2(array, index, value1, value2) {
            (0, array_utils_1.arrayInsert2)(array, index, value1, value2);
            return expect(array);
        }
        it('should insert items', () => {
            expectArrayInsert([], 0, 'A').toEqual(['A']);
            expectArrayInsert([0], 0, 'A').toEqual(['A', 0]);
            expectArrayInsert([0], 1, 'A').toEqual([0, 'A']);
            expectArrayInsert([0, 1, 2], 0, 'A').toEqual(['A', 0, 1, 2]);
            expectArrayInsert([0, 1, 2], 1, 'A').toEqual([0, 'A', 1, 2]);
            expectArrayInsert([0, 1, 2], 2, 'A').toEqual([0, 1, 'A', 2]);
            expectArrayInsert([0, 1, 2], 3, 'A').toEqual([0, 1, 2, 'A']);
        });
        it('should insert items', () => {
            expectArrayInsert2([], 0, 'A', 'B').toEqual(['A', 'B']);
            expectArrayInsert2([0], 0, 'A', 'B').toEqual(['A', 'B', 0]);
            expectArrayInsert2([0], 1, 'A', 'B').toEqual([0, 'A', 'B']);
            expectArrayInsert2([0, 1, 2], 0, 'A', 'B').toEqual(['A', 'B', 0, 1, 2]);
            expectArrayInsert2([0, 1, 2], 1, 'A', 'B').toEqual([0, 'A', 'B', 1, 2]);
            expectArrayInsert2([0, 1, 2], 2, 'A', 'B').toEqual([0, 1, 'A', 'B', 2]);
            expectArrayInsert2([0, 1, 2], 3, 'A', 'B').toEqual([0, 1, 2, 'A', 'B']);
            expectArrayInsert2(['height', '1px', 'width', '2000px'], 0, 'color', 'red').toEqual([
                'color',
                'red',
                'height',
                '1px',
                'width',
                '2000px',
            ]);
        });
    });
    describe('arrayIndexOfSorted', () => {
        it('should get index of', () => {
            const a = ['a', 'b', 'c', 'd', 'e'];
            expect((0, array_utils_1.arrayIndexOfSorted)(a, 'a')).toEqual(0);
            expect((0, array_utils_1.arrayIndexOfSorted)(a, 'b')).toEqual(1);
            expect((0, array_utils_1.arrayIndexOfSorted)(a, 'c')).toEqual(2);
            expect((0, array_utils_1.arrayIndexOfSorted)(a, 'd')).toEqual(3);
            expect((0, array_utils_1.arrayIndexOfSorted)(a, 'e')).toEqual(4);
        });
    });
    describe('KeyValueArray', () => {
        it('should support basic operations', () => {
            const map = [];
            expect((0, array_utils_1.keyValueArrayIndexOf)(map, 'A')).toEqual(~0);
            expect((0, array_utils_1.keyValueArraySet)(map, 'B', 1)).toEqual(0);
            expect(map).toEqual(['B', 1]);
            expect((0, array_utils_1.keyValueArrayIndexOf)(map, 'B')).toEqual(0);
            expect((0, array_utils_1.keyValueArraySet)(map, 'A', 0)).toEqual(0);
            expect(map).toEqual(['A', 0, 'B', 1]);
            expect((0, array_utils_1.keyValueArrayIndexOf)(map, 'B')).toEqual(2);
            expect((0, array_utils_1.keyValueArrayIndexOf)(map, 'AA')).toEqual(~2);
            expect((0, array_utils_1.keyValueArraySet)(map, 'C', 2)).toEqual(4);
            expect(map).toEqual(['A', 0, 'B', 1, 'C', 2]);
            expect((0, array_utils_1.keyValueArrayGet)(map, 'A')).toEqual(0);
            expect((0, array_utils_1.keyValueArrayGet)(map, 'B')).toEqual(1);
            expect((0, array_utils_1.keyValueArrayGet)(map, 'C')).toEqual(2);
            expect((0, array_utils_1.keyValueArrayGet)(map, 'AA')).toEqual(undefined);
            expect((0, array_utils_1.keyValueArraySet)(map, 'B', -1)).toEqual(2);
            expect(map).toEqual(['A', 0, 'B', -1, 'C', 2]);
            expect((0, array_utils_1.keyValueArrayDelete)(map, 'AA')).toEqual(~2);
            expect((0, array_utils_1.keyValueArrayDelete)(map, 'B')).toEqual(2);
            expect(map).toEqual(['A', 0, 'C', 2]);
            expect((0, array_utils_1.keyValueArrayDelete)(map, 'A')).toEqual(0);
            expect(map).toEqual(['C', 2]);
            expect((0, array_utils_1.keyValueArrayDelete)(map, 'C')).toEqual(0);
            expect(map).toEqual([]);
        });
    });
});
