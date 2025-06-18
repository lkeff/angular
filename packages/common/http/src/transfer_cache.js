"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_TYPE = exports.REQ_URL = exports.STATUS_TEXT = exports.STATUS = exports.HEADERS = exports.BODY = exports.HTTP_TRANSFER_CACHE_ORIGIN_MAP = void 0;
exports.transferCacheInterceptorFn = transferCacheInterceptorFn;
exports.withHttpTransferCache = withHttpTransferCache;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const headers_1 = require("./headers");
const interceptor_1 = require("./interceptor");
const response_1 = require("./response");
/**
 * If your application uses different HTTP origins to make API calls (via `HttpClient`) on the server and
 * on the client, the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token allows you to establish a mapping
 * between those origins, so that `HttpTransferCache` feature can recognize those requests as the same
 * ones and reuse the data cached on the server during hydration on the client.
 *
 * **Important note**: the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token should *only* be provided in
 * the *server* code of your application (typically in the `app.server.config.ts` script). Angular throws an
 * error if it detects that the token is defined while running on the client.
 *
 * @usageNotes
 *
 * When the same API endpoint is accessed via `http://internal-domain.com:8080` on the server and
 * via `https://external-domain.com` on the client, you can use the following configuration:
 * ```ts
 * // in app.server.config.ts
 * {
 *     provide: HTTP_TRANSFER_CACHE_ORIGIN_MAP,
 *     useValue: {
 *         'http://internal-domain.com:8080': 'https://external-domain.com'
 *     }
 * }
 * ```
 *
 * @publicApi
 */
exports.HTTP_TRANSFER_CACHE_ORIGIN_MAP = new core_1.InjectionToken(ngDevMode ? 'HTTP_TRANSFER_CACHE_ORIGIN_MAP' : '');
/**
 * Keys within cached response data structure.
 */
exports.BODY = 'b';
exports.HEADERS = 'h';
exports.STATUS = 's';
exports.STATUS_TEXT = 'st';
exports.REQ_URL = 'u';
exports.RESPONSE_TYPE = 'rt';
const CACHE_OPTIONS = new core_1.InjectionToken(ngDevMode ? 'HTTP_TRANSFER_STATE_CACHE_OPTIONS' : '');
/**
 * A list of allowed HTTP methods to cache.
 */
