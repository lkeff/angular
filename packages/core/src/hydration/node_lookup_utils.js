"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDisconnectedNode = isDisconnectedNode;
exports.isDisconnectedRNode = isDisconnectedRNode;
exports.locateI18nRNodeByIndex = locateI18nRNodeByIndex;
exports.tryLocateRNodeByPath = tryLocateRNodeByPath;
exports.locateNextRNode = locateNextRNode;
exports.siblingAfter = siblingAfter;
exports.navigateBetween = navigateBetween;
exports.calcPathBetween = calcPathBetween;
exports.calcPathForNode = calcPathForNode;
exports.gatherDeferBlocksCommentNodes = gatherDeferBlocksCommentNodes;
const view_1 = require("../render3/interfaces/view");
const node_manipulation_1 = require("../render3/node_manipulation");
const misc_utils_1 = require("../render3/util/misc_utils");
const stringify_utils_1 = require("../render3/util/stringify_utils");
const view_utils_1 = require("../render3/util/view_utils");
const assert_1 = require("../util/assert");
const compression_1 = require("./compression");
const error_handling_1 = require("./error_handling");
const interfaces_1 = require("./interfaces");
const utils_1 = require("./utils");
/** Whether current TNode is a first node in an <ng-container>. */
function isFirstElementInNgContainer(tNode) {
    var _a;
    return !tNode.prev && ((_a = tNode.parent) === null || _a === void 0 ? void 0 : _a.type) === 8 /* TNodeType.ElementContainer */;
}
/** Returns an instruction index (subtracting HEADER_OFFSET). */
function getNoOffsetIndex(tNode) {
    return tNode.index - view_1.HEADER_OFFSET;
}
/**
 * Check whether a given node exists, but is disconnected from the DOM.
 */
function isDisconnectedNode(tNode, lView) {
    return (!(tNode.type & (16 /* TNodeType.Projection */ | 128 /* TNodeType.LetDeclaration */)) &&
        !!lView[tNode.index] &&
        isDisconnectedRNode((0, view_utils_1.unwrapRNode)(lView[tNode.index])));
}
/**
 * Check whether the given node exists, but is disconnected from the DOM.
 *
 * Note: we leverage the fact that we have this information available in the DOM emulation
 * layer (in Domino) for now. Longer-term solution should not rely on the DOM emulation and
 * only use internal data structures and state to compute this information.
 */
function isDisconnectedRNode(rNode) {
    return !!rNode && !rNode.isConnected;
}
/**
 * Locate a node in an i18n tree that corresponds to a given instruction index.
 *
 * @param hydrationInfo The hydration annotation data
 * @param noOffsetIndex the instruction index
 * @returns an RNode that corresponds to the instruction index
 */
function locateI18nRNodeByIndex(hydrationInfo, noOffsetIndex) {
    const i18nNodes = hydrationInfo.i18nNodes;
    if (i18nNodes) {
        return i18nNodes.get(noOffsetIndex);
    }
    return undefined;
}
/**
 * Attempt to locate an RNode by a path, if it exists.
 *
 * @param hydrationInfo The hydration annotation data
 * @param lView the current lView
 * @param noOffsetIndex the instruction index
 * @returns an RNode that corresponds to the instruction index or null if no path exists
 */
function tryLocateRNodeByPath(hydrationInfo, lView, noOffsetIndex) {
    const nodes = hydrationInfo.data[interfaces_1.NODES];
    const path = nodes === null || nodes === void 0 ? void 0 : nodes[noOffsetIndex];
    return path ? locateRNodeByPath(path, lView) : null;
}
/**
 * Locate a node in DOM tree that corresponds to a given TNode.
 *
 * @param hydrationInfo The hydration annotation data
 * @param tView the current tView
 * @param lView the current lView
 * @param tNode the current tNode
 * @returns an RNode that represents a given tNode
 */
