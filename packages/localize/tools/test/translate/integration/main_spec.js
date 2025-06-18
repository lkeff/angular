"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/testing");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const diagnostics_1 = require("../../../src/diagnostics");
const index_1 = require("../../../src/translate/index");
const output_path_1 = require("../../../src/translate/output_path");
const helpers_1 = require("../../helpers");
const currentDir = path_1.default.dirname(url_1.default.fileURLToPath(import.meta.url));
(0, helpers_1.runInNativeFileSystem)(() => {
    describe('translateFiles()', () => {
        let fs;
        let testDir;
        let testFilesDir;
        let translationFilesDir;
        beforeEach(() => {
            fs = (0, file_system_1.getFileSystem)();
            testDir = (0, file_system_1.absoluteFrom)('/test');
            testFilesDir = fs.resolve(testDir, 'test_files');
            (0, testing_1.loadTestDirectory)(fs, path_1.default.resolve(path_1.default.join(currentDir, 'test_files')), testFilesDir);
            translationFilesDir = fs.resolve(testDir, 'test_files');
            (0, testing_1.loadTestDirectory)(fs, path_1.default.resolve(path_1.default.join(currentDir, 'locales')), translationFilesDir);
        });
        it('should copy non-code files to the destination folders', () => {
            const diagnostics = new diagnostics_1.Diagnostics();
            const outputPathFn = (0, output_path_1.getOutputPathFn)(fs, fs.resolve(testDir, '{{LOCALE}}'));
            (0, index_1.translateFiles)({
                sourceRootPath: testFilesDir,
                sourceFilePaths: ['test-1.txt', 'test-2.txt'],
                outputPathFn,
                translationFilePaths: resolveAll(translationFilesDir, [
                    'messages.de.json',
                    'messages.es.xlf',
                    'messages.fr.xlf',
                    'messages.it.xtb',
                ]),
                translationFileLocales: [],
                diagnostics,
                missingTranslation: 'error',
                duplicateTranslation: 'error',
            });
            expect(diagnostics.messages.length).toEqual(0);
            expect(fs.readFile(fs.resolve(testDir, 'fr', 'test-1.txt'))).toEqual('Contents of test-1.txt');
            expect(fs.readFile(fs.resolve(testDir, 'fr', 'test-2.txt'))).toEqual('Contents of test-2.txt');
            expect(fs.readFile(fs.resolve(testDir, 'de', 'test-1.txt'))).toEqual('Contents of test-1.txt');
            expect(fs.readFile(fs.resolve(testDir, 'de', 'test-2.txt'))).toEqual('Contents of test-2.txt');
            expect(fs.readFile(fs.resolve(testDir, 'es', 'test-1.txt'))).toEqual('Contents of test-1.txt');
            expect(fs.readFile(fs.resolve(testDir, 'es', 'test-2.txt'))).toEqual('Contents of test-2.txt');
            expect(fs.readFile(fs.resolve(testDir, 'it', 'test-1.txt'))).toEqual('Contents of test-1.txt');
            expect(fs.readFile(fs.resolve(testDir, 'it', 'test-2.txt'))).toEqual('Contents of test-2.txt');
        });
        it('should translate and copy source-code files to the destination folders', () => {
            const diagnostics = new diagnostics_1.Diagnostics();
            const outputPathFn = (0, output_path_1.getOutputPathFn)(fs, fs.resolve(testDir, '{{LOCALE}}'));
            (0, index_1.translateFiles)({
                sourceRootPath: testFilesDir,
                sourceFilePaths: ['test.js'],
                outputPathFn,
                translationFilePaths: resolveAll(translationFilesDir, [
                    'messages.de.json',
                    'messages.es.xlf',
                    'messages.fr.xlf',
                    'messages.it.xtb',
                ]),
                translationFileLocales: [],
                diagnostics,
                missingTranslation: 'error',
                duplicateTranslation: 'error',
            });
            expect(diagnostics.messages.length).toEqual(0);
            expect(fs.readFile(fs.resolve(testDir, 'fr', 'test.js'))).toEqual(`var name="World";var message="Bonjour, "+name+"!";`);
            expect(fs.readFile(fs.resolve(testDir, 'de', 'test.js'))).toEqual(`var name="World";var message="Guten Tag, "+name+"!";`);
            expect(fs.readFile(fs.resolve(testDir, 'es', 'test.js'))).toEqual(`var name="World";var message="Hola, "+name+"!";`);
            expect(fs.readFile(fs.resolve(testDir, 'it', 'test.js'))).toEqual(`var name="World";var message="Ciao, "+name+"!";`);
        });
        it('should translate and copy source-code files overriding the locales', () => {
            const diagnostics = new diagnostics_1.Diagnostics();
            const outputPathFn = (0, output_path_1.getOutputPathFn)(fs, fs.resolve(testDir, '{{LOCALE}}'));
            (0, index_1.translateFiles)({
                sourceRootPath: testFilesDir,
                sourceFilePaths: ['test.js'],
                outputPathFn,
                translationFilePaths: resolveAll(translationFilesDir, [
                    'messages.de.json',
                    'messages.es.xlf',
                    'messages.fr.xlf',
                    'messages.it.xtb',
                ]),
                translationFileLocales: ['xde', undefined, 'fr'],
                diagnostics,
                missingTranslation: 'error',
                duplicateTranslation: 'error',
            });
            expect(diagnostics.messages.length).toEqual(1);
            expect(diagnostics.messages).toContain({
                type: 'warning',
                message: `The provided locale "xde" does not match the target locale "de" found in the translation file "${fs.resolve(translationFilesDir, 'messages.de.json')}".`,
            });
            expect(fs.readFile(fs.resolve(testDir, 'xde', 'test.js'))).toEqual(`var name="World";var message="Guten Tag, "+name+"!";`);
            expect(fs.readFile(fs.resolve(testDir, 'es', 'test.js'))).toEqual(`var name="World";var message="Hola, "+name+"!";`);
            expect(fs.readFile(fs.resolve(testDir, 'fr', 'test.js'))).toEqual(`var name="World";var message="Bonjour, "+name+"!";`);
            expect(fs.readFile(fs.resolve(testDir, 'it', 'test.js'))).toEqual(`var name="World";var message="Ciao, "+name+"!";`);
        });
        it('should merge translation files, if more than one provided, and translate source-code', () => {
            const diagnostics = new diagnostics_1.Diagnostics();
            const outputPathFn = (0, output_path_1.getOutputPathFn)(fs, fs.resolve(testDir, '{{LOCALE}}'));
            (0, index_1.translateFiles)({
                sourceRootPath: testFilesDir,
                sourceFilePaths: ['test-extra.js'],
                outputPathFn,
                translationFilePaths: resolveAllRecursive(translationFilesDir, [
                    ['messages.de.json', 'messages-extra.de.json'],
                    'messages.es.xlf',
                ]),
                translationFileLocales: [],
                diagnostics,
                missingTranslation: 'error',
                duplicateTranslation: 'error',
            });
            expect(diagnostics.messages.length).toEqual(1);
            // There is no "extra" translation in the `es` locale translation file.
            expect(diagnostics.messages[0]).toEqual({
                type: 'error',
                message: 'No translation found for "customExtra" ("Goodbye, {$PH}!").',
            });
            // The `de` locale translates the `customExtra` message because it is in the
            // `messages-extra.de.json` file that was merged.
            expect(fs.readFile(fs.resolve(testDir, 'de', 'test-extra.js'))).toEqual(`var name="World";var message="Guten Tag, "+name+"!";var message="Auf wiedersehen, "+name+"!";`);
            // The `es` locale does not translate `customExtra` because there is no translation for it.
            expect(fs.readFile(fs.resolve(testDir, 'es', 'test-extra.js'))).toEqual(`var name="World";var message="Hola, "+name+"!";var message="Goodbye, "+name+"!";`);
        });
        it('should transform and/or copy files to the destination folders', () => {
            const diagnostics = new diagnostics_1.Diagnostics();
            const outputPathFn = (0, output_path_1.getOutputPathFn)(fs, fs.resolve(testDir, '{{LOCALE}}'));
            (0, index_1.translateFiles)({
                sourceRootPath: testFilesDir,
                sourceFilePaths: ['test-1.txt', 'test-2.txt', 'test.js'],
                outputPathFn,
                translationFilePaths: resolveAll(translationFilesDir, [
                    'messages.de.json',
                    'messages.es.xlf',
                    'messages.fr.xlf',
                    'messages.it.xtb',
                ]),
                translationFileLocales: [],
                diagnostics,
                missingTranslation: 'error',
                duplicateTranslation: 'error',
            });
            expect(diagnostics.messages.length).toEqual(0);
            expect(fs.readFile(fs.resolve(testDir, 'fr', 'test-1.txt'))).toEqual('Contents of test-1.txt');
            expect(fs.readFile(fs.resolve(testDir, 'fr', 'test-2.txt'))).toEqual('Contents of test-2.txt');
            expect(fs.readFile(fs.resolve(testDir, 'de', 'test-1.txt'))).toEqual('Contents of test-1.txt');
            expect(fs.readFile(fs.resolve(testDir, 'de', 'test-2.txt'))).toEqual('Contents of test-2.txt');
            expect(fs.readFile(fs.resolve(testDir, 'es', 'test-1.txt'))).toEqual('Contents of test-1.txt');
            expect(fs.readFile(fs.resolve(testDir, 'es', 'test-2.txt'))).toEqual('Contents of test-2.txt');
            expect(fs.readFile(fs.resolve(testDir, 'it', 'test-1.txt'))).toEqual('Contents of test-1.txt');
            expect(fs.readFile(fs.resolve(testDir, 'it', 'test-2.txt'))).toEqual('Contents of test-2.txt');
            expect(fs.readFile(fs.resolve(testDir, 'fr', 'test.js'))).toEqual(`var name="World";var message="Bonjour, "+name+"!";`);
            expect(fs.readFile(fs.resolve(testDir, 'de', 'test.js'))).toEqual(`var name="World";var message="Guten Tag, "+name+"!";`);
            expect(fs.readFile(fs.resolve(testDir, 'es', 'test.js'))).toEqual(`var name="World";var message="Hola, "+name+"!";`);
            expect(fs.readFile(fs.resolve(testDir, 'it', 'test.js'))).toEqual(`var name="World";var message="Ciao, "+name+"!";`);
        });
        function resolveAll(rootPath, paths) {
            return paths.map((p) => fs.resolve(rootPath, p));
        }
        function resolveAllRecursive(rootPath, paths) {
            return paths.map((p) => Array.isArray(p) ? p.map((p2) => fs.resolve(rootPath, p2)) : fs.resolve(rootPath, p));
        }
    });
});
