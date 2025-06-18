"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵsetClassDebugInfo = ɵsetClassDebugInfo;
const def_getters_1 = require("../def_getters");
/**
 * Sets the debug info for an Angular class.
 *
 * This runtime is guarded by ngDevMode flag.
 */
function ɵsetClassDebugInfo(type, debugInfo) {
    const def = (0, def_getters_1.getComponentDef)(type);
    if (def !== null) {
        def.debugInfo = debugInfo;
    }
}
