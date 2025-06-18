"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/common/utils");
describe('process related test', () => {
    let zoneA, result;
    beforeEach(() => {
        zoneA = Zone.current.fork({ name: 'zoneA' });
        result = [];
    });
    it('process.nextTick callback should in zone', (done) => {
        zoneA.run(function () {
            process.nextTick(() => {
                expect(Zone.current.name).toEqual('zoneA');
                done();
            });
        });
    });
    it('process.nextTick should be executed before macroTask and promise', (done) => {
        zoneA.run(function () {
            setTimeout(() => {
                result.push('timeout');
            }, 0);
            process.nextTick(() => {
                result.push('tick');
            });
            setTimeout(() => {
                expect(result).toEqual(['tick', 'timeout']);
                done();
            });
        });
    });
    it('process.nextTick should be treated as microTask', (done) => {
        let zoneTick = Zone.current.fork({
            name: 'zoneTick',
            onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                result.push({ callback: 'scheduleTask', targetZone: targetZone.name, task: task.source });
                return parentZoneDelegate.scheduleTask(targetZone, task);
            },
            onInvokeTask: (parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) => {
                result.push({ callback: 'invokeTask', targetZone: targetZone.name, task: task.source });
                return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
            },
        });
        zoneTick.run(() => {
            process.nextTick(() => {
                result.push('tick');
            });
        });
        setTimeout(() => {
            expect(result.length).toBe(3);
            expect(result[0]).toEqual({
                callback: 'scheduleTask',
                targetZone: 'zoneTick',
                task: 'process.nextTick',
            });
            expect(result[1]).toEqual({
                callback: 'invokeTask',
                targetZone: 'zoneTick',
                task: 'process.nextTick',
            });
            done();
        });
    });
    it('should support process.on(unhandledRejection)', function () {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jasmine.spyOnGlobalErrorsAsync(() => __awaiter(this, void 0, void 0, function* () {
                const hookSpy = jasmine.createSpy('hook');
                let p = null;
                Zone[(0, utils_1.zoneSymbol)('ignoreConsoleErrorUncaughtError')] = true;
                Zone.current.fork({ name: 'promise' }).run(function () {
                    const listener = function (reason, promise) {
                        hookSpy(promise, reason.message);
                        process.removeListener('unhandledRejection', listener);
                    };
                    process.on('unhandledRejection', listener);
                    p = new Promise((resolve, reject) => {
                        throw new Error('promise error');
                    });
                });
                return new Promise((res) => {
                    setTimeout(function () {
                        expect(hookSpy).toHaveBeenCalledWith(p, 'promise error');
                        res();
                    });
                });
            }));
        });
    });
    it('should support process.on(rejectionHandled)', function () {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jasmine.spyOnGlobalErrorsAsync(() => __awaiter(this, void 0, void 0, function* () {
                let p = null;
                Zone[(0, utils_1.zoneSymbol)('ignoreConsoleErrorUncaughtError')] = true;
                let r = null;
                let p1 = new Promise((res) => {
                    r = res;
                });
                Zone.current.fork({ name: 'promise' }).run(function () {
                    const listener = function (promise) {
                        expect(promise).toEqual(p);
                        process.removeListener('rejectionHandled', listener);
                        r();
                    };
                    process.on('rejectionHandled', listener);
                    p = new Promise((resolve, reject) => {
                        throw new Error('promise error');
                    });
                });
                setTimeout(function () {
                    p.catch((reason) => { });
                });
                return p1;
            }));
        });
    });
    it('should support multiple process.on(unhandledRejection)', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield jasmine.spyOnGlobalErrorsAsync(() => __awaiter(this, void 0, void 0, function* () {
                const hookSpy = jasmine.createSpy('hook');
                Zone[(0, utils_1.zoneSymbol)('ignoreConsoleErrorUncaughtError')] = true;
                let p = null;
                Zone.current.fork({ name: 'promise' }).run(function () {
                    const listener1 = function (reason, promise) {
                        hookSpy(promise, reason.message);
                        process.removeListener('unhandledRejection', listener1);
                    };
                    const listener2 = function (reason, promise) {
                        hookSpy(promise, reason.message);
                        process.removeListener('unhandledRejection', listener2);
                    };
                    process.on('unhandledRejection', listener1);
                    process.on('unhandledRejection', listener2);
                    p = new Promise((resolve, reject) => {
                        throw new Error('promise error');
                    });
                });
                return new Promise((res) => setTimeout(function () {
                    expect(hookSpy.calls.count()).toBe(2);
                    expect(hookSpy.calls.allArgs()).toEqual([
                        [p, 'promise error'],
                        [p, 'promise error'],
                    ]);
                    res();
                }));
            }));
        });
    });
});
