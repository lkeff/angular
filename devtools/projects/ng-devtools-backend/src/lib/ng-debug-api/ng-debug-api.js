"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngDebugClient = void 0;
exports.ngDebugApiIsSupported = ngDebugApiIsSupported;
exports.ngDebugDependencyInjectionApiIsSupported = ngDebugDependencyInjectionApiIsSupported;
exports.ngDebugProfilerApiIsSupported = ngDebugProfilerApiIsSupported;
exports.ngDebugRoutesApiIsSupported = ngDebugRoutesApiIsSupported;
const get_roots_1 = require("../component-tree/get-roots");
const core_enums_1 = require("../component-tree/core-enums");
/** Returns a handle to window.ng APIs (global angular debugging). */
const ngDebugClient = () => window.ng;
exports.ngDebugClient = ngDebugClient;
/** Type guard that checks whether a given debug API is supported within window.ng */
function ngDebugApiIsSupported(ng, api) {
    return typeof ng[api] === 'function';
}
/** Checks whether Dependency Injection debug API is supported within window.ng */
function ngDebugDependencyInjectionApiIsSupported() {
    const ng = (0, exports.ngDebugClient)();
    if (!ngDebugApiIsSupported(ng, 'getInjector')) {
        return false;
    }
    if (!ngDebugApiIsSupported(ng, 'ɵgetInjectorResolutionPath')) {
        return false;
    }
    if (!ngDebugApiIsSupported(ng, 'ɵgetDependenciesFromInjectable')) {
        return false;
    }
    if (!ngDebugApiIsSupported(ng, 'ɵgetInjectorProviders')) {
        return false;
    }
    if (!ngDebugApiIsSupported(ng, 'ɵgetInjectorMetadata')) {
        return false;
    }
    return true;
}
/** Checks whether Profiler API is supported within window.ng */
function ngDebugProfilerApiIsSupported() {
    const ng = (0, exports.ngDebugClient)();
    // Temporary solution. Convert to an eligible API when available.
    // https://github.com/angular/angular/pull/60585#discussion_r2017047132
    // If there is a Wiz application, make Profiler API unavailable.
    const roots = (0, get_roots_1.getRoots)();
    return (!!roots.length &&
        !roots.some((el) => {
            var _a, _b;
            const comp = ng.getComponent(el);
            return ((_b = (_a = ng.getDirectiveMetadata) === null || _a === void 0 ? void 0 : _a.call(ng, comp)) === null || _b === void 0 ? void 0 : _b.framework) === core_enums_1.Framework.Wiz;
        }));
}
/** Checks whether Router API is supported within window.ng */
function ngDebugRoutesApiIsSupported() {
    const ng = (0, exports.ngDebugClient)();
    // Temporary solution. Convert to `ɵgetLoadedRoutes` when available.
    // If there is a Wiz application, make Routes API unavailable.
    const roots = (0, get_roots_1.getRoots)();
    return (!!roots.length &&
        !roots.some((el) => {
            var _a, _b;
            const comp = ng.getComponent(el);
            return ((_b = (_a = ng.getDirectiveMetadata) === null || _a === void 0 ? void 0 : _a.call(ng, comp)) === null || _b === void 0 ? void 0 : _b.framework) === core_enums_1.Framework.Wiz;
        }));
}