function locateNextRNode(hydrationInfo, tView, lView, tNode) {
    var _a;
    const noOffsetIndex = getNoOffsetIndex(tNode);
    let native = locateI18nRNodeByIndex(hydrationInfo, noOffsetIndex);
    if (native === undefined) {
        const nodes = hydrationInfo.data[interfaces_1.NODES];
        if (nodes === null || nodes === void 0 ? void 0 : nodes[noOffsetIndex]) {
            // We know the exact location of the node.
            native = locateRNodeByPath(nodes[noOffsetIndex], lView);
        }
        else if (tView.firstChild === tNode) {
            // We create a first node in this view, so we use a reference
            // to the first child in this DOM segment.
            native = hydrationInfo.firstChild;
        }
        else {
            // Locate a node based on a previous sibling or a parent node.
            const previousTNodeParent = tNode.prev === null;
            const previousTNode = ((_a = tNode.prev) !== null && _a !== void 0 ? _a : tNode.parent);
            ngDevMode &&
                (0, assert_1.assertDefined)(previousTNode, 'Unexpected state: current TNode does not have a connection ' +
                    'to the previous node or a parent node.');
            if (isFirstElementInNgContainer(tNode)) {
                const noOffsetParentIndex = getNoOffsetIndex(tNode.parent);
                native = (0, utils_1.getSegmentHead)(hydrationInfo, noOffsetParentIndex);
            }
            else {
                let previousRElement = (0, view_utils_1.getNativeByTNode)(previousTNode, lView);
                if (previousTNodeParent) {
                    native = previousRElement.firstChild;
                }
                else {
                    // If the previous node is an element, but it also has container info,
                    // this means that we are processing a node like `<div #vcrTarget>`, which is
                    // represented in the DOM as `<div></div>...<!--container-->`.
                    // In this case, there are nodes *after* this element and we need to skip
                    // all of them to reach an element that we are looking for.
                    const noOffsetPrevSiblingIndex = getNoOffsetIndex(previousTNode);
                    const segmentHead = (0, utils_1.getSegmentHead)(hydrationInfo, noOffsetPrevSiblingIndex);
                    if (previousTNode.type === 2 /* TNodeType.Element */ && segmentHead) {
                        const numRootNodesToSkip = (0, utils_1.calcSerializedContainerSize)(hydrationInfo, noOffsetPrevSiblingIndex);
                        // `+1` stands for an anchor comment node after all the views in this container.
                        const nodesToSkip = numRootNodesToSkip + 1;
                        // First node after this segment.
                        native = siblingAfter(nodesToSkip, segmentHead);
                    }
                    else {
                        native = previousRElement.nextSibling;
                    }
                }
            }
        }
    }
    return native;
}
/**
 * Skips over a specified number of nodes and returns the next sibling node after that.
 */
function siblingAfter(skip, from) {
    let currentNode = from;
    for (let i = 0; i < skip; i++) {
        ngDevMode && (0, error_handling_1.validateSiblingNodeExists)(currentNode);
        currentNode = currentNode.nextSibling;
    }
    return currentNode;
}
/**
 * Helper function to produce a string representation of the navigation steps
 * (in terms of `nextSibling` and `firstChild` navigations). Used in error
 * messages in dev mode.
 */
function stringifyNavigationInstructions(instructions) {
    const container = [];
    for (let i = 0; i < instructions.length; i += 2) {
        const step = instructions[i];
        const repeat = instructions[i + 1];
        for (let r = 0; r < repeat; r++) {
            container.push(step === interfaces_1.NODE_NAVIGATION_STEP_FIRST_CHILD ? 'firstChild' : 'nextSibling');
        }
    }
    return container.join('.');
}
/**
 * Helper function that navigates from a starting point node (the `from` node)
 * using provided set of navigation instructions (within `path` argument).
 */
function navigateToNode(from, instructions) {
    let node = from;
    for (let i = 0; i < instructions.length; i += 2) {
        const step = instructions[i];
        const repeat = instructions[i + 1];
        for (let r = 0; r < repeat; r++) {
            if (ngDevMode && !node) {
                throw (0, error_handling_1.nodeNotFoundAtPathError)(from, stringifyNavigationInstructions(instructions));
            }
            switch (step) {
                case interfaces_1.NODE_NAVIGATION_STEP_FIRST_CHILD:
                    node = node.firstChild;
                    break;
                case interfaces_1.NODE_NAVIGATION_STEP_NEXT_SIBLING:
                    node = node.nextSibling;
                    break;
            }
        }
    }
    if (ngDevMode && !node) {
        throw (0, error_handling_1.nodeNotFoundAtPathError)(from, stringifyNavigationInstructions(instructions));
    }
    return node;
}
/**
 * Locates an RNode given a set of navigation instructions (which also contains
 * a starting point node info).
 */
