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
describe('Observable.throw', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('throw func callback should run in the correct zone', () => {
        let error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.throwError)(error);
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                fail('should not call next');
            }, (error) => {
                log.push(error);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, () => {
                fail('should not call complete');
            });
        });
        expect(log).toEqual([error]);
    });
    it('throw func callback should run in the correct zone with scheduler', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        let error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.throwError)(error, rxjs_1.asapScheduler);
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                fail('should not call next');
            }, (error) => {
                log.push(error);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([error]);
                done();
            }, () => {
                fail('should not call complete');
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
});
