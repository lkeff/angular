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
const diagnostics_1 = require("../../src/diagnostics");
const translator_1 = require("../../src/translate/translator");
(0, testing_1.runInEachFileSystem)(() => {
    describe('Translator', () => {
        let fs;
        let distDirectory;
        let imgDirectory;
        let file1Path;
        let imgPath;
        beforeEach(() => {
            fs = (0, file_system_1.getFileSystem)();
            distDirectory = (0, file_system_1.absoluteFrom)('/dist');
            imgDirectory = (0, file_system_1.absoluteFrom)('/dist/images');
            file1Path = (0, file_system_1.relativeFrom)('file1.js');
            imgPath = (0, file_system_1.relativeFrom)('images/img.gif');
            fs.ensureDir(imgDirectory);
            fs.writeFile(fs.resolve(distDirectory, file1Path), 'resource file 1');
            fs.writeFile(fs.resolve(distDirectory, imgPath), Buffer.from('resource file 2'));
        });
        describe('translateFiles()', () => {
            it('should call FileSystem.readFileBuffer load the resource file contents', () => {
                const translator = new translator_1.Translator(fs, [new MockTranslationHandler()], new diagnostics_1.Diagnostics());
                spyOn(fs, 'readFileBuffer').and.callThrough();
                translator.translateFiles([file1Path, imgPath], distDirectory, mockOutputPathFn, []);
                expect(fs.readFileBuffer).toHaveBeenCalledWith(fs.resolve(distDirectory, file1Path));
                expect(fs.readFileBuffer).toHaveBeenCalledWith(fs.resolve(distDirectory, imgPath));
            });
            it('should call `canTranslate()` and `translate()` for each file', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new MockTranslationHandler(true);
                const translator = new translator_1.Translator(fs, [handler], diagnostics);
                translator.translateFiles([file1Path, imgPath], distDirectory, mockOutputPathFn, []);
                expect(handler.log).toEqual([
                    'canTranslate(file1.js, resource file 1)',
                    `translate(${distDirectory}, file1.js, resource file 1, ...)`,
                    'canTranslate(images/img.gif, resource file 2)',
                    `translate(${distDirectory}, images/img.gif, resource file 2, ...)`,
                ]);
            });
            it('should pass the sourceLocale through to `translate()` if provided', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new MockTranslationHandler(true);
                const translator = new translator_1.Translator(fs, [handler], diagnostics);
                translator.translateFiles([file1Path, imgPath], distDirectory, mockOutputPathFn, [], 'en-US');
                expect(handler.log).toEqual([
                    'canTranslate(file1.js, resource file 1)',
                    `translate(${distDirectory}, file1.js, resource file 1, ..., en-US)`,
                    'canTranslate(images/img.gif, resource file 2)',
                    `translate(${distDirectory}, images/img.gif, resource file 2, ..., en-US)`,
                ]);
            });
            it('should stop at the first handler that can handle each file', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler1 = new MockTranslationHandler(false);
                const handler2 = new MockTranslationHandler(true);
                const handler3 = new MockTranslationHandler(true);
                const translator = new translator_1.Translator(fs, [handler1, handler2, handler3], diagnostics);
                translator.translateFiles([file1Path, imgPath], distDirectory, mockOutputPathFn, []);
                expect(handler1.log).toEqual([
                    'canTranslate(file1.js, resource file 1)',
                    'canTranslate(images/img.gif, resource file 2)',
                ]);
                expect(handler2.log).toEqual([
                    'canTranslate(file1.js, resource file 1)',
                    `translate(${distDirectory}, file1.js, resource file 1, ...)`,
                    'canTranslate(images/img.gif, resource file 2)',
                    `translate(${distDirectory}, images/img.gif, resource file 2, ...)`,
                ]);
            });
            it('should error if none of the handlers can handle the file', () => {
                const diagnostics = new diagnostics_1.Diagnostics();
                const handler = new MockTranslationHandler(false);
                const translator = new translator_1.Translator(fs, [handler], diagnostics);
                translator.translateFiles([file1Path, imgPath], distDirectory, mockOutputPathFn, []);
                expect(diagnostics.messages).toEqual([
                    { type: 'error', message: `Unable to handle resource file: ${file1Path}` },
                    { type: 'error', message: `Unable to handle resource file: ${imgPath}` },
                ]);
            });
        });
    });
    class MockTranslationHandler {
        constructor(_canTranslate = true) {
            this._canTranslate = _canTranslate;
            this.log = [];
        }
        canTranslate(relativePath, contents) {
            this.log.push(`canTranslate(${relativePath}, ${contents})`);
            return this._canTranslate;
        }
        translate(_diagnostics, rootPath, relativePath, contents, _outputPathFn, _translations, sourceLocale) {
            this.log.push(`translate(${rootPath}, ${relativePath}, ${contents}, ...` +
                (sourceLocale !== undefined ? `, ${sourceLocale})` : ')'));
        }
    }
    function mockOutputPathFn(locale, relativePath) {
        return `translations/${locale}/${relativePath}`;
    }
});
