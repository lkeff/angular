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
const asset_translation_handler_1 = require("../../../src/translate/asset_files/asset_translation_handler");
(0, testing_1.runInEachFileSystem)(() => {
    describe('AssetTranslationHandler', () => {
        let fs;
        let rootPath;
        let filePath;
        let enTranslationPath;
        let enUSTranslationPath;
        let frTranslationPath;
        beforeEach(() => {
            fs = (0, file_system_1.getFileSystem)();
            rootPath = (0, file_system_1.absoluteFrom)('/src/path');
            filePath = (0, file_system_1.relativeFrom)('relative/path');
            enTranslationPath = (0, file_system_1.absoluteFrom)('/translations/en/relative/path');
            enUSTranslationPath = (0, file_system_1.absoluteFrom)('/translations/en-US/relative/path');
            frTranslationPath = (0, file_system_1.absoluteFrom)('/translations/fr/relative/path');
        });
        describe('canTranslate()', () => {
            it('should always return true', () => {
                const handler = new asset_translation_handler_1.AssetTranslationHandler(fs);
                expect(handler.canTranslate(filePath, Buffer.from('contents'))).toBe(true);
            });
        });
        describe('translate()', () => {
            it('should write the translated file for each translation locale', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new asset_translation_handler_1.AssetTranslationHandler(fs);
                const translations = [
                    { locale: 'en', translations: {} },
                    { locale: 'fr', translations: {} },
                ];
                const contents = Buffer.from('contents');
                handler.translate(diagnostics, rootPath, filePath, contents, mockOutputPathFn, translations);
                expect(fs.readFileBuffer(enTranslationPath)).toEqual(contents);
                expect(fs.readFileBuffer(frTranslationPath)).toEqual(contents);
            });
            it('should write the translated file to the source locale if provided', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new asset_translation_handler_1.AssetTranslationHandler(fs);
                const translations = [];
                const contents = Buffer.from('contents');
                const sourceLocale = 'en-US';
                handler.translate(diagnostics, rootPath, filePath, contents, mockOutputPathFn, translations, sourceLocale);
                expect(fs.readFileBuffer(enUSTranslationPath)).toEqual(contents);
            });
        });
    });
    function mockOutputPathFn(locale, relativePath) {
        return `/translations/${locale}/${relativePath}`;
    }
});
