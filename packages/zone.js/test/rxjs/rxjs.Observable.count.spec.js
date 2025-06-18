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
describe('Observable.count', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('count func callback should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.range)(1, 3).pipe((0, operators_1.count)((i) => {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return i % 2 === 0;
            }));
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            });
        });
        expect(log).toEqual([1, 'completed']);
    });
});
