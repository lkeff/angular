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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const docs_1 = require("@angular/docs");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const router_1 = require("@angular/router");
const rxjs_1 = require("rxjs");
const editor_1 = require("../../editor");
const node_runtime_sandbox_service_1 = require("../../editor/node-runtime-sandbox.service");
const inject_async_1 = require("../../core/services/inject-async");
const tutorial_component_1 = __importDefault(require("./tutorial.component"));
let FakeEmbeddedEditor = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: editor_1.EMBEDDED_EDITOR_SELECTOR,
            template: '<div>FakeEmbeddedEditor</div>',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FakeEmbeddedEditor = _classThis = class {
    };
    __setFunctionName(_classThis, "FakeEmbeddedEditor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FakeEmbeddedEditor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FakeEmbeddedEditor = _classThis;
})();
let FakeDocViewer = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: docs_1.DOCS_VIEWER_SELECTOR,
            template: '<div>FakeDocsViewer</div>',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _documentFilePath_decorators;
    let _documentFilePath_initializers = [];
    let _documentFilePath_extraInitializers = [];
    var FakeDocViewer = _classThis = class {
        constructor() {
            this.documentFilePath = __runInitializers(this, _documentFilePath_initializers, void 0);
            __runInitializers(this, _documentFilePath_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "FakeDocViewer");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _documentFilePath_decorators = [(0, core_1.Input)('documentFilePath')];
        __esDecorate(null, null, _documentFilePath_decorators, { kind: "field", name: "documentFilePath", static: false, private: false, access: { has: obj => "documentFilePath" in obj, get: obj => obj.documentFilePath, set: (obj, value) => { obj.documentFilePath = value; } }, metadata: _metadata }, _documentFilePath_initializers, _documentFilePath_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FakeDocViewer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FakeDocViewer = _classThis;
})();
// TODO: export this class, it's a helpful mock we could you on other tests.
class FakeNodeRuntimeSandbox {
    constructor() {
        this.loadingStep = (0, core_1.signal)(0);
        this.previewUrl$ = (0, rxjs_1.of)();
    }
    writeFile(path, content) {
        return Promise.resolve();
    }
    init() {
        return Promise.resolve();
    }
}
describe('Tutorial', () => {
    let component;
    let fixture;
    const fakeWindow = {
        addEventListener: () => { },
        removeEventListener: () => { },
    };
    const fakeEmbeddedTutorialManager = {
        tutorialFiles: (0, core_1.signal)({ 'app.component.ts': 'original' }),
        answerFiles: (0, core_1.signal)({ 'app.component.ts': 'answer' }),
        type: (0, core_1.signal)(docs_1.TutorialType.EDITOR),
        revealAnswer: () => { },
        resetRevealAnswer: () => { },
        tutorialChanged$: (0, rxjs_1.of)(false),
        openFiles: (0, core_1.signal)(['app.component.ts']),
    };
    function setupRevealAnswerValues() {
        component['shouldRenderRevealAnswer'].set(true);
        component['canRevealAnswer'] = (0, core_1.signal)(true);
        component['embeddedTutorialManager'].answerFiles.set({ 'app.component.ts': 'answer' });
    }
    function setupDisabledRevealAnswerValues() {
        component['shouldRenderRevealAnswer'].set(true);
        component['canRevealAnswer'] = (0, core_1.signal)(false);
        component['embeddedTutorialManager'].answerFiles.set({ 'app.component.ts': 'answer' });
    }
    function setupNoRevealAnswerValues() {
        component['shouldRenderRevealAnswer'].set(false);
        component['canRevealAnswer'] = (0, core_1.signal)(true);
        component['embeddedTutorialManager'].answerFiles.set({});
    }
    function setupResetRevealAnswerValues() {
        setupRevealAnswerValues();
        component['answerRevealed'].set(true);
    }
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            imports: [tutorial_component_1.default, editor_1.EmbeddedEditor, docs_1.DocViewer],
            providers: [
                (0, router_1.provideRouter)([]),
                {
                    provide: docs_1.WINDOW,
                    useValue: fakeWindow,
                },
                {
                    provide: editor_1.EmbeddedTutorialManager,
                    useValue: fakeEmbeddedTutorialManager,
                },
                (0, inject_async_1.mockAsyncProvider)(node_runtime_sandbox_service_1.NodeRuntimeSandbox, FakeNodeRuntimeSandbox),
            ],
        });
        testing_1.TestBed.overrideComponent(tutorial_component_1.default, {
            remove: {
                imports: [docs_1.DocViewer],
            },
            add: {
                imports: [FakeDocViewer],
            },
        });
        yield testing_1.TestBed.compileComponents();
        fixture = testing_1.TestBed.createComponent(tutorial_component_1.default);
        component = fixture.componentInstance;
        // Replace EmbeddedEditor with FakeEmbeddedEditor
        spyOn(component, 'loadEmbeddedEditorComponent').and.resolveTo(FakeEmbeddedEditor);
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // TODO: Add tests in a future PR
    // it('should render the embedded editor based on the tutorial config', () => {});
    // it('should not render the embedded editor based on the tutorial config', () => {});
    // it('should load the tutorial', () => {});
    it('should reset the reveal answer', () => __awaiter(void 0, void 0, void 0, function* () {
        setupResetRevealAnswerValues();
        fixture.detectChanges();
        const revealAnswerButton = component.revealAnswerButton();
        if (!revealAnswerButton)
            throw new Error('revealAnswerButton is undefined');
        const revealAnswerSpy = spyOn(component['embeddedTutorialManager'], 'revealAnswer');
        const resetRevealAnswerSpy = spyOn(component['embeddedTutorialManager'], 'resetRevealAnswer');
        revealAnswerButton.nativeElement.click();
        expect(revealAnswerSpy).not.toHaveBeenCalled();
        expect(resetRevealAnswerSpy).toHaveBeenCalled();
    }));
    it('should reveal the answer on button click', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        setupRevealAnswerValues();
        fixture.detectChanges();
        const revealAnswerButton = component.revealAnswerButton();
        if (!revealAnswerButton)
            throw new Error('revealAnswerButton is undefined');
        const embeddedTutorialManagerRevealAnswerSpy = spyOn(component['embeddedTutorialManager'], 'revealAnswer');
        revealAnswerButton.nativeElement.click();
        expect(embeddedTutorialManagerRevealAnswerSpy).toHaveBeenCalled();
        yield fixture.whenStable();
        fixture.detectChanges();
        expect((_a = revealAnswerButton.nativeElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()).toBe('Reset');
    }));
    it('should not reveal the answer when button is disabled', () => __awaiter(void 0, void 0, void 0, function* () {
        setupDisabledRevealAnswerValues();
        fixture.detectChanges();
        const revealAnswerButton = component.revealAnswerButton();
        if (!revealAnswerButton)
            throw new Error('revealAnswerButton is undefined');
        spyOn(component, 'canRevealAnswer').and.returnValue(false);
        const handleRevealAnswerSpy = spyOn(component, 'handleRevealAnswer');
        revealAnswerButton.nativeElement.click();
        expect(revealAnswerButton.nativeElement.getAttribute('disabled')).toBeDefined();
        expect(handleRevealAnswerSpy).not.toHaveBeenCalled();
    }));
    it('should not render the reveal answer button when there are no answers', () => {
        setupNoRevealAnswerValues();
        fixture.detectChanges();
        expect(component.revealAnswerButton()).toBe(undefined);
    });
});
