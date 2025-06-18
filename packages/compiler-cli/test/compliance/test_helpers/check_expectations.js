"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExpectations = checkExpectations;
const compile_test_1 = require("./compile_test");
const di_checks_1 = require("./di_checks");
const expect_emit_1 = require("./expect_emit");
const expected_file_macros_1 = require("./expected_file_macros");
const function_checks_1 = require("./function_checks");
const i18n_checks_1 = require("./i18n_checks");
const sourcemap_helpers_1 = require("./sourcemap_helpers");
const EXTRA_CHECK_FUNCTIONS = {
    verifyPlaceholdersIntegrity: i18n_checks_1.verifyPlaceholdersIntegrity,
    verifyUniqueConsts: i18n_checks_1.verifyUniqueConsts,
    verifyUniqueFactory: di_checks_1.verifyUniqueFactory,
    verifyUniqueFunctions: function_checks_1.verifyUniqueFunctions,
};
/**
 * Check that each of the generated files matches the expected files.
 *
 * @param fs The mock file-system that holds the expected and generated files to compare.
 * @param testPath Path to the current test case (relative to the basePath).
 * @param failureMessage The message to display if the expectation fails.
 * @param expectedFiles The list of expected-generated pairs to compare.
 * @param skipMappingCheck Whether to skip checking source mappings.
 *   TODO: Remove this option. This only exists until we fix:
 *         https://github.com/angular/angular/issues/51647.
 */
function checkExpectations(fs, testPath, failureMessage, expectedFiles, extraChecks, skipMappingCheck = false) {
    const builtDirectory = (0, compile_test_1.getBuildOutputDirectory)(fs);
    for (const expectedFile of expectedFiles) {
        const expectedPath = fs.resolve((0, compile_test_1.getRootDirectory)(fs), expectedFile.expected);
        if (!fs.exists(expectedPath)) {
            throw new Error(`The expected file at ${expectedPath} does not exist. Please check the TEST_CASES.json file for this test case.`);
        }
        const generatedPath = fs.resolve(builtDirectory, expectedFile.generated);
        if (!fs.exists(generatedPath)) {
            const error = new Error(`The generated file at ${generatedPath} does not exist.\n` +
                'Perhaps there is no matching input source file in the TEST_CASES.json file for this test case.\n' +
                'Or maybe you need to regenerate the GOLDEN_PARTIAL.js file by running:\n\n' +
                `    yarn bazel run //packages/compiler-cli/test/compliance/test_cases:${testPath}.golden.update`);
            // Clear the stack so that we get a nice error message
            error.stack = '';
            throw error;
        }
        const generated = fs.readFile(generatedPath);
        let expected = fs.readFile(expectedPath);
        expected = (0, expected_file_macros_1.replaceMacros)(expected);
        expected = (0, sourcemap_helpers_1.stripAndCheckMappings)(fs, generated, generatedPath, expected, expectedPath, 
        /** skipMappingCheck */ !!skipMappingCheck);
        (0, expect_emit_1.expectEmit)(generated, expected, `When checking against expected file "${testPath}/${expectedFile.expected}"\n` +
            failureMessage);
        runExtraChecks(testPath, generated, extraChecks);
    }
}
function runExtraChecks(testPath, generated, extraChecks) {
    for (const check of extraChecks) {
        let fnName;
        let args;
        if (Array.isArray(check)) {
            [fnName, ...args] = check;
        }
        else {
            fnName = check;
            args = [];
        }
        const fn = EXTRA_CHECK_FUNCTIONS[fnName];
        if (fn === undefined) {
            throw new Error(`Unknown extra-check function: "${fnName}" in ${testPath}.\n` +
                `Possible choices are: ${Object.keys(EXTRA_CHECK_FUNCTIONS).map((f) => `\n - ${f}`)}.`);
        }
        if (!fn(generated, ...args)) {
            throw new Error(`Extra check ${fnName}(${args
                .map((arg) => JSON.stringify(arg))
                .join(',')}) in ${testPath} failed for generated code:\n\n${generated}`);
        }
    }
}
