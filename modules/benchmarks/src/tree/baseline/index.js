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
const tree_1 = require("./tree");
let tree;
function destroyDom() {
    tree.data = util_2.emptyTree;
}
function createDom() {
    tree.data = (0, util_2.buildTree)();
}
function noop() { }
function init() {
    const rootEl = document.querySelector('tree');
    rootEl.textContent = '';
    tree = new tree_1.TreeComponent(rootEl);
    (0, util_2.initTreeUtils)();
    (0, util_1.bindAction)('#destroyDom', destroyDom);
    (0, util_1.bindAction)('#createDom', createDom);
    (0, util_1.bindAction)('#updateDomProfile', (0, util_1.profile)(createDom, noop, 'update'));
    (0, util_1.bindAction)('#createDomProfile', (0, util_1.profile)(createDom, destroyDom, 'create'));
}
init();
