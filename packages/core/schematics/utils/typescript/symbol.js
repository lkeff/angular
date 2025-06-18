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
exports.getValueSymbolOfDeclaration = getValueSymbolOfDeclaration;
exports.isReferenceToImport = isReferenceToImport;
exports.isNullableType = isNullableType;
exports.hasOneOfTypes = hasOneOfTypes;
const typescript_1 = __importDefault(require("typescript"));
function getValueSymbolOfDeclaration(node, typeChecker) {
    let symbol = typeChecker.getSymbolAtLocation(node);
    while (symbol && symbol.flags & typescript_1.default.SymbolFlags.Alias) {
        symbol = typeChecker.getAliasedSymbol(symbol);
    }
    return symbol;
}
/** Checks whether a node is referring to a specific import specifier. */
function isReferenceToImport(typeChecker, node, importSpecifier) {
    var _a, _b;
    // If this function is called on an identifier (should be most cases), we can quickly rule out
    // non-matches by comparing the identifier's string and the local name of the import specifier
    // which saves us some calls to the type checker.
    if (typescript_1.default.isIdentifier(node) && node.text !== importSpecifier.name.text) {
        return false;
    }
    const nodeSymbol = typeChecker.getTypeAtLocation(node).getSymbol();
    const importSymbol = typeChecker.getTypeAtLocation(importSpecifier).getSymbol();
    return (!!(((_a = nodeSymbol === null || nodeSymbol === void 0 ? void 0 : nodeSymbol.declarations) === null || _a === void 0 ? void 0 : _a[0]) && ((_b = importSymbol === null || importSymbol === void 0 ? void 0 : importSymbol.declarations) === null || _b === void 0 ? void 0 : _b[0])) &&
        nodeSymbol.declarations[0] === importSymbol.declarations[0]);
}
/** Checks whether a node's type is nullable (`null`, `undefined` or `void`). */
function isNullableType(typeChecker, node) {
    // Skip expressions in the form of `foo.bar!.baz` since the `TypeChecker` seems
    // to identify them as null, even though the user indicated that it won't be.
    if (node.parent && typescript_1.default.isNonNullExpression(node.parent)) {
        return false;
    }
    const type = typeChecker.getTypeAtLocation(node);
    const typeNode = typeChecker.typeToTypeNode(type, undefined, typescript_1.default.NodeBuilderFlags.None);
    let hasSeenNullableType = false;
    // Trace the type of the node back to a type node, walk
    // through all of its sub-nodes and look for nullable types.
    if (typeNode) {
        (function walk(current) {
            if (current.kind === typescript_1.default.SyntaxKind.NullKeyword ||
                current.kind === typescript_1.default.SyntaxKind.UndefinedKeyword ||
                current.kind === typescript_1.default.SyntaxKind.VoidKeyword) {
                hasSeenNullableType = true;
                // Note that we don't descend into type literals, because it may cause
                // us to mis-identify the root type as nullable, because it has a nullable
                // property (e.g. `{ foo: string | null }`).
            }
            else if (!hasSeenNullableType && !typescript_1.default.isTypeLiteralNode(current)) {
                current.forEachChild(walk);
            }
        })(typeNode);
    }
    return hasSeenNullableType;
}
/**
 * Walks through the types and sub-types of a node, looking for a
 * type that has the same name as one of the passed-in ones.
 */
function hasOneOfTypes(typeChecker, node, types) {
    const type = typeChecker.getTypeAtLocation(node);
    const typeNode = type
        ? typeChecker.typeToTypeNode(type, undefined, typescript_1.default.NodeBuilderFlags.None)
        : undefined;
    let hasMatch = false;
    if (typeNode) {
        (function walk(current) {
            if (typescript_1.default.isIdentifier(current) && types.includes(current.text)) {
                hasMatch = true;
            }
            else if (!hasMatch && !typescript_1.default.isTypeLiteralNode(current)) {
                current.forEachChild(walk);
            }
        })(typeNode);
    }
    return hasMatch;
}
