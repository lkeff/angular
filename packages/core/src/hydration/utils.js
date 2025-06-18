"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydrationStatus = exports.SSR_CONTENT_INTEGRITY_MARKER = exports.NGH_ATTR_NAME = exports.NGH_DEFER_BLOCKS_KEY = exports.TRANSFER_STATE_DEFER_BLOCKS_INFO = exports.NGH_DATA_KEY = void 0;
exports.retrieveHydrationInfoImpl = retrieveHydrationInfoImpl;
exports.enableRetrieveHydrationInfoImpl = enableRetrieveHydrationInfoImpl;
exports.retrieveHydrationInfo = retrieveHydrationInfo;
exports.getLNodeForHydration = getLNodeForHydration;
exports.processTextNodeMarkersBeforeHydration = processTextNodeMarkersBeforeHydration;
exports.readHydrationInfo = readHydrationInfo;
exports.markRNodeAsClaimedByHydration = markRNodeAsClaimedByHydration;
exports.markRNodeAsSkippedByHydration = markRNodeAsSkippedByHydration;
exports.countBlocksSkippedByHydration = countBlocksSkippedByHydration;
exports.markRNodeAsHavingHydrationMismatch = markRNodeAsHavingHydrationMismatch;
exports.isRNodeClaimedForHydration = isRNodeClaimedForHydration;
exports.setSegmentHead = setSegmentHead;
exports.getSegmentHead = getSegmentHead;
exports.isIncrementalHydrationEnabled = isIncrementalHydrationEnabled;
exports.assertIncrementalHydrationIsConfigured = assertIncrementalHydrationIsConfigured;
exports.assertSsrIdDefined = assertSsrIdDefined;
exports.getNgContainerSize = getNgContainerSize;
exports.isSerializedElementContainer = isSerializedElementContainer;
exports.getSerializedContainerViews = getSerializedContainerViews;
exports.calcSerializedContainerSize = calcSerializedContainerSize;
exports.initDisconnectedNodes = initDisconnectedNodes;
exports.isDisconnectedNode = isDisconnectedNode;
exports.processTextNodeBeforeSerialization = processTextNodeBeforeSerialization;
exports.convertHydrateTriggersToJsAction = convertHydrateTriggersToJsAction;
exports.getParentBlockHydrationQueue = getParentBlockHydrationQueue;
exports.appendDeferBlocksToJSActionMap = appendDeferBlocksToJSActionMap;
exports.retrieveDeferBlockDataImpl = retrieveDeferBlockDataImpl;
exports.enableRetrieveDeferBlockDataImpl = enableRetrieveDeferBlockDataImpl;
exports.retrieveDeferBlockData = retrieveDeferBlockData;
exports.processBlockData = processBlockData;
exports.verifySsrContentsIntegrity = verifySsrContentsIntegrity;
const discovery_utils_1 = require("../render3/util/discovery_utils");
const document_1 = require("../render3/interfaces/document");
const type_checks_1 = require("../render3/interfaces/type_checks");
const view_1 = require("../render3/interfaces/view");
const transfer_state_1 = require("../transfer_state");
const assert_1 = require("../util/assert");
const interfaces_1 = require("./interfaces");
const tokens_1 = require("./tokens");
const errors_1 = require("../errors");
const dom_triggers_1 = require("../defer/dom_triggers");
const registry_1 = require("../defer/registry");
const event_delegation_utils_1 = require("../event_delegation_utils");
/**
 * The name of the key used in the TransferState collection,
 * where hydration information is located.
 */
const TRANSFER_STATE_TOKEN_ID = '__nghData__';
/**
 * Lookup key used to reference DOM hydration data (ngh) in `TransferState`.
 */
exports.NGH_DATA_KEY = (0, transfer_state_1.makeStateKey)(TRANSFER_STATE_TOKEN_ID);
/**
 * The name of the key used in the TransferState collection,
 * where serialized defer block information is located.
 */
