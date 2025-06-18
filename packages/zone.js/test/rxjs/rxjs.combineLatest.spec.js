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
describe('Observable.combineLatest', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const constructorZone2 = Zone.current.fork({ name: 'Constructor Zone2' });
    const constructorZone3 = Zone.current.fork({ name: 'Constructor Zone3' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    let observable2;
    let subscriber1;
    let subscriber2;
    let combinedObservable;
    beforeEach(() => {
        log = [];
    });
    it('combineLatest func should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => new rxjs_1.Observable((_subscriber) => {
            subscriber1 = _subscriber;
            expect(Zone.current.name).toEqual(constructorZone1.name);
            log.push('setup1');
        }));
        observable2 = constructorZone2.run(() => new rxjs_1.Observable((_subscriber) => {
            subscriber2 = _subscriber;
            expect(Zone.current.name).toEqual(constructorZone2.name);
            log.push('setup2');
        }));
        constructorZone3.run(() => {
            combinedObservable = (0, rxjs_1.combineLatest)(observable1, observable2);
        });
        subscriptionZone.run(() => {
            combinedObservable.subscribe((combined) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(combined);
            });
        });
        subscriber1.next(1);
        subscriber2.next(2);
        subscriber2.next(3);
        expect(log).toEqual(['setup1', 'setup2', [1, 2], [1, 3]]);
    });
    it('combineLatest func with project function should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => new rxjs_1.Observable((_subscriber) => {
            subscriber1 = _subscriber;
            expect(Zone.current.name).toEqual(constructorZone1.name);
            log.push('setup1');
        }));
        observable2 = constructorZone2.run(() => new rxjs_1.Observable((_subscriber) => {
            subscriber2 = _subscriber;
            expect(Zone.current.name).toEqual(constructorZone2.name);
            log.push('setup2');
        }));
        constructorZone3.run(() => {
            combinedObservable = (0, rxjs_1.combineLatest)(observable1, observable2, (x, y) => {
                expect(Zone.current.name).toEqual(constructorZone3.name);
                return x + y;
            });
        });
        subscriptionZone.run(() => {
            combinedObservable.subscribe((combined) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(combined);
            });
        });
        subscriber1.next(1);
        subscriber2.next(2);
        subscriber2.next(3);
        expect(log).toEqual(['setup1', 'setup2', 3, 4]);
    });
});
