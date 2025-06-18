"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const perf_1 = require("../../perf");
const testing_2 = require("../../testing");
const incremental_1 = require("../src/incremental");
(0, testing_1.runInEachFileSystem)(() => {
    describe('incremental reconciliation', () => {
        it('should treat source files with changed versions as changed', () => {
            const FOO_PATH = (0, file_system_1.absoluteFrom)('/foo.ts');
            const { program } = (0, testing_2.makeProgram)([{ name: FOO_PATH, contents: `export const FOO = true;` }]);
            const fooSf = (0, file_system_1.getSourceFileOrError)(program, FOO_PATH);
            const traitCompiler = { getAnalyzedRecords: () => new Map() };
            const versionMapFirst = new Map([[FOO_PATH, 'version.1']]);
            const firstCompilation = incremental_1.IncrementalCompilation.fresh(program, versionMapFirst);
            firstCompilation.recordSuccessfulAnalysis(traitCompiler);
            firstCompilation.recordSuccessfulEmit(fooSf);
            const versionMapSecond = new Map([[FOO_PATH, 'version.2']]);
            const secondCompilation = incremental_1.IncrementalCompilation.incremental(program, versionMapSecond, program, firstCompilation.state, new Set(), perf_1.NOOP_PERF_RECORDER);
            secondCompilation.recordSuccessfulAnalysis(traitCompiler);
            expect(secondCompilation.safeToSkipEmit(fooSf)).toBeFalse();
        });
    });
});
