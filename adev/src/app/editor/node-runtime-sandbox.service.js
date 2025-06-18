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
exports.NodeRuntimeSandbox = exports.PACKAGE_MANAGER = exports.OUT_OF_MEMORY_MSG = exports.DEV_SERVER_READY_MSG = void 0;
const core_1 = require("@angular/core");
const api_1 = require("@webcontainer/api");
const rxjs_1 = require("rxjs");
const docs_1 = require("@angular/docs");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const alert_manager_service_1 = require("./alert-manager.service");
const embedded_tutorial_manager_service_1 = require("./embedded-tutorial-manager.service");
const loading_steps_1 = require("./enums/loading-steps");
const node_runtime_state_service_1 = require("./node-runtime-state.service");
const terminal_handler_service_1 = require("./terminal/terminal-handler.service");
const typings_loader_service_1 = require("./typings-loader.service");
exports.DEV_SERVER_READY_MSG = 'Watch mode enabled. Watching for file changes...';
exports.OUT_OF_MEMORY_MSG = 'Out of memory';
exports.PACKAGE_MANAGER = 'npm';
/**
 * This service is responsible for handling the WebContainer instance, which
 * allows running a Node.js environment in the browser. It is used by the
 * embedded editor to run an executable Angular project in the browser.
 *
 * It boots the WebContainer, loads the project files into the WebContainer
 * filesystem, install the project dependencies and starts the dev server.
 */
