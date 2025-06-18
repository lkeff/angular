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
exports.MyMod = exports.MyComponent = exports.CustomEl = exports.SpanDir = void 0;
const core_1 = require("@angular/core");
let SpanDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'span',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _someProp_decorators;
    let _someProp_initializers = [];
    let _someProp_extraInitializers = [];
    var SpanDir = _classThis = class {
        constructor() {
            this.someProp = __runInitializers(this, _someProp_initializers, void 0);
            __runInitializers(this, _someProp_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SpanDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _someProp_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _someProp_decorators, { kind: "field", name: "someProp", static: false, private: false, access: { has: obj => "someProp" in obj, get: obj => obj.someProp, set: (obj, value) => { obj.someProp = value; } }, metadata: _metadata }, _someProp_initializers, _someProp_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SpanDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SpanDir = _classThis;
})();
exports.SpanDir = SpanDir;
let CustomEl = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'custom-element', template: '',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _prop_decorators;
    let _prop_initializers = [];
    let _prop_extraInitializers = [];
    let _otherProp_decorators;
    let _otherProp_initializers = [];
    let _otherProp_extraInitializers = [];
    var CustomEl = _classThis = class {
        constructor() {
            this.prop = __runInitializers(this, _prop_initializers, void 0);
            this.otherProp = (__runInitializers(this, _prop_extraInitializers), __runInitializers(this, _otherProp_initializers, void 0));
            __runInitializers(this, _otherProp_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "CustomEl");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _prop_decorators = [(0, core_1.Input)()];
        _otherProp_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _prop_decorators, { kind: "field", name: "prop", static: false, private: false, access: { has: obj => "prop" in obj, get: obj => obj.prop, set: (obj, value) => { obj.prop = value; } }, metadata: _metadata }, _prop_initializers, _prop_extraInitializers);
        __esDecorate(null, null, _otherProp_decorators, { kind: "field", name: "otherProp", static: false, private: false, access: { has: obj => "otherProp" in obj, get: obj => obj.otherProp, set: (obj, value) => { obj.otherProp = value; } }, metadata: _metadata }, _otherProp_initializers, _otherProp_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomEl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomEl = _classThis;
})();
exports.CustomEl = CustomEl;
let MyComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    <button [title]="myTitle" [id]="buttonId" [tabindex]="1"></button>
    <span [id]="1" [title]="'hello'" [someProp]="1 + 2"></span>
    <custom-element [prop]="'one'" [otherProp]="2"></custom-element>
  `,
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyComponent = _classThis = class {
        constructor() {
            this.myTitle = 'hello';
            this.buttonId = 'special-button';
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
let MyMod = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [MyComponent, CustomEl, SpanDir] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyMod = _classThis = class {
    };
    __setFunctionName(_classThis, "MyMod");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyMod = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyMod = _classThis;
})();
exports.MyMod = MyMod;
