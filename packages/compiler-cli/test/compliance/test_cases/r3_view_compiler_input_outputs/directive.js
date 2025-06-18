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
exports.MyModule = exports.MyDirective = void 0;
const core_1 = require("@angular/core");
let MyDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[my-directive]',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _directiveInput_decorators;
    let _directiveInput_initializers = [];
    let _directiveInput_extraInitializers = [];
    let _originalDirectiveInput_decorators;
    let _originalDirectiveInput_initializers = [];
    let _originalDirectiveInput_extraInitializers = [];
    let _directiveOutput_decorators;
    let _directiveOutput_initializers = [];
    let _directiveOutput_extraInitializers = [];
    let _originalDirectiveOutput_decorators;
    let _originalDirectiveOutput_initializers = [];
    let _originalDirectiveOutput_extraInitializers = [];
    var MyDirective = _classThis = class {
        constructor() {
            this.directiveInput = __runInitializers(this, _directiveInput_initializers, void 0);
            this.originalDirectiveInput = (__runInitializers(this, _directiveInput_extraInitializers), __runInitializers(this, _originalDirectiveInput_initializers, void 0));
            this.directiveOutput = (__runInitializers(this, _originalDirectiveInput_extraInitializers), __runInitializers(this, _directiveOutput_initializers, void 0));
            this.originalDirectiveOutput = (__runInitializers(this, _directiveOutput_extraInitializers), __runInitializers(this, _originalDirectiveOutput_initializers, void 0));
            __runInitializers(this, _originalDirectiveOutput_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MyDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _directiveInput_decorators = [(0, core_1.Input)()];
        _originalDirectiveInput_decorators = [(0, core_1.Input)('renamedDirectiveInput')];
        _directiveOutput_decorators = [(0, core_1.Output)()];
        _originalDirectiveOutput_decorators = [(0, core_1.Output)('renamedDirectiveOutput')];
        __esDecorate(null, null, _directiveInput_decorators, { kind: "field", name: "directiveInput", static: false, private: false, access: { has: obj => "directiveInput" in obj, get: obj => obj.directiveInput, set: (obj, value) => { obj.directiveInput = value; } }, metadata: _metadata }, _directiveInput_initializers, _directiveInput_extraInitializers);
        __esDecorate(null, null, _originalDirectiveInput_decorators, { kind: "field", name: "originalDirectiveInput", static: false, private: false, access: { has: obj => "originalDirectiveInput" in obj, get: obj => obj.originalDirectiveInput, set: (obj, value) => { obj.originalDirectiveInput = value; } }, metadata: _metadata }, _originalDirectiveInput_initializers, _originalDirectiveInput_extraInitializers);
        __esDecorate(null, null, _directiveOutput_decorators, { kind: "field", name: "directiveOutput", static: false, private: false, access: { has: obj => "directiveOutput" in obj, get: obj => obj.directiveOutput, set: (obj, value) => { obj.directiveOutput = value; } }, metadata: _metadata }, _directiveOutput_initializers, _directiveOutput_extraInitializers);
        __esDecorate(null, null, _originalDirectiveOutput_decorators, { kind: "field", name: "originalDirectiveOutput", static: false, private: false, access: { has: obj => "originalDirectiveOutput" in obj, get: obj => obj.originalDirectiveOutput, set: (obj, value) => { obj.originalDirectiveOutput = value; } }, metadata: _metadata }, _originalDirectiveOutput_initializers, _originalDirectiveOutput_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyDirective = _classThis;
})();
exports.MyDirective = MyDirective;
let MyModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [MyDirective] })];
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
