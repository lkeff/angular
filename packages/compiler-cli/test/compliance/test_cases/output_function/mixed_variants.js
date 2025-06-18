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
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
let TestDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            standalone: true,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _clickDecorator1_decorators;
    let _clickDecorator1_initializers = [];
    let _clickDecorator1_extraInitializers = [];
    let _clickDecorator2_decorators;
    let _clickDecorator2_initializers = [];
    let _clickDecorator2_extraInitializers = [];
    let __blaDecorator_decorators;
    let __blaDecorator_initializers = [];
    let __blaDecorator_extraInitializers = [];
    var TestDir = _classThis = class {
        constructor() {
            this.click1 = (0, core_1.output)();
            this.click2 = (0, core_1.output)();
            this.click3 = (0, rxjs_interop_1.outputFromObservable)(new core_1.EventEmitter());
            this._bla = (0, core_1.output)({ alias: 'decoratorPublicName' });
            this._bla2 = (0, rxjs_interop_1.outputFromObservable)(new core_1.EventEmitter(), { alias: 'decoratorPublicName2' });
            this.clickDecorator1 = __runInitializers(this, _clickDecorator1_initializers, new core_1.EventEmitter());
            this.clickDecorator2 = (__runInitializers(this, _clickDecorator1_extraInitializers), __runInitializers(this, _clickDecorator2_initializers, new core_1.EventEmitter()));
            this._blaDecorator = (__runInitializers(this, _clickDecorator2_extraInitializers), __runInitializers(this, __blaDecorator_initializers, new core_1.EventEmitter()));
            __runInitializers(this, __blaDecorator_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TestDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _clickDecorator1_decorators = [(0, core_1.Output)()];
        _clickDecorator2_decorators = [(0, core_1.Output)()];
        __blaDecorator_decorators = [(0, core_1.Output)('decoratorPublicName')];
        __esDecorate(null, null, _clickDecorator1_decorators, { kind: "field", name: "clickDecorator1", static: false, private: false, access: { has: obj => "clickDecorator1" in obj, get: obj => obj.clickDecorator1, set: (obj, value) => { obj.clickDecorator1 = value; } }, metadata: _metadata }, _clickDecorator1_initializers, _clickDecorator1_extraInitializers);
        __esDecorate(null, null, _clickDecorator2_decorators, { kind: "field", name: "clickDecorator2", static: false, private: false, access: { has: obj => "clickDecorator2" in obj, get: obj => obj.clickDecorator2, set: (obj, value) => { obj.clickDecorator2 = value; } }, metadata: _metadata }, _clickDecorator2_initializers, _clickDecorator2_extraInitializers);
        __esDecorate(null, null, __blaDecorator_decorators, { kind: "field", name: "_blaDecorator", static: false, private: false, access: { has: obj => "_blaDecorator" in obj, get: obj => obj._blaDecorator, set: (obj, value) => { obj._blaDecorator = value; } }, metadata: _metadata }, __blaDecorator_initializers, __blaDecorator_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestDir = _classThis;
})();
exports.TestDir = TestDir;
