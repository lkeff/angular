"use strict";
// tslint:disable
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithSettersAndGetters = void 0;
const core_1 = require("@angular/core");
let WithSettersAndGetters = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _set_onlySetter_decorators;
    let _get_accessor_decorators;
    let _simpleInput_decorators;
    let _simpleInput_initializers = [];
    let _simpleInput_extraInitializers = [];
    return _a = class WithSettersAndGetters {
            set onlySetter(newValue) {
                this._bla = newValue;
                if (newValue === 0) {
                    console.log('test');
                }
            }
            get accessor() {
                return '';
            }
            set accessor(newValue) {
                this._accessor = newValue;
            }
            constructor() {
                this._bla = __runInitializers(this, _instanceExtraInitializers);
                this._accessor = '';
                this.simpleInput = __runInitializers(this, _simpleInput_initializers, void 0);
                __runInitializers(this, _simpleInput_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _set_onlySetter_decorators = [(0, core_1.Input)()];
            _get_accessor_decorators = [(0, core_1.Input)()];
            _simpleInput_decorators = [(0, core_1.Input)()];
            __esDecorate(_a, null, _set_onlySetter_decorators, { kind: "setter", name: "onlySetter", static: false, private: false, access: { has: obj => "onlySetter" in obj, set: (obj, value) => { obj.onlySetter = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_accessor_decorators, { kind: "getter", name: "accessor", static: false, private: false, access: { has: obj => "accessor" in obj, get: obj => obj.accessor }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _simpleInput_decorators, { kind: "field", name: "simpleInput", static: false, private: false, access: { has: obj => "simpleInput" in obj, get: obj => obj.simpleInput, set: (obj, value) => { obj.simpleInput = value; } }, metadata: _metadata }, _simpleInput_initializers, _simpleInput_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.WithSettersAndGetters = WithSettersAndGetters;
