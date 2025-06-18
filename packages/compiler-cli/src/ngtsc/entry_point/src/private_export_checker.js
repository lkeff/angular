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
exports.checkForPrivateExports = checkForPrivateExports;
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../diagnostics");
/**
 * Produce `ts.Diagnostic`s for classes that are visible from exported types (e.g. directives
 * exposed by exported `NgModule`s) that are not themselves exported.
 *
 * This function reconciles two concepts:
 *
 * A class is Exported if it's exported from the main library `entryPoint` file.
 * A class is Visible if, via Angular semantics, a downstream consumer can import an Exported class
 * and be affected by the class in question. For example, an Exported NgModule may expose a
 * directive class to its consumers. Consumers that import the NgModule may have the directive
 * applied to elements in their templates. In this case, the directive is considered Visible.
 *
 * `checkForPrivateExports` attempts to verify that all Visible classes are Exported, and report
 * `ts.Diagnostic`s for those that aren't.
 *
 * @param entryPoint `ts.SourceFile` of the library's entrypoint, which should export the library's
 * public API.
 * @param checker `ts.TypeChecker` for the current program.
 * @param refGraph `ReferenceGraph` tracking the visibility of Angular types.
 * @returns an array of `ts.Diagnostic`s representing errors when visible classes are not exported
 * properly.
 */
function checkForPrivateExports(entryPoint, checker, refGraph) {
    const diagnostics = [];
    // Firstly, compute the exports of the entry point. These are all the Exported classes.
    const topLevelExports = new Set();
    // Do this via `ts.TypeChecker.getExportsOfModule`.
    const moduleSymbol = checker.getSymbolAtLocation(entryPoint);
    if (moduleSymbol === undefined) {
        throw new Error(`Internal error: failed to get symbol for entrypoint`);
    }
    const exportedSymbols = checker.getExportsOfModule(moduleSymbol);
    // Loop through the exported symbols, de-alias if needed, and add them to `topLevelExports`.
    // TODO(alxhub): use proper iteration when build.sh is removed. (#27762)
    exportedSymbols.forEach((symbol) => {
        if (symbol.flags & typescript_1.default.SymbolFlags.Alias) {
            symbol = checker.getAliasedSymbol(symbol);
        }
        const decl = symbol.valueDeclaration;
        if (decl !== undefined) {
            topLevelExports.add(decl);
        }
    });
    // Next, go through each exported class and expand it to the set of classes it makes Visible,
    // using the `ReferenceGraph`. For each Visible class, verify that it's also Exported, and queue
    // an error if it isn't. `checkedSet` ensures only one error is queued per class.
    const checkedSet = new Set();
    // Loop through each Exported class.
    // TODO(alxhub): use proper iteration when the legacy build is removed. (#27762)
    topLevelExports.forEach((mainExport) => {
        // Loop through each class made Visible by the Exported class.
        refGraph.transitiveReferencesOf(mainExport).forEach((transitiveReference) => {
            // Skip classes which have already been checked.
            if (checkedSet.has(transitiveReference)) {
                return;
            }
            checkedSet.add(transitiveReference);
            // Verify that the Visible class is also Exported.
            if (!topLevelExports.has(transitiveReference)) {
                // This is an error, `mainExport` makes `transitiveReference` Visible, but
                // `transitiveReference` is not Exported from the entrypoint. Construct a diagnostic to
                // give to the user explaining the situation.
                const descriptor = getDescriptorOfDeclaration(transitiveReference);
                const name = getNameOfDeclaration(transitiveReference);
                // Construct the path of visibility, from `mainExport` to `transitiveReference`.
                let visibleVia = 'NgModule exports';
                const transitivePath = refGraph.pathFrom(mainExport, transitiveReference);
                if (transitivePath !== null) {
                    visibleVia = transitivePath.map((seg) => getNameOfDeclaration(seg)).join(' -> ');
                }
                const diagnostic = Object.assign(Object.assign({ category: typescript_1.default.DiagnosticCategory.Error, code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.SYMBOL_NOT_EXPORTED), file: transitiveReference.getSourceFile() }, getPosOfDeclaration(transitiveReference)), { messageText: `Unsupported private ${descriptor} ${name}. This ${descriptor} is visible to consumers via ${visibleVia}, but is not exported from the top-level library entrypoint.` });
                diagnostics.push(diagnostic);
            }
        });
    });
    return diagnostics;
}
function getPosOfDeclaration(decl) {
    const node = getIdentifierOfDeclaration(decl) || decl;
    return {
        start: node.getStart(),
        length: node.getEnd() + 1 - node.getStart(),
    };
}
function getIdentifierOfDeclaration(decl) {
    if ((typescript_1.default.isClassDeclaration(decl) ||
        typescript_1.default.isVariableDeclaration(decl) ||
        typescript_1.default.isFunctionDeclaration(decl)) &&
        decl.name !== undefined &&
        typescript_1.default.isIdentifier(decl.name)) {
        return decl.name;
    }
    else {
        return null;
    }
}
function getNameOfDeclaration(decl) {
    const id = getIdentifierOfDeclaration(decl);
    return id !== null ? id.text : '(unnamed)';
}
function getDescriptorOfDeclaration(decl) {
    switch (decl.kind) {
        case typescript_1.default.SyntaxKind.ClassDeclaration:
            return 'class';
        case typescript_1.default.SyntaxKind.FunctionDeclaration:
            return 'function';
        case typescript_1.default.SyntaxKind.VariableDeclaration:
            return 'variable';
        case typescript_1.default.SyntaxKind.EnumDeclaration:
            return 'enum';
        default:
            return 'declaration';
    }
}
