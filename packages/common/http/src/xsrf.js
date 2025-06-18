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
exports.HttpXsrfInterceptor = exports.HttpXsrfCookieExtractor = exports.HttpXsrfTokenExtractor = exports.XSRF_HEADER_NAME = exports.XSRF_DEFAULT_HEADER_NAME = exports.XSRF_COOKIE_NAME = exports.XSRF_DEFAULT_COOKIE_NAME = exports.XSRF_ENABLED = void 0;
exports.xsrfInterceptorFn = xsrfInterceptorFn;
const index_1 = require("../../index");
const core_1 = require("@angular/core");
exports.XSRF_ENABLED = new core_1.InjectionToken(ngDevMode ? 'XSRF_ENABLED' : '');
exports.XSRF_DEFAULT_COOKIE_NAME = 'XSRF-TOKEN';
exports.XSRF_COOKIE_NAME = new core_1.InjectionToken(ngDevMode ? 'XSRF_COOKIE_NAME' : '', {
    providedIn: 'root',
    factory: () => exports.XSRF_DEFAULT_COOKIE_NAME,
});
exports.XSRF_DEFAULT_HEADER_NAME = 'X-XSRF-TOKEN';
exports.XSRF_HEADER_NAME = new core_1.InjectionToken(ngDevMode ? 'XSRF_HEADER_NAME' : '', {
    providedIn: 'root',
    factory: () => exports.XSRF_DEFAULT_HEADER_NAME,
});
/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 * @publicApi
 */
class HttpXsrfTokenExtractor {
}
exports.HttpXsrfTokenExtractor = HttpXsrfTokenExtractor;
/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
let HttpXsrfCookieExtractor = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpXsrfCookieExtractor = _classThis = class {
        constructor(doc, cookieName) {
            this.doc = doc;
            this.cookieName = cookieName;
            this.lastCookieString = '';
            this.lastToken = null;
            /**
             * @internal for testing
             */
            this.parseCount = 0;
        }
        getToken() {
            if (typeof ngServerMode !== 'undefined' && ngServerMode) {
                return null;
            }
            const cookieString = this.doc.cookie || '';
            if (cookieString !== this.lastCookieString) {
                this.parseCount++;
                this.lastToken = (0, index_1.ɵparseCookieValue)(cookieString, this.cookieName);
                this.lastCookieString = cookieString;
            }
            return this.lastToken;
        }
    };
    __setFunctionName(_classThis, "HttpXsrfCookieExtractor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpXsrfCookieExtractor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpXsrfCookieExtractor = _classThis;
})();
exports.HttpXsrfCookieExtractor = HttpXsrfCookieExtractor;
function xsrfInterceptorFn(req, next) {
    const lcUrl = req.url.toLowerCase();
    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don't require a token, and absolute URLs require special handling
    // anyway as the cookie set
    // on our origin is not the same as the token expected by another origin.
    if (!(0, core_1.inject)(exports.XSRF_ENABLED) ||
        req.method === 'GET' ||
        req.method === 'HEAD' ||
        lcUrl.startsWith('http://') ||
        lcUrl.startsWith('https://')) {
        return next(req);
    }
    const token = (0, core_1.inject)(HttpXsrfTokenExtractor).getToken();
    const headerName = (0, core_1.inject)(exports.XSRF_HEADER_NAME);
    // Be careful not to overwrite an existing header of the same name.
    if (token != null && !req.headers.has(headerName)) {
        req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next(req);
}
/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
let HttpXsrfInterceptor = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpXsrfInterceptor = _classThis = class {
        constructor(injector) {
            this.injector = injector;
        }
        intercept(initialRequest, next) {
            return (0, core_1.runInInjectionContext)(this.injector, () => xsrfInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
        }
    };
    __setFunctionName(_classThis, "HttpXsrfInterceptor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpXsrfInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpXsrfInterceptor = _classThis;
})();
exports.HttpXsrfInterceptor = HttpXsrfInterceptor;
