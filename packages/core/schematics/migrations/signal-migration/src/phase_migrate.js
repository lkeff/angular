"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMigrationPhase = executeMigrationPhase;
const _6_migrate_input_declarations_1 = require("./passes/6_migrate_input_declarations");
const _10_apply_import_manager_1 = require("./passes/10_apply_import_manager");
const translator_1 = require("@angular/compiler-cli/src/ngtsc/translator");
const _5_migrate_ts_references_1 = require("./passes/5_migrate_ts_references");
const _7_migrate_template_references_1 = require("./passes/7_migrate_template_references");
const _8_migrate_host_bindings_1 = require("./passes/8_migrate_host_bindings");
const _9_migrate_ts_type_references_1 = require("./passes/9_migrate_ts_type_references");
/**
 * Executes the migration phase.
 *
 * This involves:
 *   - migrating TS references.
 *   - migrating `@Input()` declarations.
 *   - migrating template references.
 *   - migrating host binding references.
 */
function executeMigrationPhase(host, knownInputs, result, info) {
    const { typeChecker, sourceFiles } = info;
    const importManager = new translator_1.ImportManager({
        // For the purpose of this migration, we always use `input` and don't alias
        // it to e.g. `input_1`.
        generateUniqueIdentifier: () => null,
    });
    const referenceMigrationHost = {
        printer: result.printer,
        replacements: result.replacements,
        shouldMigrateReferencesToField: (inputDescr) => knownInputs.has(inputDescr) && knownInputs.get(inputDescr).isIncompatible() === false,
        shouldMigrateReferencesToClass: (clazz) => knownInputs.getDirectiveInfoForClass(clazz) !== undefined &&
            knownInputs.getDirectiveInfoForClass(clazz).hasMigratedFields(),
    };
    // Migrate passes.
    (0, _5_migrate_ts_references_1.pass5__migrateTypeScriptReferences)(referenceMigrationHost, result.references, typeChecker, info);
    (0, _6_migrate_input_declarations_1.pass6__migrateInputDeclarations)(host, typeChecker, result, knownInputs, importManager, info);
    (0, _7_migrate_template_references_1.pass7__migrateTemplateReferences)(referenceMigrationHost, result.references);
    (0, _8_migrate_host_bindings_1.pass8__migrateHostBindings)(referenceMigrationHost, result.references, info);
    (0, _9_migrate_ts_type_references_1.pass9__migrateTypeScriptTypeReferences)(referenceMigrationHost, result.references, importManager, info);
    (0, _10_apply_import_manager_1.pass10_applyImportManager)(importManager, result, sourceFiles, info);
}
