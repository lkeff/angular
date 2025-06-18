"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const constants_1 = require("../../../src/common/src/constants");
const common_test_helpers_1 = require("../../../src/common/test/helpers/common_test_helpers");
const create_angular_testing_module_1 = require("../src/create_angular_testing_module");
const mocks_1 = require("./mocks");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    describe('Angular entry point', () => {
        it('should allow us to get an upgraded AngularJS service from an Angular service', () => {
            (0, mocks_1.defineAppModule)();
            // Configure an NgModule that has the Angular and AngularJS injectors wired up
            testing_1.TestBed.configureTestingModule({ imports: [(0, create_angular_testing_module_1.createAngularTestingModule)(['app']), mocks_1.AppModule] });
            const inventory = testing_1.TestBed.inject(mocks_1.Inventory);
            expect(inventory.serverRequest).toBe(mocks_1.serverRequestInstance);
        });
        it('should create new injectors when we re-use the helper', () => {
            (0, mocks_1.defineAppModule)();
            testing_1.TestBed.configureTestingModule({ imports: [(0, create_angular_testing_module_1.createAngularTestingModule)(['app']), mocks_1.AppModule] });
            // Check that the injectors are wired up correctly
            testing_1.TestBed.inject(mocks_1.Inventory);
            // Grab references to the current injectors
            const injector = testing_1.TestBed.inject(core_1.Injector);
            const $injector = testing_1.TestBed.inject(constants_1.$INJECTOR);
            testing_1.TestBed.resetTestingModule();
            testing_1.TestBed.configureTestingModule({ imports: [(0, create_angular_testing_module_1.createAngularTestingModule)(['app']), mocks_1.AppModule] });
            // Check that the injectors are wired up correctly
            testing_1.TestBed.inject(mocks_1.Inventory);
            // Check that the new injectors are different to the previous ones.
            expect(testing_1.TestBed.inject(core_1.Injector)).not.toBe(injector);
            expect(testing_1.TestBed.inject(constants_1.$INJECTOR)).not.toBe($injector);
        });
    });
});
