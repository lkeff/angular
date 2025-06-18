"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorEventForAnalytics = formatErrorEventForAnalytics;
exports.formatErrorForAnalytics = formatErrorForAnalytics;
/**
 * Formats an `ErrorEvent` to a human-readable string that can
 * be sent to Google Analytics.
 */
function formatErrorEventForAnalytics(event) {
    const { message, filename, colno, lineno, error } = event;
    if (error instanceof Error) {
        return formatErrorForAnalytics(error);
    }
    return `${stripErrorMessagePrefix(message)}\n${filename}:` + `${lineno || '?'}:${colno || '?'}`;
}
/**
 * Formats an `Error` to a human-readable string that can be sent
 * to Google Analytics.
 */
function formatErrorForAnalytics(error) {
    let stack = '<no-stack>';
    if (error.stack) {
        stack = stripErrorMessagePrefix(error.stack)
            // strip the message from the stack trace, if present
            .replace(error.message + '\n', '')
            // strip leading spaces
            .replace(/^ +/gm, '')
            // strip all leading "at " for each frame
            .replace(/^at /gm, '')
            // replace long urls with just the last segment: `filename:line:column`
            .replace(/(?: \(|@)http.+\/([^/)]+)\)?(?:\n|$)/gm, '@$1\n')
            // replace "eval code" in Edge
            .replace(/ *\(eval code(:\d+:\d+)\)(?:\n|$)/gm, '@???$1\n');
    }
    return `${error.message}\n${stack}`;
}
/** Strips the error message prefix from a message or stack trace. */
function stripErrorMessagePrefix(input) {
    return input.replace(/^(Uncaught )?Error: /, '');
}
