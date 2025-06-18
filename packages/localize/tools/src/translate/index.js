"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateFiles = translateFiles;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const localize_1 = require("@angular/compiler-cli/private/localize");
const asset_translation_handler_1 = require("./asset_files/asset_translation_handler");
const source_file_translation_handler_1 = require("./source_files/source_file_translation_handler");
const translation_loader_1 = require("./translation_files/translation_loader");
const arb_translation_parser_1 = require("./translation_files/translation_parsers/arb_translation_parser");
const simple_json_translation_parser_1 = require("./translation_files/translation_parsers/simple_json_translation_parser");
const xliff1_translation_parser_1 = require("./translation_files/translation_parsers/xliff1_translation_parser");
const xliff2_translation_parser_1 = require("./translation_files/translation_parsers/xliff2_translation_parser");
const xtb_translation_parser_1 = require("./translation_files/translation_parsers/xtb_translation_parser");
const translator_1 = require("./translator");
function translateFiles({ sourceRootPath, sourceFilePaths, translationFilePaths, translationFileLocales, outputPathFn, diagnostics, missingTranslation, duplicateTranslation, sourceLocale, }) {
    const fs = (0, localize_1.getFileSystem)();
    const translationLoader = new translation_loader_1.TranslationLoader(fs, [
        new xliff2_translation_parser_1.Xliff2TranslationParser(),
        new xliff1_translation_parser_1.Xliff1TranslationParser(),
        new xtb_translation_parser_1.XtbTranslationParser(),
        new simple_json_translation_parser_1.SimpleJsonTranslationParser(),
        new arb_translation_parser_1.ArbTranslationParser(),
    ], duplicateTranslation, diagnostics);
    const resourceProcessor = new translator_1.Translator(fs, [new source_file_translation_handler_1.SourceFileTranslationHandler(fs, { missingTranslation }), new asset_translation_handler_1.AssetTranslationHandler(fs)], diagnostics);
    // Convert all the `translationFilePaths` elements to arrays.
    const translationFilePathsArrays = translationFilePaths.map((filePaths) => Array.isArray(filePaths) ? filePaths.map((p) => fs.resolve(p)) : [fs.resolve(filePaths)]);
    const translations = translationLoader.loadBundles(translationFilePathsArrays, translationFileLocales);
    sourceRootPath = fs.resolve(sourceRootPath);
    resourceProcessor.translateFiles(sourceFilePaths.map(localize_1.relativeFrom), fs.resolve(sourceRootPath), outputPathFn, translations, sourceLocale);
}
