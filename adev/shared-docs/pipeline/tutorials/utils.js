"use strict";
/**
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
exports.getFileContents = getFileContents;
exports.addDirectoryToFilesRecord = addDirectoryToFilesRecord;
exports.findAllConfigs = findAllConfigs;
exports.findConfig = findConfig;
const tinyglobby_1 = require("tinyglobby");
const path_1 = require("path");
const fs_1 = require("fs");
// See https://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files for details
// on identifying file types with initial bytes.
/** Initial bytes of the buffer(aka magic numbers) to see if it's a JPG file. */
const jpgSignature = [0xff, 0xd8, 0xff];
/** Initial bytes of the buffer(aka magic numbers) to see if it's a GIF file. */
const gifSignature = [0x47, 0x49, 0x46];
/** Initial bytes of the buffer(aka magic numbers) to see if it's a PNG file. */
const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
/** List of initial bytes to check for matching files. */
const SIGNATURES = [jpgSignature, gifSignature, pngSignature];
function getFileContents(path) {
    const fileBuffer = (0, fs_1.readFileSync)(path);
    if (checkBufferMatchForSignatures(fileBuffer)) {
        return fileBuffer;
    }
    return fileBuffer.toString();
}
/**
 * Determine if the initial bytes of a buffer matches the expected bytes.
 */
function checkBufferMatchForSignatures(buffer) {
    for (const initialByes of SIGNATURES) {
        for (const [index, byte] of initialByes.entries()) {
            if (buffer[index] !== byte)
                return false;
        }
    }
    return true;
}
/**
 * Add all files found in the provided directory into the provided object of file and contents.
 * This overwrite already existing files in the object when encountered.
 */
function addDirectoryToFilesRecord(files, dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const exampleFilePaths = yield (0, tinyglobby_1.glob)('**/*', {
            cwd: dir,
            onlyFiles: true,
        });
        for (let path of exampleFilePaths) {
            files[path] = yield getFileContents((0, path_1.join)(dir, path));
        }
    });
}
/**
 * Collect all of the config.json files in the provided directory and subdirectories.
 */
function findAllConfigs(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const configs = {};
        const paths = yield (0, tinyglobby_1.glob)('**/config.json', {
            cwd: dir,
            onlyFiles: true,
        });
        for (const path of paths) {
            const content = yield getFileContents((0, path_1.join)(dir, path));
            configs[(0, path_1.dirname)(path)] = JSON.parse(content);
        }
        return configs;
    });
}
/**
 * Collect a single of the config.json file at the provided directory.
 */
function findConfig(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const configPath = (0, path_1.join)(dir, 'config.json');
        if (!(0, fs_1.existsSync)(configPath)) {
            throw Error(`Unable config.json file found at: ${dir}`);
        }
        const content = yield getFileContents(configPath);
        return JSON.parse(content);
    });
}
