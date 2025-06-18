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
const injector_1 = require("@angular/core/src/di/interface/injector");
const null_injector_1 = require("../../src/di/null_injector");
const provider_collection_1 = require("../../src/di/provider_collection");
const r3_injector_1 = require("../../src/di/r3_injector");
const framework_injector_profiler_1 = require("../../src/render3/debug/framework_injector_profiler");
const injector_profiler_1 = require("../../src/render3/debug/injector_profiler");
const di_1 = require("../../src/render3/di");
const injector_discovery_utils_1 = require("../../src/render3/util/injector_discovery_utils");
const testing_1 = require("../../testing");
const test_bed_1 = require("../../testing/src/test_bed");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
describe('setProfiler', () => {
    let injectEvents = [];
    let aboutToCreateEvents = [];
    let createEvents = [];
    let providerConfiguredEvents = [];
    function searchForProfilerEvent(events, condition) {
        return events.find((event) => condition(event));
    }
    beforeEach(() => {
        injectEvents = [];
        aboutToCreateEvents = [];
        createEvents = [];
        providerConfiguredEvents = [];
        (0, injector_profiler_1.setInjectorProfiler)(null);
        (0, injector_profiler_1.setInjectorProfiler)((injectorProfilerEvent) => {
            const { type } = injectorProfilerEvent;
            if (type === 0 /* InjectorProfilerEventType.Inject */) {
                injectEvents.push({
                    service: injectorProfilerEvent.service,
                    context: (0, injector_profiler_1.getInjectorProfilerContext)(),
                    type,
                });
            }
            else if (type === 1 /* InjectorProfilerEventType.InstanceCreatedByInjector */) {
                createEvents.push({
                    instance: injectorProfilerEvent.instance,
                    context: (0, injector_profiler_1.getInjectorProfilerContext)(),
                    type,
                });
            }
            else if (type === 2 /* InjectorProfilerEventType.ProviderConfigured */) {
                providerConfiguredEvents.push({
                    providerRecord: injectorProfilerEvent.providerRecord,
                    context: (0, injector_profiler_1.getInjectorProfilerContext)(),
                    type,
                });
            }
            else if (type === 4 /* InjectorProfilerEventType.InjectorToCreateInstanceEvent */) {
                aboutToCreateEvents.push(injectorProfilerEvent);
            }
            else {
                throw new Error('Unexpected event type: ' + type);
            }
        });
    });
    afterEach(() => (0, injector_profiler_1.setInjectorProfiler)(null));
    it('should emit DI events when a component contains a provider and injects it', () => {
        class MyService {
        }
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: 'hello world',
                    providers: [MyService],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.myService = (0, core_1.inject)(MyService);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ declarations: [MyComponent] });
        const fixture = test_bed_1.TestBed.createComponent(MyComponent);
        const myComp = fixture.componentInstance;
        // MyService should have been configured
        const myServiceProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === MyService);
        expect(myServiceProviderConfiguredEvent).toBeTruthy();
        // inject(MyService) was called
        const myServiceInjectEvent = searchForProfilerEvent(injectEvents, (event) => event.service.token === MyService);
        expect(myServiceInjectEvent).toBeTruthy();
        expect(myServiceInjectEvent.service.value).toBe(myComp.myService);
        expect(myServiceInjectEvent.service.flags).toBe(injector_1.InternalInjectFlags.Default);
        // myComp is an angular instance that is able to call `inject` in it's constructor, so a
        // create event should have been emitted for it
        const componentCreateEvent = searchForProfilerEvent(createEvents, (event) => event.instance.value === myComp);
        const componentAboutToCreateEvent = searchForProfilerEvent(aboutToCreateEvents, (event) => event.token === MyComponent);
        expect(componentAboutToCreateEvent).toBeDefined();
        expect(componentCreateEvent).toBeTruthy();
    });
    it('should emit the correct DI events when a service is injected with injection flags', () => {
        class MyService {
        }
        class MyServiceB {
        }
        class MyServiceC {
        }
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: 'hello world',
                    providers: [MyService, { provide: MyServiceB, useValue: 0 }],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.myService = (0, core_1.inject)(MyService, { self: true });
                    this.myServiceD = (0, core_1.inject)(MyServiceB, { skipSelf: true });
                    this.myServiceC = (0, core_1.inject)(MyServiceC, { optional: true });
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            providers: [MyServiceB, MyServiceC, { provide: MyServiceB, useValue: 1 }],
            declarations: [MyComponent],
        });
        test_bed_1.TestBed.createComponent(MyComponent);
        const myServiceInjectEvent = searchForProfilerEvent(injectEvents, (event) => event.service.token === MyService);
        const myServiceBInjectEvent = searchForProfilerEvent(injectEvents, (event) => event.service.token === MyServiceB);
        const myServiceCInjectEvent = searchForProfilerEvent(injectEvents, (event) => event.service.token === MyServiceC);
        expect(myServiceInjectEvent.service.flags).toBe(injector_1.InternalInjectFlags.Self);
        expect(myServiceBInjectEvent.service.flags).toBe(injector_1.InternalInjectFlags.SkipSelf);
        expect(myServiceBInjectEvent.service.value).toBe(1);
        expect(myServiceCInjectEvent.service.flags).toBe(injector_1.InternalInjectFlags.Optional);
    });
    it('should emit correct DI events when providers are configured with useFactory, useExisting, useClass, useValue', () => {
        class MyService {
        }
        class MyServiceB {
        }
        class MyServiceC {
        }
        class MyServiceD {
        }
        class MyServiceE {
        }
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: 'hello world',
                    providers: [
                        MyService,
                        { provide: MyServiceB, useFactory: () => new MyServiceB() },
                        { provide: MyServiceC, useExisting: MyService },
                        { provide: MyServiceD, useValue: 'hello world' },
                        { provide: MyServiceE, useClass: class MyExampleClass {
                            } },
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.myService = (0, core_1.inject)(MyService);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ declarations: [MyComponent] });
        test_bed_1.TestBed.createComponent(MyComponent);
        // MyService should have been configured
        const myServiceProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === MyService);
        const myServiceBProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === MyServiceB);
        const myServiceCProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === MyServiceC);
        const myServiceDProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === MyServiceD);
        const myServiceEProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === MyServiceE);
        expect((0, provider_collection_1.isTypeProvider)(myServiceProviderConfiguredEvent.providerRecord.provider)).toBeTrue();
        expect((0, provider_collection_1.isFactoryProvider)(myServiceBProviderConfiguredEvent.providerRecord.provider)).toBeTrue();
        expect((0, provider_collection_1.isExistingProvider)(myServiceCProviderConfiguredEvent.providerRecord.provider)).toBeTrue();
        expect((0, provider_collection_1.isValueProvider)(myServiceDProviderConfiguredEvent.providerRecord.provider)).toBeTrue();
        expect((0, provider_collection_1.isClassProvider)(myServiceEProviderConfiguredEvent.providerRecord.provider)).toBeTrue();
    });
    it('should emit correct DI events when providers are configured with multi', () => {
        var _a;
        class MyService {
        }
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: 'hello world',
                    providers: [
                        { provide: MyService, useClass: MyService, multi: true },
                        { provide: MyService, useFactory: () => new MyService(), multi: true },
                        { provide: MyService, useValue: 'hello world', multi: true },
                    ],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.myService = (0, core_1.inject)(MyService);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ declarations: [MyComponent] });
        test_bed_1.TestBed.createComponent(MyComponent);
        // MyService should have been configured
        const myServiceProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === MyService);
        expect(((_a = myServiceProviderConfiguredEvent.providerRecord) === null || _a === void 0 ? void 0 : _a.provider).multi).toBeTrue();
    });
    it('should emit correct DI events when service providers are configured with providedIn', () => {
        let RootService = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootService = _classThis = class {
            };
            __setFunctionName(_classThis, "RootService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootService = _classThis;
        })();
        let PlatformService = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'platform' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var PlatformService = _classThis = class {
            };
            __setFunctionName(_classThis, "PlatformService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                PlatformService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return PlatformService = _classThis;
        })();
        const providedInRootInjectionToken = new core_1.InjectionToken('providedInRootInjectionToken', {
            providedIn: 'root',
            factory: () => 'hello world',
        });
        const providedInPlatformToken = new core_1.InjectionToken('providedInPlatformToken', {
            providedIn: 'platform',
            factory: () => 'hello world',
        });
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: 'hello world',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.rootService = (0, core_1.inject)(RootService);
                    this.platformService = (0, core_1.inject)(PlatformService);
                    this.fromRoot = (0, core_1.inject)(providedInRootInjectionToken);
                    this.fromPlatform = (0, core_1.inject)(providedInPlatformToken);
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ declarations: [MyComponent] });
        test_bed_1.TestBed.createComponent(MyComponent);
        // MyService should have been configured
        const rootServiceProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === RootService);
        expect(rootServiceProviderConfiguredEvent).toBeTruthy();
        expect(rootServiceProviderConfiguredEvent.context).toBeTruthy();
        expect(rootServiceProviderConfiguredEvent.context.injector).toBeInstanceOf(r3_injector_1.R3Injector);
        expect(rootServiceProviderConfiguredEvent.context.injector.scopes.has('root')).toBeTrue();
        const platformServiceProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === PlatformService);
        expect(platformServiceProviderConfiguredEvent).toBeTruthy();
        expect(platformServiceProviderConfiguredEvent.context).toBeTruthy();
        expect(platformServiceProviderConfiguredEvent.context.injector).toBeInstanceOf(r3_injector_1.R3Injector);
        expect(platformServiceProviderConfiguredEvent.context.injector.scopes.has('platform')).toBeTrue();
        const providedInRootInjectionTokenProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === providedInRootInjectionToken);
        expect(providedInRootInjectionTokenProviderConfiguredEvent).toBeTruthy();
        expect(providedInRootInjectionTokenProviderConfiguredEvent.context).toBeTruthy();
        expect(providedInRootInjectionTokenProviderConfiguredEvent.context.injector).toBeInstanceOf(r3_injector_1.R3Injector);
        expect(providedInRootInjectionTokenProviderConfiguredEvent.context.injector.scopes.has('root')).toBeTrue();
        expect(providedInRootInjectionTokenProviderConfiguredEvent.providerRecord.token).toBe(providedInRootInjectionToken);
        const providedInPlatformTokenProviderConfiguredEvent = searchForProfilerEvent(providerConfiguredEvents, (event) => event.providerRecord.token === providedInPlatformToken);
        expect(providedInPlatformTokenProviderConfiguredEvent).toBeTruthy();
        expect(providedInPlatformTokenProviderConfiguredEvent.context).toBeTruthy();
        expect(providedInPlatformTokenProviderConfiguredEvent.context.injector).toBeInstanceOf(r3_injector_1.R3Injector);
        expect(providedInPlatformTokenProviderConfiguredEvent.context.injector.scopes.has('platform')).toBeTrue();
        expect(providedInPlatformTokenProviderConfiguredEvent.providerRecord.token).toBe(providedInPlatformToken);
    });
});
describe('profiler activation and removal', () => {
    class SomeClass {
    }
    const fakeContext = {
        injector: core_1.Injector.create({ providers: [] }),
        token: SomeClass,
    };
    const fakeEvent = {
        type: 1 /* InjectorProfilerEventType.InstanceCreatedByInjector */,
        context: fakeContext,
        instance: { value: new SomeClass() },
    };
    it('should allow adding and removing multiple profilers', () => {
        const events = [];
        const r1 = (0, injector_profiler_1.setInjectorProfiler)((e) => events.push('P1: ' + e.type));
        const r2 = (0, injector_profiler_1.setInjectorProfiler)((e) => events.push('P2: ' + e.type));
        (0, injector_profiler_1.injectorProfiler)(fakeEvent);
        expect(events).toEqual(['P1: 1', 'P2: 1']);
        r1();
        (0, injector_profiler_1.injectorProfiler)(fakeEvent);
        expect(events).toEqual(['P1: 1', 'P2: 1', 'P2: 1']);
        r2();
        (0, injector_profiler_1.injectorProfiler)(fakeEvent);
        expect(events).toEqual(['P1: 1', 'P2: 1', 'P2: 1']);
    });
    it('should not add / remove the same profiler twice', () => {
        const events = [];
        const p1 = (e) => events.push('P1: ' + e.type);
        const r1 = (0, injector_profiler_1.setInjectorProfiler)(p1);
        const r2 = (0, injector_profiler_1.setInjectorProfiler)(p1);
        (0, injector_profiler_1.injectorProfiler)(fakeEvent);
        expect(events).toEqual(['P1: 1']);
        r1();
        (0, injector_profiler_1.injectorProfiler)(fakeEvent);
        expect(events).toEqual(['P1: 1']);
        // subsequent removals should be noop
        r1();
        r2();
    });
    it('should clear all profilers when passing null', () => {
        const events = [];
        (0, injector_profiler_1.setInjectorProfiler)((e) => events.push('P1: ' + e.type));
        (0, injector_profiler_1.setInjectorProfiler)((e) => events.push('P2: ' + e.type));
        (0, injector_profiler_1.injectorProfiler)(fakeEvent);
        expect(events).toEqual(['P1: 1', 'P2: 1']);
        // clear all profilers
        (0, injector_profiler_1.setInjectorProfiler)(null);
        (0, injector_profiler_1.injectorProfiler)(fakeEvent);
        expect(events).toEqual(['P1: 1', 'P2: 1']);
    });
});
describe('getInjectorMetadata', () => {
    beforeEach(() => {
        (0, injector_profiler_1.setInjectorProfiler)(null);
        (0, framework_injector_profiler_1.setupFrameworkInjectorProfiler)();
    });
    afterEach(() => (0, injector_profiler_1.setInjectorProfiler)(null));
    it('should be able to determine injector type and name', (0, testing_1.fakeAsync)(() => {
        class MyServiceA {
        }
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyServiceA] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        class MyServiceB {
        }
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyServiceB] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        let LazyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'lazy-comp',
                    template: `lazy component`,
                    imports: [ModuleB],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var LazyComponent = _classThis = class {
                constructor() {
                    this.lazyComponentNodeInjector = (0, core_1.inject)(core_1.Injector);
                    this.elementRef = (0, core_1.inject)(core_1.ElementRef);
                    (0, core_1.afterEveryRender)(() => afterLazyComponentRendered(this));
                }
            };
            __setFunctionName(_classThis, "LazyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LazyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LazyComponent = _classThis;
        })();
        let MyStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [router_1.RouterOutlet, ModuleA],
                    template: `<router-outlet/>`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _routerOutlet_decorators;
            let _routerOutlet_initializers = [];
            let _routerOutlet_extraInitializers = [];
            var MyStandaloneComponent = _classThis = class {
                constructor() {
                    this.routerOutlet = __runInitializers(this, _routerOutlet_initializers, void 0);
                    this.elementRef = (__runInitializers(this, _routerOutlet_extraInitializers), (0, core_1.inject)(core_1.ElementRef));
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _routerOutlet_decorators = [(0, core_1.ViewChild)(router_1.RouterOutlet, { read: core_1.ElementRef })];
                __esDecorate(null, null, _routerOutlet_decorators, { kind: "field", name: "routerOutlet", static: false, private: false, access: { has: obj => "routerOutlet" in obj, get: obj => obj.routerOutlet, set: (obj, value) => { obj.routerOutlet = value; } }, metadata: _metadata }, _routerOutlet_initializers, _routerOutlet_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            imports: [
                router_1.RouterModule.forRoot([
                    {
                        path: 'lazy',
                        loadComponent: () => LazyComponent,
                    },
                ]),
            ],
        });
        const root = test_bed_1.TestBed.createComponent(MyStandaloneComponent);
        test_bed_1.TestBed.inject(router_1.Router).navigateByUrl('/lazy');
        (0, testing_1.tick)();
        root.detectChanges();
        function afterLazyComponentRendered(lazyComponent) {
            const { lazyComponentNodeInjector } = lazyComponent;
            const myStandaloneComponent = lazyComponentNodeInjector.get(MyStandaloneComponent, null, {
                skipSelf: true,
            });
            expect(myStandaloneComponent).toBeInstanceOf(MyStandaloneComponent);
            expect(myStandaloneComponent.routerOutlet).toBeInstanceOf(core_1.ElementRef);
            const injectorPath = (0, injector_discovery_utils_1.getInjectorResolutionPath)(lazyComponentNodeInjector);
            const injectorMetadata = injectorPath.map((injector) => (0, injector_discovery_utils_1.getInjectorMetadata)(injector));
            expect(injectorMetadata[0]).toBeDefined();
            expect(injectorMetadata[1]).toBeDefined();
            expect(injectorMetadata[2]).toBeDefined();
            expect(injectorMetadata[3]).toBeDefined();
            expect(injectorMetadata[4]).toBeDefined();
            expect(injectorMetadata[5]).toBeDefined();
            expect(injectorMetadata[6]).toBeDefined();
            expect(injectorMetadata[0].source).toBe(lazyComponent.elementRef.nativeElement);
            expect(injectorMetadata[1].source).toBe(myStandaloneComponent.routerOutlet.nativeElement);
            expect(injectorMetadata[2].source).toBe(myStandaloneComponent.elementRef.nativeElement);
            expect(injectorMetadata[3].source).toBe('Standalone[LazyComponent]');
            expect(injectorMetadata[4].source).toBe('DynamicTestModule');
            expect(injectorMetadata[5].source).toBe('Platform: core');
            expect(injectorMetadata[0].type).toBe('element');
            expect(injectorMetadata[1].type).toBe('element');
            expect(injectorMetadata[2].type).toBe('element');
            expect(injectorMetadata[3].type).toBe('environment');
            expect(injectorMetadata[4].type).toBe('environment');
            expect(injectorMetadata[5].type).toBe('environment');
        }
    }));
    it('should return null for injectors it does not recognize', () => {
        class MockInjector extends core_1.Injector {
            get() {
                throw new Error('Method not implemented.');
            }
        }
        const mockInjector = new MockInjector();
        expect((0, injector_discovery_utils_1.getInjectorMetadata)(mockInjector)).toBeNull();
    });
    it('should return null as the source for an R3Injector with no source.', () => {
        const emptyR3Injector = new r3_injector_1.R3Injector([], new null_injector_1.NullInjector(), null, new Set());
        const r3InjectorMetadata = (0, injector_discovery_utils_1.getInjectorMetadata)(emptyR3Injector);
        expect(r3InjectorMetadata).toBeDefined();
        expect(r3InjectorMetadata.source).toBeNull();
        expect(r3InjectorMetadata.type).toBe('environment');
    });
});
describe('getInjectorProviders', () => {
    beforeEach(() => {
        (0, injector_profiler_1.setInjectorProfiler)(null);
        (0, framework_injector_profiler_1.setupFrameworkInjectorProfiler)();
    });
    afterEach(() => (0, injector_profiler_1.setInjectorProfiler)(null));
    it('should be able to get the providers from a components injector', () => {
        class MyService {
        }
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `
      {{b | percent:'4.3-5' }}
    `,
                    providers: [MyService],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.b = 1.3495;
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ declarations: [MyComponent], imports: [common_1.PercentPipe] });
        const fixture = test_bed_1.TestBed.createComponent(MyComponent);
        const providers = (0, injector_discovery_utils_1.getInjectorProviders)(fixture.debugElement.injector);
        expect(providers.length).toBe(1);
        expect(providers[0].token).toBe(MyService);
        expect(providers[0].provider).toBe(MyService);
        expect(providers[0].isViewProvider).toBe(false);
    });
    it('should be able to get determine if a provider is a view provider', () => {
        class MyService {
        }
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `
      {{b | percent:'4.3-5' }}
    `,
                    viewProviders: [MyService],
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
                constructor() {
                    this.b = 1.3495;
                }
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ declarations: [MyComponent], imports: [common_1.PercentPipe] });
        const fixture = test_bed_1.TestBed.createComponent(MyComponent);
        const providers = (0, injector_discovery_utils_1.getInjectorProviders)(fixture.debugElement.injector);
        expect(providers.length).toBe(1);
        expect(providers[0].token).toBe(MyService);
        expect(providers[0].provider).toBe(MyService);
        expect(providers[0].isViewProvider).toBe(true);
    });
    it('should be able to determine import paths after module provider flattening in the NgModule bootstrap case', () => {
        //                ┌─────────┐
        //                │AppModule│
        //                └────┬────┘
        //                     │
        //                  imports
        //                     │
        //                ┌────▼────┐
        //      ┌─imports─┤ ModuleD ├──imports─┐
        //      │         └─────────┘          │
        //      │                        ┌─────▼─────┐
        //  ┌───▼───┐                    │  ModuleC  │
        //  │ModuleB│                    │-MyServiceB│
        //  └───┬───┘                    └───────────┘
        //      │
        //   imports
        //      │
        // ┌────▼─────┐
        // │ ModuleA  │
        // │-MyService│
        // └──────────┘
        class MyService {
        }
        class MyServiceB {
        }
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyService] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [ModuleA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        let ModuleC = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyServiceB] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleC = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleC");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleC = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleC = _classThis;
        })();
        let ModuleD = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [ModuleB, ModuleC],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleD = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleD");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleD = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleD = _classThis;
        })();
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: 'hello world',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        let AppModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [ModuleD, platform_browser_1.BrowserModule],
                    declarations: [MyComponent],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppModule = _classThis = class {
            };
            __setFunctionName(_classThis, "AppModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppModule = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ imports: [AppModule] });
        const root = test_bed_1.TestBed.createComponent(MyComponent);
        root.detectChanges();
        const appModuleInjector = root.componentRef.injector.get(r3_injector_1.EnvironmentInjector);
        const providers = (0, injector_discovery_utils_1.getInjectorProviders)(appModuleInjector);
        const myServiceProvider = providers.find((provider) => provider.token === MyService);
        const myServiceBProvider = providers.find((provider) => provider.token === MyServiceB);
        const testModuleType = root.componentRef.injector.get(core_1.NgModuleRef).instance.constructor;
        expect(myServiceProvider).toBeTruthy();
        expect(myServiceBProvider).toBeTruthy();
        expect(myServiceProvider.importPath).toBeInstanceOf(Array);
        expect(myServiceProvider.importPath.length).toBe(5);
        expect(myServiceProvider.importPath[0]).toBe(testModuleType);
        expect(myServiceProvider.importPath[1]).toBe(AppModule);
        expect(myServiceProvider.importPath[2]).toBe(ModuleD);
        expect(myServiceProvider.importPath[3]).toBe(ModuleB);
        expect(myServiceProvider.importPath[4]).toBe(ModuleA);
        expect(myServiceBProvider.importPath).toBeInstanceOf(Array);
        expect(myServiceBProvider.importPath.length).toBe(4);
        expect(myServiceBProvider.importPath[0]).toBe(testModuleType);
        expect(myServiceBProvider.importPath[1]).toBe(AppModule);
        expect(myServiceBProvider.importPath[2]).toBe(ModuleD);
        expect(myServiceBProvider.importPath[3]).toBe(ModuleC);
    });
    it('should be able to determine import paths after module provider flattening in the standalone component case', () => {
        //            ┌────────────────────imports───────────────────────┐
        //            │                                                  │
        //            │ ┌───────imports────────┐                         │
        //            │ │                      │                         │
        //            │ │                      │                         │
        //  ┌─────────┴─┴─────────┐  ┌─────────▼────────────┐ ┌──────────▼───────────┐
        //  │MyStandaloneComponent│  │MyStandaloneComponentB│ │MyStandaloneComponentC│
        //  └──────────┬──────────┘  └──────────┬────┬──────┘ └────┬────────┬────────┘
        //             │                        │    │             │        │
        //             └──imports─┐     ┌imports┘    └────┐        │        │
        //                        │     │                 │        │     imports
        //                       ┌▼─────▼┐             imports     │        │
        //                  ┌────┤ModuleD├─────┐          │     imports     │
        //               imports └───────┘     │          │        │    ┌───▼────────┐
        //                  │                imports   ┌──▼─────┐  │    │ ModuleE    │
        //               ┌──▼────┐             │       │ModuleF │  │    │-MyServiceC │
        //               │ModuleB│             │       └────────┘  │    └────────────┘
        //               └──┬────┘       ┌─────▼─────┐             │
        //               imports         │ ModuleC   │             │
        //             ┌────▼─────┐      │-MyServiceB│◄────────────┘
        //             │ ModuleA  │      └───────────┘
        //             │-MyService│
        //             └──────────┘
        class MyService {
        }
        class MyServiceB {
        }
        class MyServiceC {
        }
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyService] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [ModuleA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        let ModuleC = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyServiceB] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleC = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleC");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleC = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleC = _classThis;
        })();
        let ModuleD = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [ModuleB, ModuleC],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleD = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleD");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleD = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleD = _classThis;
        })();
        let ModuleE = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [MyServiceC],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleE = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleE");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleE = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleE = _classThis;
        })();
        let ModuleF = (() => {
            let _classDecorators = [(0, core_1.NgModule)({})];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleF = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleF");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleF = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleF = _classThis;
        })();
        let MyStandaloneComponentC = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp-c',
                    template: 'hello world',
                    imports: [ModuleE, ModuleC],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComponentC = _classThis = class {
            };
            __setFunctionName(_classThis, "MyStandaloneComponentC");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponentC = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponentC = _classThis;
        })();
        let MyStandaloneComponentB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp-b',
                    template: 'hello world',
                    imports: [ModuleD, ModuleF],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComponentB = _classThis = class {
            };
            __setFunctionName(_classThis, "MyStandaloneComponentB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponentB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponentB = _classThis;
        })();
        let MyStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `
         <my-comp-b/>
         <my-comp-c/>
        `,
                    imports: [ModuleD, MyStandaloneComponentB, MyStandaloneComponentC],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MyStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponent = _classThis;
        })();
        const root = test_bed_1.TestBed.createComponent(MyStandaloneComponent);
        root.detectChanges();
        const appComponentEnvironmentInjector = root.componentRef.injector.get(r3_injector_1.EnvironmentInjector);
        const providers = (0, injector_discovery_utils_1.getInjectorProviders)(appComponentEnvironmentInjector);
        // There are 2 paths from MyStandaloneComponent to MyService
        //
        // path 1: MyStandaloneComponent -> ModuleD => ModuleB -> ModuleA
        // path 2: MyStandaloneComponent -> MyStandaloneComponentB -> ModuleD => ModuleB -> ModuleA
        //
        // Angular discovers this provider through the first path it visits
        // during it's postorder traversal (in this case path 1). Therefore
        // we expect myServiceProvider.importPath to have 4 DI containers
        //
        const myServiceProvider = providers.find((provider) => provider.token === MyService);
        expect(myServiceProvider).toBeTruthy();
        expect(myServiceProvider.importPath).toBeInstanceOf(Array);
        expect(myServiceProvider.importPath.length).toBe(4);
        expect(myServiceProvider.importPath[0]).toBe(MyStandaloneComponent);
        expect(myServiceProvider.importPath[1]).toBe(ModuleD);
        expect(myServiceProvider.importPath[2]).toBe(ModuleB);
        expect(myServiceProvider.importPath[3]).toBe(ModuleA);
        // Similarly to above there are multiple paths from MyStandaloneComponent MyServiceB
        //
        // path 1: MyStandaloneComponent -> ModuleD => ModuleC
        // path 2: MyStandaloneComponent -> MyStandaloneComponentB -> ModuleD => ModuleC
        // path 3: MyStandaloneComponent -> MyStandaloneComponentC -> ModuleC
        //
        // Angular discovers this provider through the first path it visits
        // during it's postorder traversal (in this case path 1). Therefore
        // we expect myServiceProvider.importPath to have 4 DI containers
        //
        const myServiceBProvider = providers.find((provider) => provider.token === MyServiceB);
        expect(myServiceBProvider).toBeTruthy();
        expect(myServiceBProvider.importPath).toBeInstanceOf(Array);
        expect(myServiceBProvider.importPath.length).toBe(3);
        expect(myServiceBProvider.importPath[0]).toBe(MyStandaloneComponent);
        expect(myServiceBProvider.importPath[1]).toBe(ModuleD);
        expect(myServiceBProvider.importPath[2]).toBe(ModuleC);
    });
    it('should be able to determine import paths after module provider flattening in the standalone component case with lazy components', (0, testing_1.fakeAsync)(() => {
        class MyService {
        }
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyService] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let MyStandaloneComponentB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp-b',
                    template: 'hello world',
                    imports: [ModuleA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComponentB = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponentB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponentB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponentB = _classThis;
        })();
        let MyStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `<router-outlet/>`,
                    imports: [MyStandaloneComponentB, router_1.RouterOutlet],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _routerOutlet_decorators;
            let _routerOutlet_initializers = [];
            let _routerOutlet_extraInitializers = [];
            var MyStandaloneComponent = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                    this.routerOutlet = __runInitializers(this, _routerOutlet_initializers, void 0);
                    __runInitializers(this, _routerOutlet_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _routerOutlet_decorators = [(0, core_1.ViewChild)(router_1.RouterOutlet)];
                __esDecorate(null, null, _routerOutlet_decorators, { kind: "field", name: "routerOutlet", static: false, private: false, access: { has: obj => "routerOutlet" in obj, get: obj => obj.routerOutlet, set: (obj, value) => { obj.routerOutlet = value; } }, metadata: _metadata }, _routerOutlet_initializers, _routerOutlet_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            imports: [
                router_1.RouterModule.forRoot([
                    {
                        path: 'lazy',
                        loadComponent: () => MyStandaloneComponentB,
                    },
                ]),
            ],
        });
        const root = test_bed_1.TestBed.createComponent(MyStandaloneComponent);
        test_bed_1.TestBed.inject(router_1.Router).navigateByUrl('/lazy');
        (0, testing_1.tick)();
        root.detectChanges();
        const myStandaloneComponentNodeInjector = root.componentRef.injector;
        const myStandaloneComponentEnvironmentInjector = myStandaloneComponentNodeInjector.get(r3_injector_1.EnvironmentInjector);
        const myStandalonecomponentB = root.componentRef.instance.routerOutlet
            .component;
        const myComponentBNodeInjector = myStandalonecomponentB.injector;
        const myComponentBEnvironmentInjector = myComponentBNodeInjector.get(r3_injector_1.EnvironmentInjector);
        const myStandaloneComponentEnvironmentInjectorProviders = (0, injector_discovery_utils_1.getInjectorProviders)(myStandaloneComponentEnvironmentInjector);
        const myComponentBEnvironmentInjectorProviders = (0, injector_discovery_utils_1.getInjectorProviders)(myComponentBEnvironmentInjector);
        // Lazy component should have its own environment injector and therefore different
        // providers
        expect(myStandaloneComponentEnvironmentInjectorProviders).not.toEqual(myComponentBEnvironmentInjectorProviders);
        const myServiceProviderRecord = myComponentBEnvironmentInjectorProviders.find((provider) => provider.token === MyService);
        expect(myServiceProviderRecord).toBeTruthy();
        expect(myServiceProviderRecord.importPath).toBeInstanceOf(Array);
        expect(myServiceProviderRecord.importPath.length).toBe(2);
        expect(myServiceProviderRecord.importPath[0]).toBe(MyStandaloneComponentB);
        expect(myServiceProviderRecord.importPath[1]).toBe(ModuleA);
    }));
    it('should be able to determine providers in a lazy route that has providers', (0, testing_1.fakeAsync)(() => {
        class MyService {
        }
        let MyStandaloneComponentB = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'my-comp-b', template: 'hello world' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComponentB = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponentB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponentB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponentB = _classThis;
        })();
        let MyStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `<router-outlet/>`,
                    imports: [MyStandaloneComponentB, router_1.RouterOutlet],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _routerOutlet_decorators;
            let _routerOutlet_initializers = [];
            let _routerOutlet_extraInitializers = [];
            var MyStandaloneComponent = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                    this.routerOutlet = __runInitializers(this, _routerOutlet_initializers, void 0);
                    __runInitializers(this, _routerOutlet_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _routerOutlet_decorators = [(0, core_1.ViewChild)(router_1.RouterOutlet)];
                __esDecorate(null, null, _routerOutlet_decorators, { kind: "field", name: "routerOutlet", static: false, private: false, access: { has: obj => "routerOutlet" in obj, get: obj => obj.routerOutlet, set: (obj, value) => { obj.routerOutlet = value; } }, metadata: _metadata }, _routerOutlet_initializers, _routerOutlet_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            imports: [
                router_1.RouterModule.forRoot([
                    {
                        path: 'lazy',
                        loadComponent: () => MyStandaloneComponentB,
                        providers: [MyService],
                    },
                ]),
            ],
        });
        const root = test_bed_1.TestBed.createComponent(MyStandaloneComponent);
        test_bed_1.TestBed.inject(router_1.Router).navigateByUrl('/lazy');
        (0, testing_1.tick)();
        root.detectChanges();
        const myStandalonecomponentB = root.componentRef.instance.routerOutlet
            .component;
        const routeEnvironmentInjector = myStandalonecomponentB.injector.get(r3_injector_1.EnvironmentInjector);
        expect(routeEnvironmentInjector).toBeTruthy();
        expect(routeEnvironmentInjector.source).toBeTruthy();
        expect(routeEnvironmentInjector.source.startsWith('Route:')).toBeTrue();
        const myComponentBEnvironmentInjectorProviders = (0, injector_discovery_utils_1.getInjectorProviders)(routeEnvironmentInjector);
        const myServiceProviderRecord = myComponentBEnvironmentInjectorProviders.find((provider) => provider.token === MyService);
        expect(myServiceProviderRecord).toBeTruthy();
        expect(myServiceProviderRecord.provider).toBe(MyService);
        expect(myServiceProviderRecord.token).toBe(MyService);
    }));
    it('should be able to determine providers in an injector that was created manually', (0, testing_1.fakeAsync)(() => {
        class MyService {
        }
        const injector = core_1.Injector.create({ providers: [MyService] });
        const providers = (0, injector_discovery_utils_1.getInjectorProviders)(injector);
        expect(providers.length).toBe(1);
        expect(providers[0].token).toBe(MyService);
        expect(providers[0].provider).toBe(MyService);
    }));
    it('should be able to get injector providers for element injectors created by components rendering in an ngFor', () => {
        class MyService {
        }
        let ItemComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'item-cmp', template: 'item', providers: [MyService] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ItemComponent = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                }
            };
            __setFunctionName(_classThis, "ItemComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ItemComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ItemComponent = _classThis;
        })();
        let MyStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `
        <item-cmp *ngFor="let item of items"></item-cmp>
       `,
                    imports: [ItemComponent, common_1.NgForOf],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _itemComponents_decorators;
            let _itemComponents_initializers = [];
            let _itemComponents_extraInitializers = [];
            var MyStandaloneComponent = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                    this.items = [1, 2, 3];
                    this.itemComponents = __runInitializers(this, _itemComponents_initializers, void 0);
                    __runInitializers(this, _itemComponents_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _itemComponents_decorators = [(0, core_1.ViewChildren)(ItemComponent)];
                __esDecorate(null, null, _itemComponents_decorators, { kind: "field", name: "itemComponents", static: false, private: false, access: { has: obj => "itemComponents" in obj, get: obj => obj.itemComponents, set: (obj, value) => { obj.itemComponents = value; } }, metadata: _metadata }, _itemComponents_initializers, _itemComponents_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponent = _classThis;
        })();
        const root = test_bed_1.TestBed.createComponent(MyStandaloneComponent);
        root.detectChanges();
        const myStandaloneComponent = root.componentRef.instance;
        const itemComponents = myStandaloneComponent.itemComponents;
        expect(itemComponents).toBeInstanceOf(core_1.QueryList);
        expect(itemComponents === null || itemComponents === void 0 ? void 0 : itemComponents.length).toBe(3);
        itemComponents.forEach((item) => {
            const itemProviders = (0, injector_discovery_utils_1.getInjectorProviders)(item.injector);
            expect(itemProviders).toBeInstanceOf(Array);
            expect(itemProviders.length).toBe(1);
            expect(itemProviders[0].token).toBe(MyService);
            expect(itemProviders[0].provider).toBe(MyService);
            expect(itemProviders[0].isViewProvider).toBe(false);
        });
    });
    it('should be able to get injector providers for element injectors created by components rendering in a @for', () => {
        class MyService {
        }
        let ItemComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'item-cmp', template: 'item', providers: [MyService] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ItemComponent = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                }
            };
            __setFunctionName(_classThis, "ItemComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ItemComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ItemComponent = _classThis;
        })();
        let MyStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `
        @for (item of items; track item) {
          <item-cmp></item-cmp>
        }
       `,
                    imports: [ItemComponent],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _itemComponents_decorators;
            let _itemComponents_initializers = [];
            let _itemComponents_extraInitializers = [];
            var MyStandaloneComponent = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                    this.items = [1, 2, 3];
                    this.itemComponents = __runInitializers(this, _itemComponents_initializers, void 0);
                    __runInitializers(this, _itemComponents_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _itemComponents_decorators = [(0, core_1.ViewChildren)(ItemComponent)];
                __esDecorate(null, null, _itemComponents_decorators, { kind: "field", name: "itemComponents", static: false, private: false, access: { has: obj => "itemComponents" in obj, get: obj => obj.itemComponents, set: (obj, value) => { obj.itemComponents = value; } }, metadata: _metadata }, _itemComponents_initializers, _itemComponents_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponent = _classThis;
        })();
        const root = test_bed_1.TestBed.createComponent(MyStandaloneComponent);
        root.detectChanges();
        const myStandaloneComponent = root.componentRef.instance;
        const itemComponents = myStandaloneComponent.itemComponents;
        expect(itemComponents).toBeInstanceOf(core_1.QueryList);
        expect(itemComponents === null || itemComponents === void 0 ? void 0 : itemComponents.length).toBe(3);
        itemComponents.forEach((item) => {
            const itemProviders = (0, injector_discovery_utils_1.getInjectorProviders)(item.injector);
            expect(itemProviders).toBeInstanceOf(Array);
            expect(itemProviders.length).toBe(1);
            expect(itemProviders[0].token).toBe(MyService);
            expect(itemProviders[0].provider).toBe(MyService);
            expect(itemProviders[0].isViewProvider).toBe(false);
        });
    });
});
describe('getDependenciesFromInjectable', () => {
    beforeEach(() => {
        (0, injector_profiler_1.setInjectorProfiler)(null);
        (0, framework_injector_profiler_1.setupFrameworkInjectorProfiler)();
    });
    afterEach(() => (0, injector_profiler_1.setInjectorProfiler)(null));
    it('should be able to determine which injector dependencies come from', (0, testing_1.fakeAsync)(() => {
        class MyService {
        }
        class MyServiceB {
        }
        class MyServiceC {
        }
        class MyServiceD {
        }
        class MyServiceG {
        }
        class MyServiceH {
        }
        const myInjectionToken = new core_1.InjectionToken('myInjectionToken');
        const myServiceCInstance = new MyServiceC();
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [
                        MyService,
                        { provide: MyServiceB, useValue: 'hello world' },
                        { provide: MyServiceC, useFactory: () => 123 },
                        { provide: myInjectionToken, useValue: myServiceCInstance },
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let MyStandaloneDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[my-directive]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneDirective = _classThis = class {
                constructor() {
                    this.serviceFromHost = (0, core_1.inject)(MyServiceH, { host: true, optional: true });
                    this.injector = (0, core_1.inject)(core_1.Injector);
                }
                ngOnInit() {
                    onMyStandaloneDirectiveCreated(this);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneDirective = _classThis;
        })();
        let MyStandaloneComponentC = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp-c',
                    template: 'hello world',
                    imports: [],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComponentC = _classThis = class {
            };
            __setFunctionName(_classThis, "MyStandaloneComponentC");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponentC = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponentC = _classThis;
        })();
        let MyStandaloneComponentB = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp-b',
                    template: '<my-comp-c my-directive/>',
                    imports: [MyStandaloneComponentC, MyStandaloneDirective],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComponentB = _classThis = class {
                constructor() {
                    this.myService = (0, core_1.inject)(MyService, { optional: true });
                    this.myServiceB = (0, core_1.inject)(MyServiceB, { optional: true });
                    this.myServiceC = (0, core_1.inject)(MyServiceC, { skipSelf: true, optional: true });
                    this.myInjectionTokenValue = (0, core_1.inject)(myInjectionToken, { optional: true });
                    this.injector = (0, core_1.inject)(core_1.Injector, { self: true, host: true });
                    this.myServiceD = (0, core_1.inject)(MyServiceD);
                    this.myServiceG = (0, core_1.inject)(MyServiceG);
                    this.parentComponent = (0, core_1.inject)(MyStandaloneComponent);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponentB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponentB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponentB = _classThis;
        })();
        let MyStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `<router-outlet/>`,
                    imports: [router_1.RouterOutlet, ModuleA],
                    providers: [MyServiceG, { provide: MyServiceH, useValue: 'MyStandaloneComponent' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _routerOutlet_decorators;
            let _routerOutlet_initializers = [];
            let _routerOutlet_extraInitializers = [];
            var MyStandaloneComponent = _classThis = class {
                constructor() {
                    this.injector = (0, core_1.inject)(core_1.Injector);
                    this.routerOutlet = __runInitializers(this, _routerOutlet_initializers, void 0);
                    __runInitializers(this, _routerOutlet_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _routerOutlet_decorators = [(0, core_1.ViewChild)(router_1.RouterOutlet)];
                __esDecorate(null, null, _routerOutlet_decorators, { kind: "field", name: "routerOutlet", static: false, private: false, access: { has: obj => "routerOutlet" in obj, get: obj => obj.routerOutlet, set: (obj, value) => { obj.routerOutlet = value; } }, metadata: _metadata }, _routerOutlet_initializers, _routerOutlet_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            providers: [{ provide: MyServiceD, useValue: '123' }],
            imports: [
                router_1.RouterModule.forRoot([{ path: 'lazy', loadComponent: () => MyStandaloneComponentB }]),
            ],
        });
        const root = test_bed_1.TestBed.createComponent(MyStandaloneComponent);
        test_bed_1.TestBed.inject(router_1.Router).navigateByUrl('/lazy');
        (0, testing_1.tick)();
        root.detectChanges();
        const myStandalonecomponentB = root.componentRef.instance.routerOutlet
            .component;
        const { dependencies: dependenciesOfMyStandaloneComponentB } = (0, injector_discovery_utils_1.getDependenciesFromInjectable)(myStandalonecomponentB.injector, MyStandaloneComponentB);
        const standaloneInjector = root.componentInstance.injector.get(r3_injector_1.EnvironmentInjector);
        expect(dependenciesOfMyStandaloneComponentB).toBeInstanceOf(Array);
        expect(dependenciesOfMyStandaloneComponentB.length).toBe(8);
        const myServiceDep = dependenciesOfMyStandaloneComponentB[0];
        const myServiceBDep = dependenciesOfMyStandaloneComponentB[1];
        const myServiceCDep = dependenciesOfMyStandaloneComponentB[2];
        const myInjectionTokenValueDep = dependenciesOfMyStandaloneComponentB[3];
        const injectorDep = dependenciesOfMyStandaloneComponentB[4];
        const myServiceDDep = dependenciesOfMyStandaloneComponentB[5];
        const myServiceGDep = dependenciesOfMyStandaloneComponentB[6];
        const parentComponentDep = dependenciesOfMyStandaloneComponentB[7];
        expect(myServiceDep.token).toBe(MyService);
        expect(myServiceBDep.token).toBe(MyServiceB);
        expect(myServiceCDep.token).toBe(MyServiceC);
        expect(myInjectionTokenValueDep.token).toBe(myInjectionToken);
        expect(injectorDep.token).toBe(core_1.Injector);
        expect(myServiceDDep.token).toBe(MyServiceD);
        expect(myServiceGDep.token).toBe(MyServiceG);
        expect(parentComponentDep.token).toBe(MyStandaloneComponent);
        expect(dependenciesOfMyStandaloneComponentB[0].flags).toEqual({
            optional: true,
            skipSelf: false,
            self: false,
            host: false,
        });
        expect(myServiceBDep.flags).toEqual({
            optional: true,
            skipSelf: false,
            self: false,
            host: false,
        });
        expect(myServiceCDep.flags).toEqual({
            optional: true,
            skipSelf: true,
            self: false,
            host: false,
        });
        expect(myInjectionTokenValueDep.flags).toEqual({
            optional: true,
            skipSelf: false,
            self: false,
            host: false,
        });
        expect(injectorDep.flags).toEqual({
            optional: false,
            skipSelf: false,
            self: true,
            host: true,
        });
        expect(myServiceDDep.flags).toEqual({
            optional: false,
            skipSelf: false,
            self: false,
            host: false,
        });
        expect(myServiceGDep.flags).toEqual({
            optional: false,
            skipSelf: false,
            self: false,
            host: false,
        });
        expect(parentComponentDep.flags).toEqual({
            optional: false,
            skipSelf: false,
            self: false,
            host: false,
        });
        expect(dependenciesOfMyStandaloneComponentB[0].value).toBe(myStandalonecomponentB.myService);
        expect(myServiceBDep.value).toBe(null);
        expect(myServiceCDep.value).toBe(null);
        expect(myInjectionTokenValueDep.value).toBe(null);
        expect(injectorDep.value).toBe(myStandalonecomponentB.injector);
        expect(myServiceDDep.value).toBe('123');
        expect(myServiceGDep.value).toBe(myStandalonecomponentB.myServiceG);
        expect(parentComponentDep.value).toBe(myStandalonecomponentB.parentComponent);
        expect(dependenciesOfMyStandaloneComponentB[0].providedIn).toBe(undefined);
        expect(myServiceBDep.providedIn).toBe(undefined);
        expect(myServiceCDep.providedIn).toBe(undefined);
        expect(myInjectionTokenValueDep.providedIn).toBe(undefined);
        expect(injectorDep.providedIn).toBe(myStandalonecomponentB.injector);
        expect(myServiceDDep.providedIn).toBe(standaloneInjector.get(core_1.Injector, null, {
            skipSelf: true,
        }));
        expect((0, di_1.getNodeInjectorLView)(myServiceGDep.providedIn)).toBe((0, di_1.getNodeInjectorLView)(myStandalonecomponentB.parentComponent.injector));
        function onMyStandaloneDirectiveCreated(myStandaloneDirective) {
            const injector = myStandaloneDirective.injector;
            const deps = (0, injector_discovery_utils_1.getDependenciesFromInjectable)(injector, MyStandaloneDirective);
            expect(deps).not.toBeNull();
            expect(deps.dependencies.length).toBe(2); // MyServiceH, Injector
            expect(deps.dependencies[0].token).toBe(MyServiceH);
            expect(deps.dependencies[0].flags).toEqual({
                optional: true,
                host: true,
                self: false,
                skipSelf: false,
            });
            // The NodeInjector that provides MyService is not in the host path of this injector.
            expect(deps.dependencies[0].providedIn).toBeUndefined();
        }
    }));
    it('should be able to recursively determine dependencies of dependencies by using the providedIn field', (0, testing_1.fakeAsync)(() => {
        let MyService = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyService = _classThis = class {
                constructor() {
                    this.myServiceB = (0, core_1.inject)(MyServiceB);
                }
            };
            __setFunctionName(_classThis, "MyService");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyService = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyService = _classThis;
        })();
        let MyServiceB = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyServiceB = _classThis = class {
                constructor() {
                    this.router = (0, core_1.inject)(router_1.Router);
                }
            };
            __setFunctionName(_classThis, "MyServiceB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyServiceB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyServiceB = _classThis;
        })();
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyService] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ imports: [ModuleA] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        let ModuleC = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyServiceB] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleC = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleC");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleC = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleC = _classThis;
        })();
        let ModuleD = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ imports: [ModuleB, ModuleC] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleD = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleD");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleD = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleD = _classThis;
        })();
        let MyStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ selector: 'my-comp', template: 'hello world', imports: [ModuleD] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComponent = _classThis = class {
                constructor() {
                    this.myService = (0, core_1.inject)(MyService);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({ imports: [router_1.RouterModule] });
        const root = test_bed_1.TestBed.createComponent(MyStandaloneComponent);
        const { instance, dependencies } = (0, injector_discovery_utils_1.getDependenciesFromInjectable)(root.componentRef.injector, root.componentRef.componentType);
        const standaloneInjector = root.componentRef.injector.get(r3_injector_1.EnvironmentInjector);
        expect(instance).toBeInstanceOf(MyStandaloneComponent);
        expect(dependencies).toBeInstanceOf(Array);
        expect(dependencies.length).toBe(1);
        const myServiceDependency = dependencies[0];
        expect(myServiceDependency.token).toBe(MyService);
        expect(myServiceDependency.value).toBe(instance.myService);
        expect(myServiceDependency.flags).toEqual({
            optional: false,
            skipSelf: false,
            self: false,
            host: false,
        });
        expect(myServiceDependency.providedIn).toBe(standaloneInjector);
        const { instance: myServiceInstance, dependencies: myServiceDependencies } = (0, injector_discovery_utils_1.getDependenciesFromInjectable)(myServiceDependency.providedIn, myServiceDependency.token);
        expect(myServiceDependencies).toBeInstanceOf(Array);
        expect(myServiceDependencies.length).toBe(1);
        const myServiceBDependency = myServiceDependencies[0];
        expect(myServiceBDependency.token).toBe(MyServiceB);
        expect(myServiceBDependency.value).toBe(myServiceInstance.myServiceB);
        expect(myServiceBDependency.flags).toEqual({
            optional: false,
            skipSelf: false,
            self: false,
            host: false,
        });
        expect(myServiceBDependency.providedIn).toBe(standaloneInjector);
        const { instance: myServiceBInstance, dependencies: myServiceBDependencies } = (0, injector_discovery_utils_1.getDependenciesFromInjectable)(myServiceBDependency.providedIn, myServiceBDependency.token);
        expect(myServiceBDependencies).toBeInstanceOf(Array);
        expect(myServiceBDependencies.length).toBe(1);
        const routerDependency = myServiceBDependencies[0];
        expect(routerDependency.token).toBe(router_1.Router);
        expect(routerDependency.value).toBe(myServiceBInstance.router);
        expect(routerDependency.flags).toEqual({
            optional: false,
            skipSelf: false,
            self: false,
            host: false,
        });
        expect(routerDependency.providedIn).toBe(standaloneInjector.parent);
    }));
});
describe('getInjectorResolutionPath', () => {
    beforeEach(() => {
        (0, injector_profiler_1.setInjectorProfiler)(null);
        (0, framework_injector_profiler_1.setupFrameworkInjectorProfiler)();
    });
    afterEach(() => (0, injector_profiler_1.setInjectorProfiler)(null));
    it('should be able to inspect injector hierarchy structure', (0, testing_1.fakeAsync)(() => {
        class MyServiceA {
        }
        let ModuleA = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyServiceA] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleA = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleA = _classThis;
        })();
        class MyServiceB {
        }
        let ModuleB = (() => {
            let _classDecorators = [(0, core_1.NgModule)({ providers: [MyServiceB] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ModuleB = _classThis = class {
            };
            __setFunctionName(_classThis, "ModuleB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ModuleB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ModuleB = _classThis;
        })();
        let LazyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'lazy-comp',
                    template: `lazy component`,
                    imports: [ModuleB],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var LazyComponent = _classThis = class {
                constructor() {
                    onLazyComponentCreated();
                }
            };
            __setFunctionName(_classThis, "LazyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LazyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LazyComponent = _classThis;
        })();
        let MyStandaloneComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [router_1.RouterOutlet, ModuleA],
                    template: `<router-outlet/>`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyStandaloneComponent = _classThis = class {
                constructor() {
                    this.nodeInjector = (0, core_1.inject)(core_1.Injector);
                    this.envInjector = (0, core_1.inject)(r3_injector_1.EnvironmentInjector);
                }
            };
            __setFunctionName(_classThis, "MyStandaloneComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyStandaloneComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyStandaloneComponent = _classThis;
        })();
        test_bed_1.TestBed.configureTestingModule({
            imports: [
                router_1.RouterModule.forRoot([
                    {
                        path: 'lazy',
                        loadComponent: () => LazyComponent,
                    },
                ]),
            ],
        });
        const root = test_bed_1.TestBed.createComponent(MyStandaloneComponent);
        test_bed_1.TestBed.inject(router_1.Router).navigateByUrl('/lazy');
        (0, testing_1.tick)();
        root.detectChanges();
        function onLazyComponentCreated() {
            const lazyComponentNodeInjector = (0, core_1.inject)(core_1.Injector);
            const lazyComponentEnvironmentInjector = (0, core_1.inject)(r3_injector_1.EnvironmentInjector);
            const routerOutletNodeInjector = (0, core_1.inject)(core_1.Injector, { skipSelf: true });
            const myStandaloneComponent = (0, core_1.inject)(MyStandaloneComponent);
            const myStandaloneComponentNodeInjector = myStandaloneComponent.nodeInjector;
            const path = (0, injector_discovery_utils_1.getInjectorResolutionPath)(lazyComponentNodeInjector);
            /**
             *
             * Here is a diagram of the injectors in our application:
             *
             *
             *
             *                                ┌────────────┐
             *                                │NullInjector│
             *                                └─────▲──────┘
             *                                      │
             *                         ┌────────────┴────────────────┐
             *                         │EnvironmentInjector(Platform)│
             *                         └────────────▲────────────────┘
             *                                      │
             *                         ┌────────────┴────────────┐
             *                         │EnvironmentInjector(Root)│
             *                         └───────────────▲─────────┘
             *                                         │
             *                                         │
             *                                         │
             *┌────────────────────────────────────┐  ┌─┴────────────────────────────────────────┐
             *│ NodeInjector(MyStandaloneComponent)├─►| EnvironmentInjector(MyStandaloneComponent│
             *└────────────────▲───────────────────┘  └────────────▲─────────────────────────────┘
             *                 │                                   │
             *                 │                                   │
             *                 │                                   │
             *    ┌────────────┴─────────────┐                     │
             *    │NodeInjector(RouterOutlet)├──────────┐          │
             *    └────────────▲─────────────┘          │          │
             *                 │                        │          │
             *                 │                        │          │
             *                 │                        │          │
             *                 │                        │          │
             *   ┌─────────────┴──────────────┐  ┌──────▼──────────┴────────────────┐
             *   │ NodeInjector(LazyComponent)├──►EnvironmentInjector(LazyComponent)│
             *   └────────────────────────────┘  └──────────────────────────────────┘
             *
             *
             *
             *
             *
             * The Resolution path if we start at NodeInjector(LazyComponent) should be
             * [
             *    NodeInjector[LazyComponent],
             *    NodeInjector[RouterOutlet],
             *    NodeInjector[MyStandaloneComponent],
             *    R3Injector[LazyComponent],
             *    R3Injector[Root],
             *    R3Injector[Platform],
             *    NullInjector
             * ]
             */
            expect(path.length).toBe(7);
            expect(path[0]).toBe(lazyComponentNodeInjector);
            expect(path[1]).toBeInstanceOf(di_1.NodeInjector);
            expect((0, di_1.getNodeInjectorLView)(path[1])).toBe((0, di_1.getNodeInjectorLView)(routerOutletNodeInjector));
            expect(path[2]).toBeInstanceOf(di_1.NodeInjector);
            expect((0, di_1.getNodeInjectorLView)(path[2])).toBe((0, di_1.getNodeInjectorLView)(myStandaloneComponentNodeInjector));
            expect(path[3]).toBeInstanceOf(r3_injector_1.R3Injector);
            expect(path[3]).toBe(lazyComponentEnvironmentInjector);
            expect(path[3].scopes.has('environment')).toBeTrue();
            expect(path[3].source).toBe('Standalone[LazyComponent]');
            expect(path[4]).toBeInstanceOf(r3_injector_1.R3Injector);
            expect(path[4].scopes.has('environment')).toBeTrue();
            expect(path[4].source).toBe('DynamicTestModule');
            expect(path[4].scopes.has('root')).toBeTrue();
            expect(path[5]).toBeInstanceOf(r3_injector_1.R3Injector);
            expect(path[5].scopes.has('platform')).toBeTrue();
            expect(path[6]).toBeInstanceOf(null_injector_1.NullInjector);
        }
    }));
});
