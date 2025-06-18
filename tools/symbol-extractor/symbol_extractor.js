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
exports.SymbolExtractor = void 0;
/// <reference types="jasmine" />
const typescript_1 = __importDefault(require("typescript"));
class SymbolExtractor {
    static parse(path, contents) {
        const symbols = [];
        const source = typescript_1.default.createSourceFile(path, contents, typescript_1.default.ScriptTarget.Latest, true);
        let fnRecurseDepth = 0;
        function visitor(child) {
            // Left for easier debugging.
            // console.log('>>>', ts.SyntaxKind[child.kind]);
            switch (child.kind) {
                case typescript_1.default.SyntaxKind.ArrowFunction:
                case typescript_1.default.SyntaxKind.FunctionExpression:
                    fnRecurseDepth++;
                    // Handles IIFE function/arrow expressions.
                    if (fnRecurseDepth <= 1) {
                        typescript_1.default.forEachChild(child, visitor);
                    }
                    fnRecurseDepth--;
                    break;
                case typescript_1.default.SyntaxKind.SourceFile:
                case typescript_1.default.SyntaxKind.VariableStatement:
                case typescript_1.default.SyntaxKind.VariableDeclarationList:
                case typescript_1.default.SyntaxKind.ExpressionStatement:
                case typescript_1.default.SyntaxKind.CallExpression:
                case typescript_1.default.SyntaxKind.ParenthesizedExpression:
                case typescript_1.default.SyntaxKind.Block:
                case typescript_1.default.SyntaxKind.PrefixUnaryExpression:
                    typescript_1.default.forEachChild(child, visitor);
                    break;
                case typescript_1.default.SyntaxKind.VariableDeclaration:
                    const varDecl = child;
                    // Terser optimizes variable declarations with `undefined` as initializer
                    // by omitting the initializer completely. We capture such declarations as well.
                    // https://github.com/terser/terser/blob/86ea74d5c12ae51b64468/CHANGELOG.md#v540.
                    if (fnRecurseDepth !== 0) {
                        if (!isEsmInitFunction(varDecl)) {
                            symbols.push(stripSuffix(varDecl.name.getText()));
                        }
                    }
                    break;
                case typescript_1.default.SyntaxKind.FunctionDeclaration:
                    const funcDecl = child;
                    funcDecl.name && symbols.push(stripSuffix(funcDecl.name.getText()));
                    break;
                case typescript_1.default.SyntaxKind.ClassDeclaration:
                    const classDecl = child;
                    classDecl.name && symbols.push(stripSuffix(classDecl.name.getText()));
                    break;
                default:
                // Left for easier debugging.
                // console.log('###', ts.SyntaxKind[child.kind], child.getText());
            }
        }
        visitor(source);
        symbols.sort();
        return symbols;
    }
    static diff(actual, expected) {
        if (typeof expected == 'string') {
            expected = JSON.parse(expected);
        }
        const diff = {};
        // All symbols in the golden file start out with a count corresponding to the number of symbols
        // with that name. Once they are matched with symbols in the actual output, the count should
        // even out to 0.
        expected.forEach((symbolName) => {
            diff[symbolName] = (diff[symbolName] || 0) + 1;
        });
        actual.forEach((s) => {
            if (diff[s] === 1) {
                delete diff[s];
            }
            else {
                diff[s] = (diff[s] || 0) - 1;
            }
        });
        return diff;
    }
    constructor(path, contents) {
        this.path = path;
        this.contents = contents;
        this.actual = SymbolExtractor.parse(path, contents);
    }
    expect(expectedSymbols) {
        expect(SymbolExtractor.diff(this.actual, expectedSymbols)).toEqual({});
    }
    compareAndPrintError(expected) {
        let passed = true;
        const diff = SymbolExtractor.diff(this.actual, expected);
        Object.keys(diff).forEach((key) => {
            if (passed) {
                console.error(`Expected symbols in '${this.path}' did not match gold file.`);
                passed = false;
            }
            const missingOrExtra = diff[key] > 0 ? 'extra' : 'missing';
            const count = Math.abs(diff[key]);
            console.error(`   Symbol: ${key} => ${count} ${missingOrExtra} in golden file.`);
        });
        return passed;
    }
}
exports.SymbolExtractor = SymbolExtractor;
function stripSuffix(text) {
    const index = text.lastIndexOf('$');
    return index > -1 ? text.substring(0, index) : text;
}
/**
 * This function detects a specific pattern that represents ESM modules
 * in the generated code. Those symbols are not really needed for the purposes
 * of symbol checking, since they only represent a module graph and all
 * nested symbols are being captured by the logic already. The pattern that
 * this function detects looks like this:
 * ```
 * var init_testability = __esm({
 *   "packages/core/src/testability/testability.mjs"() {
 *     // ...
 *   }
 * });
 * ```
 */
function isEsmInitFunction(varDecl) {
    return (varDecl.name.getText().startsWith('init_') &&
        varDecl.initializer &&
        typescript_1.default.isCallExpression(varDecl.initializer) &&
        varDecl.initializer.expression.escapedText === '___esm');
}
