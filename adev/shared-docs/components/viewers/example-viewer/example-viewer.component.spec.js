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
const testing_1 = require("@angular/core/testing");
const example_viewer_component_1 = require("./example-viewer.component");
const providers_1 = require("../../../providers");
const core_1 = require("@angular/core");
const testbed_1 = require("@angular/cdk/testing/testbed");
const clipboard_1 = require("@angular/cdk/clipboard");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/material/tabs/testing");
const copy_source_code_button_component_1 = require("../../copy-source-code-button/copy-source-code-button.component");
const router_1 = require("@angular/router");
describe('ExampleViewer', () => {
    let component;
    let componentRef;
    let fixture;
    let loader;
    let exampleContentSpy;
    beforeEach(() => {
        exampleContentSpy = jasmine.createSpyObj('ExampleContentLoader', ['loadPreview']);
    });
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [example_viewer_component_1.ExampleViewer],
            providers: [
                // TODO: Find why tests warn that zone.js is still loaded
                (0, core_1.provideZonelessChangeDetection)(),
                { provide: providers_1.EXAMPLE_VIEWER_CONTENT_LOADER, useValue: exampleContentSpy },
                { provide: router_1.ActivatedRoute, useValue: { snapshot: { fragment: 'fragment' } } },
            ],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(example_viewer_component_1.ExampleViewer);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
        loader = testbed_1.TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    }));
    it('should set file extensions as tab names when all files have different extension', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        componentRef.setInput('metadata', getMetadata({
            files: [
                { name: 'file.ts', content: '' },
                { name: 'file.html', content: '' },
                { name: 'file.css', content: '' },
            ],
        }));
        yield component.renderExample();
        expect(component.tabs().length).toBe(3);
        expect(component.tabs()[0].name).toBe('TS');
        expect(component.tabs()[1].name).toBe('HTML');
        expect(component.tabs()[2].name).toBe('CSS');
    })));
    it('should generate correct code content for multi file mode when it is expanded', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        componentRef.setInput('metadata', getMetadata({
            files: [
                { name: 'file.ts', content: 'typescript file' },
                { name: 'file.html', content: 'html file' },
                { name: 'file.css', content: 'css file' },
            ],
        }));
        yield component.renderExample();
        expect(component.tabs().length).toBe(3);
        expect(component.tabs()[0].code).toBe('typescript file');
        expect(component.tabs()[1].code).toBe('html file');
        expect(component.tabs()[2].code).toBe('css file');
    })));
    it('should set file names as tab names when there is at least one duplication', () => __awaiter(void 0, void 0, void 0, function* () {
        componentRef.setInput('metadata', getMetadata({
            files: [
                { name: 'example.ts', content: 'typescript file' },
                { name: 'example.html', content: 'html file' },
                { name: 'another-example.ts', content: 'css file' },
            ],
        }));
        yield component.renderExample();
        expect(component.tabs().length).toBe(3);
        expect(component.tabs()[0].name).toBe('example.ts');
        expect(component.tabs()[1].name).toBe('example.html');
        expect(component.tabs()[2].name).toBe('another-example.ts');
    }));
    it('should expand button not appear when there is no hidden line', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        componentRef.setInput('metadata', getMetadata());
        yield component.renderExample();
        const button = fixture.debugElement.query(platform_browser_1.By.css('button[aria-label="Expand code example"]'));
        expect(button).toBeNull();
    })));
    it('should have line with hidden line class when expand button is present', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        const expectedCodeSnippetContent = 'typescript code<br/>' + '<div class="line">hidden line</div>';
        componentRef.setInput('metadata', getMetadata({
            files: [
                {
                    name: 'example.ts',
                    content: `<pre><code>${expectedCodeSnippetContent}</code></pre>`,
                    visibleLinesRange: '[1]',
                },
            ],
        }));
        yield component.renderExample();
        fixture.detectChanges();
        const hiddenLine = fixture.debugElement.query(platform_browser_1.By.css('div[class="line hidden"]'));
        expect(hiddenLine).toBeTruthy();
    })));
    it('should have no more line with hidden line class when expand button is clicked', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        const expectedCodeSnippetContent = 'typescript code<br/>' + '<div class="line">hidden line</div>';
        componentRef.setInput('metadata', getMetadata({
            files: [
                {
                    name: 'example.ts',
                    content: `<pre><code>${expectedCodeSnippetContent}</code></pre>`,
                    visibleLinesRange: '[1]',
                },
            ],
        }));
        yield component.renderExample();
        fixture.detectChanges();
        const expandButton = fixture.debugElement.query(platform_browser_1.By.css('button[aria-label="Expand code example"]'));
        expandButton.nativeElement.click();
        fixture.detectChanges();
        const hiddenLine = fixture.debugElement.query(platform_browser_1.By.css('div[class="line hidden"]'));
        expect(hiddenLine).toBeNull();
    })));
    it('should set exampleComponent when metadata contains path and preview is true', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        exampleContentSpy.loadPreview.and.resolveTo(ExampleComponent);
        componentRef.setInput('metadata', getMetadata({
            path: 'example.ts',
            preview: true,
        }));
        yield component.renderExample();
        expect(component.exampleComponent).toBe(ExampleComponent);
    })));
    it('should display GitHub button when githubUrl is provided and there is preview', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        exampleContentSpy.loadPreview.and.resolveTo(ExampleComponent);
        componentRef.setInput('metadata', getMetadata({
            path: 'example.ts',
            preview: true,
        }));
        componentRef.setInput('githubUrl', 'https://github.com/');
        yield component.renderExample();
        fixture.detectChanges();
        const githubButton = fixture.debugElement.query(platform_browser_1.By.css('a[aria-label="Open example on GitHub"]'));
        expect(githubButton).toBeTruthy();
        expect(githubButton.nativeElement.href).toBe(component.githubUrl);
    })));
    it('should display StackBlitz button when stackblitzUrl is provided and there is preview', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        exampleContentSpy.loadPreview.and.resolveTo(ExampleComponent);
        componentRef.setInput('metadata', getMetadata({
            path: 'example.ts',
            preview: true,
        }));
        component.stackblitzUrl = 'https://stackblitz.com/';
        yield component.renderExample();
        fixture.detectChanges();
        const stackblitzButton = fixture.debugElement.query(platform_browser_1.By.css('a[aria-label="Edit this example in StackBlitz"]'));
        expect(stackblitzButton).toBeTruthy();
        expect(stackblitzButton.nativeElement.href).toBe(component.stackblitzUrl);
    })));
    it('should set expanded flag in metadata after toggleExampleVisibility', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        componentRef.setInput('metadata', getMetadata());
        yield component.renderExample();
        component.toggleExampleVisibility();
        expect(component.expanded()).toBeTrue();
        const tabGroup = yield loader.getHarness(testing_2.MatTabGroupHarness);
        const tab = yield tabGroup.getSelectedTab();
        expect(yield tab.getLabel()).toBe('TS');
        component.toggleExampleVisibility();
        expect(component.expanded()).toBeFalse();
    })));
    // TODO(josephperrott): enable once the docs-viewer/example-viewer circle is sorted out.
    xit('should call clipboard service when clicked on copy source code', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const expectedCodeSnippetContent = 'typescript code';
        componentRef.setInput('metadata', getMetadata({
            files: [
                {
                    name: 'example.ts',
                    content: `<pre><code>${expectedCodeSnippetContent}</code></pre>`,
                },
                { name: 'example.css', content: '' },
            ],
        }));
        const clipboardService = testing_1.TestBed.inject(clipboard_1.Clipboard);
        const spy = spyOn(clipboardService, 'copy');
        yield component.renderExample();
        const button = fixture.debugElement.query(platform_browser_1.By.directive(copy_source_code_button_component_1.CopySourceCodeButton)).nativeElement;
        button.click();
        expect((_a = spy.calls.argsFor(0)[0]) === null || _a === void 0 ? void 0 : _a.trim()).toBe(expectedCodeSnippetContent);
    })));
    it('should call clipboard service when clicked on copy example link', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
        componentRef.setInput('metadata', getMetadata());
        component.expanded.set(true);
        fixture.detectChanges();
        const clipboardService = testing_1.TestBed.inject(clipboard_1.Clipboard);
        const spy = spyOn(clipboardService, 'copy');
        yield component.renderExample();
        const button = fixture.debugElement.query(platform_browser_1.By.css('button.docs-example-copy-link')).nativeElement;
        button.click();
        expect(spy.calls.argsFor(0)[0].trim()).toBe(`${window.origin}/context.html#example-1`);
    })));
});
const getMetadata = (value = {}) => {
    return Object.assign({ id: 1, files: [
            { name: 'example.ts', content: '' },
            { name: 'example.css', content: '' },
        ], preview: false }, value);
};
let ExampleComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExampleComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ExampleComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleComponent = _classThis;
})();
