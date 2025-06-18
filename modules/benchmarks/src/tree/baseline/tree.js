"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeComponent = void 0;
const util_1 = require("../util");
class TreeComponent {
    constructor(_rootEl) {
        this._rootEl = _rootEl;
    }
    set data(data) {
        if (!data.left) {
            this._destroy();
        }
        else if (this._renderNodes) {
            this._update(data, 0);
        }
        else {
            this._create(this._rootEl, data, 0);
        }
    }
    _create(parentNode, dataNode, index) {
        if (!this._renderNodes) {
            this._renderNodes = (0, util_1.newArray)(dataNode.transitiveChildCount);
        }
        const span = document.createElement('span');
        if (dataNode.depth % 2 === 0) {
            span.style.backgroundColor = 'grey';
        }
        parentNode.appendChild(span);
        this._renderNodes[index] = span;
        this._updateNode(span, dataNode);
        if (dataNode.left) {
            const leftTree = document.createElement('tree');
            parentNode.appendChild(leftTree);
            this._create(leftTree, dataNode.left, index + 1);
        }
        if (dataNode.right) {
            const rightTree = document.createElement('tree');
            parentNode.appendChild(rightTree);
            this._create(rightTree, dataNode.right, index + dataNode.left.transitiveChildCount + 1);
        }
    }
    _updateNode(renderNode, dataNode) {
        renderNode.textContent = ` ${dataNode.value} `;
    }
    _update(dataNode, index) {
        this._updateNode(this._renderNodes[index], dataNode);
        if (dataNode.left) {
            this._update(dataNode.left, index + 1);
        }
        if (dataNode.right) {
            this._update(dataNode.right, index + dataNode.left.transitiveChildCount + 1);
        }
    }
    _destroy() {
        while (this._rootEl.lastChild)
            this._rootEl.lastChild.remove();
        this._renderNodes = null;
    }
}
exports.TreeComponent = TreeComponent;
