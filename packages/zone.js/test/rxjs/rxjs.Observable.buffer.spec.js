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
const test_util_1 = require("../test-util");
xdescribe('Observable.buffer', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('buffer func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.interval)(350);
            const iv = (0, rxjs_1.interval)(100);
            return iv.pipe((0, operators_1.buffer)(source));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
                if (result[0] >= 3) {
                    subscriber.unsubscribe();
                }
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([[0, 1, 2], [3, 4, 5], 'completed']);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
    it('bufferCount func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const iv = (0, rxjs_1.interval)(100);
            return iv.pipe((0, operators_1.bufferCount)(3));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
                if (result[0] >= 3) {
                    subscriber.unsubscribe();
                }
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([[0, 1, 2], [3, 4, 5], 'completed']);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
    it('bufferTime func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const iv = (0, rxjs_1.interval)(100);
            return iv.pipe((0, operators_1.bufferTime)(350));
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
                if (result[0] >= 3) {
                    subscriber.unsubscribe();
                }
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([[0, 1, 2], [3, 4, 5], 'completed']);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
    it('bufferToggle func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.interval)(10);
            const opening = (0, rxjs_1.interval)(25);
            const closingSelector = (v) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return v % 2 === 0 ? (0, rxjs_1.of)(v) : (0, rxjs_1.empty)();
            };
            return source.pipe((0, operators_1.bufferToggle)(opening, closingSelector));
        });
        let i = 0;
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
                subscriber.unsubscribe();
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([[], 'completed']);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
    it('bufferWhen func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.interval)(100);
            return source.pipe((0, operators_1.bufferWhen)(() => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return (0, rxjs_1.interval)(220);
            }));
        });
        let i = 0;
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
                if (i++ >= 3) {
                    subscriber.unsubscribe();
                }
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([[0, 1], [2, 3], [4, 5], [6, 7], 'completed']);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
});
