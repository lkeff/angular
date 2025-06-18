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
exports.applySignalQueriesRefactoring = applySignalQueriesRefactoring;
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const typescript_1 = __importDefault(require("typescript"));
const group_replacements_1 = require("@angular/core/schematics/utils/tsurge/helpers/group_replacements");
const signal_queries_migration_1 = require("@angular/core/schematics/migrations/signal-queries-migration");
const assert_1 = __importDefault(require("assert"));
const tsurge_1 = require("../../../../core/schematics/utils/tsurge");
const incompatibility_1 = require("../../../../core/schematics/migrations/signal-migration/src/passes/problematic_patterns/incompatibility");
function applySignalQueriesRefactoring(compiler, compilerOptions, config, project, reportProgress, shouldMigrateQuery, multiMode) {
    return __awaiter(this, void 0, void 0, function* () {
        reportProgress(0, 'Starting queries migration. Analyzing..');
        const fs = (0, file_system_1.getFileSystem)();
        const migration = new signal_queries_migration_1.SignalQueriesMigration(Object.assign(Object.assign({}, config), { assumeNonBatch: true, reportProgressFn: reportProgress, shouldMigrateQuery }));
        const programInfo = migration.prepareProgram({
            ngCompiler: compiler,
            program: compiler.getCurrentProgram(),
            userOptions: compilerOptions,
            programAbsoluteRootFileNames: [],
            host: {
                getCanonicalFileName: (file) => project.projectService.toCanonicalFileName(file),
                getCurrentDirectory: () => project.getCurrentDirectory(),
            },
        });
        const unitData = yield migration.analyze(programInfo);
        const globalMeta = yield migration.globalMeta(unitData);
        const { replacements, knownQueries } = yield migration.migrate(globalMeta, programInfo);
        const targetQueries = Array.from(knownQueries.knownQueryIDs.values()).filter((descriptor) => shouldMigrateQuery(descriptor, (0, tsurge_1.projectFile)(descriptor.node.getSourceFile(), programInfo)));
        if (targetQueries.length === 0) {
            return {
                edits: [],
                errorMessage: 'Unexpected error. Could not find target queries in registry.',
            };
        }
        const incompatibilityMessages = new Map();
        const incompatibilityReasons = new Set();
        for (const query of targetQueries.filter((i) => knownQueries.isFieldIncompatible(i))) {
            // TODO: Improve type safety around this.
            (0, assert_1.default)(query.node.name !== undefined && typescript_1.default.isIdentifier(query.node.name), 'Expected query to have an analyzable field name.');
            const incompatibility = knownQueries.getIncompatibilityForField(query);
            const text = knownQueries.getIncompatibilityTextForField(query);
            if (incompatibility === null || text === null) {
                return {
                    edits: [],
                    errorMessage: 'Queries could not be migrated, but no reasons were found. ' +
                        'Consider reporting a bug to the Angular team.',
                };
            }
            incompatibilityMessages.set(query.node.name.text, `${text.short}\n${text.extra}`);
            // Track field incompatibilities as those may be "ignored" via best effort mode.
            if ((0, incompatibility_1.isFieldIncompatibility)(incompatibility)) {
                incompatibilityReasons.add(incompatibility.reason);
            }
        }
        let message = undefined;
        if (!multiMode && incompatibilityMessages.size === 1) {
            const [fieldName, reason] = incompatibilityMessages.entries().next().value;
            message = `Query field "${fieldName}" could not be migrated. ${reason}\n`;
        }
        else if (incompatibilityMessages.size > 0) {
            const queryPlural = incompatibilityMessages.size === 1 ? 'query' : `queries`;
            message = `${incompatibilityMessages.size} ${queryPlural} could not be migrated.\n`;
            message += `For more details, click on the skipped queries and try to migrate individually.\n`;
        }
        // Only suggest the "force ignoring" option if there are actually
        // ignorable incompatibilities.
        const canBeForciblyIgnored = Array.from(incompatibilityReasons).some((r) => !incompatibility_1.nonIgnorableFieldIncompatibilities.includes(r));
        if (!config.bestEffortMode && canBeForciblyIgnored) {
            message += `Use the "(forcibly, ignoring errors)" action to forcibly convert.\n`;
        }
        // In multi mode, partial migration is allowed.
        if (!multiMode && incompatibilityMessages.size > 0) {
            return {
                edits: [],
                errorMessage: message,
            };
        }
        const fileUpdates = Array.from((0, group_replacements_1.groupReplacementsByFile)(replacements).entries());
        const edits = fileUpdates.map(([relativePath, changes]) => {
            return {
                fileName: fs.join(programInfo.projectRoot, relativePath),
                textChanges: changes.map((c) => ({
                    newText: c.data.toInsert,
                    span: {
                        start: c.data.position,
                        length: c.data.end - c.data.position,
                    },
                })),
            };
        });
        const allQueriesIncompatible = incompatibilityMessages.size === targetQueries.length;
        // Depending on whether all queries were incompatible, the message is either
        // an error, or just a warning (in case of partial migration still succeeding).
        const errorMessage = allQueriesIncompatible ? message : undefined;
        const warningMessage = allQueriesIncompatible ? undefined : message;
        return { edits, warningMessage, errorMessage };
    });
}
