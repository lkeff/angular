"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGoldenPartial = generateGoldenPartial;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const node_fs_1 = __importDefault(require("node:fs"));
const compile_test_1 = require("../test_helpers/compile_test");
const get_compliance_tests_1 = require("../test_helpers/get_compliance_tests");
const golden_partials_1 = require("../test_helpers/golden_partials");
/**
 * Generate the golden partial output for the tests described in the `testConfigPath` config file.
 *
 * @param testConfigPath Absolute disk path of the `TEST_CASES.json` file that describes the tests.
 * @param outputPath Absolute disk path for the golden output.
 */
function generateGoldenPartial(absTestConfigPath, outputPath) {
    const files = [];
    const tests = (0, get_compliance_tests_1.getComplianceTests)(absTestConfigPath);
    for (const test of tests) {
        const fs = (0, compile_test_1.initMockTestFileSystem)(test.realTestPath);
        for (const file of compilePartials(fs, test)) {
            files.push(file);
        }
    }
    writeGoldenPartial(files, outputPath);
}
/**
 * Partially compile the source files specified by the given `test`.
 *
 * @param fs The mock file-system to use when compiling partials.
 * @param test The information about the test being compiled.
 */
function* compilePartials(fs, test) {
    const builtDirectory = (0, compile_test_1.getBuildOutputDirectory)(fs);
    const result = (0, compile_test_1.compileTest)(fs, test.inputFiles, test.compilerOptions, Object.assign({ compilationMode: 'partial' }, test.angularCompilerOptions));
    if (result.errors.length > 0) {
        throw new Error(`Unexpected compilation errors: ${result.errors.map((e) => ` - ${e}`).join('\n')}`);
    }
    for (const generatedPath of result.emittedFiles) {
        yield {
            path: fs.relative(builtDirectory, generatedPath),
            content: fs.readFile(generatedPath),
        };
    }
}
/**
 * Write the partially compiled files to the appropriate output destination.
 *
 * @param files The partially compiled files.
 * @param outputPath absolute disk path for the golden to write to.
 */
function writeGoldenPartial(files, outputPath) {
    const goldenOutput = (0, golden_partials_1.renderGoldenPartial)(files);
    node_fs_1.default.writeFileSync(outputPath, 
    // Note: Keeping trailing \n as otherwise many goldens need to be re-approved.
    goldenOutput + '\n', 'utf8');
}
