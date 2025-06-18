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
const path = __importStar(require("path"));
const symbol_extractor_1 = require("./symbol_extractor");
describe('scenarios', () => {
    const symbolExtractorSpecDir = path.dirname(runfiles_1.runfiles.resolve('angular/tools/symbol-extractor/symbol_extractor_spec/empty.json'));
    const scenarioFiles = fs.readdirSync(symbolExtractorSpecDir);
    for (let i = 0; i < scenarioFiles.length; i++) {
        const filePath = scenarioFiles[i];
        // We only consider files as tests if they have a `.js` extension, but do
        // not resolve to a tsickle externs file (which is a leftover from TS targets).
        if (!filePath.endsWith('.js') || filePath.endsWith('.externs.js')) {
            continue;
        }
        const testName = filePath.substring(0, filePath.lastIndexOf('.'));
        const goldenFilePath = path.join(symbolExtractorSpecDir, `${testName}.json`);
        if (!fs.existsSync(goldenFilePath)) {
            throw new Error(`No golden file found for test: ${filePath}`);
        }
        // Left here so that it is easy to debug single test.
        // if (testName !== 'hello_world_min_debug') continue;
        it(testName, () => {
            const jsFileContent = fs.readFileSync(path.join(symbolExtractorSpecDir, filePath)).toString();
            const jsonFileContent = fs.readFileSync(goldenFilePath).toString();
            const symbols = symbol_extractor_1.SymbolExtractor.parse(testName, jsFileContent);
            const diff = symbol_extractor_1.SymbolExtractor.diff(symbols, jsonFileContent);
            expect(diff).toEqual({});
        });
    }
    // Tests not existing in source root. We cannot glob for generated test fixtures as
    // tests do not run in a sandbox on Windows.
    it('should properly capture classes in TypeScript ES2015 class output', () => {
        const jsFileContent = fs.readFileSync(runfiles_1.runfiles.resolve('angular/tools/symbol-extractor/symbol_extractor_spec/es2015_class_output.js'), 'utf8');
        const jsonFileContent = fs
            .readFileSync(path.join(symbolExtractorSpecDir, 'es2015_class_output.json'))
            .toString();
        const symbols = symbol_extractor_1.SymbolExtractor.parse('es2015_class_output', jsFileContent);
        const diff = symbol_extractor_1.SymbolExtractor.diff(symbols, jsonFileContent);
        expect(diff).toEqual({});
    });
});
