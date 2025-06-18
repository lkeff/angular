"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imports_1 = require("@angular/compiler-cli/src/ngtsc/imports");
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
const jit_1 = require("@angular/compiler-cli/src/ngtsc/transform/jit");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [outputDirExecPath, ...inputFileExecpaths] = process.argv.slice(2);
        const program = typescript_1.default.createProgram(inputFileExecpaths, {
            skipLibCheck: true,
            module: typescript_1.default.ModuleKind.ESNext,
            target: typescript_1.default.ScriptTarget.ESNext,
            moduleResolution: typescript_1.default.ModuleResolutionKind.Node10,
        });
        const host = new reflection_1.TypeScriptReflectionHost(program.getTypeChecker());
        const importTracker = new imports_1.ImportedSymbolsTracker();
        for (const inputFileExecpath of inputFileExecpaths) {
            const outputFile = typescript_1.default.transform(program.getSourceFile(inputFileExecpath), [(0, jit_1.getInitializerApiJitTransform)(host, importTracker, /* isCore */ false)], program.getCompilerOptions());
            yield fs_1.default.promises.writeFile(path_1.default.join(outputDirExecPath, `transformed_${path_1.default.basename(inputFileExecpath)}`), typescript_1.default.createPrinter().printFile(outputFile.transformed[0]));
        }
    });
}
