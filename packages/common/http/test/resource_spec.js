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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../index");
const testing_2 = require("../testing");
describe('httpResource', () => {
    beforeEach(() => {
        globalThis['ngServerMode'] = isNode;
    });
    afterEach(() => {
        globalThis['ngServerMode'] = undefined;
    });
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ providers: [(0, index_1.provideHttpClient)(), (0, testing_2.provideHttpClientTesting)()] });
    });
    it('should throw if used outside injection context', () => {
        expect(() => (0, index_1.httpResource)(() => '/data')).toThrowMatching((thrown) => thrown.message.includes('httpResource() can only be used within an injection context'));
    });
    it('should send a basic request', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = (0, index_1.httpResource)(() => '/data', { injector: testing_1.TestBed.inject(core_1.Injector) });
        testing_1.TestBed.tick();
        const req = backend.expectOne('/data');
        req.flush([]);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual([]);
    }));
    it('should be reactive in its request URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = (0, core_1.signal)(0);
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = (0, index_1.httpResource)(() => `/data/${id()}`, { injector: testing_1.TestBed.inject(core_1.Injector) });
        testing_1.TestBed.tick();
        const req1 = backend.expectOne('/data/0');
        req1.flush(0);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual(0);
        id.set(1);
        testing_1.TestBed.tick();
        const req2 = backend.expectOne('/data/1');
        req2.flush(1);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual(1);
    }));
    it('should not make backend requests if the request is undefined', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = (0, core_1.signal)(0);
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = (0, index_1.httpResource)(() => (id() !== 1 ? `/data/${id()}` : undefined), {
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        testing_1.TestBed.tick();
        backend.expectOne('/data/0').flush(0);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual(0);
        id.set(1);
        testing_1.TestBed.tick();
        // Verify no requests have been made.
        backend.verify({ ignoreCancelled: false });
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        backend.verify({ ignoreCancelled: false });
        id.set(2);
        testing_1.TestBed.tick();
        backend.expectOne('/data/2').flush(2);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toBe(2);
    }));
    it('should support the suite of HttpRequest APIs', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = (0, index_1.httpResource)(() => ({
            url: '/data',
            method: 'POST',
            body: { message: 'Hello, backend!' },
            headers: {
                'X-Special': 'true',
            },
            params: {
                'fast': 'yes',
            },
            withCredentials: true,
        }), { injector: testing_1.TestBed.inject(core_1.Injector) });
        testing_1.TestBed.tick();
        const req = backend.expectOne('/data?fast=yes');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ message: 'Hello, backend!' });
        expect(req.request.headers.get('X-Special')).toBe('true');
        expect(req.request.withCredentials).toBe(true);
        req.flush([]);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual([]);
    }));
    it('should return response headers & status when resolved', () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = (0, index_1.httpResource)(() => '/data', { injector: testing_1.TestBed.inject(core_1.Injector) });
        testing_1.TestBed.tick();
        const req = backend.expectOne('/data');
        req.flush([], {
            headers: {
                'X-Special': '123',
            },
        });
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual([]);
        expect((_c = res.headers()) === null || _c === void 0 ? void 0 : _c.get('X-Special')).toBe('123');
        expect(res.statusCode()).toBe(200);
    }));
    it('should return response headers & status when request errored', () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = (0, index_1.httpResource)(() => '/data', { injector: testing_1.TestBed.inject(core_1.Injector) });
        testing_1.TestBed.tick();
        const req = backend.expectOne('/data');
        req.flush([], {
            headers: {
                'X-Special': '123',
            },
            status: 429,
            statusText: 'Too many requests',
        });
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.error().error).toEqual([]);
        expect((_c = res.headers()) === null || _c === void 0 ? void 0 : _c.get('X-Special')).toBe('123');
        expect(res.statusCode()).toBe(429);
    }));
    it('should support progress events', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = (0, index_1.httpResource)(() => ({
            url: '/data',
            reportProgress: true,
        }), { injector: testing_1.TestBed.inject(core_1.Injector) });
        testing_1.TestBed.tick();
        const req = backend.expectOne('/data');
        req.event({
            type: index_1.HttpEventType.DownloadProgress,
            loaded: 100,
            total: 200,
        });
        expect(res.progress()).toEqual({
            type: index_1.HttpEventType.DownloadProgress,
            loaded: 100,
            total: 200,
        });
        req.flush([]);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual([]);
    }));
    it('should pass all request parameters', () => {
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const CTX_TOKEN = new index_1.HttpContextToken(() => 'value');
        const res = (0, index_1.httpResource)(() => ({
            url: '/data',
            params: {
                'fast': 'yes',
            },
            responseType: 'text', // This one is not overwritten (and no excess property check from ts)
            headers: {
                'X-Tag': 'alpha,beta',
            },
            reportProgress: true,
            context: new index_1.HttpContext().set(CTX_TOKEN, 'bar'),
            withCredentials: true,
            transferCache: { includeHeaders: ['Y-Tag'] },
        }), {
            injector: testing_1.TestBed.inject(core_1.Injector),
        });
        testing_1.TestBed.tick();
        const req = testing_1.TestBed.inject(testing_2.HttpTestingController).expectOne('/data?fast=yes');
        expect(req.request.headers.get('X-Tag')).toEqual('alpha,beta');
        expect(req.request.responseType).toEqual('json');
        expect(req.request.withCredentials).toEqual(true);
        expect(req.request.context.get(CTX_TOKEN)).toEqual('bar');
        expect(req.request.reportProgress).toEqual(true);
        expect(req.request.transferCache).toEqual({ includeHeaders: ['Y-Tag'] });
    });
    it('should allow mapping data to an arbitrary type', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = (0, index_1.httpResource)(() => ({
            url: '/data',
            reportProgress: true,
        }), {
            injector: testing_1.TestBed.inject(core_1.Injector),
            parse: (value) => JSON.stringify(value),
        });
        testing_1.TestBed.tick();
        const req = backend.expectOne('/data');
        req.flush([1, 2, 3]);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual('[1,2,3]');
    }));
    it('should allow defining an equality function', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = (0, index_1.httpResource)(() => '/data', {
            injector: testing_1.TestBed.inject(core_1.Injector),
            equal: (_a, _b) => true,
        });
        testing_1.TestBed.tick();
        const req = backend.expectOne('/data');
        req.flush(1);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual(1);
        res.value.set(5);
        expect(res.value()).toBe(1); // equality blocked writes
    }));
    it('should support text responses', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = index_1.httpResource.text(() => ({
            url: '/data',
            reportProgress: true,
        }), { injector: testing_1.TestBed.inject(core_1.Injector) });
        testing_1.TestBed.tick();
        const req = backend.expectOne('/data');
        req.flush('[1,2,3]');
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toEqual('[1,2,3]');
    }));
    it('should support ArrayBuffer responses', () => __awaiter(void 0, void 0, void 0, function* () {
        const backend = testing_1.TestBed.inject(testing_2.HttpTestingController);
        const res = index_1.httpResource.arrayBuffer(() => ({
            url: '/data',
            reportProgress: true,
        }), { injector: testing_1.TestBed.inject(core_1.Injector) });
        testing_1.TestBed.tick();
        const req = backend.expectOne('/data');
        const buffer = new ArrayBuffer();
        req.flush(buffer);
        yield testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        expect(res.value()).toBe(buffer);
    }));
});
