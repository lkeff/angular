"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_util_1 = require("./test-util");
function supportJasmineSpec() {
    return jasmine && jasmine['Spec'];
}
supportJasmineSpec.message = 'jasmine spec';
(0, test_util_1.ifEnvSupports)(supportJasmineSpec, () => {
    beforeEach(() => {
        // assert that each jasmine run has a task, so that drainMicrotask works properly.
        expect(Zone.currentTask).toBeTruthy();
    });
    describe('jasmine', () => {
        let throwOnAsync = false;
        let beforeEachZone = null;
        let beforeAllZone = null;
        let itZone = null;
        const syncZone = Zone.current;
        try {
            Zone.current.scheduleMicroTask('dontallow', () => null);
        }
        catch (e) {
            throwOnAsync = true;
        }
        beforeAll(() => (beforeAllZone = Zone.current));
        beforeEach(() => (beforeEachZone = Zone.current));
        it('should throw on async in describe', () => {
            expect(throwOnAsync).toBe(true);
            expect(syncZone.name).toEqual('syncTestZone for jasmine.describe#jasmine');
            itZone = Zone.current;
        });
        it('should cope with pending tests, which have no test body');
        afterEach(() => {
            let zone = Zone.current;
            expect(zone.name).toEqual('ProxyZone');
            expect(beforeEachZone.name).toEqual(zone.name);
            expect(itZone).toBe(zone);
        });
        afterAll(() => {
            let zone = Zone.current;
            expect(zone.name).toEqual('ProxyZone');
            expect(beforeAllZone.name).toEqual(zone.name);
        });
    });
    describe('return promise', () => {
        let log;
        beforeEach(() => {
            log = [];
        });
        it('should wait for promise to resolve', () => {
            return new Promise((res, _) => {
                setTimeout(() => {
                    log.push('resolved');
                    res();
                }, 100);
            });
        });
        afterEach(() => {
            expect(log).toEqual(['resolved']);
        });
    });
    describe('jasmine.createSpyObj', () => {
        it('createSpyObj with properties should be able to be retrieved from the spy', () => {
            const spy = jasmine.createSpyObj('obj', ['someFunction'], { prop1: 'foo' });
            expect(spy.prop1).toEqual('foo');
            const desc = Object.getOwnPropertyDescriptor(spy, 'prop1');
            expect(desc.enumerable).toBe(true);
            expect(desc.configurable).toBe(true);
        });
    });
})();
