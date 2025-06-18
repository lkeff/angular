"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
const common_1 = require("@angular/common");
const core_1 = require("../src/core");
const testing_1 = require("../testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
class Frame {
    constructor() {
        this.name = 'frame';
    }
}
class ModuleFrame {
    constructor() {
        this.name = 'moduleFram';
    }
}
describe('forwardRef integration', function () {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ imports: [Module], declarations: [App] });
    });
    it('should instantiate components which are declared using forwardRef', () => {
        const a = testing_1.TestBed.configureTestingModule({ schemas: [core_1.NO_ERRORS_SCHEMA] }).createComponent(App);
        a.detectChanges();
        (0, matchers_1.expect)((0, core_1.asNativeElements)(a.debugElement.children)).toHaveText('frame(lock)');
        (0, matchers_1.expect)(testing_1.TestBed.inject(ModuleFrame)).toBeDefined();
    });
});
let Module = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [common_1.CommonModule],
            providers: [(0, core_1.forwardRef)(() => ModuleFrame)],
            declarations: [(0, core_1.forwardRef)(() => Door), (0, core_1.forwardRef)(() => Lock)],
            exports: [(0, core_1.forwardRef)(() => Door), (0, core_1.forwardRef)(() => Lock)],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Module = _classThis = class {
    };
    __setFunctionName(_classThis, "Module");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Module = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Module = _classThis;
})();
let App = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app',
            viewProviders: [(0, core_1.forwardRef)(() => Frame)],
            template: `<door><lock></lock></door>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var App = _classThis = class {
    };
    __setFunctionName(_classThis, "App");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        App = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return App = _classThis;
})();
let Door = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'door',
            template: `{{frame.name}}(<span *ngFor="let lock of locks">{{lock.name}}</span>)`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _locks_decorators;
    let _locks_initializers = [];
    let _locks_extraInitializers = [];
    var Door = _classThis = class {
        constructor(frame) {
            this.locks = __runInitializers(this, _locks_initializers, void 0);
            this.frame = __runInitializers(this, _locks_extraInitializers);
            this.frame = frame;
        }
    };
    __setFunctionName(_classThis, "Door");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _locks_decorators = [(0, core_1.ContentChildren)((0, core_1.forwardRef)(() => Lock))];
        __esDecorate(null, null, _locks_decorators, { kind: "field", name: "locks", static: false, private: false, access: { has: obj => "locks" in obj, get: obj => obj.locks, set: (obj, value) => { obj.locks = value; } }, metadata: _metadata }, _locks_initializers, _locks_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Door = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Door = _classThis;
})();
let Lock = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'lock',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Lock = _classThis = class {
        constructor() {
            this.name = 'lock';
        }
    };
    __setFunctionName(_classThis, "Lock");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Lock = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Lock = _classThis;
})();
