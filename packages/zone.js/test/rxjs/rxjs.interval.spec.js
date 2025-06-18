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
const test_util_1 = require("../test-util");
describe('Observable.interval', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('interval func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.interval)(10);
        });
        subscriptionZone.run(() => {
            const subscriber = observable1.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                if (result >= 3) {
                    subscriber.unsubscribe();
                    expect(log).toEqual([0, 1, 2, 3]);
                    done();
                }
            }, () => {
                fail('should not call error');
            }, () => { });
        });
    }, Zone.root));
});
