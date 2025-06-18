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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopySourceCodeButton = exports.CONFIRMATION_DISPLAY_TIME_MS = exports.REMOVED_LINE_CLASS_NAME = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const clipboard_1 = require("@angular/cdk/clipboard");
const icon_component_1 = require("../icon/icon.component");
exports.REMOVED_LINE_CLASS_NAME = '.line.remove';
exports.CONFIRMATION_DISPLAY_TIME_MS = 2000;
let CopySourceCodeButton = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'button[docs-copy-source-code]',
            imports: [common_1.CommonModule, icon_component_1.IconComponent],
            templateUrl: './copy-source-code-button.component.html',
            host: {
                'type': 'button',
                'aria-label': 'Copy example source to clipboard',
                'title': 'Copy example source',
                '(click)': 'copySourceCode()',
                '[class.docs-copy-source-code-button-success]': 'showCopySuccess()',
                '[class.docs-copy-source-code-button-failed]': 'showCopyFailure()',
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CopySourceCodeButton = _classThis = class {
        constructor() {
            this.changeDetector = (0, core_1.inject)(core_1.ChangeDetectorRef);
            this.clipboard = (0, core_1.inject)(clipboard_1.Clipboard);
            this.elementRef = (0, core_1.inject)(core_1.ElementRef);
            this.showCopySuccess = (0, core_1.signal)(false);
            this.showCopyFailure = (0, core_1.signal)(false);
        }
        copySourceCode() {
            try {
                const codeElement = this.elementRef.nativeElement.parentElement.querySelector('code');
                const sourceCode = this.getSourceCode(codeElement);
                this.clipboard.copy(sourceCode);
                this.showResult(this.showCopySuccess);
            }
            catch (_a) {
                this.showResult(this.showCopyFailure);
            }
        }
        getSourceCode(codeElement) {
            this.showCopySuccess.set(false);
            this.showCopyFailure.set(false);
            const removedLines = codeElement.querySelectorAll(exports.REMOVED_LINE_CLASS_NAME);
            if (removedLines.length) {
                // Get only those lines which are not marked as removed
                const formattedText = Array.from(codeElement.querySelectorAll('.line:not(.remove)'))
                    .map((line) => line.innerText)
                    .join('\n');
                return formattedText.trim();
            }
            else {
                const text = codeElement.innerText || '';
                return text.replace(/\n\n\n/g, ``).trim();
            }
        }
        showResult(messageState) {
            messageState.set(true);
            setTimeout(() => {
                messageState.set(false);
                // It's required for code snippets embedded in the ExampleViewer.
                this.changeDetector.markForCheck();
            }, exports.CONFIRMATION_DISPLAY_TIME_MS);
        }
    };
    __setFunctionName(_classThis, "CopySourceCodeButton");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CopySourceCodeButton = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CopySourceCodeButton = _classThis;
})();
exports.CopySourceCodeButton = CopySourceCodeButton;
