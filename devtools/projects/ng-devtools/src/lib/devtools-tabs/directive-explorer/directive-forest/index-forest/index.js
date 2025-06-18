"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexForest = void 0;
const indexTree = (node, idx, parentPosition = []) => {
    const position = parentPosition.concat([idx]);
    return {
        position,
        element: node.element,
        component: node.component,
        directives: node.directives.map((d, i) => ({ name: d.name, id: d.id })),
        children: node.children.map((n, i) => indexTree(n, i, position)),
        hydration: node.hydration,
        defer: node.defer,
        onPush: node.onPush,
        hasNativeElement: node.hasNativeElement,
    };
};
const indexForest = (forest) => forest.map((n, i) => indexTree(n, i));
exports.indexForest = indexForest;
