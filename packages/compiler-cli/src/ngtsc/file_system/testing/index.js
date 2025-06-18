"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInEachFileSystem = exports.initMockFileSystem = exports.MockFileSystemWindows = exports.MockFileSystemPosix = exports.MockFileSystemNative = exports.MockFileSystem = void 0;
var mock_file_system_1 = require("./src/mock_file_system");
Object.defineProperty(exports, "MockFileSystem", { enumerable: true, get: function () { return mock_file_system_1.MockFileSystem; } });
var mock_file_system_native_1 = require("./src/mock_file_system_native");
Object.defineProperty(exports, "MockFileSystemNative", { enumerable: true, get: function () { return mock_file_system_native_1.MockFileSystemNative; } });
var mock_file_system_posix_1 = require("./src/mock_file_system_posix");
Object.defineProperty(exports, "MockFileSystemPosix", { enumerable: true, get: function () { return mock_file_system_posix_1.MockFileSystemPosix; } });
var mock_file_system_windows_1 = require("./src/mock_file_system_windows");
Object.defineProperty(exports, "MockFileSystemWindows", { enumerable: true, get: function () { return mock_file_system_windows_1.MockFileSystemWindows; } });
var test_helper_1 = require("./src/test_helper");
Object.defineProperty(exports, "initMockFileSystem", { enumerable: true, get: function () { return test_helper_1.initMockFileSystem; } });
Object.defineProperty(exports, "runInEachFileSystem", { enumerable: true, get: function () { return test_helper_1.runInEachFileSystem; } });
