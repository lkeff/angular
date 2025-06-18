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
 * Generates the playground files for the playground directory.
 *
 * Creates a routes file for the overall playground, and metadata and soure-code files for
 * each of the plaground entries.
 */
function generatePlaygroundFiles(playgroundDir, commonDir, outputDir) {
    return __awaiter(this, void 0, void 0, function* () {
        /** All files available in the playground entries. */
        const files = {};
        /** All of the configs, one for each playground entry. */
        const configs = yield (0, utils_1.findAllConfigs)(playgroundDir);
        // Add all of the files from the common directory into the files record.
        yield (0, utils_1.addDirectoryToFilesRecord)(files, commonDir);
        // If the playground directory provides additional common files, add them to the files record.
        const commonPlaygroundDir = (0, path_1.join)(playgroundDir, 'common');
        if ((0, fs_1.existsSync)(commonPlaygroundDir)) {
            yield (0, utils_1.addDirectoryToFilesRecord)(files, commonPlaygroundDir);
        }
        // For each playground entry, generate the metadata and source-code files.
        for (const [path, config] of Object.entries(configs)) {
            /** Duplication of the common shared files to add the playground entry files in. */
            const itemFiles = Object.assign({}, files);
            /** Directory of the current config. */
            const configDir = (0, path_1.join)(playgroundDir, path);
            yield (0, utils_1.addDirectoryToFilesRecord)(itemFiles, configDir);
            // Ensure the directory for the playground entry exists, then write the metadata
            // and source-code files.
            (0, fs_1.mkdirSync)((0, path_1.join)(outputDir, path), { recursive: true });
            (0, fs_1.writeFileSync)((0, path_1.join)(outputDir, path, 'metadata.json'), JSON.stringify(yield (0, metadata_1.generateMetadata)(configDir, config, itemFiles)));
            (0, fs_1.writeFileSync)((0, path_1.join)(outputDir, path, 'source-code.json'), JSON.stringify(yield (0, source_code_1.generateSourceCode)(config, itemFiles)));
        }
        // Generate the playground routes, and write the file.
        (0, fs_1.writeFileSync)((0, path_1.join)(outputDir, 'routes.json'), JSON.stringify(yield (0, routes_1.generatePlaygroundRoutes)(configs)));
    });
}
// Immediately invoke the generation.
(() => __awaiter(void 0, void 0, void 0, function* () {
    const [playgroundDir, commonDir, outputDir] = process.argv.slice(2);
    yield generatePlaygroundFiles(playgroundDir, commonDir, outputDir);
}))();
