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
describe('Observable.defer', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('defer func callback should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.defer)(() => {
                return new rxjs_1.Observable((subscribe) => {
                    log.push('setup');
                    expect(Zone.current.name).toEqual(constructorZone1.name);
                    subscribe.next(1);
                    subscribe.complete();
                    return () => {
                        expect(Zone.current.name).toEqual(constructorZone1.name);
                        log.push('cleanup');
                    };
                });
            });
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            });
        });
        expect(log).toEqual(['setup', 1, 'cleanup']);
    });
});
