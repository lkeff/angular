"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const generate_manifest_1 = require("./generate_manifest");
function main() {
    const [paramFilePath] = process.argv.slice(2);
    const rawParamLines = (0, fs_1.readFileSync)(paramFilePath, { encoding: 'utf8' }).split('\n');
    const [srcs, outputFilenameExecRootRelativePath] = rawParamLines;
    const sourceContents = srcs
        .split(',')
        .map((srcPath) => (0, fs_1.readFileSync)(srcPath, { encoding: 'utf8' }));
    const apiCollections = sourceContents.map((s) => JSON.parse(s));
    const manifest = (0, generate_manifest_1.generateManifest)(apiCollections);
    (0, fs_1.writeFileSync)(outputFilenameExecRootRelativePath, JSON.stringify(manifest), { encoding: 'utf8' });
}
main();
