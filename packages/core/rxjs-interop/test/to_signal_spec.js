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
const rxjs_1 = require("rxjs");
describe('toSignal()', () => {
    it('should reflect the last emitted value of an Observable', test(() => {
        const counter$ = new rxjs_1.BehaviorSubject(0);
        const counter = (0, src_1.toSignal)(counter$);
        expect(counter()).toBe(0);
        counter$.next(1);
        expect(counter()).toBe(1);
        counter$.next(3);
        expect(counter()).toBe(3);
    }));
    it('should notify when the last emitted value of an Observable changes', test(() => {
        let seenValue = 0;
        const counter$ = new rxjs_1.BehaviorSubject(1);
        const counter = (0, src_1.toSignal)(counter$);
        expect(counter()).toBe(1);
        counter$.next(2);
        expect(counter()).toBe(2);
    }));
    it('should propagate an error returned by the Observable', test(() => {
        const counter$ = new rxjs_1.BehaviorSubject(1);
        const counter = (0, src_1.toSignal)(counter$);
        expect(counter()).toBe(1);
        counter$.error('fail');
        expect(counter).toThrow('fail');
    }));
    it('should unsubscribe when the current context is destroyed', test(() => {
        const counter$ = new rxjs_1.BehaviorSubject(0);
        const injector = core_1.Injector.create({ providers: [] });
        const counter = (0, core_1.runInInjectionContext)(injector, () => (0, src_1.toSignal)(counter$));
        expect(counter()).toBe(0);
        counter$.next(1);
        expect(counter()).toBe(1);
        // Destroying the injector should unsubscribe the Observable.
        injector.destroy();
        // The signal should have the last value observed.
        expect(counter()).toBe(1);
        // And this value should no longer be updating (unsubscribed).
        counter$.next(2);
        expect(counter()).toBe(1);
    }));
    it('should unsubscribe when an explicitly provided injector is destroyed', test(() => {
        const counter$ = new rxjs_1.BehaviorSubject(0);
        const injector = core_1.Injector.create({ providers: [] });
        const counter = (0, src_1.toSignal)(counter$, { injector });
        expect(counter()).toBe(0);
        counter$.next(1);
        expect(counter()).toBe(1);
        // Destroying the injector should unsubscribe the Observable.
        injector.destroy();
        // The signal should have the last value observed.
        expect(counter()).toBe(1);
        // And this value should no longer be updating (unsubscribed).
        counter$.next(2);
        expect(counter()).toBe(1);
    }));
    it('should not require an injection context when manualCleanup is passed', () => {
        const counter$ = new rxjs_1.BehaviorSubject(0);
        expect(() => (0, src_1.toSignal)(counter$, { manualCleanup: true })).not.toThrow();
        counter$.complete();
    });
    it('should not unsubscribe when manualCleanup is passed', () => {
        const counter$ = new rxjs_1.BehaviorSubject(0);
        const injector = core_1.Injector.create({ providers: [] });
        const counter = (0, core_1.runInInjectionContext)(injector, () => (0, src_1.toSignal)(counter$, { manualCleanup: true }));
        injector.destroy();
        // Destroying the injector should not have unsubscribed the Observable.
        counter$.next(1);
        expect(counter()).toBe(1);
        counter$.complete();
        // The signal should have the last value observed before the observable completed.
        expect(counter()).toBe(1);
    });
    it('should not allow toSignal creation in a reactive context', () => {
        const counter$ = new rxjs_1.BehaviorSubject(1);
        const doubleCounter = (0, core_1.computed)(() => {
            const counter = (0, src_1.toSignal)(counter$, { requireSync: true });
            return counter() * 2;
        });
        expect(() => doubleCounter()).toThrowError(/toSignal\(\) cannot be called from within a reactive context. Invoking `toSignal` causes new subscriptions every time./);
    });
    describe('with no initial value', () => {
        it('should return `undefined` if read before a value is emitted', test(() => {
            const counter$ = new rxjs_1.Subject();
            const counter = (0, src_1.toSignal)(counter$);
            expect(counter()).toBeUndefined();
            counter$.next(1);
            expect(counter()).toBe(1);
        }));
        it('should not throw if a value is emitted before called', test(() => {
            const counter$ = new rxjs_1.Subject();
            const counter = (0, src_1.toSignal)(counter$);
            counter$.next(1);
            expect(() => counter()).not.toThrow();
        }));
    });
    describe('with requireSync', () => {
        it('should throw if created before a value is emitted', test(() => {
            const counter$ = new rxjs_1.Subject();
            expect(() => (0, src_1.toSignal)(counter$, { requireSync: true })).toThrow();
        }));
        it('should not throw if a value emits synchronously on creation', test(() => {
            const counter$ = new rxjs_1.ReplaySubject(1);
            counter$.next(1);
            const counter = (0, src_1.toSignal)(counter$);
            expect(counter()).toBe(1);
        }));
    });
    describe('with an initial value', () => {
        it('should return the initial value if called before a value is emitted', test(() => {
            const counter$ = new rxjs_1.Subject();
            const counter = (0, src_1.toSignal)(counter$, { initialValue: null });
            expect(counter()).toBeNull();
            counter$.next(1);
            expect(counter()).toBe(1);
        }));
        it('should not return the initial value if called after a value is emitted', test(() => {
            const counter$ = new rxjs_1.Subject();
            const counter = (0, src_1.toSignal)(counter$, { initialValue: null });
            counter$.next(1);
            expect(counter()).not.toBeNull();
        }));
    });
    describe('with an equality function', () => {
        it('should not update for values considered equal', test(() => {
            const counter$ = new rxjs_1.Subject();
            const counter = (0, src_1.toSignal)(counter$, {
                initialValue: { value: 0 },
                equal: (a, b) => a.value === b.value,
            });
            let updates = 0;
            const tracker = (0, core_1.computed)(() => {
                updates++;
                return counter();
            });
            expect(tracker()).toEqual({ value: 0 });
            counter$.next({ value: 1 });
            expect(tracker()).toEqual({ value: 1 });
            expect(updates).toBe(2);
            counter$.next({ value: 1 }); // same value as before
            expect(tracker()).toEqual({ value: 1 });
            expect(updates).toBe(2); // no downstream changes, since value was equal.
            counter$.next({ value: 2 });
            expect(tracker()).toEqual({ value: 2 });
            expect(updates).toBe(3);
        }));
        it('should update when values are reference equal but equality function says otherwise', test(() => {
            const numsSet = new Set();
            const nums$ = new rxjs_1.BehaviorSubject(numsSet);
            const nums = (0, src_1.toSignal)(nums$, {
                requireSync: true,
                equal: () => false,
            });
            let updates = 0;
            const tracker = (0, core_1.computed)(() => {
                updates++;
                return Array.from(nums().values());
            });
            expect(tracker()).toEqual([]);
            numsSet.add(1);
            nums$.next(numsSet); // same value as before
            expect(tracker()).toEqual([1]);
            expect(updates).toBe(2);
        }));
    });
    describe('in a @Component', () => {
        it('should support `toSignal` as a class member initializer', () => {
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{counter()}}',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        // Component creation should not run inside the template effect/consumer,
                        // hence using `toSignal` should be allowed/supported.
                        this.counter$ = new rxjs_1.Subject();
                        this.counter = (0, src_1.toSignal)(this.counter$);
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
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('');
            fixture.componentInstance.counter$.next(2);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('2');
        });
    });
    describe('type tests', () => {
        const src = new rxjs_1.Subject();
        it('should allow empty array initial values', test(() => {
            const res = (0, src_1.toSignal)(src, { initialValue: [] });
            expect(res).toBeDefined();
        }));
        it('should allow literal types', test(() => {
            const res = (0, src_1.toSignal)(src, { initialValue: 'cat' });
            expect(res).toBeDefined();
        }));
        it('should not allow initial values outside of the observable type', test(() => {
            // @ts-expect-error
            const res = (0, src_1.toSignal)(src, { initialValue: 'cow' });
            expect(res).toBeDefined();
        }));
        it('allows null as an initial value', test(() => {
            const res = (0, src_1.toSignal)(src, { initialValue: null });
            const res2 = res;
            // @ts-expect-error
            const res3 = res;
            expect(res2).toBeDefined();
            expect(res3).toBeDefined();
        }));
        it('allows undefined as an initial value', test(() => {
            const res = (0, src_1.toSignal)(src, { initialValue: undefined });
            const res2 = res;
            // @ts-expect-error
            const res3 = res;
            expect(res2).toBeDefined();
            expect(res3).toBeDefined();
        }));
    });
});
function test(fn) {
    return () => __awaiter(this, void 0, void 0, function* () {
        const injector = core_1.Injector.create({
            providers: [{ provide: core_1.EnvironmentInjector, useFactory: () => injector }],
        });
        try {
            return yield (0, core_1.runInInjectionContext)(injector, fn);
        }
        finally {
            injector.destroy();
        }
    });
}
