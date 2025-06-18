"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertTodoForIncompatibility = insertTodoForIncompatibility;
const incompatibility_human_1 = require("./incompatibility_human");
const insert_preceding_line_1 = require("../../../../../utils/tsurge/helpers/ast/insert_preceding_line");
const cut_string_line_length_1 = require("../../../../../utils/tsurge/helpers/string_manipulation/cut_string_line_length");
const incompatibility_1 = require("./incompatibility");
/**
 * Inserts a TODO for the incompatibility blocking the given node
 * from being migrated.
 */
function insertTodoForIncompatibility(node, programInfo, incompatibility, fieldName) {
    // If a field is skipped via config filter or outside migration scope, do not
    // insert TODOs, as this could results in lots of unnecessary comments.
    if ((0, incompatibility_1.isFieldIncompatibility)(incompatibility) &&
        (incompatibility.reason === incompatibility_1.FieldIncompatibilityReason.SkippedViaConfigFilter ||
            incompatibility.reason === incompatibility_1.FieldIncompatibilityReason.OutsideOfMigrationScope)) {
        return [];
    }
    const message = (0, incompatibility_1.isFieldIncompatibility)(incompatibility)
        ? (0, incompatibility_human_1.getMessageForFieldIncompatibility)(incompatibility.reason, fieldName).short
        : (0, incompatibility_human_1.getMessageForClassIncompatibility)(incompatibility, fieldName).short;
    const lines = (0, cut_string_line_length_1.cutStringToLineLimit)(message, 70);
    return [
        (0, insert_preceding_line_1.insertPrecedingLine)(node, programInfo, `// TODO: Skipped for migration because:`),
        ...lines.map((line) => (0, insert_preceding_line_1.insertPrecedingLine)(node, programInfo, `//  ${line}`)),
    ];
}
