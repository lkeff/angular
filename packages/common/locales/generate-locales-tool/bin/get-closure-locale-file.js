"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const cldr_data_1 = require("../cldr-data");
const closure_locale_file_1 = require("../closure-locale-file");
const locale_base_currencies_1 = require("../locale-base-currencies");
const base_locale_1 = require("./base-locale");
/** Generates the Google3 closure-locale file and prints it to the stdout. */
function main() {
    const cldrData = new cldr_data_1.CldrData();
    const baseLocaleData = cldrData.getLocaleData(base_locale_1.BASE_LOCALE);
    const baseCurrencies = (0, locale_base_currencies_1.generateBaseCurrencies)(baseLocaleData);
    process.stdout.write((0, closure_locale_file_1.generateClosureLocaleFile)(cldrData, baseCurrencies));
}
main();
