"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRefactorings = void 0;
const individual_input_refactoring_1 = require("./convert_to_signal_input/individual_input_refactoring");
const full_class_input_refactoring_1 = require("./convert_to_signal_input/full_class_input_refactoring");
const individual_query_refactoring_1 = require("./convert_to_signal_queries/individual_query_refactoring");
const full_class_query_refactoring_1 = require("./convert_to_signal_queries/full_class_query_refactoring");
exports.allRefactorings = [
    // Signal Input migration
    individual_input_refactoring_1.ConvertFieldToSignalInputRefactoring,
    individual_input_refactoring_1.ConvertFieldToSignalInputBestEffortRefactoring,
    full_class_input_refactoring_1.ConvertFullClassToSignalInputsRefactoring,
    full_class_input_refactoring_1.ConvertFullClassToSignalInputsBestEffortRefactoring,
    // Queries migration
    individual_query_refactoring_1.ConvertFieldToSignalQueryRefactoring,
    individual_query_refactoring_1.ConvertFieldToSignalQueryBestEffortRefactoring,
    full_class_query_refactoring_1.ConvertFullClassToSignalQueriesRefactoring,
    full_class_query_refactoring_1.ConvertFullClassToSignalQueriesBestEffortRefactoring,
];
