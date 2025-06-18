"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = migrate;
const schematics_1 = require("@angular-devkit/schematics");
const signal_queries_migration_1 = require("../signal-queries-migration");
const signal_input_migration_1 = require("../signal-input-migration");
const output_migration_1 = require("../output-migration");
function migrate(options) {
    // The migrations are independent so we can run them in any order, but we sort them here
    // alphabetically so we get a consistent execution order in case of issue reports.
    const migrations = options.migrations.slice().sort();
    const rules = [];
    for (const migration of migrations) {
        switch (migration) {
            case "inputs" /* SupportedMigrations.inputs */:
                rules.push((0, signal_input_migration_1.migrate)(options));
                break;
            case "outputs" /* SupportedMigrations.outputs */:
                rules.push((0, output_migration_1.migrate)(options));
                break;
            case "queries" /* SupportedMigrations.queries */:
                rules.push((0, signal_queries_migration_1.migrate)(options));
                break;
            default:
                throw new schematics_1.SchematicsException(`Unsupported migration "${migration}"`);
        }
    }
    return (0, schematics_1.chain)(rules);
}
