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
exports.migrate = migrate;
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const change_tracker_1 = require("../../utils/change_tracker");
const compiler_host_1 = require("../../utils/typescript/compiler_host");
const migration_1 = require("./migration");
function migrate(options) {
    return (tree) => __awaiter(this, void 0, void 0, function* () {
        const basePath = process.cwd();
        const pathToMigrate = (0, change_tracker_1.normalizePath)((0, path_1.join)(basePath, options.path));
        let allPaths = [];
        if (pathToMigrate.trim() !== '') {
            allPaths.push(pathToMigrate);
        }
        if (!allPaths.length) {
            throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot run the inject migration.');
        }
        for (const tsconfigPath of allPaths) {
            runInjectMigration(tree, tsconfigPath, basePath, pathToMigrate, options);
        }
    });
}
function runInjectMigration(tree, tsconfigPath, basePath, pathToMigrate, schematicOptions) {
    if (schematicOptions.path.startsWith('..')) {
        throw new schematics_1.SchematicsException('Cannot run inject migration outside of the current project.');
    }
    const program = (0, compiler_host_1.createMigrationProgram)(tree, tsconfigPath, basePath);
    const sourceFiles = program
        .getSourceFiles()
        .filter((sourceFile) => sourceFile.fileName.startsWith(pathToMigrate) &&
        (0, compiler_host_1.canMigrateFile)(basePath, sourceFile, program));
    if (sourceFiles.length === 0) {
        throw new schematics_1.SchematicsException(`Could not find any files to migrate under the path ${pathToMigrate}. Cannot run the inject migration.`);
    }
    for (const sourceFile of sourceFiles) {
        const changes = (0, migration_1.migrateFile)(sourceFile, schematicOptions);
        if (changes.length > 0) {
            const update = tree.beginUpdate((0, path_1.relative)(basePath, sourceFile.fileName));
            for (const change of changes) {
                if (change.removeLength != null) {
                    update.remove(change.start, change.removeLength);
                }
                update.insertRight(change.start, change.text);
            }
            tree.commitUpdate(update);
        }
    }
}
