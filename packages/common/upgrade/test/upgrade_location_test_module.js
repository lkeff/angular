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
exports.LocationUpgradeTestModule = exports.APP_BASE_HREF_RESOLVED = exports.LOC_UPGRADE_TEST_CONFIG = void 0;
exports.provide$location = provide$location;
const index_1 = require("../../index");
const testing_1 = require("../../testing");
const core_1 = require("@angular/core");
const static_1 = require("@angular/upgrade/static");
const location_shim_1 = require("../src/location_shim");
const location_upgrade_module_1 = require("../src/location_upgrade_module");
const params_1 = require("../src/params");
/**
 * @description
 *
 * Is used in DI to configure the router.
 *
 * @publicApi
 */
exports.LOC_UPGRADE_TEST_CONFIG = new core_1.InjectionToken('LOC_UPGRADE_TEST_CONFIG');
exports.APP_BASE_HREF_RESOLVED = new core_1.InjectionToken('APP_BASE_HREF_RESOLVED');
/**
 * Module used for configuring Angular's LocationUpgradeService.
 */
let LocationUpgradeTestModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ imports: [index_1.CommonModule] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LocationUpgradeTestModule = _classThis = class {
        static config(config) {
            return {
                ngModule: LocationUpgradeTestModule,
                providers: [
                    { provide: exports.LOC_UPGRADE_TEST_CONFIG, useValue: config || {} },
                    {
                        provide: index_1.PlatformLocation,
                        useFactory: (appBaseHref) => {
                            if (config && config.appBaseHref != null) {
                                appBaseHref = config.appBaseHref;
                            }
                            appBaseHref !== null && appBaseHref !== void 0 ? appBaseHref : (appBaseHref = '');
                            return new testing_1.MockPlatformLocation({
                                startUrl: config && config.startUrl,
                                appBaseHref: appBaseHref,
                            });
                        },
                        deps: [[new core_1.Inject(index_1.APP_BASE_HREF), new core_1.Optional()]],
                    },
                    {
                        provide: location_shim_1.$locationShim,
                        useFactory: provide$location,
                        deps: [
                            static_1.UpgradeModule,
                            index_1.Location,
                            index_1.PlatformLocation,
                            params_1.UrlCodec,
                            index_1.LocationStrategy,
                            exports.LOC_UPGRADE_TEST_CONFIG,
                        ],
                    },
                    location_upgrade_module_1.LocationUpgradeModule.config({
                        appBaseHref: config && config.appBaseHref,
                        useHash: (config && config.useHash) || false,
                    }).providers,
                ],
            };
        }
    };
    __setFunctionName(_classThis, "LocationUpgradeTestModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocationUpgradeTestModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocationUpgradeTestModule = _classThis;
})();
exports.LocationUpgradeTestModule = LocationUpgradeTestModule;
function provide$location(ngUpgrade, location, platformLocation, urlCodec, locationStrategy, config) {
    const $locationProvider = new location_shim_1.$locationShimProvider(ngUpgrade, location, platformLocation, urlCodec, locationStrategy);
    $locationProvider.hashPrefix(config && config.hashPrefix);
    $locationProvider.html5Mode(config && !config.useHash);
    return $locationProvider.$get();
}
