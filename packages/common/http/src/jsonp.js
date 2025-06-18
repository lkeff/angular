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
exports.JsonpInterceptor = exports.JsonpClientBackend = exports.JsonpCallbackContext = exports.JSONP_ERR_HEADERS_NOT_SUPPORTED = exports.JSONP_ERR_WRONG_RESPONSE_TYPE = exports.JSONP_ERR_WRONG_METHOD = exports.JSONP_ERR_NO_CALLBACK = void 0;
exports.jsonpCallbackContext = jsonpCallbackContext;
exports.jsonpInterceptorFn = jsonpInterceptorFn;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const response_1 = require("./response");
// Every request made through JSONP needs a callback name that's unique across the
// whole page. Each request is assigned an id and the callback name is constructed
// from that. The next id to be assigned is tracked in a global variable here that
// is shared among all applications on the page.
let nextRequestId = 0;
/**
 * When a pending <script> is unsubscribed we'll move it to this document, so it won't be
 * executed.
 */
let foreignDocument;
// Error text given when a JSONP script is injected, but doesn't invoke the callback
// passed in its URL.
exports.JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
// Error text given when a request is passed to the JsonpClientBackend that doesn't
// have a request method JSONP.
exports.JSONP_ERR_WRONG_METHOD = 'JSONP requests must use JSONP request method.';
exports.JSONP_ERR_WRONG_RESPONSE_TYPE = 'JSONP requests must use Json response type.';
// Error text given when a request is passed to the JsonpClientBackend that has
// headers set
exports.JSONP_ERR_HEADERS_NOT_SUPPORTED = 'JSONP requests do not support headers.';
/**
 * DI token/abstract type representing a map of JSONP callbacks.
 *
 * In the browser, this should always be the `window` object.
 *
 *
 */
class JsonpCallbackContext {
}
exports.JsonpCallbackContext = JsonpCallbackContext;
/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 *
 */
function jsonpCallbackContext() {
    if (typeof window === 'object') {
        return window;
    }
    return {};
}
/**
 * Processes an `HttpRequest` with the JSONP method,
 * by performing JSONP style requests.
 * @see {@link HttpHandler}
 * @see {@link HttpXhrBackend}
 *
 * @publicApi
 */
