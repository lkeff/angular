"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenderable = getRenderable;
const categorization_1 = require("./entities/categorization");
const class_transforms_1 = require("./transforms/class-transforms");
const cli_transforms_1 = require("./transforms/cli-transforms");
const constant_transforms_1 = require("./transforms/constant-transforms");
const decorator_transforms_1 = require("./transforms/decorator-transforms");
const enum_transforms_1 = require("./transforms/enum-transforms");
const function_transforms_1 = require("./transforms/function-transforms");
const initializer_api_functions_transform_1 = require("./transforms/initializer-api-functions-transform");
const interface_transforms_1 = require("./transforms/interface-transforms");
const jsdoc_transforms_1 = require("./transforms/jsdoc-transforms");
const module_name_1 = require("./transforms/module-name");
const repo_1 = require("./transforms/repo");
const type_alias_transforms_1 = require("./transforms/type-alias-transforms");
function getRenderable(entry, moduleName, repo) {
    if ((0, categorization_1.isCliEntry)(entry)) {
        return (0, cli_transforms_1.getCliRenderable)(entry);
    }
    if ((0, categorization_1.isClassEntry)(entry)) {
        return (0, class_transforms_1.getClassRenderable)(entry, moduleName, repo);
    }
    if ((0, categorization_1.isDecoratorEntry)(entry)) {
        return (0, decorator_transforms_1.getDecoratorRenderable)(entry, moduleName, repo);
    }
    if ((0, categorization_1.isConstantEntry)(entry)) {
        return (0, constant_transforms_1.getConstantRenderable)(entry, moduleName, repo);
    }
    if ((0, categorization_1.isEnumEntry)(entry)) {
        return (0, enum_transforms_1.getEnumRenderable)(entry, moduleName, repo);
    }
    if ((0, categorization_1.isInterfaceEntry)(entry)) {
        return (0, interface_transforms_1.getInterfaceRenderable)(entry, moduleName, repo);
    }
    if ((0, categorization_1.isFunctionEntry)(entry)) {
        return (0, function_transforms_1.getFunctionRenderable)(entry, moduleName, repo);
    }
    if ((0, categorization_1.isTypeAliasEntry)(entry)) {
        return (0, type_alias_transforms_1.getTypeAliasRenderable)(entry, moduleName, repo);
    }
    if ((0, categorization_1.isInitializerApiFunctionEntry)(entry)) {
        return (0, initializer_api_functions_transform_1.getInitializerApiFunctionRenderable)(entry, moduleName, repo);
    }
    // Fallback to an uncategorized renderable.
    return (0, jsdoc_transforms_1.setEntryFlags)((0, jsdoc_transforms_1.addHtmlAdditionalLinks)((0, jsdoc_transforms_1.addHtmlDescription)((0, jsdoc_transforms_1.addHtmlUsageNotes)((0, jsdoc_transforms_1.addHtmlJsDocTagComments)((0, repo_1.addRepo)((0, module_name_1.addModuleName)(entry, moduleName), repo))))));
}
