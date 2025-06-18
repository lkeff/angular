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
const public_api_1 = require("../../public_api");
const keyvalue_pipe_1 = require("../../src/pipes/keyvalue_pipe");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
describe('KeyValuePipe', () => {
    it('should return null when given null', () => {
        const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
        expect(pipe.transform(null)).toEqual(null);
    });
    it('should return null when given undefined', () => {
        const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
        expect(pipe.transform(undefined)).toEqual(null);
    });
    it('should return null for an unsupported type', () => {
        const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
        const fn = () => { };
        expect(pipe.transform(fn)).toEqual(null);
    });
    describe('object dictionary', () => {
        it('should return empty array of an empty dictionary', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform({})).toEqual([]);
        });
        it('should transform a basic dictionary', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform({ 1: 2 })).toEqual([{ key: '1', value: 2 }]);
        });
        it('should order by alpha', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform({ 'b': 1, 'a': 1 })).toEqual([
                { key: 'a', value: 1 },
                { key: 'b', value: 1 },
            ]);
        });
        it('should order by numerical', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform({ 2: 1, 1: 1 })).toEqual([
                { key: '1', value: 1 },
                { key: '2', value: 1 },
            ]);
        });
        it('should order by numerical and alpha', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            const input = { 2: 1, 1: 1, 'b': 1, 0: 1, 3: 1, 'a': 1 };
            expect(pipe.transform(input)).toEqual([
                { key: '0', value: 1 },
                { key: '1', value: 1 },
                { key: '2', value: 1 },
                { key: '3', value: 1 },
                { key: 'a', value: 1 },
                { key: 'b', value: 1 },
            ]);
        });
        it('should not order by alpha when compareFn is null', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform({ 'b': 1, 'a': 1 }, null)).toEqual([
                { key: 'b', value: 1 },
                { key: 'a', value: 1 },
            ]);
        });
        it('should reorder when compareFn changes', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            const input = { 'b': 1, 'a': 2 };
            pipe.transform(input);
            expect(pipe.transform(input, (a, b) => a.value - b.value)).toEqual([
                { key: 'b', value: 1 },
                { key: 'a', value: 2 },
            ]);
        });
        it('should return the same ref if nothing changes', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            const transform1 = pipe.transform({ 1: 2 });
            const transform2 = pipe.transform({ 1: 2 });
            expect(transform1 === transform2).toEqual(true);
        });
        it('should return a new ref if something changes', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            const transform1 = pipe.transform({ 1: 2 });
            const transform2 = pipe.transform({ 1: 3 });
            expect(transform1 !== transform2).toEqual(true);
        });
        it('should accept a type union of an object with string keys and null', () => {
            let value;
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform(value)).toEqual(null);
        });
        it('should accept a type union of an object with number keys and null', () => {
            let value;
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform(value)).toEqual(null);
        });
    });
    describe('Map', () => {
        it('should return an empty array for an empty Map', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform(new Map())).toEqual([]);
        });
        it('should transform a basic Map', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform(new Map([[1, 2]]))).toEqual([{ key: 1, value: 2 }]);
        });
        it('should order by alpha', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform(new Map([
                ['b', 1],
                ['a', 1],
            ]))).toEqual([
                { key: 'a', value: 1 },
                { key: 'b', value: 1 },
            ]);
        });
        it('should order by numerical', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform(new Map([
                [2, 1],
                [1, 1],
            ]))).toEqual([
                { key: 1, value: 1 },
                { key: 2, value: 1 },
            ]);
        });
        it('should order by numerical and alpha', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            const input = [
                [2, 1],
                [1, 1],
                ['b', 1],
                [0, 1],
                [3, 1],
                ['a', 1],
            ];
            expect(pipe.transform(new Map(input))).toEqual([
                { key: 0, value: 1 },
                { key: 1, value: 1 },
                { key: 2, value: 1 },
                { key: 3, value: 1 },
                { key: 'a', value: 1 },
                { key: 'b', value: 1 },
            ]);
        });
        it('should order by complex types with compareFn', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            const input = new Map([
                [{ id: 1 }, 1],
                [{ id: 0 }, 1],
            ]);
            expect(pipe.transform(input, (a, b) => (a.key.id > b.key.id ? 1 : -1))).toEqual([
                { key: { id: 0 }, value: 1 },
                { key: { id: 1 }, value: 1 },
            ]);
        });
        it('should not order by alpha when compareFn is null', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform(new Map([
                ['b', 1],
                ['a', 1],
            ]), null)).toEqual([
                { key: 'b', value: 1 },
                { key: 'a', value: 1 },
            ]);
        });
        it('should reorder when compareFn changes', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            const input = new Map([
                ['b', 1],
                ['a', 2],
            ]);
            pipe.transform(input);
            expect(pipe.transform(input, (a, b) => a.value - b.value)).toEqual([
                { key: 'b', value: 1 },
                { key: 'a', value: 2 },
            ]);
        });
        it('should return the same ref if nothing changes', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            const transform1 = pipe.transform(new Map([[1, 2]]));
            const transform2 = pipe.transform(new Map([[1, 2]]));
            expect(transform1 === transform2).toEqual(true);
        });
        it('should return a new ref if something changes', () => {
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            const transform1 = pipe.transform(new Map([[1, 2]]));
            const transform2 = pipe.transform(new Map([[1, 3]]));
            expect(transform1 !== transform2).toEqual(true);
        });
        it('should accept a type union of a Map and null', () => {
            let value;
            const pipe = new index_1.KeyValuePipe(core_1.ɵdefaultKeyValueDiffers);
            expect(pipe.transform(value)).toEqual(null);
        });
    });
    it('should be available as a standalone pipe', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.KeyValuePipe, public_api_1.JsonPipe],
                    template: '{{ value | keyvalue | json }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = { 'b': 1, 'a': 2 };
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
        expect(content.replace(/\s/g, '')).toBe('[{"key":"a","value":2},{"key":"b","value":1}]');
    });
});
describe('defaultComparator', () => {
    it('should remain the same order when keys are equal', () => {
        const key = 1;
        const values = [
            { key, value: 2 },
            { key, value: 1 },
        ];
        expect(values.sort(keyvalue_pipe_1.defaultComparator)).toEqual(values);
    });
    it('should sort undefined keys to the end', () => {
        const values = [
            { key: 3, value: 1 },
            { key: undefined, value: 3 },
            { key: 1, value: 2 },
        ];
        expect(values.sort(keyvalue_pipe_1.defaultComparator)).toEqual([
            { key: 1, value: 2 },
            { key: 3, value: 1 },
            { key: undefined, value: 3 },
        ]);
    });
    it('should sort null keys to the end', () => {
        const values = [
            { key: 3, value: 1 },
            { key: null, value: 3 },
            { key: 1, value: 2 },
        ];
        expect(values.sort(keyvalue_pipe_1.defaultComparator)).toEqual([
            { key: 1, value: 2 },
            { key: 3, value: 1 },
            { key: null, value: 3 },
        ]);
    });
    it('should sort strings in alpha ascending', () => {
        const values = [
            { key: 'b', value: 1 },
            { key: 'a', value: 3 },
        ];
        expect(values.sort(keyvalue_pipe_1.defaultComparator)).toEqual([
            { key: 'a', value: 3 },
            { key: 'b', value: 1 },
        ]);
    });
    it('should sort numbers in numerical ascending', () => {
        const values = [
            { key: 2, value: 1 },
            { key: 1, value: 3 },
        ];
        expect(values.sort(keyvalue_pipe_1.defaultComparator)).toEqual([
            { key: 1, value: 3 },
            { key: 2, value: 1 },
        ]);
    });
    it('should sort boolean in false (0) -> true (1)', () => {
        const values = [
            { key: true, value: 3 },
            { key: false, value: 1 },
        ];
        expect(values.sort(keyvalue_pipe_1.defaultComparator)).toEqual([
            { key: false, value: 1 },
            { key: true, value: 3 },
        ]);
    });
    it('should sort numbers as strings in numerical ascending', () => {
        // We need to cast the values array to "any[]" because the object keys
        // have no type overlap and the "Array.sort" expects all keys to have the
        // same type when passed to the sort comparator.
        const values = [
            { key: '2', value: 1 },
            { key: 1, value: 3 },
        ];
        expect(values.sort(keyvalue_pipe_1.defaultComparator)).toEqual([
            { key: 1, value: 3 },
            { key: '2', value: 1 },
        ]);
    });
});
