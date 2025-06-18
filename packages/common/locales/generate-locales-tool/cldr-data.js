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
exports.CldrData = void 0;
const runfiles_1 = require("@bazel/runfiles");
const cldrjs_1 = __importDefault(require("cldrjs"));
const fs_1 = __importDefault(require("fs"));
const tinyglobby_1 = require("tinyglobby");
/**
 * Globs that match CLDR JSON data files that should be fetched. We limit these intentionally
 * as loading unused data results in significant slow-down of the generation
 * (noticeable in local development if locale data is re-generated).
 */
const CLDR_DATA_GLOBS = [
    'cldr-core/scriptMetadata.json',
    'cldr-core/supplemental/*.json',
    'cldr-dates-full/main/**/*.json',
    'cldr-numbers-full/main/**/*.json',
];
/** Path to the CLDR available locales file. */
const CLDR_AVAILABLE_LOCALES_PATH = 'cldr-core/availableLocales.json';
/** Path to the CLDR locale aliases file. */
const CLDR_LOCALE_ALIASES_PATH = 'cldr-core/supplemental/aliases.json';
/**
 * Class that provides access to the CLDR JSON data downloaded as part of
 * the `@cldr_json_data` Bazel repository.
 */
class CldrData {
    constructor() {
        /** Path to the CLDR JSON data Bazel repository. i.e. `@cldr_json_data//`. */
        this.cldrDataDir = runfiles_1.runfiles.resolve('cldr_json_data');
        this._loadAndPopulateCldrData();
        this.availableLocales = this._getAvailableLocales();
    }
    /** Gets the CLDR data for the specified locale. */
    getLocaleData(localeName) {
        // Cast to `CldrLocaleData` because the default `cldrjs` types from `DefinitelyTyped`
        // are outdated and do not capture the `bundle` attribute. See:
        // https://github.com/rxaviers/cldrjs#instantiate-a-locale-and-get-it-normalized.
        const localeData = new cldrjs_1.default(localeName);
        // In case a locale has been requested for which no data is available, we return
        // `null` immediately instead of returning an empty `CldrStatic` instance.
        if (localeData.attributes.bundle === null) {
            return null;
        }
        return localeData;
    }
    /**
     * Gets the CLDR language aliases.
     * http://cldr.unicode.org/index/cldr-spec/language-tag-equivalences.
     */
    getLanguageAliases() {
        return this._loadJsonOrThrow(`${this.cldrDataDir}/${CLDR_LOCALE_ALIASES_PATH}`).supplemental
            .metadata.alias.languageAlias;
    }
    /** Gets a list of all locales CLDR provides data for. */
    _getAvailableLocales() {
        const allLocales = this._loadJsonOrThrow(`${this.cldrDataDir}/${CLDR_AVAILABLE_LOCALES_PATH}`)
            .availableLocales.full;
        const localesWithData = [];
        for (const localeName of allLocales) {
            const localeData = this.getLocaleData(localeName);
            if (localeData === null) {
                throw new Error(`Missing locale data for the "${localeName}" locale.`);
            }
            localesWithData.push(localeData);
        }
        return localesWithData;
    }
    /** Loads the CLDR data and populates the `cldrjs` library with it. */
    _loadAndPopulateCldrData() {
        const localeData = this._readCldrDataFromRepository();
        if (localeData.length === 0) {
            throw Error('No CLDR data could be found.');
        }
        // Populate the `cldrjs` library with the locale data. Note that we need this type cast
        // to satisfy the first `cldrjs.load` parameter which cannot be undefined.
        cldrjs_1.default.load(...localeData);
    }
    /**
     * Reads the CLDR JSON data from the Bazel repository.
     * @returns a list of read JSON objects representing the CLDR data.
     */
    _readCldrDataFromRepository() {
        const jsonFiles = (0, tinyglobby_1.globSync)(CLDR_DATA_GLOBS, { cwd: this.cldrDataDir, absolute: true });
        // Read the JSON for all determined CLDR json files.
        return jsonFiles.map((filePath) => {
            const parsed = this._loadJsonOrThrow(filePath);
            // Guards against cases where non-CLDR data files are accidentally picked up
            // by the glob above and would throw-off the bundle lookup in `cldrjs`.
            if (parsed.main !== undefined && typeof parsed.main !== 'object') {
                throw Error('Unexpected CLDR json file with "main" field which is not an object.');
            }
            return parsed;
        });
    }
    _loadJsonOrThrow(filePath) {
        return JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
    }
}
exports.CldrData = CldrData;
