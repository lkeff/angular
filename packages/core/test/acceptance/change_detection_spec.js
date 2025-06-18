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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const rxjs_1 = require("rxjs");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
describe('change detection', () => {
    it('can provide zone and zoneless (last one wins like any other provider) in TestBed', () => {
        (0, matchers_1.expect)(() => {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, core_1.provideZonelessChangeDetection)(), (0, core_1.provideZoneChangeDetection)()],
            });
            testing_1.TestBed.inject(core_1.ApplicationRef);
        }).not.toThrow();
    });
    describe('embedded views', () => {
        let ViewManipulation = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[viewManipulation]',
                    exportAs: 'vm',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ViewManipulation = _classThis = class {
                constructor(_tplRef, vcRef, _appRef) {
                    this._tplRef = _tplRef;
                    this.vcRef = vcRef;
                    this._appRef = _appRef;
                }
                insertIntoVcRef() {
                    return this.vcRef.createEmbeddedView(this._tplRef);
                }
                insertIntoAppRef() {
                    const viewRef = this._tplRef.createEmbeddedView({});
                    this._appRef.attachView(viewRef);
                    return viewRef;
                }
            };
            __setFunctionName(_classThis, "ViewManipulation");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ViewManipulation = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ViewManipulation = _classThis;
        })();
        let TestCmpt = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    template: `
        <ng-template #vm="vm" viewManipulation>{{'change-detected'}}</ng-template>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmpt = _classThis = class {
            };
            __setFunctionName(_classThis, "TestCmpt");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmpt = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmpt = _classThis;
        })();
        it('should detect changes for embedded views inserted through ViewContainerRef', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, ViewManipulation] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const vm = fixture.debugElement.childNodes[0].references['vm'];
            vm.insertIntoVcRef();
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('change-detected');
        });
        it('should detect changes for embedded views attached to ApplicationRef', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestCmpt, ViewManipulation] });
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            const vm = fixture.debugElement.childNodes[0].references['vm'];
            const viewRef = vm.insertIntoAppRef();
            // A newly created view was attached to the CD tree via ApplicationRef so should be also
            // change detected when ticking root component
            fixture.detectChanges();
            (0, matchers_1.expect)(viewRef.rootNodes[0]).toHaveText('change-detected');
        });
        it('should not detect changes for OnPush embedded views when they are not dirty', () => {
            let OnPushComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'onpush',
                        template: '',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OnPushComponent = _classThis = class {
                    constructor() {
                        this.checks = 0;
                        this.cdRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                    }
                    ngDoCheck() {
                        this.checks++;
                    }
                };
                __setFunctionName(_classThis, "OnPushComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OnPushComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OnPushComponent = _classThis;
            })();
            let Container = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '<ng-template #template></ng-template>' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcr_decorators;
                let _vcr_initializers = [];
                let _vcr_extraInitializers = [];
                var Container = _classThis = class {
                    constructor() {
                        this.vcr = __runInitializers(this, _vcr_initializers, void 0);
                        __runInitializers(this, _vcr_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Container");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcr_decorators = [(0, core_1.ViewChild)('template', { read: core_1.ViewContainerRef, static: true })];
                    __esDecorate(null, null, _vcr_decorators, { kind: "field", name: "vcr", static: false, private: false, access: { has: obj => "vcr" in obj, get: obj => obj.vcr, set: (obj, value) => { obj.vcr = value; } }, metadata: _metadata }, _vcr_initializers, _vcr_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Container = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Container = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Container);
            const ref = fixture.componentInstance.vcr.createComponent(OnPushComponent);
            fixture.detectChanges(false);
            (0, matchers_1.expect)(ref.instance.checks).toBe(1);
            fixture.detectChanges(false);
            (0, matchers_1.expect)(ref.instance.checks).toBe(1);
            ref.instance.cdRef.markForCheck();
            fixture.detectChanges(false);
            (0, matchers_1.expect)(ref.instance.checks).toBe(2);
        });
        it('should not detect changes in child embedded views while they are detached', () => {
            const counters = { componentView: 0, embeddedView: 0 };
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div>{{increment('componentView')}}</div>
          <ng-template #vm="vm" viewManipulation>{{increment('embeddedView')}}</ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    increment(counter) {
                        counters[counter]++;
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
            testing_1.TestBed.configureTestingModule({ declarations: [App, ViewManipulation] });
            const fixture = testing_1.TestBed.createComponent(App);
            const vm = fixture.debugElement.childNodes[1].references['vm'];
            const viewRef = vm.insertIntoVcRef();
            viewRef.detach();
            fixture.detectChanges();
            (0, matchers_1.expect)(counters).toEqual({ componentView: 2, embeddedView: 0 });
            // Re-attach the view to ensure that the process can be reversed.
            viewRef.reattach();
            fixture.detectChanges();
            (0, matchers_1.expect)(counters).toEqual({ componentView: 4, embeddedView: 2 });
        });
        it('should not detect changes in child component views while they are detached', () => {
            let counter = 0;
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `<ng-template #vm="vm" viewManipulation></ng-template>`,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
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
            let DynamicComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <button (click)="noop()">Trigger change detection</button>
          <div>{{increment()}}</div>
        `,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DynamicComp = _classThis = class {
                    increment() {
                        counter++;
                    }
                    noop() { }
                };
                __setFunctionName(_classThis, "DynamicComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [App, ViewManipulation, DynamicComp] });
            const fixture = testing_1.TestBed.createComponent(App);
            const vm = fixture.debugElement.childNodes[0].references['vm'];
            const componentRef = vm.vcRef.createComponent(DynamicComp);
            const button = fixture.nativeElement.querySelector('button');
            fixture.detectChanges();
            (0, matchers_1.expect)(counter).toBe(1);
            button.click();
            fixture.detectChanges();
            (0, matchers_1.expect)(counter).toBe(2);
            componentRef.changeDetectorRef.detach();
            button.click();
            fixture.detectChanges();
            (0, matchers_1.expect)(counter).toBe(2);
            // Re-attach the change detector to ensure that the process can be reversed.
            componentRef.changeDetectorRef.reattach();
            button.click();
            fixture.detectChanges();
            (0, matchers_1.expect)(counter).toBe(3);
        });
    });
    describe('markForCheck', () => {
        it('should mark OnPush ancestor of dynamically created component views as dirty', () => {
            let TestCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: `test-cmpt`,
                        template: `{{counter}}|<ng-template #vc></ng-template>`,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _vcRef_decorators;
                let _vcRef_initializers = [];
                let _vcRef_extraInitializers = [];
                var TestCmpt = _classThis = class {
                    createComponentView(cmptType) {
                        return this.vcRef.createComponent(cmptType);
                    }
                    constructor() {
                        this.counter = 0;
                        this.vcRef = __runInitializers(this, _vcRef_initializers, void 0);
                        __runInitializers(this, _vcRef_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _vcRef_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _vcRef_decorators, { kind: "field", name: "vcRef", static: false, private: false, access: { has: obj => "vcRef" in obj, get: obj => obj.vcRef, set: (obj, value) => { obj.vcRef = value; } }, metadata: _metadata }, _vcRef_initializers, _vcRef_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmpt = _classThis;
            })();
            let DynamicCmpt = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'dynamic-cmpt',
                        template: `dynamic|{{binding}}`,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _binding_decorators;
                let _binding_initializers = [];
                let _binding_extraInitializers = [];
                var DynamicCmpt = _classThis = class {
                    constructor() {
                        this.binding = __runInitializers(this, _binding_initializers, 'binding');
                        __runInitializers(this, _binding_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DynamicCmpt");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _binding_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _binding_decorators, { kind: "field", name: "binding", static: false, private: false, access: { has: obj => "binding" in obj, get: obj => obj.binding, set: (obj, value) => { obj.binding = value; } }, metadata: _metadata }, _binding_initializers, _binding_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCmpt = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCmpt = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmpt);
            // initial CD to have query results
            // NOTE: we call change detection without checkNoChanges to have clearer picture
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('0|');
            // insert a dynamic component, but do not specifically mark parent dirty
            // (dynamic components with OnPush flag are created with the `Dirty` flag)
            const dynamicCmptRef = fixture.componentInstance.createComponentView(DynamicCmpt);
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('0|dynamic|binding');
            // update model in the OnPush component - should not update UI
            fixture.componentInstance.counter = 1;
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('0|dynamic|binding');
            // now mark the dynamically inserted component as dirty
            dynamicCmptRef.changeDetectorRef.markForCheck();
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('1|dynamic|binding');
            // Update, mark for check, and detach before change detection, should not update
            dynamicCmptRef.setInput('binding', 'updatedBinding');
            dynamicCmptRef.changeDetectorRef.markForCheck();
            dynamicCmptRef.changeDetectorRef.detach();
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('1|dynamic|binding');
            // reattaching and run CD from the top should update
            dynamicCmptRef.changeDetectorRef.reattach();
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('1|dynamic|updatedBinding');
        });
        it('should support re-enterant change detection', () => {
            let HasHostBinding = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'has-host-binding',
                        template: '..',
                        host: {
                            '[class.x]': 'x',
                        },
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HasHostBinding = _classThis = class {
                    constructor() {
                        this.x = true;
                    }
                };
                __setFunctionName(_classThis, "HasHostBinding");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HasHostBinding = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HasHostBinding = _classThis;
            })();
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '<has-host-binding></has-host-binding>',
                        inputs: ['input'],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                    }
                    get input() {
                        return this._input;
                    }
                    set input(value) {
                        this._input = value;
                        this.cdr.detectChanges();
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
            let Root = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root',
                        template: '<child [input]="3"></child>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Root = _classThis = class {
                };
                __setFunctionName(_classThis, "Root");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Root = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Root = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Root, Child, HasHostBinding],
            });
            testing_1.TestBed.createComponent(Root).detectChanges();
        });
    });
    describe('OnPush', () => {
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: `{{ doCheckCount }} - {{ name }} <button (click)="onClick()"></button>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _name_decorators;
            let _name_initializers = [];
            let _name_extraInitializers = [];
            var MyComponent = _classThis = class {
                constructor() {
                    this.name = __runInitializers(this, _name_initializers, 'Nancy');
                    this.doCheckCount = (__runInitializers(this, _name_extraInitializers), 0);
                }
                ngDoCheck() {
                    this.doCheckCount++;
                }
                onClick() { }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _name_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-app',
                    template: '<my-comp [name]="name"></my-comp>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _comp_decorators;
            let _comp_initializers = [];
            let _comp_extraInitializers = [];
            var MyApp = _classThis = class {
                constructor() {
                    this.comp = __runInitializers(this, _comp_initializers, void 0);
                    this.name = (__runInitializers(this, _comp_extraInitializers), 'Nancy');
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _comp_decorators = [(0, core_1.ViewChild)(MyComponent)];
                __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        it('should check OnPush components on initialization', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, MyApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('1 - Nancy');
        });
        it('should call doCheck even when OnPush components are not dirty', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, MyApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(2);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(3);
        });
        it('should skip OnPush components in update mode when they are not dirty', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, MyApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            // doCheckCount is 2, but 1 should be rendered since it has not been marked dirty.
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('1 - Nancy');
            fixture.detectChanges();
            // doCheckCount is 3, but 1 should be rendered since it has not been marked dirty.
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('1 - Nancy');
        });
        it('should check OnPush components in update mode when inputs change', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, MyApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            fixture.componentInstance.name = 'Bess';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(2);
            // View should update, as changed input marks view dirty
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('2 - Bess');
            fixture.componentInstance.name = 'George';
            fixture.detectChanges();
            // View should update, as changed input marks view dirty
            (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(3);
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('3 - George');
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(4);
            // View should not be updated to "4", as inputs have not changed.
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('3 - George');
        });
        it('should check OnPush components in update mode when component events occur', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, MyApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('1 - Nancy');
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            // No ticks should have been scheduled.
            (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('1 - Nancy');
            fixture.detectChanges();
            // Because the onPush comp should be dirty, it should update once CD runs
            (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(2);
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('2 - Nancy');
        });
        it('should not check OnPush components in update mode when parent events occur', () => {
            let ButtonParent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'button-parent',
                        template: '<my-comp></my-comp><button id="parent" (click)="noop()"></button>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _comp_decorators;
                let _comp_initializers = [];
                let _comp_extraInitializers = [];
                var ButtonParent = _classThis = class {
                    noop() { }
                    constructor() {
                        this.comp = __runInitializers(this, _comp_initializers, void 0);
                        __runInitializers(this, _comp_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "ButtonParent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _comp_decorators = [(0, core_1.ViewChild)(MyComponent)];
                    __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ButtonParent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ButtonParent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, ButtonParent] });
            const fixture = testing_1.TestBed.createComponent(ButtonParent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('1 - Nancy');
            const button = fixture.nativeElement.querySelector('button#parent');
            button.click();
            fixture.detectChanges();
            // The comp should still be clean. So doCheck will run, but the view should display 1.
            (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(2);
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('1 - Nancy');
        });
        it('should check parent OnPush components in update mode when child events occur', () => {
            let ButtonParent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'button-parent',
                        template: '{{ doCheckCount }} - <my-comp></my-comp>',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _comp_decorators;
                let _comp_initializers = [];
                let _comp_extraInitializers = [];
                var ButtonParent = _classThis = class {
                    constructor() {
                        this.comp = __runInitializers(this, _comp_initializers, void 0);
                        this.doCheckCount = (__runInitializers(this, _comp_extraInitializers), 0);
                    }
                    noop() { }
                    ngDoCheck() {
                        this.doCheckCount++;
                    }
                };
                __setFunctionName(_classThis, "ButtonParent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _comp_decorators = [(0, core_1.ViewChild)(MyComponent)];
                    __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ButtonParent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ButtonParent = _classThis;
            })();
            let MyButtonApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-button-app',
                        template: '<button-parent></button-parent>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _parent_decorators;
                let _parent_initializers = [];
                let _parent_extraInitializers = [];
                var MyButtonApp = _classThis = class {
                    constructor() {
                        this.parent = __runInitializers(this, _parent_initializers, void 0);
                        __runInitializers(this, _parent_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyButtonApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _parent_decorators = [(0, core_1.ViewChild)(ButtonParent)];
                    __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, get: obj => obj.parent, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyButtonApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyButtonApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyButtonApp, MyComponent, ButtonParent] });
            const fixture = testing_1.TestBed.createComponent(MyButtonApp);
            fixture.detectChanges();
            const parent = fixture.componentInstance.parent;
            const comp = parent.comp;
            (0, matchers_1.expect)(parent.doCheckCount).toEqual(1);
            (0, matchers_1.expect)(comp.doCheckCount).toEqual(1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('1 - 1 - Nancy');
            fixture.detectChanges();
            (0, matchers_1.expect)(parent.doCheckCount).toEqual(2);
            // parent isn't checked, so child doCheck won't run
            (0, matchers_1.expect)(comp.doCheckCount).toEqual(1);
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('1 - 1 - Nancy');
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            // No ticks should have been scheduled.
            (0, matchers_1.expect)(parent.doCheckCount).toEqual(2);
            (0, matchers_1.expect)(comp.doCheckCount).toEqual(1);
            fixture.detectChanges();
            (0, matchers_1.expect)(parent.doCheckCount).toEqual(3);
            (0, matchers_1.expect)(comp.doCheckCount).toEqual(2);
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('3 - 2 - Nancy');
        });
        it('should check parent OnPush components when child directive on a template emits event', (0, testing_1.fakeAsync)(() => {
            let Emitter = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[emitter]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _event_decorators;
                let _event_initializers = [];
                let _event_extraInitializers = [];
                var Emitter = _classThis = class {
                    ngOnInit() {
                        setTimeout(() => {
                            this.event.emit('new message');
                        });
                    }
                    constructor() {
                        this.event = __runInitializers(this, _event_initializers, new core_1.EventEmitter());
                        __runInitializers(this, _event_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Emitter");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _event_decorators = [(0, core_1.Output)()];
                    __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Emitter = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Emitter = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '{{message}} <ng-template emitter (event)="message = $event"></ng-template>',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                    constructor() {
                        this.message = 'initial message';
                    }
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [MyApp, Emitter],
            }).createComponent(MyApp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('initial message');
            (0, testing_1.tick)();
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toEqual('new message');
        }));
    });
    describe('ChangeDetectorRef', () => {
        describe('detectChanges()', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-comp',
                        template: '{{ name }}',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                        this.doCheckCount = 0;
                        this.name = 'Nancy';
                    }
                    ngDoCheck() {
                        this.doCheckCount++;
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
            let ParentComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent-comp',
                        template: `{{ doCheckCount}} - <my-comp></my-comp>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _myComp_decorators;
                let _myComp_initializers = [];
                let _myComp_extraInitializers = [];
                var ParentComp = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                        this.myComp = __runInitializers(this, _myComp_initializers, void 0);
                        this.doCheckCount = (__runInitializers(this, _myComp_extraInitializers), 0);
                    }
                    ngDoCheck() {
                        this.doCheckCount++;
                    }
                };
                __setFunctionName(_classThis, "ParentComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _myComp_decorators = [(0, core_1.ViewChild)(MyComp)];
                    __esDecorate(null, null, _myComp_decorators, { kind: "field", name: "myComp", static: false, private: false, access: { has: obj => "myComp" in obj, get: obj => obj.myComp, set: (obj, value) => { obj.myComp = value; } }, metadata: _metadata }, _myComp_initializers, _myComp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentComp = _classThis;
            })();
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
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
            it('should check the component view when called by component (even when OnPush && clean)', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Nancy');
                fixture.componentInstance.name = 'Bess'; // as this is not an Input, the component stays clean
                fixture.componentInstance.cdr.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Bess');
            });
            it('should NOT call component doCheck when called by a component', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
                const fixture = testing_1.TestBed.createComponent(MyComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.componentInstance.doCheckCount).toEqual(1);
                // NOTE: in current Angular, detectChanges does not itself trigger doCheck, but you
                // may see doCheck called in some cases bc of the extra CD run triggered by zone.js.
                // It's important not to call doCheck to allow calls to detectChanges in that hook.
                fixture.componentInstance.cdr.detectChanges();
                (0, matchers_1.expect)(fixture.componentInstance.doCheckCount).toEqual(1);
            });
            it('should NOT check the component parent when called by a child component', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ParentComp] });
                const fixture = testing_1.TestBed.createComponent(ParentComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('1 - Nancy');
                fixture.componentInstance.doCheckCount = 100;
                fixture.componentInstance.myComp.cdr.detectChanges();
                (0, matchers_1.expect)(fixture.componentInstance.doCheckCount).toEqual(100);
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('1 - Nancy');
            });
            it('should check component children when called by component if dirty or check-always', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ParentComp] });
                const fixture = testing_1.TestBed.createComponent(ParentComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.componentInstance.doCheckCount).toEqual(1);
                fixture.componentInstance.myComp.name = 'Bess';
                fixture.componentInstance.cdr.detectChanges();
                (0, matchers_1.expect)(fixture.componentInstance.doCheckCount).toEqual(1);
                (0, matchers_1.expect)(fixture.componentInstance.myComp.doCheckCount).toEqual(2);
                // OnPush child is not dirty, so its change isn't rendered.
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('1 - Nancy');
            });
            it('should not group detectChanges calls (call every time)', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, ParentComp] });
                const fixture = testing_1.TestBed.createComponent(ParentComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.componentInstance.doCheckCount).toEqual(1);
                fixture.componentInstance.cdr.detectChanges();
                fixture.componentInstance.cdr.detectChanges();
                (0, matchers_1.expect)(fixture.componentInstance.myComp.doCheckCount).toEqual(3);
            });
            it('should check component view when called by directive on component node', () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<my-comp dir></my-comp>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _myComp_decorators;
                    let _myComp_initializers = [];
                    let _myComp_extraInitializers = [];
                    let _dir_decorators;
                    let _dir_initializers = [];
                    let _dir_extraInitializers = [];
                    var MyApp = _classThis = class {
                        constructor() {
                            this.myComp = __runInitializers(this, _myComp_initializers, void 0);
                            this.dir = (__runInitializers(this, _myComp_extraInitializers), __runInitializers(this, _dir_initializers, void 0));
                            __runInitializers(this, _dir_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _myComp_decorators = [(0, core_1.ViewChild)(MyComp)];
                        _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                        __esDecorate(null, null, _myComp_decorators, { kind: "field", name: "myComp", static: false, private: false, access: { has: obj => "myComp" in obj, get: obj => obj.myComp, set: (obj, value) => { obj.myComp = value; } }, metadata: _metadata }, _myComp_initializers, _myComp_extraInitializers);
                        __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [MyComp, Dir, MyApp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Nancy');
                fixture.componentInstance.myComp.name = 'George';
                fixture.componentInstance.dir.cdr.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('George');
            });
            it('should check host component when called by directive on element node', () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '{{ value }}<div dir></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _myComp_decorators;
                    let _myComp_initializers = [];
                    let _myComp_extraInitializers = [];
                    let _dir_decorators;
                    let _dir_initializers = [];
                    let _dir_extraInitializers = [];
                    var MyApp = _classThis = class {
                        constructor() {
                            this.myComp = __runInitializers(this, _myComp_initializers, void 0);
                            this.dir = (__runInitializers(this, _myComp_extraInitializers), __runInitializers(this, _dir_initializers, void 0));
                            this.value = (__runInitializers(this, _dir_extraInitializers), '');
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _myComp_decorators = [(0, core_1.ViewChild)(MyComp)];
                        _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                        __esDecorate(null, null, _myComp_decorators, { kind: "field", name: "myComp", static: false, private: false, access: { has: obj => "myComp" in obj, get: obj => obj.myComp, set: (obj, value) => { obj.myComp = value; } }, metadata: _metadata }, _myComp_initializers, _myComp_extraInitializers);
                        __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [Dir, MyApp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                fixture.componentInstance.value = 'Frank';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Frank');
                fixture.componentInstance.value = 'Joe';
                fixture.componentInstance.dir.cdr.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Joe');
            });
            it('should check the host component when called from EmbeddedViewRef', () => {
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '{{ name }}<div *ngIf="showing" dir></div>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _dir_decorators;
                    let _dir_initializers = [];
                    let _dir_extraInitializers = [];
                    var MyApp = _classThis = class {
                        constructor() {
                            this.dir = __runInitializers(this, _dir_initializers, void 0);
                            this.showing = (__runInitializers(this, _dir_extraInitializers), true);
                            this.name = 'Amelia';
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _dir_decorators = [(0, core_1.ViewChild)(Dir)];
                        __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [Dir, MyApp], imports: [common_1.CommonModule] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Amelia');
                fixture.componentInstance.name = 'Emerson';
                fixture.componentInstance.dir.cdr.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Emerson');
            });
            it('should support call in ngOnInit', () => {
                let DetectChangesComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '{{ value }}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DetectChangesComp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            this.value = 0;
                        }
                        ngOnInit() {
                            this.value++;
                            this.cdr.detectChanges();
                        }
                    };
                    __setFunctionName(_classThis, "DetectChangesComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DetectChangesComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DetectChangesComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [DetectChangesComp] });
                const fixture = testing_1.TestBed.createComponent(DetectChangesComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('1');
            });
            ['OnInit', 'AfterContentInit', 'AfterViewInit', 'OnChanges'].forEach((hook) => {
                it(`should not go infinite loop when recursively called from children's ng${hook}`, () => {
                    let ParentComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<child-comp [inp]="true"></child-comp>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var ParentComp = _classThis = class {
                            constructor(cdr) {
                                this.cdr = cdr;
                            }
                            triggerChangeDetection() {
                                this.cdr.detectChanges();
                            }
                        };
                        __setFunctionName(_classThis, "ParentComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ParentComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ParentComp = _classThis;
                    })();
                    let ChildComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '{{inp}}',
                                selector: 'child-comp',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _inp_decorators;
                        let _inp_initializers = [];
                        let _inp_extraInitializers = [];
                        var ChildComp = _classThis = class {
                            constructor(parentComp) {
                                this.parentComp = parentComp;
                                this.inp = __runInitializers(this, _inp_initializers, '');
                                this.count = (__runInitializers(this, _inp_extraInitializers), 0);
                            }
                            ngOnInit() {
                                this.check('OnInit');
                            }
                            ngAfterContentInit() {
                                this.check('AfterContentInit');
                            }
                            ngAfterViewInit() {
                                this.check('AfterViewInit');
                            }
                            ngOnChanges() {
                                this.check('OnChanges');
                            }
                            check(h) {
                                if (h === hook) {
                                    this.count++;
                                    if (this.count > 1)
                                        throw new Error(`ng${hook} should be called only once!`);
                                    this.parentComp.triggerChangeDetection();
                                }
                            }
                        };
                        __setFunctionName(_classThis, "ChildComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _inp_decorators = [(0, core_1.Input)()];
                            __esDecorate(null, null, _inp_decorators, { kind: "field", name: "inp", static: false, private: false, access: { has: obj => "inp" in obj, get: obj => obj.inp, set: (obj, value) => { obj.inp = value; } }, metadata: _metadata }, _inp_initializers, _inp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            ChildComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return ChildComp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [ParentComp, ChildComp] });
                    (0, matchers_1.expect)(() => {
                        const fixture = testing_1.TestBed.createComponent(ParentComp);
                        fixture.detectChanges();
                    }).not.toThrow();
                });
            });
            it('should support call in ngDoCheck', () => {
                let DetectChangesComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '{{doCheckCount}}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DetectChangesComp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            this.doCheckCount = 0;
                        }
                        ngDoCheck() {
                            this.doCheckCount++;
                            this.cdr.detectChanges();
                        }
                    };
                    __setFunctionName(_classThis, "DetectChangesComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DetectChangesComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DetectChangesComp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [DetectChangesComp] });
                const fixture = testing_1.TestBed.createComponent(DetectChangesComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('1');
            });
            it('should support change detection triggered as a result of View queries processing', () => {
                let App = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'app',
                            template: `
            <div *ngIf="visible" #ref>Visible text</div>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _ref_decorators;
                    let _ref_initializers = [];
                    let _ref_extraInitializers = [];
                    var App = _classThis = class {
                        constructor(changeDetectorRef) {
                            this.changeDetectorRef = changeDetectorRef;
                            this.ref = __runInitializers(this, _ref_initializers, void 0);
                            this.visible = (__runInitializers(this, _ref_extraInitializers), false);
                        }
                        ngAfterViewInit() {
                            this.ref.changes.subscribe((refs) => {
                                this.visible = false;
                                this.changeDetectorRef.detectChanges();
                            });
                        }
                    };
                    __setFunctionName(_classThis, "App");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _ref_decorators = [(0, core_1.ViewChildren)('ref')];
                        __esDecorate(null, null, _ref_decorators, { kind: "field", name: "ref", static: false, private: false, access: { has: obj => "ref" in obj, get: obj => obj.ref, set: (obj, value) => { obj.ref = value; } }, metadata: _metadata }, _ref_initializers, _ref_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        App = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return App = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [App],
                    imports: [common_1.CommonModule],
                });
                const fixture = testing_1.TestBed.createComponent(App);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
                // even though we set "visible" to `true`, we do not expect any content to be displayed,
                // since the flag is overridden in `ngAfterViewInit` back to `false`
                fixture.componentInstance.visible = true;
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
            });
            describe('dynamic views', () => {
                let StructuralComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'structural-comp',
                            template: '{{ value }}',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _tmp_decorators;
                    let _tmp_initializers = [];
                    let _tmp_extraInitializers = [];
                    var StructuralComp = _classThis = class {
                        constructor(vcr) {
                            this.vcr = vcr;
                            this.tmp = __runInitializers(this, _tmp_initializers, void 0);
                            this.value = (__runInitializers(this, _tmp_extraInitializers), 'one');
                        }
                        create() {
                            return this.vcr.createEmbeddedView(this.tmp, { ctx: this });
                        }
                    };
                    __setFunctionName(_classThis, "StructuralComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _tmp_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _tmp_decorators, { kind: "field", name: "tmp", static: false, private: false, access: { has: obj => "tmp" in obj, get: obj => obj.tmp, set: (obj, value) => { obj.tmp = value; } }, metadata: _metadata }, _tmp_initializers, _tmp_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        StructuralComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return StructuralComp = _classThis;
                })();
                it('should support ViewRef.detectChanges()', () => {
                    let App = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<ng-template #foo let-ctx="ctx">{{ ctx.value }}</ng-template><structural-comp [tmp]="foo"></structural-comp>',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _structuralComp_decorators;
                        let _structuralComp_initializers = [];
                        let _structuralComp_extraInitializers = [];
                        var App = _classThis = class {
                            constructor() {
                                this.structuralComp = __runInitializers(this, _structuralComp_initializers, void 0);
                                __runInitializers(this, _structuralComp_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "App");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _structuralComp_decorators = [(0, core_1.ViewChild)(StructuralComp)];
                            __esDecorate(null, null, _structuralComp_decorators, { kind: "field", name: "structuralComp", static: false, private: false, access: { has: obj => "structuralComp" in obj, get: obj => obj.structuralComp, set: (obj, value) => { obj.structuralComp = value; } }, metadata: _metadata }, _structuralComp_initializers, _structuralComp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            App = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return App = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [App, StructuralComp] });
                    const fixture = testing_1.TestBed.createComponent(App);
                    fixture.detectChanges();
                    (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
                    const viewRef = fixture.componentInstance.structuralComp.create();
                    fixture.detectChanges();
                    (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('oneone');
                    // check embedded view update
                    fixture.componentInstance.structuralComp.value = 'two';
                    viewRef.detectChanges();
                    (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('onetwo');
                    // check root view update
                    fixture.componentInstance.structuralComp.value = 'three';
                    fixture.detectChanges();
                    (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('threethree');
                });
                it('should support ViewRef.detectChanges() directly after creation', () => {
                    let App = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '<ng-template #foo>Template text</ng-template><structural-comp [tmp]="foo">',
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _structuralComp_decorators;
                        let _structuralComp_initializers = [];
                        let _structuralComp_extraInitializers = [];
                        var App = _classThis = class {
                            constructor() {
                                this.structuralComp = __runInitializers(this, _structuralComp_initializers, void 0);
                                __runInitializers(this, _structuralComp_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "App");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _structuralComp_decorators = [(0, core_1.ViewChild)(StructuralComp)];
                            __esDecorate(null, null, _structuralComp_decorators, { kind: "field", name: "structuralComp", static: false, private: false, access: { has: obj => "structuralComp" in obj, get: obj => obj.structuralComp, set: (obj, value) => { obj.structuralComp = value; } }, metadata: _metadata }, _structuralComp_initializers, _structuralComp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            App = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return App = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({ declarations: [App, StructuralComp] });
                    const fixture = testing_1.TestBed.createComponent(App);
                    fixture.detectChanges();
                    (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
                    const viewRef = fixture.componentInstance.structuralComp.create();
                    viewRef.detectChanges();
                    (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('oneTemplate text');
                });
            });
        });
        describe('attach/detach', () => {
            let DetachedComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'detached-comp',
                        template: '{{ value }}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var DetachedComp = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                        this.value = 'one';
                        this.doCheckCount = 0;
                    }
                    ngDoCheck() {
                        this.doCheckCount++;
                    }
                };
                __setFunctionName(_classThis, "DetachedComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DetachedComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DetachedComp = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<detached-comp></detached-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _comp_decorators;
                let _comp_initializers = [];
                let _comp_extraInitializers = [];
                var MyApp = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                        this.comp = __runInitializers(this, _comp_initializers, void 0);
                        __runInitializers(this, _comp_extraInitializers);
                        this.cdr = cdr;
                    }
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _comp_decorators = [(0, core_1.ViewChild)(DetachedComp)];
                    __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            it('should not check detached components', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, DetachedComp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
                fixture.componentInstance.comp.cdr.detach();
                fixture.componentInstance.comp.value = 'two';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
            });
            it('should check re-attached components', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, DetachedComp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
                fixture.componentInstance.comp.cdr.detach();
                fixture.componentInstance.comp.value = 'two';
                fixture.componentInstance.comp.cdr.reattach();
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('two');
            });
            it('should call lifecycle hooks on detached components', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, DetachedComp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(1);
                fixture.componentInstance.comp.cdr.detach();
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.componentInstance.comp.doCheckCount).toEqual(2);
            });
            it('should check detached component when detectChanges is called', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, DetachedComp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
                fixture.componentInstance.comp.cdr.detach();
                fixture.componentInstance.comp.value = 'two';
                fixture.componentInstance.comp.cdr.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('two');
            });
            it('should not check detached component when markDirty is called', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, DetachedComp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                const comp = fixture.componentInstance.comp;
                comp.cdr.detach();
                comp.value = 'two';
                comp.cdr.markForCheck();
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
            });
            it('should detach any child components when parent is detached', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [MyApp, DetachedComp] });
                const fixture = testing_1.TestBed.createComponent(MyApp);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
                fixture.componentInstance.cdr.detach();
                fixture.componentInstance.comp.value = 'two';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
                fixture.componentInstance.cdr.reattach();
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('two');
            });
            it('should detach OnPush components properly', () => {
                let OnPushComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'on-push-comp',
                            template: '{{ value }}',
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _value_decorators;
                    let _value_initializers = [];
                    let _value_extraInitializers = [];
                    var OnPushComp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            this.value = __runInitializers(this, _value_initializers, void 0);
                            __runInitializers(this, _value_extraInitializers);
                            this.cdr = cdr;
                        }
                    };
                    __setFunctionName(_classThis, "OnPushComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _value_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OnPushComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OnPushComp = _classThis;
                })();
                let OnPushApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<on-push-comp [value]="value"></on-push-comp>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _onPushComp_decorators;
                    let _onPushComp_initializers = [];
                    let _onPushComp_extraInitializers = [];
                    var OnPushApp = _classThis = class {
                        constructor() {
                            this.onPushComp = __runInitializers(this, _onPushComp_initializers, void 0);
                            this.value = (__runInitializers(this, _onPushComp_extraInitializers), '');
                        }
                    };
                    __setFunctionName(_classThis, "OnPushApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _onPushComp_decorators = [(0, core_1.ViewChild)(OnPushComp)];
                        __esDecorate(null, null, _onPushComp_decorators, { kind: "field", name: "onPushComp", static: false, private: false, access: { has: obj => "onPushComp" in obj, get: obj => obj.onPushComp, set: (obj, value) => { obj.onPushComp = value; } }, metadata: _metadata }, _onPushComp_initializers, _onPushComp_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        OnPushApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return OnPushApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({ declarations: [OnPushApp, OnPushComp] });
                const fixture = testing_1.TestBed.createComponent(OnPushApp);
                fixture.detectChanges();
                fixture.componentInstance.value = 'one';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
                fixture.componentInstance.onPushComp.cdr.detach();
                fixture.componentInstance.value = 'two';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one');
                fixture.componentInstance.onPushComp.cdr.reattach();
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('two');
            });
        });
        describe('markForCheck()', () => {
            let OnPushComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'on-push-comp',
                        template: '{{ value }}',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OnPushComp = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                        this.value = 'one';
                        this.doCheckCount = 0;
                    }
                    ngDoCheck() {
                        this.doCheckCount++;
                    }
                };
                __setFunctionName(_classThis, "OnPushComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OnPushComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OnPushComp = _classThis;
            })();
            let OnPushParent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{ value }} - <on-push-comp></on-push-comp>',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _comp_decorators;
                let _comp_initializers = [];
                let _comp_extraInitializers = [];
                var OnPushParent = _classThis = class {
                    constructor() {
                        this.comp = __runInitializers(this, _comp_initializers, void 0);
                        this.value = (__runInitializers(this, _comp_extraInitializers), 'one');
                    }
                };
                __setFunctionName(_classThis, "OnPushParent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _comp_decorators = [(0, core_1.ViewChild)(OnPushComp)];
                    __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OnPushParent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OnPushParent = _classThis;
            })();
            it('should ensure OnPush components are checked', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [OnPushParent, OnPushComp] });
                const fixture = testing_1.TestBed.createComponent(OnPushParent);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - one');
                fixture.componentInstance.comp.value = 'two';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - one');
                fixture.componentInstance.comp.cdr.markForCheck();
                // Change detection should not have run yet, since markForCheck
                // does not itself schedule change detection.
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - one');
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - two');
            });
            it('should never schedule change detection on its own', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [OnPushParent, OnPushComp] });
                const fixture = testing_1.TestBed.createComponent(OnPushParent);
                fixture.detectChanges();
                const comp = fixture.componentInstance.comp;
                (0, matchers_1.expect)(comp.doCheckCount).toEqual(1);
                comp.cdr.markForCheck();
                comp.cdr.markForCheck();
                (0, matchers_1.expect)(comp.doCheckCount).toEqual(1);
            });
            it('should ensure ancestor OnPush components are checked', () => {
                testing_1.TestBed.configureTestingModule({ declarations: [OnPushParent, OnPushComp] });
                const fixture = testing_1.TestBed.createComponent(OnPushParent);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - one');
                fixture.componentInstance.value = 'two';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - one');
                fixture.componentInstance.comp.cdr.markForCheck();
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('two - one');
            });
            it('should ensure OnPush components in embedded views are checked', () => {
                let EmbeddedViewParent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '{{ value }} - <on-push-comp *ngIf="showing"></on-push-comp>',
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _comp_decorators;
                    let _comp_initializers = [];
                    let _comp_extraInitializers = [];
                    var EmbeddedViewParent = _classThis = class {
                        constructor() {
                            this.comp = __runInitializers(this, _comp_initializers, void 0);
                            this.value = (__runInitializers(this, _comp_extraInitializers), 'one');
                            this.showing = true;
                        }
                    };
                    __setFunctionName(_classThis, "EmbeddedViewParent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _comp_decorators = [(0, core_1.ViewChild)(OnPushComp)];
                        __esDecorate(null, null, _comp_decorators, { kind: "field", name: "comp", static: false, private: false, access: { has: obj => "comp" in obj, get: obj => obj.comp, set: (obj, value) => { obj.comp = value; } }, metadata: _metadata }, _comp_initializers, _comp_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        EmbeddedViewParent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return EmbeddedViewParent = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [EmbeddedViewParent, OnPushComp],
                    imports: [common_1.CommonModule],
                });
                const fixture = testing_1.TestBed.createComponent(EmbeddedViewParent);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - one');
                fixture.componentInstance.comp.value = 'two';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - one');
                fixture.componentInstance.comp.cdr.markForCheck();
                // markForCheck should not trigger change detection on its own.
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - one');
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - two');
                fixture.componentInstance.value = 'two';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('one - two');
                fixture.componentInstance.comp.cdr.markForCheck();
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('two - two');
            });
            it('async pipe should trigger CD for embedded views where the declaration and insertion views are different', () => {
                let Insertion = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'insertion',
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                            template: ` <ng-container [ngTemplateOutlet]="template"> </ng-container> `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    let _template_decorators;
                    let _template_initializers = [];
                    let _template_extraInitializers = [];
                    var Insertion = _classThis = class {
                        constructor() {
                            this.template = __runInitializers(this, _template_initializers, void 0);
                            __runInitializers(this, _template_extraInitializers);
                        }
                    };
                    __setFunctionName(_classThis, "Insertion");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        _template_decorators = [(0, core_1.Input)()];
                        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Insertion = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Insertion = _classThis;
                })();
                // This component uses async pipe (which calls markForCheck) in a view that has different
                // insertion and declaration views.
                let Declaration = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                            template: `
          <insertion [template]="ref"></insertion>
          <ng-template #ref>
            <span>{{value | async}}</span>
          </ng-template>
          `,
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Declaration = _classThis = class {
                        constructor() {
                            this.value = new rxjs_1.BehaviorSubject('initial value');
                        }
                    };
                    __setFunctionName(_classThis, "Declaration");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Declaration = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Declaration = _classThis;
                })();
                const fixture = testing_1.TestBed.configureTestingModule({
                    declarations: [Insertion, Declaration],
                }).createComponent(Declaration);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.debugElement.nativeElement.textContent).toContain('initial value');
                fixture.componentInstance.value.next('new value');
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.debugElement.nativeElement.textContent).toContain('new value');
            });
            // TODO(kara): add test for dynamic views once bug fix is in
        });
        describe('checkNoChanges', () => {
            let comp;
            let NoChangesComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'no-changes-comp',
                        template: '{{ value }}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NoChangesComp = _classThis = class {
                    ngDoCheck() {
                        this.doCheckCount++;
                    }
                    ngAfterContentChecked() {
                        this.contentCheckCount++;
                    }
                    ngAfterViewChecked() {
                        this.viewCheckCount++;
                    }
                    constructor(cdr) {
                        this.cdr = cdr;
                        this.value = 1;
                        this.doCheckCount = 0;
                        this.contentCheckCount = 0;
                        this.viewCheckCount = 0;
                        comp = this;
                    }
                };
                __setFunctionName(_classThis, "NoChangesComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NoChangesComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NoChangesComp = _classThis;
            })();
            let AppComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{ value }} - <no-changes-comp></no-changes-comp>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComp = _classThis = class {
                    constructor(cdr) {
                        this.cdr = cdr;
                        this.value = 1;
                    }
                };
                __setFunctionName(_classThis, "AppComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComp = _classThis;
            })();
            // Custom error handler that just rethrows all the errors from the
            // view, rather than logging them out. Used to keep our logs clean.
            class RethrowErrorHandler extends core_1.ErrorHandler {
                handleError(error) {
                    throw error;
                }
            }
            it('should throw if bindings in current view have changed', () => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [NoChangesComp],
                    providers: [{ provide: core_1.ErrorHandler, useClass: RethrowErrorHandler }],
                });
                const fixture = testing_1.TestBed.createComponent(NoChangesComp);
                (0, matchers_1.expect)(() => {
                    fixture.componentInstance.cdr.checkNoChanges();
                }).toThrowError(/ExpressionChangedAfterItHasBeenCheckedError: .+ Previous value: '.*undefined'. Current value: '.*1'/gi);
            });
            it('should throw if interpolations in current view have changed', () => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [AppComp, NoChangesComp],
                    providers: [{ provide: core_1.ErrorHandler, useClass: RethrowErrorHandler }],
                });
                const fixture = testing_1.TestBed.createComponent(AppComp);
                (0, matchers_1.expect)(() => fixture.componentInstance.cdr.checkNoChanges()).toThrowError(/ExpressionChangedAfterItHasBeenCheckedError: .+ Previous value: '.*undefined'. Current value: '.*1'/gi);
            });
            it('should throw if bindings in embedded view have changed', () => {
                let EmbeddedViewApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '<span *ngIf="showing">{{ showing }}</span>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var EmbeddedViewApp = _classThis = class {
                        constructor(cdr) {
                            this.cdr = cdr;
                            this.showing = true;
                        }
                    };
                    __setFunctionName(_classThis, "EmbeddedViewApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        EmbeddedViewApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return EmbeddedViewApp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    declarations: [EmbeddedViewApp],
                    imports: [common_1.CommonModule],
                    providers: [{ provide: core_1.ErrorHandler, useClass: RethrowErrorHandler }],
                });
                const fixture = testing_1.TestBed.createComponent(EmbeddedViewApp);
                (0, matchers_1.expect)(() => fixture.componentInstance.cdr.checkNoChanges()).toThrowError(/ExpressionChangedAfterItHasBeenCheckedError: .+ Previous value: '.*undefined'. Current value: '.*true'/gi);
            });
            it('should NOT call lifecycle hooks', () => {
                testing_1.TestBed.configureTestingModule({
                    declarations: [AppComp, NoChangesComp],
                    providers: [{ provide: core_1.ErrorHandler, useClass: RethrowErrorHandler }],
                });
                const fixture = testing_1.TestBed.createComponent(AppComp);
                fixture.detectChanges();
                (0, matchers_1.expect)(comp.doCheckCount).toEqual(1);
                (0, matchers_1.expect)(comp.contentCheckCount).toEqual(1);
                (0, matchers_1.expect)(comp.viewCheckCount).toEqual(1);
                comp.value = 2;
                (0, matchers_1.expect)(() => fixture.componentInstance.cdr.checkNoChanges()).toThrow();
                (0, matchers_1.expect)(comp.doCheckCount).toEqual(1);
                (0, matchers_1.expect)(comp.contentCheckCount).toEqual(1);
                (0, matchers_1.expect)(comp.viewCheckCount).toEqual(1);
            });
            describe('provideExperimentalCheckNoChangesForDebug', () => {
                // Needed because tests in this repo patch rAF to be setTimeout
                // and coalescing tries to get the native one but fails so
                // coalescing will run a timeout in the zone and cause an infinite loop.
                const previousRaf = global.requestAnimationFrame;
                beforeEach(() => {
                    global.requestAnimationFrame = undefined;
                });
                afterEach(() => {
                    global.requestAnimationFrame = previousRaf;
                });
                let MyApp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                            template: '{{state}}{{resolveReadPromise()}}',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyApp = _classThis = class {
                        constructor() {
                            this.state = 'initial';
                            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                        }
                        createReadPromise() {
                            this.promise = new Promise((resolve) => {
                                this.resolve = resolve;
                            });
                        }
                        resolveReadPromise() {
                            var _a;
                            (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this);
                        }
                    };
                    __setFunctionName(_classThis, "MyApp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        MyApp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return MyApp = _classThis;
                })();
                it('throws expression changed with interval', () => __awaiter(void 0, void 0, void 0, function* () {
                    let error = undefined;
                    testing_1.TestBed.configureTestingModule({
                        providers: [
                            (0, core_1.provideZonelessChangeDetection)(),
                            (0, core_1.provideCheckNoChangesConfig)({ interval: 5, exhaustive: true }),
                            {
                                provide: core_1.ErrorHandler,
                                useValue: {
                                    handleError(e) {
                                        error = e;
                                    },
                                },
                            },
                        ],
                    });
                    const fixture = testing_1.TestBed.createComponent(MyApp);
                    fixture.detectChanges();
                    fixture.componentInstance.state = 'new';
                    yield new Promise((resolve) => setTimeout(resolve, 10));
                    (0, matchers_1.expect)(error.code).toEqual(-100 /* RuntimeErrorCode.EXPRESSION_CHANGED_AFTER_CHECKED */);
                }));
                it('does not throw expression changed with interval if change detection is scheduled', () => __awaiter(void 0, void 0, void 0, function* () {
                    let error = undefined;
                    testing_1.TestBed.configureTestingModule({
                        providers: [
                            (0, core_1.provideZonelessChangeDetection)(),
                            (0, core_1.provideCheckNoChangesConfig)({ interval: 0, exhaustive: true }),
                            {
                                provide: core_1.ErrorHandler,
                                useValue: {
                                    handleError(e) {
                                        error = e;
                                    },
                                },
                            },
                        ],
                    });
                    const fixture = testing_1.TestBed.createComponent(MyApp);
                    fixture.detectChanges();
                    fixture.componentInstance.state = 'new';
                    // markForCheck schedules change detection
                    fixture.componentInstance.changeDetectorRef.markForCheck();
                    // wait beyond the exhaustive check interval
                    yield new Promise((resolve) => setTimeout(resolve, 1));
                    (0, matchers_1.expect)(error).toBeUndefined();
                }));
                it('throws expression changed OnPush components', () => {
                    testing_1.TestBed.configureTestingModule({
                        providers: [(0, core_1.provideCheckNoChangesConfig)({ exhaustive: true })],
                    });
                    let NotUnidirectionalDataFlow = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: '{{state}}',
                                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var NotUnidirectionalDataFlow = _classThis = class {
                            constructor() {
                                this.state = 1;
                            }
                            ngAfterViewChecked() {
                                this.state++;
                            }
                        };
                        __setFunctionName(_classThis, "NotUnidirectionalDataFlow");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            NotUnidirectionalDataFlow = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return NotUnidirectionalDataFlow = _classThis;
                    })();
                    (0, matchers_1.expect)(() => testing_1.TestBed.createComponent(NotUnidirectionalDataFlow).detectChanges()).toThrowError(/.*ExpressionChanged.*/);
                });
            });
        });
    });
    describe('OnPush markForCheck in lifecycle hooks', () => {
        describe('with check no changes enabled', () => createOnPushMarkForCheckTests(true));
        describe('with check no changes disabled', () => createOnPushMarkForCheckTests(false));
        function createOnPushMarkForCheckTests(checkNoChanges) {
            const detectChanges = (f) => f.detectChanges(checkNoChanges);
            // 1. ngAfterViewInit and ngAfterViewChecked lifecycle hooks run after "OnPushComp" has
            //    been refreshed. They can mark the component as dirty. Meaning that the "OnPushComp"
            //    can be checked/refreshed in a subsequent change detection cycle.
            // 2. ngDoCheck and ngAfterContentChecked lifecycle hooks run before "OnPushComp" is
            //    refreshed. This means that those hooks cannot leave the component as dirty because
            //    the dirty state is reset afterwards. Though these hooks run every change detection
            //    cycle before "OnPushComp" is considered for refreshing. Hence marking as dirty from
            //    within such a hook can cause the component to checked/refreshed as intended.
            ['ngAfterViewInit', 'ngAfterViewChecked', 'ngAfterContentChecked', 'ngDoCheck'].forEach((hookName) => {
                it(`should be able to mark component as dirty from within ${hookName}`, () => {
                    let OnPushComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'on-push-comp',
                                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                                template: `<p>{{text}}</p>`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var OnPushComp = _classThis = class {
                            constructor(_cdRef) {
                                this._cdRef = _cdRef;
                                this.text = 'initial';
                            }
                            [hookName]() {
                                this._cdRef.markForCheck();
                            }
                        };
                        __setFunctionName(_classThis, "OnPushComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            OnPushComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return OnPushComp = _classThis;
                    })();
                    let TestApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: `<on-push-comp></on-push-comp>`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _onPushComp_decorators;
                        let _onPushComp_initializers = [];
                        let _onPushComp_extraInitializers = [];
                        var TestApp = _classThis = class {
                            constructor() {
                                this.onPushComp = __runInitializers(this, _onPushComp_initializers, void 0);
                                __runInitializers(this, _onPushComp_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "TestApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _onPushComp_decorators = [(0, core_1.ViewChild)(OnPushComp)];
                            __esDecorate(null, null, _onPushComp_decorators, { kind: "field", name: "onPushComp", static: false, private: false, access: { has: obj => "onPushComp" in obj, get: obj => obj.onPushComp, set: (obj, value) => { obj.onPushComp = value; } }, metadata: _metadata }, _onPushComp_initializers, _onPushComp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            TestApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return TestApp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({
                        declarations: [TestApp, OnPushComp],
                        imports: [common_1.CommonModule],
                    });
                    const fixture = testing_1.TestBed.createComponent(TestApp);
                    const pElement = fixture.nativeElement.querySelector('p');
                    detectChanges(fixture);
                    (0, matchers_1.expect)(pElement.textContent).toBe('initial');
                    // "OnPushComp" component should be re-checked since it has been left dirty
                    // in the first change detection (through the lifecycle hook). Hence, setting
                    // a programmatic value and triggering a new change detection cycle should cause
                    // the text to be updated in the view.
                    fixture.componentInstance.onPushComp.text = 'new';
                    detectChanges(fixture);
                    (0, matchers_1.expect)(pElement.textContent).toBe('new');
                });
            });
            // ngOnInit and ngAfterContentInit lifecycle hooks run once before "OnPushComp" is
            // refreshed/checked. This means they cannot mark the component as dirty because the
            // component dirty state will immediately reset after these hooks complete.
            ['ngOnInit', 'ngAfterContentInit'].forEach((hookName) => {
                it(`should not be able to mark component as dirty from within ${hookName}`, () => {
                    let OnPushComp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'on-push-comp',
                                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                                template: `<p>{{text}}</p>`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var OnPushComp = _classThis = class {
                            constructor(_cdRef) {
                                this._cdRef = _cdRef;
                                this.text = 'initial';
                            }
                            [hookName]() {
                                this._cdRef.markForCheck();
                            }
                        };
                        __setFunctionName(_classThis, "OnPushComp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            OnPushComp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return OnPushComp = _classThis;
                    })();
                    let TestApp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                template: `<on-push-comp></on-push-comp>`,
                                standalone: false,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _onPushComp_decorators;
                        let _onPushComp_initializers = [];
                        let _onPushComp_extraInitializers = [];
                        var TestApp = _classThis = class {
                            constructor() {
                                this.onPushComp = __runInitializers(this, _onPushComp_initializers, void 0);
                                __runInitializers(this, _onPushComp_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "TestApp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _onPushComp_decorators = [(0, core_1.ViewChild)(OnPushComp)];
                            __esDecorate(null, null, _onPushComp_decorators, { kind: "field", name: "onPushComp", static: false, private: false, access: { has: obj => "onPushComp" in obj, get: obj => obj.onPushComp, set: (obj, value) => { obj.onPushComp = value; } }, metadata: _metadata }, _onPushComp_initializers, _onPushComp_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            TestApp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return TestApp = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({
                        declarations: [TestApp, OnPushComp],
                        imports: [common_1.CommonModule],
                    });
                    const fixture = testing_1.TestBed.createComponent(TestApp);
                    const pElement = fixture.nativeElement.querySelector('p');
                    detectChanges(fixture);
                    (0, matchers_1.expect)(pElement.textContent).toBe('initial');
                    fixture.componentInstance.onPushComp.text = 'new';
                    // this is a noop since the "OnPushComp" component is not marked as dirty. The
                    // programmatically updated value will not be reflected in the rendered view.
                    detectChanges(fixture);
                    (0, matchers_1.expect)(pElement.textContent).toBe('initial');
                });
            });
        }
    });
    describe('ExpressionChangedAfterItHasBeenCheckedError', () => {
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '...',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.a = 'a';
                    this.b = 'b';
                    this.c = 'c';
                    this.unstableBooleanExpression = true;
                    this.unstableStringExpression = 'initial';
                    this.unstableColorExpression = 'red';
                    this.unstableStyleMapExpression = { 'color': 'red', 'margin': '10px' };
                    this.unstableClassMapExpression = { 'classA': true, 'classB': false };
                }
                ngAfterViewChecked() {
                    this.unstableBooleanExpression = false;
                    this.unstableStringExpression = 'changed';
                    this.unstableColorExpression = 'green';
                    this.unstableStyleMapExpression = { 'color': 'green', 'margin': '20px' };
                    this.unstableClassMapExpression = { 'classA': false, 'classB': true };
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        function initComponent(overrides) {
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
            testing_1.TestBed.overrideComponent(MyApp, { set: overrides });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            return fixture;
        }
        function initWithTemplate(template) {
            return initComponent({ template });
        }
        function initWithHostBindings(bindings) {
            return initComponent({ host: bindings });
        }
        it('should include field name in case of property binding', () => {
            const message = `Previous value for 'id': 'initial'. Current value: 'changed'`;
            (0, matchers_1.expect)(() => initWithTemplate('<div [id]="unstableStringExpression"></div>')).toThrowError(new RegExp(message));
        });
        it('should include field name in case of property interpolation', () => {
            const message = `Previous value for 'id': 'Expressions: a and initial!'. Current value: 'Expressions: a and changed!'`;
            (0, matchers_1.expect)(() => initWithTemplate('<div id="Expressions: {{ a }} and {{ unstableStringExpression }}!"></div>')).toThrowError(new RegExp(message));
        });
        it('should include field name in case of attribute binding', () => {
            const message = `Previous value for 'attr.id': 'initial'. Current value: 'changed'`;
            (0, matchers_1.expect)(() => initWithTemplate('<div [attr.id]="unstableStringExpression"></div>')).toThrowError(new RegExp(message));
        });
        it('should include field name in case of attribute interpolation', () => {
            const message = `Previous value for 'attr.id': 'Expressions: a and initial!'. Current value: 'Expressions: a and changed!'`;
            (0, matchers_1.expect)(() => initWithTemplate('<div attr.id="Expressions: {{ a }} and {{ unstableStringExpression }}!"></div>')).toThrowError(new RegExp(message));
        });
        it('should only display a value of an expression that was changed in text interpolation', () => {
            (0, matchers_1.expect)(() => initWithTemplate('Expressions: {{ a }} and {{ unstableStringExpression }}!')).toThrowError(/Previous value: '.*?initial'. Current value: '.*?changed'/);
        });
        it('should only display a value of an expression that was changed in text interpolation ' +
            'that follows an element with property interpolation', () => {
            (0, matchers_1.expect)(() => {
                initWithTemplate(`
             <div id="Prop interpolation: {{ aVal }}"></div>
             Text interpolation: {{ unstableStringExpression }}.
           `);
            }).toThrowError(/Previous value: '.*?initial'. Current value: '.*?changed'/);
        });
        it('should include style prop name in case of style binding', () => {
            const message = `Previous value for 'color': 'red'. Current value: 'green'`;
            (0, matchers_1.expect)(() => initWithTemplate('<div [style.color]="unstableColorExpression"></div>')).toThrowError(new RegExp(message));
        });
        it('should include class name in case of class binding', () => {
            const message = `Previous value for 'someClass': 'true'. Current value: 'false'`;
            (0, matchers_1.expect)(() => initWithTemplate('<div [class.someClass]="unstableBooleanExpression"></div>')).toThrowError(new RegExp(message));
        });
        it('should only display a value of an expression that was changed in text interpolation inside i18n block', () => {
            (0, matchers_1.expect)(() => initWithTemplate('<div i18n>Expression: {{ unstableStringExpression }}</div>')).toThrowError(/Previous value: '.*?initial'. Current value: '.*?changed'/);
        });
        it('should only display a value of an expression for interpolation inside an i18n property', () => {
            (0, matchers_1.expect)(() => initWithTemplate('<div i18n-title title="Expression: {{ unstableStringExpression }}"></div>')).toThrowError(/Previous value: '.*?initial'. Current value: '.*?changed'/);
        });
        it('should include field name in case of host property binding', () => {
            const message = `Previous value for 'id': 'initial'. Current value: 'changed'`;
            (0, matchers_1.expect)(() => initWithHostBindings({ '[id]': 'unstableStringExpression' })).toThrowError(new RegExp(message));
        });
        it('should include style prop name in case of host style bindings', () => {
            const message = `Previous value for 'color': 'red'. Current value: 'green'`;
            (0, matchers_1.expect)(() => initWithHostBindings({ '[style.color]': 'unstableColorExpression' })).toThrowError(new RegExp(message));
        });
        it('should include class name in case of host class bindings', () => {
            const message = `Previous value for 'someClass': 'true'. Current value: 'false'`;
            (0, matchers_1.expect)(() => initWithHostBindings({ '[class.someClass]': 'unstableBooleanExpression' })).toThrowError(new RegExp(message));
        });
        // Note: the tests below currently fail in Ivy, but not in VE. VE behavior is correct and Ivy's
        // logic should be fixed by the upcoming styling refactor, we keep these tests to verify that.
        //
        // it('should not throw for style maps', () => {
        //  expect(() => initWithTemplate('<div [style]="unstableStyleMapExpression"></div>'))
        //      .not.toThrowError();
        // });
        //
        // it('should not throw for class maps', () => {
        //   expect(() => initWithTemplate('<div [class]="unstableClassMapExpression"></div>'))
        //       .not.toThrowError();
        // });
        //
        // it('should not throw for style maps as host bindings', () => {
        //   expect(() => initWithHostBindings({'[style]': 'unstableStyleMapExpression'}))
        //       .not.toThrowError();
        // });
        //
        // it('should not throw for class maps as host binding', () => {
        //   expect(() => initWithHostBindings({'[class]': 'unstableClassMapExpression'}))
        //       .not.toThrowError();
        // });
    });
});
