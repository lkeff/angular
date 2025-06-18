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
exports.FlamegraphVisualizerComponent = void 0;
const core_1 = require("@angular/core");
const theme_service_1 = require("../../../../application-services/theme_service");
const flamegraph_formatter_1 = require("../record-formatter/flamegraph-formatter/flamegraph-formatter");
const profile_formatter_1 = require("./profile-formatter");
const ngx_flamegraph_1 = require("ngx-flamegraph");
let FlamegraphVisualizerComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-flamegraph-visualizer',
            templateUrl: './flamegraph-visualizer.component.html',
            styleUrls: ['./flamegraph-visualizer.component.scss'],
            imports: [ngx_flamegraph_1.NgxFlamegraphModule],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FlamegraphVisualizerComponent = _classThis = class {
        constructor() {
            this.themeService = (0, core_1.inject)(theme_service_1.ThemeService);
            this.profilerBars = (0, core_1.computed)(() => {
                return [
                    this._formatter.formatFrame(this.frame(), this.changeDetection(), this.themeService.currentTheme()),
                ];
            });
            this.view = [235, 200];
            this._formatter = new flamegraph_formatter_1.FlamegraphFormatter();
            this.colors = (0, core_1.computed)(() => {
                return this.themeService.currentTheme() === 'dark-theme'
                    ? {
                        hue: [210, 90],
                        saturation: [90, 90],
                        lightness: [25, 25],
                    }
                    : {
                        hue: [50, 15],
                        saturation: [100, 100],
                        lightness: [75, 75],
                    };
            });
            this.nodeSelect = (0, core_1.output)();
            this.frame = core_1.input.required();
            this.changeDetection = core_1.input.required();
        }
        selectFrame(frame) {
            if (frame.label === flamegraph_formatter_1.ROOT_LEVEL_ELEMENT_LABEL) {
                return;
            }
            const flameGraphNode = frame;
            const directiveData = this.formatEntryData(flameGraphNode);
            this.nodeSelect.emit({
                entry: flameGraphNode,
                selectedDirectives: directiveData,
            });
        }
        formatEntryData(flameGraphNode) {
            return (0, profile_formatter_1.formatDirectiveProfile)(flameGraphNode.original.directives);
        }
    };
    __setFunctionName(_classThis, "FlamegraphVisualizerComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FlamegraphVisualizerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FlamegraphVisualizerComponent = _classThis;
})();
exports.FlamegraphVisualizerComponent = FlamegraphVisualizerComponent;
