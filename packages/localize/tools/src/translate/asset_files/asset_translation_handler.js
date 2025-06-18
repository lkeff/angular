"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetTranslationHandler = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const localize_1 = require("@angular/compiler-cli/private/localize");
/**
 * Translate an asset file by simply copying it to the appropriate translation output paths.
 */
class AssetTranslationHandler {
    constructor(fs) {
        this.fs = fs;
    }
    canTranslate(_relativeFilePath, _contents) {
        return true;
    }
    translate(diagnostics, _sourceRoot, relativeFilePath, contents, outputPathFn, translations, sourceLocale) {
        for (const translation of translations) {
            this.writeAssetFile(diagnostics, outputPathFn, translation.locale, relativeFilePath, contents);
        }
        if (sourceLocale !== undefined) {
            this.writeAssetFile(diagnostics, outputPathFn, sourceLocale, relativeFilePath, contents);
        }
    }
    writeAssetFile(diagnostics, outputPathFn, locale, relativeFilePath, contents) {
        try {
            const outputPath = (0, localize_1.absoluteFrom)(outputPathFn(locale, relativeFilePath));
            this.fs.ensureDir(this.fs.dirname(outputPath));
            this.fs.writeFile(outputPath, contents);
        }
        catch (e) {
            diagnostics.error(e.message);
        }
    }
}
exports.AssetTranslationHandler = AssetTranslationHandler;
