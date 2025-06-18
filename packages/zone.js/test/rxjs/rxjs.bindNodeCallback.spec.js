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
const test_util_1 = require("../test-util");
describe('Observable.bindNodeCallback', () => {
    let log;
    const constructorZone = Zone.root.fork({ name: 'Constructor Zone' });
    const subscriptionZone = Zone.root.fork({ name: 'Subscription Zone' });
    let func;
    let boundFunc;
    let observable;
    beforeEach(() => {
        log = [];
    });
    it('bindNodeCallback func callback should run in the correct zone', () => {
        constructorZone.run(() => {
            func = function (arg, callback) {
                expect(Zone.current.name).toEqual(constructorZone.name);
                callback(null, arg);
            };
            boundFunc = (0, rxjs_1.bindNodeCallback)(func);
            observable = boundFunc('test');
        });
        subscriptionZone.run(() => {
            observable.subscribe((arg) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('next' + arg);
            });
        });
        expect(log).toEqual(['nexttest']);
    });
    it('bindNodeCallback with selector should run in correct zone', () => {
        constructorZone.run(() => {
            func = function (arg, callback) {
                expect(Zone.current.name).toEqual(constructorZone.name);
                callback(null, arg);
            };
            boundFunc = (0, rxjs_1.bindNodeCallback)(func, (arg) => {
                expect(Zone.current.name).toEqual(constructorZone.name);
                return 'selector' + arg;
            });
            observable = boundFunc('test');
        });
        subscriptionZone.run(() => {
            observable.subscribe((arg) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('next' + arg);
            });
        });
        expect(log).toEqual(['nextselectortest']);
    });
    it('bindNodeCallback with async scheduler should run in correct zone', (0, test_util_1.asyncTest)((done) => {
        constructorZone.run(() => {
            func = function (arg, callback) {
                expect(Zone.current.name).toEqual(constructorZone.name);
                callback(null, arg);
            };
            boundFunc = (0, rxjs_1.bindCallback)(func, () => true, rxjs_1.asapScheduler);
            observable = boundFunc('test');
        });
        subscriptionZone.run(() => {
            observable.subscribe((arg) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('next' + arg);
                done();
            });
        });
        expect(log).toEqual([]);
    }));
    it('bindNodeCallback call with error should run in correct zone', () => {
        constructorZone.run(() => {
            func = function (arg, callback) {
                expect(Zone.current.name).toEqual(constructorZone.name);
                callback(arg, null);
            };
            boundFunc = (0, rxjs_1.bindCallback)(func);
            observable = boundFunc('test');
        });
        subscriptionZone.run(() => {
            observable.subscribe((arg) => {
                expect(Zone.current.name).toEqual(subscriptionZone.name);
                log.push('next' + arg);
            }, (error) => {
                log.push('error' + error);
            });
        });
        expect(log).toEqual(['nexttest,']);
    });
});
