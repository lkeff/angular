"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncValidator = asyncValidator;
exports.simpleAsyncValidator = simpleAsyncValidator;
exports.currentStateOf = currentStateOf;
exports.asyncValidatorReturningObservable = asyncValidatorReturningObservable;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
function createValidationPromise(result, timeout) {
    return new Promise((resolve) => {
        if (timeout == 0) {
            resolve(result);
        }
        else {
            setTimeout(() => {
                resolve(result);
            }, timeout);
        }
    });
}
/**
 * Returns a promise-based async validator that emits, after a delay, either:
 *  - an error `{async: true}` if the control value does not match the expected value
 *  - or null, otherwise
 *  The delay is either:
 *  - defined in `timeouts` parameter, as the association to the control value
 *  - or 0ms otherwise
 *
 * @param expected The expected control value
 * @param timeouts A dictionary associating a control value to when the validation will trigger for
 *     that value
 */
function asyncValidator(expected, timeouts = {}) {
    return (control) => {
        var _a;
        const timeout = (_a = timeouts[control.value]) !== null && _a !== void 0 ? _a : 0;
        const result = control.value != expected ? { async: true } : null;
        return createValidationPromise(result, timeout);
    };
}
/**
 * Returns an async validator that emits null or a custom error after a specified delay.
 * If the delay is set to 0ms, the validator emits synchronously.
 *
 * @param timeout Indicates when the validator will emit
 * @param shouldFail When true, a validation error is emitted, otherwise null is emitted
 * @param customError When supplied, overrides the default error `{async: true}`
 */
function simpleAsyncValidator({ timeout = 0, shouldFail, customError = {
    async: true,
}, }) {
    const result = shouldFail ? customError : null;
    return (c) => timeout === 0 ? (0, rxjs_1.of)(result) : createValidationPromise(result, timeout);
}
/**
 * Returns the asynchronous validation state of each provided control
 * @param controls A collection of controls
 */
function currentStateOf(controls) {
    return controls.map((c) => ({ errors: c.errors, pending: c.pending, status: c.status }));
}
/**
 * Returns an `EventEmitter` emitting the default error `{'async': true}`
 *
 * @param c The control instance
 */
function asyncValidatorReturningObservable(c) {
    const e = new core_1.EventEmitter();
    queueMicrotask(() => {
        e.emit({ 'async': true });
    });
    return e;
}
