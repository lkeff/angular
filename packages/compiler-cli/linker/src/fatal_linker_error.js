"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FatalLinkerError = void 0;
exports.isFatalLinkerError = isFatalLinkerError;
/**
 * An unrecoverable error during linking.
 */
class FatalLinkerError extends Error {
    /**
     * Create a new FatalLinkerError.
     *
     * @param node The AST node where the error occurred.
     * @param message A description of the error.
     */
    constructor(node, message) {
        super(message);
        this.node = node;
        this.type = 'FatalLinkerError';
    }
}
exports.FatalLinkerError = FatalLinkerError;
/**
 * Whether the given object `e` is a FatalLinkerError.
 */
function isFatalLinkerError(e) {
    return e && e.type === 'FatalLinkerError';
}
