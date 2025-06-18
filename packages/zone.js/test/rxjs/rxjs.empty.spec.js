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
describe('Observable.empty', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('empty func callback should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.empty)();
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                fail('should not call next');
            }, () => {
                fail('should not call error');
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            });
        });
    });
});
