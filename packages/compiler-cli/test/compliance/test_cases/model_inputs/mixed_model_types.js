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
    let _decoratorOutput_decorators;
    let _decoratorOutput_initializers = [];
    let _decoratorOutput_extraInitializers = [];
    let _decoratorOutputWithAlias_decorators;
    let _decoratorOutputWithAlias_initializers = [];
    let _decoratorOutputWithAlias_extraInitializers = [];
    let _decoratorInputTwoWay_decorators;
    let _decoratorInputTwoWay_initializers = [];
    let _decoratorInputTwoWay_extraInitializers = [];
    let _decoratorInputTwoWayChange_decorators;
    let _decoratorInputTwoWayChange_initializers = [];
    let _decoratorInputTwoWayChange_extraInitializers = [];
    var TestDir = _classThis = class {
        constructor() {
            this.counter = (0, core_1.model)(0);
            this.modelWithAlias = (0, core_1.model)(false, { alias: 'alias' });
            this.decoratorInput = __runInitializers(this, _decoratorInput_initializers, true);
            this.decoratorInputWithAlias = (__runInitializers(this, _decoratorInput_extraInitializers), __runInitializers(this, _decoratorInputWithAlias_initializers, true));
            this.decoratorOutput = (__runInitializers(this, _decoratorInputWithAlias_extraInitializers), __runInitializers(this, _decoratorOutput_initializers, new core_1.EventEmitter()));
            this.decoratorOutputWithAlias = (__runInitializers(this, _decoratorOutput_extraInitializers), __runInitializers(this, _decoratorOutputWithAlias_initializers, new core_1.EventEmitter()));
            this.decoratorInputTwoWay = (__runInitializers(this, _decoratorOutputWithAlias_extraInitializers), __runInitializers(this, _decoratorInputTwoWay_initializers, true));
            this.decoratorInputTwoWayChange = (__runInitializers(this, _decoratorInputTwoWay_extraInitializers), __runInitializers(this, _decoratorInputTwoWayChange_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _decoratorInputTwoWayChange_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TestDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _decoratorInput_decorators = [(0, core_1.Input)()];
        _decoratorInputWithAlias_decorators = [(0, core_1.Input)('publicNameDecorator')];
        _decoratorOutput_decorators = [(0, core_1.Output)()];
        _decoratorOutputWithAlias_decorators = [(0, core_1.Output)('aliasDecoratorOutputWithAlias')];
        _decoratorInputTwoWay_decorators = [(0, core_1.Input)()];
        _decoratorInputTwoWayChange_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _decoratorInput_decorators, { kind: "field", name: "decoratorInput", static: false, private: false, access: { has: obj => "decoratorInput" in obj, get: obj => obj.decoratorInput, set: (obj, value) => { obj.decoratorInput = value; } }, metadata: _metadata }, _decoratorInput_initializers, _decoratorInput_extraInitializers);
        __esDecorate(null, null, _decoratorInputWithAlias_decorators, { kind: "field", name: "decoratorInputWithAlias", static: false, private: false, access: { has: obj => "decoratorInputWithAlias" in obj, get: obj => obj.decoratorInputWithAlias, set: (obj, value) => { obj.decoratorInputWithAlias = value; } }, metadata: _metadata }, _decoratorInputWithAlias_initializers, _decoratorInputWithAlias_extraInitializers);
        __esDecorate(null, null, _decoratorOutput_decorators, { kind: "field", name: "decoratorOutput", static: false, private: false, access: { has: obj => "decoratorOutput" in obj, get: obj => obj.decoratorOutput, set: (obj, value) => { obj.decoratorOutput = value; } }, metadata: _metadata }, _decoratorOutput_initializers, _decoratorOutput_extraInitializers);
        __esDecorate(null, null, _decoratorOutputWithAlias_decorators, { kind: "field", name: "decoratorOutputWithAlias", static: false, private: false, access: { has: obj => "decoratorOutputWithAlias" in obj, get: obj => obj.decoratorOutputWithAlias, set: (obj, value) => { obj.decoratorOutputWithAlias = value; } }, metadata: _metadata }, _decoratorOutputWithAlias_initializers, _decoratorOutputWithAlias_extraInitializers);
        __esDecorate(null, null, _decoratorInputTwoWay_decorators, { kind: "field", name: "decoratorInputTwoWay", static: false, private: false, access: { has: obj => "decoratorInputTwoWay" in obj, get: obj => obj.decoratorInputTwoWay, set: (obj, value) => { obj.decoratorInputTwoWay = value; } }, metadata: _metadata }, _decoratorInputTwoWay_initializers, _decoratorInputTwoWay_extraInitializers);
        __esDecorate(null, null, _decoratorInputTwoWayChange_decorators, { kind: "field", name: "decoratorInputTwoWayChange", static: false, private: false, access: { has: obj => "decoratorInputTwoWayChange" in obj, get: obj => obj.decoratorInputTwoWayChange, set: (obj, value) => { obj.decoratorInputTwoWayChange = value; } }, metadata: _metadata }, _decoratorInputTwoWayChange_initializers, _decoratorInputTwoWayChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestDir = _classThis;
})();
exports.TestDir = TestDir;
