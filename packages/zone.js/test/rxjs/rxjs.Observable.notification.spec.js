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
const supportNotification = function () {
    return typeof rxjs_1.Notification !== 'undefined';
};
supportNotification.message = 'RxNotification';
describe('Observable.notification', (0, test_util_1.ifEnvSupports)(supportNotification, () => {
    let log;
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('notification func callback should run in the correct zone', () => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        const error = new Error('test');
        observable1 = constructorZone1.run(() => {
            const notifA = new rxjs_1.Notification('N', 'A');
            const notifB = new rxjs_1.Notification('N', 'B');
            const notifE = new rxjs_1.Notification('E', void 0, error);
            const materialized = (0, rxjs_1.of)(notifA, notifB, notifE);
            return materialized.pipe((0, operators_1.dematerialize)());
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                log.push(result);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, (err) => {
                log.push(err);
                expect(Zone.current.name).toEqual(subscriptionZone.name);
            }, () => {
                log.push('completed');
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                expect(log).toEqual(['A', 'B', error]);
            });
        });
    });
}));
