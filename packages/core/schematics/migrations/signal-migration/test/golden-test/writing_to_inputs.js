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
exports.TestCmp = void 0;
const core_1 = require("@angular/core");
let TestCmp = (() => {
    var _a;
    let _testParenthesisInput_decorators;
    let _testParenthesisInput_initializers = [];
    let _testParenthesisInput_extraInitializers = [];
    let _notMutated_decorators;
    let _notMutated_initializers = [];
    let _notMutated_extraInitializers = [];
    return _a = class TestCmp {
            testParenthesis() {
                // prettier-ignore
                ((this.testParenthesisInput)) = true;
            }
            testNotMutated() {
                let fixture;
                fixture = this.notMutated;
            }
            constructor() {
                this.testParenthesisInput = __runInitializers(this, _testParenthesisInput_initializers, false);
                this.notMutated = (__runInitializers(this, _testParenthesisInput_extraInitializers), __runInitializers(this, _notMutated_initializers, true));
                __runInitializers(this, _notMutated_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _testParenthesisInput_decorators = [(0, core_1.Input)()];
            _notMutated_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _testParenthesisInput_decorators, { kind: "field", name: "testParenthesisInput", static: false, private: false, access: { has: obj => "testParenthesisInput" in obj, get: obj => obj.testParenthesisInput, set: (obj, value) => { obj.testParenthesisInput = value; } }, metadata: _metadata }, _testParenthesisInput_initializers, _testParenthesisInput_extraInitializers);
            __esDecorate(null, null, _notMutated_decorators, { kind: "field", name: "notMutated", static: false, private: false, access: { has: obj => "notMutated" in obj, get: obj => obj.notMutated, set: (obj, value) => { obj.notMutated = value; } }, metadata: _metadata }, _notMutated_initializers, _notMutated_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.TestCmp = TestCmp;
