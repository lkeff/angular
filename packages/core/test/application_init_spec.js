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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("../src/core");
const rxjs_1 = require("rxjs");
const testing_1 = require("../testing");
describe('ApplicationInitStatus', () => {
    let status;
    const runInitializers = () => 
    // Cast to `any` to access an internal function for testing purposes.
    status.runInitializers();
    describe('no initializers', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ providers: [{ provide: core_1.APP_INITIALIZER, useValue: [] }] });
            status = testing_1.TestBed.inject(core_1.ApplicationInitStatus);
        });
        it('should return true for `done`', () => {
            runInitializers();
            expect(status.done).toBe(true);
        });
        it('should return a promise that resolves immediately for `donePromise`', () => __awaiter(void 0, void 0, void 0, function* () {
            runInitializers();
            yield status.donePromise;
            expect(status.done).toBe(true);
        }));
    });
    describe('with async promise initializers', () => {
        let resolve;
        let reject;
        let promise;
        let initFnInvoked = false;
        beforeEach(() => {
            promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.APP_INITIALIZER, useValue: [() => promise] }],
            });
            status = testing_1.TestBed.inject(core_1.ApplicationInitStatus);
        });
        it('should update the status once all async promise initializers are done', () => __awaiter(void 0, void 0, void 0, function* () {
            runInitializers();
            setTimeout(() => {
                initFnInvoked = true;
                resolve(null);
            });
            expect(status.done).toBe(false);
            yield status.donePromise;
            expect(status.done).toBe(true);
            expect(initFnInvoked).toBe(true);
        }));
        it('should handle a case when promise is rejected', () => __awaiter(void 0, void 0, void 0, function* () {
            runInitializers();
            setTimeout(() => {
                initFnInvoked = true;
                reject();
            });
            expect(status.done).toBe(false);
            try {
                yield status.donePromise;
                fail('donePromise should have been rejected when promise is rejected');
            }
            catch (_a) {
                expect(status.done).toBe(false);
                expect(initFnInvoked).toBe(true);
            }
        }));
    });
    describe('with app initializers represented using observables', () => {
        let subscriber;
        let initFnInvoked = false;
        beforeEach(() => {
            const observable = new rxjs_1.Observable((res) => {
                subscriber = res;
            });
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.APP_INITIALIZER, useValue: [() => observable] }],
            });
            status = testing_1.TestBed.inject(core_1.ApplicationInitStatus);
        });
        it('should update the status once all async observable initializers are completed', () => __awaiter(void 0, void 0, void 0, function* () {
            runInitializers();
            setTimeout(() => {
                initFnInvoked = true;
                subscriber.complete();
            });
            expect(status.done).toBe(false);
            yield status.donePromise;
            expect(status.done).toBe(true);
            expect(initFnInvoked).toBe(true);
        }));
        it('should update the status once all async observable initializers emitted and completed', () => __awaiter(void 0, void 0, void 0, function* () {
            runInitializers();
            subscriber.next('one');
            subscriber.next('two');
            setTimeout(() => {
                initFnInvoked = true;
                subscriber.complete();
            });
            yield status.donePromise;
            expect(status.done).toBe(true);
            expect(initFnInvoked).toBe(true);
        }));
        it('should update the status if all async observable initializers are completed synchronously', () => __awaiter(void 0, void 0, void 0, function* () {
            // Create a status instance using an initializer that returns the `EMPTY` Observable
            // which completes synchronously upon subscription.
            testing_1.TestBed.resetTestingModule();
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.APP_INITIALIZER, useValue: [() => rxjs_1.EMPTY] }],
            });
            status = testing_1.TestBed.inject(core_1.ApplicationInitStatus);
            runInitializers();
            // Although the Observable completes synchronously, we still queue a promise for
            // simplicity. This means that the `done` flag will not be `true` immediately, even
            // though there was not actually any asynchronous activity.
            expect(status.done).toBe(false);
            yield status.donePromise;
            expect(status.done).toBe(true);
        }));
        it('should handle a case when observable emits an error', () => __awaiter(void 0, void 0, void 0, function* () {
            runInitializers();
            setTimeout(() => {
                initFnInvoked = true;
                subscriber.error();
            });
            expect(status.done).toBe(false);
            try {
                yield status.donePromise;
                fail('donePromise should have been rejected when observable emits an error');
            }
            catch (_a) {
                expect(status.done).toBe(false);
                expect(initFnInvoked).toBe(true);
            }
        }));
    });
    describe('wrong initializers', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.APP_INITIALIZER, useValue: 'notAnArray' }],
            });
        });
        it('should throw', () => {
            expect(() => testing_1.TestBed.inject(core_1.ApplicationInitStatus)).toThrowError('NG0209: Unexpected type of the `APP_INITIALIZER` token value ' +
                `(expected an array, but got string). ` +
                'Please check that the `APP_INITIALIZER` token is configured as a ' +
                '`multi: true` provider. Find more at https://angular.dev/errors/NG0209');
        });
    });
    describe('provideAppInitializer', () => {
        it('should call the provided function when app is initialized', () => __awaiter(void 0, void 0, void 0, function* () {
            let isInitialized = false;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, core_1.provideAppInitializer)(() => {
                        isInitialized = true;
                    }),
                ],
            });
            expect(isInitialized).toBeFalse();
            yield initApp();
            expect(isInitialized).toBeTrue();
        }));
        it('should be able to inject dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
            const TEST_TOKEN = new core_1.InjectionToken('TEST_TOKEN', {
                providedIn: 'root',
                factory: () => 'test',
            });
            let injectedValue;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, core_1.provideAppInitializer)(() => {
                        injectedValue = (0, core_1.inject)(TEST_TOKEN);
                    }),
                ],
            });
            yield initApp();
            expect(injectedValue).toBe('test');
        }));
        it('should handle async initializer', () => __awaiter(void 0, void 0, void 0, function* () {
            let isInitialized = false;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, core_1.provideAppInitializer)(() => __awaiter(void 0, void 0, void 0, function* () {
                        yield new Promise((resolve) => setTimeout(resolve));
                        isInitialized = true;
                    })),
                ],
            });
            yield initApp();
            expect(isInitialized).toBeTrue();
        }));
    });
});
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield testing_1.TestBed.inject(core_1.ApplicationInitStatus).donePromise;
    });
}
/**
 * Typing tests.
 */
let Test = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            // @ts-expect-error: `provideAppInitializer()` should not work with Component.providers, as it
            // wouldn't be executed anyway.
            providers: [(0, core_1.provideAppInitializer)(() => { })],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Test = _classThis = class {
    };
    __setFunctionName(_classThis, "Test");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Test = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Test = _classThis;
})();
