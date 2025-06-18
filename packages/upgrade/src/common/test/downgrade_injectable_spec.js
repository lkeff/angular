"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../src/constants");
const downgrade_injectable_1 = require("../src/downgrade_injectable");
describe('downgradeInjectable', () => {
    const setupMockInjectors = (downgradedModule = '') => {
        const mockNg1Injector = jasmine.createSpyObj(['get', 'has']);
        mockNg1Injector.get.and.callFake((key) => mockDependencies[key]);
        mockNg1Injector.has.and.callFake((key) => mockDependencies.hasOwnProperty(key));
        const mockNg2Injector = jasmine.createSpyObj(['get']);
        mockNg2Injector.get.and.returnValue('service value');
        const mockDependencies = {
            [constants_1.UPGRADE_APP_TYPE_KEY]: downgradedModule ? 3 /* UpgradeAppType.Lite */ : 2 /* UpgradeAppType.Static */,
            [`${constants_1.INJECTOR_KEY}${downgradedModule}`]: mockNg2Injector,
        };
        return { mockNg1Injector, mockNg2Injector };
    };
    it('should return an AngularJS annotated factory for the token', () => {
        const factory = (0, downgrade_injectable_1.downgradeInjectable)('someToken');
        expect(factory).toEqual(jasmine.any(Function));
        expect(factory.$inject).toEqual([constants_1.$INJECTOR]);
        const { mockNg1Injector, mockNg2Injector } = setupMockInjectors();
        expect(factory(mockNg1Injector)).toEqual('service value');
        expect(mockNg2Injector.get).toHaveBeenCalledWith('someToken');
    });
    it("should inject the specified module's injector when specifying a module name", () => {
        const factory = (0, downgrade_injectable_1.downgradeInjectable)('someToken', 'someModule');
        expect(factory).toEqual(jasmine.any(Function));
        expect(factory.$inject).toEqual([constants_1.$INJECTOR]);
        const { mockNg1Injector, mockNg2Injector } = setupMockInjectors('someModule');
        expect(factory(mockNg1Injector)).toEqual('service value');
        expect(mockNg2Injector.get).toHaveBeenCalledWith('someToken');
    });
    it("should mention the injectable's name in the error thrown when failing to retrieve injectable", () => {
        const factory = (0, downgrade_injectable_1.downgradeInjectable)('someToken');
        expect(factory).toEqual(jasmine.any(Function));
        expect(factory.$inject).toEqual([constants_1.$INJECTOR]);
        const { mockNg1Injector, mockNg2Injector } = setupMockInjectors();
        mockNg2Injector.get.and.throwError('Mock failure');
        expect(() => factory(mockNg1Injector)).toThrowError(/^Error while instantiating injectable 'someToken': Mock failure/);
    });
});
