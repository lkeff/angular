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
exports.PlatformRef = void 0;
const application_ngmodule_factory_compiler_1 = require("../application/application_ngmodule_factory_compiler");
const application_ref_1 = require("../application/application_ref");
const ng_zone_scheduling_1 = require("../change_detection/scheduling/ng_zone_scheduling");
const zoneless_scheduling_1 = require("../change_detection/scheduling/zoneless_scheduling");
const zoneless_scheduling_impl_1 = require("../change_detection/scheduling/zoneless_scheduling_impl");
const di_1 = require("../di");
const error_handler_1 = require("../error_handler");
const errors_1 = require("../errors");
const ng_module_ref_1 = require("../render3/ng_module_ref");
const ng_zone_1 = require("../zone/ng_zone");
const bootstrap_1 = require("./bootstrap");
const platform_destroy_listeners_1 = require("./platform_destroy_listeners");
/**
 * The Angular platform is the entry point for Angular on a web page.
 * Each page has exactly one platform. Services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 * A page's platform is initialized implicitly when a platform is created using a platform
 * factory such as `PlatformBrowser`, or explicitly by calling the `createPlatform()` function.
 *
 * @publicApi
 */
let PlatformRef = (() => {
    let _classDecorators = [(0, di_1.Injectable)({ providedIn: 'platform' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PlatformRef = _classThis = class {
        /** @internal */
        constructor(_injector) {
            this._injector = _injector;
            this._modules = [];
            this._destroyListeners = [];
            this._destroyed = false;
        }
        /**
         * Creates an instance of an `@NgModule` for the given platform.
         *
         * @deprecated Passing NgModule factories as the `PlatformRef.bootstrapModuleFactory` function
         *     argument is deprecated. Use the `PlatformRef.bootstrapModule` API instead.
         */
        bootstrapModuleFactory(moduleFactory, options) {
            const scheduleInRootZone = options === null || options === void 0 ? void 0 : options.scheduleInRootZone;
            const ngZoneFactory = () => (0, ng_zone_1.getNgZone)(options === null || options === void 0 ? void 0 : options.ngZone, Object.assign(Object.assign({}, (0, ng_zone_scheduling_1.getNgZoneOptions)({
                eventCoalescing: options === null || options === void 0 ? void 0 : options.ngZoneEventCoalescing,
                runCoalescing: options === null || options === void 0 ? void 0 : options.ngZoneRunCoalescing,
            })), { scheduleInRootZone }));
            const ignoreChangesOutsideZone = options === null || options === void 0 ? void 0 : options.ignoreChangesOutsideZone;
            const allAppProviders = [
                (0, ng_zone_scheduling_1.internalProvideZoneChangeDetection)({
                    ngZoneFactory,
                    ignoreChangesOutsideZone,
                }),
                { provide: zoneless_scheduling_1.ChangeDetectionScheduler, useExisting: zoneless_scheduling_impl_1.ChangeDetectionSchedulerImpl },
                error_handler_1.errorHandlerEnvironmentInitializer,
            ];
            const moduleRef = (0, ng_module_ref_1.createNgModuleRefWithProviders)(moduleFactory.moduleType, this.injector, allAppProviders);
            (0, bootstrap_1.setModuleBootstrapImpl)();
            return (0, bootstrap_1.bootstrap)({
                moduleRef,
                allPlatformModules: this._modules,
                platformInjector: this.injector,
            });
        }
        /**
         * Creates an instance of an `@NgModule` for a given platform.
         *
         * @usageNotes
         * ### Simple Example
         *
         * ```ts
         * @NgModule({
         *   imports: [BrowserModule]
         * })
         * class MyModule {}
         *
         * let moduleRef = platformBrowser().bootstrapModule(MyModule);
         * ```
         *
         */
        bootstrapModule(moduleType, compilerOptions = []) {
            const options = (0, application_ref_1.optionsReducer)({}, compilerOptions);
            (0, bootstrap_1.setModuleBootstrapImpl)();
            return (0, application_ngmodule_factory_compiler_1.compileNgModuleFactory)(this.injector, options, moduleType).then((moduleFactory) => this.bootstrapModuleFactory(moduleFactory, options));
        }
        /**
         * Registers a listener to be called when the platform is destroyed.
         */
        onDestroy(callback) {
            this._destroyListeners.push(callback);
        }
        /**
         * Retrieves the platform {@link Injector}, which is the parent injector for
         * every Angular application on the page and provides singleton providers.
         */
        get injector() {
            return this._injector;
        }
        /**
         * Destroys the current Angular platform and all Angular applications on the page.
         * Destroys all modules and listeners registered with the platform.
         */
        destroy() {
            if (this._destroyed) {
                throw new errors_1.RuntimeError(404 /* RuntimeErrorCode.PLATFORM_ALREADY_DESTROYED */, ngDevMode && 'The platform has already been destroyed!');
            }
            this._modules.slice().forEach((module) => module.destroy());
            this._destroyListeners.forEach((listener) => listener());
            const destroyListeners = this._injector.get(platform_destroy_listeners_1.PLATFORM_DESTROY_LISTENERS, null);
            if (destroyListeners) {
                destroyListeners.forEach((listener) => listener());
                destroyListeners.clear();
            }
            this._destroyed = true;
        }
        /**
         * Indicates whether this instance was destroyed.
         */
        get destroyed() {
            return this._destroyed;
        }
    };
    __setFunctionName(_classThis, "PlatformRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlatformRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlatformRef = _classThis;
})();
exports.PlatformRef = PlatformRef;
