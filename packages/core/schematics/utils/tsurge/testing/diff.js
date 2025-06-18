"use strict";
/**
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffText = diffText;
const diff = __importStar(require("diff"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Diffs the given two strings and creates a human-readable
 * colored diff string.
 */
function diffText(expected, actual, diffLineContextRange = 10) {
    const redColorCode = chalk_1.default.red('ɵɵ').split('ɵɵ')[0];
    const greenColorCode = chalk_1.default.green('ɵɵ').split('ɵɵ')[0];
    const goldenDiff = diff.diffChars(actual, expected);
    let fullResult = '';
    for (const part of goldenDiff) {
        // whitespace cannot be highlighted, so we use a tiny indicator character.
        const valueForColor = part.value.replace(/[ \t]/g, '·');
        // green for additions, red for deletions
        const text = part.added
            ? chalk_1.default.green(valueForColor)
            : part.removed
                ? chalk_1.default.red(valueForColor)
                : chalk_1.default.reset(part.value);
        fullResult += text;
    }
    const lines = fullResult.split(/\n/g);
    const linesToRender = new Set();
    // Find lines with diff, and include context lines around them.
    for (const [index, l] of lines.entries()) {
        if (l.includes(redColorCode) || l.includes(greenColorCode)) {
            const contextBottom = index - diffLineContextRange;
            const contextTop = index + diffLineContextRange;
            numbersFromTo(Math.max(0, contextBottom), index).forEach((lineNum) => linesToRender.add(lineNum));
            numbersFromTo(index, Math.min(contextTop, lines.length - 1)).forEach((lineNum) => linesToRender.add(lineNum));
        }
    }
    let result = '';
    let previous = -1;
    // Compute full diff text. Add markers if lines were skipped.
    for (const lineIndex of Array.from(linesToRender).sort((a, b) => a - b)) {
        if (lineIndex - 1 !== previous) {
            result += `${chalk_1.default.grey('... (lines above) ...')}\n`;
        }
        result += `${lines[lineIndex]}\n`;
        previous = lineIndex;
    }
    if (previous < lines.length - 1) {
        result += `${chalk_1.default.grey('... (lines below) ...\n')}`;
    }
    return result;
}
function numbersFromTo(start, end) {
    const list = [];
    for (let i = start; i <= end; i++) {
        list.push(i);
    }
    return list;
}
