"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileSystem = getFileSystem;
exports.setFileSystem = setFileSystem;
exports.absoluteFrom = absoluteFrom;
exports.absoluteFromSourceFile = absoluteFromSourceFile;
exports.relativeFrom = relativeFrom;
exports.dirname = dirname;
exports.join = join;
exports.resolve = resolve;
exports.isRoot = isRoot;
exports.isRooted = isRooted;
exports.relative = relative;
exports.basename = basename;
exports.isLocalRelativePath = isLocalRelativePath;
exports.toRelativeImport = toRelativeImport;
const invalid_file_system_1 = require("./invalid_file_system");
const util_1 = require("./util");
let fs = new invalid_file_system_1.InvalidFileSystem();
function getFileSystem() {
    return fs;
}
function setFileSystem(fileSystem) {
    fs = fileSystem;
}
/**
 * Convert the path `path` to an `AbsoluteFsPath`, throwing an error if it's not an absolute path.
 */
function absoluteFrom(path) {
    if (!fs.isRooted(path)) {
        throw new Error(`Internal Error: absoluteFrom(${path}): path is not absolute`);
    }
    return fs.resolve(path);
}
const ABSOLUTE_PATH = Symbol('AbsolutePath');
/**
 * Extract an `AbsoluteFsPath` from a `ts.SourceFile`-like object.
 */
function absoluteFromSourceFile(sf) {
    const sfWithPatch = sf;
    if (sfWithPatch[ABSOLUTE_PATH] === undefined) {
        sfWithPatch[ABSOLUTE_PATH] = fs.resolve(sfWithPatch.fileName);
    }
    // Non-null assertion needed since TS doesn't narrow the type of fields that use a symbol as a key
    // apparently.
    return sfWithPatch[ABSOLUTE_PATH];
}
/**
 * Convert the path `path` to a `PathSegment`, throwing an error if it's not a relative path.
 */
function relativeFrom(path) {
    const normalized = (0, util_1.normalizeSeparators)(path);
    if (fs.isRooted(normalized)) {
        throw new Error(`Internal Error: relativeFrom(${path}): path is not relative`);
    }
    return normalized;
}
/**
 * Static access to `dirname`.
 */
function dirname(file) {
    return fs.dirname(file);
}
/**
 * Static access to `join`.
 */
function join(basePath, ...paths) {
    return fs.join(basePath, ...paths);
}
/**
 * Static access to `resolve`s.
 */
function resolve(basePath, ...paths) {
    return fs.resolve(basePath, ...paths);
}
/** Returns true when the path provided is the root path. */
function isRoot(path) {
    return fs.isRoot(path);
}
/**
 * Static access to `isRooted`.
 */
function isRooted(path) {
    return fs.isRooted(path);
}
/**
 * Static access to `relative`.
 */
function relative(from, to) {
    return fs.relative(from, to);
}
/**
 * Static access to `basename`.
 */
function basename(filePath, extension) {
    return fs.basename(filePath, extension);
}
/**
 * Returns true if the given path is locally relative.
 *
 * This is used to work out if the given path is relative (i.e. not absolute) but also is not
 * escaping the current directory.
 */
function isLocalRelativePath(relativePath) {
    return !isRooted(relativePath) && !relativePath.startsWith('..');
}
/**
 * Converts a path to a form suitable for use as a relative module import specifier.
 *
 * In other words it adds the `./` to the path if it is locally relative.
 */
function toRelativeImport(relativePath) {
    return isLocalRelativePath(relativePath) ? `./${relativePath}` : relativePath;
}
