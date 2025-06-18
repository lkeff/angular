"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const test_util_1 = require("../test-util");
describe('Observable.concat', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const constructorZone2 = Zone.current.fork({ name: 'Constructor Zone2' });
    const constructorZone3 = Zone.current.fork({ name: 'Constructor Zone3' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    let observable2;
    let concatObservable;
    beforeEach(() => {
        log = [];
    });
    it('concat func callback should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return new rxjs_1.Observable((subscriber) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                subscriber.next(1);
                subscriber.next(2);
                subscriber.complete();
            });
        });
        observable2 = constructorZone2.run(() => {
            return (0, rxjs_1.range)(3, 4);
        });
        constructorZone3.run(() => {
            concatObservable = (0, rxjs_1.concat)(observable1, observable2);
        });
        subscriptionZone.run(() => {
            concatObservable.subscribe((concat) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(concat);
            });
        });
        expect(log).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it('concat func callback should run in the correct zone with scheduler', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const constructorZone2 = Zone.current.fork({ name: 'Constructor Zone2' });
        const constructorZone3 = Zone.current.fork({ name: 'Constructor Zone3' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return new rxjs_1.Observable((subscriber) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                subscriber.next(1);
                subscriber.next(2);
                subscriber.complete();
            });
        });
        observable2 = constructorZone2.run(() => {
            return (0, rxjs_1.range)(3, 4);
        });
        constructorZone3.run(() => {
            concatObservable = (0, rxjs_1.concat)(observable1, observable2, rxjs_1.asapScheduler);
        });
        subscriptionZone.run(() => {
            concatObservable.subscribe((concat) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(concat);
            }, (error) => {
                fail('subscribe failed' + error);
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([1, 2, 3, 4, 5, 6]);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
});
