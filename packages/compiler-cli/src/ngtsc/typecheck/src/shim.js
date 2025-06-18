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
exports.TypeCheckShimGenerator = void 0;
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
/**
 * A `ShimGenerator` which adds type-checking files to the `ts.Program`.
 *
 * This is a requirement for performant template type-checking, as TypeScript will only reuse
 * information in the main program when creating the type-checking program if the set of files in
 * each are exactly the same. Thus, the main program also needs the synthetic type-checking files.
 */
class TypeCheckShimGenerator {
    constructor() {
        this.extensionPrefix = 'ngtypecheck';
        this.shouldEmit = false;
    }
    generateShimForFile(sf, genFilePath, priorShimSf) {
        if (priorShimSf !== null) {
            // If this shim existed in the previous program, reuse it now. It might not be correct, but
            // reusing it in the main program allows the shape of its imports to potentially remain the
            // same and TS can then use the fastest path for incremental program creation. Later during
            // the type-checking phase it's going to either be reused, or replaced anyways. Thus there's
            // no harm in reuse here even if it's out of date.
            return priorShimSf;
        }
        return typescript_1.default.createSourceFile(genFilePath, 'export const USED_FOR_NG_TYPE_CHECKING = true;', typescript_1.default.ScriptTarget.Latest, true, typescript_1.default.ScriptKind.TS);
    }
    static shimFor(fileName) {
        return (0, file_system_1.absoluteFrom)(fileName.replace(/\.tsx?$/, '.ngtypecheck.ts'));
    }
}
exports.TypeCheckShimGenerator = TypeCheckShimGenerator;
