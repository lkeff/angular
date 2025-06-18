"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableDebugTools = enableDebugTools;
exports.disableDebugTools = disableDebugTools;
const util_1 = require("../../dom/util");
const common_tools_1 = require("./common_tools");
const PROFILER_GLOBAL_NAME = 'profiler';
/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * @publicApi
 */
function enableDebugTools(ref) {
    (0, util_1.exportNgVar)(PROFILER_GLOBAL_NAME, new common_tools_1.AngularProfiler(ref));
    return ref;
}
/**
 * Disables Angular tools.
 *
 * @publicApi
 */
function disableDebugTools() {
    (0, util_1.exportNgVar)(PROFILER_GLOBAL_NAME, null);
}
