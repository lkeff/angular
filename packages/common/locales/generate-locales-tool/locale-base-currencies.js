"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBaseCurrenciesFile = generateBaseCurrenciesFile;
exports.generateBaseCurrencies = generateBaseCurrencies;
const file_header_1 = require("./file-header");
const object_stringify_1 = require("./object-stringify");
/**
 * Generate a file that contains the list of currencies, their symbols and digits.
 */
function generateBaseCurrenciesFile(baseLocaleData) {
    const baseCurrencies = generateBaseCurrencies(baseLocaleData);
    return `${file_header_1.fileHeader}
export type CurrenciesSymbols = [string] | [string | undefined, string];

/** @internal */
export const CURRENCIES_EN: {[code: string]: CurrenciesSymbols | [string | undefined, string | undefined, number]} = ${(0, object_stringify_1.stringify)(baseCurrencies)};
`;
}
/**
 * Generate a list of currencies to be used as a base for other currencies
 * e.g.: {'ARS': [, '$'], 'AUD': ['A$', '$'], ...}
 */
function generateBaseCurrencies(localeData) {
    const currenciesData = localeData.main('numbers/currencies');
    const fractions = localeData.get(`supplemental/currencyData/fractions`);
    const currencies = {};
    Object.keys(currenciesData).forEach((key) => {
        const symbolsArray = [];
        const symbol = currenciesData[key].symbol;
        const symbolNarrow = currenciesData[key]['symbol-alt-narrow'];
        if (symbol && symbol !== key) {
            symbolsArray.push(symbol);
        }
        if (symbolNarrow && symbolNarrow !== symbol) {
            if (symbolsArray.length > 0) {
                symbolsArray.push(symbolNarrow);
            }
            else {
                symbolsArray.push(undefined, symbolNarrow);
            }
        }
        if (fractions[key] && fractions[key]['_digits']) {
            const digits = parseInt(fractions[key]['_digits'], 10);
            if (symbolsArray.length === 2) {
                symbolsArray.push(digits);
            }
            else if (symbolsArray.length === 1) {
                symbolsArray.push(undefined, digits);
            }
            else {
                symbolsArray.push(undefined, undefined, digits);
            }
        }
        if (symbolsArray.length > 0) {
            currencies[key] = symbolsArray;
        }
    });
    return currencies;
}
