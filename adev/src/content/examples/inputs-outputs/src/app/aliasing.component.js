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
exports.AliasingComponent = void 0;
/* eslint-disable @angular-eslint/no-input-rename,
                  @angular-eslint/no-inputs-metadata-property,
                  @angular-eslint/no-output-rename,
                  @angular-eslint/no-outputs-metadata-property */
const core_1 = require("@angular/core");
let AliasingComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-aliasing',
            template: `
    <p>Save for later item: {{input1}}</p>
    <button type="button" (click)="saveIt()"> Save for later</button>

    <p>Item for wishlist: {{input2}}</p>
    <button type="button" (click)="wishForIt()"> Add to wishlist</button>
  `,
            inputs: ['input1: saveForLaterItem'], // propertyName:alias
            outputs: ['outputEvent1: saveForLaterEvent'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _input2_decorators;
    let _input2_initializers = [];
    let _input2_extraInitializers = [];
    let _outputEvent2_decorators;
    let _outputEvent2_initializers = [];
    let _outputEvent2_extraInitializers = [];
    var AliasingComponent = _classThis = class {
        saveIt() {
            console.warn('Child says: emitting outputEvent1 with', this.input1);
            this.outputEvent1.emit(this.input1);
        }
        wishForIt() {
            console.warn('Child says: emitting outputEvent2', this.input2);
            this.outputEvent2.emit(this.input2);
        }
        constructor() {
            this.input1 = '';
            this.outputEvent1 = new core_1.EventEmitter();
            this.input2 = __runInitializers(this, _input2_initializers, ''); //  @Input(alias)
            this.outputEvent2 = (__runInitializers(this, _input2_extraInitializers), __runInitializers(this, _outputEvent2_initializers, new core_1.EventEmitter())); //  @Output(alias) propertyName = ...
            __runInitializers(this, _outputEvent2_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "AliasingComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _input2_decorators = [(0, core_1.Input)('wishListItem')];
        _outputEvent2_decorators = [(0, core_1.Output)('wishEvent')];
        __esDecorate(null, null, _input2_decorators, { kind: "field", name: "input2", static: false, private: false, access: { has: obj => "input2" in obj, get: obj => obj.input2, set: (obj, value) => { obj.input2 = value; } }, metadata: _metadata }, _input2_initializers, _input2_extraInitializers);
        __esDecorate(null, null, _outputEvent2_decorators, { kind: "field", name: "outputEvent2", static: false, private: false, access: { has: obj => "outputEvent2" in obj, get: obj => obj.outputEvent2, set: (obj, value) => { obj.outputEvent2 = value; } }, metadata: _metadata }, _outputEvent2_initializers, _outputEvent2_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AliasingComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AliasingComponent = _classThis;
})();
exports.AliasingComponent = AliasingComponent;
