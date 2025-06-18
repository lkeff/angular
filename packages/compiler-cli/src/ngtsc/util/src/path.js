"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativePathBetween = relativePathBetween;
exports.normalizeSeparators = normalizeSeparators;
exports.getProjectRelativePath = getProjectRelativePath;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("../../file_system");
const util_1 = require("../../file_system/src/util");
function relativePathBetween(from, to) {
    const relativePath = (0, util_1.stripExtension)((0, file_system_1.relative)((0, file_system_1.dirname)((0, file_system_1.resolve)(from)), (0, file_system_1.resolve)(to)));
    return relativePath !== '' ? (0, file_system_1.toRelativeImport)(relativePath) : null;
}
function normalizeSeparators(path) {
    // TODO: normalize path only for OS that need it.
    return path.replace(/\\/g, '/');
}
/**
 * Attempts to generate a project-relative path for a file.
 * @param fileName Absolute path to the file.
 * @param rootDirs Root directories of the project.
 * @param compilerHost Host used to resolve file names.
 * @returns
 */
function getProjectRelativePath(fileName, rootDirs, compilerHost) {
    // Note: we need to pass both the file name and the root directories through getCanonicalFileName,
    // because the root directories might've been passed through it already while the source files
    // definitely have not. This can break the relative return value, because in some platforms
    // getCanonicalFileName lowercases the path.
    const filePath = compilerHost.getCanonicalFileName(fileName);
    for (const rootDir of rootDirs) {
        const rel = (0, file_system_1.relative)(compilerHost.getCanonicalFileName(rootDir), filePath);
        if (!rel.startsWith('..')) {
            return rel;
        }
    }
    return null;
}
