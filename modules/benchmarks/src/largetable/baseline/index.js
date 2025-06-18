"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../util");
const util_2 = require("../util");
const table_1 = require("./table");
let table;
function destroyDom() {
    table.data = util_2.emptyTable;
}
function createDom() {
    table.data = (0, util_2.buildTable)();
}
function noop() { }
function init() {
    const rootEl = document.querySelector('largetable');
    rootEl.textContent = '';
    table = new table_1.TableComponent(rootEl);
    (0, util_2.initTableUtils)();
    (0, util_1.bindAction)('#destroyDom', destroyDom);
    (0, util_1.bindAction)('#createDom', createDom);
    (0, util_1.bindAction)('#updateDomProfile', (0, util_1.profile)(createDom, noop, 'update'));
    (0, util_1.bindAction)('#createDomProfile', (0, util_1.profile)(createDom, destroyDom, 'create'));
}
init();