exports.TRANSFER_STATE_DEFER_BLOCKS_INFO = '__nghDeferData__';
/**
 * Lookup key used to retrieve defer block datain `TransferState`.
 */
exports.NGH_DEFER_BLOCKS_KEY = (0, transfer_state_1.makeStateKey)(exports.TRANSFER_STATE_DEFER_BLOCKS_INFO);
/**
 * The name of the attribute that would be added to host component
 * nodes and contain a reference to a particular slot in transferred
 * state that contains the necessary hydration info for this component.
 */
exports.NGH_ATTR_NAME = 'ngh';
/**
 * Marker used in a comment node to ensure hydration content integrity
 */
exports.SSR_CONTENT_INTEGRITY_MARKER = 'nghm';
/**
 * Reference to a function that reads `ngh` attribute value from a given RNode
 * and retrieves hydration information from the TransferState using that value
 * as an index. Returns `null` by default, when hydration is not enabled.
 *
 * @param rNode Component's host element.
 * @param injector Injector that this component has access to.
 * @param isRootView Specifies whether we trying to read hydration info for the root view.
 */
let _retrieveHydrationInfoImpl = () => null;
function retrieveHydrationInfoImpl(rNode, injector, isRootView = false) {
    var _a;
    let nghAttrValue = rNode.getAttribute(exports.NGH_ATTR_NAME);
    if (nghAttrValue == null)
        return null;
    // For cases when a root component also acts as an anchor node for a ViewContainerRef
    // (for example, when ViewContainerRef is injected in a root component), there is a need
    // to serialize information about the component itself, as well as an LContainer that
    // represents this ViewContainerRef. Effectively, we need to serialize 2 pieces of info:
    // (1) hydration info for the root component itself and (2) hydration info for the
    // ViewContainerRef instance (an LContainer). Each piece of information is included into
    // the hydration data (in the TransferState object) separately, thus we end up with 2 ids.
    // Since we only have 1 root element, we encode both bits of info into a single string:
    // ids are separated by the `|` char (e.g. `10|25`, where `10` is the ngh for a component view
    // and 25 is the `ngh` for a root view which holds LContainer).
    const [componentViewNgh, rootViewNgh] = nghAttrValue.split('|');
    nghAttrValue = isRootView ? rootViewNgh : componentViewNgh;
    if (!nghAttrValue)
        return null;
    // We've read one of the ngh ids, keep the remaining one, so that
    // we can set it back on the DOM element.
    const rootNgh = rootViewNgh ? `|${rootViewNgh}` : '';
    const remainingNgh = isRootView ? componentViewNgh : rootNgh;
    let data = {};
    // An element might have an empty `ngh` attribute value (e.g. `<comp ngh="" />`),
    // which means that no special annotations are required. Do not attempt to read
    // from the TransferState in this case.
    if (nghAttrValue !== '') {
        const transferState = injector.get(transfer_state_1.TransferState, null, { optional: true });
        if (transferState !== null) {
            const nghData = transferState.get(exports.NGH_DATA_KEY, []);
            // The nghAttrValue is always a number referencing an index
            // in the hydration TransferState data.
            data = nghData[Number(nghAttrValue)];
            // If the `ngh` attribute exists and has a non-empty value,
            // the hydration info *must* be present in the TransferState.
            // If there is no data for some reasons, this is an error.
            ngDevMode && (0, assert_1.assertDefined)(data, 'Unable to retrieve hydration info from the TransferState.');
        }
    }
    const dehydratedView = {
        data,
        firstChild: (_a = rNode.firstChild) !== null && _a !== void 0 ? _a : null,
    };
    if (isRootView) {
        // If there is hydration info present for the root view, it means that there was
        // a ViewContainerRef injected in the root component. The root component host element
        // acted as an anchor node in this scenario. As a result, the DOM nodes that represent
        // embedded views in this ViewContainerRef are located as siblings to the host node,
        // i.e. `<app-root /><#VIEW1><#VIEW2>...<!--container-->`. In this case, the current
        // node becomes the first child of this root view and the next sibling is the first
        // element in the DOM segment.
        dehydratedView.firstChild = rNode;
        // We use `0` here, since this is the slot (right after the HEADER_OFFSET)
        // where a component LView or an LContainer is located in a root LView.
        setSegmentHead(dehydratedView, 0, rNode.nextSibling);
    }
    if (remainingNgh) {
        // If we have only used one of the ngh ids, store the remaining one
        // back on this RNode.
        rNode.setAttribute(exports.NGH_ATTR_NAME, remainingNgh);
    }
    else {
        // The `ngh` attribute is cleared from the DOM node now
        // that the data has been retrieved for all indices.
        rNode.removeAttribute(exports.NGH_ATTR_NAME);
    }
    // Note: don't check whether this node was claimed for hydration,
    // because this node might've been previously claimed while processing
    // template instructions.
    ngDevMode && markRNodeAsClaimedByHydration(rNode, /* checkIfAlreadyClaimed */ false);
    ngDevMode && ngDevMode.hydratedComponents++;
    return dehydratedView;
}
/**
 * Sets the implementation for the `retrieveHydrationInfo` function.
 */
