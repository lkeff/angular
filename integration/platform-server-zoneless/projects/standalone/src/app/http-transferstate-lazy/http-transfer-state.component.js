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
exports.TransferStateComponent = void 0;
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
let TransferStateComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'transfer-state-http',
            standalone: true,
            template: `
    <div class="one">{{ responseOne }}</div>
    <div class="two">{{ responseTwo }}</div>
  `,
            providers: [http_1.HttpClient],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TransferStateComponent = _classThis = class {
        constructor() {
            this.responseOne = '';
            this.responseTwo = '';
            this.httpClient = (0, core_1.inject)(http_1.HttpClient);
            this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
            // Test that HTTP cache works when HTTP call is made in the constructor.
            this.httpClient.get('http://localhost:4206/api').subscribe((response) => {
                this.responseOne = response.data;
                this.cdr.markForCheck();
            });
        }
        ngOnInit() {
            // Test that HTTP cache works when HTTP call is made in a lifecycle hook.
            this.httpClient.get('/api-2').subscribe((response) => {
                this.responseTwo = response.data;
                this.cdr.markForCheck();
            });
        }
    };
    __setFunctionName(_classThis, "TransferStateComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransferStateComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransferStateComponent = _classThis;
})();
exports.TransferStateComponent = TransferStateComponent;
