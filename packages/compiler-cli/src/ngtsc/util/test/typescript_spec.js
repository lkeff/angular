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
const typescript_1 = require("../src/typescript");
(0, testing_1.runInEachFileSystem)(() => {
    let fs;
    beforeEach(() => {
        fs = (0, file_system_1.getFileSystem)();
    });
    describe('typescript', () => {
        it('should allow relative root directories', () => {
            const mockCompilerHost = {
                getCanonicalFileName: (val) => val,
                getCurrentDirectory: () => '/fs-root/projects',
            };
            const result = (0, typescript_1.getRootDirs)(mockCompilerHost, { rootDir: './test-project-root' });
            expect(result).toEqual([fs.resolve('/fs-root/projects/test-project-root')]);
        });
    });
});
