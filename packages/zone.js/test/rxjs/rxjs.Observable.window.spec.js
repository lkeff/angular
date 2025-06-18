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
// @JiaLiPassion, in Safari 9(iOS 9), the case is not
// stable because of the timer, try to fix it later
xdescribe('Observable.window', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('window func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.timer)(0, 10).pipe((0, operators_1.take)(6));
            const w = source.pipe((0, operators_1.window)((0, rxjs_1.interval)(30)));
            return w.pipe((0, operators_1.mergeAll)());
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
                expect(log).toEqual([0, 1, 2, 3, 4, 5, 'completed']);
                done();
            });
        });
    }, Zone.root));
    it('windowCount func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            const source = (0, rxjs_1.timer)(0, 10).pipe((0, operators_1.take)(10));
            const window = source.pipe((0, operators_1.windowCount)(4));
            return window.pipe((0, operators_1.mergeAll)());
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
                expect(log).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'completed']);
                done();
            });
        });
    }, Zone.root));
    it('windowToggle func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const windowZone1 = Zone.current.fork({ name: 'Window Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.timer)(0, 10).pipe((0, operators_1.take)(10));
        });
        windowZone1.run(() => {
            return observable1.pipe((0, operators_1.windowToggle)((0, rxjs_1.interval)(30), (val) => {
                expect(Zone.current.name).toEqual(windowZone1.name);
                return (0, rxjs_1.interval)(15);
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
                expect(log).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'completed']);
                done();
            });
        });
    }, Zone.root));
    it('windowWhen func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const windowZone1 = Zone.current.fork({ name: 'Window Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.timer)(0, 10).pipe((0, operators_1.take)(10));
        });
        windowZone1.run(() => {
            return observable1.pipe((0, operators_1.windowWhen)(() => {
                expect(Zone.current.name).toEqual(windowZone1.name);
                return (0, rxjs_1.interval)(15);
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
                expect(log).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'completed']);
                done();
            });
        });
    }, Zone.root));
});
