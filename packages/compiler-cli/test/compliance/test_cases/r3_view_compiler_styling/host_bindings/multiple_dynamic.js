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
            host: { '[style.height.pt]': 'myHeightProp', '[class.bar]': 'myBarClass' },
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _myStyle_decorators;
    let _myStyle_initializers = [];
    let _myStyle_extraInitializers = [];
    let _myWidthProp_decorators;
    let _myWidthProp_initializers = [];
    let _myWidthProp_extraInitializers = [];
    let _myFooClass_decorators;
    let _myFooClass_initializers = [];
    let _myFooClass_extraInitializers = [];
    let _myClasses_decorators;
    let _myClasses_initializers = [];
    let _myClasses_extraInitializers = [];
    var MyComponent = _classThis = class {
        constructor() {
            this.myHeightProp = 20;
            this.myBarClass = true;
            this.myStyle = __runInitializers(this, _myStyle_initializers, {});
            this.myWidthProp = (__runInitializers(this, _myStyle_extraInitializers), __runInitializers(this, _myWidthProp_initializers, '500px'));
            this.myFooClass = (__runInitializers(this, _myWidthProp_extraInitializers), __runInitializers(this, _myFooClass_initializers, true));
            this.myClasses = (__runInitializers(this, _myFooClass_extraInitializers), __runInitializers(this, _myClasses_initializers, { a: true, b: true }));
            __runInitializers(this, _myClasses_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myStyle_decorators = [(0, core_1.HostBinding)('style')];
        _myWidthProp_decorators = [(0, core_1.HostBinding)('style.width')];
        _myFooClass_decorators = [(0, core_1.HostBinding)('class.foo')];
        _myClasses_decorators = [(0, core_1.HostBinding)('class')];
        __esDecorate(null, null, _myStyle_decorators, { kind: "field", name: "myStyle", static: false, private: false, access: { has: obj => "myStyle" in obj, get: obj => obj.myStyle, set: (obj, value) => { obj.myStyle = value; } }, metadata: _metadata }, _myStyle_initializers, _myStyle_extraInitializers);
        __esDecorate(null, null, _myWidthProp_decorators, { kind: "field", name: "myWidthProp", static: false, private: false, access: { has: obj => "myWidthProp" in obj, get: obj => obj.myWidthProp, set: (obj, value) => { obj.myWidthProp = value; } }, metadata: _metadata }, _myWidthProp_initializers, _myWidthProp_extraInitializers);
        __esDecorate(null, null, _myFooClass_decorators, { kind: "field", name: "myFooClass", static: false, private: false, access: { has: obj => "myFooClass" in obj, get: obj => obj.myFooClass, set: (obj, value) => { obj.myFooClass = value; } }, metadata: _metadata }, _myFooClass_initializers, _myFooClass_extraInitializers);
        __esDecorate(null, null, _myClasses_decorators, { kind: "field", name: "myClasses", static: false, private: false, access: { has: obj => "myClasses" in obj, get: obj => obj.myClasses, set: (obj, value) => { obj.myClasses = value; } }, metadata: _metadata }, _myClasses_initializers, _myClasses_extraInitializers);
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
