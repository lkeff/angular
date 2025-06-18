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
exports.ROUTER_INITIALIZER = exports.RouterModule = exports.ROUTER_PROVIDERS = exports.ROUTER_FORROOT_GUARD = void 0;
exports.provideRouterScroller = provideRouterScroller;
exports.provideForRootGuard = provideForRootGuard;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const empty_outlet_1 = require("./components/empty_outlet");
const router_link_1 = require("./directives/router_link");
const router_link_active_1 = require("./directives/router_link_active");
const router_outlet_1 = require("./directives/router_outlet");
const navigation_transition_1 = require("./navigation_transition");
const provide_router_1 = require("./provide_router");
const router_1 = require("./router");
const router_config_1 = require("./router_config");
const router_config_loader_1 = require("./router_config_loader");
const router_outlet_context_1 = require("./router_outlet_context");
const router_scroller_1 = require("./router_scroller");
const router_state_1 = require("./router_state");
const url_tree_1 = require("./url_tree");
/**
 * The directives defined in the `RouterModule`.
 */
const ROUTER_DIRECTIVES = [router_outlet_1.RouterOutlet, router_link_1.RouterLink, router_link_active_1.RouterLinkActive, empty_outlet_1.EmptyOutletComponent];
/**
 * @docsNotRequired
 */
exports.ROUTER_FORROOT_GUARD = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'router duplicate forRoot guard' : '');
// TODO(atscott): All of these except `ActivatedRoute` are `providedIn: 'root'`. They are only kept
// here to avoid a breaking change whereby the provider order matters based on where the
// `RouterModule`/`RouterTestingModule` is imported. These can/should be removed as a "breaking"
// change in a major version.
exports.ROUTER_PROVIDERS = [
    common_1.Location,
    { provide: url_tree_1.UrlSerializer, useClass: url_tree_1.DefaultUrlSerializer },
    router_1.Router,
    router_outlet_context_1.ChildrenOutletContexts,
    { provide: router_state_1.ActivatedRoute, useFactory: provide_router_1.rootRoute, deps: [router_1.Router] },
    router_config_loader_1.RouterConfigLoader,
    // Only used to warn when `provideRoutes` is used without `RouterModule` or `provideRouter`. Can
    // be removed when `provideRoutes` is removed.
    typeof ngDevMode === 'undefined' || ngDevMode
        ? { provide: provide_router_1.ROUTER_IS_PROVIDED, useValue: true }
        : [],
];
/**
 * @description
 *
 * Adds directives and providers for in-app navigation among views defined in an application.
 * Use the Angular `Router` service to declaratively specify application states and manage state
 * transitions.
 *
 * You can import this NgModule multiple times, once for each lazy-loaded bundle.
 * However, only one `Router` service can be active.
 * To ensure this, there are two ways to register routes when importing this module:
 *
 * * The `forRoot()` method creates an `NgModule` that contains all the directives, the given
 * routes, and the `Router` service itself.
 * * The `forChild()` method creates an `NgModule` that contains all the directives and the given
 * routes, but does not include the `Router` service.
 *
 * @see [Routing and Navigation guide](guide/routing/common-router-tasks) for an
 * overview of how the `Router` service should be used.
 *
 * @publicApi
 */
let RouterModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: ROUTER_DIRECTIVES,
            exports: ROUTER_DIRECTIVES,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RouterModule = _classThis = class {
        constructor() {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                (0, core_1.inject)(exports.ROUTER_FORROOT_GUARD, { optional: true });
            }
        }
        /**
         * Creates and configures a module with all the router providers and directives.
         * Optionally sets up an application listener to perform an initial navigation.
         *
         * When registering the NgModule at the root, import as follows:
         *
         * ```ts
         * @NgModule({
         *   imports: [RouterModule.forRoot(ROUTES)]
         * })
         * class MyNgModule {}
         * ```
         *
         * @param routes An array of `Route` objects that define the navigation paths for the application.
         * @param config An `ExtraOptions` configuration object that controls how navigation is performed.
         * @return The new `NgModule`.
         *
         */
        static forRoot(routes, config) {
            return {
                ngModule: RouterModule,
                providers: [
                    exports.ROUTER_PROVIDERS,
                    typeof ngDevMode === 'undefined' || ngDevMode
                        ? (config === null || config === void 0 ? void 0 : config.enableTracing)
                            ? (0, provide_router_1.withDebugTracing)().ɵproviders
                            : []
                        : [],
                    { provide: router_config_loader_1.ROUTES, multi: true, useValue: routes },
                    typeof ngDevMode === 'undefined' || ngDevMode
                        ? {
                            provide: exports.ROUTER_FORROOT_GUARD,
                            useFactory: provideForRootGuard,
                            deps: [[router_1.Router, new core_1.Optional(), new core_1.SkipSelf()]],
                        }
                        : [],
                    (config === null || config === void 0 ? void 0 : config.errorHandler)
                        ? {
                            provide: navigation_transition_1.NAVIGATION_ERROR_HANDLER,
                            useValue: config.errorHandler,
                        }
                        : [],
                    { provide: router_config_1.ROUTER_CONFIGURATION, useValue: config ? config : {} },
                    (config === null || config === void 0 ? void 0 : config.useHash) ? provideHashLocationStrategy() : providePathLocationStrategy(),
                    provideRouterScroller(),
                    (config === null || config === void 0 ? void 0 : config.preloadingStrategy) ? (0, provide_router_1.withPreloading)(config.preloadingStrategy).ɵproviders : [],
                    (config === null || config === void 0 ? void 0 : config.initialNavigation) ? provideInitialNavigation(config) : [],
                    (config === null || config === void 0 ? void 0 : config.bindToComponentInputs) ? (0, provide_router_1.withComponentInputBinding)().ɵproviders : [],
                    (config === null || config === void 0 ? void 0 : config.enableViewTransitions) ? (0, provide_router_1.withViewTransitions)().ɵproviders : [],
                    provideRouterInitializer(),
                ],
            };
        }
        /**
         * Creates a module with all the router directives and a provider registering routes,
         * without creating a new Router service.
         * When registering for submodules and lazy-loaded submodules, create the NgModule as follows:
         *
         * ```ts
         * @NgModule({
         *   imports: [RouterModule.forChild(ROUTES)]
         * })
         * class MyNgModule {}
         * ```
         *
         * @param routes An array of `Route` objects that define the navigation paths for the submodule.
         * @return The new NgModule.
         *
         */
        static forChild(routes) {
            return {
                ngModule: RouterModule,
                providers: [{ provide: router_config_loader_1.ROUTES, multi: true, useValue: routes }],
            };
        }
    };
    __setFunctionName(_classThis, "RouterModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RouterModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RouterModule = _classThis;
})();
exports.RouterModule = RouterModule;
/**
 * For internal use by `RouterModule` only. Note that this differs from `withInMemoryRouterScroller`
 * because it reads from the `ExtraOptions` which should not be used in the standalone world.
 */
function provideRouterScroller() {
    return {
        provide: router_scroller_1.ROUTER_SCROLLER,
        useFactory: () => {
            const viewportScroller = (0, core_1.inject)(common_1.ViewportScroller);
            const zone = (0, core_1.inject)(core_1.NgZone);
            const config = (0, core_1.inject)(router_config_1.ROUTER_CONFIGURATION);
            const transitions = (0, core_1.inject)(navigation_transition_1.NavigationTransitions);
            const urlSerializer = (0, core_1.inject)(url_tree_1.UrlSerializer);
            if (config.scrollOffset) {
                viewportScroller.setOffset(config.scrollOffset);
            }
            return new router_scroller_1.RouterScroller(urlSerializer, transitions, viewportScroller, zone, config);
        },
    };
}
// Note: For internal use only with `RouterModule`. Standalone setup via `provideRouter` should
// provide hash location directly via `{provide: LocationStrategy, useClass: HashLocationStrategy}`.
function provideHashLocationStrategy() {
    return { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy };
}
// Note: For internal use only with `RouterModule`. Standalone setup via `provideRouter` does not
// need this at all because `PathLocationStrategy` is the default factory for `LocationStrategy`.
function providePathLocationStrategy() {
    return { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy };
}
function provideForRootGuard(router) {
    if (router) {
        throw new core_1.ɵRuntimeError(4007 /* RuntimeErrorCode.FOR_ROOT_CALLED_TWICE */, `The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector.` +
            ` Lazy loaded modules should use RouterModule.forChild() instead.`);
    }
    return 'guarded';
}
// Note: For internal use only with `RouterModule`. Standalone router setup with `provideRouter`
// users call `withXInitialNavigation` directly.
function provideInitialNavigation(config) {
    return [
        config.initialNavigation === 'disabled' ? (0, provide_router_1.withDisabledInitialNavigation)().ɵproviders : [],
        config.initialNavigation === 'enabledBlocking'
            ? (0, provide_router_1.withEnabledBlockingInitialNavigation)().ɵproviders
            : [],
    ];
}
// TODO(atscott): This should not be in the public API
/**
 * A DI token for the router initializer that
 * is called after the app is bootstrapped.
 *
 * @publicApi
 */
exports.ROUTER_INITIALIZER = new core_1.InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'Router Initializer' : '');
function provideRouterInitializer() {
    return [
        // ROUTER_INITIALIZER token should be removed. It's public API but shouldn't be. We can just
        // have `getBootstrapListener` directly attached to APP_BOOTSTRAP_LISTENER.
        { provide: exports.ROUTER_INITIALIZER, useFactory: provide_router_1.getBootstrapListener },
        { provide: core_1.APP_BOOTSTRAP_LISTENER, multi: true, useExisting: exports.ROUTER_INITIALIZER },
    ];
}
