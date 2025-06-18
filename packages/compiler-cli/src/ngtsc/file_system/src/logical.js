"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicalFileSystem = exports.LogicalProjectPath = void 0;
const helpers_1 = require("./helpers");
const util_1 = require("./util");
exports.LogicalProjectPath = {
    /**
     * Get the relative path between two `LogicalProjectPath`s.
     *
     * This will return a `PathSegment` which would be a valid module specifier to use in `from` when
     * importing from `to`.
     */
    relativePathBetween: function (from, to) {
        const relativePath = (0, helpers_1.relative)((0, helpers_1.dirname)((0, helpers_1.resolve)(from)), (0, helpers_1.resolve)(to));
        return (0, helpers_1.toRelativeImport)(relativePath);
    },
};
/**
 * A utility class which can translate absolute paths to source files into logical paths in
 * TypeScript's logical file system, based on the root directories of the project.
 */
class LogicalFileSystem {
    constructor(rootDirs, compilerHost) {
        this.compilerHost = compilerHost;
        /**
         * A cache of file paths to project paths, because computation of these paths is slightly
         * expensive.
         */
        this.cache = new Map();
        // Make a copy and sort it by length in reverse order (longest first). This speeds up lookups,
        // since there's no need to keep going through the array once a match is found.
        this.rootDirs = rootDirs.concat([]).sort((a, b) => b.length - a.length);
        this.canonicalRootDirs = this.rootDirs.map((dir) => this.compilerHost.getCanonicalFileName(dir));
    }
    /**
     * Get the logical path in the project of a `ts.SourceFile`.
     *
     * This method is provided as a convenient alternative to calling
     * `logicalPathOfFile(absoluteFromSourceFile(sf))`.
     */
    logicalPathOfSf(sf) {
        return this.logicalPathOfFile((0, helpers_1.absoluteFromSourceFile)(sf));
    }
    /**
     * Get the logical path in the project of a source file.
     *
     * @returns A `LogicalProjectPath` to the source file, or `null` if the source file is not in any
     * of the TS project's root directories.
     */
    logicalPathOfFile(physicalFile) {
        if (!this.cache.has(physicalFile)) {
            const canonicalFilePath = this.compilerHost.getCanonicalFileName(physicalFile);
            let logicalFile = null;
            for (let i = 0; i < this.rootDirs.length; i++) {
                const rootDir = this.rootDirs[i];
                const canonicalRootDir = this.canonicalRootDirs[i];
                if (isWithinBasePath(canonicalRootDir, canonicalFilePath)) {
                    // Note that we match against canonical paths but then create the logical path from
                    // original paths.
                    logicalFile = this.createLogicalProjectPath(physicalFile, rootDir);
                    // The logical project does not include any special "node_modules" nested directories.
                    if (logicalFile.indexOf('/node_modules/') !== -1) {
                        logicalFile = null;
                    }
                    else {
                        break;
                    }
                }
            }
            this.cache.set(physicalFile, logicalFile);
        }
        return this.cache.get(physicalFile);
    }
    createLogicalProjectPath(file, rootDir) {
        const logicalPath = (0, util_1.stripExtension)(file.slice(rootDir.length));
        return (logicalPath.startsWith('/') ? logicalPath : '/' + logicalPath);
    }
}
exports.LogicalFileSystem = LogicalFileSystem;
/**
 * Is the `path` a descendant of the `base`?
 * E.g. `foo/bar/zee` is within `foo/bar` but not within `foo/car`.
 */
function isWithinBasePath(base, path) {
    return (0, helpers_1.isLocalRelativePath)((0, helpers_1.relative)(base, path));
}
