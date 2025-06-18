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
exports.NodeRuntimeState = exports.ErrorType = exports.WEBCONTAINERS_COUNTER_KEY = exports.MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = void 0;
const core_1 = require("@angular/core");
const docs_1 = require("@angular/docs");
const loading_steps_1 = require("./enums/loading-steps");
const node_runtime_sandbox_service_1 = require("./node-runtime-sandbox.service");
exports.MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = 3;
exports.WEBCONTAINERS_COUNTER_KEY = 'numberOfWebcontainers';
var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["UNKNOWN"] = 0] = "UNKNOWN";
    ErrorType[ErrorType["COOKIES"] = 1] = "COOKIES";
    ErrorType[ErrorType["OUT_OF_MEMORY"] = 2] = "OUT_OF_MEMORY";
    ErrorType[ErrorType["UNSUPPORTED_BROWSER_ENVIRONMENT"] = 3] = "UNSUPPORTED_BROWSER_ENVIRONMENT";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
let NodeRuntimeState = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NodeRuntimeState = _classThis = class {
        constructor() {
            this._loadingStep = (0, core_1.signal)(loading_steps_1.LoadingStep.NOT_STARTED);
            this.loadingStep = this._loadingStep.asReadonly();
            this._isResetting = (0, core_1.signal)(false);
            this.isResetting = this._isResetting.asReadonly();
            this._error = (0, core_1.signal)(undefined);
            this.error = this._error.asReadonly();
            this.checkUnsupportedEnvironment();
        }
        setLoadingStep(step) {
            this._loadingStep.set(step);
        }
        setIsResetting(isResetting) {
            this._isResetting.set(isResetting);
        }
        setError({ message, type }) {
            type !== null && type !== void 0 ? type : (type = this.getErrorType(message));
            this._error.set({ message, type });
            this.setLoadingStep(loading_steps_1.LoadingStep.ERROR);
        }
        getErrorType(message) {
            if (message === null || message === void 0 ? void 0 : message.includes(node_runtime_sandbox_service_1.OUT_OF_MEMORY_MSG)) {
                return ErrorType.OUT_OF_MEMORY;
            }
            if (message === null || message === void 0 ? void 0 : message.toLowerCase().includes('service worker')) {
                return ErrorType.COOKIES;
            }
            return ErrorType.UNKNOWN;
        }
        /**
         * This method defines whether the current environment is compatible
         * with the NodeRuntimeSandbox. The embedded editor requires significant
         * CPU and memory resources and can not be ran in all browsers/devices. More
         * specifically, mobile devices are affected by this, so for the best user
         * experience (to avoid crashes), we disable the NodeRuntimeSandbox and
         * recommend using desktop.
         */
        checkUnsupportedEnvironment() {
            if (docs_1.isIos) {
                this.setError({
                    message: 'Unsupported environment',
                    type: ErrorType.UNSUPPORTED_BROWSER_ENVIRONMENT,
                });
            }
        }
    };
    __setFunctionName(_classThis, "NodeRuntimeState");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NodeRuntimeState = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NodeRuntimeState = _classThis;
})();
exports.NodeRuntimeState = NodeRuntimeState;
