"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTests = runTests;
const check_errors_1 = require("./check_errors");
const check_expectations_1 = require("./check_expectations");
const compile_test_1 = require("./compile_test");
const get_compliance_tests_1 = require("./get_compliance_tests");
function transformExpectation(expectation, isLocalCompilation) {
    expectation.files = expectation.files.map((pair) => ({
        expected: pair.expected,
        generated: pair.generated,
    }));
    if (isLocalCompilation) {
        expectation.files = expectation.files.map((pair) => ({
            expected: getFilenameForLocalCompilation(pair.expected),
            generated: pair.generated,
        }));
    }
}
/** Adds a '.local' pre-extension, e.g., basic_full.js -> basic_full.local.js */
function getFilenameForLocalCompilation(fileName) {
    return fileName.replace(/\.([cm]?js)$/, '.local.$1');
}
/**
 * Set up jasmine specs for each of the compliance tests.
 *
 * @param type A description of the type of tests being run.
 * @param compileFn The function that will do the compilation of the source files
 * @param options Extra options. Currently the only option is the flag `isLocalCompilation` which
 *     indicates whether we are testing in local compilation mode.
 */
function runTests(type, compileFn, options = {}) {
    describe(`compliance tests (${type})`, () => {
        for (const test of (0, get_compliance_tests_1.getAllComplianceTests)()) {
            if (!test.compilationModeFilter.includes(type)) {
                continue;
            }
            if (test.skipForTemplatePipeline) {
                continue;
            }
            describe(`[${test.relativePath}]`, () => {
                const itFn = test.focusTest ? fit : test.excludeTest ? xit : it;
                itFn(test.description, () => {
                    var _a;
                    if (type === 'linked compile' && ((_a = test.compilerOptions) === null || _a === void 0 ? void 0 : _a['target']) === 'ES5') {
                        throw new Error(`The "${type}" scenario does not support ES5 output.\n` +
                            `Did you mean to set \`"compilationModeFilter": ["full compile"]\` in "${test.relativePath}"?`);
                    }
                    const fs = (0, compile_test_1.initMockTestFileSystem)(test.realTestPath);
                    const { errors } = compileFn(fs, test);
                    for (const expectation of test.expectations) {
                        transformExpectation(expectation, !!options.isLocalCompilation);
                        if (expectation.expectedErrors.length > 0) {
                            (0, check_errors_1.checkErrors)(test.relativePath, expectation.failureMessage, expectation.expectedErrors, errors);
                        }
                        else {
                            (0, check_errors_1.checkNoUnexpectedErrors)(test.relativePath, errors);
                            (0, check_expectations_1.checkExpectations)(fs, test.relativePath, expectation.failureMessage, expectation.files, expectation.extraChecks, options.skipMappingChecks);
                        }
                    }
                });
            });
        }
    });
}
