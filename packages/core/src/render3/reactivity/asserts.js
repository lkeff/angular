"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotInReactiveContext = assertNotInReactiveContext;
const signals_1 = require("../../../primitives/signals");
const errors_1 = require("../../errors");
/**
 * Asserts that the current stack frame is not within a reactive context. Useful
 * to disallow certain code from running inside a reactive context (see {@link /api/core/rxjs/toSignal toSignal})
 *
 * @param debugFn a reference to the function making the assertion (used for the error message).
 *
 * @publicApi
 */
function assertNotInReactiveContext(debugFn, extraContext) {
    // Taking a `Function` instead of a string name here prevents the un-minified name of the function
    // from being retained in the bundle regardless of minification.
    if ((0, signals_1.getActiveConsumer)() !== null) {
        throw new errors_1.RuntimeError(-602 /* RuntimeErrorCode.ASSERTION_NOT_INSIDE_REACTIVE_CONTEXT */, ngDevMode &&
            `${debugFn.name}() cannot be called from within a reactive context.${extraContext ? ` ${extraContext}` : ''}`);
    }
}
