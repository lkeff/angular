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
// Basic shared pipe used during testing.
let MultiplyPipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({ name: 'multiply', pure: true })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MultiplyPipe = _classThis = class {
        transform(value, amount) {
            return value * amount;
        }
    };
    __setFunctionName(_classThis, "MultiplyPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultiplyPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultiplyPipe = _classThis;
})();
describe('control flow - switch', () => {
    it('should show a template based on a matching case', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          @switch (case) {
            @case (0) {case 0}
            @case (1) {case 1}
            @default {default}
          }
        `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.case = 0;
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
        expect(fixture.nativeElement.textContent).toBe('case 0');
        fixture.componentInstance.case = 1;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('case 1');
        fixture.componentInstance.case = 5;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('default');
    });
    it('should be able to use a pipe in the switch expression', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [MultiplyPipe],
                    template: `
          @switch (case | multiply:2) {
            @case (0) {case 0}
            @case (2) {case 2}
            @default {default}
          }
        `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.case = 0;
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
        expect(fixture.nativeElement.textContent).toBe('case 0');
        fixture.componentInstance.case = 1;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('case 2');
        fixture.componentInstance.case = 5;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('default');
    });
    it('should be able to use a pipe in the case expression', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [MultiplyPipe],
                    template: `
          @switch (case) {
            @case (1 | multiply:2) {case 2}
            @case (2 | multiply:2) {case 4}
            @default {default}
          }
        `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.case = 0;
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
        expect(fixture.nativeElement.textContent).toBe('default');
        fixture.componentInstance.case = 4;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('case 4');
        fixture.componentInstance.case = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('case 2');
    });
    it('should be able to use pipes injecting ChangeDetectorRef in switch blocks', () => {
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
                    template: `
        @switch (case | test) {
          @case (0 | test) {Zero}
          @case (1 | test) {One}
        }
      `,
                    imports: [TestPipe],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.case = 1;
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
        expect(fixture.nativeElement.textContent).toBe('One');
    });
    it('should project @switch cases into appropriate slots when selectors are used for all cases', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: 'case 1: (<ng-content select="[case_1]"/>), case 2: (<ng-content select="[case_2]"/>), case 3: (<ng-content select="[case_3]"/>)',
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
              @switch (value) {
                @case (1) {
                  <span case_1>value 1</span>
                }
                @case (2) {
                  <span case_2>value 2</span>
                }
                @case (3) {
                  <span case_3>value 3</span>
                }
              }
            </test>
          `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 1;
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
        expect(fixture.nativeElement.textContent).toBe('case 1: (value 1), case 2: (), case 3: ()');
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('case 1: (), case 2: (value 2), case 3: ()');
        fixture.componentInstance.value = 3;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('case 1: (), case 2: (), case 3: (value 3)');
    });
    it('should project @switch cases into appropriate slots when selectors are used for some cases', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: 'case 1: (<ng-content select="[case_1]"/>), case 2: (<ng-content />), case 3: (<ng-content select="[case_3]"/>)',
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
            @switch (value) {
              @case (1) {
                <span case_1>value 1</span>
              }
              @case (2) {
                <span>value 2</span>
              }
              @case (3) {
                <span case_3>value 3</span>
              }
            }
          </test>
        `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.value = 1;
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
        expect(fixture.nativeElement.textContent).toBe('case 1: (value 1), case 2: (), case 3: ()');
        fixture.componentInstance.value = 2;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('case 1: (), case 2: (value 2), case 3: ()');
        fixture.componentInstance.value = 3;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('case 1: (), case 2: (), case 3: (value 3)');
    });
});
