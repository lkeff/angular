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
exports.Rule = void 0;
const tslint_1 = require("tslint");
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../utils/typescript/imports");
const nodes_1 = require("../../utils/typescript/nodes");
const symbol_1 = require("../../utils/typescript/symbol");
// This rule is also used inside of Google by Typescript linting.
/** Name of the deprecated function that we're removing. */
const deprecatedFunction = 'async';
/** Name of the function that will replace the deprecated one. */
const newFunction = 'waitForAsync';
/** TSLint rule that migrates from `async` to `waitForAsync`. */
class Rule extends tslint_1.Rules.TypedRule {
    applyWithProgram(sourceFile, program) {
        const failures = [];
        const asyncImportSpecifier = (0, imports_1.getImportSpecifier)(sourceFile, '@angular/core/testing', deprecatedFunction);
        const asyncImport = asyncImportSpecifier
            ? (0, nodes_1.closestNode)(asyncImportSpecifier, typescript_1.default.isNamedImports)
            : null;
        // If there are no imports of `async`, we can exit early.
        if (asyncImportSpecifier && asyncImport) {
            const typeChecker = program.getTypeChecker();
            const printer = typescript_1.default.createPrinter();
            failures.push(this._getNamedImportsFailure(asyncImport, sourceFile, printer));
            this.findAsyncReferences(sourceFile, typeChecker, asyncImportSpecifier).forEach((node) => failures.push(this._getIdentifierNodeFailure(node, sourceFile)));
        }
        return failures;
    }
    /** Gets a failure for an import of the `async` function. */
    _getNamedImportsFailure(node, sourceFile, printer) {
        const replacementText = printer.printNode(typescript_1.default.EmitHint.Unspecified, (0, imports_1.replaceImport)(node, deprecatedFunction, newFunction), sourceFile);
        return new tslint_1.RuleFailure(sourceFile, node.getStart(), node.getEnd(), `Imports of the deprecated ${deprecatedFunction} function are not allowed. Use ${newFunction} instead.`, this.ruleName, new tslint_1.Replacement(node.getStart(), node.getWidth(), replacementText));
    }
    /** Gets a failure for an identifier node. */
    _getIdentifierNodeFailure(node, sourceFile) {
        return new tslint_1.RuleFailure(sourceFile, node.getStart(), node.getEnd(), `References to the deprecated ${deprecatedFunction} function are not allowed. Use ${newFunction} instead.`, this.ruleName, new tslint_1.Replacement(node.getStart(), node.getWidth(), newFunction));
    }
    /** Finds calls to the `async` function. */
    findAsyncReferences(sourceFile, typeChecker, asyncImportSpecifier) {
        const results = new Set();
        typescript_1.default.forEachChild(sourceFile, function visitNode(node) {
            if (typescript_1.default.isCallExpression(node) &&
                typescript_1.default.isIdentifier(node.expression) &&
                node.expression.text === deprecatedFunction &&
                (0, symbol_1.isReferenceToImport)(typeChecker, node.expression, asyncImportSpecifier)) {
                results.add(node.expression);
            }
            typescript_1.default.forEachChild(node, visitNode);
        });
        return results;
    }
}
exports.Rule = Rule;
