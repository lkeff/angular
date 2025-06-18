"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockServerHost = void 0;
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const typescript_1 = __importDefault(require("typescript"));
const NOOP_FILE_WATCHER = {
    close() { },
};
class MockServerHost {
    constructor(fs) {
        this.fs = fs;
    }
    get newLine() {
        return '\n';
    }
    get useCaseSensitiveFileNames() {
        return this.fs.isCaseSensitive();
    }
    readFile(path, encoding) {
        return this.fs.readFile((0, file_system_1.absoluteFrom)(path));
    }
    resolvePath(path) {
        return this.fs.resolve(path);
    }
    fileExists(path) {
        const absPath = (0, file_system_1.absoluteFrom)(path);
        return this.fs.exists(absPath) && this.fs.lstat(absPath).isFile();
    }
    directoryExists(path) {
        const absPath = (0, file_system_1.absoluteFrom)(path);
        return this.fs.exists(absPath) && this.fs.lstat(absPath).isDirectory();
    }
    createDirectory(path) {
        this.fs.ensureDir((0, file_system_1.absoluteFrom)(path));
    }
    getExecutingFilePath() {
        // This is load-bearing, as TypeScript uses the result of this call to locate the directory in
        // which it expects to find .d.ts files for the "standard libraries" - DOM, ES2015, etc.
        return '/node_modules/typescript/lib/tsserver.js';
    }
    getCurrentDirectory() {
        return '/';
    }
    createHash(data) {
        return typescript_1.default.sys.createHash(data);
    }
    get args() {
        throw new Error('Property not implemented.');
    }
    watchFile(path, callback, pollingInterval, options) {
        return NOOP_FILE_WATCHER;
    }
    watchDirectory(path, callback, recursive, options) {
        return NOOP_FILE_WATCHER;
    }
    setTimeout(callback, ms, ...args) {
        throw new Error('Method not implemented.');
    }
    clearTimeout(timeoutId) {
        throw new Error('Method not implemented.');
    }
    setImmediate(callback, ...args) {
        throw new Error('Method not implemented.');
    }
    clearImmediate(timeoutId) {
        throw new Error('Method not implemented.');
    }
    write(s) {
        throw new Error('Method not implemented.');
    }
    writeFile(path, data, writeByteOrderMark) {
        throw new Error('Method not implemented.');
    }
    getDirectories(path) {
        throw new Error('Method not implemented.');
    }
    readDirectory(path, extensions, exclude, include, depth) {
        throw new Error('Method not implemented.');
    }
    exit(exitCode) {
        throw new Error('Method not implemented.');
    }
}
exports.MockServerHost = MockServerHost;
