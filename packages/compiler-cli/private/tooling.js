"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorParametersDownlevelTransform = exports.GLOBAL_DEFS_FOR_TERSER_WITH_AOT = exports.GLOBAL_DEFS_FOR_TERSER = void 0;
const index_1 = require("../src/ngtsc/transform/jit/index");
/**
 * Known values for global variables in `@angular/core` that Terser should set using
 * https://github.com/terser-js/terser#conditional-compilation
 */
exports.GLOBAL_DEFS_FOR_TERSER = {
    ngDevMode: false,
    ngI18nClosureMode: false,
};
exports.GLOBAL_DEFS_FOR_TERSER_WITH_AOT = Object.assign(Object.assign({}, exports.GLOBAL_DEFS_FOR_TERSER), { ngJitMode: false });
/**
 * JIT transform used by the Angular CLI.
 *
 * NOTE: Signature is explicitly captured here to highlight the
 * contract various Angular CLI versions are relying on.
 */
const constructorParametersDownlevelTransform = (program, isCore = false) => {
    return (0, index_1.angularJitApplicationTransform)(program, isCore);
};
exports.constructorParametersDownlevelTransform = constructorParametersDownlevelTransform;
