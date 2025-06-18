"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = __importDefault(require("@babel/core"));
const linker_1 = require("../../../linker");
const babel_1 = require("../../../linker/babel");
const logging_1 = require("../../../src/ngtsc/logging");
const sourcemaps_1 = require("../../../src/ngtsc/sourcemaps");
const compile_test_1 = require("../test_helpers/compile_test");
const golden_partials_1 = require("../test_helpers/golden_partials");
const test_runner_1 = require("../test_helpers/test_runner");
(0, test_runner_1.runTests)('linked compile', linkPartials, {
    // TODO: Remove when https://github.com/angular/angular/issues/51647 is resolved.
    skipMappingChecks: true,
});
/**
 * Link all the partials specified in the given `test`.
 *
 * @param fileSystem The mock file-system to use for linking the partials.
 * @param test The compliance test whose partials will be linked.
 */
function linkPartials(fileSystem, test) {
    var _a;
    const logger = new logging_1.ConsoleLogger(logging_1.LogLevel.debug);
    const loader = new sourcemaps_1.SourceFileLoader(fileSystem, logger, {});
    const builtDirectory = (0, compile_test_1.getBuildOutputDirectory)(fileSystem);
    const linkerPlugin = (0, babel_1.createEs2015LinkerPlugin)(Object.assign({ fileSystem,
        logger, sourceMapping: ((_a = test.compilerOptions) === null || _a === void 0 ? void 0 : _a['sourceMap']) === true }, test.angularCompilerOptions));
    const goldenPartialPath = fileSystem.resolve('/GOLDEN_PARTIAL.js');
    if (!fileSystem.exists(goldenPartialPath)) {
        throw new Error('Golden partial does not exist for this test\n' +
            'Try generating it by running:\n' +
            `bazel run //packages/compiler-cli/test/compliance/test_cases:${test.relativePath}.golden.update`);
    }
    const partialFile = fileSystem.readFile(goldenPartialPath);
    const partialFiles = (0, golden_partials_1.parseGoldenPartial)(partialFile);
    partialFiles.forEach((f) => safeWrite(fileSystem, fileSystem.resolve(builtDirectory, f.path), f.content));
    for (const expectation of test.expectations) {
        for (const { generated } of expectation.files) {
            const fileName = fileSystem.resolve(builtDirectory, generated);
            if (!fileSystem.exists(fileName)) {
                continue;
            }
            const source = fileSystem.readFile(fileName);
            const sourceMapPath = fileSystem.resolve(fileName + '.map');
            const sourceMap = fileSystem.exists(sourceMapPath)
                ? JSON.parse(fileSystem.readFile(sourceMapPath))
                : undefined;
            const { linkedSource, linkedSourceMap } = applyLinker(builtDirectory, fileName, source, sourceMap, linkerPlugin);
            if (linkedSourceMap !== undefined) {
                const mapAndPath = { map: linkedSourceMap, mapPath: sourceMapPath };
                const sourceFile = loader.loadSourceFile(fileName, linkedSource, mapAndPath);
                safeWrite(fileSystem, sourceMapPath, JSON.stringify(sourceFile.renderFlattenedSourceMap()));
            }
            safeWrite(fileSystem, fileName, linkedSource);
        }
    }
    return { emittedFiles: [], errors: [] };
}
/**
 * Run the file through the Babel linker plugin.
 *
 * It will ignore files that do not have a `.js` extension.
 *
 * @param file The absolute file path and its source to be transformed using the linker.
 * @param linkerPlugin The linker plugin to apply.
 * @returns The file's source content, which has been transformed using the linker if necessary.
 */
function applyLinker(cwd, filename, source, sourceMap, linkerPlugin) {
    if (!filename.endsWith('.js') || !(0, linker_1.needsLinking)(filename, source)) {
        return { linkedSource: source, linkedSourceMap: sourceMap };
    }
    const result = core_1.default.transformSync(source, {
        cwd,
        filename,
        sourceMaps: !!sourceMap,
        plugins: [linkerPlugin],
        parserOpts: { sourceType: 'unambiguous' },
    });
    if (result === null) {
        throw fail('Babel transform did not have output');
    }
    if (result.code == null) {
        throw fail('Babel transform result does not have any code');
    }
    return { linkedSource: result.code, linkedSourceMap: result.map || undefined };
}
/**
 * Write the `content` to the `path` on the `fs` file-system, first ensuring that the containing
 * directory exists.
 */
function safeWrite(fs, path, content) {
    fs.ensureDir(fs.dirname(path));
    fs.writeFile(path, content);
}
