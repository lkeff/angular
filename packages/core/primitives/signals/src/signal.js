"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIGNAL_NODE = void 0;
exports.createSignal = createSignal;
exports.createSignalTuple = createSignalTuple;
exports.setPostSignalSetFn = setPostSignalSetFn;
exports.signalGetFn = signalGetFn;
exports.signalSetFn = signalSetFn;
exports.signalUpdateFn = signalUpdateFn;
exports.runPostSignalSetFn = runPostSignalSetFn;
const equality_1 = require("./equality");
const errors_1 = require("./errors");
const graph_1 = require("./graph");
/**
 * If set, called after `WritableSignal`s are updated.
 *
 * This hook can be used to achieve various effects, such as running effects synchronously as part
 * of setting a signal.
 */
let postSignalSetFn = null;
/**
 * Create a `Signal` that can be set or updated directly.
 */
function createSignal(initialValue, equal) {
    const node = Object.create(exports.SIGNAL_NODE);
    node.value = initialValue;
    if (equal !== undefined) {
        node.equal = equal;
    }
    const getter = (() => signalGetFn(node));
    getter[graph_1.SIGNAL] = node;
    if (typeof ngDevMode !== 'undefined' && ngDevMode) {
        const debugName = node.debugName ? ' (' + node.debugName + ')' : '';
        getter.toString = () => `[Signal${debugName}: ${node.value}]`;
    }
    (0, graph_1.runPostProducerCreatedFn)(node);
    return getter;
}
/**
 * Creates a `Signal` getter, setter, and updater function.
 */
function createSignalTuple(initialValue, equal) {
    const getter = createSignal(initialValue, equal);
    const node = getter[graph_1.SIGNAL];
    const set = (newValue) => signalSetFn(node, newValue);
    const update = (updateFn) => signalUpdateFn(node, updateFn);
    return [getter, set, update];
}
function setPostSignalSetFn(fn) {
    const prev = postSignalSetFn;
    postSignalSetFn = fn;
    return prev;
}
function signalGetFn(node) {
    (0, graph_1.producerAccessed)(node);
    return node.value;
}
function signalSetFn(node, newValue) {
    if (!(0, graph_1.producerUpdatesAllowed)()) {
        (0, errors_1.throwInvalidWriteToSignalError)(node);
    }
    if (!node.equal(node.value, newValue)) {
        node.value = newValue;
        signalValueChanged(node);
    }
}
function signalUpdateFn(node, updater) {
    if (!(0, graph_1.producerUpdatesAllowed)()) {
        (0, errors_1.throwInvalidWriteToSignalError)(node);
    }
    signalSetFn(node, updater(node.value));
}
function runPostSignalSetFn(node) {
    postSignalSetFn === null || postSignalSetFn === void 0 ? void 0 : postSignalSetFn(node);
}
// Note: Using an IIFE here to ensure that the spread assignment is not considered
// a side-effect, ending up preserving `COMPUTED_NODE` and `REACTIVE_NODE`.
// TODO: remove when https://github.com/evanw/esbuild/issues/3392 is resolved.
exports.SIGNAL_NODE = (() => {
    return Object.assign(Object.assign({}, graph_1.REACTIVE_NODE), { equal: equality_1.defaultEquals, value: undefined, kind: 'signal' });
})();
function signalValueChanged(node) {
    node.version++;
    (0, graph_1.producerIncrementEpoch)();
    (0, graph_1.producerNotifyConsumers)(node);
    postSignalSetFn === null || postSignalSetFn === void 0 ? void 0 : postSignalSetFn(node);
}
