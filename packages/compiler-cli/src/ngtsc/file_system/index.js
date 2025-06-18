"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileSystemTsReadDirectoryFn = exports.getSourceFileOrError = exports.NodeJSFileSystem = exports.LogicalProjectPath = exports.LogicalFileSystem = exports.toRelativeImport = exports.setFileSystem = exports.resolve = exports.relativeFrom = exports.relative = exports.join = exports.isRooted = exports.isRoot = exports.isLocalRelativePath = exports.getFileSystem = exports.dirname = exports.basename = exports.absoluteFromSourceFile = exports.absoluteFrom = exports.NgtscCompilerHost = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var compiler_host_1 = require("./src/compiler_host");
Object.defineProperty(exports, "NgtscCompilerHost", { enumerable: true, get: function () { return compiler_host_1.NgtscCompilerHost; } });
var helpers_1 = require("./src/helpers");
Object.defineProperty(exports, "absoluteFrom", { enumerable: true, get: function () { return helpers_1.absoluteFrom; } });
Object.defineProperty(exports, "absoluteFromSourceFile", { enumerable: true, get: function () { return helpers_1.absoluteFromSourceFile; } });
Object.defineProperty(exports, "basename", { enumerable: true, get: function () { return helpers_1.basename; } });
Object.defineProperty(exports, "dirname", { enumerable: true, get: function () { return helpers_1.dirname; } });
Object.defineProperty(exports, "getFileSystem", { enumerable: true, get: function () { return helpers_1.getFileSystem; } });
Object.defineProperty(exports, "isLocalRelativePath", { enumerable: true, get: function () { return helpers_1.isLocalRelativePath; } });
Object.defineProperty(exports, "isRoot", { enumerable: true, get: function () { return helpers_1.isRoot; } });
Object.defineProperty(exports, "isRooted", { enumerable: true, get: function () { return helpers_1.isRooted; } });
Object.defineProperty(exports, "join", { enumerable: true, get: function () { return helpers_1.join; } });
Object.defineProperty(exports, "relative", { enumerable: true, get: function () { return helpers_1.relative; } });
Object.defineProperty(exports, "relativeFrom", { enumerable: true, get: function () { return helpers_1.relativeFrom; } });
Object.defineProperty(exports, "resolve", { enumerable: true, get: function () { return helpers_1.resolve; } });
Object.defineProperty(exports, "setFileSystem", { enumerable: true, get: function () { return helpers_1.setFileSystem; } });
Object.defineProperty(exports, "toRelativeImport", { enumerable: true, get: function () { return helpers_1.toRelativeImport; } });
var logical_1 = require("./src/logical");
Object.defineProperty(exports, "LogicalFileSystem", { enumerable: true, get: function () { return logical_1.LogicalFileSystem; } });
Object.defineProperty(exports, "LogicalProjectPath", { enumerable: true, get: function () { return logical_1.LogicalProjectPath; } });
var node_js_file_system_1 = require("./src/node_js_file_system");
Object.defineProperty(exports, "NodeJSFileSystem", { enumerable: true, get: function () { return node_js_file_system_1.NodeJSFileSystem; } });
var util_1 = require("./src/util");
Object.defineProperty(exports, "getSourceFileOrError", { enumerable: true, get: function () { return util_1.getSourceFileOrError; } });
var ts_read_directory_1 = require("./src/ts_read_directory");
Object.defineProperty(exports, "createFileSystemTsReadDirectoryFn", { enumerable: true, get: function () { return ts_read_directory_1.createFileSystemTsReadDirectoryFn; } });
