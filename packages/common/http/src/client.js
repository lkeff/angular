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
exports.HttpClient = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const headers_1 = require("./headers");
const params_1 = require("./params");
const request_1 = require("./request");
const response_1 = require("./response");
/**
 * Constructs an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
 * the given `body`. This function clones the object and adds the body.
 *
 * Note that the `responseType` *options* value is a String that identifies the
 * single data type of the response.
 * A single overload version of the method handles each response type.
 * The value of `responseType` cannot be a union, as the combined signature could imply.
 *
 */
function addBody(options, body) {
    return {
        body,
        headers: options.headers,
        context: options.context,
        observe: options.observe,
        params: options.params,
        reportProgress: options.reportProgress,
        responseType: options.responseType,
        withCredentials: options.withCredentials,
        transferCache: options.transferCache,
        keepalive: options.keepalive,
    };
}
/**
 * Performs HTTP requests.
 * This service is available as an injectable class, with methods to perform HTTP requests.
 * Each request method has multiple signatures, and the return type varies based on
 * the signature that is called (mainly the values of `observe` and `responseType`).
 *
 * Note that the `responseType` *options* value is a String that identifies the
 * single data type of the response.
 * A single overload version of the method handles each response type.
 * The value of `responseType` cannot be a union, as the combined signature could imply.
 *
 * @usageNotes
 *
 * ### HTTP Request Example
 *
 * ```ts
 *  // GET heroes whose name contains search term
 * searchHeroes(term: string): observable<Hero[]>{
 *
 *  const params = new HttpParams({fromString: 'name=term'});
 *    return this.httpClient.request('GET', this.heroesUrl, {responseType:'json', params});
 * }
 * ```
 *
 * Alternatively, the parameter string can be used without invoking HttpParams
 * by directly joining to the URL.
 * ```ts
 * this.httpClient.request('GET', this.heroesUrl + '?' + 'name=term', {responseType:'json'});
 * ```
 *
 *
 * ### JSONP Example
 * ```ts
 * requestJsonp(url, callback = 'callback') {
 *  return this.httpClient.jsonp(this.heroesURL, callback);
 * }
 * ```
 *
 * ### PATCH Example
 * ```ts
 * // PATCH one of the heroes' name
 * patchHero (id: number, heroName: string): Observable<{}> {
 * const url = `${this.heroesUrl}/${id}`;   // PATCH api/heroes/42
 *  return this.httpClient.patch(url, {name: heroName}, httpOptions)
 *    .pipe(catchError(this.handleError('patchHero')));
 * }
 * ```
 *
 * @see [HTTP Guide](guide/http)
 * @see [HTTP Request](api/common/http/HttpRequest)
 *
 * @publicApi
 */
