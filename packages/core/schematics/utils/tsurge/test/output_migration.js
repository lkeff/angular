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
exports.OutputMigration = void 0;
const metadata_1 = require("@angular/compiler-cli/src/ngtsc/metadata");
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
const serializable_1 = require("../helpers/serializable");
const migration_1 = require("../migration");
const replacement_1 = require("../replacement");
const output_helpers_1 = require("./output_helpers");
const project_paths_1 = require("../project_paths");
/**
 * A `Tsurge` migration that can migrate instances of `@Output()` to
 * the new `output()` API.
 *
 * Note that this is simply a testing construct for now, to verify the migration
 * framework works as expected. This is **not a full migration**, but rather an example.
 */
class OutputMigration extends migration_1.TsurgeComplexMigration {
    analyze(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const program = info.program;
            const typeChecker = program.getTypeChecker();
            const reflector = new reflection_1.TypeScriptReflectionHost(typeChecker, false);
            const dtsReader = new metadata_1.DtsMetadataReader(typeChecker, reflector);
            const { sourceOutputs, problematicReferencedOutputs } = (0, output_helpers_1.findOutputDeclarationsAndReferences)(info, typeChecker, reflector, dtsReader);
            const discoveredOutputs = {};
            for (const id of sourceOutputs.keys()) {
                discoveredOutputs[id] = { seenProblematicUsage: false };
            }
            for (const id of problematicReferencedOutputs) {
                discoveredOutputs[id] = { seenProblematicUsage: true };
            }
            // Here we confirm it as serializable..
            return (0, serializable_1.confirmAsSerializable)(discoveredOutputs);
        });
    }
    combine(unitA, unitB) {
        return __awaiter(this, void 0, void 0, function* () {
            const merged = {};
            // Merge information from two compilation units. Mark
            // outputs that cannot be migrated due to seen problematic usages.
            for (const unit of [unitA, unitB]) {
                for (const [idStr, info] of Object.entries(unit)) {
                    const id = idStr;
                    const existing = merged[id];
                    if (existing === undefined) {
                        merged[id] = { seenProblematicUsage: info.seenProblematicUsage };
                    }
                    else if (!existing.seenProblematicUsage && info.seenProblematicUsage) {
                        merged[id].seenProblematicUsage = true;
                    }
                }
            }
            return (0, serializable_1.confirmAsSerializable)(merged);
        });
    }
    globalMeta(combinedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalMeta = {};
            for (const [idStr, info] of Object.entries(combinedData)) {
                globalMeta[idStr] = {
                    canBeMigrated: info.seenProblematicUsage === false,
                };
            }
            return (0, serializable_1.confirmAsSerializable)(globalMeta);
        });
    }
    migrate(globalAnalysisData, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const program = info.program;
            const typeChecker = program.getTypeChecker();
            const reflector = new reflection_1.TypeScriptReflectionHost(typeChecker, false);
            const dtsReader = new metadata_1.DtsMetadataReader(typeChecker, reflector);
            const { sourceOutputs } = (0, output_helpers_1.findOutputDeclarationsAndReferences)(info, typeChecker, reflector, dtsReader);
            const replacements = [];
            for (const [id, node] of sourceOutputs.entries()) {
                // Output cannot be migrated as per global analysis metadata; skip.
                if (globalAnalysisData[id].canBeMigrated === false) {
                    continue;
                }
                replacements.push(new replacement_1.Replacement((0, project_paths_1.projectFile)(node.getSourceFile(), info), new replacement_1.TextUpdate({
                    position: node.getStart(),
                    end: node.getStart(),
                    toInsert: `// TODO: Actual migration logic\n`,
                })));
            }
            return { replacements };
        });
    }
    stats(globalMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            let allOutputs = 0;
            let migratedOutputs = 0;
            for (const output of Object.values(globalMetadata)) {
                allOutputs++;
                if (output.canBeMigrated) {
                    migratedOutputs++;
                }
            }
            return {
                counters: {
                    allOutputs,
                    migratedOutputs,
                },
            };
        });
    }
}
exports.OutputMigration = OutputMigration;
