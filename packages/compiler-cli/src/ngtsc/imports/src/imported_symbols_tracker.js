"use strict";
/*!
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
exports.ImportedSymbolsTracker = void 0;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Tracks which symbols are imported in specific files and under what names. Allows for efficient
 * querying for references to those symbols without having to consult the type checker early in the
 * process.
 *
 * Note that the tracker doesn't account for variable shadowing so a final verification with the
 * type checker may be necessary, depending on the context. Also does not track dynamic imports.
 */
class ImportedSymbolsTracker {
    constructor() {
        this.fileToNamedImports = new WeakMap();
        this.fileToNamespaceImports = new WeakMap();
    }
    /**
     * Checks if an identifier is a potential reference to a specific named import within the same
     * file.
     * @param node Identifier to be checked.
     * @param exportedName Name of the exported symbol that is being searched for.
     * @param moduleName Module from which the symbol should be imported.
     */
    isPotentialReferenceToNamedImport(node, exportedName, moduleName) {
        const sourceFile = node.getSourceFile();
        this.scanImports(sourceFile);
        const fileImports = this.fileToNamedImports.get(sourceFile);
        const moduleImports = fileImports.get(moduleName);
        const symbolImports = moduleImports === null || moduleImports === void 0 ? void 0 : moduleImports.get(exportedName);
        return symbolImports !== undefined && symbolImports.has(node.text);
    }
    /**
     * Checks if an identifier is a potential reference to a specific namespace import within the same
     * file.
     * @param node Identifier to be checked.
     * @param moduleName Module from which the namespace is imported.
     */
    isPotentialReferenceToNamespaceImport(node, moduleName) {
        var _a, _b;
        const sourceFile = node.getSourceFile();
        this.scanImports(sourceFile);
        const namespaces = this.fileToNamespaceImports.get(sourceFile);
        return (_b = (_a = namespaces.get(moduleName)) === null || _a === void 0 ? void 0 : _a.has(node.text)) !== null && _b !== void 0 ? _b : false;
    }
    /**
     * Checks if a file has a named imported of a certain symbol.
     * @param sourceFile File to be checked.
     * @param exportedName Name of the exported symbol that is being checked.
     * @param moduleName Module that exports the symbol.
     */
    hasNamedImport(sourceFile, exportedName, moduleName) {
        this.scanImports(sourceFile);
        const fileImports = this.fileToNamedImports.get(sourceFile);
        const moduleImports = fileImports.get(moduleName);
        return moduleImports !== undefined && moduleImports.has(exportedName);
    }
    /**
     * Checks if a file has namespace imports of a certain symbol.
     * @param sourceFile File to be checked.
     * @param moduleName Module whose namespace import is being searched for.
     */
    hasNamespaceImport(sourceFile, moduleName) {
        this.scanImports(sourceFile);
        const namespaces = this.fileToNamespaceImports.get(sourceFile);
        return namespaces.has(moduleName);
    }
    /** Scans a `SourceFile` for import statements and caches them for later use. */
    scanImports(sourceFile) {
        var _a, _b;
        if (this.fileToNamedImports.has(sourceFile) && this.fileToNamespaceImports.has(sourceFile)) {
            return;
        }
        const namedImports = new Map();
        const namespaceImports = new Map();
        this.fileToNamedImports.set(sourceFile, namedImports);
        this.fileToNamespaceImports.set(sourceFile, namespaceImports);
        // Only check top-level imports.
        for (const stmt of sourceFile.statements) {
            if (!typescript_1.default.isImportDeclaration(stmt) ||
                !typescript_1.default.isStringLiteralLike(stmt.moduleSpecifier) ||
                ((_a = stmt.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings) === undefined) {
                continue;
            }
            const moduleName = stmt.moduleSpecifier.text;
            if (typescript_1.default.isNamespaceImport(stmt.importClause.namedBindings)) {
                // import * as foo from 'module'
                if (!namespaceImports.has(moduleName)) {
                    namespaceImports.set(moduleName, new Set());
                }
                namespaceImports.get(moduleName).add(stmt.importClause.namedBindings.name.text);
            }
            else {
                // import {foo, bar as alias} from 'module'
                for (const element of stmt.importClause.namedBindings.elements) {
                    const localName = element.name.text;
                    const exportedName = element.propertyName === undefined ? localName : element.propertyName.text;
                    if (!namedImports.has(moduleName)) {
                        namedImports.set(moduleName, new Map());
                    }
                    const localNames = namedImports.get(moduleName);
                    if (!localNames.has(exportedName)) {
                        localNames.set(exportedName, new Set());
                    }
                    (_b = localNames.get(exportedName)) === null || _b === void 0 ? void 0 : _b.add(localName);
                }
            }
        }
    }
}
exports.ImportedSymbolsTracker = ImportedSymbolsTracker;
