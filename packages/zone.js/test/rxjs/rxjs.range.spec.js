"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const rxjs_1 = require("rxjs");
const test_util_1 = require("../test-util");
describe('Observable.range', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('range func callback should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.range)(1, 3);
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            });
        });
        expect(log).toEqual([1, 2, 3, 'completed']);
    });
    it('range func callback should run in the correct zone with scheduler', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.range)(1, 3, rxjs_1.asapScheduler);
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([1, 2, 3, 'completed']);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
});
