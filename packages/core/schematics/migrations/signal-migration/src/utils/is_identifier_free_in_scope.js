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
exports.ReservedMarker = void 0;
exports.isIdentifierFreeInScope = isIdentifierFreeInScope;
const assert_1 = __importDefault(require("assert"));
const typescript_1 = __importDefault(require("typescript"));
const is_descendant_of_1 = require("./is_descendant_of");
/** Symbol that can be used to mark a variable as reserved, synthetically. */
exports.ReservedMarker = Symbol();
/**
 * Gets whether the given identifier name is free for use in the
 * given location, avoiding shadowed variable names.
 *
 */
function isIdentifierFreeInScope(name, location) {
    const startContainer = findClosestParentLocalsContainer(location);
    (0, assert_1.default)(startContainer !== undefined, 'Expecting a locals container.');
    // Traverse up and check for potential collisions.
    let container = startContainer;
    let firstNextContainer = undefined;
    while (container !== undefined) {
        if (!isIdentifierFreeInContainer(name, container)) {
            return null;
        }
        if (firstNextContainer === undefined && container.nextContainer !== undefined) {
            firstNextContainer = container.nextContainer;
        }
        container = findClosestParentLocalsContainer(container.parent);
    }
    // Check descendent local containers to avoid shadowing variables.
    // Note that this is not strictly needed, but it's helping avoid
    // some lint errors, like TSLint's no shadowed variables.
    container = firstNextContainer;
    while (container && (0, is_descendant_of_1.isNodeDescendantOf)(container, startContainer)) {
        if (!isIdentifierFreeInContainer(name, container)) {
            return null;
        }
        container = container.nextContainer;
    }
    return { container: startContainer };
}
/** Finds the closest parent locals container. */
function findClosestParentLocalsContainer(node) {
    return typescript_1.default.findAncestor(node, isLocalsContainer);
}
/** Whether the given identifier is free in the given locals container. */
function isIdentifierFreeInContainer(name, container) {
    if (container.locals === undefined || !container.locals.has(name)) {
        return true;
    }
    // We consider alias symbols as locals conservatively.
    // Note: This check is similar to the check by the TypeScript emitter.
    // typescript/stable/src/compiler/emitter.ts;l=5436;rcl=651008033
    const local = container.locals.get(name);
    return (local !== exports.ReservedMarker &&
        !(local.flags & (typescript_1.default.SymbolFlags.Value | typescript_1.default.SymbolFlags.ExportValue | typescript_1.default.SymbolFlags.Alias)));
}
/**
 * Whether the given node can contain local variables.
 *
 * Note: This is similar to TypeScript's `canHaveLocals` internal helper.
 * typescript/stable/src/compiler/utilitiesPublic.ts;l=2265;rcl=651008033
 */
function isLocalsContainer(node) {
    switch (node.kind) {
        case typescript_1.default.SyntaxKind.ArrowFunction:
        case typescript_1.default.SyntaxKind.Block:
        case typescript_1.default.SyntaxKind.CallSignature:
        case typescript_1.default.SyntaxKind.CaseBlock:
        case typescript_1.default.SyntaxKind.CatchClause:
        case typescript_1.default.SyntaxKind.ClassStaticBlockDeclaration:
        case typescript_1.default.SyntaxKind.ConditionalType:
        case typescript_1.default.SyntaxKind.Constructor:
        case typescript_1.default.SyntaxKind.ConstructorType:
        case typescript_1.default.SyntaxKind.ConstructSignature:
        case typescript_1.default.SyntaxKind.ForStatement:
        case typescript_1.default.SyntaxKind.ForInStatement:
        case typescript_1.default.SyntaxKind.ForOfStatement:
        case typescript_1.default.SyntaxKind.FunctionDeclaration:
        case typescript_1.default.SyntaxKind.FunctionExpression:
        case typescript_1.default.SyntaxKind.FunctionType:
        case typescript_1.default.SyntaxKind.GetAccessor:
        case typescript_1.default.SyntaxKind.IndexSignature:
        case typescript_1.default.SyntaxKind.JSDocCallbackTag:
        case typescript_1.default.SyntaxKind.JSDocEnumTag:
        case typescript_1.default.SyntaxKind.JSDocFunctionType:
        case typescript_1.default.SyntaxKind.JSDocSignature:
        case typescript_1.default.SyntaxKind.JSDocTypedefTag:
        case typescript_1.default.SyntaxKind.MappedType:
        case typescript_1.default.SyntaxKind.MethodDeclaration:
        case typescript_1.default.SyntaxKind.MethodSignature:
        case typescript_1.default.SyntaxKind.ModuleDeclaration:
        case typescript_1.default.SyntaxKind.SetAccessor:
        case typescript_1.default.SyntaxKind.SourceFile:
        case typescript_1.default.SyntaxKind.TypeAliasDeclaration:
            return true;
        default:
            return false;
    }
}
