"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexForest = exports.IdentityTracker = void 0;
const component_tree_1 = require("../component-tree/component-tree");
class IdentityTracker {
    // private constructor for Singleton Pattern
    constructor() {
        this._directiveIdCounter = 0;
        this._currentDirectivePosition = new Map();
        this._currentDirectiveId = new Map();
        this.isComponent = new Map();
    }
    static getInstance() {
        if (!IdentityTracker._instance) {
            IdentityTracker._instance = new IdentityTracker();
        }
        return IdentityTracker._instance;
    }
    getDirectivePosition(dir) {
        return this._currentDirectivePosition.get(dir);
    }
    getDirectiveId(dir) {
        return this._currentDirectiveId.get(dir);
    }
    hasDirective(dir) {
        return this._currentDirectiveId.has(dir);
    }
    index() {
        const directiveForest = (0, component_tree_1.buildDirectiveForest)();
        const indexedForest = (0, exports.indexForest)(directiveForest);
        const newNodes = [];
        const removedNodes = [];
        const allNodes = new Set();
        indexedForest.forEach((root) => this._index(root, null, newNodes, allNodes));
        this._currentDirectiveId.forEach((_, dir) => {
            if (!allNodes.has(dir)) {
                removedNodes.push({ directive: dir, isComponent: !!this.isComponent.get(dir) });
                // We can't clean these up because during profiling
                // they might be requested for removed components
                // this._currentDirectiveId.delete(dir);
                // this._currentDirectivePosition.delete(dir);
            }
        });
        return { newNodes, removedNodes, indexedForest, directiveForest };
    }
    _index(node, parent, newNodes, allNodes) {
        if (node.component) {
            allNodes.add(node.component.instance);
            this.isComponent.set(node.component.instance, true);
            this._indexNode(node.component.instance, node.position, newNodes);
        }
        (node.directives || []).forEach((dir) => {
            allNodes.add(dir.instance);
            this.isComponent.set(dir.instance, false);
            this._indexNode(dir.instance, node.position, newNodes);
        });
        if (node.defer) {
            this._indexNode(node.defer, node.position, newNodes);
        }
        node.children.forEach((child) => this._index(child, parent, newNodes, allNodes));
    }
    _indexNode(directive, position, newNodes) {
        this._currentDirectivePosition.set(directive, position);
        if (!this._currentDirectiveId.has(directive)) {
            newNodes.push({ directive, isComponent: !!this.isComponent.get(directive) });
            this._currentDirectiveId.set(directive, this._directiveIdCounter++);
        }
    }
    destroy() {
        this._currentDirectivePosition = new Map();
        this._currentDirectiveId = new Map();
    }
}
exports.IdentityTracker = IdentityTracker;
const indexTree = (node, idx, parentPosition = []) => {
    const position = parentPosition.concat([idx]);
    return {
        position,
        element: node.element,
        component: node.component,
        directives: node.directives.map((d) => (Object.assign({ position }, d))),
        children: node.children.map((n, i) => indexTree(n, i, position)),
        nativeElement: node.nativeElement,
        hydration: node.hydration,
        defer: node.defer,
    };
};
const indexForest = (forest) => forest.map((n, i) => indexTree(n, i));
exports.indexForest = indexForest;
