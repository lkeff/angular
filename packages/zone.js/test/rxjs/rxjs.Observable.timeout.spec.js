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
describe('Observable.timeout', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('timeout func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        if ((0, test_util_1.isPhantomJS)()) {
            done();
            return;
        }
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1).pipe((0, operators_1.timeout)(10));
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
                expect(log).toEqual([1, 'completed']);
                done();
            });
        });
    }, Zone.root));
    it('promise should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const promise = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1).toPromise();
        });
        subscriptionZone.run(() => {
            promise.then((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(result).toEqual(1);
                done();
            }, (err) => {
                fail('should not call error');
            });
        });
    }, Zone.root));
});
