"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const cldr_data_1 = require("../cldr-data");
const locale_base_currencies_1 = require("../locale-base-currencies");
const locale_extra_file_1 = require("../locale-extra-file");
const locale_file_1 = require("../locale-file");
const locale_global_file_1 = require("../locale-global-file");
const base_locale_1 = require("./base-locale");
/**
 * Generates locale files for each available CLDR locale and writes it to the
 * specified directory.
 */
function main(outputDir) {
    return __awaiter(this, void 0, void 0, function* () {
        if (outputDir === undefined) {
            throw Error('No output directory specified.');
        }
        const cldrData = new cldr_data_1.CldrData();
        const baseLocaleData = cldrData.getLocaleData(base_locale_1.BASE_LOCALE);
        const baseCurrencies = (0, locale_base_currencies_1.generateBaseCurrencies)(baseLocaleData);
        const extraLocaleDir = (0, path_1.join)(outputDir, 'extra');
        const globalLocaleDir = (0, path_1.join)(outputDir, 'global');
        // Generate locale files for all locales we have data for.
        yield Promise.all(cldrData.availableLocales.flatMap((localeData) => __awaiter(this, void 0, void 0, function* () {
            const locale = localeData.locale;
            const localeFile = (0, locale_file_1.generateLocale)(locale, localeData, baseCurrencies);
            const localeExtraFile = (0, locale_extra_file_1.generateLocaleExtra)(locale, localeData);
            const localeGlobalFile = (0, locale_global_file_1.generateLocaleGlobalFile)(locale, localeData, baseCurrencies);
            return [
                fs_1.default.promises.writeFile((0, path_1.join)(outputDir, `${locale}.ts`), localeFile),
                fs_1.default.promises.writeFile((0, path_1.join)(extraLocaleDir, `${locale}.ts`), localeExtraFile),
                fs_1.default.promises.writeFile((0, path_1.join)(globalLocaleDir, `${locale}.js`), localeGlobalFile),
            ];
        })));
    });
}
main(process.argv[2]).catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
