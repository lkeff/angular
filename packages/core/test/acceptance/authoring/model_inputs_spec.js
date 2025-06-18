"use strict";
/*!
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const signals_1 = require("../../../primitives/signals");
const testing_1 = require("../../../testing");
describe('model inputs', () => {
    it('should support two-way binding to a signal', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        // Initial value.
        expect(host.value()).toBe(1);
        expect(host.dir.value()).toBe(1);
        // Changing the value from within the directive.
        host.dir.value.set(2);
        expect(host.value()).toBe(2);
        expect(host.dir.value()).toBe(2);
        // Changing the value from the outside.
        host.value.set(3);
        fixture.detectChanges();
        expect(host.value()).toBe(3);
        expect(host.dir.value()).toBe(3);
    });
    it('should support two-way binding to a non-signal value', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), 1);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        // Initial value.
        expect(host.value).toBe(1);
        expect(host.dir.value()).toBe(1);
        // Changing the value from within the directive.
        host.dir.value.set(2);
        expect(host.value).toBe(2);
        expect(host.dir.value()).toBe(2);
        // Changing the value from the outside.
        host.value = 3;
        fixture.detectChanges();
        expect(host.value).toBe(3);
        expect(host.dir.value()).toBe(3);
    });
    it('should support two-way binding a signal to a non-model input/output pair', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _value_decorators;
            let _value_initializers = [];
            let _value_extraInitializers = [];
            let _valueChange_decorators;
            let _valueChange_initializers = [];
            let _valueChange_extraInitializers = [];
            var Dir = _classThis = class {
                constructor() {
                    this.value = __runInitializers(this, _value_initializers, 0);
                    this.valueChange = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter()));
                    __runInitializers(this, _valueChange_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _value_decorators = [(0, core_1.Input)()];
                _valueChange_decorators = [(0, core_1.Output)()];
                __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        // Initial value.
        expect(host.value()).toBe(1);
        expect(host.dir.value).toBe(1);
        // Changing the value from within the directive.
        host.dir.value = 2;
        host.dir.valueChange.emit(2);
        fixture.detectChanges();
        expect(host.value()).toBe(2);
        expect(host.dir.value).toBe(2);
        // Changing the value from the outside.
        host.value.set(3);
        fixture.detectChanges();
        expect(host.value()).toBe(3);
        expect(host.dir.value).toBe(3);
    });
    it('should support a one-way property binding to a model', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [value]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), 1);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        // Initial value.
        expect(host.value).toBe(1);
        expect(host.dir.value()).toBe(1);
        // Changing the value from within the directive.
        host.dir.value.set(2);
        fixture.detectChanges();
        expect(host.value).toBe(1);
        expect(host.dir.value()).toBe(2);
        // Changing the value from the outside.
        host.value = 3;
        fixture.detectChanges();
        expect(host.value).toBe(3);
        expect(host.dir.value()).toBe(3);
    });
    it('should emit to the change output when the model changes', () => {
        const emittedValues = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div (valueChange)="changed($event)" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                changed(value) {
                    emittedValues.push(value);
                }
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        expect(emittedValues).toEqual([]);
        host.dir.value.set(1);
        fixture.detectChanges();
        expect(emittedValues).toEqual([1]);
        // Same value should not emit.
        host.dir.value.set(1);
        fixture.detectChanges();
        expect(emittedValues).toEqual([1]);
        host.dir.value.update((value) => value * 5);
        fixture.detectChanges();
        expect(emittedValues).toEqual([1, 5]);
    });
    it('should not emit to the change event when then property binding changes', () => {
        const emittedValues = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [value]="value()" (valueChange)="changed($event)" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
                changed(value) {
                    emittedValues.push(value);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        expect(emittedValues).toEqual([]);
        host.value.set(2);
        fixture.detectChanges();
        expect(emittedValues).toEqual([]);
    });
    it('should support binding to the model input and output separately', () => {
        const emittedValues = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [value]="value()" (valueChange)="changed($event)" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
                changed(value) {
                    emittedValues.push(value);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        expect(host.value()).toBe(1);
        expect(host.dir.value()).toBe(1);
        expect(emittedValues).toEqual([]);
        host.dir.value.set(2);
        fixture.detectChanges();
        expect(host.value()).toBe(1);
        expect(host.dir.value()).toBe(2);
        expect(emittedValues).toEqual([2]);
        host.value.set(3);
        fixture.detectChanges();
        expect(host.value()).toBe(3);
        expect(host.dir.value()).toBe(3);
        expect(emittedValues).toEqual([2]);
    });
    it('should support two-way binding to a model with an alias', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0, { alias: 'alias' });
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(alias)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        // Initial value.
        expect(host.value()).toBe(1);
        expect(host.dir.value()).toBe(1);
        // Changing the value from within the directive.
        host.dir.value.set(2);
        fixture.detectChanges();
        expect(host.value()).toBe(2);
        expect(host.dir.value()).toBe(2);
        // Changing the value from the outside.
        host.value.set(3);
        fixture.detectChanges();
        expect(host.value()).toBe(3);
        expect(host.dir.value()).toBe(3);
    });
    it('should support binding to an aliased model input and output separately', () => {
        const emittedValues = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0, { alias: 'alias' });
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [alias]="value()" (aliasChange)="changed($event)" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
                changed(value) {
                    emittedValues.push(value);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        expect(host.value()).toBe(1);
        expect(host.dir.value()).toBe(1);
        expect(emittedValues).toEqual([]);
        host.dir.value.set(2);
        fixture.detectChanges();
        expect(host.value()).toBe(1);
        expect(host.dir.value()).toBe(2);
        expect(emittedValues).toEqual([2]);
        host.value.set(3);
        fixture.detectChanges();
        expect(host.value()).toBe(3);
        expect(host.dir.value()).toBe(3);
        expect(emittedValues).toEqual([2]);
    });
    it('should throw if a required model input is accessed too early', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = core_1.model.required();
                    this.value();
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 1;
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
        expect(() => testing_1.TestBed.createComponent(App)).toThrowError(/Model is required but no value is available yet/);
    });
    it('should throw if a required model input is updated too early', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = core_1.model.required();
                    this.value.update((prev) => prev * 2);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 1;
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
        expect(() => testing_1.TestBed.createComponent(App)).toThrowError(/Model is required but no value is available yet/);
    });
    it('should stop emitting to the output on destroy', () => {
        let emittedEvents = 0;
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div (valueChange)="changed()" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                changed() {
                    emittedEvents++;
                }
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const modelRef = fixture.componentInstance.dir.value;
        expect(emittedEvents).toBe(0);
        modelRef.set(1);
        fixture.detectChanges();
        expect(emittedEvents).toBe(1);
        fixture.destroy();
        const warnSpy = spyOn(console, 'warn');
        modelRef.set(2);
        expect(warnSpy.calls.mostRecent().args[0]).toMatch(/Unexpected emit for destroyed `OutputRef`/);
        expect(emittedEvents).toBe(1);
    });
    it('should support inherited model inputs', () => {
        let BaseDir = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BaseDir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
            };
            __setFunctionName(_classThis, "BaseDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BaseDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BaseDir = _classThis;
        })();
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = BaseDir;
            var Dir = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        // Initial value.
        expect(host.value()).toBe(1);
        expect(host.dir.value()).toBe(1);
        // Changing the value from within the directive.
        host.dir.value.set(2);
        fixture.detectChanges();
        expect(host.value()).toBe(2);
        expect(host.dir.value()).toBe(2);
        // Changing the value from the outside.
        host.value.set(3);
        fixture.detectChanges();
        expect(host.value()).toBe(3);
        expect(host.dir.value()).toBe(3);
    });
    it('should reflect changes to a two-way-bound signal in the DOM', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    host: {
                        '(click)': 'increment()',
                    },
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
                increment() {
                    this.value.update((previous) => previous + 1);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button [(value)]="value" dir></button> Current value: {{value()}}',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = (0, core_1.signal)(1);
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Current value: 1');
        fixture.nativeElement.querySelector('button').click();
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Current value: 2');
        fixture.nativeElement.querySelector('button').click();
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Current value: 3');
    });
    it('should support ngOnChanges for two-way model bindings', () => {
        const changes = [];
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
                ngOnChanges(allChanges) {
                    if (allChanges['value']) {
                        changes.push(allChanges['value']);
                    }
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(changes).toEqual([
            jasmine.objectContaining({
                previousValue: undefined,
                currentValue: 1,
                firstChange: true,
            }),
        ]);
        fixture.componentInstance.value.set(2);
        fixture.detectChanges();
        expect(changes).toEqual([
            jasmine.objectContaining({
                previousValue: undefined,
                currentValue: 1,
                firstChange: true,
            }),
            jasmine.objectContaining({
                previousValue: 1,
                currentValue: 2,
                firstChange: false,
            }),
        ]);
    });
    it('should not throw for mixed model and output subscriptions', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _output_decorators;
            let _output_initializers = [];
            let _output_extraInitializers = [];
            let _output2_decorators;
            let _output2_initializers = [];
            let _output2_extraInitializers = [];
            var Dir = _classThis = class {
                constructor() {
                    this.model = (0, core_1.model)(0);
                    this.output = __runInitializers(this, _output_initializers, new core_1.EventEmitter());
                    this.model2 = (__runInitializers(this, _output_extraInitializers), (0, core_1.model)(0));
                    this.output2 = __runInitializers(this, _output2_initializers, new core_1.EventEmitter());
                    __runInitializers(this, _output2_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _output_decorators = [(0, core_1.Output)()];
                _output2_decorators = [(0, core_1.Output)()];
                __esDecorate(null, null, _output_decorators, { kind: "field", name: "output", static: false, private: false, access: { has: obj => "output" in obj, get: obj => obj.output, set: (obj, value) => { obj.output = value; } }, metadata: _metadata }, _output_initializers, _output_extraInitializers);
                __esDecorate(null, null, _output2_decorators, { kind: "field", name: "output2", static: false, private: false, access: { has: obj => "output2" in obj, get: obj => obj.output2, set: (obj, value) => { obj.output2 = value; } }, metadata: _metadata }, _output2_initializers, _output2_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div dir (model)="noop()" (output)="noop()" (model2)="noop()" (output2)="noop()"></div>
      `,
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                noop() { }
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(() => fixture.destroy()).not.toThrow();
    });
    it('should support two-way binding to a signal @for loop variable', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @for (value of values; track $index) {
          <div [(value)]="value" dir></div>
        }
      `,
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.values = (__runInitializers(this, _dir_extraInitializers), [(0, core_1.signal)(1)]);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        // Initial value.
        expect(host.values[0]()).toBe(1);
        expect(host.dir.value()).toBe(1);
        // Changing the value from within the directive.
        host.dir.value.set(2);
        expect(host.values[0]()).toBe(2);
        expect(host.dir.value()).toBe(2);
        // Changing the value from the outside.
        host.values[0].set(3);
        fixture.detectChanges();
        expect(host.values[0]()).toBe(3);
        expect(host.dir.value()).toBe(3);
    });
    it('should assign a debugName to the underlying watcher node when a debugName is provided', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.model)(0, { debugName: 'TEST_DEBUG_NAME' });
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        expect(host.dir.value[signals_1.SIGNAL].debugName).toBe('TEST_DEBUG_NAME');
    });
    it('should assign a debugName to the underlying watcher node when a debugName is provided to a required model', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = core_1.model.required({ debugName: 'TEST_DEBUG_NAME' });
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), (0, core_1.signal)(1));
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        expect(host.dir.value[signals_1.SIGNAL].debugName).toBe('TEST_DEBUG_NAME');
    });
});
