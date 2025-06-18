"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpResource = void 0;
const core_1 = require("@angular/core");
const request_1 = require("./request");
const client_1 = require("./client");
const response_1 = require("./response");
const headers_1 = require("./headers");
const params_1 = require("./params");
/**
 * `httpResource` makes a reactive HTTP request and exposes the request status and response value as
 * a `WritableResource`. By default, it assumes that the backend will return JSON data. To make a
 * request that expects a different kind of data, you can use a sub-constructor of `httpResource`,
 * such as `httpResource.text`.
 *
 * @experimental 19.2
 * @initializerApiFunction
 */
exports.httpResource = (() => {
    const jsonFn = makeHttpResourceFn('json');
    jsonFn.arrayBuffer = makeHttpResourceFn('arraybuffer');
    jsonFn.blob = makeHttpResourceFn('blob');
    jsonFn.text = makeHttpResourceFn('text');
    return jsonFn;
})();
function makeHttpResourceFn(responseType) {
    return function httpResource(request, options) {
        var _a;
        (options === null || options === void 0 ? void 0 : options.injector) || (0, core_1.assertInInjectionContext)(httpResource);
        const injector = (_a = options === null || options === void 0 ? void 0 : options.injector) !== null && _a !== void 0 ? _a : (0, core_1.inject)(core_1.Injector);
        return new HttpResourceImpl(injector, () => normalizeRequest(request, responseType), options === null || options === void 0 ? void 0 : options.defaultValue, options === null || options === void 0 ? void 0 : options.parse, options === null || options === void 0 ? void 0 : options.equal);
    };
}
function normalizeRequest(request, responseType) {
    var _a, _b;
    let unwrappedRequest = typeof request === 'function' ? request() : request;
    if (unwrappedRequest === undefined) {
        return undefined;
    }
    else if (typeof unwrappedRequest === 'string') {
        unwrappedRequest = { url: unwrappedRequest };
    }
    const headers = unwrappedRequest.headers instanceof headers_1.HttpHeaders
        ? unwrappedRequest.headers
        : new headers_1.HttpHeaders(unwrappedRequest.headers);
    const params = unwrappedRequest.params instanceof params_1.HttpParams
        ? unwrappedRequest.params
        : new params_1.HttpParams({ fromObject: unwrappedRequest.params });
    return new request_1.HttpRequest((_a = unwrappedRequest.method) !== null && _a !== void 0 ? _a : 'GET', unwrappedRequest.url, (_b = unwrappedRequest.body) !== null && _b !== void 0 ? _b : null, {
        headers,
        params,
        reportProgress: unwrappedRequest.reportProgress,
        withCredentials: unwrappedRequest.withCredentials,
        responseType,
        context: unwrappedRequest.context,
        transferCache: unwrappedRequest.transferCache,
    });
}
class HttpResourceImpl extends core_1.ɵResourceImpl {
    constructor(injector, request, defaultValue, parse, equal) {
        super(request, ({ params: request, abortSignal }) => {
            let sub;
            // Track the abort listener so it can be removed if the Observable completes (as a memory
            // optimization).
            const onAbort = () => sub.unsubscribe();
            abortSignal.addEventListener('abort', onAbort);
            // Start off stream as undefined.
            const stream = (0, core_1.signal)({ value: undefined });
            let resolve;
            const promise = new Promise((r) => (resolve = r));
            const send = (value) => {
                stream.set(value);
                resolve === null || resolve === void 0 ? void 0 : resolve(stream);
                resolve = undefined;
            };
            sub = this.client.request(request).subscribe({
                next: (event) => {
                    switch (event.type) {
                        case response_1.HttpEventType.Response:
                            this._headers.set(event.headers);
                            this._statusCode.set(event.status);
                            try {
                                send({ value: parse ? parse(event.body) : event.body });
                            }
                            catch (error) {
                                send({ error });
                            }
                            break;
                        case response_1.HttpEventType.DownloadProgress:
                            this._progress.set(event);
                            break;
                    }
                },
                error: (error) => {
                    if (error instanceof response_1.HttpErrorResponse) {
                        this._headers.set(error.headers);
                        this._statusCode.set(error.status);
                    }
                    send({ error });
                },
                complete: () => {
                    if (resolve) {
                        send({ error: new Error('Resource completed before producing a value') });
                    }
                    abortSignal.removeEventListener('abort', onAbort);
                },
            });
            return promise;
        }, defaultValue, equal, injector);
        this._headers = (0, core_1.linkedSignal)({
            source: this.extRequest,
            computation: () => undefined,
        });
        this._progress = (0, core_1.linkedSignal)({
            source: this.extRequest,
            computation: () => undefined,
        });
        this._statusCode = (0, core_1.linkedSignal)({
            source: this.extRequest,
            computation: () => undefined,
        });
        this.headers = (0, core_1.computed)(() => this.status() === 'resolved' || this.status() === 'error' ? this._headers() : undefined);
        this.progress = this._progress.asReadonly();
        this.statusCode = this._statusCode.asReadonly();
        this.client = injector.get(client_1.HttpClient);
    }
}
