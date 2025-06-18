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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/core");
const signals_1 = require("../../primitives/signals");
const testing_1 = require("../../testing");
describe('input signal', () => {
    it('should properly notify live consumers (effect)', () => {
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.input = (0, core_1.input)(0);
                    this.effectCalled = 0;
                    (0, core_1.effect)(() => {
                        this.effectCalled++;
                        this.input();
                    });
                }
            };
            __setFunctionName(_classThis, "TestCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        const node = fixture.componentInstance.input[signals_1.SIGNAL];
        fixture.detectChanges();
        expect(fixture.componentInstance.effectCalled).toBe(1);
        node.applyValueToInputSignal(node, 1);
        fixture.detectChanges();
        expect(fixture.componentInstance.effectCalled).toBe(2);
    });
    it('should work with computed expressions', () => {
        testing_1.TestBed.runInInjectionContext(() => {
            const signal = (0, core_1.input)(0);
            let computedCount = 0;
            const derived = (0, core_1.computed)(() => (computedCount++, signal() + 1000));
            const node = signal[signals_1.SIGNAL];
            expect(derived()).toBe(1000);
            expect(computedCount).toBe(1);
            node.applyValueToInputSignal(node, 1);
            expect(computedCount).toBe(1);
            expect(derived()).toBe(1001);
            expect(computedCount).toBe(2);
        });
    });
    it('should capture transform for later use in framework', () => {
        testing_1.TestBed.runInInjectionContext(() => {
            var _a;
            const signal = (0, core_1.input)(0, { transform: (v) => v + 1000 });
            const node = signal[signals_1.SIGNAL];
            expect((_a = node.transformFn) === null || _a === void 0 ? void 0 : _a.call(node, 1)).toBe(1001);
        });
    });
    it('should throw if there is no value for required inputs', () => {
        testing_1.TestBed.runInInjectionContext(() => {
            const signal = core_1.input.required();
            const node = signal[signals_1.SIGNAL];
            expect(() => signal()).toThrowError(/Input is required but no value is available yet\./);
            node.applyValueToInputSignal(node, 1);
            expect(signal()).toBe(1);
        });
    });
    it('should include debugName in required inputs error message, if available', () => {
        testing_1.TestBed.runInInjectionContext(() => {
            const signal = core_1.input.required({ debugName: 'mySignal' });
            const node = signal[signals_1.SIGNAL];
            expect(() => signal()).toThrowError(/Input "mySignal" is required but no value is available yet\./);
            node.applyValueToInputSignal(node, 1);
            expect(signal()).toBe(1);
        });
    });
    it('should include alias in required inputs error message, if available', () => {
        testing_1.TestBed.runInInjectionContext(() => {
            const signal = core_1.input.required({ alias: 'alias' });
            const node = signal[signals_1.SIGNAL];
            expect(() => signal()).toThrowError(/Input "alias" is required but no value is available yet\./);
            node.applyValueToInputSignal(node, 1);
            expect(signal()).toBe(1);
        });
    });
    it('should throw if a `computed` depends on an uninitialized required input', () => {
        testing_1.TestBed.runInInjectionContext(() => {
            const signal = core_1.input.required();
            const expr = (0, core_1.computed)(() => signal() + 1000);
            const node = signal[signals_1.SIGNAL];
            expect(() => expr()).toThrowError(/Input is required but no value is available yet\./);
            node.applyValueToInputSignal(node, 1);
            expect(expr()).toBe(1001);
        });
    });
    it('should have a toString implementation', () => {
        testing_1.TestBed.runInInjectionContext(() => {
            const signal = (0, core_1.input)(0);
            expect(signal + '').toBe('[Input Signal: 0]');
        });
    });
});
