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
const angular_devkit_1 = require("../../utils/tsurge/helpers/angular_devkit");
const unused_imports_migration_1 = require("./unused_imports_migration");
function migrate() {
    return (tree, context) => __awaiter(this, void 0, void 0, function* () {
        yield (0, angular_devkit_1.runMigrationInDevkit)({
            getMigration: () => new unused_imports_migration_1.UnusedImportsMigration(),
            tree,
            beforeProgramCreation: (tsconfigPath, stage) => {
                if (stage === angular_devkit_1.MigrationStage.Analysis) {
                    context.logger.info(`Preparing analysis for: ${tsconfigPath}...`);
                }
                else {
                    context.logger.info(`Running migration for: ${tsconfigPath}...`);
                }
            },
            beforeUnitAnalysis: (tsconfigPath) => {
                context.logger.info(`Scanning for unused imports using ${tsconfigPath}`);
            },
            afterAnalysisFailure: () => {
                context.logger.error('Schematic failed unexpectedly with no analysis data');
            },
            whenDone: (stats) => {
                const { removedImports, changedFiles } = stats.counters;
                let statsMessage;
                if (removedImports === 0) {
                    statsMessage = 'Schematic could not find unused imports in the project';
                }
                else {
                    statsMessage =
                        `Removed ${removedImports} import${removedImports !== 1 ? 's' : ''} ` +
                            `in ${changedFiles} file${changedFiles !== 1 ? 's' : ''}`;
                }
                context.logger.info('');
                context.logger.info(statsMessage);
            },
        });
    });
}
