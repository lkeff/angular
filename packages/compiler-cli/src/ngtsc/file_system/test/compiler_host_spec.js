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
const typescript_1 = __importDefault(require("typescript"));
const compiler_host_1 = require("../src/compiler_host");
const helpers_1 = require("../src/helpers");
const testing_1 = require("../testing");
(0, testing_1.runInEachFileSystem)(() => {
    describe('NgtscCompilerHost', () => {
        describe('fileExists()', () => {
            it('should return `false` for an existing directory', () => {
                const directory = (0, helpers_1.absoluteFrom)('/a/b/c');
                const fs = (0, helpers_1.getFileSystem)();
                fs.ensureDir(directory);
                const host = new compiler_host_1.NgtscCompilerHost(fs);
                expect(host.fileExists(directory)).toBe(false);
            });
        });
        describe('readFile()', () => {
            it('should return `undefined` for an existing directory', () => {
                const directory = (0, helpers_1.absoluteFrom)('/a/b/c');
                const fs = (0, helpers_1.getFileSystem)();
                fs.ensureDir(directory);
                const host = new compiler_host_1.NgtscCompilerHost(fs);
                expect(host.readFile(directory)).toBe(undefined);
            });
        });
        describe('getSourceFile()', () => {
            it('should return `undefined` for an existing directory', () => {
                const directory = (0, helpers_1.absoluteFrom)('/a/b/c');
                const fs = (0, helpers_1.getFileSystem)();
                fs.ensureDir(directory);
                const host = new compiler_host_1.NgtscCompilerHost(fs);
                expect(host.getSourceFile(directory, typescript_1.default.ScriptTarget.ES2015)).toBe(undefined);
            });
        });
        describe('useCaseSensitiveFileNames()', () => {
            it('should return the same as `FileSystem.isCaseSensitive()', () => {
                const directory = (0, helpers_1.absoluteFrom)('/a/b/c');
                const fs = (0, helpers_1.getFileSystem)();
                fs.ensureDir(directory);
                const host = new compiler_host_1.NgtscCompilerHost(fs);
                expect(host.useCaseSensitiveFileNames()).toEqual(fs.isCaseSensitive());
            });
        });
        describe('getCanonicalFileName()', () => {
            it('should return the original filename if FS is case-sensitive or lower case otherwise', () => {
                const directory = (0, helpers_1.absoluteFrom)('/a/b/c');
                const fs = (0, helpers_1.getFileSystem)();
                fs.ensureDir(directory);
                const host = new compiler_host_1.NgtscCompilerHost(fs);
                expect(host.getCanonicalFileName('AbCd.ts')).toEqual(fs.isCaseSensitive() ? 'AbCd.ts' : 'abcd.ts');
            });
        });
    });
});
