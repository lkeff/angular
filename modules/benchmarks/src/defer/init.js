"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncUrlParamsToForm = syncUrlParamsToForm;
exports.init = init;
const util_1 = require("../util");
const util_2 = require("./util");
const DEFAULT_COLS_COUNT = '40';
const DEFAULT_ROWS_COUNT = '200';
function getUrlParamValue(name) {
    const url = new URL(document.location.href);
    return url.searchParams.get(name);
}
function syncUrlParamsToForm() {
    var _a, _b;
    let cols = (_a = getUrlParamValue('cols')) !== null && _a !== void 0 ? _a : DEFAULT_COLS_COUNT;
    let rows = (_b = getUrlParamValue('rows')) !== null && _b !== void 0 ? _b : DEFAULT_ROWS_COUNT;
    document.getElementById('cols').value = cols;
    document.getElementById('rows').value = rows;
    return { cols, rows };
}
function init(appRef) {
    const table = appRef.components[0].instance;
    function destroyDom() {
        table.data = util_2.emptyTable;
        appRef.tick();
    }
    function createDom() {
        table.data = (0, util_2.buildTable)();
        appRef.tick();
    }
    function noop() { }
    (0, util_2.initTableUtils)();
    (0, util_1.bindAction)('#destroyDom', destroyDom);
    (0, util_1.bindAction)('#createDom', createDom);
    (0, util_1.bindAction)('#createDomProfile', (0, util_1.profile)(createDom, destroyDom, 'create'));
    (0, util_1.bindAction)('#updateDomProfile', (0, util_1.profile)(createDom, noop, 'update'));
}
