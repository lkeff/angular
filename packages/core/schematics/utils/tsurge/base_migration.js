"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsurgeBaseMigration = void 0;
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const typescript_1 = require("@angular/compiler-cli/src/ngtsc/util/src/typescript");
const shims_1 = require("@angular/compiler-cli/src/ngtsc/shims");
const create_program_1 = require("./helpers/create_program");
/**
 * @private
 *
 * Base class for the possible Tsurge migration variants.
 *
 * For example, this class exposes methods to conveniently create
 * TypeScript programs, while also allowing migration authors to override.
 */
class TsurgeBaseMigration {
    /**
     * Advanced Tsurge users can override this method, but most of the time,
     * overriding {@link prepareProgram} is more desirable.
     *
     * By default:
     *  - In 3P: Ngtsc programs are being created.
     *  - In 1P: Ngtsc or TS programs are created based on the Blaze target.
     */
    createProgram(tsconfigAbsPath, fs, optionOverrides) {
        return (0, create_program_1.createBaseProgramInfo)(tsconfigAbsPath, fs, optionOverrides);
    }
    // Optional function to prepare the base `ProgramInfo` even further,
    // for the analyze and migrate phases. E.g. determining source files.
    prepareProgram(info) {
        var _a, _b;
        const fullProgramSourceFiles = [...info.program.getSourceFiles()];
        const sourceFiles = fullProgramSourceFiles.filter((f) => !f.isDeclarationFile &&
            // Note `isShim` will work for the initial program, but for TCB programs, the shims are no longer annotated.
            !(0, shims_1.isShim)(f) &&
            !f.fileName.endsWith('.ngtypecheck.ts'));
        // Sort it by length in reverse order (longest first). This speeds up lookups,
        // since there's no need to keep going through the array once a match is found.
        const sortedRootDirs = (0, typescript_1.getRootDirs)(info.host, info.userOptions).sort((a, b) => b.length - a.length);
        // TODO: Consider also following TS's logic here, finding the common source root.
        // See: Program#getCommonSourceDirectory.
        const primaryRoot = (0, file_system_1.absoluteFrom)((_b = (_a = info.userOptions.rootDir) !== null && _a !== void 0 ? _a : sortedRootDirs.at(-1)) !== null && _b !== void 0 ? _b : info.program.getCurrentDirectory());
        return Object.assign(Object.assign({}, info), { sourceFiles,
            fullProgramSourceFiles,
            sortedRootDirs, projectRoot: primaryRoot });
    }
}
exports.TsurgeBaseMigration = TsurgeBaseMigration;
