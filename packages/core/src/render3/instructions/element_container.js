"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵelementContainerStart = ɵɵelementContainerStart;
exports.ɵɵelementContainerEnd = ɵɵelementContainerEnd;
exports.ɵɵelementContainer = ɵɵelementContainer;
exports.enableLocateOrCreateElementContainerNodeImpl = enableLocateOrCreateElementContainerNodeImpl;
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
const assert_2 = require("../assert");
const context_discovery_1 = require("../context_discovery");
const dom_node_manipulation_1 = require("../dom_node_manipulation");
const hooks_1 = require("../hooks");
const type_checks_1 = require("../interfaces/type_checks");
const view_1 = require("../interfaces/view");
const node_assert_1 = require("../node_assert");
const node_manipulation_1 = require("../node_manipulation");
const query_execution_1 = require("../queries/query_execution");
const state_1 = require("../state");
const static_styling_1 = require("../styling/static_styling");
const attrs_utils_1 = require("../util/attrs_utils");
const view_utils_1 = require("../util/view_utils");
const tnode_manipulation_1 = require("../tnode_manipulation");
const directives_1 = require("../view/directives");
const shared_1 = require("./shared");
function elementContainerStartFirstCreatePass(index, tView, lView, attrsIndex, localRefsIndex) {
    const tViewConsts = tView.consts;
    const attrs = (0, view_utils_1.getConstant)(tViewConsts, attrsIndex);
    const tNode = (0, tnode_manipulation_1.getOrCreateTNode)(tView, index, 8 /* TNodeType.ElementContainer */, 'ng-container', attrs);
    // While ng-container doesn't necessarily support styling, we use the style context to identify
    // and execute directives on the ng-container.
    if (attrs !== null) {
        (0, static_styling_1.computeStaticStyling)(tNode, attrs, true);
    }
    const localRefs = (0, view_utils_1.getConstant)(tViewConsts, localRefsIndex);
    if ((0, state_1.getBindingsEnabled)()) {
        (0, directives_1.resolveDirectives)(tView, lView, tNode, localRefs, shared_1.findDirectiveDefMatches);
    }
    // Merge the template attrs last so that they have the highest priority.
    tNode.mergedAttrs = (0, attrs_utils_1.mergeHostAttrs)(tNode.mergedAttrs, tNode.attrs);
    if (tView.queries !== null) {
        tView.queries.elementStart(tView, tNode);
    }
    return tNode;
}
/**
 * Creates a logical container for other nodes (<ng-container>) backed by a comment node in the DOM.
 * The instruction must later be followed by `elementContainerEnd()` call.
 *
 * @param index Index of the element in the LView array
 * @param attrsIndex Index of the container attributes in the `consts` array.
 * @param localRefsIndex Index of the container's local references in the `consts` array.
 * @returns This function returns itself so that it may be chained.
 *
 * Even if this instruction accepts a set of attributes no actual attribute values are propagated to
 * the DOM (as a comment node can't have attributes). Attributes are here only for directive
 * matching purposes and setting initial inputs of directives.
 *
 * @codeGenApi
 */
function ɵɵelementContainerStart(index, attrsIndex, localRefsIndex) {
    const lView = (0, state_1.getLView)();
    const tView = (0, state_1.getTView)();
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, adjustedIndex);
    ngDevMode &&
        (0, assert_1.assertEqual)((0, state_1.getBindingIndex)(), tView.bindingStartIndex, 'element containers should be created before any bindings');
    const tNode = tView.firstCreatePass
        ? elementContainerStartFirstCreatePass(adjustedIndex, tView, lView, attrsIndex, localRefsIndex)
        : tView.data[adjustedIndex];
    (0, state_1.setCurrentTNode)(tNode, true);
    const comment = _locateOrCreateElementContainerNode(tView, lView, tNode, index);
    lView[adjustedIndex] = comment;
    if ((0, state_1.wasLastNodeCreated)()) {
        (0, node_manipulation_1.appendChild)(tView, lView, comment, tNode);
    }
    (0, context_discovery_1.attachPatchData)(comment, lView);
    if ((0, type_checks_1.isDirectiveHost)(tNode)) {
        (0, shared_1.createDirectivesInstances)(tView, lView, tNode);
        (0, query_execution_1.executeContentQueries)(tView, tNode, lView);
    }
    if (localRefsIndex != null) {
        (0, shared_1.saveResolvedLocalsInData)(lView, tNode);
    }
    return ɵɵelementContainerStart;
}
/**
 * Mark the end of the <ng-container>.
 * @returns This function returns itself so that it may be chained.
 *
 * @codeGenApi
 */
