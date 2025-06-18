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
exports.ContentChildrenComp = exports.Tab = exports.Pane = void 0;
// #docregion Component
const core_1 = require("@angular/core");
let Pane = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'pane',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    var Pane = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            __runInitializers(this, _id_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Pane");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Pane = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Pane = _classThis;
})();
exports.Pane = Pane;
let Tab = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'tab',
            template: `
    <div class="top-level">Top level panes: {{ serializedPanes }}</div>
    <div class="nested">Arbitrary nested panes: {{ serializedNestedPanes }}</div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _topLevelPanes_decorators;
    let _topLevelPanes_initializers = [];
    let _topLevelPanes_extraInitializers = [];
    let _arbitraryNestedPanes_decorators;
    let _arbitraryNestedPanes_initializers = [];
    let _arbitraryNestedPanes_extraInitializers = [];
    var Tab = _classThis = class {
        get serializedPanes() {
            return this.topLevelPanes ? this.topLevelPanes.map((p) => p.id).join(', ') : '';
        }
        get serializedNestedPanes() {
            return this.arbitraryNestedPanes ? this.arbitraryNestedPanes.map((p) => p.id).join(', ') : '';
        }
        constructor() {
            this.topLevelPanes = __runInitializers(this, _topLevelPanes_initializers, void 0);
            this.arbitraryNestedPanes = (__runInitializers(this, _topLevelPanes_extraInitializers), __runInitializers(this, _arbitraryNestedPanes_initializers, void 0));
            __runInitializers(this, _arbitraryNestedPanes_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Tab");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _topLevelPanes_decorators = [(0, core_1.ContentChildren)(Pane)];
        _arbitraryNestedPanes_decorators = [(0, core_1.ContentChildren)(Pane, { descendants: true })];
        __esDecorate(null, null, _topLevelPanes_decorators, { kind: "field", name: "topLevelPanes", static: false, private: false, access: { has: obj => "topLevelPanes" in obj, get: obj => obj.topLevelPanes, set: (obj, value) => { obj.topLevelPanes = value; } }, metadata: _metadata }, _topLevelPanes_initializers, _topLevelPanes_extraInitializers);
        __esDecorate(null, null, _arbitraryNestedPanes_decorators, { kind: "field", name: "arbitraryNestedPanes", static: false, private: false, access: { has: obj => "arbitraryNestedPanes" in obj, get: obj => obj.arbitraryNestedPanes, set: (obj, value) => { obj.arbitraryNestedPanes = value; } }, metadata: _metadata }, _arbitraryNestedPanes_initializers, _arbitraryNestedPanes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tab = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tab = _classThis;
})();
exports.Tab = Tab;
let ContentChildrenComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'example-app',
            template: `
    <tab>
      <pane id="1"></pane>
      <pane id="2"></pane>
      <pane id="3" *ngIf="shouldShow">
        <tab>
          <pane id="3_1"></pane>
          <pane id="3_2"></pane>
        </tab>
      </pane>
    </tab>

    <button (click)="show()">Show 3</button>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ContentChildrenComp = _classThis = class {
        constructor() {
            this.shouldShow = false;
        }
        show() {
            this.shouldShow = true;
        }
    };
    __setFunctionName(_classThis, "ContentChildrenComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContentChildrenComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContentChildrenComp = _classThis;
})();
exports.ContentChildrenComp = ContentChildrenComp;
// #enddocregion
