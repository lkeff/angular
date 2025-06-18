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
exports.HttpInterceptorHandler = exports.REQUESTS_CONTRIBUTE_TO_STABILITY = exports.HTTP_ROOT_INTERCEPTOR_FNS = exports.HTTP_INTERCEPTOR_FNS = exports.HTTP_INTERCEPTORS = void 0;
exports.legacyInterceptorFnFactory = legacyInterceptorFnFactory;
exports.resetFetchBackendWarningFlag = resetFetchBackendWarningFlag;
const index_1 = require("../../index");
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const backend_1 = require("./backend");
const fetch_1 = require("./fetch");
function interceptorChainEndFn(req, finalHandlerFn) {
    return finalHandlerFn(req);
}
/**
 * Constructs a `ChainedInterceptorFn` which adapts a legacy `HttpInterceptor` to the
 * `ChainedInterceptorFn` interface.
 */
function adaptLegacyInterceptorToChain(chainTailFn, interceptor) {
    return (initialRequest, finalHandlerFn) => interceptor.intercept(initialRequest, {
        handle: (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn),
    });
}
/**
 * Constructs a `ChainedInterceptorFn` which wraps and invokes a functional interceptor in the given
 * injector.
 */
function chainedInterceptorFn(chainTailFn, interceptorFn, injector) {
    return (initialRequest, finalHandlerFn) => (0, core_1.runInInjectionContext)(injector, () => interceptorFn(initialRequest, (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)));
}
/**
 * A multi-provider token that represents the array of registered
 * `HttpInterceptor` objects.
 *
 * @publicApi
 */
exports.HTTP_INTERCEPTORS = new core_1.InjectionToken(ngDevMode ? 'HTTP_INTERCEPTORS' : '');
/**
 * A multi-provided token of `HttpInterceptorFn`s.
 */
exports.HTTP_INTERCEPTOR_FNS = new core_1.InjectionToken(ngDevMode ? 'HTTP_INTERCEPTOR_FNS' : '');
/**
 * A multi-provided token of `HttpInterceptorFn`s that are only set in root.
 */
exports.HTTP_ROOT_INTERCEPTOR_FNS = new core_1.InjectionToken(ngDevMode ? 'HTTP_ROOT_INTERCEPTOR_FNS' : '');
// TODO(atscott): We need a larger discussion about stability and what should contribute to stability.
// Should the whole interceptor chain contribute to stability or just the backend request #55075?
// Should HttpClient contribute to stability automatically at all?
exports.REQUESTS_CONTRIBUTE_TO_STABILITY = new core_1.InjectionToken(ngDevMode ? 'REQUESTS_CONTRIBUTE_TO_STABILITY' : '', { providedIn: 'root', factory: () => true });
/**
 * Creates an `HttpInterceptorFn` which lazily initializes an interceptor chain from the legacy
 * class-based interceptors and runs the request through it.
 */
function legacyInterceptorFnFactory() {
    let chain = null;
    return (req, handler) => {
        var _a;
        if (chain === null) {
            const interceptors = (_a = (0, core_1.inject)(exports.HTTP_INTERCEPTORS, { optional: true })) !== null && _a !== void 0 ? _a : [];
            // Note: interceptors are wrapped right-to-left so that final execution order is
            // left-to-right. That is, if `interceptors` is the array `[a, b, c]`, we want to
            // produce a chain that is conceptually `c(b(a(end)))`, which we build from the inside
            // out.
            chain = interceptors.reduceRight(adaptLegacyInterceptorToChain, interceptorChainEndFn);
        }
        const pendingTasks = (0, core_1.inject)(core_1.PendingTasks);
        const contributeToStability = (0, core_1.inject)(exports.REQUESTS_CONTRIBUTE_TO_STABILITY);
        if (contributeToStability) {
            const removeTask = pendingTasks.add();
            return chain(req, handler).pipe((0, operators_1.finalize)(removeTask));
        }
        else {
            return chain(req, handler);
        }
    };
}
let fetchBackendWarningDisplayed = false;
/** Internal function to reset the flag in tests */
function resetFetchBackendWarningFlag() {
    fetchBackendWarningDisplayed = false;
}
let HttpInterceptorHandler = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = backend_1.HttpHandler;
    var HttpInterceptorHandler = _classThis = class extends _classSuper {
        constructor(backend, injector) {
            super();
            this.backend = backend;
            this.injector = injector;
            this.chain = null;
            this.pendingTasks = (0, core_1.inject)(core_1.PendingTasks);
            this.contributeToStability = (0, core_1.inject)(exports.REQUESTS_CONTRIBUTE_TO_STABILITY);
            // We strongly recommend using fetch backend for HTTP calls when SSR is used
            // for an application. The logic below checks if that's the case and produces
            // a warning otherwise.
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && !fetchBackendWarningDisplayed) {
                const isServer = (0, index_1.isPlatformServer)(injector.get(core_1.PLATFORM_ID));
                // This flag is necessary because provideHttpClientTesting() overrides the backend
                // even if `withFetch()` is used within the test. When the testing HTTP backend is provided,
                // no HTTP calls are actually performed during the test, so producing a warning would be
                // misleading.
                const isTestingBackend = this.backend.isTestingBackend;
                if (isServer && !(this.backend instanceof fetch_1.FetchBackend) && !isTestingBackend) {
                    fetchBackendWarningDisplayed = true;
                    injector
                        .get(core_1.ɵConsole)
                        .warn((0, core_1.ɵformatRuntimeError)(2801 /* RuntimeErrorCode.NOT_USING_FETCH_BACKEND_IN_SSR */, 'Angular detected that `HttpClient` is not configured ' +
                        "to use `fetch` APIs. It's strongly recommended to " +
                        'enable `fetch` for applications that use Server-Side Rendering ' +
                        'for better performance and compatibility. ' +
                        'To enable `fetch`, add the `withFetch()` to the `provideHttpClient()` ' +
                        'call at the root of the application.'));
                }
            }
        }
        handle(initialRequest) {
            if (this.chain === null) {
                const dedupedInterceptorFns = Array.from(new Set([
                    ...this.injector.get(exports.HTTP_INTERCEPTOR_FNS),
                    ...this.injector.get(exports.HTTP_ROOT_INTERCEPTOR_FNS, []),
                ]));
                // Note: interceptors are wrapped right-to-left so that final execution order is
                // left-to-right. That is, if `dedupedInterceptorFns` is the array `[a, b, c]`, we want to
                // produce a chain that is conceptually `c(b(a(end)))`, which we build from the inside
                // out.
                this.chain = dedupedInterceptorFns.reduceRight((nextSequencedFn, interceptorFn) => chainedInterceptorFn(nextSequencedFn, interceptorFn, this.injector), interceptorChainEndFn);
            }
            if (this.contributeToStability) {
                const removeTask = this.pendingTasks.add();
                return this.chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest)).pipe((0, operators_1.finalize)(removeTask));
            }
            else {
                return this.chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest));
            }
        }
    };
    __setFunctionName(_classThis, "HttpInterceptorHandler");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpInterceptorHandler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpInterceptorHandler = _classThis;
})();
exports.HttpInterceptorHandler = HttpInterceptorHandler;
