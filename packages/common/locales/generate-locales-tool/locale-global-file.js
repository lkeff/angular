"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLocaleGlobalFile = generateLocaleGlobalFile;
const file_header_1 = require("./file-header");
const locale_extra_file_1 = require("./locale-extra-file");
const locale_file_1 = require("./locale-file");
const plural_function_1 = require("./plural-function");
/**
 * Generated the contents for the global locale file
 */
function generateLocaleGlobalFile(locale, localeData, baseCurrencies) {
    const basicLocaleData = (0, locale_file_1.generateBasicLocaleString)(locale, localeData, baseCurrencies);
    const extraLocaleData = (0, locale_extra_file_1.generateLocaleExtraDataArrayCode)(locale, localeData);
    const data = basicLocaleData.replace(/\]$/, `, ${extraLocaleData}]`);
    return `${file_header_1.fileHeader}
  (function(global) {
    global.ng ??= {};
    global.ng.common ??= {};
    global.ng.common.locales ??= {};
    const u = undefined;
    ${(0, plural_function_1.getPluralFunction)(localeData, false)}
    global.ng.common.locales['${normalizeLocale(locale)}'] = ${data};
  })(globalThis);
    `;
}
/**
 * In Angular the locale is referenced by a "normalized" form.
 */
function normalizeLocale(locale) {
    return locale.toLowerCase().replace(/_/g, '-');
}
