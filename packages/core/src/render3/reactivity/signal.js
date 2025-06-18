"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵWRITABLE_SIGNAL = void 0;
exports.ɵunwrapWritableSignal = ɵunwrapWritableSignal;
exports.signal = signal;
exports.signalAsReadonlyFn = signalAsReadonlyFn;
exports.isWritableSignal = isWritableSignal;
const signals_1 = require("../../../primitives/signals");
const api_1 = require("./api");
/** Symbol used distinguish `WritableSignal` from other non-writable signals and functions. */
exports.ɵWRITABLE_SIGNAL = Symbol('WRITABLE_SIGNAL');
/**
 * Utility function used during template type checking to extract the value from a `WritableSignal`.
 * @codeGenApi
 */
function ɵunwrapWritableSignal(value) {
    // Note: the function uses `WRITABLE_SIGNAL` as a brand instead of `WritableSignal<T>`,
    // because the latter incorrectly unwraps non-signal getter functions.
    return null;
}
/**
 * Create a `Signal` that can be set or updated directly.
 */
function signal(initialValue, options) {
    const signalFn = (0, signals_1.createSignal)(initialValue, options === null || options === void 0 ? void 0 : options.equal);
    const node = signalFn[signals_1.SIGNAL];
    signalFn.set = (newValue) => (0, signals_1.signalSetFn)(node, newValue);
    signalFn.update = (updateFn) => (0, signals_1.signalUpdateFn)(node, updateFn);
    signalFn.asReadonly = signalAsReadonlyFn.bind(signalFn);
    if (ngDevMode) {
        signalFn.toString = () => `[Signal: ${signalFn()}]`;
        node.debugName = options === null || options === void 0 ? void 0 : options.debugName;
    }
    return signalFn;
}
function signalAsReadonlyFn() {
    const node = this[signals_1.SIGNAL];
    if (node.readonlyFn === undefined) {
        const readonlyFn = () => this();
        readonlyFn[signals_1.SIGNAL] = node;
        node.readonlyFn = readonlyFn;
    }
    return node.readonlyFn;
}
/**
 * Checks if the given `value` is a writeable signal.
 */
function isWritableSignal(value) {
    return (0, api_1.isSignal)(value) && typeof value.set === 'function';
}
