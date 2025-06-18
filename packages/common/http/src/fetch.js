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
exports.FetchFactory = exports.FetchBackend = exports.FETCH_BACKEND = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const headers_1 = require("./headers");
const request_1 = require("./request");
const response_1 = require("./response");
const XSSI_PREFIX = /^\)\]\}',?\n/;
/**
 * Determine an appropriate URL for the response, by checking either
 * response url or the X-Request-URL header.
 */
function getResponseUrl(response) {
    if (response.url) {
        return response.url;
    }
    // stored as lowercase in the map
    const xRequestUrl = request_1.X_REQUEST_URL_HEADER.toLocaleLowerCase();
    return response.headers.get(xRequestUrl);
}
/**
 * An internal injection token to reference `FetchBackend` implementation
 * in a tree-shakable way.
 */
exports.FETCH_BACKEND = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'FETCH_BACKEND' : '');
/**
 * Uses `fetch` to send requests to a backend server.
 *
 * This `FetchBackend` requires the support of the
 * [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) which is available on all
 * supported browsers and on Node.js v18 or later.
 *
 * @see {@link HttpHandler}
 *
 * @publicApi
 */
let FetchBackend = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FetchBackend = _classThis = class {
        constructor() {
            var _a, _b;
            // We use an arrow function to always reference the current global implementation of `fetch`.
            // This is helpful for cases when the global `fetch` implementation is modified by external code,
            // see https://github.com/angular/angular/issues/57527.
            this.fetchImpl = (_b = (_a = (0, core_1.inject)(FetchFactory, { optional: true })) === null || _a === void 0 ? void 0 : _a.fetch) !== null && _b !== void 0 ? _b : ((...args) => globalThis.fetch(...args));
            this.ngZone = (0, core_1.inject)(core_1.NgZone);
        }
        handle(request) {
            return new rxjs_1.Observable((observer) => {
                const aborter = new AbortController();
                this.doRequest(request, aborter.signal, observer).then(noop, (error) => observer.error(new response_1.HttpErrorResponse({ error })));
                return () => aborter.abort();
            });
        }
        doRequest(request, signal, observer) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                const init = this.createRequestInit(request);
                let response;
                try {
                    // Run fetch outside of Angular zone.
                    // This is due to Node.js fetch implementation (Undici) which uses a number of setTimeouts to check if
                    // the response should eventually timeout which causes extra CD cycles every 500ms
                    const fetchPromise = this.ngZone.runOutsideAngular(() => this.fetchImpl(request.urlWithParams, Object.assign({ signal }, init)));
                    // Make sure Zone.js doesn't trigger false-positive unhandled promise
                    // error in case the Promise is rejected synchronously. See function
                    // description for additional information.
                    silenceSuperfluousUnhandledPromiseRejection(fetchPromise);
                    // Send the `Sent` event before awaiting the response.
                    observer.next({ type: response_1.HttpEventType.Sent });
                    response = yield fetchPromise;
                }
                catch (error) {
                    observer.error(new response_1.HttpErrorResponse({
                        error,
                        status: (_a = error.status) !== null && _a !== void 0 ? _a : 0,
                        statusText: error.statusText,
                        url: request.urlWithParams,
                        headers: error.headers,
                    }));
                    return;
                }
                const headers = new headers_1.HttpHeaders(response.headers);
                const statusText = response.statusText;
                const url = (_b = getResponseUrl(response)) !== null && _b !== void 0 ? _b : request.urlWithParams;
                let status = response.status;
                let body = null;
                if (request.reportProgress) {
                    observer.next(new response_1.HttpHeaderResponse({ headers, status, statusText, url }));
                }
                if (response.body) {
                    // Read Progress
                    const contentLength = response.headers.get('content-length');
                    const chunks = [];
                    const reader = response.body.getReader();
                    let receivedLength = 0;
                    let decoder;
                    let partialText;
                    // We have to check whether the Zone is defined in the global scope because this may be called
                    // when the zone is nooped.
                    const reqZone = typeof Zone !== 'undefined' && Zone.current;
                    // Perform response processing outside of Angular zone to
                    // ensure no excessive change detection runs are executed
                    // Here calling the async ReadableStreamDefaultReader.read() is responsible for triggering CD
                    yield this.ngZone.runOutsideAngular(() => __awaiter(this, void 0, void 0, function* () {
                        while (true) {
                            const { done, value } = yield reader.read();
                            if (done) {
                                break;
                            }
                            chunks.push(value);
                            receivedLength += value.length;
                            if (request.reportProgress) {
                                partialText =
                                    request.responseType === 'text'
                                        ? (partialText !== null && partialText !== void 0 ? partialText : '') +
                                            (decoder !== null && decoder !== void 0 ? decoder : (decoder = new TextDecoder())).decode(value, { stream: true })
                                        : undefined;
                                const reportProgress = () => observer.next({
                                    type: response_1.HttpEventType.DownloadProgress,
                                    total: contentLength ? +contentLength : undefined,
                                    loaded: receivedLength,
                                    partialText,
                                });
                                reqZone ? reqZone.run(reportProgress) : reportProgress();
                            }
                        }
                    }));
                    // Combine all chunks.
                    const chunksAll = this.concatChunks(chunks, receivedLength);
                    try {
                        const contentType = (_c = response.headers.get(request_1.CONTENT_TYPE_HEADER)) !== null && _c !== void 0 ? _c : '';
                        body = this.parseBody(request, chunksAll, contentType);
                    }
                    catch (error) {
                        // Body loading or parsing failed
                        observer.error(new response_1.HttpErrorResponse({
                            error,
                            headers: new headers_1.HttpHeaders(response.headers),
                            status: response.status,
                            statusText: response.statusText,
                            url: (_d = getResponseUrl(response)) !== null && _d !== void 0 ? _d : request.urlWithParams,
                        }));
                        return;
                    }
                }
                // Same behavior as the XhrBackend
                if (status === 0) {
                    status = body ? response_1.HTTP_STATUS_CODE_OK : 0;
                }
                // ok determines whether the response will be transmitted on the event or
                // error channel. Unsuccessful status codes (not 2xx) will always be errors,
                // but a successful status code can still result in an error if the user
                // asked for JSON data and the body cannot be parsed as such.
                const ok = status >= 200 && status < 300;
                if (ok) {
                    observer.next(new response_1.HttpResponse({
                        body,
                        headers,
                        status,
                        statusText,
                        url,
                    }));
                    // The full body has been received and delivered, no further events
                    // are possible. This request is complete.
                    observer.complete();
                }
                else {
                    observer.error(new response_1.HttpErrorResponse({
                        error: body,
                        headers,
                        status,
                        statusText,
                        url,
                    }));
                }
            });
        }
        parseBody(request, binContent, contentType) {
            switch (request.responseType) {
                case 'json':
                    // stripping the XSSI when present
                    const text = new TextDecoder().decode(binContent).replace(XSSI_PREFIX, '');
                    return text === '' ? null : JSON.parse(text);
                case 'text':
                    return new TextDecoder().decode(binContent);
                case 'blob':
                    return new Blob([binContent], { type: contentType });
                case 'arraybuffer':
                    return binContent.buffer;
            }
        }
        createRequestInit(req) {
            // We could share some of this logic with the XhrBackend
            const headers = {};
            const credentials = req.withCredentials ? 'include' : undefined;
            // Setting all the requested headers.
            req.headers.forEach((name, values) => (headers[name] = values.join(',')));
            // Add an Accept header if one isn't present already.
            if (!req.headers.has(request_1.ACCEPT_HEADER)) {
                headers[request_1.ACCEPT_HEADER] = request_1.ACCEPT_HEADER_VALUE;
            }
            // Auto-detect the Content-Type header if one isn't present already.
            if (!req.headers.has(request_1.CONTENT_TYPE_HEADER)) {
                const detectedType = req.detectContentTypeHeader();
                // Sometimes Content-Type detection fails.
                if (detectedType !== null) {
                    headers[request_1.CONTENT_TYPE_HEADER] = detectedType;
                }
            }
            return {
                body: req.serializeBody(),
                method: req.method,
                headers,
                credentials,
                keepalive: req.keepalive,
            };
        }
        concatChunks(chunks, totalLength) {
            const chunksAll = new Uint8Array(totalLength);
            let position = 0;
            for (const chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }
            return chunksAll;
        }
    };
    __setFunctionName(_classThis, "FetchBackend");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FetchBackend = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FetchBackend = _classThis;
})();
exports.FetchBackend = FetchBackend;
/**
 * Abstract class to provide a mocked implementation of `fetch()`
 */
class FetchFactory {
}
exports.FetchFactory = FetchFactory;
function noop() { }
/**
 * Zone.js treats a rejected promise that has not yet been awaited
 * as an unhandled error. This function adds a noop `.then` to make
 * sure that Zone.js doesn't throw an error if the Promise is rejected
 * synchronously.
 */
function silenceSuperfluousUnhandledPromiseRejection(promise) {
    promise.then(noop, noop);
}
