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
const validators_1 = require("../src/validators");
const rxjs_1 = require("rxjs");
const util_1 = require("./util");
(function () {
    describe('FormArray', () => {
        describe('adding/removing', () => {
            let a;
            let c1, c2, c3;
            let logger;
            beforeEach(() => {
                a = new index_1.FormArray([]);
                c1 = new index_1.FormControl(1);
                c2 = new index_1.FormControl(2);
                c3 = new index_1.FormControl(3);
                logger = [];
            });
            it('should support pushing', () => {
                a.push(c1);
                expect(a.length).toEqual(1);
                expect(a.controls).toEqual([c1]);
            });
            it('should support removing', () => {
                a.push(c1);
                a.push(c2);
                a.push(c3);
                a.removeAt(1);
                expect(a.controls).toEqual([c1, c3]);
            });
            it('should support clearing', () => {
                a.push(c1);
                a.push(c2);
                a.push(c3);
                a.clear();
                expect(a.controls).toEqual([]);
                a.clear();
                expect(a.controls).toEqual([]);
            });
            it('should support inserting', () => {
                a.push(c1);
                a.push(c3);
                a.insert(1, c2);
                expect(a.controls).toEqual([c1, c2, c3]);
            });
            it('should not emit events when calling `FormArray.push` with `emitEvent: false`', () => {
                a.valueChanges.subscribe(() => logger.push('value change'));
                a.statusChanges.subscribe(() => logger.push('status change'));
                a.push(c1, { emitEvent: false });
                expect(a.length).toEqual(1);
                expect(a.controls).toEqual([c1]);
                expect(logger).toEqual([]);
            });
            it('should not emit events when calling `FormArray.removeAt` with `emitEvent: false`', () => {
                a.push(c1);
                a.push(c2);
                a.push(c3);
                a.valueChanges.subscribe(() => logger.push('value change'));
                a.statusChanges.subscribe(() => logger.push('status change'));
                a.removeAt(1, { emitEvent: false });
                expect(a.controls).toEqual([c1, c3]);
                expect(logger).toEqual([]);
            });
            it('should not emit events when calling `FormArray.clear` with `emitEvent: false`', () => {
                a.push(c1);
                a.push(c2);
                a.push(c3);
                a.valueChanges.subscribe(() => logger.push('value change'));
                a.statusChanges.subscribe(() => logger.push('status change'));
                a.clear({ emitEvent: false });
                expect(a.controls).toEqual([]);
                expect(logger).toEqual([]);
            });
            it('should not emit events when calling `FormArray.insert` with `emitEvent: false`', () => {
                a.push(c1);
                a.push(c3);
                a.valueChanges.subscribe(() => logger.push('value change'));
                a.statusChanges.subscribe(() => logger.push('status change'));
                a.insert(1, c2, { emitEvent: false });
                expect(a.controls).toEqual([c1, c2, c3]);
                expect(logger).toEqual([]);
            });
            it('should not emit events when calling `FormArray.setControl` with `emitEvent: false`', () => {
                a.push(c1);
                a.push(c3);
                a.valueChanges.subscribe(() => logger.push('value change'));
                a.statusChanges.subscribe(() => logger.push('status change'));
                a.setControl(1, c2, { emitEvent: false });
                expect(a.controls).toEqual([c1, c2]);
                expect(logger).toEqual([]);
            });
            it('should not emit status change events when `FormArray.push` is called with `emitEvent: false`', () => {
                // Adding validators to make sure there are no status change event submitted when form
                // becomes invalid.
                const validatorFn = (value) => (value.controls.length > 0 ? { controls: true } : null);
                const asyncValidatorFn = (value) => (0, rxjs_1.of)(validatorFn(value));
                const arr = new index_1.FormArray([], validatorFn, asyncValidatorFn);
                expect(arr.valid).toBe(true);
                arr.statusChanges.subscribe(() => logger.push('status change'));
                arr.push(c1, { emitEvent: false });
                expect(arr.valid).toBe(false);
                expect(logger).toEqual([]);
            });
            it('should not emit events on the parent when called with `emitEvent: false`', () => {
                const form = new index_1.FormGroup({ child: a });
                form.valueChanges.subscribe(() => logger.push('form value change'));
                a.valueChanges.subscribe(() => logger.push('array value change'));
                form.statusChanges.subscribe(() => logger.push('form status change'));
                a.statusChanges.subscribe(() => logger.push('array status change'));
                a.push(new index_1.FormControl(5), { emitEvent: false });
                expect(logger).toEqual([]);
            });
        });
        describe('value', () => {
            it('should be the reduced value of the child controls', () => {
                const a = new index_1.FormArray([new index_1.FormControl(1), new index_1.FormControl(2)]);
                expect(a.value).toEqual([1, 2]);
            });
            it('should be an empty array when there are no child controls', () => {
                const a = new index_1.FormArray([]);
                expect(a.value).toEqual([]);
            });
        });
        describe('getRawValue()', () => {
            let a;
            it('should work with nested form groups/arrays', () => {
                a = new index_1.FormArray([
                    new index_1.FormGroup({
                        'c2': new index_1.FormControl('v2'),
                        'c3': new index_1.FormControl('v3'),
                    }),
                    new index_1.FormArray([new index_1.FormControl('v4'), new index_1.FormControl('v5')]),
                ]);
                a.at(0).get('c3').disable();
                a.at(1).at(1).disable();
                expect(a.getRawValue()).toEqual([{ 'c2': 'v2', 'c3': 'v3' }, ['v4', 'v5']]);
            });
        });
        describe('markAllAsDirty', () => {
            it('should mark all descendants as dirty', () => {
                const formArray = new index_1.FormArray([
                    new index_1.FormControl('v1'),
                    new index_1.FormControl('v2'),
                    new index_1.FormGroup({ 'c1': new index_1.FormControl('v1') }),
                    new index_1.FormArray([new index_1.FormGroup({ 'c2': new index_1.FormControl('v2') })]),
                ]);
                expect(formArray.dirty).toBe(false);
                const control1 = formArray.at(0);
                expect(control1.dirty).toBe(false);
                const group1 = formArray.at(2);
                expect(group1.dirty).toBe(false);
                const group1Control1 = group1.get('c1');
                expect(group1Control1.dirty).toBe(false);
                const innerFormArray = formArray.at(3);
                expect(innerFormArray.dirty).toBe(false);
                const innerFormArrayGroup = innerFormArray.at(0);
                expect(innerFormArrayGroup.dirty).toBe(false);
                const innerFormArrayGroupControl1 = innerFormArrayGroup.get('c2');
                expect(innerFormArrayGroupControl1.dirty).toBe(false);
                formArray.markAllAsDirty();
                expect(formArray.dirty).toBe(true);
                expect(control1.dirty).toBe(true);
                expect(group1.dirty).toBe(true);
                expect(group1Control1.dirty).toBe(true);
                expect(innerFormArray.dirty).toBe(true);
                expect(innerFormArrayGroup.dirty).toBe(true);
                expect(innerFormArrayGroupControl1.dirty).toBe(true);
            });
        });
        describe('markAllAsTouched', () => {
            it('should mark all descendants as touched', () => {
                const formArray = new index_1.FormArray([
                    new index_1.FormControl('v1'),
                    new index_1.FormControl('v2'),
                    new index_1.FormGroup({ 'c1': new index_1.FormControl('v1') }),
                    new index_1.FormArray([new index_1.FormGroup({ 'c2': new index_1.FormControl('v2') })]),
                ]);
                expect(formArray.touched).toBe(false);
                const control1 = formArray.at(0);
                expect(control1.touched).toBe(false);
                const group1 = formArray.at(2);
                expect(group1.touched).toBe(false);
                const group1Control1 = group1.get('c1');
                expect(group1Control1.touched).toBe(false);
                const innerFormArray = formArray.at(3);
                expect(innerFormArray.touched).toBe(false);
                const innerFormArrayGroup = innerFormArray.at(0);
                expect(innerFormArrayGroup.touched).toBe(false);
                const innerFormArrayGroupControl1 = innerFormArrayGroup.get('c2');
                expect(innerFormArrayGroupControl1.touched).toBe(false);
                formArray.markAllAsTouched();
                expect(formArray.touched).toBe(true);
                expect(control1.touched).toBe(true);
                expect(group1.touched).toBe(true);
                expect(group1Control1.touched).toBe(true);
                expect(innerFormArray.touched).toBe(true);
                expect(innerFormArrayGroup.touched).toBe(true);
                expect(innerFormArrayGroupControl1.touched).toBe(true);
            });
        });
        describe('setValue', () => {
            let c, c2, a;
            beforeEach(() => {
                c = new index_1.FormControl('');
                c2 = new index_1.FormControl('');
                a = new index_1.FormArray([c, c2]);
            });
            it('should set its own value', () => {
                a.setValue(['one', 'two']);
                expect(a.value).toEqual(['one', 'two']);
            });
            it('should set child values', () => {
                a.setValue(['one', 'two']);
                expect(c.value).toEqual('one');
                expect(c2.value).toEqual('two');
            });
            it('should set values for disabled child controls', () => {
                c2.disable();
                a.setValue(['one', 'two']);
                expect(c2.value).toEqual('two');
                expect(a.value).toEqual(['one']);
                expect(a.getRawValue()).toEqual(['one', 'two']);
            });
            it('should set value for disabled arrays', () => {
                a.disable();
                a.setValue(['one', 'two']);
                expect(c.value).toEqual('one');
                expect(c2.value).toEqual('two');
                expect(a.value).toEqual(['one', 'two']);
            });
            it('should set parent values', () => {
                const form = new index_1.FormGroup({ 'parent': a });
                a.setValue(['one', 'two']);
                expect(form.value).toEqual({ 'parent': ['one', 'two'] });
            });
            it('should not update the parent explicitly specified', () => {
                const form = new index_1.FormGroup({ 'parent': a });
                a.setValue(['one', 'two'], { onlySelf: true });
                expect(form.value).toEqual({ parent: ['', ''] });
            });
            it('should throw if fields are missing from supplied value (subset)', () => {
                expect(() => a.setValue([, 'two'])).toThrowError(new RegExp(`NG01002: Must supply a value for form control at index: 0`));
            });
            it('should throw if a value is provided for a missing control (superset)', () => {
                expect(() => a.setValue(['one', 'two', 'three'])).toThrowError(new RegExp(`NG01001: Cannot find form control at index: 2`));
            });
            it('should throw if a value is not provided for a disabled control', () => {
                c2.disable();
                expect(() => a.setValue(['one'])).toThrowError(new RegExp(`NG01002: Must supply a value for form control at index: 1`));
            });
            it('should throw if no controls are set yet', () => {
                const empty = new index_1.FormArray([]);
                expect(() => empty.setValue(['one'])).toThrowError(new RegExp(`no form controls registered with this array`));
            });
            describe('setValue() events', () => {
                let form;
                let logger;
                beforeEach(() => {
                    form = new index_1.FormGroup({ 'parent': a });
                    logger = [];
                });
                it('should emit one valueChange event per control', () => {
                    form.valueChanges.subscribe(() => logger.push('form'));
                    a.valueChanges.subscribe(() => logger.push('array'));
                    c.valueChanges.subscribe(() => logger.push('control1'));
                    c2.valueChanges.subscribe(() => logger.push('control2'));
                    a.setValue(['one', 'two']);
                    expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                });
                it('should not fire events when called with `emitEvent: false`', () => {
                    form.valueChanges.subscribe(() => logger.push('form'));
                    a.valueChanges.subscribe(() => logger.push('array'));
                    c.valueChanges.subscribe(() => logger.push('control1'));
                    c2.valueChanges.subscribe(() => logger.push('control2'));
                    a.setValue(['one', 'two'], { emitEvent: false });
                    expect(logger).toEqual([]);
                });
                it('should emit one statusChange event per control', () => {
                    form.statusChanges.subscribe(() => logger.push('form'));
                    a.statusChanges.subscribe(() => logger.push('array'));
                    c.statusChanges.subscribe(() => logger.push('control1'));
                    c2.statusChanges.subscribe(() => logger.push('control2'));
                    a.setValue(['one', 'two']);
                    expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                });
            });
        });
        describe('patchValue', () => {
            let c, c2, a, a2;
            beforeEach(() => {
                c = new index_1.FormControl('');
                c2 = new index_1.FormControl('');
                a = new index_1.FormArray([c, c2]);
                a2 = new index_1.FormArray([a]);
            });
            it('should set its own value', () => {
                a.patchValue(['one', 'two']);
                expect(a.value).toEqual(['one', 'two']);
            });
            it('should set child values', () => {
                a.patchValue(['one', 'two']);
                expect(c.value).toEqual('one');
                expect(c2.value).toEqual('two');
            });
            it('should patch disabled control values', () => {
                c2.disable();
                a.patchValue(['one', 'two']);
                expect(c2.value).toEqual('two');
                expect(a.value).toEqual(['one']);
                expect(a.getRawValue()).toEqual(['one', 'two']);
            });
            it('should patch disabled control arrays', () => {
                a.disable();
                a.patchValue(['one', 'two']);
                expect(c.value).toEqual('one');
                expect(c2.value).toEqual('two');
                expect(a.value).toEqual(['one', 'two']);
            });
            it('should set parent values', () => {
                const form = new index_1.FormGroup({ 'parent': a });
                a.patchValue(['one', 'two']);
                expect(form.value).toEqual({ 'parent': ['one', 'two'] });
            });
            it('should not update the parent explicitly specified', () => {
                const form = new index_1.FormGroup({ 'parent': a });
                a.patchValue(['one', 'two'], { onlySelf: true });
                expect(form.value).toEqual({ parent: ['', ''] });
            });
            it('should ignore fields that are missing from supplied value (subset)', () => {
                a.patchValue([, 'two']);
                expect(a.value).toEqual(['', 'two']);
            });
            it('should not ignore fields that are null', () => {
                a.patchValue([null]);
                expect(a.value).toEqual([null, '']);
            });
            it('should ignore any value provided for a missing control (superset)', () => {
                a.patchValue([, , 'three']);
                expect(a.value).toEqual(['', '']);
            });
            it('should ignore a array if `null` or `undefined` are used as values', () => {
                const INITIAL_STATE = [['', '']];
                a2.patchValue([null]);
                expect(a2.value).toEqual(INITIAL_STATE);
                a2.patchValue([undefined]);
                expect(a2.value).toEqual(INITIAL_STATE);
            });
            describe('patchValue() events', () => {
                let form;
                let logger;
                beforeEach(() => {
                    form = new index_1.FormGroup({ 'parent': a });
                    logger = [];
                });
                it('should emit one valueChange event per control', () => {
                    form.valueChanges.subscribe(() => logger.push('form'));
                    a.valueChanges.subscribe(() => logger.push('array'));
                    c.valueChanges.subscribe(() => logger.push('control1'));
                    c2.valueChanges.subscribe(() => logger.push('control2'));
                    a.patchValue(['one', 'two']);
                    expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                });
                it('should not emit valueChange events for skipped controls', () => {
                    form.valueChanges.subscribe(() => logger.push('form'));
                    a.valueChanges.subscribe(() => logger.push('array'));
                    c.valueChanges.subscribe(() => logger.push('control1'));
                    c2.valueChanges.subscribe(() => logger.push('control2'));
                    a.patchValue(['one']);
                    expect(logger).toEqual(['control1', 'array', 'form']);
                });
                it('should not emit valueChange events for skipped controls (represented as `null` or `undefined`)', () => {
                    const logEvent = () => logger.push('valueChanges event');
                    const [formArrayControl1, formArrayControl2] = a2.controls[0].controls;
                    formArrayControl1.valueChanges.subscribe(logEvent);
                    formArrayControl2.valueChanges.subscribe(logEvent);
                    a2.patchValue([null]);
                    a2.patchValue([undefined]);
                    // No events are expected in `valueChanges` since
                    // all controls were skipped in `patchValue`.
                    expect(logger).toEqual([]);
                });
                it('should not fire events when called with `emitEvent: false`', () => {
                    form.valueChanges.subscribe(() => logger.push('form'));
                    a.valueChanges.subscribe(() => logger.push('array'));
                    c.valueChanges.subscribe(() => logger.push('control1'));
                    c2.valueChanges.subscribe(() => logger.push('control2'));
                    a.patchValue(['one', 'two'], { emitEvent: false });
                    expect(logger).toEqual([]);
                });
                it('should emit one statusChange event per control', () => {
                    form.statusChanges.subscribe(() => logger.push('form'));
                    a.statusChanges.subscribe(() => logger.push('array'));
                    c.statusChanges.subscribe(() => logger.push('control1'));
                    c2.statusChanges.subscribe(() => logger.push('control2'));
                    a.patchValue(['one', 'two']);
                    expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                });
            });
        });
        describe('reset()', () => {
            let c, c2, a;
            beforeEach(() => {
                c = new index_1.FormControl('initial value');
                c2 = new index_1.FormControl('');
                a = new index_1.FormArray([c, c2]);
            });
            it('should set its own value if value passed', () => {
                a.setValue(['new value', 'new value']);
                a.reset(['initial value', '']);
                expect(a.value).toEqual(['initial value', '']);
            });
            it('should not update the parent when explicitly specified', () => {
                const form = new index_1.FormGroup({ 'a': a });
                a.reset(['one', 'two'], { onlySelf: true });
                expect(form.value).toEqual({ a: ['initial value', ''] });
            });
            it('should set its own value if boxed value passed', () => {
                a.setValue(['new value', 'new value']);
                a.reset([{ value: 'initial value', disabled: false }, '']);
                expect(a.value).toEqual(['initial value', '']);
            });
            it('should clear its own value if no value passed', () => {
                a.setValue(['new value', 'new value']);
                a.reset();
                expect(a.value).toEqual([null, null]);
            });
            it('should set the value of each of its child controls if value passed', () => {
                a.setValue(['new value', 'new value']);
                a.reset(['initial value', '']);
                expect(c.value).toBe('initial value');
                expect(c2.value).toBe('');
            });
            it('should clear the value of each of its child controls if no value', () => {
                a.setValue(['new value', 'new value']);
                a.reset();
                expect(c.value).toBe(null);
                expect(c2.value).toBe(null);
            });
            it('should set the value of its parent if value passed', () => {
                const form = new index_1.FormGroup({ 'a': a });
                a.setValue(['new value', 'new value']);
                a.reset(['initial value', '']);
                expect(form.value).toEqual({ 'a': ['initial value', ''] });
            });
            it('should clear the value of its parent if no value passed', () => {
                const form = new index_1.FormGroup({ 'a': a });
                a.setValue(['new value', 'new value']);
                a.reset();
                expect(form.value).toEqual({ 'a': [null, null] });
            });
            it('should mark itself as pristine', () => {
                a.markAsDirty();
                expect(a.pristine).toBe(false);
                a.reset();
                expect(a.pristine).toBe(true);
            });
            it('should mark all child controls as pristine', () => {
                c.markAsDirty();
                c2.markAsDirty();
                expect(c.pristine).toBe(false);
                expect(c2.pristine).toBe(false);
                a.reset();
                expect(c.pristine).toBe(true);
                expect(c2.pristine).toBe(true);
            });
            it('should mark the parent as pristine if all siblings pristine', () => {
                const c3 = new index_1.FormControl('');
                const form = new index_1.FormGroup({ 'a': a, 'c3': c3 });
                a.markAsDirty();
                expect(form.pristine).toBe(false);
                a.reset();
                expect(form.pristine).toBe(true);
            });
            it('should not mark the parent pristine if any dirty siblings', () => {
                const c3 = new index_1.FormControl('');
                const form = new index_1.FormGroup({ 'a': a, 'c3': c3 });
                a.markAsDirty();
                c3.markAsDirty();
                expect(form.pristine).toBe(false);
                a.reset();
                expect(form.pristine).toBe(false);
            });
            it('should mark itself as untouched', () => {
                a.markAsTouched();
                expect(a.untouched).toBe(false);
                a.reset();
                expect(a.untouched).toBe(true);
            });
            it('should mark all child controls as untouched', () => {
                c.markAsTouched();
                c2.markAsTouched();
                expect(c.untouched).toBe(false);
                expect(c2.untouched).toBe(false);
                a.reset();
                expect(c.untouched).toBe(true);
                expect(c2.untouched).toBe(true);
            });
            it('should mark the parent untouched if all siblings untouched', () => {
                const c3 = new index_1.FormControl('');
                const form = new index_1.FormGroup({ 'a': a, 'c3': c3 });
                a.markAsTouched();
                expect(form.untouched).toBe(false);
                a.reset();
                expect(form.untouched).toBe(true);
            });
            it('should not mark the parent untouched if any touched siblings', () => {
                const c3 = new index_1.FormControl('');
                const form = new index_1.FormGroup({ 'a': a, 'c3': c3 });
                a.markAsTouched();
                c3.markAsTouched();
                expect(form.untouched).toBe(false);
                a.reset();
                expect(form.untouched).toBe(false);
            });
            it('should retain previous disabled state', () => {
                a.disable();
                a.reset();
                expect(a.disabled).toBe(true);
            });
            it('should set child disabled state if boxed value passed', () => {
                a.disable();
                a.reset([{ value: '', disabled: false }, '']);
                expect(c.disabled).toBe(false);
                expect(a.disabled).toBe(false);
            });
            describe('reset() events', () => {
                let form, c3, logger;
                beforeEach(() => {
                    c3 = new index_1.FormControl('');
                    form = new index_1.FormGroup({ 'a': a, 'c3': c3 });
                    logger = [];
                });
                it('should emit one valueChange event per reset control', () => {
                    form.valueChanges.subscribe(() => logger.push('form'));
                    a.valueChanges.subscribe(() => logger.push('array'));
                    c.valueChanges.subscribe(() => logger.push('control1'));
                    c2.valueChanges.subscribe(() => logger.push('control2'));
                    c3.valueChanges.subscribe(() => logger.push('control3'));
                    a.reset();
                    expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                });
                it('should not fire events when called with `emitEvent: false`', () => {
                    form.valueChanges.subscribe(() => logger.push('form'));
                    a.valueChanges.subscribe(() => logger.push('array'));
                    c.valueChanges.subscribe(() => logger.push('control1'));
                    c2.valueChanges.subscribe(() => logger.push('control2'));
                    c3.valueChanges.subscribe(() => logger.push('control3'));
                    a.reset([], { emitEvent: false });
                    expect(logger).toEqual([]);
                });
                it('should emit one statusChange event per reset control', () => {
                    form.statusChanges.subscribe(() => logger.push('form'));
                    a.statusChanges.subscribe(() => logger.push('array'));
                    c.statusChanges.subscribe(() => logger.push('control1'));
                    c2.statusChanges.subscribe(() => logger.push('control2'));
                    c3.statusChanges.subscribe(() => logger.push('control3'));
                    a.reset();
                    expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                });
                it('should mark as pristine and not dirty before emitting valueChange and statusChange events when resetting', () => {
                    const pristineAndNotDirty = () => {
                        expect(a.pristine).toBe(true);
                        expect(a.dirty).toBe(false);
                    };
                    c2.markAsDirty();
                    expect(a.pristine).toBe(false);
                    expect(a.dirty).toBe(true);
                    a.valueChanges.subscribe(pristineAndNotDirty);
                    a.statusChanges.subscribe(pristineAndNotDirty);
                    a.reset();
                });
            });
        });
        describe('errors', () => {
            it('should run the validator when the value changes', () => {
                const simpleValidator = (c) => c.controls[0].value != 'correct' ? { 'broken': true } : null;
                const c = new index_1.FormControl('');
                const g = new index_1.FormArray([c], simpleValidator);
                c.setValue('correct');
                expect(g.valid).toEqual(true);
                expect(g.errors).toEqual(null);
                c.setValue('incorrect');
                expect(g.valid).toEqual(false);
                expect(g.errors).toEqual({ 'broken': true });
            });
        });
        describe('dirty', () => {
            let c;
            let a;
            beforeEach(() => {
                c = new index_1.FormControl('value');
                a = new index_1.FormArray([c]);
            });
            it('should be false after creating a control', () => {
                expect(a.dirty).toEqual(false);
            });
            it('should be true after changing the value of the control', () => {
                c.markAsDirty();
                expect(a.dirty).toEqual(true);
            });
        });
        describe('touched', () => {
            let c;
            let a;
            beforeEach(() => {
                c = new index_1.FormControl('value');
                a = new index_1.FormArray([c]);
            });
            it('should be false after creating a control', () => {
                expect(a.touched).toEqual(false);
            });
            it('should be true after child control is marked as touched', () => {
                c.markAsTouched();
                expect(a.touched).toEqual(true);
            });
        });
        describe('pending', () => {
            let c;
            let a;
            beforeEach(() => {
                c = new index_1.FormControl('value');
                a = new index_1.FormArray([c]);
            });
            it('should be false after creating a control', () => {
                expect(c.pending).toEqual(false);
                expect(a.pending).toEqual(false);
            });
            it('should be true after changing the value of the control', () => {
                c.markAsPending();
                expect(c.pending).toEqual(true);
                expect(a.pending).toEqual(true);
            });
            it('should not update the parent when onlySelf = true', () => {
                c.markAsPending({ onlySelf: true });
                expect(c.pending).toEqual(true);
                expect(a.pending).toEqual(false);
            });
            describe('status change events', () => {
                let logger;
                beforeEach(() => {
                    logger = [];
                    a.statusChanges.subscribe((status) => logger.push(status));
                });
                it('should emit event after marking control as pending', () => {
                    c.markAsPending();
                    expect(logger).toEqual(['PENDING']);
                });
                it('should not emit event from parent when onlySelf is true', () => {
                    c.markAsPending({ onlySelf: true });
                    expect(logger).toEqual([]);
                });
                it('should not emit events when called with `emitEvent: false`', () => {
                    c.markAsPending({ emitEvent: false });
                    expect(logger).toEqual([]);
                });
                it('should emit event when parent is markedAsPending', () => {
                    a.markAsPending();
                    expect(logger).toEqual(['PENDING']);
                });
            });
        });
        describe('valueChanges', () => {
            let a;
            let c1, c2;
            beforeEach(() => {
                c1 = new index_1.FormControl('old1');
                c2 = new index_1.FormControl('old2');
                a = new index_1.FormArray([c1, c2]);
            });
            it('should fire an event after the value has been updated', (done) => {
                a.valueChanges.subscribe({
                    next: (value) => {
                        expect(a.value).toEqual(['new1', 'old2']);
                        expect(value).toEqual(['new1', 'old2']);
                        done();
                    },
                });
                c1.setValue('new1');
            });
            it("should fire an event after the control's observable fired an event", (done) => {
                let controlCallbackIsCalled = false;
                c1.valueChanges.subscribe({
                    next: (value) => {
                        controlCallbackIsCalled = true;
                    },
                });
                a.valueChanges.subscribe({
                    next: (value) => {
                        expect(controlCallbackIsCalled).toBe(true);
                        done();
                    },
                });
                c1.setValue('new1');
            });
            it('should fire an event when a control is removed', (done) => {
                a.valueChanges.subscribe({
                    next: (value) => {
                        expect(value).toEqual(['old1']);
                        done();
                    },
                });
                a.removeAt(1);
            });
            it('should fire an event when a control is added', (done) => {
                a.removeAt(1);
                a.valueChanges.subscribe({
                    next: (value) => {
                        expect(value).toEqual(['old1', 'old2']);
                        done();
                    },
                });
                a.push(c2);
            });
        });
        describe('get', () => {
            it('should return null when path is null', () => {
                const g = new index_1.FormGroup({});
                expect(g.get(null)).toEqual(null);
            });
            it('should return null when path is empty', () => {
                const g = new index_1.FormGroup({});
                expect(g.get([])).toEqual(null);
            });
            it('should return null when path is invalid', () => {
                const g = new index_1.FormGroup({});
                expect(g.get('invalid')).toEqual(null);
            });
            it('should return a child of a control group', () => {
                const g = new index_1.FormGroup({
                    'one': new index_1.FormControl('111'),
                    'nested': new index_1.FormGroup({ 'two': new index_1.FormControl('222') }),
                });
                expect(g.get(['one']).value).toEqual('111');
                expect(g.get('one').value).toEqual('111');
                expect(g.get(['nested', 'two']).value).toEqual('222');
                expect(g.get('nested.two').value).toEqual('222');
            });
            it('should return an element of an array', () => {
                const g = new index_1.FormGroup({ 'array': new index_1.FormArray([new index_1.FormControl('111')]) });
                expect(g.get(['array', 0]).value).toEqual('111');
            });
        });
        describe('validator', () => {
            function simpleValidator(c) {
                return c.get([0]).value === 'correct' ? null : { 'broken': true };
            }
            function arrayRequiredValidator(c) {
                return validators_1.Validators.required(c.get([0]));
            }
            it('should set a single validator', () => {
                const a = new index_1.FormArray([new index_1.FormControl()], simpleValidator);
                expect(a.valid).toBe(false);
                expect(a.errors).toEqual({ 'broken': true });
                a.setValue(['correct']);
                expect(a.valid).toBe(true);
            });
            it('should set a single validator from options obj', () => {
                const a = new index_1.FormArray([new index_1.FormControl()], { validators: simpleValidator });
                expect(a.valid).toBe(false);
                expect(a.errors).toEqual({ 'broken': true });
                a.setValue(['correct']);
                expect(a.valid).toBe(true);
            });
            it('should set multiple validators from an array', () => {
                const a = new index_1.FormArray([new index_1.FormControl()], [simpleValidator, arrayRequiredValidator]);
                expect(a.valid).toBe(false);
                expect(a.errors).toEqual({ 'required': true, 'broken': true });
                a.setValue(['c']);
                expect(a.valid).toBe(false);
                expect(a.errors).toEqual({ 'broken': true });
                a.setValue(['correct']);
                expect(a.valid).toBe(true);
            });
            it('should set multiple validators from options obj', () => {
                const a = new index_1.FormArray([new index_1.FormControl()], {
                    validators: [simpleValidator, arrayRequiredValidator],
                });
                expect(a.valid).toBe(false);
                expect(a.errors).toEqual({ 'required': true, 'broken': true });
                a.setValue(['c']);
                expect(a.valid).toBe(false);
                expect(a.errors).toEqual({ 'broken': true });
                a.setValue(['correct']);
                expect(a.valid).toBe(true);
            });
        });
        describe('asyncValidator', () => {
            function otherObservableValidator() {
                return (0, rxjs_1.of)({ 'other': true });
            }
            it('should run the async validator', (0, testing_1.fakeAsync)(() => {
                const c = new index_1.FormControl('value');
                const g = new index_1.FormArray([c], null, (0, util_1.asyncValidator)('expected'));
                expect(g.pending).toEqual(true);
                (0, testing_1.tick)();
                expect(g.errors).toEqual({ 'async': true });
                expect(g.pending).toEqual(false);
            }));
            it('should set a single async validator from options obj', (0, testing_1.fakeAsync)(() => {
                const g = new index_1.FormArray([new index_1.FormControl('value')], {
                    asyncValidators: (0, util_1.asyncValidator)('expected'),
                });
                expect(g.pending).toEqual(true);
                (0, testing_1.tick)();
                expect(g.errors).toEqual({ 'async': true });
                expect(g.pending).toEqual(false);
            }));
            it('should set multiple async validators from an array', (0, testing_1.fakeAsync)(() => {
                const g = new index_1.FormArray([new index_1.FormControl('value')], null, [
                    (0, util_1.asyncValidator)('expected'),
                    otherObservableValidator,
                ]);
                expect(g.pending).toEqual(true);
                (0, testing_1.tick)();
                expect(g.errors).toEqual({ 'async': true, 'other': true });
                expect(g.pending).toEqual(false);
            }));
            it('should set multiple async validators from options obj', (0, testing_1.fakeAsync)(() => {
                const g = new index_1.FormArray([new index_1.FormControl('value')], {
                    asyncValidators: [(0, util_1.asyncValidator)('expected'), otherObservableValidator],
                });
                expect(g.pending).toEqual(true);
                (0, testing_1.tick)();
                expect(g.errors).toEqual({ 'async': true, 'other': true });
                expect(g.pending).toEqual(false);
            }));
            it('should fire statusChanges events when async validators are added via options object', (0, testing_1.fakeAsync)(() => {
                // The behavior is tested (in other spec files) for each of the model types (`FormControl`,
                // `FormGroup` and `FormArray`).
                let statuses = [];
                // Create a form control with an async validator added via options object.
                const asc = new index_1.FormArray([], { asyncValidators: [() => Promise.resolve(null)] });
                // Subscribe to status changes.
                asc.statusChanges.subscribe((status) => statuses.push(status));
                // After a tick, the async validator should change status PENDING -> VALID.
                (0, testing_1.tick)();
                expect(statuses).toEqual(['VALID']);
            }));
        });
        describe('disable() & enable()', () => {
            let a;
            let c;
            let c2;
            beforeEach(() => {
                c = new index_1.FormControl(null);
                c2 = new index_1.FormControl(null);
                a = new index_1.FormArray([c, c2]);
            });
            it('should mark the array as disabled', () => {
                expect(a.disabled).toBe(false);
                expect(a.valid).toBe(true);
                a.disable();
                expect(a.disabled).toBe(true);
                expect(a.valid).toBe(false);
                a.enable();
                expect(a.disabled).toBe(false);
                expect(a.valid).toBe(true);
            });
            it('should set the array status as disabled', () => {
                expect(a.status).toBe('VALID');
                a.disable();
                expect(a.status).toBe('DISABLED');
                a.enable();
                expect(a.status).toBe('VALID');
            });
            it('should mark children of the array as disabled', () => {
                expect(c.disabled).toBe(false);
                expect(c2.disabled).toBe(false);
                a.disable();
                expect(c.disabled).toBe(true);
                expect(c2.disabled).toBe(true);
                a.enable();
                expect(c.disabled).toBe(false);
                expect(c2.disabled).toBe(false);
            });
            it('should ignore disabled controls in validation', () => {
                const g = new index_1.FormGroup({
                    nested: new index_1.FormArray([new index_1.FormControl(null, validators_1.Validators.required)]),
                    two: new index_1.FormControl('two'),
                });
                expect(g.valid).toBe(false);
                g.get('nested').disable();
                expect(g.valid).toBe(true);
                g.get('nested').enable();
                expect(g.valid).toBe(false);
            });
            it('should ignore disabled controls when serializing value', () => {
                const g = new index_1.FormGroup({
                    nested: new index_1.FormArray([new index_1.FormControl('one')]),
                    two: new index_1.FormControl('two'),
                });
                expect(g.value).toEqual({ 'nested': ['one'], 'two': 'two' });
                g.get('nested').disable();
                expect(g.value).toEqual({ 'two': 'two' });
                g.get('nested').enable();
                expect(g.value).toEqual({ 'nested': ['one'], 'two': 'two' });
            });
            it('should ignore disabled controls when determining dirtiness', () => {
                const g = new index_1.FormGroup({ nested: a, two: new index_1.FormControl('two') });
                g.get(['nested', 0]).markAsDirty();
                expect(g.dirty).toBe(true);
                g.get('nested').disable();
                expect(g.get('nested').dirty).toBe(true);
                expect(g.dirty).toEqual(false);
                g.get('nested').enable();
                expect(g.dirty).toEqual(true);
            });
            it('should ignore disabled controls when determining touched state', () => {
                const g = new index_1.FormGroup({ nested: a, two: new index_1.FormControl('two') });
                g.get(['nested', 0]).markAsTouched();
                expect(g.touched).toBe(true);
                g.get('nested').disable();
                expect(g.get('nested').touched).toBe(true);
                expect(g.touched).toEqual(false);
                g.get('nested').enable();
                expect(g.touched).toEqual(true);
            });
            it('should keep empty, disabled arrays disabled when updating validity', () => {
                const arr = new index_1.FormArray([]);
                expect(arr.status).toEqual('VALID');
                arr.disable();
                expect(arr.status).toEqual('DISABLED');
                arr.updateValueAndValidity();
                expect(arr.status).toEqual('DISABLED');
                arr.push(new index_1.FormControl({ value: '', disabled: true }));
                expect(arr.status).toEqual('DISABLED');
                arr.push(new index_1.FormControl());
                expect(arr.status).toEqual('VALID');
            });
            it('should re-enable empty, disabled arrays', () => {
                const arr = new index_1.FormArray([]);
                arr.disable();
                expect(arr.status).toEqual('DISABLED');
                arr.enable();
                expect(arr.status).toEqual('VALID');
            });
            it('should not run validators on disabled controls', () => {
                const validator = jasmine.createSpy('validator');
                const arr = new index_1.FormArray([new index_1.FormControl()], validator);
                expect(validator.calls.count()).toEqual(1);
                arr.disable();
                expect(validator.calls.count()).toEqual(1);
                arr.setValue(['value']);
                expect(validator.calls.count()).toEqual(1);
                arr.enable();
                expect(validator.calls.count()).toEqual(2);
            });
            describe('disabled errors', () => {
                it('should clear out array errors when disabled', () => {
                    const arr = new index_1.FormArray([new index_1.FormControl()], () => ({ 'expected': true }));
                    expect(arr.errors).toEqual({ 'expected': true });
                    arr.disable();
                    expect(arr.errors).toEqual(null);
                    arr.enable();
                    expect(arr.errors).toEqual({ 'expected': true });
                });
                it('should re-populate array errors when enabled from a child', () => {
                    const arr = new index_1.FormArray([new index_1.FormControl()], () => ({ 'expected': true }));
                    arr.disable();
                    expect(arr.errors).toEqual(null);
                    arr.push(new index_1.FormControl());
                    expect(arr.errors).toEqual({ 'expected': true });
                });
                it('should clear out async array errors when disabled', (0, testing_1.fakeAsync)(() => {
                    const arr = new index_1.FormArray([new index_1.FormControl()], null, (0, util_1.asyncValidator)('expected'));
                    (0, testing_1.tick)();
                    expect(arr.errors).toEqual({ 'async': true });
                    arr.disable();
                    expect(arr.errors).toEqual(null);
                    arr.enable();
                    (0, testing_1.tick)();
                    expect(arr.errors).toEqual({ 'async': true });
                }));
                it('should re-populate async array errors when enabled from a child', (0, testing_1.fakeAsync)(() => {
                    const arr = new index_1.FormArray([new index_1.FormControl()], null, (0, util_1.asyncValidator)('expected'));
                    (0, testing_1.tick)();
                    expect(arr.errors).toEqual({ 'async': true });
                    arr.disable();
                    expect(arr.errors).toEqual(null);
                    arr.push(new index_1.FormControl());
                    (0, testing_1.tick)();
                    expect(arr.errors).toEqual({ 'async': true });
                }));
            });
            describe('disabled events', () => {
                let logger;
                let c;
                let a;
                let form;
                beforeEach(() => {
                    logger = [];
                    c = new index_1.FormControl('', validators_1.Validators.required);
                    a = new index_1.FormArray([c]);
                    form = new index_1.FormGroup({ a: a });
                });
                it('should emit value change events in the right order', () => {
                    c.valueChanges.subscribe(() => logger.push('control'));
                    a.valueChanges.subscribe(() => logger.push('array'));
                    form.valueChanges.subscribe(() => logger.push('form'));
                    a.disable();
                    expect(logger).toEqual(['control', 'array', 'form']);
                });
                it('should emit status change events in the right order', () => {
                    c.statusChanges.subscribe(() => logger.push('control'));
                    a.statusChanges.subscribe(() => logger.push('array'));
                    form.statusChanges.subscribe(() => logger.push('form'));
                    a.disable();
                    expect(logger).toEqual(['control', 'array', 'form']);
                });
                it('should not emit value change events when called with `emitEvent: false`', () => {
                    c.valueChanges.subscribe(() => logger.push('control'));
                    a.valueChanges.subscribe(() => logger.push('array'));
                    form.valueChanges.subscribe(() => logger.push('form'));
                    a.disable({ emitEvent: false });
                    expect(logger).toEqual([]);
                    a.enable({ emitEvent: false });
                    expect(logger).toEqual([]);
                });
                it('should not emit status change events when called with `emitEvent: false`', () => {
                    c.statusChanges.subscribe(() => logger.push('control'));
                    a.statusChanges.subscribe(() => logger.push('array'));
                    form.statusChanges.subscribe(() => logger.push('form'));
                    a.disable({ emitEvent: false });
                    expect(logger).toEqual([]);
                    a.enable({ emitEvent: false });
                    expect(logger).toEqual([]);
                });
            });
            describe('setControl()', () => {
                let c;
                let a;
                beforeEach(() => {
                    c = new index_1.FormControl('one');
                    a = new index_1.FormArray([c]);
                });
                it('should replace existing control with new control', () => {
                    const c2 = new index_1.FormControl('new!', validators_1.Validators.minLength(10));
                    a.setControl(0, c2);
                    expect(a.controls[0]).toEqual(c2);
                    expect(a.value).toEqual(['new!']);
                    expect(a.valid).toBe(false);
                });
                it('should add control if control did not exist before', () => {
                    const c2 = new index_1.FormControl('new!', validators_1.Validators.minLength(10));
                    a.setControl(1, c2);
                    expect(a.controls[1]).toEqual(c2);
                    expect(a.value).toEqual(['one', 'new!']);
                    expect(a.valid).toBe(false);
                });
                it('should remove control if new control is null', () => {
                    a.setControl(0, null);
                    expect(a.controls[0]).not.toBeDefined();
                    expect(a.value).toEqual([]);
                });
                it('should only emit value change event once', () => {
                    const logger = [];
                    const c2 = new index_1.FormControl('new!');
                    a.valueChanges.subscribe(() => logger.push('change!'));
                    a.setControl(0, c2);
                    expect(logger).toEqual(['change!']);
                });
            });
        });
        describe('out of bounds positive indices', () => {
            let c1 = new index_1.FormControl(1);
            let c2 = new index_1.FormControl(2);
            let c3 = new index_1.FormControl(3);
            let c4 = new index_1.FormControl(4);
            let c99 = new index_1.FormControl(99);
            let fa;
            beforeEach(() => {
                fa = new index_1.FormArray([c1, c2, c3, c4]);
            });
            // This spec checks the behavior is identical to `Array.prototype.at(index)`
            it('should work with at', () => {
                expect(fa.at(4)).toBeUndefined();
            });
            // This spec checks the behavior is identical to `Array.prototype.splice(index, 1, ...)`
            it('should work with setControl', () => {
                fa.setControl(4, c99);
                expect(fa.value).toEqual([1, 2, 3, 4, 99]);
            });
            // This spec checks the behavior is identical to `Array.prototype.splice(index, 1)`
            it('should work with removeAt', () => {
                fa.removeAt(4);
                expect(fa.value).toEqual([1, 2, 3, 4]);
            });
            // This spec checks the behavior is identical to `Array.prototype.splice(index, 0, ...)`
            it('should work with insert', () => {
                fa.insert(4, c99);
                expect(fa.value).toEqual([1, 2, 3, 4, 99]);
            });
        });
        describe('negative indices', () => {
            let c1 = new index_1.FormControl(1);
            let c2 = new index_1.FormControl(2);
            let c3 = new index_1.FormControl(3);
            let c4 = new index_1.FormControl(4);
            let c99 = new index_1.FormControl(99);
            let fa;
            beforeEach(() => {
                fa = new index_1.FormArray([c1, c2, c3, c4]);
            });
            // This spec checks the behavior is identical to `Array.prototype.at(index)`
            describe('should work with at', () => {
                it('wrapping from the back between [-length, 0)', () => {
                    expect(fa.at(-1)).toBe(c4);
                    expect(fa.at(-2)).toBe(c3);
                    expect(fa.at(-3)).toBe(c2);
                    expect(fa.at(-4)).toBe(c1);
                });
                it('becoming undefined when less than -length', () => {
                    expect(fa.at(-5)).toBeUndefined();
                    expect(fa.at(-10)).toBeUndefined();
                });
            });
            // This spec checks the behavior is identical to `Array.prototype.splice(index, 1, ...)`
            describe('should work with setControl', () => {
                describe('wrapping from the back between [-length, 0)', () => {
                    it('at -1', () => {
                        fa.setControl(-1, c99);
                        expect(fa.value).toEqual([1, 2, 3, 99]);
                    });
                    it('at -2', () => {
                        fa.setControl(-2, c99);
                        expect(fa.value).toEqual([1, 2, 99, 4]);
                    });
                    it('at -3', () => {
                        fa.setControl(-3, c99);
                        expect(fa.value).toEqual([1, 99, 3, 4]);
                    });
                    it('at -4', () => {
                        fa.setControl(-4, c99);
                        expect(fa.value).toEqual([99, 2, 3, 4]);
                    });
                });
                describe('replacing the first item when less than -length', () => {
                    it('at -5', () => {
                        fa.setControl(-5, c99);
                        expect(fa.value).toEqual([99, 2, 3, 4]);
                    });
                    it('at -10', () => {
                        fa.setControl(-10, c99);
                        expect(fa.value).toEqual([99, 2, 3, 4]);
                    });
                });
            });
            // This spec checks the behavior is identical to `Array.prototype.splice(index, 1)`
            describe('should work with removeAt', () => {
                describe('wrapping from the back between [-length, 0)', () => {
                    it('at -1', () => {
                        fa.removeAt(-1);
                        expect(fa.value).toEqual([1, 2, 3]);
                    });
                    it('at -2', () => {
                        fa.removeAt(-2);
                        expect(fa.value).toEqual([1, 2, 4]);
                    });
                    it('at -3', () => {
                        fa.removeAt(-3);
                        expect(fa.value).toEqual([1, 3, 4]);
                    });
                    it('at -4', () => {
                        fa.removeAt(-4);
                        expect(fa.value).toEqual([2, 3, 4]);
                    });
                });
                describe('removing the first item when less than -length', () => {
                    it('at -5', () => {
                        fa.removeAt(-5);
                        expect(fa.value).toEqual([2, 3, 4]);
                    });
                    it('at -10', () => {
                        fa.removeAt(-10);
                        expect(fa.value).toEqual([2, 3, 4]);
                    });
                });
            });
            // This spec checks the behavior is identical to `Array.prototype.splice(index, 0, ...)`
            describe('should work with insert', () => {
                describe('wrapping from the back between [-length, 0)', () => {
                    it('at -1', () => {
                        fa.insert(-1, c99);
                        expect(fa.value).toEqual([1, 2, 3, 99, 4]);
                    });
                    it('at -2', () => {
                        fa.insert(-2, c99);
                        expect(fa.value).toEqual([1, 2, 99, 3, 4]);
                    });
                    it('at -3', () => {
                        fa.insert(-3, c99);
                        expect(fa.value).toEqual([1, 99, 2, 3, 4]);
                    });
                    it('at -4', () => {
                        fa.insert(-4, c99);
                        expect(fa.value).toEqual([99, 1, 2, 3, 4]);
                    });
                });
                describe('prepending when less than -length', () => {
                    it('at -5', () => {
                        fa.insert(-5, c99);
                        expect(fa.value).toEqual([99, 1, 2, 3, 4]);
                    });
                    it('at -10', () => {
                        fa.insert(-10, c99);
                        expect(fa.value).toEqual([99, 1, 2, 3, 4]);
                    });
                });
                describe('can be extended', () => {
                    it('by a simple strongly-typed array', () => {
                        class StringFormArray extends index_1.FormArray {
                            constructor() {
                                super(...arguments);
                                this.value = [];
                            }
                        }
                    });
                    it('by a class that redefines many properties', () => {
                        class OtherTypedFormArray extends index_1.FormArray {
                            constructor() {
                                super(...arguments);
                                this.controls = {};
                                this.value = [];
                            }
                        }
                    });
                });
            });
        });
    });
})();
