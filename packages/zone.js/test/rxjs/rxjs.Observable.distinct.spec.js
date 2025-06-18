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
describe('Observable.distinct', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('distinct func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1).pipe((0, operators_1.distinct)());
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
            });
        });
        expect(log).toEqual([1, 2, 3, 4, 'completed']);
    });
    it('distinctUntilChanged func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4).pipe((0, operators_1.distinctUntilChanged)());
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
            });
        });
        expect(log).toEqual([1, 2, 1, 2, 3, 4, 'completed']);
    });
    it('distinctUntilKeyChanged func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)({ age: 4, name: 'Foo' }, { age: 7, name: 'Bar' }, { age: 5, name: 'Foo' }, { age: 6, name: 'Foo' }).pipe((0, operators_1.distinctUntilKeyChanged)('name'));
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
            });
        });
        expect(log).toEqual([
            { age: 4, name: 'Foo' },
            { age: 7, name: 'Bar' },
            { age: 5, name: 'Foo' },
            'completed',
        ]);
    });
});
