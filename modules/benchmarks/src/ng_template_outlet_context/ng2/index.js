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
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
let Deep = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'deep',
            standalone: true,
            imports: [common_1.NgIf],
            template: `<deep *ngIf="depth > 1" [depth]="depth - 1" /> Level: {{ depth }}`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _depth_decorators;
    let _depth_initializers = [];
    let _depth_extraInitializers = [];
    var Deep = _classThis = class {
        constructor() {
            this.depth = __runInitializers(this, _depth_initializers, void 0);
            __runInitializers(this, _depth_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Deep");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _depth_decorators = [(0, core_1.Input)({ required: true })];
        __esDecorate(null, null, _depth_decorators, { kind: "field", name: "depth", static: false, private: false, access: { has: obj => "depth" in obj, get: obj => obj.depth, set: (obj, value) => { obj.depth = value; } }, metadata: _metadata }, _depth_initializers, _depth_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Deep = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Deep = _classThis;
})();
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-component',
            standalone: true,
            imports: [common_1.NgTemplateOutlet, Deep],
            template: `
    <button id="swapOutFull" (click)="swapOutFull()">Swap out full context</button>
    <button id="modifyProperty" (click)="modifyProperty()">Modify property</button>
    <button id="modifyDeepProperty" (click)="modifyDeepProperty()">Modify deep property</button>
    <button id="addNewProperty" (click)="addNewProperty()">Add new property</button>

    <ng-template #templateRef let-implicit let-a="a" let-b="b" let-deep="deep" let-new="new">
      <p>Implicit: {{ implicit }}</p>
      <p>A: {{ a }}</p>
      <p>B: {{ b }}</p>
      <p>Deep: {{ deep.next.text }}</p>
      <p>New: {{ new }}</p>

      <deep [depth]="20" />
    </ng-template>

    <div>
      <p>Outlet</p>
      <ng-template [ngTemplateOutlet]="templateRef" [ngTemplateOutletContext]="context" />
    </div>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComponent = _classThis = class {
        constructor() {
            this.context = {
                $implicit: 'Default Implicit',
                a: 'Default A',
                b: 'Default B',
                deep: { next: { text: 'Default deep text' } },
            };
        }
        swapOutFull() {
            this.context = {
                $implicit: 'New Implicit new Object',
                a: 'New A new Object',
                b: 'New B new Object',
                deep: { next: { text: 'New Deep text new Object' } },
            };
        }
        modifyProperty() {
            this.context.a = 'Modified a';
        }
        modifyDeepProperty() {
            this.context.deep.next.text = 'Modified deep a';
        }
        addNewProperty() {
            this.context.new = 'New property set';
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
(0, core_1.enableProdMode)();
(0, platform_browser_1.bootstrapApplication)(AppComponent);
