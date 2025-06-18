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
exports.EmbeddedEditor = exports.LARGE_EDITOR_HEIGHT_BREAKPOINT = exports.LARGE_EDITOR_WIDTH_BREAKPOINT = exports.EMBEDDED_EDITOR_SELECTOR = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const docs_1 = require("@angular/docs");
const tabs_1 = require("@angular/material/tabs");
const rxjs_1 = require("rxjs");
const alert_manager_service_1 = require("./alert-manager.service");
const angular_split_1 = require("angular-split");
const code_editor_component_1 = require("./code-editor/code-editor.component");
const diagnostics_state_service_1 = require("./code-editor/services/diagnostics-state.service");
const editor_ui_state_service_1 = require("./editor-ui-state.service");
const loading_steps_1 = require("./enums/loading-steps");
const node_runtime_sandbox_service_1 = require("./node-runtime-sandbox.service");
const node_runtime_state_service_1 = require("./node-runtime-state.service");
const preview_component_1 = require("./preview/preview.component");
const terminal_handler_service_1 = require("./terminal/terminal-handler.service");
const terminal_component_1 = require("./terminal/terminal.component");
exports.EMBEDDED_EDITOR_SELECTOR = 'embedded-editor';
exports.LARGE_EDITOR_WIDTH_BREAKPOINT = 950;
exports.LARGE_EDITOR_HEIGHT_BREAKPOINT = 550;
let EmbeddedEditor = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: exports.EMBEDDED_EDITOR_SELECTOR,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [angular_split_1.AngularSplitModule, code_editor_component_1.CodeEditor, preview_component_1.Preview, terminal_component_1.Terminal, tabs_1.MatTabsModule, docs_1.IconComponent],
            templateUrl: './embedded-editor.component.html',
            styleUrls: ['./embedded-editor.component.scss'],
            providers: [editor_ui_state_service_1.EditorUiState],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EmbeddedEditor = _classThis = class {
        constructor() {
            this.editorContainer = core_1.viewChild.required('editorContainer');
            this.matTabGroup = (0, core_1.viewChild)(tabs_1.MatTabGroup);
            this.platformId = (0, core_1.inject)(core_1.PLATFORM_ID);
            this.changeDetector = (0, core_1.inject)(core_1.ChangeDetectorRef);
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.diagnosticsState = (0, core_1.inject)(diagnostics_state_service_1.DiagnosticsState);
            this.editorUiState = (0, core_1.inject)(editor_ui_state_service_1.EditorUiState);
            this.nodeRuntimeState = (0, core_1.inject)(node_runtime_state_service_1.NodeRuntimeState);
            this.nodeRuntimeSandbox = (0, core_1.inject)(node_runtime_sandbox_service_1.NodeRuntimeSandbox);
            this.splitDirection = 'vertical';
            this.MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = alert_manager_service_1.MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES;
            this.TerminalType = terminal_handler_service_1.TerminalType;
            this.displayOnlyTerminal = (0, core_1.computed)(() => this.editorUiState.uiState().displayOnlyInteractiveTerminal);
            this.errorsCount = (0, core_1.signal)(0);
            this.displayPreviewInMatTabGroup = (0, core_1.signal)(true);
            this.shouldEnableReset = (0, core_1.computed)(() => this.nodeRuntimeState.loadingStep() > loading_steps_1.LoadingStep.BOOT &&
                !this.nodeRuntimeState.isResetting());
            this.errorsCount$ = this.diagnosticsState.diagnostics$.pipe((0, rxjs_1.map)((diagnosticsItem) => diagnosticsItem.filter((item) => item.severity === 'error').length), (0, rxjs_1.distinctUntilChanged)(), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef));
            this.displayPreviewInMatTabGroup$ = (0, rxjs_interop_1.toObservable)(this.displayPreviewInMatTabGroup).pipe((0, rxjs_1.distinctUntilChanged)(), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef));
        }
        ngOnInit() {
            this.listenToErrorsCount();
        }
        ngAfterViewInit() {
            if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                this.setFirstTabAsActiveAfterResize();
                this.setResizeObserver();
            }
        }
        ngOnDestroy() {
            var _a;
            (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        }
        setVisibleEmbeddedEditorTabs() {
            this.displayPreviewInMatTabGroup.set(!this.isLargeEmbeddedEditor());
        }
        reset() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.nodeRuntimeSandbox.reset();
            });
        }
        setFirstTabAsActiveAfterResize() {
            this.displayPreviewInMatTabGroup$.subscribe(() => {
                this.changeDetector.detectChanges();
                const matTabGroup = this.matTabGroup();
                if (matTabGroup) {
                    matTabGroup.selectedIndex = 0;
                }
            });
        }
        listenToErrorsCount() {
            this.errorsCount$.subscribe((errorsCount) => {
                this.errorsCount.set(errorsCount);
            });
        }
        // Listen to resizing of Embedded Editor and set proper list of the tabs for the current resolution.
        setResizeObserver() {
            this.resizeObserver = new ResizeObserver((_) => {
                this.setVisibleEmbeddedEditorTabs();
                this.splitDirection = this.isLargeEmbeddedEditor() ? 'horizontal' : 'vertical';
            });
            this.resizeObserver.observe(this.editorContainer().nativeElement);
        }
        isLargeEmbeddedEditor() {
            const editorContainer = this.editorContainer().nativeElement;
            const width = editorContainer.offsetWidth;
            const height = editorContainer.offsetHeight;
            return width > exports.LARGE_EDITOR_WIDTH_BREAKPOINT && height > exports.LARGE_EDITOR_HEIGHT_BREAKPOINT;
        }
    };
    __setFunctionName(_classThis, "EmbeddedEditor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmbeddedEditor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmbeddedEditor = _classThis;
})();
exports.EmbeddedEditor = EmbeddedEditor;
