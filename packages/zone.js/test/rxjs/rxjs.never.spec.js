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
describe('Observable.never', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('never func callback should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return rxjs_1.NEVER.pipe((0, operators_1.startWith)(7));
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                fail('should not call complete');
            });
        });
        expect(log).toEqual([7]);
    });
});