let JsonpClientBackend = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var JsonpClientBackend = _classThis = class {
        constructor(callbackMap, document) {
            this.callbackMap = callbackMap;
            this.document = document;
            /**
             * A resolved promise that can be used to schedule microtasks in the event handlers.
             */
            this.resolvedPromise = Promise.resolve();
        }
        /**
         * Get the name of the next callback method, by incrementing the global `nextRequestId`.
         */
        nextCallback() {
            return `ng_jsonp_callback_${nextRequestId++}`;
        }
        /**
         * Processes a JSONP request and returns an event stream of the results.
         * @param req The request object.
         * @returns An observable of the response events.
         *
         */
        handle(req) {
            // Firstly, check both the method and response type. If either doesn't match
            // then the request was improperly routed here and cannot be handled.
            if (req.method !== 'JSONP') {
                throw new core_1.ɵRuntimeError(2810 /* RuntimeErrorCode.JSONP_WRONG_METHOD */, ngDevMode && exports.JSONP_ERR_WRONG_METHOD);
            }
            else if (req.responseType !== 'json') {
                throw new core_1.ɵRuntimeError(2811 /* RuntimeErrorCode.JSONP_WRONG_RESPONSE_TYPE */, ngDevMode && exports.JSONP_ERR_WRONG_RESPONSE_TYPE);
            }
            // Check the request headers. JSONP doesn't support headers and
            // cannot set any that were supplied.
            if (req.headers.keys().length > 0) {
                throw new core_1.ɵRuntimeError(2812 /* RuntimeErrorCode.JSONP_HEADERS_NOT_SUPPORTED */, ngDevMode && exports.JSONP_ERR_HEADERS_NOT_SUPPORTED);
            }
            // Everything else happens inside the Observable boundary.
            return new rxjs_1.Observable((observer) => {
                // The first step to make a request is to generate the callback name, and replace the
                // callback placeholder in the URL with the name. Care has to be taken here to ensure
                // a trailing &, if matched, gets inserted back into the URL in the correct place.
                const callback = this.nextCallback();
                const url = req.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, `=${callback}$1`);
                // Construct the <script> tag and point it at the URL.
                const node = this.document.createElement('script');
                node.src = url;
                // A JSONP request requires waiting for multiple callbacks. These variables
                // are closed over and track state across those callbacks.
                // The response object, if one has been received, or null otherwise.
                let body = null;
                // Whether the response callback has been called.
                let finished = false;
                // Set the response callback in this.callbackMap (which will be the window
                // object in the browser. The script being loaded via the <script> tag will
                // eventually call this callback.
                this.callbackMap[callback] = (data) => {
                    // Data has been received from the JSONP script. Firstly, delete this callback.
                    delete this.callbackMap[callback];
                    // Set state to indicate data was received.
                    body = data;
                    finished = true;
                };
                // cleanup() is a utility closure that removes the <script> from the page and
                // the response callback from the window. This logic is used in both the
                // success, error, and cancellation paths, so it's extracted out for convenience.
                const cleanup = () => {
                    node.removeEventListener('load', onLoad);
                    node.removeEventListener('error', onError);
                    // Remove the <script> tag if it's still on the page.
                    node.remove();
                    // Remove the response callback from the callbackMap (window object in the
                    // browser).
                    delete this.callbackMap[callback];
                };
                // onLoad() is the success callback which runs after the response callback
                // if the JSONP script loads successfully. The event itself is unimportant.
                // If something went wrong, onLoad() may run without the response callback
                // having been invoked.
                const onLoad = () => {
                    // We wrap it in an extra Promise, to ensure the microtask
                    // is scheduled after the loaded endpoint has executed any potential microtask itself,
                    // which is not guaranteed in Internet Explorer and EdgeHTML. See issue #39496
                    this.resolvedPromise.then(() => {
                        // Cleanup the page.
                        cleanup();
                        // Check whether the response callback has run.
                        if (!finished) {
                            // It hasn't, something went wrong with the request. Return an error via
                            // the Observable error path. All JSONP errors have status 0.
                            observer.error(new response_1.HttpErrorResponse({
                                url,
                                status: 0,
                                statusText: 'JSONP Error',
                                error: new Error(exports.JSONP_ERR_NO_CALLBACK),
                            }));
                            return;
                        }
                        // Success. body either contains the response body or null if none was
                        // returned.
                        observer.next(new response_1.HttpResponse({
                            body,
                            status: response_1.HTTP_STATUS_CODE_OK,
                            statusText: 'OK',
                            url,
                        }));
                        // Complete the stream, the response is over.
                        observer.complete();
                    });
                };
                // onError() is the error callback, which runs if the script returned generates
                // a Javascript error. It emits the error via the Observable error channel as
                // a HttpErrorResponse.
                const onError = (error) => {
                    cleanup();
                    // Wrap the error in a HttpErrorResponse.
                    observer.error(new response_1.HttpErrorResponse({
                        error,
                        status: 0,
                        statusText: 'JSONP Error',
                        url,
                    }));
                };
                // Subscribe to both the success (load) and error events on the <script> tag,
                // and add it to the page.
                node.addEventListener('load', onLoad);
                node.addEventListener('error', onError);
                this.document.body.appendChild(node);
                // The request has now been successfully sent.
                observer.next({ type: response_1.HttpEventType.Sent });
                // Cancellation handler.
                return () => {
                    if (!finished) {
                        this.removeListeners(node);
                    }
                    // And finally, clean up the page.
                    cleanup();
                };
            });
        }
        removeListeners(script) {
            // Issue #34818
            // Changing <script>'s ownerDocument will prevent it from execution.
            // https://html.spec.whatwg.org/multipage/scripting.html#execute-the-script-block
            foreignDocument !== null && foreignDocument !== void 0 ? foreignDocument : (foreignDocument = this.document.implementation.createHTMLDocument());
            foreignDocument.adoptNode(script);
        }
    };
    __setFunctionName(_classThis, "JsonpClientBackend");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JsonpClientBackend = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JsonpClientBackend = _classThis;
})();
exports.JsonpClientBackend = JsonpClientBackend;
/**
 * Identifies requests with the method JSONP and shifts them to the `JsonpClientBackend`.
 */
function jsonpInterceptorFn(req, next) {
    if (req.method === 'JSONP') {
        return (0, core_1.inject)(JsonpClientBackend).handle(req);
    }
    // Fall through for normal HTTP requests.
    return next(req);
}
/**
 * Identifies requests with the method JSONP and
 * shifts them to the `JsonpClientBackend`.
 *
 * @see {@link HttpInterceptor}
 *
 * @publicApi
 */
let JsonpInterceptor = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var JsonpInterceptor = _classThis = class {
        constructor(injector) {
            this.injector = injector;
        }
        /**
         * Identifies and handles a given JSONP request.
         * @param initialRequest The outgoing request object to handle.
         * @param next The next interceptor in the chain, or the backend
         * if no interceptors remain in the chain.
         * @returns An observable of the event stream.
         */
        intercept(initialRequest, next) {
            return (0, core_1.runInInjectionContext)(this.injector, () => jsonpInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
        }
    };
    __setFunctionName(_classThis, "JsonpInterceptor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JsonpInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JsonpInterceptor = _classThis;
})();
exports.JsonpInterceptor = JsonpInterceptor;
