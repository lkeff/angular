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
const index_1 = require("../../index");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
describe('LowerCasePipe', () => {
    let pipe;
    beforeEach(() => {
        pipe = new index_1.LowerCasePipe();
    });
    it('should return lowercase', () => {
        expect(pipe.transform('FOO')).toEqual('foo');
    });
    it('should lowercase when there is a new value', () => {
        expect(pipe.transform('FOO')).toEqual('foo');
        expect(pipe.transform('BAr')).toEqual('bar');
    });
    it('should map null to null', () => {
        expect(pipe.transform(null)).toEqual(null);
    });
    it('should map undefined to null', () => {
        expect(pipe.transform(undefined)).toEqual(null);
    });
    it('should not support numbers', () => {
        expect(() => pipe.transform(0)).toThrowError();
    });
    it('should not support other objects', () => {
        expect(() => pipe.transform({})).toThrowError();
    });
    it('should be available as a standalone pipe', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.LowerCasePipe],
                    template: '{{ value | lowercase }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 'FOO';
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const content = fixture.nativeElement.textContent;
        expect(content).toBe('foo');
    });
});
describe('TitleCasePipe', () => {
    let pipe;
    beforeEach(() => {
        pipe = new index_1.TitleCasePipe();
    });
    it('should return titlecase', () => {
        expect(pipe.transform('foo')).toEqual('Foo');
    });
    it('should return titlecase for subsequent words', () => {
        expect(pipe.transform('one TWO Three fouR')).toEqual('One Two Three Four');
    });
    it('should support empty strings', () => {
        expect(pipe.transform('')).toEqual('');
    });
    it('should persist whitespace', () => {
        expect(pipe.transform('one   two')).toEqual('One   Two');
    });
    it('should titlecase when there is a new value', () => {
        expect(pipe.transform('bar')).toEqual('Bar');
        expect(pipe.transform('foo')).toEqual('Foo');
    });
    it('should not capitalize letter after the quotes', () => {
        expect(pipe.transform("it's complicated")).toEqual("It's Complicated");
    });
    it('should not treat non-space character as a separator', () => {
        expect(pipe.transform('one,two,three')).toEqual('One,two,three');
        expect(pipe.transform('true|false')).toEqual('True|false');
        expect(pipe.transform('foo-vs-bar')).toEqual('Foo-vs-bar');
    });
    it('should support support all whitespace characters', () => {
        expect(pipe.transform('one\ttwo')).toEqual('One\tTwo');
        expect(pipe.transform('three\rfour')).toEqual('Three\rFour');
        expect(pipe.transform('five\nsix')).toEqual('Five\nSix');
    });
    it('should work properly for non-latin alphabet', () => {
        expect(pipe.transform('føderation')).toEqual('Føderation');
        expect(pipe.transform('poniedziałek')).toEqual('Poniedziałek');
        expect(pipe.transform('éric')).toEqual('Éric');
    });
    it('should handle numbers at the beginning of words', () => {
        expect(pipe.transform('frodo was 1st and bilbo was 2nd')).toEqual('Frodo Was 1st And Bilbo Was 2nd');
        expect(pipe.transform('1ST')).toEqual('1st');
    });
    it('should map null to null', () => {
        expect(pipe.transform(null)).toEqual(null);
    });
    it('should map undefined to null', () => {
        expect(pipe.transform(undefined)).toEqual(null);
    });
    it('should not support numbers', () => {
        expect(() => pipe.transform(0)).toThrowError();
    });
    it('should not support other objects', () => {
        expect(() => pipe.transform({})).toThrowError();
    });
    it('should be available as a standalone pipe', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.TitleCasePipe],
                    template: '{{ value | titlecase }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 'foo';
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const content = fixture.nativeElement.textContent;
        expect(content).toBe('Foo');
    });
});
describe('UpperCasePipe', () => {
    let pipe;
    beforeEach(() => {
        pipe = new index_1.UpperCasePipe();
    });
    it('should return uppercase', () => {
        expect(pipe.transform('foo')).toEqual('FOO');
    });
    it('should uppercase when there is a new value', () => {
        expect(pipe.transform('foo')).toEqual('FOO');
        expect(pipe.transform('bar')).toEqual('BAR');
    });
    it('should map null to null', () => {
        expect(pipe.transform(null)).toEqual(null);
    });
    it('should map undefined to null', () => {
        expect(pipe.transform(undefined)).toEqual(null);
    });
    it('should not support numbers', () => {
        expect(() => pipe.transform(0)).toThrowError();
    });
    it('should not support other objects', () => {
        expect(() => pipe.transform({})).toThrowError();
    });
    it('should be available as a standalone pipe', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.UpperCasePipe],
                    template: '{{ value | uppercase }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 'foo';
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const content = fixture.nativeElement.textContent;
        expect(content).toBe('FOO');
    });
});
