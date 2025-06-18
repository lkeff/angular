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
            template: '...',
            host: {
                '[@expansionHeight]': `{
        value: getExpandedState(),
        params: {
          collapsedHeight: collapsedHeight,
          expandedHeight: expandedHeight
        }
    }`,
                '[@expansionWidth]': `{
      value: getExpandedState(),
      params: {
        collapsedWidth: collapsedWidth,
        expandedWidth: expandedWidth
      }
    }`
            },
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _expandedHeight_decorators;
    let _expandedHeight_initializers = [];
    let _expandedHeight_extraInitializers = [];
    let _collapsedHeight_decorators;
    let _collapsedHeight_initializers = [];
    let _collapsedHeight_extraInitializers = [];
    let _expandedWidth_decorators;
    let _expandedWidth_initializers = [];
    let _expandedWidth_extraInitializers = [];
    let _collapsedWidth_decorators;
    let _collapsedWidth_initializers = [];
    let _collapsedWidth_extraInitializers = [];
    var MyComponent = _classThis = class {
        getExpandedState() {
            return 'expanded';
        }
        constructor() {
            this.expandedHeight = __runInitializers(this, _expandedHeight_initializers, void 0);
            this.collapsedHeight = (__runInitializers(this, _expandedHeight_extraInitializers), __runInitializers(this, _collapsedHeight_initializers, void 0));
            this.expandedWidth = (__runInitializers(this, _collapsedHeight_extraInitializers), __runInitializers(this, _expandedWidth_initializers, void 0));
            this.collapsedWidth = (__runInitializers(this, _expandedWidth_extraInitializers), __runInitializers(this, _collapsedWidth_initializers, void 0));
            __runInitializers(this, _collapsedWidth_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _expandedHeight_decorators = [(0, core_1.Input)()];
        _collapsedHeight_decorators = [(0, core_1.Input)()];
        _expandedWidth_decorators = [(0, core_1.Input)()];
        _collapsedWidth_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _expandedHeight_decorators, { kind: "field", name: "expandedHeight", static: false, private: false, access: { has: obj => "expandedHeight" in obj, get: obj => obj.expandedHeight, set: (obj, value) => { obj.expandedHeight = value; } }, metadata: _metadata }, _expandedHeight_initializers, _expandedHeight_extraInitializers);
        __esDecorate(null, null, _collapsedHeight_decorators, { kind: "field", name: "collapsedHeight", static: false, private: false, access: { has: obj => "collapsedHeight" in obj, get: obj => obj.collapsedHeight, set: (obj, value) => { obj.collapsedHeight = value; } }, metadata: _metadata }, _collapsedHeight_initializers, _collapsedHeight_extraInitializers);
        __esDecorate(null, null, _expandedWidth_decorators, { kind: "field", name: "expandedWidth", static: false, private: false, access: { has: obj => "expandedWidth" in obj, get: obj => obj.expandedWidth, set: (obj, value) => { obj.expandedWidth = value; } }, metadata: _metadata }, _expandedWidth_initializers, _expandedWidth_extraInitializers);
        __esDecorate(null, null, _collapsedWidth_decorators, { kind: "field", name: "collapsedWidth", static: false, private: false, access: { has: obj => "collapsedWidth" in obj, get: obj => obj.collapsedWidth, set: (obj, value) => { obj.collapsedWidth = value; } }, metadata: _metadata }, _collapsedWidth_initializers, _collapsedWidth_extraInitializers);
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
