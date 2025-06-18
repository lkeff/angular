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
const response_1 = require("../src/response");
describe('HttpResponse', () => {
    describe('constructor()', () => {
        it('fully constructs responses', () => {
            const resp = new response_1.HttpResponse({
                body: 'test body',
                headers: new headers_1.HttpHeaders({
                    'Test': 'Test header',
                }),
                status: response_1.HttpStatusCode.Created,
                statusText: 'Created',
                url: '/test',
            });
            expect(resp.body).toBe('test body');
            expect(resp.headers instanceof headers_1.HttpHeaders).toBeTruthy();
            expect(resp.headers.get('Test')).toBe('Test header');
            expect(resp.status).toBe(response_1.HttpStatusCode.Created);
            expect(resp.statusText).toBe('Created');
            expect(resp.url).toBe('/test');
        });
        it('uses defaults if no args passed', () => {
            const resp = new response_1.HttpResponse({});
            expect(resp.headers).not.toBeNull();
            expect(resp.status).toBe(response_1.HttpStatusCode.Ok);
            expect(resp.statusText).toBe('OK');
            expect(resp.body).toBeNull();
            expect(resp.ok).toBeTruthy();
            expect(resp.url).toBeNull();
        });
        it('accepts a falsy body', () => {
            expect(new response_1.HttpResponse({ body: false }).body).toEqual(false);
            expect(new response_1.HttpResponse({ body: 0 }).body).toEqual(0);
        });
    });
    it('.ok is determined by status', () => {
        const good = new response_1.HttpResponse({ status: 200 });
        const alsoGood = new response_1.HttpResponse({ status: 299 });
        const badHigh = new response_1.HttpResponse({ status: 300 });
        const badLow = new response_1.HttpResponse({ status: 199 });
        expect(good.ok).toBe(true);
        expect(alsoGood.ok).toBe(true);
        expect(badHigh.ok).toBe(false);
        expect(badLow.ok).toBe(false);
    });
    describe('.clone()', () => {
        it('copies the original when given no arguments', () => {
            const clone = new response_1.HttpResponse({
                body: 'test',
                status: response_1.HttpStatusCode.Created,
                statusText: 'created',
                url: '/test',
            }).clone();
            expect(clone.body).toBe('test');
            expect(clone.status).toBe(response_1.HttpStatusCode.Created);
            expect(clone.statusText).toBe('created');
            expect(clone.url).toBe('/test');
            expect(clone.headers).not.toBeNull();
        });
        it('overrides the original', () => {
            const orig = new response_1.HttpResponse({
                body: 'test',
                status: response_1.HttpStatusCode.Created,
                statusText: 'created',
                url: '/test',
            });
            const clone = orig.clone({
                body: { data: 'test' },
                status: response_1.HttpStatusCode.Ok,
                statusText: 'Okay',
                url: '/bar',
            });
            expect(clone.body).toEqual({ data: 'test' });
            expect(clone.status).toBe(response_1.HttpStatusCode.Ok);
            expect(clone.statusText).toBe('Okay');
            expect(clone.url).toBe('/bar');
            expect(clone.headers).toBe(orig.headers);
        });
    });
});
