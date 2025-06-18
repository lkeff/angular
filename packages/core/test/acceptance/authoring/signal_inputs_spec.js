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
const core_1 = require("@angular/core");
const signals_1 = require("../../../primitives/signals");
const testing_1 = require("../../../testing");
describe('signal inputs', () => {
    beforeEach(() => testing_1.TestBed.configureTestingModule({
        errorOnUnknownProperties: true,
    }));
    it('should be possible to bind to an input', () => {
        let InputComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'input-comp',
                    template: 'input:{{input()}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InputComp = _classThis = class {
                constructor() {
                    this.input = (0, core_1.input)();
                }
            };
            __setFunctionName(_classThis, "InputComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputComp = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<input-comp [input]="value" />`,
                    imports: [InputComp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.value = 1;
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
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('input:1');
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('input:2');
    });
    it('should be possible to use an input in a computed expression', () => {
        let InputComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'input-comp',
                    template: 'changed:{{changed()}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InputComp = _classThis = class {
                constructor() {
                    this.input = (0, core_1.input)();
                    this.changed = (0, core_1.computed)(() => `computed-${this.input()}`);
                }
            };
            __setFunctionName(_classThis, "InputComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputComp = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<input-comp [input]="value" />`,
                    imports: [InputComp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.value = 1;
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
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('changed:computed-1');
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('changed:computed-2');
    });
    it('should be possible to use an input in an effect', () => {
        let effectLog = [];
        let InputComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'input-comp',
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InputComp = _classThis = class {
                constructor() {
                    this.input = (0, core_1.input)();
                    (0, core_1.effect)(() => {
                        effectLog.push(this.input());
                    });
                }
            };
            __setFunctionName(_classThis, "InputComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputComp = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<input-comp [input]="value" />`,
                    imports: [InputComp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.value = 1;
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
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        expect(effectLog).toEqual([]);
        fixture.detectChanges();
        expect(effectLog).toEqual([1]);
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(effectLog).toEqual([1, 2]);
    });
    it('should support transforms', () => {
        let InputComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'input-comp',
                    template: 'input:{{input()}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InputComp = _classThis = class {
                constructor() {
                    this.input = (0, core_1.input)(0, { transform: (v) => v + 1000 });
                }
            };
            __setFunctionName(_classThis, "InputComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputComp = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<input-comp [input]="value" />`,
                    imports: [InputComp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.value = 1;
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
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        const inputComp = fixture.debugElement.children[0].componentInstance;
        expect(inputComp.input()).withContext('should not run transform on initial value').toBe(0);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('input:1001');
    });
    it('should not run transforms lazily', () => {
        let transformRunCount = 0;
        let InputComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'input-comp',
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InputComp = _classThis = class {
                constructor() {
                    this.input = (0, core_1.input)(0, {
                        transform: (v) => (transformRunCount++, v + 1000),
                    });
                }
            };
            __setFunctionName(_classThis, "InputComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputComp = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<input-comp [input]="value" />`,
                    imports: [InputComp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.value = 1;
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
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        expect(transformRunCount).toBe(0);
        fixture.detectChanges();
        expect(transformRunCount).toBe(1);
    });
    it('should throw error if a required input is accessed too early', () => {
        let InputComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'input-comp',
                    template: 'input:{{input()}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InputComp = _classThis = class {
                constructor() {
                    this.input = core_1.input.required();
                    this.input();
                }
            };
            __setFunctionName(_classThis, "InputComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputComp = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<input-comp [input]="value" />`,
                    imports: [InputComp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.value = 1;
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
        expect(() => testing_1.TestBed.createComponent(TestCmp)).toThrowError(/Input is required but no value is available yet/);
    });
    it('should be possible to bind to an inherited input', () => {
        let BaseDir = (() => {
            let _classDecorators = [(0, core_1.Directive)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BaseDir = _classThis = class {
                constructor() {
                    this.input = (0, core_1.input)();
                }
            };
            __setFunctionName(_classThis, "BaseDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BaseDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BaseDir = _classThis;
        })();
        let InputComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'input-comp',
                    template: 'input:{{input()}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = BaseDir;
            var InputComp = _classThis = class extends _classSuper {
            };
            __setFunctionName(_classThis, "InputComp");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputComp = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<input-comp [input]="value" />`,
                    imports: [InputComp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.value = 1;
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
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('input:1');
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('input:2');
    });
    it('should support two-way binding to signal input and @Output decorated member', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _valueChange_decorators;
            let _valueChange_initializers = [];
            let _valueChange_extraInitializers = [];
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.input)(0);
                    this.valueChange = __runInitializers(this, _valueChange_initializers, new core_1.EventEmitter());
                    __runInitializers(this, _valueChange_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _valueChange_decorators = [(0, core_1.Output)()];
                __esDecorate(null, null, _valueChange_decorators, { kind: "field", name: "valueChange", static: false, private: false, access: { has: obj => "valueChange" in obj, get: obj => obj.valueChange, set: (obj, value) => { obj.valueChange = value; } }, metadata: _metadata }, _valueChange_initializers, _valueChange_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [(value)]="value" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), 1);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        // Initial value.
        expect(host.value).toBe(1);
        expect(host.dir.value()).toBe(1);
        // Changing the value from within the directive.
        host.dir.valueChange.emit(2);
        fixture.detectChanges();
        expect(host.value).toBe(2);
        expect(host.dir.value()).toBe(2);
        // Changing the value from the outside.
        host.value = 3;
        fixture.detectChanges();
        expect(host.value).toBe(3);
        expect(host.dir.value()).toBe(3);
    });
    it('should assign a debugName to the input signal node when a debugName is provided', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = (0, core_1.input)(0, { debugName: 'TEST_DEBUG_NAME' });
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
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [value]="1" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        expect(host.dir.value[signals_1.SIGNAL].debugName).toBe('TEST_DEBUG_NAME');
    });
    it('should assign a debugName to the input signal node when a debugName is provided to a required input', () => {
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[dir]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    this.value = core_1.input.required({ debugName: 'TEST_DEBUG_NAME' });
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
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div [value]="1" dir></div>',
                    imports: [Dir],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(App);
        const host = fixture.componentInstance;
        fixture.detectChanges();
        expect(host.dir.value[signals_1.SIGNAL].debugName).toBe('TEST_DEBUG_NAME');
    });
});
