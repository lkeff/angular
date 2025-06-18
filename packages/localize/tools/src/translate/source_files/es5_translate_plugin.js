"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEs5TranslatePlugin = makeEs5TranslatePlugin;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const localize_1 = require("@angular/compiler-cli/private/localize");
const source_file_utils_1 = require("../../source_file_utils");
/**
 * Create a Babel plugin that can be used to do compile-time translation of `$localize` tagged
 * messages.
 *
 * @publicApi used by CLI
 */
function makeEs5TranslatePlugin(diagnostics, translations, { missingTranslation = 'error', localizeName = '$localize' } = {}, fs = (0, localize_1.getFileSystem)()) {
    return {
        visitor: {
            CallExpression(callPath, state) {
                try {
                    const calleePath = callPath.get('callee');
                    if ((0, source_file_utils_1.isLocalize)(calleePath, localizeName)) {
                        const [messageParts] = (0, source_file_utils_1.unwrapMessagePartsFromLocalizeCall)(callPath, fs);
                        const [expressions] = (0, source_file_utils_1.unwrapSubstitutionsFromLocalizeCall)(callPath, fs);
                        const translated = (0, source_file_utils_1.translate)(diagnostics, translations, messageParts, expressions, missingTranslation);
                        callPath.replaceWith((0, source_file_utils_1.buildLocalizeReplacement)(translated[0], translated[1]));
                    }
                }
                catch (e) {
                    if ((0, source_file_utils_1.isBabelParseError)(e)) {
                        diagnostics.error((0, source_file_utils_1.buildCodeFrameError)(fs, callPath, state.file, e));
                    }
                    else {
                        throw e;
                    }
                }
            },
        },
    };
}
