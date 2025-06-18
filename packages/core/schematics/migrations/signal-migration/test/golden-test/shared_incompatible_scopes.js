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
exports.ScopeMismatchTest = void 0;
const core_1 = require("@angular/core");
let SomeDir = (() => {
    let _classDecorators = [(0, core_1.Directive)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _bla_decorators;
    let _bla_initializers = [];
    let _bla_extraInitializers = [];
    var SomeDir = _classThis = class {
        constructor() {
            this.bla = __runInitializers(this, _bla_initializers, void 0);
            __runInitializers(this, _bla_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SomeDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _bla_decorators = [(0, core_1.Input)({ required: true })];
        __esDecorate(null, null, _bla_decorators, { kind: "field", name: "bla", static: false, private: false, access: { has: obj => "bla" in obj, get: obj => obj.bla, set: (obj, value) => { obj.bla = value; } }, metadata: _metadata }, _bla_initializers, _bla_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeDir = _classThis;
})();
let ScopeMismatchTest = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: ``,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ScopeMismatchTest = _classThis = class {
        constructor() {
            this.dir = null;
        }
        eachScopeRedeclared() {
            const regexs = [];
            if (global.console) {
                const dir = null;
                regexs.push(dir.bla);
            }
            const dir = null;
            regexs.push(dir.bla);
        }
        nestedButSharedLocal() {
            const regexs = [];
            const dir = null;
            if (global.console) {
                regexs.push(dir.bla);
            }
            regexs.push(dir.bla);
        }
        nestedButSharedInClassInstance() {
            const regexs = [];
            if (global.console) {
                regexs.push(this.dir.bla);
            }
            regexs.push(this.dir.bla);
        }
    };
    __setFunctionName(_classThis, "ScopeMismatchTest");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ScopeMismatchTest = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ScopeMismatchTest = _classThis;
})();
exports.ScopeMismatchTest = ScopeMismatchTest;
