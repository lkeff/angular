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
exports.MyModule = exports.MyComponent = exports.PipePipe = exports.DivDir = void 0;
const core_1 = require("@angular/core");
let DivDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'div',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _ternary_decorators;
    let _ternary_initializers = [];
    let _ternary_extraInitializers = [];
    let _pipe_decorators;
    let _pipe_initializers = [];
    let _pipe_extraInitializers = [];
    let _and_decorators;
    let _and_initializers = [];
    let _and_extraInitializers = [];
    let _or_decorators;
    let _or_initializers = [];
    let _or_extraInitializers = [];
    var DivDir = _classThis = class {
        constructor() {
            this.ternary = __runInitializers(this, _ternary_initializers, void 0);
            this.pipe = (__runInitializers(this, _ternary_extraInitializers), __runInitializers(this, _pipe_initializers, void 0));
            this.and = (__runInitializers(this, _pipe_extraInitializers), __runInitializers(this, _and_initializers, void 0));
            this.or = (__runInitializers(this, _and_extraInitializers), __runInitializers(this, _or_initializers, void 0));
            __runInitializers(this, _or_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DivDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _ternary_decorators = [(0, core_1.Input)()];
        _pipe_decorators = [(0, core_1.Input)()];
        _and_decorators = [(0, core_1.Input)()];
        _or_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _ternary_decorators, { kind: "field", name: "ternary", static: false, private: false, access: { has: obj => "ternary" in obj, get: obj => obj.ternary, set: (obj, value) => { obj.ternary = value; } }, metadata: _metadata }, _ternary_initializers, _ternary_extraInitializers);
        __esDecorate(null, null, _pipe_decorators, { kind: "field", name: "pipe", static: false, private: false, access: { has: obj => "pipe" in obj, get: obj => obj.pipe, set: (obj, value) => { obj.pipe = value; } }, metadata: _metadata }, _pipe_initializers, _pipe_extraInitializers);
        __esDecorate(null, null, _and_decorators, { kind: "field", name: "and", static: false, private: false, access: { has: obj => "and" in obj, get: obj => obj.and, set: (obj, value) => { obj.and = value; } }, metadata: _metadata }, _and_initializers, _and_extraInitializers);
        __esDecorate(null, null, _or_decorators, { kind: "field", name: "or", static: false, private: false, access: { has: obj => "or" in obj, get: obj => obj.or, set: (obj, value) => { obj.or = value; } }, metadata: _metadata }, _or_initializers, _or_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DivDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DivDir = _classThis;
})();
exports.DivDir = DivDir;
let PipePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'pipe',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PipePipe = _classThis = class {
        transform(v, a, a2) { }
    };
    __setFunctionName(_classThis, "PipePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PipePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PipePipe = _classThis;
})();
exports.PipePipe = PipePipe;
let MyComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-component',
            template: `<div
    [ternary]="cond ? [a] : [0]"
    [pipe]="value | pipe:1:2"
    [and]="cond && [b]"
    [or]="cond || [c]"
  ></div>`,
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyComponent = _classThis = class {
        constructor() {
            this.id = 'one';
            this.cond = '';
            this.value = '';
            this.a = '';
            this.b = '';
            this.c = '';
        }
    };
    __setFunctionName(_classThis, "MyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyComponent = _classThis;
})();
exports.MyComponent = MyComponent;
let MyModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [MyComponent, DivDir, PipePipe] })];
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
