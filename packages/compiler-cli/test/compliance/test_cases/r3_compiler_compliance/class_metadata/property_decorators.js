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
exports.MyDir = void 0;
const core_1 = require("@angular/core");
const custom_1 = require("./custom");
let MyDir = (() => {
    let _classDecorators = [(0, core_1.Directive)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _foo_decorators;
    let _foo_initializers = [];
    let _foo_extraInitializers = [];
    let _bar_decorators;
    let _bar_initializers = [];
    let _bar_extraInitializers = [];
    let _custom_decorators;
    let _custom_initializers = [];
    let _custom_extraInitializers = [];
    let _mixed_decorators;
    let _mixed_initializers = [];
    let _mixed_extraInitializers = [];
    var MyDir = _classThis = class {
        constructor() {
            this.foo = __runInitializers(this, _foo_initializers, void 0);
            this.bar = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _bar_initializers, void 0));
            this.custom = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _custom_initializers, void 0));
            this.mixed = (__runInitializers(this, _custom_extraInitializers), __runInitializers(this, _mixed_initializers, void 0));
            this.none = __runInitializers(this, _mixed_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MyDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _foo_decorators = [(0, core_1.Input)()];
        _bar_decorators = [(0, core_1.Input)('baz')];
        _custom_decorators = [(0, custom_1.CustomPropDecorator)()];
        _mixed_decorators = [(0, core_1.Input)(), (0, core_1.Output)(), (0, custom_1.CustomPropDecorator)()];
        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
        __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
        __esDecorate(null, null, _custom_decorators, { kind: "field", name: "custom", static: false, private: false, access: { has: obj => "custom" in obj, get: obj => obj.custom, set: (obj, value) => { obj.custom = value; } }, metadata: _metadata }, _custom_initializers, _custom_extraInitializers);
        __esDecorate(null, null, _mixed_decorators, { kind: "field", name: "mixed", static: false, private: false, access: { has: obj => "mixed" in obj, get: obj => obj.mixed, set: (obj, value) => { obj.mixed = value; } }, metadata: _metadata }, _mixed_initializers, _mixed_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyDir = _classThis;
})();
exports.MyDir = MyDir;
