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
describe('Observable.catch', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('catch func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const error = new Error('test');
            const source = (0, rxjs_1.of)(1, 2, 3).pipe((0, operators_1.map)((n) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                if (n === 2) {
                    throw error;
                }
                return n;
            }));
            return source.pipe((0, operators_1.catchError)((err) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return (0, rxjs_1.of)('error1', 'error2');
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
            });
        });
        expect(log).toEqual([1, 'error1', 'error2', 'completed']);
    });
    it('retry func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 2, 3).pipe((0, operators_1.map)((n) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                if (n === 2) {
                    throw error;
                }
                return n;
            }), (0, operators_1.retry)(1));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, (error) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(error);
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            });
        });
        expect(log).toEqual([1, 1, error]);
    });
});
