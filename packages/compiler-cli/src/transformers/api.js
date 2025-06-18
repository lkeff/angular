"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitFlags = exports.SOURCE = exports.UNKNOWN_ERROR_CODE = exports.DEFAULT_ERROR_CODE = void 0;
exports.isTsDiagnostic = isTsDiagnostic;
exports.DEFAULT_ERROR_CODE = 100;
exports.UNKNOWN_ERROR_CODE = 500;
exports.SOURCE = 'angular';
function isTsDiagnostic(diagnostic) {
    return diagnostic != null && diagnostic.source !== 'angular';
}
var EmitFlags;
(function (EmitFlags) {
    EmitFlags[EmitFlags["DTS"] = 1] = "DTS";
    EmitFlags[EmitFlags["JS"] = 2] = "JS";
    EmitFlags[EmitFlags["Metadata"] = 4] = "Metadata";
    EmitFlags[EmitFlags["I18nBundle"] = 8] = "I18nBundle";
    EmitFlags[EmitFlags["Codegen"] = 16] = "Codegen";
    EmitFlags[EmitFlags["Default"] = 19] = "Default";
    EmitFlags[EmitFlags["All"] = 31] = "All";
})(EmitFlags || (exports.EmitFlags = EmitFlags = {}));
