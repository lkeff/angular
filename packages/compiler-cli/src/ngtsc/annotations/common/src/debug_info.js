"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractClassDebugInfo = extractClassDebugInfo;
const compiler_1 = require("@angular/compiler");
const path_1 = require("../../../util/src/path");
function extractClassDebugInfo(clazz, reflection, compilerHost, rootDirs, forbidOrphanRendering) {
    if (!reflection.isClass(clazz)) {
        return null;
    }
    const srcFile = clazz.getSourceFile();
    const srcFileMaybeRelativePath = (0, path_1.getProjectRelativePath)(srcFile.fileName, rootDirs, compilerHost);
    return {
        type: new compiler_1.WrappedNodeExpr(clazz.name),
        className: (0, compiler_1.literal)(clazz.name.getText()),
        filePath: srcFileMaybeRelativePath ? (0, compiler_1.literal)(srcFileMaybeRelativePath) : null,
        lineNumber: (0, compiler_1.literal)(srcFile.getLineAndCharacterOfPosition(clazz.name.pos).line + 1),
        forbidOrphanRendering,
    };
}
