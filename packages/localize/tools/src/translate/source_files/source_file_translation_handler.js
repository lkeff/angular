"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileTranslationHandler = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const localize_1 = require("@angular/compiler-cli/private/localize");
const core_1 = __importDefault(require("@babel/core"));
const es2015_translate_plugin_1 = require("./es2015_translate_plugin");
const es5_translate_plugin_1 = require("./es5_translate_plugin");
const locale_plugin_1 = require("./locale_plugin");
/**
 * Translate a file by inlining all messages tagged by `$localize` with the appropriate translated
 * message.
 */
class SourceFileTranslationHandler {
    constructor(fs, translationOptions = {}) {
        this.fs = fs;
        this.translationOptions = translationOptions;
        this.sourceLocaleOptions = Object.assign(Object.assign({}, this.translationOptions), { missingTranslation: 'ignore' });
    }
    canTranslate(relativeFilePath, _contents) {
        return this.fs.extname(relativeFilePath) === '.js';
    }
    translate(diagnostics, sourceRoot, relativeFilePath, contents, outputPathFn, translations, sourceLocale) {
        const sourceCode = Buffer.from(contents).toString('utf8');
        // A short-circuit check to avoid parsing the file into an AST if it does not contain any
        // `$localize` identifiers.
        if (!sourceCode.includes('$localize')) {
            for (const translation of translations) {
                this.writeSourceFile(diagnostics, outputPathFn, translation.locale, relativeFilePath, contents);
            }
            if (sourceLocale !== undefined) {
                this.writeSourceFile(diagnostics, outputPathFn, sourceLocale, relativeFilePath, contents);
            }
        }
        else {
            const ast = core_1.default.parseSync(sourceCode, { sourceRoot, filename: relativeFilePath });
            if (!ast) {
                diagnostics.error(`Unable to parse source file: ${this.fs.join(sourceRoot, relativeFilePath)}`);
                return;
            }
            // Output a translated copy of the file for each locale.
            for (const translationBundle of translations) {
                this.translateFile(diagnostics, ast, translationBundle, sourceRoot, relativeFilePath, outputPathFn, this.translationOptions);
            }
            if (sourceLocale !== undefined) {
                // Also output a copy of the file for the source locale.
                // There will be no translations - by definition - so we "ignore" `missingTranslations`.
                this.translateFile(diagnostics, ast, { locale: sourceLocale, translations: {} }, sourceRoot, relativeFilePath, outputPathFn, this.sourceLocaleOptions);
            }
        }
    }
    translateFile(diagnostics, ast, translationBundle, sourceRoot, filename, outputPathFn, options) {
        const translated = core_1.default.transformFromAstSync(ast, undefined, {
            compact: true,
            generatorOpts: { minified: true },
            plugins: [
                (0, locale_plugin_1.makeLocalePlugin)(translationBundle.locale),
                (0, es2015_translate_plugin_1.makeEs2015TranslatePlugin)(diagnostics, translationBundle.translations, options, this.fs),
                (0, es5_translate_plugin_1.makeEs5TranslatePlugin)(diagnostics, translationBundle.translations, options, this.fs),
            ],
            cwd: sourceRoot,
            filename,
        });
        if (translated && translated.code) {
            this.writeSourceFile(diagnostics, outputPathFn, translationBundle.locale, filename, translated.code);
            const outputPath = (0, localize_1.absoluteFrom)(outputPathFn(translationBundle.locale, filename));
            this.fs.ensureDir(this.fs.dirname(outputPath));
            this.fs.writeFile(outputPath, translated.code);
        }
        else {
            diagnostics.error(`Unable to translate source file: ${this.fs.join(sourceRoot, filename)}`);
            return;
        }
    }
    writeSourceFile(diagnostics, outputPathFn, locale, relativeFilePath, contents) {
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
exports.SourceFileTranslationHandler = SourceFileTranslationHandler;