function ɵɵelementContainerEnd() {
    let currentTNode = (0, state_1.getCurrentTNode)();
    const tView = (0, state_1.getTView)();
    if ((0, state_1.isCurrentTNodeParent)()) {
        (0, state_1.setCurrentTNodeAsNotParent)();
    }
    else {
        ngDevMode && (0, assert_2.assertHasParent)(currentTNode);
        currentTNode = currentTNode.parent;
        (0, state_1.setCurrentTNode)(currentTNode, false);
    }
    ngDevMode && (0, node_assert_1.assertTNodeType)(currentTNode, 8 /* TNodeType.ElementContainer */);
    if (tView.firstCreatePass) {
        (0, hooks_1.registerPostOrderHooks)(tView, currentTNode);
        if ((0, type_checks_1.isContentQueryHost)(currentTNode)) {
            tView.queries.elementEnd(currentTNode);
        }
    }
    return ɵɵelementContainerEnd;
}
/**
 * Creates an empty logical container using {@link elementContainerStart}
 * and {@link elementContainerEnd}
 *
 * @param index Index of the element in the LView array
 * @param attrsIndex Index of the container attributes in the `consts` array.
 * @param localRefsIndex Index of the container's local references in the `consts` array.
 * @returns This function returns itself so that it may be chained.
 *
 * @codeGenApi
 */
function ɵɵelementContainer(index, attrsIndex, localRefsIndex) {
    ɵɵelementContainerStart(index, attrsIndex, localRefsIndex);
    ɵɵelementContainerEnd();
    return ɵɵelementContainer;
}
let _locateOrCreateElementContainerNode = (tView, lView, tNode, index) => {
    (0, state_1.lastNodeWasCreated)(true);
    return (0, dom_node_manipulation_1.createCommentNode)(lView[view_1.RENDERER], ngDevMode ? 'ng-container' : '');
};
/**
 * Enables hydration code path (to lookup existing elements in DOM)
 * in addition to the regular creation mode of comment nodes that
 * represent <ng-container>'s anchor.
 */
function locateOrCreateElementContainerNode(tView, lView, tNode, index) {
    let comment;
    const hydrationInfo = lView[view_1.HYDRATION];
    const isNodeCreationMode = !hydrationInfo ||
        (0, state_1.isInSkipHydrationBlock)() ||
        (0, utils_1.isDisconnectedNode)(hydrationInfo, index) ||
        (0, utils_2.isDetachedByI18n)(tNode);
    (0, state_1.lastNodeWasCreated)(isNodeCreationMode);
    // Regular creation mode.
    if (isNodeCreationMode) {
        return (0, dom_node_manipulation_1.createCommentNode)(lView[view_1.RENDERER], ngDevMode ? 'ng-container' : '');
    }
    // Hydration mode, looking up existing elements in DOM.
    const currentRNode = (0, node_lookup_utils_1.locateNextRNode)(hydrationInfo, tView, lView, tNode);
    ngDevMode && (0, error_handling_1.validateNodeExists)(currentRNode, lView, tNode);
    const ngContainerSize = (0, utils_1.getNgContainerSize)(hydrationInfo, index);
    ngDevMode &&
        (0, assert_1.assertNumber)(ngContainerSize, 'Unexpected state: hydrating an <ng-container>, ' + 'but no hydration info is available.');
    (0, utils_1.setSegmentHead)(hydrationInfo, index, currentRNode);
    comment = (0, node_lookup_utils_1.siblingAfter)(ngContainerSize, currentRNode);
    if (ngDevMode) {
        (0, error_handling_1.validateMatchingNode)(comment, Node.COMMENT_NODE, null, lView, tNode);
        (0, utils_1.markRNodeAsClaimedByHydration)(comment);
    }
    return comment;
}
function enableLocateOrCreateElementContainerNodeImpl() {
    _locateOrCreateElementContainerNode = locateOrCreateElementContainerNode;
}
