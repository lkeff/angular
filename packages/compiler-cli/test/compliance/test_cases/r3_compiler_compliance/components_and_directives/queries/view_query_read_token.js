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
exports.MyModule = exports.ViewQueryComponent = void 0;
const core_1 = require("@angular/core");
const some_directive_1 = require("./some.directive");
let ViewQueryComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'view-query-component',
            template: `
    <div someDir></div>
    <div #myRef></div>
    <div #myRef1></div>
  `,
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _myRef_decorators;
    let _myRef_initializers = [];
    let _myRef_extraInitializers = [];
    let _myRefs_decorators;
    let _myRefs_initializers = [];
    let _myRefs_extraInitializers = [];
    let _someDir_decorators;
    let _someDir_initializers = [];
    let _someDir_extraInitializers = [];
    let _someDirs_decorators;
    let _someDirs_initializers = [];
    let _someDirs_extraInitializers = [];
    var ViewQueryComponent = _classThis = class {
        constructor() {
            this.myRef = __runInitializers(this, _myRef_initializers, void 0);
            this.myRefs = (__runInitializers(this, _myRef_extraInitializers), __runInitializers(this, _myRefs_initializers, void 0));
            this.someDir = (__runInitializers(this, _myRefs_extraInitializers), __runInitializers(this, _someDir_initializers, void 0));
            this.someDirs = (__runInitializers(this, _someDir_extraInitializers), __runInitializers(this, _someDirs_initializers, void 0));
            __runInitializers(this, _someDirs_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ViewQueryComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myRef_decorators = [(0, core_1.ViewChild)('myRef', { read: core_1.TemplateRef })];
        _myRefs_decorators = [(0, core_1.ViewChildren)('myRef1, myRef2, myRef3', { read: core_1.ElementRef })];
        _someDir_decorators = [(0, core_1.ViewChild)(some_directive_1.SomeDirective, { read: core_1.ElementRef })];
        _someDirs_decorators = [(0, core_1.ViewChildren)(some_directive_1.SomeDirective, { read: core_1.TemplateRef })];
        __esDecorate(null, null, _myRef_decorators, { kind: "field", name: "myRef", static: false, private: false, access: { has: obj => "myRef" in obj, get: obj => obj.myRef, set: (obj, value) => { obj.myRef = value; } }, metadata: _metadata }, _myRef_initializers, _myRef_extraInitializers);
        __esDecorate(null, null, _myRefs_decorators, { kind: "field", name: "myRefs", static: false, private: false, access: { has: obj => "myRefs" in obj, get: obj => obj.myRefs, set: (obj, value) => { obj.myRefs = value; } }, metadata: _metadata }, _myRefs_initializers, _myRefs_extraInitializers);
        __esDecorate(null, null, _someDir_decorators, { kind: "field", name: "someDir", static: false, private: false, access: { has: obj => "someDir" in obj, get: obj => obj.someDir, set: (obj, value) => { obj.someDir = value; } }, metadata: _metadata }, _someDir_initializers, _someDir_extraInitializers);
        __esDecorate(null, null, _someDirs_decorators, { kind: "field", name: "someDirs", static: false, private: false, access: { has: obj => "someDirs" in obj, get: obj => obj.someDirs, set: (obj, value) => { obj.someDirs = value; } }, metadata: _metadata }, _someDirs_initializers, _someDirs_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewQueryComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewQueryComponent = _classThis;
})();
exports.ViewQueryComponent = ViewQueryComponent;
let MyModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [ViewQueryComponent] })];
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
