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
exports.AppModule = exports.AppComponent = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const async_pipe_1 = require("./async_pipe");
const currency_pipe_1 = require("./currency_pipe");
const date_pipe_1 = require("./date_pipe");
const i18n_pipe_1 = require("./i18n_pipe");
const json_pipe_1 = require("./json_pipe");
const keyvalue_pipe_1 = require("./keyvalue_pipe");
const lowerupper_pipe_1 = require("./lowerupper_pipe");
const number_pipe_1 = require("./number_pipe");
const percent_pipe_1 = require("./percent_pipe");
const slice_pipe_1 = require("./slice_pipe");
const titlecase_pipe_1 = require("./titlecase_pipe");
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'example-app',
            template: `
    <h1>Pipe Example</h1>

    <h2><code>async</code></h2>
    <async-promise-pipe></async-promise-pipe>
    <async-observable-pipe></async-observable-pipe>

    <h2><code>date</code></h2>
    <date-pipe></date-pipe>

    <h2><code>json</code></h2>
    <json-pipe></json-pipe>

    <h2><code>lower</code>, <code>upper</code></h2>
    <lowerupper-pipe></lowerupper-pipe>

    <h2><code>titlecase</code></h2>
    <titlecase-pipe></titlecase-pipe>

    <h2><code>number</code></h2>
    <number-pipe></number-pipe>
    <percent-pipe></percent-pipe>
    <currency-pipe></currency-pipe>

    <h2><code>slice</code></h2>
    <slice-string-pipe></slice-string-pipe>
    <slice-list-pipe></slice-list-pipe>

    <h2><code>i18n</code></h2>
    <i18n-plural-pipe></i18n-plural-pipe>
    <i18n-select-pipe></i18n-select-pipe>

    <h2><code>keyvalue</code></h2>
    <keyvalue-pipe></keyvalue-pipe>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "AppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
})();
exports.AppComponent = AppComponent;
let AppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                async_pipe_1.AsyncPromisePipeComponent,
                async_pipe_1.AsyncObservablePipeComponent,
                AppComponent,
                json_pipe_1.JsonPipeComponent,
                date_pipe_1.DatePipeComponent,
                date_pipe_1.DeprecatedDatePipeComponent,
                lowerupper_pipe_1.LowerUpperPipeComponent,
                titlecase_pipe_1.TitleCasePipeComponent,
                number_pipe_1.NumberPipeComponent,
                percent_pipe_1.PercentPipeComponent,
                currency_pipe_1.CurrencyPipeComponent,
                slice_pipe_1.SlicePipeStringComponent,
                slice_pipe_1.SlicePipeListComponent,
                i18n_pipe_1.I18nPluralPipeComponent,
                i18n_pipe_1.I18nSelectPipeComponent,
                keyvalue_pipe_1.KeyValuePipeComponent,
            ],
            imports: [platform_browser_1.BrowserModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
