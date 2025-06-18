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
exports.unwrapParent = unwrapParent;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Unwraps the parent of the given node, if it's a
 * parenthesized expression or `as` expression.
 */
function unwrapParent(node) {
    if (typescript_1.default.isParenthesizedExpression(node.parent)) {
        return unwrapParent(node.parent);
    }
    else if (typescript_1.default.isAsExpression(node.parent)) {
        return unwrapParent(node.parent);
    }
    return node;
}
