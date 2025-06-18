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
const operators_1 = require("rxjs/operators");
const test_util_1 = require("../test-util");
describe('Scheduler.asap', () => {
    let log;
    let errorCallback;
    const constructorZone = Zone.root.fork({ name: 'Constructor Zone' });
    beforeEach(() => {
        log = [];
    });
    it('scheduler asap should run in correct zone', (0, test_util_1.asyncTest)((done) => {
        let observable;
        constructorZone.run(() => {
            observable = (0, rxjs_1.of)(1, 2, 3).pipe((0, operators_1.observeOn)(rxjs_1.asapScheduler));
        });
        const zone = Zone.current.fork({ name: 'subscribeZone' });
        zone.run(() => {
            observable
                .pipe((0, operators_1.map)((value) => {
                return value;
            }))
                .subscribe((value) => {
                expect(Zone.current.name).toEqual(zone.name);
                if (value === 3) {
                    setTimeout(done);
                }
            }, (err) => {
                fail('should not be here');
            });
        });
    }, Zone.root));
    it('scheduler asap error should run in correct zone', (0, test_util_1.asyncTest)((done) => {
        let observable;
        constructorZone.run(() => {
            observable = (0, rxjs_1.of)(1, 2, 3).pipe((0, operators_1.observeOn)(rxjs_1.asapScheduler));
        });
        Zone.root.run(() => {
            observable
                .pipe((0, operators_1.map)((value) => {
                if (value === 3) {
                    throw new Error('oops');
                }
                return value;
            }))
                .subscribe((value) => { }, (err) => {
                expect(err.message).toEqual('oops');
                expect(Zone.current.name).toEqual('<root>');
                done();
            });
        });
    }, Zone.root));
});
