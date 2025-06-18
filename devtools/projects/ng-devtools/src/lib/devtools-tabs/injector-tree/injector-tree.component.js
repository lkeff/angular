"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectorTreeComponent = void 0;
const core_1 = require("@angular/core");
const checkbox_1 = require("@angular/material/checkbox");
const icon_1 = require("@angular/material/icon");
const tooltip_1 = require("@angular/material/tooltip");
const protocol_1 = require("protocol");
const public_api_1 = require("../../vendor/angular-split/public_api");
const injector_tree_visualizer_1 = require("../dependency-injection/injector-tree-visualizer");
const tree_visualizer_host_component_1 = require("../tree-visualizer-host/tree-visualizer-host.component");
const injector_providers_component_1 = require("./injector-providers/injector-providers.component");
const injector_tree_fns_1 = require("./injector-tree-fns");
let InjectorTreeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-injector-tree',
            imports: [
                public_api_1.SplitComponent,
                public_api_1.SplitAreaDirective,
                injector_providers_component_1.InjectorProvidersComponent,
                tree_visualizer_host_component_1.TreeVisualizerHostComponent,
                icon_1.MatIcon,
                tooltip_1.MatTooltip,
                checkbox_1.MatCheckbox,
            ],
            templateUrl: `./injector-tree.component.html`,
            styleUrls: ['./injector-tree.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InjectorTreeComponent = _classThis = class {
        constructor() {
            this.environmentTree = core_1.viewChild.required('environmentTree');
            this.elementTree = core_1.viewChild.required('elementTree');
            this._messageBus = (0, core_1.inject)(protocol_1.MessageBus);
            this.zone = (0, core_1.inject)(core_1.NgZone);
            this.firstRender = true;
            this.selectedNode = (0, core_1.signal)(null);
            this.rawDirectiveForest = [];
            this.diDebugAPIsAvailable = (0, core_1.signal)(false);
            this.providers = (0, core_1.signal)([]);
            this.elementToEnvironmentPath = new Map();
            this.hideInjectorsWithNoProviders = false;
            this.hideFrameworkInjectors = false;
            (0, core_1.afterNextRender)({
                write: () => {
                    this.init();
                    this.setUpEnvironmentInjectorVisualizer();
                    this.setUpElementInjectorVisualizer();
                },
            });
        }
        init() {
            this._messageBus.on('latestComponentExplorerView', (view) => {
                if (view.forest.length === 0)
                    return;
                if (!view.forest[0].resolutionPath)
                    return;
                this.diDebugAPIsAvailable.set(true);
                this.rawDirectiveForest = view.forest;
                this.updateInjectorTreeVisualization(view.forest);
            });
            this._messageBus.on('latestInjectorProviders', (_, providers) => {
                this.providers.set(Array.from(providers).sort((a, b) => {
                    return a.token.localeCompare(b.token);
                }));
            });
            this._messageBus.on('highlightComponent', (id) => {
                const injectorNode = this.getNodeByComponentId(this.elementInjectorTreeGraph, id);
                if (injectorNode === null) {
                    return;
                }
                this.selectInjectorByNode(injectorNode);
            });
        }
        toggleHideInjectorsWithNoProviders() {
            this.hideInjectorsWithNoProviders = !this.hideInjectorsWithNoProviders;
            this.refreshVisualizer();
        }
        toggleHideAngularInjectors() {
            this.hideFrameworkInjectors = !this.hideFrameworkInjectors;
            this.refreshVisualizer();
        }
        refreshVisualizer() {
            var _a, _b, _c;
            this.updateInjectorTreeVisualization(this.rawDirectiveForest);
            if (((_c = (_b = (_a = this.selectedNode()) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.injector) === null || _c === void 0 ? void 0 : _c.type) === 'environment') {
                this.snapToRoot(this.elementInjectorTreeGraph);
            }
            if (this.selectedNode()) {
                this.selectInjectorByNode(this.selectedNode());
            }
        }
        /**
         *
         * Converts the array of resolution paths for every node in the
         * directive forest into a tree structure that can be rendered by the
         * injector tree visualizer.
         *
         */
        updateInjectorTreeVisualization(forestWithInjectorPaths) {
            this.zone.runOutsideAngular(() => {
                // At this point we have a forest of directive trees where each node has a resolution path.
                // We want to convert this nested forest into an array of resolution paths.
                // Our ultimate goal is to convert this array of resolution paths into a tree structure.
                // Directive forest -> Array of resolution paths -> Tree of resolution paths
                // First, pick out the resolution paths.
                let injectorPaths = (0, injector_tree_fns_1.grabInjectorPathsFromDirectiveForest)(forestWithInjectorPaths);
                if (this.hideFrameworkInjectors) {
                    injectorPaths = (0, injector_tree_fns_1.filterOutAngularInjectors)(injectorPaths);
                }
                if (this.hideInjectorsWithNoProviders) {
                    injectorPaths = (0, injector_tree_fns_1.filterOutInjectorsWithNoProviders)(injectorPaths);
                }
                // In Angular we have two types of injectors, element injectors and environment injectors.
                // We want to split the resolution paths into two groups, one for each type of injector.
                const { elementPaths, environmentPaths, startingElementToEnvironmentPath } = (0, injector_tree_fns_1.splitInjectorPathsIntoElementAndEnvironmentPaths)(injectorPaths);
                this.elementToEnvironmentPath = startingElementToEnvironmentPath;
                // Here for our 2 groups of resolution paths, we want to convert them into a tree structure.
                const elementInjectorTree = (0, injector_tree_fns_1.transformInjectorResolutionPathsIntoTree)(elementPaths);
                const environmentInjectorTree = (0, injector_tree_fns_1.transformInjectorResolutionPathsIntoTree)(environmentPaths);
                this.elementInjectorTreeGraph.render(elementInjectorTree);
                this.elementInjectorTreeGraph.onNodeClick((_, node) => {
                    this.selectInjectorByNode(node);
                });
                this.injectorTreeGraph.render(environmentInjectorTree);
                this.injectorTreeGraph.onNodeClick((_, node) => {
                    this.selectInjectorByNode(node);
                });
                if (this.firstRender) {
                    this.snapToRoot(this.injectorTreeGraph);
                    this.snapToRoot(this.elementInjectorTreeGraph);
                }
                this.highlightPathFromSelectedInjector();
                this.firstRender = false;
            });
        }
        snapToRoot(graph) {
            // wait for CD to run before snapping to root so that svg container can change size.
            setTimeout(() => {
                var _a;
                if ((_a = graph.root) === null || _a === void 0 ? void 0 : _a.children) {
                    graph.snapToNode(graph.root.children[0], 0.7);
                }
            });
        }
        snapToNode(node) {
            // wait for CD to run before snapping to root so that svg container can change size.
            setTimeout(() => {
                if (node.data.injector.type === 'element') {
                    this.elementInjectorTreeGraph.snapToNode(node);
                }
                else if (node.data.injector.type === 'environment') {
                    this.injectorTreeGraph.snapToNode(node);
                }
            });
        }
        checkIfSelectedNodeStillExists() {
            const selectedNode = this.selectedNode();
            if (selectedNode === null) {
                this.snapToRoot(this.injectorTreeGraph);
                this.snapToRoot(this.elementInjectorTreeGraph);
                return;
            }
            const injector = selectedNode.data.injector;
            if (injector.type === 'element') {
                const node = this.elementInjectorTreeGraph.getNodeById(injector.id);
                if (node) {
                    this.selectedNode.set(node);
                    return;
                }
            }
            if (injector.type === 'environment') {
                const node = this.injectorTreeGraph.getNodeById(injector.id);
                if (node) {
                    this.selectedNode.set(node);
                    return;
                }
            }
            this.selectedNode.set(null);
            this.snapToRoot(this.injectorTreeGraph);
            this.snapToRoot(this.elementInjectorTreeGraph);
        }
        getNodeByComponentId(graph, id) {
            const graphElement = graph.graphElement;
            const element = graphElement.querySelector(`.node[data-component-id="${id}"]`);
            if (element === null) {
                return null;
            }
            const injectorId = element.getAttribute('data-id');
            if (injectorId === null) {
                return null;
            }
            return graph.getNodeById(injectorId);
        }
        setUpEnvironmentInjectorVisualizer() {
            var _a, _b;
            const svg = this.environmentTree().container().nativeElement;
            const g = this.environmentTree().group().nativeElement;
            (_b = (_a = this.injectorTreeGraph) === null || _a === void 0 ? void 0 : _a.cleanup) === null || _b === void 0 ? void 0 : _b.call(_a);
            this.injectorTreeGraph = new injector_tree_visualizer_1.InjectorTreeVisualizer(svg, g);
        }
        setUpElementInjectorVisualizer() {
            var _a, _b;
            const svg = this.elementTree().container().nativeElement;
            const g = this.elementTree().group().nativeElement;
            (_b = (_a = this.elementInjectorTreeGraph) === null || _a === void 0 ? void 0 : _a.cleanup) === null || _b === void 0 ? void 0 : _b.call(_a);
            this.elementInjectorTreeGraph = new injector_tree_visualizer_1.InjectorTreeVisualizer(svg, g, { nodeSeparation: () => 1 });
        }
        highlightPathFromSelectedInjector() {
            var _a;
            const envGroup = this.environmentTree().group();
            const elementGroup = this.elementTree().group();
            this.unhighlightAllEdges(elementGroup);
            this.unhighlightAllNodes(elementGroup);
            this.unhighlightAllEdges(envGroup);
            this.unhighlightAllNodes(envGroup);
            this.checkIfSelectedNodeStillExists();
            if (this.selectedNode() === null) {
                return;
            }
            if (this.selectedNode().data.injector.type === 'element') {
                const idsToRoot = (0, injector_tree_fns_1.getInjectorIdsToRootFromNode)(this.selectedNode());
                idsToRoot.forEach((id) => this.highlightNodeById(elementGroup, id));
                const edgeIds = (0, injector_tree_fns_1.generateEdgeIdsFromNodeIds)(idsToRoot);
                edgeIds.forEach((edgeId) => this.highlightEdgeById(elementGroup, edgeId));
                const environmentPath = (_a = this.elementToEnvironmentPath.get(this.selectedNode().data.injector.id)) !== null && _a !== void 0 ? _a : [];
                environmentPath.forEach((injector) => this.highlightNodeById(envGroup, injector.id));
                const environmentEdgeIds = (0, injector_tree_fns_1.generateEdgeIdsFromNodeIds)(environmentPath.map((injector) => injector.id));
                environmentEdgeIds.forEach((edgeId) => this.highlightEdgeById(envGroup, edgeId));
            }
            else {
                const idsToRoot = (0, injector_tree_fns_1.getInjectorIdsToRootFromNode)(this.selectedNode());
                idsToRoot.forEach((id) => this.highlightNodeById(envGroup, id));
                const edgeIds = (0, injector_tree_fns_1.generateEdgeIdsFromNodeIds)(idsToRoot);
                edgeIds.forEach((edgeId) => this.highlightEdgeById(envGroup, edgeId));
            }
        }
        highlightNodeById(graphElement, id) {
            const node = graphElement.nativeElement.querySelector(`.node[data-id="${id}"]`);
            if (!node) {
                return;
            }
            if (this.selectedNode().data.injector.id === id) {
                node.classList.add('selected');
            }
            node.classList.add('highlighted');
        }
        highlightEdgeById(graphElement, id) {
            const edge = graphElement.nativeElement.querySelector(`.link[data-id="${id}"]`);
            if (!edge) {
                return;
            }
            edge.classList.add('highlighted');
        }
        unhighlightAllEdges(graphElement) {
            const edges = graphElement.nativeElement.querySelectorAll('.link');
            for (const edge of edges) {
                edge.classList.remove('highlighted');
            }
        }
        unhighlightAllNodes(graphElement) {
            const nodes = graphElement.nativeElement.querySelectorAll('.node');
            for (const node of nodes) {
                node.classList.remove('selected');
                node.classList.remove('highlighted');
            }
        }
        selectInjectorByNode(node) {
            this.selectedNode.set(node);
            this.highlightPathFromSelectedInjector();
            this.snapToNode(this.selectedNode());
            this.getProviders();
        }
        getProviders() {
            if (this.selectedNode() === null) {
                return;
            }
            const injector = this.selectedNode().data.injector;
            this._messageBus.emit('getInjectorProviders', [
                {
                    id: injector.id,
                    type: injector.type,
                    name: injector.name,
                },
            ]);
        }
    };
    __setFunctionName(_classThis, "InjectorTreeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InjectorTreeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InjectorTreeComponent = _classThis;
})();
exports.InjectorTreeComponent = InjectorTreeComponent;
