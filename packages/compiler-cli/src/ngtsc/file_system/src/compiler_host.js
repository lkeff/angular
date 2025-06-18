"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgtscCompilerHost = void 0;
/// <reference types="node" />
const os = __importStar(require("os"));
const typescript_1 = __importDefault(require("typescript"));
const helpers_1 = require("./helpers");
class NgtscCompilerHost {
    constructor(fs, options = {}) {
        this.fs = fs;
        this.options = options;
    }
    getSourceFile(fileName, languageVersion) {
        const text = this.readFile(fileName);
        return text !== undefined
            ? typescript_1.default.createSourceFile(fileName, text, languageVersion, true)
            : undefined;
    }
    getDefaultLibFileName(options) {
        return this.fs.join(this.getDefaultLibLocation(), typescript_1.default.getDefaultLibFileName(options));
    }
    getDefaultLibLocation() {
        return this.fs.getDefaultLibLocation();
    }
    writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles) {
        const path = (0, helpers_1.absoluteFrom)(fileName);
        this.fs.ensureDir(this.fs.dirname(path));
        this.fs.writeFile(path, data);
    }
    getCurrentDirectory() {
        return this.fs.pwd();
    }
    getCanonicalFileName(fileName) {
        return this.useCaseSensitiveFileNames() ? fileName : fileName.toLowerCase();
    }
    useCaseSensitiveFileNames() {
        return this.fs.isCaseSensitive();
    }
    getNewLine() {
        switch (this.options.newLine) {
            case typescript_1.default.NewLineKind.CarriageReturnLineFeed:
                return '\r\n';
            case typescript_1.default.NewLineKind.LineFeed:
                return '\n';
            default:
                return os.EOL;
        }
    }
    fileExists(fileName) {
        const absPath = this.fs.resolve(fileName);
        return this.fs.exists(absPath) && this.fs.stat(absPath).isFile();
    }
    readFile(fileName) {
        const absPath = this.fs.resolve(fileName);
        if (!this.fileExists(absPath)) {
            return undefined;
        }
        return this.fs.readFile(absPath);
    }
    realpath(path) {
        return this.fs.realpath(this.fs.resolve(path));
    }
}
exports.NgtscCompilerHost = NgtscCompilerHost;
