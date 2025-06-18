"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const angular1_1 = require("../../../src/common/src/angular1");
const common_test_helpers_1 = require("../../../src/common/test/helpers/common_test_helpers");
const create_angularjs_testing_module_1 = require("../src/create_angularjs_testing_module");
const mocks_1 = require("./mocks");
(0, common_test_helpers_1.withEachNg1Version)(() => {
    describe('AngularJS entry point', () => {
        it('should allow us to get a downgraded Angular service from an AngularJS service', () => {
            (0, mocks_1.defineAppModule)();
            // We have to get the `mock` object from the global `angular` variable, rather than trying to
            // import it from `@angular/upgrade/src/common/angular1`, because that file doesn't export
            // `ngMock` helpers.
            const { inject, module } = (0, angular1_1.getAngularJSGlobal)().mock;
            // Load the AngularJS bits of the application
            module('app');
            // Configure an AngularJS module that has the AngularJS and Angular injector wired up
            module((0, create_angularjs_testing_module_1.createAngularJSTestingModule)([mocks_1.AppModule]));
            let inventory = undefined;
            inject(function (shoppingCart) {
                inventory = shoppingCart.inventory;
            });
            expect(inventory).toEqual(jasmine.any(mocks_1.Inventory));
        });
    });
});
