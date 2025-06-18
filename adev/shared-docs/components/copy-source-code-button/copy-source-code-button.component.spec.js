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
const copy_source_code_button_component_1 = require("./copy-source-code-button.component");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const clipboard_1 = require("@angular/cdk/clipboard");
const SUCCESSFULLY_COPY_CLASS_NAME = 'docs-copy-source-code-button-success';
const FAILED_COPY_CLASS_NAME = 'docs-copy-source-code-button-failed';
describe('CopySourceCodeButton', () => {
    let component;
    let fixture;
    let copySpy;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            imports: [CodeSnippetWrapper],
            providers: [(0, core_1.provideZonelessChangeDetection)()],
        });
        fixture = testing_1.TestBed.createComponent(CodeSnippetWrapper);
        component = fixture.componentInstance;
        yield fixture.whenStable();
    }));
    beforeEach(() => {
        const clipboardService = testing_1.TestBed.inject(clipboard_1.Clipboard);
        copySpy = spyOn(clipboardService, 'copy');
    });
    it('should call clipboard service when clicked on copy source code', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedCodeToBeCopied = 'npm install -g @angular/cli';
        component.code.set(expectedCodeToBeCopied);
        yield fixture.whenStable();
        const button = fixture.debugElement.query(platform_browser_1.By.directive(copy_source_code_button_component_1.CopySourceCodeButton)).nativeElement;
        button.click();
        expect(copySpy.calls.argsFor(0)[0].trim()).toBe(expectedCodeToBeCopied);
    }));
    it('should not copy lines marked as deleted when code snippet contains diff', () => __awaiter(void 0, void 0, void 0, function* () {
        const codeInHtmlFormat = `
    <code>
      <div class="line remove"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let product of products"</span>&gt;</span></div>
      <div class="line add"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let product of products()"</span>&gt;</span></div>
    </code>
    `;
        const expectedCodeToBeCopied = `<div *ngFor="let product of products()">`;
        component.code.set(codeInHtmlFormat);
        yield fixture.whenStable();
        const button = fixture.debugElement.query(platform_browser_1.By.directive(copy_source_code_button_component_1.CopySourceCodeButton)).nativeElement;
        button.click();
        expect(copySpy.calls.argsFor(0)[0].trim()).toBe(expectedCodeToBeCopied);
    }));
    it(`should set ${SUCCESSFULLY_COPY_CLASS_NAME} for ${copy_source_code_button_component_1.CONFIRMATION_DISPLAY_TIME_MS} ms when copy was executed properly`, (0, testing_1.fakeAsync)(() => {
        component.code.set('example');
        fixture.detectChanges();
        const button = fixture.debugElement.query(platform_browser_1.By.directive(copy_source_code_button_component_1.CopySourceCodeButton)).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(button).toHaveClass(SUCCESSFULLY_COPY_CLASS_NAME);
        (0, testing_1.tick)(copy_source_code_button_component_1.CONFIRMATION_DISPLAY_TIME_MS);
        fixture.detectChanges();
        expect(button).not.toHaveClass(SUCCESSFULLY_COPY_CLASS_NAME);
    }));
    it(`should set ${FAILED_COPY_CLASS_NAME} for ${copy_source_code_button_component_1.CONFIRMATION_DISPLAY_TIME_MS} ms when copy failed`, (0, testing_1.fakeAsync)(() => {
        component.code.set('example');
        copySpy.and.throwError('Fake copy error');
        fixture.detectChanges();
        const button = fixture.debugElement.query(platform_browser_1.By.directive(copy_source_code_button_component_1.CopySourceCodeButton)).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(button).toHaveClass(FAILED_COPY_CLASS_NAME);
        (0, testing_1.tick)(copy_source_code_button_component_1.CONFIRMATION_DISPLAY_TIME_MS);
        fixture.detectChanges();
        expect(button).not.toHaveClass(FAILED_COPY_CLASS_NAME);
    }));
});
let CodeSnippetWrapper = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    <pre>
      <code [innerHtml]="code()"></code>
    </pre>
    <button docs-copy-source-code></button>
  `,
            imports: [copy_source_code_button_component_1.CopySourceCodeButton],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CodeSnippetWrapper = _classThis = class {
        constructor() {
            this.code = (0, core_1.signal)('');
        }
    };
    __setFunctionName(_classThis, "CodeSnippetWrapper");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CodeSnippetWrapper = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CodeSnippetWrapper = _classThis;
})();
