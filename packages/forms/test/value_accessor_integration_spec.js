"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgModelCustomWrapper = exports.NgModelCustomComp = exports.MyInputForm = exports.MyInput = exports.FormControlRadioButtons = exports.FormGroupComp = exports.FormControlComp = void 0;
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../index");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
describe('value accessors', () => {
    function initTest(component, ...directives) {
        testing_1.TestBed.configureTestingModule({
            declarations: [component, ...directives],
            imports: [index_1.FormsModule, index_1.ReactiveFormsModule],
        });
        return testing_1.TestBed.createComponent(component);
    }
    it('should support <input> without type', () => {
        testing_1.TestBed.overrideComponent(FormControlComp, {
            set: { template: `<input [formControl]="control">` },
        });
        const fixture = initTest(FormControlComp);
        const control = new index_1.FormControl('old');
        fixture.componentInstance.control = control;
        fixture.detectChanges();
        // model -> view
        const input = fixture.debugElement.query(by_1.By.css('input'));
        expect(input.nativeElement.value).toEqual('old');
        input.nativeElement.value = 'new';
        (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
        // view -> model
        expect(control.value).toEqual('new');
    });
    it('should support <input type=text>', () => {
        const fixture = initTest(FormGroupComp);
        const form = new index_1.FormGroup({ 'login': new index_1.FormControl('old') });
        fixture.componentInstance.form = form;
        fixture.detectChanges();
        // model -> view
        const input = fixture.debugElement.query(by_1.By.css('input'));
        expect(input.nativeElement.value).toEqual('old');
        input.nativeElement.value = 'new';
        (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
        // view -> model
        expect(form.value).toEqual({ 'login': 'new' });
    });
    it('should ignore the change event for <input type=text>', () => {
        const fixture = initTest(FormGroupComp);
        const form = new index_1.FormGroup({ 'login': new index_1.FormControl('oldValue') });
        fixture.componentInstance.form = form;
        fixture.detectChanges();
        const input = fixture.debugElement.query(by_1.By.css('input'));
        form.valueChanges.subscribe({
            next: (value) => {
                throw 'Should not happen';
            },
        });
        input.nativeElement.value = 'updatedValue';
        (0, browser_util_1.dispatchEvent)(input.nativeElement, 'change');
    });
    it('should support <textarea>', () => {
        testing_1.TestBed.overrideComponent(FormControlComp, {
            set: { template: `<textarea [formControl]="control"></textarea>` },
        });
        const fixture = initTest(FormControlComp);
        const control = new index_1.FormControl('old');
        fixture.componentInstance.control = control;
        fixture.detectChanges();
        // model -> view
        const textarea = fixture.debugElement.query(by_1.By.css('textarea'));
        expect(textarea.nativeElement.value).toEqual('old');
        textarea.nativeElement.value = 'new';
        (0, browser_util_1.dispatchEvent)(textarea.nativeElement, 'input');
        // view -> model
        expect(control.value).toEqual('new');
    });
    it('should support <type=checkbox>', () => {
        testing_1.TestBed.overrideComponent(FormControlComp, {
            set: { template: `<input type="checkbox" [formControl]="control">` },
        });
        const fixture = initTest(FormControlComp);
        const control = new index_1.FormControl(true);
        fixture.componentInstance.control = control;
        fixture.detectChanges();
        // model -> view
        const input = fixture.debugElement.query(by_1.By.css('input'));
        expect(input.nativeElement.checked).toBe(true);
        input.nativeElement.checked = false;
        (0, browser_util_1.dispatchEvent)(input.nativeElement, 'change');
        // view -> model
        expect(control.value).toBe(false);
    });
    describe('should support <type=number>', () => {
        it('with basic use case', () => {
            const fixture = initTest(FormControlNumberInput);
            const control = new index_1.FormControl(10);
            fixture.componentInstance.control = control;
            fixture.detectChanges();
            // model -> view
            const input = fixture.debugElement.query(by_1.By.css('input'));
            expect(input.nativeElement.value).toEqual('10');
            input.nativeElement.value = '20';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            // view -> model
            expect(control.value).toEqual(20);
        });
        it('when value is cleared in the UI', () => {
            const fixture = initTest(FormControlNumberInput);
            const control = new index_1.FormControl(10, index_1.Validators.required);
            fixture.componentInstance.control = control;
            fixture.detectChanges();
            const input = fixture.debugElement.query(by_1.By.css('input'));
            input.nativeElement.value = '';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            expect(control.valid).toBe(false);
            expect(control.value).toEqual(null);
            input.nativeElement.value = '0';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            expect(control.valid).toBe(true);
            expect(control.value).toEqual(0);
        });
        it('should ignore the change event', () => {
            const fixture = initTest(FormControlNumberInput);
            const control = new index_1.FormControl();
            fixture.componentInstance.control = control;
            fixture.detectChanges();
            control.valueChanges.subscribe({
                next: (value) => {
                    throw 'Input[number] should not react to change event';
                },
            });
            const input = fixture.debugElement.query(by_1.By.css('input'));
            input.nativeElement.value = '5';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'change');
        });
        it('when value is cleared programmatically', () => {
            const fixture = initTest(FormControlNumberInput);
            const control = new index_1.FormControl(10);
            fixture.componentInstance.control = control;
            fixture.detectChanges();
            control.setValue(null);
            const input = fixture.debugElement.query(by_1.By.css('input'));
            expect(input.nativeElement.value).toEqual('');
        });
    });
    describe('select controls', () => {
        describe('in reactive forms', () => {
            it(`should support primitive values`, () => {
                if (isNode)
                    return;
                const fixture = initTest(FormControlNameSelect);
                fixture.detectChanges();
                // model -> view
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const sfOption = fixture.debugElement.query(by_1.By.css('option'));
                expect(select.nativeElement.value).toEqual('SF');
                expect(sfOption.nativeElement.selected).toBe(true);
                select.nativeElement.value = 'NY';
                (0, browser_util_1.dispatchEvent)(select.nativeElement, 'change');
                fixture.detectChanges();
                // view -> model
                expect(sfOption.nativeElement.selected).toBe(false);
                expect(fixture.componentInstance.form.value).toEqual({ 'city': 'NY' });
            });
            it(`should support objects`, () => {
                if (isNode)
                    return;
                const fixture = initTest(FormControlSelectNgValue);
                fixture.detectChanges();
                // model -> view
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const sfOption = fixture.debugElement.query(by_1.By.css('option'));
                expect(select.nativeElement.value).toEqual('0: Object');
                expect(sfOption.nativeElement.selected).toBe(true);
            });
            it('should throw an error if compareWith is not a function', () => {
                const fixture = initTest(FormControlSelectWithCompareFn);
                fixture.componentInstance.compareFn = null;
                expect(() => fixture.detectChanges()).toThrowError(/compareWith must be a function, but received null/);
            });
            it('should compare options using provided compareWith function', () => {
                if (isNode)
                    return;
                const fixture = initTest(FormControlSelectWithCompareFn);
                fixture.detectChanges();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const sfOption = fixture.debugElement.query(by_1.By.css('option'));
                expect(select.nativeElement.value).toEqual('0: Object');
                expect(sfOption.nativeElement.selected).toBe(true);
            });
            it('should support re-assigning the options array with compareWith', () => {
                if (isNode)
                    return;
                const fixture = initTest(FormControlSelectWithCompareFn);
                fixture.detectChanges();
                // Option IDs start out as 0 and 1, so setting the select value to "1: Object"
                // will select the second option (NY).
                const select = fixture.debugElement.query(by_1.By.css('select'));
                select.nativeElement.value = '1: Object';
                (0, browser_util_1.dispatchEvent)(select.nativeElement, 'change');
                fixture.detectChanges();
                expect(fixture.componentInstance.form.value).toEqual({ city: { id: 2, name: 'NY' } });
                fixture.componentInstance.cities = [
                    { id: 1, name: 'SF' },
                    { id: 2, name: 'NY' },
                ];
                fixture.detectChanges();
                // Now that the options array has been re-assigned, new option instances will
                // be created by ngFor. These instances will have different option IDs, subsequent
                // to the first: 2 and 3. For the second option to stay selected, the select
                // value will need to have the ID of the current second option: 3.
                const nyOption = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                expect(select.nativeElement.value).toEqual('3: Object');
                expect(nyOption.nativeElement.selected).toBe(true);
            });
        });
        describe('in template-driven forms', () => {
            it('with option values that are objects', (0, testing_1.fakeAsync)(() => {
                if (isNode)
                    return;
                const fixture = initTest(NgModelSelectForm);
                const comp = fixture.componentInstance;
                comp.cities = [{ 'name': 'SF' }, { 'name': 'NYC' }, { 'name': 'Buffalo' }];
                comp.selectedCity = comp.cities[1];
                fixture.detectChanges();
                (0, testing_1.tick)();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const nycOption = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                // model -> view
                expect(select.nativeElement.value).toEqual('1: Object');
                expect(nycOption.nativeElement.selected).toBe(true);
                select.nativeElement.value = '2: Object';
                (0, browser_util_1.dispatchEvent)(select.nativeElement, 'change');
                fixture.detectChanges();
                (0, testing_1.tick)();
                // view -> model
                expect(comp.selectedCity['name']).toEqual('Buffalo');
            }));
            it('when new options are added', (0, testing_1.fakeAsync)(() => {
                if (isNode)
                    return;
                const fixture = initTest(NgModelSelectForm);
                const comp = fixture.componentInstance;
                comp.cities = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                comp.selectedCity = comp.cities[1];
                fixture.detectChanges();
                (0, testing_1.tick)();
                comp.cities.push({ 'name': 'Buffalo' });
                comp.selectedCity = comp.cities[2];
                fixture.detectChanges();
                (0, testing_1.tick)();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const buffalo = fixture.debugElement.queryAll(by_1.By.css('option'))[2];
                expect(select.nativeElement.value).toEqual('2: Object');
                expect(buffalo.nativeElement.selected).toBe(true);
            }));
            it('when options are removed', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelSelectForm);
                const comp = fixture.componentInstance;
                comp.cities = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                comp.selectedCity = comp.cities[1];
                fixture.detectChanges();
                (0, testing_1.tick)();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                expect(select.nativeElement.value).toEqual('1: Object');
                comp.cities.pop();
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(select.nativeElement.value).not.toEqual('1: Object');
            }));
            it('when option values have same content, but different identities', (0, testing_1.fakeAsync)(() => {
                if (isNode)
                    return;
                const fixture = initTest(NgModelSelectForm);
                const comp = fixture.componentInstance;
                comp.cities = [{ 'name': 'SF' }, { 'name': 'NYC' }, { 'name': 'NYC' }];
                comp.selectedCity = comp.cities[0];
                fixture.detectChanges();
                comp.selectedCity = comp.cities[2];
                fixture.detectChanges();
                (0, testing_1.tick)();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const secondNYC = fixture.debugElement.queryAll(by_1.By.css('option'))[2];
                expect(select.nativeElement.value).toEqual('2: Object');
                expect(secondNYC.nativeElement.selected).toBe(true);
            }));
            it('should work with null option', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelSelectWithNullForm);
                const comp = fixture.componentInstance;
                comp.cities = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                comp.selectedCity = null;
                fixture.detectChanges();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                select.nativeElement.value = '2: Object';
                (0, browser_util_1.dispatchEvent)(select.nativeElement, 'change');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(comp.selectedCity['name']).toEqual('NYC');
                select.nativeElement.value = '0: null';
                (0, browser_util_1.dispatchEvent)(select.nativeElement, 'change');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(comp.selectedCity).toEqual(null);
            }));
            it('should throw an error when compareWith is not a function', () => {
                const fixture = initTest(NgModelSelectWithCustomCompareFnForm);
                const comp = fixture.componentInstance;
                comp.compareFn = null;
                expect(() => fixture.detectChanges()).toThrowError(/compareWith must be a function, but received null/);
            });
            it('should compare options using provided compareWith function', (0, testing_1.fakeAsync)(() => {
                if (isNode)
                    return;
                const fixture = initTest(NgModelSelectWithCustomCompareFnForm);
                const comp = fixture.componentInstance;
                comp.selectedCity = { id: 1, name: 'SF' };
                comp.cities = [
                    { id: 1, name: 'SF' },
                    { id: 2, name: 'LA' },
                ];
                fixture.detectChanges();
                (0, testing_1.tick)();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const sfOption = fixture.debugElement.query(by_1.By.css('option'));
                expect(select.nativeElement.value).toEqual('0: Object');
                expect(sfOption.nativeElement.selected).toBe(true);
            }));
            it('should support re-assigning the options array with compareWith', (0, testing_1.fakeAsync)(() => {
                if (isNode)
                    return;
                const fixture = initTest(NgModelSelectWithCustomCompareFnForm);
                fixture.componentInstance.selectedCity = { id: 1, name: 'SF' };
                fixture.componentInstance.cities = [
                    { id: 1, name: 'SF' },
                    { id: 2, name: 'NY' },
                ];
                fixture.detectChanges();
                (0, testing_1.tick)();
                // Option IDs start out as 0 and 1, so setting the select value to "1: Object"
                // will select the second option (NY).
                const select = fixture.debugElement.query(by_1.By.css('select'));
                select.nativeElement.value = '1: Object';
                (0, browser_util_1.dispatchEvent)(select.nativeElement, 'change');
                fixture.detectChanges();
                const model = fixture.debugElement.children[0].injector.get(index_1.NgModel);
                expect(model.value).toEqual({ id: 2, name: 'NY' });
                fixture.componentInstance.cities = [
                    { id: 1, name: 'SF' },
                    { id: 2, name: 'NY' },
                ];
                fixture.detectChanges();
                (0, testing_1.tick)();
                // Now that the options array has been re-assigned, new option instances will
                // be created by ngFor. These instances will have different option IDs, subsequent
                // to the first: 2 and 3. For the second option to stay selected, the select
                // value will need to have the ID of the current second option: 3.
                const nyOption = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                expect(select.nativeElement.value).toEqual('3: Object');
                expect(nyOption.nativeElement.selected).toBe(true);
            }));
        });
    });
    describe('select multiple controls', () => {
        describe('in reactive forms', () => {
            it('should support primitive values', () => {
                if (isNode)
                    return;
                const fixture = initTest(FormControlSelectMultiple);
                fixture.detectChanges();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const sfOption = fixture.debugElement.query(by_1.By.css('option'));
                expect(select.nativeElement.value).toEqual(`0: 'SF'`);
                expect(sfOption.nativeElement.selected).toBe(true);
            });
            it('should support objects', () => {
                if (isNode)
                    return;
                const fixture = initTest(FormControlSelectMultipleNgValue);
                fixture.detectChanges();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const sfOption = fixture.debugElement.query(by_1.By.css('option'));
                expect(select.nativeElement.value).toEqual('0: Object');
                expect(sfOption.nativeElement.selected).toBe(true);
            });
            it('should throw an error when compareWith is not a function', () => {
                const fixture = initTest(FormControlSelectMultipleWithCompareFn);
                fixture.componentInstance.compareFn = null;
                expect(() => fixture.detectChanges()).toThrowError(/compareWith must be a function, but received null/);
            });
            it('should compare options using provided compareWith function', (0, testing_1.fakeAsync)(() => {
                if (isNode)
                    return;
                const fixture = initTest(FormControlSelectMultipleWithCompareFn);
                fixture.detectChanges();
                (0, testing_1.tick)();
                const select = fixture.debugElement.query(by_1.By.css('select'));
                const sfOption = fixture.debugElement.query(by_1.By.css('option'));
                expect(select.nativeElement.value).toEqual('0: Object');
                expect(sfOption.nativeElement.selected).toBe(true);
            }));
        });
        describe('in template-driven forms', () => {
            let fixture;
            let comp;
            beforeEach(() => {
                fixture = initTest(NgModelSelectMultipleForm);
                comp = fixture.componentInstance;
                comp.cities = [{ 'name': 'SF' }, { 'name': 'NYC' }, { 'name': 'Buffalo' }];
            });
            const detectChangesAndTick = () => {
                fixture.detectChanges();
                (0, testing_1.tick)();
            };
            const setSelectedCities = (selectedCities) => {
                comp.selectedCities = selectedCities;
                detectChangesAndTick();
            };
            const selectOptionViaUI = (valueString) => {
                const select = fixture.debugElement.query(by_1.By.css('select'));
                select.nativeElement.value = valueString;
                (0, browser_util_1.dispatchEvent)(select.nativeElement, 'change');
                detectChangesAndTick();
            };
            const assertOptionElementSelectedState = (selectedStates) => {
                const options = fixture.debugElement.queryAll(by_1.By.css('option'));
                if (options.length !== selectedStates.length) {
                    throw 'the selected state values to assert does not match the number of options';
                }
                for (let i = 0; i < selectedStates.length; i++) {
                    expect(options[i].nativeElement.selected).toBe(selectedStates[i]);
                }
            };
            it('verify that native `selectedOptions` field is used while detecting the list of selected options', (0, testing_1.fakeAsync)(() => {
                if (isNode || !HTMLSelectElement.prototype.hasOwnProperty('selectedOptions'))
                    return;
                const spy = spyOnProperty(HTMLSelectElement.prototype, 'selectedOptions', 'get').and.callThrough();
                setSelectedCities([]);
                selectOptionViaUI('1: Object');
                assertOptionElementSelectedState([false, true, false]);
                expect(spy).toHaveBeenCalled();
            }));
            it('should reflect state of model after option selected and new options subsequently added', (0, testing_1.fakeAsync)(() => {
                if (isNode)
                    return;
                setSelectedCities([]);
                selectOptionViaUI('1: Object');
                assertOptionElementSelectedState([false, true, false]);
                comp.cities.push({ 'name': 'Chicago' });
                detectChangesAndTick();
                assertOptionElementSelectedState([false, true, false, false]);
            }));
            it('should reflect state of model after option selected and then other options removed', (0, testing_1.fakeAsync)(() => {
                if (isNode)
                    return;
                setSelectedCities([]);
                selectOptionViaUI('1: Object');
                assertOptionElementSelectedState([false, true, false]);
                comp.cities.pop();
                detectChangesAndTick();
                assertOptionElementSelectedState([false, true]);
            }));
        });
        it('should throw an error when compareWith is not a function', () => {
            const fixture = initTest(NgModelSelectMultipleWithCustomCompareFnForm);
            const comp = fixture.componentInstance;
            comp.compareFn = null;
            expect(() => fixture.detectChanges()).toThrowError(/compareWith must be a function, but received null/);
        });
        it('should compare options using provided compareWith function', (0, testing_1.fakeAsync)(() => {
            if (isNode)
                return;
            const fixture = initTest(NgModelSelectMultipleWithCustomCompareFnForm);
            const comp = fixture.componentInstance;
            comp.cities = [
                { id: 1, name: 'SF' },
                { id: 2, name: 'LA' },
            ];
            comp.selectedCities = [comp.cities[0]];
            fixture.detectChanges();
            (0, testing_1.tick)();
            const select = fixture.debugElement.query(by_1.By.css('select'));
            const sfOption = fixture.debugElement.query(by_1.By.css('option'));
            expect(select.nativeElement.value).toEqual('0: Object');
            expect(sfOption.nativeElement.selected).toBe(true);
        }));
    });
    describe('should support <type=radio>', () => {
        describe('in reactive forms', () => {
            it('should support basic functionality', () => {
                const fixture = initTest(FormControlRadioButtons);
                const form = new index_1.FormGroup({
                    'food': new index_1.FormControl('fish'),
                    'drink': new index_1.FormControl('sprite'),
                });
                fixture.componentInstance.form = form;
                fixture.detectChanges();
                // model -> view
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(true);
                (0, browser_util_1.dispatchEvent)(inputs[0].nativeElement, 'change');
                fixture.detectChanges();
                // view -> model
                expect(form.get('food').value).toEqual('chicken');
                expect(inputs[1].nativeElement.checked).toEqual(false);
                form.get('food').setValue('fish');
                fixture.detectChanges();
                // programmatic change -> view
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(true);
            });
            it('should support an initial undefined value', () => {
                const fixture = initTest(FormControlRadioButtons);
                const form = new index_1.FormGroup({ 'food': new index_1.FormControl(), 'drink': new index_1.FormControl() });
                fixture.componentInstance.form = form;
                fixture.detectChanges();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(false);
            });
            it('should reset properly', () => {
                const fixture = initTest(FormControlRadioButtons);
                const form = new index_1.FormGroup({
                    'food': new index_1.FormControl('fish'),
                    'drink': new index_1.FormControl('sprite'),
                });
                fixture.componentInstance.form = form;
                fixture.detectChanges();
                form.reset();
                fixture.detectChanges();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(false);
            });
            it('should properly set value to null and undefined', () => {
                const fixture = initTest(FormControlRadioButtons);
                const form = new index_1.FormGroup({
                    'food': new index_1.FormControl('chicken'),
                    'drink': new index_1.FormControl('sprite'),
                });
                fixture.componentInstance.form = form;
                fixture.detectChanges();
                form.get('food').setValue(null);
                fixture.detectChanges();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                form.get('food').setValue('chicken');
                fixture.detectChanges();
                form.get('food').setValue(undefined);
                fixture.detectChanges();
                expect(inputs[0].nativeElement.checked).toEqual(false);
            });
            it('should use formControlName to group radio buttons when name is absent', () => {
                const fixture = initTest(FormControlRadioButtons);
                const foodCtrl = new index_1.FormControl('fish');
                const drinkCtrl = new index_1.FormControl('sprite');
                fixture.componentInstance.form = new index_1.FormGroup({ 'food': foodCtrl, 'drink': drinkCtrl });
                fixture.detectChanges();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(true);
                expect(inputs[2].nativeElement.checked).toEqual(false);
                expect(inputs[3].nativeElement.checked).toEqual(true);
                (0, browser_util_1.dispatchEvent)(inputs[0].nativeElement, 'change');
                inputs[0].nativeElement.checked = true;
                fixture.detectChanges();
                const value = fixture.componentInstance.form.value;
                expect(value.food).toEqual('chicken');
                expect(inputs[1].nativeElement.checked).toEqual(false);
                expect(inputs[2].nativeElement.checked).toEqual(false);
                expect(inputs[3].nativeElement.checked).toEqual(true);
                drinkCtrl.setValue('cola');
                fixture.detectChanges();
                expect(inputs[0].nativeElement.checked).toEqual(true);
                expect(inputs[1].nativeElement.checked).toEqual(false);
                expect(inputs[2].nativeElement.checked).toEqual(true);
                expect(inputs[3].nativeElement.checked).toEqual(false);
            });
            it('should support removing controls from <type=radio>', () => {
                const fixture = initTest(FormControlRadioButtons);
                const showRadio = new index_1.FormControl('yes');
                const form = new index_1.FormGroup({
                    'food': new index_1.FormControl('fish'),
                    'drink': new index_1.FormControl('sprite'),
                });
                fixture.componentInstance.form = form;
                fixture.componentInstance.showRadio = showRadio;
                showRadio.valueChanges.subscribe((change) => {
                    change === 'yes'
                        ? form.addControl('food', new index_1.FormControl('fish'))
                        : form.removeControl('food');
                });
                fixture.detectChanges();
                const input = fixture.debugElement.query(by_1.By.css('[value="no"]'));
                (0, browser_util_1.dispatchEvent)(input.nativeElement, 'change');
                fixture.detectChanges();
                expect(form.value).toEqual({ drink: 'sprite' });
            });
            it('should differentiate controls on different levels with the same name', () => {
                testing_1.TestBed.overrideComponent(FormControlRadioButtons, {
                    set: {
                        template: `
              <div [formGroup]="form">
                <input type="radio" formControlName="food" value="chicken">
                <input type="radio" formControlName="food" value="fish">
                <div formGroupName="nested">
                  <input type="radio" formControlName="food" value="chicken">
                  <input type="radio" formControlName="food" value="fish">
                </div>
              </div>
              `,
                    },
                });
                const fixture = initTest(FormControlRadioButtons);
                const form = new index_1.FormGroup({
                    food: new index_1.FormControl('fish'),
                    nested: new index_1.FormGroup({ food: new index_1.FormControl('fish') }),
                });
                fixture.componentInstance.form = form;
                fixture.detectChanges();
                // model -> view
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(true);
                expect(inputs[2].nativeElement.checked).toEqual(false);
                expect(inputs[3].nativeElement.checked).toEqual(true);
                (0, browser_util_1.dispatchEvent)(inputs[0].nativeElement, 'change');
                fixture.detectChanges();
                // view -> model
                expect(form.get('food').value).toEqual('chicken');
                expect(form.get('nested.food').value).toEqual('fish');
                expect(inputs[1].nativeElement.checked).toEqual(false);
                expect(inputs[2].nativeElement.checked).toEqual(false);
                expect(inputs[3].nativeElement.checked).toEqual(true);
            });
            it('should disable all radio buttons when disable() is called', () => {
                const fixture = initTest(FormControlRadioButtons);
                const form = new index_1.FormGroup({ food: new index_1.FormControl('fish'), drink: new index_1.FormControl('cola') });
                fixture.componentInstance.form = form;
                fixture.detectChanges();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.disabled).toEqual(false);
                expect(inputs[1].nativeElement.disabled).toEqual(false);
                expect(inputs[2].nativeElement.disabled).toEqual(false);
                expect(inputs[3].nativeElement.disabled).toEqual(false);
                form.get('food').disable();
                expect(inputs[0].nativeElement.disabled).toEqual(true);
                expect(inputs[1].nativeElement.disabled).toEqual(true);
                expect(inputs[2].nativeElement.disabled).toEqual(false);
                expect(inputs[3].nativeElement.disabled).toEqual(false);
                form.disable();
                expect(inputs[0].nativeElement.disabled).toEqual(true);
                expect(inputs[1].nativeElement.disabled).toEqual(true);
                expect(inputs[2].nativeElement.disabled).toEqual(true);
                expect(inputs[3].nativeElement.disabled).toEqual(true);
                form.enable();
                expect(inputs[0].nativeElement.disabled).toEqual(false);
                expect(inputs[1].nativeElement.disabled).toEqual(false);
                expect(inputs[2].nativeElement.disabled).toEqual(false);
                expect(inputs[3].nativeElement.disabled).toEqual(false);
            });
            it('should disable all radio buttons when initially disabled', () => {
                const fixture = initTest(FormControlRadioButtons);
                const form = new index_1.FormGroup({
                    food: new index_1.FormControl({ value: 'fish', disabled: true }),
                    drink: new index_1.FormControl('cola'),
                });
                fixture.componentInstance.form = form;
                fixture.detectChanges();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.disabled).toEqual(true);
                expect(inputs[1].nativeElement.disabled).toEqual(true);
                expect(inputs[2].nativeElement.disabled).toEqual(false);
                expect(inputs[3].nativeElement.disabled).toEqual(false);
            });
            it('should work with reusing controls', () => {
                const fixture = initTest(FormControlRadioButtons);
                const food = new index_1.FormControl('chicken');
                fixture.componentInstance.form = new index_1.FormGroup({
                    'food': food,
                    'drink': new index_1.FormControl(''),
                });
                fixture.detectChanges();
                const newForm = new index_1.FormGroup({ 'food': food, 'drink': new index_1.FormControl('') });
                fixture.componentInstance.form = newForm;
                fixture.detectChanges();
                newForm.setValue({ food: 'fish', drink: '' });
                fixture.detectChanges();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toBe(false);
                expect(inputs[1].nativeElement.checked).toBe(true);
            });
        });
        describe('in template-driven forms', () => {
            it('should support basic functionality', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelRadioForm);
                fixture.componentInstance.food = 'fish';
                fixture.detectChanges();
                (0, testing_1.tick)();
                // model -> view
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(true);
                (0, browser_util_1.dispatchEvent)(inputs[0].nativeElement, 'change');
                (0, testing_1.tick)();
                // view -> model
                expect(fixture.componentInstance.food).toEqual('chicken');
                expect(inputs[1].nativeElement.checked).toEqual(false);
            }));
            it('should support multiple named <type=radio> groups', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelRadioForm);
                fixture.componentInstance.food = 'fish';
                fixture.componentInstance.drink = 'sprite';
                fixture.detectChanges();
                (0, testing_1.tick)();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(true);
                expect(inputs[2].nativeElement.checked).toEqual(false);
                expect(inputs[3].nativeElement.checked).toEqual(true);
                (0, browser_util_1.dispatchEvent)(inputs[0].nativeElement, 'change');
                (0, testing_1.tick)();
                expect(fixture.componentInstance.food).toEqual('chicken');
                expect(fixture.componentInstance.drink).toEqual('sprite');
                expect(inputs[1].nativeElement.checked).toEqual(false);
                expect(inputs[2].nativeElement.checked).toEqual(false);
                expect(inputs[3].nativeElement.checked).toEqual(true);
            }));
            it('should support initial undefined value', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelRadioForm);
                fixture.detectChanges();
                (0, testing_1.tick)();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(false);
                expect(inputs[2].nativeElement.checked).toEqual(false);
                expect(inputs[3].nativeElement.checked).toEqual(false);
            }));
            it('should support resetting properly', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelRadioForm);
                fixture.componentInstance.food = 'chicken';
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.query(by_1.By.css('form'));
                (0, browser_util_1.dispatchEvent)(form.nativeElement, 'reset');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(false);
            }));
            it('should support setting value to null and undefined', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelRadioForm);
                fixture.componentInstance.food = 'chicken';
                fixture.detectChanges();
                (0, testing_1.tick)();
                fixture.componentInstance.food = null;
                fixture.detectChanges();
                (0, testing_1.tick)();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(false);
                fixture.componentInstance.food = 'chicken';
                fixture.detectChanges();
                (0, testing_1.tick)();
                fixture.componentInstance.food = undefined;
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(inputs[0].nativeElement.checked).toEqual(false);
                expect(inputs[1].nativeElement.checked).toEqual(false);
            }));
            it('should disable radio controls properly with programmatic call', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelRadioForm);
                fixture.componentInstance.food = 'fish';
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                form.control.get('food').disable();
                (0, testing_1.tick)();
                const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                expect(inputs[0].nativeElement.disabled).toBe(true);
                expect(inputs[1].nativeElement.disabled).toBe(true);
                expect(inputs[2].nativeElement.disabled).toBe(false);
                expect(inputs[3].nativeElement.disabled).toBe(false);
                form.control.disable();
                (0, testing_1.tick)();
                expect(inputs[0].nativeElement.disabled).toBe(true);
                expect(inputs[1].nativeElement.disabled).toBe(true);
                expect(inputs[2].nativeElement.disabled).toBe(true);
                expect(inputs[3].nativeElement.disabled).toBe(true);
                form.control.enable();
                (0, testing_1.tick)();
                expect(inputs[0].nativeElement.disabled).toBe(false);
                expect(inputs[1].nativeElement.disabled).toBe(false);
                expect(inputs[2].nativeElement.disabled).toBe(false);
                expect(inputs[3].nativeElement.disabled).toBe(false);
            }));
        });
    });
    describe('should support <type=range>', () => {
        describe('in reactive forms', () => {
            it('with basic use case', () => {
                const fixture = initTest(FormControlRangeInput);
                const control = new index_1.FormControl(10);
                fixture.componentInstance.control = control;
                fixture.detectChanges();
                // model -> view
                const input = fixture.debugElement.query(by_1.By.css('input'));
                expect(input.nativeElement.value).toEqual('10');
                input.nativeElement.value = '20';
                (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
                // view -> model
                expect(control.value).toEqual(20);
            });
            it('when value is cleared in the UI', () => {
                const fixture = initTest(FormControlNumberInput);
                const control = new index_1.FormControl(10, index_1.Validators.required);
                fixture.componentInstance.control = control;
                fixture.detectChanges();
                const input = fixture.debugElement.query(by_1.By.css('input'));
                input.nativeElement.value = '';
                (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
                expect(control.valid).toBe(false);
                expect(control.value).toEqual(null);
                input.nativeElement.value = '0';
                (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
                expect(control.valid).toBe(true);
                expect(control.value).toEqual(0);
            });
            it('when value is cleared programmatically', () => {
                const fixture = initTest(FormControlNumberInput);
                const control = new index_1.FormControl(10);
                fixture.componentInstance.control = control;
                fixture.detectChanges();
                control.setValue(null);
                const input = fixture.debugElement.query(by_1.By.css('input'));
                expect(input.nativeElement.value).toEqual('');
            });
        });
        describe('in template-driven forms', () => {
            it('with basic use case', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelRangeForm);
                // model -> view
                fixture.componentInstance.val = 4;
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input'));
                expect(input.nativeElement.value).toBe('4');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const newVal = '4';
                input.triggerEventHandler('input', { target: { value: newVal } });
                (0, testing_1.tick)();
                // view -> model
                fixture.detectChanges();
                expect(typeof fixture.componentInstance.val).toBe('number');
            }));
        });
    });
    describe('custom value accessors', () => {
        describe('in reactive forms', () => {
            it('should support basic functionality', () => {
                const fixture = initTest(WrappedValueForm, WrappedValue);
                const form = new index_1.FormGroup({ 'login': new index_1.FormControl('aa') });
                fixture.componentInstance.form = form;
                fixture.detectChanges();
                // model -> view
                const input = fixture.debugElement.query(by_1.By.css('input'));
                expect(input.nativeElement.value).toEqual('!aa!');
                input.nativeElement.value = '!bb!';
                (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
                // view -> model
                expect(form.value).toEqual({ 'login': 'bb' });
                // custom validator
                expect(form.get('login').errors).toEqual({ 'err': true });
                form.setValue({ login: 'expected' });
                expect(form.get('login').errors).toEqual(null);
            });
            it("should support non builtin input elements that fire a change event without a 'target' property", () => {
                const fixture = initTest(MyInputForm, MyInput);
                fixture.componentInstance.form = new index_1.FormGroup({ 'login': new index_1.FormControl('aa') });
                fixture.detectChanges();
                const input = fixture.debugElement.query(by_1.By.css('my-input'));
                expect(input.componentInstance.value).toEqual('!aa!');
                input.componentInstance.value = '!bb!';
                input.componentInstance.onInput.subscribe((value) => {
                    expect(fixture.componentInstance.form.value).toEqual({ 'login': 'bb' });
                });
                input.componentInstance.dispatchChangeEvent();
            });
            it('should support custom accessors without setDisabledState - formControlName', () => {
                const fixture = initTest(WrappedValueForm, WrappedValue);
                fixture.componentInstance.form = new index_1.FormGroup({
                    'login': new index_1.FormControl({ value: 'aa', disabled: true }),
                });
                fixture.detectChanges();
                expect(fixture.componentInstance.form.status).toEqual('DISABLED');
                expect(fixture.componentInstance.form.get('login').status).toEqual('DISABLED');
            });
            it('should support custom accessors without setDisabledState - formControlDirective', () => {
                testing_1.TestBed.overrideComponent(FormControlComp, {
                    set: { template: `<input type="text" [formControl]="control" wrapped-value>` },
                });
                const fixture = initTest(FormControlComp);
                fixture.componentInstance.control = new index_1.FormControl({ value: 'aa', disabled: true });
                fixture.detectChanges();
                expect(fixture.componentInstance.control.status).toEqual('DISABLED');
            });
            describe('should support custom accessors with setDisabledState - formControlName', () => {
                let fixture;
                beforeEach(() => {
                    fixture = initTest(CvaWithDisabledStateForm, CvaWithDisabledState);
                });
                it('sets the disabled state when the control is initially disabled', () => {
                    fixture.componentInstance.form = new index_1.FormGroup({
                        'login': new index_1.FormControl({ value: 'aa', disabled: true }),
                    });
                    fixture.detectChanges();
                    expect(fixture.componentInstance.form.status).toEqual('DISABLED');
                    expect(fixture.componentInstance.form.get('login').status).toEqual('DISABLED');
                    expect(fixture.debugElement.query(by_1.By.directive(CvaWithDisabledState)).nativeElement
                        .textContent).toContain('DISABLED');
                });
                it('sets the enabled state when the control is initially enabled', () => {
                    fixture.componentInstance.form = new index_1.FormGroup({
                        'login': new index_1.FormControl({ value: 'aa', disabled: false }),
                    });
                    fixture.detectChanges();
                    expect(fixture.componentInstance.form.status).toEqual('VALID');
                    expect(fixture.componentInstance.form.get('login').status).toEqual('VALID');
                    expect(fixture.debugElement.query(by_1.By.directive(CvaWithDisabledState)).nativeElement
                        .textContent).toContain('ENABLED');
                });
            });
            it('should populate control in ngOnInit when injecting NgControl', () => {
                const fixture = initTest(MyInputForm, MyInput);
                fixture.componentInstance.form = new index_1.FormGroup({ 'login': new index_1.FormControl('aa') });
                fixture.detectChanges();
                expect(fixture.componentInstance.myInput.control).toBeDefined();
                expect(fixture.componentInstance.myInput.control).toEqual(fixture.componentInstance.myInput.controlDir.control);
            });
        });
        describe('in template-driven forms', () => {
            it('should support standard writing to view and model', (0, testing_1.waitForAsync)(() => {
                const fixture = initTest(NgModelCustomWrapper, NgModelCustomComp);
                fixture.componentInstance.name = 'Nancy';
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        // model -> view
                        const customInput = fixture.debugElement.query(by_1.By.css('[name="custom"]'));
                        expect(customInput.nativeElement.value).toEqual('Nancy');
                        customInput.nativeElement.value = 'Carson';
                        (0, browser_util_1.dispatchEvent)(customInput.nativeElement, 'input');
                        fixture.detectChanges();
                        // view -> model
                        expect(fixture.componentInstance.name).toEqual('Carson');
                    });
                });
            }));
        });
        describe('`ngModel` value accessor inside an OnPush component', () => {
            it('should run change detection and update the value', (0, testing_1.fakeAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
                let Parent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'parent',
                            template: '<child [ngModel]="value"></child>',
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Parent = _classThis = class {
                        constructor(ref) {
                            this.ref = ref;
                        }
                        setTimeoutAndChangeValue() {
                            setTimeout(() => {
                                this.value = 'Carson';
                                this.ref.detectChanges();
                            }, 50);
                        }
                    };
                    __setFunctionName(_classThis, "Parent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Parent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Parent = _classThis;
                })();
                let Child = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'child',
                            template: 'Value: {{ value }}',
                            providers: [{ provide: index_1.NG_VALUE_ACCESSOR, useExisting: Child, multi: true }],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Child = _classThis = class {
                        writeValue(value) {
                            this.value = value;
                        }
                        registerOnChange() { }
                        registerOnTouched() { }
                    };
                    __setFunctionName(_classThis, "Child");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Child = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Child = _classThis;
                })();
                const fixture = initTest(Parent, Child);
                fixture.componentInstance.value = 'Nancy';
                fixture.detectChanges();
                yield fixture.whenStable();
                fixture.detectChanges();
                yield fixture.whenStable();
                const child = fixture.debugElement.query(by_1.By.css('child'));
                // Let's ensure that the initial value has been set, because previously
                // it wasn't set inside an `OnPush` component.
                expect(child.nativeElement.innerHTML).toEqual('Value: Nancy');
                fixture.componentInstance.setTimeoutAndChangeValue();
                (0, testing_1.tick)(50);
                fixture.detectChanges();
                yield fixture.whenStable();
                expect(child.nativeElement.innerHTML).toEqual('Value: Carson');
            })));
        });
    });
});
describe('value accessors in reactive forms with custom options', () => {
    function initTest(component, ...directives) {
        testing_1.TestBed.configureTestingModule({
            declarations: [component, ...directives],
            imports: [
                index_1.ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
            ],
        });
        return testing_1.TestBed.createComponent(component);
    }
    describe('should support custom accessors with setDisabledState', () => {
        let fixture;
        beforeEach(() => {
            fixture = initTest(CvaWithDisabledStateForm, CvaWithDisabledState);
        });
        it('does not set the enabled state when the control is initially enabled', () => {
            fixture.componentInstance.form = new index_1.FormGroup({
                'login': new index_1.FormControl({ value: 'aa', disabled: false }),
            });
            fixture.detectChanges();
            expect(fixture.componentInstance.form.status).toEqual('VALID');
            expect(fixture.componentInstance.form.get('login').status).toEqual('VALID');
            expect(fixture.debugElement.query(by_1.By.directive(CvaWithDisabledState)).nativeElement.textContent).toContain('UNSET');
        });
    });
});
let FormControlComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-comp',
            template: `<input type="text" [formControl]="control">`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlComp = _classThis = class {
    };
    __setFunctionName(_classThis, "FormControlComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlComp = _classThis;
})();
exports.FormControlComp = FormControlComp;
let FormGroupComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-group-comp',
            template: `
    <form [formGroup]="form" (ngSubmit)="event=$event">
      <input type="text" formControlName="login">
    </form>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormGroupComp = _classThis = class {
    };
    __setFunctionName(_classThis, "FormGroupComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormGroupComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormGroupComp = _classThis;
})();
exports.FormGroupComp = FormGroupComp;
let FormControlNumberInput = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-number-input',
            template: `<input type="number" [formControl]="control">`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlNumberInput = _classThis = class {
    };
    __setFunctionName(_classThis, "FormControlNumberInput");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlNumberInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlNumberInput = _classThis;
})();
let FormControlNameSelect = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-name-select',
            template: `
    <div [formGroup]="form">
      <select formControlName="city">
        <option *ngFor="let c of cities" [value]="c"></option>
      </select>
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlNameSelect = _classThis = class {
        constructor() {
            this.cities = ['SF', 'NY'];
            this.form = new index_1.FormGroup({ city: new index_1.FormControl('SF') });
        }
    };
    __setFunctionName(_classThis, "FormControlNameSelect");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlNameSelect = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlNameSelect = _classThis;
})();
let FormControlSelectNgValue = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-select-ngValue',
            template: `
    <div [formGroup]="form">
      <select formControlName="city">
        <option *ngFor="let c of cities" [ngValue]="c">{{c.name}}</option>
      </select>
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlSelectNgValue = _classThis = class {
        constructor() {
            this.cities = [
                { id: 1, name: 'SF' },
                { id: 2, name: 'NY' },
            ];
            this.form = new index_1.FormGroup({ city: new index_1.FormControl(this.cities[0]) });
        }
    };
    __setFunctionName(_classThis, "FormControlSelectNgValue");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlSelectNgValue = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlSelectNgValue = _classThis;
})();
let FormControlSelectWithCompareFn = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-select-compare-with',
            template: `
    <div [formGroup]="form">
      <select formControlName="city" [compareWith]="compareFn">
        <option *ngFor="let c of cities" [ngValue]="c">{{c.name}}</option>
      </select>
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlSelectWithCompareFn = _classThis = class {
        constructor() {
            this.compareFn = (o1, o2) => o1 && o2 ? o1.id === o2.id : o1 === o2;
            this.cities = [
                { id: 1, name: 'SF' },
                { id: 2, name: 'NY' },
            ];
            this.form = new index_1.FormGroup({ city: new index_1.FormControl({ id: 1, name: 'SF' }) });
        }
    };
    __setFunctionName(_classThis, "FormControlSelectWithCompareFn");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlSelectWithCompareFn = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlSelectWithCompareFn = _classThis;
})();
let FormControlSelectMultiple = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-select-multiple',
            template: `
    <div [formGroup]="form">
      <select multiple formControlName="city">
        <option *ngFor="let c of cities" [value]="c">{{c}}</option>
      </select>
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlSelectMultiple = _classThis = class {
        constructor() {
            this.cities = ['SF', 'NY'];
            this.form = new index_1.FormGroup({ city: new index_1.FormControl(['SF']) });
        }
    };
    __setFunctionName(_classThis, "FormControlSelectMultiple");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlSelectMultiple = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlSelectMultiple = _classThis;
})();
let FormControlSelectMultipleNgValue = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-select-multiple',
            template: `
    <div [formGroup]="form">
      <select multiple formControlName="city">
        <option *ngFor="let c of cities" [ngValue]="c">{{c.name}}</option>
      </select>
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlSelectMultipleNgValue = _classThis = class {
        constructor() {
            this.cities = [
                { id: 1, name: 'SF' },
                { id: 2, name: 'NY' },
            ];
            this.form = new index_1.FormGroup({ city: new index_1.FormControl([this.cities[0]]) });
        }
    };
    __setFunctionName(_classThis, "FormControlSelectMultipleNgValue");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlSelectMultipleNgValue = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlSelectMultipleNgValue = _classThis;
})();
let FormControlSelectMultipleWithCompareFn = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-select-multiple-compare-with',
            template: `
    <div [formGroup]="form">
      <select multiple formControlName="city" [compareWith]="compareFn">
        <option *ngFor="let c of cities" [ngValue]="c">{{c.name}}</option>
      </select>
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlSelectMultipleWithCompareFn = _classThis = class {
        constructor() {
            this.compareFn = (o1, o2) => o1 && o2 ? o1.id === o2.id : o1 === o2;
            this.cities = [
                { id: 1, name: 'SF' },
                { id: 2, name: 'NY' },
            ];
            this.form = new index_1.FormGroup({ city: new index_1.FormControl([{ id: 1, name: 'SF' }]) });
        }
    };
    __setFunctionName(_classThis, "FormControlSelectMultipleWithCompareFn");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlSelectMultipleWithCompareFn = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlSelectMultipleWithCompareFn = _classThis;
})();
let NgModelSelectForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-select-form',
            template: `
    <select [(ngModel)]="selectedCity">
      <option *ngFor="let c of cities" [ngValue]="c"> {{c.name}} </option>
    </select>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelSelectForm = _classThis = class {
        constructor() {
            this.selectedCity = {};
            this.cities = [];
        }
    };
    __setFunctionName(_classThis, "NgModelSelectForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelSelectForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelSelectForm = _classThis;
})();
let NgModelSelectWithNullForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-select-null-form',
            template: `
    <select [(ngModel)]="selectedCity">
      <option *ngFor="let c of cities" [ngValue]="c"> {{c.name}} </option>
      <option [ngValue]="null">Unspecified</option>
    </select>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelSelectWithNullForm = _classThis = class {
        constructor() {
            this.selectedCity = {};
            this.cities = [];
        }
    };
    __setFunctionName(_classThis, "NgModelSelectWithNullForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelSelectWithNullForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelSelectWithNullForm = _classThis;
})();
let NgModelSelectWithCustomCompareFnForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-select-compare-with',
            template: `
    <select [(ngModel)]="selectedCity" [compareWith]="compareFn">
      <option *ngFor="let c of cities" [ngValue]="c"> {{c.name}} </option>
    </select>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelSelectWithCustomCompareFnForm = _classThis = class {
        constructor() {
            this.compareFn = (o1, o2) => o1 && o2 ? o1.id === o2.id : o1 === o2;
            this.selectedCity = {};
            this.cities = [];
        }
    };
    __setFunctionName(_classThis, "NgModelSelectWithCustomCompareFnForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelSelectWithCustomCompareFnForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelSelectWithCustomCompareFnForm = _classThis;
})();
let NgModelSelectMultipleWithCustomCompareFnForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-select-multiple-compare-with',
            template: `
    <select multiple [(ngModel)]="selectedCities" [compareWith]="compareFn">
      <option *ngFor="let c of cities" [ngValue]="c"> {{c.name}} </option>
    </select>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelSelectMultipleWithCustomCompareFnForm = _classThis = class {
        constructor() {
            this.compareFn = (o1, o2) => o1 && o2 ? o1.id === o2.id : o1 === o2;
            this.selectedCities = [];
            this.cities = [];
        }
    };
    __setFunctionName(_classThis, "NgModelSelectMultipleWithCustomCompareFnForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelSelectMultipleWithCustomCompareFnForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelSelectMultipleWithCustomCompareFnForm = _classThis;
})();
let NgModelSelectMultipleForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-select-multiple-form',
            template: `
    <select multiple [(ngModel)]="selectedCities">
      <option *ngFor="let c of cities" [ngValue]="c"> {{c.name}} </option>
    </select>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelSelectMultipleForm = _classThis = class {
        constructor() {
            this.cities = [];
        }
    };
    __setFunctionName(_classThis, "NgModelSelectMultipleForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelSelectMultipleForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelSelectMultipleForm = _classThis;
})();
let FormControlRangeInput = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-range-input',
            template: `<input type="range" [formControl]="control">`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlRangeInput = _classThis = class {
    };
    __setFunctionName(_classThis, "FormControlRangeInput");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlRangeInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlRangeInput = _classThis;
})();
let NgModelRangeForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-range-form',
            template: '<input type="range" [(ngModel)]="val">',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelRangeForm = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelRangeForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelRangeForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelRangeForm = _classThis;
})();
let FormControlRadioButtons = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'form-control-radio-buttons',
            template: `
    <form [formGroup]="form" *ngIf="showRadio.value === 'yes'">
      <input type="radio" formControlName="food" value="chicken">
      <input type="radio" formControlName="food" value="fish">
      <input type="radio" formControlName="drink" value="cola">
      <input type="radio" formControlName="drink" value="sprite">
    </form>
    <input type="radio" [formControl]="showRadio" value="yes">
    <input type="radio" [formControl]="showRadio" value="no">`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormControlRadioButtons = _classThis = class {
        constructor() {
            this.showRadio = new index_1.FormControl('yes');
        }
    };
    __setFunctionName(_classThis, "FormControlRadioButtons");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormControlRadioButtons = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormControlRadioButtons = _classThis;
})();
exports.FormControlRadioButtons = FormControlRadioButtons;
let NgModelRadioForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-radio-form',
            template: `
    <form>
      <input type="radio" name="food" [(ngModel)]="food" value="chicken">
      <input type="radio" name="food"  [(ngModel)]="food" value="fish">

      <input type="radio" name="drink" [(ngModel)]="drink" value="cola">
      <input type="radio" name="drink" [(ngModel)]="drink" value="sprite">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelRadioForm = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelRadioForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelRadioForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelRadioForm = _classThis;
})();
let WrappedValue = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[wrapped-value]',
            host: { '(input)': 'handleOnInput($event.target.value)', '[value]': 'value' },
            providers: [
                { provide: index_1.NG_VALUE_ACCESSOR, multi: true, useExisting: WrappedValue },
                { provide: index_1.NG_VALIDATORS, multi: true, useExisting: WrappedValue },
            ],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WrappedValue = _classThis = class {
        writeValue(value) {
            this.value = `!${value}!`;
        }
        registerOnChange(fn) {
            this.onChange = fn;
        }
        registerOnTouched(fn) { }
        handleOnInput(value) {
            this.onChange(value.substring(1, value.length - 1));
        }
        validate(c) {
            return c.value === 'expected' ? null : { 'err': true };
        }
    };
    __setFunctionName(_classThis, "WrappedValue");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WrappedValue = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WrappedValue = _classThis;
})();
let CvaWithDisabledState = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cva-with-disabled-state',
            template: `
    <div *ngIf="disabled !== undefined">CALLED WITH {{disabled ? 'DISABLED' : 'ENABLED'}}</div>
    <div *ngIf="disabled === undefined">UNSET</div>
  `,
            providers: [{ provide: index_1.NG_VALUE_ACCESSOR, multi: true, useExisting: CvaWithDisabledState }],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CvaWithDisabledState = _classThis = class {
        writeValue(value) { }
        registerOnChange(fn) { }
        registerOnTouched(fn) { }
        setDisabledState(disabled) {
            this.disabled = disabled;
        }
    };
    __setFunctionName(_classThis, "CvaWithDisabledState");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CvaWithDisabledState = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CvaWithDisabledState = _classThis;
})();
let CvaWithDisabledStateForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'wrapped-value-form',
            template: `
    <div [formGroup]="form">
      <cva-with-disabled-state formControlName="login"></cva-with-disabled-state>
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CvaWithDisabledStateForm = _classThis = class {
    };
    __setFunctionName(_classThis, "CvaWithDisabledStateForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CvaWithDisabledStateForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CvaWithDisabledStateForm = _classThis;
})();
let MyInput = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-input',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _onInput_decorators;
    let _onInput_initializers = [];
    let _onInput_extraInitializers = [];
    var MyInput = _classThis = class {
        constructor(controlDir) {
            this.controlDir = controlDir;
            this.onInput = __runInitializers(this, _onInput_initializers, new core_1.EventEmitter());
            this.value = __runInitializers(this, _onInput_extraInitializers);
            this.control = null;
            controlDir.valueAccessor = this;
        }
        ngOnInit() {
            this.control = this.controlDir.control;
        }
        writeValue(value) {
            this.value = `!${value}!`;
        }
        registerOnChange(fn) {
            this.onInput.subscribe({ next: fn });
        }
        registerOnTouched(fn) { }
        dispatchChangeEvent() {
            this.onInput.emit(this.value.substring(1, this.value.length - 1));
        }
    };
    __setFunctionName(_classThis, "MyInput");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _onInput_decorators = [(0, core_1.Output)('input')];
        __esDecorate(null, null, _onInput_decorators, { kind: "field", name: "onInput", static: false, private: false, access: { has: obj => "onInput" in obj, get: obj => obj.onInput, set: (obj, value) => { obj.onInput = value; } }, metadata: _metadata }, _onInput_initializers, _onInput_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyInput = _classThis;
})();
exports.MyInput = MyInput;
let MyInputForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-input-form',
            template: `
    <div [formGroup]="form">
      <my-input formControlName="login"></my-input>
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _myInput_decorators;
    let _myInput_initializers = [];
    let _myInput_extraInitializers = [];
    var MyInputForm = _classThis = class {
        constructor() {
            this.myInput = __runInitializers(this, _myInput_initializers, null);
            __runInitializers(this, _myInput_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MyInputForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myInput_decorators = [(0, core_1.ViewChild)(MyInput)];
        __esDecorate(null, null, _myInput_decorators, { kind: "field", name: "myInput", static: false, private: false, access: { has: obj => "myInput" in obj, get: obj => obj.myInput, set: (obj, value) => { obj.myInput = value; } }, metadata: _metadata }, _myInput_initializers, _myInput_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyInputForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyInputForm = _classThis;
})();
exports.MyInputForm = MyInputForm;
let WrappedValueForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'wrapped-value-form',
            template: `
    <div [formGroup]="form">
      <input type="text" formControlName="login" wrapped-value>
    </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WrappedValueForm = _classThis = class {
    };
    __setFunctionName(_classThis, "WrappedValueForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WrappedValueForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WrappedValueForm = _classThis;
})();
let NgModelCustomComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-custom-comp',
            template: `
    <input name="custom" [(ngModel)]="model" (ngModelChange)="changeFn($event)" [disabled]="isDisabled">
  `,
            providers: [{ provide: index_1.NG_VALUE_ACCESSOR, multi: true, useExisting: NgModelCustomComp }],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _isDisabled_decorators;
    let _isDisabled_initializers = [];
    let _isDisabled_extraInitializers = [];
    var NgModelCustomComp = _classThis = class {
        constructor() {
            this.isDisabled = __runInitializers(this, _isDisabled_initializers, false);
            this.changeFn = __runInitializers(this, _isDisabled_extraInitializers);
        }
        writeValue(value) {
            this.model = value;
        }
        registerOnChange(fn) {
            this.changeFn = fn;
        }
        registerOnTouched() { }
        setDisabledState(isDisabled) {
            this.isDisabled = isDisabled;
        }
    };
    __setFunctionName(_classThis, "NgModelCustomComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _isDisabled_decorators = [(0, core_1.Input)('disabled')];
        __esDecorate(null, null, _isDisabled_decorators, { kind: "field", name: "isDisabled", static: false, private: false, access: { has: obj => "isDisabled" in obj, get: obj => obj.isDisabled, set: (obj, value) => { obj.isDisabled = value; } }, metadata: _metadata }, _isDisabled_initializers, _isDisabled_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelCustomComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelCustomComp = _classThis;
})();
exports.NgModelCustomComp = NgModelCustomComp;
let NgModelCustomWrapper = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-custom-wrapper',
            template: `
    <form>
      <ng-model-custom-comp name="name" [(ngModel)]="name" [disabled]="isDisabled"></ng-model-custom-comp>
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelCustomWrapper = _classThis = class {
        constructor() {
            this.isDisabled = false;
        }
    };
    __setFunctionName(_classThis, "NgModelCustomWrapper");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelCustomWrapper = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelCustomWrapper = _classThis;
})();
exports.NgModelCustomWrapper = NgModelCustomWrapper;
