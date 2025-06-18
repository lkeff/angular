"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEs2015TranslatePlugin = makeEs2015TranslatePlugin;
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
function makeEs2015TranslatePlugin(diagnostics, translations, { missingTranslation = 'error', localizeName = '$localize' } = {}, fs = (0, localize_1.getFileSystem)()) {
    return {
        visitor: {
            TaggedTemplateExpression(path, state) {
                try {
                    const tag = path.get('tag');
                    if ((0, source_file_utils_1.isLocalize)(tag, localizeName)) {
                        const [messageParts] = (0, source_file_utils_1.unwrapMessagePartsFromTemplateLiteral)(path.get('quasi').get('quasis'), fs);
                        const translated = (0, source_file_utils_1.translate)(diagnostics, translations, messageParts, path.node.quasi.expressions, missingTranslation);
                        path.replaceWith((0, source_file_utils_1.buildLocalizeReplacement)(translated[0], translated[1]));
                    }
                }
                catch (e) {
                    if ((0, source_file_utils_1.isBabelParseError)(e)) {
                        // If we get a BabelParseError here then something went wrong with Babel itself
                        // since there must be something wrong with the structure of the AST generated
                        // by Babel parsing a TaggedTemplateExpression.
                        throw (0, source_file_utils_1.buildCodeFrameError)(fs, path, state.file, e);
                    }
                    else {
                        throw e;
                    }
                }
            },
        },
    };
}
