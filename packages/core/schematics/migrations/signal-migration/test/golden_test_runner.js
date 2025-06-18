"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Verifies that the contents of the given migration
 * directory match the given golden.
 */
const fs_1 = __importDefault(require("fs"));
const tinyglobby_1 = require("tinyglobby");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const diff_1 = require("../../../utils/tsurge/testing/diff");
const [migratedDir, goldenPath] = process.argv.slice(2);
const files = (0, tinyglobby_1.globSync)('**/*', { cwd: migratedDir });
let golden = '';
for (const filePath of files) {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.html')) {
        continue;
    }
    const migrateContent = fs_1.default.readFileSync(path_1.default.join(migratedDir, filePath), 'utf-8');
    golden += `@@@@@@ ${filePath} @@@@@@\n\n${migrateContent}`;
}
const diskGolden = fs_1.default.readFileSync(goldenPath, 'utf8');
if (diskGolden !== golden) {
    if (process.env['BUILD_WORKING_DIRECTORY']) {
        fs_1.default.writeFileSync(path_1.default.join(process.env['BUILD_WORKING_DIRECTORY'], `packages/core/schematics/migrations/signal-migration/test/${goldenPath}`), golden);
        console.info('Golden updated.');
        process.exit(0);
    }
    process.stderr.write((0, diff_1.diffText)(diskGolden, golden));
    console.error();
    console.error();
    console.error(chalk_1.default.red('Golden does not match.'));
    process.exit(1);
}
