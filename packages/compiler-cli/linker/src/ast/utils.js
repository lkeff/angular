"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = assert;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const fatal_linker_error_1 = require("../fatal_linker_error");
/**
 * Assert that the given `node` is of the type guarded by the `predicate` function.
 */
function assert(node, predicate, expected) {
    if (!predicate(node)) {
        throw new fatal_linker_error_1.FatalLinkerError(node, `Unsupported syntax, expected ${expected}.`);
    }
}
