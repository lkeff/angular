"use strict";
// tslint:disable
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
const core_1 = require("@angular/core");
function CustomDecorator() {
    return (a, b) => { };
}
let ModifierScenarios = (() => {
    let _classDecorators = [(0, core_1.Component)({ template: '' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _alreadyReadonly_decorators;
    let _alreadyReadonly_initializers = [];
    let _alreadyReadonly_extraInitializers = [];
    let _ImProtected_decorators;
    let _ImProtected_initializers = [];
    let _ImProtected_extraInitializers = [];
    let _ImProtectedAndReadonly_decorators;
    let _ImProtectedAndReadonly_initializers = [];
    let _ImProtectedAndReadonly_extraInitializers = [];
    let _usingCustomDecorator_decorators;
    let _usingCustomDecorator_initializers = [];
    let _usingCustomDecorator_extraInitializers = [];
    var ModifierScenarios = _classThis = class {
        constructor() {
            this.alreadyReadonly = __runInitializers(this, _alreadyReadonly_initializers, true);
            this.ImProtected = (__runInitializers(this, _alreadyReadonly_extraInitializers), __runInitializers(this, _ImProtected_initializers, true));
            this.ImProtectedAndReadonly = (__runInitializers(this, _ImProtected_extraInitializers), __runInitializers(this, _ImProtectedAndReadonly_initializers, true));
            this.usingCustomDecorator = (__runInitializers(this, _ImProtectedAndReadonly_extraInitializers), __runInitializers(this, _usingCustomDecorator_initializers, true));
            __runInitializers(this, _usingCustomDecorator_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ModifierScenarios");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _alreadyReadonly_decorators = [(0, core_1.Input)()];
        _ImProtected_decorators = [(0, core_1.Input)()];
        _ImProtectedAndReadonly_decorators = [(0, core_1.Input)()];
        _usingCustomDecorator_decorators = [(0, core_1.Input)(), CustomDecorator()];
        __esDecorate(null, null, _alreadyReadonly_decorators, { kind: "field", name: "alreadyReadonly", static: false, private: false, access: { has: obj => "alreadyReadonly" in obj, get: obj => obj.alreadyReadonly, set: (obj, value) => { obj.alreadyReadonly = value; } }, metadata: _metadata }, _alreadyReadonly_initializers, _alreadyReadonly_extraInitializers);
        __esDecorate(null, null, _ImProtected_decorators, { kind: "field", name: "ImProtected", static: false, private: false, access: { has: obj => "ImProtected" in obj, get: obj => obj.ImProtected, set: (obj, value) => { obj.ImProtected = value; } }, metadata: _metadata }, _ImProtected_initializers, _ImProtected_extraInitializers);
        __esDecorate(null, null, _ImProtectedAndReadonly_decorators, { kind: "field", name: "ImProtectedAndReadonly", static: false, private: false, access: { has: obj => "ImProtectedAndReadonly" in obj, get: obj => obj.ImProtectedAndReadonly, set: (obj, value) => { obj.ImProtectedAndReadonly = value; } }, metadata: _metadata }, _ImProtectedAndReadonly_initializers, _ImProtectedAndReadonly_extraInitializers);
        __esDecorate(null, null, _usingCustomDecorator_decorators, { kind: "field", name: "usingCustomDecorator", static: false, private: false, access: { has: obj => "usingCustomDecorator" in obj, get: obj => obj.usingCustomDecorator, set: (obj, value) => { obj.usingCustomDecorator = value; } }, metadata: _metadata }, _usingCustomDecorator_initializers, _usingCustomDecorator_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ModifierScenarios = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ModifierScenarios = _classThis;
})();
