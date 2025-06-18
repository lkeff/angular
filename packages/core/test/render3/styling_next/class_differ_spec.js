"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const class_differ_1 = require("../../../src/render3/styling/class_differ");
describe('class differ', () => {
    describe('classIndexOf', () => {
        it('should match simple case', () => {
            expect((0, class_differ_1.classIndexOf)('A', 'A', 0)).toEqual(0);
            expect((0, class_differ_1.classIndexOf)('AA', 'A', 0)).toEqual(-1);
            expect((0, class_differ_1.classIndexOf)('_A_', 'A', 0)).toEqual(-1);
            expect((0, class_differ_1.classIndexOf)('_ A_', 'A', 0)).toEqual(-1);
            expect((0, class_differ_1.classIndexOf)('_ A _', 'A', 0)).toEqual(2);
        });
        it('should not match on partial matches', () => {
            expect((0, class_differ_1.classIndexOf)('ABC AB', 'AB', 0)).toEqual(4);
            expect((0, class_differ_1.classIndexOf)('AB ABC', 'AB', 1)).toEqual(-1);
            expect((0, class_differ_1.classIndexOf)('ABC BC', 'BC', 0)).toEqual(4);
            expect((0, class_differ_1.classIndexOf)('BC ABC', 'BB', 1)).toEqual(-1);
        });
    });
});
