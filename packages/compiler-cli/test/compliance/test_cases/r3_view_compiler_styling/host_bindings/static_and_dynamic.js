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
            selector: 'my-component',
            template: '',
            host: { 'style': 'width:200px; height:500px', 'class': 'foo baz' },
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _myStyle_decorators;
    let _myStyle_initializers = [];
    let _myStyle_extraInitializers = [];
    let _myClass_decorators;
    let _myClass_initializers = [];
    let _myClass_extraInitializers = [];
    let _myColorProp_decorators;
    let _myColorProp_initializers = [];
    let _myColorProp_extraInitializers = [];
    let _myFooClass_decorators;
    let _myFooClass_initializers = [];
    let _myFooClass_extraInitializers = [];
    var MyComponent = _classThis = class {
        constructor() {
            this.myStyle = __runInitializers(this, _myStyle_initializers, { width: '100px' });
            this.myClass = (__runInitializers(this, _myStyle_extraInitializers), __runInitializers(this, _myClass_initializers, { bar: false }));
            this.myColorProp = (__runInitializers(this, _myClass_extraInitializers), __runInitializers(this, _myColorProp_initializers, 'red'));
            this.myFooClass = (__runInitializers(this, _myColorProp_extraInitializers), __runInitializers(this, _myFooClass_initializers, 'red'));
            __runInitializers(this, _myFooClass_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myStyle_decorators = [(0, core_1.HostBinding)('style')];
        _myClass_decorators = [(0, core_1.HostBinding)('class')];
        _myColorProp_decorators = [(0, core_1.HostBinding)('style.color')];
        _myFooClass_decorators = [(0, core_1.HostBinding)('class.foo')];
        __esDecorate(null, null, _myStyle_decorators, { kind: "field", name: "myStyle", static: false, private: false, access: { has: obj => "myStyle" in obj, get: obj => obj.myStyle, set: (obj, value) => { obj.myStyle = value; } }, metadata: _metadata }, _myStyle_initializers, _myStyle_extraInitializers);
        __esDecorate(null, null, _myClass_decorators, { kind: "field", name: "myClass", static: false, private: false, access: { has: obj => "myClass" in obj, get: obj => obj.myClass, set: (obj, value) => { obj.myClass = value; } }, metadata: _metadata }, _myClass_initializers, _myClass_extraInitializers);
        __esDecorate(null, null, _myColorProp_decorators, { kind: "field", name: "myColorProp", static: false, private: false, access: { has: obj => "myColorProp" in obj, get: obj => obj.myColorProp, set: (obj, value) => { obj.myColorProp = value; } }, metadata: _metadata }, _myColorProp_initializers, _myColorProp_extraInitializers);
        __esDecorate(null, null, _myFooClass_decorators, { kind: "field", name: "myFooClass", static: false, private: false, access: { has: obj => "myFooClass" in obj, get: obj => obj.myFooClass, set: (obj, value) => { obj.myFooClass = value; } }, metadata: _metadata }, _myFooClass_initializers, _myFooClass_extraInitializers);
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
