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
exports.MyModule = exports.MyComponent = exports.HeightDirective = exports.WidthDirective = exports.ClassDirective = void 0;
const core_1 = require("@angular/core");
let ClassDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[myClassDir]',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _myClassMap_decorators;
    let _myClassMap_initializers = [];
    let _myClassMap_extraInitializers = [];
    var ClassDirective = _classThis = class {
        constructor() {
            this.myClassMap = __runInitializers(this, _myClassMap_initializers, { red: true });
            __runInitializers(this, _myClassMap_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ClassDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myClassMap_decorators = [(0, core_1.HostBinding)('class')];
        __esDecorate(null, null, _myClassMap_decorators, { kind: "field", name: "myClassMap", static: false, private: false, access: { has: obj => "myClassMap" in obj, get: obj => obj.myClassMap, set: (obj, value) => { obj.myClassMap = value; } }, metadata: _metadata }, _myClassMap_initializers, _myClassMap_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ClassDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ClassDirective = _classThis;
})();
exports.ClassDirective = ClassDirective;
let WidthDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[myWidthDir]',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _myWidth_decorators;
    let _myWidth_initializers = [];
    let _myWidth_extraInitializers = [];
    let _myFooClass_decorators;
    let _myFooClass_initializers = [];
    let _myFooClass_extraInitializers = [];
    var WidthDirective = _classThis = class {
        constructor() {
            this.myWidth = __runInitializers(this, _myWidth_initializers, 200);
            this.myFooClass = (__runInitializers(this, _myWidth_extraInitializers), __runInitializers(this, _myFooClass_initializers, true));
            __runInitializers(this, _myFooClass_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "WidthDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myWidth_decorators = [(0, core_1.HostBinding)('style.width')];
        _myFooClass_decorators = [(0, core_1.HostBinding)('class.foo')];
        __esDecorate(null, null, _myWidth_decorators, { kind: "field", name: "myWidth", static: false, private: false, access: { has: obj => "myWidth" in obj, get: obj => obj.myWidth, set: (obj, value) => { obj.myWidth = value; } }, metadata: _metadata }, _myWidth_initializers, _myWidth_extraInitializers);
        __esDecorate(null, null, _myFooClass_decorators, { kind: "field", name: "myFooClass", static: false, private: false, access: { has: obj => "myFooClass" in obj, get: obj => obj.myFooClass, set: (obj, value) => { obj.myFooClass = value; } }, metadata: _metadata }, _myFooClass_initializers, _myFooClass_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WidthDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WidthDirective = _classThis;
})();
exports.WidthDirective = WidthDirective;
let HeightDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[myHeightDir]',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _myHeight_decorators;
    let _myHeight_initializers = [];
    let _myHeight_extraInitializers = [];
    let _myBarClass_decorators;
    let _myBarClass_initializers = [];
    let _myBarClass_extraInitializers = [];
    var HeightDirective = _classThis = class {
        constructor() {
            this.myHeight = __runInitializers(this, _myHeight_initializers, 200);
            this.myBarClass = (__runInitializers(this, _myHeight_extraInitializers), __runInitializers(this, _myBarClass_initializers, true));
            __runInitializers(this, _myBarClass_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HeightDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myHeight_decorators = [(0, core_1.HostBinding)('style.height')];
        _myBarClass_decorators = [(0, core_1.HostBinding)('class.bar')];
        __esDecorate(null, null, _myHeight_decorators, { kind: "field", name: "myHeight", static: false, private: false, access: { has: obj => "myHeight" in obj, get: obj => obj.myHeight, set: (obj, value) => { obj.myHeight = value; } }, metadata: _metadata }, _myHeight_initializers, _myHeight_extraInitializers);
        __esDecorate(null, null, _myBarClass_decorators, { kind: "field", name: "myBarClass", static: false, private: false, access: { has: obj => "myBarClass" in obj, get: obj => obj.myBarClass, set: (obj, value) => { obj.myBarClass = value; } }, metadata: _metadata }, _myBarClass_initializers, _myBarClass_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeightDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeightDirective = _classThis;
})();
exports.HeightDirective = HeightDirective;
let MyComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-component',
            template: '<div myWidthDir myHeightDir myClassDir></div>',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyComponent = _classThis = class {
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
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [MyComponent, WidthDirective, HeightDirective, ClassDirective] })];
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
