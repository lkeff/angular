"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.sonpCallbackContext
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = require("../src/headers");
const jsonp_1 = require("../src/jsonp");
const request_1 = require("../src/request");
const response_1 = require("../src/response");
const operators_1 = require("rxjs/operators");
const jsonp_mock_1 = require("./jsonp_mock");
describe('JsonpClientBackend', () => {
    const SAMPLE_REQ = new request_1.HttpRequest('JSONP', '/test');
    let home;
    let document;
    let backend;
    function runOnlyCallback(home, data) {
        const keys = Object.keys(home);
        expect(keys.length).toBe(1);
        const callback = home[keys[0]];
        callback(data);
    }
    beforeEach(() => {
        home = {};
        document = new jsonp_mock_1.MockDocument();
        backend = new jsonp_1.JsonpClientBackend(home, document);
    });
    it('handles a basic request', (done) => {
        backend
            .handle(SAMPLE_REQ)
            .pipe((0, operators_1.toArray)())
            .subscribe((events) => {
            expect(events.map((event) => event.type)).toEqual([
                response_1.HttpEventType.Sent,
                response_1.HttpEventType.Response,
            ]);
            done();
        });
        runOnlyCallback(home, { data: 'This is a test' });
        document.mockLoad();
    });
    // Issue #39496
    it('handles a request with callback call wrapped in promise', (done) => {
        backend.handle(SAMPLE_REQ).subscribe({ complete: done });
        queueMicrotask(() => {
            runOnlyCallback(home, { data: 'This is a test' });
        });
        document.mockLoad();
    });
    it('handles an error response properly', (done) => {
        const error = new Error('This is a test error');
        backend
            .handle(SAMPLE_REQ)
            .pipe((0, operators_1.toArray)())
            .subscribe(undefined, (err) => {
            expect(err.status).toBe(0);
            expect(err.error).toBe(error);
            done();
        });
        document.mockError(error);
    });
    it('prevents the script from executing when the request is cancelled', () => {
        const sub = backend.handle(SAMPLE_REQ).subscribe();
        expect(Object.keys(home).length).toBe(1);
        const keys = Object.keys(home);
        const spy = jasmine.createSpy('spy', home[keys[0]]);
        sub.unsubscribe();
        document.mockLoad();
        expect(Object.keys(home).length).toBe(0);
        expect(spy).not.toHaveBeenCalled();
        // The script element should have been transferred to a different document to prevent it from
        // executing.
        expect(document.mock.ownerDocument).not.toEqual(document);
    });
    describe('throws an error', () => {
        it('when request method is not JSONP', () => expect(() => backend.handle(SAMPLE_REQ.clone({ method: 'GET' }))).toThrowError(`NG02810: ${jsonp_1.JSONP_ERR_WRONG_METHOD}`));
        it('when response type is not json', () => expect(() => backend.handle(SAMPLE_REQ.clone({
            responseType: 'text',
        }))).toThrowError(`NG02811: ${jsonp_1.JSONP_ERR_WRONG_RESPONSE_TYPE}`));
        it('when headers are set in request', () => expect(() => backend.handle(SAMPLE_REQ.clone({
            headers: new headers_1.HttpHeaders({ 'Content-Type': 'application/json' }),
        }))).toThrowError(`NG02812: ${jsonp_1.JSONP_ERR_HEADERS_NOT_SUPPORTED}`));
        it('when callback is never called', (done) => {
            backend.handle(SAMPLE_REQ).subscribe(undefined, (err) => {
                expect(err.status).toBe(0);
                expect(err.error instanceof Error).toEqual(true);
                expect(err.error.message).toEqual(jsonp_1.JSONP_ERR_NO_CALLBACK);
                done();
            });
            document.mockLoad();
        });
    });
});
