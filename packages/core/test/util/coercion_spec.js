"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("../../src/core");
describe('coercion functions', () => {
    describe('booleanAttribute', () => {
        it('should coerce undefined to false', () => {
            expect((0, core_1.booleanAttribute)(undefined)).toBe(false);
        });
        it('should coerce null to false', () => {
            expect((0, core_1.booleanAttribute)(null)).toBe(false);
        });
        it('should coerce the empty string to true', () => {
            expect((0, core_1.booleanAttribute)('')).toBe(true);
        });
        it('should coerce zero to true', () => {
            expect((0, core_1.booleanAttribute)(0)).toBe(true);
        });
        it('should coerce the string "false" to false', () => {
            expect((0, core_1.booleanAttribute)('false')).toBe(false);
        });
        it('should coerce the boolean false to false', () => {
            expect((0, core_1.booleanAttribute)(false)).toBe(false);
        });
        it('should coerce the boolean true to true', () => {
            expect((0, core_1.booleanAttribute)(true)).toBe(true);
        });
        it('should coerce the string "true" to true', () => {
            expect((0, core_1.booleanAttribute)('true')).toBe(true);
        });
        it('should coerce an arbitrary string to true', () => {
            expect((0, core_1.booleanAttribute)('pink')).toBe(true);
        });
        it('should coerce an object to true', () => {
            expect((0, core_1.booleanAttribute)({})).toBe(true);
        });
        it('should coerce an array to true', () => {
            expect((0, core_1.booleanAttribute)([])).toBe(true);
        });
    });
    describe('numberAttribute', () => {
        it('should coerce undefined to the default value', () => {
            expect((0, core_1.numberAttribute)(undefined)).toBeNaN();
            expect((0, core_1.numberAttribute)(undefined, 111)).toBe(111);
        });
        it('should coerce null to the default value', () => {
            expect((0, core_1.numberAttribute)(null)).toBeNaN();
            expect((0, core_1.numberAttribute)(null, 111)).toBe(111);
        });
        it('should coerce true to the default value', () => {
            expect((0, core_1.numberAttribute)(true)).toBeNaN();
            expect((0, core_1.numberAttribute)(true, 111)).toBe(111);
        });
        it('should coerce false to the default value', () => {
            expect((0, core_1.numberAttribute)(false)).toBeNaN();
            expect((0, core_1.numberAttribute)(false, 111)).toBe(111);
        });
        it('should coerce the empty string to the default value', () => {
            expect((0, core_1.numberAttribute)('')).toBeNaN();
            expect((0, core_1.numberAttribute)('', 111)).toBe(111);
        });
        it('should coerce the string "1" to 1', () => {
            expect((0, core_1.numberAttribute)('1')).toBe(1);
            expect((0, core_1.numberAttribute)('1', 111)).toBe(1);
        });
        it('should coerce the string "123.456" to 123.456', () => {
            expect((0, core_1.numberAttribute)('123.456')).toBe(123.456);
            expect((0, core_1.numberAttribute)('123.456', 111)).toBe(123.456);
        });
        it('should coerce the string "-123.456" to -123.456', () => {
            expect((0, core_1.numberAttribute)('-123.456')).toBe(-123.456);
            expect((0, core_1.numberAttribute)('-123.456', 111)).toBe(-123.456);
        });
        it('should coerce an arbitrary string to the default value', () => {
            expect((0, core_1.numberAttribute)('pink')).toBeNaN();
            expect((0, core_1.numberAttribute)('pink', 111)).toBe(111);
        });
        it('should coerce an arbitrary string prefixed with a number to the default value', () => {
            expect((0, core_1.numberAttribute)('123pink')).toBeNaN();
            expect((0, core_1.numberAttribute)('123pink', 111)).toBe(111);
        });
        it('should coerce the number 1 to 1', () => {
            expect((0, core_1.numberAttribute)(1)).toBe(1);
            expect((0, core_1.numberAttribute)(1, 111)).toBe(1);
        });
        it('should coerce the number 123.456 to 123.456', () => {
            expect((0, core_1.numberAttribute)(123.456)).toBe(123.456);
            expect((0, core_1.numberAttribute)(123.456, 111)).toBe(123.456);
        });
        it('should coerce the number -123.456 to -123.456', () => {
            expect((0, core_1.numberAttribute)(-123.456)).toBe(-123.456);
            expect((0, core_1.numberAttribute)(-123.456, 111)).toBe(-123.456);
        });
        it('should coerce an object to the default value', () => {
            expect((0, core_1.numberAttribute)({})).toBeNaN();
            expect((0, core_1.numberAttribute)({}, 111)).toBe(111);
        });
        it('should coerce an array to the default value', () => {
            expect((0, core_1.numberAttribute)([])).toBeNaN();
            expect((0, core_1.numberAttribute)([], 111)).toBe(111);
        });
    });
});
