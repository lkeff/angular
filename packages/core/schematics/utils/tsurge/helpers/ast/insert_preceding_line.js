"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPrecedingLine = insertPrecedingLine;
const replacement_1 = require("../../replacement");
const leading_space_1 = require("./leading_space");
const project_paths_1 = require("../../project_paths");
/**
 * Inserts a leading string for the given node, respecting
 * indentation of the given anchor node.
 *
 * Useful for inserting TODOs.
 */
function insertPrecedingLine(node, info, text) {
    const leadingSpace = (0, leading_space_1.getLeadingLineWhitespaceOfNode)(node);
    return new replacement_1.Replacement((0, project_paths_1.projectFile)(node.getSourceFile(), info), new replacement_1.TextUpdate({
        position: node.getStart(),
        end: node.getStart(),
        toInsert: `${text}\n${leadingSpace}`,
    }));
}
