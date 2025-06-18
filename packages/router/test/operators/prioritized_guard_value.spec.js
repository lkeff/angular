"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const index_1 = require("../../index");
const testing_2 = require("rxjs/testing");
const prioritized_guard_value_1 = require("../../src/operators/prioritized_guard_value");
const router_1 = require("../../src/router");
describe('prioritizedGuardValue operator', () => {
    let testScheduler;
    let router;
    const TF = { T: true, F: false };
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ imports: [index_1.RouterModule.forRoot([])] });
    });
    beforeEach(() => {
        testScheduler = new testing_2.TestScheduler(assertDeepEquals);
    });
    beforeEach(() => {
        router = testing_1.TestBed.inject(router_1.Router);
    });
    it('should return true if all values are true', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const a = cold('       --(T|)', TF);
            const b = cold('       ----------(T|)', TF);
            const c = cold('       ------(T|)', TF);
            const source = hot('---o--', { o: [a, b, c] });
            const expected = '  -------------T--';
            expectObservable(source.pipe((0, prioritized_guard_value_1.prioritizedGuardValue)())).toBe(expected, TF);
        });
    });
    it('should return false if observables to the left of false have produced a value', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const a = cold('       --(T|)', TF);
            const b = cold('       ----------(T|)', TF);
            const c = cold('       ------(F|)', TF);
            const source = hot('---o--', { o: [a, b, c] });
            const expected = '  -------------F--';
            expectObservable(source.pipe((0, prioritized_guard_value_1.prioritizedGuardValue)())).toBe(expected, TF);
        });
    });
    it('should ignore results for unresolved sets of Observables', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const a = cold('       --(T|)', TF);
            const b = cold('       -------------(T|)', TF);
            const c = cold('       ------(F|)', TF);
            const z = cold('            ----(T|)', TF);
            const source = hot('---o----p----', { o: [a, b, c], p: [z] });
            const expected = '  ------------T---';
            expectObservable(source.pipe((0, prioritized_guard_value_1.prioritizedGuardValue)())).toBe(expected, TF);
        });
    });
    it('should return UrlTree if higher priority guards have resolved', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const urlTree = router.parseUrl('/');
            const urlLookup = { U: urlTree };
            const a = cold('       --(T|)', TF);
            const b = cold('       ----------(U|)', urlLookup);
            const c = cold('       ------(T|)', TF);
            const source = hot('---o---', { o: [a, b, c] });
            const expected = '  -------------U---';
            expectObservable(source.pipe((0, prioritized_guard_value_1.prioritizedGuardValue)())).toBe(expected, urlLookup);
        });
    });
    it('should return false even with UrlTree if UrlTree is lower priority', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const urlTree = router.parseUrl('/');
            const urlLookup = { U: urlTree };
            const a = cold('       --(T|)', TF);
            const b = cold('       ----------(F|)', TF);
            const c = cold('       ------(U|)', urlLookup);
            const source = hot('---o---', { o: [a, b, c] });
            const expected = '  -------------F---';
            expectObservable(source.pipe((0, prioritized_guard_value_1.prioritizedGuardValue)())).toBe(expected, TF);
        });
    });
    it('should return UrlTree even after a false if the false is lower priority', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const urlTree = router.parseUrl('/');
            const urlLookup = { U: urlTree };
            const a = cold('       --(T|)', TF);
            const b = cold('       ----------(U|)', urlLookup);
            const c = cold('       ------(F|)', TF);
            const source = hot('---o---', { o: [a, b, c] });
            const expected = '  -------------U----';
            expectObservable(source.pipe((0, prioritized_guard_value_1.prioritizedGuardValue)())).toBe(expected, urlLookup);
        });
    });
    it('should return the highest priority UrlTree', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const urlTreeU = router.parseUrl('/u');
            const urlTreeR = router.parseUrl('/r');
            const urlTreeL = router.parseUrl('/l');
            const urlLookup = { U: urlTreeU, R: urlTreeR, L: urlTreeL };
            const a = cold('       ----------(U|)', urlLookup);
            const b = cold('       -----(R|)', urlLookup);
            const c = cold('       --(L|)', urlLookup);
            const source = hot('---o---', { o: [a, b, c] });
            const expected = '  -------------U---';
            expectObservable(source.pipe((0, prioritized_guard_value_1.prioritizedGuardValue)())).toBe(expected, urlLookup);
        });
    });
    it('should ignore invalid values', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const resultLookup = { T: true, U: undefined, S: 'I am not a valid guard result' };
            const a = cold('       ----------(T|)', resultLookup);
            const b = cold('       -----(U|)', resultLookup);
            const c = cold('       -----(S|)', resultLookup);
            const d = cold('       --(T|)', resultLookup);
            const source = hot('---o---', { o: [a, b, c, d] });
            const expected = '  -------------T---';
            expectObservable(source.pipe((0, prioritized_guard_value_1.prioritizedGuardValue)())).toBe(expected, resultLookup);
        });
    });
    it('should propagate errors', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const a = cold('       --(T|)', TF);
            const b = cold('       ------#', TF);
            const c = cold('       ----------(F|)', TF);
            const source = hot('---o------', { o: [a, b, c] });
            const expected = '  ---------#';
            expectObservable(source.pipe((0, prioritized_guard_value_1.prioritizedGuardValue)())).toBe(expected, TF);
        });
    });
});
function assertDeepEquals(a, b) {
    return expect(a).toEqual(b);
}
