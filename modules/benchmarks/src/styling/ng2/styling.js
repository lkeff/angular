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
exports.StylingModule = exports.StylingComponent = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
let StylingComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'styling-bindings',
            template: `
    <ng-template #t0><button [title]="exp"></button></ng-template>
    <ng-template #t1><button class="static"></button></ng-template>
    <ng-template #t2><button class="foo {{ exp }}"></button></ng-template>
    <ng-template #t3><button [class.bar]="exp === 'bar'"></button></ng-template>
    <ng-template #t4><button class="foo" [class.bar]="exp === 'bar'"></button></ng-template>
    <ng-template #t5><button class="foo" [ngClass]="{bar: exp === 'bar'}"></button></ng-template>
    <ng-template #t6
      ><button
        class="foo"
        [ngStyle]="staticStyle"
        [style.background-color]="exp == 'bar' ? 'yellow' : 'red'"
      ></button
    ></ng-template>
    <ng-template #t7><button style="color: red"></button></ng-template>
    <ng-template #t8
      ><button [style.width.px]="exp === 'bar' ? 10 : 20" [style.color]="exp"></button
    ></ng-template>
    <ng-template #t9><button style="width: 10px" [style.color]="exp"></button></ng-template>
    <ng-template #t10
      ><button [ngStyle]="{'width.px': exp === 'bar' ? 10 : 20, color: exp}"></button
    ></ng-template>

    <div>
      <ng-template
        ngFor
        [ngForOf]="data"
        [ngForTemplate]="getTplRef(t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10)"
      ></ng-template>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StylingComponent = _classThis = class {
        constructor() {
            this.data = [];
            this.exp = 'bar';
            this.tplRefIdx = 0;
            this.staticStyle = { width: '10px' };
        }
        getTplRef(...tplRefs) {
            return tplRefs[this.tplRefIdx];
        }
    };
    __setFunctionName(_classThis, "StylingComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StylingComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StylingComponent = _classThis;
})();
exports.StylingComponent = StylingComponent;
let StylingModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
            declarations: [StylingComponent],
            bootstrap: [StylingComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StylingModule = _classThis = class {
    };
    __setFunctionName(_classThis, "StylingModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StylingModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StylingModule = _classThis;
})();
exports.StylingModule = StylingModule;
