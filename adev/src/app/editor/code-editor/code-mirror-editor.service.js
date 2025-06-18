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
exports.CodeMirrorEditor = exports.EDITOR_CONTENT_CHANGE_DELAY_MILLIES = void 0;
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const rxjs_1 = require("rxjs");
const state_1 = require("@codemirror/state");
const view_1 = require("@codemirror/view");
const embedded_tutorial_manager_service_1 = require("../embedded-tutorial-manager.service");
const node_runtime_sandbox_service_1 = require("../node-runtime-sandbox.service");
const typings_loader_service_1 = require("../typings-loader.service");
const code_editor_extensions_1 = require("./constants/code-editor-extensions");
const code_editor_languages_1 = require("./constants/code-editor-languages");
const autocomplete_1 = require("./extensions/autocomplete");
const diagnostics_1 = require("./extensions/diagnostics");
const tooltip_1 = require("./extensions/tooltip");
const diagnostics_state_service_1 = require("./services/diagnostics-state.service");
const node_runtime_state_service_1 = require("../node-runtime-state.service");
/**
 * The delay between the last typed character and the actual file save.
 * This is used to prevent saving the file on every keystroke.
 *
 * Important! this value is intentionally set a bit higher than it needs to be, because sending
 * changes too frequently to the web container appears to put it in a state where it stops picking
 * up changes. See issue #691 for context.
 */
