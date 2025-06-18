"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINKED_SIGNAL_NODE = void 0;
exports.createLinkedSignal = createLinkedSignal;
exports.linkedSignalSetFn = linkedSignalSetFn;
exports.linkedSignalUpdateFn = linkedSignalUpdateFn;
const computed_1 = require("./computed");
const equality_1 = require("./equality");
const graph_1 = require("./graph");
const signal_1 = require("./signal");
function createLinkedSignal(sourceFn, computationFn, equalityFn) {
    const node = Object.create(exports.LINKED_SIGNAL_NODE);
    node.source = sourceFn;
    node.computation = computationFn;
    if (equalityFn != undefined) {
        node.equal = equalityFn;
    }
    const linkedSignalGetter = () => {
        // Check if the value needs updating before returning it.
        (0, graph_1.producerUpdateValueVersion)(node);
        // Record that someone looked at this signal.
        (0, graph_1.producerAccessed)(node);
        if (node.value === computed_1.ERRORED) {
            throw node.error;
        }
        return node.value;
    };
    const getter = linkedSignalGetter;
    getter[graph_1.SIGNAL] = node;
    if (typeof ngDevMode !== 'undefined' && ngDevMode) {
        const debugName = node.debugName ? ' (' + node.debugName + ')' : '';
        getter.toString = () => `[LinkedSignal${debugName}: ${node.value}]`;
    }
    (0, graph_1.runPostProducerCreatedFn)(node);
    return getter;
}
function linkedSignalSetFn(node, newValue) {
    (0, graph_1.producerUpdateValueVersion)(node);
    (0, signal_1.signalSetFn)(node, newValue);
    (0, graph_1.producerMarkClean)(node);
}
function linkedSignalUpdateFn(node, updater) {
    (0, graph_1.producerUpdateValueVersion)(node);
    (0, signal_1.signalUpdateFn)(node, updater);
    (0, graph_1.producerMarkClean)(node);
}
// Note: Using an IIFE here to ensure that the spread assignment is not considered
// a side-effect, ending up preserving `LINKED_SIGNAL_NODE` and `REACTIVE_NODE`.
// TODO: remove when https://github.com/evanw/esbuild/issues/3392 is resolved.
exports.LINKED_SIGNAL_NODE = (() => {
    return Object.assign(Object.assign({}, graph_1.REACTIVE_NODE), { value: computed_1.UNSET, dirty: true, error: null, equal: equality_1.defaultEquals, kind: 'linkedSignal', producerMustRecompute(node) {
            // Force a recomputation if there's no current value, or if the current value is in the
            // process of being calculated (which should throw an error).
            return node.value === computed_1.UNSET || node.value === computed_1.COMPUTING;
        },
        producerRecomputeValue(node) {
            if (node.value === computed_1.COMPUTING) {
                // Our computation somehow led to a cyclic read of itself.
                throw new Error(typeof ngDevMode !== 'undefined' && ngDevMode ? 'Detected cycle in computations.' : '');
            }
            const oldValue = node.value;
            node.value = computed_1.COMPUTING;
            const prevConsumer = (0, graph_1.consumerBeforeComputation)(node);
            let newValue;
            try {
                const newSourceValue = node.source();
                const prev = oldValue === computed_1.UNSET || oldValue === computed_1.ERRORED
                    ? undefined
                    : {
                        source: node.sourceValue,
                        value: oldValue,
                    };
                newValue = node.computation(newSourceValue, prev);
                node.sourceValue = newSourceValue;
            }
            catch (err) {
                newValue = computed_1.ERRORED;
                node.error = err;
            }
            finally {
                (0, graph_1.consumerAfterComputation)(node, prevConsumer);
            }
            if (oldValue !== computed_1.UNSET && newValue !== computed_1.ERRORED && node.equal(oldValue, newValue)) {
                // No change to `valueVersion` - old and new values are
                // semantically equivalent.
                node.value = oldValue;
                return;
            }
            node.value = newValue;
            node.version++;
        } });
})();
