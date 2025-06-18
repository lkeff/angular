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
exports.MyModule = exports.MyComponent = void 0;
const core_1 = require("@angular/core");
let MyComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-component', template: '',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _componentInput_decorators;
    let _componentInput_initializers = [];
    let _componentInput_extraInitializers = [];
    let _originalComponentInput_decorators;
    let _originalComponentInput_initializers = [];
    let _originalComponentInput_extraInitializers = [];
    let _componentOutput_decorators;
    let _componentOutput_initializers = [];
    let _componentOutput_extraInitializers = [];
    let _originalComponentOutput_decorators;
    let _originalComponentOutput_initializers = [];
    let _originalComponentOutput_extraInitializers = [];
    var MyComponent = _classThis = class {
        constructor() {
            this.componentInput = __runInitializers(this, _componentInput_initializers, void 0);
            this.originalComponentInput = (__runInitializers(this, _componentInput_extraInitializers), __runInitializers(this, _originalComponentInput_initializers, void 0));
            this.componentOutput = (__runInitializers(this, _originalComponentInput_extraInitializers), __runInitializers(this, _componentOutput_initializers, void 0));
            this.originalComponentOutput = (__runInitializers(this, _componentOutput_extraInitializers), __runInitializers(this, _originalComponentOutput_initializers, void 0));
            __runInitializers(this, _originalComponentOutput_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _componentInput_decorators = [(0, core_1.Input)()];
        _originalComponentInput_decorators = [(0, core_1.Input)('renamedComponentInput')];
        _componentOutput_decorators = [(0, core_1.Output)()];
        _originalComponentOutput_decorators = [(0, core_1.Output)('renamedComponentOutput')];
        __esDecorate(null, null, _componentInput_decorators, { kind: "field", name: "componentInput", static: false, private: false, access: { has: obj => "componentInput" in obj, get: obj => obj.componentInput, set: (obj, value) => { obj.componentInput = value; } }, metadata: _metadata }, _componentInput_initializers, _componentInput_extraInitializers);
        __esDecorate(null, null, _originalComponentInput_decorators, { kind: "field", name: "originalComponentInput", static: false, private: false, access: { has: obj => "originalComponentInput" in obj, get: obj => obj.originalComponentInput, set: (obj, value) => { obj.originalComponentInput = value; } }, metadata: _metadata }, _originalComponentInput_initializers, _originalComponentInput_extraInitializers);
        __esDecorate(null, null, _componentOutput_decorators, { kind: "field", name: "componentOutput", static: false, private: false, access: { has: obj => "componentOutput" in obj, get: obj => obj.componentOutput, set: (obj, value) => { obj.componentOutput = value; } }, metadata: _metadata }, _componentOutput_initializers, _componentOutput_extraInitializers);
        __esDecorate(null, null, _originalComponentOutput_decorators, { kind: "field", name: "originalComponentOutput", static: false, private: false, access: { has: obj => "originalComponentOutput" in obj, get: obj => obj.originalComponentOutput, set: (obj, value) => { obj.originalComponentOutput = value; } }, metadata: _metadata }, _originalComponentOutput_initializers, _originalComponentOutput_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyComponent = _classThis;
})();
exports.MyComponent = MyComponent;
let MyModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [MyComponent] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyModule = _classThis = class {
    };
    __setFunctionName(_classThis, "MyModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyModule = _classThis;
})();
exports.MyModule = MyModule;
