"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedInjectorService = void 0;
const defs_1 = require("./di/interface/defs");
const ng_module_ref_1 = require("./render3/ng_module_ref");
/**
 * A service used by the framework to create and cache injector instances.
 *
 * This service is used to create a single injector instance for each defer
 * block definition, to avoid creating an injector for each defer block instance
 * of a certain type.
 */
class CachedInjectorService {
    constructor() {
        this.cachedInjectors = new Map();
    }
    getOrCreateInjector(key, parentInjector, providers, debugName) {
        if (!this.cachedInjectors.has(key)) {
            const injector = providers.length > 0
                ? (0, ng_module_ref_1.createEnvironmentInjector)(providers, parentInjector, debugName)
                : null;
            this.cachedInjectors.set(key, injector);
        }
        return this.cachedInjectors.get(key);
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
exports.CachedInjectorService = CachedInjectorService;
/** @nocollapse */
CachedInjectorService.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: CachedInjectorService,
    providedIn: 'environment',
    factory: () => new CachedInjectorService(),
});
