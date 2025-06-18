"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEntry = renderEntry;
const preact_render_to_string_1 = require("preact-render-to-string");
const categorization_1 = require("./entities/categorization");
const class_reference_1 = require("./templates/class-reference");
const cli_reference_1 = require("./templates/cli-reference");
const constant_reference_1 = require("./templates/constant-reference");
const docs_reference_1 = require("./templates/docs-reference");
const enum_reference_1 = require("./templates/enum-reference");
const function_reference_1 = require("./templates/function-reference");
const initializer_api_function_1 = require("./templates/initializer-api-function");
const type_alias_reference_1 = require("./templates/type-alias-reference");
const symbol_context_1 = require("./symbol-context");
/** Given a doc entry, get the transformed version of the entry for rendering. */
function renderEntry(renderable) {
    (0, symbol_context_1.setCurrentSymbol)(renderable.name);
    if ((0, categorization_1.isCliEntry)(renderable)) {
        return (0, preact_render_to_string_1.render)((0, cli_reference_1.CliCommandReference)(renderable));
    }
    if ((0, categorization_1.isClassEntry)(renderable) || (0, categorization_1.isInterfaceEntry)(renderable) || (0, categorization_1.isDecoratorEntry)(renderable)) {
        return (0, preact_render_to_string_1.render)((0, class_reference_1.ClassReference)(renderable));
    }
    if ((0, categorization_1.isConstantEntry)(renderable)) {
        return (0, preact_render_to_string_1.render)((0, constant_reference_1.ConstantReference)(renderable));
    }
    if ((0, categorization_1.isEnumEntry)(renderable)) {
        return (0, preact_render_to_string_1.render)((0, enum_reference_1.EnumReference)(renderable));
    }
    if ((0, categorization_1.isFunctionEntry)(renderable)) {
        return (0, preact_render_to_string_1.render)((0, function_reference_1.FunctionReference)(renderable));
    }
    if ((0, categorization_1.isTypeAliasEntry)(renderable)) {
        return (0, preact_render_to_string_1.render)((0, type_alias_reference_1.TypeAliasReference)(renderable));
    }
    if ((0, categorization_1.isInitializerApiFunctionEntry)(renderable)) {
        return (0, preact_render_to_string_1.render)((0, initializer_api_function_1.InitializerApiFunction)(renderable));
    }
    // Fall back rendering nothing while in development.
    return (0, preact_render_to_string_1.render)((0, docs_reference_1.DocsReference)(renderable));
}
