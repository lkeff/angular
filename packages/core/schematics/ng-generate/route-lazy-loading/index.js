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
const fs_1 = require("fs");
const path_1 = require("path");
const change_tracker_1 = require("../../utils/change_tracker");
const project_tsconfig_paths_1 = require("../../utils/project_tsconfig_paths");
const compiler_host_1 = require("../../utils/typescript/compiler_host");
const to_lazy_routes_1 = require("./to-lazy-routes");
function migrate(options) {
    return (tree, context) => __awaiter(this, void 0, void 0, function* () {
        const { buildPaths } = yield (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree);
        const basePath = process.cwd();
        // TS and Schematic use paths in POSIX format even on Windows. This is needed as otherwise
        // string matching such as `sourceFile.fileName.startsWith(pathToMigrate)` might not work.
        const pathToMigrate = (0, change_tracker_1.normalizePath)((0, path_1.join)(basePath, options.path));
        if (!buildPaths.length) {
            throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot run the route lazy loading migration.');
        }
        let migratedRoutes = [];
        let skippedRoutes = [];
        for (const tsconfigPath of buildPaths) {
            const { migratedRoutes: migrated, skippedRoutes: skipped } = standaloneRoutesMigration(tree, tsconfigPath, basePath, pathToMigrate, options);
            migratedRoutes.push(...migrated);
            skippedRoutes.push(...skipped);
        }
        if (migratedRoutes.length === 0 && skippedRoutes.length === 0) {
            throw new schematics_1.SchematicsException(`Could not find any files to migrate under the path ${pathToMigrate}.`);
        }
        context.logger.info('🎉 Automated migration step has finished! 🎉');
        context.logger.info(`Number of updated routes: ${migratedRoutes.length}`);
        context.logger.info(`Number of skipped routes: ${skippedRoutes.length}`);
        if (skippedRoutes.length > 0) {
            context.logger.info(`Note: this migration was unable to optimize the following routes, since they use components declared in NgModules:`);
            for (const route of skippedRoutes) {
                context.logger.info(`- \`${route.path}\` path at \`${route.file}\``);
            }
            context.logger.info(`Consider making those components standalone and run this migration again. More information about standalone migration can be found at https://angular.dev/reference/migrations/standalone`);
        }
        context.logger.info('IMPORTANT! Please verify manually that your application builds and behaves as expected.');
        context.logger.info(`See https://angular.dev/reference/migrations/route-lazy-loading for more information.`);
    });
}
function standaloneRoutesMigration(tree, tsconfigPath, basePath, pathToMigrate, schematicOptions) {
    if (schematicOptions.path.startsWith('..')) {
        throw new schematics_1.SchematicsException('Cannot run route lazy loading migration outside of the current project.');
    }
    if ((0, fs_1.existsSync)(pathToMigrate) && !(0, fs_1.statSync)(pathToMigrate).isDirectory()) {
        throw new schematics_1.SchematicsException(`Migration path ${pathToMigrate} has to be a directory. Cannot run the route lazy loading migration.`);
    }
    const program = (0, compiler_host_1.createMigrationProgram)(tree, tsconfigPath, basePath);
    const sourceFiles = program
        .getSourceFiles()
        .filter((sourceFile) => sourceFile.fileName.startsWith(pathToMigrate) &&
        (0, compiler_host_1.canMigrateFile)(basePath, sourceFile, program));
    const migratedRoutes = [];
    const skippedRoutes = [];
    if (sourceFiles.length === 0) {
        return { migratedRoutes, skippedRoutes };
    }
    for (const sourceFile of sourceFiles) {
        const { pendingChanges, skippedRoutes: skipped, migratedRoutes: migrated, } = (0, to_lazy_routes_1.migrateFileToLazyRoutes)(sourceFile, program);
        skippedRoutes.push(...skipped);
        migratedRoutes.push(...migrated);
        const update = tree.beginUpdate((0, path_1.relative)(basePath, sourceFile.fileName));
        pendingChanges.forEach((change) => {
            if (change.removeLength != null) {
                update.remove(change.start, change.removeLength);
            }
            update.insertRight(change.start, change.text);
        });
        tree.commitUpdate(update);
    }
    return { migratedRoutes, skippedRoutes };
}
