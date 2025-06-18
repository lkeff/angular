"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/common/utils");
const test_util_1 = require("../test-util");
const g = (typeof window !== 'undefined' && window) || (typeof self !== 'undefined' && self) || global;
describe('global function patch', () => {
    describe('isOriginal', () => {
        it('setTimeout toString should be the same with non patched setTimeout', () => {
            expect(Function.prototype.toString.call(setTimeout)).toEqual(Function.prototype.toString.call(g[(0, utils_1.zoneSymbol)('setTimeout')]));
        });
        it('should not throw error if Promise is not a function', () => {
            const P = g.Promise;
            try {
                g.Promise = undefined;
                expect(() => {
                    const a = {}.toString();
                }).not.toThrow();
            }
            finally {
                g.Promise = P;
            }
        });
        it('MutationObserver toString should be the same with native version', (0, test_util_1.ifEnvSupports)('MutationObserver', () => {
            const nativeMutationObserver = g[(0, utils_1.zoneSymbol)('MutationObserver')];
            if (typeof nativeMutationObserver === 'function') {
                expect(Function.prototype.toString.call(g['MutationObserver'])).toEqual(Function.prototype.toString.call(nativeMutationObserver));
            }
            else {
                expect(Function.prototype.toString.call(g['MutationObserver'])).toEqual(Object.prototype.toString.call(nativeMutationObserver));
            }
        }));
    });
    describe('isNative', () => {
        it('ZoneAwareError toString should look like native', () => {
            expect(Function.prototype.toString.call(Error)).toContain('[native code]');
        });
        it('Function toString should look like native', () => {
            expect(Function.prototype.toString.call(Function.prototype.toString)).toContain('[native code]');
        });
        it('EventTarget addEventListener should look like native', (0, test_util_1.ifEnvSupports)('HTMLElement', () => {
            expect(Function.prototype.toString.call(HTMLElement.prototype.addEventListener)).toContain('[native code]');
        }));
    });
});
describe('ZoneTask', () => {
    it('should return handleId.toString if handleId is available', () => {
        let macroTask1 = undefined;
        let macroTask2 = undefined;
        let microTask = undefined;
        const zone = Zone.current.fork({
            name: 'timer',
            onScheduleTask: (delegate, curr, target, task) => {
                if (task.type === 'macroTask') {
                    if (!macroTask1) {
                        macroTask1 = task;
                    }
                    else {
                        macroTask2 = task;
                    }
                }
                else if (task.type === 'microTask') {
                    microTask = task;
                }
                return task;
            },
        });
        zone.run(() => {
            const id1 = setTimeout(() => { });
            clearTimeout(id1);
            const id2 = setTimeout(() => { });
            clearTimeout(id2);
            Promise.resolve().then(() => { });
            const macroTask1Str = macroTask1.toString();
            const macroTask2Str = macroTask2.toString();
            expect(typeof macroTask1Str).toEqual('string');
            expect(macroTask1Str).toEqual(id1.toString());
            expect(typeof macroTask2Str).toEqual('string');
            expect(macroTask2Str).toEqual(id2.toString());
            if (macroTask1.data && typeof macroTask1.data.handleId === 'number') {
                expect(macroTask1Str).not.toEqual(macroTask2Str);
            }
            expect(typeof microTask.toString()).toEqual('string');
        });
    });
});
