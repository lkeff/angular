"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY_FILE_CONTENT = void 0;
exports.updateOrCreateFile = updateOrCreateFile;
exports.updateFile = updateFile;
exports.createFile = createFile;
exports.fileExists = fileExists;
exports.normalizeFileContent = normalizeFileContent;
exports.normalizeFileName = normalizeFileName;
// Note: use a comment in empty files to avoid error in vfs
// See: https://github.com/microsoft/TypeScript-Website/issues/2713
exports.EMPTY_FILE_CONTENT = '// empty file';
function updateOrCreateFile(env, file, content) {
    if (fileExists(env, file)) {
        updateFile(env, file, content);
    }
    else {
        createFile(env, file, content);
    }
}
function updateFile(env, file, content) {
    env.updateFile(normalizeFileName(file), normalizeFileContent(content));
}
function createFile(env, file, content) {
    env.createFile(normalizeFileName(file), normalizeFileContent(content));
}
function fileExists(env, fileName) {
    return env.sys.fileExists(normalizeFileName(fileName));
}
function normalizeFileContent(content) {
    return content || exports.EMPTY_FILE_CONTENT;
}
function normalizeFileName(filename) {
    return filename.startsWith('/') ? filename : `/${filename}`;
}
