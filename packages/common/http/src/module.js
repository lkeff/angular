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
exports.HttpClientJsonpModule = exports.HttpClientModule = exports.HttpClientXsrfModule = void 0;
const core_1 = require("@angular/core");
const interceptor_1 = require("./interceptor");
const provider_1 = require("./provider");
const xsrf_1 = require("./xsrf");
/**
 * Configures XSRF protection support for outgoing requests.
 *
 * For a server that supports a cookie-based XSRF protection system,
 * use directly to configure XSRF protection with the correct
 * cookie and header names.
 *
 * If no names are supplied, the default cookie name is `XSRF-TOKEN`
 * and the default header name is `X-XSRF-TOKEN`.
 *
 * @publicApi
 * @deprecated Use withXsrfConfiguration({cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN'}) as
 *     providers instead or `withNoXsrfProtection` if you want to disabled XSRF protection.
 */
let HttpClientXsrfModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            providers: [
                xsrf_1.HttpXsrfInterceptor,
                { provide: interceptor_1.HTTP_INTERCEPTORS, useExisting: xsrf_1.HttpXsrfInterceptor, multi: true },
                { provide: xsrf_1.HttpXsrfTokenExtractor, useClass: xsrf_1.HttpXsrfCookieExtractor },
                (0, provider_1.withXsrfConfiguration)({
                    cookieName: xsrf_1.XSRF_DEFAULT_COOKIE_NAME,
                    headerName: xsrf_1.XSRF_DEFAULT_HEADER_NAME,
                }).ɵproviders,
                { provide: xsrf_1.XSRF_ENABLED, useValue: true },
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpClientXsrfModule = _classThis = class {
        /**
         * Disable the default XSRF protection.
         */
        static disable() {
            return {
                ngModule: HttpClientXsrfModule,
                providers: [(0, provider_1.withNoXsrfProtection)().ɵproviders],
            };
        }
        /**
         * Configure XSRF protection.
         * @param options An object that can specify either or both
         * cookie name or header name.
         * - Cookie name default is `XSRF-TOKEN`.
         * - Header name default is `X-XSRF-TOKEN`.
         *
         */
        static withOptions(options = {}) {
            return {
                ngModule: HttpClientXsrfModule,
                providers: (0, provider_1.withXsrfConfiguration)(options).ɵproviders,
            };
        }
    };
    __setFunctionName(_classThis, "HttpClientXsrfModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClientXsrfModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClientXsrfModule = _classThis;
})();
exports.HttpClientXsrfModule = HttpClientXsrfModule;
/**
 * Configures the dependency injector for `HttpClient`
 * with supporting services for XSRF. Automatically imported by `HttpClientModule`.
 *
 * You can add interceptors to the chain behind `HttpClient` by binding them to the
 * multiprovider for built-in DI token `HTTP_INTERCEPTORS`.
 *
 * @publicApi
 * @deprecated use `provideHttpClient(withInterceptorsFromDi())` as providers instead
 */
let HttpClientModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            /**
             * Configures the dependency injector where it is imported
             * with supporting services for HTTP communications.
             */
            providers: [(0, provider_1.provideHttpClient)((0, provider_1.withInterceptorsFromDi)())],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpClientModule = _classThis = class {
    };
    __setFunctionName(_classThis, "HttpClientModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClientModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClientModule = _classThis;
})();
exports.HttpClientModule = HttpClientModule;
/**
 * Configures the dependency injector for `HttpClient`
 * with supporting services for JSONP.
 * Without this module, Jsonp requests reach the backend
 * with method JSONP, where they are rejected.
 *
 * @publicApi
 * @deprecated `withJsonpSupport()` as providers instead
 */
let HttpClientJsonpModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            providers: [(0, provider_1.withJsonpSupport)().ɵproviders],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpClientJsonpModule = _classThis = class {
    };
    __setFunctionName(_classThis, "HttpClientJsonpModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClientJsonpModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClientJsonpModule = _classThis;
})();
exports.HttpClientJsonpModule = HttpClientJsonpModule;
