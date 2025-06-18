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
const operators_1 = require("rxjs/operators");
const test_util_1 = require("../test-util");
describe('Observable.sample', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('sample func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.interval)(10).pipe((0, operators_1.sample)((0, rxjs_1.interval)(15)));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                subscriber.complete();
            }, (err) => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([0, 'completed']);
                done();
            });
        });
    }, Zone.root));
    xit('throttle func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.interval)(10).pipe((0, operators_1.take)(5), (0, operators_1.throttle)((val) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return (0, rxjs_1.interval)(20);
            }));
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, (err) => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([0, 2, 4, 'completed']);
                done();
            });
        });
    }, Zone.root));
});
