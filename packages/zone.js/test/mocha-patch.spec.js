"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
//
const test_util_1 = require("./test-util");
(0, test_util_1.ifEnvSupports)('Mocha', function () {
    describe('Mocha BDD-style', () => {
        let throwOnAsync = false;
        let beforeEachZone = null;
        let itZone = null;
        const syncZone = Zone.current;
        let beforeZone = null;
        before(() => {
            beforeZone = Zone.current;
        });
        try {
            Zone.current.scheduleMicroTask('dontallow', () => null);
        }
        catch (e) {
            throwOnAsync = true;
        }
        beforeEach(() => (beforeEachZone = Zone.current));
        it('should throw on async in describe', () => {
            expect(Zone.currentTask).toBeTruthy();
            expect(throwOnAsync).toBe(true);
            expect(syncZone.name).toEqual('syncTestZone for Mocha.describe');
            itZone = Zone.current;
        });
        afterEach(() => {
            let zone = Zone.current;
            expect(zone.name).toEqual('ProxyZone');
            expect(beforeEachZone).toBe(zone);
            expect(itZone).toBe(zone);
        });
        after(() => {
            expect(beforeZone).toBe(Zone.current);
        });
    });
    describe.skip('skip describe', () => {
        test('test', () => {
            fail('should not be here');
        });
    });
    suite('Mocha TDD-style', () => {
        let testZone = null;
        let beforeEachZone = null;
        let suiteSetupZone = null;
        suiteSetup(() => {
            suiteSetupZone = Zone.current;
        });
        setup(() => {
            beforeEachZone = Zone.current;
        });
        test('should run in Zone with "test"-syntax in TDD-mode', () => {
            testZone = Zone.current;
            expect(Zone.currentTask).toBeTruthy();
            expect(testZone.name).toEqual('ProxyZone');
        });
        specify('test should run in Zone with "specify"-syntax in TDD-mode', () => {
            testZone = Zone.current;
            expect(Zone.currentTask).toBeTruthy();
            expect(testZone.name).toEqual('ProxyZone');
        });
        teardown(() => {
            expect(Zone.current.name).toEqual('ProxyZone');
            expect(beforeEachZone).toBe(Zone.current);
            expect(testZone).toBe(Zone.current);
        });
        suiteTeardown(() => {
            expect(suiteSetupZone).toBe(Zone.current);
        });
        it.skip('test skip', () => {
            fail('should not be here');
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
})();
