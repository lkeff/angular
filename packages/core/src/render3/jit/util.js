"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModuleWithProviders = isModuleWithProviders;
exports.isNgModule = isNgModule;
exports.isPipe = isPipe;
exports.isDirective = isDirective;
exports.isComponent = isComponent;
exports.verifyStandaloneImport = verifyStandaloneImport;
const forward_ref_1 = require("../../di/forward_ref");
const def_getters_1 = require("../def_getters");
const stringify_utils_1 = require("../util/stringify_utils");
function isModuleWithProviders(value) {
    return value.ngModule !== undefined;
}
function isNgModule(value) {
    return !!(0, def_getters_1.getNgModuleDef)(value);
}
function isPipe(value) {
    return !!(0, def_getters_1.getPipeDef)(value);
}
function isDirective(value) {
    return !!(0, def_getters_1.getDirectiveDef)(value);
}
function isComponent(value) {
    return !!(0, def_getters_1.getComponentDef)(value);
}
function getDependencyTypeForError(type) {
    if ((0, def_getters_1.getComponentDef)(type))
        return 'component';
    if ((0, def_getters_1.getDirectiveDef)(type))
        return 'directive';
    if ((0, def_getters_1.getPipeDef)(type))
        return 'pipe';
    return 'type';
}
function verifyStandaloneImport(depType, importingType) {
    if ((0, forward_ref_1.isForwardRef)(depType)) {
        depType = (0, forward_ref_1.resolveForwardRef)(depType);
        if (!depType) {
            throw new Error(`Expected forwardRef function, imported from "${(0, stringify_utils_1.stringifyForError)(importingType)}", to return a standalone entity or NgModule but got "${(0, stringify_utils_1.stringifyForError)(depType) || depType}".`);
        }
    }
    if ((0, def_getters_1.getNgModuleDef)(depType) == null) {
        const def = (0, def_getters_1.getComponentDef)(depType) || (0, def_getters_1.getDirectiveDef)(depType) || (0, def_getters_1.getPipeDef)(depType);
        if (def != null) {
            // if a component, directive or pipe is imported make sure that it is standalone
            if (!def.standalone) {
                throw new Error(`The "${(0, stringify_utils_1.stringifyForError)(depType)}" ${getDependencyTypeForError(depType)}, imported from "${(0, stringify_utils_1.stringifyForError)(importingType)}", is not standalone. Did you forget to add the standalone: true flag?`);
            }
        }
        else {
            // it can be either a module with provider or an unknown (not annotated) type
            if (isModuleWithProviders(depType)) {
                throw new Error(`A module with providers was imported from "${(0, stringify_utils_1.stringifyForError)(importingType)}". Modules with providers are not supported in standalone components imports.`);
            }
            else {
                throw new Error(`The "${(0, stringify_utils_1.stringifyForError)(depType)}" type, imported from "${(0, stringify_utils_1.stringifyForError)(importingType)}", must be a standalone component / directive / pipe or an NgModule. Did you forget to add the required @Component / @Directive / @Pipe or @NgModule annotation?`);
            }
        }
    }
}
