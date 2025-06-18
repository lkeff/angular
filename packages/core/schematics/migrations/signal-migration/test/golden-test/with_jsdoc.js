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
let WithJsdoc = (() => {
    var _a;
    let _simpleInput_decorators;
    let _simpleInput_initializers = [];
    let _simpleInput_extraInitializers = [];
    let _withCommentInside_decorators;
    let _withCommentInside_initializers = [];
    let _withCommentInside_extraInitializers = [];
    return _a = class WithJsdoc {
            constructor() {
                /**
                 * Works
                 */
                this.simpleInput = __runInitializers(this, _simpleInput_initializers, void 0);
                this.withCommentInside = (__runInitializers(this, _simpleInput_extraInitializers), __runInitializers(this, _withCommentInside_initializers, void 0));
                __runInitializers(this, _withCommentInside_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _simpleInput_decorators = [(0, core_1.Input)()];
            _withCommentInside_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _simpleInput_decorators, { kind: "field", name: "simpleInput", static: false, private: false, access: { has: obj => "simpleInput" in obj, get: obj => obj.simpleInput, set: (obj, value) => { obj.simpleInput = value; } }, metadata: _metadata }, _simpleInput_initializers, _simpleInput_extraInitializers);
            __esDecorate(null, null, _withCommentInside_decorators, { kind: "field", name: "withCommentInside", static: false, private: false, access: { has: obj => "withCommentInside" in obj, get: obj => obj.withCommentInside, set: (obj, value) => { obj.withCommentInside = value; } }, metadata: _metadata }, _withCommentInside_initializers, _withCommentInside_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
