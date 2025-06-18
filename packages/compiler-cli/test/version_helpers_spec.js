"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const version_helpers_1 = require("../src/version_helpers");
describe('toNumbers', () => {
    it('should handle strings', () => {
        expect((0, version_helpers_1.toNumbers)('2')).toEqual([2]);
        expect((0, version_helpers_1.toNumbers)('2.1')).toEqual([2, 1]);
        expect((0, version_helpers_1.toNumbers)('2.0.1')).toEqual([2, 0, 1]);
    });
});
describe('compareNumbers', () => {
    it('should handle empty arrays', () => {
        expect((0, version_helpers_1.compareNumbers)([], [])).toEqual(0);
    });
    it('should handle arrays of same length', () => {
        expect((0, version_helpers_1.compareNumbers)([1], [3])).toEqual(-1);
        expect((0, version_helpers_1.compareNumbers)([3], [1])).toEqual(1);
        expect((0, version_helpers_1.compareNumbers)([1, 0], [1, 0])).toEqual(0);
        expect((0, version_helpers_1.compareNumbers)([1, 1], [1, 0])).toEqual(1);
        expect((0, version_helpers_1.compareNumbers)([1, 0], [1, 1])).toEqual(-1);
        expect((0, version_helpers_1.compareNumbers)([1, 0, 9], [1, 1, 0])).toEqual(-1);
        expect((0, version_helpers_1.compareNumbers)([1, 1, 0], [1, 0, 9])).toEqual(1);
    });
    it('should handle arrays of different length', () => {
        expect((0, version_helpers_1.compareNumbers)([2], [2, 1])).toEqual(-1);
        expect((0, version_helpers_1.compareNumbers)([2, 1], [2])).toEqual(1);
        expect((0, version_helpers_1.compareNumbers)([0, 9], [1])).toEqual(-1);
        expect((0, version_helpers_1.compareNumbers)([1], [0, 9])).toEqual(1);
        expect((0, version_helpers_1.compareNumbers)([2], [])).toEqual(1);
        expect((0, version_helpers_1.compareNumbers)([], [2])).toEqual(-1);
        expect((0, version_helpers_1.compareNumbers)([1, 0], [1, 0, 0, 0])).toEqual(0);
    });
});
describe('isVersionBetween', () => {
    it('should correctly check if a typescript version is within a given range', () => {
        expect((0, version_helpers_1.isVersionBetween)('2.7.0', '2.40')).toEqual(false);
        expect((0, version_helpers_1.isVersionBetween)('2.40', '2.7.0')).toEqual(true);
        expect((0, version_helpers_1.isVersionBetween)('2.7.2', '2.7.0', '2.8.0')).toEqual(true);
        expect((0, version_helpers_1.isVersionBetween)('2.7.2', '2.7.7', '2.8.0')).toEqual(false);
    });
});
describe('compareVersions', () => {
    it('should correctly compare versions', () => {
        expect((0, version_helpers_1.compareVersions)('2.7.0', '2.40')).toEqual(-1);
        expect((0, version_helpers_1.compareVersions)('2.40', '2.7.0')).toEqual(1);
        expect((0, version_helpers_1.compareVersions)('2.40', '2.40')).toEqual(0);
        expect((0, version_helpers_1.compareVersions)('2.40', '2.41')).toEqual(-1);
        expect((0, version_helpers_1.compareVersions)('2', '2.1')).toEqual(-1);
    });
});
