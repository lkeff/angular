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
exports.aliasTransformFactory = aliasTransformFactory;
const typescript_1 = __importDefault(require("typescript"));
function aliasTransformFactory(exportStatements) {
    return () => {
        return (file) => {
            if (typescript_1.default.isBundle(file) || !exportStatements.has(file.fileName)) {
                return file;
            }
            const statements = [...file.statements];
            exportStatements.get(file.fileName).forEach(([moduleName, symbolName], aliasName) => {
                const stmt = typescript_1.default.factory.createExportDeclaration(
                /* modifiers */ undefined, 
                /* isTypeOnly */ false, 
                /* exportClause */ typescript_1.default.factory.createNamedExports([
                    typescript_1.default.factory.createExportSpecifier(false, symbolName, aliasName),
                ]), 
                /* moduleSpecifier */ typescript_1.default.factory.createStringLiteral(moduleName));
                statements.push(stmt);
            });
            return typescript_1.default.factory.updateSourceFile(file, statements);
        };
    };
}
