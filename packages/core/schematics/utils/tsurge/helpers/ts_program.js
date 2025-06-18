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
exports.defaultMigrationTsOptions = void 0;
exports.createPlainTsProgram = createPlainTsProgram;
const typescript_1 = __importDefault(require("typescript"));
/** Options that are good defaults for Tsurge migrations. */
exports.defaultMigrationTsOptions = {
    // Avoid checking libraries to speed up migrations.
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    noEmit: true,
    // Does not apply to g3 and externally is enforced when the app is built by the compiler.
    disableTypeScriptVersionCheck: true,
};
/**
 * Creates an instance of a TypeScript program for the given project.
 */
function createPlainTsProgram(tsHost, tsconfig, optionOverrides) {
    const program = typescript_1.default.createProgram({
        rootNames: tsconfig.rootNames,
        options: Object.assign(Object.assign(Object.assign({}, tsconfig.options), exports.defaultMigrationTsOptions), optionOverrides),
    });
    return {
        ngCompiler: null,
        program,
        userOptions: tsconfig.options,
        programAbsoluteRootFileNames: tsconfig.rootNames,
        host: tsHost,
    };
}
