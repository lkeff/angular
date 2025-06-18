"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSymbols = setSymbols;
exports.getModuleName = getModuleName;
exports.setCurrentSymbol = setCurrentSymbol;
exports.getCurrentSymbol = getCurrentSymbol;
exports.unknownSymbolMessage = unknownSymbolMessage;
/**
 * API pages are generated each package at a time.
 * This allows to use a global context to store the symbols and their corresponding module names.
 */
let symbols = new Map();
// This is used to store the currently processed symbol (usually a class or an interface)
let currentSymbol;
function setSymbols(newSymbols) {
    symbols = newSymbols;
}
/**
 * Returns the module name of a symbol.
 * eg: 'ApplicationRef' => 'core', 'FormControl' => 'forms'
 * Also supports class.member, 'NgZone.runOutsideAngular => 'core'
 */
function getModuleName(symbol) {
    const moduleName = symbols.get(symbol);
    return moduleName === null || moduleName === void 0 ? void 0 : moduleName.replace('@angular/', '');
}
function setCurrentSymbol(symbol) {
    currentSymbol = symbol;
}
function getCurrentSymbol() {
    return currentSymbol;
}
function unknownSymbolMessage(link, symbol) {
    return `WARNING: {@link ${link}} is invalid, ${symbol} or ${currentSymbol}.${symbol} is unknown in this context`;
}
