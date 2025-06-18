"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceTsWithNgInErrors = exports.ngErrorCode = exports.ExtendedTemplateDiagnosticName = exports.ERROR_DETAILS_PAGE_BASE_URL = exports.ErrorCode = exports.makeRelatedInformation = exports.makeDiagnosticChain = exports.makeDiagnostic = exports.isLocalCompilationDiagnostics = exports.isFatalDiagnosticError = exports.FatalDiagnosticError = exports.addDiagnosticChain = exports.COMPILER_ERRORS_WITH_GUIDES = void 0;
var docs_1 = require("./src/docs");
Object.defineProperty(exports, "COMPILER_ERRORS_WITH_GUIDES", { enumerable: true, get: function () { return docs_1.COMPILER_ERRORS_WITH_GUIDES; } });
var error_1 = require("./src/error");
Object.defineProperty(exports, "addDiagnosticChain", { enumerable: true, get: function () { return error_1.addDiagnosticChain; } });
Object.defineProperty(exports, "FatalDiagnosticError", { enumerable: true, get: function () { return error_1.FatalDiagnosticError; } });
Object.defineProperty(exports, "isFatalDiagnosticError", { enumerable: true, get: function () { return error_1.isFatalDiagnosticError; } });
Object.defineProperty(exports, "isLocalCompilationDiagnostics", { enumerable: true, get: function () { return error_1.isLocalCompilationDiagnostics; } });
Object.defineProperty(exports, "makeDiagnostic", { enumerable: true, get: function () { return error_1.makeDiagnostic; } });
Object.defineProperty(exports, "makeDiagnosticChain", { enumerable: true, get: function () { return error_1.makeDiagnosticChain; } });
Object.defineProperty(exports, "makeRelatedInformation", { enumerable: true, get: function () { return error_1.makeRelatedInformation; } });
var error_code_1 = require("./src/error_code");
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return error_code_1.ErrorCode; } });
var error_details_base_url_1 = require("./src/error_details_base_url");
Object.defineProperty(exports, "ERROR_DETAILS_PAGE_BASE_URL", { enumerable: true, get: function () { return error_details_base_url_1.ERROR_DETAILS_PAGE_BASE_URL; } });
var extended_template_diagnostic_name_1 = require("./src/extended_template_diagnostic_name");
Object.defineProperty(exports, "ExtendedTemplateDiagnosticName", { enumerable: true, get: function () { return extended_template_diagnostic_name_1.ExtendedTemplateDiagnosticName; } });
var util_1 = require("./src/util");
Object.defineProperty(exports, "ngErrorCode", { enumerable: true, get: function () { return util_1.ngErrorCode; } });
Object.defineProperty(exports, "replaceTsWithNgInErrors", { enumerable: true, get: function () { return util_1.replaceTsWithNgInErrors; } });
