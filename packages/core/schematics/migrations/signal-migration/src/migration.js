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
exports.SignalInputMigration = void 0;
const serializable_1 = require("../../../utils/tsurge/helpers/serializable");
const migration_1 = require("../../../utils/tsurge/migration");
const known_inputs_1 = require("./input_detection/known_inputs");
const analysis_deps_1 = require("./analysis_deps");
const result_1 = require("./result");
const migration_host_1 = require("./migration_host");
const phase_analysis_1 = require("./phase_analysis");
const _4_check_inheritance_1 = require("./passes/4_check_inheritance");
const extract_1 = require("./batch/extract");
const merge_unit_data_1 = require("./batch/merge_unit_data");
const populate_global_data_1 = require("./batch/populate_global_data");
const phase_migrate_1 = require("./phase_migrate");
const best_effort_mode_1 = require("./best_effort_mode");
const incompatibility_1 = require("./passes/problematic_patterns/incompatibility");
const create_program_1 = require("../../../utils/tsurge/helpers/create_program");
/**
 * Tsurge migration for migrating Angular `@Input()` declarations to
 * signal inputs, with support for batch execution.
 */
class SignalInputMigration extends migration_1.TsurgeComplexMigration {
    constructor(config = {}) {
        super();
        this.config = config;
        this.upgradedAnalysisPhaseResults = null;
    }
    // Override the default program creation, to add extra flags.
    createProgram(tsconfigAbsPath, fs) {
        return (0, create_program_1.createBaseProgramInfo)(tsconfigAbsPath, fs, {
            _compilePoisonedComponents: true,
            // We want to migrate non-exported classes too.
            compileNonExportedClasses: true,
            // Always generate as much TCB code as possible.
            // This allows us to check references in templates as much as possible.
            // Note that this may yield more diagnostics, but we are not collecting these anyway.
            strictTemplates: true,
        });
    }
    prepareProgram(baseInfo) {
        const info = super.prepareProgram(baseInfo);
        // Optional filter for testing. Allows for simulation of parallel execution
        // even if some tsconfig's have overlap due to sharing of TS sources.
        // (this is commonly not the case in g3 where deps are `.d.ts` files).
        const limitToRootNamesOnly = process.env['LIMIT_TO_ROOT_NAMES_ONLY'] === '1';
        const filteredSourceFiles = info.sourceFiles.filter((f) => 
        // Optional replacement filter. Allows parallel execution in case
        // some tsconfig's have overlap due to sharing of TS sources.
        // (this is commonly not the case in g3 where deps are `.d.ts` files).
        !limitToRootNamesOnly || info.programAbsoluteRootFileNames.includes(f.fileName));
        return Object.assign(Object.assign({}, info), { sourceFiles: filteredSourceFiles });
    }
    // Extend the program info with the analysis information we need in every phase.
    prepareAnalysisDeps(info) {
        const analysisInfo = Object.assign(Object.assign({}, info), (0, analysis_deps_1.prepareAnalysisInfo)(info.program, info.ngCompiler, info.programAbsoluteRootFileNames));
        return analysisInfo;
    }
    analyze(info) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const analysisDeps = this.prepareAnalysisDeps(info);
            const knownInputs = new known_inputs_1.KnownInputs(info, this.config);
            const result = new result_1.MigrationResult();
            const host = createMigrationHost(info, this.config);
            (_b = (_a = this.config).reportProgressFn) === null || _b === void 0 ? void 0 : _b.call(_a, 10, 'Analyzing project (input usages)..');
            const { inheritanceGraph } = (0, phase_analysis_1.executeAnalysisPhase)(host, knownInputs, result, analysisDeps);
            // Mark filtered inputs before checking inheritance. This ensures filtered
            // inputs properly influence e.g. inherited or derived inputs that now wouldn't
            // be safe either (BUT can still be skipped via best effort mode later).
            filterInputsViaConfig(result, knownInputs, this.config);
            // Analyze inheritance, track edges etc. and later propagate incompatibilities in
            // the merge stage.
            (_d = (_c = this.config).reportProgressFn) === null || _d === void 0 ? void 0 : _d.call(_c, 40, 'Checking inheritance..');
            (0, _4_check_inheritance_1.pass4__checkInheritanceOfInputs)(inheritanceGraph, analysisDeps.metaRegistry, knownInputs);
            // Filter best effort incompatibilities, so that the new filtered ones can
            // be accordingly respected in the merge phase.
            if (this.config.bestEffortMode) {
                (0, best_effort_mode_1.filterIncompatibilitiesForBestEffortMode)(knownInputs);
            }
            const unitData = (0, extract_1.getCompilationUnitMetadata)(knownInputs);
            // Non-batch mode!
            if (this.config.upgradeAnalysisPhaseToAvoidBatch) {
                const globalMeta = yield this.globalMeta(unitData);
                const { replacements } = yield this.migrate(globalMeta, info, {
                    knownInputs,
                    result,
                    host,
                    analysisDeps,
                });
                (_f = (_e = this.config).reportProgressFn) === null || _f === void 0 ? void 0 : _f.call(_e, 100, 'Completed migration.');
                // Expose the upgraded analysis stage results.
                this.upgradedAnalysisPhaseResults = {
                    replacements,
                    projectRoot: info.projectRoot,
                    knownInputs,
                };
            }
            return (0, serializable_1.confirmAsSerializable)(unitData);
        });
    }
    combine(unitA, unitB) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, serializable_1.confirmAsSerializable)((0, merge_unit_data_1.combineCompilationUnitData)(unitA, unitB));
        });
    }
    globalMeta(combinedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, serializable_1.confirmAsSerializable)((0, merge_unit_data_1.convertToGlobalMeta)(combinedData));
        });
    }
    migrate(globalMetadata, info, nonBatchData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const knownInputs = (_a = nonBatchData === null || nonBatchData === void 0 ? void 0 : nonBatchData.knownInputs) !== null && _a !== void 0 ? _a : new known_inputs_1.KnownInputs(info, this.config);
            const result = (_b = nonBatchData === null || nonBatchData === void 0 ? void 0 : nonBatchData.result) !== null && _b !== void 0 ? _b : new result_1.MigrationResult();
            const host = (_c = nonBatchData === null || nonBatchData === void 0 ? void 0 : nonBatchData.host) !== null && _c !== void 0 ? _c : createMigrationHost(info, this.config);
            const analysisDeps = (_d = nonBatchData === null || nonBatchData === void 0 ? void 0 : nonBatchData.analysisDeps) !== null && _d !== void 0 ? _d : this.prepareAnalysisDeps(info);
            // Can't re-use analysis structures, so re-build them.
            if (nonBatchData === undefined) {
                (0, phase_analysis_1.executeAnalysisPhase)(host, knownInputs, result, analysisDeps);
            }
            // Incorporate global metadata into known inputs.
            (0, populate_global_data_1.populateKnownInputsFromGlobalData)(knownInputs, globalMetadata);
            if (this.config.bestEffortMode) {
                (0, best_effort_mode_1.filterIncompatibilitiesForBestEffortMode)(knownInputs);
            }
            (_f = (_e = this.config).reportProgressFn) === null || _f === void 0 ? void 0 : _f.call(_e, 60, 'Collecting migration changes..');
            (0, phase_migrate_1.executeMigrationPhase)(host, knownInputs, result, analysisDeps);
            return { replacements: result.replacements };
        });
    }
    stats(globalMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let fullCompilationInputs = 0;
            let sourceInputs = 0;
            let incompatibleInputs = 0;
            const fieldIncompatibleCounts = {};
            const classIncompatibleCounts = {};
            for (const [id, input] of Object.entries(globalMetadata.knownInputs)) {
                fullCompilationInputs++;
                const isConsideredSourceInput = input.seenAsSourceInput &&
                    input.memberIncompatibility !== incompatibility_1.FieldIncompatibilityReason.OutsideOfMigrationScope &&
                    input.memberIncompatibility !== incompatibility_1.FieldIncompatibilityReason.SkippedViaConfigFilter;
                // We won't track incompatibilities to inputs that aren't considered source inputs.
                // Tracking their statistics wouldn't provide any value.
                if (!isConsideredSourceInput) {
                    continue;
                }
                sourceInputs++;
                if (input.memberIncompatibility !== null || input.owningClassIncompatibility !== null) {
                    incompatibleInputs++;
                }
                if (input.memberIncompatibility !== null) {
                    const reasonName = incompatibility_1.FieldIncompatibilityReason[input.memberIncompatibility];
                    const key = `input-field-incompatibility-${reasonName}`;
                    (_a = fieldIncompatibleCounts[key]) !== null && _a !== void 0 ? _a : (fieldIncompatibleCounts[key] = 0);
                    fieldIncompatibleCounts[key]++;
                }
                if (input.owningClassIncompatibility !== null) {
                    const reasonName = incompatibility_1.ClassIncompatibilityReason[input.owningClassIncompatibility];
                    const key = `input-owning-class-incompatibility-${reasonName}`;
                    (_b = classIncompatibleCounts[key]) !== null && _b !== void 0 ? _b : (classIncompatibleCounts[key] = 0);
                    classIncompatibleCounts[key]++;
                }
            }
            return {
                counters: Object.assign(Object.assign({ fullCompilationInputs,
                    sourceInputs,
                    incompatibleInputs }, fieldIncompatibleCounts), classIncompatibleCounts),
            };
        });
    }
}
exports.SignalInputMigration = SignalInputMigration;
/**
 * Updates the migration state to filter inputs based on a filter
 * method defined in the migration config.
 */
function filterInputsViaConfig(result, knownInputs, config) {
    if (config.shouldMigrateInput === undefined) {
        return;
    }
    const skippedInputs = new Set();
    // Mark all skipped inputs as incompatible for migration.
    for (const input of knownInputs.knownInputIds.values()) {
        if (!config.shouldMigrateInput(input)) {
            skippedInputs.add(input.descriptor.key);
            knownInputs.markFieldIncompatible(input.descriptor, {
                context: null,
                reason: incompatibility_1.FieldIncompatibilityReason.SkippedViaConfigFilter,
            });
        }
    }
}
function createMigrationHost(info, config) {
    return new migration_host_1.MigrationHost(/* isMigratingCore */ false, info, config, info.sourceFiles);
}
