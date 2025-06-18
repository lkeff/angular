"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateFile = migrateFile;
/** Migrates the legacy message IDs within a single file. */
function migrateFile(sourceCode, mapping) {
    const legacyIds = Object.keys(mapping);
    for (const legacyId of legacyIds) {
        const canonicalId = mapping[legacyId];
        const pattern = new RegExp(escapeRegExp(legacyId), 'g');
        sourceCode = sourceCode.replace(pattern, canonicalId);
    }
    return sourceCode;
}
/** Escapes special regex characters in a string. */
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
