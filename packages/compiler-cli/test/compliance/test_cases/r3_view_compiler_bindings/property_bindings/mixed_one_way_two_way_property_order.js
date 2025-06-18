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
exports.App = exports.Dir = void 0;
const core_1 = require("@angular/core");
let Dir = (() => {
    let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _a_decorators;
    let _a_initializers = [];
    let _a_extraInitializers = [];
    let _aChange_decorators;
    let _aChange_initializers = [];
    let _aChange_extraInitializers = [];
    let _b_decorators;
    let _b_initializers = [];
    let _b_extraInitializers = [];
    let _c_decorators;
    let _c_initializers = [];
    let _c_extraInitializers = [];
    let _cChange_decorators;
    let _cChange_initializers = [];
    let _cChange_extraInitializers = [];
    let _d_decorators;
    let _d_initializers = [];
    let _d_extraInitializers = [];
    var Dir = _classThis = class {
        constructor() {
            this.a = __runInitializers(this, _a_initializers, void 0);
            this.aChange = (__runInitializers(this, _a_extraInitializers), __runInitializers(this, _aChange_initializers, void 0));
            this.b = (__runInitializers(this, _aChange_extraInitializers), __runInitializers(this, _b_initializers, void 0));
            this.c = (__runInitializers(this, _b_extraInitializers), __runInitializers(this, _c_initializers, void 0));
            this.cChange = (__runInitializers(this, _c_extraInitializers), __runInitializers(this, _cChange_initializers, void 0));
            this.d = (__runInitializers(this, _cChange_extraInitializers), __runInitializers(this, _d_initializers, void 0));
            __runInitializers(this, _d_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Dir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _a_decorators = [(0, core_1.Input)()];
        _aChange_decorators = [(0, core_1.Output)()];
        _b_decorators = [(0, core_1.Input)()];
        _c_decorators = [(0, core_1.Input)()];
        _cChange_decorators = [(0, core_1.Output)()];
        _d_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _a_decorators, { kind: "field", name: "a", static: false, private: false, access: { has: obj => "a" in obj, get: obj => obj.a, set: (obj, value) => { obj.a = value; } }, metadata: _metadata }, _a_initializers, _a_extraInitializers);
        __esDecorate(null, null, _aChange_decorators, { kind: "field", name: "aChange", static: false, private: false, access: { has: obj => "aChange" in obj, get: obj => obj.aChange, set: (obj, value) => { obj.aChange = value; } }, metadata: _metadata }, _aChange_initializers, _aChange_extraInitializers);
        __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
        __esDecorate(null, null, _c_decorators, { kind: "field", name: "c", static: false, private: false, access: { has: obj => "c" in obj, get: obj => obj.c, set: (obj, value) => { obj.c = value; } }, metadata: _metadata }, _c_initializers, _c_extraInitializers);
        __esDecorate(null, null, _cChange_decorators, { kind: "field", name: "cChange", static: false, private: false, access: { has: obj => "cChange" in obj, get: obj => obj.cChange, set: (obj, value) => { obj.cChange = value; } }, metadata: _metadata }, _cChange_initializers, _cChange_extraInitializers);
        __esDecorate(null, null, _d_decorators, { kind: "field", name: "d", static: false, private: false, access: { has: obj => "d" in obj, get: obj => obj.d, set: (obj, value) => { obj.d = value; } }, metadata: _metadata }, _d_initializers, _d_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Dir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Dir = _classThis;
})();
exports.Dir = Dir;
let App = (() => {
    let _classDecorators = [(0, core_1.Component)({
            imports: [Dir],
            template: `
    <div dir [(a)]="value" [b]="value" [(c)]="value" [d]="value"></div>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var App = _classThis = class {
        constructor() {
            this.value = 'hi';
        }
    };
    __setFunctionName(_classThis, "App");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        App = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return App = _classThis;
})();
exports.App = App;
