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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = migrate;
const schematics_1 = require("@angular-devkit/schematics");
const compiler_cli_1 = require("@angular/compiler-cli");
const fs_1 = require("fs");
const path_1 = require("path");
const typescript_1 = __importDefault(require("typescript"));
const change_tracker_1 = require("../../utils/change_tracker");
const project_tsconfig_paths_1 = require("../../utils/project_tsconfig_paths");
const compiler_host_1 = require("../../utils/typescript/compiler_host");
const prune_modules_1 = require("./prune-modules");
const standalone_bootstrap_1 = require("./standalone-bootstrap");
const to_standalone_1 = require("./to-standalone");
const util_1 = require("./util");
var MigrationMode;
(function (MigrationMode) {
    MigrationMode["toStandalone"] = "convert-to-standalone";
    MigrationMode["pruneModules"] = "prune-ng-modules";
    MigrationMode["standaloneBootstrap"] = "standalone-bootstrap";
})(MigrationMode || (MigrationMode = {}));
function migrate(options) {
    return (tree, context) => __awaiter(this, void 0, void 0, function* () {
        const { buildPaths, testPaths } = yield (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree);
        const basePath = process.cwd();
        const allPaths = [...buildPaths, ...testPaths];
        // TS and Schematic use paths in POSIX format even on Windows. This is needed as otherwise
        // string matching such as `sourceFile.fileName.startsWith(pathToMigrate)` might not work.
        const pathToMigrate = (0, change_tracker_1.normalizePath)((0, path_1.join)(basePath, options.path));
        let migratedFiles = 0;
        if (!allPaths.length) {
            throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot run the standalone migration.');
        }
        for (const tsconfigPath of allPaths) {
            migratedFiles += standaloneMigration(tree, tsconfigPath, basePath, pathToMigrate, options);
        }
        if (migratedFiles === 0) {
            throw new schematics_1.SchematicsException(`Could not find any files to migrate under the path ${pathToMigrate}. Cannot run the standalone migration.`);
        }
        context.logger.info('🎉 Automated migration step has finished! 🎉');
        context.logger.info('IMPORTANT! Please verify manually that your application builds and behaves as expected.');
        context.logger.info(`See https://angular.dev/reference/migrations/standalone for more information.`);
    });
}
function standaloneMigration(tree, tsconfigPath, basePath, pathToMigrate, schematicOptions, oldProgram) {
    if (schematicOptions.path.startsWith('..')) {
        throw new schematics_1.SchematicsException('Cannot run standalone migration outside of the current project.');
    }
    const { host, options, rootNames } = (0, compiler_host_1.createProgramOptions)(tree, tsconfigPath, basePath, undefined, undefined, {
        _enableTemplateTypeChecker: true, // Required for the template type checker to work.
        compileNonExportedClasses: true, // We want to migrate non-exported classes too.
        // Avoid checking libraries to speed up the migration.
        skipLibCheck: true,
        skipDefaultLibCheck: true,
    });
    const referenceLookupExcludedFiles = /node_modules|\.ngtypecheck\.ts/;
    const program = (0, compiler_cli_1.createProgram)({ rootNames, host, options, oldProgram });
    const printer = typescript_1.default.createPrinter();
    if ((0, fs_1.existsSync)(pathToMigrate) && !(0, fs_1.statSync)(pathToMigrate).isDirectory()) {
        throw new schematics_1.SchematicsException(`Migration path ${pathToMigrate} has to be a directory. Cannot run the standalone migration.`);
    }
    const sourceFiles = program
        .getTsProgram()
        .getSourceFiles()
        .filter((sourceFile) => sourceFile.fileName.startsWith(pathToMigrate) &&
        (0, compiler_host_1.canMigrateFile)(basePath, sourceFile, program.getTsProgram()));
    if (sourceFiles.length === 0) {
        return 0;
    }
    let pendingChanges;
    let filesToRemove = null;
    if (schematicOptions.mode === MigrationMode.pruneModules) {
        const result = (0, prune_modules_1.pruneNgModules)(program, host, basePath, rootNames, sourceFiles, printer, undefined, referenceLookupExcludedFiles, util_1.knownInternalAliasRemapper);
        pendingChanges = result.pendingChanges;
        filesToRemove = result.filesToRemove;
    }
    else if (schematicOptions.mode === MigrationMode.standaloneBootstrap) {
        pendingChanges = (0, standalone_bootstrap_1.toStandaloneBootstrap)(program, host, basePath, rootNames, sourceFiles, printer, undefined, referenceLookupExcludedFiles, util_1.knownInternalAliasRemapper);
    }
    else {
        // This shouldn't happen, but default to `MigrationMode.toStandalone` just in case.
        pendingChanges = (0, to_standalone_1.toStandalone)(sourceFiles, program, printer, undefined, util_1.knownInternalAliasRemapper);
    }
    for (const [file, changes] of pendingChanges.entries()) {
        // Don't attempt to edit a file if it's going to be deleted.
        if (filesToRemove === null || filesToRemove === void 0 ? void 0 : filesToRemove.has(file)) {
            continue;
        }
        const update = tree.beginUpdate((0, path_1.relative)(basePath, file.fileName));
        changes.forEach((change) => {
            if (change.removeLength != null) {
                update.remove(change.start, change.removeLength);
            }
            update.insertRight(change.start, change.text);
        });
        tree.commitUpdate(update);
    }
    if (filesToRemove) {
        for (const file of filesToRemove) {
            tree.delete((0, path_1.relative)(basePath, file.fileName));
        }
    }
    // Run the module pruning after the standalone bootstrap to automatically remove the root module.
    // Note that we can't run the module pruning internally without propagating the changes to disk,
    // because there may be conflicting AST node changes.
    if (schematicOptions.mode === MigrationMode.standaloneBootstrap) {
        return (standaloneMigration(tree, tsconfigPath, basePath, pathToMigrate, Object.assign(Object.assign({}, schematicOptions), { mode: MigrationMode.pruneModules }), program) + sourceFiles.length);
    }
    return sourceFiles.length;
}
