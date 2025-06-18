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
const testing_2 = require("../../testing");
const adapter_1 = require("../src/adapter");
const util_1 = require("./util");
(0, testing_1.runInEachFileSystem)(() => {
    describe('ShimAdapter', () => {
        it('should recognize a basic shim name', () => {
            const { host } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/test.ts'),
                    contents: `export class A {}`,
                },
            ]);
            const adapter = new adapter_1.ShimAdapter(host, [], [], [new util_1.TestShimGenerator()], 
            /* oldProgram */ null);
            const shimSf = adapter.maybeGenerate((0, file_system_1.absoluteFrom)('/test.testshim.ts'));
            expect(shimSf).not.toBeNull();
            expect(shimSf.fileName).toBe((0, file_system_1.absoluteFrom)('/test.testshim.ts'));
            expect(shimSf.text).toContain('SHIM_FOR_FILE');
        });
        it('should not recognize a normal file in the program', () => {
            const { host } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/test.ts'),
                    contents: `export class A {}`,
                },
            ]);
            const adapter = new adapter_1.ShimAdapter(host, [], [], [new util_1.TestShimGenerator()], 
            /* oldProgram */ null);
            const shimSf = adapter.maybeGenerate((0, file_system_1.absoluteFrom)('/test.ts'));
            expect(shimSf).toBeNull();
        });
        it('should not recognize a shim-named file without a source file', () => {
            const { host } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/test.ts'),
                    contents: `export class A {}`,
                },
            ]);
            const adapter = new adapter_1.ShimAdapter(host, [], [], [new util_1.TestShimGenerator()], 
            /* oldProgram */ null);
            const shimSf = adapter.maybeGenerate((0, file_system_1.absoluteFrom)('/other.testshim.ts'));
            // Expect undefined, not null, since that indicates a valid shim path but an invalid source
            // file.
            expect(shimSf).toBeUndefined();
        });
        it('should detect a prior shim if one is available', () => {
            // Create a shim via the ShimAdapter, then create a second ShimAdapter simulating an
            // incremental compilation, with a stub passed for the oldProgram that includes the original
            // shim file. Verify that the new ShimAdapter incorporates the original shim in generation of
            // the new one.
            const { host, program } = (0, testing_2.makeProgram)([
                {
                    name: (0, file_system_1.absoluteFrom)('/test.ts'),
                    contents: `export class A {}`,
                },
            ]);
            const adapter = new adapter_1.ShimAdapter(host, [], [], [new util_1.TestShimGenerator()], 
            /* oldProgram */ null);
            const originalShim = adapter.maybeGenerate((0, file_system_1.absoluteFrom)('/test.testshim.ts'));
            const oldProgramStub = {
                getSourceFiles: () => [...program.getSourceFiles(), originalShim],
            };
            const adapter2 = new adapter_1.ShimAdapter(host, [], [], [new util_1.TestShimGenerator()], oldProgramStub);
            const newShim = adapter.maybeGenerate((0, file_system_1.absoluteFrom)('/test.testshim.ts'));
            expect(newShim).toBe(originalShim);
        });
    });
});
