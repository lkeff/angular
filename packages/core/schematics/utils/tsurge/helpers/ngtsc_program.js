"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNgtscProgram = createNgtscProgram;
const program_1 = require("@angular/compiler-cli/src/ngtsc/program");
const typescript_1 = __importDefault(require("typescript"));
const ts_program_1 = require("./ts_program");
/**
 * Parses the configuration of the given TypeScript project and creates
 * an instance of the Angular compiler for the project.
 */
function createNgtscProgram(tsHost, tsconfig, optionOverrides) {
    const ngtscProgram = new program_1.NgtscProgram(tsconfig.rootNames, Object.assign(Object.assign(Object.assign({}, tsconfig.options), ts_program_1.defaultMigrationTsOptions), optionOverrides), tsHost);
    // Expose an easy way to debug-print ng semantic diagnostics.
    if (process.env['DEBUG_NG_SEMANTIC_DIAGNOSTICS'] === '1') {
        console.error(typescript_1.default.formatDiagnosticsWithColorAndContext(ngtscProgram.getNgSemanticDiagnostics(), tsHost));
    }
    return {
        ngCompiler: ngtscProgram.compiler,
        program: ngtscProgram.getTsProgram(),
        userOptions: tsconfig.options,
        programAbsoluteRootFileNames: tsconfig.rootNames,
        host: tsHost,
    };
}
