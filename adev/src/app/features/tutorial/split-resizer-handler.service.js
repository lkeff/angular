"use strict";
/*!
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
exports.SplitResizerHandler = void 0;
const a11y_1 = require("@angular/cdk/a11y");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const MIN_WIDTH_OF_CONTENT_IN_PX = 300;
const MAX_WIDTH_OF_CONTENT_IN_PX = 800;
let SplitResizerHandler = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SplitResizerHandler = _classThis = class {
        constructor() {
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.document = (0, core_1.inject)(common_1.DOCUMENT);
            this.focusMonitor = (0, core_1.inject)(a11y_1.FocusMonitor);
            this.resizeData = (0, core_1.signal)({
                initialContentContainerWidthInPercentage: 0,
                initialDividerPosition: 0,
                initialEditorContainerWidthInPercentage: 0,
                isProgress: false,
            });
        }
        init(container, content, resizer, editor) {
            this.container = container;
            this.content = content;
            this.resizer = resizer;
            this.editor = editor;
            this.listenToResizeStart();
            this.listenToResize();
            this.listenToResizeEnd();
            this.resizeContainersUsingKeyArrows();
        }
        listenToResizeStart() {
            (0, rxjs_1.fromEvent)(this.resizer.nativeElement, 'mousedown')
                .pipe((0, operators_1.map)((event) => ({ editor: this.editor, event })), (0, operators_1.filter)((eventAndEditor) => { var _a; return !!((_a = eventAndEditor.editor) === null || _a === void 0 ? void 0 : _a.nativeElement); }), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe(({ event }) => {
                const contentWidthInPercentage = this.getCurrentContainerWidth(this.content.nativeElement);
                const editorWidthInPercentage = this.getCurrentContainerWidth(this.editor.nativeElement);
                this.content.nativeElement.style.minWidth = `${MIN_WIDTH_OF_CONTENT_IN_PX}px`;
                this.resizeData.update((data) => {
                    data.initialDividerPosition = event.pageX;
                    data.isProgress = true;
                    data.initialContentContainerWidthInPercentage = contentWidthInPercentage;
                    data.initialEditorContainerWidthInPercentage = editorWidthInPercentage;
                    return Object.assign({}, data);
                });
            });
        }
        listenToResize() {
            (0, rxjs_1.fromEvent)(this.document, 'mousemove')
                .pipe((0, operators_1.map)((event) => ({ editor: this.editor, event })), (0, operators_1.filter)((eventAndEditor) => { var _a; return !!((_a = eventAndEditor.editor) === null || _a === void 0 ? void 0 : _a.nativeElement); }), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe(({ event }) => {
                if (this.resizeData().isProgress) {
                    const newDividerPosition = event.pageX;
                    const containerWidth = this.getParentContainerWidth();
                    const shift = ((newDividerPosition - this.resizeData().initialDividerPosition) / containerWidth) *
                        100;
                    const newContentWidthInPercentage = this.resizeData().initialContentContainerWidthInPercentage + shift;
                    const newEditorWidthInPercentage = this.resizeData().initialEditorContainerWidthInPercentage - shift;
                    this.setWidthOfTheContainers(newContentWidthInPercentage, newEditorWidthInPercentage);
                }
            });
        }
        listenToResizeEnd() {
            (0, rxjs_1.fromEvent)(this.document, 'mouseup')
                .pipe((0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe(() => {
                if (this.resizeData().isProgress) {
                    this.content.nativeElement.style.minWidth = `${MIN_WIDTH_OF_CONTENT_IN_PX}px`;
                    this.resizeData.update((data) => {
                        data.isProgress = false;
                        data.initialDividerPosition = 0;
                        data.initialContentContainerWidthInPercentage = 0;
                        data.initialEditorContainerWidthInPercentage = 0;
                        return Object.assign({}, data);
                    });
                }
            });
        }
        // When resizer bar is focused, resize containers when user presses key arrows.
        resizeContainersUsingKeyArrows() {
            (0, rxjs_1.combineLatest)([
                this.focusMonitor.monitor(this.resizer),
                (0, rxjs_1.fromEvent)(this.document, 'keydown'),
            ])
                .pipe((0, operators_1.filter)(([origin, keyEvent]) => !!origin && (keyEvent.key === 'ArrowLeft' || keyEvent.key === 'ArrowRight')), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef), (0, operators_1.finalize)(() => this.focusMonitor.stopMonitoring(this.resizer)))
                .subscribe(([_, keyEvent]) => {
                const shift = keyEvent.key === 'ArrowLeft' ? -1 : 1;
                const contentWidth = this.getCurrentContainerWidth(this.content.nativeElement);
                const editorWidth = this.getCurrentContainerWidth(this.editor.nativeElement);
                this.setWidthOfTheContainers(contentWidth + shift, editorWidth - shift);
            });
        }
        setWidthOfTheContainers(newContentWidthInPercentage, newEditorWidthInPercentage) {
            const containerWidth = this.container.nativeElement.offsetWidth;
            const newContentWidthInPx = (containerWidth * newContentWidthInPercentage) / 100;
            if (newContentWidthInPx > MIN_WIDTH_OF_CONTENT_IN_PX &&
                newContentWidthInPx < MAX_WIDTH_OF_CONTENT_IN_PX &&
                this.editor) {
                this.content.nativeElement.style.width = `${newContentWidthInPercentage}%`;
                this.editor.nativeElement.style.width = `${newEditorWidthInPercentage}%`;
            }
        }
        getCurrentContainerWidth(element) {
            const savedWidth = Number(element.style.width.replace('%', ''));
            return savedWidth > 0
                ? savedWidth
                : (element.offsetWidth / this.getParentContainerWidth()) * 100;
        }
        getParentContainerWidth() {
            return (this.resizer.nativeElement.offsetWidth +
                this.content.nativeElement.offsetWidth +
                this.editor.nativeElement.offsetWidth);
        }
    };
    __setFunctionName(_classThis, "SplitResizerHandler");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SplitResizerHandler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SplitResizerHandler = _classThis;
})();
exports.SplitResizerHandler = SplitResizerHandler;
