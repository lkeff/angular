"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngErrorCode = exports.ErrorCode = exports.isLocalCompilationDiagnostics = exports.absoluteFrom = exports.NodeJSFileSystem = exports.LogLevel = exports.ConsoleLogger = exports.OptimizeFor = exports.NgtscProgram = exports.NgTscPlugin = exports.VERSION = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("./src/ngtsc/file_system");
var version_1 = require("./src/version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
__exportStar(require("./src/ngtsc/transform/jit"), exports);
__exportStar(require("./src/transformers/api"), exports);
__exportStar(require("./src/transformers/entry_points"), exports);
__exportStar(require("./src/perform_compile"), exports);
// Internal exports needed for packages relying on the compiler-cli.
// TODO: Remove this when the CLI has switched to the private entry-point.
__exportStar(require("./private/tooling"), exports);
// Exposed as they are needed for relying on the `linker`.
__exportStar(require("./src/ngtsc/logging"), exports);
__exportStar(require("./src/ngtsc/file_system"), exports);
// Exports for dealing with the `ngtsc` program.
var tsc_plugin_1 = require("./src/ngtsc/tsc_plugin");
Object.defineProperty(exports, "NgTscPlugin", { enumerable: true, get: function () { return tsc_plugin_1.NgTscPlugin; } });
var program_1 = require("./src/ngtsc/program");
Object.defineProperty(exports, "NgtscProgram", { enumerable: true, get: function () { return program_1.NgtscProgram; } });
var api_1 = require("./src/ngtsc/typecheck/api");
Object.defineProperty(exports, "OptimizeFor", { enumerable: true, get: function () { return api_1.OptimizeFor; } });
// **Note**: Explicit named exports to make this file work with CJS/ESM interop without
// needing to use a default import. NodeJS will expose named CJS exports as named ESM exports.
// TODO(devversion): Remove these duplicate exports once devmode&prodmode is combined/ESM.
var logging_1 = require("./src/ngtsc/logging");
Object.defineProperty(exports, "ConsoleLogger", { enumerable: true, get: function () { return logging_1.ConsoleLogger; } });
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return logging_1.LogLevel; } });
var file_system_2 = require("./src/ngtsc/file_system");
Object.defineProperty(exports, "NodeJSFileSystem", { enumerable: true, get: function () { return file_system_2.NodeJSFileSystem; } });
Object.defineProperty(exports, "absoluteFrom", { enumerable: true, get: function () { return file_system_2.absoluteFrom; } });
// Export documentation entities for Angular-internal API doc generation.
__exportStar(require("./src/ngtsc/docs/src/entities"), exports);
__exportStar(require("./src/ngtsc/docs"), exports);
// Exposed for usage in 1P Angular plugin.
var diagnostics_1 = require("./src/ngtsc/diagnostics");
Object.defineProperty(exports, "isLocalCompilationDiagnostics", { enumerable: true, get: function () { return diagnostics_1.isLocalCompilationDiagnostics; } });
Object.defineProperty(exports, "ErrorCode", { enumerable: true, get: function () { return diagnostics_1.ErrorCode; } });
Object.defineProperty(exports, "ngErrorCode", { enumerable: true, get: function () { return diagnostics_1.ngErrorCode; } });
(0, file_system_1.setFileSystem)(new file_system_1.NodeJSFileSystem());
