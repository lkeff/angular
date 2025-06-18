"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableComponent = void 0;
class TableComponent {
    constructor(_rootEl) {
        this._rootEl = _rootEl;
    }
    set data(data) {
        if (data.length === 0) {
            this._destroy();
        }
        else if (this._renderCells) {
            this._update(data);
        }
        else {
            this._create(data);
        }
    }
    _destroy() {
        while (this._rootEl.lastChild) {
            this._rootEl.lastChild.remove();
        }
        this._renderCells = null;
    }
    _update(data) {
        for (let r = 0; r < data.length; r++) {
            const dataRow = data[r];
            const renderRow = this._renderCells[r];
            for (let c = 0; c < dataRow.length; c++) {
                const dataCell = dataRow[c];
                const renderCell = renderRow[c];
                this._updateCell(renderCell, dataCell);
            }
        }
    }
    _updateCell(renderCell, dataCell) {
        renderCell.textContent = dataCell.value;
    }
    _create(data) {
        const table = document.createElement('table');
        this._rootEl.appendChild(table);
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        this._renderCells = [];
        for (let r = 0; r < data.length; r++) {
            const dataRow = data[r];
            const tr = document.createElement('tr');
            tbody.appendChild(tr);
            const renderRow = [];
            this._renderCells[r] = renderRow;
            for (let c = 0; c < dataRow.length; c++) {
                const dataCell = dataRow[c];
                const renderCell = document.createElement('td');
                if (r % 2 === 0) {
                    renderCell.style.backgroundColor = 'grey';
                }
                tr.appendChild(renderCell);
                renderRow[c] = renderCell;
                this._updateCell(renderCell, dataCell);
            }
        }
    }
}
exports.TableComponent = TableComponent;
