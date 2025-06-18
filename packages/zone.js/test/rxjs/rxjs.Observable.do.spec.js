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
describe('Observable.tap', () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('do func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const doZone1 = Zone.current.fork({ name: 'Do Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.of)(1);
        });
        observable1 = doZone1.run(() => {
            return observable1.pipe((0, operators_1.tap)((v) => {
                log.push(v);
                expect(Zone.current.name).toEqual(doZone1.name);
            }));
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                log.push('result' + result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, (err) => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual([1, 'result1', 'completed']);
            });
        });
    });
});
