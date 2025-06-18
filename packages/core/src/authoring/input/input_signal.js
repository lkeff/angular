"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵINPUT_SIGNAL_BRAND_WRITE_TYPE = exports.ɵINPUT_SIGNAL_BRAND_READ_TYPE = void 0;
exports.createInputSignal = createInputSignal;
const signals_1 = require("../../../primitives/signals");
const errors_1 = require("../../errors");
const input_signal_node_1 = require("./input_signal_node");
exports.ɵINPUT_SIGNAL_BRAND_READ_TYPE = Symbol();
exports.ɵINPUT_SIGNAL_BRAND_WRITE_TYPE = Symbol();
/**
 * Creates an input signal.
 *
 * @param initialValue The initial value.
 *   Can be set to {@link REQUIRED_UNSET_VALUE} for required inputs.
 * @param options Additional options for the input. e.g. a transform, or an alias.
 */
function createInputSignal(initialValue, options) {
    const node = Object.create(input_signal_node_1.INPUT_SIGNAL_NODE);
    node.value = initialValue;
    // Perf note: Always set `transformFn` here to ensure that `node` always
    // has the same v8 class shape, allowing monomorphic reads on input signals.
    node.transformFn = options === null || options === void 0 ? void 0 : options.transform;
    function inputValueFn() {
        var _a;
        // Record that someone looked at this signal.
        (0, signals_1.producerAccessed)(node);
        if (node.value === input_signal_node_1.REQUIRED_UNSET_VALUE) {
            let message = null;
            if (ngDevMode) {
                const name = (_a = options === null || options === void 0 ? void 0 : options.debugName) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.alias;
                message = `Input${name ? ` "${name}"` : ''} is required but no value is available yet.`;
            }
            throw new errors_1.RuntimeError(-950 /* RuntimeErrorCode.REQUIRED_INPUT_NO_VALUE */, message);
        }
        return node.value;
    }
    inputValueFn[signals_1.SIGNAL] = node;
    if (ngDevMode) {
        inputValueFn.toString = () => `[Input Signal: ${inputValueFn()}]`;
        node.debugName = options === null || options === void 0 ? void 0 : options.debugName;
    }
    return inputValueFn;
}
