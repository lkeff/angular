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
exports.getCachedSourceFile = getCachedSourceFile;
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
// A cache of source files that are typically used across tests and are expensive to parse.
let sourceFileCache = new Map();
/**
 * If the `fileName` is determined to benefit from caching across tests, a parsed `ts.SourceFile`
 * is returned from a shared cache. If caching is not applicable for the requested `fileName`, then
 * `null` is returned.
 *
 * Even if a `ts.SourceFile` already exists for the given `fileName` will the contents be loaded
 * from disk, such that it can be verified whether the cached `ts.SourceFile` is identical to the
 * disk contents. If there is a difference, a new `ts.SourceFile` is parsed from the loaded contents
 * which replaces the prior cache entry.
 *
 * @param fileName the path of the file to request a source file for.
 * @param load a callback to load the contents of the file; this is even called when a cache entry
 * is available to verify that the cached `ts.SourceFile` corresponds with the contents on disk.
 */
function getCachedSourceFile(fileName, load) {
    if (!/^lib\..+\.d\.ts$/.test((0, file_system_1.basename)(fileName)) &&
        !/\/node_modules\/(@angular|rxjs)\//.test(fileName)) {
        return null;
    }
    const content = load();
    if (content === undefined) {
        return null;
    }
    if (!sourceFileCache.has(fileName) || sourceFileCache.get(fileName).text !== content) {
        const sf = typescript_1.default.createSourceFile(fileName, content, typescript_1.default.ScriptTarget.ES2015);
        sourceFileCache.set(fileName, sf);
    }
    return sourceFileCache.get(fileName);
}
