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
describe('Observable.zip', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    beforeEach(() => {
        log = [];
    });
    it('zip func callback should run in the correct zone', () => {
        const observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.range)(1, 3);
        });
        const observable2 = constructorZone1.run(() => {
            return (0, rxjs_1.of)('foo', 'bar', 'beer');
        });
        const observable3 = constructorZone1.run(() => {
            return (0, rxjs_1.zip)(observable1, observable2, function (n, str) {
                expect(Zone.current.name).toEqual(constructorZone1.name);
                return { n: n, str: str };
            });
        });
        subscriptionZone.run(() => {
            observable3.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            });
        });
        expect(log).toEqual([{ n: 1, str: 'foo' }, { n: 2, str: 'bar' }, { n: 3, str: 'beer' }, 'completed']);
    });
});
