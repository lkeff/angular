"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../src/request");
const response_1 = require("../src/response");
const xhr_1 = require("../src/xhr");
const operators_1 = require("rxjs/operators");
const xhr_mock_1 = require("./xhr_mock");
function trackEvents(obs) {
    const events = [];
    obs.subscribe((event) => events.push(event), (err) => events.push(err));
    return events;
}
const TEST_POST = new request_1.HttpRequest('POST', '/test', 'some body', {
    responseType: 'text',
});
const TEST_POST_WITH_JSON_BODY = new request_1.HttpRequest('POST', '/test', { 'some': 'body' }, {
    responseType: 'text',
});
const XSSI_PREFIX = ")]}'\n";
describe('XhrBackend', () => {
    let factory = null;
    let backend = null;
    beforeEach(() => {
        factory = new xhr_mock_1.MockXhrFactory();
        backend = new xhr_1.HttpXhrBackend(factory);
    });
    it('emits status immediately', () => {
        const events = trackEvents(backend.handle(TEST_POST));
        expect(events.length).toBe(1);
        expect(events[0].type).toBe(response_1.HttpEventType.Sent);
    });
    it('sets method, url, and responseType correctly', () => {
        backend.handle(TEST_POST).subscribe();
        expect(factory.mock.method).toBe('POST');
        expect(factory.mock.responseType).toBe('text');
        expect(factory.mock.url).toBe('/test');
    });
    it('sets outgoing body correctly', () => {
        backend.handle(TEST_POST).subscribe();
        expect(factory.mock.body).toBe('some body');
    });
    it('sets outgoing body correctly when request payload is json', () => {
        backend.handle(TEST_POST_WITH_JSON_BODY).subscribe();
        expect(factory.mock.body).toBe('{"some":"body"}');
    });
    it('sets outgoing headers, including default headers', () => {
        const post = TEST_POST.clone({
            setHeaders: {
                'Test': 'Test header',
            },
        });
        backend.handle(post).subscribe();
        expect(factory.mock.mockHeaders).toEqual({
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
        backend.handle(TEST_POST.clone({ setHeaders })).subscribe();
        expect(factory.mock.mockHeaders).toEqual(setHeaders);
    });
    it('passes withCredentials through', () => {
        backend.handle(TEST_POST.clone({ withCredentials: true })).subscribe();
        expect(factory.mock.withCredentials).toBe(true);
    });
    it('handles a text response', () => {
        const events = trackEvents(backend.handle(TEST_POST));
        factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'some response');
        expect(events.length).toBe(2);
        expect(events[1].type).toBe(response_1.HttpEventType.Response);
        expect(events[1] instanceof response_1.HttpResponse).toBeTruthy();
        const res = events[1];
        expect(res.body).toBe('some response');
        expect(res.status).toBe(response_1.HttpStatusCode.Ok);
        expect(res.statusText).toBe('OK');
    });
    it('handles a json response', () => {
        const events = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', JSON.stringify({ data: 'some data' }));
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.body.data).toBe('some data');
    });
    it('handles a blank json response', () => {
        const events = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', '');
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.body).toBeNull();
    });
    it('handles a json error response', () => {
        const events = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        factory.mock.mockFlush(response_1.HttpStatusCode.InternalServerError, 'Error', JSON.stringify({ data: 'some data' }));
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.error.data).toBe('some data');
    });
    it('handles a json error response with XSSI prefix', () => {
        const events = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        factory.mock.mockFlush(response_1.HttpStatusCode.InternalServerError, 'Error', XSSI_PREFIX + JSON.stringify({ data: 'some data' }));
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.error.data).toBe('some data');
    });
    it('handles a json string response', () => {
        const events = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        expect(factory.mock.responseType).toEqual('text');
        factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', JSON.stringify('this is a string'));
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.body).toEqual('this is a string');
    });
    it('handles a json response with an XSSI prefix', () => {
        const events = trackEvents(backend.handle(TEST_POST.clone({ responseType: 'json' })));
        factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', XSSI_PREFIX + JSON.stringify({ data: 'some data' }));
        expect(events.length).toBe(2);
        const res = events[1];
        expect(res.body.data).toBe('some data');
    });
    it('emits unsuccessful responses via the error path', (done) => {
        backend.handle(TEST_POST).subscribe(undefined, (err) => {
            expect(err instanceof response_1.HttpErrorResponse).toBe(true);
            expect(err.error).toBe('this is the error');
            done();
        });
        factory.mock.mockFlush(response_1.HttpStatusCode.BadRequest, 'Bad Request', 'this is the error');
    });
    it('emits real errors via the error path', (done) => {
        backend.handle(TEST_POST).subscribe(undefined, (err) => {
            expect(err instanceof response_1.HttpErrorResponse).toBe(true);
            expect(err.error instanceof Error).toBeTrue();
            expect(err.url).toBe('/test');
            done();
        });
        factory.mock.mockErrorEvent(new Error('blah'));
    });
    it('emits timeout if the request times out', (done) => {
        backend.handle(TEST_POST).subscribe({
            error: (error) => {
                expect(error instanceof response_1.HttpErrorResponse).toBeTrue();
                expect(error.error instanceof Error).toBeTrue();
                expect(error.url).toBe('/test');
                done();
            },
        });
        factory.mock.mockTimeoutEvent(new Error('timeout'));
    });
    it('avoids abort a request when fetch operation is completed', (done) => {
        const abort = jasmine.createSpy('abort');
        backend
            .handle(TEST_POST)
            .toPromise()
            .then(() => {
            expect(abort).not.toHaveBeenCalled();
            done();
        });
        factory.mock.abort = abort;
        factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'Done');
    });
    it('emits an error when browser cancels a request', (done) => {
        backend.handle(TEST_POST).subscribe(undefined, (err) => {
            expect(err instanceof response_1.HttpErrorResponse).toBe(true);
            done();
        });
        factory.mock.mockAbortEvent();
    });
    describe('progress events', () => {
        it('are emitted for download progress', (done) => {
            backend
                .handle(TEST_POST.clone({ reportProgress: true }))
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.map((event) => event.type)).toEqual([
                    response_1.HttpEventType.Sent,
                    response_1.HttpEventType.ResponseHeader,
                    response_1.HttpEventType.DownloadProgress,
                    response_1.HttpEventType.DownloadProgress,
                    response_1.HttpEventType.Response,
                ]);
                const [progress1, progress2, response] = [
                    events[2],
                    events[3],
                    events[4],
                ];
                expect(progress1.partialText).toBe('down');
                expect(progress1.loaded).toBe(100);
                expect(progress1.total).toBe(300);
                expect(progress2.partialText).toBe('download');
                expect(progress2.loaded).toBe(200);
                expect(progress2.total).toBe(300);
                expect(response.body).toBe('downloaded');
                done();
            });
            factory.mock.responseText = 'down';
            factory.mock.mockDownloadProgressEvent(100, 300);
            factory.mock.responseText = 'download';
            factory.mock.mockDownloadProgressEvent(200, 300);
            factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'downloaded');
        });
        it('are emitted for upload progress', (done) => {
            backend
                .handle(TEST_POST.clone({ reportProgress: true }))
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.map((event) => event.type)).toEqual([
                    response_1.HttpEventType.Sent,
                    response_1.HttpEventType.UploadProgress,
                    response_1.HttpEventType.UploadProgress,
                    response_1.HttpEventType.Response,
                ]);
                const [progress1, progress2] = [
                    events[1],
                    events[2],
                ];
                expect(progress1.loaded).toBe(100);
                expect(progress1.total).toBe(300);
                expect(progress2.loaded).toBe(200);
                expect(progress2.total).toBe(300);
                done();
            });
            factory.mock.mockUploadProgressEvent(100, 300);
            factory.mock.mockUploadProgressEvent(200, 300);
            factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'Done');
        });
        it('are emitted when both upload and download progress are available', (done) => {
            backend
                .handle(TEST_POST.clone({ reportProgress: true }))
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.map((event) => event.type)).toEqual([
                    response_1.HttpEventType.Sent,
                    response_1.HttpEventType.UploadProgress,
                    response_1.HttpEventType.ResponseHeader,
                    response_1.HttpEventType.DownloadProgress,
                    response_1.HttpEventType.Response,
                ]);
                done();
            });
            factory.mock.mockUploadProgressEvent(100, 300);
            factory.mock.mockDownloadProgressEvent(200, 300);
            factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'Done');
        });
        it('are emitted even if length is not computable', (done) => {
            backend
                .handle(TEST_POST.clone({ reportProgress: true }))
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.map((event) => event.type)).toEqual([
                    response_1.HttpEventType.Sent,
                    response_1.HttpEventType.UploadProgress,
                    response_1.HttpEventType.ResponseHeader,
                    response_1.HttpEventType.DownloadProgress,
                    response_1.HttpEventType.Response,
                ]);
                done();
            });
            factory.mock.mockUploadProgressEvent(100);
            factory.mock.mockDownloadProgressEvent(200);
            factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'Done');
        });
        it('include ResponseHeader with headers and status', (done) => {
            backend
                .handle(TEST_POST.clone({ reportProgress: true }))
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.map((event) => event.type)).toEqual([
                    response_1.HttpEventType.Sent,
                    response_1.HttpEventType.ResponseHeader,
                    response_1.HttpEventType.DownloadProgress,
                    response_1.HttpEventType.Response,
                ]);
                const partial = events[1];
                expect(partial.headers.get('Content-Type')).toEqual('text/plain');
                expect(partial.headers.get('Test')).toEqual('Test header');
                done();
            });
            factory.mock.mockResponseHeaders = 'Test: Test header\nContent-Type: text/plain\n';
            factory.mock.mockDownloadProgressEvent(200);
            factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'Done');
        });
        it('are unsubscribed along with the main request', () => {
            const sub = backend.handle(TEST_POST.clone({ reportProgress: true })).subscribe();
            expect(factory.mock.listeners.progress).not.toBeUndefined();
            sub.unsubscribe();
            expect(factory.mock.listeners.progress).toBeUndefined();
        });
        it('do not cause headers to be re-parsed on main response', (done) => {
            backend
                .handle(TEST_POST.clone({ reportProgress: true }))
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                events
                    .filter((event) => event.type === response_1.HttpEventType.Response ||
                    event.type === response_1.HttpEventType.ResponseHeader)
                    .map((event) => event)
                    .forEach((event) => {
                    expect(event.status).toBe(response_1.HttpStatusCode.NonAuthoritativeInformation);
                    expect(event.headers.get('Test')).toEqual('This is a test');
                });
                done();
            });
            factory.mock.mockResponseHeaders = 'Test: This is a test\n';
            factory.mock.status = response_1.HttpStatusCode.NonAuthoritativeInformation;
            factory.mock.mockDownloadProgressEvent(100, 300);
            factory.mock.mockResponseHeaders = 'Test: should never be read\n';
            factory.mock.mockFlush(response_1.HttpStatusCode.NonAuthoritativeInformation, 'OK', 'Testing 1 2 3');
        });
    });
    describe('gets response URL', () => {
        it('from XHR.responsesURL', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.length).toBe(2);
                expect(events[1].type).toBe(response_1.HttpEventType.Response);
                const response = events[1];
                expect(response.url).toBe('/response/url');
                done();
            });
            factory.mock.responseURL = '/response/url';
            factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'Test');
        });
        it('from X-Request-URL header if XHR.responseURL is not present', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.length).toBe(2);
                expect(events[1].type).toBe(response_1.HttpEventType.Response);
                const response = events[1];
                expect(response.url).toBe('/response/url');
                done();
            });
            factory.mock.mockResponseHeaders = 'X-Request-URL: /response/url\n';
            factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'Test');
        });
        it('falls back on Request.url if neither are available', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.length).toBe(2);
                expect(events[1].type).toBe(response_1.HttpEventType.Response);
                const response = events[1];
                expect(response.url).toBe('/test');
                done();
            });
            factory.mock.mockFlush(response_1.HttpStatusCode.Ok, 'OK', 'Test');
        });
    });
    describe('corrects for quirks', () => {
        it('by normalizing 0 status to 200 if a body is present', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe((events) => {
                expect(events.length).toBe(2);
                expect(events[1].type).toBe(response_1.HttpEventType.Response);
                const response = events[1];
                expect(response.status).toBe(response_1.HttpStatusCode.Ok);
                done();
            });
            factory.mock.mockFlush(0, 'CORS 0 status', 'Test');
        });
        it('by leaving 0 status as 0 if a body is not present', (done) => {
            backend
                .handle(TEST_POST)
                .pipe((0, operators_1.toArray)())
                .subscribe(undefined, (error) => {
                expect(error.status).toBe(0);
                done();
            });
            factory.mock.mockFlush(0, 'CORS 0 status');
        });
    });
});
