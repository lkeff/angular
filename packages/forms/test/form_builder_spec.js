"use strict";
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../index");
const rxjs_1 = require("rxjs");
(function () {
    function syncValidator() {
        return null;
    }
    function asyncValidator() {
        return Promise.resolve(null);
    }
    describe('Form Builder', () => {
        let b;
        beforeEach(() => {
            b = new index_1.FormBuilder();
        });
        it('should create controls from a value', () => {
            const g = b.group({ 'login': 'some value' });
            expect(g.controls['login'].value).toEqual('some value');
        });
        it('should create controls from a boxed value', () => {
            const g = b.group({ 'login': { value: 'some value', disabled: true } });
            expect(g.controls['login'].value).toEqual('some value');
            expect(g.controls['login'].disabled).toEqual(true);
        });
        it('should create controls from an array', () => {
            const g = b.group({
                'login': ['some value'],
                'password': ['some value', syncValidator, asyncValidator],
            });
            expect(g.controls['login'].value).toEqual('some value');
            expect(g.controls['password'].value).toEqual('some value');
            expect(g.controls['password'].validator).toEqual(syncValidator);
            expect(g.controls['password'].asyncValidator).toEqual(asyncValidator);
        });
        it('should use controls whose form state is a primitive value', () => {
            const g = b.group({ 'login': b.control('some value', syncValidator, asyncValidator) });
            expect(g.controls['login'].value).toEqual('some value');
            expect(g.controls['login'].validator).toBe(syncValidator);
            expect(g.controls['login'].asyncValidator).toBe(asyncValidator);
        });
        it('should create controls from FormStates', () => {
            const c = b.control({ value: 'one', disabled: false });
            expect(c.value).toEqual('one');
            c.reset();
            expect(c.value).toEqual(null);
        });
        it('should work on a directly constructed FormBuilder object', () => {
            const g = b.group({ 'login': 'some value' });
            expect(g.controls['login'].value).toEqual('some value');
        });
        describe('should create control records', () => {
            it('from simple values', () => {
                const a = b.record({ a: 'one', b: 'two' });
                expect(a.value).toEqual({ a: 'one', b: 'two' });
            });
            it('from boxed values', () => {
                var _a;
                const a = b.record({ a: 'one', b: { value: 'two', disabled: true } });
                expect(a.value).toEqual({ a: 'one' });
                (_a = a.get('b')) === null || _a === void 0 ? void 0 : _a.enable();
                expect(a.value).toEqual({ a: 'one', b: 'two' });
            });
            it('from an array', () => {
                const a = b.record({ a: ['one'] });
                expect(a.value).toEqual({ a: 'one' });
            });
            it('from controls whose form state is a primitive value', () => {
                const record = b.record({ 'login': b.control('some value', syncValidator, asyncValidator) });
                expect(record.controls['login'].value).toEqual('some value');
                expect(record.controls['login'].validator).toBe(syncValidator);
                expect(record.controls['login'].asyncValidator).toBe(asyncValidator);
            });
        });
        it('should create homogenous control arrays', () => {
            const a = b.array(['one', 'two', 'three']);
            expect(a.value).toEqual(['one', 'two', 'three']);
        });
        it('should create control arrays with FormStates and ControlConfigs', () => {
            const a = b.array(['one', 'two', { value: 'three', disabled: false }]);
            expect(a.value).toEqual(['one', 'two', 'three']);
        });
        it('should create control arrays with ControlConfigs', () => {
            const a = b.array([['one', syncValidator, asyncValidator]]);
            expect(a.value).toEqual(['one']);
            expect(a.controls[0].validator).toBe(syncValidator);
            expect(a.controls[0].asyncValidator).toBe(asyncValidator);
        });
        it('should create nested control arrays with ControlConfigs', () => {
            const a = b.array(['one', ['two', syncValidator, asyncValidator]]);
            expect(a.value).toEqual(['one', 'two']);
            expect(a.controls[1].validator).toBe(syncValidator);
            expect(a.controls[1].asyncValidator).toBe(asyncValidator);
        });
        it('should create control arrays with AbstractControls', () => {
            const ctrl = b.control('one');
            const a = b.array([ctrl], syncValidator, asyncValidator);
            expect(a.value).toEqual(['one']);
            expect(a.validator).toBe(syncValidator);
            expect(a.asyncValidator).toBe(asyncValidator);
        });
        it('should create control arrays with mixed value representations', () => {
            const a = b.array([
                'one',
                ['two', syncValidator, asyncValidator],
                { value: 'three', disabled: false },
                [{ value: 'four', disabled: false }, syncValidator, asyncValidator],
                ['five'],
                b.control('six'),
                b.control({ value: 'seven', disabled: false }),
            ]);
            expect(a.value).toEqual(['one', 'two', 'three', 'four', 'five', 'six', 'seven']);
        });
        it('should support controls with no validators and whose form state is null', () => {
            const g = b.group({ 'login': b.control(null) });
            expect(g.controls['login'].value).toBeNull();
            expect(g.controls['login'].validator).toBeNull();
            expect(g.controls['login'].asyncValidator).toBeNull();
        });
        it('should support controls with validators and whose form state is null', () => {
            const g = b.group({ 'login': b.control(null, syncValidator, asyncValidator) });
            expect(g.controls['login'].value).toBeNull();
            expect(g.controls['login'].validator).toBe(syncValidator);
            expect(g.controls['login'].asyncValidator).toBe(asyncValidator);
        });
        it('should support controls with validators that are later modified', () => {
            const g = b.group({ 'login': b.control(null, syncValidator, asyncValidator) });
            expect(g.controls['login'].value).toBeNull();
            expect(g.controls['login'].validator).toBe(syncValidator);
            expect(g.controls['login'].asyncValidator).toBe(asyncValidator);
            g.controls['login'].addValidators(index_1.Validators.required);
            expect(g.controls['login'].hasValidator(index_1.Validators.required)).toBe(true);
            g.controls['login'].removeValidators(index_1.Validators.required);
            expect(g.controls['login'].hasValidator(index_1.Validators.required)).toBe(false);
        });
        it('should support controls with no validators and whose form state is undefined', () => {
            const g = b.group({ 'login': b.control(undefined) });
            expect(g.controls['login'].value).toBeNull();
            expect(g.controls['login'].validator).toBeNull();
            expect(g.controls['login'].asyncValidator).toBeNull();
        });
        it('should support controls with validators and whose form state is undefined', () => {
            const g = b.group({ 'login': b.control(undefined, syncValidator, asyncValidator) });
            expect(g.controls['login'].value).toBeNull();
            expect(g.controls['login'].validator).toBe(syncValidator);
            expect(g.controls['login'].asyncValidator).toBe(asyncValidator);
        });
        it('should create groups with a custom validator', () => {
            const g = b.group({ 'login': 'some value' }, { 'validator': syncValidator, 'asyncValidator': asyncValidator });
            expect(g.validator).toBe(syncValidator);
            expect(g.asyncValidator).toBe(asyncValidator);
        });
        it('should create groups with null options', () => {
            const g = b.group({ 'login': 'some value' }, null);
            expect(g.validator).toBe(null);
            expect(g.asyncValidator).toBe(null);
        });
        it('should create groups with shorthand parameters and with right typings', () => {
            var _a, _b, _c;
            const form = b.group({
                shorthand: [3, index_1.Validators.required],
                shorthand2: [5, { validators: index_1.Validators.required }],
            });
            expect((_a = form.get('shorthand')) === null || _a === void 0 ? void 0 : _a.value).toEqual(3);
            expect(((_b = form.get('shorthand2').value) !== null && _b !== void 0 ? _b : 0) + 0).toEqual(5);
            const form2 = b.group({
                shorthand2: [5, { updateOn: 'blur' }],
            });
            expect(((_c = form2.get('shorthand2').value) !== null && _c !== void 0 ? _c : 0) + 0).toEqual(5);
        });
        it('should create control arrays', () => {
            const c = b.control('three');
            const e = b.control(null);
            const f = b.control(undefined);
            const a = b.array(['one', ['two', syncValidator], c, b.array(['four']), e, f], syncValidator, asyncValidator);
            expect(a.value).toEqual(['one', 'two', 'three', ['four'], null, null]);
            expect(a.validator).toBe(syncValidator);
            expect(a.asyncValidator).toBe(asyncValidator);
        });
        it('should create control arrays with multiple async validators', (0, testing_1.fakeAsync)(() => {
            function asyncValidator1() {
                return (0, rxjs_1.of)({ 'async1': true });
            }
            function asyncValidator2() {
                return (0, rxjs_1.of)({ 'async2': true });
            }
            const a = b.array(['one', 'two'], null, [asyncValidator1, asyncValidator2]);
            expect(a.value).toEqual(['one', 'two']);
            (0, testing_1.tick)();
            expect(a.errors).toEqual({ 'async1': true, 'async2': true });
        }));
        it('should create control arrays with multiple sync validators', () => {
            function syncValidator1() {
                return { 'sync1': true };
            }
            function syncValidator2() {
                return { 'sync2': true };
            }
            const a = b.array(['one', 'two'], [syncValidator1, syncValidator2]);
            expect(a.value).toEqual(['one', 'two']);
            expect(a.errors).toEqual({ 'sync1': true, 'sync2': true });
        });
        it('should be injectable', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        template: '...',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(fb) {
                        this.fb = fb;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ imports: [index_1.ReactiveFormsModule] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.fb).toBeInstanceOf(index_1.FormBuilder);
            const fc = fixture.componentInstance.fb.control('foo');
            {
                let t = fc.value;
                let t1 = fc.value;
                t1 = null;
            }
            fc.reset();
            expect(fc.value).toEqual(null);
        });
        it('should be injectable as NonNullableFormBuilder', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        standalone: true,
                        template: '...',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(fb) {
                        this.fb = fb;
                    }
                };
                __setFunctionName(_classThis, "MyComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ imports: [index_1.ReactiveFormsModule] });
            const fixture = testing_1.TestBed.createComponent(MyComp);
            fixture.detectChanges();
            expect(fixture.componentInstance.fb).toBeInstanceOf(index_1.FormBuilder);
            const fc = fixture.componentInstance.fb.control('foo');
            {
                let t = fc.value;
                let t1 = fc.value;
                t1 = null;
            }
            fc.reset();
            expect(fc.value).toEqual('foo');
        });
        describe('updateOn', () => {
            it('should default to on change', () => {
                const c = b.control('');
                expect(c.updateOn).toEqual('change');
            });
            it('should default to on change with an options obj', () => {
                const c = b.control('', { validators: index_1.Validators.required });
                expect(c.updateOn).toEqual('change');
            });
            it('should set updateOn when updating on blur', () => {
                const c = b.control('', { updateOn: 'blur' });
                expect(c.updateOn).toEqual('blur');
            });
            describe('in groups and arrays', () => {
                it('should default to group updateOn when not set in control', () => {
                    const g = b.group({ one: b.control(''), two: b.control('') }, { updateOn: 'blur' });
                    expect(g.get('one').updateOn).toEqual('blur');
                    expect(g.get('two').updateOn).toEqual('blur');
                });
                it('should default to array updateOn when not set in control', () => {
                    const a = b.array([b.control(''), b.control('')], { updateOn: 'blur' });
                    expect(a.get([0]).updateOn).toEqual('blur');
                    expect(a.get([1]).updateOn).toEqual('blur');
                });
                it('should set updateOn with nested groups', () => {
                    const g = b.group({
                        group: b.group({ one: b.control(''), two: b.control('') }),
                    }, { updateOn: 'blur' });
                    expect(g.get('group.one').updateOn).toEqual('blur');
                    expect(g.get('group.two').updateOn).toEqual('blur');
                    expect(g.get('group').updateOn).toEqual('blur');
                });
                it('should set updateOn with nested arrays', () => {
                    const g = b.group({
                        arr: b.array([b.control(''), b.control('')]),
                    }, { updateOn: 'blur' });
                    expect(g.get(['arr', 0]).updateOn).toEqual('blur');
                    expect(g.get(['arr', 1]).updateOn).toEqual('blur');
                    expect(g.get('arr').updateOn).toEqual('blur');
                });
                it('should allow control updateOn to override group updateOn', () => {
                    const g = b.group({ one: b.control('', { updateOn: 'change' }), two: b.control('') }, { updateOn: 'blur' });
                    expect(g.get('one').updateOn).toEqual('change');
                    expect(g.get('two').updateOn).toEqual('blur');
                });
                it('should set updateOn with complex setup', () => {
                    const g = b.group({
                        group: b.group({ one: b.control('', { updateOn: 'change' }), two: b.control('') }, { updateOn: 'blur' }),
                        groupTwo: b.group({ one: b.control('') }, { updateOn: 'submit' }),
                        three: b.control(''),
                    });
                    expect(g.get('group.one').updateOn).toEqual('change');
                    expect(g.get('group.two').updateOn).toEqual('blur');
                    expect(g.get('groupTwo.one').updateOn).toEqual('submit');
                    expect(g.get('three').updateOn).toEqual('change');
                });
            });
        });
    });
    describe('UntypedFormBuilder', () => {
        let fb = new index_1.FormBuilder();
        let ufb = new index_1.UntypedFormBuilder();
        function typedFn(fb) { }
        function untypedFn(fb) { }
        it('can be provided where a FormBuilder is expected and vice versa', () => {
            typedFn(ufb);
            untypedFn(fb);
        });
    });
})();
