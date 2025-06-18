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
exports.JsWebFrameworksModule = exports.JsWebFrameworksComponent = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
let JsWebFrameworksComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'js-web-frameworks',
            template: `
    <table class="table table-hover table-striped test-data">
      <tbody>
        @for(item of data; track item.id) {
          <tr [class.danger]="item.id === selected">
            <td class="col-md-1">{{ item.id }}</td>
            <td class="col-md-4">
              <a href="#" (click)="select(item.id); $event.preventDefault()">{{ item.label }}</a>
            </td>
            <td class="col-md-1">
              <a href="#" (click)="delete(item.id); $event.preventDefault()">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </a>
            </td>
            <td class="col-md-6"></td>
          </tr>
        }
      </tbody>
    </table>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var JsWebFrameworksComponent = _classThis = class {
        constructor(_appRef) {
            this._appRef = _appRef;
            this.data = [];
        }
        select(itemId) {
            this.selected = itemId;
            this._appRef.tick();
        }
        delete(itemId) {
            const data = this.data;
            for (let i = 0, l = data.length; i < l; i++) {
                if (data[i].id === itemId) {
                    data.splice(i, 1);
                    break;
                }
            }
            this._appRef.tick();
        }
    };
    __setFunctionName(_classThis, "JsWebFrameworksComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JsWebFrameworksComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JsWebFrameworksComponent = _classThis;
})();
exports.JsWebFrameworksComponent = JsWebFrameworksComponent;
let JsWebFrameworksModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [platform_browser_1.BrowserModule],
            declarations: [JsWebFrameworksComponent],
            bootstrap: [JsWebFrameworksComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var JsWebFrameworksModule = _classThis = class {
    };
    __setFunctionName(_classThis, "JsWebFrameworksModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JsWebFrameworksModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JsWebFrameworksModule = _classThis;
})();
exports.JsWebFrameworksModule = JsWebFrameworksModule;
