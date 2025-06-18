"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectiveForestComponent = void 0;
const scrolling_1 = require("@angular/cdk/scrolling");
const tree_1 = require("@angular/cdk/tree");
const core_1 = require("@angular/core");
const protocol_1 = require("protocol");
const index_1 = require("../../tab-update/index");
const component_data_source_1 = require("./component-data-source");
const directive_forest_utils_1 = require("./directive-forest-utils");
const filter_component_1 = require("./filter/filter.component");
const tree_node_component_1 = require("./tree-node/tree-node.component");
const NODE_ITEM_HEIGHT = 18; // px; Required for CDK Virtual Scroll
let DirectiveForestComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-directive-forest',
            templateUrl: './directive-forest.component.html',
            styleUrls: ['./directive-forest.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [
                filter_component_1.FilterComponent,
                scrolling_1.CdkVirtualScrollViewport,
                scrolling_1.CdkFixedSizeVirtualScroll,
                scrolling_1.CdkVirtualForOf,
                tree_node_component_1.TreeNodeComponent,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _navigateUp_decorators;
    let _navigateDown_decorators;
    let _collapseCurrent_decorators;
    let _expandCurrent_decorators;
    var DirectiveForestComponent = _classThis = class {
        constructor() {
            this.tabUpdate = (__runInitializers(this, _instanceExtraInitializers), (0, core_1.inject)(index_1.TabUpdate));
            this.messageBus = (0, core_1.inject)(protocol_1.MessageBus);
            this.elementRef = (0, core_1.inject)(core_1.ElementRef);
            this.forest = (0, core_1.input)([]);
            this.showCommentNodes = (0, core_1.input)(false);
            this.currentSelectedElement = core_1.input.required();
            this.selectNode = (0, core_1.output)();
            this.selectDomElement = (0, core_1.output)();
            this.setParents = (0, core_1.output)();
            this.highlightComponent = (0, core_1.output)();
            this.removeComponentHighlight = (0, core_1.output)();
            this.toggleInspector = (0, core_1.output)();
            this.viewport = core_1.viewChild.required(scrolling_1.CdkVirtualScrollViewport);
            this.updateForestResult = (0, core_1.computed)(() => this.updateForest(this.forest()));
            this.selectedNode = (0, core_1.signal)(null);
            this.highlightIdInTreeFromElement = (0, core_1.signal)(null);
            this.matchedNodes = (0, core_1.signal)(new Map()); // Node index, NodeTextMatch
            this.matchesCount = (0, core_1.computed)(() => this.matchedNodes().size);
            this.currentlyMatchedIndex = (0, core_1.signal)(-1);
            this.treeControl = new tree_1.FlatTreeControl((node) => node.level, (node) => node.expandable);
            this.dataSource = new component_data_source_1.ComponentDataSource(this.treeControl);
            this.itemHeight = NODE_ITEM_HEIGHT;
            this.initialized = false;
            this.forestRoot = null;
            this.subscribeToInspectorEvents();
            (0, core_1.afterRenderEffect)({
                read: () => {
                    // Listen for tab updates to reset the scroll position to the top
                    // This ensures the viewport is properly updated when switching tabs
                    this.tabUpdate.tabUpdate();
                    const viewport = this.viewport();
                    viewport.scrollToIndex(0);
                    viewport.checkViewportSize();
                },
            });
            // In some cases there a height changes, we need to recalculate the viewport size.
            this.resizeObserver = new ResizeObserver(() => {
                this.viewport().scrollToIndex(0);
                this.viewport().checkViewportSize();
            });
            this.resizeObserver.observe(this.elementRef.nativeElement);
            (0, core_1.effect)(() => {
                const result = this.updateForestResult();
                const changed = result.movedItems.length || result.newItems.length || result.removedItems.length;
                if (changed) {
                    this.reselectNodeOnUpdate();
                }
            });
        }
        ngOnDestroy() {
            this.resizeObserver.disconnect();
        }
        handleSelectDomElement(node) {
            this.selectDomElement.emit(node.original);
        }
        highlightNode(node) {
            this.highlightIdInTreeFromElement.set(null);
            this.highlightComponent.emit(node.position);
        }
        removeHighlight() {
            this.removeComponentHighlight.emit();
        }
        selectAndEnsureVisible(node) {
            this.select(node);
            const scrollParent = this.viewport().elementRef.nativeElement;
            // The top most point we see an element
            const top = scrollParent.scrollTop;
            // That's the bottom most point we currently see an element.
            const parentHeight = scrollParent.offsetHeight;
            const bottom = top + parentHeight;
            const idx = this.dataSource.expandedDataValues.findIndex((el) => el.id === node.id);
            // The node might be hidden.
            if (idx < 0) {
                return;
            }
            const itemTop = idx * this.itemHeight;
            if (itemTop < top) {
                scrollParent.scrollTo({ top: itemTop });
            }
            else if (bottom < itemTop + this.itemHeight) {
                scrollParent.scrollTo({ top: itemTop - parentHeight + this.itemHeight });
            }
        }
        select(node) {
            this.populateParents(node.position);
            this.selectNode.emit(node.original);
            this.selectedNode.set(node);
            this.currentlyMatchedIndex.set(-1);
        }
        clearSelectedNode() {
            this.selectNode.emit(null);
            this.selectedNode.set(null);
            this.parents = [];
            this.setParents.emit(null);
        }
        navigateUp(event) {
            if (this.isEditingDirectiveState(event)) {
                return;
            }
            event.preventDefault();
            const data = this.dataSource.expandedDataValues;
            const selectedNode = this.selectedNode();
            let prevIdx = data.findIndex((e) => selectedNode && e.id === selectedNode.id) - 1;
            if (prevIdx < 0) {
                return;
            }
            let prevNode = data[prevIdx];
            const currentNode = data[prevIdx + 1];
            if (prevNode.position.length <= currentNode.position.length) {
                return this.selectAndEnsureVisible(data[prevIdx]);
            }
            while (prevIdx >= 0 && (0, directive_forest_utils_1.parentCollapsed)(prevIdx, data, this.treeControl)) {
                prevIdx--;
                prevNode = data[prevIdx];
            }
            this.selectAndEnsureVisible(data[prevIdx]);
        }
        navigateDown(event) {
            if (this.isEditingDirectiveState(event)) {
                return;
            }
            event.preventDefault();
            const data = this.dataSource.expandedDataValues;
            const selectedNode = this.selectedNode();
            let idx = data.findIndex((e) => selectedNode && e.id === selectedNode.id);
            const currentNode = data[idx];
            if (!this.treeControl.isExpanded(currentNode) && currentNode.expandable) {
                for (let i = idx + 1; i < data.length; i++) {
                    const node = data[i];
                    if (!(0, directive_forest_utils_1.isChildOf)(node.position, currentNode.position)) {
                        idx = i;
                        break;
                    }
                }
            }
            else {
                idx++;
            }
            if (idx >= data.length) {
                return;
            }
            this.selectAndEnsureVisible(data[idx]);
        }
        collapseCurrent(event) {
            if (this.isEditingDirectiveState(event)) {
                return;
            }
            const selectedNode = this.selectedNode();
            if (!selectedNode) {
                return;
            }
            this.treeControl.collapse(selectedNode);
            event.preventDefault();
        }
        expandCurrent(event) {
            if (this.isEditingDirectiveState(event)) {
                return;
            }
            const selectedNode = this.selectedNode();
            if (!selectedNode) {
                return;
            }
            this.treeControl.expand(selectedNode);
            event.preventDefault();
        }
        isEditingDirectiveState(event) {
            return event.target.tagName === 'INPUT' || !this.selectedNode;
        }
        handleFilter(filterFn) {
            this.currentlyMatchedIndex.set(-1);
            this.matchedNodes.set(new Map());
            for (let i = 0; i < this.dataSource.data.length; i++) {
                const node = this.dataSource.data[i];
                const fullName = (0, directive_forest_utils_1.getFullNodeNameString)(node);
                const match = filterFn(fullName);
                if (match) {
                    this.matchedNodes.update((matched) => {
                        const map = new Map(matched);
                        map.set(i, match);
                        return map;
                    });
                }
            }
            // Select the first match, if there are any.
            if (this.matchesCount()) {
                this.navigateMatchedNode('next');
            }
        }
        navigateMatchedNode(dir) {
            const dirIdx = dir === 'next' ? 1 : -1;
            const indexesOfMatchedNodes = Array.from(this.matchedNodes());
            const newMatchedIndex = (this.currentlyMatchedIndex() + dirIdx + indexesOfMatchedNodes.length) %
                indexesOfMatchedNodes.length;
            const [nodeIdxToSelect] = indexesOfMatchedNodes[newMatchedIndex];
            const nodeToSelect = this.dataSource.data[nodeIdxToSelect];
            if (nodeIdxToSelect !== undefined) {
                this.treeControl.expand(nodeToSelect);
                this.selectAndEnsureVisible(nodeToSelect);
                // Set the `currentlyMatchedIndex` after `selectAndEnsureVisible` since it resets it.
                this.currentlyMatchedIndex.set(newMatchedIndex);
            }
            const nodeIsVisible = this.dataSource.expandedDataValues.find((node) => node === nodeToSelect);
            if (!nodeIsVisible) {
                this.expandParents();
            }
        }
        reselectNodeOnUpdate() {
            const nodeThatStillExists = this.dataSource.getFlatNodeFromIndexedNode(this.currentSelectedElement());
            if (nodeThatStillExists) {
                this.select(nodeThatStillExists);
            }
            else if (this.forestRoot) {
                this.select(this.forestRoot);
            }
            else {
                this.clearSelectedNode();
            }
        }
        updateForest(forest) {
            const result = this.dataSource.update(forest, this.showCommentNodes());
            this.forestRoot = this.dataSource.data[0];
            if (!this.initialized && forest && forest.length) {
                this.treeControl.expandAll();
                this.initialized = true;
                result.newItems.forEach((item) => (item.newItem = false));
            }
            // We want to expand them once they are rendered.
            result.newItems.forEach((item) => {
                this.treeControl.expand(item);
            });
            return result;
        }
        populateParents(position) {
            this.parents = [];
            for (let i = 1; i <= position.length; i++) {
                const current = position.slice(0, i);
                const selectedNode = this.dataSource.data.find((item) => item.position.toString() === current.toString());
                // We might not be able to find the parent if the user has hidden the comment nodes.
                if (selectedNode) {
                    this.parents.push(selectedNode);
                }
            }
            this.setParents.emit(this.parents);
        }
        subscribeToInspectorEvents() {
            this.messageBus.on('selectComponent', (id) => {
                this.selectNodeByComponentId(id);
                this.toggleInspector.emit();
                this.expandParents();
            });
            this.messageBus.on('highlightComponent', (id) => {
                this.highlightIdInTreeFromElement.set(id);
            });
            this.messageBus.on('removeComponentHighlight', () => {
                this.highlightIdInTreeFromElement.set(null);
            });
        }
        selectNodeByComponentId(id) {
            const foundNode = this.dataSource.data.find((node) => { var _a; return ((_a = node.original.component) === null || _a === void 0 ? void 0 : _a.id) === id; });
            if (foundNode) {
                this.selectAndEnsureVisible(foundNode);
            }
        }
        expandParents() {
            this.parents.forEach((parent) => this.treeControl.expand(parent));
        }
    };
    __setFunctionName(_classThis, "DirectiveForestComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _navigateUp_decorators = [(0, core_1.HostListener)('document:keydown.ArrowUp', ['$event'])];
        _navigateDown_decorators = [(0, core_1.HostListener)('document:keydown.ArrowDown', ['$event'])];
        _collapseCurrent_decorators = [(0, core_1.HostListener)('document:keydown.ArrowLeft', ['$event'])];
        _expandCurrent_decorators = [(0, core_1.HostListener)('document:keydown.ArrowRight', ['$event'])];
        __esDecorate(_classThis, null, _navigateUp_decorators, { kind: "method", name: "navigateUp", static: false, private: false, access: { has: obj => "navigateUp" in obj, get: obj => obj.navigateUp }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _navigateDown_decorators, { kind: "method", name: "navigateDown", static: false, private: false, access: { has: obj => "navigateDown" in obj, get: obj => obj.navigateDown }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _collapseCurrent_decorators, { kind: "method", name: "collapseCurrent", static: false, private: false, access: { has: obj => "collapseCurrent" in obj, get: obj => obj.collapseCurrent }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _expandCurrent_decorators, { kind: "method", name: "expandCurrent", static: false, private: false, access: { has: obj => "expandCurrent" in obj, get: obj => obj.expandCurrent }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveForestComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveForestComponent = _classThis;
})();
exports.DirectiveForestComponent = DirectiveForestComponent;
