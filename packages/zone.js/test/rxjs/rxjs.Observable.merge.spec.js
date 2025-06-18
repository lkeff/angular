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
describe('Observable.merge', () => {
    let log;
    let observable1;
    let defaultTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    beforeEach(() => {
        log = [];
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeout;
    });
    it('expand func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const expandZone1 = Zone.current.fork({ name: 'Expand Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(2);
        });
        observable1 = expandZone1.run(() => {
            return observable1.pipe((0, operators_1.expand)((val) => {
                expect(Zone.current.name).toEqual(expandZone1.name);
                return (0, rxjs_1.of)(1 + val);
            }), (0, operators_1.take)(2));
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
        expect(log).toEqual([2, 3, 'completed']);
    });
    it('merge func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.merge)((0, rxjs_1.interval)(10).pipe((0, operators_1.take)(2)), (0, rxjs_1.interval)(15).pipe((0, operators_1.take)(1)));
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
                expect(log).toEqual([0, 0, 1, 'completed']);
                done();
            });
        });
    }, Zone.root));
    it('mergeAll func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 2).pipe((0, operators_1.map)((v) => {
                return (0, rxjs_1.of)(v + 1);
            }), (0, operators_1.mergeAll)());
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
                expect(log).toEqual([2, 3, 'completed']);
                done();
            });
        });
    }, Zone.root));
    it('mergeMap func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 2).pipe((0, operators_1.mergeMap)((v) => {
                return (0, rxjs_1.of)(v + 1);
            }));
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
                expect(log).toEqual([2, 3, 'completed']);
            });
        });
    });
    it('mergeMapTo func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 2).pipe((0, operators_1.mergeMapTo)((0, rxjs_1.of)(10)));
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
                expect(log).toEqual([10, 10, 'completed']);
            });
        });
    });
    it('switch func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.range)(0, 3).pipe((0, operators_1.map)(function (x) {
                return (0, rxjs_1.range)(x, 3);
            }), (0, operators_1.switchAll)());
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
                expect(log).toEqual([0, 1, 2, 1, 2, 3, 2, 3, 4, 'completed']);
            });
        });
    });
    it('switchMap func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.range)(0, 3).pipe((0, operators_1.switchMap)(function (x) {
                return (0, rxjs_1.range)(x, 3);
            }));
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
                expect(log).toEqual([0, 1, 2, 1, 2, 3, 2, 3, 4, 'completed']);
            });
        });
    });
    it('switchMapTo func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.range)(0, 3).pipe((0, operators_1.switchMapTo)('a'));
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
                expect(log).toEqual(['a', 'a', 'a', 'completed']);
            });
        });
    });
});
