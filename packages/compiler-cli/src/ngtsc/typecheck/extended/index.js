"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_DIAGNOSTIC_NAMES = exports.ALL_DIAGNOSTIC_FACTORIES = exports.ExtendedTemplateCheckerImpl = void 0;
const diagnostics_1 = require("../../diagnostics");
const interpolated_signal_not_invoked_1 = require("./checks/interpolated_signal_not_invoked");
const invalid_banana_in_box_1 = require("./checks/invalid_banana_in_box");
const missing_control_flow_directive_1 = require("./checks/missing_control_flow_directive");
const missing_ngforof_let_1 = require("./checks/missing_ngforof_let");
const missing_structural_directive_1 = require("./checks/missing_structural_directive");
const nullish_coalescing_not_nullable_1 = require("./checks/nullish_coalescing_not_nullable");
const optional_chain_not_nullable_1 = require("./checks/optional_chain_not_nullable");
const skip_hydration_not_static_1 = require("./checks/skip_hydration_not_static");
const suffix_not_supported_1 = require("./checks/suffix_not_supported");
const text_attribute_not_binding_1 = require("./checks/text_attribute_not_binding");
const uninvoked_function_in_event_binding_1 = require("./checks/uninvoked_function_in_event_binding");
const unparenthesized_nullish_coalescing_1 = require("./checks/unparenthesized_nullish_coalescing");
const unused_let_declaration_1 = require("./checks/unused_let_declaration");
const uninvoked_track_function_1 = require("./checks/uninvoked_track_function");
var extended_template_checker_1 = require("./src/extended_template_checker");
Object.defineProperty(exports, "ExtendedTemplateCheckerImpl", { enumerable: true, get: function () { return extended_template_checker_1.ExtendedTemplateCheckerImpl; } });
exports.ALL_DIAGNOSTIC_FACTORIES = [
    invalid_banana_in_box_1.factory,
    nullish_coalescing_not_nullable_1.factory,
    optional_chain_not_nullable_1.factory,
    missing_control_flow_directive_1.factory,
    text_attribute_not_binding_1.factory,
    missing_ngforof_let_1.factory,
    missing_structural_directive_1.factory,
    suffix_not_supported_1.factory,
    interpolated_signal_not_invoked_1.factory,
    uninvoked_function_in_event_binding_1.factory,
    unused_let_declaration_1.factory,
    skip_hydration_not_static_1.factory,
    unparenthesized_nullish_coalescing_1.factory,
    uninvoked_track_function_1.factory,
];
exports.SUPPORTED_DIAGNOSTIC_NAMES = new Set([
    diagnostics_1.ExtendedTemplateDiagnosticName.CONTROL_FLOW_PREVENTING_CONTENT_PROJECTION,
    diagnostics_1.ExtendedTemplateDiagnosticName.UNUSED_STANDALONE_IMPORTS,
    ...exports.ALL_DIAGNOSTIC_FACTORIES.map((factory) => factory.name),
]);