let HttpClient = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpClient = _classThis = class {
        constructor(handler) {
            this.handler = handler;
        }
        /**
         * Constructs an observable for a generic HTTP request that, when subscribed,
         * fires the request through the chain of registered interceptors and on to the
         * server.
         *
         * You can pass an `HttpRequest` directly as the only parameter. In this case,
         * the call returns an observable of the raw `HttpEvent` stream.
         *
         * Alternatively you can pass an HTTP method as the first parameter,
         * a URL string as the second, and an options hash containing the request body as the third.
         * See `addBody()`. In this case, the specified `responseType` and `observe` options determine the
         * type of returned observable.
         *   * The `responseType` value determines how a successful response body is parsed.
         *   * If `responseType` is the default `json`, you can pass a type interface for the resulting
         * object as a type parameter to the call.
         *
         * The `observe` value determines the return type, according to what you are interested in
         * observing.
         *   * An `observe` value of events returns an observable of the raw `HttpEvent` stream, including
         * progress events by default.
         *   * An `observe` value of response returns an observable of `HttpResponse<T>`,
         * where the `T` parameter depends on the `responseType` and any optionally provided type
         * parameter.
         *   * An `observe` value of body returns an observable of `<T>` with the same `T` body type.
         *
         */
        request(first, url, options = {}) {
            let req;
            // First, check whether the primary argument is an instance of `HttpRequest`.
            if (first instanceof request_1.HttpRequest) {
                // It is. The other arguments must be undefined (per the signatures) and can be
                // ignored.
                req = first;
            }
            else {
                // It's a string, so it represents a URL. Construct a request based on it,
                // and incorporate the remaining arguments (assuming `GET` unless a method is
                // provided.
                // Figure out the headers.
                let headers = undefined;
                if (options.headers instanceof headers_1.HttpHeaders) {
                    headers = options.headers;
                }
                else {
                    headers = new headers_1.HttpHeaders(options.headers);
                }
                // Sort out parameters.
                let params = undefined;
                if (!!options.params) {
                    if (options.params instanceof params_1.HttpParams) {
                        params = options.params;
                    }
                    else {
                        params = new params_1.HttpParams({ fromObject: options.params });
                    }
                }
                // Construct the request.
                req = new request_1.HttpRequest(first, url, options.body !== undefined ? options.body : null, {
                    headers,
                    context: options.context,
                    params,
                    reportProgress: options.reportProgress,
                    // By default, JSON is assumed to be returned for all calls.
                    responseType: options.responseType || 'json',
                    withCredentials: options.withCredentials,
                    transferCache: options.transferCache,
                    keepalive: options.keepalive,
                });
            }
            // Start with an Observable.of() the initial request, and run the handler (which
            // includes all interceptors) inside a concatMap(). This way, the handler runs
            // inside an Observable chain, which causes interceptors to be re-run on every
            // subscription (this also makes retries re-run the handler, including interceptors).
            const events$ = (0, rxjs_1.of)(req).pipe((0, operators_1.concatMap)((req) => this.handler.handle(req)));
            // If coming via the API signature which accepts a previously constructed HttpRequest,
            // the only option is to get the event stream. Otherwise, return the event stream if
            // that is what was requested.
            if (first instanceof request_1.HttpRequest || options.observe === 'events') {
                return events$;
            }
            // The requested stream contains either the full response or the body. In either
            // case, the first step is to filter the event stream to extract a stream of
            // responses(s).
            const res$ = (events$.pipe((0, operators_1.filter)((event) => event instanceof response_1.HttpResponse)));
            // Decide which stream to return.
            switch (options.observe || 'body') {
                case 'body':
                    // The requested stream is the body. Map the response stream to the response
                    // body. This could be done more simply, but a misbehaving interceptor might
                    // transform the response body into a different format and ignore the requested
                    // responseType. Guard against this by validating that the response is of the
                    // requested type.
                    switch (req.responseType) {
                        case 'arraybuffer':
                            return res$.pipe((0, operators_1.map)((res) => {
                                // Validate that the body is an ArrayBuffer.
                                if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                                    throw new core_1.ɵRuntimeError(2806 /* RuntimeErrorCode.RESPONSE_IS_NOT_AN_ARRAY_BUFFER */, ngDevMode && 'Response is not an ArrayBuffer.');
                                }
                                return res.body;
                            }));
                        case 'blob':
                            return res$.pipe((0, operators_1.map)((res) => {
                                // Validate that the body is a Blob.
                                if (res.body !== null && !(res.body instanceof Blob)) {
                                    throw new core_1.ɵRuntimeError(2807 /* RuntimeErrorCode.RESPONSE_IS_NOT_A_BLOB */, ngDevMode && 'Response is not a Blob.');
                                }
                                return res.body;
                            }));
                        case 'text':
                            return res$.pipe((0, operators_1.map)((res) => {
                                // Validate that the body is a string.
                                if (res.body !== null && typeof res.body !== 'string') {
                                    throw new core_1.ɵRuntimeError(2808 /* RuntimeErrorCode.RESPONSE_IS_NOT_A_STRING */, ngDevMode && 'Response is not a string.');
                                }
                                return res.body;
                            }));
                        case 'json':
                        default:
                            // No validation needed for JSON responses, as they can be of any type.
                            return res$.pipe((0, operators_1.map)((res) => res.body));
                    }
                case 'response':
                    // The response stream was requested directly, so return it.
                    return res$;
                default:
                    // Guard against new future observe types being added.
                    throw new core_1.ɵRuntimeError(2809 /* RuntimeErrorCode.UNHANDLED_OBSERVE_TYPE */, ngDevMode && `Unreachable: unhandled observe type ${options.observe}}`);
            }
        }
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `DELETE` request to execute on the server. See the individual overloads for
         * details on the return type.
         *
         * @param url     The endpoint URL.
         * @param options The HTTP options to send with the request.
         *
         */
        delete(url, options = {}) {
            return this.request('DELETE', url, options);
        }
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `GET` request to execute on the server. See the individual overloads for
         * details on the return type.
         */
        get(url, options = {}) {
            return this.request('GET', url, options);
        }
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `HEAD` request to execute on the server. The `HEAD` method returns
         * meta information about the resource without transferring the
         * resource itself. See the individual overloads for
         * details on the return type.
         */
        head(url, options = {}) {
            return this.request('HEAD', url, options);
        }
        /**
         * Constructs an `Observable` that, when subscribed, causes a request with the special method
         * `JSONP` to be dispatched via the interceptor pipeline.
         * The [JSONP pattern](https://en.wikipedia.org/wiki/JSONP) works around limitations of certain
         * API endpoints that don't support newer,
         * and preferable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) protocol.
         * JSONP treats the endpoint API as a JavaScript file and tricks the browser to process the
         * requests even if the API endpoint is not located on the same domain (origin) as the client-side
         * application making the request.
         * The endpoint API must support JSONP callback for JSONP requests to work.
         * The resource API returns the JSON response wrapped in a callback function.
         * You can pass the callback function name as one of the query parameters.
         * Note that JSONP requests can only be used with `GET` requests.
         *
         * @param url The resource URL.
         * @param callbackParam The callback function name.
         *
         */
        jsonp(url, callbackParam) {
            return this.request('JSONP', url, {
                params: new params_1.HttpParams().append(callbackParam, 'JSONP_CALLBACK'),
                observe: 'body',
                responseType: 'json',
            });
        }
        /**
         * Constructs an `Observable` that, when subscribed, causes the configured
         * `OPTIONS` request to execute on the server. This method allows the client
         * to determine the supported HTTP methods and other capabilities of an endpoint,
         * without implying a resource action. See the individual overloads for
         * details on the return type.
         */
        options(url, options = {}) {
            return this.request('OPTIONS', url, options);
        }
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `PATCH` request to execute on the server. See the individual overloads for
         * details on the return type.
         */
        patch(url, body, options = {}) {
            return this.request('PATCH', url, addBody(options, body));
        }
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `POST` request to execute on the server. The server responds with the location of
         * the replaced resource. See the individual overloads for
         * details on the return type.
         */
        post(url, body, options = {}) {
            return this.request('POST', url, addBody(options, body));
        }
        /**
         * Constructs an observable that, when subscribed, causes the configured
         * `PUT` request to execute on the server. The `PUT` method replaces an existing resource
         * with a new set of values.
         * See the individual overloads for details on the return type.
         */
        put(url, body, options = {}) {
            return this.request('PUT', url, addBody(options, body));
        }
    };
    __setFunctionName(_classThis, "HttpClient");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClient = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClient = _classThis;
})();
exports.HttpClient = HttpClient;
