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
exports.generateMetadata = generateMetadata;
const path_1 = require("path");
const tinyglobby_1 = require("tinyglobby");
const utils_1 = require("./utils");
/** Generate the metadata.json content for a provided tutorial config. */
function generateMetadata(path, config, files) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const tutorialFiles = {};
        const { dependencies, devDependencies } = JSON.parse(files['package.json']);
        (_a = config.openFiles) === null || _a === void 0 ? void 0 : _a.forEach((file) => (tutorialFiles[file] = files[file]));
        return {
            type: config.type,
            openFiles: config.openFiles || [],
            allFiles: Object.keys(files),
            tutorialFiles,
            answerFiles: yield getAnswerFiles(path, config, files),
            hiddenFiles: config.openFiles
                ? Object.keys(files).filter((filename) => !config.openFiles.includes(filename))
                : [],
            dependencies: Object.assign(Object.assign({}, dependencies), devDependencies),
        };
    });
}
/** Generate the answer files for the metadata.json. */
function getAnswerFiles(path, config, files) {
    return __awaiter(this, void 0, void 0, function* () {
        const answerFiles = {};
        const answerPrefix = /answer[\\/]/;
        if (config.answerSrc) {
            const answersDir = (0, path_1.join)(path, config.answerSrc);
            const answerFilePaths = yield (0, tinyglobby_1.glob)('**/*', {
                cwd: answersDir,
                onlyFiles: true,
                absolute: false,
            });
            for (const answerFile of answerFilePaths) {
                // We use the absolute file in order to read the content, but the key
                // needs to be a relative path within the project.
                answerFiles[answerFile] = (0, utils_1.getFileContents)((0, path_1.join)(answersDir, answerFile));
            }
        }
        else {
            for (const file of Object.keys(files)) {
                if (answerPrefix.test(file)) {
                    answerFiles[file.replace(answerPrefix, '')] = files[file];
                }
            }
        }
        return answerFiles;
    });
}
