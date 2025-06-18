"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInNativeFileSystem = runInNativeFileSystem;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const invalid_file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system/src/invalid_file_system");
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
/**
 * Only run these tests on the "native" file-system.
 *
 * Babel uses the `path.resolve()` function internally, which makes it very hard to mock out the
 * file-system from the outside. We run these tests on Unix and Windows in our CI jobs, so there is
 * test coverage.
 */
function runInNativeFileSystem(callback) {
    describe(`<<FileSystem: Native>>`, () => {
        beforeEach(() => (0, file_system_1.setFileSystem)(new testing_1.MockFileSystemNative()));
        afterEach(() => (0, file_system_1.setFileSystem)(new invalid_file_system_1.InvalidFileSystem()));
        callback();
    });
}
