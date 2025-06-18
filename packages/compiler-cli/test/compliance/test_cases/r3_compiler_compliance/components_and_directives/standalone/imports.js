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
exports.TestCmp = exports.DirectPipe = exports.DirectDir = exports.SomeModule = exports.IndirectPipe = exports.IndirectDir = exports.NotStandaloneStuffModule = exports.NotStandalonePipe = exports.NotStandaloneDir = void 0;
const core_1 = require("@angular/core");
let NotStandaloneDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[not-standalone]',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NotStandaloneDir = _classThis = class {
    };
    __setFunctionName(_classThis, "NotStandaloneDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotStandaloneDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotStandaloneDir = _classThis;
})();
exports.NotStandaloneDir = NotStandaloneDir;
let NotStandalonePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'nspipe',
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NotStandalonePipe = _classThis = class {
        transform(value) { }
    };
    __setFunctionName(_classThis, "NotStandalonePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotStandalonePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotStandalonePipe = _classThis;
})();
exports.NotStandalonePipe = NotStandalonePipe;
let NotStandaloneStuffModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [NotStandaloneDir, NotStandalonePipe],
            exports: [NotStandaloneDir, NotStandalonePipe],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NotStandaloneStuffModule = _classThis = class {
    };
    __setFunctionName(_classThis, "NotStandaloneStuffModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotStandaloneStuffModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotStandaloneStuffModule = _classThis;
})();
exports.NotStandaloneStuffModule = NotStandaloneStuffModule;
let IndirectDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[indirect]',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IndirectDir = _classThis = class {
    };
    __setFunctionName(_classThis, "IndirectDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IndirectDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IndirectDir = _classThis;
})();
exports.IndirectDir = IndirectDir;
let IndirectPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'indirectpipe',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IndirectPipe = _classThis = class {
        transform(value) { }
    };
    __setFunctionName(_classThis, "IndirectPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IndirectPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IndirectPipe = _classThis;
})();
exports.IndirectPipe = IndirectPipe;
let SomeModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [IndirectDir, IndirectPipe],
            exports: [NotStandaloneStuffModule, IndirectDir, IndirectPipe],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeModule = _classThis = class {
    };
    __setFunctionName(_classThis, "SomeModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeModule = _classThis;
})();
exports.SomeModule = SomeModule;
let DirectDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[direct]',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectDir = _classThis = class {
    };
    __setFunctionName(_classThis, "DirectDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectDir = _classThis;
})();
exports.DirectDir = DirectDir;
let DirectPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'directpipe',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectPipe = _classThis = class {
        transform(value) { }
    };
    __setFunctionName(_classThis, "DirectPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectPipe = _classThis;
})();
exports.DirectPipe = DirectPipe;
let TestCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmp',
            template: `
    <p>Reference some non-standalone things:<span not-standalone>{{data | nspipe}}</span></p>
    <p>Reference some indirect standalone things:<span indirect>{{data | indirectpipe}}</span></p>
    <p>Reference some standalone things directly:<span direct>{{data | directpipe}}</span></p>
  `,
            imports: [SomeModule, DirectDir, DirectPipe],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestCmp = _classThis = class {
        constructor() {
            this.data = true;
        }
    };
    __setFunctionName(_classThis, "TestCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestCmp = _classThis;
})();
exports.TestCmp = TestCmp;
