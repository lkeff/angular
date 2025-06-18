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
describe('glitch-free computations', () => {
    it('should recompute only once for diamond dependency graph', () => {
        let fullRecompute = 0;
        const name = (0, core_1.signal)('John Doe');
        const first = (0, core_1.computed)(() => name().split(' ')[0]);
        const last = (0, core_1.computed)(() => name().split(' ')[1]);
        const full = (0, core_1.computed)(() => {
            fullRecompute++;
            return `${first()}/${last()}`;
        });
        expect(full()).toEqual('John/Doe');
        expect(fullRecompute).toEqual(1);
        name.set('Bob Fisher');
        expect(full()).toEqual('Bob/Fisher');
        expect(fullRecompute).toEqual(2);
    });
    it('should recompute only once', () => {
        const a = (0, core_1.signal)('a');
        const b = (0, core_1.computed)(() => a() + 'b');
        let cRecompute = 0;
        const c = (0, core_1.computed)(() => {
            return `${a()}|${b()}|${++cRecompute}`;
        });
        expect(c()).toEqual('a|ab|1');
        a.set('A');
        expect(c()).toEqual('A|Ab|2');
    });
});