function enableRetrieveHydrationInfoImpl() {
    _retrieveHydrationInfoImpl = retrieveHydrationInfoImpl;
}
/**
 * Retrieves hydration info by reading the value from the `ngh` attribute
 * and accessing a corresponding slot in TransferState storage.
 */
function retrieveHydrationInfo(rNode, injector, isRootView = false) {
    return _retrieveHydrationInfoImpl(rNode, injector, isRootView);
}
/**
 * Retrieves the necessary object from a given ViewRef to serialize:
 *  - an LView for component views
 *  - an LContainer for cases when component acts as a ViewContainerRef anchor
 *  - `null` in case of an embedded view
 */
function getLNodeForHydration(viewRef) {
    // Reading an internal field from `ViewRef` instance.
    let lView = viewRef._lView;
    const tView = lView[view_1.TVIEW];
    // A registered ViewRef might represent an instance of an
    // embedded view, in which case we do not need to annotate it.
    if (tView.type === 2 /* TViewType.Embedded */) {
        return null;
    }
    // Check if it's a root view and if so, retrieve component's
    // LView from the first slot after the header.
    if ((0, type_checks_1.isRootView)(lView)) {
        lView = lView[view_1.HEADER_OFFSET];
    }
    return lView;
}
function getTextNodeContent(node) {
    var _a;
    return (_a = node.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s/gm, '');
}
/**
 * Restores text nodes and separators into the DOM that were lost during SSR
 * serialization. The hydration process replaces empty text nodes and text
 * nodes that are immediately adjacent to other text nodes with comment nodes
 * that this method filters on to restore those missing nodes that the
 * hydration process is expecting to be present.
 *
 * @param node The app's root HTML Element
 */
