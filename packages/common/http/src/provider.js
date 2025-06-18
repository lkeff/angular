"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpFeatureKind = void 0;
exports.provideHttpClient = provideHttpClient;
exports.withInterceptors = withInterceptors;
exports.withInterceptorsFromDi = withInterceptorsFromDi;
exports.withXsrfConfiguration = withXsrfConfiguration;
exports.withNoXsrfProtection = withNoXsrfProtection;
exports.withJsonpSupport = withJsonpSupport;
exports.withRequestsMadeViaParent = withRequestsMadeViaParent;
exports.withFetch = withFetch;
const core_1 = require("@angular/core");
const backend_1 = require("./backend");
const client_1 = require("./client");
const fetch_1 = require("./fetch");
const interceptor_1 = require("./interceptor");
const jsonp_1 = require("./jsonp");
const xhr_1 = require("./xhr");
const xsrf_1 = require("./xsrf");
/**
 * Identifies a particular kind of `HttpFeature`.
 *
 * @publicApi
 */
var HttpFeatureKind;
(function (HttpFeatureKind) {
    HttpFeatureKind[HttpFeatureKind["Interceptors"] = 0] = "Interceptors";
    HttpFeatureKind[HttpFeatureKind["LegacyInterceptors"] = 1] = "LegacyInterceptors";
    HttpFeatureKind[HttpFeatureKind["CustomXsrfConfiguration"] = 2] = "CustomXsrfConfiguration";
    HttpFeatureKind[HttpFeatureKind["NoXsrfProtection"] = 3] = "NoXsrfProtection";
    HttpFeatureKind[HttpFeatureKind["JsonpSupport"] = 4] = "JsonpSupport";
    HttpFeatureKind[HttpFeatureKind["RequestsMadeViaParent"] = 5] = "RequestsMadeViaParent";
    HttpFeatureKind[HttpFeatureKind["Fetch"] = 6] = "Fetch";
})(HttpFeatureKind || (exports.HttpFeatureKind = HttpFeatureKind = {}));
function makeHttpFeature(kind, providers) {
    return {
        ɵkind: kind,
        ɵproviders: providers,
    };
}
/**
 * Configures Angular's `HttpClient` service to be available for injection.
 *
 * By default, `HttpClient` will be configured for injection with its default options for XSRF
 * protection of outgoing requests. Additional configuration options can be provided by passing
 * feature functions to `provideHttpClient`. For example, HTTP interceptors can be added using the
 * `withInterceptors(...)` feature.
 *
 * <div class="docs-alert docs-alert-helpful">
 *
 * It's strongly recommended to enable
 * [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for applications that use
 * Server-Side Rendering for better performance and compatibility. To enable `fetch`, add
 * `withFetch()` feature to the `provideHttpClient()` call at the root of the application:
 *
 * ```ts
 * provideHttpClient(withFetch());
 * ```
 *
 * </div>
 *
 * @see {@link withInterceptors}
 * @see {@link withInterceptorsFromDi}
 * @see {@link withXsrfConfiguration}
 * @see {@link withNoXsrfProtection}
 * @see {@link withJsonpSupport}
 * @see {@link withRequestsMadeViaParent}
 * @see {@link withFetch}
 */
function provideHttpClient(...features) {
    if (ngDevMode) {
        const featureKinds = new Set(features.map((f) => f.ɵkind));
        if (featureKinds.has(HttpFeatureKind.NoXsrfProtection) &&
            featureKinds.has(HttpFeatureKind.CustomXsrfConfiguration)) {
            throw new Error(ngDevMode
                ? `Configuration error: found both withXsrfConfiguration() and withNoXsrfProtection() in the same call to provideHttpClient(), which is a contradiction.`
                : '');
        }
    }
    const providers = [
        client_1.HttpClient,
        xhr_1.HttpXhrBackend,
        interceptor_1.HttpInterceptorHandler,
        { provide: backend_1.HttpHandler, useExisting: interceptor_1.HttpInterceptorHandler },
        {
            provide: backend_1.HttpBackend,
            useFactory: () => {
                var _a;
                return (_a = (0, core_1.inject)(fetch_1.FETCH_BACKEND, { optional: true })) !== null && _a !== void 0 ? _a : (0, core_1.inject)(xhr_1.HttpXhrBackend);
            },
        },
        {
            provide: interceptor_1.HTTP_INTERCEPTOR_FNS,
            useValue: xsrf_1.xsrfInterceptorFn,
            multi: true,
        },
        { provide: xsrf_1.XSRF_ENABLED, useValue: true },
        { provide: xsrf_1.HttpXsrfTokenExtractor, useClass: xsrf_1.HttpXsrfCookieExtractor },
    ];
    for (const feature of features) {
        providers.push(...feature.ɵproviders);
    }
    return (0, core_1.makeEnvironmentProviders)(providers);
}
/**
 * Adds one or more functional-style HTTP interceptors to the configuration of the `HttpClient`
 * instance.
 *
 * @see {@link HttpInterceptorFn}
 * @see {@link provideHttpClient}
 * @publicApi
 */
