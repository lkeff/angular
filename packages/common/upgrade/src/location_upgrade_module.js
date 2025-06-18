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
exports.LocationUpgradeModule = exports.LOCATION_UPGRADE_CONFIGURATION = void 0;
exports.provideAppBaseHref = provideAppBaseHref;
exports.provideUrlCodec = provideUrlCodec;
exports.provideLocationStrategy = provideLocationStrategy;
exports.provide$location = provide$location;
const index_1 = require("../../index");
const core_1 = require("@angular/core");
const static_1 = require("@angular/upgrade/static");
const location_shim_1 = require("./location_shim");
const params_1 = require("./params");
/**
 * A provider token used to configure the location upgrade module.
 *
 * @publicApi
 */
exports.LOCATION_UPGRADE_CONFIGURATION = new core_1.InjectionToken(ngDevMode ? 'LOCATION_UPGRADE_CONFIGURATION' : '');
const APP_BASE_HREF_RESOLVED = new core_1.InjectionToken(ngDevMode ? 'APP_BASE_HREF_RESOLVED' : '');
/**
 * `NgModule` used for providing and configuring Angular's Unified Location Service for upgrading.
 *
 * @see [Using the Unified Angular Location Service](https://angular.io/guide/upgrade#using-the-unified-angular-location-service)
 *
 * @publicApi
 */
let LocationUpgradeModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ imports: [index_1.CommonModule] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LocationUpgradeModule = _classThis = class {
        static config(config) {
            return {
                ngModule: LocationUpgradeModule,
                providers: [
                    index_1.Location,
                    {
                        provide: location_shim_1.$locationShim,
                        useFactory: provide$location,
                        deps: [static_1.UpgradeModule, index_1.Location, index_1.PlatformLocation, params_1.UrlCodec, index_1.LocationStrategy],
                    },
                    { provide: exports.LOCATION_UPGRADE_CONFIGURATION, useValue: config ? config : {} },
                    { provide: params_1.UrlCodec, useFactory: provideUrlCodec, deps: [exports.LOCATION_UPGRADE_CONFIGURATION] },
                    {
                        provide: APP_BASE_HREF_RESOLVED,
                        useFactory: provideAppBaseHref,
                        deps: [exports.LOCATION_UPGRADE_CONFIGURATION, [new core_1.Inject(index_1.APP_BASE_HREF), new core_1.Optional()]],
                    },
                    {
                        provide: index_1.LocationStrategy,
                        useFactory: provideLocationStrategy,
                        deps: [index_1.PlatformLocation, APP_BASE_HREF_RESOLVED, exports.LOCATION_UPGRADE_CONFIGURATION],
                    },
                ],
            };
        }
    };
    __setFunctionName(_classThis, "LocationUpgradeModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocationUpgradeModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocationUpgradeModule = _classThis;
})();
exports.LocationUpgradeModule = LocationUpgradeModule;
function provideAppBaseHref(config, appBaseHref) {
    if (config && config.appBaseHref != null) {
        return config.appBaseHref;
    }
    else if (appBaseHref != null) {
        return appBaseHref;
    }
    return '';
}
function provideUrlCodec(config) {
    const codec = (config && config.urlCodec) || params_1.AngularJSUrlCodec;
    return new codec();
}
function provideLocationStrategy(platformLocation, baseHref, options = {}) {
    return options.useHash
        ? new index_1.HashLocationStrategy(platformLocation, baseHref)
        : new index_1.PathLocationStrategy(platformLocation, baseHref);
}
function provide$location(ngUpgrade, location, platformLocation, urlCodec, locationStrategy) {
    const $locationProvider = new location_shim_1.$locationShimProvider(ngUpgrade, location, platformLocation, urlCodec, locationStrategy);
    return $locationProvider.$get();
}
