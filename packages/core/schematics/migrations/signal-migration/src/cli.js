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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const path_1 = __importDefault(require("path"));
const node_js_file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system/src/node_js_file_system");
const typescript_1 = __importDefault(require("typescript"));
const assert_1 = __importDefault(require("assert"));
const migration_1 = require("./migration");
const write_replacements_1 = require("./write_replacements");
// TODO(crisbeto): this can be removed when we drop support for TypeScript 5.5
// and remove the 5.5-specific integration tests.
// Ensures that the tests which depend on a mocked out TS version receive the mock version.
if (process.env['TS_VERSION_PACKAGE']) {
    node_js_file_system_1.NodeJSReadonlyFileSystem.prototype.getDefaultLibLocation = function () {
        return this.resolve(typescript_1.default.getDefaultLibFilePath({}), '..');
    };
}
main(path_1.default.resolve(process.argv[2]), process.argv.includes('--best-effort-mode'), process.argv.includes('--insert-todos')).catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
/**
 * Runs the signal input migration for the given TypeScript project.
 */
function main(absoluteTsconfigPath, bestEffortMode, insertTodosForSkippedFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const migration = new migration_1.SignalInputMigration({
            bestEffortMode,
            insertTodosForSkippedFields,
            upgradeAnalysisPhaseToAvoidBatch: true,
        });
        const baseInfo = migration.createProgram(absoluteTsconfigPath);
        const info = migration.prepareProgram(baseInfo);
        yield migration.analyze(info);
        (0, assert_1.default)(migration.upgradedAnalysisPhaseResults, 'Expected upgraded analysis phase results; batch mode is disabled.');
        const { replacements, projectRoot } = migration.upgradedAnalysisPhaseResults;
        // Apply replacements
        (0, write_replacements_1.writeMigrationReplacements)(replacements, projectRoot);
    });
}
