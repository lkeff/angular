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
describe('Observable.from', () => {
    let log;
    const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
    const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
    let observable1;
    beforeEach(() => {
        log = [];
    });
    it('from array should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.from)([1, 2]);
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('completed');
            });
        });
        expect(log).toEqual([1, 2, 'completed']);
    });
    it('from array like object should run in the correct zone', () => {
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.from)('foo');
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, () => {
                fail('should not call error');
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('completed');
            });
        });
        expect(log).toEqual(['f', 'o', 'o', 'completed']);
    });
    it('from promise object should run in the correct zone', (0, test_util_1.asyncTest)((done) => {
        const constructorZone1 = Zone.current.fork({ name: 'Constructor Zone1' });
        const subscriptionZone = Zone.current.fork({ name: 'Subscription Zone' });
        observable1 = constructorZone1.run(() => {
            return (0, rxjs_1.from)(new Promise((resolve, reject) => {
                resolve(1);
            }));
        });
        subscriptionZone.run(() => {
            observable1.subscribe((result) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push(result);
            }, (error) => {
                fail('should not call error' + error);
            }, () => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('completed');
                expect(log).toEqual([1, 'completed']);
                done();
            });
        });
        expect(log).toEqual([]);
    }, Zone.root));
});
