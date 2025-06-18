"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const angular1_providers_1 = require("../src/angular1_providers");
describe('upgrade angular1_providers', () => {
    describe('compileFactory', () => {
        it('should retrieve and return `$compile`', () => {
            const services = { $compile: 'foo' };
            const mockInjector = { get: (name) => services[name], has: () => true };
            expect((0, angular1_providers_1.compileFactory)(mockInjector)).toBe('foo');
        });
    });
    describe('injectorFactory', () => {
        it('should return the injector value that was previously set', () => {
            const mockInjector = { get: () => undefined, has: () => false };
            (0, angular1_providers_1.setTempInjectorRef)(mockInjector);
            const injector = (0, angular1_providers_1.injectorFactory)();
            expect(injector).toBe(mockInjector);
        });
        it('should throw if the injector value is not set', () => {
            // Ensure the injector is not set. This shouldn't be necessary, but on CI there seems to be
            // some race condition with previous tests not being cleaned up properly.
            // Related:
            //   - https://github.com/angular/angular/pull/28045
            //   - https://github.com/angular/angular/pull/28181
            (0, angular1_providers_1.setTempInjectorRef)(null);
            expect(angular1_providers_1.injectorFactory).toThrowError();
        });
        it('should unset the injector after the first call (to prevent memory leaks)', () => {
            const mockInjector = { get: () => undefined, has: () => false };
            (0, angular1_providers_1.setTempInjectorRef)(mockInjector);
            (0, angular1_providers_1.injectorFactory)();
            expect(angular1_providers_1.injectorFactory).toThrowError(); // ...because it has been unset
        });
    });
    describe('parseFactory', () => {
        it('should retrieve and return `$parse`', () => {
            const services = { $parse: 'bar' };
            const mockInjector = { get: (name) => services[name], has: () => true };
            expect((0, angular1_providers_1.parseFactory)(mockInjector)).toBe('bar');
        });
    });
    describe('rootScopeFactory', () => {
        it('should retrieve and return `$rootScope`', () => {
            const services = { $rootScope: 'baz' };
            const mockInjector = { get: (name) => services[name], has: () => true };
            expect((0, angular1_providers_1.rootScopeFactory)(mockInjector)).toBe('baz');
        });
    });
});
