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
describe('Observable.map', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('pairwise func callback should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 2, 3).pipe((0, operators_1.pairwise)());
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('completed');
            });
        });
        expect(log).toEqual([[1, 2], [2, 3], 'completed']);
    });
    it('partition func callback should run in the correct zone', () => {
        const partitionZone = Zone.current.fork({ name: 'Partition Zone1' });
        const observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 2, 3);
        });
        const part = partitionZone.run(() => {
            return observable1.pipe((0, operators_1.partition)((val) => {
                expect(Zone.current.name).toEqual(partitionZone.name);
                return val % 2 === 0;
            }));
        });
        subscriptionZone.run(() => {
            part[0].subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('first' + result);
            }, () => {
                fail('should not call error');
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('completed');
            });
            part[1].subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('second' + result);
            }, () => {
                fail('should not call error');
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('completed');
            });
        });
        expect(log).toEqual(['first2', 'completed', 'second1', 'second3', 'completed']);
    });
    it('pluck func callback should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)({ a: 1, b: 2 }, { a: 3, b: 4 }).pipe((0, operators_1.pluck)('a'));
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('completed');
            });
        });
        expect(log).toEqual([1, 3, 'completed']);
    });
});
