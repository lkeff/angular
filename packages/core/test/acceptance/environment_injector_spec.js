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
describe('environment injector', () => {
    it('should create and destroy an environment injector', () => {
        class Service {
        }
        let destroyed = false;
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([Service], parentEnvInjector);
        envInjector.onDestroy(() => (destroyed = true));
        const service = envInjector.get(Service);
        expect(service).toBeInstanceOf(Service);
        envInjector.destroy();
        expect(destroyed).toBeTrue();
    });
    it('should allow unregistration while destroying', () => {
        const destroyedLog = [];
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([], parentEnvInjector);
        const destroyRef = envInjector.get(core_1.DestroyRef);
        const unregister = destroyRef.onDestroy(() => {
            destroyedLog.push('first');
            unregister();
        });
        destroyRef.onDestroy(() => {
            destroyedLog.push('second');
        });
        expect(destroyedLog).toEqual([]);
        envInjector.destroy();
        expect(destroyedLog).toEqual(['first', 'second']);
    });
    it('should see providers from a parent EnvInjector', () => {
        class Service {
        }
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([], (0, core_1.createEnvironmentInjector)([Service], parentEnvInjector));
        expect(envInjector.get(Service)).toBeInstanceOf(Service);
    });
    it('should shadow providers from the parent EnvInjector', () => {
        const token = new core_1.InjectionToken('token');
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([{ provide: token, useValue: 'child' }], (0, core_1.createEnvironmentInjector)([{ provide: token, useValue: 'parent' }], parentEnvInjector));
        expect(envInjector.get(token)).toBe('child');
    });
    it('should expose the Injector token', () => {
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([], parentEnvInjector);
        expect(envInjector.get(core_1.Injector)).toBe(envInjector);
        expect(envInjector.get(core_1.INJECTOR)).toBe(envInjector);
    });
    it('should expose the EnvInjector token', () => {
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([], parentEnvInjector);
        expect(envInjector.get(core_1.EnvironmentInjector)).toBe(envInjector);
    });
    it('should expose the same object as both the Injector and EnvInjector token', () => {
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([], parentEnvInjector);
        expect(envInjector.get(core_1.Injector)).toBe(envInjector.get(core_1.EnvironmentInjector));
    });
    it('should expose the NgModuleRef token', () => {
        class Service {
        }
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const envInjector = (0, core_1.createEnvironmentInjector)([Service], parentEnvInjector);
        const ngModuleRef = envInjector.get(core_1.NgModuleRef);
        expect(ngModuleRef).toBeInstanceOf(core_1.NgModuleRef);
        // NgModuleRef proxies to an Injector holding supplied providers
        expect(ngModuleRef.injector.get(Service)).toBeInstanceOf(Service);
        // There is no actual instance of @NgModule-annotated class
        expect(ngModuleRef.instance).toBeNull();
    });
    it('should expose the ComponentFactoryResolver token bound to env injector with specified providers', () => {
        class Service {
        }
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-cmp',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor(service) {
                    this.service = service;
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
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const environmentInjector = (0, core_1.createEnvironmentInjector)([Service], parentEnvInjector);
        const cRef = (0, core_1.createComponent)(TestComponent, { environmentInjector });
        expect(cRef.instance.service).toBeInstanceOf(Service);
    });
    it('should support the ENVIRONMENT_INITIALIZER multi-token', () => {
        let initialized = false;
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        (0, core_1.createEnvironmentInjector)([
            {
                provide: core_1.ENVIRONMENT_INITIALIZER,
                useValue: () => (initialized = true),
                multi: true,
            },
        ], parentEnvInjector);
        expect(initialized).toBeTrue();
    });
    it('should throw when the ENVIRONMENT_INITIALIZER is not a multi-token', () => {
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const providers = [
            {
                provide: core_1.ENVIRONMENT_INITIALIZER,
                useValue: () => { },
            },
        ];
        expect(() => (0, core_1.createEnvironmentInjector)(providers, parentEnvInjector)).toThrowMatching((e) => e.code === -209 /* RuntimeErrorCode.INVALID_MULTI_PROVIDER */);
    });
    it('should adopt environment-scoped providers', () => {
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        const injector = (0, core_1.createEnvironmentInjector)([], parentEnvInjector);
        const EnvScopedToken = new core_1.InjectionToken('env-scoped token', {
            providedIn: 'environment',
            factory: () => true,
        });
        expect(injector.get(EnvScopedToken, false)).toBeTrue();
    });
    describe('runInContext()', () => {
        it("should return the function's return value", () => {
            const injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const returnValue = injector.runInContext(() => 3);
            expect(returnValue).toBe(3);
        });
        it('should work with an NgModuleRef injector', () => {
            const ref = testing_1.TestBed.inject(core_1.NgModuleRef);
            const returnValue = ref.injector.runInContext(() => 3);
            expect(returnValue).toBe(3);
        });
        it('should return correct injector reference', () => {
            const ngModuleRef = testing_1.TestBed.inject(core_1.NgModuleRef);
            const ref1 = ngModuleRef.injector.runInContext(() => (0, core_1.inject)(core_1.Injector));
            const ref2 = ngModuleRef.injector.get(core_1.Injector);
            expect(ref1).toBe(ref2);
        });
        it('should make inject() available', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            const injector = (0, core_1.createEnvironmentInjector)([{ provide: TOKEN, useValue: 'from injector' }], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            const result = injector.runInContext(() => (0, core_1.inject)(TOKEN));
            expect(result).toEqual('from injector');
        });
        it('should properly clean up after the function returns', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            const injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            injector.runInContext(() => { });
            expect(() => (0, core_1.inject)(TOKEN, { optional: true })).toThrow();
        });
        it('should properly clean up after the function throws', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN');
            const injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            expect(() => injector.runInContext(() => {
                throw new Error('crashes!');
            })).toThrow();
            expect(() => (0, core_1.inject)(TOKEN, { optional: true })).toThrow();
        });
        it('should set the correct inject implementation', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN', {
                providedIn: 'root',
                factory: () => 'from root',
            });
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        providers: [{ provide: TOKEN, useValue: 'from component' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.envInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
                        this.tokenFromComponent = (0, core_1.inject)(TOKEN);
                        this.tokenFromEnvContext = this.envInjector.runInContext(() => (0, core_1.inject)(TOKEN));
                        // Attempt to inject ViewContainerRef within the environment injector's context. This should
                        // not be available, so the result should be `null`.
                        this.vcrFromEnvContext = this.envInjector.runInContext(() => (0, core_1.inject)(core_1.ViewContainerRef, { optional: true }));
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
            const instance = testing_1.TestBed.createComponent(TestCmp).componentInstance;
            expect(instance.tokenFromComponent).toEqual('from component');
            expect(instance.tokenFromEnvContext).toEqual('from root');
            expect(instance.vcrFromEnvContext).toBeNull();
        });
        it('should be reentrant', () => {
            const TOKEN = new core_1.InjectionToken('TOKEN', {
                providedIn: 'root',
                factory: () => 'from root',
            });
            const parentInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
            const childInjector = (0, core_1.createEnvironmentInjector)([{ provide: TOKEN, useValue: 'from child' }], parentInjector);
            const results = parentInjector.runInContext(() => {
                const fromParentBefore = (0, core_1.inject)(TOKEN);
                const fromChild = childInjector.runInContext(() => (0, core_1.inject)(TOKEN));
                const fromParentAfter = (0, core_1.inject)(TOKEN);
                return { fromParentBefore, fromChild, fromParentAfter };
            });
            expect(results.fromParentBefore).toEqual('from root');
            expect(results.fromChild).toEqual('from child');
            expect(results.fromParentAfter).toEqual('from root');
        });
        it('should not function on a destroyed injector', () => {
            const injector = (0, core_1.createEnvironmentInjector)([], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            injector.destroy();
            expect(() => injector.runInContext(() => { })).toThrow();
        });
    });
});
describe(core_1.provideEnvironmentInitializer.name, () => {
    it('should not call the provided function before environment is initialized', () => {
        let initialized = false;
        (0, core_1.provideEnvironmentInitializer)(() => {
            initialized = true;
        });
        expect(initialized).toBe(false);
    });
    it('should call the provided function when environment is initialized', () => {
        let initialized = false;
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        (0, core_1.createEnvironmentInjector)([
            (0, core_1.provideEnvironmentInitializer)(() => {
                initialized = true;
            }),
        ], parentEnvInjector);
        expect(initialized).toBe(true);
    });
    it('should be able to inject dependencies', () => {
        const TEST_TOKEN = new core_1.InjectionToken('TEST_TOKEN', {
            providedIn: 'root',
            factory: () => 'test',
        });
        let injectedValue;
        const parentEnvInjector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        (0, core_1.createEnvironmentInjector)([
            (0, core_1.provideEnvironmentInitializer)(() => {
                injectedValue = (0, core_1.inject)(TEST_TOKEN);
            }),
        ], parentEnvInjector);
        expect(injectedValue).toBe('test');
    });
});
/**
 * Typing tests.
 */
let Test = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            // @ts-expect-error: `provideEnvironmentInitializer()` should not work with Component.providers,
            // as it wouldn't be executed anyway.
            providers: [(0, core_1.provideEnvironmentInitializer)(() => { })],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Test = _classThis = class {
    };
    __setFunctionName(_classThis, "Test");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Test = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Test = _classThis;
})();
