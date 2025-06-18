"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInEachFileSystem = void 0;
exports.initMockFileSystem = initMockFileSystem;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="jasmine"/>
const typescript_1 = __importDefault(require("typescript"));
const helpers_1 = require("../../src/helpers");
const invalid_file_system_1 = require("../../src/invalid_file_system");
const mock_file_system_native_1 = require("./mock_file_system_native");
const mock_file_system_posix_1 = require("./mock_file_system_posix");
const mock_file_system_windows_1 = require("./mock_file_system_windows");
const FS_NATIVE = 'Native';
const FS_OS_X = 'OS/X';
const FS_UNIX = 'Unix';
const FS_WINDOWS = 'Windows';
const FS_ALL = [FS_OS_X, FS_WINDOWS, FS_UNIX, FS_NATIVE];
function runInEachFileSystemFn(callback) {
    FS_ALL.forEach((os) => runInFileSystem(os, callback, false));
}
function runInFileSystem(os, callback, error) {
    describe(`<<FileSystem: ${os}>>`, () => {
        beforeEach(() => initMockFileSystem(os));
        afterEach(() => (0, helpers_1.setFileSystem)(new invalid_file_system_1.InvalidFileSystem()));
        callback(os);
        if (error) {
            afterAll(() => {
                throw new Error(`runInFileSystem limited to ${os}, cannot pass`);
            });
        }
    });
}
exports.runInEachFileSystem = runInEachFileSystemFn;
exports.runInEachFileSystem.native = (callback) => runInFileSystem(FS_NATIVE, callback, true);
exports.runInEachFileSystem.osX = (callback) => runInFileSystem(FS_OS_X, callback, true);
exports.runInEachFileSystem.unix = (callback) => runInFileSystem(FS_UNIX, callback, true);
exports.runInEachFileSystem.windows = (callback) => runInFileSystem(FS_WINDOWS, callback, true);
function initMockFileSystem(os, cwd) {
    const fs = createMockFileSystem(os, cwd);
    (0, helpers_1.setFileSystem)(fs);
    monkeyPatchTypeScript(fs);
    return fs;
}
function createMockFileSystem(os, cwd) {
    switch (os) {
        case 'OS/X':
            return new mock_file_system_posix_1.MockFileSystemPosix(/* isCaseSensitive */ false, cwd);
        case 'Unix':
            return new mock_file_system_posix_1.MockFileSystemPosix(/* isCaseSensitive */ true, cwd);
        case 'Windows':
            return new mock_file_system_windows_1.MockFileSystemWindows(/* isCaseSensitive*/ false, cwd);
        case 'Native':
            return new mock_file_system_native_1.MockFileSystemNative(cwd);
        default:
            throw new Error('FileSystem not supported');
    }
}
function monkeyPatchTypeScript(fs) {
    typescript_1.default.sys.fileExists = (path) => {
        const absPath = fs.resolve(path);
        return fs.exists(absPath) && fs.stat(absPath).isFile();
    };
    typescript_1.default.sys.getCurrentDirectory = () => fs.pwd();
    typescript_1.default.sys.getDirectories = getDirectories;
    typescript_1.default.sys.readFile = fs.readFile.bind(fs);
    typescript_1.default.sys.resolvePath = fs.resolve.bind(fs);
    typescript_1.default.sys.writeFile = fs.writeFile.bind(fs);
    typescript_1.default.sys.directoryExists = directoryExists;
    typescript_1.default.sys.readDirectory = readDirectory;
    function getDirectories(path) {
        return fs.readdir((0, helpers_1.absoluteFrom)(path)).filter((p) => fs.stat(fs.resolve(path, p)).isDirectory());
    }
    function getFileSystemEntries(path) {
        const files = [];
        const directories = [];
        const absPath = fs.resolve(path);
        const entries = fs.readdir(absPath);
        for (const entry of entries) {
            if (entry == '.' || entry === '..') {
                continue;
            }
            const absPath = fs.resolve(path, entry);
            const stat = fs.stat(absPath);
            if (stat.isDirectory()) {
                directories.push(absPath);
            }
            else if (stat.isFile()) {
                files.push(absPath);
            }
        }
        return { files, directories };
    }
    function realPath(path) {
        return fs.realpath(fs.resolve(path));
    }
    function directoryExists(path) {
        const absPath = fs.resolve(path);
        return fs.exists(absPath) && fs.stat(absPath).isDirectory();
    }
    // Rather than completely re-implementing we are using the `ts.matchFiles` function,
    // which is internal to the `ts` namespace.
    const tsMatchFiles = typescript_1.default.matchFiles;
    function readDirectory(path, extensions, excludes, includes, depth) {
        return tsMatchFiles(path, extensions, excludes, includes, fs.isCaseSensitive(), fs.pwd(), depth, getFileSystemEntries, realPath, directoryExists);
    }
}
