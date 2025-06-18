"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFolder = copyFolder;
exports.createFolder = createFolder;
exports.removeFolder = removeFolder;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
// TODO(josephperrott): Determine if we can use the fs default version of copying directories.
// TODO(josephperrott): Find a way to not require blank renaming of certain files during copying.
/** Files which must be renamed to remove the .template suffix.  */
const knownTemplateFilesForRename = [
    // package.json.template must be used as ng_package does not allow floating package.json
    // files within the npm package contents.
    'package.json.template',
];
/**
 * Recursively copy folder and contents to the destigation, creating the destination folder
 * if necessary.
 **/
function copyFolder(source, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, fs_1.existsSync)(destination)) {
            yield (0, promises_1.mkdir)(destination, { recursive: true });
        }
        const files = yield (0, promises_1.readdir)(source);
        for (const file of files) {
            // If the file/dirname starts with `TMP_` we ignore it as we use `TMP_` to start the name of
            // our temp directory. Since our temp directory is a subdirectory of the provided example,
            // we would end up copying recursively forever.
            if (file.startsWith('TMP_')) {
                continue;
            }
            const sourcePath = (0, path_1.join)(source, file);
            let destPath = (0, path_1.join)(destination, file);
            // Rename the destination file path if the file needs to be renamed.
            if (knownTemplateFilesForRename.includes(file)) {
                destPath = (0, path_1.join)(destination, file.replace(/.template$/, ''));
            }
            const stats = yield (0, promises_1.stat)(sourcePath);
            const isDirectory = yield stats.isDirectory();
            if (isDirectory) {
                yield copyFolder(sourcePath, destPath);
            }
            else {
                yield (0, promises_1.copyFile)(sourcePath, destPath);
            }
        }
    });
}
/** Create folder at the provided path if it does not already exist. */
function createFolder(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, fs_1.existsSync)(path)) {
            yield (0, promises_1.mkdir)(path, { recursive: true });
        }
    });
}
/** Remove folder at the provided path if it exists. */
function removeFolder(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, fs_1.existsSync)(path)) {
            yield (0, promises_1.rm)(path, { recursive: true });
        }
    });
}
