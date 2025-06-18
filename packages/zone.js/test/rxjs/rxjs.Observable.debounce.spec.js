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
describe('Observable.debounce', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('debounce func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 2, 3).pipe((0, operators_1.debounce)(() => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return (0, rxjs_1.timer)(100);
            }));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                done();
            });
        });
        expect(log).toEqual([3, 'completed']);
    }, Zone.root));
    it('debounceTime func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 2, 3).pipe((0, operators_1.debounceTime)(100));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                done();
            });
        });
        expect(log).toEqual([3, 'completed']);
    }, Zone.root));
});
