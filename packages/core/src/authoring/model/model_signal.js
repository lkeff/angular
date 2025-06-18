"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModelSignal = createModelSignal;
const signals_1 = require("../../../primitives/signals");
const errors_1 = require("../../errors");
const signal_1 = require("../../render3/reactivity/signal");
const input_signal_node_1 = require("../input/input_signal_node");
const output_emitter_ref_1 = require("../output/output_emitter_ref");
/**
 * Creates a model signal.
 *
 * @param initialValue The initial value.
 *   Can be set to {@link REQUIRED_UNSET_VALUE} for required model signals.
 * @param options Additional options for the model.
 */
function createModelSignal(initialValue, opts) {
    const node = Object.create(input_signal_node_1.INPUT_SIGNAL_NODE);
    const emitterRef = new output_emitter_ref_1.OutputEmitterRef();
    node.value = initialValue;
    function getter() {
        (0, signals_1.producerAccessed)(node);
        assertModelSet(node.value);
        return node.value;
    }
    getter[signals_1.SIGNAL] = node;
    getter.asReadonly = signal_1.signalAsReadonlyFn.bind(getter);
    // TODO: Should we throw an error when updating a destroyed model?
    getter.set = (newValue) => {
        if (!node.equal(node.value, newValue)) {
            (0, signals_1.signalSetFn)(node, newValue);
            emitterRef.emit(newValue);
        }
    };
    getter.update = (updateFn) => {
        assertModelSet(node.value);
        getter.set(updateFn(node.value));
    };
    getter.subscribe = emitterRef.subscribe.bind(emitterRef);
    getter.destroyRef = emitterRef.destroyRef;
    if (ngDevMode) {
        getter.toString = () => `[Model Signal: ${getter()}]`;
        node.debugName = opts === null || opts === void 0 ? void 0 : opts.debugName;
    }
    return getter;
}
/** Asserts that a model's value is set. */
function assertModelSet(value) {
    if (value === input_signal_node_1.REQUIRED_UNSET_VALUE) {
        throw new errors_1.RuntimeError(952 /* RuntimeErrorCode.REQUIRED_MODEL_NO_VALUE */, ngDevMode && 'Model is required but no value is available yet.');
    }
}
