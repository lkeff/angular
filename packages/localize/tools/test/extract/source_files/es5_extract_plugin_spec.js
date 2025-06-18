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
const core_1 = require("@babel/core");
const es5_extract_plugin_1 = require("../../../src/extract/source_files/es5_extract_plugin");
const helpers_1 = require("../../helpers");
(0, helpers_1.runInNativeFileSystem)(() => {
    let fs;
    let testPath;
    beforeEach(() => {
        fs = (0, file_system_1.getFileSystem)();
        testPath = (0, file_system_1.relativeFrom)('app/dist/test.js');
    });
    describe('makeEs5ExtractPlugin()', () => {
        it('should error with code-frame information if the first argument to `$localize` is not an array', () => {
            const input = '$localize(null, [])';
            expect(() => transformCode(input)).toThrowError(`Cannot create property 'message' on string '${testPath}: ` +
                'Unexpected messageParts for `$localize` (expected an array of strings).\n' +
                '> 1 | $localize(null, [])\n' +
                "    |           ^^^^'");
        });
        function transformCode(input) {
            const messages = [];
            const cwd = fs.resolve('/');
            const filename = fs.resolve(cwd, testPath);
            (0, core_1.transformSync)(input, {
                plugins: [(0, es5_extract_plugin_1.makeEs5ExtractPlugin)((0, file_system_1.getFileSystem)(), messages)],
                filename,
                cwd,
            }).code;
            return messages;
        }
    });
});