function locateRNodeByPath(path, lView) {
    const [referenceNode, ...navigationInstructions] = (0, compression_1.decompressNodeLocation)(path);
    let ref;
    if (referenceNode === interfaces_1.REFERENCE_NODE_HOST) {
        ref = lView[view_1.DECLARATION_COMPONENT_VIEW][view_1.HOST];
    }
    else if (referenceNode === interfaces_1.REFERENCE_NODE_BODY) {
        ref = (0, misc_utils_1.ɵɵresolveBody)(lView[view_1.DECLARATION_COMPONENT_VIEW][view_1.HOST]);
    }
    else {
        const parentElementId = Number(referenceNode);
        ref = (0, view_utils_1.unwrapRNode)(lView[parentElementId + view_1.HEADER_OFFSET]);
    }
    return navigateToNode(ref, navigationInstructions);
}
/**
 * Generate a list of DOM navigation operations to get from node `start` to node `finish`.
 *
 * Note: assumes that node `start` occurs before node `finish` in an in-order traversal of the DOM
 * tree. That is, we should be able to get from `start` to `finish` purely by using `.firstChild`
 * and `.nextSibling` operations.
 */
function navigateBetween(start, finish) {
    if (start === finish) {
        return [];
    }
    else if (start.parentElement == null || finish.parentElement == null) {
        return null;
    }
    else if (start.parentElement === finish.parentElement) {
        return navigateBetweenSiblings(start, finish);
    }
    else {
        // `finish` is a child of its parent, so the parent will always have a child.
        const parent = finish.parentElement;
        const parentPath = navigateBetween(start, parent);
        const childPath = navigateBetween(parent.firstChild, finish);
        if (!parentPath || !childPath)
            return null;
        return [
            // First navigate to `finish`'s parent
            ...parentPath,
            // Then to its first child.
            interfaces_1.NODE_NAVIGATION_STEP_FIRST_CHILD,
            // And finally from that node to `finish` (maybe a no-op if we're already there).
            ...childPath,
        ];
    }
}
/**
 * Calculates a path between 2 sibling nodes (generates a number of `NextSibling` navigations).
 * Returns `null` if no such path exists between the given nodes.
 */
function navigateBetweenSiblings(start, finish) {
    const nav = [];
    let node = null;
    for (node = start; node != null && node !== finish; node = node.nextSibling) {
        nav.push(interfaces_1.NODE_NAVIGATION_STEP_NEXT_SIBLING);
    }
    // If the `node` becomes `null` or `undefined` at the end, that means that we
    // didn't find the `end` node, thus return `null` (which would trigger serialization
    // error to be produced).
    return node == null ? null : nav;
}
/**
 * Calculates a path between 2 nodes in terms of `nextSibling` and `firstChild`
 * navigations:
 * - the `from` node is a known node, used as an starting point for the lookup
 *   (the `fromNodeName` argument is a string representation of the node).
 * - the `to` node is a node that the runtime logic would be looking up,
 *   using the path generated by this function.
 */
function calcPathBetween(from, to, fromNodeName) {
    const path = navigateBetween(from, to);
    return path === null ? null : (0, compression_1.compressNodeLocation)(fromNodeName, path);
}
/**
 * Invoked at serialization time (on the server) when a set of navigation
 * instructions needs to be generated for a TNode.
 */
