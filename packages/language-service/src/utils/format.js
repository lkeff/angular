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
exports.guessIndentationInSingleLine = guessIndentationInSingleLine;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Try to guess the indentation of the node.
 *
 * This function returns the indentation only if the start character of this node is
 * the first non-whitespace character in a line where the node is, otherwise,
 * it returns `undefined`. When computing the start of the node, it should include
 * the leading comments.
 */
function guessIndentationInSingleLine(node, sourceFile) {
    var _a;
    const leadingComment = typescript_1.default.getLeadingCommentRanges(sourceFile.text, node.pos);
    const firstLeadingComment = leadingComment !== undefined && leadingComment.length > 0 ? leadingComment[0] : undefined;
    const nodeStartWithComment = (_a = firstLeadingComment === null || firstLeadingComment === void 0 ? void 0 : firstLeadingComment.pos) !== null && _a !== void 0 ? _a : node.getStart();
    const lineNumber = sourceFile.getLineAndCharacterOfPosition(nodeStartWithComment).line;
    const lineStart = sourceFile.getLineStarts()[lineNumber];
    let haveChar = false;
    for (let pos = lineStart; pos < nodeStartWithComment; pos++) {
        const ch = sourceFile.text.charCodeAt(pos);
        if (!typescript_1.default.isWhiteSpaceSingleLine(ch)) {
            haveChar = true;
            break;
        }
    }
    return haveChar ? undefined : nodeStartWithComment - lineStart;
}
