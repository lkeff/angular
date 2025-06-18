"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeDescendantOf = isNodeDescendantOf;
/** Whether the given node is a descendant of the given ancestor. */
function isNodeDescendantOf(node, ancestor) {
    while (node) {
        if (node === ancestor)
            return true;
        node = node.parent;
    }
    return false;
}
