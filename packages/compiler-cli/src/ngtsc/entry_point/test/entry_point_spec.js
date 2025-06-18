"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const logic_1 = require("../src/logic");
(0, testing_1.runInEachFileSystem)(() => {
    describe('entry_point logic', () => {
        let _;
        beforeEach(() => (_ = file_system_1.absoluteFrom));
        describe('findFlatIndexEntryPoint', () => {
            it('should use the only source file if only a single one is specified', () => {
                expect((0, logic_1.findFlatIndexEntryPoint)([_('/src/index.ts')])).toBe(_('/src/index.ts'));
            });
            it('should use the shortest source file ending with "index.ts" for multiple files', () => {
                expect((0, logic_1.findFlatIndexEntryPoint)([_('/src/deep/index.ts'), _('/src/index.ts'), _('/index.ts')])).toBe(_('/index.ts'));
            });
        });
    });
});
