"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../../src/core");
const injector_compatibility_1 = require("../../../src/di/injector_compatibility");
describe('Injectable declaration jit compilation', () => {
    let previousInjector;
    let previousInjectorProfilerContext;
    beforeEach(() => {
        const injector = new injector_compatibility_1.RetrievingInjector((0, core_1.ɵcreateInjector)(TestInjector));
        previousInjector = (0, core_1.ɵsetCurrentInjector)(injector);
        previousInjectorProfilerContext = (0, core_1.ɵsetInjectorProfilerContext)({
            injector: injector.injector,
            token: null,
        });
    });
    afterEach(() => {
        (0, core_1.ɵsetCurrentInjector)(previousInjector);
        previousInjectorProfilerContext = (0, core_1.ɵsetInjectorProfilerContext)(previousInjectorProfilerContext);
    });
    it('should compile a minimal injectable declaration that delegates to `ɵfac`', () => {
        const provider = Minimal.ɵprov;
        expect(provider.token.name).toEqual('Minimal');
        expect(provider.factory).toBe(Minimal.ɵfac);
        const instance = provider.factory();
        expect(instance).toBeInstanceOf(Minimal);
    });
    it('should compile a simple `useClass` injectable declaration', () => {
        const provider = UseClass.ɵprov;
        expect(provider.token.name).toEqual('UseClass');
        const instance = provider.factory();
        expect(instance).toBeInstanceOf(UseClass);
    });
    it('should compile a simple `useFactory` injectable declaration', () => {
        const provider = UseFactory.ɵprov;
        expect(provider.token.name).toEqual('UseFactory');
        const instance = provider.factory();
        expect(instance).toBeInstanceOf(UseFactory);
        expect(instance.msg).toEqual('from factory');
    });
    it('should compile a simple `useValue` injectable declaration', () => {
        const provider = UseValue.ɵprov;
        expect(provider.token.name).toEqual('UseValue');
        const instance = provider.factory();
        expect(instance).toEqual('a value');
    });
    it('should compile a simple `useExisting` injectable declaration', () => {
        const provider = UseExisting.ɵprov;
        expect(provider.token.name).toEqual('UseExisting');
        const instance = provider.factory();
        expect(instance).toEqual('existing');
    });
    it('should compile a `useClass` injectable declaration with dependencies', () => {
        const provider = DependingClass.ɵprov;
        expect(provider.token.name).toEqual('DependingClass');
        const instance = provider.factory();
        expect(instance).toBeInstanceOf(DependingClass);
        expect(instance.testClass).toBeInstanceOf(UseClass);
    });
    it('should compile a `useFactory` injectable declaration with dependencies', () => {
        const provider = DependingFactory.ɵprov;
        expect(provider.token.name).toEqual('DependingFactory');
        const instance = provider.factory();
        expect(instance).toBeInstanceOf(DependingFactory);
        expect(instance.testClass).toBeInstanceOf(UseClass);
    });
    it('should unwrap a `ForwardRef` `useClass` injectable declaration', () => {
        class TestClass {
        }
        TestClass.ɵprov = (0, core_1.ɵɵngDeclareInjectable)({
            type: TestClass,
            useClass: (0, core_1.forwardRef)(function () {
                return FutureClass;
            }),
        });
        class FutureClass {
        }
        FutureClass.ɵfac = () => new FutureClass();
        const provider = TestClass.ɵprov;
        const instance = provider.factory();
        expect(instance).toBeInstanceOf(FutureClass);
    });
    it('should unwrap a `ForwardRef` `providedIn` injectable declaration', () => {
        const expected = {};
        class TestClass {
        }
        TestClass.ɵprov = (0, core_1.ɵɵngDeclareInjectable)({
            type: TestClass,
            providedIn: (0, core_1.forwardRef)(() => FutureModule),
            useValue: expected,
        });
        class FutureModule {
        }
        FutureModule.ɵinj = (0, core_1.ɵɵngDeclareInjector)({ type: FutureModule });
        const injector = (0, core_1.ɵcreateInjector)(FutureModule);
        const actual = injector.get(TestClass);
        expect(actual).toBe(expected);
    });
});
class Minimal {
}
Minimal.ɵfac = () => new Minimal();
Minimal.ɵprov = (0, core_1.ɵɵngDeclareInjectable)({ type: Minimal });
class UseClass {
}
UseClass.ɵprov = (0, core_1.ɵɵngDeclareInjectable)({ type: UseClass, useClass: UseClass });
class UseFactory {
    constructor(msg) {
        this.msg = msg;
    }
}
UseFactory.ɵprov = (0, core_1.ɵɵngDeclareInjectable)({
    type: UseFactory,
    useFactory: () => new UseFactory('from factory'),
});
class UseValue {
    constructor(msg) {
        this.msg = msg;
    }
}
UseValue.ɵprov = (0, core_1.ɵɵngDeclareInjectable)({ type: UseValue, useValue: 'a value' });
const UseExistingToken = new core_1.InjectionToken('UseExistingToken');
class UseExisting {
}
UseExisting.ɵprov = (0, core_1.ɵɵngDeclareInjectable)({ type: UseExisting, useExisting: UseExistingToken });
class DependingClass {
    constructor(testClass) {
        this.testClass = testClass;
    }
}
DependingClass.ɵprov = (0, core_1.ɵɵngDeclareInjectable)({
    type: DependingClass,
    useClass: DependingClass,
    deps: [{ token: UseClass }],
});
class DependingFactory {
    constructor(testClass) {
        this.testClass = testClass;
    }
}
DependingFactory.ɵprov = (0, core_1.ɵɵngDeclareInjectable)({
    type: DependingFactory,
    useFactory: (dep) => new DependingFactory(dep),
    deps: [{ token: UseClass }],
});
class TestInjector {
}
TestInjector.ɵinj = (0, core_1.ɵɵdefineInjector)({
    providers: [
        UseClass,
        UseFactory,
        UseValue,
        UseExisting,
        DependingClass,
        { provide: UseExistingToken, useValue: 'existing' },
    ],
});
