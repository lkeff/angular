"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/core");
const di_1 = require("../../src/di");
describe('forwardRef', () => {
    it('should wrap and unwrap the reference', () => {
        const ref = (0, di_1.forwardRef)(() => String);
        expect(ref instanceof core_1.Type).toBe(true);
        expect((0, di_1.resolveForwardRef)(ref)).toBe(String);
    });
});
