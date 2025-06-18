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
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../src/di/jit/util");
const decorators_1 = require("../../src/util/decorators");
class DecoratedParent {
}
class DecoratedChild extends DecoratedParent {
}
const TerminalDecorator = (0, decorators_1.makeDecorator)('TerminalDecorator', (data) => (Object.assign({ terminal: true }, data)));
const TestDecorator = (0, decorators_1.makeDecorator)('TestDecorator', (data) => data, Object, (fn) => (fn.Terminal = TerminalDecorator));
describe('Property decorators', () => {
    // https://github.com/angular/angular/issues/12224
    it('should work on the "watch" property', () => {
        const Prop = (0, decorators_1.makePropDecorator)('Prop', (value) => ({ value }));
        let TestClass = (() => {
            var _a;
            let _watch_decorators;
            let _watch_initializers = [];
            let _watch_extraInitializers = [];
            return _a = class TestClass {
                    constructor() {
                        this.watch = __runInitializers(this, _watch_initializers, void 0);
                        __runInitializers(this, _watch_extraInitializers);
                    }
                },
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _watch_decorators = [Prop('firefox!')];
                    __esDecorate(null, null, _watch_decorators, { kind: "field", name: "watch", static: false, private: false, access: { has: obj => "watch" in obj, get: obj => obj.watch, set: (obj, value) => { obj.watch = value; } }, metadata: _metadata }, _watch_initializers, _watch_extraInitializers);
                    if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })(),
                _a;
        })();
        const p = (0, util_1.getReflect)().propMetadata(TestClass);
        expect(p['watch']).toEqual([new Prop('firefox!')]);
    });
    it('should work with any default plain values', () => {
        const Default = (0, decorators_1.makePropDecorator)('Default', (data) => ({ value: data != null ? data : 5 }));
        expect(new Default(0)['value']).toEqual(0);
    });
    it('should work with any object values', () => {
        // make sure we don't walk up the prototype chain
        const Default = (0, decorators_1.makePropDecorator)('Default', (data) => (Object.assign({ value: 5 }, data)));
        const value = Object.create({ value: 10 });
        expect(new Default(value)['value']).toEqual(5);
    });
});
describe('decorators', () => {
    it('should invoke as decorator', () => {
        function Type() { }
        TestDecorator({ marker: 'WORKS' })(Type);
        const annotations = Type[decorators_1.ANNOTATIONS];
        expect(annotations[0].marker).toEqual('WORKS');
    });
    it('should invoke as new', () => {
        const annotation = new TestDecorator({ marker: 'WORKS' });
        expect(annotation instanceof TestDecorator).toEqual(true);
        expect(annotation.marker).toEqual('WORKS');
    });
    it('should not apply decorators from the prototype chain', function () {
        TestDecorator({ marker: 'parent' })(DecoratedParent);
        TestDecorator({ marker: 'child' })(DecoratedChild);
        const annotations = DecoratedChild[decorators_1.ANNOTATIONS];
        expect(annotations.length).toBe(1);
        expect(annotations[0].marker).toEqual('child');
    });
});
