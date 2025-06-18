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
exports.WidthDirective = void 0;
const core_1 = require("@angular/core");
let WidthDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[myWidthDir]',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _myWidth_decorators;
    let _myWidth_initializers = [];
    let _myWidth_extraInitializers = [];
    let _myFooClass_decorators;
    let _myFooClass_initializers = [];
    let _myFooClass_extraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    var WidthDirective = _classThis = class {
        constructor() {
            this.myWidth = __runInitializers(this, _myWidth_initializers, 200);
            this.myFooClass = (__runInitializers(this, _myWidth_extraInitializers), __runInitializers(this, _myFooClass_initializers, true));
            this.id = (__runInitializers(this, _myFooClass_extraInitializers), __runInitializers(this, _id_initializers, 'some id'));
            this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, 'some title'));
            __runInitializers(this, _title_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "WidthDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myWidth_decorators = [(0, core_1.HostBinding)('style.width')];
        _myFooClass_decorators = [(0, core_1.HostBinding)('class.foo')];
        _id_decorators = [(0, core_1.HostBinding)('id')];
        _title_decorators = [(0, core_1.HostBinding)('title')];
        __esDecorate(null, null, _myWidth_decorators, { kind: "field", name: "myWidth", static: false, private: false, access: { has: obj => "myWidth" in obj, get: obj => obj.myWidth, set: (obj, value) => { obj.myWidth = value; } }, metadata: _metadata }, _myWidth_initializers, _myWidth_extraInitializers);
        __esDecorate(null, null, _myFooClass_decorators, { kind: "field", name: "myFooClass", static: false, private: false, access: { has: obj => "myFooClass" in obj, get: obj => obj.myFooClass, set: (obj, value) => { obj.myFooClass = value; } }, metadata: _metadata }, _myFooClass_initializers, _myFooClass_extraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WidthDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WidthDirective = _classThis;
})();
exports.WidthDirective = WidthDirective;
