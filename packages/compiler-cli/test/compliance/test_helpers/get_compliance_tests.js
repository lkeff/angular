"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs = void 0;
exports.getAllComplianceTests = getAllComplianceTests;
exports.getComplianceTests = getComplianceTests;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const runfiles_1 = require("@bazel/runfiles");
const file_system_1 = require("../../../src/ngtsc/file_system");
exports.fs = new file_system_1.NodeJSFileSystem();
/** Path to the test case sources. */
const basePath = exports.fs.resolve(runfiles_1.runfiles.resolveWorkspaceRelative('packages/compiler-cli/test/compliance/test_cases'));
/**
 * Search the `test_cases` directory, in the real file-system, for all the compliance tests.
 *
 * Test are indicated by a `TEST_CASES.json` file which contains one or more test cases.
 */
function* getAllComplianceTests() {
    const testConfigPaths = collectPaths(basePath, (segment) => segment === 'TEST_CASES.json');
    for (const testConfigPath of testConfigPaths) {
        yield* getComplianceTests(testConfigPath);
    }
}
/**
 * Extract all the compliance tests from the TEST_CASES.json file at the `testConfigPath`.
 *
 * @param testConfigPath Absolute disk path of the `TEST_CASES.json` file that describes the tests.

 */
function* getComplianceTests(absTestConfigPath) {
    const realTestPath = exports.fs.dirname(absTestConfigPath);
    const testConfigJSON = loadTestCasesFile(exports.fs, absTestConfigPath, basePath).cases;
    const testConfig = Array.isArray(testConfigJSON) ? testConfigJSON : [testConfigJSON];
    for (const test of testConfig) {
        const inputFiles = getStringArrayOrDefault(test, 'inputFiles', realTestPath, ['test.ts']);
        const compilationModeFilter = getStringArrayOrDefault(test, 'compilationModeFilter', realTestPath, ['linked compile', 'full compile']);
        yield {
            relativePath: exports.fs.relative(basePath, realTestPath),
            realTestPath,
            description: getStringOrFail(test, 'description', realTestPath),
            inputFiles,
            compilationModeFilter,
            expectations: parseExpectations(test.expectations, realTestPath, inputFiles),
            compilerOptions: getConfigOptions(test, 'compilerOptions', realTestPath),
            angularCompilerOptions: getConfigOptions(test, 'angularCompilerOptions', realTestPath),
            skipForTemplatePipeline: test.skipForTemplatePipeline,
            focusTest: test.focusTest,
            excludeTest: test.excludeTest,
        };
    }
}
function loadTestCasesFile(fs, testCasesPath, basePath) {
    try {
        return JSON.parse(fs.readFile(testCasesPath));
    }
    catch (e) {
        throw new Error(`Failed to load test-cases at "${fs.relative(basePath, testCasesPath)}":\n ${e.message}`);
    }
}
/**
 * Search the file-system from the `current` path to find all paths that satisfy the `predicate`.
 */
function* collectPaths(current, predicate) {
    if (!exports.fs.exists(current)) {
        return;
    }
    for (const segment of exports.fs.readdir(current)) {
        const absPath = exports.fs.resolve(current, segment);
        if (predicate(segment)) {
            yield absPath;
        }
        else {
            if (exports.fs.lstat(absPath).isDirectory()) {
                yield* collectPaths(absPath, predicate);
            }
        }
    }
}
function getStringOrFail(container, property, testPath) {
    const value = container[property];
    if (typeof value !== 'string') {
        throw new Error(`Test is missing "${property}" property in TEST_CASES.json: ` + testPath);
    }
    return value;
}
function getStringArrayOrDefault(container, property, testPath, defaultValue) {
    const value = container[property];
    if (typeof value === 'undefined') {
        return defaultValue;
    }
    if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
        throw new Error(`Test has invalid "${property}" property in TEST_CASES.json - expected array of strings: ` +
            testPath);
    }
    return value;
}
function parseExpectations(value, testPath, inputFiles) {
    const defaultFailureMessage = 'Incorrect generated output.';
    const tsFiles = inputFiles.filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'));
    const defaultFiles = tsFiles.map((inputFile) => {
        const outputFile = inputFile.replace(/\.ts$/, '.js');
        return { expected: outputFile, generated: outputFile };
    });
    if (typeof value === 'undefined') {
        return [
            {
                failureMessage: defaultFailureMessage,
                files: defaultFiles,
                expectedErrors: [],
                extraChecks: [],
            },
        ];
    }
    if (!Array.isArray(value)) {
        return parseExpectations([value], testPath, inputFiles);
    }
    return value.map((expectation, i) => {
        var _a;
        if (typeof expectation !== 'object') {
            throw new Error(`Test has invalid "expectations" property in TEST_CASES.json - expected array of "expectation" objects: ${testPath}`);
        }
        const failureMessage = (_a = expectation.failureMessage) !== null && _a !== void 0 ? _a : defaultFailureMessage;
        const expectedErrors = parseExpectedErrors(expectation.expectedErrors, testPath);
        const extraChecks = parseExtraChecks(expectation.extraChecks, testPath);
        if (typeof expectation.files === 'undefined') {
            return { failureMessage, files: defaultFiles, expectedErrors, extraChecks };
        }
        if (!Array.isArray(expectation.files)) {
            throw new Error(`Test has invalid "expectations[${i}].files" property in TEST_CASES.json - expected array of "expected files": ${testPath}`);
        }
        const files = expectation.files.map((file) => {
            if (typeof file === 'string') {
                return { expected: file, generated: file };
            }
            if (typeof file === 'object' &&
                typeof file.expected === 'string' &&
                typeof file.generated === 'string') {
                return file;
            }
            throw new Error(`Test has invalid "expectations[${i}].files" property in TEST_CASES.json - expected each item to be a string or an "expected file" object: ${testPath}`);
        });
        return { failureMessage, files, expectedErrors, extraChecks };
    });
}
function parseExpectedErrors(expectedErrors = [], testPath) {
    if (!Array.isArray(expectedErrors)) {
        throw new Error('Test has invalid "expectedErrors" property in TEST_CASES.json - expected an array: ' +
            testPath);
    }
    return expectedErrors.map((error) => {
        if (typeof error !== 'object' ||
            typeof error.message !== 'string' ||
            (error.location && typeof error.location !== 'string')) {
            throw new Error(`Test has invalid "expectedErrors" property in TEST_CASES.json - expected an array of ExpectedError objects: ` +
                testPath);
        }
        return { message: parseRegExp(error.message), location: parseRegExp(error.location) };
    });
}
function parseExtraChecks(extraChecks = [], testPath) {
    if (!Array.isArray(extraChecks) ||
        !extraChecks.every((i) => typeof i === 'string' || Array.isArray(i))) {
        throw new Error(`Test has invalid "extraChecks" property in TEST_CASES.json - expected an array of strings or arrays: ` +
            testPath);
    }
    return extraChecks;
}
function parseRegExp(str) {
    return new RegExp(str || '');
}
function getConfigOptions(container, property, testPath) {
    const options = container[property];
    if (options !== undefined && typeof options !== 'object') {
        throw new Error(`Test have invalid "${property}" property in TEST_CASES.json - expected config option object: ` +
            testPath);
    }
    return options;
}
