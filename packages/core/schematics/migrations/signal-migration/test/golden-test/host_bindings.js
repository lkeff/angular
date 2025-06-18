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
let HostBindingTestCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            host: {
                '[id]': 'id',
                '[nested]': 'nested.id',
                '[receiverNarrowing]': 'receiverNarrowing ? receiverNarrowing.id',
                // normal narrowing is irrelevant as we don't type check host bindings.
            },
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _myInput_decorators;
    let _myInput_initializers = [];
    let _myInput_extraInitializers = [];
    var HostBindingTestCmp = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, 'works');
            // for testing nested expressions.
            this.nested = (__runInitializers(this, _id_extraInitializers), this);
            this.myInput = __runInitializers(this, _myInput_initializers, 'initial');
            __runInitializers(this, _myInput_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HostBindingTestCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, core_1.Input)()];
        _myInput_decorators = [(0, core_1.HostBinding)('[attr.bla]'), (0, core_1.Input)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _myInput_decorators, { kind: "field", name: "myInput", static: false, private: false, access: { has: obj => "myInput" in obj, get: obj => obj.myInput, set: (obj, value) => { obj.myInput = value; } }, metadata: _metadata }, _myInput_initializers, _myInput_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HostBindingTestCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HostBindingTestCmp = _classThis;
})();
const SHARED = {
    '(click)': 'id',
    '(mousedown)': 'id2',
};
let HostBindingsShared = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            host: SHARED,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    var HostBindingsShared = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, false);
            __runInitializers(this, _id_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HostBindingsShared");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HostBindingsShared = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HostBindingsShared = _classThis;
})();
let HostBindingsShared2 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            host: SHARED,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _id2_decorators;
    let _id2_initializers = [];
    let _id2_extraInitializers = [];
    var HostBindingsShared2 = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, false);
            this.id2 = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _id2_initializers, false));
            __runInitializers(this, _id2_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HostBindingsShared2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, core_1.Input)()];
        _id2_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _id2_decorators, { kind: "field", name: "id2", static: false, private: false, access: { has: obj => "id2" in obj, get: obj => obj.id2, set: (obj, value) => { obj.id2 = value; } }, metadata: _metadata }, _id2_initializers, _id2_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HostBindingsShared2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HostBindingsShared2 = _classThis;
})();
