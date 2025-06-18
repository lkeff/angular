"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.untracked = untracked;
const graph_1 = require("./graph");
/**
 * Execute an arbitrary function in a non-reactive (non-tracking) context. The executed function
 * can, optionally, return a value.
 */
function untracked(nonReactiveReadsFn) {
    const prevConsumer = (0, graph_1.setActiveConsumer)(null);
    // We are not trying to catch any particular errors here, just making sure that the consumers
    // stack is restored in case of errors.
    try {
        return nonReactiveReadsFn();
    }
    finally {
        (0, graph_1.setActiveConsumer)(prevConsumer);
    }
}
