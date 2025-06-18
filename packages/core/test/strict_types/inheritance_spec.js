"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
describe('inheritance strict type checking', () => {
    // Verify that Ivy definition fields in declaration files conform to TypeScript's strict
    // type checking constraints in the case of inheritance across directives/components/pipes.
    // https://github.com/angular/angular/issues/28079
    it('should compile without errors', () => { });
});
