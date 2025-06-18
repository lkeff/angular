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
exports.getBaseTypeIdentifiers = getBaseTypeIdentifiers;
exports.findParentClassDeclaration = findParentClassDeclaration;
exports.findClassDeclaration = findClassDeclaration;
exports.hasExplicitConstructor = hasExplicitConstructor;
const typescript_1 = __importDefault(require("typescript"));
/** Determines the base type identifiers of a specified class declaration. */
function getBaseTypeIdentifiers(node) {
    if (!node.heritageClauses) {
        return null;
    }
    return node.heritageClauses
        .filter((clause) => clause.token === typescript_1.default.SyntaxKind.ExtendsKeyword)
        .reduce((types, clause) => types.concat(clause.types), [])
        .map((typeExpression) => typeExpression.expression)
        .filter(typescript_1.default.isIdentifier);
}
/** Gets the first found parent class declaration of a given node. */
function findParentClassDeclaration(node) {
    while (!typescript_1.default.isClassDeclaration(node)) {
        if (typescript_1.default.isSourceFile(node)) {
            return null;
        }
        node = node.parent;
    }
    return node;
}
/**
 * Finds the class declaration that is being referred to by a node.
 * @param reference Node referring to a class declaration.
 * @param typeChecker
 */
function findClassDeclaration(reference, typeChecker) {
    var _a, _b;
    return (((_b = (_a = typeChecker
        .getTypeAtLocation(reference)
        .getSymbol()) === null || _a === void 0 ? void 0 : _a.declarations) === null || _b === void 0 ? void 0 : _b.find(typescript_1.default.isClassDeclaration)) || null);
}
/** Checks whether the given class declaration has an explicit constructor or not. */
function hasExplicitConstructor(node) {
    return node.members.some(typescript_1.default.isConstructorDeclaration);
}
