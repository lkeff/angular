"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compile_test_1 = require("../test_helpers/compile_test");
const test_runner_1 = require("../test_helpers/test_runner");
(0, test_runner_1.runTests)('full compile', compileTests);
/**
 * Fully compile all the input files in the given `test`.
 *
 * @param fs The mock file-system where the input files can be found.
 * @param test The compliance test whose input files should be compiled.
 */
function compileTests(fs, test) {
    return (0, compile_test_1.compileTest)(fs, test.inputFiles, test.compilerOptions, test.angularCompilerOptions);
}
