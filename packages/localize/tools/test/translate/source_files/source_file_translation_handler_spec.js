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
const diagnostics_1 = require("../../../src/diagnostics");
const source_file_translation_handler_1 = require("../../../src/translate/source_files/source_file_translation_handler");
(0, testing_1.runInEachFileSystem)(() => {
    describe('SourceFileTranslationHandler', () => {
        let fs;
        let rootPath;
        let filePath;
        let enTranslationPath;
        let enUSTranslationPath;
        let frTranslationPath;
        beforeEach(() => {
            fs = (0, file_system_1.getFileSystem)();
            rootPath = (0, file_system_1.absoluteFrom)('/src/path');
            filePath = (0, file_system_1.relativeFrom)('relative/path.js');
            enTranslationPath = (0, file_system_1.absoluteFrom)('/translations/en/relative/path.js');
            enUSTranslationPath = (0, file_system_1.absoluteFrom)('/translations/en-US/relative/path.js');
            frTranslationPath = (0, file_system_1.absoluteFrom)('/translations/fr/relative/path.js');
        });
        describe('canTranslate()', () => {
            it('should return true if the path ends in ".js"', () => {
                const handler = new source_file_translation_handler_1.SourceFileTranslationHandler(fs);
                expect(handler.canTranslate((0, file_system_1.relativeFrom)('relative/path'), Buffer.from('contents'))).toBe(false);
                expect(handler.canTranslate(filePath, Buffer.from('contents'))).toBe(true);
            });
        });
        describe('translate()', () => {
            it('should copy files for each translation locale if they contain no reference to `$localize`', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new source_file_translation_handler_1.SourceFileTranslationHandler(fs);
                const translations = [
                    { locale: 'en', translations: {} },
                    { locale: 'fr', translations: {} },
                ];
                const contents = Buffer.from('contents');
                handler.translate(diagnostics, rootPath, filePath, contents, mockOutputPathFn, translations);
                expect(fs.readFileBuffer(enTranslationPath)).toEqual(contents);
                expect(fs.readFileBuffer(frTranslationPath)).toEqual(contents);
            });
            it('should copy files to the source locale if they contain no reference to `$localize` and `sourceLocale` is provided', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new source_file_translation_handler_1.SourceFileTranslationHandler(fs);
                const translations = [];
                const contents = Buffer.from('contents');
                handler.translate(diagnostics, rootPath, filePath, contents, mockOutputPathFn, translations, 'en-US');
                expect(fs.readFileBuffer(enUSTranslationPath)).toEqual(contents);
            });
            it('should transform each $localize template tag', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new source_file_translation_handler_1.SourceFileTranslationHandler(fs);
                const translations = [
                    { locale: 'en', translations: {} },
                    { locale: 'fr', translations: {} },
                ];
                const contents = Buffer.from('$localize`a${1}b${2}c`;\n' +
                    '$localize(__makeTemplateObject(["a", "b", "c"], ["a", "b", "c"]), 1, 2);');
                const output = '"a"+1+"b"+2+"c";"a"+1+"b"+2+"c";';
                handler.translate(diagnostics, rootPath, filePath, contents, mockOutputPathFn, translations);
                expect(fs.readFile(enTranslationPath)).toEqual(output);
                expect(fs.readFile(frTranslationPath)).toEqual(output);
            });
            it('should transform each $localize template tag and write it to the source locale if provided', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new source_file_translation_handler_1.SourceFileTranslationHandler(fs);
                const translations = [];
                const contents = Buffer.from('$localize`a${1}b${2}c`;\n' +
                    '$localize(__makeTemplateObject(["a", "b", "c"], ["a", "b", "c"]), 1, 2);');
                const output = '"a"+1+"b"+2+"c";"a"+1+"b"+2+"c";';
                handler.translate(diagnostics, rootPath, filePath, contents, mockOutputPathFn, translations, 'en-US');
                expect(fs.readFile(enUSTranslationPath)).toEqual(output);
            });
            it('should transform `$localize.locale` identifiers', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new source_file_translation_handler_1.SourceFileTranslationHandler(fs);
                const translations = [{ locale: 'fr', translations: {} }];
                const contents = Buffer.from('const x = $localize.locale;\n' +
                    'const y = typeof $localize !== "undefined" && $localize.locale;\n' +
                    'const z = "undefined" !== typeof $localize && $localize.locale || "default";');
                const getOutput = (locale) => `const x="${locale}";const y="${locale}";const z="${locale}"||"default";`;
                handler.translate(diagnostics, rootPath, filePath, contents, mockOutputPathFn, translations, 'en-US');
                expect(fs.readFile(frTranslationPath)).toEqual(getOutput('fr'));
                expect(fs.readFile(enUSTranslationPath)).toEqual(getOutput('en-US'));
            });
            it('should error if the file is not valid JS', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new source_file_translation_handler_1.SourceFileTranslationHandler(fs);
                const translations = [{ locale: 'en', translations: {} }];
                const contents = Buffer.from('this is not a valid $localize file.');
                expect(() => handler.translate(diagnostics, rootPath, filePath, contents, mockOutputPathFn, translations)).toThrowError();
            });
        });
    });
    function mockOutputPathFn(locale, relativePath) {
        return `/translations/${locale}/${relativePath}`;
    }
});
