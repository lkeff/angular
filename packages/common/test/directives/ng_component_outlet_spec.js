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
exports.TestModule3 = exports.TestModule2 = exports.TestModule = void 0;
const index_1 = require("../../index");
const ng_component_outlet_1 = require("../../src/directives/ng_component_outlet");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('insert/remove', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ imports: [TestModule] });
    });
    it('should do nothing if component is null', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template *ngComponentOutlet="currentComponent"></ng-template>`;
        testing_1.TestBed.overrideComponent(TestComponent, { set: { template: template } });
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.componentInstance.currentComponent = null;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
    }));
    it('should insert content specified by a component', (0, testing_1.waitForAsync)(() => {
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        fixture.componentInstance.currentComponent = InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('foo');
    }));
    it('should emit a ComponentRef once a component was created', (0, testing_1.waitForAsync)(() => {
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        fixture.componentInstance.cmpRef = undefined;
        fixture.componentInstance.currentComponent = InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('foo');
        (0, matchers_1.expect)(fixture.componentInstance.cmpRef).toBeInstanceOf(core_1.ComponentRef);
        (0, matchers_1.expect)(fixture.componentInstance.cmpRef.instance).toBeInstanceOf(InjectedComponent);
    }));
    it('should clear view if component becomes null', (0, testing_1.waitForAsync)(() => {
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        fixture.componentInstance.currentComponent = InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('foo');
        fixture.componentInstance.currentComponent = null;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
    }));
    it('should swap content if component changes', (0, testing_1.waitForAsync)(() => {
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        fixture.componentInstance.currentComponent = InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('foo');
        fixture.componentInstance.currentComponent = InjectedComponentAgain;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('bar');
    }));
    it('should use the injector, if one supplied', (0, testing_1.waitForAsync)(() => {
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        const uniqueValue = {};
        fixture.componentInstance.currentComponent = InjectedComponent;
        fixture.componentInstance.injector = core_1.Injector.create({
            providers: [{ provide: TEST_TOKEN, useValue: uniqueValue }],
            parent: fixture.componentRef.injector,
        });
        fixture.detectChanges();
        let cmpRef = fixture.componentInstance.cmpRef;
        (0, matchers_1.expect)(cmpRef).toBeInstanceOf(core_1.ComponentRef);
        (0, matchers_1.expect)(cmpRef.instance).toBeInstanceOf(InjectedComponent);
        (0, matchers_1.expect)(cmpRef.instance.testToken).toBe(uniqueValue);
    }));
    it('should resolve with an injector', (0, testing_1.waitForAsync)(() => {
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        // We are accessing a ViewChild (ngComponentOutlet) before change detection has run
        fixture.componentInstance.cmpRef = undefined;
        fixture.componentInstance.currentComponent = InjectedComponent;
        fixture.detectChanges();
        let cmpRef = fixture.componentInstance.cmpRef;
        (0, matchers_1.expect)(cmpRef).toBeInstanceOf(core_1.ComponentRef);
        (0, matchers_1.expect)(cmpRef.instance).toBeInstanceOf(InjectedComponent);
        (0, matchers_1.expect)(cmpRef.instance.testToken).toBeNull();
    }));
    it('should render projectable nodes, if supplied', (0, testing_1.waitForAsync)(() => {
        const template = `<ng-template>projected foo</ng-template>${TEST_CMP_TEMPLATE}`;
        testing_1.TestBed.overrideComponent(TestComponent, { set: { template: template } }).configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
        });
        testing_1.TestBed.overrideComponent(InjectedComponent, {
            set: { template: `<ng-content></ng-content>` },
        }).configureTestingModule({ schemas: [core_1.NO_ERRORS_SCHEMA] });
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        fixture.componentInstance.currentComponent = InjectedComponent;
        fixture.componentInstance.projectables = [
            fixture.componentInstance.vcRef.createEmbeddedView(fixture.componentInstance.tplRefs.first)
                .rootNodes,
        ];
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('projected foo');
    }));
    it('should resolve components from other modules, if supplied as an NgModuleFactory', (0, testing_1.waitForAsync)(() => {
        const compiler = testing_1.TestBed.inject(core_1.Compiler);
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        fixture.componentInstance.ngModuleFactory = compiler.compileModuleSync(TestModule2);
        fixture.componentInstance.currentComponent = Module2InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('baz');
    }));
    it('should resolve components from other modules, if supplied as an NgModule class reference', (0, testing_1.waitForAsync)(() => {
        let fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        fixture.componentInstance.ngModule = TestModule2;
        fixture.componentInstance.currentComponent = Module2InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('baz');
    }));
    it('should clean up moduleRef, if supplied as an NgModuleFactory', (0, testing_1.waitForAsync)(() => {
        var _a;
        const compiler = testing_1.TestBed.inject(core_1.Compiler);
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.componentInstance.ngModuleFactory = compiler.compileModuleSync(TestModule2);
        fixture.componentInstance.currentComponent = Module2InjectedComponent;
        fixture.detectChanges();
        const moduleRef = (_a = fixture.componentInstance.ngComponentOutlet) === null || _a === void 0 ? void 0 : _a['_moduleRef'];
        spyOn(moduleRef, 'destroy').and.callThrough();
        (0, matchers_1.expect)(moduleRef.destroy).not.toHaveBeenCalled();
        fixture.destroy();
        (0, matchers_1.expect)(moduleRef.destroy).toHaveBeenCalled();
    }));
    it('should clean up moduleRef, if supplied as an NgModule class reference', (0, testing_1.waitForAsync)(() => {
        var _a;
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.componentInstance.ngModule = TestModule2;
        fixture.componentInstance.currentComponent = Module2InjectedComponent;
        fixture.detectChanges();
        const moduleRef = (_a = fixture.componentInstance.ngComponentOutlet) === null || _a === void 0 ? void 0 : _a['_moduleRef'];
        spyOn(moduleRef, 'destroy').and.callThrough();
        (0, matchers_1.expect)(moduleRef.destroy).not.toHaveBeenCalled();
        fixture.destroy();
        (0, matchers_1.expect)(moduleRef.destroy).toHaveBeenCalled();
    }));
    it("should not re-create moduleRef when it didn't actually change", (0, testing_1.waitForAsync)(() => {
        var _a, _b;
        const compiler = testing_1.TestBed.inject(core_1.Compiler);
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.componentInstance.ngModuleFactory = compiler.compileModuleSync(TestModule2);
        fixture.componentInstance.currentComponent = Module2InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('baz');
        const moduleRef = (_a = fixture.componentInstance.ngComponentOutlet) === null || _a === void 0 ? void 0 : _a['_moduleRef'];
        fixture.componentInstance.currentComponent = Module2InjectedComponent2;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('baz2');
        (0, matchers_1.expect)(moduleRef).toBe((_b = fixture.componentInstance.ngComponentOutlet) === null || _b === void 0 ? void 0 : _b['_moduleRef']);
    }));
    it('should re-create moduleRef when changed (NgModuleFactory)', (0, testing_1.waitForAsync)(() => {
        const compiler = testing_1.TestBed.inject(core_1.Compiler);
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.componentInstance.ngModuleFactory = compiler.compileModuleSync(TestModule2);
        fixture.componentInstance.currentComponent = Module2InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('baz');
        fixture.componentInstance.ngModuleFactory = compiler.compileModuleSync(TestModule3);
        fixture.componentInstance.currentComponent = Module3InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('bat');
    }));
    it('should re-create moduleRef when changed (NgModule class reference)', (0, testing_1.waitForAsync)(() => {
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.componentInstance.ngModule = TestModule2;
        fixture.componentInstance.currentComponent = Module2InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('baz');
        fixture.componentInstance.ngModule = TestModule3;
        fixture.componentInstance.currentComponent = Module3InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('bat');
    }));
    it('should override providers from parent component using custom injector', (0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.overrideComponent(InjectedComponent, { set: { template: 'Value: {{testToken}}' } });
        testing_1.TestBed.overrideComponent(TestComponent, {
            set: { providers: [{ provide: TEST_TOKEN, useValue: 'parent' }] },
        });
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.componentInstance.currentComponent = InjectedComponent;
        fixture.componentInstance.injector = core_1.Injector.create({
            providers: [{ provide: TEST_TOKEN, useValue: 'child' }],
            parent: fixture.componentInstance.vcRef.injector,
        });
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('Value: child');
    }));
    it('should be available as a standalone directive', () => {
        let HelloWorldComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'Hello World',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var HelloWorldComp = _classThis = class {
            };
            __setFunctionName(_classThis, "HelloWorldComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                HelloWorldComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return HelloWorldComp = _classThis;
        })();
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [ng_component_outlet_1.NgComponentOutlet],
                    template: ` <ng-container *ngComponentOutlet="component"></ng-container> `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.component = HelloWorldComp;
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
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('Hello World');
    });
    it('should be able to get the current component instance', () => {
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const outlet = fixture.componentInstance.ngComponentOutlet;
        (0, matchers_1.expect)(outlet.componentInstance).toBeNull();
        fixture.componentInstance.currentComponent = InjectedComponent;
        fixture.detectChanges();
        (0, matchers_1.expect)(outlet.componentInstance).toBeInstanceOf(InjectedComponent);
    });
});
describe('inputs', () => {
    it('should be binding the component input', () => {
        const fixture = testing_1.TestBed.createComponent(TestInputsComponent);
        fixture.componentInstance.currentComponent = ComponentWithInputs;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: , bar: , baz: Baz');
        fixture.componentInstance.inputs = {};
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: , bar: , baz: Baz');
        fixture.componentInstance.inputs = { foo: 'Foo', bar: 'Bar' };
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: Foo, bar: Bar, baz: Baz');
        fixture.componentInstance.inputs = { foo: 'Foo' };
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: Foo, bar: , baz: Baz');
        fixture.componentInstance.inputs = { foo: 'Foo', baz: null };
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: Foo, bar: , baz: ');
        fixture.componentInstance.inputs = undefined;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: , bar: , baz: ');
    });
    it('should be binding the component input (with mutable inputs)', () => {
        const fixture = testing_1.TestBed.createComponent(TestInputsComponent);
        fixture.componentInstance.currentComponent = ComponentWithInputs;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: , bar: , baz: Baz');
        fixture.componentInstance.inputs = { foo: 'Hello', bar: 'World' };
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: Hello, bar: World, baz: Baz');
        fixture.componentInstance.inputs['bar'] = 'Angular';
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: Hello, bar: Angular, baz: Baz');
        delete fixture.componentInstance.inputs['foo'];
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: , bar: Angular, baz: Baz');
    });
    it('should be binding the component input (with component type change)', () => {
        const fixture = testing_1.TestBed.createComponent(TestInputsComponent);
        fixture.componentInstance.currentComponent = ComponentWithInputs;
        fixture.componentInstance.inputs = { foo: 'Foo', bar: 'Bar' };
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('foo: Foo, bar: Bar, baz: Baz');
        fixture.componentInstance.currentComponent = AnotherComponentWithInputs;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('[ANOTHER] foo: Foo, bar: Bar, baz: Baz');
    });
});
const TEST_TOKEN = new core_1.InjectionToken('TestToken');
let InjectedComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'injected-component',
            template: 'foo',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InjectedComponent = _classThis = class {
        constructor(testToken) {
            this.testToken = testToken;
        }
    };
    __setFunctionName(_classThis, "InjectedComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InjectedComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InjectedComponent = _classThis;
})();
let InjectedComponentAgain = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'injected-component-again',
            template: 'bar',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InjectedComponentAgain = _classThis = class {
    };
    __setFunctionName(_classThis, "InjectedComponentAgain");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InjectedComponentAgain = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InjectedComponentAgain = _classThis;
})();
const TEST_CMP_TEMPLATE = `<ng-template *ngComponentOutlet="
      currentComponent;
      injector: injector;
      inputs: inputs;
      content: projectables;
      ngModule: ngModule;
      ngModuleFactory: ngModuleFactory;
    "></ng-template>`;
let TestComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmp',
            template: TEST_CMP_TEMPLATE,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _tplRefs_decorators;
    let _tplRefs_initializers = [];
    let _tplRefs_extraInitializers = [];
    let _ngComponentOutlet_decorators;
    let _ngComponentOutlet_initializers = [];
    let _ngComponentOutlet_extraInitializers = [];
    var TestComponent = _classThis = class {
        get cmpRef() {
            var _a;
            return (_a = this.ngComponentOutlet) === null || _a === void 0 ? void 0 : _a['_componentRef'];
        }
        set cmpRef(value) {
            if (this.ngComponentOutlet) {
                this.ngComponentOutlet['_componentRef'] = value;
            }
        }
        constructor(vcRef) {
            this.vcRef = vcRef;
            this.currentComponent = null;
            this.tplRefs = __runInitializers(this, _tplRefs_initializers, new core_1.QueryList());
            this.ngComponentOutlet = (__runInitializers(this, _tplRefs_extraInitializers), __runInitializers(this, _ngComponentOutlet_initializers, void 0));
            __runInitializers(this, _ngComponentOutlet_extraInitializers);
            this.vcRef = vcRef;
        }
    };
    __setFunctionName(_classThis, "TestComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tplRefs_decorators = [(0, core_1.ViewChildren)(core_1.TemplateRef)];
        _ngComponentOutlet_decorators = [(0, core_1.ViewChild)(ng_component_outlet_1.NgComponentOutlet, { static: true })];
        __esDecorate(null, null, _tplRefs_decorators, { kind: "field", name: "tplRefs", static: false, private: false, access: { has: obj => "tplRefs" in obj, get: obj => obj.tplRefs, set: (obj, value) => { obj.tplRefs = value; } }, metadata: _metadata }, _tplRefs_initializers, _tplRefs_extraInitializers);
        __esDecorate(null, null, _ngComponentOutlet_decorators, { kind: "field", name: "ngComponentOutlet", static: false, private: false, access: { has: obj => "ngComponentOutlet" in obj, get: obj => obj.ngComponentOutlet, set: (obj, value) => { obj.ngComponentOutlet = value; } }, metadata: _metadata }, _ngComponentOutlet_initializers, _ngComponentOutlet_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestComponent = _classThis;
})();
let TestModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [index_1.CommonModule],
            declarations: [TestComponent, InjectedComponent, InjectedComponentAgain],
            exports: [TestComponent, InjectedComponent, InjectedComponentAgain],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestModule = _classThis = class {
    };
    __setFunctionName(_classThis, "TestModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestModule = _classThis;
})();
exports.TestModule = TestModule;
let Module2InjectedComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'module-2-injected-component',
            template: 'baz',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Module2InjectedComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "Module2InjectedComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Module2InjectedComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Module2InjectedComponent = _classThis;
})();
let Module2InjectedComponent2 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'module-2-injected-component-2',
            template: 'baz2',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Module2InjectedComponent2 = _classThis = class {
    };
    __setFunctionName(_classThis, "Module2InjectedComponent2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Module2InjectedComponent2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Module2InjectedComponent2 = _classThis;
})();
let TestModule2 = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [index_1.CommonModule],
            declarations: [Module2InjectedComponent, Module2InjectedComponent2],
            exports: [Module2InjectedComponent, Module2InjectedComponent2],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestModule2 = _classThis = class {
    };
    __setFunctionName(_classThis, "TestModule2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestModule2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestModule2 = _classThis;
})();
exports.TestModule2 = TestModule2;
let Module3InjectedComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'module-3-injected-component',
            template: 'bat',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Module3InjectedComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "Module3InjectedComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Module3InjectedComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Module3InjectedComponent = _classThis;
})();
let TestModule3 = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [index_1.CommonModule],
            declarations: [Module3InjectedComponent],
            exports: [Module3InjectedComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestModule3 = _classThis = class {
    };
    __setFunctionName(_classThis, "TestModule3");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestModule3 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestModule3 = _classThis;
})();
exports.TestModule3 = TestModule3;
let ComponentWithInputs = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp-with-inputs',
            template: `foo: {{ foo }}, bar: {{ bar }}, baz: {{ baz }}`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _foo_decorators;
    let _foo_initializers = [];
    let _foo_extraInitializers = [];
    let _bar_decorators;
    let _bar_initializers = [];
    let _bar_extraInitializers = [];
    let _baz_decorators;
    let _baz_initializers = [];
    let _baz_extraInitializers = [];
    var ComponentWithInputs = _classThis = class {
        constructor() {
            this.foo = __runInitializers(this, _foo_initializers, void 0);
            this.bar = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _bar_initializers, void 0));
            this.baz = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _baz_initializers, 'Baz'));
            __runInitializers(this, _baz_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ComponentWithInputs");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _foo_decorators = [(0, core_1.Input)()];
        _bar_decorators = [(0, core_1.Input)()];
        _baz_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
        __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentWithInputs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentWithInputs = _classThis;
})();
let AnotherComponentWithInputs = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'another-cmp-with-inputs',
            template: `[ANOTHER] foo: {{ foo }}, bar: {{ bar }}, baz: {{ baz }}`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _foo_decorators;
    let _foo_initializers = [];
    let _foo_extraInitializers = [];
    let _bar_decorators;
    let _bar_initializers = [];
    let _bar_extraInitializers = [];
    let _baz_decorators;
    let _baz_initializers = [];
    let _baz_extraInitializers = [];
    var AnotherComponentWithInputs = _classThis = class {
        constructor() {
            this.foo = __runInitializers(this, _foo_initializers, void 0);
            this.bar = (__runInitializers(this, _foo_extraInitializers), __runInitializers(this, _bar_initializers, void 0));
            this.baz = (__runInitializers(this, _bar_extraInitializers), __runInitializers(this, _baz_initializers, 'Baz'));
            __runInitializers(this, _baz_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "AnotherComponentWithInputs");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _foo_decorators = [(0, core_1.Input)()];
        _bar_decorators = [(0, core_1.Input)()];
        _baz_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _foo_decorators, { kind: "field", name: "foo", static: false, private: false, access: { has: obj => "foo" in obj, get: obj => obj.foo, set: (obj, value) => { obj.foo = value; } }, metadata: _metadata }, _foo_initializers, _foo_extraInitializers);
        __esDecorate(null, null, _bar_decorators, { kind: "field", name: "bar", static: false, private: false, access: { has: obj => "bar" in obj, get: obj => obj.bar, set: (obj, value) => { obj.bar = value; } }, metadata: _metadata }, _bar_initializers, _bar_extraInitializers);
        __esDecorate(null, null, _baz_decorators, { kind: "field", name: "baz", static: false, private: false, access: { has: obj => "baz" in obj, get: obj => obj.baz, set: (obj, value) => { obj.baz = value; } }, metadata: _metadata }, _baz_initializers, _baz_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnotherComponentWithInputs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnotherComponentWithInputs = _classThis;
})();
let TestInputsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmp',
            imports: [ng_component_outlet_1.NgComponentOutlet],
            template: `<ng-template *ngComponentOutlet="currentComponent; inputs: inputs"></ng-template>`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestInputsComponent = _classThis = class {
        constructor() {
            this.currentComponent = null;
        }
    };
    __setFunctionName(_classThis, "TestInputsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestInputsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestInputsComponent = _classThis;
})();
