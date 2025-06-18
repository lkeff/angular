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
exports.TimelineComponent = void 0;
const core_1 = require("@angular/core");
const filter_1 = require("./filter");
const frame_merger_1 = require("./record-formatter/frame-merger");
const visualization_mode_1 = require("./visualization-mode");
const timeline_visualizer_component_1 = require("./recording-visualizer/timeline-visualizer.component");
const frame_selector_component_1 = require("./frame-selector.component");
const timeline_controls_component_1 = require("./timeline-controls.component");
const recording_modal_component_1 = require("./recording-modal.component");
const MAX_HEIGHT = 50;
let TimelineComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-recording-timeline',
            templateUrl: './timeline.component.html',
            styleUrls: ['./timeline.component.scss'],
            imports: [
                recording_modal_component_1.RecordingModalComponent,
                timeline_controls_component_1.TimelineControlsComponent,
                frame_selector_component_1.FrameSelectorComponent,
                timeline_visualizer_component_1.TimelineVisualizerComponent,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TimelineComponent = _classThis = class {
        constructor() {
            this.stream = core_1.input.required();
            this.exportProfile = (0, core_1.output)();
            this.visualizationMode = (0, core_1.signal)(visualization_mode_1.VisualizationMode.BarGraph);
            this.changeDetection = (0, core_1.signal)(false);
            this.selectFrames = (0, core_1.signal)([]);
            this.frame = (0, core_1.computed)(() => {
                const indexes = this.selectFrames();
                const data = this.graphData();
                return (0, frame_merger_1.mergeFrames)(indexes.map((index) => { var _a; return (_a = data[index]) === null || _a === void 0 ? void 0 : _a.frame; }).filter(Boolean));
            });
            this._filter = (0, core_1.signal)(filter_1.noopFilter);
            this._maxDuration = -Infinity;
            this._allRecords = [];
            this.visualizing = (0, core_1.signal)(false);
            this._graphData = (0, core_1.signal)([]);
            this.graphData = (0, core_1.computed)(() => {
                const nodes = this._graphData();
                const filter = this._filter();
                return nodes.filter((node) => filter(node));
            });
            this.currentFrameRate = (0, core_1.computed)(() => { var _a, _b; return TimelineComponent.estimateFrameRate((_b = (_a = this.frame()) === null || _a === void 0 ? void 0 : _a.duration) !== null && _b !== void 0 ? _b : 0); });
            this.hasFrames = (0, core_1.computed)(() => this._graphData().length > 0);
            (0, core_1.effect)((cleanup) => {
                const data = this.stream();
                this._allRecords = [];
                this._maxDuration = -Infinity;
                const _subscription = data.subscribe({
                    next: (frames) => {
                        this._processFrames(frames);
                    },
                    complete: () => {
                        this.visualizing.set(true);
                    },
                });
                cleanup(() => _subscription.unsubscribe());
            });
        }
        static estimateFrameRate(timeSpent) {
            const multiplier = Math.max(Math.ceil(timeSpent / 16) - 1, 0);
            return Math.floor(60 / 2 ** multiplier);
        }
        setFilter(filter) {
            this._filter.set((0, filter_1.createFilter)(filter));
        }
        getColorByFrameRate(framerate) {
            if (framerate >= 60) {
                return '#d6f0d1';
            }
            else if (framerate < 60 && framerate >= 30) {
                return '#f2dca2';
            }
            else if (framerate < 30 && framerate >= 15) {
                return '#f9cc9d';
            }
            return '#fad1d1';
        }
        _processFrames(frames) {
            let regenerate = false;
            for (const frame of frames) {
                if (frame.duration >= this._maxDuration) {
                    regenerate = true;
                }
                this._allRecords.push(frame);
            }
            if (regenerate) {
                this._graphData.set(this._generateBars());
                return;
            }
            const multiplicationFactor = parseFloat((MAX_HEIGHT / this._maxDuration).toFixed(2));
            this._graphData.update((value) => {
                frames.forEach((frame) => value.push(this._getBarStyles(frame, multiplicationFactor)));
                return [...value];
            });
        }
        _generateBars() {
            const maxValue = this._allRecords.reduce((acc, frame) => Math.max(acc, frame.duration), 0);
            const multiplicationFactor = parseFloat((MAX_HEIGHT / maxValue).toFixed(2));
            this._maxDuration = Math.max(this._maxDuration, maxValue);
            return this._allRecords.map((r) => this._getBarStyles(r, multiplicationFactor));
        }
        _getBarStyles(frame, multiplicationFactor) {
            const height = frame.duration * multiplicationFactor;
            const colorPercentage = Math.max(10, Math.round((height / MAX_HEIGHT) * 100));
            const backgroundColor = this.getColorByFrameRate(TimelineComponent.estimateFrameRate(frame.duration));
            const style = {
                'background-image': `-webkit-linear-gradient(bottom, ${backgroundColor} ${colorPercentage}%, transparent ${colorPercentage}%)`,
                cursor: 'pointer',
                'min-width': '25px',
                width: '25px',
                height: '50px',
            };
            const toolTip = `${frame.source} TimeSpent: ${frame.duration.toFixed(3)}ms`;
            return { style, toolTip, frame };
        }
    };
    __setFunctionName(_classThis, "TimelineComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TimelineComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TimelineComponent = _classThis;
})();
exports.TimelineComponent = TimelineComponent;
