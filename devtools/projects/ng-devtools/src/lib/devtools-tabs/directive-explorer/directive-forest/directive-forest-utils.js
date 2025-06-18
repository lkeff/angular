"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullNodeNameString = exports.getDirectivesArrayString = exports.parentCollapsed = exports.isChildOf = void 0;
const isChildOf = (childPosition, parentPosition) => {
    if (childPosition.length <= parentPosition.length) {
        return false;
    }
    for (let i = 0; i < parentPosition.length; i++) {
        if (childPosition[i] !== parentPosition[i]) {
            return false;
        }
    }
    return true;
};
exports.isChildOf = isChildOf;
const parentCollapsed = (nodeIdx, all, treeControl) => {
    const node = all[nodeIdx];
    for (let i = nodeIdx - 1; i >= 0; i--) {
        if ((0, exports.isChildOf)(node.position, all[i].position) && !treeControl.isExpanded(all[i])) {
            return true;
        }
    }
    return false;
};
exports.parentCollapsed = parentCollapsed;
/** Returns the `FlatNode`'s directive array string. */
const getDirectivesArrayString = (node) => node.directives ? node.directives.map((dir) => `[${dir}]`).join('') : '';
exports.getDirectivesArrayString = getDirectivesArrayString;
/** Returns the full node name string as rendered by the tree-node component. */
const getFullNodeNameString = (node) => {
    const cmp = node.original.component;
    if (cmp && cmp.isElement) {
        return `<${node.name}/>`;
    }
    return node.name + (0, exports.getDirectivesArrayString)(node);
};
exports.getFullNodeNameString = getFullNodeNameString;
