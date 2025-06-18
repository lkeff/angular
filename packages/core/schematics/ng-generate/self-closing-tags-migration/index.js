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
const self_closing_tags_migration_1 = require("../../migrations/self-closing-tags-migration/self-closing-tags-migration");
const angular_devkit_1 = require("../../utils/tsurge/helpers/angular_devkit");
function migrate(options) {
    return (tree, context) => __awaiter(this, void 0, void 0, function* () {
        yield (0, angular_devkit_1.runMigrationInDevkit)({
            tree,
            getMigration: (fs) => new self_closing_tags_migration_1.SelfClosingTagsMigration({
                shouldMigrate: (file) => {
                    return (file.rootRelativePath.startsWith(fs.normalize(options.path)) &&
                        !/(^|\/)node_modules\//.test(file.rootRelativePath));
                },
            }),
            beforeProgramCreation: (tsconfigPath, stage) => {
                if (stage === angular_devkit_1.MigrationStage.Analysis) {
                    context.logger.info(`Preparing analysis for: ${tsconfigPath}...`);
                }
                else {
                    context.logger.info(`Running migration for: ${tsconfigPath}...`);
                }
            },
            beforeUnitAnalysis: (tsconfigPath) => {
                context.logger.info(`Scanning for component tags: ${tsconfigPath}...`);
            },
            afterAllAnalyzed: () => {
                context.logger.info(``);
                context.logger.info(`Processing analysis data between targets...`);
                context.logger.info(``);
            },
            afterAnalysisFailure: () => {
                context.logger.error('Migration failed unexpectedly with no analysis data');
            },
            whenDone: ({ counters }) => {
                const { touchedFilesCount, replacementCount } = counters;
                context.logger.info('');
                context.logger.info(`Successfully migrated to self-closing tags 🎉`);
                context.logger.info(`  -> Migrated ${replacementCount} components to self-closing tags in ${touchedFilesCount} component files.`);
            },
        });
    });
}
