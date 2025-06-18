"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionParser = void 0;
const blockC = __importStar(require("./region-matchers/block-c"));
const html = __importStar(require("./region-matchers/html"));
const inlineC = __importStar(require("./region-matchers/inline-c"));
const inlineCOnly = __importStar(require("./region-matchers/inline-c-only"));
const inlineHash = __importStar(require("./region-matchers/inline-hash"));
const remove_eslint_comments_1 = require("./remove-eslint-comments");
const WHOLE_FILE_REGION_NAME = '';
const DEFAULT_PLASTER = '. . .';
const REGION_MATCHERS = {
    ts: inlineC,
    js: inlineC,
    mjs: inlineCOnly,
    es6: inlineC,
    html: html,
    svg: html,
    css: blockC,
    conf: inlineHash,
    yaml: inlineHash,
    yml: inlineHash,
    sh: inlineHash,
    jade: inlineCOnly,
    pug: inlineCOnly,
    json: inlineCOnly,
    'json.annotated': inlineCOnly,
};
/**
 * NOTE: We assume that the tag defining the beginning and end of the region will be in different lines in each case.
 * For example, in HTML, we don't expect to have the following code on one line: <!-- docregion name -->content<!--enddocregion name-->
 */
const regionParser = (contents, filePath) => {
    const fileType = filePath === null || filePath === void 0 ? void 0 : filePath.split('.').pop();
    if (!fileType) {
        throw new Error(`Incorrect file type for region parser: ${filePath}!`);
    }
    const regionMatcher = REGION_MATCHERS[fileType];
    const openRegions = [];
    const regionMap = {};
    let countOfRegionLines = 0;
    if (regionMatcher) {
        let plaster = regionMatcher.createPlasterComment(DEFAULT_PLASTER);
        const lines = (0, remove_eslint_comments_1.removeEslintComments)(contents, fileType)
            .split(/\r?\n/)
            .filter((line, index) => {
            const startRegion = line.match(regionMatcher.regionStartMatcher);
            const endRegion = line.match(regionMatcher.regionEndMatcher);
            const updatePlaster = line.match(regionMatcher.plasterMatcher);
            // start region processing
            if (startRegion) {
                // open up the specified region
                handleStartRegion(startRegion, regionMap, index, countOfRegionLines, plaster, openRegions);
            }
            else if (endRegion) {
                // end region processing
                handleEndRegion(openRegions, endRegion, regionMap, index, countOfRegionLines);
            }
            else if (updatePlaster) {
                // doc plaster processing
                const plasterString = updatePlaster[1].trim();
                plaster = plasterString ? regionMatcher.createPlasterComment(plasterString) : '';
            }
            else {
                // simple line of content processing
                openRegions.forEach((regionName) => regionMap[regionName].lines.push(line));
                // do not filter out this line from the content
                return true;
            }
            // this line contained an annotation so let's filter it out
            countOfRegionLines++;
            return false;
        });
        if (!regionMap[WHOLE_FILE_REGION_NAME]) {
            regionMap[WHOLE_FILE_REGION_NAME] = { lines, ranges: [{ from: 1, to: lines.length + 1 }] };
        }
        return {
            contents: lines.join('\n'),
            regionMap,
            totalLinesCount: lines.length,
        };
    }
    else {
        return { contents, regionMap, totalLinesCount: 0 };
    }
};
exports.regionParser = regionParser;
function handleStartRegion(startRegion, regionMap, index, countOfRegionLines, plaster, openRegions) {
    const regionNames = getRegionNames(startRegion[1]);
    if (regionNames.length === 0) {
        regionNames.push(WHOLE_FILE_REGION_NAME);
    }
    for (const regionName of regionNames) {
        const region = regionMap[regionName];
        if (region) {
            if (region.open) {
                throw new Error(`Tried to open a region, named "${regionName}", that is already open`);
            }
            // Region is opened, set from range value.
            region.open = true;
            region.ranges.push({ from: getFromRangeValue(index, countOfRegionLines) });
            if (plaster) {
                // Use the same indent as the docregion marker
                const indent = startRegion[0].split(/[^ ]/, 1);
                region.lines.push(indent + plaster);
            }
        }
        else {
            regionMap[regionName] = {
                lines: [],
                open: true,
                ranges: [
                    {
                        from: getFromRangeValue(index, countOfRegionLines),
                    },
                ],
            };
        }
        openRegions.push(regionName);
    }
}
function handleEndRegion(openRegions, endRegion, regionMap, index, countOfRegionLines) {
    if (openRegions.length === 0) {
        throw new Error('Tried to close a region when none are open');
    }
    // close down the specified region (or most recent if no name is given)
    const regionNames = getRegionNames(endRegion[1]);
    if (regionNames.length === 0) {
        regionNames.push(openRegions[openRegions.length - 1]);
    }
    for (const regionName of regionNames) {
        const region = regionMap[regionName];
        if (!region || !region.open) {
            throw new Error(`Tried to close a region, named "${regionName}", that is not open`);
        }
        // Region is closed, we can define the last line number of the region
        region.open = false;
        region.ranges[region.ranges.length - 1].to = index - countOfRegionLines;
        removeLast(openRegions, regionName);
    }
}
function getFromRangeValue(index, countOfRegionLines) {
    return index - countOfRegionLines + 1;
}
function getRegionNames(input) {
    return input.trim() === '' ? [] : input.split(',').map((name) => name.trim());
}
function removeLast(array, item) {
    const index = array.lastIndexOf(item);
    array.splice(index, 1);
}
