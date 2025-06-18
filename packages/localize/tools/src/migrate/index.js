"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateFiles = migrateFiles;
const localize_1 = require("@angular/compiler-cli/private/localize");
const migrate_1 = require("./migrate");
/** Migrates the legacy message IDs based on the passed in configuration. */
function migrateFiles({ rootPath, translationFilePaths, mappingFilePath, logger, }) {
    const fs = (0, localize_1.getFileSystem)();
    const absoluteMappingPath = fs.resolve(rootPath, mappingFilePath);
    const mapping = JSON.parse(fs.readFile(absoluteMappingPath));
    if (Object.keys(mapping).length === 0) {
        logger.warn(`Mapping file at ${absoluteMappingPath} is empty. Either there are no messages ` +
            `that need to be migrated, or the extraction step failed to find them.`);
    }
    else {
        translationFilePaths.forEach((path) => {
            const absolutePath = fs.resolve(rootPath, path);
            const sourceCode = fs.readFile(absolutePath);
            fs.writeFile(absolutePath, (0, migrate_1.migrateFile)(sourceCode, mapping));
        });
    }
}
