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
exports.MyModule = exports.MyApp = exports.ContentQueryComponent = void 0;
const core_1 = require("@angular/core");
const some_directive_1 = require("./some.directive");
let ContentQueryComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'content-query-component',
            template: `
    <div><ng-content></ng-content></div>
  `,
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _someDir_decorators;
    let _someDir_initializers = [];
    let _someDir_extraInitializers = [];
    let _someDirList_decorators;
    let _someDirList_initializers = [];
    let _someDirList_extraInitializers = [];
    var ContentQueryComponent = _classThis = class {
        constructor() {
            this.someDir = __runInitializers(this, _someDir_initializers, void 0);
            this.someDirList = (__runInitializers(this, _someDir_extraInitializers), __runInitializers(this, _someDirList_initializers, void 0));
            __runInitializers(this, _someDirList_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ContentQueryComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _someDir_decorators = [(0, core_1.ContentChild)(some_directive_1.SomeDirective)];
        _someDirList_decorators = [(0, core_1.ContentChildren)(some_directive_1.SomeDirective)];
        __esDecorate(null, null, _someDir_decorators, { kind: "field", name: "someDir", static: false, private: false, access: { has: obj => "someDir" in obj, get: obj => obj.someDir, set: (obj, value) => { obj.someDir = value; } }, metadata: _metadata }, _someDir_initializers, _someDir_extraInitializers);
        __esDecorate(null, null, _someDirList_decorators, { kind: "field", name: "someDirList", static: false, private: false, access: { has: obj => "someDirList" in obj, get: obj => obj.someDirList, set: (obj, value) => { obj.someDirList = value; } }, metadata: _metadata }, _someDirList_initializers, _someDirList_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContentQueryComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContentQueryComponent = _classThis;
})();
exports.ContentQueryComponent = ContentQueryComponent;
let MyApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-app',
            template: `
    <content-query-component>
      <div someDir></div>
    </content-query-component>
  `,
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyApp = _classThis = class {
    };
    __setFunctionName(_classThis, "MyApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyApp = _classThis;
})();
exports.MyApp = MyApp;
let MyModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [some_directive_1.SomeDirective, ContentQueryComponent, MyApp] })];
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
