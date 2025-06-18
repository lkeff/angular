"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const compiler_1 = require("@angular/compiler");
const core_1 = require("../src/core");
const error_handler_1 = require("../src/error_handler");
const render3_1 = require("../src/render3");
const platform_browser_1 = require("@angular/platform-browser");
const dom_renderer_1 = require("@angular/platform-browser/src/dom/dom_renderer");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const application_ref_1 = require("../src/application/application_ref");
const ng_zone_1 = require("../src/zone/ng_zone");
const testing_1 = require("../testing");
const operators_1 = require("rxjs/operators");
const application_ngmodule_factory_compiler_1 = require("../src/application/application_ngmodule_factory_compiler");
let serverPlatformModule = null;
if (isNode) {
    // Only when we are in Node, we load the platform-server module. It will
    // be required later in specs for declaring the platform module.
    serverPlatformModule = Promise.resolve().then(() => __importStar(require('@angular/platform-server'))).then((m) => m.ServerModule);
}
let SomeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'bootstrap-app',
            template: 'hello',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "SomeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeComponent = _classThis;
})();
describe('bootstrap', () => {
    let mockConsole;
    beforeEach(() => {
        mockConsole = new MockConsole();
    });
    function createRootEl(selector = 'bootstrap-app') {
        const doc = testing_1.TestBed.inject(common_1.DOCUMENT);
        const rootEl = ((0, browser_util_1.getContent)((0, browser_util_1.createTemplate)(`<${selector}></${selector}>`)).firstChild);
        const oldRoots = doc.querySelectorAll(selector);
        for (let i = 0; i < oldRoots.length; i++) {
            (0, common_1.ɵgetDOM)().remove(oldRoots[i]);
        }
        doc.body.appendChild(rootEl);
    }
    function createModule(providersOrOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {};
            if (Array.isArray(providersOrOptions)) {
                options = { providers: providersOrOptions };
            }
            else {
                options = providersOrOptions || {};
            }
            const errorHandler = new error_handler_1.ErrorHandler();
            errorHandler._console = mockConsole;
            const platformModule = (0, common_1.ɵgetDOM)().supportsDOMEvents ? platform_browser_1.BrowserModule : yield serverPlatformModule;
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [{ provide: error_handler_1.ErrorHandler, useValue: errorHandler }, options.providers || []],
                        imports: [platformModule],
                        declarations: [options.component || SomeComponent],
                        bootstrap: options.bootstrap || [],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "MyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyModule = _classThis;
            })();
            if (options.ngDoBootstrap !== false) {
                MyModule.prototype.ngDoBootstrap = options.ngDoBootstrap || (() => { });
            }
            return MyModule;
        });
    }
    it('should bootstrap a component from a child module', (0, testing_1.waitForAsync)((0, testing_1.inject)([application_ref_1.ApplicationRef, core_1.Compiler], (app, compiler) => {
        let SomeComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'bootstrap-app',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SomeComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeComponent = _classThis;
        })();
        const helloToken = new core_1.InjectionToken('hello');
        let SomeModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: helloToken, useValue: 'component' }],
                    declarations: [SomeComponent],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeModule = _classThis = class {
            };
            __setFunctionName(_classThis, "SomeModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeModule = _classThis;
        })();
        createRootEl();
        const modFactory = compiler.compileModuleSync(SomeModule);
        const module = modFactory.create(testing_1.TestBed.inject(core_1.Injector));
        const cmpFactory = module.componentFactoryResolver.resolveComponentFactory(SomeComponent);
        const component = app.bootstrap(cmpFactory);
        // The component should see the child module providers
        (0, matchers_1.expect)(component.injector.get(helloToken)).toEqual('component');
    })));
    it('should bootstrap a component with a custom selector', (0, testing_1.waitForAsync)((0, testing_1.inject)([application_ref_1.ApplicationRef, core_1.Compiler], (app, compiler) => {
        let SomeComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'bootstrap-app',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SomeComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeComponent = _classThis;
        })();
        const helloToken = new core_1.InjectionToken('hello');
        let SomeModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: helloToken, useValue: 'component' }],
                    declarations: [SomeComponent],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeModule = _classThis = class {
            };
            __setFunctionName(_classThis, "SomeModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeModule = _classThis;
        })();
        createRootEl('custom-selector');
        const modFactory = compiler.compileModuleSync(SomeModule);
        const module = modFactory.create(testing_1.TestBed.inject(core_1.Injector));
        const cmpFactory = module.componentFactoryResolver.resolveComponentFactory(SomeComponent);
        const component = app.bootstrap(cmpFactory, 'custom-selector');
        // The component should see the child module providers
        (0, matchers_1.expect)(component.injector.get(helloToken)).toEqual('component');
    })));
    describe('ApplicationRef', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({ imports: [yield createModule()] });
        }));
        it('should throw when reentering tick', () => {
            let ReenteringComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '{{reenter()}}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ReenteringComponent = _classThis = class {
                    constructor(appRef) {
                        this.appRef = appRef;
                        this.reenterCount = 1;
                    }
                    reenter() {
                        if (this.reenterCount--) {
                            try {
                                this.appRef.tick();
                            }
                            catch (e) {
                                this.reenterErr = e;
                            }
                        }
                    }
                };
                __setFunctionName(_classThis, "ReenteringComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ReenteringComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ReenteringComponent = _classThis;
            })();
            const fixture = testing_1.TestBed.configureTestingModule({
                declarations: [ReenteringComponent],
            }).createComponent(ReenteringComponent);
            const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
            appRef.attachView(fixture.componentRef.hostView);
            appRef.tick();
            (0, matchers_1.expect)(fixture.componentInstance.reenterErr.message).toBe('NG0101: ApplicationRef.tick is called recursively');
        });
        describe('APP_BOOTSTRAP_LISTENER', () => {
            let capturedCompRefs;
            beforeEach(() => {
                capturedCompRefs = [];
                testing_1.TestBed.configureTestingModule({
                    providers: [
                        {
                            provide: core_1.APP_BOOTSTRAP_LISTENER,
                            multi: true,
                            useValue: (compRef) => {
                                capturedCompRefs.push(compRef);
                            },
                        },
                    ],
                });
            });
            it('should be called when a component is bootstrapped', (0, testing_1.inject)([application_ref_1.ApplicationRef], (ref) => {
                createRootEl();
                const compRef = ref.bootstrap(SomeComponent);
                (0, matchers_1.expect)(capturedCompRefs).toEqual([compRef]);
            }));
        });
        describe('bootstrap', () => {
            it('should throw if an APP_INITIIALIZER is not yet resolved', (0, testing_1.withModule)({
                providers: [
                    { provide: core_1.APP_INITIALIZER, useValue: () => new Promise(() => { }), multi: true },
                ],
            }, (0, testing_1.inject)([application_ref_1.ApplicationRef], (ref) => {
                createRootEl();
                (0, matchers_1.expect)(() => ref.bootstrap(SomeComponent)).toThrowError('NG0405: Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
            })));
            it('runs in `NgZone`', (0, testing_1.inject)([application_ref_1.ApplicationRef], (ref) => __awaiter(void 0, void 0, void 0, function* () {
                let ZoneComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'zone-comp',
                            template: `
            <div>{{ name }}</div>
          `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var ZoneComp = _classThis = class {
                        constructor() {
                            this.inNgZone = core_1.NgZone.isInAngularZone();
                        }
                    };
                    __setFunctionName(_classThis, "ZoneComp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        ZoneComp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return ZoneComp = _classThis;
                })();
                createRootEl('zone-comp');
                const comp = ref.bootstrap(ZoneComp);
                (0, matchers_1.expect)(comp.instance.inNgZone).toBeTrue();
            })));
        });
        describe('bootstrapImpl', () => {
            it('should use a provided injector', (0, testing_1.inject)([application_ref_1.ApplicationRef], (ref) => {
                class MyService {
                }
                const myService = new MyService();
                let InjectingComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'injecting-component',
                            template: `<div>Hello, World!</div>`,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var InjectingComponent = _classThis = class {
                        constructor(myService) {
                            this.myService = myService;
                        }
                    };
                    __setFunctionName(_classThis, "InjectingComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        InjectingComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return InjectingComponent = _classThis;
                })();
                const injector = core_1.Injector.create({
                    providers: [{ provide: MyService, useValue: myService }],
                });
                createRootEl('injecting-component');
                const appRef = ref;
                const compRef = appRef.bootstrapImpl(InjectingComponent, 
                /* rootSelectorOrNode */ undefined, injector);
                (0, matchers_1.expect)(compRef.instance.myService).toBe(myService);
            }));
        });
    });
    describe('destroy', () => {
        const providers = [
            { provide: common_1.DOCUMENT, useFactory: () => document, deps: [] },
            // Use the `DomRendererFactory2` as a renderer factory instead of the
            // `AnimationRendererFactory` one, which is configured as a part of the `ServerModule`, see
            // platform module setup above. This simplifies the tests (so they are sync vs async when
            // animations are in use) that verify that the DOM has been cleaned up after tests.
            { provide: core_1.RendererFactory2, useClass: dom_renderer_1.DomRendererFactory2 },
        ];
        // This function creates a new Injector instance with the `ApplicationRef` as a provider, so
        // that the instance of the `ApplicationRef` class is created on that injector (vs in the
        // app-level injector). It is needed to verify `ApplicationRef.destroy` scenarios, which
        // includes destroying an underlying injector.
        function createApplicationRefInjector(parentInjector) {
            const extraProviders = [{ provide: application_ref_1.ApplicationRef, useClass: application_ref_1.ApplicationRef }];
            return (0, render3_1.createEnvironmentInjector)(extraProviders, parentInjector);
        }
        function createApplicationRef(parentInjector) {
            const injector = createApplicationRefInjector(parentInjector);
            return injector.get(application_ref_1.ApplicationRef);
        }
        it('should cleanup the DOM', (0, testing_1.withModule)({ providers }, (0, testing_1.waitForAsync)((0, testing_1.inject)([core_1.EnvironmentInjector, common_1.DOCUMENT], (parentInjector, doc) => {
            createRootEl();
            const appRef = createApplicationRef(parentInjector);
            appRef.bootstrap(SomeComponent);
            // The component template content (`hello`) is present in the document body.
            (0, matchers_1.expect)(doc.body.textContent.indexOf('hello') > -1).toBeTrue();
            appRef.destroy();
            // The component template content (`hello`) is *not* present in the document
            // body, i.e. the DOM has been cleaned up.
            (0, matchers_1.expect)(doc.body.textContent.indexOf('hello') === -1).toBeTrue();
        }))));
        it('should throw when trying to call `destroy` method on already destroyed ApplicationRef', (0, testing_1.withModule)({ providers }, (0, testing_1.waitForAsync)((0, testing_1.inject)([core_1.EnvironmentInjector], (parentInjector) => {
            createRootEl();
            const appRef = createApplicationRef(parentInjector);
            appRef.bootstrap(SomeComponent);
            appRef.destroy();
            (0, matchers_1.expect)(() => appRef.destroy()).toThrowError('NG0406: This instance of the `ApplicationRef` has already been destroyed.');
        }))));
        it('should invoke all registered `onDestroy` callbacks (internal API)', (0, testing_1.withModule)({ providers }, (0, testing_1.waitForAsync)((0, testing_1.inject)([core_1.EnvironmentInjector], (parentInjector) => {
            const onDestroyA = jasmine.createSpy('onDestroyA');
            const onDestroyB = jasmine.createSpy('onDestroyB');
            createRootEl();
            const appRef = createApplicationRef(parentInjector);
            appRef.bootstrap(SomeComponent);
            appRef.onDestroy(onDestroyA);
            appRef.onDestroy(onDestroyB);
            appRef.destroy();
            (0, matchers_1.expect)(onDestroyA).toHaveBeenCalledTimes(1);
            (0, matchers_1.expect)(onDestroyB).toHaveBeenCalledTimes(1);
        }))));
        it('should allow to unsubscribe a registered `onDestroy` callback (internal API)', (0, testing_1.withModule)({ providers }, (0, testing_1.waitForAsync)((0, testing_1.inject)([core_1.EnvironmentInjector], (parentInjector) => {
            createRootEl();
            const appRef = createApplicationRef(parentInjector);
            appRef.bootstrap(SomeComponent);
            const onDestroyA = jasmine.createSpy('onDestroyA');
            const onDestroyB = jasmine.createSpy('onDestroyB');
            const unsubscribeOnDestroyA = appRef.onDestroy(onDestroyA);
            const unsubscribeOnDestroyB = appRef.onDestroy(onDestroyB);
            // Unsubscribe registered listeners.
            unsubscribeOnDestroyA();
            unsubscribeOnDestroyB();
            appRef.destroy();
            (0, matchers_1.expect)(onDestroyA).not.toHaveBeenCalled();
            (0, matchers_1.expect)(onDestroyB).not.toHaveBeenCalled();
        }))));
        it('should correctly update the `destroyed` flag', (0, testing_1.withModule)({ providers }, (0, testing_1.waitForAsync)((0, testing_1.inject)([core_1.EnvironmentInjector], (parentInjector) => {
            createRootEl();
            const appRef = createApplicationRef(parentInjector);
            appRef.bootstrap(SomeComponent);
            (0, matchers_1.expect)(appRef.destroyed).toBeFalse();
            appRef.destroy();
            (0, matchers_1.expect)(appRef.destroyed).toBeTrue();
        }))));
        it('should also destroy underlying injector', (0, testing_1.withModule)({ providers }, (0, testing_1.waitForAsync)((0, testing_1.inject)([core_1.EnvironmentInjector], (parentInjector) => {
            createRootEl();
            const injector = createApplicationRefInjector(parentInjector);
            const appRef = injector.get(application_ref_1.ApplicationRef);
            appRef.bootstrap(SomeComponent);
            (0, matchers_1.expect)(appRef.destroyed).toBeFalse();
            (0, matchers_1.expect)(injector.destroyed).toBeFalse();
            appRef.destroy();
            (0, matchers_1.expect)(appRef.destroyed).toBeTrue();
            (0, matchers_1.expect)(injector.destroyed).toBeTrue();
        }))));
    });
    describe('bootstrapModule', () => {
        let defaultPlatform;
        beforeEach((0, testing_1.inject)([core_1.PlatformRef], (_platform) => {
            createRootEl();
            defaultPlatform = _platform;
        }));
        it('should wait for asynchronous app initializers', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            let resolve;
            const promise = new Promise((res) => {
                resolve = res;
            });
            let initializerDone = false;
            setTimeout(() => {
                resolve(true);
                initializerDone = true;
            }, 1);
            defaultPlatform
                .bootstrapModule(yield createModule([{ provide: core_1.APP_INITIALIZER, useValue: () => promise, multi: true }]))
                .then((_) => {
                (0, matchers_1.expect)(initializerDone).toBe(true);
            });
        })));
        it('should rethrow sync errors even if the exceptionHandler is not rethrowing', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            defaultPlatform
                .bootstrapModule(yield createModule([
                {
                    provide: core_1.APP_INITIALIZER,
                    useValue: () => {
                        throw 'Test';
                    },
                    multi: true,
                },
            ]))
                .then(() => (0, matchers_1.expect)(false).toBe(true), (e) => {
                (0, matchers_1.expect)(e).toBe('Test');
                // Error rethrown will be seen by the exception handler since it's after
                // construction.
                (0, matchers_1.expect)(mockConsole.res[0].join('#')).toEqual('ERROR#Test');
            });
        })));
        it('should rethrow promise errors even if the exceptionHandler is not rethrowing', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            defaultPlatform
                .bootstrapModule(yield createModule([
                { provide: core_1.APP_INITIALIZER, useValue: () => Promise.reject('Test'), multi: true },
            ]))
                .then(() => (0, matchers_1.expect)(false).toBe(true), (e) => {
                (0, matchers_1.expect)(e).toBe('Test');
                (0, matchers_1.expect)(mockConsole.res[0].join('#')).toEqual('ERROR#Test');
            });
        })));
        it('should throw useful error when ApplicationRef is not configured', (0, testing_1.waitForAsync)(() => {
            let EmptyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var EmptyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "EmptyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    EmptyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return EmptyModule = _classThis;
            })();
            return defaultPlatform.bootstrapModule(EmptyModule).then(() => fail('expecting error'), (error) => {
                (0, matchers_1.expect)(error.message).toMatch(/NG0402/);
            });
        }));
        it('should call the `ngDoBootstrap` method with `ApplicationRef` on the main module', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            const ngDoBootstrap = jasmine.createSpy('ngDoBootstrap');
            defaultPlatform
                .bootstrapModule(yield createModule({ ngDoBootstrap: ngDoBootstrap }))
                .then((moduleRef) => {
                const appRef = moduleRef.injector.get(application_ref_1.ApplicationRef);
                (0, matchers_1.expect)(ngDoBootstrap).toHaveBeenCalledWith(appRef);
            });
        })));
        it('should auto bootstrap components listed in @NgModule.bootstrap', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            defaultPlatform
                .bootstrapModule(yield createModule({ bootstrap: [SomeComponent] }))
                .then((moduleRef) => {
                const appRef = moduleRef.injector.get(application_ref_1.ApplicationRef);
                (0, matchers_1.expect)(appRef.componentTypes).toEqual([SomeComponent]);
            });
        })));
        it('should error if neither `ngDoBootstrap` nor @NgModule.bootstrap was specified', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            defaultPlatform.bootstrapModule(yield createModule({ ngDoBootstrap: false })).then(() => (0, matchers_1.expect)(false).toBe(true), (e) => {
                const expectedErrMsg = `NG0403: The module MyModule was bootstrapped, ` +
                    `but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                    `Please define one of these. ` +
                    `Find more at https://angular.dev/errors/NG0403`;
                (0, matchers_1.expect)(e.message).toEqual(expectedErrMsg);
                (0, matchers_1.expect)(mockConsole.res[0].join('#')).toEqual('ERROR#Error: ' + expectedErrMsg);
            });
        })));
        it('should add bootstrapped module into platform modules list', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            defaultPlatform
                .bootstrapModule(yield createModule({ bootstrap: [SomeComponent] }))
                .then((module) => (0, matchers_1.expect)(defaultPlatform._modules).toContain(module));
        })));
        it('should bootstrap with NoopNgZone', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            defaultPlatform
                .bootstrapModule(yield createModule({ bootstrap: [SomeComponent] }), { ngZone: 'noop' })
                .then((module) => {
                const ngZone = module.injector.get(core_1.NgZone);
                (0, matchers_1.expect)(ngZone instanceof ng_zone_1.NoopNgZone).toBe(true);
            });
        })));
        it('should resolve component resources when creating module factory', () => __awaiter(void 0, void 0, void 0, function* () {
            let WithTemplateUrlComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-templates-app',
                        templateUrl: '/test-template.html',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WithTemplateUrlComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "WithTemplateUrlComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithTemplateUrlComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithTemplateUrlComponent = _classThis;
            })();
            const loadResourceSpy = jasmine.createSpy('load resource').and.returnValue('fakeContent');
            const testModule = yield createModule({ component: WithTemplateUrlComponent });
            yield defaultPlatform.bootstrapModule(testModule, {
                providers: [{ provide: compiler_1.ResourceLoader, useValue: { get: loadResourceSpy } }],
            });
            (0, matchers_1.expect)(loadResourceSpy).toHaveBeenCalledTimes(1);
            (0, matchers_1.expect)(loadResourceSpy).toHaveBeenCalledWith('/test-template.html');
        }));
        it('should define `LOCALE_ID`', () => __awaiter(void 0, void 0, void 0, function* () {
            let I18nComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'i18n-app',
                        templateUrl: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var I18nComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "I18nComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    I18nComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return I18nComponent = _classThis;
            })();
            const testModule = yield createModule({
                component: I18nComponent,
                providers: [{ provide: core_1.LOCALE_ID, useValue: 'ro' }],
            });
            yield defaultPlatform.bootstrapModule(testModule);
            (0, matchers_1.expect)((0, render3_1.getLocaleId)()).toEqual('ro');
        }));
        it('should wait for APP_INITIALIZER to set providers for `LOCALE_ID`', () => __awaiter(void 0, void 0, void 0, function* () {
            let locale = '';
            const testModule = yield createModule({
                providers: [
                    { provide: core_1.APP_INITIALIZER, useValue: () => (locale = 'fr-FR'), multi: true },
                    { provide: core_1.LOCALE_ID, useFactory: () => locale },
                ],
            });
            const app = yield defaultPlatform.bootstrapModule(testModule);
            (0, matchers_1.expect)(app.injector.get(core_1.LOCALE_ID)).toEqual('fr-FR');
        }));
    });
    describe('bootstrapModuleFactory', () => {
        let defaultPlatform;
        beforeEach((0, testing_1.inject)([core_1.PlatformRef], (_platform) => {
            createRootEl();
            defaultPlatform = _platform;
        }));
        it('should wait for asynchronous app initializers', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            let resolve;
            const promise = new Promise((res) => {
                resolve = res;
            });
            let initializerDone = false;
            setTimeout(() => {
                resolve(true);
                initializerDone = true;
            }, 1);
            const moduleType = yield createModule([
                { provide: core_1.APP_INITIALIZER, useValue: () => promise, multi: true },
            ]);
            const moduleFactory = yield (0, application_ngmodule_factory_compiler_1.compileNgModuleFactory)(defaultPlatform.injector, {}, moduleType);
            defaultPlatform.bootstrapModuleFactory(moduleFactory).then((_) => {
                (0, matchers_1.expect)(initializerDone).toBe(true);
            });
        })));
        it('should rethrow sync errors even if the exceptionHandler is not rethrowing', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            const moduleType = yield createModule([
                {
                    provide: core_1.APP_INITIALIZER,
                    useValue: () => {
                        throw 'Test';
                    },
                    multi: true,
                },
            ]);
            const moduleFactory = yield (0, application_ngmodule_factory_compiler_1.compileNgModuleFactory)(defaultPlatform.injector, {}, moduleType);
            (0, matchers_1.expect)(() => defaultPlatform.bootstrapModuleFactory(moduleFactory)).toThrow('Test');
            // Error rethrown will be seen by the exception handler since it's after
            // construction.
            (0, matchers_1.expect)(mockConsole.res[0].join('#')).toEqual('ERROR#Test');
        })));
        it('should rethrow promise errors even if the exceptionHandler is not rethrowing', (0, testing_1.waitForAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            const moduleType = yield createModule([
                { provide: core_1.APP_INITIALIZER, useValue: () => Promise.reject('Test'), multi: true },
            ]);
            const moduleFactory = yield (0, application_ngmodule_factory_compiler_1.compileNgModuleFactory)(defaultPlatform.injector, {}, moduleType);
            defaultPlatform.bootstrapModuleFactory(moduleFactory).then(() => (0, matchers_1.expect)(false).toBe(true), (e) => {
                (0, matchers_1.expect)(e).toBe('Test');
                (0, matchers_1.expect)(mockConsole.res[0].join('#')).toEqual('ERROR#Test');
            });
        })));
    });
    describe('attachView / detachView', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '{{name}}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor() {
                    this.name = 'Initial';
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
        let ContainerComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<ng-container #vc></ng-container>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _vc_decorators;
            let _vc_initializers = [];
            let _vc_extraInitializers = [];
            var ContainerComp = _classThis = class {
                constructor() {
                    this.vc = __runInitializers(this, _vc_initializers, void 0);
                    __runInitializers(this, _vc_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "ContainerComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _vc_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef })];
                __esDecorate(null, null, _vc_decorators, { kind: "field", name: "vc", static: false, private: false, access: { has: obj => "vc" in obj, get: obj => obj.vc, set: (obj, value) => { obj.vc = value; } }, metadata: _metadata }, _vc_initializers, _vc_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ContainerComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ContainerComp = _classThis;
        })();
        let EmbeddedViewComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<ng-template #t>Dynamic content</ng-template>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _tplRef_decorators;
            let _tplRef_initializers = [];
            let _tplRef_extraInitializers = [];
            var EmbeddedViewComp = _classThis = class {
                constructor() {
                    this.tplRef = __runInitializers(this, _tplRef_initializers, void 0);
                    __runInitializers(this, _tplRef_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "EmbeddedViewComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _tplRef_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef, { static: true })];
                __esDecorate(null, null, _tplRef_decorators, { kind: "field", name: "tplRef", static: false, private: false, access: { has: obj => "tplRef" in obj, get: obj => obj.tplRef, set: (obj, value) => { obj.tplRef = value; } }, metadata: _metadata }, _tplRef_initializers, _tplRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                EmbeddedViewComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return EmbeddedViewComp = _classThis;
        })();
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                declarations: [MyComp, ContainerComp, EmbeddedViewComp],
                providers: [{ provide: testing_1.ComponentFixtureNoNgZone, useValue: true }],
            });
        });
        it('should dirty check attached views', () => {
            const comp = testing_1.TestBed.createComponent(MyComp);
            const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
            (0, matchers_1.expect)(appRef.viewCount).toBe(0);
            appRef.tick();
            (0, matchers_1.expect)(comp.nativeElement).toHaveText('');
            appRef.attachView(comp.componentRef.hostView);
            appRef.tick();
            (0, matchers_1.expect)(appRef.viewCount).toBe(1);
            (0, matchers_1.expect)(comp.nativeElement).toHaveText('Initial');
        });
        it('should not dirty check detached views', () => {
            const comp = testing_1.TestBed.createComponent(MyComp);
            const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
            appRef.attachView(comp.componentRef.hostView);
            appRef.tick();
            (0, matchers_1.expect)(comp.nativeElement).toHaveText('Initial');
            appRef.detachView(comp.componentRef.hostView);
            comp.componentInstance.name = 'New';
            appRef.tick();
            (0, matchers_1.expect)(appRef.viewCount).toBe(0);
            (0, matchers_1.expect)(comp.nativeElement).toHaveText('Initial');
        });
        it('should not dirty host bindings of views not marked for check', () => {
            let HostBindingComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        host: { '[class]': 'clazz' },
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var HostBindingComp = _classThis = class {
                    constructor() {
                        this.clazz = 'initial';
                    }
                };
                __setFunctionName(_classThis, "HostBindingComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    HostBindingComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return HostBindingComp = _classThis;
            })();
            const comp = testing_1.TestBed.createComponent(HostBindingComp);
            const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
            appRef.attachView(comp.componentRef.hostView);
            appRef.tick();
            (0, matchers_1.expect)(comp.nativeElement.outerHTML).toContain('initial');
            comp.componentInstance.clazz = 'new';
            appRef.tick();
            (0, matchers_1.expect)(comp.nativeElement.outerHTML).toContain('initial');
            comp.changeDetectorRef.markForCheck();
            appRef.tick();
            (0, matchers_1.expect)(comp.nativeElement.outerHTML).toContain('new');
        });
        it('should detach attached views if they are destroyed', () => {
            const comp = testing_1.TestBed.createComponent(MyComp);
            const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
            appRef.attachView(comp.componentRef.hostView);
            comp.destroy();
            (0, matchers_1.expect)(appRef.viewCount).toBe(0);
        });
        it('should detach attached embedded views if they are destroyed', () => {
            const comp = testing_1.TestBed.createComponent(EmbeddedViewComp);
            const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
            const embeddedViewRef = comp.componentInstance.tplRef.createEmbeddedView({});
            appRef.attachView(embeddedViewRef);
            embeddedViewRef.destroy();
            (0, matchers_1.expect)(appRef.viewCount).toBe(0);
        });
        it('should not allow to attach a view to both, a view container and the ApplicationRef', () => {
            const comp = testing_1.TestBed.createComponent(MyComp);
            let hostView = comp.componentRef.hostView;
            const containerComp = testing_1.TestBed.createComponent(ContainerComp);
            containerComp.detectChanges();
            const vc = containerComp.componentInstance.vc;
            const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
            vc.insert(hostView);
            (0, matchers_1.expect)(() => appRef.attachView(hostView)).toThrowError('NG0902: This view is already attached to a ViewContainer!');
            hostView = vc.detach(0);
            appRef.attachView(hostView);
            (0, matchers_1.expect)(() => vc.insert(hostView)).toThrowError('NG0902: This view is already attached directly to the ApplicationRef!');
        });
    });
});
describe('AppRef', () => {
    describe('stability', () => {
        let SyncComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'sync-comp',
                    template: `<span>{{text}}</span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SyncComp = _classThis = class {
                constructor() {
                    this.text = '1';
                }
            };
            __setFunctionName(_classThis, "SyncComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SyncComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SyncComp = _classThis;
        })();
        let ClickComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'click-comp',
                    template: `<span (click)="onClick()">{{text}}</span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ClickComp = _classThis = class {
                constructor() {
                    this.text = '1';
                }
                onClick() {
                    this.text += '1';
                }
            };
            __setFunctionName(_classThis, "ClickComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ClickComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ClickComp = _classThis;
        })();
        let MicroTaskComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'micro-task-comp',
                    template: `<span>{{text}}</span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MicroTaskComp = _classThis = class {
                constructor() {
                    this.text = '1';
                }
                ngOnInit() {
                    Promise.resolve(null).then((_) => {
                        this.text += '1';
                    });
                }
            };
            __setFunctionName(_classThis, "MicroTaskComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MicroTaskComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MicroTaskComp = _classThis;
        })();
        let MacroTaskComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'macro-task-comp',
                    template: `<span>{{text}}</span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MacroTaskComp = _classThis = class {
                constructor() {
                    this.text = '1';
                }
                ngOnInit() {
                    setTimeout(() => {
                        this.text += '1';
                    }, 10);
                }
            };
            __setFunctionName(_classThis, "MacroTaskComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MacroTaskComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MacroTaskComp = _classThis;
        })();
        let MicroMacroTaskComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'micro-macro-task-comp',
                    template: `<span>{{text}}</span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MicroMacroTaskComp = _classThis = class {
                constructor() {
                    this.text = '1';
                }
                ngOnInit() {
                    Promise.resolve(null).then((_) => {
                        this.text += '1';
                        setTimeout(() => {
                            this.text += '1';
                        }, 10);
                    });
                }
            };
            __setFunctionName(_classThis, "MicroMacroTaskComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MicroMacroTaskComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MicroMacroTaskComp = _classThis;
        })();
        let MacroMicroTaskComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'macro-micro-task-comp',
                    template: `<span>{{text}}</span>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MacroMicroTaskComp = _classThis = class {
                constructor() {
                    this.text = '1';
                }
                ngOnInit() {
                    setTimeout(() => {
                        this.text += '1';
                        Promise.resolve(null).then((_) => {
                            this.text += '1';
                        });
                    }, 10);
                }
            };
            __setFunctionName(_classThis, "MacroMicroTaskComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MacroMicroTaskComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MacroMicroTaskComp = _classThis;
        })();
        let stableCalled = false;
        beforeEach(() => {
            stableCalled = false;
            testing_1.TestBed.configureTestingModule({
                providers: [(0, core_1.provideZoneChangeDetection)({ ignoreChangesOutsideZone: true })],
                declarations: [
                    SyncComp,
                    MicroTaskComp,
                    MacroTaskComp,
                    MicroMacroTaskComp,
                    MacroMicroTaskComp,
                    ClickComp,
                ],
            });
        });
        afterEach(() => {
            (0, matchers_1.expect)(stableCalled).toBe(true, 'isStable did not emit true on stable');
        });
        function expectStableTexts(component, expected) {
            const fixture = testing_1.TestBed.createComponent(component);
            const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
            const zone = testing_1.TestBed.inject(core_1.NgZone);
            appRef.attachView(fixture.componentRef.hostView);
            zone.run(() => appRef.tick());
            let i = 0;
            appRef.isStable.subscribe({
                next: (stable) => {
                    if (stable) {
                        (0, matchers_1.expect)(i).toBeLessThan(expected.length);
                        (0, matchers_1.expect)(fixture.nativeElement).toHaveText(expected[i++]);
                        stableCalled = true;
                    }
                },
            });
        }
        it('isStable should fire on synchronous component loading', (0, testing_1.waitForAsync)(() => {
            expectStableTexts(SyncComp, ['1']);
        }));
        it('isStable should fire after a microtask on init is completed', (0, testing_1.waitForAsync)(() => {
            expectStableTexts(MicroTaskComp, ['11']);
        }));
        it('isStable should fire after a macrotask on init is completed', (0, testing_1.waitForAsync)(() => {
            expectStableTexts(MacroTaskComp, ['11']);
        }));
        it('isStable should fire only after chain of micro and macrotasks on init are completed', (0, testing_1.waitForAsync)(() => {
            expectStableTexts(MicroMacroTaskComp, ['111']);
        }));
        it('isStable should fire only after chain of macro and microtasks on init are completed', (0, testing_1.waitForAsync)(() => {
            expectStableTexts(MacroMicroTaskComp, ['111']);
        }));
        it('isStable can be subscribed to many times', () => __awaiter(void 0, void 0, void 0, function* () {
            const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
            // Create stable subscription but do not unsubscribe before the second subscription is made
            appRef.isStable.subscribe();
            yield expectAsync(appRef.isStable.pipe((0, operators_1.take)(1)).toPromise()).toBeResolved();
            stableCalled = true;
        }));
        describe('unstable', () => {
            let unstableCalled = false;
            afterEach(() => {
                (0, matchers_1.expect)(unstableCalled).toBe(true, 'isStable did not emit false on unstable');
            });
            function expectUnstable(appRef) {
                appRef.isStable.subscribe({
                    next: (stable) => {
                        if (stable) {
                            stableCalled = true;
                        }
                        if (!stable) {
                            unstableCalled = true;
                        }
                    },
                });
            }
            it('should be fired after app becomes unstable', (0, testing_1.waitForAsync)(() => {
                const fixture = testing_1.TestBed.createComponent(ClickComp);
                const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
                const zone = testing_1.TestBed.inject(core_1.NgZone);
                appRef.attachView(fixture.componentRef.hostView);
                zone.run(() => appRef.tick());
                fixture.whenStable().then(() => {
                    expectUnstable(appRef);
                    const element = fixture.debugElement.children[0];
                    (0, browser_util_1.dispatchEvent)(element.nativeElement, 'click');
                });
            }));
        });
    });
});
describe('injector', () => {
    it('should expose an EnvironmentInjector', () => {
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor(envInjector) {
                    this.envInjector = envInjector;
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
        const appRef = testing_1.TestBed.inject(application_ref_1.ApplicationRef);
        (0, matchers_1.expect)(appRef.injector).toBe(fixture.componentInstance.envInjector);
    });
});
class MockConsole {
    constructor() {
        this.res = [];
    }
    log(...args) {
        // Logging from ErrorHandler should run outside of the Angular Zone.
        core_1.NgZone.assertNotInAngularZone();
        this.res.push(args);
    }
    error(...args) {
        // Logging from ErrorHandler should run outside of the Angular Zone.
        core_1.NgZone.assertNotInAngularZone();
        this.res.push(args);
    }
}
