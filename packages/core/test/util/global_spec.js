"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("../../src/util/global");
describe('global', () => {
    it('should be global this value', () => {
        const _global = new Function('return this')();
        expect(global_1.global).toBe(_global);
    });
    if (typeof globalThis !== 'undefined') {
        it('should use globalThis as global reference', () => {
            expect(global_1.global).toBe(globalThis);
        });
    }
});
