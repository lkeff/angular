"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractRegions = extractRegions;
const region_parser_1 = require("../regions/region-parser");
/**
 * Updates the provided token to include the extracted region as the visible lines for the token.
 */
function extractRegions(token) {
    var _a;
    const fileType = (_a = token.path) === null || _a === void 0 ? void 0 : _a.split('.').pop();
    const parsedRegions = (0, region_parser_1.regionParser)(token.code, fileType);
    // The code in the token is always replaced with the version of the code with region markers removed.
    token.code = parsedRegions.contents;
    if (token.visibleRegion) {
        const region = parsedRegions.regionMap[token.visibleRegion];
        if (!region) {
            throw new Error(`Cannot find ${token.visibleRegion} in ${token.path}!`);
        }
        token.visibleLines = `[${region.ranges.map((range) => { var _a; return `[${range.from}, ${(_a = range.to) !== null && _a !== void 0 ? _a : parsedRegions.totalLinesCount + 1}]`; })}]`;
    }
}
