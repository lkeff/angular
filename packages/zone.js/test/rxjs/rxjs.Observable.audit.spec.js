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
xdescribe('Observable.audit', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('audit func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.interval)(100);
            return source.pipe((0, operators_1.audit)((ev) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return (0, rxjs_1.interval)(150);
            }));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
                if (result >= 3) {
                    subscriber.unsubscribe();
                }
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([1, 3, 'completed']);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
    xit('auditTime func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.interval)(100);
            return source.pipe((0, operators_1.auditTime)(360));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
                if (result >= 7) {
                    subscriber.unsubscribe();
                }
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([3, 7, 'completed']);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
});
