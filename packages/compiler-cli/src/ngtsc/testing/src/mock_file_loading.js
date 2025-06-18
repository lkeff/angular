"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTestFiles = loadTestFiles;
exports.loadStandardTestFiles = loadStandardTestFiles;
exports.loadTsLib = loadTsLib;
exports.loadFakeCommon = loadFakeCommon;
exports.loadAngularCore = loadAngularCore;
exports.loadTestDirectory = loadTestDirectory;
/// <reference types="node" />
const fs_1 = require("fs");
const path_1 = require("path");
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const runfile_helpers_1 = require("./runfile_helpers");
function loadTestFiles(files) {
    const fs = (0, file_system_1.getFileSystem)();
    files.forEach((file) => {
        fs.ensureDir(fs.dirname(file.name));
        fs.writeFile(file.name, file.contents);
    });
}
/**
 * A folder that is lazily loaded upon first access and then cached.
 */
class CachedFolder {
    constructor(loader) {
        this.loader = loader;
        this.folder = null;
    }
    get() {
        if (this.folder === null) {
            this.folder = this.loader();
        }
        return this.folder;
    }
}
const typescriptFolder = new CachedFolder(() => loadFolder((0, runfile_helpers_1.resolveFromRunfiles)('npm/node_modules/typescript')));
const angularFolder = new CachedFolder(loadAngularFolder);
const rxjsFolder = new CachedFolder(() => loadFolder((0, runfile_helpers_1.resolveFromRunfiles)('npm/node_modules/rxjs')));
function loadStandardTestFiles({ fakeCommon = false, rxjs = false, } = {}) {
    const tmpFs = new testing_1.MockFileSystemPosix(true);
    const basePath = '/';
    tmpFs.mount(tmpFs.resolve('/node_modules/typescript'), typescriptFolder.get());
    tmpFs.mount(tmpFs.resolve('/node_modules/@angular'), angularFolder.get());
    loadTsLib(tmpFs, basePath);
    // TODO: Consider removing.
    if (fakeCommon) {
        loadFakeCommon(tmpFs, basePath);
    }
    if (rxjs) {
        tmpFs.mount(tmpFs.resolve('/node_modules/rxjs'), rxjsFolder.get());
    }
    return tmpFs.dump();
}
function loadTsLib(fs, basePath = '/') {
    loadTestDirectory(fs, (0, runfile_helpers_1.resolveFromRunfiles)('npm/node_modules/tslib'), fs.resolve(basePath, 'node_modules/tslib'));
}
function loadFakeCommon(fs, basePath = '/') {
    loadTestDirectory(fs, (0, runfile_helpers_1.resolveFromRunfiles)('angular/packages/compiler-cli/src/ngtsc/testing/fake_common/npm_package'), fs.resolve(basePath, 'node_modules/@angular/common'));
}
function loadAngularCore(fs, basePath = '/') {
    loadTestDirectory(fs, (0, runfile_helpers_1.resolveFromRunfiles)('angular/packages/core/npm_package'), fs.resolve(basePath, 'node_modules/@angular/core'));
}
function loadFolder(path) {
    const tmpFs = new testing_1.MockFileSystemPosix(true);
    // Note that we intentionally pass the native `path`, without resolving it through the file
    // system, because the mock posix file system may break paths coming from a non-posix system.
    loadTestDirectory(tmpFs, path, tmpFs.resolve('/'));
    return tmpFs.dump();
}
function loadAngularFolder() {
    const tmpFs = new testing_1.MockFileSystemPosix(true);
    (0, runfile_helpers_1.getAngularPackagesFromRunfiles)().forEach(({ name, pkgPath }) => {
        loadTestDirectory(tmpFs, pkgPath, tmpFs.resolve(name));
    });
    return tmpFs.dump();
}
/**
 * Load real files from the real file-system into a mock file-system.
 *
 * Note that this function contains a mix of `FileSystem` calls and NodeJS `fs` calls.
 * This is because the function is a bridge between the "real" file-system (via `fs`) and the "mock"
 * file-system (via `FileSystem`).
 *
 * @param fs the file-system where the directory is to be loaded.
 * @param directoryPath the path to the directory we want to load.
 * @param mockPath the path within the mock file-system where the directory is to be loaded.
 */
function loadTestDirectory(fs, directoryPath, mockPath) {
    (0, fs_1.readdirSync)(directoryPath).forEach((item) => {
        const srcPath = (0, path_1.resolve)(directoryPath, item);
        const targetPath = fs.resolve(mockPath, item);
        try {
            if ((0, fs_1.statSync)(srcPath).isDirectory()) {
                fs.ensureDir(targetPath);
                loadTestDirectory(fs, srcPath, targetPath);
            }
            else {
                fs.ensureDir(fs.dirname(targetPath));
                fs.writeFile(targetPath, (0, fs_1.readFileSync)(srcPath, 'utf-8'));
            }
        }
        catch (e) {
            console.warn(`Failed to add ${srcPath} to the mock file-system: ${e.message}`);
        }
    });
}
