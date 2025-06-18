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
exports.MockFetchFactory = void 0;
const index_1 = require("../index");
const testing_1 = require("@angular/core/testing");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const public_api_1 = require("../public_api");
const fetch_1 = require("../src/fetch");
function trackEvents(obs) {
    return obs
        .pipe(
    // We don't want the promise to fail on HttpErrorResponse
    (0, operators_1.catchError)((e) => (0, rxjs_1.of)(e)), (0, operators_1.scan)((acc, event) => {
        acc.push(event);
        return acc;
    }, []))
        .toPromise();
}
const TEST_POST = new index_1.HttpRequest('POST', '/test', 'some body', {
    responseType: 'text',
});
const TEST_POST_WITH_JSON_BODY = new index_1.HttpRequest('POST', '/test', { 'some': 'body' }, {
    responseType: 'text',
});
const XSSI_PREFIX = ")]}'\n";
describe('FetchBackend', () => __awaiter(void 0, void 0, void 0, function* () {
    let fetchMock = null;
    let backend = null;
    let fetchSpy;
    function callFetchAndFlush(req) {
        backend.handle(req).pipe((0, operators_1.take)(1)).subscribe();
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'some response');
    }
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [{ provide: fetch_1.FetchFactory, useClass: MockFetchFactory }, fetch_1.FetchBackend],
        });
        fetchMock = testing_1.TestBed.inject(fetch_1.FetchFactory);
        fetchSpy = spyOn(fetchMock, 'fetch').and.callThrough();
        backend = testing_1.TestBed.inject(fetch_1.FetchBackend);
    });
    it('emits status immediately', () => {
        let event;
        // subscribe is sync
        backend
            .handle(TEST_POST)
            .pipe((0, operators_1.take)(1))
            .subscribe((e) => (event = e));
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'some response');
        expect(event.type).toBe(index_1.HttpEventType.Sent);
    });
    it('should not call fetch without a subscribe', () => {
        const handle = backend.handle(TEST_POST);
        expect(fetchSpy).not.toHaveBeenCalled();
        handle.subscribe();
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'some response');
        expect(fetchSpy).toHaveBeenCalled();
    });
    it('should be able to retry', (done) => {
        const handle = backend.handle(TEST_POST);
        // Skipping both HttpSentEvent (from the 1st subscription + retry)
        handle.pipe((0, operators_1.retry)(1), (0, operators_1.skip)(2)).subscribe((response) => {
            expect(response.type).toBe(index_1.HttpEventType.Response);
            expect(response.body).toBe('some response');
            done();
        });
        fetchMock.mockErrorEvent('Error 1');
        fetchMock.resetFetchPromise();
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'some response');
    });
    it('sets method, url, and responseType correctly', () => {
        callFetchAndFlush(TEST_POST);
        expect(fetchMock.request.method).toBe('POST');
        expect(fetchMock.request.url).toBe('/test');
    });
    it('use query params from request', () => {
        const requestWithQuery = new index_1.HttpRequest('GET', '/test', 'some body', {
            params: new public_api_1.HttpParams({ fromObject: { query: 'foobar' } }),
            responseType: 'text',
        });
        callFetchAndFlush(requestWithQuery);
        expect(fetchMock.request.method).toBe('GET');
        expect(fetchMock.request.url).toBe('/test?query=foobar');
    });
    it('sets outgoing body correctly', () => {
        callFetchAndFlush(TEST_POST);
        expect(fetchMock.request.body).toBe('some body');
    });
    it('sets outgoing body correctly when request payload is json', () => {
        callFetchAndFlush(TEST_POST_WITH_JSON_BODY);
        expect(fetchMock.request.body).toBe('{"some":"body"}');
    });
    it('sets outgoing headers, including default headers', () => {
        const post = TEST_POST.clone({
            setHeaders: {
                'Test': 'Test header',
            },
        });
        callFetchAndFlush(post);
        expect(fetchMock.request.headers).toEqual({
            'Test': 'Test header',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'text/plain',
        });
    });
    it('sets outgoing headers, including overriding defaults', () => {
        const setHeaders = {
            'Test': 'Test header',
            'Accept': 'text/html',
            'Content-Type': 'text/css',
        };
        callFetchAndFlush(TEST_POST.clone({ setHeaders }));
        expect(fetchMock.request.headers).toEqual(setHeaders);
    });
    it('should be case insensitive for Content-Type & Accept', () => {
        const setHeaders = {
            'accept': 'text/html',
            'content-type': 'text/css',
        };
        callFetchAndFlush(TEST_POST.clone({ setHeaders }));
        expect(fetchMock.request.headers).toEqual(setHeaders);
    });
    it('passes withCredentials through', () => {
        callFetchAndFlush(TEST_POST.clone({ withCredentials: true }));
        expect(fetchMock.request.credentials).toBe('include');
    });
    it('handles a text response', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise = trackEvents(backend.handle(TEST_POST));
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'some response');
        const events = yield promise;
        expect(events.length).toBe(2);
        expect(events[1].type).toBe(index_1.HttpEventType.Response);
        expect(events[1] instanceof index_1.HttpResponse).toBeTruthy();
        const res = events[1];
        expect(res.body).toBe('some response');
        expect(res.status).toBe(public_api_1.HttpStatusCode.Ok);
        expect(res.statusText).toBe('OK');
    }));
    it('handles a json response', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', JSON.stringify({ data: 'some data' }));
        const events = yield promise;
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.body.data).toBe('some data');
    }));
    it('handles a blank json response', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', '');
        const events = yield promise;
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.body).toBeNull();
    }));
    it('handles a json error response', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        fetchMock.mockFlush(public_api_1.HttpStatusCode.InternalServerError, 'Error', JSON.stringify({ data: 'some data' }));
        const events = yield promise;
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.error.data).toBe('some data');
    }));
    it('handles a json error response with XSSI prefix', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        fetchMock.mockFlush(public_api_1.HttpStatusCode.InternalServerError, 'Error', XSSI_PREFIX + JSON.stringify({ data: 'some data' }));
        const events = yield promise;
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.error.data).toBe('some data');
    }));
    it('handles a json string response', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', JSON.stringify('this is a string'));
        const events = yield promise;
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.body).toEqual('this is a string');
    }));
    it('handles a json response with an XSSI prefix', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', XSSI_PREFIX + JSON.stringify({ data: 'some data' }));
        const events = yield promise;
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.body.data).toBe('some data');
    }));
    it('handles a blob with a mime type', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const promise = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'blob' })));
        const type = 'application/pdf';
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', new Blob(), { 'Content-Type': type });
        const events = yield promise;
        expect(events.length).toBe(2);
        const res = events[1];
        expect((_a = res.body) === null || _a === void 0 ? void 0 : _a.type).toBe(type);
    }));
    it('emits unsuccessful responses via the error path', (done) => {
        backend.handle(TEST_POST).subscribe({
            error: (err) => {
                expect(err instanceof public_api_1.HttpErrorResponse).toBe(true);
                expect(err.error).toBe('this is the error');
                done();
            },
        });
        fetchMock.mockFlush(public_api_1.HttpStatusCode.BadRequest, 'Bad Request', 'this is the error');
    });
    it('emits real errors via the error path', (done) => {
        // Skipping the HttpEventType.Sent that is sent first
        backend
            .handle(TEST_POST)
            .pipe((0, operators_1.skip)(1))
            .subscribe({
            error: (err) => {
                expect(err instanceof public_api_1.HttpErrorResponse).toBe(true);
                expect(err.error instanceof Error).toBeTrue();
                expect(err.url).toBe('/test');
                done();
            },
        });
        fetchMock.mockErrorEvent(new Error('blah'));
    });
    it('emits an error when browser cancels a request', (done) => {
        backend.handle(TEST_POST).subscribe({
            error: (err) => {
                expect(err instanceof public_api_1.HttpErrorResponse).toBe(true);
                expect(err.error instanceof DOMException).toBeTruthy();
                done();
            },
        });
        fetchMock.mockAbortEvent();
    });
    it('should pass keepalive option to fetch', () => {
        const req = new index_1.HttpRequest('GET', '/test', { keepalive: true });
        backend.handle(req).subscribe();
        expect(fetchSpy).toHaveBeenCalledWith('/test', jasmine.objectContaining({
            keepalive: true,
        }));
        fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK');
    });
    describe('progress events', () => {
        it('are emitted for download progress', (done) => {
            backend
                .handle(TEST_POST.clone({ reportProgress: true }))
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.map((event) => event.type)).toEqual([
                    index_1.HttpEventType.Sent,
                    index_1.HttpEventType.ResponseHeader,
                    index_1.HttpEventType.DownloadProgress,
                    index_1.HttpEventType.DownloadProgress,
                    index_1.HttpEventType.DownloadProgress,
                    index_1.HttpEventType.Response,
                ]);
                const [progress1, progress2, response] = [
                    events[2],
                    events[3],
                    events[5],
                ];
                expect(progress1.partialText).toBe('down');
                expect(progress1.loaded).toBe(4);
                expect(progress1.total).toBe(10);
                expect(progress2.partialText).toBe('download');
                expect(progress2.loaded).toBe(8);
                expect(progress2.total).toBe(10);
                expect(response.body).toBe('downloaded');
                done();
            });
            fetchMock.mockProgressEvent(4);
            fetchMock.mockProgressEvent(8);
            fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'downloaded');
        });
        it('include ResponseHeader with headers and status', (done) => {
            backend
                .handle(TEST_POST.clone({ reportProgress: true }))
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.map((event) => event.type)).toEqual([
                    index_1.HttpEventType.Sent,
                    index_1.HttpEventType.ResponseHeader,
                    index_1.HttpEventType.DownloadProgress,
                    index_1.HttpEventType.DownloadProgress,
                    index_1.HttpEventType.Response,
                ]);
                const partial = events[1];
                expect(partial.type).toEqual(index_1.HttpEventType.ResponseHeader);
                expect(partial.headers.get('Content-Type')).toEqual('text/plain');
                expect(partial.headers.get('Test')).toEqual('Test header');
                done();
            });
            fetchMock.response.headers = { 'Test': 'Test header', 'Content-Type': 'text/plain' };
            fetchMock.mockProgressEvent(200);
            fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'Done');
        });
    });
    describe('gets response URL', () => __awaiter(void 0, void 0, void 0, function* () {
        it('from the response URL', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.length).toBe(2);
                expect(events[1].type).toBe(index_1.HttpEventType.Response);
                const response = events[1];
                expect(response.url).toBe('/response/url');
                done();
            });
            fetchMock.response.url = '/response/url';
            fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'Test');
        });
        it('from X-Request-URL header if the response URL is not present', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.length).toBe(2);
                expect(events[1].type).toBe(index_1.HttpEventType.Response);
                const response = events[1];
                expect(response.url).toBe('/response/url');
                done();
            });
            fetchMock.response.headers = { 'X-Request-URL': '/response/url' };
            fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'Test');
        });
        it('falls back on Request.url if neither are available', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.length).toBe(2);
                expect(events[1].type).toBe(index_1.HttpEventType.Response);
                const response = events[1];
                expect(response.url).toBe('/test');
                done();
            });
            fetchMock.mockFlush(public_api_1.HttpStatusCode.Ok, 'OK', 'Test');
        });
    }));
    describe('corrects for quirks', () => __awaiter(void 0, void 0, void 0, function* () {
        it('by normalizing 0 status to 200 if a body is present', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.length).toBe(2);
                expect(events[1].type).toBe(index_1.HttpEventType.Response);
                const response = events[1];
                expect(response.status).toBe(public_api_1.HttpStatusCode.Ok);
                done();
            });
            fetchMock.mockFlush(0, 'CORS 0 status', 'Test');
        });
        it('by leaving 0 status as 0 if a body is not present', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe({
                error: (error) => {
                    expect(error.status).toBe(0);
                    done();
                },
            });
            fetchMock.mockFlush(0, 'CORS 0 status');
        });
    }));
    describe('dynamic global fetch', () => {
        beforeEach(() => {
            testing_1.TestBed.resetTestingModule();
            testing_1.TestBed.configureTestingModule({
                providers: [(0, public_api_1.provideHttpClient)((0, public_api_1.withFetch)())],
            });
        });
        it('should use the current implementation of the global fetch', () => __awaiter(void 0, void 0, void 0, function* () {
            const originalFetch = globalThis.fetch;
            try {
                const fakeFetch = jasmine
                    .createSpy('', () => Promise.resolve(new Response(JSON.stringify({ foo: 'bar' }))))
                    .and.callThrough();
                globalThis.fetch = fakeFetch;
                const client = testing_1.TestBed.inject(public_api_1.HttpClient);
                expect(fakeFetch).not.toHaveBeenCalled();
                let response = yield client.get('').toPromise();
                expect(fakeFetch).toHaveBeenCalled();
                expect(response).toEqual({ foo: 'bar' });
                // We dynamicaly change the implementation of fetch
                const fakeFetch2 = jasmine
                    .createSpy('', () => Promise.resolve(new Response(JSON.stringify({ foo: 'baz' }))))
                    .and.callThrough();
                globalThis.fetch = fakeFetch2;
                response = yield client.get('').toPromise();
                expect(response).toEqual({ foo: 'baz' });
            }
            finally {
                // We need to restore the original fetch implementation, else the tests might become flaky
                globalThis.fetch = originalFetch;
            }
        }));
    });
}));
class MockFetchFactory extends fetch_1.FetchFactory {
    constructor() {
        super(...arguments);
        this.response = new MockFetchResponse();
        this.request = new MockFetchRequest();
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.fetch = (input, init) => {
            this.request.method = init === null || init === void 0 ? void 0 : init.method;
            this.request.url = input;
            this.request.body = init === null || init === void 0 ? void 0 : init.body;
            this.request.headers = init === null || init === void 0 ? void 0 : init.headers;
            this.request.credentials = init === null || init === void 0 ? void 0 : init.credentials;
            if (init === null || init === void 0 ? void 0 : init.signal) {
                init === null || init === void 0 ? void 0 : init.signal.addEventListener('abort', () => {
                    var _a;
                    this.reject();
                    (_a = this.clearWarningTimeout) === null || _a === void 0 ? void 0 : _a.call(this);
                });
            }
            // Fetch uses a Macrotask to keep the NgZone unstable during the fetch
            // If the promise is not resolved/rejected the unit will succeed but the test suite will
            // fail with a timeout
            const timeoutId = setTimeout(() => {
                console.error('*********  You forgot to resolve/reject the promise ********* ');
                this.reject();
            }, 5000);
            this.clearWarningTimeout = () => clearTimeout(timeoutId);
            return this.promise;
        };
    }
    mockFlush(status, statusText, body, headers) {
        var _a;
        (_a = this.clearWarningTimeout) === null || _a === void 0 ? void 0 : _a.call(this);
        if (typeof body === 'string') {
            this.response.setupBodyStream(body);
        }
        else {
            this.response.setBody(body);
        }
        const response = new Response(this.response.stream, {
            statusText,
            headers: Object.assign(Object.assign({}, this.response.headers), (headers !== null && headers !== void 0 ? headers : {})),
        });
        // Have to be set outside the constructor because it might throw
        // RangeError: init["status"] must be in the range of 200 to 599, inclusive
        Object.defineProperty(response, 'status', { value: status });
        if (this.response.url) {
            // url is readonly
            Object.defineProperty(response, 'url', { value: this.response.url });
        }
        this.resolve(response);
    }
    mockProgressEvent(loaded) {
        this.response.progress.push(loaded);
    }
    mockErrorEvent(error) {
        this.reject(error);
    }
    mockAbortEvent() {
        // When `abort()` is called, the fetch() promise rejects with an Error of type DOMException,
        // with name AbortError. see
        // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
        this.reject(new DOMException('', 'AbortError'));
    }
    resetFetchPromise() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
exports.MockFetchFactory = MockFetchFactory;
class MockFetchRequest {
}
class MockFetchResponse {
    constructor() {
        this.headers = {};
        this.progress = [];
        this.sub$ = new rxjs_1.Subject();
        this.stream = new ReadableStream({
            start: (controller) => {
                this.sub$.subscribe({
                    next: (val) => {
                        controller.enqueue(new TextEncoder().encode(val));
                    },
                    complete: () => {
                        controller.close();
                    },
                });
            },
        });
    }
    setBody(body) {
        this.sub$.next(body);
        this.sub$.complete();
    }
    setupBodyStream(body) {
        if (body && this.progress.length) {
            this.headers['content-length'] = `${body.length}`;
            let shift = 0;
            this.progress.forEach((loaded) => {
                this.sub$.next(body.substring(shift, loaded));
                shift = loaded;
            });
            this.sub$.next(body.substring(shift, body.length));
        }
        else {
            this.sub$.next(body);
        }
        this.sub$.complete();
    }
}
