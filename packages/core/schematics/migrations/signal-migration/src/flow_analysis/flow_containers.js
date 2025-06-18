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
exports.isControlFlowBoundary = isControlFlowBoundary;
exports.getControlFlowContainer = getControlFlowContainer;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Whether the given node represents a control flow container boundary.
 * E.g. variables cannot be narrowed when descending into children of `node`.
 */
function isControlFlowBoundary(node) {
    return ((typescript_1.default.isFunctionLike(node) && !getImmediatelyInvokedFunctionExpression(node)) ||
        node.kind === typescript_1.default.SyntaxKind.ModuleBlock ||
        node.kind === typescript_1.default.SyntaxKind.SourceFile ||
        node.kind === typescript_1.default.SyntaxKind.PropertyDeclaration);
}
/** Determines the current flow container of a given node. */
function getControlFlowContainer(node) {
    return typescript_1.default.findAncestor(node.parent, (node) => isControlFlowBoundary(node));
}
/** Checks whether the given node refers to an IIFE declaration. */
function getImmediatelyInvokedFunctionExpression(func) {
    if (func.kind === typescript_1.default.SyntaxKind.FunctionExpression || func.kind === typescript_1.default.SyntaxKind.ArrowFunction) {
        let prev = func;
        let parent = func.parent;
        while (parent.kind === typescript_1.default.SyntaxKind.ParenthesizedExpression) {
            prev = parent;
            parent = parent.parent;
        }
        if (parent.kind === typescript_1.default.SyntaxKind.CallExpression &&
            parent.expression === prev) {
            return parent;
        }
    }
    return undefined;
}
