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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
describe('@let declarations', () => {
    it('should update the value of a @let declaration over time', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @let multiplier = 2;
        @let result = value * multiplier;
        {{value}} times {{multiplier}} is {{result}}
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 0;
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
        expect(fixture.nativeElement.textContent).toContain('0 times 2 is 0');
        fixture.componentInstance.value = 1;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('1 times 2 is 2');
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('2 times 2 is 4');
    });
    it('should be able to use @let declarations inside event listeners', () => {
        const values = [];
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @let result = value * 2;
        <button (click)="log(result)"></button>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 0;
                }
                log(value) {
                    values.push(value);
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
        const button = fixture.nativeElement.querySelector('button');
        fixture.detectChanges();
        expect(values).toEqual([]);
        button.click();
        expect(values).toEqual([0]);
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        button.click();
        expect(values).toEqual([0, 4]);
    });
    it('should be able to access @let declarations through multiple levels of views', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @if (true) {
          @if (true) {
            @let three = two + 1;
            The result is {{three}}
          }
          @let two = one + 1;
        }

        @let one = value + 1;
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 0;
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
        expect(fixture.nativeElement.textContent).toContain('The result is 3');
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('The result is 5');
    });
    it('should be able to access @let declarations from parent view before they are declared', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @if (true) {
          {{value}} times {{multiplier}} is {{result}}
        }

        @let multiplier = 2;
        @let result = value * multiplier;
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 0;
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
        expect(fixture.nativeElement.textContent).toContain('0 times 2 is 0');
        fixture.componentInstance.value = 1;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('1 times 2 is 2');
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('2 times 2 is 4');
    });
    it('should throw if a @let declaration is accessed before it is initialized', () => {
        const errors = [];
        let TestDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dir]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _testEvent_decorators;
            let _testEvent_initializers = [];
            let _testEvent_extraInitializers = [];
            var TestDirective = _classThis = class {
                ngOnInit() {
                    this.testEvent.emit();
                }
                constructor() {
                    this.testEvent = __runInitializers(this, _testEvent_initializers, new core_1.EventEmitter());
                    __runInitializers(this, _testEvent_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _testEvent_decorators = [(0, core_1.Output)()];
                __esDecorate(null, null, _testEvent_decorators, { kind: "field", name: "testEvent", static: false, private: false, access: { has: obj => "testEvent" in obj, get: obj => obj.testEvent, set: (obj, value) => { obj.testEvent = value; } }, metadata: _metadata }, _testEvent_initializers, _testEvent_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestDirective = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [TestDirective],
                    template: `
        <div dir (testEvent)="callback(value)"></div>
        @let value = 1;
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                callback(_value) { }
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
        testing_1.TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [
                // We can't use `toThrow` in the tests, because errors in listeners
                // are caught. Capture them using a custom ErrorHandler instead.
                {
                    provide: core_1.ErrorHandler,
                    useValue: {
                        handleError: (error) => errors.push(error.message),
                    },
                },
            ],
        });
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(errors.length).toBe(1);
        expect(errors[0]).toContain('Attempting to access a @let declaration whose value is not available yet');
    });
    it('should be able to use pipes injecting ChangeDetectorRef in a let declaration', () => {
        let DoublePipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({ name: 'double' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DoublePipe = _classThis = class {
                constructor() {
                    this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                }
                transform(value) {
                    return value * 2;
                }
            };
            __setFunctionName(_classThis, "DoublePipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DoublePipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DoublePipe = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @let result = value | double;
        Result: {{result}}
      `,
                    imports: [DoublePipe],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 2;
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
        expect(fixture.nativeElement.textContent).toContain('Result: 4');
        fixture.componentInstance.value = 5;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Result: 10');
    });
    it('should be able to use local references inside @let declarations', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <input #firstName value="Frodo" name="first-name">
        <input #lastName value="Baggins">
        @let fullName = firstName.value + ' ' + lastName.value;
        Hello, {{fullName}}
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
        const firstNameInput = fixture.nativeElement.querySelector('[name="first-name"]');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Hello, Frodo Baggins');
        firstNameInput.value = 'Bilbo';
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Hello, Bilbo Baggins');
    });
    it('should be able to proxy a local reference through @let declarations', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <input #input value="foo">

        @let one = input;

        @if (true) {
          @let two = one;

          @if (true) {
            The value is {{two.value}}
          }
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
        const input = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('The value is foo');
        input.value = 'bar';
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('The value is bar');
    });
    it('should evaluate unused let declarations', () => {
        let calls = 0;
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @let one = getOne();
        @let two = one + getTwo();
        @let three = two + getThree();
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                getOne() {
                    calls++;
                    return 1;
                }
                getTwo() {
                    calls++;
                    return 2;
                }
                getThree() {
                    calls++;
                    return 3;
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
        expect(calls).toBeGreaterThan(0);
    });
    it('should resolve a @let declaration correctly within an embedded view that uses a value from parent view and cannot be optimized', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @let foo = value + 1;

        @if (true) {
          <div>
            @let bar = foo + 1;
            bar is {{bar}}
            <button (click)="callback(bar)">I'm here to prevent the optimization of "bar"</button>
          </div>
        }
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 0;
                }
                callback(value) { }
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
        expect(fixture.nativeElement.textContent).toContain('bar is 2');
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('bar is 4');
    });
    it('should not be able to access @let declarations using a query', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @let value = 1;
        {{value}}
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _value_decorators;
            let _value_initializers = [];
            let _value_extraInitializers = [];
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = __runInitializers(this, _value_initializers, void 0);
                    __runInitializers(this, _value_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _value_decorators = [(0, core_1.ViewChild)('value')];
                __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance.value).toBeUndefined();
    });
    it('should be able to access @let declaration from inside ng-content', () => {
        let InnerComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'inner',
                    template: `
        @let value = 123;
        <ng-content>The value is {{value}}</ng-content>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "InnerComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerComponent = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<inner/>',
                    imports: [InnerComponent],
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
        expect(fixture.nativeElement.textContent).toContain('The value is 123');
    });
    it('should not project let declarations', () => {
        let InnerComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'inner',
                    template: `
        <ng-content select="header">Fallback header</ng-content>
        <ng-content>Fallback content</ng-content>
        <ng-content select="footer">Fallback footer</ng-content>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InnerComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "InnerComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InnerComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InnerComponent = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <inner>
          @let one = 1;
          <footer>|Footer value {{one}}</footer>
          @let two = one + 1;
          <header>Header value {{two}}|</header>
        </inner>
      `,
                    imports: [InnerComponent],
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
        expect(fixture.nativeElement.innerHTML).toContain('<inner><!--container--><header>Header value 2|</header>' +
            'Fallback content<!--container--><!--container-->' +
            '<footer>|Footer value 1</footer></inner>');
    });
    it('should give precedence to @let declarations over component properties', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @let value = '@let';

        @if (true) {
          The value comes from {{value}}
        }
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 'component';
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
        expect(fixture.nativeElement.textContent).toContain('The value comes from @let');
    });
    it('should give precedence to local @let definition over one from a parent view', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @let value = 'parent';

        @if (true) {
          @let value = 'local';
          The value comes from {{value}}
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
        expect(fixture.nativeElement.textContent).toContain('The value comes from local');
    });
    it('should be able to use @for loop variables in @let declarations', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        @for (value of values; track $index) {
          @let calculation = value * $index;
          {{calculation}}|
        }
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.values = [1, 2, 3];
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
        expect(fixture.nativeElement.textContent).toContain('0|  2|  6|');
    });
});
