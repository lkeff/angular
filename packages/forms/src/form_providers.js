"use strict";
/**
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
exports.ReactiveFormsModule = exports.FormsModule = void 0;
const core_1 = require("@angular/core");
const directives_1 = require("./directives");
const shared_1 = require("./directives/shared");
/**
 * Exports the required providers and directives for template-driven forms,
 * making them available for import by NgModules that import this module.
 *
 * @see [Forms Overview](guide/forms)
 * @see [Template-driven Forms Guide](guide/forms)
 *
 * @publicApi
 */
let FormsModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: directives_1.TEMPLATE_DRIVEN_DIRECTIVES,
            exports: [directives_1.InternalFormsSharedModule, directives_1.TEMPLATE_DRIVEN_DIRECTIVES],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormsModule = _classThis = class {
        /**
         * @description
         * Provides options for configuring the forms module.
         *
         * @param opts An object of configuration options
         * * `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
         * correct, or to only call it `whenDisabled`, which is the legacy behavior.
         */
        static withConfig(opts) {
            var _a;
            return {
                ngModule: FormsModule,
                providers: [
                    {
                        provide: shared_1.CALL_SET_DISABLED_STATE,
                        useValue: (_a = opts.callSetDisabledState) !== null && _a !== void 0 ? _a : shared_1.setDisabledStateDefault,
                    },
                ],
            };
        }
    };
    __setFunctionName(_classThis, "FormsModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormsModule = _classThis;
})();
exports.FormsModule = FormsModule;
/**
 * Exports the required infrastructure and directives for reactive forms,
 * making them available for import by NgModules that import this module.
 *
 * @see [Forms Overview](guide/forms)
 * @see [Reactive Forms Guide](guide/forms/reactive-forms)
 *
 * @publicApi
 */
let ReactiveFormsModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [directives_1.REACTIVE_DRIVEN_DIRECTIVES],
            exports: [directives_1.InternalFormsSharedModule, directives_1.REACTIVE_DRIVEN_DIRECTIVES],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReactiveFormsModule = _classThis = class {
        /**
         * @description
         * Provides options for configuring the reactive forms module.
         *
         * @param opts An object of configuration options
         * * `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
         * binding is used with reactive form directives.
         * * `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
         * correct, or to only call it `whenDisabled`, which is the legacy behavior.
         */
        static withConfig(opts) {
            var _a, _b;
            return {
                ngModule: ReactiveFormsModule,
                providers: [
                    {
                        provide: directives_1.NG_MODEL_WITH_FORM_CONTROL_WARNING,
                        useValue: (_a = opts.warnOnNgModelWithFormControl) !== null && _a !== void 0 ? _a : 'always',
                    },
                    {
                        provide: shared_1.CALL_SET_DISABLED_STATE,
                        useValue: (_b = opts.callSetDisabledState) !== null && _b !== void 0 ? _b : shared_1.setDisabledStateDefault,
                    },
                ],
            };
        }
    };
    __setFunctionName(_classThis, "ReactiveFormsModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReactiveFormsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReactiveFormsModule = _classThis;
})();
exports.ReactiveFormsModule = ReactiveFormsModule;
