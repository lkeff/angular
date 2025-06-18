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
exports.FakeEmbeddedTutorialManager = void 0;
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const rxjs_1 = require("rxjs");
const state_1 = require("@codemirror/state");
const node_runtime_sandbox_service_1 = require("../node-runtime-sandbox.service");
const embedded_tutorial_manager_service_1 = require("../embedded-tutorial-manager.service");
const code_mirror_editor_service_1 = require("./code-mirror-editor.service");
class FakeNodeRuntimeSandbox {
    constructor() {
        this.createdFile$ = new rxjs_1.Subject();
    }
    writeFile(path, content) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    readFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve('content');
        });
    }
}
const files = ['1.ts', '2.ts', '3.ts'];
// reverse the files list to test openFiles order
const filesReverse = [...files].reverse();
class FakeEmbeddedTutorialManager {
    constructor() {
        this.commonFilesystemTree = (0, core_1.signal)(null);
        this.previousTutorial = (0, core_1.signal)(undefined);
        this.nextTutorial = (0, core_1.signal)(undefined);
        this.tutorialId = (0, core_1.signal)('fake-tutorial');
        this.tutorialFiles = (0, core_1.signal)(
        // use a reverse map to test openFiles order
        Object.fromEntries(filesReverse.map((file) => [file, ''])));
        this.openFiles = (0, core_1.signal)(files);
        this.tutorialFilesystemTree = (0, core_1.signal)(Object.fromEntries(files.map((file) => [
            file,
            {
                file: {
                    contents: this.tutorialFiles()[0],
                },
            },
        ])));
        this._shouldChangeTutorial$ = new rxjs_1.BehaviorSubject(false);
        this.tutorialChanged$ = this._shouldChangeTutorial$.asObservable();
    }
    fetchAndSetTutorialFiles(tutorial) {
        return Promise.resolve();
    }
    fetchCommonFiles() {
        return Promise.resolve({});
    }
}
exports.FakeEmbeddedTutorialManager = FakeEmbeddedTutorialManager;
describe('CodeMirrorEditor', () => {
    let service;
    const fakeNodeRuntimeSandbox = new FakeNodeRuntimeSandbox();
    const fakeEmbeddedTutorialManager = new FakeEmbeddedTutorialManager();
    function dispatchDocumentChange(newContent) {
        var _a;
        for (let i = 0; i < newContent.length; i++) {
            (_a = service['_editorView']) === null || _a === void 0 ? void 0 : _a.dispatch({
                changes: { from: i, insert: newContent[i] },
                selection: { anchor: i, head: 0 },
            });
        }
    }
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                code_mirror_editor_service_1.CodeMirrorEditor,
                {
                    provide: node_runtime_sandbox_service_1.NodeRuntimeSandbox,
                    useValue: fakeNodeRuntimeSandbox,
                },
                {
                    provide: embedded_tutorial_manager_service_1.EmbeddedTutorialManager,
                    useValue: fakeEmbeddedTutorialManager,
                },
            ],
        });
        service = testing_1.TestBed.inject(code_mirror_editor_service_1.CodeMirrorEditor);
        const parentElement = document.createElement('div');
        service.init(parentElement);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should initialize the editor', () => {
        expect(service['_editorView']).toBeDefined();
        expect(service.files()).toBeDefined();
        expect(service.currentFile()).toBeDefined();
        const editorState = service['_editorStates'].get(service.currentFile().filename);
        expect(editorState).toBeInstanceOf(state_1.EditorState);
    });
    it('should change the current file', () => {
        var _a;
        const newFilename = files.at(-1);
        service.changeCurrentFile(newFilename);
        expect(service.currentFile().filename).toEqual(newFilename);
        const editorState = service['_editorStates'].get(newFilename);
        const editorContent = editorState === null || editorState === void 0 ? void 0 : editorState.doc.toString();
        const newFileContent = (_a = service.files().find((file) => file.filename === newFilename)) === null || _a === void 0 ? void 0 : _a.content;
        expect(editorContent).toBe(newFileContent);
    });
    it('should update the current file content on change', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const newContent = 'new content';
        dispatchDocumentChange(newContent);
        const updatedEditorState = service['_editorStates'].get(service.currentFile().filename);
        expect(updatedEditorState === null || updatedEditorState === void 0 ? void 0 : updatedEditorState.doc.toString()).toBe(newContent);
        const fileContentOnFilesSignal = (_a = service
            .files()
            .find((file) => file.filename === service.currentFile().filename)) === null || _a === void 0 ? void 0 : _a.content;
        expect(fileContentOnFilesSignal).toBe(newContent);
        expect(service.currentFile().content).toBe(newContent);
    }));
    it('should write the changed file content to the sandbox filesystem', () => {
        jasmine.clock().install();
        jasmine.clock().mockDate();
        const newContent = 'new content';
        const nodeRuntimeSandboxSpy = spyOn(fakeNodeRuntimeSandbox, 'writeFile');
        dispatchDocumentChange(newContent);
        jasmine.clock().tick(code_mirror_editor_service_1.EDITOR_CONTENT_CHANGE_DELAY_MILLIES);
        expect(nodeRuntimeSandboxSpy).toHaveBeenCalledWith(service.currentFile().filename, newContent);
        jasmine.clock().uninstall();
    });
    it('should add created file to code editor', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFile = 'new-component.component.ts';
        yield service['addCreatedFileToCodeEditor'](newFile);
        expect(service['embeddedTutorialManager'].tutorialFiles()[newFile]).toBeDefined();
        expect(service.files().find((file) => file.filename === newFile)).toBeDefined();
    }));
    it('should keep openFiles order', () => {
        service['setProjectFiles']();
        for (const [index, openFile] of service['openFiles']().entries()) {
            expect(openFile.filename).toEqual(service['embeddedTutorialManager'].openFiles()[index]);
        }
    });
});
