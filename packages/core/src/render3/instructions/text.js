"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵtext = ɵɵtext;
exports.enableLocateOrCreateTextNodeImpl = enableLocateOrCreateTextNodeImpl;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const error_handling_1 = require("../../hydration/error_handling");
const node_lookup_utils_1 = require("../../hydration/node_lookup_utils");
const utils_1 = require("../../hydration/utils");
const utils_2 = require("../../i18n/utils");
const assert_1 = require("../../util/assert");
const view_1 = require("../interfaces/view");
const node_manipulation_1 = require("../node_manipulation");
const dom_node_manipulation_1 = require("../dom_node_manipulation");
const state_1 = require("../state");
const tnode_manipulation_1 = require("../tnode_manipulation");
/**
 * Create static text node
 *
 * @param index Index of the node in the data array
 * @param value Static string value to write.
 *
 * @codeGenApi
 */
function ɵɵtext(index, value = '') {
    const lView = (0, state_1.getLView)();
    const tView = (0, state_1.getTView)();
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    ngDevMode &&
        (0, assert_1.assertEqual)((0, state_1.getBindingIndex)(), tView.bindingStartIndex, 'text nodes should be created before any bindings');
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, adjustedIndex);
    const tNode = tView.firstCreatePass
        ? (0, tnode_manipulation_1.getOrCreateTNode)(tView, adjustedIndex, 1 /* TNodeType.Text */, value, null)
        : tView.data[adjustedIndex];
    const textNative = _locateOrCreateTextNode(tView, lView, tNode, value, index);
    lView[adjustedIndex] = textNative;
    if ((0, state_1.wasLastNodeCreated)()) {
        (0, node_manipulation_1.appendChild)(tView, lView, textNative, tNode);
    }
    // Text nodes are self closing.
    (0, state_1.setCurrentTNode)(tNode, false);
}
let _locateOrCreateTextNode = (tView, lView, tNode, value, index) => {
    (0, state_1.lastNodeWasCreated)(true);
    return (0, dom_node_manipulation_1.createTextNode)(lView[view_1.RENDERER], value);
};
/**
 * Enables hydration code path (to lookup existing elements in DOM)
 * in addition to the regular creation mode of text nodes.
 */
function locateOrCreateTextNodeImpl(tView, lView, tNode, value, index) {
    const hydrationInfo = lView[view_1.HYDRATION];
    const isNodeCreationMode = !hydrationInfo ||
        (0, state_1.isInSkipHydrationBlock)() ||
        (0, utils_2.isDetachedByI18n)(tNode) ||
        (0, utils_1.isDisconnectedNode)(hydrationInfo, index);
    (0, state_1.lastNodeWasCreated)(isNodeCreationMode);
    // Regular creation mode.
    if (isNodeCreationMode) {
        return (0, dom_node_manipulation_1.createTextNode)(lView[view_1.RENDERER], value);
    }
    // Hydration mode, looking up an existing element in DOM.
    const textNative = (0, node_lookup_utils_1.locateNextRNode)(hydrationInfo, tView, lView, tNode);
    ngDevMode && (0, error_handling_1.validateMatchingNode)(textNative, Node.TEXT_NODE, null, lView, tNode);
    ngDevMode && (0, utils_1.markRNodeAsClaimedByHydration)(textNative);
    return textNative;
}
function enableLocateOrCreateTextNodeImpl() {
    _locateOrCreateTextNode = locateOrCreateTextNodeImpl;
}
