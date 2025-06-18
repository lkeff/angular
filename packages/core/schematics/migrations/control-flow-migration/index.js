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
const compiler_host_1 = require("../../utils/typescript/compiler_host");
const migration_1 = require("./migration");
const util_1 = require("./util");
const project_tsconfig_paths_1 = require("../../utils/project_tsconfig_paths");
function migrate() {
    return (tree, context) => __awaiter(this, void 0, void 0, function* () {
        const { buildPaths, testPaths } = yield (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree);
        const basePath = process.cwd();
        const allPaths = [...buildPaths, ...testPaths];
        if (!allPaths.length) {
            throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot run the http providers migration.');
        }
        let errors = [];
        for (const tsconfigPath of allPaths) {
            const migrateErrors = runControlFlowMigration(tree, tsconfigPath, basePath);
            errors = [...errors, ...migrateErrors];
        }
        if (errors.length > 0) {
            context.logger.warn(`WARNING: ${errors.length} errors occurred during your migration:\n`);
            errors.forEach((err) => {
                context.logger.warn(err);
            });
        }
    });
}
function runControlFlowMigration(tree, tsconfigPath, basePath) {
    const program = (0, compiler_host_1.createMigrationProgram)(tree, tsconfigPath, basePath);
    const sourceFiles = program
        .getSourceFiles()
        .filter((sourceFile) => (0, compiler_host_1.canMigrateFile)(basePath, sourceFile, program));
    const analysis = new Map();
    const migrateErrors = new Map();
    for (const sourceFile of sourceFiles) {
        (0, util_1.analyze)(sourceFile, analysis);
    }
    // sort files with .html files first
    // this ensures class files know if it's safe to remove CommonModule
    const paths = sortFilePaths([...analysis.keys()]);
    for (const path of paths) {
        const file = analysis.get(path);
        const ranges = file.getSortedRanges();
        const relativePath = (0, path_1.relative)(basePath, path);
        const content = tree.readText(relativePath);
        const update = tree.beginUpdate(relativePath);
        for (const { start, end, node, type } of ranges) {
            const template = content.slice(start, end);
            const length = (end !== null && end !== void 0 ? end : content.length) - start;
            const { migrated, errors } = (0, migration_1.migrateTemplate)(template, type, node, file, true, analysis);
            if (migrated !== null) {
                update.remove(start, length);
                update.insertLeft(start, migrated);
            }
            if (errors.length > 0) {
                migrateErrors.set(path, errors);
            }
        }
        tree.commitUpdate(update);
    }
    const errorList = [];
    for (let [template, errors] of migrateErrors) {
        errorList.push(generateErrorMessage(template, errors));
    }
    return errorList;
}
function sortFilePaths(names) {
    names.sort((a, _) => (a.endsWith('.html') ? -1 : 0));
    return names;
}
function generateErrorMessage(path, errors) {
    let errorMessage = `Template "${path}" encountered ${errors.length} errors during migration:\n`;
    errorMessage += errors.map((e) => ` - ${e.type}: ${e.error}\n`);
    return errorMessage;
}
