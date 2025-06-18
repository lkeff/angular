"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass2_IdentifySourceFileReferences = pass2_IdentifySourceFileReferences;
const reference_resolution_1 = require("./reference_resolution");
/**
 * Phase where problematic patterns are detected and advise
 * the migration to skip certain inputs.
 *
 * For example, detects classes that are instantiated manually. Those
 * cannot be migrated as `input()` requires an injection context.
 *
 * In addition, spying onto an input may be problematic- so we skip migrating
 * such.
 */
function pass2_IdentifySourceFileReferences(programInfo, checker, reflector, resourceLoader, evaluator, templateTypeChecker, groupedTsAstVisitor, knownInputs, result, fieldNamesToConsiderForReferenceLookup) {
    groupedTsAstVisitor.register((0, reference_resolution_1.createFindAllSourceFileReferencesVisitor)(programInfo, checker, reflector, resourceLoader, evaluator, templateTypeChecker, knownInputs, fieldNamesToConsiderForReferenceLookup, result).visitor);
}
