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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredNoExplicitType = exports.CONST = void 0;
const core_1 = require("@angular/core");
const required_no_explicit_type_extra_1 = require("./required-no-explicit-type-extra");
exports.CONST = { field: true };
let RequiredNoExplicitType = (() => {
    var _a;
    let _someInputNumber_decorators;
    let _someInputNumber_initializers = [];
    let _someInputNumber_extraInitializers = [];
    let _someInput_decorators;
    let _someInput_initializers = [];
    let _someInput_extraInitializers = [];
    let _withConstInitialVal_decorators;
    let _withConstInitialVal_initializers = [];
    let _withConstInitialVal_extraInitializers = [];
    let _complexVal_decorators;
    let _complexVal_initializers = [];
    let _complexVal_extraInitializers = [];
    return _a = class RequiredNoExplicitType {
            constructor() {
                this.someInputNumber = __runInitializers(this, _someInputNumber_initializers, 0);
                this.someInput = (__runInitializers(this, _someInputNumber_extraInitializers), __runInitializers(this, _someInput_initializers, true));
                this.withConstInitialVal = (__runInitializers(this, _someInput_extraInitializers), __runInitializers(this, _withConstInitialVal_initializers, exports.CONST));
                // typing this explicitly now would require same imports as from the `-extra` file.
                this.complexVal = (__runInitializers(this, _withConstInitialVal_extraInitializers), __runInitializers(this, _complexVal_initializers, required_no_explicit_type_extra_1.COMPLEX_VAR));
                __runInitializers(this, _complexVal_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _someInputNumber_decorators = [(0, core_1.Input)({ required: true })];
            _someInput_decorators = [(0, core_1.Input)({ required: true })];
            _withConstInitialVal_decorators = [(0, core_1.Input)({ required: true })];
            _complexVal_decorators = [(0, core_1.Input)({ required: true })];
            __esDecorate(null, null, _someInputNumber_decorators, { kind: "field", name: "someInputNumber", static: false, private: false, access: { has: obj => "someInputNumber" in obj, get: obj => obj.someInputNumber, set: (obj, value) => { obj.someInputNumber = value; } }, metadata: _metadata }, _someInputNumber_initializers, _someInputNumber_extraInitializers);
            __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
            __esDecorate(null, null, _withConstInitialVal_decorators, { kind: "field", name: "withConstInitialVal", static: false, private: false, access: { has: obj => "withConstInitialVal" in obj, get: obj => obj.withConstInitialVal, set: (obj, value) => { obj.withConstInitialVal = value; } }, metadata: _metadata }, _withConstInitialVal_initializers, _withConstInitialVal_extraInitializers);
            __esDecorate(null, null, _complexVal_decorators, { kind: "field", name: "complexVal", static: false, private: false, access: { has: obj => "complexVal" in obj, get: obj => obj.complexVal, set: (obj, value) => { obj.complexVal = value; } }, metadata: _metadata }, _complexVal_initializers, _complexVal_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.RequiredNoExplicitType = RequiredNoExplicitType;
