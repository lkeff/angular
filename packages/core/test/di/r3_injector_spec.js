"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/core");
const create_injector_1 = require("../../src/di/create_injector");
describe('InjectorDef-based createInjector()', () => {
    class CircularA {
    }
    CircularA.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: CircularA,
        providedIn: null,
        factory: () => (0, core_1.ɵɵinject)(CircularB),
    });
    class CircularB {
    }
    CircularB.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: CircularB,
        providedIn: null,
        factory: () => (0, core_1.ɵɵinject)(CircularA),
    });
    class Service {
    }
    Service.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: Service,
        providedIn: null,
        factory: () => new Service(),
    });
    class OptionalService {
    }
    OptionalService.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: OptionalService,
        providedIn: null,
        factory: () => new OptionalService(),
    });
    class StaticService {
        constructor(dep) {
            this.dep = dep;
        }
    }
    const SERVICE_TOKEN = new core_1.InjectionToken('SERVICE_TOKEN');
    const STATIC_TOKEN = new core_1.InjectionToken('STATIC_TOKEN');
    const LOCALE = new core_1.InjectionToken('LOCALE');
    const PRIMITIVE_VALUE = new core_1.InjectionToken('PRIMITIVE_VALUE');
    const UNDEFINED_VALUE = new core_1.InjectionToken('UNDEFINED_VALUE');
    class ServiceWithDep {
        constructor(service) {
            this.service = service;
        }
    }
    ServiceWithDep.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: ServiceWithDep,
        providedIn: null,
        // ChildService is derived from ServiceWithDep, so the factory function here must do the right
        // thing and create an instance of the requested type if one is given.
        factory: (t) => new (t || ServiceWithDep)((0, core_1.ɵɵinject)(Service)),
    });
    class ServiceWithOptionalDep {
        constructor(service) {
            this.service = service;
        }
    }
    ServiceWithOptionalDep.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: ServiceWithOptionalDep,
        providedIn: null,
        factory: () => new ServiceWithOptionalDep((0, core_1.ɵɵinject)(OptionalService, 8 /* InternalInjectFlags.Optional */)),
    });
    class ServiceWithMissingDep {
        constructor(service) {
            this.service = service;
        }
    }
    ServiceWithMissingDep.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: ServiceWithMissingDep,
        providedIn: null,
        factory: () => new ServiceWithMissingDep((0, core_1.ɵɵinject)(Service)),
    });
    class ServiceWithMultiDep {
        constructor(locale) {
            this.locale = locale;
        }
    }
    ServiceWithMultiDep.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: ServiceWithMultiDep,
        providedIn: null,
        factory: () => new ServiceWithMultiDep((0, core_1.ɵɵinject)(LOCALE)),
    });
    class ServiceTwo {
    }
    ServiceTwo.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: ServiceTwo,
        providedIn: null,
        factory: () => new ServiceTwo(),
    });
    let deepServiceDestroyed = false;
    class DeepService {
        ngOnDestroy() {
            deepServiceDestroyed = true;
        }
    }
    DeepService.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: DeepService,
        providedIn: null,
        factory: () => new DeepService(),
    });
    let eagerServiceCreated = false;
    class EagerService {
        constructor() {
            eagerServiceCreated = true;
        }
    }
    EagerService.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: EagerService,
        providedIn: undefined,
        factory: () => new EagerService(),
    });
    let deepModuleCreated = false;
    class DeepModule {
        constructor(eagerService) {
            deepModuleCreated = true;
        }
        static safe() {
            return {
                ngModule: DeepModule,
                providers: [{ provide: DeepService }],
            };
        }
    }
    DeepModule.ɵfac = () => new DeepModule((0, core_1.ɵɵinject)(EagerService));
    DeepModule.ɵinj = (0, core_1.ɵɵdefineInjector)({
        imports: undefined,
        providers: [
            EagerService,
            {
                provide: DeepService,
                useFactory: () => {
                    throw new Error('Not overridden!');
                },
            },
        ],
    });
    class IntermediateModule {
    }
    IntermediateModule.ɵinj = (0, core_1.ɵɵdefineInjector)({
        imports: [DeepModule.safe()],
        providers: [],
    });
    class InjectorWithDep {
        constructor(service) {
            this.service = service;
        }
    }
    InjectorWithDep.ɵfac = () => new InjectorWithDep((0, core_1.ɵɵinject)(Service));
    InjectorWithDep.ɵinj = (0, core_1.ɵɵdefineInjector)({});
    class ChildService extends ServiceWithDep {
    }
    class AbstractService {
    }
    AbstractService.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: AbstractService,
        providedIn: null,
        factory: () => new AbstractServiceImpl(),
    });
    class AbstractServiceImpl extends AbstractService {
    }
    class Module {
    }
    Module.ɵinj = (0, core_1.ɵɵdefineInjector)({
        imports: [IntermediateModule],
        providers: [
            ChildService,
            ServiceWithDep,
            ServiceWithOptionalDep,
            ServiceWithMultiDep,
            { provide: LOCALE, multi: true, useValue: 'en' },
            { provide: LOCALE, multi: true, useValue: 'es' },
            { provide: PRIMITIVE_VALUE, useValue: 'foo' },
            { provide: UNDEFINED_VALUE, useValue: undefined },
            Service,
            { provide: SERVICE_TOKEN, useExisting: Service },
            CircularA,
            CircularB,
            { provide: STATIC_TOKEN, useClass: StaticService, deps: [Service] },
            InjectorWithDep,
            AbstractService,
        ],
    });
    const ABSTRACT_SERVICE_TOKEN_WITH_FACTORY = new core_1.InjectionToken('ABSTRACT_SERVICE_TOKEN', {
        providedIn: Module,
        factory: () => (0, core_1.ɵɵinject)(AbstractService),
    });
    class OtherModule {
    }
    OtherModule.ɵinj = (0, core_1.ɵɵdefineInjector)({
        imports: undefined,
        providers: [],
    });
    class ModuleWithMissingDep {
    }
    ModuleWithMissingDep.ɵinj = (0, core_1.ɵɵdefineInjector)({
        imports: undefined,
        providers: [ServiceWithMissingDep],
    });
    class NotAModule {
    }
    class ImportsNotAModule {
    }
    ImportsNotAModule.ɵinj = (0, core_1.ɵɵdefineInjector)({
        imports: [NotAModule],
        providers: [],
    });
    let scopedServiceDestroyed = false;
    class ScopedService {
        ngOnDestroy() {
            scopedServiceDestroyed = true;
        }
    }
    ScopedService.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: ScopedService,
        providedIn: Module,
        factory: () => new ScopedService(),
    });
    class WrongScopeService {
    }
    WrongScopeService.ɵprov = (0, core_1.ɵɵdefineInjectable)({
        token: WrongScopeService,
        providedIn: OtherModule,
        factory: () => new WrongScopeService(),
    });
    class MultiProviderA {
    }
    MultiProviderA.ɵinj = (0, core_1.ɵɵdefineInjector)({
        providers: [{ provide: LOCALE, multi: true, useValue: 'A' }],
    });
    class MultiProviderB {
    }
    MultiProviderB.ɵinj = (0, core_1.ɵɵdefineInjector)({
        providers: [{ provide: LOCALE, multi: true, useValue: 'B' }],
    });
    class WithProvidersTest {
    }
    WithProvidersTest.ɵinj = (0, core_1.ɵɵdefineInjector)({
        imports: [
            { ngModule: MultiProviderA, providers: [{ provide: LOCALE, multi: true, useValue: 'C' }] },
            MultiProviderB,
        ],
        providers: [],
    });
    let injector;
    beforeEach(() => {
        deepModuleCreated = eagerServiceCreated = deepServiceDestroyed = false;
        injector = (0, create_injector_1.createInjector)(Module);
    });
    it('initializes imported modules before the module being declared', () => {
        const moduleRegistrations = [];
        class ChildModule {
            constructor() {
                moduleRegistrations.push('ChildModule');
            }
        }
        ChildModule.ɵinj = (0, core_1.ɵɵdefineInjector)({
            imports: undefined,
            providers: [],
        });
        class RootModule {
            constructor() {
                moduleRegistrations.push('RootModule');
            }
        }
        RootModule.ɵinj = (0, core_1.ɵɵdefineInjector)({
            imports: [ChildModule],
            providers: [],
        });
        (0, create_injector_1.createInjector)(RootModule);
        expect(moduleRegistrations).toEqual(['ChildModule', 'RootModule']);
    });
    it('injects a simple class', () => {
        const instance = injector.get(Service);
        expect(instance instanceof Service).toBeTruthy();
        expect(injector.get(Service)).toBe(instance);
    });
    it("returns the default value if a provider isn't present", () => {
        expect(injector.get(ServiceTwo, null)).toBeNull();
    });
    it('should throw when no provider defined', () => {
        expect(() => injector.get(ServiceTwo)).toThrowError(`R3InjectorError(Module)[ServiceTwo]: \n` +
            `  NullInjectorError: No provider for ServiceTwo!`);
    });
    it('should throw without the module name when no module', () => {
        const injector = (0, create_injector_1.createInjector)([ServiceTwo]);
        expect(() => injector.get(ServiceTwo)).toThrowError(`R3InjectorError[ServiceTwo]: \n` + `  NullInjectorError: No provider for ServiceTwo!`);
    });
    it('should throw with the full path when no provider', () => {
        const injector = (0, create_injector_1.createInjector)(ModuleWithMissingDep);
        expect(() => injector.get(ServiceWithMissingDep)).toThrowError(`R3InjectorError(ModuleWithMissingDep)[ServiceWithMissingDep -> Service]: \n` +
            `  NullInjectorError: No provider for Service!`);
    });
    it('injects a service with dependencies', () => {
        const instance = injector.get(ServiceWithDep);
        expect(instance instanceof ServiceWithDep).toBeTrue();
        expect(instance.service).toBe(injector.get(Service));
    });
    it('injects a service with optional dependencies', () => {
        const instance = injector.get(ServiceWithOptionalDep);
        expect(instance instanceof ServiceWithOptionalDep).toBeTrue();
        expect(instance.service).toBe(null);
    });
    it('injects a service with dependencies on multi-providers', () => {
        const instance = injector.get(ServiceWithMultiDep);
        expect(instance instanceof ServiceWithMultiDep).toBeTrue();
        expect(instance.locale).toEqual(['en', 'es']);
    });
    it('should process "InjectionTypeWithProviders" providers after imports injection type', () => {
        injector = (0, create_injector_1.createInjector)(WithProvidersTest);
        expect(injector.get(LOCALE)).toEqual(['A', 'B', 'C']);
    });
    it('injects an injector with dependencies', () => {
        const instance = injector.get(InjectorWithDep);
        expect(instance instanceof InjectorWithDep).toBeTrue();
        expect(instance.service).toBe(injector.get(Service));
    });
    it('injects a token with useExisting', () => {
        const instance = injector.get(SERVICE_TOKEN);
        expect(instance).toBe(injector.get(Service));
    });
    it('injects a useValue token with a primitive value', () => {
        const value = injector.get(PRIMITIVE_VALUE);
        expect(value).toEqual('foo');
    });
    it('injects a useValue token with value undefined', () => {
        const value = injector.get(UNDEFINED_VALUE);
        expect(value).toBeUndefined();
    });
    it('instantiates a class with useClass and deps', () => {
        const instance = injector.get(STATIC_TOKEN);
        expect(instance instanceof StaticService).toBeTruthy();
        expect(instance.dep).toBe(injector.get(Service));
    });
    it('allows injecting itself via INJECTOR', () => {
        expect(injector.get(core_1.INJECTOR)).toBe(injector);
    });
    it('allows injecting itself via Injector', () => {
        expect(injector.get(core_1.Injector)).toBe(injector);
    });
    it('allows injecting a deeply imported service', () => {
        expect(injector.get(DeepService) instanceof DeepService).toBeTruthy();
    });
    it('allows injecting a scoped service', () => {
        const instance = injector.get(ScopedService);
        expect(instance instanceof ScopedService).toBeTruthy();
        expect(instance).toBe(injector.get(ScopedService));
    });
    it('allows injecting an inherited service', () => {
        const instance = injector.get(ChildService);
        expect(instance instanceof ChildService).toBe(true);
    });
    it('does not create instances of a service not in scope', () => {
        expect(injector.get(WrongScopeService, null)).toBeNull();
    });
    it('eagerly instantiates the injectordef types', () => {
        expect(deepModuleCreated).toBe(true, 'DeepModule not instantiated');
        expect(eagerServiceCreated).toBe(true, 'EagerSerivce not instantiated');
    });
    it('calls ngOnDestroy on services when destroyed', () => {
        injector.get(DeepService);
        expect(deepServiceDestroyed).toBe(false, 'DeepService already destroyed');
        injector.destroy();
        expect(deepServiceDestroyed).toBe(true, 'DeepService not destroyed');
    });
    it('calls ngOnDestroy on scoped providers', () => {
        injector.get(ScopedService);
        expect(scopedServiceDestroyed).toBe(false, 'ScopedService already destroyed');
        injector.destroy();
        expect(scopedServiceDestroyed).toBe(true, 'ScopedService not destroyed');
    });
    it('does not allow injection after destroy', () => {
        injector.destroy();
        expect(() => injector.get(DeepService)).toThrowError('NG0205: Injector has already been destroyed.');
    });
    it('does not allow double destroy', () => {
        injector.destroy();
        expect(() => injector.destroy()).toThrowError('NG0205: Injector has already been destroyed.');
    });
    it('should not crash when importing something that has no ɵinj', () => {
        injector = (0, create_injector_1.createInjector)(ImportsNotAModule);
        expect(injector.get(ImportsNotAModule)).toBeDefined();
    });
    it('injects an abstract class', () => {
        const instance = injector.get(AbstractService);
        expect(instance instanceof AbstractServiceImpl).toBeTruthy();
        expect(injector.get(AbstractService)).toBe(instance);
    });
    it('injects an abstract class in an InjectionToken factory', () => {
        const instance = injector.get(ABSTRACT_SERVICE_TOKEN_WITH_FACTORY);
        expect(instance instanceof AbstractServiceImpl).toBeTruthy();
        expect(injector.get(ABSTRACT_SERVICE_TOKEN_WITH_FACTORY)).toBe(instance);
    });
    describe('error handling', () => {
        it('throws an error when a token is not found', () => {
            expect(() => injector.get(ServiceTwo)).toThrow();
        });
        it('throws an error on circular deps', () => {
            expect(() => injector.get(CircularA)).toThrow();
        });
        it("should throw when it can't resolve all arguments", () => {
            class MissingArgumentType {
                constructor(missingType) { }
            }
            class ErrorModule {
            }
            ErrorModule.ɵinj = (0, core_1.ɵɵdefineInjector)({ providers: [MissingArgumentType] });
            expect(() => (0, create_injector_1.createInjector)(ErrorModule).get(MissingArgumentType)).toThrowError("NG0204: Can't resolve all parameters for MissingArgumentType: (?).");
        });
    });
});
