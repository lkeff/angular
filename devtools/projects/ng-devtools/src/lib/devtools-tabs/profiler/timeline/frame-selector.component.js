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
exports.FrameSelectorComponent = void 0;
const scrolling_1 = require("@angular/cdk/scrolling");
const core_1 = require("@angular/core");
const index_1 = require("../../tab-update/index");
const icon_1 = require("@angular/material/icon");
const tooltip_1 = require("@angular/material/tooltip");
const card_1 = require("@angular/material/card");
const common_1 = require("@angular/common");
const ITEM_WIDTH = 30;
let FrameSelectorComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-frame-selector',
            templateUrl: './frame-selector.component.html',
            styleUrls: ['./frame-selector.component.scss'],
            imports: [
                card_1.MatCard,
                tooltip_1.MatTooltip,
                icon_1.MatIcon,
                scrolling_1.CdkVirtualScrollViewport,
                scrolling_1.CdkFixedSizeVirtualScroll,
                scrolling_1.CdkVirtualForOf,
                common_1.NgStyle,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FrameSelectorComponent = _classThis = class {
        constructor() {
            this.barContainer = core_1.viewChild.required('barContainer');
            this.graphData = (0, core_1.input)([]);
            this.selectFrames = (0, core_1.output)();
            this.viewport = core_1.viewChild.required(scrolling_1.CdkVirtualScrollViewport);
            this.startFrameIndex = (0, core_1.signal)(-1);
            this.endFrameIndex = (0, core_1.signal)(-1);
            this.selectedFrameIndexes = (0, core_1.signal)(new Set());
            this.frameCount = (0, core_1.computed)(() => this.graphData().length);
            this.disableNextFrameButton = (0, core_1.computed)(() => this.endFrameIndex() >= this.frameCount() - 1 || this.selectedFrameIndexes().size > 1);
            this.disablePreviousFrameButton = (0, core_1.computed)(() => this.startFrameIndex() <= 0 || this.selectedFrameIndexes().size > 1);
            this.selectionLabel = (0, core_1.computed)(() => {
                if (this.startFrameIndex() === this.endFrameIndex()) {
                    return `${this.startFrameIndex() + 1}`;
                }
                return this._smartJoinIndexLabels([...this.selectedFrameIndexes()]);
            });
            this._viewportScrollState = { scrollLeft: 0, xCoordinate: 0, isDragScrolling: false };
            this.itemWidth = ITEM_WIDTH;
            this._tabUpdate = (0, core_1.inject)(index_1.TabUpdate);
            (0, core_1.afterRenderEffect)(() => {
                // Listen for tab updates to reset the scroll position to the top
                // This ensures the viewport is properly updated when switching tabs
                this._tabUpdate.tabUpdate();
                const viewport = this.viewport();
                viewport.scrollToIndex(0);
                viewport.checkViewportSize();
            });
            (0, core_1.afterRenderEffect)(() => {
                const items = this.graphData();
                this.viewport().scrollToIndex(items.length);
            });
        }
        _smartJoinIndexLabels(indexArray) {
            const sortedIndexes = indexArray.sort((a, b) => a - b);
            const groups = [];
            let prev = null;
            for (const index of sortedIndexes) {
                // First iteration: create initial group and set prev variable to the first index
                if (prev === null) {
                    groups.push([index]);
                    prev = index;
                    continue;
                }
                // If current index is consecutive with the previous, group them, otherwise start a new group
                if (prev + 1 === index) {
                    groups[groups.length - 1].push(index);
                }
                else {
                    groups.push([index]);
                }
                prev = index;
            }
            return groups
                .filter((group) => group.length > 0)
                .map((group) => group.length === 1 ? group[0] + 1 : `${group[0] + 1}-${group[group.length - 1] + 1}`)
                .join(', ');
        }
        move(value) {
            const newVal = this.startFrameIndex() + value;
            this.selectedFrameIndexes.set(new Set([newVal]));
            if (newVal > -1 && newVal < this.frameCount()) {
                this._selectFrames({ indexes: this.selectedFrameIndexes() });
            }
        }
        _selectFrames({ indexes }) {
            const sortedIndexes = [...indexes].sort((a, b) => a - b);
            this.startFrameIndex.set(sortedIndexes[0]);
            this.endFrameIndex.set(sortedIndexes[sortedIndexes.length - 1]);
            this._ensureVisible(this.startFrameIndex());
            this.selectFrames.emit({ indexes: sortedIndexes });
        }
        handleFrameSelection(idx, event) {
            const { shiftKey, ctrlKey, metaKey } = event;
            let frames = this.selectedFrameIndexes();
            if (shiftKey) {
                const [start, end] = [
                    Math.min(this.startFrameIndex(), idx),
                    Math.max(this.endFrameIndex(), idx),
                ];
                frames = new Set(Array.from(Array(end - start + 1), (_, index) => index + start));
            }
            else if (ctrlKey || metaKey) {
                if (frames.has(idx)) {
                    if (frames.size === 1) {
                        return; // prevent deselection when only one frame is selected
                    }
                    frames.delete(idx);
                }
                else {
                    frames.add(idx);
                }
            }
            else {
                frames = new Set([idx]);
            }
            this.selectedFrameIndexes.set(new Set(frames));
            this._selectFrames({ indexes: this.selectedFrameIndexes() });
        }
        _ensureVisible(index) {
            if (!this.viewport()) {
                return;
            }
            const scrollParent = this.viewport().elementRef.nativeElement;
            // The left most point we see an element
            const left = scrollParent.scrollLeft;
            // That's the right most point we currently see an element.
            const right = left + scrollParent.offsetWidth;
            const itemLeft = index * this.itemWidth;
            if (itemLeft < left) {
                scrollParent.scrollTo({ left: itemLeft });
            }
            else if (right < itemLeft + this.itemWidth) {
                scrollParent.scrollTo({ left: itemLeft - scrollParent.offsetWidth + this.itemWidth });
            }
        }
        stopDragScrolling() {
            this._viewportScrollState.isDragScrolling = false;
        }
        startDragScroll(event) {
            this._viewportScrollState = {
                xCoordinate: event.clientX,
                scrollLeft: this.viewport().elementRef.nativeElement.scrollLeft,
                isDragScrolling: true,
            };
        }
        dragScroll(event) {
            if (!this._viewportScrollState.isDragScrolling) {
                return;
            }
            const dragScrollSpeed = 2;
            const dx = event.clientX - this._viewportScrollState.xCoordinate;
            this.viewport().elementRef.nativeElement.scrollLeft =
                this._viewportScrollState.scrollLeft - dx * dragScrollSpeed;
        }
    };
    __setFunctionName(_classThis, "FrameSelectorComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FrameSelectorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FrameSelectorComponent = _classThis;
})();
exports.FrameSelectorComponent = FrameSelectorComponent;