function withInterceptors(interceptorFns) {
    return makeHttpFeature(HttpFeatureKind.Interceptors, interceptorFns.map((interceptorFn) => {
        return {
            provide: interceptor_1.HTTP_INTERCEPTOR_FNS,
            useValue: interceptorFn,
            multi: true,
        };
    }));
}
const LEGACY_INTERCEPTOR_FN = new core_1.InjectionToken(ngDevMode ? 'LEGACY_INTERCEPTOR_FN' : '');
/**
 * Includes class-based interceptors configured using a multi-provider in the current injector into
 * the configured `HttpClient` instance.
 *
 * Prefer `withInterceptors` and functional interceptors instead, as support for DI-provided
 * interceptors may be phased out in a later release.
 *
 * @see {@link HttpInterceptor}
 * @see {@link HTTP_INTERCEPTORS}
 * @see {@link provideHttpClient}
 */
function withInterceptorsFromDi() {
    // Note: the legacy interceptor function is provided here via an intermediate token
    // (`LEGACY_INTERCEPTOR_FN`), using a pattern which guarantees that if these providers are
    // included multiple times, all of the multi-provider entries will have the same instance of the
    // interceptor function. That way, the `HttpINterceptorHandler` will dedup them and legacy
    // interceptors will not run multiple times.
    return makeHttpFeature(HttpFeatureKind.LegacyInterceptors, [
        {
            provide: LEGACY_INTERCEPTOR_FN,
            useFactory: interceptor_1.legacyInterceptorFnFactory,
        },
        {
            provide: interceptor_1.HTTP_INTERCEPTOR_FNS,
            useExisting: LEGACY_INTERCEPTOR_FN,
            multi: true,
        },
    ]);
}
/**
 * Customizes the XSRF protection for the configuration of the current `HttpClient` instance.
 *
 * This feature is incompatible with the `withNoXsrfProtection` feature.
 *
 * @see {@link provideHttpClient}
 */
function withXsrfConfiguration({ cookieName, headerName, }) {
    const providers = [];
    if (cookieName !== undefined) {
        providers.push({ provide: xsrf_1.XSRF_COOKIE_NAME, useValue: cookieName });
    }
    if (headerName !== undefined) {
        providers.push({ provide: xsrf_1.XSRF_HEADER_NAME, useValue: headerName });
    }
    return makeHttpFeature(HttpFeatureKind.CustomXsrfConfiguration, providers);
}
/**
 * Disables XSRF protection in the configuration of the current `HttpClient` instance.
 *
 * This feature is incompatible with the `withXsrfConfiguration` feature.
 *
 * @see {@link provideHttpClient}
 */
function withNoXsrfProtection() {
    return makeHttpFeature(HttpFeatureKind.NoXsrfProtection, [
        {
            provide: xsrf_1.XSRF_ENABLED,
            useValue: false,
        },
    ]);
}
/**
 * Add JSONP support to the configuration of the current `HttpClient` instance.
 *
 * @see {@link provideHttpClient}
 */
function withJsonpSupport() {
    return makeHttpFeature(HttpFeatureKind.JsonpSupport, [
        jsonp_1.JsonpClientBackend,
        { provide: jsonp_1.JsonpCallbackContext, useFactory: jsonp_1.jsonpCallbackContext },
        { provide: interceptor_1.HTTP_INTERCEPTOR_FNS, useValue: jsonp_1.jsonpInterceptorFn, multi: true },
    ]);
}
/**
 * Configures the current `HttpClient` instance to make requests via the parent injector's
 * `HttpClient` instead of directly.
 *
 * By default, `provideHttpClient` configures `HttpClient` in its injector to be an independent
 * instance. For example, even if `HttpClient` is configured in the parent injector with
 * one or more interceptors, they will not intercept requests made via this instance.
 *
 * With this option enabled, once the request has passed through the current injector's
 * interceptors, it will be delegated to the parent injector's `HttpClient` chain instead of
 * dispatched directly, and interceptors in the parent configuration will be applied to the request.
 *
 * If there are several `HttpClient` instances in the injector hierarchy, it's possible for
 * `withRequestsMadeViaParent` to be used at multiple levels, which will cause the request to
 * "bubble up" until either reaching the root level or an `HttpClient` which was not configured with
 * this option.
 *
 * @see {@link provideHttpClient}
 * @publicApi 19.0
 */
function withRequestsMadeViaParent() {
    return makeHttpFeature(HttpFeatureKind.RequestsMadeViaParent, [
        {
            provide: backend_1.HttpBackend,
            useFactory: () => {
                const handlerFromParent = (0, core_1.inject)(backend_1.HttpHandler, { skipSelf: true, optional: true });
                if (ngDevMode && handlerFromParent === null) {
                    throw new Error('withRequestsMadeViaParent() can only be used when the parent injector also configures HttpClient');
                }
                return handlerFromParent;
            },
        },
    ]);
}
/**
 * Configures the current `HttpClient` instance to make requests using the fetch API.
 *
 * Note: The Fetch API doesn't support progress report on uploads.
 *
 * @publicApi
 */
function withFetch() {
    return makeHttpFeature(HttpFeatureKind.Fetch, [
        fetch_1.FetchBackend,
        { provide: fetch_1.FETCH_BACKEND, useExisting: fetch_1.FetchBackend },
        { provide: backend_1.HttpBackend, useExisting: fetch_1.FetchBackend },
    ]);
}
