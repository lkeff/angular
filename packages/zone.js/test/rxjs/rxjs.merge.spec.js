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
    beforeEach(() => {
        log = [];
    });
    it('merge func callback should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const constructorZone2 = Zone.current.fork({ name: 'Constructor Zone2' });
        const constructorZone3 = Zone.current.fork({ name: 'Constructor Zone3' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.interval)(8).pipe((0, operators_1.map)((v) => 'observable1' + v), (0, operators_1.take)(1));
        });
        const observable2 = constructorZone2.run(() => {
            return (0, rxjs_1.interval)(10).pipe((0, operators_1.map)((v) => 'observable2' + v), (0, operators_1.take)(1));
        });
        const observable3 = constructorZone3.run(() => {
            return (0, rxjs_1.merge)(observable1, observable2);
        });
        subscriptionZone.run(() => {
            const subscriber = observable3.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, () => {
                fail('should not call error');
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual(['observable10', 'observable20', 'completed']);
                done();
            });
        });
    }, Zone.root));
});
