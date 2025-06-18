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
describe('Observable.retryWhen', () => {
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
    it('retryWhen func callback should run in the correct zone', (done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        let isErrorHandled = false;
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1, 2, 3).pipe((0, operators_1.map)((v) => {
                if (v > 2 && !isErrorHandled) {
                    isErrorHandled = true;
                    throw v;
                }
                return v;
            }), (0, operators_1.retryWhen)((err) => err.pipe((0, operators_1.delayWhen)((v) => (0, rxjs_1.timer)(v)))));
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
                expect(log).toEqual([1, 2, 1, 2, 3, 'completed']);
                done();
            });
        });
    });
});
