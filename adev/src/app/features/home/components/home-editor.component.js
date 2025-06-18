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
exports.CodeEditorComponent = void 0;
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const rxjs_1 = require("rxjs");
const editor_1 = require("../../../editor");
let CodeEditorComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-code-editor',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [editor_1.EmbeddedEditor],
            template: `
    <embedded-editor />
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _tutorialFiles_decorators;
    let _tutorialFiles_initializers = [];
    let _tutorialFiles_extraInitializers = [];
    var CodeEditorComponent = _classThis = class {
        ngOnInit() {
            this.loadEmbeddedEditor();
        }
        loadEmbeddedEditor() {
            // If using `async-await`, `this` will be captured until the function is executed
            // and completed, which can lead to a memory leak if the user navigates away from
            // this component to another page.
            (0, rxjs_1.forkJoin)([
                (0, editor_1.injectNodeRuntimeSandbox)(this.environmentInjector),
                (0, editor_1.injectEmbeddedTutorialManager)(this.environmentInjector),
            ])
                .pipe((0, rxjs_1.switchMap)(([nodeRuntimeSandbox, embeddedTutorialManager]) => embeddedTutorialManager
                .fetchAndSetTutorialFiles(this.tutorialFiles)
                .then(() => nodeRuntimeSandbox)), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe((nodeRuntimeSandbox) => {
                this.cdRef.markForCheck();
                nodeRuntimeSandbox.init();
            });
        }
        constructor() {
            this.cdRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
            this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.tutorialFiles = __runInitializers(this, _tutorialFiles_initializers, void 0);
            __runInitializers(this, _tutorialFiles_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "CodeEditorComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tutorialFiles_decorators = [(0, core_1.Input)({ required: true })];
        __esDecorate(null, null, _tutorialFiles_decorators, { kind: "field", name: "tutorialFiles", static: false, private: false, access: { has: obj => "tutorialFiles" in obj, get: obj => obj.tutorialFiles, set: (obj, value) => { obj.tutorialFiles = value; } }, metadata: _metadata }, _tutorialFiles_initializers, _tutorialFiles_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CodeEditorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CodeEditorComponent = _classThis;
})();
exports.CodeEditorComponent = CodeEditorComponent;
