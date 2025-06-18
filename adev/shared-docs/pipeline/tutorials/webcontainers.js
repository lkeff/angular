"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileSystemTree = getFileSystemTree;
exports.shouldUseFileInWebContainer = shouldUseFileInWebContainer;
const path_1 = require("path");
/**
 * Create a WebContainer's FileSystemTree from a list of files and its contents
 */
function getFileSystemTree(files, filesContents) {
    const fileSystemTree = {};
    for (let filepath of files) {
        const dir = (0, path_1.dirname)(filepath);
        const filename = (0, path_1.basename)(filepath);
        if (dir === '.') {
            const fileNode = { file: { contents: filesContents[filepath] } };
            fileSystemTree[filename] = fileNode;
        }
        else {
            const dirParts = dir.split('/');
            buildFileSystemTree(fileSystemTree, dirParts, filename, filesContents[filepath]);
        }
    }
    return fileSystemTree;
}
/**
 * Builds a WebContainer's file system tree object recursively, mutating the
 * `fileSystemTree` parameter.
 *
 * @see https://webcontainers.io/api#filesystemtree
 */
function buildFileSystemTree(fileSystemTree, fileDirectories, filename, fileContents) {
    if (fileDirectories.length === 1) {
        const directory = fileDirectories[0];
        const fileNode = { file: { contents: fileContents } };
        fileSystemTree[directory] = Object.assign(Object.assign({}, fileSystemTree[directory]), { directory: Object.assign(Object.assign({}, (fileSystemTree[directory]
                ? fileSystemTree[directory].directory
                : undefined)), { [filename]: fileNode }) });
        return;
    }
    const nextDirectory = fileDirectories.shift();
    if (!nextDirectory)
        return;
    if (!fileSystemTree[nextDirectory]) {
        fileSystemTree[nextDirectory] = { directory: {} };
    }
    buildFileSystemTree(fileSystemTree[nextDirectory].directory, fileDirectories, filename, fileContents);
}
function shouldUseFileInWebContainer(filename) {
    return ['.md', '.png', '.jpg'].includes((0, path_1.extname)(filename)) === false;
}
