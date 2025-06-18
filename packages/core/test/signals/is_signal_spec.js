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
describe('isSignal', () => {
    it('should return true for writable signal', () => {
        const writableSignal = (0, core_1.signal)('Angular');
        expect((0, core_1.isSignal)(writableSignal)).toBe(true);
    });
    it('should return true for readonly signal', () => {
        const readonlySignal = (0, core_1.computed)(() => 10);
        expect((0, core_1.isSignal)(readonlySignal)).toBe(true);
    });
    it('should return false for primitive', () => {
        const primitive = 0;
        expect((0, core_1.isSignal)(primitive)).toBe(false);
    });
    it('should return false for object', () => {
        const object = { name: 'Angular' };
        expect((0, core_1.isSignal)(object)).toBe(false);
    });
    it('should return false for function', () => {
        const fn = () => { };
        expect((0, core_1.isSignal)(fn)).toBe(false);
    });
});
