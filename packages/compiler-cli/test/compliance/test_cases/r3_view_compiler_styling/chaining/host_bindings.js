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
exports.MyComponent = void 0;
const core_1 = require("@angular/core");
let MyComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            host: {
                '[class.apple]': 'yesToApple',
                '[style.color]': 'color',
                '[class.tomato]': 'yesToTomato',
                '[style.transition]': 'transition'
            },
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _border_decorators;
    let _border_initializers = [];
    let _border_extraInitializers = [];
    let _yesToOrange_decorators;
    let _yesToOrange_initializers = [];
    let _yesToOrange_extraInitializers = [];
    var MyComponent = _classThis = class {
        constructor() {
            this.color = 'red';
            this.transition = 'all 1337ms ease';
            this.yesToApple = true;
            this.yesToTomato = false;
            this.border = __runInitializers(this, _border_initializers, '1px solid purple');
            this.yesToOrange = (__runInitializers(this, _border_extraInitializers), __runInitializers(this, _yesToOrange_initializers, true));
            __runInitializers(this, _yesToOrange_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _border_decorators = [(0, core_1.HostBinding)('style.border')];
        _yesToOrange_decorators = [(0, core_1.HostBinding)('class.orange')];
        __esDecorate(null, null, _border_decorators, { kind: "field", name: "border", static: false, private: false, access: { has: obj => "border" in obj, get: obj => obj.border, set: (obj, value) => { obj.border = value; } }, metadata: _metadata }, _border_initializers, _border_extraInitializers);
        __esDecorate(null, null, _yesToOrange_decorators, { kind: "field", name: "yesToOrange", static: false, private: false, access: { has: obj => "yesToOrange" in obj, get: obj => obj.yesToOrange, set: (obj, value) => { obj.yesToOrange = value; } }, metadata: _metadata }, _yesToOrange_initializers, _yesToOrange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyComponent = _classThis;
})();
exports.MyComponent = MyComponent;
