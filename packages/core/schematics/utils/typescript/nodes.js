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
exports.hasModifier = hasModifier;
exports.closestNode = closestNode;
exports.isNullCheck = isNullCheck;
exports.isSafeAccess = isSafeAccess;
const typescript_1 = __importDefault(require("typescript"));
/** Checks whether the given TypeScript node has the specified modifier set. */
function hasModifier(node, modifierKind) {
    return (typescript_1.default.canHaveModifiers(node) &&
        !!node.modifiers &&
        node.modifiers.some((m) => m.kind === modifierKind));
}
/** Find the closest parent node of a particular kind. */
function closestNode(node, predicate) {
    let current = node.parent;
    while (current && !typescript_1.default.isSourceFile(current)) {
        if (predicate(current)) {
            return current;
        }
        current = current.parent;
    }
    return null;
}
/**
 * Checks whether a particular node is part of a null check. E.g. given:
 * `foo.bar ? foo.bar.value : null` the null check would be `foo.bar`.
 */
function isNullCheck(node) {
    if (!node.parent) {
        return false;
    }
    // `foo.bar && foo.bar.value` where `node` is `foo.bar`.
    if (typescript_1.default.isBinaryExpression(node.parent) && node.parent.left === node) {
        return true;
    }
    // `foo.bar && foo.bar.parent && foo.bar.parent.value`
    // where `node` is `foo.bar`.
    if (node.parent.parent &&
        typescript_1.default.isBinaryExpression(node.parent.parent) &&
        node.parent.parent.left === node.parent) {
        return true;
    }
    // `if (foo.bar) {...}` where `node` is `foo.bar`.
    if (typescript_1.default.isIfStatement(node.parent) && node.parent.expression === node) {
        return true;
    }
    // `foo.bar ? foo.bar.value : null` where `node` is `foo.bar`.
    if (typescript_1.default.isConditionalExpression(node.parent) && node.parent.condition === node) {
        return true;
    }
    return false;
}
/** Checks whether a property access is safe (e.g. `foo.parent?.value`). */
function isSafeAccess(node) {
    return (node.parent != null &&
        typescript_1.default.isPropertyAccessExpression(node.parent) &&
        node.parent.expression === node &&
        node.parent.questionDotToken != null);
}