let NodeRuntimeSandbox = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NodeRuntimeSandbox = _classThis = class {
        constructor() {
            this._createdFile$ = new rxjs_1.Subject();
            this.createdFile$ = this._createdFile$.asObservable();
            this._createdFiles = (0, core_1.signal)(new Set());
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.alertManager = (0, core_1.inject)(alert_manager_service_1.AlertManager);
            this.terminalHandler = (0, core_1.inject)(terminal_handler_service_1.TerminalHandler);
            this.embeddedTutorialManager = (0, core_1.inject)(embedded_tutorial_manager_service_1.EmbeddedTutorialManager);
            this.nodeRuntimeState = (0, core_1.inject)(node_runtime_state_service_1.NodeRuntimeState);
            this.typingsLoader = (0, core_1.inject)(typings_loader_service_1.TypingsLoader);
            this._isProjectInitialized = (0, core_1.signal)(false);
            this._isAngularCliInitialized = (0, core_1.signal)(false);
            this.urlToPreview$ = new rxjs_1.BehaviorSubject('');
            this._previewUrl$ = this.urlToPreview$.asObservable();
            this.processes = new Set();
        }
        get previewUrl$() {
            return this._previewUrl$;
        }
        init() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                // Note: the error state can already be set when loading the NodeRuntimeSandbox
                // in an unsupported environment.
                if (this.nodeRuntimeState.error()) {
                    return;
                }
                try {
                    if (!this.embeddedTutorialManager.type())
                        throw Error("Tutorial type isn't available, can not initialize the NodeRuntimeSandbox");
                    console.time('Load time');
                    let webContainer;
                    if (this.nodeRuntimeState.loadingStep() === loading_steps_1.LoadingStep.NOT_STARTED) {
                        this.alertManager.init();
                        webContainer = yield this.boot();
                        yield this.handleWebcontainerErrors();
                    }
                    else {
                        webContainer = yield this.webContainerPromise;
                    }
                    yield this.startInteractiveTerminal(webContainer);
                    this.terminalHandler.clearTerminals();
                    if (this.embeddedTutorialManager.type() === docs_1.TutorialType.CLI) {
                        yield this.initAngularCli();
                    }
                    else {
                        yield this.initProject();
                    }
                    console.timeEnd('Load time');
                }
                catch (error) {
                    // If we're already in an error state, throw away the most recent error which may have happened because
                    // we were in the error state already and tried to do more things after terminating.
                    const message = (_b = (_a = this.nodeRuntimeState.error()) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : error.message;
                    this.setErrorState(message);
                }
            });
        }
        reset() {
            return __awaiter(this, void 0, void 0, function* () {
                // if a reset is running, don't allow another to start
                if (this.nodeRuntimeState.isResetting()) {
                    return;
                }
                this.nodeRuntimeState.setIsResetting(true);
                if (this.nodeRuntimeState.loadingStep() === loading_steps_1.LoadingStep.READY) {
                    yield this.restartDevServer();
                }
                else {
                    yield this.cleanup();
                    this.setLoading(loading_steps_1.LoadingStep.BOOT);
                    // force re-initialization
                    this._isProjectInitialized.set(false);
                    yield this.init();
                }
                this.nodeRuntimeState.setIsResetting(false);
            });
        }
        restartDevServer() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                (_a = this.devServerProcess) === null || _a === void 0 ? void 0 : _a.kill();
                yield this.startDevServer();
            });
        }
        getSolutionFiles() {
            return __awaiter(this, void 0, void 0, function* () {
                const webContainer = yield this.webContainerPromise;
                const excludeFromRoot = [
                    'node_modules',
                    '.angular',
                    'dist',
                    'BUILD.bazel',
                    'idx',
                    'package.json.template',
                    'config.json',
                ];
                return yield (0, docs_1.checkFilesInDirectory)('', webContainer.fs, (path) => !excludeFromRoot.includes(path));
            });
        }
        /**
         * Initialize the WebContainer for an Angular project
         */
        initProject() {
            return __awaiter(this, void 0, void 0, function* () {
                // prevent re-initialization
                if (this._isProjectInitialized())
                    return;
                // clean up the sandbox if it was initialized before so that the CLI can
                // be initialized without conflicts
                if (this._isAngularCliInitialized()) {
                    yield this.cleanup();
                    this._isAngularCliInitialized.set(false);
                }
                this._isProjectInitialized.set(true);
                yield this.mountProjectFiles();
                this.handleProjectChanges();
                const exitCode = yield this.installDependencies();
                if (![143 /* PROCESS_EXIT_CODE.SIGTERM */, 0 /* PROCESS_EXIT_CODE.SUCCESS */].includes(exitCode))
                    throw new Error('Installation failed');
                yield Promise.all([this.loadTypes(), this.startDevServer()]);
            });
        }
        handleProjectChanges() {
            this.embeddedTutorialManager.tutorialChanged$
                .pipe((0, rxjs_1.map)((tutorialChanged) => ({
                tutorialChanged,
                tutorialFiles: this.embeddedTutorialManager.tutorialFiles(),
            })), (0, rxjs_1.filter)(({ tutorialChanged, tutorialFiles }) => tutorialChanged && Object.keys(tutorialFiles).length > 0), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe(() => __awaiter(this, void 0, void 0, function* () {
                yield Promise.all([this.mountProjectFiles(), this.handleFilesToDeleteOnProjectChange()]);
                if (this.embeddedTutorialManager.shouldReInstallDependencies()) {
                    yield this.handleInstallDependenciesOnProjectChange();
                }
            }));
        }
        handleFilesToDeleteOnProjectChange() {
            return __awaiter(this, void 0, void 0, function* () {
                const filesToDelete = Array.from(new Set([
                    ...this.embeddedTutorialManager.filesToDeleteFromPreviousProject(),
                    ...Array.from(this._createdFiles()),
                ]));
                if (filesToDelete.length) {
                    yield Promise.all(filesToDelete.map((file) => this.deleteFile(file)));
                }
                // reset created files
                this._createdFiles.set(new Set());
            });
        }
        handleInstallDependenciesOnProjectChange() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                // Note: restartDevServer is not used here because we need to kill
                // the dev server process before installing dependencies to avoid
                // errors in the console
                (_a = this.devServerProcess) === null || _a === void 0 ? void 0 : _a.kill();
                yield this.installDependencies();
                yield Promise.all([this.loadTypes(), this.startDevServer()]);
            });
        }
        /**
         * Initialize the WebContainer for the Angular CLI
         */
        initAngularCli() {
            return __awaiter(this, void 0, void 0, function* () {
                // prevent re-initialization
                if (this._isAngularCliInitialized())
                    return;
                // clean up the sandbox if a project was initialized before so the CLI can
                // be initialized without conflicts
                if (this._isProjectInitialized()) {
                    yield this.cleanup();
                    this.urlToPreview$.next(null);
                    this._isProjectInitialized.set(false);
                }
                this._isAngularCliInitialized.set(true);
                this.setLoading(loading_steps_1.LoadingStep.INSTALL);
                const exitCode = yield this.installAngularCli();
                if (![143 /* PROCESS_EXIT_CODE.SIGTERM */, 0 /* PROCESS_EXIT_CODE.SUCCESS */].includes(exitCode))
                    this.setLoading(loading_steps_1.LoadingStep.READY);
            });
        }
        writeFile(path, content) {
            return __awaiter(this, void 0, void 0, function* () {
                const webContainer = yield this.webContainerPromise;
                try {
                    yield webContainer.fs.writeFile(path, content);
                }
                catch (err) {
                    if (err.message.startsWith('ENOENT')) {
                        const directory = path.split('/').slice(0, -1).join('/');
                        yield webContainer.fs.mkdir(directory, {
                            recursive: true,
                        });
                        yield webContainer.fs.writeFile(path, content);
                    }
                    else {
                        throw err;
                    }
                }
            });
        }
        renameFile(oldPath, newPath) {
            return __awaiter(this, void 0, void 0, function* () {
                const webContainer = yield this.webContainerPromise;
                try {
                    yield webContainer.fs.rename(oldPath, newPath);
                }
                catch (err) {
                    throw err;
                }
            });
        }
        readFile(filePath) {
            return __awaiter(this, void 0, void 0, function* () {
                const webContainer = yield this.webContainerPromise;
                return webContainer.fs.readFile(filePath, 'utf-8');
            });
        }
        deleteFile(filepath) {
            return __awaiter(this, void 0, void 0, function* () {
                const webContainer = yield this.webContainerPromise;
                return webContainer.fs.rm(filepath);
            });
        }
        /**
         * Implemented based on:
         * https://webcontainers.io/tutorial/7-add-interactivity#_2-start-the-shell
         */
        startInteractiveTerminal(webContainer) {
            return __awaiter(this, void 0, void 0, function* () {
                // return existing shell process if it's already running
                if (this.interactiveShellProcess)
                    return this.interactiveShellProcess;
                const terminal = this.terminalHandler.interactiveTerminalInstance;
                // use WebContainer spawn directly so that the process isn't killed on
                // cleanup
                const shellProcess = yield webContainer.spawn('bash');
                this.interactiveShellProcess = shellProcess;
                // keep the regex out of the write stream to avoid recreating on every write
                const ngGenerateTerminalOutputRegex = /(\u001b\[\d+m)?([^\s]+)(\u001b\[\d+m)?/g;
                shellProcess.output.pipeTo(new WritableStream({
                    write: (data) => {
                        this.checkForOutOfMemoryError(data.toString());
                        terminal.write(data);
                        if (data.includes('CREATE') && data.endsWith('\r\n')) {
                            const match = data.match(ngGenerateTerminalOutputRegex);
                            const filename = match === null || match === void 0 ? void 0 : match[1];
                            if (filename) {
                                this._createdFile$.next(filename);
                                this._createdFiles.update((files) => files.add(filename));
                            }
                        }
                    },
                }));
                const input = shellProcess.input.getWriter();
                this.interactiveShellWriter = input;
                terminal.onData((data) => {
                    input.write(data);
                });
                terminal.breakProcess$.subscribe(() => {
                    // Write CTRL + C into shell to break active process
                    input.write('\x03');
                });
                return shellProcess;
            });
        }
        mountProjectFiles() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.embeddedTutorialManager.tutorialFilesystemTree()) {
                    return;
                }
                // The files are mounted on init and when the project changes. If the loading step is ready,
                // the project changed, so we don't need to change the loading step.
                if (this.nodeRuntimeState.loadingStep() !== loading_steps_1.LoadingStep.READY) {
                    this.setLoading(loading_steps_1.LoadingStep.LOAD_FILES);
                }
                const tutorialHasFiles = Object.keys(this.embeddedTutorialManager.tutorialFilesystemTree()).length >
                    0;
                if (tutorialHasFiles) {
                    yield Promise.all([
                        this.mountFiles(this.embeddedTutorialManager.commonFilesystemTree()),
                        this.mountFiles(this.embeddedTutorialManager.tutorialFilesystemTree()),
                    ]);
                }
            });
        }
        setLoading(loading) {
            this.nodeRuntimeState.setLoadingStep(loading);
        }
        mountFiles(fileSystemTree) {
            return __awaiter(this, void 0, void 0, function* () {
                const webContainer = yield this.webContainerPromise;
                yield webContainer.mount(fileSystemTree);
            });
        }
        boot() {
            return __awaiter(this, void 0, void 0, function* () {
                this.setLoading(loading_steps_1.LoadingStep.BOOT);
                if (!this.webContainerPromise) {
                    this.webContainerPromise = api_1.WebContainer.boot({
                        workdirName: 'angular',
                    });
                }
                return yield this.webContainerPromise;
            });
        }
        terminate(webContainer) {
            webContainer === null || webContainer === void 0 ? void 0 : webContainer.teardown();
            this.webContainerPromise = undefined;
        }
        handleWebcontainerErrors() {
            return __awaiter(this, void 0, void 0, function* () {
                const webContainer = yield this.webContainerPromise;
                webContainer.on('error', ({ message }) => {
                    if (this.checkForOutOfMemoryError(message))
                        return;
                    this.setErrorState(message, node_runtime_state_service_1.ErrorType.UNKNOWN);
                });
            });
        }
        checkForOutOfMemoryError(message) {
            if (message.toLowerCase().includes(exports.OUT_OF_MEMORY_MSG.toLowerCase())) {
                this.setErrorState(message, node_runtime_state_service_1.ErrorType.OUT_OF_MEMORY);
                return true;
            }
            return false;
        }
        setErrorState(message, type) {
            this.nodeRuntimeState.setError({ message, type });
            this.nodeRuntimeState.setLoadingStep(loading_steps_1.LoadingStep.ERROR);
            this.terminate();
        }
        installDependencies() {
            return __awaiter(this, void 0, void 0, function* () {
                this.setLoading(loading_steps_1.LoadingStep.INSTALL);
                const installProcess = yield this.spawn(exports.PACKAGE_MANAGER, ['install']);
                installProcess.output.pipeTo(new WritableStream({
                    write: (data) => {
                        this.terminalHandler.readonlyTerminalInstance.write(data);
                    },
                }));
                // wait for install command to exit
                return installProcess.exit;
            });
        }
        loadTypes() {
            return __awaiter(this, void 0, void 0, function* () {
                const webContainer = yield this.webContainerPromise;
                yield this.typingsLoader.retrieveTypeDefinitions(webContainer);
            });
        }
        installAngularCli() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                // install Angular CLI
                const installProcess = yield this.spawn(exports.PACKAGE_MANAGER, ['install', '@angular/cli@latest']);
                installProcess.output.pipeTo(new WritableStream({
                    write: (data) => {
                        this.terminalHandler.interactiveTerminalInstance.write(data);
                    },
                }));
                const exitCode = yield installProcess.exit;
                // Simulate pressing `Enter` in shell
                (_a = this.interactiveShellWriter) === null || _a === void 0 ? void 0 : _a.write('\x0D');
                return exitCode;
            });
        }
        startDevServer() {
            return __awaiter(this, void 0, void 0, function* () {
                const webContainer = yield this.webContainerPromise;
                this.setLoading(loading_steps_1.LoadingStep.START_DEV_SERVER);
                this.devServerProcess = yield this.spawn(exports.PACKAGE_MANAGER, ['run', 'start']);
                // wait for `server-ready` event, forward the dev server url
                webContainer.on('server-ready', (port, url) => {
                    this.urlToPreview$.next(url);
                });
                // wait until the dev server finishes the first compilation
                yield new Promise((resolve, reject) => {
                    if (!this.devServerProcess) {
                        reject('dev server is not running');
                        return;
                    }
                    this.devServerProcess.output.pipeTo(new WritableStream({
                        write: (data) => {
                            this.terminalHandler.readonlyTerminalInstance.write(data);
                            if (this.checkForOutOfMemoryError(data.toString())) {
                                reject(new Error(data.toString()));
                                return;
                            }
                            if (this.nodeRuntimeState.loadingStep() !== loading_steps_1.LoadingStep.READY &&
                                data.toString().includes(exports.DEV_SERVER_READY_MSG)) {
                                resolve();
                                this.setLoading(loading_steps_1.LoadingStep.READY);
                            }
                        },
                    }));
                });
            });
        }
        /**
         * Spawn a process in the WebContainer and store the process in the service.
         * Later on the stored process can be used to kill the process on `cleanup`
         */
        spawn(command_1) {
            return __awaiter(this, arguments, void 0, function* (command, args = []) {
                const webContainer = yield this.webContainerPromise;
                const process = yield webContainer.spawn(command, args);
                const transformStream = new TransformStream({
                    transform: (chunk, controller) => {
                        this.checkForOutOfMemoryError(chunk.toString());
                        controller.enqueue(chunk);
                    },
                });
                process.output = process.output.pipeThrough(transformStream);
                this.processes.add(process);
                return process;
            });
        }
        /**
         * Kill existing processes and remove files from the WebContainer
         * when switching tutorials that have different requirements
         */
        cleanup() {
            return __awaiter(this, void 0, void 0, function* () {
                // await the process to be killed before removing the files because
                // a process can create files during the promise
                yield this.killExistingProcesses();
                yield this.removeFiles();
            });
        }
        killExistingProcesses() {
            return __awaiter(this, void 0, void 0, function* () {
                yield Promise.all(Array.from(this.processes).map((process) => process.kill()));
                this.processes.clear();
            });
        }
        removeFiles() {
            return __awaiter(this, void 0, void 0, function* () {
                const webcontainer = yield this.webContainerPromise;
                yield webcontainer.spawn('rm', ['-rf', './**']);
            });
        }
    };
    __setFunctionName(_classThis, "NodeRuntimeSandbox");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NodeRuntimeSandbox = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NodeRuntimeSandbox = _classThis;
})();
exports.NodeRuntimeSandbox = NodeRuntimeSandbox;
