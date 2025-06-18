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
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('SlicePipe', () => {
    let list;
    let str;
    let pipe;
    beforeEach(() => {
        list = [1, 2, 3, 4, 5];
        str = 'tuvwxyz';
        pipe = new index_1.SlicePipe();
    });
    describe('supports', () => {
        it('should support strings', () => {
            (0, matchers_1.expect)(() => pipe.transform(str, 0)).not.toThrow();
        });
        it('should support lists', () => {
            (0, matchers_1.expect)(() => pipe.transform(list, 0)).not.toThrow();
        });
        it('should support readonly lists', () => {
            (0, matchers_1.expect)(() => pipe.transform(list, 0)).not.toThrow();
        });
        it('should not support other objects', () => {
            // so we cast as `any` to check that it throws for unsupported objects // this would not compile
            (0, matchers_1.expect)(() => pipe.transform({}, 0)).toThrow();
        });
    });
    describe('transform', () => {
        it('should return null if the value is null', () => {
            (0, matchers_1.expect)(pipe.transform(null, 1)).toBe(null);
        });
        it('should return null if the value is undefined', () => {
            (0, matchers_1.expect)(pipe.transform(undefined, 1)).toBe(null);
        });
        it('should return all items after START index when START is positive and END is omitted', () => {
            (0, matchers_1.expect)(pipe.transform(list, 3)).toEqual([4, 5]);
            (0, matchers_1.expect)(pipe.transform(str, 3)).toEqual('wxyz');
        });
        it('should return last START items when START is negative and END is omitted', () => {
            (0, matchers_1.expect)(pipe.transform(list, -3)).toEqual([3, 4, 5]);
            (0, matchers_1.expect)(pipe.transform(str, -3)).toEqual('xyz');
        });
        it('should return all items between START and END index when START and END are positive', () => {
            (0, matchers_1.expect)(pipe.transform(list, 1, 3)).toEqual([2, 3]);
            (0, matchers_1.expect)(pipe.transform(str, 1, 3)).toEqual('uv');
        });
        it('should return all items between START and END from the end when START and END are negative', () => {
            (0, matchers_1.expect)(pipe.transform(list, -4, -2)).toEqual([2, 3]);
            (0, matchers_1.expect)(pipe.transform(str, -4, -2)).toEqual('wx');
        });
        it('should return an empty value if START is greater than END', () => {
            (0, matchers_1.expect)(pipe.transform(list, 4, 2)).toEqual([]);
            (0, matchers_1.expect)(pipe.transform(str, 4, 2)).toEqual('');
        });
        it('should return an empty value if START greater than input length', () => {
            (0, matchers_1.expect)(pipe.transform(list, 99)).toEqual([]);
            (0, matchers_1.expect)(pipe.transform(str, 99)).toEqual('');
        });
        it('should return entire input if START is negative and greater than input length', () => {
            (0, matchers_1.expect)(pipe.transform(list, -99)).toEqual([1, 2, 3, 4, 5]);
            (0, matchers_1.expect)(pipe.transform(str, -99)).toEqual('tuvwxyz');
        });
        it('should not modify the input list', () => {
            (0, matchers_1.expect)(pipe.transform(list, 2)).toEqual([3, 4, 5]);
            (0, matchers_1.expect)(list).toEqual([1, 2, 3, 4, 5]);
        });
    });
    describe('integration', () => {
        let TestComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-comp',
                    template: '{{(data | slice:1).join(",") }}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComp = _classThis = class {
            };
            __setFunctionName(_classThis, "TestComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComp = _classThis;
        })();
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.CommonModule] });
        });
        it('should work with mutable arrays', (0, testing_1.waitForAsync)(() => {
            const fixture = testing_1.TestBed.createComponent(TestComp);
            const mutable = [1, 2];
            fixture.componentInstance.data = mutable;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('2');
            mutable.push(3);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('2,3');
        }));
    });
    it('should be available as a standalone pipe', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.SlicePipe],
                    template: '{{ title | slice:0:5 }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.title = 'Hello World!';
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
        (0, matchers_1.expect)(content).toBe('Hello');
    });
});
