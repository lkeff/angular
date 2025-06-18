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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformFunctions = void 0;
const core_1 = require("@angular/core");
const required_no_explicit_type_extra_1 = require("./required-no-explicit-type-extra");
function x(v) {
    return v;
}
let TransformFunctions = (() => {
    var _a;
    let _withExplicitTypeWorks_decorators;
    let _withExplicitTypeWorks_initializers = [];
    let _withExplicitTypeWorks_extraInitializers = [];
    let _synthetic1_decorators;
    let _synthetic1_initializers = [];
    let _synthetic1_extraInitializers = [];
    let _synthetic2_decorators;
    let _synthetic2_initializers = [];
    let _synthetic2_extraInitializers = [];
    return _a = class TransformFunctions {
            constructor() {
                // We can check this, and expect `as any` due to transform incompatibility.
                this.withExplicitTypeWorks = __runInitializers(this, _withExplicitTypeWorks_initializers, null);
                // This will be a synthetic type because we add `undefined` to `boolean`.
                this.synthetic1 = (__runInitializers(this, _withExplicitTypeWorks_extraInitializers), __runInitializers(this, _synthetic1_initializers, void 0));
                // Synthetic as we infer a full type from the initial value. Cannot be checked.
                this.synthetic2 = (__runInitializers(this, _synthetic1_extraInitializers), __runInitializers(this, _synthetic2_initializers, {
                    infer: required_no_explicit_type_extra_1.COMPLEX_VAR,
                }));
                __runInitializers(this, _synthetic2_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _withExplicitTypeWorks_decorators = [(0, core_1.Input)({ required: true, transform: (v) => '' })];
            _synthetic1_decorators = [(0, core_1.Input)({ required: true, transform: x })];
            _synthetic2_decorators = [(0, core_1.Input)({ required: true, transform: (v) => '' })];
            __esDecorate(null, null, _withExplicitTypeWorks_decorators, { kind: "field", name: "withExplicitTypeWorks", static: false, private: false, access: { has: obj => "withExplicitTypeWorks" in obj, get: obj => obj.withExplicitTypeWorks, set: (obj, value) => { obj.withExplicitTypeWorks = value; } }, metadata: _metadata }, _withExplicitTypeWorks_initializers, _withExplicitTypeWorks_extraInitializers);
            __esDecorate(null, null, _synthetic1_decorators, { kind: "field", name: "synthetic1", static: false, private: false, access: { has: obj => "synthetic1" in obj, get: obj => obj.synthetic1, set: (obj, value) => { obj.synthetic1 = value; } }, metadata: _metadata }, _synthetic1_initializers, _synthetic1_extraInitializers);
            __esDecorate(null, null, _synthetic2_decorators, { kind: "field", name: "synthetic2", static: false, private: false, access: { has: obj => "synthetic2" in obj, get: obj => obj.synthetic2, set: (obj, value) => { obj.synthetic2 = value; } }, metadata: _metadata }, _synthetic2_initializers, _synthetic2_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.TransformFunctions = TransformFunctions;
