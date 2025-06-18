"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const form_builder_1 = require("../src/form_builder");
const forms_1 = require("../src/forms");
const form_group_1 = require("../src/model/form_group");
describe('Typed Class', () => {
    describe('FormControl', () => {
        it('supports inferred controls', () => {
            const c = new forms_1.FormControl('', { nonNullable: true });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.setValue('');
            // @ts-expect-error
            c.setValue(null);
            c.patchValue('');
            c.reset('');
        });
        it('supports explicit controls', () => {
            const c = new forms_1.FormControl('', { nonNullable: true });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.setValue('');
            c.patchValue('');
            c.reset('');
        });
        it('supports explicit boolean controls', () => {
            let c1 = new forms_1.FormControl(false, { nonNullable: true });
        });
        it('supports empty controls', () => {
            let c = new forms_1.FormControl();
            let ca = c;
        });
        it('supports nullable controls', () => {
            const c = new forms_1.FormControl('');
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.setValue(null);
            c.setValue('');
            // @ts-expect-error
            c.setValue(7);
            c.patchValue(null);
            c.patchValue('');
            c.reset();
            c.reset('');
        });
        it('should create a nullable control without {nonNullable: true}', () => {
            const c = new forms_1.FormControl('');
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.setValue(null);
            c.setValue('');
            c.patchValue(null);
            c.patchValue('');
            c.reset();
            c.reset('');
        });
        it('should allow deprecated option {initialValueIsDefault: true}', () => {
            const c = new forms_1.FormControl('', { initialValueIsDefault: true });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.setValue('');
            c.reset();
            expect(c.value).toEqual('');
        });
        it('should not allow assignment to an incompatible control', () => {
            let fcs = new forms_1.FormControl('bob');
            let fcn = new forms_1.FormControl(42);
            // @ts-expect-error
            fcs = fcn;
            // @ts-expect-error
            fcn = fcs;
        });
        it('is assignable to AbstractControl', () => {
            let ac;
            ac = new forms_1.FormControl(true, { nonNullable: true });
        });
        it('is assignable to UntypedFormControl', () => {
            const c = new forms_1.FormControl('');
            let ufc;
            ufc = c;
        });
    });
    describe('FormGroup', () => {
        it('supports inferred groups', () => {
            const c = new forms_1.FormGroup({
                c: new forms_1.FormControl('', { nonNullable: true }),
                d: new forms_1.FormControl(0, { nonNullable: true }),
            });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.registerControl('c', new forms_1.FormControl('', { nonNullable: true }));
            c.addControl('c', new forms_1.FormControl('', { nonNullable: true }));
            c.setControl('c', new forms_1.FormControl('', { nonNullable: true }));
            c.contains('c');
            c.contains('foo'); // Contains checks always allowed
            c.setValue({ c: '', d: 0 });
            c.patchValue({ c: '' });
            c.reset({ c: '', d: 0 });
        });
        it('supports explicit groups', () => {
            const c = new forms_1.FormGroup({
                c: new forms_1.FormControl('', { nonNullable: true }),
                d: new forms_1.FormControl(0, { nonNullable: true }),
            });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.registerControl('c', new forms_1.FormControl('', { nonNullable: true }));
            c.addControl('c', new forms_1.FormControl('', { nonNullable: true }));
            c.setControl('c', new forms_1.FormControl('', { nonNullable: true }));
            c.contains('c');
            c.setValue({ c: '', d: 0 });
            c.patchValue({ c: '' });
            c.reset({ c: '', d: 0 });
        });
        it('supports explicit groups with boolean types', () => {
            const c0 = new forms_1.FormGroup({ a: new forms_1.FormControl(true, { nonNullable: true }) });
            const c1 = new forms_1.FormGroup({
                a: new forms_1.FormControl(true, { nonNullable: true }),
            });
            // const c2: FormGroup<{a: FormControl<boolean>}> =
            //     new FormGroup({a: new FormControl(true, {nonNullable: true})});
        });
        it('supports empty groups', () => {
            let c = new forms_1.FormGroup({});
            let ca = c;
        });
        it('supports groups with nullable controls', () => {
            const c = new forms_1.FormGroup({
                c: new forms_1.FormControl(''),
                d: new forms_1.FormControl('', { nonNullable: true }),
            });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.registerControl('c', new forms_1.FormControl(null));
            c.addControl('c', new forms_1.FormControl(null));
            c.setControl('c', new forms_1.FormControl(null));
            c.contains('c');
            c.setValue({ c: '', d: '' });
            c.setValue({ c: null, d: '' });
            c.patchValue({});
            c.reset({});
            c.reset({ d: '' });
            c.reset({ c: '' });
            c.reset({ c: '', d: '' });
        });
        it('supports groups with the default type', () => {
            let c;
            let c2 = new forms_1.FormGroup({ c: new forms_1.FormControl(''), d: new forms_1.FormControl('', { nonNullable: true }) });
            c = c2;
            expect(c.value.d).toBe('');
            c.value;
            c.reset();
            c.reset({ c: '' });
            c.reset({ c: '', d: '' });
            c.reset({ c: '', d: '' }, {});
            c.setValue({ c: '', d: '' });
            c.setValue({ c: 99, d: 42 });
            c.setControl('c', new forms_1.FormControl(0));
            c.setControl('notpresent', new forms_1.FormControl(0));
            c.removeControl('c');
            c.controls['d'].valueChanges.subscribe(() => { });
        });
        it('supports groups with explicit named interface types', () => {
            const c = new forms_1.FormGroup({ lives: new forms_1.FormControl(9, { nonNullable: true }) });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.registerControl('lives', new forms_1.FormControl(0, { nonNullable: true }));
            c.addControl('lives', new forms_1.FormControl(0, { nonNullable: true }));
            c.setControl('lives', new forms_1.FormControl(0, { nonNullable: true }));
            c.contains('lives');
            c.setValue({ lives: 0 });
            c.patchValue({});
            c.reset({ lives: 0 });
        });
        it('supports groups with nested explicit named interface types', () => {
            const bro = new forms_1.FormGroup({
                name: new forms_1.FormControl('bob', { nonNullable: true }),
                lives: new forms_1.FormControl(9, { nonNullable: true }),
            });
            const sis = new forms_1.FormGroup({
                name: new forms_1.FormControl('lucy', { nonNullable: true }),
                lives: new forms_1.FormControl(9, { nonNullable: true }),
            });
            const litter = new forms_1.FormGroup({
                brother: bro,
                sister: sis,
            });
            {
                let t = litter.value;
                let t1 = litter.value;
                t1 = null;
            }
            {
                let t = litter.getRawValue();
                let t1 = litter.getRawValue();
                t1 = null;
            }
            litter.patchValue({ brother: { name: 'jim' } });
            litter.controls.brother.setValue({ name: 'jerry', lives: 1 });
        });
        it('supports nested inferred groups', () => {
            const c = new forms_1.FormGroup({
                innerGroup: new forms_1.FormGroup({ innerControl: new forms_1.FormControl('', { nonNullable: true }) }),
            });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.registerControl('innerGroup', new forms_1.FormGroup({ innerControl: new forms_1.FormControl('', { nonNullable: true }) }));
            c.addControl('innerGroup', new forms_1.FormGroup({ innerControl: new forms_1.FormControl('', { nonNullable: true }) }));
            c.setControl('innerGroup', new forms_1.FormGroup({ innerControl: new forms_1.FormControl('', { nonNullable: true }) }));
            c.contains('innerGroup');
            c.setValue({ innerGroup: { innerControl: '' } });
            c.patchValue({});
            c.reset({ innerGroup: { innerControl: '' } });
        });
        it('supports nested explicit groups', () => {
            const ig = new forms_1.FormControl('', { nonNullable: true });
            const og = new forms_1.FormGroup({ innerControl: ig });
            const c = new forms_1.FormGroup({
                innerGroup: og,
            });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            // Methods are tested in the inferred case
        });
        it('supports groups with a single optional control', () => {
            const c = new forms_1.FormGroup({
                c: new forms_1.FormControl('', { nonNullable: true }),
            });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
        });
        it('supports groups with mixed optional controls', () => {
            const c = new forms_1.FormGroup({
                c: new forms_1.FormControl('', { nonNullable: true }),
                d: new forms_1.FormControl('', { nonNullable: true }),
            });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.registerControl('c', new forms_1.FormControl('', { nonNullable: true }));
            c.addControl('c', new forms_1.FormControl('', { nonNullable: true }));
            c.removeControl('c');
            c.setControl('c', new forms_1.FormControl('', { nonNullable: true }));
            c.contains('c');
            c.setValue({ c: '', d: '' });
            c.patchValue({});
            c.reset({});
            c.reset({ c: '' });
            c.reset({ d: '' });
            c.reset({ c: '', d: '' });
            // @ts-expect-error
            c.removeControl('d'); // This is not allowed
        });
        it('supports nested groups with optional controls', () => {
            const menu = new forms_1.FormGroup({
                meal: new forms_1.FormGroup({}),
            });
            {
                let t = menu.value;
                let t1 = menu.value;
                t1 = null;
            }
            {
                let t = menu.getRawValue();
                let t1 = menu.getRawValue();
                t1 = null;
            }
            menu.controls.meal.removeControl('dessert');
        });
        it('supports groups with inferred nested arrays', () => {
            const arr = new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })]);
            const c = new forms_1.FormGroup({ a: arr });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.registerControl('a', new forms_1.FormArray([
                new forms_1.FormControl('', { nonNullable: true }),
                new forms_1.FormControl('', { nonNullable: true }),
            ]));
            c.registerControl('a', new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })]));
            // @ts-expect-error
            c.registerControl('a', new forms_1.FormArray([]));
            c.registerControl('a', new forms_1.FormArray([]));
            c.addControl('a', new forms_1.FormArray([
                new forms_1.FormControl('', { nonNullable: true }),
                new forms_1.FormControl('', { nonNullable: true }),
            ]));
            c.addControl('a', new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })]));
            // @ts-expect-error
            c.addControl('a', new forms_1.FormArray([]));
            c.setControl('a', new forms_1.FormArray([
                new forms_1.FormControl('', { nonNullable: true }),
                new forms_1.FormControl('', { nonNullable: true }),
            ]));
            c.setControl('a', new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })]));
            // @ts-expect-error
            c.setControl('a', new forms_1.FormArray([]));
            c.contains('a');
            c.patchValue({ a: ['', ''] });
            c.patchValue({ a: [''] });
            c.patchValue({ a: [] });
            c.patchValue({});
            c.reset({ a: ['', ''] });
            c.reset({ a: [''] });
            c.reset({ a: [] });
        });
        it('supports groups with explicit nested arrays', () => {
            const arr = new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })]);
            const c = new forms_1.FormGroup({ a: arr });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            // Methods are tested in the inferred case
        });
        it('supports groups with an index type', () => {
            const c = new forms_1.FormGroup({
                returnIfFound: new forms_1.FormControl('1234 Geary, San Francisco', { nonNullable: true }),
                alex: new forms_1.FormControl('999 Valencia, San Francisco', { nonNullable: true }),
                andrew: new forms_1.FormControl('100 Lombard, San Francisco', { nonNullable: true }),
            });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            // Named fields.
            c.registerControl('returnIfFound', new forms_1.FormControl('200 Ellis, San Francisco', { nonNullable: true }));
            c.addControl('returnIfFound', new forms_1.FormControl('200 Ellis, San Francisco', { nonNullable: true }));
            c.setControl('returnIfFound', new forms_1.FormControl('200 Ellis, San Francisco', { nonNullable: true }));
            // c.removeControl('returnIfFound'); // Not allowed
            c.contains('returnIfFound');
            c.setValue({ returnIfFound: '200 Ellis, San Francisco', alex: '1 Main', andrew: '2 Main' });
            c.patchValue({});
            c.reset({ returnIfFound: '200 Ellis, San Francisco' });
            // Indexed fields.
            c.registerControl('igor', new forms_1.FormControl('300 Page, San Francisco', { nonNullable: true }));
            c.addControl('igor', new forms_1.FormControl('300 Page, San Francisco', { nonNullable: true }));
            c.setControl('igor', new forms_1.FormControl('300 Page, San Francisco', { nonNullable: true }));
            c.contains('igor');
            c.setValue({
                returnIfFound: '200 Ellis, San Francisco',
                igor: '300 Page, San Francisco',
                alex: '1 Main',
                andrew: '2 Page',
            });
            c.patchValue({});
            c.reset({ returnIfFound: '200 Ellis, San Francisco', igor: '300 Page, San Francisco' });
            // @ts-expect-error
            c.removeControl('igor');
        });
        it('should have strongly-typed get', () => {
            var _a, _b;
            const c = new forms_1.FormGroup({
                venue: new forms_1.FormGroup({
                    address: new forms_1.FormControl('2200 Bryant', { nonNullable: true }),
                    date: new forms_1.FormGroup({
                        day: new forms_1.FormControl(21, { nonNullable: true }),
                        month: new forms_1.FormControl('March', { nonNullable: true }),
                    }),
                }),
            });
            const rv = c.getRawValue();
            {
                let t = c.get('venue.date').value;
                let t1 = c.get('venue.date').value;
                t1 = null;
            }
            {
                let t = c.get('venue.date.month').value;
                let t1 = c.get('venue.date.month').value;
                t1 = null;
            }
            {
                let t = c.get(['venue', 'date', 'month']).value;
                let t1 = c.get(['venue', 'date', 'month']).value;
                t1 = null;
            }
            {
                let t = (_a = c.get('foobar')) === null || _a === void 0 ? void 0 : _a.value;
                let t1 = (_b = c.get('foobar')) === null || _b === void 0 ? void 0 : _b.value;
                t1 = null;
            }
        });
        it('is assignable to AbstractControl', () => {
            let ac;
            ac = new forms_1.FormGroup({ a: new forms_1.FormControl(true, { nonNullable: true }) });
        });
        it('is assignable to UntypedFormGroup', () => {
            let ufg;
            const fg = new forms_1.FormGroup({ name: new forms_1.FormControl('bob') });
            ufg = fg;
        });
        it('is assignable to UntypedFormGroup in a complex case', () => {
            let ufg;
            const fg = new forms_1.FormGroup({
                myCats: new forms_1.FormArray([new forms_1.FormGroup({ name: new forms_1.FormControl('bob') })]),
            });
            ufg = fg;
        });
    });
    describe('FormRecord', () => {
        it('supports inferred records', () => {
            let c = new form_group_1.FormRecord({ a: new forms_1.FormControl(42, { nonNullable: true }) });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.registerControl('c', new forms_1.FormControl(42, { nonNullable: true }));
            c.addControl('c', new forms_1.FormControl(42, { nonNullable: true }));
            c.setControl('c', new forms_1.FormControl(42, { nonNullable: true }));
            c.removeControl('c');
            c.removeControl('missing');
            c.contains('c');
            c.contains('foo');
            c.setValue({ a: 42 });
            c.patchValue({ c: 42 });
            c.reset({ c: 42, d: 0 });
        });
        it('supports explicit records', () => {
            let c = new form_group_1.FormRecord({ a: new forms_1.FormControl(42, { nonNullable: true }) });
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
            c.registerControl('c', new forms_1.FormControl(42, { nonNullable: true }));
            c.addControl('c', new forms_1.FormControl(42, { nonNullable: true }));
            c.setControl('c', new forms_1.FormControl(42, { nonNullable: true }));
            c.contains('c');
            c.contains('foo');
            c.setValue({ a: 42, c: 0 });
            c.patchValue({ c: 42 });
            c.reset({ c: 42, d: 0 });
            c.removeControl('c');
        });
        it('should only accept non-partial values', () => {
            const fr = new form_group_1.FormRecord({
                group1: new forms_1.FormGroup({
                    foo: new forms_1.FormControl(42, { nonNullable: true }),
                    bar: new forms_1.FormControl(42, { nonNullable: true }),
                }),
            });
            // This should error if the typing allows partial values
            const value = {
                // @ts-expect-error
                group1: {
                    foo: 42,
                    // bar value is missing
                },
            };
            const rawValue = {
                // @ts-expect-error
                group1: {
                    foo: 42,
                    // bar value is missing
                },
            };
            expect(() => fr.setValue({
                // @ts-expect-error
                group1: {
                    foo: 42,
                },
            })).toThrowError(/NG01002: Must supply a value for form control/);
        });
    });
    describe('FormArray', () => {
        it('supports inferred arrays', () => {
            const c = new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })]);
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            c.at(0);
            c.push(new forms_1.FormControl('', { nonNullable: true }));
            c.insert(0, new forms_1.FormControl('', { nonNullable: true }));
            c.removeAt(0);
            c.setControl(0, new forms_1.FormControl('', { nonNullable: true }));
            c.setValue(['', '']);
            c.patchValue([]);
            c.patchValue(['']);
            c.reset();
            c.reset([]);
            c.reset(['']);
            c.clear();
            c.valueChanges.subscribe((v) => v);
        });
        it('supports explicit arrays', () => {
            const c = new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })]);
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
        });
        it('supports explicit arrays with boolean types', () => {
            const c0 = new forms_1.FormArray([new forms_1.FormControl(true, { nonNullable: true })]);
            const c1 = new forms_1.FormArray([
                new forms_1.FormControl(true, { nonNullable: true }),
            ]);
        });
        it('supports arrays with the default type', () => {
            let c;
            c = new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })]);
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            c.at(0);
            c.at(0).valueChanges.subscribe((v) => { });
            c.push(new forms_1.FormControl('', { nonNullable: true }));
            c.insert(0, new forms_1.FormControl('', { nonNullable: true }));
            c.removeAt(0);
            c.setControl(0, new forms_1.FormControl('', { nonNullable: true }));
            c.setValue(['', '']);
            c.patchValue([]);
            c.patchValue(['']);
            c.reset();
            c.reset(['']);
            c.clear();
        });
        it('supports empty arrays', () => {
            let fa = new forms_1.FormArray([]);
        });
        it('supports arrays with nullable controls', () => {
            const c = new forms_1.FormArray([new forms_1.FormControl('')]);
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            c.at(0);
            c.push(new forms_1.FormControl(null));
            c.insert(0, new forms_1.FormControl(null));
            c.removeAt(0);
            c.setControl(0, new forms_1.FormControl(null));
            c.setValue(['', '']);
            c.patchValue([]);
            c.patchValue(['']);
            c.reset();
            c.reset([]);
            c.reset(['']);
            c.clear();
        });
        it('supports inferred nested arrays', () => {
            const c = new forms_1.FormArray([new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })])]);
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
        });
        it('supports explicit nested arrays', () => {
            const c = new forms_1.FormArray([
                new forms_1.FormArray([new forms_1.FormControl('', { nonNullable: true })]),
            ]);
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
        });
        it('supports arrays with inferred nested groups', () => {
            const fg = new forms_1.FormGroup({ c: new forms_1.FormControl('', { nonNullable: true }) });
            const c = new forms_1.FormArray([fg]);
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
        });
        it('supports arrays with explicit nested groups', () => {
            const fg = new forms_1.FormGroup({
                c: new forms_1.FormControl('', { nonNullable: true }),
            });
            const c = new forms_1.FormArray([fg]);
            {
                let t = c.value;
                let t1 = c.value;
                t1 = null;
            }
            {
                let t = c.getRawValue();
                let t1 = c.getRawValue();
                t1 = null;
            }
        });
        it('should have strongly-typed get', () => {
            const c = new forms_1.FormGroup({
                food: new forms_1.FormArray([new forms_1.FormControl('2200 Bryant', { nonNullable: true })]),
            });
            const rv = c.getRawValue();
            {
                let t = c.get('food').value;
                let t1 = c.get('food').value;
                t1 = null;
            }
            {
                let t = c.get('food.0').value;
                let t1 = c.get('food.0').value;
                t1 = null;
            }
        });
        it('is assignable to UntypedFormArray', () => {
            let ufa;
            const fa = new forms_1.FormArray([new forms_1.FormControl('bob')]);
            ufa = fa;
        });
    });
    it('model classes support a complex, deeply nested case', () => {
        const myParty = new forms_1.FormGroup({
            venue: new forms_1.FormGroup({
                location: new forms_1.FormControl('San Francisco', { nonNullable: true }),
                date: new forms_1.FormGroup({
                    year: new forms_1.FormControl(2022, { nonNullable: true }),
                    month: new forms_1.FormControl('May', { nonNullable: true }),
                    day: new forms_1.FormControl(1, { nonNullable: true }),
                }),
            }),
            dinnerOptions: new forms_1.FormArray([
                new forms_1.FormGroup({
                    food: new forms_1.FormGroup({
                        entree: new forms_1.FormControl('Baked Tofu', { nonNullable: true }),
                        dessert: new forms_1.FormControl('Cheesecake', { nonNullable: true }),
                    }),
                    price: new forms_1.FormGroup({
                        amount: new forms_1.FormControl(10, { nonNullable: true }),
                        currency: new forms_1.FormControl('USD', { nonNullable: true }),
                    }),
                }),
                new forms_1.FormGroup({
                    food: new forms_1.FormGroup({
                        entree: new forms_1.FormControl('Eggplant Parm', { nonNullable: true }),
                        dessert: new forms_1.FormControl('Chocolate Mousse', { nonNullable: true }),
                    }),
                    price: new forms_1.FormGroup({
                        amount: new forms_1.FormControl(12, { nonNullable: true }),
                        currency: new forms_1.FormControl('USD', { nonNullable: true }),
                    }),
                }),
            ]),
        });
        {
            let t = myParty.value;
            let t1 = myParty.value;
            t1 = null;
        }
        {
            let t = myParty.getRawValue();
            let t1 = myParty.getRawValue();
            t1 = null;
        }
    });
    describe('FormBuilder', () => {
        let fb = new form_builder_1.FormBuilder();
        beforeEach(() => {
            fb = new form_builder_1.FormBuilder();
        });
        describe('should work in basic cases', () => {
            it('on FormControls', () => {
                const fc = fb.control(42);
                expect(fc.value).toEqual(42);
            });
            it('on FormGroups', () => {
                const fc = fb.group({
                    'foo': 1,
                    'bar': 2,
                });
                expect(fc.value.foo).toEqual(1);
            });
        });
        describe('should build FormControls', () => {
            it('nullably from values', () => {
                const c = fb.control('foo');
                {
                    let t = c.getRawValue();
                    let t1 = c.getRawValue();
                    t1 = null;
                }
            });
            it('non-nullably from values', () => {
                const c = fb.control('foo', { nonNullable: true });
                {
                    let t = c.getRawValue();
                    let t1 = c.getRawValue();
                    t1 = null;
                }
            });
            it('nullably from FormStates', () => {
                const c = fb.control({ value: 'foo', disabled: false });
                {
                    let t = c.getRawValue();
                    let t1 = c.getRawValue();
                    t1 = null;
                }
            });
            it('non-nullably from FormStates', () => {
                const c = fb.control({ value: 'foo', disabled: false }, { nonNullable: true });
                {
                    let t = c.getRawValue();
                    let t1 = c.getRawValue();
                    t1 = null;
                }
            });
            it('with array values', () => {
                const c = fb.control([1, 2, 3]);
                {
                    let t = c.getRawValue();
                    let t1 = c.getRawValue();
                    t1 = null;
                }
            });
        });
        describe('should build FormGroups', () => {
            it('from objects with plain values', () => {
                const c = fb.group({ foo: 'bar' });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with optional keys', () => {
                const controls = { name: fb.control('') };
                const foo = fb.group(controls);
            });
            it('from objects with FormControlState', () => {
                const c = fb.group({ foo: { value: 'bar', disabled: false } });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with ControlConfigs', () => {
                const c = fb.group({ foo: ['bar'] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with FormControlStates nested inside ControlConfigs', () => {
                const c = fb.group({ foo: [{ value: 'bar', disabled: true }, forms_1.Validators.required] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with ControlConfigs and validators', () => {
                const c = fb.group({ foo: ['bar', forms_1.Validators.required] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                const c2 = fb.group({ foo: [[1, 2, 3], forms_1.Validators.required] });
                {
                    let t = c2.controls;
                    let t1 = c2.controls;
                    t1 = null;
                }
                expect(c2.controls.foo.value).toEqual([1, 2, 3]);
                const c3 = fb.group({ foo: [null, forms_1.Validators.required] });
                {
                    let t = c3.controls;
                    let t1 = c3.controls;
                    t1 = null;
                }
                const c4 = fb.group({ foo: [[1, 2, 3], forms_1.Validators.maxLength(4)] });
                {
                    let t = c4.controls;
                    let t1 = c4.controls;
                    t1 = null;
                }
                expect(c4.controls.foo.value).toEqual([1, 2, 3]);
            });
            it('from objects with ControlConfigs and validator lists', () => {
                const c = fb.group({ foo: ['bar', [forms_1.Validators.required, forms_1.Validators.email]] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with ControlConfigs and explicit types', () => {
                const c = fb.group({
                    foo: ['bar', [forms_1.Validators.required, forms_1.Validators.email]],
                });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            describe('from objects with FormControls', () => {
                it('nullably', () => {
                    const c = fb.group({ foo: new forms_1.FormControl('bar') });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('non-nullably', () => {
                    const c = fb.group({ foo: new forms_1.FormControl('bar', { nonNullable: true }) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('from objects with direct FormGroups', () => {
                    const c = fb.group({ foo: new forms_1.FormGroup({ baz: new forms_1.FormControl('bar') }) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('from objects with builder FormGroups', () => {
                    const c = fb.group({ foo: fb.group({ baz: 'bar' }) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('from objects with builder FormRecords', () => {
                    const c = fb.group({ foo: fb.record({ baz: 'bar' }) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('from objects with builder FormArrays', () => {
                    const c = fb.group({ foo: fb.array(['bar']) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
            });
        });
        describe('should build FormRecords', () => {
            it('from objects with plain values', () => {
                const c = fb.record({ foo: 'bar' });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with FormControlState', () => {
                const c = fb.record({ foo: { value: 'bar', disabled: false } });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with ControlConfigs', () => {
                const c = fb.record({ foo: ['bar'] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with ControlConfigs and validators', () => {
                const c = fb.record({ foo: ['bar', forms_1.Validators.required] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with ControlConfigs and validator lists', () => {
                const c = fb.record({ foo: ['bar', [forms_1.Validators.required, forms_1.Validators.email]] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from objects with ControlConfigs and explicit types', () => {
                const c = fb.record({
                    foo: ['bar', [forms_1.Validators.required, forms_1.Validators.email]],
                });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            describe('from objects with FormControls', () => {
                it('nullably', () => {
                    const c = fb.record({ foo: new forms_1.FormControl('bar') });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('non-nullably', () => {
                    const c = fb.record({ foo: new forms_1.FormControl('bar', { nonNullable: true }) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('from objects with builder FormGroups', () => {
                    const c = fb.record({ foo: fb.group({ baz: 'bar' }) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('from objects with builder FormRecords', () => {
                    const c = fb.record({ foo: fb.record({ baz: 'bar' }) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('from objects with builder FormArrays', () => {
                    const c = fb.record({ foo: fb.array(['bar']) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
            });
        });
        describe('should build FormArrays', () => {
            it('from arrays with plain values', () => {
                const c = fb.array(['foo']);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from arrays with FormControlStates', () => {
                const c = fb.array([{ value: 'foo', disabled: false }]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from arrays with ControlConfigs', () => {
                const c = fb.array([['foo']]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            describe('from arrays with FormControls', () => {
                it('nullably', () => {
                    const c = fb.array([new forms_1.FormControl('foo')]);
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
                it('non-nullably', () => {
                    const c = fb.array([new forms_1.FormControl('foo', { nonNullable: true })]);
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                });
            });
            it('from arrays with direct FormArrays', () => {
                const c = fb.array([new forms_1.FormArray([new forms_1.FormControl('foo')])]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from arrays with builder FormArrays', () => {
                const c = fb.array([fb.array(['foo'])]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from arrays with builder FormGroups', () => {
                const c = fb.array([fb.group({ bar: 'foo' })]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
            it('from arrays with builder FormRecords', () => {
                const c = fb.array([fb.record({ bar: 'foo' })]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
            });
        });
        it('should work with a complex, deeply nested case', () => {
            // Mix a variety of different construction methods and argument types.
            const myParty = fb.group({
                venue: fb.group({
                    location: 'San Francisco',
                    date: fb.group({
                        year: { value: 2022, disabled: false },
                        month: fb.control('December', {}),
                        day: fb.control(new forms_1.FormControl(14)),
                    }),
                }),
                dinnerOptions: fb.array([
                    fb.group({
                        food: fb.group({
                            entree: ['Souffle', forms_1.Validators.required],
                            dessert: 'also Souffle',
                        }),
                        price: fb.group({
                            amount: new forms_1.FormControl(50, { nonNullable: true }),
                            currency: 'USD',
                        }),
                    }),
                ]),
            });
            {
                let t = myParty.controls;
                let d = myParty.controls.dinnerOptions;
                let t1 = myParty.controls;
                t1 = null;
            }
        });
    });
    describe('NonNullFormBuilder', () => {
        let fb;
        beforeEach(() => {
            fb = new form_builder_1.FormBuilder().nonNullable;
        });
        describe('should build FormControls', () => {
            it('non-nullably from values', () => {
                const c = fb.control('foo');
                {
                    let t = c.getRawValue();
                    let t1 = c.getRawValue();
                    t1 = null;
                }
                c.reset();
                expect(c.value).not.toBeNull();
            });
        });
        describe('should build FormGroups', () => {
            it('from objects with plain values', () => {
                const c = fb.group({ foo: 'bar' });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual({ foo: 'bar' });
            });
            it('from objects with FormControlState', () => {
                const c = fb.group({ foo: { value: 'bar', disabled: false } });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual({ foo: 'bar' });
            });
            it('from objects with ControlConfigs', () => {
                const c = fb.group({ foo: ['bar'] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual({ foo: 'bar' });
            });
            it('from objects with ControlConfigs and validators', () => {
                const c = fb.group({ foo: ['bar', forms_1.Validators.required] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual({ foo: 'bar' });
                const c2 = fb.group({ foo: [[1, 2, 3], forms_1.Validators.required] });
                {
                    let t = c2.controls;
                    let t1 = c2.controls;
                    t1 = null;
                }
                expect(c2.controls.foo.value).toEqual([1, 2, 3]);
            });
            it('from objects with ControlConfigs and validator lists', () => {
                const c = fb.group({ foo: ['bar', [forms_1.Validators.required, forms_1.Validators.email]] });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual({ foo: 'bar' });
            });
            it('from objects with ControlConfigs and explicit types', () => {
                const c = fb.group({
                    foo: ['bar', [forms_1.Validators.required, forms_1.Validators.email]],
                });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual({ foo: 'bar' });
            });
            it('without distributing union types', () => {
                const c = fb.group({ foo: 'bar' });
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                let fc = c.controls.foo;
                fc = new forms_1.FormControl('', { nonNullable: true });
            });
            describe('from objects with FormControls', () => {
                it('from objects with builder FormGroups', () => {
                    const c = fb.group({ foo: fb.group({ baz: 'bar' }) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                    c.reset();
                    expect(c.value).toEqual({ foo: { baz: 'bar' } });
                });
                it('from objects with builder FormArrays', () => {
                    const c = fb.group({ foo: fb.array(['bar']) });
                    {
                        let t = c.controls;
                        let t1 = c.controls;
                        t1 = null;
                    }
                    c.reset();
                    expect(c.value).toEqual({ foo: ['bar'] });
                });
            });
        });
        describe('should build FormArrays', () => {
            it('from arrays with plain values', () => {
                const c = fb.array(['foo']);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual(['foo']);
            });
            it('from arrays with FormControlStates', () => {
                const c = fb.array([{ value: 'foo', disabled: false }]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual(['foo']);
            });
            it('from arrays with ControlConfigs', () => {
                const c = fb.array([['foo']]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual(['foo']);
            });
            it('from arrays with builder FormArrays', () => {
                const c = fb.array([fb.array(['foo'])]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual([['foo']]);
            });
            it('from arrays with builder FormGroups', () => {
                const c = fb.array([fb.group({ bar: 'foo' })]);
                {
                    let t = c.controls;
                    let t1 = c.controls;
                    t1 = null;
                }
                c.reset();
                expect(c.value).toEqual([{ bar: 'foo' }]);
            });
        });
    });
});
describe('Untyped Class', () => {
    describe('UntypedFormControl', () => {
        it('should function like a FormControl with the default type', () => {
            const ufc = new forms_1.UntypedFormControl('foo');
            expect(ufc.value).toEqual('foo');
        });
        it('should default to null with no argument', () => {
            const ufc = new forms_1.UntypedFormControl();
            expect(ufc.value).toEqual(null);
        });
        it('is assignable with the typed version in both directions', () => {
            const fc = new forms_1.UntypedFormControl('');
            const ufc = new forms_1.FormControl('');
        });
        it('is an escape hatch from a strongly-typed FormControl', () => {
            let fc = new forms_1.FormControl(42);
            const ufc = new forms_1.UntypedFormControl('foo');
            fc = ufc;
        });
    });
    describe('UntypedFormGroup', () => {
        it('should function like a FormGroup with the default type', () => {
            const ufc = new forms_1.UntypedFormGroup({ foo: new forms_1.FormControl('bar') });
            expect(ufc.value).toEqual({ foo: 'bar' });
            const fc = ufc.get('foo');
        });
        it('should allow dotted access to properties', () => {
            const ufc = new forms_1.UntypedFormGroup({ foo: new forms_1.FormControl('bar') });
            expect(ufc.value.foo).toEqual('bar');
        });
        it('should allow access to AbstractControl methods', () => {
            const ufc = new forms_1.UntypedFormGroup({ foo: new forms_1.FormControl('bar') });
            expect(ufc.validator).toBe(null);
        });
        it('is assignable with the typed version in both directions', () => {
            const fc = new forms_1.UntypedFormGroup({
                foo: new forms_1.UntypedFormControl(''),
            });
            const ufc = new forms_1.FormGroup({ foo: new forms_1.FormControl('') });
        });
        it('is assignable to FormGroup', () => {
            let fg;
            const ufg = new forms_1.UntypedFormGroup({ foo: new forms_1.FormControl('bar') });
            fg = ufg;
        });
        it('is an escape hatch from a strongly-typed FormGroup', () => {
            let fg = new forms_1.FormGroup({ foo: new forms_1.FormControl(42) });
            const ufg = new forms_1.UntypedFormGroup({ foo: new forms_1.FormControl('bar') });
            fg = ufg;
        });
    });
    describe('UntypedFormArray', () => {
        it('should function like a FormArray with the default type', () => {
            const ufc = new forms_1.UntypedFormArray([new forms_1.FormControl('foo')]);
            expect(ufc.value).toEqual(['foo']);
            ufc.valueChanges.subscribe((v) => v);
        });
        it('is assignable with the typed version in both directions', () => {
            const ufa = new forms_1.FormArray([new forms_1.FormControl('')]);
            const fa = new forms_1.UntypedFormArray([
                new forms_1.UntypedFormControl(''),
            ]);
        });
    });
    describe('UntypedFormBuilder', () => {
        let fb = new form_builder_1.FormBuilder();
        let ufb = new form_builder_1.UntypedFormBuilder();
        function typedFn(fb) { }
        function untypedFn(fb) { }
        beforeEach(() => {
            ufb = new form_builder_1.UntypedFormBuilder();
        });
        it('should build untyped FormControls', () => {
            const ufc = ufb.control(42);
            expect(ufc.value).toEqual(42);
        });
        it('should build untyped FormGroups', () => {
            const ufc = ufb.group({
                'foo': 1,
                'bar': 2,
            });
            expect(ufc.value.foo).toEqual(1);
        });
        it('can be provided where a FormBuilder is expected and vice versa', () => {
            typedFn(ufb);
            untypedFn(fb);
        });
    });
});
