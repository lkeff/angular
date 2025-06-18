"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleJsonTranslationParser = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const index_1 = require("../../../../../index");
const path_1 = require("path");
const diagnostics_1 = require("../../../diagnostics");
/**
 * A translation parser that can parse JSON that has the form:
 *
 * ```json
 * {
 *   "locale": "...",
 *   "translations": {
 *     "message-id": "Target message string",
 *     ...
 *   }
 * }
 * ```
 *
 * @see SimpleJsonTranslationSerializer
 * @publicApi used by CLI
 */
class SimpleJsonTranslationParser {
    analyze(filePath, contents) {
        const diagnostics = new diagnostics_1.Diagnostics();
        // For this to be parsable, the extension must be `.json` and the contents must include "locale"
        // and "translations" keys.
        if ((0, path_1.extname)(filePath) !== '.json' ||
            !(contents.includes('"locale"') && contents.includes('"translations"'))) {
            diagnostics.warn('File does not have .json extension.');
            return { canParse: false, diagnostics };
        }
        try {
            const json = JSON.parse(contents);
            if (json.locale === undefined) {
                diagnostics.warn('Required "locale" property missing.');
                return { canParse: false, diagnostics };
            }
            if (typeof json.locale !== 'string') {
                diagnostics.warn('The "locale" property is not a string.');
                return { canParse: false, diagnostics };
            }
            if (json.translations === undefined) {
                diagnostics.warn('Required "translations" property missing.');
                return { canParse: false, diagnostics };
            }
            if (typeof json.translations !== 'object') {
                diagnostics.warn('The "translations" is not an object.');
                return { canParse: false, diagnostics };
            }
            return { canParse: true, diagnostics, hint: json };
        }
        catch (e) {
            diagnostics.warn('File is not valid JSON.');
            return { canParse: false, diagnostics };
        }
    }
    parse(_filePath, contents, json) {
        const { locale: parsedLocale, translations } = json || JSON.parse(contents);
        const parsedTranslations = {};
        for (const messageId in translations) {
            const targetMessage = translations[messageId];
            parsedTranslations[messageId] = (0, index_1.ɵparseTranslation)(targetMessage);
        }
        return { locale: parsedLocale, translations: parsedTranslations, diagnostics: new diagnostics_1.Diagnostics() };
    }
}
exports.SimpleJsonTranslationParser = SimpleJsonTranslationParser;
