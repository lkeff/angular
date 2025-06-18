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
describe('Observable.combine', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('combineAll func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.of)(1, 2);
            const highOrder = source.pipe((0, operators_1.map)((src) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return (0, rxjs_1.of)(src);
            }));
            return highOrder.pipe((0, operators_1.combineAll)());
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([[1, 2], 'completed']);
                done();
            });
        });
    }, Zone.root));
    it('combineAll func callback should run in the correct zone with project function', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.of)(1, 2, 3);
            const highOrder = source.pipe((0, operators_1.map)((src) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return (0, rxjs_1.of)(src);
            }));
            return highOrder.pipe((0, operators_1.combineAll)((x, y) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return { x: x, y: y };
            }));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([{ x: 1, y: 2 }, 'completed']);
                done();
            });
        });
    }, Zone.root));
    it('combineLatest func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.of)(1, 2, 3);
            const input = (0, rxjs_1.of)(4, 5, 6);
            return (0, rxjs_1.combineLatest)(source, input);
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            });
        });
        expect(log).toEqual([[3, 4], [3, 5], [3, 6], 'completed']);
    });
    it('combineLatest func callback should run in the correct zone with project function', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.of)(1, 2, 3);
            const input = (0, rxjs_1.of)(4, 5, 6);
            return (0, rxjs_1.combineLatest)(source, input, (x, y) => {
                return x + y;
            });
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            });
        });
        expect(log).toEqual([7, 8, 9, 'completed']);
    });
});