exports.EDITOR_CONTENT_CHANGE_DELAY_MILLIES = 500;
const INITIAL_STATES = {
    _editorView: null,
    files: [],
    currentFile: {
        filename: '',
        content: '',
        language: code_editor_languages_1.LANGUAGES['ts'],
    },
    contentChangeListenerSubscription$: undefined,
    tutorialChangeListener$: undefined,
    createdFile$: undefined,
};
let CodeMirrorEditor = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CodeMirrorEditor = _classThis = class {
        constructor() {
            // TODO: handle files created by the user, e.g. after running `ng generate component`
            this.files = (0, core_1.signal)(INITIAL_STATES.files);
            this.openFiles = (0, core_1.signal)(INITIAL_STATES.files);
            this.currentFile = (0, core_1.signal)(INITIAL_STATES.currentFile);
            // An instance of web worker used to run virtual TypeScript environment in the browser.
            // It allows to enrich CodeMirror UX for TypeScript files.
            this.tsVfsWorker = null;
            // EventManager gives ability to communicate between tsVfsWorker and CodeMirror instance
            this.eventManager$ = new rxjs_1.Subject();
            this.nodeRuntimeSandbox = (0, core_1.inject)(node_runtime_sandbox_service_1.NodeRuntimeSandbox);
            this.nodeRuntimeState = (0, core_1.inject)(node_runtime_state_service_1.NodeRuntimeState);
            this.embeddedTutorialManager = (0, core_1.inject)(embedded_tutorial_manager_service_1.EmbeddedTutorialManager);
            this.typingsLoader = (0, core_1.inject)(typings_loader_service_1.TypingsLoader);
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.diagnosticsState = (0, core_1.inject)(diagnostics_state_service_1.DiagnosticsState);
            this._editorView = INITIAL_STATES._editorView;
            this._editorStates = new Map();
            this.contentChanged$ = new rxjs_1.Subject();
            this.contentChangeListener$ = this.contentChanged$.asObservable();
            this.contentChangeListenerSubscription$ = INITIAL_STATES.contentChangeListenerSubscription$;
            this.tutorialChangeListener$ = INITIAL_STATES.tutorialChangeListener$;
            this.createdFileListener$ = INITIAL_STATES.createdFile$;
            // Method is responsible for sending request to Typescript VFS worker.
            this.sendRequestToTsVfs = (request) => {
                if (!this.tsVfsWorker)
                    return;
                // Send message to tsVfsWorker only when current file is TypeScript file.
                if (!this.currentFile().filename.endsWith('.ts'))
                    return;
                this.tsVfsWorker.postMessage(request);
            };
        }
        init(parentElement) {
            if (this._editorView)
                return;
            if (!this.nodeRuntimeState.error()) {
                this.initTypescriptVfsWorker();
                this.saveLibrariesTypes();
            }
            this._editorView = new view_1.EditorView({
                parent: parentElement,
                state: this.createEditorState(),
                dispatchTransactions: (transactions, view) => {
                    view.update(transactions);
                    for (const transaction of transactions) {
                        if (transaction.docChanged && this.currentFile().filename) {
                            this.contentChanged$.next(transaction.state.doc.toString());
                            this.changeFileContentsOnRealTime(transaction);
                        }
                    }
                },
            });
            this.listenToProjectChanges();
            this.contentChangeListenerSubscription$ = this.contentChangeListener$
                .pipe((0, rxjs_1.debounceTime)(exports.EDITOR_CONTENT_CHANGE_DELAY_MILLIES), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe((fileContents) => __awaiter(this, void 0, void 0, function* () {
                yield this.changeFileContentsScheduled(fileContents);
            }));
            this.createdFileListener$ = this.nodeRuntimeSandbox.createdFile$.subscribe((createdFile) => __awaiter(this, void 0, void 0, function* () {
                yield this.addCreatedFileToCodeEditor(createdFile);
            }));
            // Create TypeScript virtual filesystem when default files map is created
            // and files are set
            this.eventManager$
                .pipe((0, rxjs_1.filter)((event) => event.action === "default-fs-ready" /* TsVfsWorkerActions.INIT_DEFAULT_FILE_SYSTEM_MAP */ &&
                this.files().length > 0), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe(() => {
                this.createVfsEnv();
            });
        }
        disable() {
            var _a, _b, _c, _d;
            (_a = this._editorView) === null || _a === void 0 ? void 0 : _a.destroy();
            this._editorView = null;
            this._editorView = INITIAL_STATES._editorView;
            this.files.set(INITIAL_STATES.files);
            this.currentFile.set(INITIAL_STATES.currentFile);
            this._editorStates.clear();
            (_b = this.contentChangeListenerSubscription$) === null || _b === void 0 ? void 0 : _b.unsubscribe();
            this.contentChangeListenerSubscription$ = INITIAL_STATES.contentChangeListenerSubscription$;
            (_c = this.tutorialChangeListener$) === null || _c === void 0 ? void 0 : _c.unsubscribe();
            this.tutorialChangeListener$ = INITIAL_STATES.tutorialChangeListener$;
            (_d = this.createdFileListener$) === null || _d === void 0 ? void 0 : _d.unsubscribe();
            this.createdFileListener$ = INITIAL_STATES.createdFile$;
        }
        changeCurrentFile(fileName) {
            var _a;
            if (!this._editorView)
                return;
            const newFile = this.files().find((file) => file.filename === fileName);
            if (!newFile)
                throw new Error(`File '${fileName}' not found`);
            this.currentFile.set(newFile);
            const editorState = (_a = this._editorStates.get(newFile.filename)) !== null && _a !== void 0 ? _a : this.createEditorState();
            this._editorView.setState(editorState);
        }
        initTypescriptVfsWorker() {
            if (this.tsVfsWorker) {
                return;
            }
            this.tsVfsWorker = new Worker(new URL('./workers/typescript-vfs.worker', import.meta.url), {
                type: 'module',
            });
            this.tsVfsWorker.addEventListener('message', ({ data }) => {
                this.eventManager$.next(data);
            });
        }
        saveLibrariesTypes() {
            this.typingsLoader.typings$
                .pipe((0, rxjs_1.filter)((typings) => typings.length > 0), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe((typings) => {
                var _a;
                this.sendRequestToTsVfs({
                    action: "define-types-request" /* TsVfsWorkerActions.DEFINE_TYPES_REQUEST */,
                    data: typings,
                });
                // Reset current file to trigger diagnostics after preload @angular libraries.
                (_a = this._editorView) === null || _a === void 0 ? void 0 : _a.setState(this._editorStates.get(this.currentFile().filename));
            });
        }
        getVfsEnvFileSystemMap() {
            const fileSystemMap = new Map();
            for (const file of this.files().filter((file) => file.filename.endsWith('.ts'))) {
                fileSystemMap.set(`/${file.filename}`, file.content);
            }
            return fileSystemMap;
        }
        /**
         * Create virtual environment for TypeScript files
         */
        createVfsEnv() {
            this.sendRequestToTsVfs({
                action: "create-vfs-env-request" /* TsVfsWorkerActions.CREATE_VFS_ENV_REQUEST */,
                data: this.getVfsEnvFileSystemMap(),
            });
        }
        /**
         * Update virtual TypeScript file system with current code editor files
         */
        updateVfsEnv() {
            this.sendRequestToTsVfs({
                action: "update-vfs-env-request" /* TsVfsWorkerActions.UPDATE_VFS_ENV_REQUEST */,
                data: this.getVfsEnvFileSystemMap(),
            });
        }
        listenToProjectChanges() {
            this.tutorialChangeListener$ = this.embeddedTutorialManager.tutorialChanged$
                .pipe((0, rxjs_1.map)(() => this.embeddedTutorialManager.tutorialFiles()), (0, rxjs_1.filter)((tutorialFiles) => Object.keys(tutorialFiles).length > 0), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe(() => {
                this.changeProject();
            });
        }
        changeProject() {
            this.setProjectFiles();
            this._editorStates.clear();
            this.changeCurrentFile(this.currentFile().filename);
            this.updateVfsEnv();
        }
        setProjectFiles() {
            const tutorialFiles = this.getTutorialFiles(this.embeddedTutorialManager.tutorialFiles());
            const openFiles = [];
            // iterate openFiles to keep files order
            for (const openFileName of this.embeddedTutorialManager.openFiles()) {
                const openFile = tutorialFiles.find(({ filename }) => filename === openFileName);
                if (openFile) {
                    openFiles.push(openFile);
                }
            }
            this.files.set(tutorialFiles);
            this.openFiles.set(openFiles);
            this.changeCurrentFile(openFiles[0].filename);
        }
        /**
         * Update the code editor files when files are created
         */
        addCreatedFileToCodeEditor(createdFile) {
            return __awaiter(this, void 0, void 0, function* () {
                const fileContents = yield this.nodeRuntimeSandbox.readFile(createdFile);
                this.embeddedTutorialManager.tutorialFiles.update((files) => (Object.assign(Object.assign({}, files), { [createdFile]: fileContents })));
                this.embeddedTutorialManager.openFiles.update((files) => [...files, createdFile]);
                this.setProjectFiles();
                this.updateVfsEnv();
                this.saveLibrariesTypes();
            });
        }
        createFile(filename) {
            return __awaiter(this, void 0, void 0, function* () {
                // if file already exists, use its content
                const content = yield this.nodeRuntimeSandbox.readFile(filename).catch((error) => {
                    // empty content if file does not exist
                    if (error.message.includes('ENOENT'))
                        return '';
                    else
                        throw error;
                });
                yield this.nodeRuntimeSandbox.writeFile(filename, content);
                this.embeddedTutorialManager.tutorialFiles.update((files) => (Object.assign(Object.assign({}, files), { [filename]: content })));
                this.embeddedTutorialManager.openFiles.update((files) => [...files, filename]);
                this.setProjectFiles();
                this.updateVfsEnv();
                this.saveLibrariesTypes();
                this.changeCurrentFile(filename);
            });
        }
        renameFile(oldPath, newPath) {
            return __awaiter(this, void 0, void 0, function* () {
                const content = yield this.nodeRuntimeSandbox.readFile(oldPath).catch((error) => {
                    // empty content if file does not exist
                    if (error.message.includes('ENOENT'))
                        return '';
                    else
                        throw error;
                });
                yield this.nodeRuntimeSandbox.renameFile(oldPath, newPath).catch((error) => {
                    throw error;
                });
                this.embeddedTutorialManager.tutorialFiles.update((files) => {
                    delete files[oldPath];
                    files[newPath] = content;
                    return files;
                });
                this.embeddedTutorialManager.openFiles.update((files) => [
                    ...files.filter((file) => file !== oldPath),
                    newPath,
                ]);
                this.setProjectFiles();
                this.updateVfsEnv();
                this.saveLibrariesTypes();
                this.changeCurrentFile(newPath);
            });
        }
        deleteFile(deletedFile) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.nodeRuntimeSandbox.deleteFile(deletedFile);
                this.embeddedTutorialManager.tutorialFiles.update((files) => {
                    delete files[deletedFile];
                    return files;
                });
                this.embeddedTutorialManager.openFiles.update((files) => files.filter((file) => file !== deletedFile));
                this.setProjectFiles();
                this.updateVfsEnv();
                this.saveLibrariesTypes();
            });
        }
        createEditorState() {
            const newEditorState = state_1.EditorState.create({
                doc: this.currentFile().content,
                extensions: [
                    ...code_editor_extensions_1.CODE_EDITOR_EXTENSIONS,
                    this.currentFile().language,
                    (0, view_1.placeholder)('Type your code here...'),
                    ...this.getLanguageExtensions(),
                ],
            });
            this._editorStates.set(this.currentFile().filename, newEditorState);
            return newEditorState;
        }
        getLanguageExtensions() {
            if (this.currentFile().filename.endsWith('.ts')) {
                return [
                    (0, autocomplete_1.getAutocompleteExtension)(this.eventManager$, this.currentFile, this.sendRequestToTsVfs),
                    (0, diagnostics_1.getDiagnosticsExtension)(this.eventManager$, this.currentFile, this.sendRequestToTsVfs, this.diagnosticsState),
                    (0, tooltip_1.getTooltipExtension)(this.eventManager$, this.currentFile, this.sendRequestToTsVfs),
                ];
            }
            return [];
        }
        /**
         * Write the new file contents to the sandbox filesystem
         */
        changeFileContentsScheduled(newContent) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.nodeRuntimeSandbox.writeFile(this.currentFile().filename, newContent);
                }
                catch (err) {
                    // Note: `writeFile` throws if the sandbox is not initialized yet, which can happen if
                    // the user starts typing right after the page loads.
                    // Here the error is ignored as it is expected.
                }
            });
        }
        /**
         * Change file contents on files signals and update the editor state
         */
        changeFileContentsOnRealTime(transaction) {
            this._editorStates.set(this.currentFile().filename, transaction.state);
            const newContent = transaction.state.doc.toString();
            this.currentFile.update((currentFile) => (Object.assign(Object.assign({}, currentFile), { content: newContent })));
            this.files.update((files) => files.map((file) => file.filename === this.currentFile().filename ? Object.assign(Object.assign({}, file), { content: newContent }) : file));
            // send current file content to Ts Vfs worker to run diagnostics on current file state
            this.sendRequestToTsVfs({
                action: "code-changed" /* TsVfsWorkerActions.CODE_CHANGED */,
                data: {
                    file: this.currentFile().filename,
                    code: newContent,
                },
            });
        }
        getTutorialFiles(files) {
            const languagesExtensions = Object.keys(code_editor_languages_1.LANGUAGES);
            const tutorialFiles = Object.entries(files)
                .filter((fileAndContent) => typeof fileAndContent[1] === 'string')
                .map(([filename, content]) => {
                const extension = languagesExtensions.find((extension) => filename.endsWith(extension));
                const language = extension ? code_editor_languages_1.LANGUAGES[extension] : code_editor_languages_1.LANGUAGES['ts'];
                return {
                    filename,
                    content,
                    language,
                };
            });
            return tutorialFiles;
        }
    };
    __setFunctionName(_classThis, "CodeMirrorEditor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CodeMirrorEditor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CodeMirrorEditor = _classThis;
})();
exports.CodeMirrorEditor = CodeMirrorEditor;
