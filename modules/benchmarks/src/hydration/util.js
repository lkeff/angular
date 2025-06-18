"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyTable = exports.TableCell = void 0;
exports.initTableUtils = initTableUtils;
exports.buildTable = buildTable;
const util_1 = require("../util");
class TableCell {
    constructor(row, col, value) {
        this.row = row;
        this.col = col;
        this.value = value;
    }
}
exports.TableCell = TableCell;
let tableCreateCount;
let maxRow;
let maxCol;
let numberData;
let charData;
function initTableUtils() {
    maxRow = (0, util_1.getIntParameter)('rows');
    maxCol = (0, util_1.getIntParameter)('cols');
    tableCreateCount = 0;
    numberData = [];
    charData = [];
    for (let r = 0; r < maxRow; r++) {
        const numberRow = [];
        numberData.push(numberRow);
        const charRow = [];
        charData.push(charRow);
        for (let c = 0; c < maxCol; c++) {
            numberRow.push(new TableCell(r, c, `${c}/${r}`));
            charRow.push(new TableCell(r, c, `${charValue(c)}/${charValue(r)}`));
        }
    }
}
function charValue(i) {
    return String.fromCharCode('A'.charCodeAt(0) + (i % 26));
}
exports.emptyTable = [];
function buildTable() {
    tableCreateCount++;
    return tableCreateCount % 2 ? numberData : charData;
}
