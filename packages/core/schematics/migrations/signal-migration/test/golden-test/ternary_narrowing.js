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
exports.OtherComponent = exports.TernaryNarrowing = void 0;
const core_1 = require("@angular/core");
let TernaryNarrowing = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    {{ narrowed ? narrowed.substring(0, 1) : 'Empty' }}
    {{ justChecked ? 'true' : 'false' }}

    {{ other?.safeRead ? other.safeRead : 'Empty' }}
    {{ other?.safeRead2 ? other?.safeRead2 : 'Empty' }}
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _narrowed_decorators;
    let _narrowed_initializers = [];
    let _narrowed_extraInitializers = [];
    let _justChecked_decorators;
    let _justChecked_initializers = [];
    let _justChecked_extraInitializers = [];
    var TernaryNarrowing = _classThis = class {
        constructor() {
            this.narrowed = __runInitializers(this, _narrowed_initializers, undefined);
            this.justChecked = (__runInitializers(this, _narrowed_extraInitializers), __runInitializers(this, _justChecked_initializers, true));
            this.other = __runInitializers(this, _justChecked_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "TernaryNarrowing");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _narrowed_decorators = [(0, core_1.Input)()];
        _justChecked_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _narrowed_decorators, { kind: "field", name: "narrowed", static: false, private: false, access: { has: obj => "narrowed" in obj, get: obj => obj.narrowed, set: (obj, value) => { obj.narrowed = value; } }, metadata: _metadata }, _narrowed_initializers, _narrowed_extraInitializers);
        __esDecorate(null, null, _justChecked_decorators, { kind: "field", name: "justChecked", static: false, private: false, access: { has: obj => "justChecked" in obj, get: obj => obj.justChecked, set: (obj, value) => { obj.justChecked = value; } }, metadata: _metadata }, _justChecked_initializers, _justChecked_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TernaryNarrowing = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TernaryNarrowing = _classThis;
})();
exports.TernaryNarrowing = TernaryNarrowing;
let OtherComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({ template: '' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _safeRead_decorators;
    let _safeRead_initializers = [];
    let _safeRead_extraInitializers = [];
    let _safeRead2_decorators;
    let _safeRead2_initializers = [];
    let _safeRead2_extraInitializers = [];
    var OtherComponent = _classThis = class {
        constructor() {
            this.safeRead = __runInitializers(this, _safeRead_initializers, '');
            this.safeRead2 = (__runInitializers(this, _safeRead_extraInitializers), __runInitializers(this, _safeRead2_initializers, ''));
            __runInitializers(this, _safeRead2_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "OtherComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _safeRead_decorators = [(0, core_1.Input)()];
        _safeRead2_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _safeRead_decorators, { kind: "field", name: "safeRead", static: false, private: false, access: { has: obj => "safeRead" in obj, get: obj => obj.safeRead, set: (obj, value) => { obj.safeRead = value; } }, metadata: _metadata }, _safeRead_initializers, _safeRead_extraInitializers);
        __esDecorate(null, null, _safeRead2_decorators, { kind: "field", name: "safeRead2", static: false, private: false, access: { has: obj => "safeRead2" in obj, get: obj => obj.safeRead2, set: (obj, value) => { obj.safeRead2 = value; } }, metadata: _metadata }, _safeRead2_initializers, _safeRead2_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OtherComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OtherComponent = _classThis;
})();
exports.OtherComponent = OtherComponent;
