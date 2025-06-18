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
exports.RouterPreloader = exports.NoPreloading = exports.PreloadAllModules = exports.PreloadingStrategy = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const events_1 = require("./events");
/**
 * @description
 *
 * Provides a preloading strategy.
 *
 * @publicApi
 */
class PreloadingStrategy {
}
exports.PreloadingStrategy = PreloadingStrategy;
/**
 * @description
 *
 * Provides a preloading strategy that preloads all modules as quickly as possible.
 *
 * ```ts
 * RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
 * ```
 *
 * @publicApi
 */
let PreloadAllModules = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PreloadAllModules = _classThis = class {
        preload(route, fn) {
            return fn().pipe((0, operators_1.catchError)(() => (0, rxjs_1.of)(null)));
        }
    };
    __setFunctionName(_classThis, "PreloadAllModules");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PreloadAllModules = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PreloadAllModules = _classThis;
})();
exports.PreloadAllModules = PreloadAllModules;
/**
 * @description
 *
 * Provides a preloading strategy that does not preload any modules.
 *
 * This strategy is enabled by default.
 *
 * @publicApi
 */
let NoPreloading = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NoPreloading = _classThis = class {
        preload(route, fn) {
            return (0, rxjs_1.of)(null);
        }
    };
    __setFunctionName(_classThis, "NoPreloading");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NoPreloading = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NoPreloading = _classThis;
})();
exports.NoPreloading = NoPreloading;
/**
 * The preloader optimistically loads all router configurations to
 * make navigations into lazily-loaded sections of the application faster.
 *
 * The preloader runs in the background. When the router bootstraps, the preloader
 * starts listening to all navigation events. After every such event, the preloader
 * will check if any configurations can be loaded lazily.
 *
 * If a route is protected by `canLoad` guards, the preloaded will not load it.
 *
 * @publicApi
 */
let RouterPreloader = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RouterPreloader = _classThis = class {
        constructor(router, injector, preloadingStrategy, loader) {
            this.router = router;
            this.injector = injector;
            this.preloadingStrategy = preloadingStrategy;
            this.loader = loader;
        }
        setUpPreloading() {
            this.subscription = this.router.events
                .pipe((0, operators_1.filter)((e) => e instanceof events_1.NavigationEnd), (0, operators_1.concatMap)(() => this.preload()))
                .subscribe(() => { });
        }
        preload() {
            return this.processRoutes(this.injector, this.router.config);
        }
        /** @nodoc */
        ngOnDestroy() {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        }
        processRoutes(injector, routes) {
            var _a, _b, _c;
            const res = [];
            for (const route of routes) {
                if (route.providers && !route._injector) {
                    route._injector = (0, core_1.createEnvironmentInjector)(route.providers, injector, `Route: ${route.path}`);
                }
                const injectorForCurrentRoute = (_a = route._injector) !== null && _a !== void 0 ? _a : injector;
                const injectorForChildren = (_b = route._loadedInjector) !== null && _b !== void 0 ? _b : injectorForCurrentRoute;
                // Note that `canLoad` is only checked as a condition that prevents `loadChildren` and not
                // `loadComponent`. `canLoad` guards only block loading of child routes by design. This
                // happens as a consequence of needing to descend into children for route matching immediately
                // while component loading is deferred until route activation. Because `canLoad` guards can
                // have side effects, we cannot execute them here so we instead skip preloading altogether
                // when present. Lastly, it remains to be decided whether `canLoad` should behave this way
                // at all. Code splitting and lazy loading is separate from client-side authorization checks
                // and should not be used as a security measure to prevent loading of code.
                if ((route.loadChildren && !route._loadedRoutes && route.canLoad === undefined) ||
                    (route.loadComponent && !route._loadedComponent)) {
                    res.push(this.preloadConfig(injectorForCurrentRoute, route));
                }
                if (route.children || route._loadedRoutes) {
                    res.push(this.processRoutes(injectorForChildren, ((_c = route.children) !== null && _c !== void 0 ? _c : route._loadedRoutes)));
                }
            }
            return (0, rxjs_1.from)(res).pipe((0, operators_1.mergeAll)());
        }
        preloadConfig(injector, route) {
            return this.preloadingStrategy.preload(route, () => {
                let loadedChildren$;
                if (route.loadChildren && route.canLoad === undefined) {
                    loadedChildren$ = this.loader.loadChildren(injector, route);
                }
                else {
                    loadedChildren$ = (0, rxjs_1.of)(null);
                }
                const recursiveLoadChildren$ = loadedChildren$.pipe((0, operators_1.mergeMap)((config) => {
                    var _a;
                    if (config === null) {
                        return (0, rxjs_1.of)(void 0);
                    }
                    route._loadedRoutes = config.routes;
                    route._loadedInjector = config.injector;
                    // If the loaded config was a module, use that as the module/module injector going
                    // forward. Otherwise, continue using the current module/module injector.
                    return this.processRoutes((_a = config.injector) !== null && _a !== void 0 ? _a : injector, config.routes);
                }));
                if (route.loadComponent && !route._loadedComponent) {
                    const loadComponent$ = this.loader.loadComponent(route);
                    return (0, rxjs_1.from)([recursiveLoadChildren$, loadComponent$]).pipe((0, operators_1.mergeAll)());
                }
                else {
                    return recursiveLoadChildren$;
                }
            });
        }
    };
    __setFunctionName(_classThis, "RouterPreloader");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RouterPreloader = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RouterPreloader = _classThis;
})();
exports.RouterPreloader = RouterPreloader;
