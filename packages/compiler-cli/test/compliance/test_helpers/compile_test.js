"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMockTestFileSystem = initMockTestFileSystem;
exports.compileTest = compileTest;
exports.getRootDirectory = getRootDirectory;
exports.getBuildOutputDirectory = getBuildOutputDirectory;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const testing_1 = require("../../../src/ngtsc/file_system/testing");
const testing_2 = require("../../../src/ngtsc/testing");
const perform_compile_1 = require("../../../src/perform_compile");
/**
 * Setup a mock file-system that is used to generate the partial files.
 *
 * @param realTestPath Absolute path (on the real file-system) to the test case being processed.
 * @returns a mock file-system containing the test case files.
 */
function initMockTestFileSystem(realTestPath) {
    const fs = (0, testing_1.initMockFileSystem)('Native');
    const testFiles = (0, testing_2.loadStandardTestFiles)();
    fs.init(testFiles);
    (0, testing_2.loadTestDirectory)(fs, realTestPath, getRootDirectory(fs));
    monkeyPatchReadFile(fs);
    return fs;
}
/**
 * Compile the input source `files` stored in `fs`, writing the generated files to `fs`.
 *
 * @param fs The mock file-system where the input and generated files live.
 * @param files An array of paths (relative to the testPath) of input files to be compiled.
 * @param compilerOptions Any extra options to pass to the TypeScript compiler.
 * @param angularCompilerOptions Any extra options to pass to the Angular compiler.
 * @returns A collection of paths of the generated files (absolute within the mock file-system).
 */
function compileTest(fs, files, compilerOptions, angularCompilerOptions) {
    const rootDir = getRootDirectory(fs);
    const outDir = getBuildOutputDirectory(fs);
    const options = getOptions(rootDir, outDir, compilerOptions, angularCompilerOptions);
    const rootNames = files.map((f) => fs.resolve(f));
    const host = new testing_2.NgtscTestCompilerHost(fs, options);
    const { diagnostics, emitResult } = (0, perform_compile_1.performCompilation)({ rootNames, host, options });
    const emittedFiles = emitResult
        ? emitResult.emittedFiles.map((p) => fs.resolve(rootDir, p))
        : [];
    const errors = parseDiagnostics(diagnostics);
    return { errors, emittedFiles };
}
/**
 * Gets an absolute path (in the mock file-system) of the root directory where the compilation is to
 * be done.
 *
 * @param fs the mock file-system where the compilation is happening.
 */
function getRootDirectory(fs) {
    return fs.resolve('/');
}
/**
 * Gets an absolute path (in the mock file-system) of the directory where the compiled files are
 * stored.
 *
 * @param fs the mock file-system where the compilation is happening.
 */
function getBuildOutputDirectory(fs) {
    return fs.resolve('/built');
}
/**
 * Get the options object to pass to the compiler.
 *
 * @param rootDir The absolute path (within the mock file-system) that is the root of the
 *     compilation.
 * @param outDir The absolute path (within the mock file-system) where compiled files will be
 *     written.
 * @param compilerOptions Additional options for the TypeScript compiler.
 * @param angularCompilerOptions Additional options for the Angular compiler.
 */
function getOptions(rootDir, outDir, compilerOptions, angularCompilerOptions) {
    const convertedCompilerOptions = typescript_1.default.convertCompilerOptionsFromJson(compilerOptions, rootDir);
    if (convertedCompilerOptions.errors.length > 0) {
        throw new Error('Invalid compilerOptions in test-case::\n' +
            convertedCompilerOptions.errors.map((d) => d.messageText).join('\n'));
    }
    return Object.assign(Object.assign(Object.assign({ emitDecoratorMetadata: true, experimentalDecorators: true, skipLibCheck: true, noImplicitAny: true, noEmitOnError: true, listEmittedFiles: true, strictNullChecks: true, outDir,
        rootDir, baseUrl: '.', allowJs: true, declaration: true, target: typescript_1.default.ScriptTarget.ES2015, newLine: typescript_1.default.NewLineKind.LineFeed, module: typescript_1.default.ModuleKind.ES2015, moduleResolution: typescript_1.default.ModuleResolutionKind.Node10, typeRoots: ['node_modules/@types'] }, convertedCompilerOptions.options), { enableI18nLegacyMessageIdFormat: false }), angularCompilerOptions);
}
/**
 * Replace escaped line-ending markers (\r\n) with real line-ending characters.
 *
 * This allows us to simulate, more reliably, files that have `\r\n` line-endings.
 * (See `test_cases/r3_view_compiler_i18n/line_ending_normalization/template.html`.)
 */
function monkeyPatchReadFile(fs) {
    const originalReadFile = fs.readFile;
    fs.readFile = (path) => {
        const file = originalReadFile.call(fs, path);
        return (file
            // First convert actual `\r\n` sequences to `\n`
            .replace(/\r\n/g, '\n')
            // unescape `\r\n` at the end of a line
            .replace(/\\r\\n\n/g, '\r\n')
            // unescape `\\r\\n`, at the end of a line, to `\r\n`
            .replace(/\\\\r\\\\n(\r?\n)/g, '\\r\\n$1'));
    };
}
/**
 * Parse the `diagnostics` to extract an error message string.
 *
 * The error message includes the location if available.
 *
 * @param diagnostics The diagnostics to parse.
 */
function parseDiagnostics(diagnostics) {
    return diagnostics.map((diagnostic) => {
        const message = typescript_1.default.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        if ('file' in diagnostic && diagnostic.file !== undefined && diagnostic.start !== undefined) {
            const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
        }
        else {
            return message;
        }
    });
}
