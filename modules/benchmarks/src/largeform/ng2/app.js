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
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app',
            template: `<form *ngFor="let copy of copies">
    <input type="text" [(ngModel)]="values[0]" name="value0" />
    <input type="text" [(ngModel)]="values[1]" name="value1" />
    <input type="text" [(ngModel)]="values[2]" name="value2" />
    <input type="text" [(ngModel)]="values[3]" name="value3" />
    <input type="text" [(ngModel)]="values[4]" name="value4" />
    <input type="text" [(ngModel)]="values[5]" name="value5" />
    <input type="text" [(ngModel)]="values[6]" name="value6" />
    <input type="text" [(ngModel)]="values[7]" name="value7" />
    <input type="text" [(ngModel)]="values[8]" name="value8" />
    <input type="text" [(ngModel)]="values[9]" name="value9" />
    <input type="text" [(ngModel)]="values[10]" name="value10" />
    <input type="text" [(ngModel)]="values[11]" name="value11" />
    <input type="text" [(ngModel)]="values[12]" name="value12" />
    <input type="text" [(ngModel)]="values[13]" name="value13" />
    <input type="text" [(ngModel)]="values[14]" name="value14" />
    <input type="text" [(ngModel)]="values[15]" name="value15" />
    <input type="text" [(ngModel)]="values[16]" name="value16" />
    <input type="text" [(ngModel)]="values[17]" name="value17" />
    <input type="text" [(ngModel)]="values[18]" name="value18" />
    <input type="text" [(ngModel)]="values[19]" name="value19" />
    <input type="text" [(ngModel)]="values[20]" name="value20" />
    <input type="text" [(ngModel)]="values[21]" name="value21" />
    <input type="text" [(ngModel)]="values[22]" name="value22" />
    <input type="text" [(ngModel)]="values[23]" name="value23" />
    <input type="text" [(ngModel)]="values[24]" name="value24" />
    <input type="text" [(ngModel)]="values[25]" name="value25" />
    <input type="text" [(ngModel)]="values[26]" name="value26" />
    <input type="text" [(ngModel)]="values[27]" name="value27" />
    <input type="text" [(ngModel)]="values[28]" name="value28" />
    <input type="text" [(ngModel)]="values[29]" name="value29" />
    <input type="text" [(ngModel)]="values[30]" name="value30" />
    <input type="text" [(ngModel)]="values[31]" name="value31" />
    <input type="text" [(ngModel)]="values[32]" name="value32" />
    <input type="text" [(ngModel)]="values[33]" name="value33" />
    <input type="text" [(ngModel)]="values[34]" name="value34" />
    <input type="text" [(ngModel)]="values[35]" name="value35" />
    <input type="text" [(ngModel)]="values[36]" name="value36" />
    <input type="text" [(ngModel)]="values[37]" name="value37" />
    <input type="text" [(ngModel)]="values[38]" name="value38" />
    <input type="text" [(ngModel)]="values[39]" name="value39" />
    <input type="text" [(ngModel)]="values[40]" name="value40" />
    <input type="text" [(ngModel)]="values[41]" name="value41" />
    <input type="text" [(ngModel)]="values[42]" name="value42" />
    <input type="text" [(ngModel)]="values[43]" name="value43" />
    <input type="text" [(ngModel)]="values[44]" name="value44" />
    <input type="text" [(ngModel)]="values[45]" name="value45" />
    <input type="text" [(ngModel)]="values[46]" name="value46" />
    <input type="text" [(ngModel)]="values[47]" name="value47" />
    <input type="text" [(ngModel)]="values[48]" name="value48" />
    <input type="text" [(ngModel)]="values[49]" name="value49" />
  </form>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComponent = _classThis = class {
        constructor() {
            this.copies = [];
            this.values = [];
            for (let i = 0; i < 50; i++) {
                this.values[i] = `someValue${i}`;
            }
        }
        setCopies(count) {
            this.copies = [];
            for (let i = 0; i < count; i++) {
                this.copies.push(i);
            }
        }
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
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
            bootstrap: [AppComponent],
            declarations: [AppComponent],
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
