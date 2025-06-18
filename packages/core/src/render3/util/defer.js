"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeferBlocks = getDeferBlocks;
const discovery_1 = require("../../defer/discovery");
const interfaces_1 = require("../../defer/interfaces");
const registry_1 = require("../../defer/registry");
const utils_1 = require("../../defer/utils");
const interfaces_2 = require("../../hydration/interfaces");
const utils_2 = require("../../hydration/utils");
const transfer_state_1 = require("../../transfer_state");
const assert_1 = require("../assert");
const collect_native_nodes_1 = require("../collect_native_nodes");
const context_discovery_1 = require("../context_discovery");
const container_1 = require("../interfaces/container");
const view_1 = require("../interfaces/view");
const view_utils_1 = require("./view_utils");
/**
 * Gets all of the `@defer` blocks that are present inside the specified DOM node.
 * @param node Node in which to look for `@defer` blocks.
 *
 * @publicApi
 */
function getDeferBlocks(node) {
    var _a;
    const results = [];
    const lView = (_a = (0, context_discovery_1.getLContext)(node)) === null || _a === void 0 ? void 0 : _a.lView;
    if (lView) {
        findDeferBlocks(node, lView, results);
    }
    return results;
}
/**
 * Finds all the `@defer` blocks inside a specific node and view.
 * @param node Node in which to search for blocks.
 * @param lView View within the node in which to search for blocks.
 * @param results Array to which to add blocks once they're found.
 */
function findDeferBlocks(node, lView, results) {
    var _a, _b, _c, _d, _e, _f, _g;
    const viewInjector = lView[view_1.INJECTOR];
    const registry = viewInjector.get(registry_1.DEHYDRATED_BLOCK_REGISTRY, null, { optional: true });
    const blocks = [];
    (0, discovery_1.getDeferBlocks)(lView, blocks);
    const transferState = viewInjector.get(transfer_state_1.TransferState);
    const deferBlockParents = transferState.get(utils_2.NGH_DEFER_BLOCKS_KEY, {});
    for (const details of blocks) {
        const native = (0, view_utils_1.getNativeByTNode)(details.tNode, details.lView);
        const lDetails = (0, utils_1.getLDeferBlockDetails)(details.lView, details.tNode);
        // The LView from `getLContext` might be the view the element is placed in.
        // Filter out defer blocks that aren't inside the specified root node.
        if (!node.contains(native)) {
            continue;
        }
        const tDetails = details.tDetails;
        const renderedLView = getRendererLView(details);
        const rootNodes = [];
        const hydrationState = inferHydrationState(tDetails, lDetails, registry);
        if (renderedLView !== null) {
            (0, collect_native_nodes_1.collectNativeNodes)(renderedLView[view_1.TVIEW], renderedLView, renderedLView[view_1.TVIEW].firstChild, rootNodes);
        }
        else if (hydrationState === 'dehydrated') {
            // We'll find the number of root nodes in the transfer state and
            // collect that number of elements that precede the defer block comment node.
            const deferId = lDetails[interfaces_1.SSR_UNIQUE_ID];
            const deferData = deferBlockParents[deferId];
            const numberOfRootNodes = deferData[interfaces_2.NUM_ROOT_NODES];
            let collectedNodeCount = 0;
            const deferBlockCommentNode = details.lContainer[container_1.NATIVE];
            let currentNode = deferBlockCommentNode.previousSibling;
            while (collectedNodeCount < numberOfRootNodes && currentNode) {
                rootNodes.unshift(currentNode);
                currentNode = currentNode.previousSibling;
                collectedNodeCount++;
            }
        }
        const data = {
            state: stringifyState(lDetails[interfaces_1.DEFER_BLOCK_STATE]),
            incrementalHydrationState: hydrationState,
            hasErrorBlock: tDetails.errorTmplIndex !== null,
            loadingBlock: {
                exists: tDetails.loadingTmplIndex !== null,
                minimumTime: (_b = (_a = tDetails.loadingBlockConfig) === null || _a === void 0 ? void 0 : _a[interfaces_1.MINIMUM_SLOT]) !== null && _b !== void 0 ? _b : null,
                afterTime: (_d = (_c = tDetails.loadingBlockConfig) === null || _c === void 0 ? void 0 : _c[interfaces_1.LOADING_AFTER_SLOT]) !== null && _d !== void 0 ? _d : null,
            },
            placeholderBlock: {
                exists: tDetails.placeholderTmplIndex !== null,
                minimumTime: (_f = (_e = tDetails.placeholderBlockConfig) === null || _e === void 0 ? void 0 : _e[interfaces_1.MINIMUM_SLOT]) !== null && _f !== void 0 ? _f : null,
            },
            triggers: ((_g = tDetails.debug) === null || _g === void 0 ? void 0 : _g.triggers) ? Array.from(tDetails.debug.triggers).sort() : [],
            rootNodes,
        };
        results.push(data);
        // `getDeferBlocks` does not resolve nested defer blocks so we have to recurse manually.
        if (renderedLView !== null) {
            findDeferBlocks(node, renderedLView, results);
        }
    }
}
/**
 * Turns the `DeferBlockState` into a string which is more readable than the enum form.
 *
 * @param lDetails Information about the
 * @returns
 */
function stringifyState(state) {
    switch (state) {
        case interfaces_1.DeferBlockState.Complete:
            return 'complete';
        case interfaces_1.DeferBlockState.Loading:
            return 'loading';
        case interfaces_1.DeferBlockState.Placeholder:
            return 'placeholder';
        case interfaces_1.DeferBlockState.Error:
            return 'error';
        case interfaces_1.DeferBlockInternalState.Initial:
            return 'initial';
        default:
            throw new Error(`Unrecognized state ${state}`);
    }
}
/**
 * Infers the hydration state of a specific defer block.
 * @param tDetails Static defer block information.
 * @param lDetails Instance defer block information.
 * @param registry Registry coordinating the hydration of defer blocks.
 */
function inferHydrationState(tDetails, lDetails, registry) {
    if (registry === null ||
        lDetails[interfaces_1.SSR_UNIQUE_ID] === null ||
        tDetails.hydrateTriggers === null ||
        tDetails.hydrateTriggers.has(7 /* DeferBlockTrigger.Never */)) {
        return 'not-configured';
    }
    return registry.has(lDetails[interfaces_1.SSR_UNIQUE_ID]) ? 'dehydrated' : 'hydrated';
}
/**
 * Gets the current LView that is rendered out in a defer block.
 * @param details Instance information about the block.
 */
function getRendererLView(details) {
    // Defer block containers can only ever contain one view.
    // If they're empty, it means that nothing is rendered.
    if (details.lContainer.length <= container_1.CONTAINER_HEADER_OFFSET) {
        return null;
    }
    const lView = details.lContainer[container_1.CONTAINER_HEADER_OFFSET];
    ngDevMode && (0, assert_1.assertLView)(lView);
    return lView;
}
