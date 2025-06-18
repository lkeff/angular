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
const operators_1 = require("rxjs/operators");
/**
 * The point of these tests, is to ensure that all callbacks execute in the Zone which was active
 * when the callback was passed into the Rx.
 *
 * The implications are:
 * - Observable callback passed into `Observable` executes in the same Zone as when the
 *   `new Observable` was invoked.
 * - The subscription callbacks passed into `subscribe` execute in the same Zone as when the
 *   `subscribe` method was invoked.
 * - The operator callbacks passe into `map`, etc..., execute in the same Zone as when the
 *   `operator` (`lift`) method was invoked.
 */
describe('Zone interaction', () => {
    it('should run methods in the zone of declaration', () => {
        const log = [];
        const constructorZone = Zone.current.fork({ name: 'Constructor Zone' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        let subscriber = null;
        const observable = constructorZone.run(() => new rxjs_1.Observable((_subscriber) => {
            subscriber = _subscriber;
            log.push('setup');
            expect(Zone.current.name).toEqual(constructorZone.name);
            return () => {
                expect(Zone.current.name).toEqual(constructorZone.name);
                log.push('cleanup');
            };
        }));
        subscriptionZone.run(() => observable.subscribe(() => {
            expect(Zone.current.name).toEqual(subscriptionZone.name);
            log.push('next');
        }, () => null, () => {
            expect(Zone.current.name).toEqual(subscriptionZone.name);
            log.push('complete');
        }));
        subscriber.next('MyValue');
        subscriber.complete();
        expect(log).toEqual(['setup', 'next', 'complete', 'cleanup']);
        log.length = 0;
        subscriptionZone.run(() => observable.subscribe(() => null, () => {
            expect(Zone.current.name).toEqual(subscriptionZone.name);
            log.push('error');
        }, () => null));
        subscriber.next('MyValue');
        subscriber.error('MyError');
        expect(log).toEqual(['setup', 'error', 'cleanup']);
    });
    it('should run methods in the zone of declaration when nexting synchronously', () => {
        const log = [];
        const rootZone = Zone.current;
        const constructorZone = Zone.current.fork({ name: 'Constructor Zone' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const observable = constructorZone.run(() => new rxjs_1.Observable((subscriber) => {
            // Execute the `next`/`complete` in different zone, and assert that
            // correct zone
            // is restored.
            rootZone.run(() => {
                subscriber.next('MyValue');
                subscriber.complete();
            });
            return () => {
                expect(Zone.current.name).toEqual(constructorZone.name);
                log.push('cleanup');
            };
        }));
        subscriptionZone.run(() => observable.subscribe(() => {
            expect(Zone.current.name).toEqual(subscriptionZone.name);
            log.push('next');
        }, () => null, () => {
            expect(Zone.current.name).toEqual(subscriptionZone.name);
            log.push('complete');
        }));
        expect(log).toEqual(['next', 'complete', 'cleanup']);
    });
    it('should run operators in the zone of declaration', () => {
        const log = [];
        const rootZone = Zone.current;
        const constructorZone = Zone.current.fork({ name: 'Constructor Zone' });
        const operatorZone = Zone.current.fork({ name: 'Operator Zone' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        let observable = constructorZone.run(() => new rxjs_1.Observable((subscriber) => {
            // Execute the `next`/`complete` in different zone, and assert that
            // correct zone
            // is restored.
            rootZone.run(() => {
                subscriber.next('MyValue');
                subscriber.complete();
            });
            return () => {
                expect(Zone.current.name).toEqual(constructorZone.name);
                log.push('cleanup');
            };
        }));
        observable = operatorZone.run(() => observable.pipe((0, operators_1.map)((value) => {
            expect(Zone.current.name).toEqual(operatorZone.name);
            log.push('map: ' + value);
            return value;
        })));
        subscriptionZone.run(() => observable.subscribe(() => {
            expect(Zone.current.name).toEqual(subscriptionZone.name);
            log.push('next');
        }, (e) => {
            expect(Zone.current.name).toEqual(subscriptionZone.name);
            log.push('error: ' + e);
        }, () => {
            expect(Zone.current.name).toEqual(subscriptionZone.name);
            log.push('complete');
        }));
        expect(log).toEqual(['map: MyValue', 'next', 'complete', 'cleanup']);
    });
    it('should run subscribe in zone of declaration with Observable.create', () => {
        const log = [];
        const constructorZone = Zone.current.fork({ name: 'Constructor Zone' });
        let observable = constructorZone.run(() => rxjs_1.Observable.create((subscriber) => {
            expect(Zone.current.name).toEqual(constructorZone.name);
            subscriber.next(1);
            subscriber.complete();
            return () => {
                expect(Zone.current.name).toEqual(constructorZone.name);
                log.push('cleanup');
            };
        }));
        observable.subscribe(() => {
            log.push('next');
        });
        expect(log).toEqual(['next', 'cleanup']);
    });
    it('should run in the zone when subscribe is called to the same Subject', () => {
        const log = [];
        const constructorZone = Zone.current.fork({ name: 'Constructor Zone' });
        const subscriptionZone1 = Zone.current.fork({ name: 'Subscription Zone 1' });
        const subscriptionZone2 = Zone.current.fork({ name: 'Subscription Zone 2' });
        let subject;
        constructorZone.run(() => {
            subject = new rxjs_1.Subject();
        });
        let subscription1;
        let subscription2;
        subscriptionZone1.run(() => {
            subscription1 = subject.subscribe(() => {
                expect(Zone.current.name).toEqual(subscriptionZone1.name);
                log.push('next1');
            }, () => { }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone1.name);
                log.push('complete1');
            });
        });
        subscriptionZone2.run(() => {
            subscription2 = subject.subscribe(() => {
                expect(Zone.current.name).toEqual(subscriptionZone2.name);
                log.push('next2');
            }, () => { }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone2.name);
                log.push('complete2');
            });
        });
        subject.next(1);
        subject.complete();
        expect(log).toEqual(['next1', 'next2', 'complete1', 'complete2']);
    });
});
