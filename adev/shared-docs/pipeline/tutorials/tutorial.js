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
const path_1 = require("path");
const fs_1 = require("fs");
const utils_1 = require("./utils");
const metadata_1 = require("./metadata");
const source_code_1 = require("./source-code");
const routes_1 = require("./routes");
/**
 * Generates the files for the provided tutorial directory.
 *
 * Creates a routes file for the tutorial, and metadata and soure-code files for
 * each of the tutorial steps.
 */
function generateTutorialFiles(tutorialDir, commonDir, outputDir) {
    return __awaiter(this, void 0, void 0, function* () {
        /** All files available in the tutorial entries. */
        const files = {};
        /** List of configs for each step in the tutorial. */
        const stepConfigs = yield (0, utils_1.findAllConfigs)((0, path_1.join)(tutorialDir, 'steps'));
        /** Directory of the intro. */
        const introDir = (0, path_1.join)(tutorialDir, 'intro');
        /** The configuration for the intro (landing page) of the tutorial. */
        const introConfig = yield (0, utils_1.findConfig)(introDir);
        /** The name of the tutorial, as determined by the tutorial directory name. */
        const tutorialName = (0, path_1.basename)(tutorialDir);
        // Add all of the files from the common directory into the files record
        yield (0, utils_1.addDirectoryToFilesRecord)(files, commonDir);
        // If the tutorial directory provides additional common files, add them to the files record.
        const commonTutorialDir = (0, path_1.join)(tutorialDir, 'common');
        if ((0, fs_1.existsSync)(commonTutorialDir)) {
            yield (0, utils_1.addDirectoryToFilesRecord)(files, commonTutorialDir);
        }
        /** Duplication of the common shared files to add the tutorial intro files in. */
        const introFiles = Object.assign({}, files);
        yield (0, utils_1.addDirectoryToFilesRecord)(introFiles, introDir);
        // Ensure the directory for the tutorial exists, then write the metadata and source-code
        // files for the intro.
        (0, fs_1.mkdirSync)((0, path_1.join)(outputDir), { recursive: true });
        (0, fs_1.writeFileSync)((0, path_1.join)(outputDir, 'metadata.json'), JSON.stringify(yield (0, metadata_1.generateMetadata)(introDir, introConfig, introFiles)));
        (0, fs_1.writeFileSync)((0, path_1.join)(outputDir, 'source-code.json'), JSON.stringify(yield (0, source_code_1.generateSourceCode)(introConfig, introFiles)));
        // For each tutorial step, generate the metadata and source-code files.
        for (const [path, config] of Object.entries(stepConfigs)) {
            /** Duplication of the common shared files to add the tutorial step files in. */
            const itemFiles = Object.assign({}, files);
            /** Directory of the current step. */
            const stepDir = (0, path_1.join)(tutorialDir, 'steps', path);
            yield (0, utils_1.addDirectoryToFilesRecord)(itemFiles, stepDir);
            // Ensure the directory for the tutorial step exists, then write the metadata
            // and source-code files.
            (0, fs_1.mkdirSync)((0, path_1.join)(outputDir, path), { recursive: true });
            (0, fs_1.writeFileSync)((0, path_1.join)(outputDir, path, 'metadata.json'), JSON.stringify(yield (0, metadata_1.generateMetadata)(stepDir, config, itemFiles)));
            (0, fs_1.writeFileSync)((0, path_1.join)(outputDir, path, 'source-code.json'), JSON.stringify(yield (0, source_code_1.generateSourceCode)(config, itemFiles)));
        }
        // Generate the tutorial routes, and write the file.
        (0, fs_1.writeFileSync)((0, path_1.join)(outputDir, 'routes.json'), JSON.stringify(yield (0, routes_1.generateTutorialRoutes)(tutorialName, introConfig, stepConfigs)));
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const [tutorialDir, commonDir, outputDir] = process.argv.slice(2);
    yield generateTutorialFiles(tutorialDir, commonDir, outputDir);
}))();
