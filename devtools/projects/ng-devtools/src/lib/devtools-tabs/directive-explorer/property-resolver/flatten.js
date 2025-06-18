"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandable = exports.getTreeFlattener = void 0;
const tree_1 = require("@angular/material/tree");
const protocol_1 = require("protocol");
const rxjs_1 = require("rxjs");
const arrayify_props_1 = require("./arrayify-props");
const getTreeFlattener = () => new tree_1.MatTreeFlattener((node, level) => {
    return {
        expandable: (0, exports.expandable)(node.descriptor),
        prop: node,
        level,
    };
}, (node) => node.level, (node) => node.expandable, (node) => getChildren(node));
exports.getTreeFlattener = getTreeFlattener;
const expandable = (prop) => {
    if (!prop) {
        return false;
    }
    if (!prop.expandable) {
        return false;
    }
    return !(prop.type !== protocol_1.PropType.Object && prop.type !== protocol_1.PropType.Array);
};
exports.expandable = expandable;
const getChildren = (prop) => {
    const descriptor = prop.descriptor;
    if ((descriptor.type === protocol_1.PropType.Object || descriptor.type === protocol_1.PropType.Array) &&
        !(descriptor.value instanceof rxjs_1.Observable)) {
        return (0, arrayify_props_1.arrayifyProps)(descriptor.value || {}, prop);
    }
    console.error('Unexpected data type', descriptor, 'in property', prop);
    return;
};
