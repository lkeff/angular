"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass9__migrateTypeScriptTypeReferences = pass9__migrateTypeScriptTypeReferences;
const migrate_ts_type_references_1 = require("./reference_migration/migrate_ts_type_references");
/**
 * Migrates TypeScript "ts.Type" references. E.g.

 *  - `Partial<MyComp>` will be converted to `UnwrapSignalInputs<Partial<MyComp>>`.
      in Catalyst test files.
 */
function pass9__migrateTypeScriptTypeReferences(host, references, importManager, info) {
    (0, migrate_ts_type_references_1.migrateTypeScriptTypeReferences)(host, references, importManager, info);
}
