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
exports.RootTreeComponent = void 0;
exports.createAppModule = createAppModule;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const util_1 = require("../util");
let trustedEmptyColor;
let trustedGreyColor;
function createTreeComponent(level, isLeaf) {
    const nextTreeEl = `tree${level + 1}`;
    let template = `<span [style.backgroundColor]="bgColor"> {{data.value}} </span>`;
    if (!isLeaf) {
        template += `<${nextTreeEl} [data]='data.right'></${nextTreeEl}><${nextTreeEl} [data]='data.left'></${nextTreeEl}>`;
    }
    let TreeComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: `tree${level}`,
                template: template,
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _data_decorators;
        let _data_initializers = [];
        let _data_extraInitializers = [];
        var TreeComponent = _classThis = class {
            get bgColor() {
                return this.data.depth % 2 ? trustedEmptyColor : trustedGreyColor;
            }
            constructor() {
                this.data = __runInitializers(this, _data_initializers, void 0);
                __runInitializers(this, _data_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "TreeComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _data_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TreeComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return TreeComponent = _classThis;
    })();
    return TreeComponent;
}
let RootTreeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'tree',
            template: `<tree0 *ngIf="data.left != null" [data]="data"></tree0>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    var RootTreeComponent = _classThis = class {
        constructor() {
            this.data = __runInitializers(this, _data_initializers, util_1.emptyTree);
            __runInitializers(this, _data_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "RootTreeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _data_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootTreeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootTreeComponent = _classThis;
})();
exports.RootTreeComponent = RootTreeComponent;
function createAppModule() {
    const components = [RootTreeComponent];
    for (let i = 0; i <= (0, util_1.getMaxDepth)(); i++) {
        components.push(createTreeComponent(i, i === (0, util_1.getMaxDepth)()));
    }
    let AppModule = (() => {
        let _classDecorators = [(0, core_1.NgModule)({ imports: [platform_browser_1.BrowserModule], bootstrap: [RootTreeComponent], declarations: [components] })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var AppModule = _classThis = class {
            constructor(sanitizer) {
                trustedEmptyColor = sanitizer.bypassSecurityTrustStyle('');
                trustedGreyColor = sanitizer.bypassSecurityTrustStyle('grey');
            }
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
    return AppModule;
}
