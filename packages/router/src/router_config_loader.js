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
exports.RouterConfigLoader = exports.ROUTES = void 0;
exports.loadChildren = loadChildren;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const collection_1 = require("./utils/collection");
const config_1 = require("./utils/config");
const empty_outlet_1 = require("./components/empty_outlet");
/**
 * The DI token for a router configuration.
 *
 * `ROUTES` is a low level API for router configuration via dependency injection.
 *
 * We recommend that in almost all cases to use higher level APIs such as `RouterModule.forRoot()`,
 * `provideRouter`, or `Router.resetConfig()`.
 *
 * @publicApi
 */
exports.ROUTES = new core_1.InjectionToken(ngDevMode ? 'ROUTES' : '');
let RouterConfigLoader = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RouterConfigLoader = _classThis = class {
        constructor() {
            this.componentLoaders = new WeakMap();
            this.childrenLoaders = new WeakMap();
            this.compiler = (0, core_1.inject)(core_1.Compiler);
        }
        loadComponent(route) {
            if (this.componentLoaders.get(route)) {
                return this.componentLoaders.get(route);
            }
            else if (route._loadedComponent) {
                return (0, rxjs_1.of)(route._loadedComponent);
            }
            if (this.onLoadStartListener) {
                this.onLoadStartListener(route);
            }
            const loadRunner = (0, collection_1.wrapIntoObservable)(route.loadComponent()).pipe((0, operators_1.map)(maybeUnwrapDefaultExport), (0, operators_1.tap)((component) => {
                var _a;
                if (this.onLoadEndListener) {
                    this.onLoadEndListener(route);
                }
                (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    (0, config_1.assertStandalone)((_a = route.path) !== null && _a !== void 0 ? _a : '', component);
                route._loadedComponent = component;
            }), (0, operators_1.finalize)(() => {
                this.componentLoaders.delete(route);
            }));
            // Use custom ConnectableObservable as share in runners pipe increasing the bundle size too much
            const loader = new rxjs_1.ConnectableObservable(loadRunner, () => new rxjs_1.Subject()).pipe((0, operators_1.refCount)());
            this.componentLoaders.set(route, loader);
            return loader;
        }
        loadChildren(parentInjector, route) {
            if (this.childrenLoaders.get(route)) {
                return this.childrenLoaders.get(route);
            }
            else if (route._loadedRoutes) {
                return (0, rxjs_1.of)({ routes: route._loadedRoutes, injector: route._loadedInjector });
            }
            if (this.onLoadStartListener) {
                this.onLoadStartListener(route);
            }
            const moduleFactoryOrRoutes$ = loadChildren(route, this.compiler, parentInjector, this.onLoadEndListener);
            const loadRunner = moduleFactoryOrRoutes$.pipe((0, operators_1.finalize)(() => {
                this.childrenLoaders.delete(route);
            }));
            // Use custom ConnectableObservable as share in runners pipe increasing the bundle size too much
            const loader = new rxjs_1.ConnectableObservable(loadRunner, () => new rxjs_1.Subject()).pipe((0, operators_1.refCount)());
            this.childrenLoaders.set(route, loader);
            return loader;
        }
    };
    __setFunctionName(_classThis, "RouterConfigLoader");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RouterConfigLoader = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RouterConfigLoader = _classThis;
})();
exports.RouterConfigLoader = RouterConfigLoader;
/**
 * Executes a `route.loadChildren` callback and converts the result to an array of child routes and
 * an injector if that callback returned a module.
 *
 * This function is used for the route discovery during prerendering
 * in @angular-devkit/build-angular. If there are any updates to the contract here, it will require
 * an update to the extractor.
 */
function loadChildren(route, compiler, parentInjector, onLoadEndListener) {
    return (0, collection_1.wrapIntoObservable)(route.loadChildren()).pipe((0, operators_1.map)(maybeUnwrapDefaultExport), (0, operators_1.mergeMap)((t) => {
        if (t instanceof core_1.NgModuleFactory || Array.isArray(t)) {
            return (0, rxjs_1.of)(t);
        }
        else {
            return (0, rxjs_1.from)(compiler.compileModuleAsync(t));
        }
    }), (0, operators_1.map)((factoryOrRoutes) => {
        if (onLoadEndListener) {
            onLoadEndListener(route);
        }
        // This injector comes from the `NgModuleRef` when lazy loading an `NgModule`. There is
        // no injector associated with lazy loading a `Route` array.
        let injector;
        let rawRoutes;
        let requireStandaloneComponents = false;
        if (Array.isArray(factoryOrRoutes)) {
            rawRoutes = factoryOrRoutes;
            requireStandaloneComponents = true;
        }
        else {
            injector = factoryOrRoutes.create(parentInjector).injector;
            // When loading a module that doesn't provide `RouterModule.forChild()` preloader
            // will get stuck in an infinite loop. The child module's Injector will look to
            // its parent `Injector` when it doesn't find any ROUTES so it will return routes
            // for it's parent module instead.
            rawRoutes = injector.get(exports.ROUTES, [], { optional: true, self: true }).flat();
        }
        const routes = rawRoutes.map(empty_outlet_1.standardizeConfig);
        (typeof ngDevMode === 'undefined' || ngDevMode) &&
            (0, config_1.validateConfig)(routes, route.path, requireStandaloneComponents);
        return { routes, injector };
    }));
}
function isWrappedDefaultExport(value) {
    // We use `in` here with a string key `'default'`, because we expect `DefaultExport` objects to be
    // dynamically imported ES modules with a spec-mandated `default` key. Thus we don't expect that
    // `default` will be a renamed property.
    return value && typeof value === 'object' && 'default' in value;
}
function maybeUnwrapDefaultExport(input) {
    // As per `isWrappedDefaultExport`, the `default` key here is generated by the browser and not
    // subject to property renaming, so we reference it with bracket access.
    return isWrappedDefaultExport(input) ? input['default'] : input;
}
