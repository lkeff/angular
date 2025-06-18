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
exports.generateZipExample = generateZipExample;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const file_system_1 = require("../shared/file-system");
const tinyglobby_1 = require("tinyglobby");
const region_parser_1 = require("../../guides/extensions/docs-code/regions/region-parser");
const copyright_1 = require("../shared/copyright");
const defaults_1 = require("./defaults");
const fflate_1 = require("fflate");
function generateZipExample(exampleDir, workingDir, templateDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = yield (0, promises_1.readFile)((0, path_1.join)(exampleDir, defaults_1.CONFIG_FILENAME), 'utf-8');
        const stackblitzConfig = JSON.parse(config);
        yield (0, file_system_1.createFolder)(workingDir);
        // Copy template files to TEMP folder
        yield (0, file_system_1.copyFolder)(templateDir, workingDir);
        // Copy example files to TEMP folder
        yield (0, file_system_1.copyFolder)(exampleDir, workingDir);
        const includedPaths = yield getIncludedPaths(workingDir, stackblitzConfig);
        const filesObj = {};
        for (const path of includedPaths) {
            const file = yield getFileAndContent(workingDir, path);
            filesObj[file.path] = typeof file.content === 'string' ? (0, fflate_1.strToU8)(file.content) : file.content;
        }
        return new Promise((resolve, reject) => {
            (0, fflate_1.zip)(filesObj, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    });
}
function getIncludedPaths(workingDir, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultIncludes = [
            '**/*.ts',
            '**/*.js',
            '**/*.css',
            '**/*.html',
            '**/*.md',
            '**/*.json',
            '**/*.svg',
        ];
        return (0, tinyglobby_1.glob)(defaultIncludes, {
            cwd: workingDir,
            onlyFiles: true,
            dot: true,
            ignore: config.ignore,
        });
    });
}
function getFileAndContent(workingDir, path) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = yield (0, promises_1.readFile)((0, path_1.join)(workingDir, path), 'utf-8');
        content = (0, copyright_1.appendCopyrightToFile)(path, content);
        content = extractRegions(path, content);
        return { content, path };
    });
}
function createPostData(exampleDir, config, exampleFilePaths) {
    return __awaiter(this, void 0, void 0, function* () {
        const postData = {};
        for (const filePath of exampleFilePaths) {
            if (defaults_1.EXCLUDE_FILES.some((excludedFile) => filePath.endsWith(excludedFile))) {
                continue;
            }
            let content = yield (0, promises_1.readFile)((0, path_1.join)(exampleDir, filePath), 'utf-8');
            content = (0, copyright_1.appendCopyrightToFile)(filePath, content);
            content = extractRegions(filePath, content);
            postData[`project[files][${filePath}]`] = content;
        }
        return postData;
    });
}
function extractRegions(path, contents) {
    const fileType = path === null || path === void 0 ? void 0 : path.split('.').pop();
    const regionParserResult = (0, region_parser_1.regionParser)(contents, fileType);
    return regionParserResult.contents;
}
