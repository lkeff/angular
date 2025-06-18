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
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../index");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
const rxjs_1 = require("rxjs");
const value_accessor_integration_spec_1 = require("./value_accessor_integration_spec");
describe('template-driven forms integration tests', () => {
    function initTest(component, ...directives) {
        testing_1.TestBed.configureTestingModule({
            declarations: [component, ...directives],
            imports: [index_1.FormsModule, common_1.CommonModule],
        });
        return testing_1.TestBed.createComponent(component);
    }
    describe('basic functionality', () => {
        it('should support ngModel for standalone fields', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(StandaloneNgModel);
            fixture.componentInstance.name = 'oldValue';
            fixture.detectChanges();
            (0, testing_1.tick)();
            // model -> view
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            expect(input.value).toEqual('oldValue');
            input.value = 'updatedValue';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            (0, testing_1.tick)();
            // view -> model
            expect(fixture.componentInstance.name).toEqual('updatedValue');
        }));
        it('should support ngModel registration with a parent form', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            fixture.componentInstance.name = 'Nancy';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.value).toEqual({ name: 'Nancy' });
            expect(form.valid).toBe(false);
        }));
        it('should report properties which are written outside of template bindings', () => __awaiter(void 0, void 0, void 0, function* () {
            // For example ngModel writes to `checked` property programmatically
            // (template does not contain binding to `checked` explicitly)
            // https://github.com/angular/angular/issues/33695
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-root',
                        template: `<input type="radio" value="one" [(ngModel)]="active"/>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.active = 'one';
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ imports: [index_1.FormsModule], declarations: [AppComponent] });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            // We need the Await as `ngModel` writes data asynchronously into the DOM
            yield fixture.detectChanges();
            const input = fixture.debugElement.query(by_1.By.css('input'));
            expect(input.properties['checked']).toBe(true);
            expect(input.nativeElement.checked).toBe(true);
        }));
        it('should add novalidate by default to form element', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.query(by_1.By.css('form'));
            expect(form.nativeElement.getAttribute('novalidate')).toEqual('');
        }));
        it('should be possible to use native validation and angular forms', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelNativeValidateForm);
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.query(by_1.By.css('form'));
            expect(form.nativeElement.hasAttribute('novalidate')).toEqual(false);
        }));
        it('should support ngModelGroup', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelGroupForm);
            fixture.componentInstance.first = 'Nancy';
            fixture.componentInstance.last = 'Drew';
            fixture.componentInstance.email = 'some email';
            fixture.detectChanges();
            (0, testing_1.tick)();
            // model -> view
            const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
            expect(inputs[0].nativeElement.value).toEqual('Nancy');
            expect(inputs[1].nativeElement.value).toEqual('Drew');
            inputs[0].nativeElement.value = 'Carson';
            (0, browser_util_1.dispatchEvent)(inputs[0].nativeElement, 'input');
            (0, testing_1.tick)();
            // view -> model
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.value).toEqual({ name: { first: 'Carson', last: 'Drew' }, email: 'some email' });
        }));
        it('should add controls and control groups to form control model', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelGroupForm);
            fixture.componentInstance.first = 'Nancy';
            fixture.componentInstance.last = 'Drew';
            fixture.componentInstance.email = 'some email';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.control.get('name').value).toEqual({ first: 'Nancy', last: 'Drew' });
            expect(form.control.get('name.first').value).toEqual('Nancy');
            expect(form.control.get('email').value).toEqual('some email');
        }));
        it('should remove controls and control groups from form control model', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelNgIfForm);
            fixture.componentInstance.emailShowing = true;
            fixture.componentInstance.first = 'Nancy';
            fixture.componentInstance.email = 'some email';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.control.get('email').value).toEqual('some email');
            expect(form.value).toEqual({ name: { first: 'Nancy' }, email: 'some email' });
            // should remove individual control successfully
            fixture.componentInstance.emailShowing = false;
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(form.control.get('email')).toBe(null);
            expect(form.value).toEqual({ name: { first: 'Nancy' } });
            expect(form.control.get('name').value).toEqual({ first: 'Nancy' });
            expect(form.control.get('name.first').value).toEqual('Nancy');
            // should remove form group successfully
            fixture.componentInstance.groupShowing = false;
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(form.control.get('name')).toBe(null);
            expect(form.control.get('name.first')).toBe(null);
            expect(form.value).toEqual({});
        }));
        it('should set status classes with ngModel', (0, testing_1.waitForAsync)(() => {
            const fixture = initTest(NgModelForm);
            fixture.componentInstance.name = 'aa';
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                expect((0, browser_util_1.sortedClassList)(input)).toEqual(['ng-invalid', 'ng-pristine', 'ng-untouched']);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(input)).toEqual(['ng-invalid', 'ng-pristine', 'ng-touched']);
                input.value = 'updatedValue';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(input)).toEqual(['ng-dirty', 'ng-touched', 'ng-valid']);
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(formEl)).toEqual([
                    'ng-dirty',
                    'ng-submitted',
                    'ng-touched',
                    'ng-valid',
                ]);
                expect((0, browser_util_1.sortedClassList)(input)).not.toContain('ng-submitted');
                (0, browser_util_1.dispatchEvent)(formEl, 'reset');
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(formEl)).toEqual(['ng-pristine', 'ng-untouched', 'ng-valid']);
                expect((0, browser_util_1.sortedClassList)(input)).not.toContain('ng-submitted');
            });
        }));
        it('should set status classes with ngModel and async validators', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelAsyncValidation, NgAsyncValidator);
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                expect((0, browser_util_1.sortedClassList)(input)).toEqual(['ng-pending', 'ng-pristine', 'ng-untouched']);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(input)).toEqual(['ng-pending', 'ng-pristine', 'ng-touched']);
                input.value = 'updatedValue';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                (0, testing_1.tick)();
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(input)).toEqual(['ng-dirty', 'ng-touched', 'ng-valid']);
            });
        }));
        it('should set status classes with ngModelGroup and ngForm', (0, testing_1.waitForAsync)(() => {
            const fixture = initTest(NgModelGroupForm);
            fixture.componentInstance.first = '';
            fixture.detectChanges();
            const form = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
            const modelGroup = fixture.debugElement.query(by_1.By.css('[ngModelGroup]')).nativeElement;
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            // ngModelGroup creates its control asynchronously
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(modelGroup)).toEqual(['ng-invalid', 'ng-pristine', 'ng-untouched']);
                expect((0, browser_util_1.sortedClassList)(form)).toEqual(['ng-invalid', 'ng-pristine', 'ng-untouched']);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(modelGroup)).toEqual(['ng-invalid', 'ng-pristine', 'ng-touched']);
                expect((0, browser_util_1.sortedClassList)(form)).toEqual(['ng-invalid', 'ng-pristine', 'ng-touched']);
                input.value = 'updatedValue';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(modelGroup)).toEqual(['ng-dirty', 'ng-touched', 'ng-valid']);
                expect((0, browser_util_1.sortedClassList)(form)).toEqual(['ng-dirty', 'ng-touched', 'ng-valid']);
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect((0, browser_util_1.sortedClassList)(formEl)).toEqual([
                    'ng-dirty',
                    'ng-submitted',
                    'ng-touched',
                    'ng-valid',
                ]);
            });
        }));
        it('should set status classes involving nested FormGroups', () => __awaiter(void 0, void 0, void 0, function* () {
            const fixture = initTest(NgModelNestedForm);
            fixture.componentInstance.first = '';
            fixture.componentInstance.other = '';
            fixture.detectChanges();
            const form = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
            const modelGroup = fixture.debugElement.query(by_1.By.css('[ngModelGroup]')).nativeElement;
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            yield fixture.whenStable();
            fixture.detectChanges();
            expect((0, browser_util_1.sortedClassList)(modelGroup)).toEqual(['ng-pristine', 'ng-untouched', 'ng-valid']);
            expect((0, browser_util_1.sortedClassList)(form)).toEqual(['ng-pristine', 'ng-untouched', 'ng-valid']);
            const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
            (0, browser_util_1.dispatchEvent)(formEl, 'submit');
            fixture.detectChanges();
            expect((0, browser_util_1.sortedClassList)(modelGroup)).toEqual(['ng-pristine', 'ng-untouched', 'ng-valid']);
            expect((0, browser_util_1.sortedClassList)(form)).toEqual([
                'ng-pristine',
                'ng-submitted',
                'ng-untouched',
                'ng-valid',
            ]);
            expect((0, browser_util_1.sortedClassList)(input)).not.toContain('ng-submitted');
            (0, browser_util_1.dispatchEvent)(formEl, 'reset');
            fixture.detectChanges();
            expect((0, browser_util_1.sortedClassList)(modelGroup)).toEqual(['ng-pristine', 'ng-untouched', 'ng-valid']);
            expect((0, browser_util_1.sortedClassList)(form)).toEqual(['ng-pristine', 'ng-untouched', 'ng-valid']);
            expect((0, browser_util_1.sortedClassList)(input)).not.toContain('ng-submitted');
        }));
        it('should not create a template-driven form when ngNoForm is used', () => {
            const fixture = initTest(NgNoFormComp);
            fixture.detectChanges();
            expect(fixture.debugElement.children[0].providerTokens.length).toEqual(0);
        });
        it('should not add novalidate when ngNoForm is used', () => {
            const fixture = initTest(NgNoFormComp);
            fixture.detectChanges();
            const form = fixture.debugElement.query(by_1.By.css('form'));
            expect(form.nativeElement.hasAttribute('novalidate')).toEqual(false);
        });
        it('should keep track of the ngModel value when together used with an ngFor inside a form', (0, testing_1.fakeAsync)(() => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <form>
                <div *ngFor="let item of items; index as i">
                  <input [(ngModel)]="item.value" name="name-{{i}}">
                </div>
              </form>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this._counter = 0;
                        this.items = [];
                    }
                    add(amount) {
                        for (let i = 0; i < amount; i++) {
                            this.items.push({ value: `${this._counter++}` });
                        }
                    }
                    remove(index) {
                        this.items.splice(index, 1);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const getValues = () => fixture.debugElement.queryAll(by_1.By.css('input')).map((el) => el.nativeElement.value);
            const fixture = initTest(App);
            fixture.componentInstance.add(3);
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '1', '2']);
            fixture.componentInstance.remove(1);
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '2']);
            fixture.componentInstance.add(1);
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '2', '3']);
            fixture.componentInstance.items[1].value = '1';
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '1', '3']);
            fixture.componentInstance.items[2].value = '2';
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '1', '2']);
        }));
        it('should keep track of the ngModel value when together used with an ngFor inside an ngModelGroup', (0, testing_1.fakeAsync)(() => {
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <form>
                <ng-container ngModelGroup="group">
                  <div *ngFor="let item of items; index as i">
                    <input [(ngModel)]="item.value" name="name-{{i}}">
                  </div>
                </ng-container>
              </form>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this._counter = 0;
                        this.group = {};
                        this.items = [];
                    }
                    add(amount) {
                        for (let i = 0; i < amount; i++) {
                            this.items.push({ value: `${this._counter++}` });
                        }
                    }
                    remove(index) {
                        this.items.splice(index, 1);
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            const getValues = () => fixture.debugElement.queryAll(by_1.By.css('input')).map((el) => el.nativeElement.value);
            const fixture = initTest(App);
            fixture.componentInstance.add(3);
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '1', '2']);
            fixture.componentInstance.remove(1);
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '2']);
            fixture.componentInstance.add(1);
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '2', '3']);
            fixture.componentInstance.items[1].value = '1';
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '1', '3']);
            fixture.componentInstance.items[2].value = '2';
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(getValues()).toEqual(['0', '1', '2']);
        }));
    });
    describe('name and ngModelOptions', () => {
        it('should throw if ngModel has a parent form but no name attr or standalone label', () => {
            const fixture = initTest(InvalidNgModelNoName);
            expect(() => fixture.detectChanges()).toThrowError(new RegExp(`name attribute must be set`));
        });
        it('should not throw if ngModel has a parent form, no name attr, and a standalone label', () => {
            const fixture = initTest(NgModelOptionsStandalone);
            expect(() => fixture.detectChanges()).not.toThrow();
        });
        it('should not register standalone ngModels with parent form', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelOptionsStandalone);
            fixture.componentInstance.one = 'some data';
            fixture.componentInstance.two = 'should not show';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            const inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
            (0, testing_1.tick)();
            expect(form.value).toEqual({ one: 'some data' });
            expect(inputs[1].nativeElement.value).toEqual('should not show');
        }));
        it('should override name attribute with ngModelOptions name if provided', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            fixture.componentInstance.options = { name: 'override' };
            fixture.componentInstance.name = 'some data';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.value).toEqual({ override: 'some data' });
        }));
    });
    describe('updateOn', () => {
        describe('blur', () => {
            it('should default updateOn to change', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = '';
                fixture.componentInstance.options = {};
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                const name = form.control.get('name');
                expect(name._updateOn).toBeUndefined();
                expect(name.updateOn).toEqual('change');
            }));
            it('should set control updateOn to blur properly', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = '';
                fixture.componentInstance.options = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                const name = form.control.get('name');
                expect(name._updateOn).toEqual('blur');
                expect(name.updateOn).toEqual('blur');
            }));
            it('should always set value and validity on init', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = 'Nancy Drew';
                fixture.componentInstance.options = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(input.value)
                    .withContext('Expected initial view value to be set.')
                    .toEqual('Nancy Drew');
                expect(form.value).withContext('Expected initial control value be set.').toEqual({
                    name: 'Nancy Drew',
                });
                expect(form.valid).withContext('Expected validation to run on initial value.').toBe(true);
            }));
            it('should always set value programmatically right away', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = 'Nancy Drew';
                fixture.componentInstance.options = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                fixture.componentInstance.name = 'Carson';
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(input.value)
                    .withContext('Expected view value to update on programmatic change.')
                    .toEqual('Carson');
                expect(form.value).toEqual({ name: 'Carson' }, 'Expected form value to update on programmatic change.');
                expect(form.valid)
                    .withContext('Expected validation to run immediately on programmatic change.')
                    .toBe(false);
            }));
            it('should update value/validity on blur', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = 'Carson';
                fixture.componentInstance.options = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(fixture.componentInstance.name)
                    .withContext('Expected value not to update on input.')
                    .toEqual('Carson');
                expect(form.valid).withContext('Expected validation not to run on input.').toBe(false);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(fixture.componentInstance.name)
                    .withContext('Expected value to update on blur.')
                    .toEqual('Nancy Drew');
                expect(form.valid).withContext('Expected validation to run on blur.').toBe(true);
            }));
            it('should wait for second blur to update value/validity again', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = 'Carson';
                fixture.componentInstance.options = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                input.value = 'Carson';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(fixture.componentInstance.name)
                    .withContext('Expected value not to update until another blur.')
                    .toEqual('Nancy Drew');
                expect(form.valid)
                    .withContext('Expected validation not to run until another blur.')
                    .toBe(true);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(fixture.componentInstance.name)
                    .withContext('Expected value to update on second blur.')
                    .toEqual('Carson');
                expect(form.valid).withContext('Expected validation to run on second blur.').toBe(false);
            }));
            it('should not update dirtiness until blur', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = '';
                fixture.componentInstance.options = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(form.dirty).withContext('Expected dirtiness not to update on input.').toBe(false);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(form.dirty).withContext('Expected dirtiness to update on blur.').toBe(true);
            }));
            it('should not update touched until blur', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = '';
                fixture.componentInstance.options = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(form.touched).withContext('Expected touched not to update on input.').toBe(false);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(form.touched).withContext('Expected touched to update on blur.').toBe(true);
            }));
            it('should not emit valueChanges or statusChanges until blur', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = '';
                fixture.componentInstance.options = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const values = [];
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                const sub = (0, rxjs_1.merge)(form.valueChanges, form.statusChanges).subscribe((val) => values.push(val));
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(values)
                    .withContext('Expected no valueChanges or statusChanges on input.')
                    .toEqual([]);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(values).toEqual([{ name: 'Nancy Drew' }, 'VALID'], 'Expected valueChanges and statusChanges on blur.');
                sub.unsubscribe();
            }));
            it('should not fire ngModelChange event on blur unless value has changed', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelChangesForm);
                fixture.componentInstance.name = 'Carson';
                fixture.componentInstance.options = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(fixture.componentInstance.events)
                    .withContext('Expected ngModelChanges not to fire.')
                    .toEqual([]);
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(fixture.componentInstance.events)
                    .withContext('Expected ngModelChanges not to fire if value unchanged.')
                    .toEqual([]);
                input.value = 'Carson';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(fixture.componentInstance.events)
                    .withContext('Expected ngModelChanges not to fire on input.')
                    .toEqual([]);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(fixture.componentInstance.events)
                    .withContext('Expected ngModelChanges to fire once blurred if value changed.')
                    .toEqual(['fired']);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(fixture.componentInstance.events).toEqual(['fired'], 'Expected ngModelChanges not to fire again on blur unless value changed.');
                input.value = 'Bess';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(fixture.componentInstance.events)
                    .withContext('Expected ngModelChanges not to fire on input after blur.')
                    .toEqual(['fired']);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(fixture.componentInstance.events).toEqual(['fired', 'fired'], 'Expected ngModelChanges to fire again on blur if value changed.');
            }));
        });
        describe('submit', () => {
            it('should set control updateOn to submit properly', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = '';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                const name = form.control.get('name');
                expect(name._updateOn).toEqual('submit');
                expect(name.updateOn).toEqual('submit');
            }));
            it('should always set value and validity on init', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = 'Nancy Drew';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(input.value)
                    .withContext('Expected initial view value to be set.')
                    .toEqual('Nancy Drew');
                expect(form.value)
                    .withContext('Expected initial control value be set.')
                    .toEqual({ name: 'Nancy Drew' });
                expect(form.valid).withContext('Expected validation to run on initial value.').toBe(true);
            }));
            it('should always set value programmatically right away', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = 'Nancy Drew';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                fixture.componentInstance.name = 'Carson';
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(input.value)
                    .withContext('Expected view value to update on programmatic change.')
                    .toEqual('Carson');
                expect(form.value)
                    .withContext('Expected form value to update on programmatic change.')
                    .toEqual({ name: 'Carson' });
                expect(form.valid)
                    .withContext('Expected validation to run immediately on programmatic change.')
                    .toBe(false);
            }));
            it('should update on submit', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = 'Carson';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(fixture.componentInstance.name)
                    .withContext('Expected value not to update on input.')
                    .toEqual('Carson');
                expect(form.valid).withContext('Expected validation not to run on input.').toBe(false);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(fixture.componentInstance.name)
                    .withContext('Expected value not to update on blur.')
                    .toEqual('Carson');
                expect(form.valid).withContext('Expected validation not to run on blur.').toBe(false);
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(fixture.componentInstance.name)
                    .withContext('Expected value to update on submit.')
                    .toEqual('Nancy Drew');
                expect(form.valid).withContext('Expected validation to run on submit.').toBe(true);
            }));
            it('should wait until second submit to update again', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = 'Carson';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                (0, testing_1.tick)();
                input.value = 'Carson';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(fixture.componentInstance.name)
                    .withContext('Expected value not to update until second submit.')
                    .toEqual('Nancy Drew');
                expect(form.valid)
                    .withContext('Expected validation not to run until second submit.')
                    .toBe(true);
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(fixture.componentInstance.name)
                    .withContext('Expected value to update on second submit.')
                    .toEqual('Carson');
                expect(form.valid).withContext('Expected validation to run on second submit.').toBe(false);
            }));
            it('should not run validation for onChange controls on submit', (0, testing_1.fakeAsync)(() => {
                const validatorSpy = jasmine.createSpy('validator');
                const groupValidatorSpy = jasmine.createSpy('groupValidatorSpy');
                const fixture = initTest(NgModelGroupForm);
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                form.control.get('name').setValidators(groupValidatorSpy);
                form.control.get('name.last').setValidators(validatorSpy);
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(validatorSpy).not.toHaveBeenCalled();
                expect(groupValidatorSpy).not.toHaveBeenCalled();
            }));
            it('should not update dirtiness until submit', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = '';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(form.dirty).withContext('Expected dirtiness not to update on input.').toBe(false);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(form.dirty).withContext('Expected dirtiness not to update on blur.').toBe(false);
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(form.dirty).withContext('Expected dirtiness to update on submit.').toBe(true);
            }));
            it('should not update touched until submit', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = '';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(form.touched).withContext('Expected touched not to update on blur.').toBe(false);
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(form.touched).withContext('Expected touched to update on submit.').toBe(true);
            }));
            it('should reset properly', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = 'Nancy';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                form.resetForm();
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(input.value).withContext('Expected view value to reset.').toEqual('');
                expect(form.value).withContext('Expected form value to reset.').toEqual({ name: null });
                expect(fixture.componentInstance.name)
                    .withContext('Expected ngModel value to reset.')
                    .toEqual(null);
                expect(form.dirty).withContext('Expected dirty to stay false on reset.').toBe(false);
                expect(form.touched).withContext('Expected touched to stay false on reset.').toBe(false);
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(form.value).withContext('Expected form value to stay empty on submit').toEqual({
                    name: null,
                });
                expect(fixture.componentInstance.name)
                    .withContext('Expected ngModel value to stay empty on submit.')
                    .toEqual(null);
                expect(form.dirty).withContext('Expected dirty to stay false on submit.').toBe(false);
                expect(form.touched).withContext('Expected touched to stay false on submit.').toBe(false);
            }));
            it('should not emit valueChanges or statusChanges until submit', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelForm);
                fixture.componentInstance.name = '';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const values = [];
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                const sub = (0, rxjs_1.merge)(form.valueChanges, form.statusChanges).subscribe((val) => values.push(val));
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(values)
                    .withContext('Expected no valueChanges or statusChanges on input.')
                    .toEqual([]);
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(values)
                    .withContext('Expected no valueChanges or statusChanges on blur.')
                    .toEqual([]);
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(values).toEqual([{ name: 'Nancy Drew' }, 'VALID'], 'Expected valueChanges and statusChanges on submit.');
                sub.unsubscribe();
            }));
            it('should not fire ngModelChange event on submit unless value has changed', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelChangesForm);
                fixture.componentInstance.name = 'Carson';
                fixture.componentInstance.options = { updateOn: 'submit' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(fixture.componentInstance.events)
                    .withContext('Expected ngModelChanges not to fire if value unchanged.')
                    .toEqual([]);
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Carson';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(fixture.componentInstance.events)
                    .withContext('Expected ngModelChanges not to fire on input.')
                    .toEqual([]);
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(fixture.componentInstance.events)
                    .withContext('Expected ngModelChanges to fire once submitted if value changed.')
                    .toEqual(['fired']);
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(fixture.componentInstance.events).toEqual(['fired'], 'Expected ngModelChanges not to fire again on submit unless value changed.');
                input.value = 'Bess';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(fixture.componentInstance.events)
                    .withContext('Expected ngModelChanges not to fire on input after submit.')
                    .toEqual(['fired']);
                (0, browser_util_1.dispatchEvent)(formEl, 'submit');
                fixture.detectChanges();
                expect(fixture.componentInstance.events).toEqual(['fired', 'fired'], 'Expected ngModelChanges to fire again on submit if value changed.');
            }));
            it('should not prevent the default action on forms with method="dialog"', (0, testing_1.fakeAsync)(() => {
                if (typeof HTMLDialogElement === 'undefined') {
                    return;
                }
                const fixture = initTest(NativeDialogForm);
                fixture.detectChanges();
                (0, testing_1.tick)();
                const event = (0, browser_util_1.dispatchEvent)(fixture.componentInstance.form.nativeElement, 'submit');
                fixture.detectChanges();
                expect(event.defaultPrevented).toBe(false);
            }));
        });
        describe('ngFormOptions', () => {
            it('should use ngFormOptions value when ngModelOptions are not set', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelOptionsStandalone);
                fixture.componentInstance.options = { name: 'two' };
                fixture.componentInstance.formOptions = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                const controlOne = form.control.get('one');
                expect(controlOne._updateOn).toBeUndefined();
                expect(controlOne.updateOn)
                    .withContext('Expected first control to inherit updateOn from parent form.')
                    .toEqual('blur');
                const controlTwo = form.control.get('two');
                expect(controlTwo._updateOn).toBeUndefined();
                expect(controlTwo.updateOn)
                    .withContext('Expected last control to inherit updateOn from parent form.')
                    .toEqual('blur');
            }));
            it('should actually update using ngFormOptions value', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelOptionsStandalone);
                fixture.componentInstance.one = '';
                fixture.componentInstance.formOptions = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(form.value).withContext('Expected value not to update on input.').toEqual({
                    one: '',
                });
                (0, browser_util_1.dispatchEvent)(input, 'blur');
                fixture.detectChanges();
                expect(form.value).withContext('Expected value to update on blur.').toEqual({
                    one: 'Nancy Drew',
                });
            }));
            it('should allow ngModelOptions updateOn to override ngFormOptions', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelOptionsStandalone);
                fixture.componentInstance.options = { updateOn: 'blur', name: 'two' };
                fixture.componentInstance.formOptions = { updateOn: 'change' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                const controlOne = form.control.get('one');
                expect(controlOne._updateOn).toBeUndefined();
                expect(controlOne.updateOn)
                    .withContext('Expected control updateOn to inherit form updateOn.')
                    .toEqual('change');
                const controlTwo = form.control.get('two');
                expect(controlTwo._updateOn)
                    .withContext('Expected control to set blur override.')
                    .toEqual('blur');
                expect(controlTwo.updateOn)
                    .withContext('Expected control updateOn to override form updateOn.')
                    .toEqual('blur');
            }));
            it('should update using ngModelOptions override', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelOptionsStandalone);
                fixture.componentInstance.one = '';
                fixture.componentInstance.two = '';
                fixture.componentInstance.options = { updateOn: 'blur', name: 'two' };
                fixture.componentInstance.formOptions = { updateOn: 'change' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const [inputOne, inputTwo] = fixture.debugElement.queryAll(by_1.By.css('input'));
                inputOne.nativeElement.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(inputOne.nativeElement, 'input');
                fixture.detectChanges();
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                expect(form.value).withContext('Expected first value to update on input.').toEqual({
                    one: 'Nancy Drew',
                    two: '',
                });
                inputTwo.nativeElement.value = 'Carson Drew';
                (0, browser_util_1.dispatchEvent)(inputTwo.nativeElement, 'input');
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(form.value).withContext('Expected second value not to update on input.').toEqual({
                    one: 'Nancy Drew',
                    two: '',
                });
                (0, browser_util_1.dispatchEvent)(inputTwo.nativeElement, 'blur');
                fixture.detectChanges();
                expect(form.value).toEqual({ one: 'Nancy Drew', two: 'Carson Drew' }, 'Expected second value to update on blur.');
            }));
            it('should not use ngFormOptions for standalone ngModels', (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelOptionsStandalone);
                fixture.componentInstance.two = '';
                fixture.componentInstance.options = { standalone: true };
                fixture.componentInstance.formOptions = { updateOn: 'blur' };
                fixture.detectChanges();
                (0, testing_1.tick)();
                const inputTwo = fixture.debugElement.queryAll(by_1.By.css('input'))[1].nativeElement;
                inputTwo.value = 'Nancy Drew';
                (0, browser_util_1.dispatchEvent)(inputTwo, 'input');
                fixture.detectChanges();
                expect(fixture.componentInstance.two)
                    .withContext('Expected standalone ngModel not to inherit blur update.')
                    .toEqual('Nancy Drew');
            }));
        });
    });
    describe('submit and reset events', () => {
        it('should emit ngSubmit event with the original submit event on submit', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            fixture.componentInstance.event = null;
            const form = fixture.debugElement.query(by_1.By.css('form'));
            (0, browser_util_1.dispatchEvent)(form.nativeElement, 'submit');
            (0, testing_1.tick)();
            expect(fixture.componentInstance.event.type).toEqual('submit');
        }));
        it('should mark NgForm as submitted on submit event', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.submitted).toBe(false);
            const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
            (0, browser_util_1.dispatchEvent)(formEl, 'submit');
            (0, testing_1.tick)();
            expect(form.submitted).toBe(true);
        }));
        it('should reset the form to empty when reset event is fired', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            fixture.componentInstance.name = 'should be cleared';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            const formEl = fixture.debugElement.query(by_1.By.css('form'));
            const input = fixture.debugElement.query(by_1.By.css('input'));
            expect(input.nativeElement.value).toBe('should be cleared'); // view value
            expect(fixture.componentInstance.name).toBe('should be cleared'); // ngModel value
            expect(form.value.name).toEqual('should be cleared'); // control value
            (0, browser_util_1.dispatchEvent)(formEl.nativeElement, 'reset');
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.nativeElement.value).toBe(''); // view value
            expect(fixture.componentInstance.name).toBe(null); // ngModel value
            expect(form.value.name).toEqual(null); // control value
        }));
        it('should reset the form submit state when reset button is clicked', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            const formEl = fixture.debugElement.query(by_1.By.css('form'));
            (0, browser_util_1.dispatchEvent)(formEl.nativeElement, 'submit');
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(form.submitted).toBe(true);
            (0, browser_util_1.dispatchEvent)(formEl.nativeElement, 'reset');
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(form.submitted).toBe(false);
        }));
    });
    describe('valueChange and statusChange events', () => {
        it('should emit valueChanges and statusChanges on init', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            fixture.componentInstance.name = 'aa';
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.value).toEqual({});
            let formValidity = undefined;
            let formValue = undefined;
            form.statusChanges.subscribe((status) => (formValidity = status));
            form.valueChanges.subscribe((value) => (formValue = value));
            (0, testing_1.tick)();
            expect(formValidity).toEqual('INVALID');
            expect(formValue).toEqual({ name: 'aa' });
        }));
        it('should mark controls dirty before emitting the value change event', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm).form;
            fixture.detectChanges();
            (0, testing_1.tick)();
            form.get('name').valueChanges.subscribe(() => {
                expect(form.get('name').dirty).toBe(true);
            });
            const inputEl = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            inputEl.value = 'newValue';
            (0, browser_util_1.dispatchEvent)(inputEl, 'input');
        }));
        it('should mark controls pristine before emitting the value change event when resetting ', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelForm);
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm).form;
            const formEl = fixture.debugElement.query(by_1.By.css('form')).nativeElement;
            const inputEl = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            inputEl.value = 'newValue';
            (0, browser_util_1.dispatchEvent)(inputEl, 'input');
            expect(form.get('name').pristine).toBe(false);
            form.get('name').valueChanges.subscribe(() => {
                expect(form.get('name').pristine).toBe(true);
            });
            (0, browser_util_1.dispatchEvent)(formEl, 'reset');
        }));
    });
    describe('disabled controls', () => {
        it('should not consider disabled controls in value or validation', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelGroupForm);
            fixture.componentInstance.isDisabled = false;
            fixture.componentInstance.first = '';
            fixture.componentInstance.last = 'Drew';
            fixture.componentInstance.email = 'some email';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.value).toEqual({ name: { first: '', last: 'Drew' }, email: 'some email' });
            expect(form.valid).toBe(false);
            expect(form.control.get('name.first').disabled).toBe(false);
            fixture.componentInstance.isDisabled = true;
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(form.value).toEqual({ name: { last: 'Drew' }, email: 'some email' });
            expect(form.valid).toBe(true);
            expect(form.control.get('name.first').disabled).toBe(true);
        }));
        it('should add disabled attribute in the UI if disable() is called programmatically', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelGroupForm);
            fixture.componentInstance.isDisabled = false;
            fixture.componentInstance.first = 'Nancy';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            form.control.get('name.first').disable();
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css(`[name="first"]`));
            expect(input.nativeElement.disabled).toBe(true);
        }));
        it('should disable a custom control if disabled attr is added', (0, testing_1.waitForAsync)(() => {
            const fixture = initTest(value_accessor_integration_spec_1.NgModelCustomWrapper, value_accessor_integration_spec_1.NgModelCustomComp);
            fixture.componentInstance.name = 'Nancy';
            fixture.componentInstance.isDisabled = true;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                    expect(form.control.get('name').disabled).toBe(true);
                    const customInput = fixture.debugElement.query(by_1.By.css('[name="custom"]'));
                    expect(customInput.nativeElement.disabled).toEqual(true);
                });
            });
        }));
        it('should disable a control with unbound disabled attr', (0, testing_1.fakeAsync)(() => {
            testing_1.TestBed.overrideComponent(NgModelForm, {
                set: {
                    template: `
            <form>
             <input name="name" [(ngModel)]="name" disabled>
            </form>
          `,
                },
            });
            const fixture = initTest(NgModelForm);
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.control.get('name').disabled).toBe(true);
            const input = fixture.debugElement.query(by_1.By.css('input'));
            expect(input.nativeElement.disabled).toEqual(true);
            form.control.enable();
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.nativeElement.disabled).toEqual(false);
        }));
    });
    describe('validation directives', () => {
        it('required validator should validate checkbox', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelCheckboxRequiredValidator);
            fixture.detectChanges();
            (0, testing_1.tick)();
            const control = fixture.debugElement.children[0].injector
                .get(index_1.NgForm)
                .control.get('checkbox');
            const input = fixture.debugElement.query(by_1.By.css('input'));
            expect(input.nativeElement.checked).toBe(false);
            expect(control.hasError('required')).toBe(false);
            fixture.componentInstance.required = true;
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.nativeElement.checked).toBe(false);
            expect(control.hasError('required')).toBe(true);
            input.nativeElement.checked = true;
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'change');
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.nativeElement.checked).toBe(true);
            expect(control.hasError('required')).toBe(false);
            input.nativeElement.checked = false;
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'change');
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.nativeElement.checked).toBe(false);
            expect(control.hasError('required')).toBe(true);
            fixture.componentInstance.required = false;
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'change');
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.nativeElement.checked).toBe(false);
            expect(control.hasError('required')).toBe(false);
        }));
        it('should validate email', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelEmailValidator);
            fixture.detectChanges();
            (0, testing_1.tick)();
            const control = fixture.debugElement.children[0].injector.get(index_1.NgForm).control.get('email');
            const input = fixture.debugElement.query(by_1.By.css('input'));
            expect(control.hasError('email')).toBe(false);
            fixture.componentInstance.validatorEnabled = true;
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.nativeElement.value).toEqual('');
            expect(control.hasError('email')).toBe(false);
            input.nativeElement.value = '@';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            (0, testing_1.tick)();
            expect(input.nativeElement.value).toEqual('@');
            expect(control.hasError('email')).toBe(true);
            input.nativeElement.value = 'test@gmail.com';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.nativeElement.value).toEqual('test@gmail.com');
            expect(control.hasError('email')).toBe(false);
            input.nativeElement.value = 'text';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.nativeElement.value).toEqual('text');
            expect(control.hasError('email')).toBe(true);
        }));
        it('should support dir validators using bindings', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelValidationBindings);
            fixture.componentInstance.required = true;
            fixture.componentInstance.minLen = 3;
            fixture.componentInstance.maxLen = 3;
            fixture.componentInstance.pattern = '.{3,}';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const required = fixture.debugElement.query(by_1.By.css('[name=required]'));
            const minLength = fixture.debugElement.query(by_1.By.css('[name=minlength]'));
            const maxLength = fixture.debugElement.query(by_1.By.css('[name=maxlength]'));
            const pattern = fixture.debugElement.query(by_1.By.css('[name=pattern]'));
            required.nativeElement.value = '';
            minLength.nativeElement.value = '1';
            maxLength.nativeElement.value = '1234';
            pattern.nativeElement.value = '12';
            (0, browser_util_1.dispatchEvent)(required.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(minLength.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(maxLength.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(pattern.nativeElement, 'input');
            fixture.detectChanges();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.control.hasError('required', ['required'])).toEqual(true);
            expect(form.control.hasError('minlength', ['minlength'])).toEqual(true);
            expect(form.control.hasError('maxlength', ['maxlength'])).toEqual(true);
            expect(form.control.hasError('pattern', ['pattern'])).toEqual(true);
            required.nativeElement.value = '1';
            minLength.nativeElement.value = '123';
            maxLength.nativeElement.value = '123';
            pattern.nativeElement.value = '123';
            (0, browser_util_1.dispatchEvent)(required.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(minLength.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(maxLength.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(pattern.nativeElement, 'input');
            expect(form.valid).toEqual(true);
        }));
        it('should support optional fields with string pattern validator', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMultipleValidators);
            fixture.componentInstance.required = false;
            fixture.componentInstance.pattern = '[a-z]+';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            const input = fixture.debugElement.query(by_1.By.css('input'));
            input.nativeElement.value = '';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeTruthy();
            input.nativeElement.value = '1';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeFalsy();
            expect(form.control.hasError('pattern', ['tovalidate'])).toBeTruthy();
        }));
        it('should support optional fields with RegExp pattern validator', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMultipleValidators);
            fixture.componentInstance.required = false;
            fixture.componentInstance.pattern = /^[a-z]+$/;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            const input = fixture.debugElement.query(by_1.By.css('input'));
            input.nativeElement.value = '';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeTruthy();
            input.nativeElement.value = '1';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeFalsy();
            expect(form.control.hasError('pattern', ['tovalidate'])).toBeTruthy();
        }));
        it('should support optional fields with minlength validator', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMultipleValidators);
            fixture.componentInstance.required = false;
            fixture.componentInstance.minLen = 2;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            const input = fixture.debugElement.query(by_1.By.css('input'));
            input.nativeElement.value = '';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeTruthy();
            input.nativeElement.value = '1';
            (0, browser_util_1.dispatchEvent)(input.nativeElement, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeFalsy();
            expect(form.control.hasError('minlength', ['tovalidate'])).toBeTruthy();
        }));
        it('changes on bound properties should change the validation state of the form', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelValidationBindings);
            fixture.detectChanges();
            (0, testing_1.tick)();
            const required = fixture.debugElement.query(by_1.By.css('[name=required]'));
            const minLength = fixture.debugElement.query(by_1.By.css('[name=minlength]'));
            const maxLength = fixture.debugElement.query(by_1.By.css('[name=maxlength]'));
            const pattern = fixture.debugElement.query(by_1.By.css('[name=pattern]'));
            required.nativeElement.value = '';
            minLength.nativeElement.value = '1';
            maxLength.nativeElement.value = '1234';
            pattern.nativeElement.value = '12';
            (0, browser_util_1.dispatchEvent)(required.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(minLength.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(maxLength.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(pattern.nativeElement, 'input');
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            expect(form.control.hasError('required', ['required'])).toEqual(false);
            expect(form.control.hasError('minlength', ['minlength'])).toEqual(false);
            expect(form.control.hasError('maxlength', ['maxlength'])).toEqual(false);
            expect(form.control.hasError('pattern', ['pattern'])).toEqual(false);
            expect(form.valid).toEqual(true);
            fixture.componentInstance.required = true;
            fixture.componentInstance.minLen = 3;
            fixture.componentInstance.maxLen = 3;
            fixture.componentInstance.pattern = '.{3,}';
            fixture.detectChanges();
            (0, browser_util_1.dispatchEvent)(required.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(minLength.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(maxLength.nativeElement, 'input');
            (0, browser_util_1.dispatchEvent)(pattern.nativeElement, 'input');
            expect(form.control.hasError('required', ['required'])).toEqual(true);
            expect(form.control.hasError('minlength', ['minlength'])).toEqual(true);
            expect(form.control.hasError('maxlength', ['maxlength'])).toEqual(true);
            expect(form.control.hasError('pattern', ['pattern'])).toEqual(true);
            expect(form.valid).toEqual(false);
            expect(required.nativeElement.getAttribute('required')).toEqual('');
            expect(fixture.componentInstance.minLen.toString()).toEqual(minLength.nativeElement.getAttribute('minlength'));
            expect(fixture.componentInstance.maxLen.toString()).toEqual(maxLength.nativeElement.getAttribute('maxlength'));
            expect(fixture.componentInstance.pattern.toString()).toEqual(pattern.nativeElement.getAttribute('pattern'));
            fixture.componentInstance.required = false;
            fixture.componentInstance.minLen = null;
            fixture.componentInstance.maxLen = null;
            fixture.componentInstance.pattern = null;
            fixture.detectChanges();
            expect(form.control.hasError('required', ['required'])).toEqual(false);
            expect(form.control.hasError('minlength', ['minlength'])).toEqual(false);
            expect(form.control.hasError('maxlength', ['maxlength'])).toEqual(false);
            expect(form.control.hasError('pattern', ['pattern'])).toEqual(false);
            expect(form.valid).toEqual(true);
            expect(required.nativeElement.getAttribute('required')).toEqual(null);
            expect(required.nativeElement.getAttribute('minlength')).toEqual(null);
            expect(required.nativeElement.getAttribute('maxlength')).toEqual(null);
            expect(required.nativeElement.getAttribute('pattern')).toEqual(null);
        }));
        it('should update control status', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelChangeState);
            const inputEl = fixture.debugElement.query(by_1.By.css('input'));
            const inputNativeEl = inputEl.nativeElement;
            const onNgModelChange = jasmine.createSpy('onNgModelChange');
            fixture.componentInstance.onNgModelChange = onNgModelChange;
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(onNgModelChange).not.toHaveBeenCalled();
            inputNativeEl.value = 'updated';
            onNgModelChange.and.callFake((ngModel) => {
                expect(ngModel.invalid).toBe(true);
                expect(ngModel.value).toBe('updated');
            });
            (0, browser_util_1.dispatchEvent)(inputNativeEl, 'input');
            expect(onNgModelChange).toHaveBeenCalled();
            (0, testing_1.tick)();
            inputNativeEl.value = '333';
            onNgModelChange.and.callFake((ngModel) => {
                expect(ngModel.invalid).toBe(false);
                expect(ngModel.value).toBe('333');
            });
            (0, browser_util_1.dispatchEvent)(inputNativeEl, 'input');
            expect(onNgModelChange).toHaveBeenCalledTimes(2);
            (0, testing_1.tick)();
        }));
        it('should validate max', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMaxValidator);
            fixture.componentInstance.max = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = '';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(input.getAttribute('max')).toEqual('10');
            expect(form.valid).toEqual(true);
            expect(form.controls['max'].errors).toBeNull();
            input.value = 11;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['max'].errors).toEqual({ max: { max: 10, actual: 11 } });
            input.value = 9;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['max'].errors).toBeNull();
            fixture.componentInstance.max = 0;
            fixture.detectChanges();
            (0, testing_1.tick)();
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(input.getAttribute('max')).toEqual('0');
            expect(form.valid).toEqual(false);
            expect(form.controls['max'].errors).toEqual({ max: { max: 0, actual: 9 } });
            input.value = 0;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['max'].errors).toBeNull();
        }));
        it('should validate max for float number', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMaxValidator);
            fixture.componentInstance.max = 10.25;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = '';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(input.getAttribute('max')).toEqual('10.25');
            expect(form.valid).toEqual(true);
            expect(form.controls['max'].errors).toBeNull();
            input.value = 10.25;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['max'].errors).toBeNull();
            input.value = 10.15;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['max'].errors).toBeNull();
            input.value = 10.35;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['max'].errors).toEqual({ max: { max: 10.25, actual: 10.35 } });
        }));
        it('should apply max validation when control value is defined as a string', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMaxValidator);
            fixture.componentInstance.max = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = '11';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(input.getAttribute('max')).toEqual('10');
            expect(form.valid).toEqual(false);
            expect(form.controls['max'].errors).toEqual({ max: { max: 10, actual: 11 } });
            input.value = '9';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['max'].errors).toBeNull();
        }));
        it('should re-validate if max changes', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMaxValidator);
            fixture.componentInstance.max = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = 11;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['max'].errors).toEqual({ max: { max: 10, actual: 11 } });
            input.value = 9;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['max'].errors).toBeNull();
            fixture.componentInstance.max = 5;
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['max'].errors).toEqual({ max: { max: 5, actual: 9 } });
        }));
        it('should validate min', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMinValidator);
            fixture.componentInstance.min = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = '';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(input.getAttribute('min')).toEqual('10');
            expect(form.valid).toEqual(true);
            expect(form.controls['min'].errors).toBeNull();
            input.value = 11;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min'].errors).toBeNull();
            input.value = 9;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min'].errors).toEqual({ min: { min: 10, actual: 9 } });
            fixture.componentInstance.min = 0;
            fixture.detectChanges();
            (0, testing_1.tick)();
            input.value = -5;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(input.getAttribute('min')).toEqual('0');
            expect(form.valid).toEqual(false);
            expect(form.controls['min'].errors).toEqual({ min: { min: 0, actual: -5 } });
            input.value = 0;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min'].errors).toBeNull();
        }));
        it('should validate min for float number', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMinValidator);
            fixture.componentInstance.min = 10.25;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = '';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(input.getAttribute('min')).toEqual('10.25');
            expect(form.valid).toEqual(true);
            expect(form.controls['min'].errors).toBeNull();
            input.value = 10.35;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min'].errors).toBeNull();
            input.value = 10.25;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min'].errors).toBeNull();
            input.value = 10.15;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min'].errors).toEqual({ min: { min: 10.25, actual: 10.15 } });
        }));
        it('should apply min validation when control value is defined as a string', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMinValidator);
            fixture.componentInstance.min = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = '11';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(input.getAttribute('min')).toEqual('10');
            expect(form.valid).toEqual(true);
            expect(form.controls['min'].errors).toBeNull();
            input.value = '9';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min'].errors).toEqual({ min: { min: 10, actual: 9 } });
        }));
        it('should re-validate if min changes', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMinValidator);
            fixture.componentInstance.min = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = 11;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min'].errors).toBeNull();
            input.value = 9;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min'].errors).toEqual({ min: { min: 10, actual: 9 } });
            fixture.componentInstance.min = 9;
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min'].errors).toBeNull();
        }));
        it('should not include the min and max validators when using another directive with the same properties', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelNoMinMaxValidator);
            const validateFnSpy = spyOn(index_1.MaxValidator.prototype, 'validate');
            fixture.componentInstance.min = 10;
            fixture.componentInstance.max = 20;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const min = fixture.debugElement.query(by_1.By.directive(index_1.MinValidator));
            expect(min).toBeNull();
            const max = fixture.debugElement.query(by_1.By.directive(index_1.MaxValidator));
            expect(max).toBeNull();
            const cd = fixture.debugElement.query(by_1.By.directive(CustomDirective));
            expect(cd).toBeDefined();
            expect(validateFnSpy).not.toHaveBeenCalled();
        }));
        it('should not include the min and max validators when using a custom component with the same properties', (0, testing_1.fakeAsync)(() => {
            let MyCustomComponentDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: 'my-custom-component',
                        providers: [
                            {
                                provide: index_1.NG_VALUE_ACCESSOR,
                                multi: true,
                                useExisting: (0, core_1.forwardRef)(() => MyCustomComponentDirective),
                            },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _min_decorators;
                let _min_initializers = [];
                let _min_extraInitializers = [];
                let _max_decorators;
                let _max_initializers = [];
                let _max_extraInitializers = [];
                var MyCustomComponentDirective = _classThis = class {
                    writeValue(obj) { }
                    registerOnChange(fn) { }
                    registerOnTouched(fn) { }
                    constructor() {
                        this.min = __runInitializers(this, _min_initializers, void 0);
                        this.max = (__runInitializers(this, _min_extraInitializers), __runInitializers(this, _max_initializers, void 0));
                        __runInitializers(this, _max_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyCustomComponentDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _min_decorators = [(0, core_1.Input)()];
                    _max_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _min_decorators, { kind: "field", name: "min", static: false, private: false, access: { has: obj => "min" in obj, get: obj => obj.min, set: (obj, value) => { obj.min = value; } }, metadata: _metadata }, _min_initializers, _min_extraInitializers);
                    __esDecorate(null, null, _max_decorators, { kind: "field", name: "max", static: false, private: false, access: { has: obj => "max" in obj, get: obj => obj.max, set: (obj, value) => { obj.max = value; } }, metadata: _metadata }, _max_initializers, _max_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCustomComponentDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCustomComponentDirective = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              <!-- no min/max validators should be matched on these elements -->
              <my-custom-component name="min" ngModel [min]="min"></my-custom-component>
              <my-custom-component name="max" ngModel [max]="max"></my-custom-component>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = initTest(AppComponent, MyCustomComponentDirective);
            const validateFnSpy = spyOn(index_1.MaxValidator.prototype, 'validate');
            fixture.detectChanges();
            (0, testing_1.tick)();
            const mv = fixture.debugElement.query(by_1.By.directive(index_1.MaxValidator));
            expect(mv).toBeNull();
            const cd = fixture.debugElement.query(by_1.By.directive(CustomDirective));
            expect(cd).toBeDefined();
            expect(validateFnSpy).not.toHaveBeenCalled();
        }));
        it('should not include the min and max validators for inputs with type range', (0, testing_1.fakeAsync)(() => {
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<input type="range" min="10" max="20">',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            const fixture = initTest(AppComponent);
            const maxValidateFnSpy = spyOn(index_1.MaxValidator.prototype, 'validate');
            const minValidateFnSpy = spyOn(index_1.MinValidator.prototype, 'validate');
            fixture.detectChanges();
            (0, testing_1.tick)();
            const maxValidator = fixture.debugElement.query(by_1.By.directive(index_1.MaxValidator));
            expect(maxValidator).toBeNull();
            const minValidator = fixture.debugElement.query(by_1.By.directive(index_1.MinValidator));
            expect(minValidator).toBeNull();
            expect(maxValidateFnSpy).not.toHaveBeenCalled();
            expect(minValidateFnSpy).not.toHaveBeenCalled();
        }));
        describe('enabling validators conditionally', () => {
            it('should not include the minLength and maxLength validators for null', (0, testing_1.fakeAsync)(() => {
                let MinLengthMaxLengthComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<form><input name="amount" ngModel [minlength]="minlen" [maxlength]="maxlen"></form>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MinLengthMaxLengthComponent = _classThis = class {
                        constructor() {
                            this.minlen = null;
                            this.maxlen = null;
                        }
                    };
                    __setFunctionName(_classThis, "MinLengthMaxLengthComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MinLengthMaxLengthComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MinLengthMaxLengthComponent = _classThis;
                })();
                const fixture = initTest(MinLengthMaxLengthComponent);
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                const control = fixture.debugElement.children[0].injector
                    .get(index_1.NgForm)
                    .control.get('amount');
                const setInputValue = (value) => {
                    input.value = value;
                    (0, browser_util_1.dispatchEvent)(input, 'input');
                    fixture.detectChanges();
                };
                const verifyValidatorAttrValues = (values) => {
                    expect(input.getAttribute('minlength')).toBe(values.minlength);
                    expect(input.getAttribute('maxlength')).toBe(values.maxlength);
                };
                const setValidatorValues = (values) => {
                    fixture.componentInstance.minlen = values.minlength;
                    fixture.componentInstance.maxlen = values.maxlength;
                    fixture.detectChanges();
                };
                const verifyFormState = (state) => {
                    expect(form.valid).toBe(state.isValid);
                    if (state.failedValidator) {
                        expect(control.hasError('minlength')).toEqual(state.failedValidator === 'minlength');
                        expect(control.hasError('maxlength')).toEqual(state.failedValidator === 'maxlength');
                    }
                };
                ////////// Actual test scenarios start below //////////
                // 1. Verify that validators are disabled when input is `null`.
                verifyValidatorAttrValues({ minlength: null, maxlength: null });
                verifyValidatorAttrValues({ minlength: null, maxlength: null });
                // 2. Verify that setting validator inputs (to a value different from `null`) activate
                // validators.
                setInputValue(12345);
                setValidatorValues({ minlength: 2, maxlength: 4 });
                verifyValidatorAttrValues({ minlength: '2', maxlength: '4' });
                verifyFormState({ isValid: false, failedValidator: 'maxlength' });
                // 3. Changing value to the valid range should make the form valid.
                setInputValue(123);
                verifyFormState({ isValid: true });
                // 4. Changing value to trigger `minlength` validator.
                setInputValue(1);
                verifyFormState({ isValid: false, failedValidator: 'minlength' });
                // 5. Changing validator inputs to verify that attribute values are updated (and the
                // form is now valid).
                setInputValue(1);
                setValidatorValues({ minlength: 1, maxlength: 5 });
                verifyValidatorAttrValues({ minlength: '1', maxlength: '5' });
                verifyFormState({ isValid: true });
                // 6. Reset validator inputs back to `null` should deactivate validators.
                setInputValue(123);
                setValidatorValues({ minlength: null, maxlength: null });
                verifyValidatorAttrValues({ minlength: null, maxlength: null });
                verifyFormState({ isValid: true });
            }));
            it('should not include the min and max validators for null', (0, testing_1.fakeAsync)(() => {
                let MinLengthMaxLengthComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<form><input type="number" name="minmaxinput" ngModel [min]="minlen" [max]="maxlen"></form>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MinLengthMaxLengthComponent = _classThis = class {
                        constructor() {
                            this.minlen = null;
                            this.maxlen = null;
                        }
                    };
                    __setFunctionName(_classThis, "MinLengthMaxLengthComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MinLengthMaxLengthComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MinLengthMaxLengthComponent = _classThis;
                })();
                const fixture = initTest(MinLengthMaxLengthComponent);
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                const control = fixture.debugElement.children[0].injector
                    .get(index_1.NgForm)
                    .control.get('minmaxinput');
                const setInputValue = (value) => {
                    input.value = value;
                    (0, browser_util_1.dispatchEvent)(input, 'input');
                    fixture.detectChanges();
                };
                const verifyValidatorAttrValues = (values) => {
                    expect(input.getAttribute('min')).toBe(values.min);
                    expect(input.getAttribute('max')).toBe(values.max);
                };
                const setValidatorValues = (values) => {
                    fixture.componentInstance.minlen = values.min;
                    fixture.componentInstance.maxlen = values.max;
                    fixture.detectChanges();
                };
                const verifyFormState = (state) => {
                    expect(form.valid).toBe(state.isValid);
                    if (state.failedValidator) {
                        expect(control.hasError('min')).toEqual(state.failedValidator === 'min');
                        expect(control.hasError('max')).toEqual(state.failedValidator === 'max');
                    }
                };
                ////////// Actual test scenarios start below //////////
                // 1. Verify that validators are disabled when input is `null`.
                verifyValidatorAttrValues({ min: null, max: null });
                verifyValidatorAttrValues({ min: null, max: null });
                // 2. Verify that setting validator inputs (to a value different from `null`) activate
                // validators.
                setInputValue(12345);
                setValidatorValues({ min: 2, max: 4 });
                verifyValidatorAttrValues({ min: '2', max: '4' });
                verifyFormState({ isValid: false, failedValidator: 'max' });
                // 3. Changing value to the valid range should make the form valid.
                setInputValue(3);
                verifyFormState({ isValid: true });
                // 4. Changing value to trigger `minlength` validator.
                setInputValue(1);
                verifyFormState({ isValid: false, failedValidator: 'min' });
                // 5. Changing validator inputs to verify that attribute values are updated (and the
                // form is now valid).
                setInputValue(1);
                setValidatorValues({ min: 1, max: 5 });
                verifyValidatorAttrValues({ min: '1', max: '5' });
                verifyFormState({ isValid: true });
                // 6. Reset validator inputs back to `null` should deactivate validators.
                setInputValue(123);
                setValidatorValues({ min: null, max: null });
                verifyValidatorAttrValues({ min: null, max: null });
                verifyFormState({ isValid: true });
            }));
        });
        ['number', 'string'].forEach((inputType) => {
            it(`should validate min and max when constraints are represented using a ${inputType}`, (0, testing_1.fakeAsync)(() => {
                const fixture = initTest(NgModelMinMaxValidator);
                fixture.componentInstance.min = inputType === 'string' ? '5' : 5;
                fixture.componentInstance.max = inputType === 'string' ? '10' : 10;
                fixture.detectChanges();
                (0, testing_1.tick)();
                const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
                input.value = '';
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                expect(form.valid).toEqual(true);
                expect(form.controls['min_max'].errors).toBeNull();
                input.value = 11;
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                expect(form.valid).toEqual(false);
                expect(form.controls['min_max'].errors).toEqual({ max: { max: 10, actual: 11 } });
                input.value = 4;
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                expect(form.valid).toEqual(false);
                expect(form.controls['min_max'].errors).toEqual({ min: { min: 5, actual: 4 } });
                input.value = 9;
                (0, browser_util_1.dispatchEvent)(input, 'input');
                fixture.detectChanges();
                expect(form.valid).toEqual(true);
                expect(form.controls['min_max'].errors).toBeNull();
            }));
        });
        it('should validate min and max', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMinMaxValidator);
            fixture.componentInstance.min = 5;
            fixture.componentInstance.max = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = '';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min_max'].errors).toBeNull();
            input.value = 11;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min_max'].errors).toEqual({ max: { max: 10, actual: 11 } });
            input.value = 4;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min_max'].errors).toEqual({ min: { min: 5, actual: 4 } });
            input.value = 9;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min_max'].errors).toBeNull();
        }));
        it('should apply min and max validation when control value is defined as a string', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMinMaxValidator);
            fixture.componentInstance.min = 5;
            fixture.componentInstance.max = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = '';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min_max'].errors).toBeNull();
            input.value = '11';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min_max'].errors).toEqual({ max: { max: 10, actual: 11 } });
            input.value = '4';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min_max'].errors).toEqual({ min: { min: 5, actual: 4 } });
            input.value = '9';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min_max'].errors).toBeNull();
        }));
        it('should re-validate if min/max changes', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMinMaxValidator);
            fixture.componentInstance.min = 5;
            fixture.componentInstance.max = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = 10;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min_max'].errors).toBeNull();
            input.value = 12;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min_max'].errors).toEqual({ max: { max: 10, actual: 12 } });
            fixture.componentInstance.max = 12;
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min_max'].errors).toBeNull();
            input.value = 5;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min_max'].errors).toBeNull();
            input.value = 0;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(false);
            expect(form.controls['min_max'].errors).toEqual({ min: { min: 5, actual: 0 } });
            fixture.componentInstance.min = 0;
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min_max'].errors).toBeNull();
        }));
        it('should run min/max validation for empty values ', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMinMaxValidator);
            fixture.componentInstance.min = 5;
            fixture.componentInstance.max = 10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            const maxValidateFnSpy = spyOn(index_1.MaxValidator.prototype, 'validate');
            const minValidateFnSpy = spyOn(index_1.MinValidator.prototype, 'validate');
            input.value = '';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toEqual(true);
            expect(form.controls['min_max'].errors).toBeNull();
            expect(maxValidateFnSpy).toHaveBeenCalled();
            expect(minValidateFnSpy).toHaveBeenCalled();
        }));
        it('should run min/max validation for negative values', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelMinMaxValidator);
            fixture.componentInstance.min = -20;
            fixture.componentInstance.max = -10;
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            const form = fixture.debugElement.children[0].injector.get(index_1.NgForm);
            input.value = '-30';
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeFalse();
            expect(form.controls['min_max'].errors).toEqual({ min: { min: -20, actual: -30 } });
            input.value = -15;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeTruthy();
            expect(form.controls['min_max'].errors).toBeNull();
            input.value = -5;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeFalse();
            expect(form.controls['min_max'].errors).toEqual({ max: { max: -10, actual: -5 } });
            input.value = 0;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            expect(form.valid).toBeFalse();
            expect(form.controls['min_max'].errors).toEqual({ max: { max: -10, actual: 0 } });
        }));
        it('should call registerOnValidatorChange as a part of a formGroup setup', (0, testing_1.fakeAsync)(() => {
            let registerOnValidatorChangeFired = 0;
            let registerOnAsyncValidatorChangeFired = 0;
            let NoOpValidator = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[ng-noop-validator]',
                        providers: [
                            { provide: index_1.NG_VALIDATORS, useExisting: (0, core_1.forwardRef)(() => NoOpValidator), multi: true },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _validatorInput_decorators;
                let _validatorInput_initializers = [];
                let _validatorInput_extraInitializers = [];
                var NoOpValidator = _classThis = class {
                    validate(c) {
                        return null;
                    }
                    registerOnValidatorChange(fn) {
                        registerOnValidatorChangeFired++;
                    }
                    constructor() {
                        this.validatorInput = __runInitializers(this, _validatorInput_initializers, '');
                        __runInitializers(this, _validatorInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NoOpValidator");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _validatorInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _validatorInput_decorators, { kind: "field", name: "validatorInput", static: false, private: false, access: { has: obj => "validatorInput" in obj, get: obj => obj.validatorInput, set: (obj, value) => { obj.validatorInput = value; } }, metadata: _metadata }, _validatorInput_initializers, _validatorInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NoOpValidator = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NoOpValidator = _classThis;
            })();
            let NoOpAsyncValidator = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[ng-noop-async-validator]',
                        providers: [
                            {
                                provide: index_1.NG_ASYNC_VALIDATORS,
                                useExisting: (0, core_1.forwardRef)(() => NoOpAsyncValidator),
                                multi: true,
                            },
                        ],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _validatorInput_decorators;
                let _validatorInput_initializers = [];
                let _validatorInput_extraInitializers = [];
                var NoOpAsyncValidator = _classThis = class {
                    validate(c) {
                        return Promise.resolve(null);
                    }
                    registerOnValidatorChange(fn) {
                        registerOnAsyncValidatorChangeFired++;
                    }
                    constructor() {
                        this.validatorInput = __runInitializers(this, _validatorInput_initializers, '');
                        __runInitializers(this, _validatorInput_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NoOpAsyncValidator");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _validatorInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _validatorInput_decorators, { kind: "field", name: "validatorInput", static: false, private: false, access: { has: obj => "validatorInput" in obj, get: obj => obj.validatorInput, set: (obj, value) => { obj.validatorInput = value; } }, metadata: _metadata }, _validatorInput_initializers, _validatorInput_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NoOpAsyncValidator = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NoOpAsyncValidator = _classThis;
            })();
            let NgModelNoOpValidation = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'ng-model-noop-validation',
                        template: `
              <form>
                <div ngModelGroup="emptyGroup" ng-noop-validator ng-noop-async-validator [validatorInput]="validatorInput">
                  <input name="fgInput" ngModel>
                </div>
              </form>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NgModelNoOpValidation = _classThis = class {
                    constructor() {
                        this.validatorInput = 'foo';
                        this.emptyGroup = {};
                    }
                };
                __setFunctionName(_classThis, "NgModelNoOpValidation");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NgModelNoOpValidation = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NgModelNoOpValidation = _classThis;
            })();
            const fixture = initTest(NgModelNoOpValidation, NoOpValidator, NoOpAsyncValidator);
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(registerOnValidatorChangeFired).toBe(1);
            expect(registerOnAsyncValidatorChangeFired).toBe(1);
            fixture.componentInstance.validatorInput = 'bar';
            fixture.detectChanges();
            // Changing validator inputs should not cause `registerOnValidatorChange` to be invoked,
            // since it's invoked just once during the setup phase.
            expect(registerOnValidatorChangeFired).toBe(1);
            expect(registerOnAsyncValidatorChangeFired).toBe(1);
        }));
    });
    describe('IME events', () => {
        it('should determine IME event handling depending on platform by default', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(StandaloneNgModel);
            const inputEl = fixture.debugElement.query(by_1.By.css('input'));
            const inputNativeEl = inputEl.nativeElement;
            fixture.componentInstance.name = 'oldValue';
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(inputNativeEl.value).toEqual('oldValue');
            inputEl.triggerEventHandler('compositionstart');
            inputNativeEl.value = 'updatedValue';
            (0, browser_util_1.dispatchEvent)(inputNativeEl, 'input');
            (0, testing_1.tick)();
            const isAndroid = /android (\d+)/.test((0, common_1.ɵgetDOM)().getUserAgent().toLowerCase());
            if (isAndroid) {
                // On Android, values should update immediately
                expect(fixture.componentInstance.name).toEqual('updatedValue');
            }
            else {
                // On other platforms, values should wait until compositionend
                expect(fixture.componentInstance.name).toEqual('oldValue');
                inputEl.triggerEventHandler('compositionend', { target: { value: 'updatedValue' } });
                fixture.detectChanges();
                (0, testing_1.tick)();
                expect(fixture.componentInstance.name).toEqual('updatedValue');
            }
        }));
        it('should hold IME events until compositionend if composition mode', (0, testing_1.fakeAsync)(() => {
            testing_1.TestBed.overrideComponent(StandaloneNgModel, {
                set: { providers: [{ provide: index_1.COMPOSITION_BUFFER_MODE, useValue: true }] },
            });
            const fixture = initTest(StandaloneNgModel);
            const inputEl = fixture.debugElement.query(by_1.By.css('input'));
            const inputNativeEl = inputEl.nativeElement;
            fixture.componentInstance.name = 'oldValue';
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(inputNativeEl.value).toEqual('oldValue');
            inputEl.triggerEventHandler('compositionstart');
            inputNativeEl.value = 'updatedValue';
            (0, browser_util_1.dispatchEvent)(inputNativeEl, 'input');
            (0, testing_1.tick)();
            // ngModel should not update when compositionstart
            expect(fixture.componentInstance.name).toEqual('oldValue');
            inputEl.triggerEventHandler('compositionend', { target: { value: 'updatedValue' } });
            fixture.detectChanges();
            (0, testing_1.tick)();
            // ngModel should update when compositionend
            expect(fixture.componentInstance.name).toEqual('updatedValue');
        }));
        it('should work normally with composition events if composition mode is off', (0, testing_1.fakeAsync)(() => {
            testing_1.TestBed.overrideComponent(StandaloneNgModel, {
                set: { providers: [{ provide: index_1.COMPOSITION_BUFFER_MODE, useValue: false }] },
            });
            const fixture = initTest(StandaloneNgModel);
            const inputEl = fixture.debugElement.query(by_1.By.css('input'));
            const inputNativeEl = inputEl.nativeElement;
            fixture.componentInstance.name = 'oldValue';
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(inputNativeEl.value).toEqual('oldValue');
            inputEl.triggerEventHandler('compositionstart');
            inputNativeEl.value = 'updatedValue';
            (0, browser_util_1.dispatchEvent)(inputNativeEl, 'input');
            (0, testing_1.tick)();
            // ngModel should update normally
            expect(fixture.componentInstance.name).toEqual('updatedValue');
        }));
    });
    describe('ngModel corner cases', () => {
        it('should update the view when the model is set back to what used to be in the view', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(StandaloneNgModel);
            fixture.componentInstance.name = '';
            fixture.detectChanges();
            (0, testing_1.tick)();
            const input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            input.value = 'aa';
            input.selectionStart = 1;
            (0, browser_util_1.dispatchEvent)(input, 'input');
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(fixture.componentInstance.name).toEqual('aa');
            // Programmatically update the input value to be "bb".
            fixture.componentInstance.name = 'bb';
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.value).toEqual('bb');
            // Programatically set it back to "aa".
            fixture.componentInstance.name = 'aa';
            fixture.detectChanges();
            (0, testing_1.tick)();
            expect(input.value).toEqual('aa');
        }));
        it('should not crash when validity is checked from a binding', (0, testing_1.fakeAsync)(() => {
            const fixture = initTest(NgModelValidBinding);
            (0, testing_1.tick)();
            expect(() => fixture.detectChanges()).not.toThrowError();
        }));
    });
});
let StandaloneNgModel = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'standalone-ng-model',
            template: `
    <input type="text" [(ngModel)]="name">
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StandaloneNgModel = _classThis = class {
    };
    __setFunctionName(_classThis, "StandaloneNgModel");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StandaloneNgModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StandaloneNgModel = _classThis;
})();
let NgModelForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-form',
            template: `
    <form (ngSubmit)="event=$event" (reset)="onReset()">
      <input name="name" [(ngModel)]="name" minlength="10" [ngModelOptions]="options">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelForm = _classThis = class {
        constructor() {
            this.options = {};
        }
        onReset() { }
    };
    __setFunctionName(_classThis, "NgModelForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelForm = _classThis;
})();
let NgModelNativeValidateForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-native-validate-form',
            template: `<form ngNativeValidate></form>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelNativeValidateForm = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelNativeValidateForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelNativeValidateForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelNativeValidateForm = _classThis;
})();
let NgModelGroupForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-group-form',
            template: `
    <form>
      <div ngModelGroup="name">
        <input name="first" [(ngModel)]="first" required [disabled]="isDisabled">
        <input name="last" [(ngModel)]="last">
      </div>
      <input name="email" [(ngModel)]="email" [ngModelOptions]="options">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelGroupForm = _classThis = class {
        constructor() {
            this.options = { updateOn: 'change' };
        }
    };
    __setFunctionName(_classThis, "NgModelGroupForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelGroupForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelGroupForm = _classThis;
})();
let NgModelValidBinding = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-valid-binding',
            template: `
    <form>
      <div ngModelGroup="name" #group="ngModelGroup">
        <input name="first" [(ngModel)]="first" required>
        {{ group.valid }}
      </div>
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelValidBinding = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelValidBinding");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelValidBinding = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelValidBinding = _classThis;
})();
let NgModelNgIfForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-ngif-form',
            template: `
    <form>
      <div ngModelGroup="name" *ngIf="groupShowing">
        <input name="first" [(ngModel)]="first">
      </div>
      <input name="email" [(ngModel)]="email" *ngIf="emailShowing">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelNgIfForm = _classThis = class {
        constructor() {
            this.groupShowing = true;
            this.emailShowing = true;
        }
    };
    __setFunctionName(_classThis, "NgModelNgIfForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelNgIfForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelNgIfForm = _classThis;
})();
let NgModelNestedForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-nested',
            template: `
    <form>
      <div ngModelGroup="contact-info">
        <input name="first" [(ngModel)]="first">
        <div ngModelGroup="other-names">
          <input name="other-names" [(ngModel)]="other">
        </div>
      </div>
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelNestedForm = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelNestedForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelNestedForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelNestedForm = _classThis;
})();
let NgNoFormComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-no-form',
            template: `
    <form ngNoForm>
      <input name="name">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgNoFormComp = _classThis = class {
    };
    __setFunctionName(_classThis, "NgNoFormComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgNoFormComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgNoFormComp = _classThis;
})();
let InvalidNgModelNoName = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'invalid-ng-model-noname',
            template: `
    <form>
      <input [(ngModel)]="name">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InvalidNgModelNoName = _classThis = class {
    };
    __setFunctionName(_classThis, "InvalidNgModelNoName");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InvalidNgModelNoName = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InvalidNgModelNoName = _classThis;
})();
let NgModelOptionsStandalone = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-options-standalone',
            template: `
    <form [ngFormOptions]="formOptions">
      <input name="one" [(ngModel)]="one">
      <input [(ngModel)]="two" [ngModelOptions]="options">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelOptionsStandalone = _classThis = class {
        constructor() {
            this.options = { standalone: true };
            this.formOptions = {};
        }
    };
    __setFunctionName(_classThis, "NgModelOptionsStandalone");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelOptionsStandalone = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelOptionsStandalone = _classThis;
})();
let NgModelValidationBindings = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-validation-bindings',
            template: `
    <form>
      <input name="required" ngModel  [required]="required">
      <input name="minlength" ngModel  [minlength]="minLen">
      <input name="maxlength" ngModel [maxlength]="maxLen">
      <input name="pattern" ngModel  [pattern]="pattern">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelValidationBindings = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelValidationBindings");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelValidationBindings = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelValidationBindings = _classThis;
})();
let NgModelMultipleValidators = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-multiple-validators',
            template: `
    <form>
      <input name="tovalidate" ngModel  [required]="required" [minlength]="minLen" [pattern]="pattern">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelMultipleValidators = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelMultipleValidators");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelMultipleValidators = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelMultipleValidators = _classThis;
})();
let NgModelCheckboxRequiredValidator = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-checkbox-validator',
            template: `<form><input type="checkbox" [(ngModel)]="accepted" [required]="required" name="checkbox"></form>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelCheckboxRequiredValidator = _classThis = class {
        constructor() {
            this.accepted = false;
            this.required = false;
        }
    };
    __setFunctionName(_classThis, "NgModelCheckboxRequiredValidator");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelCheckboxRequiredValidator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelCheckboxRequiredValidator = _classThis;
})();
let NgModelEmailValidator = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-email',
            template: `<form><input type="email" ngModel [email]="validatorEnabled" name="email"></form>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelEmailValidator = _classThis = class {
        constructor() {
            this.validatorEnabled = false;
        }
    };
    __setFunctionName(_classThis, "NgModelEmailValidator");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelEmailValidator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelEmailValidator = _classThis;
})();
let NgAsyncValidator = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[ng-async-validator]',
            providers: [
                { provide: index_1.NG_ASYNC_VALIDATORS, useExisting: (0, core_1.forwardRef)(() => NgAsyncValidator), multi: true },
            ],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgAsyncValidator = _classThis = class {
        validate(c) {
            return Promise.resolve(null);
        }
    };
    __setFunctionName(_classThis, "NgAsyncValidator");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgAsyncValidator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgAsyncValidator = _classThis;
})();
let NgModelAsyncValidation = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-async-validation',
            template: `<input name="async" ngModel ng-async-validator>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelAsyncValidation = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelAsyncValidation");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelAsyncValidation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelAsyncValidation = _classThis;
})();
let NgModelChangesForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-changes-form',
            template: `
    <form>
      <input name="async" [ngModel]="name" (ngModelChange)="log()"
             [ngModelOptions]="options">
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelChangesForm = _classThis = class {
        constructor() {
            this.events = [];
        }
        log() {
            this.events.push('fired');
        }
    };
    __setFunctionName(_classThis, "NgModelChangesForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelChangesForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelChangesForm = _classThis;
})();
let NgModelChangeState = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-change-state',
            template: `
    <input #ngModel="ngModel" ngModel [maxlength]="4"
           (ngModelChange)="onNgModelChange(ngModel)">
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelChangeState = _classThis = class {
        constructor() {
            this.onNgModelChange = () => { };
        }
    };
    __setFunctionName(_classThis, "NgModelChangeState");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelChangeState = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelChangeState = _classThis;
})();
let NgModelMaxValidator = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-max',
            template: `<form><input name="max" type="number" ngModel [max]="max"></form>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelMaxValidator = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelMaxValidator");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelMaxValidator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelMaxValidator = _classThis;
})();
let NgModelMinValidator = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-min',
            template: `<form><input name="min" type="number" ngModel [min]="min"></form>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelMinValidator = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelMinValidator");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelMinValidator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelMinValidator = _classThis;
})();
let NgModelMinMaxValidator = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-min-max',
            template: `
    <form><input name="min_max" type="number" ngModel [min]="min" [max]="max"></form>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NgModelMinMaxValidator = _classThis = class {
    };
    __setFunctionName(_classThis, "NgModelMinMaxValidator");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelMinMaxValidator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelMinMaxValidator = _classThis;
})();
let CustomDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[myDir]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _min_decorators;
    let _min_initializers = [];
    let _min_extraInitializers = [];
    let _max_decorators;
    let _max_initializers = [];
    let _max_extraInitializers = [];
    var CustomDirective = _classThis = class {
        constructor() {
            this.min = __runInitializers(this, _min_initializers, void 0);
            this.max = (__runInitializers(this, _min_extraInitializers), __runInitializers(this, _max_initializers, void 0));
            __runInitializers(this, _max_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "CustomDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _min_decorators = [(0, core_1.Input)()];
        _max_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _min_decorators, { kind: "field", name: "min", static: false, private: false, access: { has: obj => "min" in obj, get: obj => obj.min, set: (obj, value) => { obj.min = value; } }, metadata: _metadata }, _min_initializers, _min_extraInitializers);
        __esDecorate(null, null, _max_decorators, { kind: "field", name: "max", static: false, private: false, access: { has: obj => "max" in obj, get: obj => obj.max, set: (obj, value) => { obj.max = value; } }, metadata: _metadata }, _max_initializers, _max_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomDirective = _classThis;
})();
let NgModelNoMinMaxValidator = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-no-min-max',
            template: `
    <form>
      <input name="min" type="text" ngModel [min]="min" myDir>
      <input name="max" type="text" ngModel [max]="max" myDir>
    </form>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _myDir_decorators;
    let _myDir_initializers = [];
    let _myDir_extraInitializers = [];
    var NgModelNoMinMaxValidator = _classThis = class {
        constructor() {
            this.myDir = __runInitializers(this, _myDir_initializers, void 0);
            __runInitializers(this, _myDir_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NgModelNoMinMaxValidator");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myDir_decorators = [(0, core_1.ViewChild)('myDir')];
        __esDecorate(null, null, _myDir_decorators, { kind: "field", name: "myDir", static: false, private: false, access: { has: obj => "myDir" in obj, get: obj => obj.myDir, set: (obj, value) => { obj.myDir = value; } }, metadata: _metadata }, _myDir_initializers, _myDir_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgModelNoMinMaxValidator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgModelNoMinMaxValidator = _classThis;
})();
let NativeDialogForm = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-model-nested',
            template: `
    <dialog open>
      <form #form method="dialog">
        <button>Submit</button>
      </form>
    </dialog>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _form_decorators;
    let _form_initializers = [];
    let _form_extraInitializers = [];
    var NativeDialogForm = _classThis = class {
        constructor() {
            this.form = __runInitializers(this, _form_initializers, void 0);
            __runInitializers(this, _form_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "NativeDialogForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _form_decorators = [(0, core_1.ViewChild)('form')];
        __esDecorate(null, null, _form_decorators, { kind: "field", name: "form", static: false, private: false, access: { has: obj => "form" in obj, get: obj => obj.form, set: (obj, value) => { obj.form = value; } }, metadata: _metadata }, _form_initializers, _form_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NativeDialogForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NativeDialogForm = _classThis;
})();
