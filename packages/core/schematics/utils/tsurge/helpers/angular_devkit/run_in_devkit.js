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
exports.MigrationStage = void 0;
exports.runMigrationInDevkit = runMigrationInDevkit;
const compiler_cli_1 = require("@angular/compiler-cli");
const schematics_1 = require("@angular-devkit/schematics");
const devkit_filesystem_1 = require("./devkit_filesystem");
const group_replacements_1 = require("../group_replacements");
const combine_units_1 = require("../combine_units");
const migration_1 = require("../../migration");
const project_tsconfig_paths_1 = require("../../../../utils/project_tsconfig_paths");
var MigrationStage;
(function (MigrationStage) {
    /** The migration is analyzing an entrypoint */
    MigrationStage[MigrationStage["Analysis"] = 0] = "Analysis";
    /** The migration is about to migrate an entrypoint */
    MigrationStage[MigrationStage["Migrate"] = 1] = "Migrate";
})(MigrationStage || (exports.MigrationStage = MigrationStage = {}));
/** Runs a Tsurge within an Angular Devkit context. */
function runMigrationInDevkit(config) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const { buildPaths, testPaths } = yield (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(config.tree);
        if (!buildPaths.length && !testPaths.length) {
            throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot run the migration.');
        }
        const tsconfigPaths = [...buildPaths, ...testPaths];
        const fs = new devkit_filesystem_1.DevkitMigrationFilesystem(config.tree);
        (0, compiler_cli_1.setFileSystem)(fs);
        const migration = config.getMigration(fs);
        const unitResults = [];
        const isFunnelMigration = migration instanceof migration_1.TsurgeFunnelMigration;
        for (const tsconfigPath of tsconfigPaths) {
            (_a = config.beforeProgramCreation) === null || _a === void 0 ? void 0 : _a.call(config, tsconfigPath, MigrationStage.Analysis);
            const baseInfo = migration.createProgram(tsconfigPath, fs);
            const info = migration.prepareProgram(baseInfo);
            (_b = config.afterProgramCreation) === null || _b === void 0 ? void 0 : _b.call(config, info, fs, MigrationStage.Analysis);
            (_c = config.beforeUnitAnalysis) === null || _c === void 0 ? void 0 : _c.call(config, tsconfigPath);
            unitResults.push(yield migration.analyze(info));
        }
        (_d = config.afterAllAnalyzed) === null || _d === void 0 ? void 0 : _d.call(config);
        const combined = yield (0, combine_units_1.synchronouslyCombineUnitData)(migration, unitResults);
        if (combined === null) {
            (_e = config.afterAnalysisFailure) === null || _e === void 0 ? void 0 : _e.call(config);
            return;
        }
        const globalMeta = yield migration.globalMeta(combined);
        let replacements;
        if (isFunnelMigration) {
            replacements = (yield migration.migrate(globalMeta)).replacements;
        }
        else {
            replacements = [];
            for (const tsconfigPath of tsconfigPaths) {
                (_f = config.beforeProgramCreation) === null || _f === void 0 ? void 0 : _f.call(config, tsconfigPath, MigrationStage.Migrate);
                const baseInfo = migration.createProgram(tsconfigPath, fs);
                const info = migration.prepareProgram(baseInfo);
                (_g = config.afterProgramCreation) === null || _g === void 0 ? void 0 : _g.call(config, info, fs, MigrationStage.Migrate);
                const result = yield migration.migrate(globalMeta, info);
                replacements.push(...result.replacements);
            }
        }
        const replacementsPerFile = new Map();
        const changesPerFile = (0, group_replacements_1.groupReplacementsByFile)(replacements);
        for (const [file, changes] of changesPerFile) {
            if (!replacementsPerFile.has(file)) {
                replacementsPerFile.set(file, changes);
            }
        }
        for (const [file, changes] of replacementsPerFile) {
            const recorder = config.tree.beginUpdate(file);
            for (const c of changes) {
                recorder
                    .remove(c.data.position, c.data.end - c.data.position)
                    .insertRight(c.data.position, c.data.toInsert);
            }
            config.tree.commitUpdate(recorder);
        }
        (_h = config.whenDone) === null || _h === void 0 ? void 0 : _h.call(config, yield migration.stats(globalMeta));
    });
}
