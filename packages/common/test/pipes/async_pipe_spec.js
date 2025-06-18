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
const index_1 = require("../../index");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const rxjs_1 = require("rxjs");
describe('AsyncPipe', () => {
    let pipe;
    let ref;
    function getChangeDetectorRefSpy() {
        return jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck', 'detectChanges']);
    }
    beforeEach(() => {
        ref = getChangeDetectorRefSpy();
        pipe = testing_1.TestBed.runInInjectionContext(() => new index_1.AsyncPipe(ref));
    });
    afterEach(() => {
        pipe.ngOnDestroy(); // Close all subscriptions.
    });
    describe('Observable', () => {
        // only expose methods from the Subscribable interface, to ensure that
        // the implementation does not rely on other methods:
        const wrapSubscribable = (input) => ({
            subscribe(...args) {
                const subscription = input.subscribe.apply(input, args);
                return {
                    unsubscribe() {
                        subscription.unsubscribe();
                    },
                };
            },
        });
        let emitter;
        let subscribable;
        const message = {};
        beforeEach(() => {
            emitter = new core_1.EventEmitter();
            subscribable = wrapSubscribable(emitter);
        });
        describe('transform', () => {
            it('should return null when subscribing to an observable', () => {
                expect(pipe.transform(subscribable)).toBe(null);
            });
            it('should return the latest available value', (done) => {
                pipe.transform(subscribable);
                emitter.emit(message);
                setTimeout(() => {
                    expect(pipe.transform(subscribable)).toEqual(message);
                    done();
                }, 0);
            });
            it('should return same value when nothing has changed since the last call', (done) => {
                pipe.transform(subscribable);
                emitter.emit(message);
                setTimeout(() => {
                    pipe.transform(subscribable);
                    expect(pipe.transform(subscribable)).toBe(message);
                    done();
                }, 0);
            });
            it('should dispose of the existing subscription when subscribing to a new observable', (done) => {
                pipe.transform(subscribable);
                const newEmitter = new core_1.EventEmitter();
                const newSubscribable = wrapSubscribable(newEmitter);
                expect(pipe.transform(newSubscribable)).toBe(null);
                emitter.emit(message);
                // this should not affect the pipe
                setTimeout(() => {
                    expect(pipe.transform(newSubscribable)).toBe(null);
                    done();
                }, 0);
            });
            it('should request a change detection check upon receiving a new value', (done) => {
                pipe.transform(subscribable);
                emitter.emit(message);
                setTimeout(() => {
                    expect(ref.markForCheck).toHaveBeenCalled();
                    done();
                }, 10);
            });
            it('should return value for unchanged NaN', () => {
                emitter.emit(null);
                pipe.transform(subscribable);
                emitter.next(NaN);
                const firstResult = pipe.transform(subscribable);
                const secondResult = pipe.transform(subscribable);
                expect(firstResult).toBeNaN();
                expect(secondResult).toBeNaN();
            });
            it('should not track signal reads in subscriptions', () => {
                const trigger = (0, core_1.signal)(false);
                const obs = new rxjs_1.Observable(() => {
                    // Whenever `obs` is subscribed, synchronously read `trigger`.
                    trigger();
                });
                let trackCount = 0;
                const tracker = (0, core_1.computed)(() => {
                    // Subscribe to `obs` within this `computed`. If the subscription side effect runs
                    // within the computed, then changes to `trigger` will invalidate this computed.
                    pipe.transform(obs);
                    // The computed returns how many times it's run.
                    return ++trackCount;
                });
                expect(tracker()).toBe(1);
                trigger.set(true);
                expect(tracker()).toBe(1);
            });
        });
        describe('ngOnDestroy', () => {
            it('should do nothing when no subscription', () => {
                expect(() => pipe.ngOnDestroy()).not.toThrow();
            });
            it('should dispose of the existing subscription', (done) => {
                pipe.transform(subscribable);
                pipe.ngOnDestroy();
                emitter.emit(message);
                setTimeout(() => {
                    expect(pipe.transform(subscribable)).toBe(null);
                    done();
                }, 0);
            });
        });
    });
    describe('Subscribable', () => {
        it('should infer the type from the subscribable', () => {
            var _a;
            const emitter = new core_1.EventEmitter();
            // The following line will fail to compile if the type cannot be inferred.
            const name = (_a = pipe.transform(emitter)) === null || _a === void 0 ? void 0 : _a.name;
        });
    });
    describe('Promise', () => {
        const message = {};
        let resolve;
        let reject;
        let promise;
        beforeEach(() => {
            promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
        });
        describe('transform', () => {
            it('should return null when subscribing to a promise', () => {
                expect(pipe.transform(promise)).toBe(null);
            });
            it('should return the latest available value', () => __awaiter(void 0, void 0, void 0, function* () {
                pipe.transform(promise);
                resolve(message);
                yield promise;
                expect(pipe.transform(promise)).toEqual(message);
            }));
            it('should return value when nothing has changed since the last call', () => __awaiter(void 0, void 0, void 0, function* () {
                pipe.transform(promise);
                resolve(message);
                yield promise;
                pipe.transform(promise);
                expect(pipe.transform(promise)).toBe(message);
            }));
            it('should report rejections to error handler', () => __awaiter(void 0, void 0, void 0, function* () {
                const spy = spyOn(testing_1.TestBed.inject(core_1.ErrorHandler), 'handleError');
                pipe.transform(promise);
                reject(message);
                try {
                    yield promise;
                }
                catch (_a) { }
                expect(spy).toHaveBeenCalledWith(message);
            }));
            it('should dispose of the existing subscription when subscribing to a new promise', () => __awaiter(void 0, void 0, void 0, function* () {
                pipe.transform(promise);
                const newPromise = new Promise(() => { });
                expect(pipe.transform(newPromise)).toBe(null);
                resolve(message);
                yield promise;
                expect(pipe.transform(promise)).toBe(null);
            }));
            it('should request a change detection check upon receiving a new value', () => __awaiter(void 0, void 0, void 0, function* () {
                pipe.transform(promise);
                resolve(message);
                yield promise;
                expect(ref.markForCheck).toHaveBeenCalled();
            }));
            describe('ngOnDestroy', () => {
                it('should do nothing when no source', () => {
                    expect(() => pipe.ngOnDestroy()).not.toThrow();
                });
                it('should dispose of the existing source', () => __awaiter(void 0, void 0, void 0, function* () {
                    pipe.transform(promise);
                    expect(pipe.transform(promise)).toBe(null);
                    resolve(message);
                    yield promise;
                    expect(pipe.transform(promise)).toEqual(message);
                    pipe.ngOnDestroy();
                    expect(pipe.transform(promise)).toBe(null);
                }));
                it('should ignore signals after the pipe has been destroyed', () => __awaiter(void 0, void 0, void 0, function* () {
                    pipe.transform(promise);
                    expect(pipe.transform(promise)).toBe(null);
                    pipe.ngOnDestroy();
                    resolve(message);
                    yield promise;
                    expect(pipe.transform(promise)).toBe(null);
                }));
            });
        });
    });
    describe('PromiseLike', () => {
        it('should infer the type from the subscribable', () => {
            var _a;
            const promiseLike = { then: (resolve) => resolve({ name: 'T' }) };
            // The following line will fail to compile if the type cannot be inferred.
            const name = (_a = pipe.transform(promiseLike)) === null || _a === void 0 ? void 0 : _a.name;
        });
    });
    describe('null', () => {
        it('should return null when given null', () => {
            expect(pipe.transform(null)).toEqual(null);
        });
    });
    describe('undefined', () => {
        it('should return null when given undefined', () => {
            expect(pipe.transform(undefined)).toEqual(null);
        });
    });
    describe('other types', () => {
        it('should throw when given an invalid object', () => {
            expect(() => pipe.transform('some bogus object')).toThrowError();
        });
    });
    it('should be available as a standalone pipe', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.AsyncPipe],
                    template: '{{ value | async }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = (0, rxjs_1.of)('foo');
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
        fixture.detectChanges();
        const content = fixture.nativeElement.textContent;
        expect(content).toBe('foo');
    });
});
