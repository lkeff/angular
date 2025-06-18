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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpXhrBackend = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const headers_1 = require("./headers");
const request_1 = require("./request");
const response_1 = require("./response");
const XSSI_PREFIX = /^\)\]\}',?\n/;
const X_REQUEST_URL_REGEXP = RegExp(`^${request_1.X_REQUEST_URL_HEADER}:`, 'm');
/**
 * Determine an appropriate URL for the response, by checking either
 * XMLHttpRequest.responseURL or the X-Request-URL header.
 */
function getResponseUrl(xhr) {
    if ('responseURL' in xhr && xhr.responseURL) {
        return xhr.responseURL;
    }
    if (X_REQUEST_URL_REGEXP.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader(request_1.X_REQUEST_URL_HEADER);
    }
    return null;
}
/**
 * Uses `XMLHttpRequest` to send requests to a backend server.
 * @see {@link HttpHandler}
 * @see {@link JsonpClientBackend}
 *
 * @publicApi
 */
let HttpXhrBackend = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpXhrBackend = _classThis = class {
        constructor(xhrFactory) {
            this.xhrFactory = xhrFactory;
        }
        /**
         * Processes a request and returns a stream of response events.
         * @param req The request object.
         * @returns An observable of the response events.
         */
        handle(req) {
            // Quick check to give a better error message when a user attempts to use
            // HttpClient.jsonp() without installing the HttpClientJsonpModule
            if (req.method === 'JSONP') {
                throw new core_1.ɵRuntimeError(-2800 /* RuntimeErrorCode.MISSING_JSONP_MODULE */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    `Cannot make a JSONP request without JSONP support. To fix the problem, either add the \`withJsonpSupport()\` call (if \`provideHttpClient()\` is used) or import the \`HttpClientJsonpModule\` in the root NgModule.`);
            }
            if (req.keepalive && ngDevMode) {
                console.warn((0, core_1.ɵformatRuntimeError)(2813 /* RuntimeErrorCode.KEEPALIVE_NOT_SUPPORTED_WITH_XHR */, `Angular detected that a \`HttpClient\` request with the \`keepalive\` option was sent using XHR, which does not support it. To use the \`keepalive\` option, enable Fetch API support by passing \`withFetch()\` as an argument to \`provideHttpClient()\`.`));
            }
            // Check whether this factory has a special function to load an XHR implementation
            // for various non-browser environments. We currently limit it to only `ServerXhr`
            // class, which needs to load an XHR implementation.
            const xhrFactory = this.xhrFactory;
            const source = xhrFactory.ɵloadImpl
                ? (0, rxjs_1.from)(xhrFactory.ɵloadImpl())
                : (0, rxjs_1.of)(null);
            return source.pipe((0, operators_1.switchMap)(() => {
                // Everything happens on Observable subscription.
                return new rxjs_1.Observable((observer) => {
                    // Start by setting up the XHR object with request method, URL, and withCredentials
                    // flag.
                    const xhr = xhrFactory.build();
                    xhr.open(req.method, req.urlWithParams);
                    if (req.withCredentials) {
                        xhr.withCredentials = true;
                    }
                    // Add all the requested headers.
                    req.headers.forEach((name, values) => xhr.setRequestHeader(name, values.join(',')));
                    // Add an Accept header if one isn't present already.
                    if (!req.headers.has(request_1.ACCEPT_HEADER)) {
                        xhr.setRequestHeader(request_1.ACCEPT_HEADER, request_1.ACCEPT_HEADER_VALUE);
                    }
                    // Auto-detect the Content-Type header if one isn't present already.
                    if (!req.headers.has(request_1.CONTENT_TYPE_HEADER)) {
                        const detectedType = req.detectContentTypeHeader();
                        // Sometimes Content-Type detection fails.
                        if (detectedType !== null) {
                            xhr.setRequestHeader(request_1.CONTENT_TYPE_HEADER, detectedType);
                        }
                    }
                    // Set the responseType if one was requested.
                    if (req.responseType) {
                        const responseType = req.responseType.toLowerCase();
                        // JSON responses need to be processed as text. This is because if the server
                        // returns an XSSI-prefixed JSON response, the browser will fail to parse it,
                        // xhr.response will be null, and xhr.responseText cannot be accessed to
                        // retrieve the prefixed JSON data in order to strip the prefix. Thus, all JSON
                        // is parsed by first requesting text and then applying JSON.parse.
                        xhr.responseType = (responseType !== 'json' ? responseType : 'text');
                    }
                    // Serialize the request body if one is present. If not, this will be set to null.
                    const reqBody = req.serializeBody();
                    // If progress events are enabled, response headers will be delivered
                    // in two events - the HttpHeaderResponse event and the full HttpResponse
                    // event. However, since response headers don't change in between these
                    // two events, it doesn't make sense to parse them twice. So headerResponse
                    // caches the data extracted from the response whenever it's first parsed,
                    // to ensure parsing isn't duplicated.
                    let headerResponse = null;
                    // partialFromXhr extracts the HttpHeaderResponse from the current XMLHttpRequest
                    // state, and memoizes it into headerResponse.
                    const partialFromXhr = () => {
                        if (headerResponse !== null) {
                            return headerResponse;
                        }
                        const statusText = xhr.statusText || 'OK';
                        // Parse headers from XMLHttpRequest - this step is lazy.
                        const headers = new headers_1.HttpHeaders(xhr.getAllResponseHeaders());
                        // Read the response URL from the XMLHttpResponse instance and fall back on the
                        // request URL.
                        const url = getResponseUrl(xhr) || req.url;
                        // Construct the HttpHeaderResponse and memoize it.
                        headerResponse = new response_1.HttpHeaderResponse({ headers, status: xhr.status, statusText, url });
                        return headerResponse;
                    };
                    // Next, a few closures are defined for the various events which XMLHttpRequest can
                    // emit. This allows them to be unregistered as event listeners later.
                    // First up is the load event, which represents a response being fully available.
                    const onLoad = () => {
                        // Read response state from the memoized partial data.
                        let { headers, status, statusText, url } = partialFromXhr();
                        // The body will be read out if present.
                        let body = null;
                        if (status !== response_1.HTTP_STATUS_CODE_NO_CONTENT) {
                            // Use XMLHttpRequest.response if set, responseText otherwise.
                            body = typeof xhr.response === 'undefined' ? xhr.responseText : xhr.response;
                        }
                        // Normalize another potential bug (this one comes from CORS).
                        if (status === 0) {
                            status = !!body ? response_1.HTTP_STATUS_CODE_OK : 0;
                        }
                        // ok determines whether the response will be transmitted on the event or
                        // error channel. Unsuccessful status codes (not 2xx) will always be errors,
                        // but a successful status code can still result in an error if the user
                        // asked for JSON data and the body cannot be parsed as such.
                        let ok = status >= 200 && status < 300;
                        // Check whether the body needs to be parsed as JSON (in many cases the browser
                        // will have done that already).
                        if (req.responseType === 'json' && typeof body === 'string') {
                            // Save the original body, before attempting XSSI prefix stripping.
                            const originalBody = body;
                            body = body.replace(XSSI_PREFIX, '');
                            try {
                                // Attempt the parse. If it fails, a parse error should be delivered to the
                                // user.
                                body = body !== '' ? JSON.parse(body) : null;
                            }
                            catch (error) {
                                // Since the JSON.parse failed, it's reasonable to assume this might not have
                                // been a JSON response. Restore the original body (including any XSSI prefix)
                                // to deliver a better error response.
                                body = originalBody;
                                // If this was an error request to begin with, leave it as a string, it
                                // probably just isn't JSON. Otherwise, deliver the parsing error to the user.
                                if (ok) {
                                    // Even though the response status was 2xx, this is still an error.
                                    ok = false;
                                    // The parse error contains the text of the body that failed to parse.
                                    body = { error, text: body };
                                }
                            }
                        }
                        if (ok) {
                            // A successful response is delivered on the event stream.
                            observer.next(new response_1.HttpResponse({
                                body,
                                headers,
                                status,
                                statusText,
                                url: url || undefined,
                            }));
                            // The full body has been received and delivered, no further events
                            // are possible. This request is complete.
                            observer.complete();
                        }
                        else {
                            // An unsuccessful request is delivered on the error channel.
                            observer.error(new response_1.HttpErrorResponse({
                                // The error in this case is the response body (error from the server).
                                error: body,
                                headers,
                                status,
                                statusText,
                                url: url || undefined,
                            }));
                        }
                    };
                    // The onError callback is called when something goes wrong at the network level.
                    // Connection timeout, DNS error, offline, etc. These are actual errors, and are
                    // transmitted on the error channel.
                    const onError = (error) => {
                        const { url } = partialFromXhr();
                        const res = new response_1.HttpErrorResponse({
                            error,
                            status: xhr.status || 0,
                            statusText: xhr.statusText || 'Unknown Error',
                            url: url || undefined,
                        });
                        observer.error(res);
                    };
                    // The sentHeaders flag tracks whether the HttpResponseHeaders event
                    // has been sent on the stream. This is necessary to track if progress
                    // is enabled since the event will be sent on only the first download
                    // progress event.
                    let sentHeaders = false;
                    // The download progress event handler, which is only registered if
                    // progress events are enabled.
                    const onDownProgress = (event) => {
                        // Send the HttpResponseHeaders event if it hasn't been sent already.
                        if (!sentHeaders) {
                            observer.next(partialFromXhr());
                            sentHeaders = true;
                        }
                        // Start building the download progress event to deliver on the response
                        // event stream.
                        let progressEvent = {
                            type: response_1.HttpEventType.DownloadProgress,
                            loaded: event.loaded,
                        };
                        // Set the total number of bytes in the event if it's available.
                        if (event.lengthComputable) {
                            progressEvent.total = event.total;
                        }
                        // If the request was for text content and a partial response is
                        // available on XMLHttpRequest, include it in the progress event
                        // to allow for streaming reads.
                        if (req.responseType === 'text' && !!xhr.responseText) {
                            progressEvent.partialText = xhr.responseText;
                        }
                        // Finally, fire the event.
                        observer.next(progressEvent);
                    };
                    // The upload progress event handler, which is only registered if
                    // progress events are enabled.
                    const onUpProgress = (event) => {
                        // Upload progress events are simpler. Begin building the progress
                        // event.
                        let progress = {
                            type: response_1.HttpEventType.UploadProgress,
                            loaded: event.loaded,
                        };
                        // If the total number of bytes being uploaded is available, include
                        // it.
                        if (event.lengthComputable) {
                            progress.total = event.total;
                        }
                        // Send the event.
                        observer.next(progress);
                    };
                    // By default, register for load and error events.
                    xhr.addEventListener('load', onLoad);
                    xhr.addEventListener('error', onError);
                    xhr.addEventListener('timeout', onError);
                    xhr.addEventListener('abort', onError);
                    // Progress events are only enabled if requested.
                    if (req.reportProgress) {
                        // Download progress is always enabled if requested.
                        xhr.addEventListener('progress', onDownProgress);
                        // Upload progress depends on whether there is a body to upload.
                        if (reqBody !== null && xhr.upload) {
                            xhr.upload.addEventListener('progress', onUpProgress);
                        }
                    }
                    // Fire the request, and notify the event stream that it was fired.
                    xhr.send(reqBody);
                    observer.next({ type: response_1.HttpEventType.Sent });
                    // This is the return from the Observable function, which is the
                    // request cancellation handler.
                    return () => {
                        // On a cancellation, remove all registered event listeners.
                        xhr.removeEventListener('error', onError);
                        xhr.removeEventListener('abort', onError);
                        xhr.removeEventListener('load', onLoad);
                        xhr.removeEventListener('timeout', onError);
                        if (req.reportProgress) {
                            xhr.removeEventListener('progress', onDownProgress);
                            if (reqBody !== null && xhr.upload) {
                                xhr.upload.removeEventListener('progress', onUpProgress);
                            }
                        }
                        // Finally, abort the in-flight request.
                        if (xhr.readyState !== xhr.DONE) {
                            xhr.abort();
                        }
                    };
                });
            }));
        }
    };
    __setFunctionName(_classThis, "HttpXhrBackend");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpXhrBackend = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpXhrBackend = _classThis;
})();
exports.HttpXhrBackend = HttpXhrBackend;
