"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeControlFlow = analyzeControlFlow;
const typescript_1 = __importDefault(require("typescript"));
const flow_containers_1 = require("./flow_containers");
const flow_node_traversal_1 = require("./flow_node_traversal");
const unwrap_parent_1 = require("../utils/unwrap_parent");
const assert_1 = __importDefault(require("assert"));
/**
 * Analyzes the control flow of a list of references and returns
 * information about which nodes can be shared via a temporary variable
 * to enable narrowing.
 *
 * E.g. consider the following snippet:
 *
 * ```ts
 * someMethod() {
 *   if (this.bla) {
 *     this.bla.charAt(0);
 *   }
 * }
 * ```
 *
 * The analysis would inform the caller that `this.bla.charAt` can
 * be shared with the `this.bla` of the `if` condition.
 *
 * This is useful for the signal migration as it allows us to efficiently,
 * and minimally transform references into shared variables where needed.
 * Needed because signals are not narrowable by default, as they are functions.
 */
function analyzeControlFlow(entries, checker) {
    const result = [];
    const referenceToMetadata = new Map();
    // Prepare easy lookups for reference nodes to flow info.
    for (const [idx, entry] of entries.entries()) {
        const flowContainer = (0, flow_containers_1.getControlFlowContainer)(entry);
        referenceToMetadata.set(entry, {
            flowContainer,
            resultIndex: idx,
        });
        result.push({
            flowContainer,
            id: idx,
            originalNode: entry,
            recommendedNode: 'preserve',
        });
    }
    for (const entry of entries) {
        const { flowContainer, resultIndex } = referenceToMetadata.get(entry);
        const flowPathInterestingNodes = (0, flow_node_traversal_1.traverseFlowForInterestingNodes)((0, flow_node_traversal_1.getFlowNode)(entry));
        (0, assert_1.default)(flowContainer !== null && flowPathInterestingNodes !== null, 'Expected a flow container to exist.');
        const narrowPartners = getAllMatchingReferencesInFlowPath(flowPathInterestingNodes, entry, referenceToMetadata, flowContainer, checker);
        if (narrowPartners.length !== 0) {
            connectSharedReferences(result, narrowPartners, resultIndex);
        }
    }
    return result;
}
/**
 * Iterates through all partner flow nodes and connects them so that
 * the first node will act as the share partner, while all subsequent
 * nodes will point to the share node.
 */
function connectSharedReferences(result, flowPartners, refId) {
    const refFlowContainer = result[refId].flowContainer;
    // Inside the list of flow partners (i.e. references to the same target),
    // find the node that is the first one in the flow container (via its start pos).
    let earliestPartner = null;
    let earliestPartnerId = null;
    for (const partnerId of flowPartners) {
        if (earliestPartner === null ||
            result[partnerId].originalNode.getStart() < earliestPartner.getStart()) {
            earliestPartner = result[partnerId].originalNode;
            earliestPartnerId = partnerId;
        }
    }
    (0, assert_1.default)(earliestPartner !== null, 'Expected an earliest partner to be found.');
    (0, assert_1.default)(earliestPartnerId !== null, 'Expected an earliest partner to be found.');
    // Earliest partner ID could be higher than `refId` in cyclic
    // situations like `loop` flow nodes. We need to find the minimum
    // and maximum to iterate through partners in between.
    const min = Math.min(earliestPartnerId, refId);
    const max = Math.max(earliestPartnerId, refId);
    // Then, incorporate all similar references (or flow nodes) in between
    // the reference and the earliest partner. References in between can also
    // use the shared flow node and not preserve their original reference— as
    // this would be rather unreadable and inefficient.
    const seenBlocks = new Set();
    let highestBlock = null;
    for (let i = min; i <= max; i++) {
        // Different flow container captured sequentially in result. Ignore.
        if (result[i].flowContainer !== refFlowContainer) {
            continue;
        }
        // Iterate up the block, find the highest block within the flow container.
        let current = result[i].originalNode.parent;
        while (current !== undefined) {
            if (isPotentialInsertionAncestor(current)) {
                // If we saw this block already, it is a common ancestor from another
                // partner. Check if it would be higher than the current highest block;
                // and choose it accordingly.
                if (seenBlocks.has(current)) {
                    if (highestBlock === null || current.getStart() < highestBlock.getStart()) {
                        highestBlock = current;
                    }
                    break;
                }
                seenBlocks.add(current);
            }
            current = current.parent;
        }
        if (i !== earliestPartnerId) {
            result[i].recommendedNode = earliestPartnerId;
        }
    }
    if (!highestBlock) {
        console.error(earliestPartnerId, refId, refFlowContainer.getText(), seenBlocks);
    }
    (0, assert_1.default)(highestBlock, 'Expected a block anchor to be found');
    result[earliestPartnerId].recommendedNode = highestBlock;
}
function isPotentialInsertionAncestor(node) {
    // Note: Arrow functions may not have a block, but instead use an expression
    // directly. This still signifies a "block" as we can convert the concise body
    // to a block.
    return (typescript_1.default.isSourceFile(node) || typescript_1.default.isBlock(node) || typescript_1.default.isArrowFunction(node) || typescript_1.default.isClassLike(node));
}
/**
 * Looks through the flow path and interesting nodes to determine which
 * of the potential "interesting" nodes point to the same reference.
 *
 * These nodes are then considered "partners" and will be returned via
 * their IDs (or practically their result indices).
 */
