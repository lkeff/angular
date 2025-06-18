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
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
function it(msg, fn) { }
const harness = {
    query(v) {
        return null;
    },
};
let SubDir = (() => {
    var _a;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _name2_decorators;
    let _name2_initializers = [];
    let _name2_extraInitializers = [];
    return _a = class SubDir {
            constructor() {
                this.name = __runInitializers(this, _name_initializers, 'John');
                this.name2 = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _name2_initializers, ''));
                __runInitializers(this, _name2_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, core_1.Input)()];
            _name2_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _name2_decorators, { kind: "field", name: "name2", static: false, private: false, access: { has: obj => "name2" in obj, get: obj => obj.name2, set: (obj, value) => { obj.name2 = value; } }, metadata: _metadata }, _name2_initializers, _name2_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
let MyComp = (() => {
    var _a;
    let _hello_decorators;
    let _hello_initializers = [];
    let _hello_extraInitializers = [];
    return _a = class MyComp {
            constructor() {
                this.hello = __runInitializers(this, _hello_initializers, '');
                __runInitializers(this, _hello_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _hello_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _hello_decorators, { kind: "field", name: "hello", static: false, private: false, access: { has: obj => "hello" in obj, get: obj => obj.hello, set: (obj, value) => { obj.hello = value; } }, metadata: _metadata }, _hello_initializers, _hello_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
it('should work', () => {
    const fixture = testing_1.TestBed.createComponent(MyComp);
    // `.componentInstance` is using `any` :O
    const sub = fixture.debugElement.query(platform_browser_1.By.directive(SubDir)).componentInstance;
    expect(sub.name).toBe('John');
});
it('should work2', () => {
    const fixture = testing_1.TestBed.createComponent(MyComp);
    // `.componentInstance` is using `any` :O
    const sub = harness.query(SubDir).componentInstance;
    expect(sub.name2).toBe('John');
});