const ALLOWED_METHODS = ['GET', 'HEAD'];
function transferCacheInterceptorFn(req, next) {
    var _a;
    const _b = (0, core_1.inject)(CACHE_OPTIONS), { isCacheActive } = _b, globalOptions = __rest(_b, ["isCacheActive"]);
    const { transferCache: requestOptions, method: requestMethod } = req;
    // In the following situations we do not want to cache the request
    if (!isCacheActive ||
        requestOptions === false ||
        // POST requests are allowed either globally or at request level
        (requestMethod === 'POST' && !globalOptions.includePostRequests && !requestOptions) ||
        (requestMethod !== 'POST' && !ALLOWED_METHODS.includes(requestMethod)) ||
        // Do not cache request that require authorization when includeRequestsWithAuthHeaders is falsey
        (!globalOptions.includeRequestsWithAuthHeaders && hasAuthHeaders(req)) ||
        ((_a = globalOptions.filter) === null || _a === void 0 ? void 0 : _a.call(globalOptions, req)) === false) {
        return next(req);
    }
    const transferState = (0, core_1.inject)(core_1.TransferState);
    const originMap = (0, core_1.inject)(exports.HTTP_TRANSFER_CACHE_ORIGIN_MAP, {
        optional: true,
    });
    if (typeof ngServerMode !== 'undefined' && !ngServerMode && originMap) {
        throw new core_1.ɵRuntimeError(2803 /* RuntimeErrorCode.HTTP_ORIGIN_MAP_USED_IN_CLIENT */, ngDevMode &&
            'Angular detected that the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token is configured and ' +
                'present in the client side code. Please ensure that this token is only provided in the ' +
                'server code of the application.');
    }
    const requestUrl = typeof ngServerMode !== 'undefined' && ngServerMode && originMap
        ? mapRequestOriginUrl(req.url, originMap)
        : req.url;
    const storeKey = makeCacheKey(req, requestUrl);
    const response = transferState.get(storeKey, null);
    let headersToInclude = globalOptions.includeHeaders;
    if (typeof requestOptions === 'object' && requestOptions.includeHeaders) {
        // Request-specific config takes precedence over the global config.
        headersToInclude = requestOptions.includeHeaders;
    }
    if (response) {
        const { [exports.BODY]: undecodedBody, [exports.RESPONSE_TYPE]: responseType, [exports.HEADERS]: httpHeaders, [exports.STATUS]: status, [exports.STATUS_TEXT]: statusText, [exports.REQ_URL]: url, } = response;
        // Request found in cache. Respond using it.
        let body = undecodedBody;
        switch (responseType) {
            case 'arraybuffer':
                body = new TextEncoder().encode(undecodedBody).buffer;
                break;
            case 'blob':
                body = new Blob([undecodedBody]);
                break;
        }
        // We want to warn users accessing a header provided from the cache
        // That HttpTransferCache alters the headers
        // The warning will be logged a single time by HttpHeaders instance
        let headers = new headers_1.HttpHeaders(httpHeaders);
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            // Append extra logic in dev mode to produce a warning when a header
            // that was not transferred to the client is accessed in the code via `get`
            // and `has` calls.
            headers = appendMissingHeadersDetection(req.url, headers, headersToInclude !== null && headersToInclude !== void 0 ? headersToInclude : []);
        }
        return (0, rxjs_1.of)(new response_1.HttpResponse({
            body,
            headers,
            status,
            statusText,
            url,
        }));
    }
    // Request not found in cache. Make the request and cache it if on the server.
    return next(req).pipe((0, operators_1.tap)((event) => {
        if (event instanceof response_1.HttpResponse && typeof ngServerMode !== 'undefined' && ngServerMode) {
            transferState.set(storeKey, {
                [exports.BODY]: event.body,
                [exports.HEADERS]: getFilteredHeaders(event.headers, headersToInclude),
                [exports.STATUS]: event.status,
                [exports.STATUS_TEXT]: event.statusText,
                [exports.REQ_URL]: requestUrl,
                [exports.RESPONSE_TYPE]: req.responseType,
            });
        }
    }));
}
/** @returns true when the requests contains autorization related headers. */
function hasAuthHeaders(req) {
    return req.headers.has('authorization') || req.headers.has('proxy-authorization');
}
function getFilteredHeaders(headers, includeHeaders) {
    if (!includeHeaders) {
        return {};
    }
    const headersMap = {};
    for (const key of includeHeaders) {
        const values = headers.getAll(key);
        if (values !== null) {
            headersMap[key] = values;
        }
    }
    return headersMap;
}
function sortAndConcatParams(params) {
    return [...params.keys()]
        .sort()
        .map((k) => `${k}=${params.getAll(k)}`)
        .join('&');
}
function makeCacheKey(request, mappedRequestUrl) {
    // make the params encoded same as a url so it's easy to identify
    const { params, method, responseType } = request;
    const encodedParams = sortAndConcatParams(params);
    let serializedBody = request.serializeBody();
    if (serializedBody instanceof URLSearchParams) {
        serializedBody = sortAndConcatParams(serializedBody);
    }
    else if (typeof serializedBody !== 'string') {
        serializedBody = '';
    }
    const key = [method, responseType, mappedRequestUrl, serializedBody, encodedParams].join('|');
    const hash = generateHash(key);
    return (0, core_1.makeStateKey)(hash);
}
/**
 * A method that returns a hash representation of a string using a variant of DJB2 hash
 * algorithm.
 *
 * This is the same hashing logic that is used to generate component ids.
 */
