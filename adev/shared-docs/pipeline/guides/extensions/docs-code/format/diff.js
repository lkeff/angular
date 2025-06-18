"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiff = calculateDiff;
const diff_1 = require("diff");
const utils_1 = require("../../../utils");
/**
 * Updates the provided token with diff information if a path to a diff is provided.
 */
function calculateDiff(token) {
    if (!token.diff) {
        return;
    }
    const diffCode = (0, utils_1.loadWorkspaceRelativeFile)(token.diff);
    const change = (0, diff_1.diffLines)(diffCode, token.code);
    const getLinesRange = (start, count) => Array.from(Array(count).keys()).map((i) => i + start);
    let processedLines = 0;
    token.diffMetadata = change.reduce((prev, part) => {
        var _a, _b, _c;
        const diff = {
            code: `${prev.code}${part.value}`,
            linesAdded: part.added
                ? [...prev.linesAdded, ...getLinesRange(processedLines, (_a = part.count) !== null && _a !== void 0 ? _a : 0)]
                : prev.linesAdded,
            linesRemoved: part.removed
                ? [...prev.linesRemoved, ...getLinesRange(processedLines, (_b = part.count) !== null && _b !== void 0 ? _b : 0)]
                : prev.linesRemoved,
        };
        processedLines += (_c = part.count) !== null && _c !== void 0 ? _c : 0;
        return diff;
    }, {
        code: '',
        linesAdded: [],
        linesRemoved: [],
    });
    token.code = token.diffMetadata.code;
}
