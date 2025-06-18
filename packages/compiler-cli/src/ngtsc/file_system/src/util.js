"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSeparators = normalizeSeparators;
exports.stripExtension = stripExtension;
exports.getSourceFileOrError = getSourceFileOrError;
const TS_DTS_JS_EXTENSION = /(?:\.d)?\.ts$|\.js$/;
/**
 * Convert Windows-style separators to POSIX separators.
 */
function normalizeSeparators(path) {
    // TODO: normalize path only for OS that need it.
    return path.replace(/\\/g, '/');
}
/**
 * Remove a .ts, .d.ts, or .js extension from a file name.
 */
function stripExtension(path) {
    return path.replace(TS_DTS_JS_EXTENSION, '');
}
function getSourceFileOrError(program, fileName) {
    const sf = program.getSourceFile(fileName);
    if (sf === undefined) {
        throw new Error(`Program does not contain "${fileName}" - available files are ${program
            .getSourceFiles()
            .map((sf) => sf.fileName)
            .join(', ')}`);
    }
    return sf;
}
