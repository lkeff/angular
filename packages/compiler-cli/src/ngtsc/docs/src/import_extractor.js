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
exports.getImportedSymbols = getImportedSymbols;
const typescript_1 = __importDefault(require("typescript"));
/**
 * For a given SourceFile, it extracts all imported symbols from other Angular packages.
 *
 * @returns a map Symbol => Package, eg: ApplicationRef => @angular/core
 */
function getImportedSymbols(sourceFile) {
    const importSpecifiers = new Map();
    function visit(node) {
        var _a;
        if (typescript_1.default.isImportDeclaration(node)) {
            let moduleSpecifier = node.moduleSpecifier.getText(sourceFile).replace(/['"]/g, '');
            if (moduleSpecifier.startsWith('@angular/')) {
                const namedBindings = (_a = node.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings;
                if (namedBindings && typescript_1.default.isNamedImports(namedBindings)) {
                    namedBindings.elements.forEach((importSpecifier) => {
                        const importName = importSpecifier.name.text;
                        const importAlias = importSpecifier.propertyName
                            ? importSpecifier.propertyName.text
                            : undefined;
                        importSpecifiers.set(importAlias !== null && importAlias !== void 0 ? importAlias : importName, moduleSpecifier);
                    });
                }
            }
        }
        typescript_1.default.forEachChild(node, visit);
    }
    visit(sourceFile);
    return importSpecifiers;
}
