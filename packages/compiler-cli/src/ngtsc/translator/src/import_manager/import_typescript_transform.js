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
exports.createTsTransformForImportManager = createTsTransformForImportManager;
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../../imports");
/**
 * Creates a TypeScript transform for the given import manager.
 *
 *  - The transform updates existing imports with new symbols to be added.
 *  - The transform adds new necessary imports.
 *  - The transform inserts additional optional statements after imports.
 *  - The transform deletes any nodes that are marked for deletion by the manager.
 */
function createTsTransformForImportManager(manager, extraStatementsForFiles) {
    return (ctx) => {
        const { affectedFiles, newImports, updatedImports, reusedOriginalAliasDeclarations, deletedImports, } = manager.finalize();
        // If we re-used existing source file alias declarations, mark those as referenced so TypeScript
        // doesn't drop these thinking they are unused.
        if (reusedOriginalAliasDeclarations.size > 0) {
            const referencedAliasDeclarations = (0, imports_1.loadIsReferencedAliasDeclarationPatch)(ctx);
            if (referencedAliasDeclarations !== null) {
                reusedOriginalAliasDeclarations.forEach((aliasDecl) => referencedAliasDeclarations.add(aliasDecl));
            }
        }
        // Update the set of affected files to include files that need extra statements to be inserted.
        if (extraStatementsForFiles !== undefined) {
            for (const [fileName, statements] of extraStatementsForFiles.entries()) {
                if (statements.length > 0) {
                    affectedFiles.add(fileName);
                }
            }
        }
        const visitStatement = (node) => {
            if (!typescript_1.default.isImportDeclaration(node)) {
                return node;
            }
            if (deletedImports.has(node)) {
                return undefined;
            }
            if (node.importClause === undefined || !typescript_1.default.isImportClause(node.importClause)) {
                return node;
            }
            const clause = node.importClause;
            if (clause.namedBindings === undefined ||
                !typescript_1.default.isNamedImports(clause.namedBindings) ||
                !updatedImports.has(clause.namedBindings)) {
                return node;
            }
            const newClause = ctx.factory.updateImportClause(clause, clause.isTypeOnly, clause.name, updatedImports.get(clause.namedBindings));
            const newImport = ctx.factory.updateImportDeclaration(node, node.modifiers, newClause, node.moduleSpecifier, node.attributes);
            // This tricks TypeScript into thinking that the `importClause` is still optimizable.
            // By default, TS assumes, no specifiers are elide-able if the clause of the "original
            // node" has changed. google3:
            // typescript/unstable/src/compiler/transformers/ts.ts;l=456;rcl=611254538.
            typescript_1.default.setOriginalNode(newImport, {
                importClause: newClause,
                kind: newImport.kind,
            });
            return newImport;
        };
        return (sourceFile) => {
            var _a, _b;
            if (!affectedFiles.has(sourceFile.fileName)) {
                return sourceFile;
            }
            sourceFile = typescript_1.default.visitEachChild(sourceFile, visitStatement, ctx);
            // Filter out the existing imports and the source file body.
            // All new statements will be inserted between them.
            const extraStatements = (_a = extraStatementsForFiles === null || extraStatementsForFiles === void 0 ? void 0 : extraStatementsForFiles.get(sourceFile.fileName)) !== null && _a !== void 0 ? _a : [];
            const existingImports = [];
            const body = [];
            for (const statement of sourceFile.statements) {
                if (isImportStatement(statement)) {
                    existingImports.push(statement);
                }
                else {
                    body.push(statement);
                }
            }
            return ctx.factory.updateSourceFile(sourceFile, [
                ...existingImports,
                ...((_b = newImports.get(sourceFile.fileName)) !== null && _b !== void 0 ? _b : []),
                ...extraStatements,
                ...body,
            ], sourceFile.isDeclarationFile, sourceFile.referencedFiles, sourceFile.typeReferenceDirectives, sourceFile.hasNoDefaultLib, sourceFile.libReferenceDirectives);
        };
    };
}
/** Whether the given statement is an import statement. */
function isImportStatement(stmt) {
    return (typescript_1.default.isImportDeclaration(stmt) || typescript_1.default.isImportEqualsDeclaration(stmt) || typescript_1.default.isNamespaceImport(stmt));
}
