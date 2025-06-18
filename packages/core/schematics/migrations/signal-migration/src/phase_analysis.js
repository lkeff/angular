"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAnalysisPhase = executeAnalysisPhase;
const shims_1 = require("@angular/compiler-cli/src/ngtsc/shims");
const _1_identify_inputs_1 = require("./passes/1_identify_inputs");
const _3_check_incompatible_patterns_1 = require("./passes/3_check_incompatible_patterns");
const _2_find_source_file_references_1 = require("./passes/2_find_source_file_references");
const inheritance_graph_1 = require("./utils/inheritance_graph");
const grouped_ts_ast_visitor_1 = require("./utils/grouped_ts_ast_visitor");
const reference_kinds_1 = require("./passes/reference_resolution/reference_kinds");
const incompatibility_1 = require("./passes/problematic_patterns/incompatibility");
/**
 * Executes the analysis phase of the migration.
 *
 * This includes:
 *   - finding all inputs
 *   - finding all references
 *   - determining incompatible inputs
 *   - checking inheritance
 */
function executeAnalysisPhase(host, knownInputs, result, { sourceFiles, fullProgramSourceFiles, reflector, dtsMetadataReader, typeChecker, templateTypeChecker, resourceLoader, evaluator, }) {
    var _a, _b;
    // Pass 1
    fullProgramSourceFiles.forEach((sf) => 
    // Shim shim files. Those are unnecessary and might cause unexpected slowness.
    // e.g. `ngtypecheck` files.
    !(0, shims_1.isShim)(sf) &&
        (0, _1_identify_inputs_1.pass1__IdentifySourceFileAndDeclarationInputs)(sf, host, typeChecker, reflector, dtsMetadataReader, evaluator, knownInputs, result));
    const fieldNamesToConsiderForReferenceLookup = new Set();
    for (const input of knownInputs.knownInputIds.values()) {
        if (((_b = (_a = host.config).shouldMigrateInput) === null || _b === void 0 ? void 0 : _b.call(_a, input)) === false) {
            continue;
        }
        fieldNamesToConsiderForReferenceLookup.add(input.descriptor.node.name.text);
    }
    // A graph starting with source files is sufficient. We will resolve into
    // declaration files if a source file depends on such.
    const inheritanceGraph = new inheritance_graph_1.InheritanceGraph(typeChecker).expensivePopulate(sourceFiles);
    const pass2And3SourceFileVisitor = new grouped_ts_ast_visitor_1.GroupedTsAstVisitor(sourceFiles);
    // Register pass 2. Find all source file references.
    (0, _2_find_source_file_references_1.pass2_IdentifySourceFileReferences)(host.programInfo, typeChecker, reflector, resourceLoader, evaluator, templateTypeChecker, pass2And3SourceFileVisitor, knownInputs, result, fieldNamesToConsiderForReferenceLookup);
    // Register pass 3. Check incompatible patterns pass.
    (0, _3_check_incompatible_patterns_1.pass3__checkIncompatiblePatterns)(host, inheritanceGraph, typeChecker, pass2And3SourceFileVisitor, knownInputs);
    // Perform Pass 2 and Pass 3, efficiently in one pass.
    pass2And3SourceFileVisitor.execute();
    // Determine incompatible inputs based on resolved references.
    for (const reference of result.references) {
        if ((0, reference_kinds_1.isTsReference)(reference) && reference.from.isWrite) {
            knownInputs.markFieldIncompatible(reference.target, {
                reason: incompatibility_1.FieldIncompatibilityReason.WriteAssignment,
                context: reference.from.node,
            });
        }
        if ((0, reference_kinds_1.isTemplateReference)(reference) || (0, reference_kinds_1.isHostBindingReference)(reference)) {
            if (reference.from.isWrite) {
                knownInputs.markFieldIncompatible(reference.target, {
                    reason: incompatibility_1.FieldIncompatibilityReason.WriteAssignment,
                    // No TS node context available for template or host bindings.
                    context: null,
                });
            }
        }
        // TODO: Remove this when we support signal narrowing in templates.
        // https://github.com/angular/angular/pull/55456.
        if ((0, reference_kinds_1.isTemplateReference)(reference)) {
            if (reference.from.isLikelyPartOfNarrowing) {
                knownInputs.markFieldIncompatible(reference.target, {
                    reason: incompatibility_1.FieldIncompatibilityReason.PotentiallyNarrowedInTemplateButNoSupportYet,
                    context: null,
                });
            }
        }
    }
    return { inheritanceGraph };
}
