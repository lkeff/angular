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
exports.RouterTreeVisualizer = void 0;
const d3 = __importStar(require("d3"));
let arrowDefId = 0;
class RouterTreeVisualizer {
    constructor(_containerElement, _graphElement, { orientation = 'horizontal', nodeSize = [200, 500], nodeSeparation = () => 2.5, nodeLabelSize = [300, 60], } = {}) {
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
        const halfHeight = this._containerElement.clientHeight / 2;
        const t = d3.zoomIdentity.translate(250, halfHeight - node.x).scale(scale);
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
        this.d3.select(this._graphElement).selectAll('*').remove();
    }
    render(route, filterRegex, showFullPath) {
        // cleanup old graph
        this.cleanup();
        const data = this.d3.hierarchy(route, (node) => node.children);
        const tree = this.d3.tree();
        const svg = this.d3.select(this._containerElement);
        const g = this.d3.select(this._graphElement);
        const size = 20;
        svg.selectAll('text').remove();
        svg.selectAll('rect').remove();
        svg.selectAll('defs').remove();
        svg
            .append('rect')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', size)
            .attr('height', size)
            .style('stroke', 'var(--red-05)')
            .style('fill', 'var(--red-06)');
        svg
            .append('rect')
            .attr('x', 10)
            .attr('y', 45)
            .attr('width', size)
            .attr('height', size)
            .style('stroke', 'var(--blue-02)')
            .style('fill', 'var(--blue-03)');
        svg
            .append('rect')
            .attr('x', 10)
            .attr('y', 80)
            .attr('width', size)
            .attr('height', size)
            .style('stroke', 'var(--green-02)')
            .style('fill', 'var(--green-03)');
        svg
            .append('text')
            .attr('x', 37)
            .attr('y', 21)
            .attr('class', 'legend-router-tree')
            .text('Eager loaded routes')
            .attr('alignment-baseline', 'middle');
        svg
            .append('text')
            .attr('x', 37)
            .attr('y', 56)
            .attr('class', 'legend-router-tree')
            .text('Lazy Loaded Route')
            .attr('alignment-baseline', 'middle');
        svg
            .append('text')
            .attr('x', 37)
            .attr('y', 92)
            .attr('class', 'legend-router-tree')
            .text('Active Route')
            .attr('alignment-baseline', 'middle');
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
            return `link`;
        })
            .attr('d', (node) => {
            const parent = node.parent;
            if (this.config.orientation === 'horizontal') {
                return `M${node.y},${node.x},C${(node.y + parent.y) / 2}, ${node.x} ${(node.y + parent.y) / 2},${parent.x} ${parent.y},${parent.x}`;
            }
            return `M${node.x},${node.y},C${(node.x + parent.x) / 2}, ${node.y} ${(node.x + parent.x) / 2},${parent.y} ${parent.x},${parent.y}`;
        });
        // Declare the nodes
        const node = g
            .selectAll('g.node')
            .data(nodes.descendants())
            .enter()
            .append('g')
            .attr('class', (node) => {
            return `node`;
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
            return node.data.path || '';
        })
            .attr('class', (node) => {
            var _a;
            const label = (showFullPath
                ? node.data.path
                : node.data.path.replace(((_a = node.parent) === null || _a === void 0 ? void 0 : _a.data.path) || '', '')) || '';
            const isMatched = filterRegex.test(label.toLowerCase());
            const nodeClasses = ['node-container'];
            if (node.data.isActive) {
                nodeClasses.push('node-element');
            }
            else if (node.data.isLazy) {
                nodeClasses.push('node-lazy');
            }
            else {
                nodeClasses.push('node-environment');
            }
            if (isMatched) {
                nodeClasses.push('node-search');
            }
            return nodeClasses.join(' ');
        })
            .text((node) => {
            var _a;
            const label = (showFullPath
                ? node.data.path
                : node.data.path.replace(((_a = node.parent) === null || _a === void 0 ? void 0 : _a.data.path) || '', '')) || '';
            const lengthLimit = 25;
            const labelText = label.length > lengthLimit ? label.slice(0, lengthLimit - '...'.length) + '...' : label;
            return labelText;
        });
        svg.attr('height', '100%').attr('width', '100%');
    }
}
exports.RouterTreeVisualizer = RouterTreeVisualizer;
