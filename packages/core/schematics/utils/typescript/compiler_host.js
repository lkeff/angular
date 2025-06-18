"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMigrationProgram = createMigrationProgram;
exports.createProgramOptions = createProgramOptions;
exports.canMigrateFile = canMigrateFile;
const path_1 = require("path");
const typescript_1 = __importDefault(require("typescript"));
const parse_tsconfig_1 = require("./parse_tsconfig");
/**
 * Creates a TypeScript program instance for a TypeScript project within
 * the virtual file system tree.
 * @param tree Virtual file system tree that contains the source files.
 * @param tsconfigPath Virtual file system path that resolves to the TypeScript project.
 * @param basePath Base path for the virtual file system tree.
 * @param fakeFileRead Optional file reader function. Can be used to overwrite files in
 *   the TypeScript program, or to add in-memory files (e.g. to add global types).
 * @param additionalFiles Additional file paths that should be added to the program.
 */
function createMigrationProgram(tree, tsconfigPath, basePath, fakeFileRead, additionalFiles) {
    const { rootNames, options, host } = createProgramOptions(tree, tsconfigPath, basePath, fakeFileRead, additionalFiles);
    return typescript_1.default.createProgram(rootNames, options, host);
}
/**
 * Creates the options necessary to instantiate a TypeScript program.
 * @param tree Virtual file system tree that contains the source files.
 * @param tsconfigPath Virtual file system path that resolves to the TypeScript project.
 * @param basePath Base path for the virtual file system tree.
 * @param fakeFileRead Optional file reader function. Can be used to overwrite files in
 *   the TypeScript program, or to add in-memory files (e.g. to add global types).
 * @param additionalFiles Additional file paths that should be added to the program.
 * @param optionOverrides Overrides of the parsed compiler options.
 */
function createProgramOptions(tree, tsconfigPath, basePath, fakeFileRead, additionalFiles, optionOverrides) {
    // Resolve the tsconfig path to an absolute path. This is needed as TypeScript otherwise
    // is not able to resolve root directories in the given tsconfig. More details can be found
    // in the following issue: https://github.com/microsoft/TypeScript/issues/37731.
    tsconfigPath = (0, path_1.resolve)(basePath, tsconfigPath);
    const parsed = (0, parse_tsconfig_1.parseTsconfigFile)(tsconfigPath, (0, path_1.dirname)(tsconfigPath));
    const options = optionOverrides ? Object.assign(Object.assign({}, parsed.options), optionOverrides) : parsed.options;
    const host = createMigrationCompilerHost(tree, options, basePath, fakeFileRead);
    return { rootNames: parsed.fileNames.concat(additionalFiles || []), options, host };
}
function createMigrationCompilerHost(tree, options, basePath, fakeRead) {
    const host = typescript_1.default.createCompilerHost(options, true);
    const defaultReadFile = host.readFile;
    // We need to overwrite the host "readFile" method, as we want the TypeScript
    // program to be based on the file contents in the virtual file tree. Otherwise
    // if we run multiple migrations we might have intersecting changes and
    // source files.
    host.readFile = (fileName) => {
        var _a;
        const treeRelativePath = (0, path_1.relative)(basePath, fileName);
        let result = fakeRead === null || fakeRead === void 0 ? void 0 : fakeRead(treeRelativePath);
        if (typeof result !== 'string') {
            // If the relative path resolved to somewhere outside of the tree, fall back to
            // TypeScript's default file reading function since the `tree` will throw an error.
            result = treeRelativePath.startsWith('..')
                ? defaultReadFile.call(host, fileName)
                : (_a = tree.read(treeRelativePath)) === null || _a === void 0 ? void 0 : _a.toString();
        }
        // Strip BOM as otherwise TSC methods (Ex: getWidth) will return an offset,
        // which breaks the CLI UpdateRecorder.
        // See: https://github.com/angular/angular/pull/30719
        return typeof result === 'string' ? result.replace(/^\uFEFF/, '') : undefined;
    };
    return host;
}
/**
 * Checks whether a file can be migrate by our automated migrations.
 * @param basePath Absolute path to the project.
 * @param sourceFile File being checked.
 * @param program Program that includes the source file.
 */
function canMigrateFile(basePath, sourceFile, program) {
    // We shouldn't migrate .d.ts files, files from an external library or type checking files.
    if (sourceFile.fileName.endsWith('.ngtypecheck.ts') ||
        sourceFile.isDeclarationFile ||
        program.isSourceFileFromExternalLibrary(sourceFile)) {
        return false;
    }
    // Our migrations are set up to create a `Program` from the project's tsconfig and to migrate all
    // the files within the program. This can include files that are outside of the Angular CLI
    // project. We can't migrate files outside of the project, because our file system interactions
    // go through the CLI's `Tree` which assumes that all files are within the project. See:
    // https://github.com/angular/angular-cli/blob/0b0961c9c233a825b6e4bb59ab7f0790f9b14676/packages/angular_devkit/schematics/src/tree/host-tree.ts#L131
    return !(0, path_1.relative)(basePath, sourceFile.fileName).startsWith('..');
}
