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
exports.MyComponent = exports.HostDir = void 0;
const core_1 = require("@angular/core");
let HostDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({})];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _color_decorators;
    let _color_initializers = [];
    let _color_extraInitializers = [];
    let _opened_decorators;
    let _opened_initializers = [];
    let _opened_extraInitializers = [];
    let _closed_decorators;
    let _closed_initializers = [];
    let _closed_extraInitializers = [];
    var HostDir = _classThis = class {
        constructor() {
            this.value = __runInitializers(this, _value_initializers, void 0);
            this.color = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _color_initializers, void 0));
            this.opened = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _opened_initializers, new core_1.EventEmitter()));
            this.closed = (__runInitializers(this, _opened_extraInitializers), __runInitializers(this, _closed_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _closed_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HostDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _value_decorators = [(0, core_1.Input)('valueAlias')];
        _color_decorators = [(0, core_1.Input)('colorAlias')];
        _opened_decorators = [(0, core_1.Output)('openedAlias')];
        _closed_decorators = [(0, core_1.Output)('closedAlias')];
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
        __esDecorate(null, null, _opened_decorators, { kind: "field", name: "opened", static: false, private: false, access: { has: obj => "opened" in obj, get: obj => obj.opened, set: (obj, value) => { obj.opened = value; } }, metadata: _metadata }, _opened_initializers, _opened_extraInitializers);
        __esDecorate(null, null, _closed_decorators, { kind: "field", name: "closed", static: false, private: false, access: { has: obj => "closed" in obj, get: obj => obj.closed, set: (obj, value) => { obj.closed = value; } }, metadata: _metadata }, _closed_initializers, _closed_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HostDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HostDir = _classThis;
})();
exports.HostDir = HostDir;
let MyComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'my-component',
            template: '',
            hostDirectives: [{
                    directive: HostDir,
                    inputs: ['valueAlias', 'colorAlias: customColorAlias'],
                    outputs: ['openedAlias', 'closedAlias: customClosedAlias'],
                }],
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
