"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransplantedViewsModule = exports.DeclarationComponent = exports.InsertionComponent = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const util_1 = require("../util");
let InsertionComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'insertion-component',
            template: `
    <ng-container *ngFor="let n of views; template: template; trackBy: trackByIndex"></ng-container>
  `,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _template_decorators;
    let _template_initializers = [];
    let _template_extraInitializers = [];
    let _set_viewCount_decorators;
    var InsertionComponent = _classThis = class {
        set viewCount(n) {
            this.views = n > 0 ? (0, util_1.newArray)(n) : [];
        }
        constructor(changeDetector) {
            this.changeDetector = (__runInitializers(this, _instanceExtraInitializers), changeDetector);
            this.template = __runInitializers(this, _template_initializers, void 0);
            this.views = (__runInitializers(this, _template_extraInitializers), []);
        }
        // use trackBy to ensure profile isn't affected by the cost to refresh ngFor.
        trackByIndex(index, item) {
            return index;
        }
    };
    __setFunctionName(_classThis, "InsertionComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _template_decorators = [(0, core_1.Input)()];
        _set_viewCount_decorators = [(0, core_1.Input)()];
        __esDecorate(_classThis, null, _set_viewCount_decorators, { kind: "setter", name: "viewCount", static: false, private: false, access: { has: obj => "viewCount" in obj, set: (obj, value) => { obj.viewCount = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InsertionComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InsertionComponent = _classThis;
})();
exports.InsertionComponent = InsertionComponent;
let DeclarationComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'declaration-component',
            template: `
    <ng-template #template>{{ trackTemplateRefresh() }}</ng-template>
    <insertion-component [template]="template" [viewCount]="viewCount"></insertion-component>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _viewCount_decorators;
    let _viewCount_initializers = [];
    let _viewCount_extraInitializers = [];
    let _insertionComponent_decorators;
    let _insertionComponent_initializers = [];
    let _insertionComponent_extraInitializers = [];
    var DeclarationComponent = _classThis = class {
        constructor() {
            this.viewCount = __runInitializers(this, _viewCount_initializers, 1);
            this.insertionComponent = (__runInitializers(this, _viewCount_extraInitializers), __runInitializers(this, _insertionComponent_initializers, void 0));
            // Tracks number of times the template was executed to ensure it was updated during CD.
            this.templateRefreshCount = (__runInitializers(this, _insertionComponent_extraInitializers), 0);
        }
        trackTemplateRefresh() {
            this.templateRefreshCount++;
            return this.templateRefreshCount;
        }
    };
    __setFunctionName(_classThis, "DeclarationComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _viewCount_decorators = [(0, core_1.Input)()];
        _insertionComponent_decorators = [(0, core_1.ViewChild)(InsertionComponent)];
        __esDecorate(null, null, _viewCount_decorators, { kind: "field", name: "viewCount", static: false, private: false, access: { has: obj => "viewCount" in obj, get: obj => obj.viewCount, set: (obj, value) => { obj.viewCount = value; } }, metadata: _metadata }, _viewCount_initializers, _viewCount_extraInitializers);
        __esDecorate(null, null, _insertionComponent_decorators, { kind: "field", name: "insertionComponent", static: false, private: false, access: { has: obj => "insertionComponent" in obj, get: obj => obj.insertionComponent, set: (obj, value) => { obj.insertionComponent = value; } }, metadata: _metadata }, _insertionComponent_initializers, _insertionComponent_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeclarationComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeclarationComponent = _classThis;
})();
exports.DeclarationComponent = DeclarationComponent;
let TransplantedViewsModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [DeclarationComponent, InsertionComponent],
            bootstrap: [DeclarationComponent],
            imports: [platform_browser_1.BrowserModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TransplantedViewsModule = _classThis = class {
    };
    __setFunctionName(_classThis, "TransplantedViewsModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransplantedViewsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransplantedViewsModule = _classThis;
})();
exports.TransplantedViewsModule = TransplantedViewsModule;
