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
exports.RouterTreeComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const input_1 = require("@angular/material/input");
const router_tree_visualizer_1 = require("./router-tree-visualizer");
const checkbox_1 = require("@angular/material/checkbox");
const tree_visualizer_host_component_1 = require("../tree-visualizer-host/tree-visualizer-host.component");
const DEFAULT_FILTER = /.^/;
let RouterTreeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-router-tree',
            templateUrl: './router-tree.component.html',
            styleUrls: ['./router-tree.component.scss'],
            imports: [common_1.CommonModule, input_1.MatInputModule, checkbox_1.MatCheckboxModule, tree_visualizer_host_component_1.TreeVisualizerHostComponent],
            standalone: true,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RouterTreeComponent = _classThis = class {
        constructor() {
            this.routerTree = core_1.viewChild.required('routerTree');
            this.filterRegex = new RegExp(DEFAULT_FILTER);
            this.showFullPath = false;
            this.routes = (0, core_1.input)([]);
            this.snapToRoot = (0, core_1.input)(false);
            (0, core_1.effect)(() => {
                this.renderGraph(this.routes());
            });
            (0, core_1.effect)(() => {
                if (this.snapToRoot()) {
                    this.routerTreeVisualizer.snapToRoot(0.6);
                }
            });
            (0, core_1.afterNextRender)({
                write: () => {
                    this.setUpRouterVisualizer();
                },
            });
        }
        togglePathSettings() {
            this.showFullPath = !this.showFullPath;
            this.renderGraph(this.routes());
        }
        setUpRouterVisualizer() {
            var _a, _b;
            const container = this.routerTree().container().nativeElement;
            const group = this.routerTree().group().nativeElement;
            (_b = (_a = this.routerTreeVisualizer) === null || _a === void 0 ? void 0 : _a.cleanup) === null || _b === void 0 ? void 0 : _b.call(_a);
            this.routerTreeVisualizer = new router_tree_visualizer_1.RouterTreeVisualizer(container, group, {
                nodeSeparation: () => 1,
            });
        }
        searchRoutes(event) {
            var _a, _b;
            this.filterRegex = new RegExp(((_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || DEFAULT_FILTER);
            this.renderGraph(this.routes());
        }
        renderGraph(routes) {
            var _a;
            (_a = this.routerTreeVisualizer) === null || _a === void 0 ? void 0 : _a.render(routes[0], this.filterRegex, this.showFullPath);
        }
    };
    __setFunctionName(_classThis, "RouterTreeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RouterTreeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RouterTreeComponent = _classThis;
})();
exports.RouterTreeComponent = RouterTreeComponent;
