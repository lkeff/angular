"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNgModuleDef = getNgModuleDef;
exports.getNgModuleDefOrThrow = getNgModuleDefOrThrow;
exports.getComponentDef = getComponentDef;
exports.getDirectiveDefOrThrow = getDirectiveDefOrThrow;
exports.getDirectiveDef = getDirectiveDef;
exports.getPipeDef = getPipeDef;
exports.isStandalone = isStandalone;
const errors_1 = require("../errors");
const stringify_1 = require("../util/stringify");
const fields_1 = require("./fields");
function getNgModuleDef(type) {
    return type[fields_1.NG_MOD_DEF] || null;
}
function getNgModuleDefOrThrow(type) {
    const ngModuleDef = getNgModuleDef(type);
    if (!ngModuleDef) {
        throw new errors_1.RuntimeError(915 /* RuntimeErrorCode.MISSING_NG_MODULE_DEFINITION */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
            `Type ${(0, stringify_1.stringify)(type)} does not have 'ɵmod' property.`);
    }
    return ngModuleDef;
}
/**
 * The following getter methods retrieve the definition from the type. Currently the retrieval
 * honors inheritance, but in the future we may change the rule to require that definitions are
 * explicit. This would require some sort of migration strategy.
 */
function getComponentDef(type) {
    return type[fields_1.NG_COMP_DEF] || null;
}
function getDirectiveDefOrThrow(type) {
    const def = getDirectiveDef(type);
    if (!def) {
        throw new errors_1.RuntimeError(916 /* RuntimeErrorCode.MISSING_DIRECTIVE_DEFINITION */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
            `Type ${(0, stringify_1.stringify)(type)} does not have 'ɵdir' property.`);
    }
    return def;
}
function getDirectiveDef(type) {
    return type[fields_1.NG_DIR_DEF] || null;
}
function getPipeDef(type) {
    return type[fields_1.NG_PIPE_DEF] || null;
}
/**
 * Checks whether a given Component, Directive or Pipe is marked as standalone.
 * This will return false if passed anything other than a Component, Directive, or Pipe class
 * See [this guide](guide/components/importing) for additional information:
 *
 * @param type A reference to a Component, Directive or Pipe.
 * @publicApi
 */
function isStandalone(type) {
    const def = getComponentDef(type) || getDirectiveDef(type) || getPipeDef(type);
    return def !== null && def.standalone;
}
