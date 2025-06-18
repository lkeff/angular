"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const output_path_1 = require("../../src/translate/output_path");
(0, testing_1.runInEachFileSystem)(() => {
    let fs;
    beforeEach(() => (fs = (0, file_system_1.getFileSystem)()));
    describe('getOutputPathFn()', () => {
        it('should return a function that joins the `outputPath` and the `relativePath`', () => {
            const fn = (0, output_path_1.getOutputPathFn)(fs, (0, file_system_1.absoluteFrom)('/output/path'));
            expect(fn('en', 'relative/path')).toEqual((0, file_system_1.absoluteFrom)('/output/path/relative/path'));
            expect(fn('en', '../parent/path')).toEqual((0, file_system_1.absoluteFrom)('/output/parent/path'));
        });
        it('should return a function that interpolates the `{{LOCALE}}` in the middle of the `outputPath`', () => {
            const fn = (0, output_path_1.getOutputPathFn)(fs, (0, file_system_1.absoluteFrom)('/output/{{LOCALE}}/path'));
            expect(fn('en', 'relative/path')).toEqual((0, file_system_1.absoluteFrom)('/output/en/path/relative/path'));
            expect(fn('fr', 'relative/path')).toEqual((0, file_system_1.absoluteFrom)('/output/fr/path/relative/path'));
        });
        it('should return a function that interpolates the `{{LOCALE}}` in the middle of a path segment in the `outputPath`', () => {
            const fn = (0, output_path_1.getOutputPathFn)(fs, (0, file_system_1.absoluteFrom)('/output-{{LOCALE}}-path'));
            expect(fn('en', 'relative/path')).toEqual((0, file_system_1.absoluteFrom)('/output-en-path/relative/path'));
            expect(fn('fr', 'relative/path')).toEqual((0, file_system_1.absoluteFrom)('/output-fr-path/relative/path'));
        });
        it('should return a function that interpolates the `{{LOCALE}}` at the end of the `outputPath`', () => {
            const fn = (0, output_path_1.getOutputPathFn)(fs, (0, file_system_1.absoluteFrom)('/output/{{LOCALE}}'));
            expect(fn('en', 'relative/path')).toEqual((0, file_system_1.absoluteFrom)('/output/en/relative/path'));
            expect(fn('fr', 'relative/path')).toEqual((0, file_system_1.absoluteFrom)('/output/fr/relative/path'));
        });
    });
});
