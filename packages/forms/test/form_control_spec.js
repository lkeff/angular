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
const util_1 = require("./util");
(function () {
    function otherAsyncValidator() {
        return Promise.resolve({ 'other': true });
    }
    function syncValidator() {
        return null;
    }
    describe('FormControl', () => {
        it('should default the value to null', () => {
            const c = new index_1.FormControl();
            expect(c.value).toBe(null);
        });
        describe('markAllAsDirty', () => {
            it('should mark only the control itself as dirty', () => {
                const control = new index_1.FormControl('');
                expect(control.dirty).toBe(false);
                control.markAllAsDirty();
                expect(control.dirty).toBe(true);
            });
        });
        describe('markAllAsTouched', () => {
            it('should mark only the control itself as touched', () => {
                const control = new index_1.FormControl('');
                expect(control.touched).toBe(false);
                control.markAllAsTouched();
                expect(control.touched).toBe(true);
            });
        });
        describe('boxed values', () => {
            it('should support valid boxed values on creation', () => {
                const c = new index_1.FormControl({ value: 'some val', disabled: true }, null, null);
                expect(c.disabled).toBe(true);
                expect(c.value).toBe('some val');
                expect(c.status).toBe('DISABLED');
            });
            it('should not treat objects as boxed values when `disabled` field is present, but `value` is missing', () => {
                const c = new index_1.FormControl({ disabled: true });
                expect(c.value).toEqual({ disabled: true });
                expect(c.disabled).toBe(false);
            });
            it('should honor boxed value with disabled control when validating', () => {
                const c = new index_1.FormControl({ value: '', disabled: true }, index_1.Validators.required);
                expect(c.disabled).toBe(true);
                expect(c.valid).toBe(false);
                expect(c.status).toBe('DISABLED');
            });
            it('should not treat objects as boxed values if they have more than two props', () => {
                const c = new index_1.FormControl({ value: '', disabled: true, test: 'test' }, null, null);
                expect(c.value).toEqual({ value: '', disabled: true, test: 'test' });
                expect(c.disabled).toBe(false);
            });
            it('should not treat objects as boxed values if disabled is missing', () => {
                const c = new index_1.FormControl({ value: '', test: 'test' }, null, null);
                expect(c.value).toEqual({ value: '', test: 'test' });
                expect(c.disabled).toBe(false);
            });
        });
        describe('updateOn', () => {
            it('should default to on change', () => {
                const c = new index_1.FormControl('');
                expect(c.updateOn).toEqual('change');
            });
            it('should default to on change with an options obj', () => {
                const c = new index_1.FormControl('', { validators: index_1.Validators.required });
                expect(c.updateOn).toEqual('change');
            });
            it('should set updateOn when updating on blur', () => {
                const c = new index_1.FormControl('', { updateOn: 'blur' });
                expect(c.updateOn).toEqual('blur');
            });
            describe('in groups and arrays', () => {
                it('should default to group updateOn when not set in control', () => {
                    const g = new index_1.FormGroup({ one: new index_1.FormControl(), two: new index_1.FormControl() }, { updateOn: 'blur' });
                    expect(g.get('one').updateOn).toEqual('blur');
                    expect(g.get('two').updateOn).toEqual('blur');
                });
                it('should default to array updateOn when not set in control', () => {
                    const a = new index_1.FormArray([new index_1.FormControl(), new index_1.FormControl()], { updateOn: 'blur' });
                    expect(a.get([0]).updateOn).toEqual('blur');
                    expect(a.get([1]).updateOn).toEqual('blur');
                });
                it('should set updateOn with nested groups', () => {
                    const g = new index_1.FormGroup({
                        group: new index_1.FormGroup({ one: new index_1.FormControl(), two: new index_1.FormControl() }),
                    }, { updateOn: 'blur' });
                    expect(g.get('group.one').updateOn).toEqual('blur');
                    expect(g.get('group.two').updateOn).toEqual('blur');
                    expect(g.get('group').updateOn).toEqual('blur');
                });
                it('should set updateOn with nested arrays', () => {
                    const g = new index_1.FormGroup({
                        arr: new index_1.FormArray([new index_1.FormControl(), new index_1.FormControl()]),
                    }, { updateOn: 'blur' });
                    expect(g.get(['arr', 0]).updateOn).toEqual('blur');
                    expect(g.get(['arr', 1]).updateOn).toEqual('blur');
                    expect(g.get('arr').updateOn).toEqual('blur');
                });
                it('should allow control updateOn to override group updateOn', () => {
                    const g = new index_1.FormGroup({ one: new index_1.FormControl('', { updateOn: 'change' }), two: new index_1.FormControl() }, { updateOn: 'blur' });
                    expect(g.get('one').updateOn).toEqual('change');
                    expect(g.get('two').updateOn).toEqual('blur');
                });
                it('should set updateOn with complex setup', () => {
                    const g = new index_1.FormGroup({
                        group: new index_1.FormGroup({ one: new index_1.FormControl('', { updateOn: 'change' }), two: new index_1.FormControl() }, { updateOn: 'blur' }),
                        groupTwo: new index_1.FormGroup({ one: new index_1.FormControl() }, { updateOn: 'submit' }),
                        three: new index_1.FormControl(),
                    });
                    expect(g.get('group.one').updateOn).toEqual('change');
                    expect(g.get('group.two').updateOn).toEqual('blur');
                    expect(g.get('groupTwo.one').updateOn).toEqual('submit');
                    expect(g.get('three').updateOn).toEqual('change');
                });
            });
        });
        describe('validator', () => {
            it('should run validator with the initial value', () => {
                const c = new index_1.FormControl('value', index_1.Validators.required);
                expect(c.valid).toEqual(true);
            });
            it('should rerun the validator when the value changes', () => {
                const c = new index_1.FormControl('value', index_1.Validators.required);
                c.setValue(null);
                expect(c.valid).toEqual(false);
            });
            it('should support arrays of validator functions if passed', () => {
                const c = new index_1.FormControl('value', [index_1.Validators.required, index_1.Validators.minLength(3)]);
                c.setValue('a');
                expect(c.valid).toEqual(false);
                c.setValue('aaa');
                expect(c.valid).toEqual(true);
            });
            it('should support single validator from options obj', () => {
                const c = new index_1.FormControl(null, { validators: index_1.Validators.required });
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ required: true });
                c.setValue('value');
                expect(c.valid).toEqual(true);
            });
            it('should support multiple validators from options obj', () => {
                const c = new index_1.FormControl(null, {
                    validators: [index_1.Validators.required, index_1.Validators.minLength(3)],
                });
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ required: true });
                c.setValue('aa');
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ minlength: { requiredLength: 3, actualLength: 2 } });
                c.setValue('aaa');
                expect(c.valid).toEqual(true);
            });
            it('should support a null validators value', () => {
                const c = new index_1.FormControl(null, { validators: null });
                expect(c.valid).toEqual(true);
            });
            it('should support an empty options obj', () => {
                const c = new index_1.FormControl(null, {});
                expect(c.valid).toEqual(true);
            });
            it('should return errors', () => {
                const c = new index_1.FormControl(null, index_1.Validators.required);
                expect(c.errors).toEqual({ 'required': true });
            });
            it('should set single validator', () => {
                const c = new index_1.FormControl(null);
                expect(c.valid).toEqual(true);
                c.setValidators(index_1.Validators.required);
                c.setValue(null);
                expect(c.valid).toEqual(false);
                c.setValue('abc');
                expect(c.valid).toEqual(true);
            });
            it('should set multiple validators from array', () => {
                const c = new index_1.FormControl('');
                expect(c.valid).toEqual(true);
                c.setValidators([index_1.Validators.minLength(5), index_1.Validators.required]);
                c.setValue('');
                expect(c.valid).toEqual(false);
                c.setValue('abc');
                expect(c.valid).toEqual(false);
                c.setValue('abcde');
                expect(c.valid).toEqual(true);
            });
            it('should override validators using `setValidators` function', () => {
                const c = new index_1.FormControl('');
                expect(c.valid).toEqual(true);
                c.setValidators([index_1.Validators.minLength(5), index_1.Validators.required]);
                c.setValue('');
                expect(c.valid).toEqual(false);
                c.setValue('abc');
                expect(c.valid).toEqual(false);
                c.setValue('abcde');
                expect(c.valid).toEqual(true);
                // Define new set of validators, overriding previously applied ones.
                c.setValidators([index_1.Validators.maxLength(2)]);
                c.setValue('abcdef');
                expect(c.valid).toEqual(false);
                c.setValue('a');
                expect(c.valid).toEqual(true);
            });
            it('should not mutate the validators array when overriding using setValidators', () => {
                const control = new index_1.FormControl('');
                const originalValidators = [index_1.Validators.required];
                control.setValidators(originalValidators);
                control.addValidators(index_1.Validators.minLength(10));
                expect(originalValidators.length).toBe(1);
            });
            it('should override validators by setting `control.validator` field value', () => {
                const c = new index_1.FormControl('');
                expect(c.valid).toEqual(true);
                // Define new set of validators, overriding previously applied ones.
                c.validator = index_1.Validators.compose([index_1.Validators.minLength(5), index_1.Validators.required]);
                c.setValue('');
                expect(c.valid).toEqual(false);
                c.setValue('abc');
                expect(c.valid).toEqual(false);
                c.setValue('abcde');
                expect(c.valid).toEqual(true);
                // Define new set of validators, overriding previously applied ones.
                c.validator = index_1.Validators.compose([index_1.Validators.maxLength(2)]);
                c.setValue('abcdef');
                expect(c.valid).toEqual(false);
                c.setValue('a');
                expect(c.valid).toEqual(true);
            });
            it('should clear validators', () => {
                const c = new index_1.FormControl('', index_1.Validators.required);
                expect(c.valid).toEqual(false);
                c.clearValidators();
                expect(c.validator).toEqual(null);
                c.setValue('');
                expect(c.valid).toEqual(true);
            });
            it('should add after clearing', () => {
                const c = new index_1.FormControl('', index_1.Validators.required);
                expect(c.valid).toEqual(false);
                c.clearValidators();
                expect(c.validator).toEqual(null);
                c.setValidators([index_1.Validators.required]);
                expect(c.validator).not.toBe(null);
            });
            it('should check presence of and remove a validator set in the control constructor', () => {
                const c = new index_1.FormControl('', index_1.Validators.required);
                expect(c.hasValidator(index_1.Validators.required)).toEqual(true);
                c.removeValidators(index_1.Validators.required);
                expect(c.hasValidator(index_1.Validators.required)).toEqual(false);
                c.addValidators(index_1.Validators.required);
                expect(c.hasValidator(index_1.Validators.required)).toEqual(true);
            });
            it('should check presence of and remove a validator set with addValidators', () => {
                const c = new index_1.FormControl('');
                expect(c.hasValidator(index_1.Validators.required)).toEqual(false);
                c.addValidators(index_1.Validators.required);
                expect(c.hasValidator(index_1.Validators.required)).toEqual(true);
                c.removeValidators(index_1.Validators.required);
                expect(c.hasValidator(index_1.Validators.required)).toEqual(false);
            });
            it('should check presence of and remove multiple validators set at the same time', () => {
                const c = new index_1.FormControl('3');
                const minValidator = index_1.Validators.min(4);
                c.addValidators([index_1.Validators.required, minValidator]);
                expect(c.hasValidator(index_1.Validators.required)).toEqual(true);
                expect(c.hasValidator(minValidator)).toEqual(true);
                c.removeValidators([index_1.Validators.required, minValidator]);
                expect(c.hasValidator(index_1.Validators.required)).toEqual(false);
                expect(c.hasValidator(minValidator)).toEqual(false);
            });
            it('should be able to remove a validator added multiple times', () => {
                const c = new index_1.FormControl('', index_1.Validators.required);
                c.addValidators(index_1.Validators.required);
                c.addValidators(index_1.Validators.required);
                expect(c.hasValidator(index_1.Validators.required)).toEqual(true);
                c.removeValidators(index_1.Validators.required);
                expect(c.hasValidator(index_1.Validators.required)).toEqual(false);
            });
            it('should not mutate the validators array when adding/removing sync validators', () => {
                const originalValidators = [index_1.Validators.required];
                const control = new index_1.FormControl('', originalValidators);
                control.addValidators(index_1.Validators.min(10));
                expect(originalValidators.length).toBe(1);
                control.removeValidators(index_1.Validators.required);
                expect(originalValidators.length).toBe(1);
            });
            it('should not mutate the validators array when adding/removing async validators', () => {
                const firstValidator = (0, util_1.asyncValidator)('one');
                const secondValidator = (0, util_1.asyncValidator)('two');
                const originalValidators = [firstValidator];
                const control = new index_1.FormControl('', null, originalValidators);
                control.addAsyncValidators(secondValidator);
                expect(originalValidators.length).toBe(1);
                control.removeAsyncValidators(firstValidator);
                expect(originalValidators.length).toBe(1);
            });
            it('should return false when checking presence of a validator not identical by reference', () => {
                const minValidator = index_1.Validators.min(5);
                const c = new index_1.FormControl('1', minValidator);
                expect(c.hasValidator(minValidator)).toEqual(true);
                expect(c.hasValidator(index_1.Validators.min(5))).toEqual(false);
            });
        });
        describe('asyncValidator', () => {
            it('should run validator with the initial value', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', null, (0, util_1.asyncValidator)('expected'));
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ 'async': true });
            }));
            it('should support validators returning observables', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', null, util_1.asyncValidatorReturningObservable);
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ 'async': true });
            }));
            it('should rerun the validator when the value changes', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', null, (0, util_1.asyncValidator)('expected'));
                c.setValue('expected');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(true);
            }));
            it('should run the async validator only when the sync validator passes', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('', index_1.Validators.required, (0, util_1.asyncValidator)('expected'));
                (0, testing_1.tick)();
                expect(c.errors).toEqual({ 'required': true });
                c.setValue('some value');
                (0, testing_1.tick)();
                expect(c.errors).toEqual({ 'async': true });
            }));
            it('should mark the control as pending while running the async validation', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('', null, (0, util_1.asyncValidator)('expected'));
                expect(c.pending).toEqual(true);
                (0, testing_1.tick)();
                expect(c.pending).toEqual(false);
            }));
            it('should only use the latest async validation run', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('', null, (0, util_1.asyncValidator)('expected', { 'long': 200, 'expected': 100 }));
                c.setValue('long');
                c.setValue('expected');
                (0, testing_1.tick)(300);
                expect(c.valid).toEqual(true);
            }));
            it('should support arrays of async validator functions if passed', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', null, [
                    (0, util_1.asyncValidator)('expected'),
                    otherAsyncValidator,
                ]);
                (0, testing_1.tick)();
                expect(c.errors).toEqual({ 'async': true, 'other': true });
            }));
            it('should support a single async validator from options obj', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', { asyncValidators: (0, util_1.asyncValidator)('expected') });
                expect(c.pending).toEqual(true);
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ 'async': true });
            }));
            it('should support multiple async validators from options obj', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', {
                    asyncValidators: [(0, util_1.asyncValidator)('expected'), otherAsyncValidator],
                });
                expect(c.pending).toEqual(true);
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ 'async': true, 'other': true });
            }));
            it('should support a mix of validators from options obj', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('', {
                    validators: index_1.Validators.required,
                    asyncValidators: (0, util_1.asyncValidator)('expected'),
                });
                (0, testing_1.tick)();
                expect(c.errors).toEqual({ required: true });
                c.setValue('value');
                expect(c.pending).toBe(true);
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ 'async': true });
            }));
            it('should add single async validator', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', null);
                c.setAsyncValidators((0, util_1.asyncValidator)('expected'));
                expect(c.asyncValidator).not.toEqual(null);
                c.setValue('expected');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(true);
            }));
            it('should add async validator from array', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', null);
                c.setAsyncValidators([(0, util_1.asyncValidator)('expected')]);
                expect(c.asyncValidator).not.toEqual(null);
                c.setValue('expected');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(true);
            }));
            it('should override validators using `setAsyncValidators` function', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('');
                expect(c.valid).toEqual(true);
                c.setAsyncValidators([(0, util_1.asyncValidator)('expected')]);
                c.setValue('');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                c.setValue('expected');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(true);
                // Define new set of validators, overriding previously applied ones.
                c.setAsyncValidators([(0, util_1.asyncValidator)('new expected')]);
                c.setValue('expected');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                c.setValue('new expected');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(true);
            }));
            it('should not mutate the validators array when overriding using setValidators', () => {
                const control = new index_1.FormControl('');
                const originalValidators = [(0, util_1.asyncValidator)('one')];
                control.setAsyncValidators(originalValidators);
                control.addAsyncValidators((0, util_1.asyncValidator)('two'));
                expect(originalValidators.length).toBe(1);
            });
            it('should override validators by setting `control.asyncValidator` field value', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('');
                expect(c.valid).toEqual(true);
                c.asyncValidator = index_1.Validators.composeAsync([(0, util_1.asyncValidator)('expected')]);
                c.setValue('');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                c.setValue('expected');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(true);
                // Define new set of validators, overriding previously applied ones.
                c.asyncValidator = index_1.Validators.composeAsync([(0, util_1.asyncValidator)('new expected')]);
                c.setValue('expected');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                c.setValue('new expected');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(true);
            }));
            it('should clear async validators', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', [(0, util_1.asyncValidator)('expected'), otherAsyncValidator]);
                c.clearValidators();
                expect(c.asyncValidator).toEqual(null);
            }));
            it('should not change validity state if control is disabled while async validating', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value', [(0, util_1.asyncValidator)('expected')]);
                c.disable();
                (0, testing_1.tick)();
                expect(c.status).toEqual('DISABLED');
            }));
            it('should check presence of and remove a validator set in the control constructor', () => {
                const asyncVal = (0, util_1.asyncValidator)('expected');
                const c = new index_1.FormControl('', null, asyncVal);
                expect(c.hasAsyncValidator(asyncVal)).toEqual(true);
                c.removeAsyncValidators(asyncVal);
                expect(c.hasAsyncValidator(asyncVal)).toEqual(false);
                c.addAsyncValidators(asyncVal);
                expect(c.hasAsyncValidator(asyncVal)).toEqual(true);
            });
            it('should check presence of and remove a validator set with addValidators', () => {
                const c = new index_1.FormControl('');
                const asyncVal = (0, util_1.asyncValidator)('expected');
                c.addAsyncValidators(asyncVal);
                expect(c.hasAsyncValidator(asyncVal)).toEqual(true);
                c.removeAsyncValidators(asyncVal);
                expect(c.hasAsyncValidator(asyncVal)).toEqual(false);
            });
            it('should check presence of and remove multiple validators set at the same time', () => {
                const c = new index_1.FormControl('3');
                const asyncVal1 = (0, util_1.asyncValidator)('expected1');
                const asyncVal2 = (0, util_1.asyncValidator)('expected2');
                c.addAsyncValidators([asyncVal1, asyncVal2]);
                expect(c.hasAsyncValidator(asyncVal1)).toEqual(true);
                expect(c.hasAsyncValidator(asyncVal2)).toEqual(true);
                c.removeAsyncValidators([asyncVal1, asyncVal2]);
                expect(c.hasAsyncValidator(asyncVal1)).toEqual(false);
                expect(c.hasAsyncValidator(asyncVal2)).toEqual(false);
            });
            it('should be able to remove a validator added multiple times', () => {
                const asyncVal = (0, util_1.asyncValidator)('expected');
                const c = new index_1.FormControl('', null, asyncVal);
                c.addAsyncValidators(asyncVal);
                c.addAsyncValidators(asyncVal);
                expect(c.hasAsyncValidator(asyncVal)).toEqual(true);
                c.removeAsyncValidators(asyncVal);
                expect(c.hasAsyncValidator(asyncVal)).toEqual(false);
            });
            it('should return false when checking presence of a validator not identical by reference', () => {
                const asyncVal = (0, util_1.asyncValidator)('expected');
                const asyncValDifferentFn = (0, util_1.asyncValidator)('expected');
                const c = new index_1.FormControl('1', null, asyncVal);
                expect(c.hasAsyncValidator(asyncVal)).toEqual(true);
                expect(c.hasAsyncValidator(asyncValDifferentFn)).toEqual(false);
            });
        });
        describe('dirty', () => {
            it('should be false after creating a control', () => {
                const c = new index_1.FormControl('value');
                expect(c.dirty).toEqual(false);
            });
            it('should be true after changing the value of the control', () => {
                const c = new index_1.FormControl('value');
                c.markAsDirty();
                expect(c.dirty).toEqual(true);
            });
        });
        describe('touched', () => {
            it('should be false after creating a control', () => {
                const c = new index_1.FormControl('value');
                expect(c.touched).toEqual(false);
            });
            it('should be true after markAsTouched runs', () => {
                const c = new index_1.FormControl('value');
                c.markAsTouched();
                expect(c.touched).toEqual(true);
            });
        });
        describe('setValue', () => {
            let g, c;
            beforeEach(() => {
                c = new index_1.FormControl('oldValue');
                g = new index_1.FormGroup({ 'one': c });
            });
            it('should set the value of the control', () => {
                c.setValue('newValue');
                expect(c.value).toEqual('newValue');
            });
            it('should invoke ngOnChanges if it is present', () => {
                let ngOnChanges;
                c.registerOnChange((v) => (ngOnChanges = ['invoked', v]));
                c.setValue('newValue');
                expect(ngOnChanges).toEqual(['invoked', 'newValue']);
            });
            it('should not invoke on change when explicitly specified', () => {
                let onChange = null;
                c.registerOnChange((v) => (onChange = ['invoked', v]));
                c.setValue('newValue', { emitModelToViewChange: false });
                expect(onChange).toBeNull();
            });
            it('should set the parent', () => {
                c.setValue('newValue');
                expect(g.value).toEqual({ 'one': 'newValue' });
            });
            it('should not set the parent when explicitly specified', () => {
                c.setValue('newValue', { onlySelf: true });
                expect(g.value).toEqual({ 'one': 'oldValue' });
            });
            it('should fire an event', (0, testing_1.fakeAsync)(() => {
                c.valueChanges.subscribe((value) => {
                    expect(value).toEqual('newValue');
                });
                c.setValue('newValue');
                (0, testing_1.tick)();
            }));
            it('should not fire an event when explicitly specified', (0, testing_1.fakeAsync)(() => {
                c.valueChanges.subscribe((value) => {
                    throw 'Should not happen';
                });
                c.setValue('newValue', { emitEvent: false });
                (0, testing_1.tick)();
            }));
            it('should work on a disabled control', () => {
                g.addControl('two', new index_1.FormControl('two'));
                c.disable();
                c.setValue('new value');
                expect(c.value).toEqual('new value');
                expect(g.value).toEqual({ 'two': 'two' });
            });
        });
        describe('patchValue', () => {
            let g, c;
            beforeEach(() => {
                c = new index_1.FormControl('oldValue');
                g = new index_1.FormGroup({ 'one': c });
            });
            it('should set the value of the control', () => {
                c.patchValue('newValue');
                expect(c.value).toEqual('newValue');
            });
            it('should invoke ngOnChanges if it is present', () => {
                let ngOnChanges;
                c.registerOnChange((v) => (ngOnChanges = ['invoked', v]));
                c.patchValue('newValue');
                expect(ngOnChanges).toEqual(['invoked', 'newValue']);
            });
            it('should not invoke on change when explicitly specified', () => {
                let onChange = null;
                c.registerOnChange((v) => (onChange = ['invoked', v]));
                c.patchValue('newValue', { emitModelToViewChange: false });
                expect(onChange).toBeNull();
            });
            it('should set the parent', () => {
                c.patchValue('newValue');
                expect(g.value).toEqual({ 'one': 'newValue' });
            });
            it('should not set the parent when explicitly specified', () => {
                c.patchValue('newValue', { onlySelf: true });
                expect(g.value).toEqual({ 'one': 'oldValue' });
            });
            it('should fire an event', (0, testing_1.fakeAsync)(() => {
                c.valueChanges.subscribe((value) => {
                    expect(value).toEqual('newValue');
                });
                c.patchValue('newValue');
                (0, testing_1.tick)();
            }));
            it('should not fire an event when explicitly specified', (0, testing_1.fakeAsync)(() => {
                c.valueChanges.subscribe((value) => {
                    throw 'Should not happen';
                });
                c.patchValue('newValue', { emitEvent: false });
                (0, testing_1.tick)();
            }));
            it('should patch value on a disabled control', () => {
                g.addControl('two', new index_1.FormControl('two'));
                c.disable();
                c.patchValue('new value');
                expect(c.value).toEqual('new value');
                expect(g.value).toEqual({ 'two': 'two' });
            });
        });
        describe('reset()', () => {
            let c;
            beforeEach(() => {
                c = new index_1.FormControl('initial value');
            });
            it('should reset to a specific value if passed', () => {
                c.setValue('new value');
                expect(c.value).toBe('new value');
                c.reset('initial value');
                expect(c.value).toBe('initial value');
            });
            it('should not set the parent when explicitly specified', () => {
                const g = new index_1.FormGroup({ 'one': c });
                c.patchValue('newValue', { onlySelf: true });
                expect(g.value).toEqual({ 'one': 'initial value' });
            });
            it('should reset to a specific value if passed with boxed value', () => {
                c.setValue('new value');
                expect(c.value).toBe('new value');
                c.reset({ value: 'initial value', disabled: false });
                expect(c.value).toBe('initial value');
            });
            it('should clear the control value if no value is passed', () => {
                c.setValue('new value');
                expect(c.value).toBe('new value');
                c.reset();
                expect(c.value).toBe(null);
            });
            it('should reset to the initial value if specified in FormControlOptions', () => {
                const c2 = new index_1.FormControl('foo', { nonNullable: true });
                expect(c2.value).toBe('foo');
                expect(c2.defaultValue).toBe('foo');
                c2.setValue('bar');
                expect(c2.value).toBe('bar');
                expect(c2.defaultValue).toBe('foo');
                c2.reset();
                expect(c2.value).toBe('foo');
                expect(c2.defaultValue).toBe('foo');
                const c3 = new index_1.FormControl('foo', { nonNullable: false });
                expect(c3.value).toBe('foo');
                expect(c3.defaultValue).toBe(null);
                c3.setValue('bar');
                expect(c3.value).toBe('bar');
                expect(c3.defaultValue).toBe(null);
                c3.reset();
                expect(c3.value).toBe(null);
                expect(c3.defaultValue).toBe(null);
            });
            it('should look inside FormState objects for a default value', () => {
                const c2 = new index_1.FormControl({ value: 'foo', disabled: false }, { initialValueIsDefault: true });
                expect(c2.value).toBe('foo');
                expect(c2.defaultValue).toBe('foo');
                c2.setValue('bar');
                expect(c2.value).toBe('bar');
                expect(c2.defaultValue).toBe('foo');
                c2.reset();
                expect(c2.value).toBe('foo');
                expect(c2.defaultValue).toBe('foo');
            });
            it('should not alter the disabled state when resetting, even if a default value is provided', () => {
                const c2 = new index_1.FormControl({ value: 'foo', disabled: true }, { nonNullable: true });
                expect(c2.value).toBe('foo');
                expect(c2.defaultValue).toBe('foo');
                expect(c2.disabled).toBe(true);
                c2.setValue('bar');
                c2.enable();
                c2.reset();
                expect(c2.value).toBe('foo');
                expect(c2.defaultValue).toBe('foo');
                expect(c2.disabled).toBe(false);
            });
            it('should update the value of any parent controls with passed value', () => {
                const g = new index_1.FormGroup({ 'one': c });
                c.setValue('new value');
                expect(g.value).toEqual({ 'one': 'new value' });
                c.reset('initial value');
                expect(g.value).toEqual({ 'one': 'initial value' });
            });
            it('should update the value of any parent controls with null value', () => {
                const g = new index_1.FormGroup({ 'one': c });
                c.setValue('new value');
                expect(g.value).toEqual({ 'one': 'new value' });
                c.reset();
                expect(g.value).toEqual({ 'one': null });
            });
            it('should mark the control as pristine', () => {
                c.markAsDirty();
                expect(c.pristine).toBe(false);
                c.reset();
                expect(c.pristine).toBe(true);
            });
            it('should set the parent pristine state if all pristine', () => {
                const g = new index_1.FormGroup({ 'one': c });
                c.markAsDirty();
                expect(g.pristine).toBe(false);
                c.reset();
                expect(g.pristine).toBe(true);
            });
            it('should not set the parent pristine state if it has other dirty controls', () => {
                const c2 = new index_1.FormControl('two');
                const g = new index_1.FormGroup({ 'one': c, 'two': c2 });
                c.markAsDirty();
                c2.markAsDirty();
                c.reset();
                expect(g.pristine).toBe(false);
            });
            it('should mark the control as untouched', () => {
                c.markAsTouched();
                expect(c.untouched).toBe(false);
                c.reset();
                expect(c.untouched).toBe(true);
            });
            it('should set the parent untouched state if all untouched', () => {
                const g = new index_1.FormGroup({ 'one': c });
                c.markAsTouched();
                expect(g.untouched).toBe(false);
                c.reset();
                expect(g.untouched).toBe(true);
            });
            it('should not set the parent untouched state if other touched controls', () => {
                const c2 = new index_1.FormControl('two');
                const g = new index_1.FormGroup({ 'one': c, 'two': c2 });
                c.markAsTouched();
                c2.markAsTouched();
                c.reset();
                expect(g.untouched).toBe(false);
            });
            it('should retain the disabled state of the control', () => {
                c.disable();
                c.reset();
                expect(c.disabled).toBe(true);
            });
            it('should set disabled state based on boxed value if passed', () => {
                c.disable();
                c.reset({ value: null, disabled: false });
                expect(c.disabled).toBe(false);
            });
            describe('reset() events', () => {
                let g, c2, logger;
                beforeEach(() => {
                    c2 = new index_1.FormControl('two');
                    g = new index_1.FormGroup({ 'one': c, 'two': c2 });
                    logger = [];
                });
                it('should emit one valueChange event per reset control', () => {
                    g.valueChanges.subscribe(() => logger.push('group'));
                    c.valueChanges.subscribe(() => logger.push('control1'));
                    c2.valueChanges.subscribe(() => logger.push('control2'));
                    c.reset();
                    expect(logger).toEqual(['control1', 'group']);
                });
                it('should not fire an event when explicitly specified', (0, testing_1.fakeAsync)(() => {
                    g.valueChanges.subscribe((value) => {
                        throw 'Should not happen';
                    });
                    c.valueChanges.subscribe((value) => {
                        throw 'Should not happen';
                    });
                    c2.valueChanges.subscribe((value) => {
                        throw 'Should not happen';
                    });
                    c.reset(null, { emitEvent: false });
                    (0, testing_1.tick)();
                }));
                it('should emit one statusChange event per reset control', () => {
                    g.statusChanges.subscribe(() => logger.push('group'));
                    c.statusChanges.subscribe(() => logger.push('control1'));
                    c2.statusChanges.subscribe(() => logger.push('control2'));
                    c.reset();
                    expect(logger).toEqual(['control1', 'group']);
                });
                it('should emit one statusChange event per disabled control', () => {
                    g.statusChanges.subscribe(() => logger.push('group'));
                    c.statusChanges.subscribe(() => logger.push('control1'));
                    c2.statusChanges.subscribe(() => logger.push('control2'));
                    c.reset({ value: null, disabled: true });
                    expect(logger).toEqual(['control1', 'group']);
                });
            });
        });
        describe('valueChanges & statusChanges', () => {
            let c;
            beforeEach(() => {
                c = new index_1.FormControl('old', index_1.Validators.required);
            });
            it('should fire an event after the value has been updated', (done) => {
                c.valueChanges.subscribe({
                    next: (value) => {
                        expect(c.value).toEqual('new');
                        expect(value).toEqual('new');
                        done();
                    },
                });
                c.setValue('new');
            });
            it('should fire an event after the status has been updated to invalid', (0, testing_1.fakeAsync)(() => {
                c.statusChanges.subscribe({
                    next: (status) => {
                        expect(c.status).toEqual('INVALID');
                        expect(status).toEqual('INVALID');
                    },
                });
                c.setValue('');
                (0, testing_1.tick)();
            }));
            it('should fire statusChanges events for async validators added via options object', (0, testing_1.fakeAsync)(() => {
                // The behavior can be tested for each of the model types.
                let statuses = [];
                // Create a form control with an async validator added via options object.
                const asc = new index_1.FormControl('', { asyncValidators: [() => Promise.resolve(null)] });
                // Subscribe to status changes.
                asc.statusChanges.subscribe((status) => statuses.push(status));
                // After a tick, the async validator should change status PENDING -> VALID.
                (0, testing_1.tick)();
                expect(statuses).toEqual(['VALID']);
            }));
            it('should fire an event after the status has been updated to pending', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('old', index_1.Validators.required, (0, util_1.asyncValidator)('expected'));
                const log = [];
                c.valueChanges.subscribe({ next: (value) => log.push(`value: '${value}'`) });
                c.statusChanges.subscribe({ next: (status) => log.push(`status: '${status}'`) });
                c.setValue('');
                (0, testing_1.tick)();
                c.setValue('nonEmpty');
                (0, testing_1.tick)();
                c.setValue('expected');
                (0, testing_1.tick)();
                expect(log).toEqual([
                    "value: ''",
                    "status: 'INVALID'",
                    "value: 'nonEmpty'",
                    "status: 'PENDING'",
                    "status: 'INVALID'",
                    "value: 'expected'",
                    "status: 'PENDING'",
                    "status: 'VALID'",
                ]);
            }));
            it('should update set errors and status before emitting an event', (0, testing_1.fakeAsync)(() => {
                c.setValue('');
                (0, testing_1.tick)();
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ 'required': true });
            }));
            it('should return a cold observable', (0, testing_1.fakeAsync)(() => {
                let value = null;
                c.setValue('will be ignored');
                c.valueChanges.subscribe((v) => (value = v));
                c.setValue('new');
                (0, testing_1.tick)();
                // @ts-expect-error see microsoft/TypeScript#9998
                expect(value).toEqual('new');
            }));
        });
        describe('setErrors', () => {
            it('should set errors on a control', () => {
                const c = new index_1.FormControl('someValue');
                c.setErrors({ 'someError': true });
                expect(c.valid).toEqual(false);
                expect(c.errors).toEqual({ 'someError': true });
            });
            it('should reset the errors and validity when the value changes', () => {
                const c = new index_1.FormControl('someValue', index_1.Validators.required);
                c.setErrors({ 'someError': true });
                c.setValue('');
                expect(c.errors).toEqual({ 'required': true });
            });
            it("should update the parent group's validity", () => {
                const c = new index_1.FormControl('someValue');
                const g = new index_1.FormGroup({ 'one': c });
                expect(g.valid).toEqual(true);
                c.setErrors({ 'someError': true });
                expect(g.valid).toEqual(false);
            });
            it("should not reset parent's errors", () => {
                const c = new index_1.FormControl('someValue');
                const g = new index_1.FormGroup({ 'one': c });
                g.setErrors({ 'someGroupError': true });
                c.setErrors({ 'someError': true });
                expect(g.errors).toEqual({ 'someGroupError': true });
            });
            it('should reset errors when updating a value', () => {
                const c = new index_1.FormControl('oldValue');
                const g = new index_1.FormGroup({ 'one': c });
                g.setErrors({ 'someGroupError': true });
                c.setErrors({ 'someError': true });
                c.setValue('newValue');
                expect(c.errors).toEqual(null);
                expect(g.errors).toEqual(null);
            });
        });
        describe('disable() & enable()', () => {
            it('should mark the control as disabled', () => {
                const c = new index_1.FormControl(null);
                expect(c.disabled).toBe(false);
                expect(c.valid).toBe(true);
                c.disable();
                expect(c.disabled).toBe(true);
                expect(c.valid).toBe(false);
                c.enable();
                expect(c.disabled).toBe(false);
                expect(c.valid).toBe(true);
            });
            it('should set the control status as disabled', () => {
                const c = new index_1.FormControl(null);
                expect(c.status).toEqual('VALID');
                c.disable();
                expect(c.status).toEqual('DISABLED');
                c.enable();
                expect(c.status).toEqual('VALID');
            });
            it('should retain the original value when disabled', () => {
                const c = new index_1.FormControl('some value');
                expect(c.value).toEqual('some value');
                c.disable();
                expect(c.value).toEqual('some value');
                c.enable();
                expect(c.value).toEqual('some value');
            });
            it('should keep the disabled control in the group, but return false for contains()', () => {
                const c = new index_1.FormControl('');
                const g = new index_1.FormGroup({ 'one': c });
                expect(g.get('one')).toBeDefined();
                expect(g.contains('one')).toBe(true);
                c.disable();
                expect(g.get('one')).toBeDefined();
                expect(g.contains('one')).toBe(false);
            });
            it('should mark the parent group disabled if all controls are disabled', () => {
                const c = new index_1.FormControl();
                const c2 = new index_1.FormControl();
                const g = new index_1.FormGroup({ 'one': c, 'two': c2 });
                expect(g.enabled).toBe(true);
                c.disable();
                expect(g.enabled).toBe(true);
                c2.disable();
                expect(g.enabled).toBe(false);
                c.enable();
                expect(g.enabled).toBe(true);
            });
            it('should update the parent group value when child control status changes', () => {
                const c = new index_1.FormControl('one');
                const c2 = new index_1.FormControl('two');
                const g = new index_1.FormGroup({ 'one': c, 'two': c2 });
                expect(g.value).toEqual({ 'one': 'one', 'two': 'two' });
                c.disable();
                expect(g.value).toEqual({ 'two': 'two' });
                c2.disable();
                expect(g.value).toEqual({ 'one': 'one', 'two': 'two' });
                c.enable();
                expect(g.value).toEqual({ 'one': 'one' });
            });
            it('should mark the parent array disabled if all controls are disabled', () => {
                const c = new index_1.FormControl();
                const c2 = new index_1.FormControl();
                const a = new index_1.FormArray([c, c2]);
                expect(a.enabled).toBe(true);
                c.disable();
                expect(a.enabled).toBe(true);
                c2.disable();
                expect(a.enabled).toBe(false);
                c.enable();
                expect(a.enabled).toBe(true);
            });
            it('should update the parent array value when child control status changes', () => {
                const c = new index_1.FormControl('one');
                const c2 = new index_1.FormControl('two');
                const a = new index_1.FormArray([c, c2]);
                expect(a.value).toEqual(['one', 'two']);
                c.disable();
                expect(a.value).toEqual(['two']);
                c2.disable();
                expect(a.value).toEqual(['one', 'two']);
                c.enable();
                expect(a.value).toEqual(['one']);
            });
            it('should ignore disabled array controls when determining dirtiness', () => {
                const c = new index_1.FormControl('one');
                const c2 = new index_1.FormControl('two');
                const a = new index_1.FormArray([c, c2]);
                c.markAsDirty();
                expect(a.dirty).toBe(true);
                c.disable();
                expect(c.dirty).toBe(true);
                expect(a.dirty).toBe(false);
                c.enable();
                expect(a.dirty).toBe(true);
            });
            it('should not make a dirty array not dirty when disabling controls', () => {
                const c = new index_1.FormControl('one');
                const c2 = new index_1.FormControl('two');
                const a = new index_1.FormArray([c, c2]);
                a.markAsDirty();
                expect(a.dirty).toBe(true);
                expect(c.dirty).toBe(false);
                c.disable();
                expect(a.dirty).toBe(true);
                c.enable();
                expect(a.dirty).toBe(true);
            });
            it('should ignore disabled controls in validation', () => {
                const c = new index_1.FormControl(null, index_1.Validators.required);
                const c2 = new index_1.FormControl(null);
                const g = new index_1.FormGroup({ one: c, two: c2 });
                expect(g.valid).toBe(false);
                c.disable();
                expect(g.valid).toBe(true);
                c.enable();
                expect(g.valid).toBe(false);
            });
            it('should ignore disabled controls when serializing value in a group', () => {
                const c = new index_1.FormControl('one');
                const c2 = new index_1.FormControl('two');
                const g = new index_1.FormGroup({ one: c, two: c2 });
                expect(g.value).toEqual({ one: 'one', two: 'two' });
                c.disable();
                expect(g.value).toEqual({ two: 'two' });
                c.enable();
                expect(g.value).toEqual({ one: 'one', two: 'two' });
            });
            it('should ignore disabled controls when serializing value in an array', () => {
                const c = new index_1.FormControl('one');
                const c2 = new index_1.FormControl('two');
                const a = new index_1.FormArray([c, c2]);
                expect(a.value).toEqual(['one', 'two']);
                c.disable();
                expect(a.value).toEqual(['two']);
                c.enable();
                expect(a.value).toEqual(['one', 'two']);
            });
            it('should ignore disabled controls when determining dirtiness', () => {
                const c = new index_1.FormControl('one');
                const c2 = new index_1.FormControl('two');
                const g = new index_1.FormGroup({ one: c, two: c2 });
                c.markAsDirty();
                expect(g.dirty).toBe(true);
                c.disable();
                expect(c.dirty).toBe(true);
                expect(g.dirty).toBe(false);
                c.enable();
                expect(g.dirty).toBe(true);
            });
            it('should not make a dirty group not dirty when disabling controls', () => {
                const c = new index_1.FormControl('one');
                const c2 = new index_1.FormControl('two');
                const g = new index_1.FormGroup({ one: c, two: c2 });
                g.markAsDirty();
                expect(g.dirty).toBe(true);
                expect(c.dirty).toBe(false);
                c.disable();
                expect(g.dirty).toBe(true);
                c.enable();
                expect(g.dirty).toBe(true);
            });
            it('should ignore disabled controls when determining touched state', () => {
                const c = new index_1.FormControl('one');
                const c2 = new index_1.FormControl('two');
                const g = new index_1.FormGroup({ one: c, two: c2 });
                c.markAsTouched();
                expect(g.touched).toBe(true);
                c.disable();
                expect(c.touched).toBe(true);
                expect(g.touched).toBe(false);
                c.enable();
                expect(g.touched).toBe(true);
            });
            it('should not run validators on disabled controls', () => {
                const validator = jasmine.createSpy('validator');
                const c = new index_1.FormControl('', validator);
                expect(validator.calls.count()).toEqual(1);
                c.disable();
                expect(validator.calls.count()).toEqual(1);
                c.setValue('value');
                expect(validator.calls.count()).toEqual(1);
                c.enable();
                expect(validator.calls.count()).toEqual(2);
            });
            describe('disabled errors', () => {
                it('should clear out the errors when disabled', () => {
                    const c = new index_1.FormControl('', index_1.Validators.required);
                    expect(c.errors).toEqual({ required: true });
                    c.disable();
                    expect(c.errors).toEqual(null);
                    c.enable();
                    expect(c.errors).toEqual({ required: true });
                });
                it('should clear out async errors when disabled', (0, testing_1.fakeAsync)(() => {
                    const c = new index_1.FormControl('', null, (0, util_1.asyncValidator)('expected'));
                    (0, testing_1.tick)();
                    expect(c.errors).toEqual({ 'async': true });
                    c.disable();
                    expect(c.errors).toEqual(null);
                    c.enable();
                    (0, testing_1.tick)();
                    expect(c.errors).toEqual({ 'async': true });
                }));
            });
            describe('disabled events', () => {
                let logger;
                let c;
                let g;
                beforeEach(() => {
                    logger = [];
                    c = new index_1.FormControl('', index_1.Validators.required);
                    g = new index_1.FormGroup({ one: c });
                });
                it('should emit a statusChange event when disabled status changes', () => {
                    c.statusChanges.subscribe((status) => logger.push(status));
                    c.disable();
                    expect(logger).toEqual(['DISABLED']);
                    c.enable();
                    expect(logger).toEqual(['DISABLED', 'INVALID']);
                });
                it('should emit status change events in correct order', () => {
                    c.statusChanges.subscribe(() => logger.push('control'));
                    g.statusChanges.subscribe(() => logger.push('group'));
                    c.disable();
                    expect(logger).toEqual(['control', 'group']);
                });
                it('should throw when sync validator passed into async validator param', () => {
                    const fn = () => new index_1.FormControl('', syncValidator, syncValidator);
                    // test for the specific error since without the error check it would still throw an error
                    // but
                    // not a meaningful one
                    expect(fn).toThrowError('NG01101: Expected async validator to return Promise or Observable. ' +
                        'Are you using a synchronous validator where an async validator is expected? ' +
                        'Find more at https://angular.dev/errors/NG01101');
                });
                it('should not emit value change events when emitEvent = false', () => {
                    c.valueChanges.subscribe(() => logger.push('control'));
                    g.valueChanges.subscribe(() => logger.push('group'));
                    c.disable({ emitEvent: false });
                    expect(logger).toEqual([]);
                    c.enable({ emitEvent: false });
                    expect(logger).toEqual([]);
                });
                it('should not emit status change events when emitEvent = false', () => {
                    c.statusChanges.subscribe(() => logger.push('control'));
                    g.statusChanges.subscribe(() => logger.push('form'));
                    c.disable({ emitEvent: false });
                    expect(logger).toEqual([]);
                    c.enable({ emitEvent: false });
                    expect(logger).toEqual([]);
                });
            });
        });
        describe('pending', () => {
            let c;
            beforeEach(() => {
                c = new index_1.FormControl('value');
            });
            it('should be false after creating a control', () => {
                expect(c.pending).toEqual(false);
            });
            it('should be true after changing the value of the control', () => {
                c.markAsPending();
                expect(c.pending).toEqual(true);
            });
            describe('status change events', () => {
                let logger;
                beforeEach(() => {
                    logger = [];
                    c.statusChanges.subscribe((status) => logger.push(status));
                });
                it('should emit event after marking control as pending', () => {
                    c.markAsPending();
                    expect(logger).toEqual(['PENDING']);
                });
                it('should not emit event when emitEvent = false', () => {
                    c.markAsPending({ emitEvent: false });
                    expect(logger).toEqual([]);
                });
            });
        });
        describe('can be extended', () => {
            // We don't technically support extending Forms classes, but people do it anyway.
            // We need to make sure that there is some way to extend them to avoid causing breakage.
            class FCExt extends index_1.FormControl {
                constructor(formState, ...args) {
                    super(formState, ...args);
                }
            }
            it('should perform basic FormControl operations', () => {
                const nc = new FCExt({ value: 'foo' });
                nc.setValue('bar');
                // There is no need to assert because, if this test compiles, then it is possible to correctly
                // extend FormControl.
            });
        });
        describe('inspecting the prototype still provides FormControl type', () => {
            function isInstanceOf(value, arg) {
                // The implementation does not matter; we want to check whether this guard narrows the type.
                return true;
            }
            // This is a nullable FormControl, and we want isInstanceOf to narrow the type.
            const fcOrNull = new index_1.FormControl(42);
            it('and is appropriately narrowed', () => {
                if (isInstanceOf(index_1.FormControl, fcOrNull)) {
                    // If the guard does not work, then this code will not compile due to null being in the
                    // type.
                    fcOrNull.setValue(7);
                }
            });
        });
        describe('Function.name', () => {
            it('returns FormControl', () => {
                // This is always true in the trivial case, but can be broken by various methods of overriding
                // FormControl's exported constructor.
                expect(index_1.FormControl.name).toBe('FormControl');
            });
        });
    });
})();
