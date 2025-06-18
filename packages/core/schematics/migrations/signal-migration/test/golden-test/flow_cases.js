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
const core_1 = require("@angular/core");
let Test = (() => {
    var _a;
    let _maxCellsPerRow_decorators;
    let _maxCellsPerRow_initializers = [];
    let _maxCellsPerRow_extraInitializers = [];
    let _maxCellsPerRow2_decorators;
    let _maxCellsPerRow2_initializers = [];
    let _maxCellsPerRow2_extraInitializers = [];
    return _a = class Test {
            constructor() {
                this.maxCellsPerRow = __runInitializers(this, _maxCellsPerRow_initializers, 5);
                this.maxCellsPerRow2 = (__runInitializers(this, _maxCellsPerRow_extraInitializers), __runInitializers(this, _maxCellsPerRow2_initializers, 5));
                this.test2 = (__runInitializers(this, _maxCellsPerRow2_extraInitializers), this.maxCellsPerRow ? this.maxCellsPerRow === 3 : false);
                this.test3 = this.maxCellsPerRow2 === 3 ? true : false;
            }
            test(arr) {
                for (let i = 0; i < arr.length; i += this.maxCellsPerRow) {
                    console.log(this.maxCellsPerRow);
                }
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _maxCellsPerRow_decorators = [(0, core_1.Input)()];
            _maxCellsPerRow2_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _maxCellsPerRow_decorators, { kind: "field", name: "maxCellsPerRow", static: false, private: false, access: { has: obj => "maxCellsPerRow" in obj, get: obj => obj.maxCellsPerRow, set: (obj, value) => { obj.maxCellsPerRow = value; } }, metadata: _metadata }, _maxCellsPerRow_initializers, _maxCellsPerRow_extraInitializers);
            __esDecorate(null, null, _maxCellsPerRow2_decorators, { kind: "field", name: "maxCellsPerRow2", static: false, private: false, access: { has: obj => "maxCellsPerRow2" in obj, get: obj => obj.maxCellsPerRow2, set: (obj, value) => { obj.maxCellsPerRow2 = value; } }, metadata: _metadata }, _maxCellsPerRow2_initializers, _maxCellsPerRow2_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
