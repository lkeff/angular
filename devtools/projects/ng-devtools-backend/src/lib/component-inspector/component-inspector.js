"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentInspector = void 0;
const component_tree_1 = require("../component-tree/component-tree");
const highlighter_1 = require("../highlighter");
const hooks_1 = require("../hooks");
class ComponentInspector {
    constructor(componentOptions = {
        onComponentEnter: () => { },
        onComponentLeave: () => { },
        onComponentSelect: () => { },
    }) {
        this.bindMethods();
        this._onComponentEnter = componentOptions.onComponentEnter;
        this._onComponentSelect = componentOptions.onComponentSelect;
        this._onComponentLeave = componentOptions.onComponentLeave;
    }
    startInspecting() {
        window.addEventListener('mouseover', this.elementMouseOver, true);
        window.addEventListener('click', this.elementClick, true);
        window.addEventListener('mouseout', this.cancelEvent, true);
    }
    stopInspecting() {
        window.removeEventListener('mouseover', this.elementMouseOver, true);
        window.removeEventListener('click', this.elementClick, true);
        window.removeEventListener('mouseout', this.cancelEvent, true);
    }
    elementClick(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if (this._selectedComponent.component && this._selectedComponent.host) {
            this._onComponentSelect((0, hooks_1.initializeOrGetDirectiveForestHooks)().getDirectiveId(this._selectedComponent.component));
        }
    }
    elementMouseOver(e) {
        this.cancelEvent(e);
        const el = e.target;
        if (el) {
            this._selectedComponent = (0, highlighter_1.findComponentAndHost)(el);
        }
        (0, highlighter_1.unHighlight)();
        if (this._selectedComponent.component && this._selectedComponent.host) {
            (0, highlighter_1.highlightSelectedElement)(this._selectedComponent.host);
            this._onComponentEnter((0, hooks_1.initializeOrGetDirectiveForestHooks)().getDirectiveId(this._selectedComponent.component));
        }
    }
    cancelEvent(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        this._onComponentLeave();
    }
    bindMethods() {
        this.startInspecting = this.startInspecting.bind(this);
        this.stopInspecting = this.stopInspecting.bind(this);
        this.elementMouseOver = this.elementMouseOver.bind(this);
        this.elementClick = this.elementClick.bind(this);
        this.cancelEvent = this.cancelEvent.bind(this);
    }
    highlightByPosition(position) {
        const forest = (0, hooks_1.initializeOrGetDirectiveForestHooks)().getDirectiveForest();
        const elementToHighlight = (0, component_tree_1.findNodeInForest)(position, forest);
        if (elementToHighlight) {
            (0, highlighter_1.highlightSelectedElement)(elementToHighlight);
        }
    }
    highlightHydrationNodes() {
        const forest = (0, hooks_1.initializeOrGetDirectiveForestHooks)().getDirectiveForest();
        // drop the root nodes, we don't want to highlight it
        const forestWithoutRoots = forest.flatMap((rootNode) => rootNode.children);
        const errorNodes = findErrorNodesForHydrationOverlay(forestWithoutRoots);
        // We get the first level of hydrated nodes
        // nested mismatched nodes nested in hydrated nodes aren't includes
        const nodes = findNodesForHydrationOverlay(forestWithoutRoots);
        // This ensures top level mismatched nodes are removed as we have a dedicated array
        const otherNodes = nodes.filter(({ status }) => (status === null || status === void 0 ? void 0 : status.status) !== 'mismatched');
        for (const { node, status } of [...otherNodes, ...errorNodes]) {
            (0, highlighter_1.highlightHydrationElement)(node, status);
        }
    }
    removeHydrationHighlights() {
        (0, highlighter_1.removeHydrationHighlights)();
    }
}
exports.ComponentInspector = ComponentInspector;
/**
 * Returns the first level of hydrated nodes
 * Note: Mismatched nodes nested in hydrated nodes aren't included
 */
function findNodesForHydrationOverlay(forest) {
    return forest.flatMap((node) => {
        var _a;
        if ((_a = node === null || node === void 0 ? void 0 : node.hydration) === null || _a === void 0 ? void 0 : _a.status) {
            // We highlight first level
            return { node: node.nativeElement, status: node.hydration };
        }
        if (node.children.length) {
            return findNodesForHydrationOverlay(node.children);
        }
        return [];
    });
}
function findErrorNodesForHydrationOverlay(forest) {
    return forest.flatMap((node) => {
        var _a;
        if (((_a = node === null || node === void 0 ? void 0 : node.hydration) === null || _a === void 0 ? void 0 : _a.status) === 'mismatched') {
            // We highlight first level
            return { node: node.nativeElement, status: node.hydration };
        }
        if (node.children.length) {
            return findNodesForHydrationOverlay(node.children);
        }
        return [];
    });
}
