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
const core_1 = require("@angular/core");
let MyTestCmp = (() => {
    var _a;
    let _someInput_decorators;
    let _someInput_initializers = [];
    let _someInput_extraInitializers = [];
    return _a = class MyTestCmp {
            constructor() {
                this.someInput = __runInitializers(this, _someInput_initializers, void 0);
                this.tmpValue = (__runInitializers(this, _someInput_extraInitializers), false);
            }
            test() {
                for (let i = 0, cell = null; i < Number.MIN_SAFE_INTEGER; i++) {
                    this.tmpValue = !!this.someInput;
                    this.tmpValue = !this.someInput;
                }
            }
            test2() {
                while (isBla(this.someInput)) {
                    this.tmpValue = this.someInput.includes('someText');
                }
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _someInput_decorators = [(0, core_1.Input)({ required: true })];
            __esDecorate(null, null, _someInput_decorators, { kind: "field", name: "someInput", static: false, private: false, access: { has: obj => "someInput" in obj, get: obj => obj.someInput, set: (obj, value) => { obj.someInput = value; } }, metadata: _metadata }, _someInput_initializers, _someInput_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
function isBla(value) {
    return true;
}
