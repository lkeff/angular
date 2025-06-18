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
const core_1 = require("@angular/core");
let TwoWayBinding = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    <input [(ngModel)]="inputA" />
    <div (click)="inputB = false">
    </div>
  `,
            host: {
                '(click)': 'inputC = true',
            },
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _inputA_decorators;
    let _inputA_initializers = [];
    let _inputA_extraInitializers = [];
    let _inputB_decorators;
    let _inputB_initializers = [];
    let _inputB_extraInitializers = [];
    let _inputC_decorators;
    let _inputC_initializers = [];
    let _inputC_extraInitializers = [];
    let _inputD_decorators;
    let _inputD_initializers = [];
    let _inputD_extraInitializers = [];
    var TwoWayBinding = _classThis = class {
        constructor() {
            this.inputA = __runInitializers(this, _inputA_initializers, '');
            this.inputB = (__runInitializers(this, _inputA_extraInitializers), __runInitializers(this, _inputB_initializers, true));
            this.inputC = (__runInitializers(this, _inputB_extraInitializers), __runInitializers(this, _inputC_initializers, false));
            this.inputD = (__runInitializers(this, _inputC_extraInitializers), __runInitializers(this, _inputD_initializers, false));
            __runInitializers(this, _inputD_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TwoWayBinding");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _inputA_decorators = [(0, core_1.Input)()];
        _inputB_decorators = [(0, core_1.Input)()];
        _inputC_decorators = [(0, core_1.Input)()];
        _inputD_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _inputA_decorators, { kind: "field", name: "inputA", static: false, private: false, access: { has: obj => "inputA" in obj, get: obj => obj.inputA, set: (obj, value) => { obj.inputA = value; } }, metadata: _metadata }, _inputA_initializers, _inputA_extraInitializers);
        __esDecorate(null, null, _inputB_decorators, { kind: "field", name: "inputB", static: false, private: false, access: { has: obj => "inputB" in obj, get: obj => obj.inputB, set: (obj, value) => { obj.inputB = value; } }, metadata: _metadata }, _inputB_initializers, _inputB_extraInitializers);
        __esDecorate(null, null, _inputC_decorators, { kind: "field", name: "inputC", static: false, private: false, access: { has: obj => "inputC" in obj, get: obj => obj.inputC, set: (obj, value) => { obj.inputC = value; } }, metadata: _metadata }, _inputC_initializers, _inputC_extraInitializers);
        __esDecorate(null, null, _inputD_decorators, { kind: "field", name: "inputD", static: false, private: false, access: { has: obj => "inputD" in obj, get: obj => obj.inputD, set: (obj, value) => { obj.inputD = value; } }, metadata: _metadata }, _inputD_initializers, _inputD_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TwoWayBinding = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TwoWayBinding = _classThis;
})();
