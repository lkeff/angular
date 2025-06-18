"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsertInFrontOfRNodeWithI18n = getInsertInFrontOfRNodeWithI18n;
exports.processI18nInsertBefore = processI18nInsertBefore;
const assert_1 = require("../util/assert");
const node_manipulation_1 = require("./node_manipulation");
const dom_node_manipulation_1 = require("./dom_node_manipulation");
const view_utils_1 = require("./util/view_utils");
/**
 * Find a node in front of which `currentTNode` should be inserted (takes i18n into account).
 *
 * This method determines the `RNode` in front of which we should insert the `currentRNode`. This
 * takes `TNode.insertBeforeIndex` into account.
 *
 * @param parentTNode parent `TNode`
 * @param currentTNode current `TNode` (The node which we would like to insert into the DOM)
 * @param lView current `LView`
 */
function getInsertInFrontOfRNodeWithI18n(parentTNode, currentTNode, lView) {
    const tNodeInsertBeforeIndex = currentTNode.insertBeforeIndex;
    const insertBeforeIndex = Array.isArray(tNodeInsertBeforeIndex)
        ? tNodeInsertBeforeIndex[0]
        : tNodeInsertBeforeIndex;
    if (insertBeforeIndex === null) {
        return (0, node_manipulation_1.getInsertInFrontOfRNodeWithNoI18n)(parentTNode, currentTNode, lView);
    }
    else {
        ngDevMode && (0, assert_1.assertIndexInRange)(lView, insertBeforeIndex);
        return (0, view_utils_1.unwrapRNode)(lView[insertBeforeIndex]);
    }
}
/**
 * Process `TNode.insertBeforeIndex` by adding i18n text nodes.
 *
 * See `TNode.insertBeforeIndex`
 */
function processI18nInsertBefore(renderer, childTNode, lView, childRNode, parentRElement) {
    const tNodeInsertBeforeIndex = childTNode.insertBeforeIndex;
    if (Array.isArray(tNodeInsertBeforeIndex)) {
        // An array indicates that there are i18n nodes that need to be added as children of this
        // `childRNode`. These i18n nodes were created before this `childRNode` was available and so
        // only now can be added. The first element of the array is the normal index where we should
        // insert the `childRNode`. Additional elements are the extra nodes to be added as children of
        // `childRNode`.
        ngDevMode && (0, assert_1.assertDomNode)(childRNode);
        let i18nParent = childRNode;
        let anchorRNode = null;
        if (!(childTNode.type & 3 /* TNodeType.AnyRNode */)) {
            anchorRNode = i18nParent;
            i18nParent = parentRElement;
        }
        if (i18nParent !== null && childTNode.componentOffset === -1) {
            for (let i = 1; i < tNodeInsertBeforeIndex.length; i++) {
                // No need to `unwrapRNode` because all of the indexes point to i18n text nodes.
                // see `assertDomNode` below.
                const i18nChild = lView[tNodeInsertBeforeIndex[i]];
                (0, dom_node_manipulation_1.nativeInsertBefore)(renderer, i18nParent, i18nChild, anchorRNode, false);
            }
        }
    }
}
