"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPILER_ERRORS_WITH_GUIDES = void 0;
const error_code_1 = require("./error_code");
/**
 * Contains a set of error messages that have detailed guides at angular.io.
 * Full list of available error guides can be found at https://angular.dev/errors
 */
exports.COMPILER_ERRORS_WITH_GUIDES = new Set([
    error_code_1.ErrorCode.DECORATOR_ARG_NOT_LITERAL,
    error_code_1.ErrorCode.IMPORT_CYCLE_DETECTED,
    error_code_1.ErrorCode.PARAM_MISSING_TOKEN,
    error_code_1.ErrorCode.SCHEMA_INVALID_ELEMENT,
    error_code_1.ErrorCode.SCHEMA_INVALID_ATTRIBUTE,
    error_code_1.ErrorCode.MISSING_REFERENCE_TARGET,
    error_code_1.ErrorCode.COMPONENT_INVALID_SHADOW_DOM_SELECTOR,
    error_code_1.ErrorCode.WARN_NGMODULE_ID_UNNECESSARY,
]);
