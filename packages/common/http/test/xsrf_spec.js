"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = require("../src/headers");
const request_1 = require("../src/request");
const xsrf_1 = require("../src/xsrf");
const backend_1 = require("../testing/src/backend");
const testing_1 = require("@angular/core/testing");
class SampleTokenExtractor extends xsrf_1.HttpXsrfTokenExtractor {
    constructor(token) {
        super();
        this.token = token;
    }
    getToken() {
        return this.token;
    }
}
describe('HttpXsrfInterceptor', () => {
    let backend;
    let interceptor;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: xsrf_1.HttpXsrfTokenExtractor,
                    useValue: new SampleTokenExtractor('test'),
                },
                {
                    provide: xsrf_1.XSRF_HEADER_NAME,
                    useValue: 'X-XSRF-TOKEN',
                },
                {
                    provide: xsrf_1.XSRF_ENABLED,
                    useValue: true,
                },
                xsrf_1.HttpXsrfInterceptor,
            ],
        });
        interceptor = testing_1.TestBed.inject(xsrf_1.HttpXsrfInterceptor);
        backend = new backend_1.HttpClientTestingBackend();
    });
    it('applies XSRF protection to outgoing requests', () => {
        interceptor.intercept(new request_1.HttpRequest('POST', '/test', {}), backend).subscribe();
        const req = backend.expectOne('/test');
        expect(req.request.headers.get('X-XSRF-TOKEN')).toEqual('test');
        req.flush({});
    });
    it('does not apply XSRF protection when request is a GET', () => {
        interceptor.intercept(new request_1.HttpRequest('GET', '/test'), backend).subscribe();
        const req = backend.expectOne('/test');
        expect(req.request.headers.has('X-XSRF-TOKEN')).toEqual(false);
        req.flush({});
    });
    it('does not apply XSRF protection when request is a HEAD', () => {
        interceptor.intercept(new request_1.HttpRequest('HEAD', '/test'), backend).subscribe();
        const req = backend.expectOne('/test');
        expect(req.request.headers.has('X-XSRF-TOKEN')).toEqual(false);
        req.flush({});
    });
    it('does not overwrite existing header', () => {
        interceptor
            .intercept(new request_1.HttpRequest('POST', '/test', {}, { headers: new headers_1.HttpHeaders().set('X-XSRF-TOKEN', 'blah') }), backend)
            .subscribe();
        const req = backend.expectOne('/test');
        expect(req.request.headers.get('X-XSRF-TOKEN')).toEqual('blah');
        req.flush({});
    });
    it('does not set the header for a null token', () => {
        testing_1.TestBed.resetTestingModule();
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: xsrf_1.HttpXsrfTokenExtractor,
                    useValue: new SampleTokenExtractor(null),
                },
                {
                    provide: xsrf_1.XSRF_HEADER_NAME,
                    useValue: 'X-XSRF-TOKEN',
                },
                {
                    provide: xsrf_1.XSRF_ENABLED,
                    useValue: true,
                },
                xsrf_1.HttpXsrfInterceptor,
            ],
        });
        interceptor = testing_1.TestBed.inject(xsrf_1.HttpXsrfInterceptor);
        interceptor.intercept(new request_1.HttpRequest('POST', '/test', {}), backend).subscribe();
        const req = backend.expectOne('/test');
        expect(req.request.headers.has('X-XSRF-TOKEN')).toEqual(false);
        req.flush({});
    });
    afterEach(() => {
        backend.verify();
    });
});
describe('HttpXsrfCookieExtractor', () => {
    let document;
    let extractor;
    beforeEach(() => {
        document = {
            cookie: 'XSRF-TOKEN=test',
        };
        extractor = new xsrf_1.HttpXsrfCookieExtractor(document, 'XSRF-TOKEN');
    });
    it('parses the cookie from document.cookie', () => {
        expect(extractor.getToken()).toEqual('test');
    });
    it('does not re-parse if document.cookie has not changed', () => {
        expect(extractor.getToken()).toEqual('test');
        expect(extractor.getToken()).toEqual('test');
        expect(getParseCount(extractor)).toEqual(1);
    });
    it('re-parses if document.cookie changes', () => {
        expect(extractor.getToken()).toEqual('test');
        document['cookie'] = 'XSRF-TOKEN=blah';
        expect(extractor.getToken()).toEqual('blah');
        expect(getParseCount(extractor)).toEqual(2);
    });
});
function getParseCount(extractor) {
    return extractor.parseCount;
}
