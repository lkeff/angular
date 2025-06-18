"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectorTreeVisualizer = exports.GraphRenderer = void 0;
const d3 = __importStar(require("d3"));
let arrowDefId = 0;
const injectorTypeToClassMap = new Map([
    ['imported-module', 'node-imported-module'],
    ['environment', 'node-environment'],
    ['element', 'node-element'],
    ['null', 'node-null'],
]);
class GraphRenderer {
    constructor() {
        this.nodeClickListeners = [];
        this.nodeMouseoverListeners = [];
        this.nodeMouseoutListeners = [];
    }
    cleanup() {
        this.nodeClickListeners = [];
        this.nodeMouseoverListeners = [];
        this.nodeMouseoutListeners = [];
    }
    onNodeClick(cb) {
        this.nodeClickListeners.push(cb);
    }
    onNodeMouseover(cb) {
        this.nodeMouseoverListeners.push(cb);
    }
    onNodeMouseout(cb) {
        this.nodeMouseoutListeners.push(cb);
    }
}
exports.GraphRenderer = GraphRenderer;
class InjectorTreeVisualizer extends GraphRenderer {
    constructor(_containerElement, _graphElement, { orientation = 'horizontal', nodeSize = [200, 500], nodeSeparation = () => 2, nodeLabelSize = [250, 60], } = {}) {
        super();
        this._containerElement = _containerElement;
        this._graphElement = _graphElement;
        this.d3 = d3;
        this.root = null;
        this.zoomController = null;
        this.config = {
            orientation,
            nodeSize,
            nodeSeparation,
            nodeLabelSize,
        };
    }
    zoomScale(scale) {
        if (this.zoomController) {
            this.zoomController.scaleTo(this.d3.select(this._containerElement), scale);
        }
    }
    snapToRoot(scale = 1) {
        if (this.root) {
            this.snapToNode(this.root, scale);
        }
    }
    snapToNode(node, scale = 1) {
        const svg = this.d3.select(this._containerElement);
        const halfWidth = this._containerElement.clientWidth / 2;
        const halfHeight = this._containerElement.clientHeight / 2;
        const t = d3.zoomIdentity.translate(halfWidth - node.y, halfHeight - node.x).scale(scale);
        svg.transition().duration(500).call(this.zoomController.transform, t);
    }
    get graphElement() {
        return this._graphElement;
    }
    getNodeById(id) {
        const selection = this.d3
            .select(this._containerElement)
            .select(`.node[data-id="${id}"]`);
        if (selection.empty()) {
            return null;
        }
        return selection.datum();
    }
    cleanup() {
        super.cleanup();
        this.d3.select(this._graphElement).selectAll('*').remove();
    }
    render(injectorGraph) {
        // cleanup old graph
        this.cleanup();
        const data = this.d3.hierarchy(injectorGraph, (node) => node.children);
        const tree = this.d3.tree();
        const svg = this.d3.select(this._containerElement);
        const g = this.d3.select(this._graphElement);
        this.zoomController = this.d3.zoom().scaleExtent([0.1, 2]);
        this.zoomController.on('start zoom end', (e) => {
            g.attr('transform', e.transform);
        });
        svg.call(this.zoomController);
        // Compute the new tree layout.
        tree.nodeSize(this.config.nodeSize);
        tree.separation((a, b) => {
            return this.config.nodeSeparation(a, b);
        });
        const nodes = tree(data);
        this.root = nodes;
        arrowDefId++;
        svg
            .append('svg:defs')
            .selectAll('marker')
            .data([`end${arrowDefId}`]) // Different link/path types can be defined here
            .enter()
            .append('svg:marker') // This section adds in the arrows
            .attr('id', String)
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 15)
            .attr('refY', 0)
            .attr('class', 'arrow')
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5');
        g.selectAll('.link')
            .data(nodes.descendants().slice(1))
            .enter()
            .append('path')
            .attr('class', (node) => {
            var _a, _b, _c;
            const parentId = (_c = (_b = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.injector) === null || _c === void 0 ? void 0 : _c.id;
            if (parentId === 'N/A') {
                return 'link-hidden';
            }
            return `link`;
        })
            .attr('data-id', (node) => {
            var _a, _b, _c;
            const from = node.data.injector.id;
            const to = (_c = (_b = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.injector) === null || _c === void 0 ? void 0 : _c.id;
            if (from && to) {
                return `${from}-to-${to}`;
            }
            return '';
        })
            .attr('marker-end', `url(#end${arrowDefId})`)
            .attr('d', (node) => {
            const parent = node.parent;
            if (this.config.orientation === 'horizontal') {
                return `
                    M${node.y},${node.x}
                    C${(node.y + parent.y) / 2},
                      ${node.x} ${(node.y + parent.y) / 2},
                      ${parent.x} ${parent.y},
                      ${parent.x}`;
            }
            return `
              M${node.x},${node.y}
              C${(node.x + parent.x) / 2},
                ${node.y} ${(node.x + parent.x) / 2},
                ${parent.y} ${parent.x},
                ${parent.y}`;
        });
        // Declare the nodes
        const node = g
            .selectAll('g.node')
            .data(nodes.descendants())
            .enter()
            .append('g')
            .attr('class', (node) => {
            if (node.data.injector.id === 'N/A') {
                return 'node-hidden';
            }
            return `node`;
        })
            .attr('data-component-id', (node) => {
            var _a, _b, _c;
            const injector = node.data.injector;
            if (injector.type === 'element') {
                return (_c = (_b = (_a = injector.node) === null || _a === void 0 ? void 0 : _a.component) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : -1;
            }
            return -1;
        })
            .attr('data-id', (node) => {
            return node.data.injector.id;
        })
            .on('click', (pointerEvent, node) => {
            this.nodeClickListeners.forEach((listener) => listener(pointerEvent, node));
        })
            .on('mouseover', (pointerEvent, node) => {
            this.nodeMouseoverListeners.forEach((listener) => listener(pointerEvent, node));
        })
            .on('mouseout', (pointerEvent, node) => {
            this.nodeMouseoutListeners.forEach((listener) => listener(pointerEvent, node));
        })
            .attr('transform', (node) => {
            if (this.config.orientation === 'horizontal') {
                return `translate(${node.y},${node.x})`;
            }
            return `translate(${node.x},${node.y})`;
        });
        const [width, height] = this.config.nodeLabelSize;
        node
            .append('foreignObject')
            .attr('width', width)
            .attr('height', height)
            .attr('x', -1 * (width - 10))
            .attr('y', -1 * (height / 2))
            .append('xhtml:div')
            .attr('title', (node) => {
            return node.data.injector.name;
        })
            .attr('class', (node) => {
            var _a, _b, _c;
            return [(_c = injectorTypeToClassMap.get((_b = (_a = node.data) === null || _a === void 0 ? void 0 : _a.injector) === null || _b === void 0 ? void 0 : _b.type)) !== null && _c !== void 0 ? _c : '', 'node-container'].join(' ');
        })
            .html((node) => {
            const label = node.data.injector.name;
            const lengthLimit = 25;
            return label.length > lengthLimit
                ? label.slice(0, lengthLimit - '...'.length) + '...'
                : label;
        });
        svg.attr('height', '100%').attr('width', '100%');
    }
}
exports.InjectorTreeVisualizer = InjectorTreeVisualizer;
