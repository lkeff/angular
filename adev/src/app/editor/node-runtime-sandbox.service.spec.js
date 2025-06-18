"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const rxjs_1 = require("rxjs");
const core_1 = require("@angular/core");
const docs_1 = require("@angular/docs");
const alert_manager_service_1 = require("./alert-manager.service");
const embedded_tutorial_manager_service_1 = require("./embedded-tutorial-manager.service");
const loading_steps_1 = require("./enums/loading-steps");
const node_runtime_sandbox_service_1 = require("./node-runtime-sandbox.service");
const node_runtime_state_service_1 = require("./node-runtime-state.service");
const terminal_handler_service_1 = require("./terminal/terminal-handler.service");
const typings_loader_service_1 = require("./typings-loader.service");
describe('NodeRuntimeSandbox', () => {
    let testBed;
    let service;
    const fakeTerminalHandler = {
        interactiveTerminalInstance: {
            write: (data) => { },
            onData: (data) => { },
            breakProcess$: (0, rxjs_1.of)(),
        },
        readonlyTerminalInstance: {
            write: (data) => { },
        },
        clearTerminals: () => { },
    };
    const tutorialChanged$ = new rxjs_1.BehaviorSubject(false);
    const fakeEmbeddedTutorialManager = {
        tutorialId: (0, core_1.signal)('tutorial'),
        tutorialFilesystemTree: (0, core_1.signal)({ 'app.js': { file: { contents: '' } } }),
        commonFilesystemTree: (0, core_1.signal)({ 'app.js': { file: { contents: '' } } }),
        openFiles: (0, core_1.signal)(['app.js']),
        tutorialFiles: (0, core_1.signal)({ 'app.js': '' }),
        hiddenFiles: (0, core_1.signal)(['hidden.js']),
        answerFiles: (0, core_1.signal)({ 'answer.ts': '' }),
        type: (0, core_1.signal)(docs_1.TutorialType.EDITOR),
        tutorialChanged$,
        shouldReInstallDependencies: (0, core_1.signal)(false),
        filesToDeleteFromPreviousProject: (0, core_1.signal)(new Set([])),
    };
    const setValuesToInitializeAngularCLI = () => {
        service['embeddedTutorialManager'].type.set(docs_1.TutorialType.CLI);
        service['webContainerPromise'] = Promise.resolve(new docs_1.FakeWebContainer());
    };
    const setValuesToInitializeProject = () => {
        service['embeddedTutorialManager'].type.set(docs_1.TutorialType.EDITOR);
        const fakeSpawnProcess = new docs_1.FakeWebContainerProcess();
        fakeSpawnProcess.output = {
            pipeTo: (data) => {
                data.getWriter().write(node_runtime_sandbox_service_1.DEV_SERVER_READY_MSG);
            },
            pipeThrough: () => fakeSpawnProcess.output,
        };
        service['webContainerPromise'] = Promise.resolve(new docs_1.FakeWebContainer({ spawn: fakeSpawnProcess }));
    };
    const setValuesToCatchOutOfMemoryError = () => {
        service['embeddedTutorialManager'].type.set(docs_1.TutorialType.EDITOR);
        const fakeSpawnProcess = new docs_1.FakeWebContainerProcess();
        fakeSpawnProcess.output = {
            pipeTo: (data) => {
                data.getWriter().write(node_runtime_sandbox_service_1.OUT_OF_MEMORY_MSG);
            },
            pipeThrough: () => fakeSpawnProcess.output,
        };
        service['webContainerPromise'] = Promise.resolve(new docs_1.FakeWebContainer({ spawn: fakeSpawnProcess }));
    };
    const fakeTypingsLoader = {
        retrieveTypeDefinitions: (webcontainer) => Promise.resolve(),
    };
    const fakeAlertManager = {
        init: () => { },
    };
    beforeEach(() => {
        testBed = testing_1.TestBed.configureTestingModule({
            providers: [
                node_runtime_sandbox_service_1.NodeRuntimeSandbox,
                {
                    provide: terminal_handler_service_1.TerminalHandler,
                    useValue: fakeTerminalHandler,
                },
                {
                    provide: typings_loader_service_1.TypingsLoader,
                    useValue: fakeTypingsLoader,
                },
                {
                    provide: embedded_tutorial_manager_service_1.EmbeddedTutorialManager,
                    useValue: fakeEmbeddedTutorialManager,
                },
                {
                    provide: alert_manager_service_1.AlertManager,
                    useValue: fakeAlertManager,
                },
                {
                    provide: node_runtime_state_service_1.NodeRuntimeState,
                },
            ],
        });
        service = testBed.inject(node_runtime_sandbox_service_1.NodeRuntimeSandbox);
        service['embeddedTutorialManager'].type.set(docs_1.TutorialType.EDITOR);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should set error message when install dependencies resolve exitCode not equal to 0', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const EXPECTED_ERROR = 'Installation failed';
        service['webContainerPromise'] = Promise.resolve(new docs_1.FakeWebContainer());
        const fakeSpawn = new docs_1.FakeWebContainerProcess();
        fakeSpawn.exit = Promise.resolve(10);
        spyOn(service, 'spawn')
            .withArgs(node_runtime_sandbox_service_1.PACKAGE_MANAGER, ['install'])
            .and.returnValue(fakeSpawn);
        yield service.init();
        expect((_a = service['nodeRuntimeState'].error()) === null || _a === void 0 ? void 0 : _a.message).toBe(EXPECTED_ERROR);
    }));
    it('should have ready loading state after init succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
        setValuesToInitializeProject();
        yield service.init();
        const state = testing_1.TestBed.inject(node_runtime_state_service_1.NodeRuntimeState);
        expect(state.loadingStep()).toBe(loading_steps_1.LoadingStep.READY);
    }));
    it('should call writeFile with proper parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        setValuesToInitializeProject();
        const fakeWebContainer = new docs_1.FakeWebContainer();
        service['webContainerPromise'] = Promise.resolve(fakeWebContainer);
        const writeFileSpy = spyOn(fakeWebContainer.fs, 'writeFile');
        const path = 'path';
        const content = 'content';
        yield service.writeFile(path, content);
        expect(writeFileSpy).toHaveBeenCalledOnceWith(path, content);
    }));
    it('should call renameFile with proper parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        setValuesToInitializeProject();
        const fakeWebContainer = new docs_1.FakeWebContainer();
        service['webContainerPromise'] = Promise.resolve(fakeWebContainer);
        const renameFileSpy = spyOn(fakeWebContainer.fs, 'rename');
        const oldPath = 'oldPath';
        const newPath = 'newPath';
        yield service.renameFile(oldPath, newPath);
        expect(renameFileSpy).toHaveBeenCalledOnceWith(oldPath, newPath);
    }));
    it('should initialize the Angular CLI based on the tutorial config', () => __awaiter(void 0, void 0, void 0, function* () {
        setValuesToInitializeAngularCLI();
        const initAngularCliSpy = spyOn(service, 'initAngularCli');
        yield service.init();
        expect(initAngularCliSpy).toHaveBeenCalled();
    }));
    it('should initialize a project based on the tutorial config', () => __awaiter(void 0, void 0, void 0, function* () {
        service['webContainerPromise'] = Promise.resolve(new docs_1.FakeWebContainer());
        setValuesToInitializeProject();
        const initProjectSpy = spyOn(service, 'initProject');
        yield service.init();
        expect(initProjectSpy).toHaveBeenCalled();
    }));
    it('should cleanup when initializing the Angular CLI if a project was initialized before', () => __awaiter(void 0, void 0, void 0, function* () {
        const cleanupSpy = spyOn(service, 'cleanup');
        setValuesToInitializeProject();
        yield service.init();
        expect(cleanupSpy).not.toHaveBeenCalled();
        setValuesToInitializeAngularCLI();
        yield service.init();
        expect(cleanupSpy).toHaveBeenCalledOnceWith();
    }));
    it('should cleanup when initializing a project if the Angular CLI was initialized before', () => __awaiter(void 0, void 0, void 0, function* () {
        const cleanupSpy = spyOn(service, 'cleanup');
        setValuesToInitializeAngularCLI();
        yield service.init();
        expect(cleanupSpy).not.toHaveBeenCalled();
        setValuesToInitializeProject();
        yield service.init();
        expect(cleanupSpy).toHaveBeenCalledOnceWith();
    }));
    it("should set the error state when an out of memory message is received from the web container's output", () => __awaiter(void 0, void 0, void 0, function* () {
        service['webContainerPromise'] = Promise.resolve(new docs_1.FakeWebContainer());
        setValuesToCatchOutOfMemoryError();
        yield service.init();
        expect(service['nodeRuntimeState'].error().message).toBe(node_runtime_sandbox_service_1.OUT_OF_MEMORY_MSG);
        expect(service['nodeRuntimeState'].loadingStep()).toBe(loading_steps_1.LoadingStep.ERROR);
    }));
    it('should run reset only once when called twice', () => __awaiter(void 0, void 0, void 0, function* () {
        const cleanupSpy = spyOn(service, 'cleanup');
        const initSpy = spyOn(service, 'init');
        setValuesToInitializeProject();
        const resetPromise = service.reset();
        const secondResetPromise = service.reset();
        yield Promise.all([resetPromise, secondResetPromise]);
        expect(cleanupSpy).toHaveBeenCalledOnceWith();
        expect(initSpy).toHaveBeenCalledOnceWith();
    }));
    it('should delete files on project change', () => __awaiter(void 0, void 0, void 0, function* () {
        service['webContainerPromise'] = Promise.resolve(new docs_1.FakeWebContainer());
        setValuesToInitializeProject();
        yield service.init();
        const filesToDeleteFromPreviousProject = ['deleteme.ts'];
        service['embeddedTutorialManager'] = Object.assign(Object.assign({}, fakeEmbeddedTutorialManager), { filesToDeleteFromPreviousProject: (0, core_1.signal)(new Set(filesToDeleteFromPreviousProject)) });
        const createdFiles = ['created.ts'];
        service['_createdFiles'].set(new Set(createdFiles));
        const deleteFileSpy = spyOn(service, 'deleteFile');
        tutorialChanged$.next(true);
        const allFilesToDelete = [...createdFiles, ...filesToDeleteFromPreviousProject];
        for (const fileToDelete of allFilesToDelete) {
            expect(deleteFileSpy).toHaveBeenCalledWith(fileToDelete);
        }
    }));
    it('should not have any filePath starting with "/" in solutions files', () => __awaiter(void 0, void 0, void 0, function* () {
        service['webContainerPromise'] = Promise.resolve(new docs_1.FakeWebContainer());
        setValuesToInitializeProject();
        yield service.init();
        const files = yield service.getSolutionFiles();
        expect(files.length).toBe(1);
        expect(files[0].path).toBe('fake-file');
    }));
});
