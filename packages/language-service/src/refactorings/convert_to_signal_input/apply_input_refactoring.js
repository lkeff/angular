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
exports.applySignalInputRefactoring = applySignalInputRefactoring;
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const src_1 = require("@angular/core/schematics/migrations/signal-migration/src");
const group_replacements_1 = require("@angular/core/schematics/utils/tsurge/helpers/group_replacements");
function applySignalInputRefactoring(compiler, compilerOptions, config, project, reportProgress, shouldMigrateInput, multiMode) {
    return __awaiter(this, void 0, void 0, function* () {
        reportProgress(0, 'Starting input migration. Analyzing..');
        const fs = (0, file_system_1.getFileSystem)();
        const migration = new src_1.SignalInputMigration(Object.assign(Object.assign({}, config), { upgradeAnalysisPhaseToAvoidBatch: true, reportProgressFn: reportProgress, shouldMigrateInput: shouldMigrateInput }));
        yield migration.analyze(migration.prepareProgram({
            ngCompiler: compiler,
            program: compiler.getCurrentProgram(),
            userOptions: compilerOptions,
            programAbsoluteRootFileNames: [],
            host: {
                getCanonicalFileName: (file) => project.projectService.toCanonicalFileName(file),
                getCurrentDirectory: () => project.getCurrentDirectory(),
            },
        }));
        if (migration.upgradedAnalysisPhaseResults === null) {
            return {
                edits: [],
                errorMessage: 'Unexpected error. No analysis result is available.',
            };
        }
        const { knownInputs, replacements, projectRoot } = migration.upgradedAnalysisPhaseResults;
        const targetInputs = Array.from(knownInputs.knownInputIds.values()).filter(shouldMigrateInput);
        if (targetInputs.length === 0) {
            return {
                edits: [],
                errorMessage: 'Unexpected error. Could not find target inputs in registry.',
            };
        }
        const incompatibilityMessages = new Map();
        const incompatibilityReasons = new Set();
        for (const incompatibleInput of targetInputs.filter((i) => i.isIncompatible())) {
            const { container, descriptor } = incompatibleInput;
            const memberIncompatibility = container.memberIncompatibility.get(descriptor.key);
            const classIncompatibility = container.incompatible;
            if (memberIncompatibility !== undefined) {
                const { short, extra } = (0, src_1.getMessageForFieldIncompatibility)(memberIncompatibility.reason, {
                    single: 'input',
                    plural: 'inputs',
                });
                incompatibilityMessages.set(descriptor.node.name.text, `${short}\n${extra}`);
                incompatibilityReasons.add(memberIncompatibility.reason);
                continue;
            }
            if (classIncompatibility !== null) {
                const { short, extra } = (0, src_1.getMessageForClassIncompatibility)(classIncompatibility, {
                    single: 'input',
                    plural: 'inputs',
                });
                incompatibilityMessages.set(descriptor.node.name.text, `${short}\n${extra}`);
                continue;
            }
            return {
                edits: [],
                errorMessage: 'Inputs could not be migrated, but no reasons were found. ' +
                    'Consider reporting a bug to the Angular team.',
            };
        }
        let message = undefined;
        if (!multiMode && incompatibilityMessages.size === 1) {
            const [inputName, reason] = incompatibilityMessages.entries().next().value;
            message = `Input field "${inputName}" could not be migrated. ${reason}\n`;
        }
        else if (incompatibilityMessages.size > 0) {
            const inputPlural = incompatibilityMessages.size === 1 ? 'input' : `inputs`;
            message = `${incompatibilityMessages.size} ${inputPlural} could not be migrated.\n`;
            message += `For more details, click on the skipped inputs and try to migrate individually.\n`;
        }
        // Only suggest the "force ignoring" option if there are actually
        // ignorable incompatibilities.
        const canBeForciblyIgnored = Array.from(incompatibilityReasons).some((r) => !src_1.nonIgnorableFieldIncompatibilities.includes(r));
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
                fileName: fs.join(projectRoot, relativePath),
                textChanges: changes.map((c) => ({
                    newText: c.data.toInsert,
                    span: {
                        start: c.data.position,
                        length: c.data.end - c.data.position,
                    },
                })),
            };
        });
        const allInputsIncompatible = incompatibilityMessages.size === targetInputs.length;
        // Depending on whether all inputs were incompatible, the message is either
        // an error, or just a warning (in case of partial migration still succeeding).
        const errorMessage = allInputsIncompatible ? message : undefined;
        const warningMessage = allInputsIncompatible ? undefined : message;
        return { edits, warningMessage, errorMessage };
    });
}
