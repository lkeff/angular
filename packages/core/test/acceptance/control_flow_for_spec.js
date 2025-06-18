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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
describe('control flow - for', () => {
    it('should create, remove and move views corresponding to items in a collection', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '@for ((item of items); track item; let idx = $index) {{{item}}({{idx}})|}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|3(2)|');
        fixture.componentInstance.items.pop();
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|');
        fixture.componentInstance.items.push(3);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|3(2)|');
        fixture.componentInstance.items[0] = 3;
        fixture.componentInstance.items[2] = 1;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('3(0)|2(1)|1(2)|');
    });
    it('should loop over iterators that can be iterated over only once', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '@for ((item of items.keys()); track $index) {{{item}}|}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.items = new Map([
                        ['a', 1],
                        ['b', 2],
                        ['c', 3],
                    ]);
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
        expect(fixture.nativeElement.textContent).toBe('a|b|c|');
    });
    it('should work correctly with trackBy index', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '@for ((item of items); track idx; let idx = $index) {{{item}}({{idx}})|}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|3(2)|');
        fixture.componentInstance.items.pop();
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|');
        fixture.componentInstance.items.push(3);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|3(2)|');
        fixture.componentInstance.items[0] = 3;
        fixture.componentInstance.items[2] = 1;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('3(0)|2(1)|1(2)|');
    });
    it('should support empty blocks', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '@for ((item of items); track idx; let idx = $index) {|} @empty {Empty}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        expect(fixture.nativeElement.textContent).toBe('|||');
        fixture.componentInstance.items = [];
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Empty');
        fixture.componentInstance.items = [0, 1];
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('||');
        fixture.componentInstance.items = null;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Empty');
        fixture.componentInstance.items = [0];
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('|');
        fixture.componentInstance.items = undefined;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Empty');
    });
    it('should be able to use pipes injecting ChangeDetectorRef in for loop blocks', () => {
        let TestPipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({ name: 'test' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestPipe = _classThis = class {
                constructor() {
                    this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                }
                transform(value) {
                    return value;
                }
            };
            __setFunctionName(_classThis, "TestPipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestPipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestPipe = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '@for (item of items | test; track item;) {{{item}}|}',
                    imports: [TestPipe],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        expect(fixture.nativeElement.textContent).toBe('1|2|3|');
    });
    it('should be able to access a directive property that is reassigned in a lifecycle hook', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                    exportAs: 'dir',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.data = [1];
                }
                ngDoCheck() {
                    this.data = [2];
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-root',
                    imports: [Dir],
                    template: `
        <div [dir] #dir="dir"></div>

        @for (x of dir.data; track $index) {
          {{x}}
        }
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
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
        expect(fixture.nativeElement.textContent.trim()).toBe('2');
    });
    it('should expose variables both under their real names and aliases', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '@for ((item of items); track item; let idx = $index) {{{item}}({{$index}}/{{idx}})|}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.items = [1, 2, 3];
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
        expect(fixture.nativeElement.textContent).toBe('1(0/0)|2(1/1)|3(2/2)|');
        fixture.componentInstance.items.splice(1, 1);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('1(0/0)|3(1/1)|');
    });
    describe('trackBy', () => {
        it('should have access to the host context in the track function', () => {
            let offsetReads = 0;
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '@for ((item of items); track $index + offset) {{{item}}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = ['a', 'b', 'c'];
                    }
                    get offset() {
                        offsetReads++;
                        return 0;
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
            expect(fixture.nativeElement.textContent).toBe('abc');
            expect(offsetReads).toBeGreaterThan(0);
            const prevReads = offsetReads;
            // explicitly modify the DOM text node to make sure that the list reconciliation algorithm
            // based on tracking indices overrides it.
            fixture.debugElement.childNodes[1].nativeNode.data = 'x';
            fixture.componentInstance.items.shift();
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('bc');
            expect(offsetReads).toBeGreaterThan(prevReads);
        });
        it('should be able to access component properties in the tracking function from a loop at the root of the template', () => {
            const calls = new Set();
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `@for ((item of items); track trackingFn(item, compProp)) {{{item}}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = ['a', 'b'];
                        this.compProp = 'hello';
                    }
                    trackingFn(item, message) {
                        calls.add(`${item}:${message}`);
                        return item;
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
            expect([...calls].sort()).toEqual(['a:hello', 'b:hello']);
        });
        it('should be able to access component properties in the tracking function from a nested template', () => {
            const calls = new Set();
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            @if (true) {
              @if (true) {
                @if (true) {
                  @for ((item of items); track trackingFn(item, compProp)) {{{item}}}
                }
              }
            }
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = ['a', 'b'];
                        this.compProp = 'hello';
                    }
                    trackingFn(item, message) {
                        calls.add(`${item}:${message}`);
                        return item;
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
            expect([...calls].sort()).toEqual(['a:hello', 'b:hello']);
        });
        it('should invoke method tracking function with the correct context', () => {
            let context = null;
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `@for (item of items; track trackingFn($index, item)) {{{item}}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = ['a', 'b'];
                    }
                    trackingFn(_index, item) {
                        context = this;
                        return item;
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
            expect(context).toBe(fixture.componentInstance);
        });
        it('should warn about duplicated keys when using arrays', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `@for (item of items; track item) {{{item}}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = ['a', 'b', 'a', 'c', 'a'];
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
            spyOn(console, 'warn');
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('abaca');
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining(`NG0955: The provided track expression resulted in duplicated keys for a given collection.`));
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining(`Adjust the tracking expression such that it uniquely identifies all the items in the collection. `));
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining(`key "a" at index "0" and "2"`));
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining(`key "a" at index "2" and "4"`));
        });
        it('should warn about duplicated keys when using iterables', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `@for (item of items.values(); track item) {{{item}}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = new Map([
                            [1, 'a'],
                            [2, 'b'],
                            [3, 'a'],
                            [4, 'c'],
                            [5, 'a'],
                        ]);
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
            spyOn(console, 'warn');
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('abaca');
            expect(console.warn).toHaveBeenCalledTimes(1);
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining(`NG0955: The provided track expression resulted in duplicated keys for a given collection.`));
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining(`Adjust the tracking expression such that it uniquely identifies all the items in the collection. `));
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining(`key "a" at index "0" and "2"`));
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining(`key "a" at index "2" and "4"`));
        });
        it('should warn about duplicate keys when keys are expressed as symbols', () => {
            const value = Symbol('a');
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `@for (item of items.values(); track item) {}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = new Map([
                            [1, value],
                            [2, value],
                        ]);
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
            spyOn(console, 'warn');
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            expect(console.warn).toHaveBeenCalledWith(jasmine.stringContaining(`Symbol(a)" at index "0" and "1".`));
        });
        it('should not warn about duplicate keys iterating over the new collection only', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `@for (item of items; track item) {}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
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
            spyOn(console, 'warn');
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            expect(console.warn).not.toHaveBeenCalled();
            fixture.componentInstance.items = [4, 5, 6];
            fixture.detectChanges();
            expect(console.warn).not.toHaveBeenCalled();
        });
        it('should warn about collection re-creation due to identity tracking', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `@for (item of items; track item) {(<span>{{item.value}}</span>)}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = [{ value: 0 }, { value: 1 }];
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
            spyOn(console, 'warn');
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('(0)(1)');
            expect(console.warn).not.toHaveBeenCalled();
            fixture.componentInstance.items = fixture.componentInstance.items.map((item) => ({
                value: item.value + 1,
            }));
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('(1)(2)');
            expect(console.warn).toHaveBeenCalled();
        });
        it('should NOT warn about collection re-creation when a view is not considered expensive', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `@for (item of items; track item) {({{item.value}})}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = [{ value: 0 }, { value: 1 }];
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
            spyOn(console, 'warn');
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('(0)(1)');
            expect(console.warn).not.toHaveBeenCalled();
            fixture.componentInstance.items = fixture.componentInstance.items.map((item) => ({
                value: item.value + 1,
            }));
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('(1)(2)');
            expect(console.warn).not.toHaveBeenCalled();
        });
        it('should NOT warn about collection re-creation when a trackBy function is not identity', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `@for (item of items; track item.value) {({{item.value}})}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = [{ value: 0 }, { value: 1 }];
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
            spyOn(console, 'warn');
            const fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('(0)(1)');
            expect(console.warn).not.toHaveBeenCalled();
            fixture.componentInstance.items = fixture.componentInstance.items.map((item) => ({
                value: item.value + 1,
            }));
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('(1)(2)');
            expect(console.warn).not.toHaveBeenCalled();
        });
    });
    describe('list diffing and view operations', () => {
        it('should delete views in the middle', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '@for (item of items; track item; let idx = $index) {{{item}}({{idx}})|}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
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
            expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|3(2)|');
            // delete in the middle
            fixture.componentInstance.items.splice(1, 1);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('1(0)|3(1)|');
        });
        it('should insert views in the middle', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '@for (item of items; track item; let idx = $index) {{{item}}({{idx}})|}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = [1, 3];
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
            expect(fixture.nativeElement.textContent).toBe('1(0)|3(1)|');
            // add in the middle
            fixture.componentInstance.items.splice(1, 0, 2);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|3(2)|');
        });
        it('should replace different items', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '@for (item of items; track item; let idx = $index) {{{item}}({{idx}})|}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
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
            expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|3(2)|');
            // an item in the middle stays the same, the rest gets replaced
            fixture.componentInstance.items = [5, 2, 7];
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('5(0)|2(1)|7(2)|');
        });
        it('should move and delete items', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '@for (item of items; track item; let idx = $index) {{{item}}({{idx}})|}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3, 4, 5, 6];
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
            fixture.detectChanges(false);
            expect(fixture.nativeElement.textContent).toBe('1(0)|2(1)|3(2)|4(3)|5(4)|6(5)|');
            // move 5 and do some other delete other operations
            fixture.componentInstance.items = [5, 3, 7];
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('5(0)|3(1)|7(2)|');
        });
        it('should correctly attach and detach views with duplicated keys', () => {
            const BEFORE = [
                { 'name': 'Task 14', 'id': 14 },
                { 'name': 'Task 14', 'id': 14 },
                { 'name': 'Task 70', 'id': 70 },
                { 'name': 'Task 34', 'id': 34 },
            ];
            const AFTER = [
                { 'name': 'Task 70', 'id': 70 },
                { 'name': 'Task 14', 'id': 14 },
                { 'name': 'Task 28', 'id': 28 },
            ];
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: ``,
                        selector: 'child-cmp',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [ChildCmp],
                        template: `
          @for(task of tasks; track task.id) {
            <child-cmp/>
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
                    constructor() {
                        this.tasks = BEFORE;
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
            const cmp = fixture.componentInstance;
            const nativeElement = fixture.debugElement.nativeElement;
            cmp.tasks = AFTER;
            fixture.detectChanges();
            expect(nativeElement.querySelectorAll('child-cmp').length).toBe(3);
        });
    });
    describe('content projection', () => {
        it('should project an @for with a single root node into the root node slot', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        template: `
        <test>Before @for (item of items; track $index) {
          <span foo>{{item}}</span>
        } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 123');
        });
        it('should project an @empty block with a single root node into the root node slot', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        template: `
        <test>Before @for (item of items; track $index) {} @empty {
          <span foo>Empty</span>
        } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: Empty');
        });
        it('should allow @for and @empty blocks to be projected into different slots', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Loop slot: <ng-content select="[loop]"/> Empty slot: <ng-content select="[empty]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        template: `
        <test>Before @for (item of items; track $index) {
          <span loop>{{item}}</span>
        } @empty {
          <span empty>Empty</span>
        } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Loop slot: 123 Empty slot: ');
            fixture.componentInstance.items = [];
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Loop slot:  Empty slot: Empty');
        });
        it('should project an @for with multiple root nodes into the catch-all slot', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        template: `
        <test>Before @for (item of items; track $index) {
          <span foo>one{{item}}</span>
          <div foo>two{{item}}</div>
        } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before one1two1one2two2 After Slot: ');
        });
        it('should project an @for with a single root node with a data binding', () => {
            let directiveCount = 0;
            let Foo = (() => {
                let _classDecorators = [(0, core_1.Directive)({ selector: '[foo]' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Foo = _classThis = class {
                    constructor() {
                        this.value = __runInitializers(this, _value_initializers, void 0);
                        __runInitializers(this, _value_extraInitializers);
                        directiveCount++;
                    }
                };
                __setFunctionName(_classThis, "Foo");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _value_decorators = [(0, core_1.Input)('foo')];
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Foo = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Foo = _classThis;
            })();
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent, Foo],
                        template: `
        <test>Before @for (item of items; track $index) {
          <span [foo]="item">{{item}}</span>
        } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 123');
            expect(directiveCount).toBe(3);
        });
        it('should project an @for with an ng-container root node', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        template: `
        <test>Before @for (item of items; track $index) {
          <ng-container foo>
            <span>{{item}}</span>
            <span>|</span>
          </ng-container>
        } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 1|2|3|');
        });
        // Right now the template compiler doesn't collect comment nodes.
        // This test is to ensure that we don't regress if it happens in the future.
        it('should project an @for with single root node and comments into the root node slot', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        template: `
        <test>Before @for (item of items; track $index) {
          <!-- before -->
          <span foo>{{item}}</span>
          <!-- after -->
        } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 123');
        });
        it('should project the root node when preserveWhitespaces is enabled and there are no whitespace nodes', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        preserveWhitespaces: true,
                        // Note the whitespace due to the indentation inside @for.
                        template: '<test>Before @for (item of items; track $index) {<span foo>{{item}}</span>} After</test>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 123');
        });
        it('should not project the root node when preserveWhitespaces is enabled and there are whitespace nodes', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        preserveWhitespaces: true,
                        // Note the whitespace due to the indentation inside @for.
                        template: `
              <test>Before @for (item of items; track $index) {
                <span foo>{{item}}</span>
              } After</test>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toMatch(/Main: Before\s+1\s+2\s+3\s+After Slot:/);
        });
        it('should not project the root node across multiple layers of @for', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        template: `
        <test>Before @for (item of items; track $index) {
          @for (item of items; track $index) {
            <span foo>{{item}}</span>
          }
        } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before 1212 After Slot: ');
        });
        it('should project an @for with a single root template node into the root node slot', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent, common_1.NgIf],
                        template: `<test>Before @for (item of items; track $index) {
        <span *ngIf="true" foo>{{item}}</span>
      } After</test>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1, 2];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 12');
            fixture.componentInstance.items.push(3);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 123');
        });
        it('should invoke a projected attribute directive at the root of an @for once', () => {
            let directiveCount = 0;
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let FooDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[foo]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var FooDirective = _classThis = class {
                    constructor() {
                        directiveCount++;
                    }
                };
                __setFunctionName(_classThis, "FooDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    FooDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return FooDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent, FooDirective],
                        template: `<test>Before @for (item of items; track $index) {
        <span foo>{{item}}</span>
      } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(directiveCount).toBe(1);
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 1');
        });
        it('should invoke a projected template directive at the root of an @for once', () => {
            let directiveCount = 0;
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let TemplateDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[templateDir]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TemplateDirective = _classThis = class {
                    constructor(viewContainerRef, templateRef) {
                        this.viewContainerRef = viewContainerRef;
                        this.templateRef = templateRef;
                        directiveCount++;
                    }
                    ngOnInit() {
                        const view = this.viewContainerRef.createEmbeddedView(this.templateRef);
                        this.viewContainerRef.insert(view);
                    }
                };
                __setFunctionName(_classThis, "TemplateDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TemplateDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TemplateDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent, TemplateDirective],
                        template: `<test>Before @for (item of items; track $index) {
        <span *templateDir foo>{{item}}</span>
      } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(directiveCount).toBe(1);
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 1');
        });
        it('should invoke a directive on a projected ng-template at the root of an @for once', () => {
            let directiveCount = 0;
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let TemplateDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[templateDir]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TemplateDirective = _classThis = class {
                    constructor(viewContainerRef, templateRef) {
                        this.viewContainerRef = viewContainerRef;
                        this.templateRef = templateRef;
                        directiveCount++;
                    }
                    ngOnInit() {
                        const view = this.viewContainerRef.createEmbeddedView(this.templateRef);
                        this.viewContainerRef.insert(view);
                    }
                };
                __setFunctionName(_classThis, "TemplateDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TemplateDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TemplateDirective = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent, TemplateDirective],
                        template: `<test>Before @for (item of items; track $index) {
        <ng-template templateDir foo>{{item}}</ng-template>
      } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(directiveCount).toBe(1);
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 1');
        });
        it('should not project an @for that has text followed by one element node at the root', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        template: `
          <test>
            @for (item of items; track $index) {Hello <span foo>{{item}}</span>}
          </test>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Hello 1 Slot: ');
        });
        it('should project an @for with a single root node and @let declarations into the root node slot', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: 'Main: <ng-content/> Slot: <ng-content select="[foo]"/>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComponent = _classThis = class {
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
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [TestComponent],
                        template: `
        <test>Before @for (item of items; track $index) {
          @let a = item + 1;
          @let b = a + 1;
          <span foo>{{b}}</span>
        } After</test>
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.items = [1];
                    }
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('Main: Before  After Slot: 3');
        });
    });
});
