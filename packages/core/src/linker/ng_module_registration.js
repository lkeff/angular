"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNgModuleType = registerNgModuleType;
exports.clearModulesForTest = clearModulesForTest;
exports.getRegisteredNgModuleType = getRegisteredNgModuleType;
exports.setAllowDuplicateNgModuleIdsForTest = setAllowDuplicateNgModuleIdsForTest;
const stringify_1 = require("../util/stringify");
/**
 * Map of module-id to the corresponding NgModule.
 */
const modules = new Map();
/**
 * Whether to check for duplicate NgModule registrations.
 *
 * This can be disabled for testing.
 */
let checkForDuplicateNgModules = true;
function assertSameOrNotExisting(id, type, incoming) {
    if (type && type !== incoming && checkForDuplicateNgModules) {
        throw new Error(`Duplicate module registered for ${id} - ${(0, stringify_1.stringify)(type)} vs ${(0, stringify_1.stringify)(type.name)}`);
    }
}
/**
 * Adds the given NgModule type to Angular's NgModule registry.
 *
 * This is generated as a side-effect of NgModule compilation. Note that the `id` is passed in
 * explicitly and not read from the NgModule definition. This is for two reasons: it avoids a
 * megamorphic read, and in JIT there's a chicken-and-egg problem where the NgModule may not be
 * fully resolved when it's registered.
 *
 * @codeGenApi
 */
function registerNgModuleType(ngModuleType, id) {
    const existing = modules.get(id) || null;
    assertSameOrNotExisting(id, existing, ngModuleType);
    modules.set(id, ngModuleType);
}
function clearModulesForTest() {
    modules.clear();
}
function getRegisteredNgModuleType(id) {
    return modules.get(id);
}
/**
 * Control whether the NgModule registration system enforces that each NgModule type registered has
 * a unique id.
 *
 * This is useful for testing as the NgModule registry cannot be properly reset between tests with
 * Angular's current API.
 */
function setAllowDuplicateNgModuleIdsForTest(allowDuplicates) {
    checkForDuplicateNgModules = !allowDuplicates;
}