function processTextNodeMarkersBeforeHydration(node) {
    const doc = (0, document_1.getDocument)();
    const commentNodesIterator = doc.createNodeIterator(node, NodeFilter.SHOW_COMMENT, {
        acceptNode(node) {
            const content = getTextNodeContent(node);
            const isTextNodeMarker = content === "ngetn" /* TextNodeMarker.EmptyNode */ || content === "ngtns" /* TextNodeMarker.Separator */;
            return isTextNodeMarker ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
    });
    let currentNode;
    // We cannot modify the DOM while using the commentIterator,
    // because it throws off the iterator state.
    // So we collect all marker nodes first and then follow up with
    // applying the changes to the DOM: either inserting an empty node
    // or just removing the marker if it was used as a separator.
    const nodes = [];
    while ((currentNode = commentNodesIterator.nextNode())) {
        nodes.push(currentNode);
    }
    for (const node of nodes) {
        if (node.textContent === "ngetn" /* TextNodeMarker.EmptyNode */) {
            node.replaceWith(doc.createTextNode(''));
        }
        else {
            node.remove();
        }
    }
}
/**
 * Internal type that represents a claimed node.
 * Only used in dev mode.
 */
var HydrationStatus;
(function (HydrationStatus) {
    HydrationStatus["Hydrated"] = "hydrated";
    HydrationStatus["Skipped"] = "skipped";
    HydrationStatus["Mismatched"] = "mismatched";
})(HydrationStatus || (exports.HydrationStatus = HydrationStatus = {}));
const HYDRATION_INFO_KEY = '__ngDebugHydrationInfo__';
function patchHydrationInfo(node, info) {
    node[HYDRATION_INFO_KEY] = info;
}
function readHydrationInfo(node) {
    var _a;
    return (_a = node[HYDRATION_INFO_KEY]) !== null && _a !== void 0 ? _a : null;
}
/**
 * Marks a node as "claimed" by hydration process.
 * This is needed to make assessments in tests whether
 * the hydration process handled all nodes.
 */
function markRNodeAsClaimedByHydration(node, checkIfAlreadyClaimed = true) {
    if (!ngDevMode) {
        throw new Error('Calling `markRNodeAsClaimedByHydration` in prod mode ' +
            'is not supported and likely a mistake.');
    }
    if (checkIfAlreadyClaimed && isRNodeClaimedForHydration(node)) {
        throw new Error('Trying to claim a node, which was claimed already.');
    }
    patchHydrationInfo(node, { status: HydrationStatus.Hydrated });
    ngDevMode.hydratedNodes++;
}
function markRNodeAsSkippedByHydration(node) {
    if (!ngDevMode) {
        throw new Error('Calling `markRNodeAsSkippedByHydration` in prod mode ' +
            'is not supported and likely a mistake.');
    }
    patchHydrationInfo(node, { status: HydrationStatus.Skipped });
    ngDevMode.componentsSkippedHydration++;
}
function countBlocksSkippedByHydration(injector) {
    const transferState = injector.get(transfer_state_1.TransferState);
    const nghDeferData = transferState.get(exports.NGH_DEFER_BLOCKS_KEY, {});
    if (ngDevMode) {
        ngDevMode.deferBlocksWithIncrementalHydration = Object.keys(nghDeferData).length;
    }
}
function markRNodeAsHavingHydrationMismatch(node, expectedNodeDetails = null, actualNodeDetails = null) {
    if (!ngDevMode) {
        throw new Error('Calling `markRNodeAsMismatchedByHydration` in prod mode ' +
            'is not supported and likely a mistake.');
    }
    // The RNode can be a standard HTMLElement (not an Angular component or directive)
    // The devtools component tree only displays Angular components & directives
    // Therefore we attach the debug info to the closest component/directive
    while (node && !(0, discovery_utils_1.getComponent)(node)) {
        node = node === null || node === void 0 ? void 0 : node.parentNode;
    }
    if (node) {
        patchHydrationInfo(node, {
            status: HydrationStatus.Mismatched,
            expectedNodeDetails,
            actualNodeDetails,
        });
    }
}
function isRNodeClaimedForHydration(node) {
    var _a;
    return ((_a = readHydrationInfo(node)) === null || _a === void 0 ? void 0 : _a.status) === HydrationStatus.Hydrated;
}
function setSegmentHead(hydrationInfo, index, node) {
    var _a;
    (_a = hydrationInfo.segmentHeads) !== null && _a !== void 0 ? _a : (hydrationInfo.segmentHeads = {});
    hydrationInfo.segmentHeads[index] = node;
}
function getSegmentHead(hydrationInfo, index) {
    var _a, _b;
    return (_b = (_a = hydrationInfo.segmentHeads) === null || _a === void 0 ? void 0 : _a[index]) !== null && _b !== void 0 ? _b : null;
}
function isIncrementalHydrationEnabled(injector) {
    return injector.get(tokens_1.IS_INCREMENTAL_HYDRATION_ENABLED, false, {
        optional: true,
    });
}
/** Throws an error if the incremental hydration is not enabled */
function assertIncrementalHydrationIsConfigured(injector) {
    if (!isIncrementalHydrationEnabled(injector)) {
        throw new errors_1.RuntimeError(508 /* RuntimeErrorCode.MISCONFIGURED_INCREMENTAL_HYDRATION */, 'Angular has detected that some `@defer` blocks use `hydrate` triggers, ' +
            'but incremental hydration was not enabled. Please ensure that the `withIncrementalHydration()` ' +
            'call is added as an argument for the `provideClientHydration()` function call ' +
            'in your application config.');
    }
}
/** Throws an error if the ssrUniqueId on the LDeferBlockDetails is not present  */
function assertSsrIdDefined(ssrUniqueId) {
    (0, assert_1.assertDefined)(ssrUniqueId, 'Internal error: expecting an SSR id for a defer block that should be hydrated, but the id is not present');
}
/**
 * Returns the size of an <ng-container>, using either the information
 * serialized in `ELEMENT_CONTAINERS` (element container size) or by
 * computing the sum of root nodes in all dehydrated views in a given
 * container (in case this `<ng-container>` was also used as a view
 * container host node, e.g. <ng-container *ngIf>).
 */
function getNgContainerSize(hydrationInfo, index) {
    var _a, _b, _c;
    const data = hydrationInfo.data;
    let size = (_b = (_a = data[interfaces_1.ELEMENT_CONTAINERS]) === null || _a === void 0 ? void 0 : _a[index]) !== null && _b !== void 0 ? _b : null;
    // If there is no serialized information available in the `ELEMENT_CONTAINERS` slot,
    // check if we have info about view containers at this location (e.g.
    // `<ng-container *ngIf>`) and use container size as a number of root nodes in this
    // element container.
    if (size === null && ((_c = data[interfaces_1.CONTAINERS]) === null || _c === void 0 ? void 0 : _c[index])) {
        size = calcSerializedContainerSize(hydrationInfo, index);
    }
    return size;
}
function isSerializedElementContainer(hydrationInfo, index) {
    var _a;
    return ((_a = hydrationInfo.data[interfaces_1.ELEMENT_CONTAINERS]) === null || _a === void 0 ? void 0 : _a[index]) !== undefined;
}
function getSerializedContainerViews(hydrationInfo, index) {
    var _a, _b;
    return (_b = (_a = hydrationInfo.data[interfaces_1.CONTAINERS]) === null || _a === void 0 ? void 0 : _a[index]) !== null && _b !== void 0 ? _b : null;
}
/**
 * Computes the size of a serialized container (the number of root nodes)
 * by calculating the sum of root nodes in all dehydrated views in this container.
 */
function calcSerializedContainerSize(hydrationInfo, index) {
    var _a, _b;
    const views = (_a = getSerializedContainerViews(hydrationInfo, index)) !== null && _a !== void 0 ? _a : [];
    let numNodes = 0;
    for (let view of views) {
        numNodes += view[interfaces_1.NUM_ROOT_NODES] * ((_b = view[interfaces_1.MULTIPLIER]) !== null && _b !== void 0 ? _b : 1);
    }
    return numNodes;
}
/**
 * Attempt to initialize the `disconnectedNodes` field of the given
 * `DehydratedView`. Returns the initialized value.
 */
function initDisconnectedNodes(hydrationInfo) {
    // Check if we are processing disconnected info for the first time.
    if (typeof hydrationInfo.disconnectedNodes === 'undefined') {
        const nodeIds = hydrationInfo.data[interfaces_1.DISCONNECTED_NODES];
        hydrationInfo.disconnectedNodes = nodeIds ? new Set(nodeIds) : null;
    }
    return hydrationInfo.disconnectedNodes;
}
/**
 * Checks whether a node is annotated as "disconnected", i.e. not present
 * in the DOM at serialization time. We should not attempt hydration for
 * such nodes and instead, use a regular "creation mode".
 */
function isDisconnectedNode(hydrationInfo, index) {
    var _a;
    // Check if we are processing disconnected info for the first time.
    if (typeof hydrationInfo.disconnectedNodes === 'undefined') {
        const nodeIds = hydrationInfo.data[interfaces_1.DISCONNECTED_NODES];
        hydrationInfo.disconnectedNodes = nodeIds ? new Set(nodeIds) : null;
    }
    return !!((_a = initDisconnectedNodes(hydrationInfo)) === null || _a === void 0 ? void 0 : _a.has(index));
}
/**
 * Helper function to prepare text nodes for serialization by ensuring
 * that seperate logical text blocks in the DOM remain separate after
 * serialization.
 */
function processTextNodeBeforeSerialization(context, node) {
    // Handle cases where text nodes can be lost after DOM serialization:
    //  1. When there is an *empty text node* in DOM: in this case, this
    //     node would not make it into the serialized string and as a result,
    //     this node wouldn't be created in a browser. This would result in
    //     a mismatch during the hydration, where the runtime logic would expect
    //     a text node to be present in live DOM, but no text node would exist.
    //     Example: `<span>{{ name }}</span>` when the `name` is an empty string.
    //     This would result in `<span></span>` string after serialization and
    //     in a browser only the `span` element would be created. To resolve that,
    //     an extra comment node is appended in place of an empty text node and
    //     that special comment node is replaced with an empty text node *before*
    //     hydration.
    //  2. When there are 2 consecutive text nodes present in the DOM.
    //     Example: `<div>Hello <ng-container *ngIf="true">world</ng-container></div>`.
    //     In this scenario, the live DOM would look like this:
    //       <div>#text('Hello ') #text('world') #comment('container')</div>
    //     Serialized string would look like this: `<div>Hello world<!--container--></div>`.
    //     The live DOM in a browser after that would be:
    //       <div>#text('Hello world') #comment('container')</div>
    //     Notice how 2 text nodes are now "merged" into one. This would cause hydration
    //     logic to fail, since it'd expect 2 text nodes being present, not one.
    //     To fix this, we insert a special comment node in between those text nodes, so
    //     serialized representation is: `<div>Hello <!--ngtns-->world<!--container--></div>`.
    //     This forces browser to create 2 text nodes separated by a comment node.
    //     Before running a hydration process, this special comment node is removed, so the
    //     live DOM has exactly the same state as it was before serialization.
    var _a;
    // Collect this node as required special annotation only when its
    // contents is empty. Otherwise, such text node would be present on
    // the client after server-side rendering and no special handling needed.
    const el = node;
    const corruptedTextNodes = context.corruptedTextNodes;
    if (el.textContent === '') {
        corruptedTextNodes.set(el, "ngetn" /* TextNodeMarker.EmptyNode */);
    }
    else if (((_a = el.nextSibling) === null || _a === void 0 ? void 0 : _a.nodeType) === Node.TEXT_NODE) {
        corruptedTextNodes.set(el, "ngtns" /* TextNodeMarker.Separator */);
    }
}
function convertHydrateTriggersToJsAction(triggers) {
    let actionList = [];
    if (triggers !== null) {
        if (triggers.has(4 /* DeferBlockTrigger.Hover */)) {
            actionList.push(...dom_triggers_1.hoverEventNames);
        }
        if (triggers.has(3 /* DeferBlockTrigger.Interaction */)) {
            actionList.push(...dom_triggers_1.interactionEventNames);
        }
    }
    return actionList;
}
/**
 * Builds a queue of blocks that need to be hydrated, looking up the
 * tree to the topmost defer block that exists in the tree that hasn't
 * been hydrated, but exists in the registry. This queue is in top down
 * hierarchical order as a list of defer block ids.
 * Note: This is utilizing serialized information to navigate up the tree
 */
function getParentBlockHydrationQueue(deferBlockId, injector) {
    const dehydratedBlockRegistry = injector.get(registry_1.DEHYDRATED_BLOCK_REGISTRY);
    const transferState = injector.get(transfer_state_1.TransferState);
    const deferBlockParents = transferState.get(exports.NGH_DEFER_BLOCKS_KEY, {});
    let isTopMostDeferBlock = false;
    let currentBlockId = deferBlockId;
    let parentBlockPromise = null;
    const hydrationQueue = [];
    while (!isTopMostDeferBlock && currentBlockId) {
        ngDevMode &&
            (0, assert_1.assertEqual)(hydrationQueue.indexOf(currentBlockId), -1, 'Internal error: defer block hierarchy has a cycle.');
        isTopMostDeferBlock = dehydratedBlockRegistry.has(currentBlockId);
        const hydratingParentBlock = dehydratedBlockRegistry.hydrating.get(currentBlockId);
        if (parentBlockPromise === null && hydratingParentBlock != null) {
            parentBlockPromise = hydratingParentBlock.promise;
            break;
        }
        hydrationQueue.unshift(currentBlockId);
        currentBlockId = deferBlockParents[currentBlockId][interfaces_1.DEFER_PARENT_BLOCK_ID];
    }
    return { parentBlockPromise, hydrationQueue };
}
function gatherDeferBlocksByJSActionAttribute(doc) {
    const jsactionNodes = doc.body.querySelectorAll('[jsaction]');
    const blockMap = new Set();
    const eventTypes = [dom_triggers_1.hoverEventNames.join(':;'), dom_triggers_1.interactionEventNames.join(':;')].join('|');
    for (let node of jsactionNodes) {
        const attr = node.getAttribute('jsaction');
        const blockId = node.getAttribute('ngb');
        if ((attr === null || attr === void 0 ? void 0 : attr.match(eventTypes)) && blockId !== null) {
            blockMap.add(node);
        }
    }
    return blockMap;
}
function appendDeferBlocksToJSActionMap(doc, injector) {
    const blockMap = gatherDeferBlocksByJSActionAttribute(doc);
    const jsActionMap = injector.get(tokens_1.JSACTION_BLOCK_ELEMENT_MAP);
    for (let rNode of blockMap) {
        (0, event_delegation_utils_1.sharedMapFunction)(rNode, jsActionMap);
    }
}
/**
 * Retrieves defer block hydration information from the TransferState.
 *
 * @param injector Injector that this component has access to.
 */
let _retrieveDeferBlockDataImpl = () => {
    return {};
};
function retrieveDeferBlockDataImpl(injector) {
    const transferState = injector.get(transfer_state_1.TransferState, null, { optional: true });
    if (transferState !== null) {
        const nghDeferData = transferState.get(exports.NGH_DEFER_BLOCKS_KEY, {});
        ngDevMode &&
            (0, assert_1.assertDefined)(nghDeferData, 'Unable to retrieve defer block info from the TransferState.');
        return nghDeferData;
    }
    return {};
}
/**
 * Sets the implementation for the `retrieveDeferBlockData` function.
 */
function enableRetrieveDeferBlockDataImpl() {
    _retrieveDeferBlockDataImpl = retrieveDeferBlockDataImpl;
}
/**
 * Retrieves defer block data from TransferState storage
 */
function retrieveDeferBlockData(injector) {
    return _retrieveDeferBlockDataImpl(injector);
}
function isTimerTrigger(triggerInfo) {
    return typeof triggerInfo === 'object' && triggerInfo.trigger === 5 /* DeferBlockTrigger.Timer */;
}
function getHydrateTimerTrigger(blockData) {
    var _a, _b;
    const trigger = (_a = blockData[interfaces_1.DEFER_HYDRATE_TRIGGERS]) === null || _a === void 0 ? void 0 : _a.find((t) => isTimerTrigger(t));
    return (_b = trigger === null || trigger === void 0 ? void 0 : trigger.delay) !== null && _b !== void 0 ? _b : null;
}
function hasHydrateTrigger(blockData, trigger) {
    var _a, _b;
    return (_b = (_a = blockData[interfaces_1.DEFER_HYDRATE_TRIGGERS]) === null || _a === void 0 ? void 0 : _a.includes(trigger)) !== null && _b !== void 0 ? _b : false;
}
/**
 * Creates a summary of the given serialized defer block, which is used later to properly initialize
 * specific triggers.
 */
function createBlockSummary(blockInfo) {
    return {
        data: blockInfo,
        hydrate: {
            idle: hasHydrateTrigger(blockInfo, 0 /* DeferBlockTrigger.Idle */),
            immediate: hasHydrateTrigger(blockInfo, 1 /* DeferBlockTrigger.Immediate */),
            timer: getHydrateTimerTrigger(blockInfo),
            viewport: hasHydrateTrigger(blockInfo, 2 /* DeferBlockTrigger.Viewport */),
        },
    };
}
/**
 * Processes all of the defer block data in the transfer state and creates a map of the summaries
 */
function processBlockData(injector) {
    const blockData = retrieveDeferBlockData(injector);
    let blockDetails = new Map();
    for (let blockId in blockData) {
        blockDetails.set(blockId, createBlockSummary(blockData[blockId]));
    }
    return blockDetails;
}
function isSsrContentsIntegrity(node) {
    var _a;
    return (!!node &&
        node.nodeType === Node.COMMENT_NODE &&
        ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === exports.SSR_CONTENT_INTEGRITY_MARKER);
}
function skipTextNodes(node) {
    // Ignore whitespace. Before the <body>, we shouldn't find text nodes that aren't whitespace.
    while (node && node.nodeType === Node.TEXT_NODE) {
        node = node.previousSibling;
    }
    return node;
}
/**
 * Verifies whether the DOM contains a special marker added during SSR time to make sure
 * there is no SSR'ed contents transformations happen after SSR is completed. Typically that
 * happens either by CDN or during the build process as an optimization to remove comment nodes.
 * Hydration process requires comment nodes produced by Angular to locate correct DOM segments.
 * When this special marker is *not* present - throw an error and do not proceed with hydration,
 * since it will not be able to function correctly.
 *
 * Note: this function is invoked only on the client, so it's safe to use DOM APIs.
 */
function verifySsrContentsIntegrity(doc) {
    for (const node of doc.body.childNodes) {
        if (isSsrContentsIntegrity(node)) {
            return;
        }
    }
    // Check if the HTML parser may have moved the marker to just before the <body> tag,
    // e.g. because the body tag was implicit and not present in the markup. An implicit body
    // tag is unlikely to interfer with whitespace/comments inside of the app's root element.
    // Case 1: Implicit body. Example:
    //   <!doctype html><head><title>Hi</title></head><!--nghm--><app-root></app-root>
    const beforeBody = skipTextNodes(doc.body.previousSibling);
    if (isSsrContentsIntegrity(beforeBody)) {
        return;
    }
    // Case 2: Implicit body & head. Example:
    //   <!doctype html><head><title>Hi</title><!--nghm--><app-root></app-root>
    let endOfHead = skipTextNodes(doc.head.lastChild);
    if (isSsrContentsIntegrity(endOfHead)) {
        return;
    }
    throw new errors_1.RuntimeError(-507 /* RuntimeErrorCode.MISSING_SSR_CONTENT_INTEGRITY_MARKER */, typeof ngDevMode !== 'undefined' &&
        ngDevMode &&
        'Angular hydration logic detected that HTML content of this page was modified after it ' +
            'was produced during server side rendering. Make sure that there are no optimizations ' +
            'that remove comment nodes from HTML enabled on your CDN. Angular hydration ' +
            'relies on HTML produced by the server, including whitespaces and comment nodes.');
}
