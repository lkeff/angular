"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseProgramInfo = createBaseProgramInfo;
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const target_detection_1 = require("./google3/target_detection");
const ngtsc_program_1 = require("./ngtsc_program");
const ts_parse_config_1 = require("./ts_parse_config");
const ts_program_1 = require("./ts_program");
/** Creates the base program info for the given tsconfig path. */
function createBaseProgramInfo(absoluteTsconfigPath, fs, optionOverrides = {}) {
    if (fs === undefined) {
        fs = new file_system_1.NodeJSFileSystem();
        (0, file_system_1.setFileSystem)(fs);
    }
    const tsconfig = (0, ts_parse_config_1.parseTsconfigOrDie)(absoluteTsconfigPath, fs);
    const tsHost = new file_system_1.NgtscCompilerHost(fs, tsconfig.options);
    // When enabled, use a plain TS program if we are sure it's not
    // an Angular project based on the `tsconfig.json`.
    if ((0, target_detection_1.google3UsePlainTsProgramIfNoKnownAngularOption)() &&
        tsconfig.options['_useHostForImportGeneration'] === undefined) {
        return (0, ts_program_1.createPlainTsProgram)(tsHost, tsconfig, optionOverrides);
    }
    return (0, ngtsc_program_1.createNgtscProgram)(tsHost, tsconfig, optionOverrides);
}
