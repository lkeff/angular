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
const testing_1 = require("../../testing");
const rxjs_1 = require("rxjs");
const take_until_destroyed_1 = require("../src/take_until_destroyed");
describe('takeUntilDestroyed', () => {
    it('should complete an observable when the current context is destroyed', () => {
        const injector = core_1.Injector.create({ providers: [] });
        const source$ = new rxjs_1.BehaviorSubject(0);
        const tied$ = (0, core_1.runInInjectionContext)(injector, () => source$.pipe((0, take_until_destroyed_1.takeUntilDestroyed)()));
        let completed = false;
        let last = 0;
        tied$.subscribe({
            next(value) {
                last = value;
            },
            complete() {
                completed = true;
            },
        });
        source$.next(1);
        expect(last).toBe(1);
        injector.destroy();
        expect(completed).toBeTrue();
        source$.next(2);
        expect(last).toBe(1);
    });
    it('should allow a manual DestroyRef to be passed', () => {
        const injector = core_1.Injector.create({ providers: [] });
        const source$ = new rxjs_1.BehaviorSubject(0);
        const tied$ = source$.pipe((0, take_until_destroyed_1.takeUntilDestroyed)(injector.get(core_1.DestroyRef)));
        let completed = false;
        let last = 0;
        tied$.subscribe({
            next(value) {
                last = value;
            },
            complete() {
                completed = true;
            },
        });
        source$.next(1);
        expect(last).toBe(1);
        injector.destroy();
        expect(completed).toBeTrue();
        source$.next(2);
        expect(last).toBe(1);
    });
    it('should unregister listener if observable is unsubscribed', () => {
        const injector = core_1.Injector.create({ providers: [] });
        const destroyRef = injector.get(core_1.DestroyRef);
        const unregisterFn = jasmine.createSpy();
        spyOn(destroyRef, 'onDestroy').and.returnValue(unregisterFn);
        const subscription = new rxjs_1.BehaviorSubject(0).pipe((0, take_until_destroyed_1.takeUntilDestroyed)(destroyRef)).subscribe();
        subscription.unsubscribe();
        expect(unregisterFn).toHaveBeenCalled();
    });
    // https://github.com/angular/angular/issues/54527
    it('should unsubscribe after the current context has already been destroyed', () => __awaiter(void 0, void 0, void 0, function* () {
        const recorder = [];
        // Note that we need a "real" view for this test because, in other cases,
        // `DestroyRef` would resolve to the root injector rather than to the
        // `NodeInjectorDestroyRef`, where `lView` is used.
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
                    this.source$ = new rxjs_1.BehaviorSubject(0);
                }
                ngOnDestroy() {
                    Promise.resolve().then(() => {
                        this.source$
                            .pipe((0, take_until_destroyed_1.takeUntilDestroyed)(this.destroyRef), (0, rxjs_1.finalize)(() => recorder.push('finalize()')))
                            .subscribe((value) => recorder.push(value));
                    });
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.destroy();
        // Wait until the `ngOnDestroy` microtask is run.
        yield Promise.resolve();
        // Ensure the `value` is not recorded, but unsubscribed immediately.
        expect(recorder).toEqual(['finalize()']);
    }));
});
