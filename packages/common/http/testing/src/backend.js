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
exports.HttpClientTestingBackend = void 0;
const index_1 = require("../../index");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const request_1 = require("./request");
/**
 * A testing backend for `HttpClient` which both acts as an `HttpBackend`
 * and as the `HttpTestingController`.
 *
 * `HttpClientTestingBackend` works by keeping a list of all open requests.
 * As requests come in, they're added to the list. Users can assert that specific
 * requests were made and then flush them. In the end, a verify() method asserts
 * that no unexpected requests were made.
 *
 *
 */
let HttpClientTestingBackend = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpClientTestingBackend = _classThis = class {
        constructor() {
            /**
             * List of pending requests which have not yet been expected.
             */
            this.open = [];
            /**
             * Used when checking if we need to throw the NOT_USING_FETCH_BACKEND_IN_SSR error
             */
            this.isTestingBackend = true;
        }
        /**
         * Handle an incoming request by queueing it in the list of open requests.
         */
        handle(req) {
            return new rxjs_1.Observable((observer) => {
                const testReq = new request_1.TestRequest(req, observer);
                this.open.push(testReq);
                observer.next({ type: index_1.HttpEventType.Sent });
                return () => {
                    testReq._cancelled = true;
                };
            });
        }
        /**
         * Helper function to search for requests in the list of open requests.
         */
        _match(match) {
            if (typeof match === 'string') {
                return this.open.filter((testReq) => testReq.request.urlWithParams === match);
            }
            else if (typeof match === 'function') {
                return this.open.filter((testReq) => match(testReq.request));
            }
            else {
                return this.open.filter((testReq) => (!match.method || testReq.request.method === match.method.toUpperCase()) &&
                    (!match.url || testReq.request.urlWithParams === match.url));
            }
        }
        /**
         * Search for requests in the list of open requests, and return all that match
         * without asserting anything about the number of matches.
         */
        match(match) {
            const results = this._match(match);
            results.forEach((result) => {
                const index = this.open.indexOf(result);
                if (index !== -1) {
                    this.open.splice(index, 1);
                }
            });
            return results;
        }
        /**
         * Expect that a single outstanding request matches the given matcher, and return
         * it.
         *
         * Requests returned through this API will no longer be in the list of open requests,
         * and thus will not match twice.
         */
        expectOne(match, description) {
            description || (description = this.descriptionFromMatcher(match));
            const matches = this.match(match);
            if (matches.length > 1) {
                throw new Error(`Expected one matching request for criteria "${description}", found ${matches.length} requests.`);
            }
            if (matches.length === 0) {
                let message = `Expected one matching request for criteria "${description}", found none.`;
                if (this.open.length > 0) {
                    // Show the methods and URLs of open requests in the error, for convenience.
                    const requests = this.open.map(describeRequest).join(', ');
                    message += ` Requests received are: ${requests}.`;
                }
                throw new Error(message);
            }
            return matches[0];
        }
        /**
         * Expect that no outstanding requests match the given matcher, and throw an error
         * if any do.
         */
        expectNone(match, description) {
            description || (description = this.descriptionFromMatcher(match));
            const matches = this.match(match);
            if (matches.length > 0) {
                throw new Error(`Expected zero matching requests for criteria "${description}", found ${matches.length}.`);
            }
        }
        /**
         * Validate that there are no outstanding requests.
         */
        verify(opts = {}) {
            let open = this.open;
            // It's possible that some requests may be cancelled, and this is expected.
            // The user can ask to ignore open requests which have been cancelled.
            if (opts.ignoreCancelled) {
                open = open.filter((testReq) => !testReq.cancelled);
            }
            if (open.length > 0) {
                // Show the methods and URLs of open requests in the error, for convenience.
                const requests = open.map(describeRequest).join(', ');
                throw new Error(`Expected no open requests, found ${open.length}: ${requests}`);
            }
        }
        descriptionFromMatcher(matcher) {
            if (typeof matcher === 'string') {
                return `Match URL: ${matcher}`;
            }
            else if (typeof matcher === 'object') {
                const method = matcher.method || '(any)';
                const url = matcher.url || '(any)';
                return `Match method: ${method}, URL: ${url}`;
            }
            else {
                return `Match by function: ${matcher.name}`;
            }
        }
    };
    __setFunctionName(_classThis, "HttpClientTestingBackend");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClientTestingBackend = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClientTestingBackend = _classThis;
})();
exports.HttpClientTestingBackend = HttpClientTestingBackend;
function describeRequest(testRequest) {
    const url = testRequest.request.urlWithParams;
    const method = testRequest.request.method;
    return `${method} ${url}`;
}
