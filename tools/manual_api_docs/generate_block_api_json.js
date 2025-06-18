"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_cli_1 = require("@angular/compiler-cli");
const fs_1 = require("fs");
const path_1 = require("path");
function main() {
    const [paramFilePath] = process.argv.slice(2);
    const rawParamLines = (0, fs_1.readFileSync)(paramFilePath, { encoding: 'utf8' }).split('\n');
    const [srcs, outputFileExecRootRelativePath] = rawParamLines;
    const developerPreview = [{ 'name': 'developerPreview', 'comment': '' }];
    const entries = srcs.split(',').map((sourceFilePath) => {
        const fileContent = (0, fs_1.readFileSync)(sourceFilePath, { encoding: 'utf8' });
        const isDeveloperPreview = fileContent.includes('developerPreview');
        const filteredContent = fileContent.replace(/^@developerPreview/, '');
        return {
            name: `@${(0, path_1.basename)(sourceFilePath, '.md')}`,
            entryType: compiler_cli_1.EntryType.Block,
            description: filteredContent,
            rawComment: filteredContent,
            source: {
                filePath: '/' + sourceFilePath,
                startLine: 0,
                endLine: 0,
            },
            jsdocTags: isDeveloperPreview ? developerPreview : [],
        };
    });
    (0, fs_1.writeFileSync)(outputFileExecRootRelativePath, JSON.stringify({
        moduleName: '@angular/core',
        normalizedModuleName: 'angular_core',
        moduleLabel: 'core',
        entries,
    }), { encoding: 'utf8' });
}
main();
