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
const signals_1 = require("../../primitives/signals");
const testing_1 = require("../../testing");
describe('CheckAlways components', () => {
    it('can read a signal', () => {
        let CheckAlwaysCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{value()}}`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CheckAlwaysCmp = _classThis = class {
                constructor() {
                    this.value = (0, core_1.signal)('initial');
                }
            };
            __setFunctionName(_classThis, "CheckAlwaysCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CheckAlwaysCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CheckAlwaysCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(CheckAlwaysCmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toEqual('initial');
        instance.value.set('new');
        fixture.detectChanges();
        expect(instance.value()).toBe('new');
    });
    it('should properly remove stale dependencies from the signal graph', () => {
        let CheckAlwaysCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{show() ? name() + ' aged ' + age() : 'anonymous'}}`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CheckAlwaysCmp = _classThis = class {
                constructor() {
                    this.name = (0, core_1.signal)('John');
                    this.age = (0, core_1.signal)(25);
                    this.show = (0, core_1.signal)(true);
                }
            };
            __setFunctionName(_classThis, "CheckAlwaysCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CheckAlwaysCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CheckAlwaysCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(CheckAlwaysCmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toEqual('John aged 25');
        instance.show.set(false);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toEqual('anonymous');
        instance.name.set('Bob');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toEqual('anonymous');
        instance.show.set(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toEqual('Bob aged 25');
    });
    it('is not "shielded" by a non-dirty OnPush parent', () => {
        const value = (0, core_1.signal)('initial');
        let CheckAlwaysCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{value()}}`,
                    selector: 'check-always',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var CheckAlwaysCmp = _classThis = class {
                constructor() {
                    this.value = value;
                }
            };
            __setFunctionName(_classThis, "CheckAlwaysCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CheckAlwaysCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CheckAlwaysCmp = _classThis;
        })();
        let OnPushParent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<check-always />`,
                    imports: [CheckAlwaysCmp],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OnPushParent = _classThis = class {
            };
            __setFunctionName(_classThis, "OnPushParent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushParent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushParent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(OnPushParent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toEqual('initial');
        value.set('new');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toBe('new');
    });
    it('continues to refresh views until none are dirty', () => {
        const aVal = (0, core_1.signal)('initial');
        const bVal = (0, core_1.signal)('initial');
        let updateAValDuringAChangeDetection = false;
        let A = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{val()}}',
                    selector: 'a-comp',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var A = _classThis = class {
                constructor() {
                    this.val = aVal;
                }
            };
            __setFunctionName(_classThis, "A");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                A = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return A = _classThis;
        })();
        let B = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{val()}}',
                    selector: 'b-comp',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var B = _classThis = class {
                constructor() {
                    this.val = bVal;
                }
                ngAfterViewChecked() {
                    // Set value in parent view after this view is checked
                    // Without signals, this is ExpressionChangedAfterItWasChecked
                    if (updateAValDuringAChangeDetection) {
                        aVal.set('new');
                    }
                }
            };
            __setFunctionName(_classThis, "B");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                B = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return B = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '<a-comp />-<b-comp />', imports: [A, B] })];
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
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toContain('initial-initial');
        bVal.set('new');
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toContain('initial-new');
        updateAValDuringAChangeDetection = true;
        bVal.set('newer');
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toContain('new-newer');
    });
    it('refreshes root view until it is no longer dirty', () => {
        const val = (0, core_1.signal)(0);
        let incrementAfterCheckedUntil = 0;
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    selector: 'child',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                ngDoCheck() {
                    // Update signal in parent view every time we check the child view
                    // (ExpressionChangedAfterItWasCheckedError but not for signals)
                    if (val() < incrementAfterCheckedUntil) {
                        val.update((v) => ++v);
                    }
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{val()}}<child />', imports: [Child] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = val;
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
        expect(fixture.nativeElement.innerText).toContain('0');
        incrementAfterCheckedUntil = 10;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toContain('10');
        incrementAfterCheckedUntil = Number.MAX_SAFE_INTEGER;
        expect(() => fixture.detectChanges()).toThrowError(/Infinite/);
    });
    it('refreshes all views attached to ApplicationRef until no longer dirty', () => {
        const val = (0, core_1.signal)(0);
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{val()}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = val;
                }
                ngOnInit() {
                    this.val.update((v) => v + 1);
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
        const fixture2 = testing_1.TestBed.createComponent(App);
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        appRef.attachView(fixture.componentRef.hostView);
        appRef.attachView(fixture2.componentRef.hostView);
        appRef.tick();
        expect(fixture.nativeElement.innerText).toEqual('2');
        expect(fixture2.nativeElement.innerText).toEqual('2');
    });
});
describe('OnPush components with signals', () => {
    it('marks view dirty', () => {
        let OnPushCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{value()}}{{incrementTemplateExecutions()}}`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OnPushCmp = _classThis = class {
                constructor() {
                    this.numTemplateExecutions = 0;
                    this.value = (0, core_1.signal)('initial');
                }
                incrementTemplateExecutions() {
                    this.numTemplateExecutions++;
                    return '';
                }
            };
            __setFunctionName(_classThis, "OnPushCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(OnPushCmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(1);
        expect(fixture.nativeElement.textContent.trim()).toEqual('initial');
        fixture.detectChanges();
        // Should not be dirty, should not execute template
        expect(instance.numTemplateExecutions).toBe(1);
        instance.value.set('new');
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(2);
        expect(instance.value()).toBe('new');
    });
    it("does not refresh a component when a signal notifies but isn't actually updated", () => {
        let OnPushCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{memo()}}{{incrementTemplateExecutions()}}`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OnPushCmp = _classThis = class {
                constructor() {
                    this.numTemplateExecutions = 0;
                    this.value = (0, core_1.signal)({ value: 'initial' });
                    this.memo = (0, core_1.computed)(() => this.value().value, { equal: Object.is });
                }
                incrementTemplateExecutions() {
                    this.numTemplateExecutions++;
                    return '';
                }
            };
            __setFunctionName(_classThis, "OnPushCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(OnPushCmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(1);
        expect(fixture.nativeElement.textContent.trim()).toEqual('initial');
        instance.value.update((v) => (Object.assign({}, v)));
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(1);
        instance.value.update((v) => ({ value: 'new' }));
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(2);
        expect(fixture.nativeElement.textContent.trim()).toEqual('new');
    });
    it('should not mark components as dirty when signal is read in a constructor of a child component', () => {
        const state = (0, core_1.signal)('initial');
        let ChildReadingSignalCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: `child`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildReadingSignalCmp = _classThis = class {
                constructor() {
                    state();
                }
            };
            __setFunctionName(_classThis, "ChildReadingSignalCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildReadingSignalCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildReadingSignalCmp = _classThis;
        })();
        let OnPushCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            {{incrementTemplateExecutions()}}
            <!-- Template constructed to execute child component constructor in the update pass of a host component -->
            <ng-template [ngIf]="true"><child></child></ng-template>
          `,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    imports: [common_1.NgIf, ChildReadingSignalCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OnPushCmp = _classThis = class {
                constructor() {
                    this.numTemplateExecutions = 0;
                }
                incrementTemplateExecutions() {
                    this.numTemplateExecutions++;
                    return '';
                }
            };
            __setFunctionName(_classThis, "OnPushCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(OnPushCmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(1);
        expect(fixture.nativeElement.textContent.trim()).toEqual('child');
        // The "state" signal is not accesses in the template's update function anywhere so it
        // shouldn't mark components as dirty / impact change detection.
        state.set('new');
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(1);
    });
    it('should not mark components as dirty when signal is read in an input of a child component', () => {
        const state = (0, core_1.signal)('initial');
        let WithInputSetter = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'with-input-setter',
                    template: '{{test}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_testInput_decorators;
            var WithInputSetter = _classThis = class {
                constructor() {
                    this.test = (__runInitializers(this, _instanceExtraInitializers), '');
                }
                set testInput(newValue) {
                    this.test = state() + ':' + newValue;
                }
            };
            __setFunctionName(_classThis, "WithInputSetter");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_testInput_decorators = [(0, core_1.Input)()];
                __esDecorate(_classThis, null, _set_testInput_decorators, { kind: "setter", name: "testInput", static: false, private: false, access: { has: obj => "testInput" in obj, set: (obj, value) => { obj.testInput = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithInputSetter = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithInputSetter = _classThis;
        })();
        let OnPushCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            {{incrementTemplateExecutions()}}
            <!-- Template constructed to execute child component constructor in the update pass of a host component -->
            <ng-template [ngIf]="true"><with-input-setter [testInput]="'input'" /></ng-template>
          `,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    imports: [common_1.NgIf, WithInputSetter],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OnPushCmp = _classThis = class {
                constructor() {
                    this.numTemplateExecutions = 0;
                }
                incrementTemplateExecutions() {
                    this.numTemplateExecutions++;
                    return '';
                }
            };
            __setFunctionName(_classThis, "OnPushCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(OnPushCmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(1);
        expect(fixture.nativeElement.textContent.trim()).toEqual('initial:input');
        // The "state" signal is not accesses in the template's update function anywhere so it
        // shouldn't mark components as dirty / impact change detection.
        state.set('new');
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(1);
        expect(fixture.nativeElement.textContent.trim()).toEqual('initial:input');
    });
    it('should not mark components as dirty when signal is read in a query result setter', () => {
        const state = (0, core_1.signal)('initial');
        let WithQuerySetter = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'with-query-setter',
                    template: '<div #el>child</div>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _set_elQuery_decorators;
            var WithQuerySetter = _classThis = class {
                constructor() {
                    this.el = __runInitializers(this, _instanceExtraInitializers);
                }
                set elQuery(result) {
                    // read a signal in a setter
                    state();
                    this.el = result;
                }
            };
            __setFunctionName(_classThis, "WithQuerySetter");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _set_elQuery_decorators = [(0, core_1.ViewChild)('el', { static: true })];
                __esDecorate(_classThis, null, _set_elQuery_decorators, { kind: "setter", name: "elQuery", static: false, private: false, access: { has: obj => "elQuery" in obj, set: (obj, value) => { obj.elQuery = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WithQuerySetter = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WithQuerySetter = _classThis;
        })();
        let OnPushCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
         {{incrementTemplateExecutions()}}
         <!-- Template constructed to execute child component constructor in the update pass of a host component -->
         <ng-template [ngIf]="true"><with-query-setter /></ng-template>
       `,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    imports: [common_1.NgIf, WithQuerySetter],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OnPushCmp = _classThis = class {
                constructor() {
                    this.numTemplateExecutions = 0;
                }
                incrementTemplateExecutions() {
                    this.numTemplateExecutions++;
                    return '';
                }
            };
            __setFunctionName(_classThis, "OnPushCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(OnPushCmp);
        const instance = fixture.componentInstance;
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(1);
        expect(fixture.nativeElement.textContent.trim()).toEqual('child');
        // The "state" signal is not accesses in the template's update function anywhere so it
        // shouldn't mark components as dirty / impact change detection.
        state.set('new');
        fixture.detectChanges();
        expect(instance.numTemplateExecutions).toBe(1);
    });
    it('can read a signal in a host binding in root view', () => {
        const useBlue = (0, core_1.signal)(false);
        let MyCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{incrementTemplateExecutions()}}`,
                    selector: 'child',
                    host: { '[class.blue]': 'useBlue()' },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyCmp = _classThis = class {
                constructor() {
                    this.useBlue = useBlue;
                    this.numTemplateExecutions = 0;
                }
                incrementTemplateExecutions() {
                    this.numTemplateExecutions++;
                    return '';
                }
            };
            __setFunctionName(_classThis, "MyCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(MyCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).not.toContain('blue');
        expect(fixture.componentInstance.numTemplateExecutions).toBe(1);
        useBlue.set(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).toContain('blue');
        expect(fixture.componentInstance.numTemplateExecutions).toBe(1);
    });
    it('can read a signal in a host binding', () => {
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `{{incrementTemplateExecutions()}}`,
                    selector: 'child',
                    host: { '[class.blue]': 'useBlue()' },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildCmp = _classThis = class {
                constructor() {
                    this.useBlue = (0, core_1.signal)(false);
                    this.numTemplateExecutions = 0;
                }
                incrementTemplateExecutions() {
                    this.numTemplateExecutions++;
                    return '';
                }
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
        let ParentCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<child />`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    imports: [ChildCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "ParentCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(ParentCmp);
        const child = fixture.debugElement.query((p) => p.componentInstance instanceof ChildCmp);
        const childInstance = child.componentInstance;
        fixture.detectChanges();
        expect(childInstance.numTemplateExecutions).toBe(1);
        expect(child.nativeElement.outerHTML).not.toContain('blue');
        childInstance.useBlue.set(true);
        fixture.detectChanges();
        // We should not re-execute the child template. It didn't change, the host bindings did.
        expect(childInstance.numTemplateExecutions).toBe(1);
        expect(child.nativeElement.outerHTML).toContain('blue');
    });
    it('can have signals in both template and host bindings', () => {
        let ChildCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: ``,
                    selector: 'child',
                    host: { '[class.blue]': 'useBlue()' },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildCmp = _classThis = class {
                constructor() {
                    this.useBlue = (0, core_1.signal)(false);
                }
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
        let ParentCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<child /> {{parentSignalValue()}}`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    imports: [ChildCmp],
                    selector: 'parent',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ParentCmp = _classThis = class {
                constructor() {
                    this.parentSignalValue = (0, core_1.signal)('initial');
                }
            };
            __setFunctionName(_classThis, "ParentCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ParentCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ParentCmp = _classThis;
        })();
        // Wrapper component so we can effectively test ParentCmp being marked dirty
        let TestWrapper = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<parent />`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    imports: [ParentCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestWrapper = _classThis = class {
            };
            __setFunctionName(_classThis, "TestWrapper");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestWrapper = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestWrapper = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestWrapper);
        const parent = fixture.debugElement.query((p) => p.componentInstance instanceof ParentCmp)
            .componentInstance;
        const child = fixture.debugElement.query((p) => p.componentInstance instanceof ChildCmp)
            .componentInstance;
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).toContain('initial');
        expect(fixture.nativeElement.outerHTML).not.toContain('blue');
        child.useBlue.set(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).toContain('blue');
        // Set the signal in the parent again and ensure it gets updated
        parent.parentSignalValue.set('new');
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).toContain('new');
        // Set the signal in the child host binding again and ensure it is still updated
        child.useBlue.set(false);
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).not.toContain('blue');
    });
    it('should be able to write to signals during change-detecting a given template, in advance()', () => {
        const counter = (0, core_1.signal)(0);
        let MisunderstoodDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[misunderstood]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MisunderstoodDir = _classThis = class {
                ngOnInit() {
                    counter.update((c) => c + 1);
                }
            };
            __setFunctionName(_classThis, "MisunderstoodDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MisunderstoodDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MisunderstoodDir = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [MisunderstoodDir],
                    template: `
          {{counter()}}<div misunderstood></div>{{ 'force advance()' }}
        `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.counter = counter;
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
        // CheckNoChanges should not throw ExpressionChanged error
        // and signal value is updated to latest value with 1 `detectChanges`
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toContain('1');
        expect(fixture.nativeElement.innerText).toContain('force advance()');
    });
    it('should allow writing to signals during change-detecting a given template, at the end', () => {
        const counter = (0, core_1.signal)(0);
        let MisunderstoodDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[misunderstood]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MisunderstoodDir = _classThis = class {
                ngOnInit() {
                    counter.update((c) => c + 1);
                }
            };
            __setFunctionName(_classThis, "MisunderstoodDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MisunderstoodDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MisunderstoodDir = _classThis;
        })();
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [MisunderstoodDir],
                    template: `
          {{counter()}}<div misunderstood></div>
        `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.counter = counter;
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
        // CheckNoChanges should not throw ExpressionChanged error
        // and signal value is updated to latest value with 1 `detectChanges`
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('1');
    });
    it('should allow writing to signals in afterViewInit', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{loading()}}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.loading = (0, core_1.signal)(true);
                }
                // Classic example of what would have caused ExpressionChanged...Error
                ngAfterViewInit() {
                    this.loading.set(false);
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('false');
    });
    it('does not refresh view if signal marked dirty but did not change', () => {
        const val = (0, core_1.signal)('initial', { equal: () => true });
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{val()}}{{incrementChecks()}}',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.val = val;
                    this.templateExecutions = 0;
                }
                incrementChecks() {
                    this.templateExecutions++;
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
        expect(fixture.componentInstance.templateExecutions).toBe(1);
        expect(fixture.nativeElement.innerText).toContain('initial');
        val.set('new');
        fixture.detectChanges();
        expect(fixture.componentInstance.templateExecutions).toBe(1);
        expect(fixture.nativeElement.innerText).toContain('initial');
    });
    describe('embedded views', () => {
        describe('with a signal read after view creation during an update pass', () => {
            it('should work with native control flow', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
        @if (true) { }
        {{val()}}
        `,
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                        constructor() {
                            this.val = (0, core_1.signal)('initial');
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                fixture.componentInstance.val.set('new');
                fixture.detectChanges();
                expect(fixture.nativeElement.innerText).toBe('new');
            });
            it('should work with createEmbeddedView', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: `
        <ng-template #template></ng-template>
        {{createEmbeddedView(template)}}
        {{val()}}
        `,
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                        constructor() {
                            this.val = (0, core_1.signal)('initial');
                            this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                        }
                        createEmbeddedView(ref) {
                            this.vcr.createEmbeddedView(ref);
                        }
                    };
                    __setFunctionName(_classThis, "MyComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyComp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                fixture.componentInstance.val.set('new');
                fixture.detectChanges();
                expect(fixture.nativeElement.innerText).toBe('new');
            });
        });
        it('refreshes an embedded view in a component', () => {
            let SignalComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'signal-component',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        imports: [common_1.NgIf],
                        template: `<div *ngIf="true"> {{value()}} </div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SignalComponent = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.signal)('initial');
                    }
                };
                __setFunctionName(_classThis, "SignalComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SignalComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SignalComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(SignalComponent);
            fixture.detectChanges();
            fixture.componentInstance.value.set('new');
            fixture.detectChanges();
            expect(trim(fixture.nativeElement.textContent)).toEqual('new');
        });
        it('refreshes multiple embedded views in a component', () => {
            let SignalComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'signal-component',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        imports: [common_1.NgFor],
                        template: `<div *ngFor="let i of [1,2,3]"> {{value()}} </div>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SignalComponent = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.signal)('initial');
                    }
                };
                __setFunctionName(_classThis, "SignalComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SignalComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SignalComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(SignalComponent);
            fixture.detectChanges();
            fixture.componentInstance.value.set('new');
            fixture.detectChanges();
            expect(trim(fixture.nativeElement.textContent)).toEqual('new new new');
        });
        it('refreshes entire component, including embedded views, when signal updates', () => {
            let SignalComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'signal-component',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        imports: [common_1.NgIf],
                        template: `
          {{componentSignal()}}
          <div *ngIf="true"> {{incrementExecutions()}} </div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SignalComponent = _classThis = class {
                    constructor() {
                        this.embeddedViewExecutions = 0;
                        this.componentSignal = (0, core_1.signal)('initial');
                    }
                    incrementExecutions() {
                        this.embeddedViewExecutions++;
                        return '';
                    }
                };
                __setFunctionName(_classThis, "SignalComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SignalComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SignalComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(SignalComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.embeddedViewExecutions).toEqual(1);
            fixture.componentInstance.componentSignal.set('new');
            fixture.detectChanges();
            expect(trim(fixture.nativeElement.textContent)).toEqual('new');
            // OnPush/Default components are checked as a whole so the embedded view is also checked again
            expect(fixture.componentInstance.embeddedViewExecutions).toEqual(2);
        });
        it('re-executes deep embedded template if signal updates', () => {
            let SignalComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'signal-component',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        imports: [common_1.NgIf],
                        template: `
          <div *ngIf="true">
            <div *ngIf="true">
              <div *ngIf="true">
                {{value()}}
              </div>
            </div>
          </div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SignalComponent = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.signal)('initial');
                    }
                };
                __setFunctionName(_classThis, "SignalComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SignalComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SignalComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(SignalComponent);
            fixture.detectChanges();
            fixture.componentInstance.value.set('new');
            fixture.detectChanges();
            expect(trim(fixture.nativeElement.textContent)).toEqual('new');
        });
        it('tracks signal updates if embedded view is change detected directly', () => {
            let Test = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: `
            <ng-template #template>{{value()}}</ng-template>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                let _vcr_decorators;
                let _vcr_initializers = [];
                let _vcr_extraInitializers = [];
                var Test = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.signal)('initial');
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        this.vcr = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _vcr_initializers, void 0));
                        __runInitializers(this, _vcr_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Test");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.ViewChild)('template', { static: true, read: core_1.TemplateRef })];
                    _vcr_decorators = [(0, core_1.ViewChild)('template', { static: true, read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Test = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Test = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Test);
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            appRef.attachView(fixture.componentRef.hostView);
            appRef.tick();
            const viewRef = fixture.componentInstance.vcr.createEmbeddedView(fixture.componentInstance.template);
            viewRef.detectChanges();
            expect(fixture.nativeElement.innerText).toContain('initial');
            fixture.componentInstance.value.set('new');
            appRef.tick();
            expect(fixture.nativeElement.innerText).toContain('new');
        });
        it('tracks signal updates if embedded view is change detected directly before attaching', () => {
            let Test = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: `
            <ng-template #template>{{value()}}</ng-template>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                let _vcr_decorators;
                let _vcr_initializers = [];
                let _vcr_extraInitializers = [];
                var Test = _classThis = class {
                    constructor() {
                        this.value = (0, core_1.signal)('initial');
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        this.vcr = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _vcr_initializers, void 0));
                        this.element = (__runInitializers(this, _vcr_extraInitializers), (0, core_1.inject)(core_1.ElementRef));
                    }
                };
                __setFunctionName(_classThis, "Test");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.ViewChild)('template', { static: true, read: core_1.TemplateRef })];
                    _vcr_decorators = [(0, core_1.ViewChild)('template', { static: true, read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Test = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Test = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Test);
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            appRef.attachView(fixture.componentRef.hostView);
            appRef.tick();
            const viewRef = fixture.componentInstance.template.createEmbeddedView(fixture.componentInstance.template);
            fixture.componentInstance.element.nativeElement.appendChild(viewRef.rootNodes[0]);
            viewRef.detectChanges();
            expect(fixture.nativeElement.innerText).toContain('initial');
            fixture.componentInstance.vcr.insert(viewRef);
            fixture.componentInstance.value.set('new');
            appRef.tick();
            expect(fixture.nativeElement.innerText).toContain('new');
        });
    });
    describe('shielded by non-dirty OnPush', () => {
        let SignalComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'signal-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: `{{value()}}`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SignalComponent = _classThis = class {
                constructor(cdr) {
                    this.cdr = cdr;
                    this.value = (0, core_1.signal)('initial');
                    this.afterViewCheckedRuns = 0;
                }
                ngAfterViewChecked() {
                    this.afterViewCheckedRuns++;
                }
            };
            __setFunctionName(_classThis, "SignalComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SignalComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SignalComponent = _classThis;
        })();
        let OnPushParent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'on-push-parent',
                    template: `
      <signal-component></signal-component>
      {{incrementChecks()}}`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    imports: [SignalComponent],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _signalChild_decorators;
            let _signalChild_initializers = [];
            let _signalChild_extraInitializers = [];
            var OnPushParent = _classThis = class {
                constructor(cdr) {
                    this.cdr = cdr;
                    this.signalChild = __runInitializers(this, _signalChild_initializers, void 0);
                    this.viewExecutions = (__runInitializers(this, _signalChild_extraInitializers), 0);
                }
                incrementChecks() {
                    this.viewExecutions++;
                }
            };
            __setFunctionName(_classThis, "OnPushParent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _signalChild_decorators = [(0, core_1.ViewChild)(SignalComponent)];
                __esDecorate(null, null, _signalChild_decorators, { kind: "field", name: "signalChild", static: false, private: false, access: { has: obj => "signalChild" in obj, get: obj => obj.signalChild, set: (obj, value) => { obj.signalChild = value; } }, metadata: _metadata }, _signalChild_initializers, _signalChild_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushParent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushParent = _classThis;
        })();
        it('refreshes when signal changes, but does not refresh non-dirty parent', () => {
            const fixture = testing_1.TestBed.createComponent(OnPushParent);
            fixture.detectChanges();
            expect(fixture.componentInstance.viewExecutions).toEqual(1);
            fixture.componentInstance.signalChild.value.set('new');
            fixture.detectChanges();
            expect(fixture.componentInstance.viewExecutions).toEqual(1);
            expect(trim(fixture.nativeElement.textContent)).toEqual('new');
        });
        it('does not refresh when detached', () => {
            const fixture = testing_1.TestBed.createComponent(OnPushParent);
            fixture.detectChanges();
            fixture.componentInstance.signalChild.value.set('new');
            fixture.componentInstance.signalChild.cdr.detach();
            fixture.detectChanges();
            expect(trim(fixture.nativeElement.textContent)).toEqual('initial');
        });
        it('refreshes when reattached if already dirty', () => {
            const fixture = testing_1.TestBed.createComponent(OnPushParent);
            fixture.detectChanges();
            fixture.componentInstance.signalChild.value.set('new');
            fixture.componentInstance.signalChild.cdr.detach();
            fixture.detectChanges();
            expect(trim(fixture.nativeElement.textContent)).toEqual('initial');
            fixture.componentInstance.signalChild.cdr.reattach();
            fixture.detectChanges();
            expect(trim(fixture.nativeElement.textContent)).toEqual('new');
        });
        // Note: Design decision for signals because that's how the hooks work today
        // We have considered actually running a component's `afterViewChecked` hook if it's refreshed
        // in targeted mode (meaning the parent did not refresh) and could change this decision.
        it('does not run afterViewChecked hooks because parent view was not dirty (those hooks are executed by the parent)', () => {
            const fixture = testing_1.TestBed.createComponent(OnPushParent);
            fixture.detectChanges();
            // hook run once on initialization
            expect(fixture.componentInstance.signalChild.afterViewCheckedRuns).toBe(1);
            fixture.componentInstance.signalChild.value.set('new');
            fixture.detectChanges();
            expect(trim(fixture.nativeElement.textContent)).toEqual('new');
            // hook did not run again because host view was not refreshed
            expect(fixture.componentInstance.signalChild.afterViewCheckedRuns).toBe(1);
        });
    });
    it('can refresh the root of change detection if updated after checked', () => {
        const val = (0, core_1.signal)(1);
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    selector: 'child',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                ngOnInit() {
                    val.set(2);
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let SignalComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{val()}} <child />',
                    imports: [Child],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SignalComponent = _classThis = class {
                constructor() {
                    this.val = val;
                    this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                }
            };
            __setFunctionName(_classThis, "SignalComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SignalComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SignalComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(SignalComponent);
        fixture.componentInstance.cdr.detectChanges();
        expect(fixture.nativeElement.innerText).toEqual('2');
    });
    it('destroys all signal consumers when destroying the view tree', () => {
        const val = (0, core_1.signal)(1);
        const double = (0, core_1.computed)(() => val() * 2);
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{double()}}',
                    selector: 'child',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor() {
                    this.double = double;
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let SignalComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '|{{double()}}|<child />|',
                    imports: [Child],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SignalComponent = _classThis = class {
                constructor() {
                    this.double = double;
                }
            };
            __setFunctionName(_classThis, "SignalComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SignalComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SignalComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(SignalComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toEqual('|2|2|');
        const node = double[signals_1.SIGNAL];
        expect(node.dirty).toBe(false);
        // Change the signal to verify that the computed is dirtied while being read from the template.
        val.set(2);
        expect(node.dirty).toBe(true);
        fixture.detectChanges();
        expect(node.dirty).toBe(false);
        expect(fixture.nativeElement.innerText).toEqual('|4|4|');
        // Destroy the view tree to verify that the computed is unconnected from the graph for all
        // views.
        fixture.destroy();
        expect(node.dirty).toBe(false);
        // Writing further updates to the signal should not cause the computed to become dirty, since it
        // is no longer being observed.
        val.set(3);
        expect(node.dirty).toBe(false);
    });
});
function trim(text) {
    return text ? text.replace(/[\s\n]+/gm, ' ').trim() : '';
}
