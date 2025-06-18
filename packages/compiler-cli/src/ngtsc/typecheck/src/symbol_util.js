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
exports.isSignalReference = isSignalReference;
const typescript_1 = __importDefault(require("typescript"));
const api_1 = require("../api");
/** Names of known signal functions. */
const SIGNAL_FNS = new Set([
    'WritableSignal',
    'Signal',
    'InputSignal',
    'InputSignalWithTransform',
    'ModelSignal',
]);
/** Returns whether a symbol is a reference to a signal. */
function isSignalReference(symbol) {
    return ((symbol.kind === api_1.SymbolKind.Expression ||
        symbol.kind === api_1.SymbolKind.Variable ||
        symbol.kind === api_1.SymbolKind.LetDeclaration) &&
        // Note that `tsType.symbol` isn't optional in the typings,
        // but it appears that it can be undefined at runtime.
        ((symbol.tsType.symbol !== undefined && isSignalSymbol(symbol.tsType.symbol)) ||
            (symbol.tsType.aliasSymbol !== undefined && isSignalSymbol(symbol.tsType.aliasSymbol))));
}
/** Checks whether a symbol points to a signal. */
function isSignalSymbol(symbol) {
    const declarations = symbol.getDeclarations();
    return (declarations !== undefined &&
        declarations.some((decl) => {
            const fileName = decl.getSourceFile().fileName;
            return ((typescript_1.default.isInterfaceDeclaration(decl) || typescript_1.default.isTypeAliasDeclaration(decl)) &&
                SIGNAL_FNS.has(decl.name.text) &&
                (fileName.includes('@angular/core') ||
                    fileName.includes('angular2/rc/packages/core') ||
                    fileName.includes('bin/packages/core')) // for local usage in some tests
            );
        }));
}
