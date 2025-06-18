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
exports.GreetComponent = void 0;
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const rxjs_1 = require("rxjs");
let GreetComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'greet',
            template: `
    <span class="greet-text">{{firstName()}} - {{lastName() ?? 'initial-unset'}}</span>

    <button (click)="dispatchOutputEvent()"><button>
  `,
            standalone: true,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _decoratorInput_decorators;
    let _decoratorInput_initializers = [];
    let _decoratorInput_extraInitializers = [];
    var GreetComponent = _classThis = class {
        constructor() {
            this.firstName = core_1.input.required();
            this.lastName = (0, core_1.input)(undefined, {
                transform: (v) => (v === undefined ? 'transformed-fallback' : `ng-${v}`),
            });
            this.decoratorInput = __runInitializers(this, _decoratorInput_initializers, 0);
            this.clickFromInside = (__runInitializers(this, _decoratorInput_extraInitializers), (0, core_1.output)());
            this.clickFromInsideInterop$ = new rxjs_1.Subject();
            this.clickFromInsideInterop = (0, rxjs_interop_1.outputFromObservable)(this.clickFromInsideInterop$, {
                alias: 'clickFromInside2',
            });
        }
        dispatchOutputEvent() {
            this.clickFromInside.emit('someString');
            this.clickFromInsideInterop$.next(1);
        }
    };
    __setFunctionName(_classThis, "GreetComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _decoratorInput_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _decoratorInput_decorators, { kind: "field", name: "decoratorInput", static: false, private: false, access: { has: obj => "decoratorInput" in obj, get: obj => obj.decoratorInput, set: (obj, value) => { obj.decoratorInput = value; } }, metadata: _metadata }, _decoratorInput_initializers, _decoratorInput_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GreetComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GreetComponent = _classThis;
})();
exports.GreetComponent = GreetComponent;
