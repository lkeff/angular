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
const di_1 = require("../../../src/di");
const injector_compatibility_1 = require("../../../src/di/injector_compatibility");
describe('Factory declaration jit compilation', () => {
    let previousInjector;
    let previousInjectorProfilerContext;
    beforeEach(() => {
        const injector = new injector_compatibility_1.RetrievingInjector((0, core_1.ɵcreateInjector)(TestInjector));
        previousInjector = (0, injector_compatibility_1.setCurrentInjector)(injector);
        previousInjectorProfilerContext = (0, core_1.ɵsetInjectorProfilerContext)({
            injector: injector.injector,
            token: null,
        });
    });
    afterEach(() => {
        (0, injector_compatibility_1.setCurrentInjector)(previousInjector);
        previousInjectorProfilerContext = (0, core_1.ɵsetInjectorProfilerContext)(previousInjectorProfilerContext);
    });
    it('should compile a simple factory declaration', () => {
        const factory = TestClass.ɵfac;
        expect(factory.name).toEqual('TestClass_Factory');
        const instance = factory();
        expect(instance).toBeInstanceOf(TestClass);
    });
    it('should compile a factory declaration with dependencies', () => {
        const factory = DependingClass.ɵfac;
        expect(factory.name).toEqual('DependingClass_Factory');
        const instance = factory();
        expect(instance).toBeInstanceOf(DependingClass);
        expect(instance.testClass).toBeInstanceOf(TestClass);
    });
    it('should compile a factory declaration that has inheritance', () => {
        const factory = ChildClass.ɵfac;
        const instance = factory();
        expect(instance).toBeInstanceOf(ChildClass);
        expect(instance.testClass).toBeInstanceOf(TestClass);
    });
    it('should compile a factory declaration with an invalid dependency', () => {
        const factory = InvalidDepsClass.ɵfac;
        expect(() => factory()).toThrowError(/not compatible/);
    });
});
class TestClass {
}
TestClass.ɵfac = (0, core_1.ɵɵngDeclareFactory)({ type: TestClass, deps: [], target: core_1.ɵɵFactoryTarget.Injectable });
class DependingClass {
    constructor(testClass) {
        this.testClass = testClass;
    }
}
DependingClass.ɵfac = (0, core_1.ɵɵngDeclareFactory)({
    type: DependingClass,
    deps: [{ token: TestClass }],
    target: core_1.ɵɵFactoryTarget.Injectable,
});
class ChildClass extends DependingClass {
}
ChildClass.ɵfac = (0, core_1.ɵɵngDeclareFactory)({
    type: ChildClass,
    deps: null,
    target: core_1.ɵɵFactoryTarget.Injectable,
});
class InvalidDepsClass {
}
InvalidDepsClass.ɵfac = (0, core_1.ɵɵngDeclareFactory)({
    type: InvalidDepsClass,
    deps: 'invalid',
    target: core_1.ɵɵFactoryTarget.Injectable,
});
class TestInjector {
}
TestInjector.ɵinj = (0, di_1.ɵɵdefineInjector)({
    providers: [TestClass, DependingClass, ChildClass],
});