function generateHash(value) {
    let hash = 0;
    for (const char of value) {
        hash = (Math.imul(31, hash) + char.charCodeAt(0)) << 0;
    }
    // Force positive number hash.
    // 2147483647 = equivalent of Integer.MAX_VALUE.
    hash += 2147483647 + 1;
    return hash.toString();
}
/**
 * Returns the DI providers needed to enable HTTP transfer cache.
 *
 * By default, when using server rendering, requests are performed twice: once on the server and
 * other one on the browser.
 *
 * When these providers are added, requests performed on the server are cached and reused during the
 * bootstrapping of the application in the browser thus avoiding duplicate requests and reducing
 * load time.
 *
 */
function withHttpTransferCache(cacheOptions) {
    return [
        {
            provide: CACHE_OPTIONS,
            useFactory: () => {
                (0, core_1.ɵperformanceMarkFeature)('NgHttpTransferCache');
                return Object.assign({ isCacheActive: true }, cacheOptions);
            },
        },
        {
            provide: interceptor_1.HTTP_ROOT_INTERCEPTOR_FNS,
            useValue: transferCacheInterceptorFn,
            multi: true,
        },
        {
            provide: core_1.APP_BOOTSTRAP_LISTENER,
            multi: true,
            useFactory: () => {
                const appRef = (0, core_1.inject)(core_1.ApplicationRef);
                const cacheState = (0, core_1.inject)(CACHE_OPTIONS);
                return () => {
                    appRef.whenStable().then(() => {
                        cacheState.isCacheActive = false;
                    });
                };
            },
        },
    ];
}
/**
 * This function will add a proxy to an HttpHeader to intercept calls to get/has
 * and log a warning if the header entry requested has been removed
 */
function appendMissingHeadersDetection(url, headers, headersToInclude) {
    const warningProduced = new Set();
    return new Proxy(headers, {
        get(target, prop) {
            const value = Reflect.get(target, prop);
            const methods = new Set(['get', 'has', 'getAll']);
            if (typeof value !== 'function' || !methods.has(prop)) {
                return value;
            }
            return (headerName) => {
                // We log when the key has been removed and a warning hasn't been produced for the header
                const key = (prop + ':' + headerName).toLowerCase(); // e.g. `get:cache-control`
                if (!headersToInclude.includes(headerName) && !warningProduced.has(key)) {
                    warningProduced.add(key);
                    const truncatedUrl = (0, core_1.ɵtruncateMiddle)(url);
                    // TODO: create Error guide for this warning
                    console.warn((0, core_1.ɵformatRuntimeError)(2802 /* RuntimeErrorCode.HEADERS_ALTERED_BY_TRANSFER_CACHE */, `Angular detected that the \`${headerName}\` header is accessed, but the value of the header ` +
                        `was not transferred from the server to the client by the HttpTransferCache. ` +
                        `To include the value of the \`${headerName}\` header for the \`${truncatedUrl}\` request, ` +
                        `use the \`includeHeaders\` list. The \`includeHeaders\` can be defined either ` +
                        `on a request level by adding the \`transferCache\` parameter, or on an application ` +
                        `level by adding the \`httpCacheTransfer.includeHeaders\` argument to the ` +
                        `\`provideClientHydration()\` call. `));
                }
                // invoking the original method
                return value.apply(target, [headerName]);
            };
        },
    });
}
function mapRequestOriginUrl(url, originMap) {
    const origin = new URL(url, 'resolve://').origin;
    const mappedOrigin = originMap[origin];
    if (!mappedOrigin) {
        return url;
    }
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        verifyMappedOrigin(mappedOrigin);
    }
    return url.replace(origin, mappedOrigin);
}
function verifyMappedOrigin(url) {
    if (new URL(url, 'resolve://').pathname !== '/') {
        throw new core_1.ɵRuntimeError(2804 /* RuntimeErrorCode.HTTP_ORIGIN_MAP_CONTAINS_PATH */, 'Angular detected a URL with a path segment in the value provided for the ' +
            `\`HTTP_TRANSFER_CACHE_ORIGIN_MAP\` token: ${url}. The map should only contain origins ` +
            'without any other segments.');
    }
}
