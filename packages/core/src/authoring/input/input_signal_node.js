"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.INPUT_SIGNAL_NODE = exports.REQUIRED_UNSET_VALUE = void 0;
const signals_1 = require("../../../primitives/signals");
exports.REQUIRED_UNSET_VALUE = Symbol('InputSignalNode#UNSET');
// Note: Using an IIFE here to ensure that the spread assignment is not considered
// a side-effect, ending up preserving `COMPUTED_NODE` and `REACTIVE_NODE`.
// TODO: remove when https://github.com/evanw/esbuild/issues/3392 is resolved.
exports.INPUT_SIGNAL_NODE = (() => {
    return Object.assign(Object.assign({}, signals_1.SIGNAL_NODE), { transformFn: undefined, applyValueToInputSignal(node, value) {
            (0, signals_1.signalSetFn)(node, value);
        } });
})();
