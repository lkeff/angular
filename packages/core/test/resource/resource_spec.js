"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
class MockBackend {
    constructor() {
        this.pending = new Map();
    }
    fetch(request) {
        const p = new Promise((resolve, reject) => {
            this.pending.set(request, { resolve, reject, promise: undefined });
        });
        this.pending.get(request).promise = p;
        return p;
    }
    abort(req) {
        return this.reject(req, 'aborted');
    }
    reject(req, reason) {
        const entry = this.pending.get(req);
        if (entry) {
            this.pending.delete(req);
            entry.reject(reason);
        }
        return flushMicrotasks();
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPending = Array.from(this.pending.values()).map((pending) => pending.promise);
            for (const [req, { resolve }] of this.pending) {
                resolve(this.prepareResponse(req));
            }
            this.pending.clear();
            yield Promise.all(allPending);
            yield flushMicrotasks();
        });
    }
}
class MockEchoBackend extends MockBackend {
    prepareResponse(request) {
        return request;
    }
}
class MockResponseCountingBackend extends MockBackend {
    constructor() {
        super(...arguments);
        this.counter = 0;
    }
    prepareResponse(request) {
        return request + ':' + this.counter++;
    }
}
describe('resource', () => {
    it('should expose data and status based on reactive request', () => __awaiter(void 0, void 0, void 0, function* () {
        const counter = (0, core_1.signal)(0);
        const backend = new MockEchoBackend();
        const echoResource = (0, core_1.resource)({
            params: () => ({ counter: counter() }),
            loader: (params) => backend.fetch(params.params),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        // a freshly created resource is in the loading state
        expect(echoResource.status()).toBe('loading');
        expect(echoResource.isLoading()).toBeTrue();
        expect(echoResource.hasValue()).toBeFalse();
        expect(echoResource.value()).toBeUndefined();
        expect(echoResource.error()).toBe(undefined);
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('resolved');
        expect(echoResource.isLoading()).toBeFalse();
        expect(echoResource.hasValue()).toBeTrue();
        expect(echoResource.value()).toEqual({ counter: 0 });
        expect(echoResource.error()).toBe(undefined);
        counter.update((c) => c + 1);
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('resolved');
        expect(echoResource.isLoading()).toBeFalse();
        expect(echoResource.hasValue()).toBeTrue();
        expect(echoResource.value()).toEqual({ counter: 1 });
        expect(echoResource.error()).toBe(undefined);
    }));
    it('should report idle status as the previous status on first run', () => __awaiter(void 0, void 0, void 0, function* () {
        let prevStatus;
        (0, core_1.resource)({
            loader: (_a) => __awaiter(void 0, [_a], void 0, function* ({ previous }) {
                // Ensure the loader only runs once.
                expect(prevStatus).toBeUndefined();
                prevStatus = previous.status;
                return true;
            }),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        testing_1.TestBed.tick();
        yield flushMicrotasks();
        expect(prevStatus).toBe('idle');
    }));
    it('should expose errors thrown during resource loading', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = new MockEchoBackend();
        const requestParam = {};
        const echoResource = (0, core_1.resource)({
            params: () => requestParam,
            loader: (params) => backend.fetch(params.params),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        testing_1.TestBed.tick();
        yield backend.reject(requestParam, 'Something went wrong....');
        expect(echoResource.status()).toBe('error');
        expect(echoResource.isLoading()).toBeFalse();
        expect(echoResource.hasValue()).toBeFalse();
        expect(echoResource.value()).toEqual(undefined);
        expect(echoResource.error()).toBe('Something went wrong....');
    }));
    it('should expose errors on reload', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = new MockEchoBackend();
        const counter = (0, core_1.signal)(0);
        const echoResource = (0, core_1.resource)({
            params: () => ({ counter: counter() }),
            loader: (params) => {
                if (params.params.counter % 2 === 0) {
                    return Promise.resolve('ok');
                }
                else {
                    throw new Error('KO');
                }
            },
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('resolved');
        expect(echoResource.isLoading()).toBeFalse();
        expect(echoResource.hasValue()).toBeTrue();
        expect(echoResource.value()).toEqual('ok');
        expect(echoResource.error()).toBe(undefined);
        counter.update((value) => value + 1);
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('error');
        expect(echoResource.isLoading()).toBeFalse();
        expect(echoResource.hasValue()).toBeFalse();
        expect(echoResource.value()).toEqual(undefined);
        expect(echoResource.error()).toEqual(Error('KO'));
    }));
    it('should respond to a request that changes while loading', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const request = (0, core_1.signal)(0);
        let resolve = [];
        const res = (0, core_1.resource)({
            params: request,
            loader: (_a) => __awaiter(void 0, [_a], void 0, function* ({ params }) {
                const p = Promise.withResolvers();
                resolve.push(() => p.resolve(params));
                return p.promise;
            }),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        // Start the load by running the effect inside the resource.
        appRef.tick();
        // We should have a pending load.
        expect(resolve.length).toBe(1);
        // Change the request.
        request.set(1);
        // Resolve the first load.
        resolve[0]();
        yield flushMicrotasks();
        // The resource should still be loading. Ticking (triggering the 2nd effect)
        // should not change the loading status.
        expect(res.status()).toBe('loading');
        appRef.tick();
        expect(res.status()).toBe('loading');
        expect(resolve.length).toBe(2);
        // Resolve the second load.
        (_a = resolve[1]) === null || _a === void 0 ? void 0 : _a.call(resolve);
        yield flushMicrotasks();
        // We should see the resolved value.
        expect(res.status()).toBe('resolved');
        expect(res.value()).toBe(1);
    }));
    it('should return a default value if provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const DEFAULT = [];
        const request = (0, core_1.signal)(0);
        const res = (0, core_1.resource)({
            params: request,
            loader: (_a) => __awaiter(void 0, [_a], void 0, function* ({ params }) {
                if (params === 2) {
                    throw new Error('err');
                }
                return ['data'];
            }),
            defaultValue: DEFAULT,
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        expect(res.value()).toBe(DEFAULT);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).not.toBe(DEFAULT);
        request.set(1);
        expect(res.value()).toBe(DEFAULT);
        request.set(2);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.error()).not.toBeUndefined();
        expect(res.value()).toBe(DEFAULT);
    }));
    it('should _not_ load if the request resolves to undefined', () => {
        const counter = (0, core_1.signal)(0);
        const backend = new MockEchoBackend();
        const echoResource = (0, core_1.resource)({
            params: () => (counter() > 5 ? { counter: counter() } : undefined),
            loader: (params) => backend.fetch(params.params),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        testing_1.TestBed.tick();
        expect(echoResource.status()).toBe('idle');
        expect(echoResource.isLoading()).toBeFalse();
        counter.set(10);
        testing_1.TestBed.tick();
        expect(echoResource.isLoading()).toBeTrue();
    });
    it('should cancel pending requests before starting a new one', () => __awaiter(void 0, void 0, void 0, function* () {
        const counter = (0, core_1.signal)(0);
        const backend = new MockEchoBackend();
        const aborted = [];
        const echoResource = (0, core_1.resource)({
            params: () => ({ counter: counter() }),
            loader: ({ params, abortSignal }) => {
                abortSignal.addEventListener('abort', () => backend.abort(params));
                return backend.fetch(params).catch((reason) => {
                    if (reason === 'aborted') {
                        aborted.push(params);
                    }
                    throw new Error(reason);
                });
            },
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        // start a request without resolving the previous one
        testing_1.TestBed.tick();
        yield Promise.resolve();
        // start a new request and resolve all
        counter.update((c) => c + 1);
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('resolved');
        expect(echoResource.value()).toEqual({ counter: 1 });
        expect(echoResource.error()).toBe(undefined);
        expect(aborted).toEqual([{ counter: 0 }]);
    }));
    it('should cancel pending requests when the resource is destroyed via injector', () => __awaiter(void 0, void 0, void 0, function* () {
        const counter = (0, core_1.signal)(0);
        const backend = new MockEchoBackend();
        const aborted = [];
        const injector = (0, core_1.createEnvironmentInjector)([], testing_1.TestBed.inject(core_1.EnvironmentInjector));
        const echoResource = (0, core_1.resource)({
            params: () => ({ counter: counter() }),
            loader: ({ params, abortSignal }) => {
                abortSignal.addEventListener('abort', () => backend.abort(params));
                return backend.fetch(params).catch((reason) => {
                    if (reason === 'aborted') {
                        aborted.push(params);
                    }
                    throw new Error(reason);
                });
            },
            injector,
        });
        // start a request without resolving the previous one
        testing_1.TestBed.tick();
        yield Promise.resolve();
        injector.destroy();
        yield backend.flush();
        expect(echoResource.status()).toBe('idle');
        expect(echoResource.value()).toBe(undefined);
        expect(echoResource.error()).toBe(undefined);
        expect(aborted).toEqual([{ counter: 0 }]);
    }));
    it('should cancel pending requests when the resource is manually destroyed', () => __awaiter(void 0, void 0, void 0, function* () {
        const counter = (0, core_1.signal)(0);
        const backend = new MockEchoBackend();
        const aborted = [];
        const injector = (0, core_1.createEnvironmentInjector)([], testing_1.TestBed.inject(core_1.EnvironmentInjector));
        const echoResource = (0, core_1.resource)({
            params: () => ({ counter: counter() }),
            loader: ({ params, abortSignal }) => {
                abortSignal.addEventListener('abort', () => backend.abort(params));
                return backend.fetch(params).catch((reason) => {
                    if (reason === 'aborted') {
                        aborted.push(params);
                    }
                    throw new Error(reason);
                });
            },
            injector,
        });
        // start a request without resolving the previous one
        testing_1.TestBed.tick();
        yield Promise.resolve();
        echoResource.destroy();
        yield backend.flush();
        expect(echoResource.status()).toBe('idle');
        expect(echoResource.value()).toBe(undefined);
        expect(echoResource.error()).toBe(undefined);
        expect(aborted).toEqual([{ counter: 0 }]);
    }));
    it('should not respond to reactive state changes in a loader', () => __awaiter(void 0, void 0, void 0, function* () {
        const unrelated = (0, core_1.signal)('a');
        const backend = new MockResponseCountingBackend();
        const res = (0, core_1.resource)({
            params: () => 0,
            loader: (params) => {
                // read reactive state and assure it is _not_ tracked
                unrelated();
                return backend.fetch(params.params);
            },
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(res.value()).toBe('0:0');
        unrelated.set('b');
        testing_1.TestBed.tick();
        // there is no chang in the status
        expect(res.status()).toBe('resolved');
        yield backend.flush();
        // there is no chang in the value
        expect(res.value()).toBe('0:0');
    }));
    it('should allow setting local state', () => __awaiter(void 0, void 0, void 0, function* () {
        const counter = (0, core_1.signal)(0);
        const backend = new MockEchoBackend();
        const echoResource = (0, core_1.resource)({
            params: () => ({ counter: counter() }),
            loader: (params) => backend.fetch(params.params),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('resolved');
        expect(echoResource.isLoading()).toBeFalse();
        expect(echoResource.value()).toEqual({ counter: 0 });
        expect(echoResource.error()).toBe(undefined);
        echoResource.value.set({ counter: 100 });
        expect(echoResource.status()).toBe('local');
        expect(echoResource.isLoading()).toBeFalse();
        expect(echoResource.hasValue()).toBeTrue();
        expect(echoResource.value()).toEqual({ counter: 100 });
        expect(echoResource.error()).toBe(undefined);
        counter.set(1);
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('resolved');
        expect(echoResource.value()).toEqual({ counter: 1 });
        expect(echoResource.error()).toBe(undefined);
        // state setter is also exposed on the resource directly
        echoResource.set({ counter: 200 });
        expect(echoResource.status()).toBe('local');
        expect(echoResource.hasValue()).toBeTrue();
        expect(echoResource.value()).toEqual({ counter: 200 });
    }));
    it('should allow re-fetching data', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = new MockResponseCountingBackend();
        const res = (0, core_1.resource)({
            params: () => 0,
            loader: (params) => backend.fetch(params.params),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(res.status()).toBe('resolved');
        expect(res.value()).toBe('0:0');
        expect(res.error()).toBe(undefined);
        res.reload();
        expect(res.status()).toBe('reloading');
        expect(res.value()).toBe('0:0');
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(res.status()).toBe('resolved');
        expect(res.isLoading()).toBeFalse();
        expect(res.value()).toBe('0:1');
        expect(res.error()).toBe(undefined);
        // calling refresh multiple times should _not_ result in multiple requests
        res.reload();
        testing_1.TestBed.tick();
        res.reload();
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(res.value()).toBe('0:2');
    }));
    it('should respect provided equality function for the results signal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (0, core_1.resource)({
            loader: () => __awaiter(void 0, void 0, void 0, function* () { return 0; }),
            equal: (a, b) => true,
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        res.value.set(5);
        expect(res.status()).toBe('local');
        expect(res.value()).toBe(5);
        expect(res.error()).toBe(undefined);
        res.value.set(10);
        expect(res.status()).toBe('local');
        expect(res.value()).toBe(5); // equality blocked writes
        expect(res.error()).toBe(undefined);
    }));
    it('should convert writable resource to its read-only version', () => {
        const res = (0, core_1.resource)({
            loader: () => __awaiter(void 0, void 0, void 0, function* () { return 0; }),
            equal: (a, b) => true,
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        const readonlyRes = res.asReadonly();
        // @ts-expect-error
        readonlyRes.asReadonly;
        // @ts-expect-error
        readonlyRes.value.set;
    });
    it('should synchronously change states', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = (0, core_1.signal)(undefined);
        const backend = new MockEchoBackend();
        const echoResource = (0, core_1.resource)({
            params: request,
            loader: (params) => backend.fetch(params.params),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        // Idle to start.
        expect(echoResource.status()).toBe('idle');
        // Switch to loading state should be synchronous.
        request.set(1);
        expect(echoResource.status()).toBe('loading');
        // And back to idle.
        request.set(undefined);
        expect(echoResource.status()).toBe('idle');
        // Allow the load to proceed.
        request.set(2);
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('resolved');
        // Reload state should be synchronous.
        echoResource.reload();
        expect(echoResource.status()).toBe('reloading');
        // Back to idle.
        request.set(undefined);
        expect(echoResource.status()).toBe('idle');
    }));
    it('set() should abort a pending load', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = (0, core_1.signal)(1);
        const backend = new MockEchoBackend();
        const echoResource = (0, core_1.resource)({
            params: request,
            loader: (params) => backend.fetch(params.params),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        // Fully resolve the resource to start.
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('resolved');
        // Trigger loading state.
        request.set(2);
        expect(echoResource.status()).toBe('loading');
        // Set the resource to a new value.
        echoResource.set(3);
        // Now run the effect, which should be a no-op as the resource was set to a local value.
        testing_1.TestBed.tick();
        // We should still be in local state.
        expect(echoResource.status()).toBe('local');
        expect(echoResource.value()).toBe(3);
        // Flush the resource
        yield backend.flush();
        yield appRef.whenStable();
        // We should still be in local state.
        expect(echoResource.status()).toBe('local');
        expect(echoResource.value()).toBe(3);
    }));
    it('set() should abort a pending reload', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = (0, core_1.signal)(1);
        const backend = new MockEchoBackend();
        const echoResource = (0, core_1.resource)({
            params: request,
            loader: (params) => backend.fetch(params.params),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        // Fully resolve the resource to start.
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('resolved');
        // Trigger reloading state.
        echoResource.reload();
        expect(echoResource.status()).toBe('reloading');
        // Set the resource to a new value.
        echoResource.set(3);
        // Now run the effect, which should be a no-op as the resource was set to a local value.
        testing_1.TestBed.tick();
        // We should still be in local state.
        expect(echoResource.status()).toBe('local');
        expect(echoResource.value()).toBe(3);
        // Flush the resource
        yield backend.flush();
        yield appRef.whenStable();
        // We should still be in local state.
        expect(echoResource.status()).toBe('local');
        expect(echoResource.value()).toBe(3);
    }));
    it('should allow streaming', () => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const res = (0, core_1.resource)({
            stream: () => __awaiter(void 0, void 0, void 0, function* () { return (0, core_1.signal)({ value: 'done' }); }),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        yield appRef.whenStable();
        expect(res.status()).toBe('resolved');
        expect(res.value()).toBe('done');
    }));
    it('should error via error()', () => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const res = (0, core_1.resource)({
            stream: () => __awaiter(void 0, void 0, void 0, function* () { return (0, core_1.signal)({ error: 'fail' }); }),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        yield appRef.whenStable();
        expect(res.status()).toBe('error');
        expect(res.error()).toBe('fail');
    }));
    it('should transition across streamed states', () => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const stream = (0, core_1.signal)({ value: 1 });
        const res = (0, core_1.resource)({
            stream: () => __awaiter(void 0, void 0, void 0, function* () { return stream; }),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        yield appRef.whenStable();
        stream.set({ value: 2 });
        expect(res.value()).toBe(2);
        stream.set({ value: 3 });
        expect(res.value()).toBe(3);
        stream.set({ error: 'fail' });
        expect(res.error()).toBe('fail');
        stream.set({ value: 4 });
        expect(res.value()).toBe(4);
    }));
    it('should not accept new values/errors after a request is cancelled', () => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const stream = (0, core_1.signal)({ value: 0 });
        const request = (0, core_1.signal)(1);
        const res = (0, core_1.resource)({
            params: request,
            stream: (_a) => __awaiter(void 0, [_a], void 0, function* ({ params }) {
                if (params === 1) {
                    return stream;
                }
                else {
                    return (0, core_1.signal)({ value: 0 });
                }
            }),
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        yield appRef.whenStable();
        stream.set({ value: 1 });
        expect(res.value()).toBe(1);
        // Changing the request aborts the previous one.
        request.set(2);
        // The previous set/error functions should no longer result in changes to the resource.
        stream.set({ value: 2 });
        expect(res.value()).toBe(undefined);
        stream.set({ error: 'fail' });
        expect(res.value()).toBe(undefined);
    }));
    it('should interrupt pending request if the same value is set', () => __awaiter(void 0, void 0, void 0, function* () {
        const counter = (0, core_1.signal)(0);
        const backend = new MockEchoBackend();
        const aborted = [];
        const echoResource = (0, core_1.resource)({
            params: () => ({ counter: counter() }),
            loader: ({ params, abortSignal }) => {
                abortSignal.addEventListener('abort', () => backend.abort(params));
                return backend.fetch(params).catch((reason) => {
                    if (reason === 'aborted') {
                        aborted.push(params);
                    }
                    throw new Error(reason);
                });
            },
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        // Start the initial load.
        testing_1.TestBed.tick();
        yield Promise.resolve();
        expect(echoResource.status()).toBe('loading');
        expect(echoResource.value()).toBe(undefined);
        expect(echoResource.error()).toBe(undefined);
        expect(aborted).toEqual([]);
        // Interrupt by setting a value before the request has resolved.
        echoResource.set(null);
        testing_1.TestBed.tick();
        yield backend.flush();
        expect(echoResource.status()).toBe('local');
        expect(echoResource.value()).toBe(null);
        expect(echoResource.error()).toBe(undefined);
        expect(aborted).toEqual([{ counter: 0 }]);
        // Reload the resource to trigger another request.
        echoResource.reload();
        testing_1.TestBed.tick();
        yield Promise.resolve();
        expect(echoResource.status()).toBe('reloading');
        expect(echoResource.value()).toBe(null);
        expect(echoResource.error()).toBe(undefined);
        expect(aborted).toEqual([{ counter: 0 }]);
        // Interrupt the reload with the same value as before.
        echoResource.set(null);
        yield backend.flush();
        expect(echoResource.status()).toBe('local');
        expect(echoResource.value()).toBe(null);
        expect(echoResource.error()).toBe(undefined);
        expect(aborted).toEqual([{ counter: 0 }, { counter: 0 }]);
    }));
});
function flushMicrotasks() {
    return new Promise((resolve) => setTimeout(resolve, 0));
}
