"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProfilerStrategy = exports.Profiler = void 0;
const ng_debug_api_1 = require("../../ng-debug-api/ng-debug-api");
const native_1 = require("./native");
const polyfill_1 = require("./polyfill");
var shared_1 = require("./shared");
Object.defineProperty(exports, "Profiler", { enumerable: true, get: function () { return shared_1.Profiler; } });
/**
 * Factory method for creating profiler object.
 * Gives priority to NgProfiler, falls back on PatchingProfiler if framework APIs are not present.
 */
const selectProfilerStrategy = () => {
    if (typeof (0, ng_debug_api_1.ngDebugClient)().ɵsetProfiler === 'function') {
        return new native_1.NgProfiler();
    }
    return new polyfill_1.PatchingProfiler();
};
exports.selectProfilerStrategy = selectProfilerStrategy;
