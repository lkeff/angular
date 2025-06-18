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
exports.Preview = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const loading_steps_1 = require("../enums/loading-steps");
const node_runtime_sandbox_service_1 = require("../node-runtime-sandbox.service");
const node_runtime_state_service_1 = require("../node-runtime-state.service");
const preview_error_component_1 = require("./preview-error.component");
let Preview = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'docs-tutorial-preview',
            templateUrl: './preview.component.html',
            styleUrls: ['./preview.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [preview_error_component_1.PreviewError],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Preview = _classThis = class {
        constructor() {
            this.domSanitizer = (0, core_1.inject)(platform_browser_1.DomSanitizer);
            this.nodeRuntimeSandbox = (0, core_1.inject)(node_runtime_sandbox_service_1.NodeRuntimeSandbox);
            this.nodeRuntimeState = (0, core_1.inject)(node_runtime_state_service_1.NodeRuntimeState);
            this.loadingProgressValue = this.nodeRuntimeState.loadingStep;
            this.loadingEnum = loading_steps_1.LoadingStep;
            this.previewUrl = (0, rxjs_interop_1.toSignal)(this.nodeRuntimeSandbox.previewUrl$, { initialValue: null });
            this.previewUrlForIFrame = (0, core_1.computed)(() => {
                const url = this.previewUrl();
                return url !== null ? this.domSanitizer.bypassSecurityTrustResourceUrl(url) : null;
            });
        }
    };
    __setFunctionName(_classThis, "Preview");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Preview = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Preview = _classThis;
})();
exports.Preview = Preview;
