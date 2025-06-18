"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../index");
const shared_1 = require("../src/directives/shared");
const validators_1 = require("../src/validators");
const util_1 = require("./util");
class DummyControlValueAccessor {
    registerOnChange(fn) { }
    registerOnTouched(fn) { }
    writeValue(obj) {
        this.writtenValue = obj;
    }
}
class CustomValidatorDirective {
    validate(c) {
        return { 'custom': true };
    }
}
describe('Form Directives', () => {
    let defaultAccessor;
    beforeEach(() => {
        defaultAccessor = new index_1.DefaultValueAccessor(null, null, null);
    });
    describe('shared', () => {
        describe('selectValueAccessor', () => {
            let dir;
            beforeEach(() => {
                dir = { path: [] };
            });
            it('should throw when given an empty array', () => {
                expect(() => (0, shared_1.selectValueAccessor)(dir, [])).toThrowError();
            });
            it('should throw when accessor is not provided as array', () => {
                expect(() => (0, shared_1.selectValueAccessor)(dir, {})).toThrowError('NG01200: Value accessor was not provided as an array for form control with unspecified name attribute. Check that the `NG_VALUE_ACCESSOR` token is configured as a `multi: true` provider.');
            });
            it('should return the default value accessor when no other provided', () => {
                expect((0, shared_1.selectValueAccessor)(dir, [defaultAccessor])).toEqual(defaultAccessor);
            });
            it('should return checkbox accessor when provided', () => {
                const checkboxAccessor = new index_1.CheckboxControlValueAccessor(null, null);
                expect((0, shared_1.selectValueAccessor)(dir, [defaultAccessor, checkboxAccessor])).toEqual(checkboxAccessor);
            });
            it('should return select accessor when provided', () => {
                const selectAccessor = new index_1.SelectControlValueAccessor(null, null);
                expect((0, shared_1.selectValueAccessor)(dir, [defaultAccessor, selectAccessor])).toEqual(selectAccessor);
            });
            it('should return select multiple accessor when provided', () => {
                const selectMultipleAccessor = new index_1.SelectMultipleControlValueAccessor(null, null);
                expect((0, shared_1.selectValueAccessor)(dir, [defaultAccessor, selectMultipleAccessor])).toEqual(selectMultipleAccessor);
            });
            it('should throw when more than one build-in accessor is provided', () => {
                const checkboxAccessor = new index_1.CheckboxControlValueAccessor(null, null);
                const selectAccessor = new index_1.SelectControlValueAccessor(null, null);
                expect(() => (0, shared_1.selectValueAccessor)(dir, [checkboxAccessor, selectAccessor])).toThrowError();
            });
            it('should return custom accessor when provided', () => {
                const customAccessor = {};
                const checkboxAccessor = new index_1.CheckboxControlValueAccessor(null, null);
                expect((0, shared_1.selectValueAccessor)(dir, [defaultAccessor, customAccessor, checkboxAccessor])).toEqual(customAccessor);
            });
            it('should return custom accessor when provided with select multiple', () => {
                const customAccessor = {};
                const selectMultipleAccessor = new index_1.SelectMultipleControlValueAccessor(null, null);
                expect((0, shared_1.selectValueAccessor)(dir, [defaultAccessor, customAccessor, selectMultipleAccessor])).toEqual(customAccessor);
            });
            it('should throw when more than one custom accessor is provided', () => {
                const customAccessor = {};
                expect(() => (0, shared_1.selectValueAccessor)(dir, [customAccessor, customAccessor])).toThrowError();
            });
        });
        describe('composeValidators', () => {
            it('should compose functions', () => {
                const dummy1 = () => ({ 'dummy1': true });
                const dummy2 = () => ({ 'dummy2': true });
                const v = (0, validators_1.composeValidators)([dummy1, dummy2]);
                expect(v(new index_1.FormControl(''))).toEqual({ 'dummy1': true, 'dummy2': true });
            });
            it('should compose validator directives', () => {
                const dummy1 = () => ({ 'dummy1': true });
                const v = (0, validators_1.composeValidators)([dummy1, new CustomValidatorDirective()]);
                expect(v(new index_1.FormControl(''))).toEqual({ 'dummy1': true, 'custom': true });
            });
        });
    });
    describe('formGroup', () => {
        let form;
        let formModel;
        let loginControlDir;
        beforeEach(() => {
            form = new index_1.FormGroupDirective([], []);
            formModel = new index_1.FormGroup({
                'login': new index_1.FormControl(),
                'passwords': new index_1.FormGroup({
                    'password': new index_1.FormControl(),
                    'passwordConfirm': new index_1.FormControl(),
                }),
            });
            form.form = formModel;
            loginControlDir = new index_1.FormControlName(form, [index_1.Validators.required], [(0, util_1.asyncValidator)('expected')], [defaultAccessor], null);
            loginControlDir.name = 'login';
            loginControlDir.valueAccessor = new DummyControlValueAccessor();
        });
        it('should reexport control properties', () => {
            expect(form.control).toBe(formModel);
            expect(form.value).toBe(formModel.value);
            expect(form.valid).toBe(formModel.valid);
            expect(form.invalid).toBe(formModel.invalid);
            expect(form.pending).toBe(formModel.pending);
            expect(form.errors).toBe(formModel.errors);
            expect(form.pristine).toBe(formModel.pristine);
            expect(form.dirty).toBe(formModel.dirty);
            expect(form.touched).toBe(formModel.touched);
            expect(form.untouched).toBe(formModel.untouched);
            expect(form.statusChanges).toBe(formModel.statusChanges);
            expect(form.valueChanges).toBe(formModel.valueChanges);
        });
        it('should reexport control methods', () => {
            expect(form.hasError('required')).toBe(formModel.hasError('required'));
            expect(form.getError('required')).toBe(formModel.getError('required'));
            formModel.setErrors({ required: true });
            expect(form.hasError('required')).toBe(formModel.hasError('required'));
            expect(form.getError('required')).toBe(formModel.getError('required'));
        });
        describe('addControl', () => {
            it('should throw when no control found', () => {
                const dir = new index_1.FormControlName(form, null, null, [defaultAccessor], null);
                dir.name = 'invalidName';
                expect(() => form.addControl(dir)).toThrowError(new RegExp(`Cannot find control with name: 'invalidName'`));
            });
            it('should throw for a named control when no value accessor', () => {
                const dir = new index_1.FormControlName(form, null, null, null, null);
                dir.name = 'login';
                expect(() => form.addControl(dir)).toThrowError(new RegExp(`NG01203: No value accessor for form control name: 'login'. Find more at https://angular.dev/errors/NG01203`));
            });
            it('should throw when no value accessor with path', () => {
                const group = new index_1.FormGroupName(form, null, null);
                const dir = new index_1.FormControlName(group, null, null, null, null);
                group.name = 'passwords';
                dir.name = 'password';
                expect(() => form.addControl(dir)).toThrowError(new RegExp(`NG01203: No value accessor for form control path: 'passwords -> password'. Find more at https://angular.dev/errors/NG01203`));
            });
            it('should set up validators', (0, testing_1.fakeAsync)(() => {
                form.addControl(loginControlDir);
                // sync validators are set
                expect(formModel.hasError('required', ['login'])).toBe(true);
                expect(formModel.hasError('async', ['login'])).toBe(false);
                formModel.get('login').setValue('invalid value');
                // sync validator passes, running async validators
                expect(formModel.pending).toBe(true);
                (0, testing_1.tick)();
                expect(formModel.hasError('required', ['login'])).toBe(false);
                expect(formModel.hasError('async', ['login'])).toBe(true);
            }));
            it('should write value to the DOM', () => {
                formModel.get(['login']).setValue('initValue');
                form.addControl(loginControlDir);
                expect(loginControlDir.valueAccessor.writtenValue).toEqual('initValue');
            });
            it('should add the directive to the list of directives included in the form', () => {
                form.addControl(loginControlDir);
                expect(form.directives).toEqual([loginControlDir]);
            });
        });
        describe('addFormGroup', () => {
            const matchingPasswordsValidator = (g) => {
                const controls = g.controls;
                if (controls['password'].value != controls['passwordConfirm'].value) {
                    return { 'differentPasswords': true };
                }
                else {
                    return null;
                }
            };
            it('should set up validator', (0, testing_1.fakeAsync)(() => {
                const group = new index_1.FormGroupName(form, [matchingPasswordsValidator], [(0, util_1.asyncValidator)('expected')]);
                group.name = 'passwords';
                form.addFormGroup(group);
                formModel.get(['passwords', 'password']).setValue('somePassword');
                formModel.get(['passwords', 'passwordConfirm']).setValue('someOtherPassword');
                // sync validators are set
                expect(formModel.hasError('differentPasswords', ['passwords'])).toEqual(true);
                formModel.get(['passwords', 'passwordConfirm']).setValue('somePassword');
                // sync validators pass, running async validators
                expect(formModel.pending).toBe(true);
                (0, testing_1.tick)();
                expect(formModel.hasError('async', ['passwords'])).toBe(true);
            }));
        });
        describe('removeControl', () => {
            it('should remove the directive to the list of directives included in the form', () => {
                form.addControl(loginControlDir);
                form.removeControl(loginControlDir);
                expect(form.directives).toEqual([]);
            });
        });
        describe('ngOnChanges', () => {
            it('should update dom values of all the directives', () => {
                form.addControl(loginControlDir);
                formModel.get(['login']).setValue('new value');
                form.ngOnChanges({});
                expect(loginControlDir.valueAccessor.writtenValue).toEqual('new value');
            });
            it('should set up a sync validator', () => {
                const formValidator = (c) => ({ 'custom': true });
                const f = new index_1.FormGroupDirective([formValidator], []);
                f.form = formModel;
                f.ngOnChanges({ 'form': new core_1.SimpleChange(null, null, false) });
                expect(formModel.errors).toEqual({ 'custom': true });
            });
            it('should set up an async validator', (0, testing_1.fakeAsync)(() => {
                const f = new index_1.FormGroupDirective([], [(0, util_1.asyncValidator)('expected')]);
                f.form = formModel;
                f.ngOnChanges({ 'form': new core_1.SimpleChange(null, null, false) });
                (0, testing_1.tick)();
                expect(formModel.errors).toEqual({ 'async': true });
            }));
        });
    });
    describe('NgForm', () => {
        let form;
        let formModel;
        let loginControlDir;
        let personControlGroupDir;
        beforeEach(() => {
            form = new index_1.NgForm([], []);
            formModel = form.form;
            personControlGroupDir = new index_1.NgModelGroup(form, [], []);
            personControlGroupDir.name = 'person';
            loginControlDir = new index_1.NgModel(personControlGroupDir, null, null, [defaultAccessor]);
            loginControlDir.name = 'login';
            loginControlDir.valueAccessor = new DummyControlValueAccessor();
        });
        it('should reexport control properties', () => {
            expect(form.control).toBe(formModel);
            expect(form.value).toBe(formModel.value);
            expect(form.valid).toBe(formModel.valid);
            expect(form.invalid).toBe(formModel.invalid);
            expect(form.pending).toBe(formModel.pending);
            expect(form.errors).toBe(formModel.errors);
            expect(form.pristine).toBe(formModel.pristine);
            expect(form.dirty).toBe(formModel.dirty);
            expect(form.touched).toBe(formModel.touched);
            expect(form.untouched).toBe(formModel.untouched);
            expect(form.statusChanges).toBe(formModel.statusChanges);
            expect(form.status).toBe(formModel.status);
            expect(form.valueChanges).toBe(formModel.valueChanges);
            expect(form.disabled).toBe(formModel.disabled);
            expect(form.enabled).toBe(formModel.enabled);
        });
        it('should reexport control methods', () => {
            expect(form.hasError('required')).toBe(formModel.hasError('required'));
            expect(form.getError('required')).toBe(formModel.getError('required'));
            formModel.setErrors({ required: true });
            expect(form.hasError('required')).toBe(formModel.hasError('required'));
            expect(form.getError('required')).toBe(formModel.getError('required'));
        });
        describe('addControl & addFormGroup', () => {
            it('should create a control with the given name', (0, testing_1.fakeAsync)(() => {
                form.addFormGroup(personControlGroupDir);
                form.addControl(loginControlDir);
                (0, testing_1.flushMicrotasks)();
                expect(formModel.get(['person', 'login'])).not.toBeNull();
            }));
            // should update the form's value and validity
        });
        describe('removeControl & removeFormGroup', () => {
            it('should remove control', (0, testing_1.fakeAsync)(() => {
                form.addFormGroup(personControlGroupDir);
                form.addControl(loginControlDir);
                form.removeFormGroup(personControlGroupDir);
                form.removeControl(loginControlDir);
                (0, testing_1.flushMicrotasks)();
                expect(formModel.get(['person'])).toBeNull();
                expect(formModel.get(['person', 'login'])).toBeNull();
            }));
            // should update the form's value and validity
        });
        it('should set up sync validator', (0, testing_1.fakeAsync)(() => {
            const formValidator = () => ({ 'custom': true });
            const f = new index_1.NgForm([formValidator], []);
            (0, testing_1.tick)();
            expect(f.form.errors).toEqual({ 'custom': true });
        }));
        it('should set up async validator', (0, testing_1.fakeAsync)(() => {
            const f = new index_1.NgForm([], [(0, util_1.asyncValidator)('expected')]);
            (0, testing_1.tick)();
            expect(f.form.errors).toEqual({ 'async': true });
        }));
        describe('events emissions', () => {
            it('formControl should emit an event when resetting a form', () => {
                const f = new index_1.NgForm([], []);
                const events = [];
                f.form.events.subscribe((event) => events.push(event));
                f.resetForm();
                expect(events.length).toBe(4);
                expect(events[0]).toBeInstanceOf(index_1.TouchedChangeEvent);
                expect(events[1]).toBeInstanceOf(index_1.ValueChangeEvent);
                expect(events[2]).toBeInstanceOf(index_1.StatusChangeEvent);
                // The event that matters
                expect(events[3]).toBeInstanceOf(index_1.FormResetEvent);
                expect(events[3].source).toBe(f.form);
            });
            it('formControl should emit an event when submitting a form', () => {
                const f = new index_1.NgForm([], []);
                const events = [];
                f.form.events.subscribe((event) => events.push(event));
                f.onSubmit({});
                expect(events.length).toBe(1);
                expect(events[0]).toBeInstanceOf(index_1.FormSubmittedEvent);
                expect(events[0].source).toBe(f.form);
            });
        });
    });
    describe('FormGroupName', () => {
        let formModel;
        let controlGroupDir;
        beforeEach(() => {
            formModel = new index_1.FormGroup({ 'login': new index_1.FormControl(null) });
            const parent = new index_1.FormGroupDirective([], []);
            parent.form = new index_1.FormGroup({ 'group': formModel });
            controlGroupDir = new index_1.FormGroupName(parent, [], []);
            controlGroupDir.name = 'group';
        });
        it('should reexport control properties', () => {
            expect(controlGroupDir.control).toBe(formModel);
            expect(controlGroupDir.value).toBe(formModel.value);
            expect(controlGroupDir.valid).toBe(formModel.valid);
            expect(controlGroupDir.invalid).toBe(formModel.invalid);
            expect(controlGroupDir.pending).toBe(formModel.pending);
            expect(controlGroupDir.errors).toBe(formModel.errors);
            expect(controlGroupDir.pristine).toBe(formModel.pristine);
            expect(controlGroupDir.dirty).toBe(formModel.dirty);
            expect(controlGroupDir.touched).toBe(formModel.touched);
            expect(controlGroupDir.untouched).toBe(formModel.untouched);
            expect(controlGroupDir.statusChanges).toBe(formModel.statusChanges);
            expect(controlGroupDir.status).toBe(formModel.status);
            expect(controlGroupDir.valueChanges).toBe(formModel.valueChanges);
            expect(controlGroupDir.disabled).toBe(formModel.disabled);
            expect(controlGroupDir.enabled).toBe(formModel.enabled);
        });
        it('should reexport control methods', () => {
            expect(controlGroupDir.hasError('required')).toBe(formModel.hasError('required'));
            expect(controlGroupDir.getError('required')).toBe(formModel.getError('required'));
            formModel.setErrors({ required: true });
            expect(controlGroupDir.hasError('required')).toBe(formModel.hasError('required'));
            expect(controlGroupDir.getError('required')).toBe(formModel.getError('required'));
        });
    });
    describe('FormArrayName', () => {
        let formModel;
        let formArrayDir;
        beforeEach(() => {
            const parent = new index_1.FormGroupDirective([], []);
            formModel = new index_1.FormArray([new index_1.FormControl('')]);
            parent.form = new index_1.FormGroup({ 'array': formModel });
            formArrayDir = new index_1.FormArrayName(parent, [], []);
            formArrayDir.name = 'array';
        });
        it('should reexport control properties', () => {
            expect(formArrayDir.control).toBe(formModel);
            expect(formArrayDir.value).toBe(formModel.value);
            expect(formArrayDir.valid).toBe(formModel.valid);
            expect(formArrayDir.invalid).toBe(formModel.invalid);
            expect(formArrayDir.pending).toBe(formModel.pending);
            expect(formArrayDir.errors).toBe(formModel.errors);
            expect(formArrayDir.pristine).toBe(formModel.pristine);
            expect(formArrayDir.dirty).toBe(formModel.dirty);
            expect(formArrayDir.touched).toBe(formModel.touched);
            expect(formArrayDir.status).toBe(formModel.status);
            expect(formArrayDir.untouched).toBe(formModel.untouched);
            expect(formArrayDir.disabled).toBe(formModel.disabled);
            expect(formArrayDir.enabled).toBe(formModel.enabled);
        });
        it('should reexport control methods', () => {
            expect(formArrayDir.hasError('required')).toBe(formModel.hasError('required'));
            expect(formArrayDir.getError('required')).toBe(formModel.getError('required'));
            formModel.setErrors({ required: true });
            expect(formArrayDir.hasError('required')).toBe(formModel.hasError('required'));
            expect(formArrayDir.getError('required')).toBe(formModel.getError('required'));
        });
    });
    describe('FormControlDirective', () => {
        let controlDir;
        let control;
        const checkProperties = function (control) {
            expect(controlDir.control).toBe(control);
            expect(controlDir.value).toBe(control.value);
            expect(controlDir.valid).toBe(control.valid);
            expect(controlDir.invalid).toBe(control.invalid);
            expect(controlDir.pending).toBe(control.pending);
            expect(controlDir.errors).toBe(control.errors);
            expect(controlDir.pristine).toBe(control.pristine);
            expect(controlDir.dirty).toBe(control.dirty);
            expect(controlDir.touched).toBe(control.touched);
            expect(controlDir.untouched).toBe(control.untouched);
            expect(controlDir.statusChanges).toBe(control.statusChanges);
            expect(controlDir.status).toBe(control.status);
            expect(controlDir.valueChanges).toBe(control.valueChanges);
            expect(controlDir.disabled).toBe(control.disabled);
            expect(controlDir.enabled).toBe(control.enabled);
        };
        beforeEach(() => {
            controlDir = new index_1.FormControlDirective([index_1.Validators.required], [], [defaultAccessor], null);
            controlDir.valueAccessor = new DummyControlValueAccessor();
            control = new index_1.FormControl(null);
            controlDir.form = control;
        });
        it('should reexport control properties', () => {
            checkProperties(control);
        });
        it('should reexport control methods', () => {
            expect(controlDir.hasError('required')).toBe(control.hasError('required'));
            expect(controlDir.getError('required')).toBe(control.getError('required'));
            control.setErrors({ required: true });
            expect(controlDir.hasError('required')).toBe(control.hasError('required'));
            expect(controlDir.getError('required')).toBe(control.getError('required'));
        });
        it('should reexport new control properties', () => {
            const newControl = new index_1.FormControl(null);
            controlDir.form = newControl;
            controlDir.ngOnChanges({ 'form': new core_1.SimpleChange(control, newControl, false) });
            checkProperties(newControl);
        });
        it('should set up validator', () => {
            expect(control.valid).toBe(true);
            // this will add the required validator and recalculate the validity
            controlDir.ngOnChanges({ 'form': new core_1.SimpleChange(null, control, false) });
            expect(control.valid).toBe(false);
        });
    });
    describe('NgModel', () => {
        let ngModel;
        let control;
        beforeEach(() => {
            ngModel = new index_1.NgModel(null, [index_1.Validators.required], [(0, util_1.asyncValidator)('expected')], [defaultAccessor]);
            ngModel.valueAccessor = new DummyControlValueAccessor();
            control = ngModel.control;
        });
        it('should reexport control properties', () => {
            expect(ngModel.control).toBe(control);
            expect(ngModel.value).toBe(control.value);
            expect(ngModel.valid).toBe(control.valid);
            expect(ngModel.invalid).toBe(control.invalid);
            expect(ngModel.pending).toBe(control.pending);
            expect(ngModel.errors).toBe(control.errors);
            expect(ngModel.pristine).toBe(control.pristine);
            expect(ngModel.dirty).toBe(control.dirty);
            expect(ngModel.touched).toBe(control.touched);
            expect(ngModel.untouched).toBe(control.untouched);
            expect(ngModel.statusChanges).toBe(control.statusChanges);
            expect(ngModel.status).toBe(control.status);
            expect(ngModel.valueChanges).toBe(control.valueChanges);
            expect(ngModel.disabled).toBe(control.disabled);
            expect(ngModel.enabled).toBe(control.enabled);
        });
        it('should reexport control methods', () => {
            expect(ngModel.hasError('required')).toBe(control.hasError('required'));
            expect(ngModel.getError('required')).toBe(control.getError('required'));
            control.setErrors({ required: true });
            expect(ngModel.hasError('required')).toBe(control.hasError('required'));
            expect(ngModel.getError('required')).toBe(control.getError('required'));
        });
        it('should throw when no value accessor with named control', () => {
            const namedDir = new index_1.NgModel(null, null, null, null);
            namedDir.name = 'one';
            expect(() => namedDir.ngOnChanges({})).toThrowError(new RegExp(`NG01203: No value accessor for form control name: 'one'. Find more at https://angular.dev/errors/NG01203`));
        });
        it('should throw when no value accessor with unnamed control', () => {
            const unnamedDir = new index_1.NgModel(null, null, null, null);
            expect(() => unnamedDir.ngOnChanges({})).toThrowError(new RegExp(`NG01203: No value accessor for form control unspecified name attribute. Find more at https://angular.dev/errors/NG01203`));
        });
        it('should set up validator', (0, testing_1.fakeAsync)(() => {
            // this will add the required validator and recalculate the validity
            ngModel.ngOnChanges({});
            (0, testing_1.tick)();
            expect(ngModel.control.errors).toEqual({ 'required': true });
            ngModel.control.setValue('someValue');
            (0, testing_1.tick)();
            expect(ngModel.control.errors).toEqual({ 'async': true });
        }));
        it('should mark as disabled properly', (0, testing_1.fakeAsync)(() => {
            ngModel.ngOnChanges({ isDisabled: new core_1.SimpleChange('', undefined, false) });
            (0, testing_1.tick)();
            expect(ngModel.control.disabled).toEqual(false);
            ngModel.ngOnChanges({ isDisabled: new core_1.SimpleChange('', null, false) });
            (0, testing_1.tick)();
            expect(ngModel.control.disabled).toEqual(false);
            ngModel.ngOnChanges({ isDisabled: new core_1.SimpleChange('', false, false) });
            (0, testing_1.tick)();
            expect(ngModel.control.disabled).toEqual(false);
            ngModel.ngOnChanges({ isDisabled: new core_1.SimpleChange('', 'false', false) });
            (0, testing_1.tick)();
            expect(ngModel.control.disabled).toEqual(false);
            ngModel.ngOnChanges({ isDisabled: new core_1.SimpleChange('', 0, false) });
            (0, testing_1.tick)();
            expect(ngModel.control.disabled).toEqual(false);
            ngModel.ngOnChanges({ isDisabled: new core_1.SimpleChange(null, '', false) });
            (0, testing_1.tick)();
            expect(ngModel.control.disabled).toEqual(true);
            ngModel.ngOnChanges({ isDisabled: new core_1.SimpleChange(null, 'true', false) });
            (0, testing_1.tick)();
            expect(ngModel.control.disabled).toEqual(true);
            ngModel.ngOnChanges({ isDisabled: new core_1.SimpleChange(null, true, false) });
            (0, testing_1.tick)();
            expect(ngModel.control.disabled).toEqual(true);
            ngModel.ngOnChanges({ isDisabled: new core_1.SimpleChange(null, 'anything else', false) });
            (0, testing_1.tick)();
            expect(ngModel.control.disabled).toEqual(true);
        }));
    });
    describe('FormControlName', () => {
        let formModel;
        let controlNameDir;
        beforeEach(() => {
            formModel = new index_1.FormControl('name');
            const parent = new index_1.FormGroupDirective([], []);
            parent.form = new index_1.FormGroup({ 'name': formModel });
            controlNameDir = new index_1.FormControlName(parent, [], [], [defaultAccessor], null);
            controlNameDir.name = 'name';
            controlNameDir.control = formModel;
        });
        it('should reexport control properties', () => {
            expect(controlNameDir.control).toBe(formModel);
            expect(controlNameDir.value).toBe(formModel.value);
            expect(controlNameDir.valid).toBe(formModel.valid);
            expect(controlNameDir.invalid).toBe(formModel.invalid);
            expect(controlNameDir.pending).toBe(formModel.pending);
            expect(controlNameDir.errors).toBe(formModel.errors);
            expect(controlNameDir.pristine).toBe(formModel.pristine);
            expect(controlNameDir.dirty).toBe(formModel.dirty);
            expect(controlNameDir.touched).toBe(formModel.touched);
            expect(controlNameDir.untouched).toBe(formModel.untouched);
            expect(controlNameDir.statusChanges).toBe(formModel.statusChanges);
            expect(controlNameDir.status).toBe(formModel.status);
            expect(controlNameDir.valueChanges).toBe(formModel.valueChanges);
            expect(controlNameDir.disabled).toBe(formModel.disabled);
            expect(controlNameDir.enabled).toBe(formModel.enabled);
        });
        it('should reexport control methods', () => {
            expect(controlNameDir.hasError('required')).toBe(formModel.hasError('required'));
            expect(controlNameDir.getError('required')).toBe(formModel.getError('required'));
            formModel.setErrors({ required: true });
            expect(controlNameDir.hasError('required')).toBe(formModel.hasError('required'));
            expect(controlNameDir.getError('required')).toBe(formModel.getError('required'));
        });
    });
});
