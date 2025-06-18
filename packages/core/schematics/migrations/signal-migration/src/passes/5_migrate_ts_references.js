"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass5__migrateTypeScriptReferences = pass5__migrateTypeScriptReferences;
const migrate_ts_references_1 = require("./reference_migration/migrate_ts_references");
/**
 * Phase that migrates TypeScript input references to be signal compatible.
 *
 * The phase takes care of control flow analysis and generates temporary variables
 * where needed to ensure narrowing continues to work. E.g.
 */
function pass5__migrateTypeScriptReferences(host, references, checker, info) {
    (0, migrate_ts_references_1.migrateTypeScriptReferences)(host, references, checker, info);
}
