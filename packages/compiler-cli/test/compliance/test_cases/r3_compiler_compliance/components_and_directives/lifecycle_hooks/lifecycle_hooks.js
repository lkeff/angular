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
exports.LifecycleModule = exports.SimpleLayout = exports.LifecycleComp = void 0;
const core_1 = require("@angular/core");
let events = [];
let LifecycleComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'lifecycle-comp', template: '',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _nameMin_decorators;
    let _nameMin_initializers = [];
    let _nameMin_extraInitializers = [];
    var LifecycleComp = _classThis = class {
        ngOnChanges() {
            events.push('changes' + this.nameMin);
        }
        ngOnInit() {
            events.push('init' + this.nameMin);
        }
        ngDoCheck() {
            events.push('check' + this.nameMin);
        }
        ngAfterContentInit() {
            events.push('content init' + this.nameMin);
        }
        ngAfterContentChecked() {
            events.push('content check' + this.nameMin);
        }
        ngAfterViewInit() {
            events.push('view init' + this.nameMin);
        }
        ngAfterViewChecked() {
            events.push('view check' + this.nameMin);
        }
        ngOnDestroy() {
            events.push(this.nameMin);
        }
        constructor() {
            this.nameMin = __runInitializers(this, _nameMin_initializers, void 0);
            __runInitializers(this, _nameMin_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "LifecycleComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _nameMin_decorators = [(0, core_1.Input)('name')];
        __esDecorate(null, null, _nameMin_decorators, { kind: "field", name: "nameMin", static: false, private: false, access: { has: obj => "nameMin" in obj, get: obj => obj.nameMin, set: (obj, value) => { obj.nameMin = value; } }, metadata: _metadata }, _nameMin_initializers, _nameMin_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LifecycleComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LifecycleComp = _classThis;
})();
exports.LifecycleComp = LifecycleComp;
let SimpleLayout = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-layout',
            template: `
    <lifecycle-comp [name]="name1"></lifecycle-comp>
    <lifecycle-comp [name]="name2"></lifecycle-comp>
  `,
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleLayout = _classThis = class {
        constructor() {
            this.name1 = '1';
            this.name2 = '2';
        }
    };
    __setFunctionName(_classThis, "SimpleLayout");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleLayout = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleLayout = _classThis;
})();
exports.SimpleLayout = SimpleLayout;
let LifecycleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [LifecycleComp, SimpleLayout] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LifecycleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "LifecycleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LifecycleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LifecycleModule = _classThis;
})();
exports.LifecycleModule = LifecycleModule;
