"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentDataSource = void 0;
const collections_1 = require("@angular/cdk/collections");
const core_1 = require("@angular/core");
const tree_1 = require("@angular/material/tree");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const diffing_1 = require("../../../diffing");
const index_forest_1 = require("../index-forest");
const expandable = (node) => !!node.children && node.children.length > 0;
const trackBy = (_, item) => `${item.id}#${item.expandable}`;
const getId = (node) => {
    var _a;
    if (node.defer) {
        return node.defer.id;
    }
    else if (((_a = node.hydration) === null || _a === void 0 ? void 0 : _a.status) === 'dehydrated') {
        return node.position.join('-');
    }
    let prefix = '';
    if (node.component) {
        prefix = node.component.id.toString();
    }
    const dirIds = node.directives
        .map((d) => d.id)
        .sort((a, b) => {
        return a - b;
    });
    return prefix + '-' + dirIds.join('-');
};
/**
 * Takes an `IndexedNode` forest and returns a transformed forest without `#comment` nodes.
 * The algorithm has linear complexity and O(depth(forest)) memory complexity.
 *
 * @param nodes indexed nodes, which have already have associated positions within the original
 *  tree and associated indices.
 * @returns forest with filtered `#comment` nodes.
 */
const filterCommentNodes = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.element !== '#comment') {
            continue;
        }
        nodes.splice(i, 1, ...node.children);
        i--;
    }
    for (const node of nodes) {
        filterCommentNodes(node.children);
    }
    return nodes;
};
class ComponentDataSource extends collections_1.DataSource {
    constructor(_treeControl) {
        super();
        this._treeControl = _treeControl;
        this._differ = new core_1.DefaultIterableDiffer(trackBy);
        this._expandedData = new rxjs_1.BehaviorSubject([]);
        this._flattenedData = new rxjs_1.BehaviorSubject([]);
        this._nodeToFlat = new WeakMap();
        this._treeFlattener = new tree_1.MatTreeFlattener((node, level) => {
            if (this._nodeToFlat.has(node)) {
                return this._nodeToFlat.get(node);
            }
            const flatNode = {
                expandable: expandable(node),
                id: getId(node),
                // We can compare the nodes in the navigation functions above
                // based on this identifier directly, since it's a reference type
                // and the reference is preserved after transformation.
                position: node.position,
                name: node.component ? node.component.name : node.element,
                directives: node.directives.map((d) => d.name),
                original: node,
                level,
                hydration: node.hydration,
                defer: node.defer,
                onPush: node.onPush,
                hasNativeElement: node.hasNativeElement,
            };
            this._nodeToFlat.set(node, flatNode);
            return flatNode;
        }, (node) => (node ? node.level : -1), (node) => (node ? node.expandable : false), (node) => (node ? node.children : []));
    }
    get data() {
        return this._flattenedData.value;
    }
    get expandedDataValues() {
        return this._expandedData.value;
    }
    getFlatNodeFromIndexedNode(indexedNode) {
        return this._nodeToFlat.get(indexedNode);
    }
    update(forest, showCommentNodes) {
        if (!forest) {
            return { newItems: [], movedItems: [], removedItems: [] };
        }
        let indexedForest = (0, index_forest_1.indexForest)(forest);
        // We filter comment nodes here because we need to preserve the positions within the component
        // tree.
        //
        // For example:
        // ```
        // - #comment
        //   - bar
        // ```
        //
        // #comment's position will be [0] and bar's will be [0, 0]. If we trim #comment nodes earlier
        // before indexing, bar's position will be [0] which will be inaccurate and will make the
        // backend enable to find the corresponding node when we request its properties.
        if (!showCommentNodes) {
            indexedForest = filterCommentNodes(indexedForest);
        }
        const flattenedCollection = this._treeFlattener.flattenNodes(indexedForest);
        this.data.forEach((i) => (i.newItem = false));
        const expandedNodes = {};
        this.data.forEach((item) => {
            expandedNodes[item.id] = this._treeControl.isExpanded(item);
        });
        const { newItems, movedItems, removedItems } = (0, diffing_1.diff)(this._differ, this.data, flattenedCollection);
        this._treeControl.dataNodes = this.data;
        this._flattenedData.next(this.data);
        movedItems.forEach((i) => {
            this._nodeToFlat.set(i.original, i);
            if (expandedNodes[i.id]) {
                this._treeControl.expand(i);
            }
        });
        newItems.forEach((i) => (i.newItem = true));
        removedItems.forEach((i) => this._nodeToFlat.delete(i.original));
        return { newItems, movedItems, removedItems };
    }
    connect(collectionViewer) {
        const changes = [
            collectionViewer.viewChange,
            this._treeControl.expansionModel.changed,
            this._flattenedData,
        ];
        return (0, rxjs_1.merge)(...changes).pipe((0, operators_1.map)(() => {
            this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this.data, this._treeControl));
            return this._expandedData.value;
        }));
    }
    disconnect() { }
}
exports.ComponentDataSource = ComponentDataSource;