function getAllMatchingReferencesInFlowPath(flowPathInterestingNodes, reference, referenceToMetadata, restrainingFlowContainer, checker) {
    const partners = [];
    for (const flowNode of flowPathInterestingNodes) {
        // quick naive perf-optimized check to see if the flow node has a potential
        // similar reference.
        if (!flowNode.getText().includes(reference.getText())) {
            continue;
        }
        const similarRefNodeId = findSimilarReferenceNode(flowNode, reference, referenceToMetadata, restrainingFlowContainer, checker);
        if (similarRefNodeId !== null) {
            partners.push(similarRefNodeId);
        }
    }
    return partners;
}
/**
 * Checks if the given node contains an identifier that
 * matches the given reference. If so, returns its flow ID.
 */
function findSimilarReferenceNode(start, reference, referenceToMetadata, restrainingFlowContainer, checker) {
    var _a, _b;
    return ((_b = (_a = typescript_1.default.forEachChild(start, function visitChild(node) {
        var _a;
        // do not descend into control flow boundaries.
        // only references sharing the same container are relevant.
        // This is a performance optimization.
        if ((0, flow_containers_1.isControlFlowBoundary)(node)) {
            return;
        }
        // If this is not a potential matching identifier, check its children.
        if (!typescript_1.default.isIdentifier(node) ||
            ((_a = referenceToMetadata.get(node)) === null || _a === void 0 ? void 0 : _a.flowContainer) !== restrainingFlowContainer) {
            return typescript_1.default.forEachChild(node, visitChild);
        }
        // If this refers to a different instantiation of the input reference,
        // continue looking.
        if (!isLexicalSameReference(checker, node, reference)) {
            return;
        }
        return { idx: referenceToMetadata.get(node).resultIndex };
    })) === null || _a === void 0 ? void 0 : _a.idx) !== null && _b !== void 0 ? _b : null);
}
/**
 * Checks whether a given identifier is lexically equivalent.
 * e.g. checks that they have similar property receiver accesses.
 */
function isLexicalSameReference(checker, sharePartner, reference) {
    const aParent = (0, unwrap_parent_1.unwrapParent)(reference.parent);
    // If the reference is not part a property access, return true. The references
    // are guaranteed symbol matches.
    if (!typescript_1.default.isPropertyAccessExpression(aParent) && !typescript_1.default.isElementAccessExpression(aParent)) {
        return sharePartner.text === reference.text;
    }
    // If reference parent is part of a property expression, but the share
    // partner not, then this cannot be shared.
    const bParent = (0, unwrap_parent_1.unwrapParent)(sharePartner.parent);
    if (aParent.kind !== bParent.kind) {
        return false;
    }
    const aParentExprSymbol = checker.getSymbolAtLocation(aParent.expression);
    const bParentExprSymbol = checker.getSymbolAtLocation(bParent.expression);
    return aParentExprSymbol === bParentExprSymbol;
}
