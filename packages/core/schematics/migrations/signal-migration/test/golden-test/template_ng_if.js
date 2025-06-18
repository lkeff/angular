"use strict";
// tslint:disable
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
exports.MyComp = void 0;
const core_1 = require("@angular/core");
let MyComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    @if (first) {
      {{first}}
    }

    <ng-template [ngIf]="second">
      {{second}}
    </ng-template>

    <div *ngIf="third">
      {{third}}
    </div>

    <div *ngIf="fourth">
      {{notTheInput}}
    </div>

    @if (fifth) {
      {{notTheInput}}
    }
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _first_decorators;
    let _first_initializers = [];
    let _first_extraInitializers = [];
    let _second_decorators;
    let _second_initializers = [];
    let _second_extraInitializers = [];
    let _third_decorators;
    let _third_initializers = [];
    let _third_extraInitializers = [];
    let _fourth_decorators;
    let _fourth_initializers = [];
    let _fourth_extraInitializers = [];
    let _fifth_decorators;
    let _fifth_initializers = [];
    let _fifth_extraInitializers = [];
    var MyComp = _classThis = class {
        constructor() {
            this.first = __runInitializers(this, _first_initializers, true);
            this.second = (__runInitializers(this, _first_extraInitializers), __runInitializers(this, _second_initializers, false));
            this.third = (__runInitializers(this, _second_extraInitializers), __runInitializers(this, _third_initializers, true));
            this.fourth = (__runInitializers(this, _third_extraInitializers), __runInitializers(this, _fourth_initializers, true));
            this.fifth = (__runInitializers(this, _fourth_extraInitializers), __runInitializers(this, _fifth_initializers, true));
            __runInitializers(this, _fifth_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MyComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _first_decorators = [(0, core_1.Input)()];
        _second_decorators = [(0, core_1.Input)()];
        _third_decorators = [(0, core_1.Input)()];
        _fourth_decorators = [(0, core_1.Input)()];
        _fifth_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _first_decorators, { kind: "field", name: "first", static: false, private: false, access: { has: obj => "first" in obj, get: obj => obj.first, set: (obj, value) => { obj.first = value; } }, metadata: _metadata }, _first_initializers, _first_extraInitializers);
        __esDecorate(null, null, _second_decorators, { kind: "field", name: "second", static: false, private: false, access: { has: obj => "second" in obj, get: obj => obj.second, set: (obj, value) => { obj.second = value; } }, metadata: _metadata }, _second_initializers, _second_extraInitializers);
        __esDecorate(null, null, _third_decorators, { kind: "field", name: "third", static: false, private: false, access: { has: obj => "third" in obj, get: obj => obj.third, set: (obj, value) => { obj.third = value; } }, metadata: _metadata }, _third_initializers, _third_extraInitializers);
        __esDecorate(null, null, _fourth_decorators, { kind: "field", name: "fourth", static: false, private: false, access: { has: obj => "fourth" in obj, get: obj => obj.fourth, set: (obj, value) => { obj.fourth = value; } }, metadata: _metadata }, _fourth_initializers, _fourth_extraInitializers);
        __esDecorate(null, null, _fifth_decorators, { kind: "field", name: "fifth", static: false, private: false, access: { has: obj => "fifth" in obj, get: obj => obj.fifth, set: (obj, value) => { obj.fifth = value; } }, metadata: _metadata }, _fifth_initializers, _fifth_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyComp = _classThis;
})();
exports.MyComp = MyComp;
