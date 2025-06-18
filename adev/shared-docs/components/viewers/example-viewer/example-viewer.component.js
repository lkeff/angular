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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleViewer = exports.HIDDEN_CLASS_NAME = exports.GAP_CODE_LINE_CLASS_NAME = exports.CODE_LINE_CLASS_NAME = exports.CODE_LINE_NUMBER_CLASS_NAME = exports.CodeExampleViewMode = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const tabs_1 = require("@angular/material/tabs");
const clipboard_1 = require("@angular/cdk/clipboard");
const copy_source_code_button_component_1 = require("../../copy-source-code-button/copy-source-code-button.component");
const index_1 = require("../../../providers/index");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const docs_viewer_component_1 = require("../docs-viewer/docs-viewer.component");
var CodeExampleViewMode;
(function (CodeExampleViewMode) {
    CodeExampleViewMode["SNIPPET"] = "snippet";
    CodeExampleViewMode["MULTI_FILE"] = "multi";
})(CodeExampleViewMode || (exports.CodeExampleViewMode = CodeExampleViewMode = {}));
exports.CODE_LINE_NUMBER_CLASS_NAME = 'shiki-ln-number';
exports.CODE_LINE_CLASS_NAME = 'line';
exports.GAP_CODE_LINE_CLASS_NAME = 'gap';
exports.HIDDEN_CLASS_NAME = 'hidden';
let ExampleViewer = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'docs-example-viewer',
            imports: [common_1.CommonModule, (0, core_1.forwardRef)(() => docs_viewer_component_1.DocViewer), copy_source_code_button_component_1.CopySourceCodeButton, tabs_1.MatTabsModule],
            templateUrl: './example-viewer.component.html',
            styleUrls: ['./example-viewer.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _githubUrl_decorators;
    let _githubUrl_initializers = [];
    let _githubUrl_extraInitializers = [];
    let _stackblitzUrl_decorators;
    let _stackblitzUrl_initializers = [];
    let _stackblitzUrl_extraInitializers = [];
    var ExampleViewer = _classThis = class {
        constructor() {
            this.exampleMetadata = (0, core_1.input)(null, { alias: 'metadata' });
            this.githubUrl = __runInitializers(this, _githubUrl_initializers, null);
            this.stackblitzUrl = (__runInitializers(this, _githubUrl_extraInitializers), __runInitializers(this, _stackblitzUrl_initializers, null));
            this.matTabGroup = (__runInitializers(this, _stackblitzUrl_extraInitializers), (0, core_1.viewChild)('codeTabs'));
            this.changeDetector = (0, core_1.inject)(core_1.ChangeDetectorRef);
            this.clipboard = (0, core_1.inject)(clipboard_1.Clipboard);
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.document = (0, core_1.inject)(common_1.DOCUMENT);
            this.injector = (0, core_1.inject)(core_1.Injector);
            this.elementRef = (0, core_1.inject)((core_1.ElementRef));
            this.exampleViewerContentLoader = (0, core_1.inject)(index_1.EXAMPLE_VIEWER_CONTENT_LOADER);
            this.shouldDisplayFullName = (0, core_1.computed)(() => {
                var _a, _b;
                const fileExtensions = (_b = (_a = this.exampleMetadata()) === null || _a === void 0 ? void 0 : _a.files.map((file) => this.getFileExtension(file.name))) !== null && _b !== void 0 ? _b : [];
                // Display full file names only when exist files with the same extension
                return new Set(fileExtensions).size !== fileExtensions.length;
            });
            this.CodeExampleViewMode = CodeExampleViewMode;
            this.expandable = (0, core_1.signal)(false);
            this.expanded = (0, core_1.signal)(false);
            this.snippetCode = (0, core_1.signal)(undefined);
            this.tabs = (0, core_1.computed)(() => {
                var _a;
                return (_a = this.exampleMetadata()) === null || _a === void 0 ? void 0 : _a.files.map((file) => {
                    var _a;
                    return ({
                        name: (_a = file.title) !== null && _a !== void 0 ? _a : (this.shouldDisplayFullName() ? file.name : this.getFileExtension(file.name)),
                        code: file.content,
                    });
                });
            });
            this.view = (0, core_1.computed)(() => {
                var _a;
                return ((_a = this.exampleMetadata()) === null || _a === void 0 ? void 0 : _a.files.length) === 1
                    ? CodeExampleViewMode.SNIPPET
                    : CodeExampleViewMode.MULTI_FILE;
            });
        }
        renderExample() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                // Lazy load live example component
                if (((_a = this.exampleMetadata()) === null || _a === void 0 ? void 0 : _a.path) && ((_b = this.exampleMetadata()) === null || _b === void 0 ? void 0 : _b.preview)) {
                    this.exampleComponent = yield this.exampleViewerContentLoader.loadPreview((_c = this.exampleMetadata()) === null || _c === void 0 ? void 0 : _c.path);
                }
                this.snippetCode.set((_d = this.exampleMetadata()) === null || _d === void 0 ? void 0 : _d.files[0]);
                (0, core_1.afterNextRender)(() => {
                    var _a, _b;
                    // Several function below query the DOM directly, we need to wait until the DOM is rendered.
                    this.setCodeLinesVisibility();
                    this.elementRef.nativeElement.setAttribute('id', `example-${(_a = this.exampleMetadata()) === null || _a === void 0 ? void 0 : _a.id.toString()}`);
                    (_b = this.matTabGroup()) === null || _b === void 0 ? void 0 : _b.realignInkBar();
                    this.listenToMatTabIndexChange();
                    const lines = this.getHiddenCodeLines();
                    const lineNumbers = this.getHiddenCodeLineNumbers();
                    this.expandable.set(lines.length > 0 || lineNumbers.length > 0);
                }, { injector: this.injector });
            });
        }
        toggleExampleVisibility() {
            this.expanded.update((expanded) => !expanded);
            this.setCodeLinesVisibility();
        }
        copyLink() {
            var _a;
            // Reconstruct the URL using `origin + pathname` so we drop any pre-existing hash.
            const fullUrl = location.origin +
                location.pathname +
                location.search +
                '#example-' +
                ((_a = this.exampleMetadata()) === null || _a === void 0 ? void 0 : _a.id);
            this.clipboard.copy(fullUrl);
        }
        listenToMatTabIndexChange() {
            const matTabGroup = this.matTabGroup();
            matTabGroup === null || matTabGroup === void 0 ? void 0 : matTabGroup.realignInkBar();
            matTabGroup === null || matTabGroup === void 0 ? void 0 : matTabGroup.selectedIndexChange.pipe((0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef)).subscribe((index) => {
                var _a;
                this.snippetCode.set((_a = this.exampleMetadata()) === null || _a === void 0 ? void 0 : _a.files[index]);
                this.changeDetector.detectChanges();
                this.setCodeLinesVisibility();
            });
        }
        getFileExtension(name) {
            const segments = name.split('.');
            return segments.length ? segments[segments.length - 1].toLocaleUpperCase() : '';
        }
        setCodeLinesVisibility() {
            this.expanded()
                ? this.handleExpandedStateForCodeBlock()
                : this.handleCollapsedStateForCodeBlock();
        }
        handleExpandedStateForCodeBlock() {
            const lines = this.getHiddenCodeLines();
            const lineNumbers = this.getHiddenCodeLineNumbers();
            const gapLines = (Array.from(this.elementRef.nativeElement.querySelectorAll(`.${exports.CODE_LINE_CLASS_NAME}.${exports.GAP_CODE_LINE_CLASS_NAME}`)));
            for (const line of lines) {
                line.classList.remove(exports.HIDDEN_CLASS_NAME);
            }
            for (const lineNumber of lineNumbers) {
                lineNumber.classList.remove(exports.HIDDEN_CLASS_NAME);
            }
            for (const expandLine of gapLines) {
                expandLine.remove();
            }
        }
        handleCollapsedStateForCodeBlock() {
            var _a, _b, _c;
            const visibleLinesRange = (_a = this.snippetCode()) === null || _a === void 0 ? void 0 : _a.visibleLinesRange;
            if (!visibleLinesRange) {
                return;
            }
            const linesToDisplay = ((_b = visibleLinesRange === null || visibleLinesRange === void 0 ? void 0 : visibleLinesRange.split(',')) !== null && _b !== void 0 ? _b : []).map((line) => Number(line));
            const lines = (Array.from(this.elementRef.nativeElement.querySelectorAll(`.${exports.CODE_LINE_CLASS_NAME}`)));
            const lineNumbers = (Array.from(this.elementRef.nativeElement.querySelectorAll(`.${exports.CODE_LINE_NUMBER_CLASS_NAME}`)));
            const appendGapBefore = [];
            for (const [index, line] of lines.entries()) {
                if (!linesToDisplay.includes(index)) {
                    line.classList.add(exports.HIDDEN_CLASS_NAME);
                }
                else if (!linesToDisplay.includes(index - 1)) {
                    appendGapBefore.push(line);
                }
            }
            for (const [index, lineNumber] of lineNumbers.entries()) {
                if (!linesToDisplay.includes(index)) {
                    lineNumber.classList.add(exports.HIDDEN_CLASS_NAME);
                }
            }
            // Create gap line between visible ranges. For example we would like to display 10-16 and 20-29 lines.
            // We should display separator, gap between those two scopes.
            // TODO: we could replace div it with the component, and allow to expand code block after click.
            for (const [index, element] of appendGapBefore.entries()) {
                if (index === 0) {
                    continue;
                }
                const separator = this.document.createElement('div');
                separator.textContent = `...`;
                separator.classList.add(exports.CODE_LINE_CLASS_NAME);
                separator.classList.add(exports.GAP_CODE_LINE_CLASS_NAME);
                (_c = element.parentNode) === null || _c === void 0 ? void 0 : _c.insertBefore(separator, element);
            }
        }
        getHiddenCodeLines() {
            return (Array.from(this.elementRef.nativeElement.querySelectorAll(`.${exports.CODE_LINE_CLASS_NAME}.${exports.HIDDEN_CLASS_NAME}`)));
        }
        getHiddenCodeLineNumbers() {
            return (Array.from(this.elementRef.nativeElement.querySelectorAll(`.${exports.CODE_LINE_NUMBER_CLASS_NAME}.${exports.HIDDEN_CLASS_NAME}`)));
        }
    };
    __setFunctionName(_classThis, "ExampleViewer");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _githubUrl_decorators = [(0, core_1.Input)()];
        _stackblitzUrl_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _githubUrl_decorators, { kind: "field", name: "githubUrl", static: false, private: false, access: { has: obj => "githubUrl" in obj, get: obj => obj.githubUrl, set: (obj, value) => { obj.githubUrl = value; } }, metadata: _metadata }, _githubUrl_initializers, _githubUrl_extraInitializers);
        __esDecorate(null, null, _stackblitzUrl_decorators, { kind: "field", name: "stackblitzUrl", static: false, private: false, access: { has: obj => "stackblitzUrl" in obj, get: obj => obj.stackblitzUrl, set: (obj, value) => { obj.stackblitzUrl = value; } }, metadata: _metadata }, _stackblitzUrl_initializers, _stackblitzUrl_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleViewer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleViewer = _classThis;
})();
exports.ExampleViewer = ExampleViewer;
