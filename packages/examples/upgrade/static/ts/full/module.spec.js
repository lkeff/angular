"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// #docregion angular-setup
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/upgrade/static/testing");
const module_1 = require("./module");
const { module, inject } = window.angular.mock;
// #enddocregion angular-setup
describe('HeroesService (from Angular)', () => {
    // #docregion angular-setup
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [(0, testing_2.createAngularTestingModule)([module_1.ng1AppModule.name]), module_1.Ng2AppModule],
        });
    });
    // #enddocregion angular-setup
    // #docregion angular-spec
    it('should have access to the HeroesService', () => {
        const heroesService = testing_1.TestBed.inject(module_1.HeroesService);
        expect(heroesService).toBeDefined();
    });
    // #enddocregion angular-spec
});
describe('HeroesService (from AngularJS)', () => {
    // #docregion angularjs-setup
    beforeEach(module((0, testing_2.createAngularJSTestingModule)([module_1.Ng2AppModule])));
    beforeEach(module(module_1.ng1AppModule.name));
    // #enddocregion angularjs-setup
    // #docregion angularjs-spec
    it('should have access to the HeroesService', inject((heroesService) => {
        expect(heroesService).toBeDefined();
    }));
    // #enddocregion angularjs-spec
});
