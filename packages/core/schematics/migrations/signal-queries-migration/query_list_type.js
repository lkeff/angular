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
exports.extractQueryListType = extractQueryListType;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Extracts the type `T` of expressions referencing `QueryList<T>`.
 */
function extractQueryListType(node) {
    var _a, _b;
    // Initializer variant of `new QueryList<T>()`.
    if (typescript_1.default.isNewExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === 'QueryList') {
        return (_a = node.typeArguments) === null || _a === void 0 ? void 0 : _a[0];
    }
    // Type variant of `: QueryList<T>`.
    if (typescript_1.default.isTypeReferenceNode(node) &&
        typescript_1.default.isIdentifier(node.typeName) &&
        node.typeName.text === 'QueryList') {
        return (_b = node.typeArguments) === null || _b === void 0 ? void 0 : _b[0];
    }
    return undefined;
}
