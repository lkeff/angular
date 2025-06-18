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
exports.CodeEditor = exports.REQUIRED_FILES = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const tabs_1 = require("@angular/material/tabs");
const platform_browser_1 = require("@angular/platform-browser");
const rxjs_1 = require("rxjs");
const terminal_handler_service_1 = require("../terminal/terminal-handler.service");
const code_mirror_editor_service_1 = require("./code-mirror-editor.service");
const diagnostics_state_service_1 = require("./services/diagnostics-state.service");
const download_manager_service_1 = require("../download-manager.service");
const stackblitz_opener_service_1 = require("../stackblitz-opener.service");
const docs_1 = require("@angular/docs");
const menu_1 = require("@angular/cdk/menu");
const idx_launcher_service_1 = require("../idx-launcher.service");
const tooltip_1 = require("@angular/material/tooltip");
const inject_embedded_tutorial_manager_1 = require("../inject-embedded-tutorial-manager");
exports.REQUIRED_FILES = new Set([
    'src/main.ts',
    'src/index.html',
    'src/app/app.component.ts',
]);
const ANGULAR_DEV = 'https://angular.dev';
let CodeEditor = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'docs-tutorial-code-editor',
            templateUrl: './code-editor.component.html',
            styleUrls: ['./code-editor.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [
                tabs_1.MatTabsModule,
                tooltip_1.MatTooltip,
                docs_1.IconComponent,
                docs_1.ClickOutside,
                menu_1.CdkMenu,
                menu_1.CdkMenuItem,
                menu_1.CdkMenuTrigger,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CodeEditor = _classThis = class {
        constructor() {
            this.codeEditorWrapperRef = core_1.viewChild.required('codeEditorWrapper');
            this.matTabGroup = core_1.viewChild.required(tabs_1.MatTabGroup);
            this.createFileInputRef = (0, core_1.viewChild)('createFileInput');
            this.renameFileInputRef = (0, core_1.viewChild)('renameFileInput');
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.codeMirrorEditor = (0, core_1.inject)(code_mirror_editor_service_1.CodeMirrorEditor);
            this.diagnosticsState = (0, core_1.inject)(diagnostics_state_service_1.DiagnosticsState);
            this.downloadManager = (0, core_1.inject)(download_manager_service_1.DownloadManager);
            this.stackblitzOpener = (0, core_1.inject)(stackblitz_opener_service_1.StackBlitzOpener);
            this.idxLauncher = (0, core_1.inject)(idx_launcher_service_1.IDXLauncher);
            this.title = (0, core_1.inject)(platform_browser_1.Title);
            this.location = (0, core_1.inject)(common_1.Location);
            this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
            this.errors$ = this.diagnosticsState.diagnostics$.pipe(
            // Display errors one second after code update
            (0, rxjs_1.debounceTime)(1000), (0, rxjs_1.map)((diagnosticsItem) => diagnosticsItem
                .filter((item) => item.severity === 'error')
                .sort((a, b) => a.lineNumber != b.lineNumber
                ? a.lineNumber - b.lineNumber
                : a.characterPosition - b.characterPosition)), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef));
            this.TerminalType = terminal_handler_service_1.TerminalType;
            this.displayErrorsBox = (0, core_1.signal)(false);
            this.errors = (0, core_1.signal)([]);
            this.files = this.codeMirrorEditor.openFiles;
            this.isCreatingFile = (0, core_1.signal)(false);
            this.isRenamingFile = (0, core_1.signal)(false);
            this.canRenameFile = (filename) => this.canDeleteFile(filename);
            (0, core_1.afterRenderEffect)(() => {
                const createFileInput = this.createFileInputRef();
                createFileInput === null || createFileInput === void 0 ? void 0 : createFileInput.nativeElement.focus();
            });
            (0, core_1.afterRenderEffect)(() => {
                const renameFileInput = this.renameFileInputRef();
                renameFileInput === null || renameFileInput === void 0 ? void 0 : renameFileInput.nativeElement.focus();
            });
        }
        ngAfterViewInit() {
            this.codeMirrorEditor.init(this.codeEditorWrapperRef().nativeElement);
            this.listenToDiagnosticsChange();
            this.listenToTabChange();
            this.setSelectedTabOnTutorialChange();
        }
        ngOnDestroy() {
            this.codeMirrorEditor.disable();
        }
        openCurrentSolutionInIDX() {
            this.idxLauncher.openCurrentSolutionInIDX();
        }
        openCurrentCodeInStackBlitz() {
            return __awaiter(this, void 0, void 0, function* () {
                const title = this.title.getTitle();
                const path = this.location.path();
                const editorUrl = `${ANGULAR_DEV}${path}`;
                const description = `Angular.dev example generated from [${editorUrl}](${editorUrl})`;
                yield this.stackblitzOpener.openCurrentSolutionInStackBlitz({ title, description });
            });
        }
        downloadCurrentCodeEditorState() {
            return __awaiter(this, void 0, void 0, function* () {
                const embeddedTutorialManager = yield (0, inject_embedded_tutorial_manager_1.injectEmbeddedTutorialManager)(this.environmentInjector);
                const name = embeddedTutorialManager.tutorialId();
                yield this.downloadManager.downloadCurrentStateOfTheSolution(name);
            });
        }
        closeErrorsBox() {
            this.displayErrorsBox.set(false);
        }
        closeRenameFile() {
            this.isRenamingFile.set(false);
        }
        canDeleteFile(filename) {
            return !exports.REQUIRED_FILES.has(filename);
        }
        deleteFile(filename) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.codeMirrorEditor.deleteFile(filename);
                this.matTabGroup().selectedIndex = 0;
            });
        }
        onAddButtonClick() {
            this.isCreatingFile.set(true);
            this.matTabGroup().selectedIndex = this.files().length;
        }
        onRenameButtonClick() {
            this.isRenamingFile.set(true);
        }
        renameFile(event, oldPath) {
            return __awaiter(this, void 0, void 0, function* () {
                const renameFileInput = this.renameFileInputRef();
                if (!renameFileInput)
                    return;
                event.preventDefault();
                const renameFileInputValue = renameFileInput.nativeElement.value;
                if (renameFileInputValue) {
                    if (renameFileInputValue.includes('..')) {
                        alert('File name can not contain ".."');
                        return;
                    }
                    // src is hidden from users, here we manually add it to the new filename
                    const newFile = 'src/' + renameFileInputValue;
                    if (this.files().find(({ filename }) => filename.includes(newFile))) {
                        alert('File name already exists');
                        return;
                    }
                    yield this.codeMirrorEditor.renameFile(oldPath, newFile);
                }
                this.isRenamingFile.set(false);
            });
        }
        createFile(event) {
            return __awaiter(this, void 0, void 0, function* () {
                const fileInput = this.createFileInputRef();
                if (!fileInput)
                    return;
                event.preventDefault();
                const newFileInputValue = fileInput.nativeElement.value;
                if (newFileInputValue) {
                    if (newFileInputValue.includes('..')) {
                        alert('File name can not contain ".."');
                        return;
                    }
                    // src is hidden from users, here we manually add it to the new filename
                    const newFile = 'src/' + newFileInputValue;
                    if (this.files().find(({ filename }) => filename.includes(newFile))) {
                        alert('File already exists');
                        return;
                    }
                    yield this.codeMirrorEditor.createFile(newFile);
                }
                this.isCreatingFile.set(false);
            });
        }
        listenToDiagnosticsChange() {
            this.errors$.subscribe((diagnostics) => {
                this.errors.set(diagnostics);
                this.displayErrorsBox.set(diagnostics.length > 0);
            });
        }
        setSelectedTabOnTutorialChange() {
            // Using `from` to prevent injecting the embedded tutorial manager once the
            // injector is destroyed (this may happen in unit tests when the test ends
            // before `injectAsync` runs, causing an error).
            (0, rxjs_1.from)((0, inject_embedded_tutorial_manager_1.injectEmbeddedTutorialManager)(this.environmentInjector))
                .pipe((0, rxjs_1.switchMap)((embeddedTutorialManager) => embeddedTutorialManager.tutorialChanged$), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe(() => {
                // selected file on project change is always the first
                this.matTabGroup().selectedIndex = 0;
            });
        }
        listenToTabChange() {
            this.matTabGroup()
                .selectedIndexChange.pipe((0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe((index) => {
                const selectedFile = this.files()[index];
                if (selectedFile) {
                    this.codeMirrorEditor.changeCurrentFile(selectedFile.filename);
                }
            });
        }
    };
    __setFunctionName(_classThis, "CodeEditor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CodeEditor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CodeEditor = _classThis;
})();
exports.CodeEditor = CodeEditor;
