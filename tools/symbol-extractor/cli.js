"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const runfiles_1 = require("@bazel/runfiles");
const fs = __importStar(require("fs"));
const symbol_extractor_1 = require("./symbol_extractor");
const args = process.argv.slice(2);
process.exitCode = main(args) ? 0 : 1;
/**
 * CLI main method.
 *
 * ```
 *   cli javascriptFilePath.js goldenFilePath.json
 * ```
 */
function main(argv) {
    const javascriptFilePath = runfiles_1.runfiles.resolveWorkspaceRelative(argv[0]);
    const goldenFilePath = runfiles_1.runfiles.resolveWorkspaceRelative(argv[1]);
    const doUpdate = argv[2] == '--accept';
    console.info('Input javascript file:', javascriptFilePath);
    const javascriptContent = fs.readFileSync(javascriptFilePath).toString();
    const goldenContent = fs.readFileSync(goldenFilePath).toString();
    const symbolExtractor = new symbol_extractor_1.SymbolExtractor(javascriptFilePath, javascriptContent);
    let passed = false;
    if (doUpdate) {
        fs.writeFileSync(goldenFilePath, JSON.stringify(symbolExtractor.actual, undefined, 2));
        console.error('Updated gold file:', goldenFilePath);
        passed = true;
    }
    else {
        passed = symbolExtractor.compareAndPrintError(goldenContent);
        if (!passed) {
            console.error(`TEST FAILED!`);
            console.error(`  To update the golden file run: `);
            console.error(`    yarn bazel run ${process.env['TEST_TARGET']}.accept`);
        }
    }
    return passed;
}
