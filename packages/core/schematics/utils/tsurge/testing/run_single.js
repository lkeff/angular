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
exports.runTsurgeMigration = runTsurgeMigration;
const migration_1 = require("../migration");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const group_replacements_1 = require("../helpers/group_replacements");
const replacement_1 = require("../replacement");
/**
 * Runs the given migration against a fake set of files, emulating
 * migration of a real TypeScript Angular project.
 *
 * Note: This helper does not execute the migration in batch mode, where
 * e.g. the migration runs per single file and merges the unit data.
 *
 * TODO: Add helper/solution to test batch execution, like with Tsunami.
 *
 * @returns a mock file system with the applied replacements of the migration.
 */
function runTsurgeMigration(migration_2, files_1) {
    return __awaiter(this, arguments, void 0, function* (migration, files, compilerOptions = {}) {
        const mockFs = (0, file_system_1.getFileSystem)();
        if (!(mockFs instanceof testing_1.MockFileSystem)) {
            throw new Error('Expected a mock file system for `runTsurgeMigration`.');
        }
        for (const file of files) {
            mockFs.ensureDir(mockFs.dirname(file.name));
            mockFs.writeFile(file.name, file.contents);
        }
        const rootFiles = files.filter((f) => f.isProgramRootFile).map((f) => f.name);
        mockFs.writeFile((0, file_system_1.absoluteFrom)('/tsconfig.json'), JSON.stringify({
            compilerOptions: Object.assign({ strict: true, rootDir: '/' }, compilerOptions),
            files: rootFiles,
        }));
        const baseInfo = migration.createProgram('/tsconfig.json', mockFs);
        const info = migration.prepareProgram(baseInfo);
        const unitData = yield migration.analyze(info);
        const globalMeta = yield migration.globalMeta(unitData);
        const { replacements } = migration instanceof migration_1.TsurgeFunnelMigration
            ? yield migration.migrate(globalMeta)
            : yield migration.migrate(globalMeta, info);
        const updates = (0, group_replacements_1.groupReplacementsByFile)(replacements);
        for (const [rootRelativePath, changes] of updates.entries()) {
            const absolutePath = mockFs.join(info.projectRoot, rootRelativePath);
            mockFs.writeFile(absolutePath, (0, replacement_1.applyTextUpdates)(mockFs.readFile(absolutePath), changes));
        }
        return {
            fs: mockFs,
            getStatistics: () => migration.stats(globalMeta),
        };
    });
}
