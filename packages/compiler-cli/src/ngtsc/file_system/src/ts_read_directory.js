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
exports.createFileSystemTsReadDirectoryFn = createFileSystemTsReadDirectoryFn;
// We use TypeScript's native `ts.matchFiles` utility for the virtual file systems
// and their TypeScript compiler host `readDirectory` implementation. TypeScript's
// function implements complex logic for matching files with respect to root
// directory, extensions, excludes, includes etc. The function is currently
// internal but we can use it as the API most likely will not change any time soon,
// nor does it seem like this is being made public any time soon.
// Related issue for tracking: https://github.com/microsoft/TypeScript/issues/13793.
const typescript_1 = __importDefault(require("typescript"));
/**
 * Creates a {@link ts.CompilerHost#readDirectory} implementation function,
 * that leverages the specified file system (that may be e.g. virtual).
 */
function createFileSystemTsReadDirectoryFn(fs) {
    if (typescript_1.default.matchFiles === undefined) {
        throw Error('Unable to read directory in configured file system. This means that ' +
            'TypeScript changed its file matching internals.\n\nPlease consider downgrading your ' +
            'TypeScript version, and report an issue in the Angular framework repository.');
    }
    const matchFilesFn = typescript_1.default.matchFiles.bind(typescript_1.default);
    return (rootDir, extensions, excludes, includes, depth) => {
        const directoryExists = (p) => {
            const resolvedPath = fs.resolve(p);
            return fs.exists(resolvedPath) && fs.stat(resolvedPath).isDirectory();
        };
        return matchFilesFn(rootDir, extensions, excludes, includes, fs.isCaseSensitive(), fs.pwd(), depth, (p) => {
            var _a;
            const resolvedPath = fs.resolve(p);
            // TS also gracefully returns an empty file set.
            if (!directoryExists(resolvedPath)) {
                return { directories: [], files: [] };
            }
            const children = fs.readdir(resolvedPath);
            const files = [];
            const directories = [];
            for (const child of children) {
                if ((_a = fs.stat(fs.join(resolvedPath, child))) === null || _a === void 0 ? void 0 : _a.isDirectory()) {
                    directories.push(child);
                }
                else {
                    files.push(child);
                }
            }
            return { files, directories };
        }, (p) => fs.resolve(p), (p) => directoryExists(p));
    };
}