function calcPathForNode(tNode, lView, excludedParentNodes) {
    let parentTNode = tNode.parent;
    let parentIndex;
    let parentRNode;
    let referenceNodeName;
    // Skip over all parent nodes that are disconnected from the DOM, such nodes
    // can not be used as anchors.
    //
    // This might happen in certain content projection-based use-cases, where
    // a content of an element is projected and used, when a parent element
    // itself remains detached from DOM. In this scenario we try to find a parent
    // element that is attached to DOM and can act as an anchor instead.
    //
    // It can also happen that the parent node should be excluded, for example,
    // because it belongs to an i18n block, which requires paths which aren't
    // relative to other views in an i18n block.
    while (parentTNode !== null &&
        (isDisconnectedNode(parentTNode, lView) || (excludedParentNodes === null || excludedParentNodes === void 0 ? void 0 : excludedParentNodes.has(parentTNode.index)))) {
        parentTNode = parentTNode.parent;
    }
    if (parentTNode === null || !(parentTNode.type & 3 /* TNodeType.AnyRNode */)) {
        // If there is no parent TNode or a parent TNode does not represent an RNode
        // (i.e. not a DOM node), use component host element as a reference node.
        parentIndex = referenceNodeName = interfaces_1.REFERENCE_NODE_HOST;
        parentRNode = lView[view_1.DECLARATION_COMPONENT_VIEW][view_1.HOST];
    }
    else {
        // Use parent TNode as a reference node.
        parentIndex = parentTNode.index;
        parentRNode = (0, view_utils_1.unwrapRNode)(lView[parentIndex]);
        referenceNodeName = (0, stringify_utils_1.renderStringify)(parentIndex - view_1.HEADER_OFFSET);
    }
    let rNode = (0, view_utils_1.unwrapRNode)(lView[tNode.index]);
    if (tNode.type & (12 /* TNodeType.AnyContainer */ | 32 /* TNodeType.Icu */)) {
        // For <ng-container> nodes, instead of serializing a reference
        // to the anchor comment node, serialize a location of the first
        // DOM element. Paired with the container size (serialized as a part
        // of `ngh.containers`), it should give enough information for runtime
        // to hydrate nodes in this container.
        const firstRNode = (0, node_manipulation_1.getFirstNativeNode)(lView, tNode);
        // If container is not empty, use a reference to the first element,
        // otherwise, rNode would point to an anchor comment node.
        if (firstRNode) {
            rNode = firstRNode;
        }
    }
    let path = calcPathBetween(parentRNode, rNode, referenceNodeName);
    if (path === null && parentRNode !== rNode) {
        // Searching for a path between elements within a host node failed.
        // Trying to find a path to an element starting from the `document.body` instead.
        //
        // Important note: this type of reference is relatively unstable, since Angular
        // may not be able to control parts of the page that the runtime logic navigates
        // through. This is mostly needed to cover "portals" use-case (like menus, dialog boxes,
        // etc), where nodes are content-projected (including direct DOM manipulations) outside
        // of the host node. The better solution is to provide APIs to work with "portals",
        // at which point this code path would not be needed.
        const body = parentRNode.ownerDocument.body;
        path = calcPathBetween(body, rNode, interfaces_1.REFERENCE_NODE_BODY);
        if (path === null) {
            // If the path is still empty, it's likely that this node is detached and
            // won't be found during hydration.
            throw (0, error_handling_1.nodeNotFoundError)(lView, tNode);
        }
    }
    return path;
}
/**
 * Retrieves all comments nodes that contain ngh comments referring to a defer block
 */
function gatherDeferBlocksCommentNodes(doc, node) {
    var _a;
    const commentNodesIterator = doc.createNodeIterator(node, NodeFilter.SHOW_COMMENT, { acceptNode });
    let currentNode;
    const nodesByBlockId = new Map();
    while ((currentNode = commentNodesIterator.nextNode())) {
        const nghPattern = 'ngh=';
        const content = currentNode === null || currentNode === void 0 ? void 0 : currentNode.textContent;
        const nghIdx = (_a = content === null || content === void 0 ? void 0 : content.indexOf(nghPattern)) !== null && _a !== void 0 ? _a : -1;
        if (nghIdx > -1) {
            const nghValue = content.substring(nghIdx + nghPattern.length).trim();
            // Make sure the value has an expected format.
            ngDevMode &&
                (0, assert_1.assertEqual)(nghValue.startsWith('d'), true, 'Invalid defer block id found in a comment node.');
            nodesByBlockId.set(nghValue, currentNode);
        }
    }
    return nodesByBlockId;
}
function acceptNode(node) {
    var _a;
    return ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trimStart().startsWith('ngh='))
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
}
