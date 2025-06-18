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
const component_ref_1 = require("../../src/render3/component_ref");
const testing_1 = require("../../testing");
const core_1 = require("../../src/core");
const api_1 = require("../../src/render/api");
const sanitizer_1 = require("../../src/sanitization/sanitizer");
const mock_renderer_factory_1 = require("./instructions/mock_renderer_factory");
const THROWING_RENDERER_FACTOR2_PROVIDER = {
    provide: api_1.RendererFactory2,
    useValue: {
        createRenderer: () => {
            throw new Error('Incorrect injector for Renderer2');
        },
    },
};
describe('ComponentFactory', () => {
    const cfr = new component_ref_1.ComponentFactoryResolver();
    describe('constructor()', () => {
        it('should correctly populate default properties', () => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test[foo], bar',
                        template: '',
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
            const cf = cfr.resolveComponentFactory(TestComponent);
            expect(cf.selector).toBe('test[foo],bar');
            expect(cf.componentType).toBe(TestComponent);
            expect(cf.ngContentSelectors).toEqual([]);
            expect(cf.inputs).toEqual([]);
            expect(cf.outputs).toEqual([]);
        });
        it('should correctly populate defined properties', () => {
            function transformFn() { }
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test[foo], bar',
                        template: `
          <ng-content></ng-content>
          <ng-content select="a"></ng-content>
          <ng-content select="b"></ng-content>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _in1_decorators;
                let _in1_initializers = [];
                let _in1_extraInitializers = [];
                let _in2_decorators;
                let _in2_initializers = [];
                let _in2_extraInitializers = [];
                let _in3_decorators;
                let _in3_initializers = [];
                let _in3_extraInitializers = [];
                let _out1_decorators;
                let _out1_initializers = [];
                let _out1_extraInitializers = [];
                let _out2_decorators;
                let _out2_initializers = [];
                let _out2_extraInitializers = [];
                var TestComponent = _classThis = class {
                    constructor() {
                        this.in1 = __runInitializers(this, _in1_initializers, void 0);
                        this.in2 = (__runInitializers(this, _in1_extraInitializers), __runInitializers(this, _in2_initializers, void 0));
                        this.in3 = (__runInitializers(this, _in2_extraInitializers), __runInitializers(this, _in3_initializers, void 0));
                        this.out1 = (__runInitializers(this, _in3_extraInitializers), __runInitializers(this, _out1_initializers, void 0));
                        this.out2 = (__runInitializers(this, _out1_extraInitializers), __runInitializers(this, _out2_initializers, void 0));
                        __runInitializers(this, _out2_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "TestComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _in1_decorators = [(0, core_1.Input)()];
                    _in2_decorators = [(0, core_1.Input)('input-attr-2')];
                    _in3_decorators = [(0, core_1.Input)({ alias: 'input-attr-3', transform: transformFn })];
                    _out1_decorators = [(0, core_1.Output)()];
                    _out2_decorators = [(0, core_1.Output)('output-attr-2')];
                    __esDecorate(null, null, _in1_decorators, { kind: "field", name: "in1", static: false, private: false, access: { has: obj => "in1" in obj, get: obj => obj.in1, set: (obj, value) => { obj.in1 = value; } }, metadata: _metadata }, _in1_initializers, _in1_extraInitializers);
                    __esDecorate(null, null, _in2_decorators, { kind: "field", name: "in2", static: false, private: false, access: { has: obj => "in2" in obj, get: obj => obj.in2, set: (obj, value) => { obj.in2 = value; } }, metadata: _metadata }, _in2_initializers, _in2_extraInitializers);
                    __esDecorate(null, null, _in3_decorators, { kind: "field", name: "in3", static: false, private: false, access: { has: obj => "in3" in obj, get: obj => obj.in3, set: (obj, value) => { obj.in3 = value; } }, metadata: _metadata }, _in3_initializers, _in3_extraInitializers);
                    __esDecorate(null, null, _out1_decorators, { kind: "field", name: "out1", static: false, private: false, access: { has: obj => "out1" in obj, get: obj => obj.out1, set: (obj, value) => { obj.out1 = value; } }, metadata: _metadata }, _out1_initializers, _out1_extraInitializers);
                    __esDecorate(null, null, _out2_decorators, { kind: "field", name: "out2", static: false, private: false, access: { has: obj => "out2" in obj, get: obj => obj.out2, set: (obj, value) => { obj.out2 = value; } }, metadata: _metadata }, _out2_initializers, _out2_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComponent = _classThis;
            })();
            const cf = cfr.resolveComponentFactory(TestComponent);
            expect(cf.componentType).toBe(TestComponent);
            expect(cf.ngContentSelectors).toEqual(['*', 'a', 'b']);
            expect(cf.selector).toBe('test[foo],bar');
            expect(cf.inputs).toEqual([
                { propName: 'in1', templateName: 'in1', isSignal: false },
                { propName: 'in2', templateName: 'input-attr-2', isSignal: false },
                { propName: 'in3', templateName: 'input-attr-3', transform: transformFn, isSignal: false },
            ]);
            expect(cf.outputs).toEqual([
                { propName: 'out1', templateName: 'out1' },
                { propName: 'out2', templateName: 'output-attr-2' },
            ]);
        });
    });
    describe('create()', () => {
        let rendererFactorySpy = new mock_renderer_factory_1.MockRendererFactory();
        let cf;
        beforeEach(() => {
            let TestComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: '...',
                        host: {
                            'class': 'HOST_COMPONENT',
                        },
                        encapsulation: core_1.ViewEncapsulation.None,
                        standalone: false,
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
            cf = cfr.resolveComponentFactory(TestComponent);
        });
        describe('(when `ngModuleRef` is not provided)', () => {
            it('should retrieve `RendererFactory2` from the specified injector', () => {
                const injector = core_1.Injector.create({
                    providers: [{ provide: api_1.RendererFactory2, useValue: rendererFactorySpy }],
                });
                cf.create(injector);
                expect(rendererFactorySpy.wasCalled).toBeTrue();
            });
            it('should retrieve `Sanitizer` from the specified injector', () => {
                const sanitizerFactorySpy = jasmine.createSpy('sanitizerFactory').and.returnValue({});
                const injector = core_1.Injector.create({
                    providers: [
                        { provide: api_1.RendererFactory2, useValue: rendererFactorySpy },
                        { provide: sanitizer_1.Sanitizer, useFactory: sanitizerFactorySpy, deps: [] },
                    ],
                });
                cf.create(injector);
                expect(sanitizerFactorySpy).toHaveBeenCalled();
            });
        });
        describe('(when `ngModuleRef` is provided)', () => {
            it('should retrieve `RendererFactory2` from the specified injector first', () => {
                const injector = core_1.Injector.create({
                    providers: [{ provide: api_1.RendererFactory2, useValue: rendererFactorySpy }],
                });
                const mInjector = core_1.Injector.create({ providers: [THROWING_RENDERER_FACTOR2_PROVIDER] });
                cf.create(injector, undefined, undefined, { injector: mInjector });
                expect(rendererFactorySpy.wasCalled).toBeTrue();
            });
            it('should retrieve `RendererFactory2` from the `ngModuleRef` if not provided by the injector', () => {
                const injector = core_1.Injector.create({ providers: [] });
                const mInjector = core_1.Injector.create({
                    providers: [{ provide: api_1.RendererFactory2, useValue: rendererFactorySpy }],
                });
                cf.create(injector, undefined, undefined, { injector: mInjector });
                expect(rendererFactorySpy.wasCalled).toBeTrue();
            });
            it('should retrieve `Sanitizer` from the specified injector first', () => {
                const iSanitizerFactorySpy = jasmine
                    .createSpy('Injector#sanitizerFactory')
                    .and.returnValue({});
                const injector = core_1.Injector.create({
                    providers: [{ provide: sanitizer_1.Sanitizer, useFactory: iSanitizerFactorySpy, deps: [] }],
                });
                const mSanitizerFactorySpy = jasmine
                    .createSpy('NgModuleRef#sanitizerFactory')
                    .and.returnValue({});
                const mInjector = core_1.Injector.create({
                    providers: [
                        { provide: api_1.RendererFactory2, useValue: rendererFactorySpy },
                        { provide: sanitizer_1.Sanitizer, useFactory: mSanitizerFactorySpy, deps: [] },
                    ],
                });
                cf.create(injector, undefined, undefined, { injector: mInjector });
                expect(iSanitizerFactorySpy).toHaveBeenCalled();
                expect(mSanitizerFactorySpy).not.toHaveBeenCalled();
            });
            it('should retrieve `Sanitizer` from the `ngModuleRef` if not provided by the injector', () => {
                const injector = core_1.Injector.create({ providers: [] });
                const mSanitizerFactorySpy = jasmine
                    .createSpy('NgModuleRef#sanitizerFactory')
                    .and.returnValue({});
                const mInjector = core_1.Injector.create({
                    providers: [
                        { provide: api_1.RendererFactory2, useValue: rendererFactorySpy },
                        { provide: sanitizer_1.Sanitizer, useFactory: mSanitizerFactorySpy, deps: [] },
                    ],
                });
                cf.create(injector, undefined, undefined, { injector: mInjector });
                expect(mSanitizerFactorySpy).toHaveBeenCalled();
            });
        });
        describe('(when the factory is bound to a `ngModuleRef`)', () => {
            it('should retrieve `RendererFactory2` from the specified injector first', () => {
                const injector = core_1.Injector.create({
                    providers: [{ provide: api_1.RendererFactory2, useValue: rendererFactorySpy }],
                });
                cf.ngModule = {
                    injector: core_1.Injector.create({ providers: [THROWING_RENDERER_FACTOR2_PROVIDER] }),
                };
                cf.create(injector);
                expect(rendererFactorySpy.wasCalled).toBeTrue();
            });
            it('should retrieve `RendererFactory2` from the `ngModuleRef` if not provided by the injector', () => {
                const injector = core_1.Injector.create({ providers: [] });
                cf.ngModule = {
                    injector: core_1.Injector.create({
                        providers: [{ provide: api_1.RendererFactory2, useValue: rendererFactorySpy }],
                    }),
                };
                cf.create(injector);
                expect(rendererFactorySpy.wasCalled).toBeTrue();
            });
            it('should retrieve `Sanitizer` from the specified injector first', () => {
                const iSanitizerFactorySpy = jasmine
                    .createSpy('Injector#sanitizerFactory')
                    .and.returnValue({});
                const injector = core_1.Injector.create({
                    providers: [
                        { provide: api_1.RendererFactory2, useValue: rendererFactorySpy },
                        { provide: sanitizer_1.Sanitizer, useFactory: iSanitizerFactorySpy, deps: [] },
                    ],
                });
                const mSanitizerFactorySpy = jasmine
                    .createSpy('NgModuleRef#sanitizerFactory')
                    .and.returnValue({});
                cf.ngModule = {
                    injector: core_1.Injector.create({
                        providers: [{ provide: sanitizer_1.Sanitizer, useFactory: mSanitizerFactorySpy, deps: [] }],
                    }),
                };
                cf.create(injector);
                expect(iSanitizerFactorySpy).toHaveBeenCalled();
                expect(mSanitizerFactorySpy).not.toHaveBeenCalled();
            });
            it('should retrieve `Sanitizer` from the `ngModuleRef` if not provided by the injector', () => {
                const injector = core_1.Injector.create({ providers: [] });
                const mSanitizerFactorySpy = jasmine
                    .createSpy('NgModuleRef#sanitizerFactory')
                    .and.returnValue({});
                cf.ngModule = {
                    injector: core_1.Injector.create({
                        providers: [
                            { provide: api_1.RendererFactory2, useValue: rendererFactorySpy },
                            { provide: sanitizer_1.Sanitizer, useFactory: mSanitizerFactorySpy, deps: [] },
                        ],
                    }),
                };
                cf.create(injector);
                expect(mSanitizerFactorySpy).toHaveBeenCalled();
            });
        });
        it('should ensure that rendererFactory is called after initial styling is set', () => {
            class TestMockRendererFactory extends mock_renderer_factory_1.MockRendererFactory {
                createRenderer(hostElement, rendererType) {
                    if (hostElement) {
                        hostElement.classList.add('HOST_RENDERER');
                    }
                    return super.createRenderer(hostElement, rendererType);
                }
            }
            const injector = core_1.Injector.create({
                providers: [
                    { provide: api_1.RendererFactory2, useFactory: () => new TestMockRendererFactory(), deps: [] },
                ],
            });
            const hostNode = document.createElement('div');
            const componentRef = cf.create(injector, undefined, hostNode);
            expect(hostNode.className).toEqual('HOST_COMPONENT HOST_RENDERER');
        });
    });
    describe('setInput', () => {
        it('should allow setting inputs on the ComponentRef', () => {
            const inputChangesLog = [];
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: `{{input}}`, standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _input_decorators;
                let _input_initializers = [];
                let _input_extraInitializers = [];
                var DynamicCmp = _classThis = class {
                    ngOnChanges(changes) {
                        const inChange = changes['input'];
                        inputChangesLog.push(`${inChange.previousValue}:${inChange.currentValue}:${inChange.firstChange}`);
                    }
                    constructor() {
                        this.input = __runInitializers(this, _input_initializers, void 0);
                        __runInitializers(this, _input_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DynamicCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _input_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(DynamicCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('');
            expect(inputChangesLog).toEqual([]);
            fixture.componentRef.setInput('input', 'first');
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('first');
            expect(inputChangesLog).toEqual(['undefined:first:true']);
            fixture.componentRef.setInput('input', 'second');
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('second');
            expect(inputChangesLog).toEqual(['undefined:first:true', 'first:second:false']);
        });
        it('should allow setting mapped inputs on the ComponentRef', () => {
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: `{{input}}`, standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _input_decorators;
                let _input_initializers = [];
                let _input_extraInitializers = [];
                var DynamicCmp = _classThis = class {
                    constructor() {
                        this.input = __runInitializers(this, _input_initializers, void 0);
                        __runInitializers(this, _input_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DynamicCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _input_decorators = [(0, core_1.Input)('publicName')];
                    __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(DynamicCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('');
            fixture.componentRef.setInput('publicName', 'in value');
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('in value');
            fixture.componentRef.setInput('input', 'should not change');
            fixture.detectChanges();
            // The value doesn't change, since `in` is an internal name of the input.
            expect(fixture.nativeElement.textContent).toBe('in value');
        });
        it('should log or throw error on unknown inputs', () => {
            let NoInputsCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: ``, standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NoInputsCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "NoInputsCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NoInputsCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NoInputsCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(NoInputsCmp);
            fixture.detectChanges();
            spyOn(console, 'error');
            fixture.componentRef.setInput('doesNotExist', '');
            const msgL1 = `NG0303: Can't set value of the 'doesNotExist' input on the 'NoInputsCmp' component. `;
            const msgL2 = `Make sure that the 'doesNotExist' property is annotated with @Input() or a mapped @Input('doesNotExist') exists.`;
            expect(console.error).toHaveBeenCalledWith(msgL1 + msgL2);
        });
        it('should mark components for check when setting an input on a ComponentRef', () => {
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `{{input}}`,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _input_decorators;
                let _input_initializers = [];
                let _input_extraInitializers = [];
                var DynamicCmp = _classThis = class {
                    constructor() {
                        this.input = __runInitializers(this, _input_initializers, void 0);
                        __runInitializers(this, _input_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DynamicCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _input_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(DynamicCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('');
            fixture.componentRef.setInput('input', 'pushed');
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('pushed');
        });
        it('should not set input if value is the same as the previous', () => {
            let log = [];
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `{{input}}`,
                        standalone: true,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_input_decorators;
                var DynamicCmp = _classThis = class {
                    set input(v) {
                        log.push(v);
                    }
                    constructor() {
                        __runInitializers(this, _instanceExtraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DynamicCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_input_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_input_decorators, { kind: "setter", name: "input", static: false, private: false, access: { has: obj => "input" in obj, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(DynamicCmp);
            fixture.componentRef.setInput('input', '1');
            fixture.detectChanges();
            fixture.componentRef.setInput('input', '1');
            fixture.detectChanges();
            fixture.componentRef.setInput('input', '2');
            fixture.detectChanges();
            expect(log).toEqual(['1', '2']);
        });
        it('marks parents dirty so component is not "shielded" by a non-dirty OnPush parent', () => {
            let DynamicCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `{{input}}`,
                        selector: 'dynamic',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _input_decorators;
                let _input_initializers = [];
                let _input_extraInitializers = [];
                var DynamicCmp = _classThis = class {
                    constructor() {
                        this.input = __runInitializers(this, _input_initializers, void 0);
                        __runInitializers(this, _input_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DynamicCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _input_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _input_decorators, { kind: "field", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicCmp = _classThis;
            })();
            let Wrapper = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template #template></ng-template>',
                        imports: [DynamicCmp],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                var Wrapper = _classThis = class {
                    constructor() {
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        this.componentRef = __runInitializers(this, _template_extraInitializers);
                    }
                    create() {
                        this.componentRef = this.template.createComponent(DynamicCmp);
                    }
                    setInput(value) {
                        this.componentRef.setInput('input', value);
                    }
                };
                __setFunctionName(_classThis, "Wrapper");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.ViewChild)('template', { read: core_1.ViewContainerRef })];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Wrapper = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Wrapper = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Wrapper);
            fixture.detectChanges();
            fixture.componentInstance.create();
            fixture.componentInstance.setInput('1');
            fixture.detectChanges();
            expect(fixture.nativeElement.innerText).toBe('1');
            fixture.componentInstance.setInput('2');
            fixture.detectChanges();
            expect(fixture.nativeElement.innerText).toBe('2');
        });
    });
});
