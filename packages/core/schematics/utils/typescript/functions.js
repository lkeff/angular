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
exports.isFunctionLikeDeclaration = isFunctionLikeDeclaration;
exports.unwrapExpression = unwrapExpression;
const typescript_1 = __importDefault(require("typescript"));
/** Checks whether a given node is a function like declaration. */
function isFunctionLikeDeclaration(node) {
    return (typescript_1.default.isFunctionDeclaration(node) ||
        typescript_1.default.isMethodDeclaration(node) ||
        typescript_1.default.isArrowFunction(node) ||
        typescript_1.default.isFunctionExpression(node) ||
        typescript_1.default.isGetAccessorDeclaration(node) ||
        typescript_1.default.isSetAccessorDeclaration(node));
}
/**
 * Unwraps a given expression TypeScript node. Expressions can be wrapped within multiple
 * parentheses or as expression. e.g. "(((({exp}))))()". The function should return the
 * TypeScript node referring to the inner expression. e.g "exp".
 */
function unwrapExpression(node) {
    if (typescript_1.default.isParenthesizedExpression(node) || typescript_1.default.isAsExpression(node)) {
        return unwrapExpression(node.expression);
    }
    else {
        return node;
    }
}
