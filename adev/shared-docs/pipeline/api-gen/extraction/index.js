"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// @ts-ignore This compiles fine, but Webstorm doesn't like the ESM import in a CJS context.
const compiler_cli_1 = require("@angular/compiler-cli");
const typescript_1 = __importDefault(require("typescript"));
const interpolate_code_examples_1 = require("./interpolate_code_examples");
function main() {
    const [paramFilePath] = process.argv.slice(2);
    const rawParamLines = (0, fs_1.readFileSync)(paramFilePath, { encoding: 'utf8' }).split('\n');
    const [repo, moduleName, moduleLabel, serializedPrivateModules, entryPointExecRootRelativePath, srcs, outputFilenameExecRootRelativePath, serializedPathMapWithExecRootRelativePaths, extraEntriesSrcs,] = rawParamLines;
    const privateModules = new Set(serializedPrivateModules.split(','));
    // The path map is a serialized JSON map of import path to index.ts file.
    // For example, {'@angular/core': 'path/to/some/index.ts'}
    const pathMap = JSON.parse(serializedPathMapWithExecRootRelativePaths);
    // The tsconfig expects the path map in the form of path -> array of actual locations.
    // We also resolve the exec root relative paths to absolute paths to disambiguate.
    const resolvedPathMap = {};
    for (const [importPath, filePath] of Object.entries(pathMap)) {
        resolvedPathMap[importPath] = [path_1.default.resolve(filePath)];
        // In addition to the exact import path,
        // also add wildcard mappings for subdirectories.
        const importPathWithWildcard = path_1.default.join(importPath, '*');
        resolvedPathMap[importPathWithWildcard] = [
            path_1.default.join(path_1.default.resolve(path_1.default.dirname(filePath)), '*'),
        ];
    }
    const compilerOptions = {
        paths: resolvedPathMap,
        rootDir: '.',
        skipLibCheck: true,
        target: typescript_1.default.ScriptTarget.ES2022,
        // This is necessary because otherwise types that include `| null` are not included in the documentation.
        strictNullChecks: true,
        moduleResolution: typescript_1.default.ModuleResolutionKind.NodeNext,
        experimentalDecorators: true,
    };
    // Code examples should not be fed to the compiler.
    const filesWithoutExamples = srcs.split(',').filter((src) => !src.startsWith(interpolate_code_examples_1.EXAMPLES_PATH));
    const compilerHost = (0, compiler_cli_1.createCompilerHost)({ options: compilerOptions });
    const program = new compiler_cli_1.NgtscProgram(filesWithoutExamples, compilerOptions, compilerHost);
    const extraEntries = (extraEntriesSrcs !== null && extraEntriesSrcs !== void 0 ? extraEntriesSrcs : '')
        .split(',')
        .filter((path) => !!path)
        .reduce((result, path) => {
        return result.concat(JSON.parse((0, fs_1.readFileSync)(path, { encoding: 'utf8' })));
    }, []);
    const apiDoc = program.getApiDocumentation(entryPointExecRootRelativePath, privateModules);
    const extractedEntries = apiDoc.entries;
    const combinedEntries = extractedEntries.concat(extraEntries);
    (0, interpolate_code_examples_1.interpolateCodeExamples)(combinedEntries);
    const normalized = moduleName.replace('@', '').replace(/[\/]/g, '_');
    const output = JSON.stringify({
        repo,
        moduleLabel: moduleLabel || moduleName,
        moduleName: moduleName,
        normalizedModuleName: normalized,
        entries: combinedEntries,
        symbols: [
            // Symbols referenced, originating from other packages
            ...apiDoc.symbols.entries(),
            // Exported symbols from the current package
            ...apiDoc.entries.map((entry) => [entry.name, moduleName]),
            // Also doing it for every member of classes/interfaces
            ...apiDoc.entries.flatMap((entry) => [
                [entry.name, moduleName],
                ...getEntriesFromMembers(entry).map((member) => [member, moduleName]),
            ]),
        ],
    });
    (0, fs_1.writeFileSync)(outputFilenameExecRootRelativePath, output, { encoding: 'utf8' });
}
function getEntriesFromMembers(entry) {
    if (!hasMembers(entry)) {
        return [];
    }
    return entry.members.map((member) => `${entry.name}.${member.name}`);
}
function hasMembers(entry) {
    return 'members' in entry;
}
main();
