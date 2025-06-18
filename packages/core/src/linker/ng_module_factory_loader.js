"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleFactory = getModuleFactory;
exports.getNgModuleById = getNgModuleById;
const ng_module_ref_1 = require("../render3/ng_module_ref");
const ng_module_registration_1 = require("./ng_module_registration");
/**
 * Returns the NgModuleFactory with the given id (specified using [@NgModule.id
 * field](api/core/NgModule#id)), if it exists and has been loaded. Factories for NgModules that do
 * not specify an `id` cannot be retrieved. Throws if an NgModule cannot be found.
 * @publicApi
 * @deprecated Use `getNgModuleById` instead.
 */
function getModuleFactory(id) {
    const type = (0, ng_module_registration_1.getRegisteredNgModuleType)(id);
    if (!type)
        throw noModuleError(id);
    return new ng_module_ref_1.NgModuleFactory(type);
}
/**
 * Returns the NgModule class with the given id (specified using [@NgModule.id
 * field](api/core/NgModule#id)), if it exists and has been loaded. Classes for NgModules that do
 * not specify an `id` cannot be retrieved. Throws if an NgModule cannot be found.
 * @publicApi
 */
function getNgModuleById(id) {
    const type = (0, ng_module_registration_1.getRegisteredNgModuleType)(id);
    if (!type)
        throw noModuleError(id);
    return type;
}
function noModuleError(id) {
    return new Error(`No module with ID ${id} loaded`);
}
