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
const component_tree_1 = require("./component-tree");
describe('component-tree', () => {
    afterEach(() => {
        delete globalThis.ng;
    });
    describe('getInjectorFromElementNode', () => {
        it('returns injector', () => {
            const injector = core_1.Injector.create({
                providers: [],
            });
            const ng = {
                getInjector: jasmine.createSpy('getInjector').and.returnValue(injector),
            };
            globalThis.ng = ng;
            const el = document.createElement('div');
            expect((0, component_tree_1.getInjectorFromElementNode)(el)).toBe(injector);
            expect(ng.getInjector).toHaveBeenCalledOnceWith(el);
        });
        it('returns `null` when `getInjector` is not supported', () => {
            globalThis.ng = {};
            const el = document.createElement('div');
            expect((0, component_tree_1.getInjectorFromElementNode)(el)).toBeNull();
        });
    });
});
