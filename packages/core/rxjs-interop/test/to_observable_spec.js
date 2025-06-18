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
const core_1 = require("../../src/core");
const src_1 = require("../src");
const testing_1 = require("../../testing");
const operators_1 = require("rxjs/operators");
describe('toObservable()', () => {
    let fixture;
    let injector;
    let Cmp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                template: '',
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var Cmp = _classThis = class {
        };
        __setFunctionName(_classThis, "Cmp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Cmp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return Cmp = _classThis;
    })();
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(Cmp);
        injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
    });
    function flushEffects() {
        fixture.detectChanges();
    }
    it('should produce an observable that tracks a signal', () => __awaiter(void 0, void 0, void 0, function* () {
        const counter = (0, core_1.signal)(0);
        const counterValues = (0, src_1.toObservable)(counter, { injector }).pipe((0, operators_1.take)(3), (0, operators_1.toArray)()).toPromise();
        // Initial effect execution, emits 0.
        flushEffects();
        counter.set(1);
        // Emits 1.
        flushEffects();
        counter.set(2);
        counter.set(3);
        // Emits 3 (ignores 2 as it was batched by the effect).
        flushEffects();
        expect(yield counterValues).toEqual([0, 1, 3]);
    }));
    it('should propagate errors from the signal', () => {
        const source = (0, core_1.signal)(1);
        const counter = (0, core_1.computed)(() => {
            const value = source();
            if (value === 2) {
                throw 'fail';
            }
            else {
                return value;
            }
        });
        const counter$ = (0, src_1.toObservable)(counter, { injector });
        let currentValue = 0;
        let currentError = null;
        const sub = counter$.subscribe({
            next: (value) => (currentValue = value),
            error: (err) => (currentError = err),
        });
        flushEffects();
        expect(currentValue).toBe(1);
        source.set(2);
        flushEffects();
        expect(currentError).toBe('fail');
        sub.unsubscribe();
    });
    it('monitors the signal even if the Observable is never subscribed', () => {
        let counterRead = false;
        const counter = (0, core_1.computed)(() => {
            counterRead = true;
            return 0;
        });
        (0, src_1.toObservable)(counter, { injector });
        // Simply creating the Observable shouldn't trigger a signal read.
        expect(counterRead).toBeFalse();
        // The signal is read after effects have run.
        flushEffects();
        expect(counterRead).toBeTrue();
    });
    it('should still monitor the signal if the Observable has no active subscribers', () => {
        const counter = (0, core_1.signal)(0);
        // Tracks how many reads of `counter()` there have been.
        let readCount = 0;
        const trackedCounter = (0, core_1.computed)(() => {
            readCount++;
            return counter();
        });
        const counter$ = (0, src_1.toObservable)(trackedCounter, { injector });
        const sub = counter$.subscribe();
        expect(readCount).toBe(0);
        flushEffects();
        expect(readCount).toBe(1);
        // Sanity check of the read tracker - updating the counter should cause it to be read again
        // by the active effect.
        counter.set(1);
        flushEffects();
        expect(readCount).toBe(2);
        // Tear down the only subscription.
        sub.unsubscribe();
        // Now, setting the signal still triggers additional reads
        counter.set(2);
        flushEffects();
        expect(readCount).toBe(3);
    });
    it('stops monitoring the signal once injector is destroyed', () => {
        const counter = (0, core_1.signal)(0);
        // Tracks how many reads of `counter()` there have been.
        let readCount = 0;
        const trackedCounter = (0, core_1.computed)(() => {
            readCount++;
            return counter();
        });
        const childInjector = (0, core_1.createEnvironmentInjector)([], injector);
        (0, src_1.toObservable)(trackedCounter, { injector: childInjector });
        expect(readCount).toBe(0);
        flushEffects();
        expect(readCount).toBe(1);
        // Now, setting the signal shouldn't trigger any additional reads, as the Injector was destroyed
        childInjector.destroy();
        counter.set(2);
        flushEffects();
        expect(readCount).toBe(1);
    });
    it('does not track downstream signal reads in the effect', () => {
        const counter = (0, core_1.signal)(0);
        const emits = (0, core_1.signal)(0);
        (0, src_1.toObservable)(counter, { injector }).subscribe(() => {
            // Read emits. If we are still tracked in the effect, this will cause an infinite loop by
            // triggering the effect again.
            emits();
            emits.update((v) => v + 1);
        });
        flushEffects();
        expect(emits()).toBe(1);
        flushEffects();
        expect(emits()).toBe(1);
    });
});
