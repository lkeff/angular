"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeError = void 0;
exports.formatRuntimeErrorCode = formatRuntimeErrorCode;
exports.formatRuntimeError = formatRuntimeError;
const error_details_base_url_1 = require("./error_details_base_url");
/**
 * Class that represents a runtime error.
 * Formats and outputs the error message in a consistent way.
 *
 * Example:
 * ```ts
 *  throw new RuntimeError(
 *    RuntimeErrorCode.INJECTOR_ALREADY_DESTROYED,
 *    ngDevMode && 'Injector has already been destroyed.');
 * ```
 *
 * Note: the `message` argument contains a descriptive error message as a string in development
 * mode (when the `ngDevMode` is defined). In production mode (after tree-shaking pass), the
 * `message` argument becomes `false`, thus we account for it in the typings and the runtime
 * logic.
 */
class RuntimeError extends Error {
    constructor(code, message) {
        super(formatRuntimeError(code, message));
        this.code = code;
    }
}
exports.RuntimeError = RuntimeError;
function formatRuntimeErrorCode(code) {
    // Error code might be a negative number, which is a special marker that instructs the logic to
    // generate a link to the error details page on angular.io.
    // We also prepend `0` to non-compile-time errors.
    return `NG0${Math.abs(code)}`;
}
/**
 * Called to format a runtime error.
 * See additional info on the `message` argument type in the `RuntimeError` class description.
 */
function formatRuntimeError(code, message) {
    const fullCode = formatRuntimeErrorCode(code);
    let errorMessage = `${fullCode}${message ? ': ' + message : ''}`;
    if (ngDevMode && code < 0) {
        const addPeriodSeparator = !errorMessage.match(/[.,;!?\n]$/);
        const separator = addPeriodSeparator ? '.' : '';
        errorMessage = `${errorMessage}${separator} Find more at ${error_details_base_url_1.ERROR_DETAILS_PAGE_BASE_URL}/${fullCode}`;
    }
    return errorMessage;
}
