"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const index_1 = require("../../../../index");
const diagnostics_1 = require("../../../src/diagnostics");
const translation_loader_1 = require("../../../src/translate/translation_files/translation_loader");
const simple_json_translation_parser_1 = require("../../../src/translate/translation_files/translation_parsers/simple_json_translation_parser");
(0, testing_1.runInEachFileSystem)(() => {
    describe('TranslationLoader', () => {
        describe('loadBundles()', () => {
            const alwaysCanParse = () => true;
            const neverCanParse = () => false;
            let fs;
            let enTranslationPath;
            const enTranslationContent = '{"locale": "en", "translations": {"a": "A"}}';
            let frTranslationPath;
            const frTranslationContent = '{"locale": "fr", "translations": {"a": "A"}}';
            let frExtraTranslationPath;
            const frExtraTranslationContent = '{"locale": "fr", "translations": {"b": "B"}}';
            let jsonParser;
            beforeEach(() => {
                fs = (0, file_system_1.getFileSystem)();
                enTranslationPath = (0, file_system_1.absoluteFrom)('/src/locale/messages.en.json');
                frTranslationPath = (0, file_system_1.absoluteFrom)('/src/locale/messages.fr.json');
                frExtraTranslationPath = (0, file_system_1.absoluteFrom)('/src/locale/extra.fr.json');
                fs.ensureDir((0, file_system_1.absoluteFrom)('/src/locale'));
                fs.writeFile(enTranslationPath, enTranslationContent);
                fs.writeFile(frTranslationPath, frTranslationContent);
                fs.writeFile(frExtraTranslationPath, frExtraTranslationContent);
                jsonParser = new simple_json_translation_parser_1.SimpleJsonTranslationParser();
            });
            it('should call `analyze()` and `parse()` for each file', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const parser = new MockTranslationParser(alwaysCanParse, 'fr');
                const loader = new translation_loader_1.TranslationLoader(fs, [parser], 'error', diagnostics);
                loader.loadBundles([[enTranslationPath], [frTranslationPath]], []);
                expect(parser.log).toEqual([
                    `canParse(${enTranslationPath}, ${enTranslationContent})`,
                    `parse(${enTranslationPath}, ${enTranslationContent})`,
                    `canParse(${frTranslationPath}, ${frTranslationContent})`,
                    `parse(${frTranslationPath}, ${frTranslationContent})`,
                ]);
            });
            it('should stop at the first parser that can parse each file', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const parser1 = new MockTranslationParser(neverCanParse);
                const parser2 = new MockTranslationParser(alwaysCanParse, 'fr');
                const parser3 = new MockTranslationParser(alwaysCanParse, 'en');
                const loader = new translation_loader_1.TranslationLoader(fs, [parser1, parser2, parser3], 'error', diagnostics);
                loader.loadBundles([[enTranslationPath], [frTranslationPath]], []);
                expect(parser1.log).toEqual([
                    `canParse(${enTranslationPath}, ${enTranslationContent})`,
                    `canParse(${frTranslationPath}, ${frTranslationContent})`,
                ]);
                expect(parser2.log).toEqual([
                    `canParse(${enTranslationPath}, ${enTranslationContent})`,
                    `parse(${enTranslationPath}, ${enTranslationContent})`,
                    `canParse(${frTranslationPath}, ${frTranslationContent})`,
                    `parse(${frTranslationPath}, ${frTranslationContent})`,
                ]);
            });
            it('should return locale and translations parsed from each file', () => {
                const translations = {};
                const diagnostics = new diagnostics_1.Diagnostics();
                const parser = new MockTranslationParser(alwaysCanParse, 'pl', translations);
                const loader = new translation_loader_1.TranslationLoader(fs, [parser], 'error', diagnostics);
                const result = loader.loadBundles([[enTranslationPath], [frTranslationPath]], []);
                expect(result).toEqual([
                    { locale: 'pl', translations, diagnostics: new diagnostics_1.Diagnostics() },
                    { locale: 'pl', translations, diagnostics: new diagnostics_1.Diagnostics() },
                ]);
            });
            it('should return the provided locale if there is no parsed locale', () => {
                const translations = {};
                const diagnostics = new diagnostics_1.Diagnostics();
                const parser = new MockTranslationParser(alwaysCanParse, undefined, translations);
                const loader = new translation_loader_1.TranslationLoader(fs, [parser], 'error', diagnostics);
                const result = loader.loadBundles([[enTranslationPath], [frTranslationPath]], ['en', 'fr']);
                expect(result).toEqual([
                    { locale: 'en', translations, diagnostics: new diagnostics_1.Diagnostics() },
                    { locale: 'fr', translations, diagnostics: new diagnostics_1.Diagnostics() },
                ]);
            });
            it('should merge multiple translation files, if given, for a each locale', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const loader = new translation_loader_1.TranslationLoader(fs, [jsonParser], 'error', diagnostics);
                const result = loader.loadBundles([[frTranslationPath, frExtraTranslationPath]], []);
                expect(result).toEqual([
                    {
                        locale: 'fr',
                        translations: { 'a': (0, index_1.ɵparseTranslation)('A'), 'b': (0, index_1.ɵparseTranslation)('B') },
                        diagnostics: new diagnostics_1.Diagnostics(),
                    },
                ]);
            });
            const allDiagnosticModes = ['ignore', 'warning', 'error'];
            allDiagnosticModes.forEach((mode) => it(`should ${mode} on duplicate messages when merging multiple translation files`, () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const loader = new translation_loader_1.TranslationLoader(fs, [jsonParser], mode, diagnostics);
                // Change the fs-extra file to have the same translations as fr.
                fs.writeFile(frExtraTranslationPath, frTranslationContent);
                const result = loader.loadBundles([[frTranslationPath, frExtraTranslationPath]], []);
                expect(result).toEqual([
                    {
                        locale: 'fr',
                        translations: { 'a': (0, index_1.ɵparseTranslation)('A') },
                        diagnostics: jasmine.any(diagnostics_1.Diagnostics),
                    },
                ]);
                if (mode === 'error' || mode === 'warning') {
                    expect(diagnostics.messages).toEqual([
                        {
                            type: mode,
                            message: `Duplicate translations for message "a" when merging "${frExtraTranslationPath}".`,
                        },
                    ]);
                }
            }));
            it('should warn if the provided locales do not match the parsed locales', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const loader = new translation_loader_1.TranslationLoader(fs, [jsonParser], 'error', diagnostics);
                loader.loadBundles([[enTranslationPath], [frTranslationPath]], [undefined, 'es']);
                expect(diagnostics.messages.length).toEqual(1);
                expect(diagnostics.messages).toContain({
                    type: 'warning',
                    message: `The provided locale "es" does not match the target locale "fr" found in the translation file "${frTranslationPath}".`,
                });
            });
            it('should warn on differing target locales when merging multiple translation files', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const fr1 = (0, file_system_1.absoluteFrom)('/src/locale/messages-1.fr.json');
                fs.writeFile(fr1, '{"locale":"fr", "translations": {"a": "A"}}');
                const fr2 = (0, file_system_1.absoluteFrom)('/src/locale/messages-2.fr.json');
                fs.writeFile(fr2, '{"locale":"fr", "translations": {"b": "B"}}');
                const de = (0, file_system_1.absoluteFrom)('/src/locale/messages.de.json');
                fs.writeFile(de, '{"locale":"de", "translations": {"c": "C"}}');
                const loader = new translation_loader_1.TranslationLoader(fs, [jsonParser], 'error', diagnostics);
                const result = loader.loadBundles([[fr1, fr2, de]], []);
                expect(result).toEqual([
                    {
                        locale: 'fr',
                        translations: {
                            'a': (0, index_1.ɵparseTranslation)('A'),
                            'b': (0, index_1.ɵparseTranslation)('B'),
                            'c': (0, index_1.ɵparseTranslation)('C'),
                        },
                        diagnostics: jasmine.any(diagnostics_1.Diagnostics),
                    },
                ]);
                expect(diagnostics.messages).toEqual([
                    {
                        type: 'warning',
                        message: `When merging multiple translation files, the target locale "de" found in "${de}" ` +
                            `does not match the target locale "fr" found in earlier files ["${fr1}", "${fr2}"].`,
                    },
                ]);
            });
            it('should throw an error if there is no provided nor parsed target locale', () => {
                const translations = {};
                const diagnostics = new diagnostics_1.Diagnostics();
                const parser = new MockTranslationParser(alwaysCanParse, undefined, translations);
                const loader = new translation_loader_1.TranslationLoader(fs, [parser], 'error', diagnostics);
                expect(() => loader.loadBundles([[enTranslationPath]], [])).toThrowError(`The translation file "${enTranslationPath}" does not contain a target locale and no explicit locale was provided for this file.`);
            });
            it('should error if none of the parsers can parse the file', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const parser = new MockTranslationParser(neverCanParse);
                const loader = new translation_loader_1.TranslationLoader(fs, [parser], 'error', diagnostics);
                expect(() => loader.loadBundles([[enTranslationPath], [frTranslationPath]], [])).toThrowError(`There is no "TranslationParser" that can parse this translation file: ${enTranslationPath}.\n` +
                    `MockTranslationParser cannot parse translation file.\n` +
                    `WARNINGS:\n - This is a mock failure warning.`);
            });
        });
    });
    class MockTranslationParser {
        constructor(_canParse, _locale, _translations = {}) {
            this._canParse = _canParse;
            this._locale = _locale;
            this._translations = _translations;
            this.log = [];
        }
        analyze(filePath, fileContents) {
            const diagnostics = new diagnostics_1.Diagnostics();
            diagnostics.warn('This is a mock failure warning.');
            this.log.push(`canParse(${filePath}, ${fileContents})`);
            return this._canParse(filePath)
                ? { canParse: true, hint: true, diagnostics }
                : { canParse: false, diagnostics };
        }
        parse(filePath, fileContents) {
            this.log.push(`parse(${filePath}, ${fileContents})`);
            return {
                locale: this._locale,
                translations: this._translations,
                diagnostics: new diagnostics_1.Diagnostics(),
            };
        }
    }
});
