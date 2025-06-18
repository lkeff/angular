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
const core_1 = require("@angular/core");
const util_1 = require("../util");
const table_1 = require("./table");
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
function init(appRef, insertSsrContent = true) {
    let tableComponentRef;
    const injector = appRef.injector;
    const environmentInjector = injector.get(core_1.EnvironmentInjector);
    let data = [];
    const setInput = (data) => {
        if (tableComponentRef) {
            tableComponentRef.setInput('data', data);
            tableComponentRef.changeDetectorRef.detectChanges();
        }
    };
    function destroyDom() {
        setInput(util_2.emptyTable);
    }
    function updateDom() {
        data = (0, util_2.buildTable)();
        setInput(data);
    }
    function createDom() {
        const hostElement = document.getElementById('table');
        tableComponentRef = (0, core_1.createComponent)(table_1.TableComponent, { environmentInjector, hostElement });
        setInput(data);
    }
    function prepare() {
        destroyDom();
        data = (0, util_2.buildTable)();
        if (insertSsrContent) {
            // Prepare DOM structure, similar to what SSR would produce.
            const hostElement = document.getElementById('table');
            hostElement.setAttribute('ngh', '0');
            hostElement.textContent = ''; // clear existing DOM contents
            hostElement.appendChild(createTableDom(data));
        }
    }
    function noop() { }
    (0, util_2.initTableUtils)();
    (0, util_1.bindAction)('#prepare', prepare);
    (0, util_1.bindAction)('#createDom', createDom);
    (0, util_1.bindAction)('#updateDom', updateDom);
    (0, util_1.bindAction)('#createDomProfile', (0, util_1.profile)(createDom, prepare, 'create'));
    (0, util_1.bindAction)('#updateDomProfile', (0, util_1.profile)(updateDom, noop, 'update'));
}
/**
 * Creates DOM to represent a table, similar to what'd be generated
 * during the SSR.
 */
function createTableDom(data) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    this._renderCells = [];
    for (let r = 0; r < data.length; r++) {
        const dataRow = data[r];
        const tr = document.createElement('tr');
        // Mark created DOM nodes, so that we can verify that
        // they were *not* re-created during hydration.
        tr.__existing = true;
        tbody.appendChild(tr);
        const renderRow = [];
        for (let c = 0; c < dataRow.length; c++) {
            const dataCell = dataRow[c];
            const renderCell = document.createElement('td');
            // Mark created DOM nodes, so that we can verify that
            // they were *not* re-created during hydration.
            renderCell.__existing = true;
            if (r % 2 === 0) {
                renderCell.style.backgroundColor = 'grey';
            }
            tr.appendChild(renderCell);
            renderRow[c] = renderCell;
            renderCell.textContent = dataCell.value;
        }
        // View container anchor
        const comment = document.createComment('');
        tr.appendChild(comment);
    }
    // View container anchor
    const comment = document.createComment('');
    tbody.appendChild(comment);
    return table;
}
