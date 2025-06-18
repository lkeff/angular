"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportedApis = getSupportedApis;
const ng_debug_api_1 = require("./ng-debug-api");
/**
 * Returns an object with all available Devtools APIs.
 *
 * @returns `SupportedApis`
 */
function getSupportedApis() {
    const profiler = (0, ng_debug_api_1.ngDebugProfilerApiIsSupported)();
    const dependencyInjection = (0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)();
    const routes = (0, ng_debug_api_1.ngDebugRoutesApiIsSupported)();
    return {
        profiler,
        dependencyInjection,
        routes,
    };
}
