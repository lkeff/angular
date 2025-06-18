"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵelementStart = ɵɵelementStart;
exports.ɵɵelementEnd = ɵɵelementEnd;
exports.ɵɵelement = ɵɵelement;
exports.enableLocateOrCreateElementNodeImpl = enableLocateOrCreateElementNodeImpl;
const error_handling_1 = require("../../hydration/error_handling");
const node_lookup_utils_1 = require("../../hydration/node_lookup_utils");
const skip_hydration_1 = require("../../hydration/skip_hydration");
const utils_1 = require("../../hydration/utils");
const utils_2 = require("../../i18n/utils");
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const context_discovery_1 = require("../context_discovery");
const dom_node_manipulation_1 = require("../dom_node_manipulation");
const node_1 = require("../interfaces/node");
const type_checks_1 = require("../interfaces/type_checks");
const view_1 = require("../interfaces/view");
const node_assert_1 = require("../node_assert");
const node_manipulation_1 = require("../node_manipulation");
const query_execution_1 = require("../queries/query_execution");
const state_1 = require("../state");
const elements_1 = require("../view/elements");
const element_validation_1 = require("./element_validation");
const property_1 = require("./property");
const shared_1 = require("./shared");
/**
 * Create DOM element. The instruction must later be followed by `elementEnd()` call.
 *
 * @param index Index of the element in the LView array
 * @param name Name of the DOM Node
 * @param attrsIndex Index of the element's attributes in the `consts` array.
 * @param localRefsIndex Index of the element's local references in the `consts` array.
 * @returns This function returns itself so that it may be chained.
 *
 * Attributes and localRefs are passed as an array of strings where elements with an even index
 * hold an attribute name and elements with an odd index hold an attribute value, ex.:
 * ['id', 'warning5', 'class', 'alert']
 *
 * @codeGenApi
 */
function ɵɵelementStart(index, name, attrsIndex, localRefsIndex) {
    const lView = (0, state_1.getLView)();
    const tView = (0, state_1.getTView)();
    const adjustedIndex = view_1.HEADER_OFFSET + index;
    ngDevMode &&
        (0, assert_1.assertEqual)((0, state_1.getBindingIndex)(), tView.bindingStartIndex, 'elements should be created before any bindings');
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, adjustedIndex);
    const renderer = lView[view_1.RENDERER];
    const tNode = tView.firstCreatePass
        ? (0, elements_1.elementStartFirstCreatePass)(adjustedIndex, tView, lView, name, shared_1.findDirectiveDefMatches, (0, state_1.getBindingsEnabled)(), attrsIndex, localRefsIndex)
        : tView.data[adjustedIndex];
    const native = _locateOrCreateElementNode(tView, lView, tNode, renderer, name, index);
    lView[adjustedIndex] = native;
    const hasDirectives = (0, type_checks_1.isDirectiveHost)(tNode);
    if (ngDevMode && tView.firstCreatePass) {
        (0, element_validation_1.validateElementIsKnown)(native, lView, tNode.value, tView.schemas, hasDirectives);
    }
    (0, state_1.setCurrentTNode)(tNode, true);
    (0, dom_node_manipulation_1.setupStaticAttributes)(renderer, native, tNode);
    if (!(0, utils_2.isDetachedByI18n)(tNode) && (0, state_1.wasLastNodeCreated)()) {
        // In the i18n case, the translation may have removed this element, so only add it if it is not
        // detached. See `TNodeType.Placeholder` and `LFrame.inI18n` for more context.
        (0, node_manipulation_1.appendChild)(tView, lView, native, tNode);
    }
    // any immediate children of a component or template container must be pre-emptively
    // monkey-patched with the component view data so that the element can be inspected
    // later on using any element discovery utility methods (see `element_discovery.ts`)
    if ((0, state_1.getElementDepthCount)() === 0 || hasDirectives) {
        (0, context_discovery_1.attachPatchData)(native, lView);
    }
    (0, state_1.increaseElementDepthCount)();
    if (hasDirectives) {
        (0, shared_1.createDirectivesInstances)(tView, lView, tNode);
        (0, query_execution_1.executeContentQueries)(tView, tNode, lView);
    }
    if (localRefsIndex !== null) {
        (0, shared_1.saveResolvedLocalsInData)(lView, tNode);
    }
    return ɵɵelementStart;
}
/**
 * Mark the end of the element.
 * @returns This function returns itself so that it may be chained.
 *
 * @codeGenApi
 */
