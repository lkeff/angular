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
const program_driver_1 = require("../../program_driver");
const shims_1 = require("../../shims");
const testing_2 = require("../../testing");
const api_1 = require("../api");
const testing_3 = require("../testing");
(0, testing_1.runInEachFileSystem)(() => {
    describe('template type-checking program', () => {
        it('should not be created if no components need to be checked', () => {
            const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
            const { program, templateTypeChecker, programStrategy } = (0, testing_3.setup)([
                {
                    fileName,
                    templates: {},
                    source: `export class NotACmp {}`,
                },
            ]);
            const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
            templateTypeChecker.getDiagnosticsForFile(sf, api_1.OptimizeFor.WholeProgram);
            // expect() here would create a really long error message, so this is checked manually.
            if (programStrategy.getProgram() !== program) {
                fail('Template type-checking created a new ts.Program even though it had no changes.');
            }
        });
        it('should have complete reuse if no structural changes are made to shims', () => {
            const { program, host, options, typecheckPath } = makeSingleFileProgramWithTypecheckShim();
            const programStrategy = new program_driver_1.TsCreateProgramDriver(program, host, options, ['ngtypecheck']);
            // Update /main.ngtypecheck.ts without changing its shape. Verify that the old program was
            // reused completely.
            programStrategy.updateFiles(new Map([[typecheckPath, createUpdate('export const VERSION = 2;')]]), program_driver_1.UpdateMode.Complete);
            (0, testing_2.expectCompleteReuse)(programStrategy.getProgram());
        });
        it('should have complete reuse if no structural changes are made to input files', () => {
            const { program, host, options, mainPath } = makeSingleFileProgramWithTypecheckShim();
            const programStrategy = new program_driver_1.TsCreateProgramDriver(program, host, options, ['ngtypecheck']);
            // Update /main.ts without changing its shape. Verify that the old program was reused
            // completely.
            programStrategy.updateFiles(new Map([[mainPath, createUpdate('export const STILL_NOT_A_COMPONENT = true;')]]), program_driver_1.UpdateMode.Complete);
            (0, testing_2.expectCompleteReuse)(programStrategy.getProgram());
        });
    });
});
function createUpdate(text) {
    return {
        newText: text,
        originalFile: null,
    };
}
function makeSingleFileProgramWithTypecheckShim() {
    const mainPath = (0, file_system_1.absoluteFrom)('/main.ts');
    const typecheckPath = (0, file_system_1.absoluteFrom)('/main.ngtypecheck.ts');
    const { program, host, options } = (0, testing_2.makeProgram)([
        {
            name: mainPath,
            contents: 'export const NOT_A_COMPONENT = true;',
        },
        {
            name: typecheckPath,
            contents: 'export const VERSION = 1;',
        },
    ]);
    const sf = (0, file_system_1.getSourceFileOrError)(program, mainPath);
    const typecheckSf = (0, file_system_1.getSourceFileOrError)(program, typecheckPath);
    // To ensure this test is validating the correct behavior, the initial conditions of the
    // input program must be such that:
    //
    // 1) /main.ts was previously tagged with a reference to its ngtypecheck shim.
    // 2) /main.ngtypecheck.ts is marked as a shim itself.
    // Condition 1:
    const tagger = new shims_1.ShimReferenceTagger(['ngtypecheck']);
    tagger.tag(sf);
    tagger.finalize();
    // Condition 2:
    (0, shims_1.sfExtensionData)(typecheckSf).fileShim = {
        extension: 'ngtypecheck',
        generatedFrom: mainPath,
    };
    return { program, host, options, mainPath, typecheckPath };
}
