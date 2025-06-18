"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeMigrationReplacements = writeMigrationReplacements;
const replacement_1 = require("../../../utils/tsurge/replacement");
const group_replacements_1 = require("../../../utils/tsurge/helpers/group_replacements");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
/** Applies the migration result and applies it to the file system. */
function writeMigrationReplacements(replacements, projectRoot) {
    const fs = (0, file_system_1.getFileSystem)();
    for (const [projectRelativePath, updates] of (0, group_replacements_1.groupReplacementsByFile)(replacements)) {
        const filePath = fs.join(projectRoot, projectRelativePath);
        const fileText = fs.readFile(filePath);
        const newText = (0, replacement_1.applyTextUpdates)(fileText, updates);
        fs.writeFile(filePath, newText);
    }
}
