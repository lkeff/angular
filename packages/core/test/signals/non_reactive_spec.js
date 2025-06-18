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
const effect_util_1 = require("./effect_util");
describe('non-reactive reads', () => {
    afterEach(() => {
        (0, effect_util_1.resetEffects)();
    });
    it('should read the latest value from signal', () => {
        const counter = (0, core_1.signal)(0);
        expect((0, core_1.untracked)(counter)).toEqual(0);
        counter.set(1);
        expect((0, core_1.untracked)(counter)).toEqual(1);
    });
    it('should not add dependencies to computed when reading a value from a signal', () => {
        const counter = (0, core_1.signal)(0);
        const double = (0, core_1.computed)(() => (0, core_1.untracked)(counter) * 2);
        expect(double()).toEqual(0);
        counter.set(2);
        expect(double()).toEqual(0);
    });
    it('should refresh computed value if stale and read non-reactively ', () => {
        const counter = (0, core_1.signal)(0);
        const double = (0, core_1.computed)(() => counter() * 2);
        expect((0, core_1.untracked)(double)).toEqual(0);
        counter.set(2);
        expect((0, core_1.untracked)(double)).toEqual(4);
    });
    it('should not make surrounding effect depend on the signal', () => {
        const s = (0, core_1.signal)(1);
        const runLog = [];
        (0, effect_util_1.testingEffect)(() => {
            runLog.push((0, core_1.untracked)(s));
        });
        // an effect will run at least once
        (0, effect_util_1.flushEffects)();
        expect(runLog).toEqual([1]);
        // subsequent signal changes should not trigger effects as signal is untracked
        s.set(2);
        (0, effect_util_1.flushEffects)();
        expect(runLog).toEqual([1]);
    });
    it('should schedule on dependencies (computed) change', () => {
        const count = (0, core_1.signal)(0);
        const double = (0, core_1.computed)(() => count() * 2);
        let runLog = [];
        (0, effect_util_1.testingEffect)(() => {
            runLog.push(double());
        });
        (0, effect_util_1.flushEffects)();
        expect(runLog).toEqual([0]);
        count.set(1);
        (0, effect_util_1.flushEffects)();
        expect(runLog).toEqual([0, 2]);
    });
    it('should non-reactively read all signals accessed inside untrack', () => {
        const first = (0, core_1.signal)('John');
        const last = (0, core_1.signal)('Doe');
        let runLog = [];
        const effectRef = (0, effect_util_1.testingEffect)(() => {
            (0, core_1.untracked)(() => runLog.push(`${first()} ${last()}`));
        });
        // effects run at least once
        (0, effect_util_1.flushEffects)();
        expect(runLog).toEqual(['John Doe']);
        // change one of the signals - should not update as not read reactively
        first.set('Patricia');
        (0, effect_util_1.flushEffects)();
        expect(runLog).toEqual(['John Doe']);
        // change one of the signals - should not update as not read reactively
        last.set('Garcia');
        (0, effect_util_1.flushEffects)();
        expect(runLog).toEqual(['John Doe']);
    });
});
