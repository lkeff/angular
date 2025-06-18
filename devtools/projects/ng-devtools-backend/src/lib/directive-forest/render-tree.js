"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTreeStrategy = void 0;
const ng_debug_api_1 = require("../ng-debug-api/ng-debug-api");
const utils_1 = require("../utils");
const extractViewTree = (domNode, result, deferBlocks, getComponent, getDirectives, getDirectiveMetadata) => {
    var _a, _b, _c, _d;
    // Ignore DOM Node if it came from a different frame. Use instanceof Node to check this.
    if (!(domNode instanceof Node)) {
        return result;
    }
    const directives = (_a = getDirectives === null || getDirectives === void 0 ? void 0 : getDirectives(domNode)) !== null && _a !== void 0 ? _a : [];
    if (!directives.length && !(domNode instanceof Element)) {
        return result;
    }
    const componentTreeNode = {
        children: [],
        component: null,
        directives: directives.map((dir) => {
            return {
                instance: dir,
                name: dir.constructor.name,
            };
        }),
        element: domNode.nodeName.toLowerCase(),
        nativeElement: domNode,
        hydration: hydrationStatus(domNode),
        defer: null,
    };
    if (!(domNode instanceof Element)) {
        // In case we show the Comment nodes
        result.push(componentTreeNode);
        return result;
    }
    const isDehydratedElement = ((_b = componentTreeNode.hydration) === null || _b === void 0 ? void 0 : _b.status) === 'dehydrated';
    const component = getComponent === null || getComponent === void 0 ? void 0 : getComponent(domNode);
    if (component) {
        componentTreeNode.component = {
            instance: component,
            isElement: (0, utils_1.isCustomElement)(domNode),
            name: (_d = (_c = getDirectiveMetadata === null || getDirectiveMetadata === void 0 ? void 0 : getDirectiveMetadata(component)) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : domNode.nodeName.toLowerCase(),
        };
    }
    const isDisplayableNode = component || componentTreeNode.directives.length || isDehydratedElement;
    if (isDisplayableNode) {
        result.push(componentTreeNode);
    }
    // Nodes that are part of a defer block will be added as children of the defer block
    // and should be skipped from the regular code path
    const deferredNodesToSkip = new Set();
    const appendTo = isDisplayableNode ? componentTreeNode.children : result;
    domNode.childNodes.forEach((node) => {
        groupDeferChildrenIfNeeded(node, deferredNodesToSkip, appendTo, deferBlocks, getComponent, getDirectives, getDirectiveMetadata);
        if (!deferredNodesToSkip.has(node)) {
            extractViewTree(node, appendTo, deferBlocks, getComponent, getDirectives, getDirectiveMetadata);
        }
    });
    return result;
};
/**
 * Group Nodes under a defer block if they are part of it.
 *
 * @param node
 * @param deferredNodesToSkip Will mutate the set with the nodes that are grouped into the created deferblock.
 * @param deferBlocks
 * @param appendTo
 * @param getComponent
 * @param getDirectives
 * @param getDirectiveMetadata
 */
function groupDeferChildrenIfNeeded(node, deferredNodesToSkip, appendTo, deferBlocks, getComponent, getDirectives, getDirectiveMetadata) {
    const currentDeferBlock = deferBlocks.currentBlock;
    const isFirstDefferedChild = node === (currentDeferBlock === null || currentDeferBlock === void 0 ? void 0 : currentDeferBlock.rootNodes[0]);
    if (isFirstDefferedChild) {
        deferBlocks.advance();
        // When encountering the first child of a defer block
        // We create a synthetic TreeNode reprensenting the defer block
        const childrenTree = [];
        currentDeferBlock.rootNodes.forEach((child) => {
            extractViewTree(child, childrenTree, deferBlocks, getComponent, getDirectives, getDirectiveMetadata);
        });
        const deferBlockTreeNode = {
            children: childrenTree,
            component: null,
            directives: [],
            element: '@defer',
            nativeElement: undefined,
            hydration: null,
            defer: {
                id: `deferId-${deferBlocks.currentIndex}`,
                state: currentDeferBlock.state,
                currentBlock: currentBlock(currentDeferBlock),
                triggers: groupTriggers(currentDeferBlock.triggers),
                blocks: {
                    hasErrorBlock: currentDeferBlock.hasErrorBlock,
                    placeholderBlock: currentDeferBlock.placeholderBlock,
                    loadingBlock: currentDeferBlock.loadingBlock,
                },
            },
        };
        currentDeferBlock === null || currentDeferBlock === void 0 ? void 0 : currentDeferBlock.rootNodes.forEach((child) => deferredNodesToSkip.add(child));
        appendTo.push(deferBlockTreeNode);
    }
}
function hydrationStatus(element) {
    if (!(element instanceof Element)) {
        return null;
    }
    if (!!element.getAttribute('ngh')) {
        return { status: 'dehydrated' };
    }
    const hydrationInfo = element.__ngDebugHydrationInfo__;
    switch (hydrationInfo === null || hydrationInfo === void 0 ? void 0 : hydrationInfo.status) {
        case 'hydrated':
            return { status: 'hydrated' };
        case 'skipped':
            return { status: 'skipped' };
        case 'mismatched':
            return {
                status: 'mismatched',
                expectedNodeDetails: hydrationInfo.expectedNodeDetails,
                actualNodeDetails: hydrationInfo.actualNodeDetails,
            };
        default:
            return null;
    }
}
function groupTriggers(triggers) {
    const defer = [];
    const hydrate = [];
    const prefetch = [];
    for (let trigger of triggers) {
        if (trigger.startsWith('hydrate')) {
            hydrate.push(trigger);
        }
        else if (trigger.startsWith('prefetch')) {
            prefetch.push(trigger);
        }
        else {
            defer.push(trigger);
        }
    }
    return { defer, hydrate, prefetch };
}
function currentBlock(deferBlock) {
    if (['placeholder', 'loading', 'error'].includes(deferBlock.state)) {
        return deferBlock.state;
    }
    return null;
}
class RTreeStrategy {
    supports() {
        return ['getDirectiveMetadata', 'getComponent'].every((method) => typeof (0, ng_debug_api_1.ngDebugClient)()[method] === 'function');
    }
    build(element) {
        var _a, _b;
        const ng = (0, ng_debug_api_1.ngDebugClient)();
        const deferBlocks = (_b = (_a = ng.ɵgetDeferBlocks) === null || _a === void 0 ? void 0 : _a.call(ng, element)) !== null && _b !== void 0 ? _b : [];
        // We want to start from the root element so that we can find components which are attached to
        // the application ref and which host elements have been inserted with DOM APIs.
        while (element.parentElement && element !== document.body) {
            element = element.parentElement;
        }
        return extractViewTree(element, [], new DeferBlocksIterator(deferBlocks), ng.getComponent, ng.getDirectives, ng.getDirectiveMetadata);
    }
}
exports.RTreeStrategy = RTreeStrategy;
class DeferBlocksIterator {
    constructor(blocks) {
        this.currentIndex = 0;
        this.blocks = [];
        this.blocks = blocks;
    }
    advance() {
        this.currentIndex++;
    }
    get currentBlock() {
        return this.blocks[this.currentIndex];
    }
}
