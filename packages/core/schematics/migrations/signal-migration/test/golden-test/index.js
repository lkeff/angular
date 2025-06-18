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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const core_1 = require("@angular/core");
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-component',
            templateUrl: './template.html',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _input_decorators;
    let _input_initializers = [];
    let _input_extraInitializers = [];
    let _bla_decorators;
    let _bla_initializers = [];
    let _bla_extraInitializers = [];
    let _narrowableMultipleTimes_decorators;
    let _narrowableMultipleTimes_initializers = [];
    let _narrowableMultipleTimes_extraInitializers = [];
    let _withUndefinedInput_decorators;
    let _withUndefinedInput_initializers = [];
    let _withUndefinedInput_extraInitializers = [];
    let _incompatible_decorators;
    let _incompatible_initializers = [];
    let _incompatible_extraInitializers = [];
    let _set_ngSwitch_decorators;
    var AppComponent = _classThis = class {
        constructor() {
            this.input = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _input_initializers, null));
            this.bla = (__runInitializers(this, _input_extraInitializers), __runInitializers(this, _bla_initializers, false));
            this.narrowableMultipleTimes = (__runInitializers(this, _bla_extraInitializers), __runInitializers(this, _narrowableMultipleTimes_initializers, null));
            this.withUndefinedInput = (__runInitializers(this, _narrowableMultipleTimes_extraInitializers), __runInitializers(this, _withUndefinedInput_initializers, void 0));
            this.incompatible = (__runInitializers(this, _withUndefinedInput_extraInitializers), __runInitializers(this, _incompatible_initializers, null));
            this._bla = __runInitializers(this, _incompatible_extraInitializers);
        }
        set ngSwitch(newValue) {
            this._bla = newValue;
            if (newValue === 0) {
                console.log('test');
            }
        }
        someControlFlowCase() {
            if (this.input) {
                this.input.charAt(0);
            }
        }
        moreComplexControlFlowCase() {
            if (!this.input) {
                return;
            }
            this.doSomething();
            (() => {
                // might be a different input value now?!
                // No! it can't because we don't allow writes to "input"!!.
                console.log(this.input.substring(0));
            })();
        }
        doSomething() {
            this.incompatible = 'some other value';
        }
        vsd() {
            if (!this.input && this.narrowableMultipleTimes !== null) {
                return this.narrowableMultipleTimes;
            }
            return this.input ? 'eager' : 'lazy';
        }
        allTheSameNoNarrowing() {
            console.log(this.input);
            console.log(this.input);
        }
        test() {
            if (this.narrowableMultipleTimes) {
                console.log();
                const x = () => {
                    // @ts-expect-error
                    if (isCar(this.narrowableMultipleTimes)) {
                    }
                };
                console.log();
                console.log();
                x();
                x();
            }
        }
        extremeNarrowingNested() {
            if (this.narrowableMultipleTimes && isCar(this.narrowableMultipleTimes)) {
                this.narrowableMultipleTimes.__car;
                let car = this.narrowableMultipleTimes;
                let ctx = this;
                function nestedFn() {
                    if (isAudi(car)) {
                        console.log(car.__audi);
                    }
                    if (!isCar(ctx.narrowableMultipleTimes) || !isAudi(ctx.narrowableMultipleTimes)) {
                        return;
                    }
                    ctx.narrowableMultipleTimes.__audi;
                }
                // iife
                (() => {
                    if (isAudi(this.narrowableMultipleTimes)) {
                        this.narrowableMultipleTimes.__audi;
                    }
                })();
            }
        }
    };
    __setFunctionName(_classThis, "AppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _input_decorators = [(0, core_1.Input)()];
        _bla_decorators = [(0, core_1.Input)({ transform: disabledTransform, required: true })];
        _narrowableMultipleTimes_decorators = [(0, core_1.Input)()];
        _withUndefinedInput_decorators = [(0, core_1.Input)()];
        _incompatible_decorators = [(0, core_1.Input)()];
        _set_ngSwitch_decorators = [(0, core_1.Input)()];
        __esDecorate(_classThis, null, _set_ngSwitch_decorators, { kind: "setter", name: "ngSwitch", static: false, private: false, access: { has: obj => "ngSwitch" in obj, set: (obj, value) => { obj.ngSwitch = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
        __esDecorate(null, null, _bla_decorators, { kind: "field", name: "bla", static: false, private: false, access: { has: obj => "bla" in obj, get: obj => obj.bla, set: (obj, value) => { obj.bla = value; } }, metadata: _metadata }, _bla_initializers, _bla_extraInitializers);
        __esDecorate(null, null, _narrowableMultipleTimes_decorators, { kind: "field", name: "narrowableMultipleTimes", static: false, private: false, access: { has: obj => "narrowableMultipleTimes" in obj, get: obj => obj.narrowableMultipleTimes, set: (obj, value) => { obj.narrowableMultipleTimes = value; } }, metadata: _metadata }, _narrowableMultipleTimes_initializers, _narrowableMultipleTimes_extraInitializers);
        __esDecorate(null, null, _withUndefinedInput_decorators, { kind: "field", name: "withUndefinedInput", static: false, private: false, access: { has: obj => "withUndefinedInput" in obj, get: obj => obj.withUndefinedInput, set: (obj, value) => { obj.withUndefinedInput = value; } }, metadata: _metadata }, _withUndefinedInput_initializers, _withUndefinedInput_extraInitializers);
        __esDecorate(null, null, _incompatible_decorators, { kind: "field", name: "incompatible", static: false, private: false, access: { has: obj => "incompatible" in obj, get: obj => obj.incompatible, set: (obj, value) => { obj.incompatible = value; } }, metadata: _metadata }, _incompatible_initializers, _incompatible_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
})();
exports.AppComponent = AppComponent;
function disabledTransform(bla) {
    return true;
}
function isCar(v) {
    return true;
}
function isAudi(v) {
    return true;
}
const x = null;
x.incompatible = null;
