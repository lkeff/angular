"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass10_applyImportManager = pass10_applyImportManager;
const apply_import_manager_1 = require("../../../../utils/tsurge/helpers/apply_import_manager");
/**
 * Phase that applies all changes recorded by the import manager in
 * previous migrate phases.
 */
function pass10_applyImportManager(importManager, result, sourceFiles, info) {
    (0, apply_import_manager_1.applyImportManagerChanges)(importManager, result.replacements, sourceFiles, info);
}
