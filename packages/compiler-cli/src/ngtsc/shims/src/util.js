"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeShimFileName = makeShimFileName;
exports.generatedModuleName = generatedModuleName;
const file_system_1 = require("../../file_system");
const TS_EXTENSIONS = /\.tsx?$/i;
/**
 * Replace the .ts or .tsx extension of a file with the shim filename suffix.
 */
function makeShimFileName(fileName, suffix) {
    return (0, file_system_1.absoluteFrom)(fileName.replace(TS_EXTENSIONS, suffix));
}
function generatedModuleName(originalModuleName, originalFileName, genSuffix) {
    let moduleName;
    if (originalFileName.endsWith('/index.ts')) {
        moduleName = originalModuleName + '/index' + genSuffix;
    }
    else {
        moduleName = originalModuleName + genSuffix;
    }
    return moduleName;
}
