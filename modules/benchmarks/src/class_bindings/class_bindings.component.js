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
exports.ClassBindingsComponent = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
let ClassBindingsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'class-bindings',
            template: `
    <div>
      <p>{{ msg }}</p>
      <div *ngFor="let obj of list; let i = index" [title]="msg + i">
        <span [class]="msg">{{ obj.text }}</span>
        <span class="baz">one</span>
        <span class="qux">two</span>
        <div>
          <span class="qux">three</span>
          <span class="qux">four</span>
          <span class="baz">five</span>
          <div>
            <span class="qux">six</span>
            <span class="baz">seven</span>
            <span [class]="msg">eight</span>
          </div>
        </div>
      </div>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _msg_decorators;
    let _msg_initializers = [];
    let _msg_extraInitializers = [];
    let _list_decorators;
    let _list_initializers = [];
    let _list_extraInitializers = [];
    var ClassBindingsComponent = _classThis = class {
        constructor() {
            this.msg = __runInitializers(this, _msg_initializers, '');
            this.list = (__runInitializers(this, _msg_extraInitializers), __runInitializers(this, _list_initializers, null));
            __runInitializers(this, _list_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ClassBindingsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _msg_decorators = [(0, core_1.Input)()];
        _list_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _msg_decorators, { kind: "field", name: "msg", static: false, private: false, access: { has: obj => "msg" in obj, get: obj => obj.msg, set: (obj, value) => { obj.msg = value; } }, metadata: _metadata }, _msg_initializers, _msg_extraInitializers);
        __esDecorate(null, null, _list_decorators, { kind: "field", name: "list", static: false, private: false, access: { has: obj => "list" in obj, get: obj => obj.list, set: (obj, value) => { obj.list = value; } }, metadata: _metadata }, _list_initializers, _list_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ClassBindingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ClassBindingsComponent = _classThis;
})();
exports.ClassBindingsComponent = ClassBindingsComponent;
