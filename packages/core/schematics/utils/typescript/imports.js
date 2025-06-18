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
exports.getImportOfIdentifier = getImportOfIdentifier;
exports.getImportSpecifier = getImportSpecifier;
exports.getImportSpecifiers = getImportSpecifiers;
exports.getNamedImports = getNamedImports;
exports.replaceImport = replaceImport;
exports.removeSymbolFromNamedImports = removeSymbolFromNamedImports;
exports.findImportSpecifier = findImportSpecifier;
const typescript_1 = __importDefault(require("typescript"));
/** Gets import information about the specified identifier by using the Type checker. */
function getImportOfIdentifier(typeChecker, node) {
    const symbol = typeChecker.getSymbolAtLocation(node);
    if (!symbol || symbol.declarations === undefined || !symbol.declarations.length) {
        return null;
    }
    const decl = symbol.declarations[0];
    if (!typescript_1.default.isImportSpecifier(decl)) {
        return null;
    }
    const importDecl = decl.parent.parent.parent;
    if (!typescript_1.default.isImportDeclaration(importDecl) || !typescript_1.default.isStringLiteral(importDecl.moduleSpecifier)) {
        return null;
    }
    return {
        // Handles aliased imports: e.g. "import {Component as myComp} from ...";
        name: decl.propertyName ? decl.propertyName.text : decl.name.text,
        importModule: importDecl.moduleSpecifier.text,
        node: importDecl,
    };
}
/**
 * Gets a top-level import specifier with a specific name that is imported from a particular module.
 * E.g. given a file that looks like:
 *
 * ```ts
 * import { Component, Directive } from '@angular/core';
 * import { Foo } from './foo';
 * ```
 *
 * Calling `getImportSpecifier(sourceFile, '@angular/core', 'Directive')` will yield the node
 * referring to `Directive` in the top import.
 *
 * @param sourceFile File in which to look for imports.
 * @param moduleName Name of the import's module.
 * @param specifierName Original name of the specifier to look for. Aliases will be resolved to
 *    their original name.
 */
function getImportSpecifier(sourceFile, moduleName, specifierName) {
    var _a;
    return (_a = getImportSpecifiers(sourceFile, moduleName, specifierName)[0]) !== null && _a !== void 0 ? _a : null;
}
function getImportSpecifiers(sourceFile, moduleName, specifierOrSpecifiers) {
    var _a;
    const matches = [];
    for (const node of sourceFile.statements) {
        if (!typescript_1.default.isImportDeclaration(node) || !typescript_1.default.isStringLiteral(node.moduleSpecifier)) {
            continue;
        }
        const namedBindings = (_a = node.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings;
        const isMatch = typeof moduleName === 'string'
            ? node.moduleSpecifier.text === moduleName
            : moduleName.test(node.moduleSpecifier.text);
        if (!isMatch || !namedBindings || !typescript_1.default.isNamedImports(namedBindings)) {
            continue;
        }
        if (typeof specifierOrSpecifiers === 'string') {
            const match = findImportSpecifier(namedBindings.elements, specifierOrSpecifiers);
            if (match) {
                matches.push(match);
            }
        }
        else {
            for (const specifierName of specifierOrSpecifiers) {
                const match = findImportSpecifier(namedBindings.elements, specifierName);
                if (match) {
                    matches.push(match);
                }
            }
        }
    }
    return matches;
}
function getNamedImports(sourceFile, moduleName) {
    var _a;
    for (const node of sourceFile.statements) {
        if (typescript_1.default.isImportDeclaration(node) && typescript_1.default.isStringLiteral(node.moduleSpecifier)) {
            const isMatch = typeof moduleName === 'string'
                ? node.moduleSpecifier.text === moduleName
                : moduleName.test(node.moduleSpecifier.text);
            const namedBindings = (_a = node.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings;
            if (isMatch && namedBindings && typescript_1.default.isNamedImports(namedBindings)) {
                return namedBindings;
            }
        }
    }
    return null;
}
/**
 * Replaces an import inside a named imports node with a different one.
 *
 * @param node Node that contains the imports.
 * @param existingImport Import that should be replaced.
 * @param newImportName Import that should be inserted.
 */
function replaceImport(node, existingImport, newImportName) {
    const isAlreadyImported = findImportSpecifier(node.elements, newImportName);
    if (isAlreadyImported) {
        return node;
    }
    const existingImportNode = findImportSpecifier(node.elements, existingImport);
    if (!existingImportNode) {
        return node;
    }
    const importPropertyName = existingImportNode.propertyName
        ? typescript_1.default.factory.createIdentifier(newImportName)
        : undefined;
    const importName = existingImportNode.propertyName
        ? existingImportNode.name
        : typescript_1.default.factory.createIdentifier(newImportName);
    return typescript_1.default.factory.updateNamedImports(node, [
        ...node.elements.filter((current) => current !== existingImportNode),
        // Create a new import while trying to preserve the alias of the old one.
        typescript_1.default.factory.createImportSpecifier(false, importPropertyName, importName),
    ]);
}
/**
 * Removes a symbol from the named imports and updates a node
 * that represents a given named imports.
 *
 * @param node Node that contains the imports.
 * @param symbol Symbol that should be removed.
 * @returns An updated node (ts.NamedImports).
 */
function removeSymbolFromNamedImports(node, symbol) {
    return typescript_1.default.factory.updateNamedImports(node, [
        ...node.elements.filter((current) => current !== symbol),
    ]);
}
/** Finds an import specifier with a particular name. */
function findImportSpecifier(nodes, specifierName) {
    return nodes.find((element) => {
        const { name, propertyName } = element;
        return propertyName ? propertyName.text === specifierName : name.text === specifierName;
    });
}
