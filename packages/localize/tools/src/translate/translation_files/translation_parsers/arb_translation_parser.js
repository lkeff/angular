"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbTranslationParser = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const index_1 = require("../../../../../index");
const diagnostics_1 = require("../../../diagnostics");
/**
 * A translation parser that can parse JSON formatted as an Application Resource Bundle (ARB).
 *
 * See https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification
 *
 * ```json
 * {
 *   "@@locale": "en-US",
 *   "message-id": "Target message string",
 *   "@message-id": {
 *     "type": "text",
 *     "description": "Some description text",
 *     "x-locations": [
 *       {
 *         "start": {"line": 23, "column": 145},
 *         "end": {"line": 24, "column": 53},
 *         "file": "some/file.ts"
 *       },
 *       ...
 *     ]
 *   },
 *   ...
 * }
 * ```
 */
class ArbTranslationParser {
    analyze(_filePath, contents) {
        const diagnostics = new diagnostics_1.Diagnostics();
        if (!contents.includes('"@@locale"')) {
            return { canParse: false, diagnostics };
        }
        try {
            // We can parse this file if it is valid JSON and contains the `"@@locale"` property.
            return { canParse: true, diagnostics, hint: this.tryParseArbFormat(contents) };
        }
        catch (_a) {
            diagnostics.warn('File is not valid JSON.');
            return { canParse: false, diagnostics };
        }
    }
    parse(_filePath, contents, arb = this.tryParseArbFormat(contents)) {
        const bundle = {
            locale: arb['@@locale'],
            translations: {},
            diagnostics: new diagnostics_1.Diagnostics(),
        };
        for (const messageId of Object.keys(arb)) {
            if (messageId.startsWith('@')) {
                // Skip metadata keys
                continue;
            }
            const targetMessage = arb[messageId];
            bundle.translations[messageId] = (0, index_1.ɵparseTranslation)(targetMessage);
        }
        return bundle;
    }
    tryParseArbFormat(contents) {
        const json = JSON.parse(contents);
        if (typeof json['@@locale'] !== 'string') {
            throw new Error('Missing @@locale property.');
        }
        return json;
    }
}
exports.ArbTranslationParser = ArbTranslationParser;
