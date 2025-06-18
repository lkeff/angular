"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectNativeNodes = collectNativeNodes;
exports.collectNativeNodesInLContainer = collectNativeNodesInLContainer;
const assert_1 = require("./assert");
const i18n_tree_shaking_1 = require("./i18n/i18n_tree_shaking");
const container_1 = require("./interfaces/container");
const type_checks_1 = require("./interfaces/type_checks");
const view_1 = require("./interfaces/view");
const node_assert_1 = require("./node_assert");
const node_manipulation_1 = require("./node_manipulation");
const view_utils_1 = require("./util/view_utils");
function collectNativeNodes(tView, lView, tNode, result, isProjection = false) {
    while (tNode !== null) {
        // Let declarations don't have corresponding DOM nodes so we skip over them.
        if (tNode.type === 128 /* TNodeType.LetDeclaration */) {
            tNode = isProjection ? tNode.projectionNext : tNode.next;
            continue;
        }
        ngDevMode &&
            (0, node_assert_1.assertTNodeType)(tNode, 3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */ | 16 /* TNodeType.Projection */ | 32 /* TNodeType.Icu */);
        const lNode = lView[tNode.index];
        if (lNode !== null) {
            result.push((0, view_utils_1.unwrapRNode)(lNode));
        }
        // A given lNode can represent either a native node or a LContainer (when it is a host of a
        // ViewContainerRef). When we find a LContainer we need to descend into it to collect root nodes
        // from the views in this container.
        if ((0, type_checks_1.isLContainer)(lNode)) {
            collectNativeNodesInLContainer(lNode, result);
        }
        const tNodeType = tNode.type;
        if (tNodeType & 8 /* TNodeType.ElementContainer */) {
            collectNativeNodes(tView, lView, tNode.child, result);
        }
        else if (tNodeType & 32 /* TNodeType.Icu */) {
            const nextRNode = (0, i18n_tree_shaking_1.icuContainerIterate)(tNode, lView);
            let rNode;
            while ((rNode = nextRNode())) {
                result.push(rNode);
            }
        }
        else if (tNodeType & 16 /* TNodeType.Projection */) {
            const nodesInSlot = (0, node_manipulation_1.getProjectionNodes)(lView, tNode);
            if (Array.isArray(nodesInSlot)) {
                result.push(...nodesInSlot);
            }
            else {
                const parentView = (0, view_utils_1.getLViewParent)(lView[view_1.DECLARATION_COMPONENT_VIEW]);
                ngDevMode && (0, assert_1.assertParentView)(parentView);
                collectNativeNodes(parentView[view_1.TVIEW], parentView, nodesInSlot, result, true);
            }
        }
        tNode = isProjection ? tNode.projectionNext : tNode.next;
    }
    return result;
}
/**
 * Collects all root nodes in all views in a given LContainer.
 */
function collectNativeNodesInLContainer(lContainer, result) {
    for (let i = container_1.CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
        const lViewInAContainer = lContainer[i];
        const lViewFirstChildTNode = lViewInAContainer[view_1.TVIEW].firstChild;
        if (lViewFirstChildTNode !== null) {
            collectNativeNodes(lViewInAContainer[view_1.TVIEW], lViewInAContainer, lViewFirstChildTNode, result);
        }
    }
    // When an LContainer is created, the anchor (comment) node is:
    // - (1) either reused in case of an ElementContainer (<ng-container>)
    // - (2) or a new comment node is created
    // In the first case, the anchor comment node would be added to the final
    // list by the code in the `collectNativeNodes` function
    // (see the `result.push(unwrapRNode(lNode))` line), but the second
    // case requires extra handling: the anchor node needs to be added to the
    // final list manually. See additional information in the `createAnchorNode`
    // function in the `view_container_ref.ts`.
    //
    // In the first case, the same reference would be stored in the `NATIVE`
    // and `HOST` slots in an LContainer. Otherwise, this is the second case and
    // we should add an element to the final list.
    if (lContainer[container_1.NATIVE] !== lContainer[view_1.HOST]) {
        result.push(lContainer[container_1.NATIVE]);
    }
}
