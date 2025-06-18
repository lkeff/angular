"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const index_1 = require("../index");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const validators_1 = require("../src/validators");
(function () {
    function validator(key, error) {
        return (c) => {
            const r = {};
            r[key] = error;
            return r;
        };
    }
    class AsyncValidatorDirective {
        constructor(expected, error) {
            this.expected = expected;
            this.error = error;
        }
        validate(c) {
            return new rxjs_1.Observable((obs) => {
                const error = this.expected !== c.value ? this.error : null;
                obs.next(error);
                obs.complete();
            });
        }
    }
    describe('Validators', () => {
        describe('min', () => {
            it('should not error on an empty string', () => {
                expect(index_1.Validators.min(2)(new index_1.FormControl(''))).toBeNull();
            });
            it('should not error on null', () => {
                expect(index_1.Validators.min(2)(new index_1.FormControl(null))).toBeNull();
            });
            it('should not error on undefined', () => {
                expect(index_1.Validators.min(2)(new index_1.FormControl(undefined))).toBeNull();
            });
            it('should return null if NaN after parsing', () => {
                expect(index_1.Validators.min(2)(new index_1.FormControl('a'))).toBeNull();
            });
            it('should return a validation error on small values', () => {
                expect(index_1.Validators.min(2)(new index_1.FormControl(1))).toEqual({ 'min': { 'min': 2, 'actual': 1 } });
            });
            it('should return a validation error on small values converted from strings', () => {
                expect(index_1.Validators.min(2)(new index_1.FormControl('1'))).toEqual({ 'min': { 'min': 2, 'actual': '1' } });
            });
            it('should not error on small float number validation', () => {
                expect(index_1.Validators.min(1.2)(new index_1.FormControl(1.25))).toBeNull();
            });
            it('should not error on equal float values', () => {
                expect(index_1.Validators.min(1.25)(new index_1.FormControl(1.25))).toBeNull();
            });
            it('should return a validation error on big values', () => {
                expect(index_1.Validators.min(1.25)(new index_1.FormControl(1.2))).toEqual({
                    'min': { 'min': 1.25, 'actual': 1.2 },
                });
            });
            it('should not error on big values', () => {
                expect(index_1.Validators.min(2)(new index_1.FormControl(3))).toBeNull();
            });
            it('should not error on equal values', () => {
                expect(index_1.Validators.min(2)(new index_1.FormControl(2))).toBeNull();
            });
            it('should not error on equal values when value is string', () => {
                expect(index_1.Validators.min(2)(new index_1.FormControl('2'))).toBeNull();
            });
            it('should validate as expected when min value is a string', () => {
                expect(index_1.Validators.min('2')(new index_1.FormControl(1))).toEqual({
                    'min': { 'min': '2', 'actual': 1 },
                });
            });
            it('should return null if min value is undefined', () => {
                expect(index_1.Validators.min(undefined)(new index_1.FormControl(3))).toBeNull();
            });
            it('should return null if min value is null', () => {
                expect(index_1.Validators.min(null)(new index_1.FormControl(3))).toBeNull();
            });
        });
        describe('max', () => {
            it('should not error on an empty string', () => {
                expect(index_1.Validators.max(2)(new index_1.FormControl(''))).toBeNull();
            });
            it('should not error on null', () => {
                expect(index_1.Validators.max(2)(new index_1.FormControl(null))).toBeNull();
            });
            it('should not error on undefined', () => {
                expect(index_1.Validators.max(2)(new index_1.FormControl(undefined))).toBeNull();
            });
            it('should return null if NaN after parsing', () => {
                expect(index_1.Validators.max(2)(new index_1.FormControl('aaa'))).toBeNull();
            });
            it('should not error on small float number validation', () => {
                expect(index_1.Validators.max(1.2)(new index_1.FormControl(1.15))).toBeNull();
            });
            it('should not error on equal float values', () => {
                expect(index_1.Validators.max(1.25)(new index_1.FormControl(1.25))).toBeNull();
            });
            it('should return a validation error on big values', () => {
                expect(index_1.Validators.max(1.25)(new index_1.FormControl(1.3))).toEqual({
                    'max': { 'max': 1.25, 'actual': 1.3 },
                });
            });
            it('should return a validation error on big values', () => {
                expect(index_1.Validators.max(2)(new index_1.FormControl(3))).toEqual({ 'max': { 'max': 2, 'actual': 3 } });
            });
            it('should return a validation error on big values converted from strings', () => {
                expect(index_1.Validators.max(2)(new index_1.FormControl('3'))).toEqual({ 'max': { 'max': 2, 'actual': '3' } });
            });
            it('should not error on small values', () => {
                expect(index_1.Validators.max(2)(new index_1.FormControl(1))).toBeNull();
            });
            it('should not error on equal values', () => {
                expect(index_1.Validators.max(2)(new index_1.FormControl(2))).toBeNull();
            });
            it('should not error on equal values when value is string', () => {
                expect(index_1.Validators.max(2)(new index_1.FormControl('2'))).toBeNull();
            });
            it('should validate as expected when max value is a string', () => {
                expect(index_1.Validators.max('2')(new index_1.FormControl(3))).toEqual({
                    'max': { 'max': '2', 'actual': 3 },
                });
            });
            it('should return null if max value is undefined', () => {
                expect(index_1.Validators.max(undefined)(new index_1.FormControl(3))).toBeNull();
            });
            it('should return null if max value is null', () => {
                expect(index_1.Validators.max(null)(new index_1.FormControl(3))).toBeNull();
            });
        });
        describe('required', () => {
            it('should error on an empty string', () => {
                expect(index_1.Validators.required(new index_1.FormControl(''))).toEqual({ 'required': true });
            });
            it('should error on null', () => {
                expect(index_1.Validators.required(new index_1.FormControl(null))).toEqual({ 'required': true });
            });
            it('should not error on undefined', () => {
                expect(index_1.Validators.required(new index_1.FormControl(undefined))).toEqual({ 'required': true });
            });
            it('should not error on a non-empty string', () => {
                expect(index_1.Validators.required(new index_1.FormControl('not empty'))).toBeNull();
            });
            it('should accept zero as valid', () => {
                expect(index_1.Validators.required(new index_1.FormControl(0))).toBeNull();
            });
            it('should error on an empty array', () => expect(index_1.Validators.required(new index_1.FormControl([]))).toEqual({ 'required': true }));
            it('should not error on a non-empty array', () => expect(index_1.Validators.required(new index_1.FormControl([1, 2]))).toBeNull());
            it('should not error on an object containing a length attribute that is zero', () => {
                expect(index_1.Validators.required(new index_1.FormControl({ id: 1, length: 0, width: 0 }))).toBeNull();
            });
            it('should error on an empty set', () => {
                expect(index_1.Validators.required(new index_1.FormControl(new Set()))).toEqual({ 'required': true });
            });
            it('should not error on a non-empty set', () => {
                expect(index_1.Validators.required(new index_1.FormControl(new Set([1, 2])))).toBeNull();
            });
            it('should not error on an object containing a size attribute that is zero', () => {
                expect(index_1.Validators.required(new index_1.FormControl({ id: 1, size: 0, width: 0 }))).toBeNull();
            });
        });
        describe('requiredTrue', () => {
            it('should error on false', () => expect(index_1.Validators.requiredTrue(new index_1.FormControl(false))).toEqual({ 'required': true }));
            it('should not error on true', () => expect(index_1.Validators.requiredTrue(new index_1.FormControl(true))).toBeNull());
        });
        describe('email', () => {
            it('should not error on an empty string', () => expect(index_1.Validators.email(new index_1.FormControl(''))).toBeNull());
            it('should not error on null', () => expect(index_1.Validators.email(new index_1.FormControl(null))).toBeNull());
            it('should error on invalid email', () => expect(index_1.Validators.email(new index_1.FormControl('some text'))).toEqual({ 'email': true }));
            it('should not error on valid email', () => expect(index_1.Validators.email(new index_1.FormControl('test@gmail.com'))).toBeNull());
        });
        describe('minLength', () => {
            it('should not error on an empty string', () => {
                expect(index_1.Validators.minLength(2)(new index_1.FormControl(''))).toBeNull();
            });
            it('should not error on null', () => {
                expect(index_1.Validators.minLength(2)(new index_1.FormControl(null))).toBeNull();
            });
            it('should not error on undefined', () => {
                expect(index_1.Validators.minLength(2)(new index_1.FormControl(undefined))).toBeNull();
            });
            it('should not error on empty array', () => {
                expect(index_1.Validators.minLength(2)(new index_1.FormControl([]))).toBeNull();
            });
            it('should not error on valid strings', () => {
                expect(index_1.Validators.minLength(2)(new index_1.FormControl('aa'))).toBeNull();
            });
            it('should error on short strings', () => {
                expect(index_1.Validators.minLength(2)(new index_1.FormControl('a'))).toEqual({
                    'minlength': { 'requiredLength': 2, 'actualLength': 1 },
                });
            });
            it('should not error when FormArray has valid length', () => {
                const fa = new index_1.FormArray([new index_1.FormControl(''), new index_1.FormControl('')]);
                expect(index_1.Validators.minLength(2)(fa)).toBeNull();
            });
            it('should error when FormArray has invalid length', () => {
                const fa = new index_1.FormArray([new index_1.FormControl('')]);
                expect(index_1.Validators.minLength(2)(fa)).toEqual({
                    'minlength': { 'requiredLength': 2, 'actualLength': 1 },
                });
            });
            it('should always return null with numeric values', () => {
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(0))).toBeNull();
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(1))).toBeNull();
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(-1))).toBeNull();
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(+1))).toBeNull();
            });
            it('should trigger validation for an object that contains numeric length property', () => {
                const value = { length: 5, someValue: [1, 2, 3, 4, 5] };
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(value))).toBeNull();
                expect(index_1.Validators.minLength(10)(new index_1.FormControl(value))).toEqual({
                    'minlength': { 'requiredLength': 10, 'actualLength': 5 },
                });
            });
            it('should return null when passing a boolean', () => {
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(true))).toBeNull();
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(false))).toBeNull();
            });
            it('should trigger validation for an object that contains numeric size property', () => {
                const value = new Set([1, 2, 3, 4, 5]);
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(value))).toBeNull();
                expect(index_1.Validators.minLength(10)(new index_1.FormControl(value))).toEqual({
                    'minlength': { 'requiredLength': 10, 'actualLength': 5 },
                });
            });
            it('should not error on empty set', () => {
                const value = new Set();
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(value))).toBeNull();
            });
            it('should return null when passing a boolean', () => {
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(true))).toBeNull();
                expect(index_1.Validators.minLength(1)(new index_1.FormControl(false))).toBeNull();
            });
        });
        describe('maxLength', () => {
            it('should not error on an empty string', () => {
                expect(index_1.Validators.maxLength(2)(new index_1.FormControl(''))).toBeNull();
            });
            it('should not error on null', () => {
                expect(index_1.Validators.maxLength(2)(new index_1.FormControl(null))).toBeNull();
            });
            it('should not error on undefined', () => {
                expect(index_1.Validators.maxLength(2)(new index_1.FormControl(undefined))).toBeNull();
            });
            it('should not error on valid strings', () => {
                expect(index_1.Validators.maxLength(2)(new index_1.FormControl('aa'))).toBeNull();
            });
            it('should error on long strings', () => {
                expect(index_1.Validators.maxLength(2)(new index_1.FormControl('aaa'))).toEqual({
                    'maxlength': { 'requiredLength': 2, 'actualLength': 3 },
                });
            });
            it('should not error when FormArray has valid length', () => {
                const fa = new index_1.FormArray([new index_1.FormControl(''), new index_1.FormControl('')]);
                expect(index_1.Validators.maxLength(2)(fa)).toBeNull();
            });
            it('should error when FormArray has invalid length', () => {
                const fa = new index_1.FormArray([new index_1.FormControl(''), new index_1.FormControl('')]);
                expect(index_1.Validators.maxLength(1)(fa)).toEqual({
                    'maxlength': { 'requiredLength': 1, 'actualLength': 2 },
                });
            });
            it('should always return null with numeric values', () => {
                expect(index_1.Validators.maxLength(1)(new index_1.FormControl(0))).toBeNull();
                expect(index_1.Validators.maxLength(1)(new index_1.FormControl(1))).toBeNull();
                expect(index_1.Validators.maxLength(1)(new index_1.FormControl(-1))).toBeNull();
                expect(index_1.Validators.maxLength(1)(new index_1.FormControl(+1))).toBeNull();
            });
            it('should trigger validation for an object that contains numeric length property', () => {
                const value = { length: 5, someValue: [1, 2, 3, 4, 5] };
                expect(index_1.Validators.maxLength(10)(new index_1.FormControl(value))).toBeNull();
                expect(index_1.Validators.maxLength(1)(new index_1.FormControl(value))).toEqual({
                    'maxlength': { 'requiredLength': 1, 'actualLength': 5 },
                });
            });
            it('should trigger validation for an object that contains numeric length property', () => {
                const value = { length: 5, someValue: [1, 2, 3, 4, 5] };
                expect(index_1.Validators.maxLength(10)(new index_1.FormControl(value))).toBeNull();
                expect(index_1.Validators.maxLength(1)(new index_1.FormControl(value))).toEqual({
                    'maxlength': { 'requiredLength': 1, 'actualLength': 5 },
                });
            });
            it('should trigger validation for an object that contains numeric size property', () => {
                const value = new Set([1, 2, 3, 4, 5]);
                expect(index_1.Validators.maxLength(10)(new index_1.FormControl(value))).toBeNull();
                expect(index_1.Validators.maxLength(1)(new index_1.FormControl(value))).toEqual({
                    'maxlength': { 'requiredLength': 1, 'actualLength': 5 },
                });
            });
            it('should return null when passing a boolean', () => {
                expect(index_1.Validators.maxLength(1)(new index_1.FormControl(true))).toBeNull();
                expect(index_1.Validators.maxLength(1)(new index_1.FormControl(false))).toBeNull();
            });
        });
        describe('pattern', () => {
            it('should not error on an empty string', () => {
                expect(index_1.Validators.pattern('[a-zA-Z ]+')(new index_1.FormControl(''))).toBeNull();
            });
            it('should not error on null', () => {
                expect(index_1.Validators.pattern('[a-zA-Z ]+')(new index_1.FormControl(null))).toBeNull();
            });
            it('should not error on undefined', () => {
                expect(index_1.Validators.pattern('[a-zA-Z ]+')(new index_1.FormControl(undefined))).toBeNull();
            });
            it('should not error on null value and "null" pattern', () => {
                expect(index_1.Validators.pattern('null')(new index_1.FormControl(null))).toBeNull();
            });
            it('should not error on valid strings', () => expect(index_1.Validators.pattern('[a-zA-Z ]*')(new index_1.FormControl('aaAA'))).toBeNull());
            it('should error on failure to match string', () => {
                expect(index_1.Validators.pattern('[a-zA-Z ]*')(new index_1.FormControl('aaa0'))).toEqual({
                    'pattern': { 'requiredPattern': '^[a-zA-Z ]*$', 'actualValue': 'aaa0' },
                });
            });
            it('should accept RegExp object', () => {
                const pattern = new RegExp('[a-zA-Z ]+');
                expect(index_1.Validators.pattern(pattern)(new index_1.FormControl('aaAA'))).toBeNull();
            });
            it('should error on failure to match RegExp object', () => {
                const pattern = new RegExp('^[a-zA-Z ]*$');
                expect(index_1.Validators.pattern(pattern)(new index_1.FormControl('aaa0'))).toEqual({
                    'pattern': { 'requiredPattern': '/^[a-zA-Z ]*$/', 'actualValue': 'aaa0' },
                });
            });
            it('should not error on "null" pattern', () => expect(index_1.Validators.pattern(null)(new index_1.FormControl('aaAA'))).toBeNull());
            it('should not error on "undefined" pattern', () => expect(index_1.Validators.pattern(undefined)(new index_1.FormControl('aaAA'))).toBeNull());
            it('should work with pattern string containing both boundary symbols', () => expect(index_1.Validators.pattern('^[aA]*$')(new index_1.FormControl('aaAA'))).toBeNull());
            it('should work with pattern string containing only start boundary symbols', () => expect(index_1.Validators.pattern('^[aA]*')(new index_1.FormControl('aaAA'))).toBeNull());
            it('should work with pattern string containing only end boundary symbols', () => expect(index_1.Validators.pattern('[aA]*$')(new index_1.FormControl('aaAA'))).toBeNull());
            it('should work with pattern string not containing any boundary symbols', () => expect(index_1.Validators.pattern('[aA]*')(new index_1.FormControl('aaAA'))).toBeNull());
        });
        describe('compose', () => {
            it('should return null when given null', () => {
                expect(index_1.Validators.compose(null)).toBe(null);
            });
            it('should collect errors from all the validators', () => {
                const c = index_1.Validators.compose([validator('a', true), validator('b', true)]);
                expect(c(new index_1.FormControl(''))).toEqual({ 'a': true, 'b': true });
            });
            it('should run validators left to right', () => {
                const c = index_1.Validators.compose([validator('a', 1), validator('a', 2)]);
                expect(c(new index_1.FormControl(''))).toEqual({ 'a': 2 });
            });
            it('should return null when no errors', () => {
                const c = index_1.Validators.compose([index_1.Validators.nullValidator, index_1.Validators.nullValidator]);
                expect(c(new index_1.FormControl(''))).toBeNull();
            });
            it('should ignore nulls', () => {
                const c = index_1.Validators.compose([null, index_1.Validators.required]);
                expect(c(new index_1.FormControl(''))).toEqual({ 'required': true });
            });
        });
        describe('composeAsync', () => {
            describe('promises', () => {
                function promiseValidator(response) {
                    return (c) => {
                        const res = c.value != 'expected' ? response : null;
                        return Promise.resolve(res);
                    };
                }
                it('should return null when given null', () => {
                    expect(index_1.Validators.composeAsync(null)).toBeNull();
                });
                it('should collect errors from all the validators', (0, testing_1.fakeAsync)(() => {
                    const v = index_1.Validators.composeAsync([
                        promiseValidator({ 'one': true }),
                        promiseValidator({ 'two': true }),
                    ]);
                    let errorMap = null;
                    v(new index_1.FormControl('invalid'))
                        .pipe((0, operators_1.first)())
                        .subscribe((errors) => (errorMap = errors));
                    (0, testing_1.tick)();
                    expect(errorMap).toEqual({ 'one': true, 'two': true });
                }));
                it('should normalize and evaluate async validator-directives correctly', (0, testing_1.fakeAsync)(() => {
                    const normalizedValidators = (0, validators_1.normalizeValidators)([
                        new AsyncValidatorDirective('expected', { 'one': true }),
                    ]);
                    const validatorFn = index_1.Validators.composeAsync(normalizedValidators);
                    let errorMap = null;
                    validatorFn(new index_1.FormControl('invalid'))
                        .pipe((0, operators_1.first)())
                        .subscribe((errors) => (errorMap = errors));
                    (0, testing_1.tick)();
                    expect(errorMap).toEqual({ 'one': true });
                }));
                it('should return null when no errors', (0, testing_1.fakeAsync)(() => {
                    const v = index_1.Validators.composeAsync([promiseValidator({ 'one': true })]);
                    let errorMap = undefined;
                    v(new index_1.FormControl('expected'))
                        .pipe((0, operators_1.first)())
                        .subscribe((errors) => (errorMap = errors));
                    (0, testing_1.tick)();
                    expect(errorMap).toBeNull();
                }));
                it('should ignore nulls', (0, testing_1.fakeAsync)(() => {
                    const v = index_1.Validators.composeAsync([promiseValidator({ 'one': true }), null]);
                    let errorMap = null;
                    v(new index_1.FormControl('invalid'))
                        .pipe((0, operators_1.first)())
                        .subscribe((errors) => (errorMap = errors));
                    (0, testing_1.tick)();
                    expect(errorMap).toEqual({ 'one': true });
                }));
            });
            describe('observables', () => {
                function observableValidator(response) {
                    return (c) => {
                        const res = c.value != 'expected' ? response : null;
                        return (0, rxjs_1.of)(res);
                    };
                }
                it('should return null when given null', () => {
                    expect(index_1.Validators.composeAsync(null)).toBeNull();
                });
                it('should collect errors from all the validators', () => {
                    const v = index_1.Validators.composeAsync([
                        observableValidator({ 'one': true }),
                        observableValidator({ 'two': true }),
                    ]);
                    let errorMap = null;
                    v(new index_1.FormControl('invalid'))
                        .pipe((0, operators_1.first)())
                        .subscribe((errors) => (errorMap = errors));
                    expect(errorMap).toEqual({ 'one': true, 'two': true });
                });
                it('should normalize and evaluate async validator-directives correctly', () => {
                    const normalizedValidators = (0, validators_1.normalizeValidators)([
                        new AsyncValidatorDirective('expected', { 'one': true }),
                    ]);
                    const validatorFn = index_1.Validators.composeAsync(normalizedValidators);
                    let errorMap = null;
                    validatorFn(new index_1.FormControl('invalid'))
                        .pipe((0, operators_1.first)())
                        .subscribe((errors) => (errorMap = errors));
                    expect(errorMap).toEqual({ 'one': true });
                });
                it('should return null when no errors', () => {
                    const v = index_1.Validators.composeAsync([observableValidator({ 'one': true })]);
                    let errorMap = undefined;
                    v(new index_1.FormControl('expected'))
                        .pipe((0, operators_1.first)())
                        .subscribe((errors) => (errorMap = errors));
                    expect(errorMap).toBeNull();
                });
                it('should ignore nulls', () => {
                    const v = index_1.Validators.composeAsync([observableValidator({ 'one': true }), null]);
                    let errorMap = null;
                    v(new index_1.FormControl('invalid'))
                        .pipe((0, operators_1.first)())
                        .subscribe((errors) => (errorMap = errors));
                    expect(errorMap).toEqual({ 'one': true });
                });
                it('should wait for all validators before setting errors', (0, testing_1.fakeAsync)(() => {
                    function getTimerObs(time, errorMap) {
                        return (c) => {
                            return (0, rxjs_1.timer)(time).pipe((0, operators_1.map)(() => errorMap));
                        };
                    }
                    const v = index_1.Validators.composeAsync([
                        getTimerObs(100, { one: true }),
                        getTimerObs(200, { two: true }),
                    ]);
                    let errorMap = undefined;
                    v(new index_1.FormControl('invalid'))
                        .pipe((0, operators_1.first)())
                        .subscribe((errors) => (errorMap = errors));
                    (0, testing_1.tick)(100);
                    expect(errorMap).not.toBeDefined(`Expected errors not to be set until all validators came back.`);
                    (0, testing_1.tick)(100);
                    expect(errorMap)
                        .withContext(`Expected errors to merge once all validators resolved.`)
                        .toEqual({ one: true, two: true });
                }));
            });
        });
    });
})();
