"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const runfiles_1 = require("@bazel/runfiles");
const fs_1 = require("fs");
const path_1 = require("path");
describe('flat_module ng_module', () => {
    let packageOutput;
    let flatModuleOutFile;
    beforeAll(() => {
        packageOutput = (0, path_1.dirname)(runfiles_1.runfiles.resolve('angular/packages/bazel/test/ngc-wrapped/flat_module/index.mjs'));
        flatModuleOutFile = (0, path_1.join)(packageOutput, 'flat_module.mjs');
    });
    it('should have a flat module out file', () => {
        expect((0, fs_1.existsSync)(flatModuleOutFile)).toBe(true);
    });
    describe('flat module out file', () => {
        it('should have a proper flat module re-export', () => {
            expect((0, fs_1.readFileSync)(flatModuleOutFile, 'utf8')).toContain(`export * from './index';`);
            expect((0, fs_1.readFileSync)(flatModuleOutFile, 'utf8')).toContain(`Generated bundle index. Do not edit.`);
        });
    });
});
