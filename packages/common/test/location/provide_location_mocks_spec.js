"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const testing_1 = require("../../testing");
const testing_2 = require("@angular/core/testing");
describe('provideLocationMocks() function', () => {
    it('should mock Location and LocationStrategy classes', () => {
        testing_2.TestBed.configureTestingModule({ providers: [(0, testing_1.provideLocationMocks)()] });
        const location = testing_2.TestBed.inject(index_1.Location);
        const locationStrategy = testing_2.TestBed.inject(index_1.LocationStrategy);
        expect(location).toBeInstanceOf(testing_1.SpyLocation);
        expect(locationStrategy).toBeInstanceOf(testing_1.MockLocationStrategy);
    });
});
