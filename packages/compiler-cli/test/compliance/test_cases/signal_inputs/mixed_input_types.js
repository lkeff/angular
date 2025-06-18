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
exports.TestDir = void 0;
const core_1 = require("@angular/core");
function convertToBoolean(value) {
    return value === true || value !== '';
}
let TestDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({})];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _decoratorInput_decorators;
    let _decoratorInput_initializers = [];
    let _decoratorInput_extraInitializers = [];
    let _decoratorInputWithAlias_decorators;
    let _decoratorInputWithAlias_initializers = [];
    let _decoratorInputWithAlias_extraInitializers = [];
    let _decoratorInputWithTransformAndAlias_decorators;
    let _decoratorInputWithTransformAndAlias_initializers = [];
    let _decoratorInputWithTransformAndAlias_extraInitializers = [];
    var TestDir = _classThis = class {
        constructor() {
            this.counter = (0, core_1.input)(0);
            this.signalWithTransform = (0, core_1.input)(false, { transform: convertToBoolean });
            this.signalWithTransformAndAlias = (0, core_1.input)(false, { alias: 'publicNameSignal', transform: convertToBoolean });
            this.decoratorInput = __runInitializers(this, _decoratorInput_initializers, true);
            this.decoratorInputWithAlias = (__runInitializers(this, _decoratorInput_extraInitializers), __runInitializers(this, _decoratorInputWithAlias_initializers, true));
            this.decoratorInputWithTransformAndAlias = (__runInitializers(this, _decoratorInputWithAlias_extraInitializers), __runInitializers(this, _decoratorInputWithTransformAndAlias_initializers, true));
            __runInitializers(this, _decoratorInputWithTransformAndAlias_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TestDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _decoratorInput_decorators = [(0, core_1.Input)()];
        _decoratorInputWithAlias_decorators = [(0, core_1.Input)('publicNameDecorator')];
        _decoratorInputWithTransformAndAlias_decorators = [(0, core_1.Input)({ alias: 'publicNameDecorator2', transform: convertToBoolean })];
        __esDecorate(null, null, _decoratorInput_decorators, { kind: "field", name: "decoratorInput", static: false, private: false, access: { has: obj => "decoratorInput" in obj, get: obj => obj.decoratorInput, set: (obj, value) => { obj.decoratorInput = value; } }, metadata: _metadata }, _decoratorInput_initializers, _decoratorInput_extraInitializers);
        __esDecorate(null, null, _decoratorInputWithAlias_decorators, { kind: "field", name: "decoratorInputWithAlias", static: false, private: false, access: { has: obj => "decoratorInputWithAlias" in obj, get: obj => obj.decoratorInputWithAlias, set: (obj, value) => { obj.decoratorInputWithAlias = value; } }, metadata: _metadata }, _decoratorInputWithAlias_initializers, _decoratorInputWithAlias_extraInitializers);
        __esDecorate(null, null, _decoratorInputWithTransformAndAlias_decorators, { kind: "field", name: "decoratorInputWithTransformAndAlias", static: false, private: false, access: { has: obj => "decoratorInputWithTransformAndAlias" in obj, get: obj => obj.decoratorInputWithTransformAndAlias, set: (obj, value) => { obj.decoratorInputWithTransformAndAlias = value; } }, metadata: _metadata }, _decoratorInputWithTransformAndAlias_initializers, _decoratorInputWithTransformAndAlias_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestDir = _classThis;
})();
exports.TestDir = TestDir;
