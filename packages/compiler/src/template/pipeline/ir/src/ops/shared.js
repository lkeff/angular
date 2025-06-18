"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEW_OP = void 0;
exports.createStatementOp = createStatementOp;
exports.createVariableOp = createVariableOp;
const enums_1 = require("../enums");
/**
 * Create a `StatementOp`.
 */
function createStatementOp(statement) {
    return Object.assign({ kind: enums_1.OpKind.Statement, statement }, exports.NEW_OP);
}
/**
 * Create a `VariableOp`.
 */
function createVariableOp(xref, variable, initializer, flags) {
    return Object.assign({ kind: enums_1.OpKind.Variable, xref,
        variable,
        initializer,
        flags }, exports.NEW_OP);
}
/**
 * Static structure shared by all operations.
 *
 * Used as a convenience via the spread operator (`...NEW_OP`) when creating new operations, and
 * ensures the fields are always in the same order.
 */
exports.NEW_OP = {
    debugListId: null,
    prev: null,
    next: null,
};
