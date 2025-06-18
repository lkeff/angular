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
const transfer_state_1 = require("@angular/core/src/transfer_state");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/private/testing");
const rxjs_1 = require("rxjs");
const public_api_1 = require("../public_api");
const transfer_cache_1 = require("../src/transfer_cache");
const testing_3 = require("../testing");
const platform_id_1 = require("../../src/platform_id");
describe('TransferCache', () => {
    let SomeComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'test-app-http',
                template: 'hello',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SomeComponent = _classThis = class {
        };
        __setFunctionName(_classThis, "SomeComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SomeComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SomeComponent = _classThis;
    })();
    describe('withHttpTransferCache', () => {
        let isStable;
        function makeRequestAndExpectOne(url, body, params) {
            var _a;
            let response;
            testing_1.TestBed.inject(public_api_1.HttpClient)
                .request((_a = params === null || params === void 0 ? void 0 : params.method) !== null && _a !== void 0 ? _a : 'GET', url, params)
                .subscribe((r) => (response = r));
            testing_1.TestBed.inject(testing_3.HttpTestingController).expectOne(url).flush(body, { headers: params === null || params === void 0 ? void 0 : params.headers });
            return response;
        }
        function makeRequestAndExpectNone(url, method = 'GET', params) {
            let response;
            testing_1.TestBed.inject(public_api_1.HttpClient)
                .request(method, url, Object.assign({ observe: 'response' }, params))
                .subscribe((r) => (response = r));
            testing_1.TestBed.inject(testing_3.HttpTestingController).expectNone(url);
            return response;
        }
        beforeEach(() => {
            globalThis['ngServerMode'] = true;
        });
        afterEach(() => {
            globalThis['ngServerMode'] = undefined;
        });
        beforeEach((0, testing_2.withBody)('<test-app-http></test-app-http>', () => {
            testing_1.TestBed.resetTestingModule();
            isStable = new rxjs_1.BehaviorSubject(false);
            let ApplicationRefPatched = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _classSuper = core_1.ApplicationRef;
                var ApplicationRefPatched = _classThis = class extends _classSuper {
                    get isStable() {
                        return isStable;
                    }
                };
                __setFunctionName(_classThis, "ApplicationRefPatched");
                (() => {
                    var _a;
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ApplicationRefPatched = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ApplicationRefPatched = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [SomeComponent],
                providers: [
                    { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_SERVER_ID },
                    { provide: index_1.DOCUMENT, useFactory: () => document },
                    { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                    (0, transfer_cache_1.withHttpTransferCache)({}),
                    (0, public_api_1.provideHttpClient)(),
                    (0, testing_3.provideHttpClientTesting)(),
                ],
            });
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            appRef.bootstrap(SomeComponent);
        }));
        it('should store HTTP calls in cache when application is not stable', () => {
            makeRequestAndExpectOne('/test', 'foo');
            const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
            const key = (0, transfer_state_1.makeStateKey)(Object.keys(transferState.store)[0]);
            expect(transferState.get(key, null)).toEqual(jasmine.objectContaining({ [transfer_cache_1.BODY]: 'foo' }));
        });
        it('should stop storing HTTP calls in `TransferState` after application becomes stable', (0, testing_1.fakeAsync)(() => {
            makeRequestAndExpectOne('/test-1', 'foo');
            makeRequestAndExpectOne('/test-2', 'buzz');
            isStable.next(true);
            (0, testing_1.flush)();
            makeRequestAndExpectOne('/test-3', 'bar');
            const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
            expect(JSON.parse(transferState.toJson())).toEqual({
                '2400571479': {
                    [transfer_cache_1.BODY]: 'foo',
                    [transfer_cache_1.HEADERS]: {},
                    [transfer_cache_1.STATUS]: 200,
                    [transfer_cache_1.STATUS_TEXT]: 'OK',
                    [transfer_cache_1.REQ_URL]: '/test-1',
                    [transfer_cache_1.RESPONSE_TYPE]: 'json',
                },
                '2400572440': {
                    [transfer_cache_1.BODY]: 'buzz',
                    [transfer_cache_1.HEADERS]: {},
                    [transfer_cache_1.STATUS]: 200,
                    [transfer_cache_1.STATUS_TEXT]: 'OK',
                    [transfer_cache_1.REQ_URL]: '/test-2',
                    [transfer_cache_1.RESPONSE_TYPE]: 'json',
                },
            });
        }));
        it(`should use calls from cache when present and application is not stable`, () => {
            makeRequestAndExpectOne('/test-1', 'foo');
            // Do the same call, this time it should served from cache.
            makeRequestAndExpectNone('/test-1');
        });
        it(`should not use calls from cache when present and application is stable`, (0, testing_1.fakeAsync)(() => {
            makeRequestAndExpectOne('/test-1', 'foo');
            isStable.next(true);
            (0, testing_1.flush)();
            // Do the same call, this time it should go through as application is stable.
            makeRequestAndExpectOne('/test-1', 'foo');
        }));
        it(`should differentiate calls with different parameters`, () => __awaiter(void 0, void 0, void 0, function* () {
            // make calls with different parameters. All of which should be saved in the state.
            makeRequestAndExpectOne('/test-1?foo=1', 'foo');
            makeRequestAndExpectOne('/test-1', 'foo');
            makeRequestAndExpectOne('/test-1?foo=2', 'buzz');
            makeRequestAndExpectNone('/test-1?foo=1');
            yield expectAsync(testing_1.TestBed.inject(public_api_1.HttpClient).get('/test-1?foo=1').toPromise()).toBeResolvedTo('foo');
        }));
        it('should skip cache when specified', () => {
            makeRequestAndExpectOne('/test-1?foo=1', 'foo', { transferCache: false });
            // The previous request wasn't cached so this one can't use the cache
            makeRequestAndExpectOne('/test-1?foo=1', 'foo');
            // But this one will
            makeRequestAndExpectNone('/test-1?foo=1');
        });
        it('should not cache a POST even with filter true specified', () => {
            makeRequestAndExpectOne('/test-1?foo=1', 'post-body', { method: 'POST' });
            // Previous POST request wasn't cached
            makeRequestAndExpectOne('/test-1?foo=1', 'body2', { method: 'POST' });
            // filter => true won't cache neither
            makeRequestAndExpectOne('/test-1?foo=1', 'post-body', { method: 'POST', transferCache: true });
            const response = makeRequestAndExpectOne('/test-1?foo=1', 'body2', { method: 'POST' });
            expect(response).toBe('body2');
        });
        it('should not cache headers', () => __awaiter(void 0, void 0, void 0, function* () {
            // HttpTransferCacheOptions: true = fallback to default = headers won't be cached
            makeRequestAndExpectOne('/test-1?foo=1', 'foo', {
                headers: { foo: 'foo', bar: 'bar' },
                transferCache: true,
            });
            // request returns the cache without any header.
            const response2 = makeRequestAndExpectNone('/test-1?foo=1');
            expect(response2.headers.keys().length).toBe(0);
        }));
        it('should cache with headers', () => __awaiter(void 0, void 0, void 0, function* () {
            // headers are case not sensitive
            makeRequestAndExpectOne('/test-1?foo=1', 'foo', {
                headers: { foo: 'foo', bar: 'bar', 'BAZ': 'baz' },
                transferCache: { includeHeaders: ['foo', 'baz'] },
            });
            const consoleWarnSpy = spyOn(console, 'warn');
            // request returns the cache with only 2 header entries.
            const response = makeRequestAndExpectNone('/test-1?foo=1', 'GET', {
                transferCache: { includeHeaders: ['foo', 'baz'] },
            });
            expect(response.headers.keys().length).toBe(2);
            // foo has been kept
            const foo = response.headers.get('foo');
            expect(foo).toBe('foo');
            // foo wasn't removed, we won't log anything
            expect(consoleWarnSpy.calls.count()).toBe(0);
            // bar has been removed
            response.headers.get('bar');
            response.headers.get('some-other-header');
            expect(consoleWarnSpy.calls.count()).toBe(2);
            response.headers.get('some-other-header');
            // We ensure the warning is only logged once per header method + entry
            expect(consoleWarnSpy.calls.count()).toBe(2);
            response.headers.has('some-other-header');
            // Here the method is different, we get one more call.
            expect(consoleWarnSpy.calls.count()).toBe(3);
        }));
        it('should not cache POST by default', () => {
            makeRequestAndExpectOne('/test-1?foo=1', 'foo', { method: 'POST' });
            makeRequestAndExpectOne('/test-1?foo=1', 'foo', { method: 'POST' });
        });
        // TODO: Investigate why this test is flaky
        it('should cache POST with the transferCache option', () => {
            makeRequestAndExpectOne('/test-1?foo=1', 'foo', { method: 'POST', transferCache: true });
            makeRequestAndExpectNone('/test-1?foo=1', 'POST', { transferCache: true });
            makeRequestAndExpectOne('/test-2?foo=1', 'foo', {
                method: 'POST',
                transferCache: { includeHeaders: [] },
            });
            makeRequestAndExpectNone('/test-2?foo=1', 'POST', { transferCache: true });
        });
        it('should not cache request that requires authorization by default', () => __awaiter(void 0, void 0, void 0, function* () {
            makeRequestAndExpectOne('/test-auth', 'foo', {
                headers: { Authorization: 'Basic YWxhZGRpbjpvcGVuc2VzYW1l' },
            });
            makeRequestAndExpectOne('/test-auth', 'foo');
        }));
        it('should not cache request that requires proxy authorization by default', () => __awaiter(void 0, void 0, void 0, function* () {
            makeRequestAndExpectOne('/test-auth', 'foo', {
                headers: { 'Proxy-Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l' },
            });
            makeRequestAndExpectOne('/test-auth', 'foo');
        }));
        it('should cache POST with the differing body in string form', () => {
            makeRequestAndExpectOne('/test-1', null, { method: 'POST', transferCache: true, body: 'foo' });
            makeRequestAndExpectNone('/test-1', 'POST', { transferCache: true, body: 'foo' });
            makeRequestAndExpectOne('/test-1', null, { method: 'POST', transferCache: true, body: 'bar' });
        });
        it('should cache POST with the differing body in object form', () => {
            makeRequestAndExpectOne('/test-1', null, {
                method: 'POST',
                transferCache: true,
                body: { foo: true },
            });
            makeRequestAndExpectNone('/test-1', 'POST', { transferCache: true, body: { foo: true } });
            makeRequestAndExpectOne('/test-1', null, {
                method: 'POST',
                transferCache: true,
                body: { foo: false },
            });
        });
        it('should cache POST with the differing body in URLSearchParams form', () => {
            makeRequestAndExpectOne('/test-1', null, {
                method: 'POST',
                transferCache: true,
                body: new URLSearchParams('foo=1'),
            });
            makeRequestAndExpectNone('/test-1', 'POST', {
                transferCache: true,
                body: new URLSearchParams('foo=1'),
            });
            makeRequestAndExpectOne('/test-1', null, {
                method: 'POST',
                transferCache: true,
                body: new URLSearchParams('foo=2'),
            });
        });
        describe('caching in browser context', () => {
            beforeEach(() => {
                globalThis['ngServerMode'] = false;
            });
            afterEach(() => {
                globalThis['ngServerMode'] = undefined;
            });
            beforeEach((0, testing_2.withBody)('<test-app-http></test-app-http>', () => {
                testing_1.TestBed.resetTestingModule();
                isStable = new rxjs_1.BehaviorSubject(false);
                let ApplicationRefPatched = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = core_1.ApplicationRef;
                    var ApplicationRefPatched = _classThis = class extends _classSuper {
                        get isStable() {
                            return new rxjs_1.BehaviorSubject(false);
                        }
                    };
                    __setFunctionName(_classThis, "ApplicationRefPatched");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ApplicationRefPatched = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ApplicationRefPatched = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [SomeComponent],
                    providers: [
                        { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID },
                        { provide: index_1.DOCUMENT, useFactory: () => document },
                        { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                        (0, transfer_cache_1.withHttpTransferCache)({}),
                        (0, public_api_1.provideHttpClient)(),
                        (0, testing_3.provideHttpClientTesting)(),
                    ],
                });
                const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
                appRef.bootstrap(SomeComponent);
                isStable = appRef.isStable;
            }));
            it('should skip storing in transfer cache when platform is browser', () => {
                makeRequestAndExpectOne('/test-1?foo=1', 'foo');
                makeRequestAndExpectOne('/test-1?foo=1', 'foo');
            });
        });
        describe('caching with global setting', () => {
            beforeEach((0, testing_2.withBody)('<test-app-http></test-app-http>', () => {
                testing_1.TestBed.resetTestingModule();
                isStable = new rxjs_1.BehaviorSubject(false);
                let ApplicationRefPatched = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = core_1.ApplicationRef;
                    var ApplicationRefPatched = _classThis = class extends _classSuper {
                        get isStable() {
                            return new rxjs_1.BehaviorSubject(false);
                        }
                    };
                    __setFunctionName(_classThis, "ApplicationRefPatched");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ApplicationRefPatched = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ApplicationRefPatched = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [SomeComponent],
                    providers: [
                        { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_SERVER_ID },
                        { provide: index_1.DOCUMENT, useFactory: () => document },
                        { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                        (0, transfer_cache_1.withHttpTransferCache)({
                            filter: (req) => {
                                if (req.url.includes('include')) {
                                    return true;
                                }
                                else if (req.url.includes('exclude')) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            },
                            includeHeaders: ['foo', 'bar'],
                            includePostRequests: true,
                            includeRequestsWithAuthHeaders: true,
                        }),
                        (0, public_api_1.provideHttpClient)(),
                        (0, testing_3.provideHttpClientTesting)(),
                    ],
                });
                const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
                appRef.bootstrap(SomeComponent);
                isStable = appRef.isStable;
            }));
            it('should cache because of global filter', () => {
                makeRequestAndExpectOne('/include?foo=1', 'foo');
                makeRequestAndExpectNone('/include?foo=1');
            });
            it('should not cache because of global filter', () => {
                makeRequestAndExpectOne('/exclude?foo=1', 'foo');
                makeRequestAndExpectOne('/exclude?foo=1', 'foo');
            });
            it(`should cache request that requires authorization when 'includeRequestsWithAuthHeaders' is 'true'`, () => __awaiter(void 0, void 0, void 0, function* () {
                makeRequestAndExpectOne('/test-auth', 'foo', {
                    headers: { Authorization: 'Basic YWxhZGRpbjpvcGVuc2VzYW1l' },
                });
                makeRequestAndExpectNone('/test-auth');
            }));
            it(`should cache request that requires proxy authorization when 'includeRequestsWithAuthHeaders' is 'true'`, () => __awaiter(void 0, void 0, void 0, function* () {
                makeRequestAndExpectOne('/test-auth', 'foo', {
                    headers: { 'Proxy-Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l' },
                });
                makeRequestAndExpectNone('/test-auth');
            }));
            it('should cache a POST request', () => {
                makeRequestAndExpectOne('/include?foo=1', 'post-body', { method: 'POST' });
                // Previous POST request wasn't cached
                const response = makeRequestAndExpectNone('/include?foo=1', 'POST');
                expect(response.body).toBe('post-body');
            });
            it('should cache with headers', () => {
                //  nothing specified, should use global options = callback => include + headers
                makeRequestAndExpectOne('/include?foo=1', 'foo', { headers: { foo: 'foo', bar: 'bar' } });
                // This one was cached with headers
                const response = makeRequestAndExpectNone('/include?foo=1');
                expect(response.headers.keys().length).toBe(2);
            });
            it('should cache without headers because overridden', () => {
                //  nothing specified, should use global options = callback => include + headers
                makeRequestAndExpectOne('/include?foo=1', 'foo', {
                    headers: { foo: 'foo', bar: 'bar' },
                    transferCache: { includeHeaders: [] },
                });
                // This one was cached with headers
                const response = makeRequestAndExpectNone('/include?foo=1');
                expect(response.headers.keys().length).toBe(0);
            });
        });
        describe('caching with public origins', () => {
            beforeEach((0, testing_2.withBody)('<test-app-http></test-app-http>', () => {
                testing_1.TestBed.resetTestingModule();
                isStable = new rxjs_1.BehaviorSubject(false);
                let ApplicationRefPatched = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _classSuper = core_1.ApplicationRef;
                    var ApplicationRefPatched = _classThis = class extends _classSuper {
                        get isStable() {
                            return new rxjs_1.BehaviorSubject(false);
                        }
                    };
                    __setFunctionName(_classThis, "ApplicationRefPatched");
                    (() => {
                        var _a;
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ApplicationRefPatched = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ApplicationRefPatched = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [SomeComponent],
                    providers: [
                        { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_SERVER_ID },
                        { provide: index_1.DOCUMENT, useFactory: () => document },
                        { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                        (0, transfer_cache_1.withHttpTransferCache)({}),
                        (0, public_api_1.provideHttpClient)(),
                        (0, testing_3.provideHttpClientTesting)(),
                        {
                            provide: transfer_cache_1.HTTP_TRANSFER_CACHE_ORIGIN_MAP,
                            useValue: {
                                'http://internal-domain.com:1234': 'https://external-domain.net:443',
                            },
                        },
                    ],
                });
                const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
                appRef.bootstrap(SomeComponent);
                isStable = appRef.isStable;
            }));
            it('should cache with public origin', () => {
                makeRequestAndExpectOne('http://internal-domain.com:1234/test-1?foo=1', 'foo');
                const cachedRequest = makeRequestAndExpectNone('https://external-domain.net:443/test-1?foo=1');
                expect(cachedRequest.url).toBe('https://external-domain.net:443/test-1?foo=1');
            });
            it('should cache normally when there is no mapping defined for the origin', () => {
                makeRequestAndExpectOne('https://other.internal-domain.com:1234/test-1?foo=1', 'foo');
                makeRequestAndExpectNone('https://other.internal-domain.com:1234/test-1?foo=1');
            });
            describe('when the origin map is configured with extra paths', () => {
                beforeEach((0, testing_2.withBody)('<test-app-http></test-app-http>', () => {
                    testing_1.TestBed.resetTestingModule();
                    isStable = new rxjs_1.BehaviorSubject(false);
                    let ApplicationRefPatched = (() => {
                        let _classDecorators = [(0, core_1.Injectable)()];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = core_1.ApplicationRef;
                        var ApplicationRefPatched = _classThis = class extends _classSuper {
                            get isStable() {
                                return new rxjs_1.BehaviorSubject(false);
                            }
                        };
                        __setFunctionName(_classThis, "ApplicationRefPatched");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ApplicationRefPatched = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ApplicationRefPatched = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({
                        declarations: [SomeComponent],
                        providers: [
                            { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_SERVER_ID },
                            { provide: index_1.DOCUMENT, useFactory: () => document },
                            { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                            (0, transfer_cache_1.withHttpTransferCache)({}),
                            (0, public_api_1.provideHttpClient)(),
                            (0, testing_3.provideHttpClientTesting)(),
                            {
                                provide: transfer_cache_1.HTTP_TRANSFER_CACHE_ORIGIN_MAP,
                                useValue: {
                                    'http://internal-domain.com:1234': 'https://external-domain.net:443/path',
                                },
                            },
                        ],
                    });
                    const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
                    appRef.bootstrap(SomeComponent);
                    isStable = appRef.isStable;
                }));
                it('should throw an error when the origin map is configured with extra paths', () => {
                    testing_1.TestBed.inject(public_api_1.HttpClient)
                        .request('GET', 'http://internal-domain.com:1234/path/test-1')
                        .subscribe({
                        error: (error) => {
                            expect(error.message).toBe('NG02804: Angular detected a URL with a path segment in the value provided for the ' +
                                '`HTTP_TRANSFER_CACHE_ORIGIN_MAP` token: https://external-domain.net:443/path. ' +
                                'The map should only contain origins without any other segments.');
                        },
                    });
                });
            });
            describe('on the client', () => {
                beforeEach((0, testing_2.withBody)('<test-app-http></test-app-http>', () => {
                    testing_1.TestBed.resetTestingModule();
                    isStable = new rxjs_1.BehaviorSubject(false);
                    let ApplicationRefPatched = (() => {
                        let _classDecorators = [(0, core_1.Injectable)()];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _classSuper = core_1.ApplicationRef;
                        var ApplicationRefPatched = _classThis = class extends _classSuper {
                            get isStable() {
                                return new rxjs_1.BehaviorSubject(false);
                            }
                        };
                        __setFunctionName(_classThis, "ApplicationRefPatched");
                        (() => {
                            var _a;
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ApplicationRefPatched = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ApplicationRefPatched = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({
                        declarations: [SomeComponent],
                        providers: [
                            { provide: index_1.DOCUMENT, useFactory: () => document },
                            { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                            (0, transfer_cache_1.withHttpTransferCache)({}),
                            (0, public_api_1.provideHttpClient)(),
                            (0, testing_3.provideHttpClientTesting)(),
                            {
                                provide: transfer_cache_1.HTTP_TRANSFER_CACHE_ORIGIN_MAP,
                                useValue: {
                                    'http://internal-domain.com:1234': 'https://external-domain.net:443',
                                },
                            },
                            { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_SERVER_ID },
                        ],
                    });
                    // Make a request on the server to fill the transfer state then reuse it in the browser
                    makeRequestAndExpectOne('http://internal-domain.com:1234/test-1?foo=1', 'foo');
                    const transferState = testing_1.TestBed.inject(transfer_state_1.TransferState);
                    testing_1.TestBed.resetTestingModule();
                    testing_1.TestBed.configureTestingModule({
                        declarations: [SomeComponent],
                        providers: [
                            { provide: index_1.DOCUMENT, useFactory: () => document },
                            { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                            (0, transfer_cache_1.withHttpTransferCache)({}),
                            (0, public_api_1.provideHttpClient)(),
                            (0, testing_3.provideHttpClientTesting)(),
                            {
                                provide: transfer_cache_1.HTTP_TRANSFER_CACHE_ORIGIN_MAP,
                                useValue: {
                                    'http://internal-domain.com:1234': 'https://external-domain.net:443',
                                },
                            },
                            { provide: transfer_state_1.TransferState, useValue: transferState },
                            { provide: core_1.PLATFORM_ID, useValue: platform_id_1.PLATFORM_BROWSER_ID },
                        ],
                    });
                    const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
                    appRef.bootstrap(SomeComponent);
                    isStable = appRef.isStable;
                }));
                it('should throw an error when origin mapping is defined', () => {
                    testing_1.TestBed.inject(public_api_1.HttpClient)
                        .request('GET', 'https://external-domain.net:443/test-1?foo=1')
                        .subscribe({
                        error: (error) => {
                            expect(error.message).toBe('NG02803: Angular detected that the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token is configured and ' +
                                'present in the client side code. Please ensure that this token is only provided in the ' +
                                'server code of the application.');
                        },
                    });
                });
            });
        });
    });
});
