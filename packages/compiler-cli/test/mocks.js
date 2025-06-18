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
exports.MockCompilerHost = exports.MockAotContext = void 0;
const typescript_1 = __importDefault(require("typescript"));
class MockAotContext {
    constructor(currentDirectory, ...files) {
        this.currentDirectory = currentDirectory;
        this.files = files;
    }
    fileExists(fileName) {
        return typeof this.getEntry(fileName) === 'string';
    }
    directoryExists(path) {
        return path === this.currentDirectory || typeof this.getEntry(path) === 'object';
    }
    readFile(fileName) {
        const data = this.getEntry(fileName);
        if (typeof data === 'string') {
            return data;
        }
        return undefined;
    }
    readResource(fileName) {
        const result = this.readFile(fileName);
        if (result == null) {
            return Promise.reject(new Error(`Resource not found: ${fileName}`));
        }
        return Promise.resolve(result);
    }
    writeFile(fileName, data) {
        const parts = fileName.split('/');
        const name = parts.pop();
        const entry = this.getEntry(parts);
        if (entry && typeof entry !== 'string') {
            entry[name] = data;
        }
    }
    assumeFileExists(fileName) {
        this.writeFile(fileName, '');
    }
    getEntry(fileName) {
        let parts = typeof fileName === 'string' ? fileName.split('/') : fileName;
        if (parts[0]) {
            parts = this.currentDirectory.split('/').concat(parts);
        }
        parts.shift();
        parts = normalize(parts);
        return first(this.files, (files) => getEntryFromFiles(parts, files));
    }
    getDirectories(path) {
        const dir = this.getEntry(path);
        if (typeof dir !== 'object') {
            return [];
        }
        else {
            return Object.keys(dir).filter((key) => typeof dir[key] === 'object');
        }
    }
    override(files) {
        return new MockAotContext(this.currentDirectory, files, ...this.files);
    }
}
exports.MockAotContext = MockAotContext;
function first(a, cb) {
    for (const value of a) {
        const result = cb(value);
        if (result != null)
            return result;
    }
    return;
}
function getEntryFromFiles(parts, files) {
    let current = files;
    while (parts.length) {
        const part = parts.shift();
        if (typeof current === 'string') {
            return undefined;
        }
        const next = current[part];
        if (next === undefined) {
            return undefined;
        }
        current = next;
    }
    return current;
}
function normalize(parts) {
    const result = [];
    while (parts.length) {
        const part = parts.shift();
        switch (part) {
            case '.':
                break;
            case '..':
                result.pop();
                break;
            default:
                result.push(part);
        }
    }
    return result;
}
class MockCompilerHost {
    constructor(context) {
        this.context = context;
        this.writeFile = (fileName, text) => {
            this.context.writeFile(fileName, text);
        };
    }
    fileExists(fileName) {
        return this.context.fileExists(fileName);
    }
    readFile(fileName) {
        return this.context.readFile(fileName);
    }
    directoryExists(directoryName) {
        return this.context.directoryExists(directoryName);
    }
    getSourceFile(fileName, languageVersion, onError) {
        const sourceText = this.context.readFile(fileName);
        if (sourceText != null) {
            return typescript_1.default.createSourceFile(fileName, sourceText, languageVersion);
        }
        else {
            return undefined;
        }
    }
    getDefaultLibFileName(options) {
        return typescript_1.default.getDefaultLibFileName(options);
    }
    getCurrentDirectory() {
        return this.context.currentDirectory;
    }
    getCanonicalFileName(fileName) {
        return fileName;
    }
    useCaseSensitiveFileNames() {
        return false;
    }
    getNewLine() {
        return '\n';
    }
    getDirectories(path) {
        return this.context.getDirectories(path);
    }
}
exports.MockCompilerHost = MockCompilerHost;
