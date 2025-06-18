"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.USD_CURRENCY_CODE = exports.DEFAULT_LOCALE_ID = void 0;
exports.getPluralCase = getPluralCase;
const locale_data_api_1 = require("./locale_data_api");
const pluralMapping = ['zero', 'one', 'two', 'few', 'many'];
/**
 * Returns the plural case based on the locale
 */
function getPluralCase(value, locale) {
    const plural = (0, locale_data_api_1.getLocalePluralCase)(locale)(parseInt(value, 10));
    const result = pluralMapping[plural];
    return result !== undefined ? result : 'other';
}
/**
 * The locale id that the application is using by default (for translations and ICU expressions).
 */
exports.DEFAULT_LOCALE_ID = 'en-US';
/**
 * USD currency code that the application uses by default for CurrencyPipe when no
 * DEFAULT_CURRENCY_CODE is provided.
 */
exports.USD_CURRENCY_CODE = 'USD';
