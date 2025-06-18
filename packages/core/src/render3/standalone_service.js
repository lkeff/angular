"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandaloneService = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const injector_compatibility_1 = require("../di/injector_compatibility");
const defs_1 = require("../di/interface/defs");
const provider_collection_1 = require("../di/provider_collection");
const r3_injector_1 = require("../di/r3_injector");
const ng_module_ref_1 = require("./ng_module_ref");
/**
 * A service used by the framework to create instances of standalone injectors. Those injectors are
 * created on demand in case of dynamic component instantiation and contain ambient providers
 * collected from the imports graph rooted at a given standalone component.
 */
class StandaloneService {
    constructor(_injector) {
        this._injector = _injector;
        this.cachedInjectors = new Map();
    }
    getOrCreateStandaloneInjector(componentDef) {
        if (!componentDef.standalone) {
            return null;
        }
        if (!this.cachedInjectors.has(componentDef)) {
            const providers = (0, provider_collection_1.internalImportProvidersFrom)(false, componentDef.type);
            const standaloneInjector = providers.length > 0
                ? (0, ng_module_ref_1.createEnvironmentInjector)([providers], this._injector, `Standalone[${componentDef.type.name}]`)
                : null;
            this.cachedInjectors.set(componentDef, standaloneInjector);
        }
        return this.cachedInjectors.get(componentDef);
    }
    ngOnDestroy() {
        try {
            for (const injector of this.cachedInjectors.values()) {
                if (injector !== null) {
                    injector.destroy();
                }
            }
        }
        finally {
            this.cachedInjectors.clear();
        }
    }
}
exports.StandaloneService = StandaloneService;
/** @nocollapse */
StandaloneService.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: StandaloneService,
    providedIn: 'environment',
    factory: () => new StandaloneService((0, injector_compatibility_1.ɵɵinject)(r3_injector_1.EnvironmentInjector)),
});
