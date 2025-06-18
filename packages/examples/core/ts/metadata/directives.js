"use strict";
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
exports.MyOutputComponent = exports.IntervalDirComponent = exports.MyInputComponent = exports.BankAccountComponent = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/* tslint:disable:no-console  */
const core_1 = require("@angular/core");
// #docregion component-input
let BankAccountComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-bank-account',
            inputs: ['bankName', 'id: account-id'],
            template: ` Bank Name: {{ bankName }} Account Id: {{ id }} `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BankAccountComponent = _classThis = class {
        constructor() {
            this.bankName = null;
            this.id = null;
            // this property is not bound, and won't be automatically updated by Angular
            this.normalizedBankName = null;
        }
    };
    __setFunctionName(_classThis, "BankAccountComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BankAccountComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BankAccountComponent = _classThis;
})();
exports.BankAccountComponent = BankAccountComponent;
let MyInputComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-my-input',
            template: ` <app-bank-account bankName="RBC" account-id="4747" /> `,
            imports: [BankAccountComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyInputComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "MyInputComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyInputComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyInputComponent = _classThis;
})();
exports.MyInputComponent = MyInputComponent;
// #enddocregion component-input
// #docregion component-output-interval
let IntervalDirComponent = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'app-interval-dir',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IntervalDirComponent = _classThis = class {
        constructor() {
            this.everySecond = (0, core_1.output)();
            this.everyFiveSeconds = (0, core_1.output)();
            setInterval(() => this.everySecond.emit('event'), 1000);
            setInterval(() => this.everyFiveSeconds.emit('event'), 5000);
        }
    };
    __setFunctionName(_classThis, "IntervalDirComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IntervalDirComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IntervalDirComponent = _classThis;
})();
exports.IntervalDirComponent = IntervalDirComponent;
let MyOutputComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-my-output',
            template: `
    <app-interval-dir (everySecond)="onEverySecond()" (everyFiveSeconds)="onEveryFiveSeconds()" />
  `,
            imports: [IntervalDirComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyOutputComponent = _classThis = class {
        onEverySecond() {
            console.log('second');
        }
        onEveryFiveSeconds() {
            console.log('five seconds');
        }
    };
    __setFunctionName(_classThis, "MyOutputComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyOutputComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyOutputComponent = _classThis;
})();
exports.MyOutputComponent = MyOutputComponent;
// #enddocregion component-output-interval
