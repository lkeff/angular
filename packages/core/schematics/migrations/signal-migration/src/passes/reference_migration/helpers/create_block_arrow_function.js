"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewBlockToInsertVariable = createNewBlockToInsertVariable;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../../../../../utils/tsurge");
/**
 * Creates replacements to insert the given statement as
 * first statement into the arrow function.
 *
 * The arrow function is converted to a block-based arrow function
 * that can hold multiple statements. The original expression is
 * simply returned like before.
 */
function createNewBlockToInsertVariable(node, file, toInsert) {
    var _a;
    const sf = node.getSourceFile();
    // For indentation, we traverse up and find the earliest statement.
    // This node is most of the time a good candidate for acceptable
    // indentation of a new block.
    const spacingNode = (_a = typescript_1.default.findAncestor(node, typescript_1.default.isStatement)) !== null && _a !== void 0 ? _a : node.parent;
    const { character } = typescript_1.default.getLineAndCharacterOfPosition(sf, spacingNode.getStart());
    const blockSpace = ' '.repeat(character);
    const contentSpace = ' '.repeat(character + 2);
    return [
        // Delete leading whitespace of the concise body.
        new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
            position: node.body.getFullStart(),
            end: node.body.getStart(),
            toInsert: '',
        })),
        // Insert leading block braces, and `toInsert` content.
        // Wrap the previous expression in a return now.
        new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
            position: node.body.getStart(),
            end: node.body.getStart(),
            toInsert: ` {\n${contentSpace}${toInsert}\n${contentSpace}return `,
        })),
        // Add trailing brace.
        new tsurge_1.Replacement(file, new tsurge_1.TextUpdate({
            position: node.body.getEnd(),
            end: node.body.getEnd(),
            toInsert: `;\n${blockSpace}}`,
        })),
    ];
}