function ɵɵelementEnd() {
    let currentTNode = (0, state_1.getCurrentTNode)();
    ngDevMode && (0, assert_1.assertDefined)(currentTNode, 'No parent node to close.');
    if ((0, state_1.isCurrentTNodeParent)()) {
        (0, state_1.setCurrentTNodeAsNotParent)();
    }
    else {
        ngDevMode && (0, assert_2.assertHasParent)((0, state_1.getCurrentTNode)());
        currentTNode = currentTNode.parent;
        (0, state_1.setCurrentTNode)(currentTNode, false);
    }
    const tNode = currentTNode;
    ngDevMode && (0, node_assert_1.assertTNodeType)(tNode, 3 /* TNodeType.AnyRNode */);
    if ((0, state_1.isSkipHydrationRootTNode)(tNode)) {
        (0, state_1.leaveSkipHydrationBlock)();
    }
    (0, state_1.decreaseElementDepthCount)();
    const tView = (0, state_1.getTView)();
    if (tView.firstCreatePass) {
        (0, elements_1.elementEndFirstCreatePass)(tView, tNode);
    }
    if (tNode.classesWithoutHost != null && (0, node_1.hasClassInput)(tNode)) {
        (0, property_1.setDirectiveInputsWhichShadowsStyling)(tView, tNode, (0, state_1.getLView)(), tNode.classesWithoutHost, true);
    }
    if (tNode.stylesWithoutHost != null && (0, node_1.hasStyleInput)(tNode)) {
        (0, property_1.setDirectiveInputsWhichShadowsStyling)(tView, tNode, (0, state_1.getLView)(), tNode.stylesWithoutHost, false);
    }
    return ɵɵelementEnd;
}
/**
 * Creates an empty element using {@link elementStart} and {@link elementEnd}
 *
 * @param index Index of the element in the data array
 * @param name Name of the DOM Node
 * @param attrsIndex Index of the element's attributes in the `consts` array.
 * @param localRefsIndex Index of the element's local references in the `consts` array.
 * @returns This function returns itself so that it may be chained.
 *
 * @codeGenApi
 */
function ɵɵelement(index, name, attrsIndex, localRefsIndex) {
    ɵɵelementStart(index, name, attrsIndex, localRefsIndex);
    ɵɵelementEnd();
    return ɵɵelement;
}
let _locateOrCreateElementNode = (tView, lView, tNode, renderer, name, index) => {
    (0, state_1.lastNodeWasCreated)(true);
    return (0, dom_node_manipulation_1.createElementNode)(renderer, name, (0, state_1.getNamespace)());
};
/**
 * Enables hydration code path (to lookup existing elements in DOM)
 * in addition to the regular creation mode of element nodes.
 */
function locateOrCreateElementNodeImpl(tView, lView, tNode, renderer, name, index) {
    const hydrationInfo = lView[view_1.HYDRATION];
    const isNodeCreationMode = !hydrationInfo ||
        (0, state_1.isInSkipHydrationBlock)() ||
        (0, utils_2.isDetachedByI18n)(tNode) ||
        (0, utils_1.isDisconnectedNode)(hydrationInfo, index);
    (0, state_1.lastNodeWasCreated)(isNodeCreationMode);
    // Regular creation mode.
    if (isNodeCreationMode) {
        return (0, dom_node_manipulation_1.createElementNode)(renderer, name, (0, state_1.getNamespace)());
    }
    // Hydration mode, looking up an existing element in DOM.
    const native = (0, node_lookup_utils_1.locateNextRNode)(hydrationInfo, tView, lView, tNode);
    ngDevMode && (0, error_handling_1.validateMatchingNode)(native, Node.ELEMENT_NODE, name, lView, tNode);
    ngDevMode && (0, utils_1.markRNodeAsClaimedByHydration)(native);
    // This element might also be an anchor of a view container.
    if ((0, utils_1.getSerializedContainerViews)(hydrationInfo, index)) {
        // Important note: this element acts as an anchor, but it's **not** a part
        // of the embedded view, so we start the segment **after** this element, taking
        // a reference to the next sibling. For example, the following template:
        // `<div #vcrTarget>` is represented in the DOM as `<div></div>...<!--container-->`,
        // so while processing a `<div>` instruction, point to the next sibling as a
        // start of a segment.
        ngDevMode && (0, error_handling_1.validateNodeExists)(native.nextSibling, lView, tNode);
        (0, utils_1.setSegmentHead)(hydrationInfo, index, native.nextSibling);
    }
    // Checks if the skip hydration attribute is present during hydration so we know to
    // skip attempting to hydrate this block. We check both TNode and RElement for an
    // attribute: the RElement case is needed for i18n cases, when we add it to host
    // elements during the annotation phase (after all internal data structures are setup).
    if (hydrationInfo &&
        ((0, skip_hydration_1.hasSkipHydrationAttrOnTNode)(tNode) || (0, skip_hydration_1.hasSkipHydrationAttrOnRElement)(native))) {
        if ((0, type_checks_1.isComponentHost)(tNode)) {
            (0, state_1.enterSkipHydrationBlock)(tNode);
            // Since this isn't hydratable, we need to empty the node
            // so there's no duplicate content after render
            (0, dom_node_manipulation_1.clearElementContents)(native);
            ngDevMode && (0, utils_1.markRNodeAsSkippedByHydration)(native);
        }
        else if (ngDevMode) {
            // If this is not a component host, throw an error.
            // Hydration can be skipped on per-component basis only.
            throw (0, error_handling_1.invalidSkipHydrationHost)(native);
        }
    }
    return native;
}
function enableLocateOrCreateElementNodeImpl() {
    _locateOrCreateElementNode = locateOrCreateElementNodeImpl;
}
