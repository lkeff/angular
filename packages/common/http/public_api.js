"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpXsrfTokenExtractor = exports.HttpXhrBackend = exports.HTTP_TRANSFER_CACHE_ORIGIN_MAP = exports.ɵwithHttpTransferCache = exports.httpResource = exports.HttpStatusCode = exports.HttpResponseBase = exports.HttpResponse = exports.HttpHeaderResponse = exports.HttpEventType = exports.HttpErrorResponse = exports.HttpRequest = exports.withXsrfConfiguration = exports.withRequestsMadeViaParent = exports.withNoXsrfProtection = exports.withJsonpSupport = exports.withInterceptorsFromDi = exports.withInterceptors = exports.withFetch = exports.provideHttpClient = exports.HttpFeatureKind = exports.HttpUrlEncodingCodec = exports.HttpParams = exports.HttpClientXsrfModule = exports.HttpClientModule = exports.HttpClientJsonpModule = exports.JsonpInterceptor = exports.JsonpClientBackend = exports.ɵHttpInterceptingHandler = exports.ɵHttpInterceptorHandler = exports.HTTP_INTERCEPTORS = exports.HttpHeaders = exports.FetchBackend = exports.HttpContextToken = exports.HttpContext = exports.HttpClient = exports.HttpHandler = exports.HttpBackend = void 0;
var backend_1 = require("./src/backend");
Object.defineProperty(exports, "HttpBackend", { enumerable: true, get: function () { return backend_1.HttpBackend; } });
Object.defineProperty(exports, "HttpHandler", { enumerable: true, get: function () { return backend_1.HttpHandler; } });
var client_1 = require("./src/client");
Object.defineProperty(exports, "HttpClient", { enumerable: true, get: function () { return client_1.HttpClient; } });
var context_1 = require("./src/context");
Object.defineProperty(exports, "HttpContext", { enumerable: true, get: function () { return context_1.HttpContext; } });
Object.defineProperty(exports, "HttpContextToken", { enumerable: true, get: function () { return context_1.HttpContextToken; } });
var fetch_1 = require("./src/fetch");
Object.defineProperty(exports, "FetchBackend", { enumerable: true, get: function () { return fetch_1.FetchBackend; } });
var headers_1 = require("./src/headers");
Object.defineProperty(exports, "HttpHeaders", { enumerable: true, get: function () { return headers_1.HttpHeaders; } });
var interceptor_1 = require("./src/interceptor");
Object.defineProperty(exports, "HTTP_INTERCEPTORS", { enumerable: true, get: function () { return interceptor_1.HTTP_INTERCEPTORS; } });
Object.defineProperty(exports, "\u0275HttpInterceptorHandler", { enumerable: true, get: function () { return interceptor_1.HttpInterceptorHandler; } });
Object.defineProperty(exports, "\u0275HttpInterceptingHandler", { enumerable: true, get: function () { return interceptor_1.HttpInterceptorHandler; } });
var jsonp_1 = require("./src/jsonp");
Object.defineProperty(exports, "JsonpClientBackend", { enumerable: true, get: function () { return jsonp_1.JsonpClientBackend; } });
Object.defineProperty(exports, "JsonpInterceptor", { enumerable: true, get: function () { return jsonp_1.JsonpInterceptor; } });
var module_1 = require("./src/module");
Object.defineProperty(exports, "HttpClientJsonpModule", { enumerable: true, get: function () { return module_1.HttpClientJsonpModule; } });
Object.defineProperty(exports, "HttpClientModule", { enumerable: true, get: function () { return module_1.HttpClientModule; } });
Object.defineProperty(exports, "HttpClientXsrfModule", { enumerable: true, get: function () { return module_1.HttpClientXsrfModule; } });
var params_1 = require("./src/params");
Object.defineProperty(exports, "HttpParams", { enumerable: true, get: function () { return params_1.HttpParams; } });
Object.defineProperty(exports, "HttpUrlEncodingCodec", { enumerable: true, get: function () { return params_1.HttpUrlEncodingCodec; } });
var provider_1 = require("./src/provider");
Object.defineProperty(exports, "HttpFeatureKind", { enumerable: true, get: function () { return provider_1.HttpFeatureKind; } });
Object.defineProperty(exports, "provideHttpClient", { enumerable: true, get: function () { return provider_1.provideHttpClient; } });
Object.defineProperty(exports, "withFetch", { enumerable: true, get: function () { return provider_1.withFetch; } });
Object.defineProperty(exports, "withInterceptors", { enumerable: true, get: function () { return provider_1.withInterceptors; } });
Object.defineProperty(exports, "withInterceptorsFromDi", { enumerable: true, get: function () { return provider_1.withInterceptorsFromDi; } });
Object.defineProperty(exports, "withJsonpSupport", { enumerable: true, get: function () { return provider_1.withJsonpSupport; } });
Object.defineProperty(exports, "withNoXsrfProtection", { enumerable: true, get: function () { return provider_1.withNoXsrfProtection; } });
Object.defineProperty(exports, "withRequestsMadeViaParent", { enumerable: true, get: function () { return provider_1.withRequestsMadeViaParent; } });
Object.defineProperty(exports, "withXsrfConfiguration", { enumerable: true, get: function () { return provider_1.withXsrfConfiguration; } });
var request_1 = require("./src/request");
Object.defineProperty(exports, "HttpRequest", { enumerable: true, get: function () { return request_1.HttpRequest; } });
var response_1 = require("./src/response");
Object.defineProperty(exports, "HttpErrorResponse", { enumerable: true, get: function () { return response_1.HttpErrorResponse; } });
Object.defineProperty(exports, "HttpEventType", { enumerable: true, get: function () { return response_1.HttpEventType; } });
Object.defineProperty(exports, "HttpHeaderResponse", { enumerable: true, get: function () { return response_1.HttpHeaderResponse; } });
Object.defineProperty(exports, "HttpResponse", { enumerable: true, get: function () { return response_1.HttpResponse; } });
Object.defineProperty(exports, "HttpResponseBase", { enumerable: true, get: function () { return response_1.HttpResponseBase; } });
Object.defineProperty(exports, "HttpStatusCode", { enumerable: true, get: function () { return response_1.HttpStatusCode; } });
var resource_1 = require("./src/resource");
Object.defineProperty(exports, "httpResource", { enumerable: true, get: function () { return resource_1.httpResource; } });
var transfer_cache_1 = require("./src/transfer_cache");
Object.defineProperty(exports, "\u0275withHttpTransferCache", { enumerable: true, get: function () { return transfer_cache_1.withHttpTransferCache; } });
Object.defineProperty(exports, "HTTP_TRANSFER_CACHE_ORIGIN_MAP", { enumerable: true, get: function () { return transfer_cache_1.HTTP_TRANSFER_CACHE_ORIGIN_MAP; } });
var xhr_1 = require("./src/xhr");
Object.defineProperty(exports, "HttpXhrBackend", { enumerable: true, get: function () { return xhr_1.HttpXhrBackend; } });
var xsrf_1 = require("./src/xsrf");
Object.defineProperty(exports, "HttpXsrfTokenExtractor", { enumerable: true, get: function () { return xsrf_1.HttpXsrfTokenExtractor; } });
// Private exports
__exportStar(require("./src/private_export"), exports);
