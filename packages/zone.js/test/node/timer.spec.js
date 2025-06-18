"use strict";
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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const promises_1 = require("node:timers/promises");
const node_util_1 = require("node:util");
const timers_1 = require("../../lib/common/timers");
describe('node timer', () => {
    it('util.promisify should work with setTimeout', (done) => {
        const setTimeoutPromise = (0, node_util_1.promisify)(setTimeout);
        setTimeoutPromise(50, 'value').then((value) => {
            expect(value).toEqual('value');
            done();
        }, (error) => {
            fail(`should not be here with error: ${error}.`);
        });
    });
    it('util.promisify should work with setImmediate', (done) => {
        const setImmediatePromise = (0, node_util_1.promisify)(setImmediate);
        setImmediatePromise('value').then((value) => {
            expect(value).toEqual('value');
            done();
        }, (error) => {
            fail(`should not be here with error: ${error}.`);
        });
    });
    it(`'Timeout.refresh' should restart the 'setTimeout' when it is not scheduled`, () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = jasmine.createSpy();
        const timeout = setTimeout(spy, 100);
        let iterations = 5;
        for (let i = 1; i <= iterations; i++) {
            timeout.refresh();
            yield (0, promises_1.setTimeout)(150);
        }
        expect(timeout[timers_1.taskSymbol].runCount).toBe(iterations);
        clearTimeout(timeout);
        expect(timeout[timers_1.taskSymbol]).toBeNull();
        expect(spy).toHaveBeenCalledTimes(iterations);
    }));
    it(`'Timeout.refresh' restarts the 'setTimeout' when it is running`, () => __awaiter(void 0, void 0, void 0, function* () {
        let timeout;
        const spy = jasmine.createSpy().and.callFake(() => timeout.refresh());
        timeout = setTimeout(spy, 100);
        yield (0, promises_1.setTimeout)(250);
        expect(timeout[timers_1.taskSymbol].runCount).toBe(2);
        clearTimeout(timeout);
        expect(timeout[timers_1.taskSymbol]).toBeNull();
        expect(spy).toHaveBeenCalledTimes(2);
    }));
    it(`'Timeout.refresh' should restart the 'setInterval'`, () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = jasmine.createSpy();
        const interval = setInterval(spy, 200);
        // Restart the interval multiple times before the elapsed time.
        for (let i = 1; i <= 4; i++) {
            interval.refresh();
            yield (0, promises_1.setTimeout)(100);
        }
        // Time did not elapse
        expect(interval[timers_1.taskSymbol].runCount).toBe(0);
        expect(spy).toHaveBeenCalledTimes(0);
        yield (0, promises_1.setTimeout)(350);
        expect(interval[timers_1.taskSymbol].runCount).toBe(2);
        clearInterval(interval);
        expect(interval[timers_1.taskSymbol]).toBeNull();
        expect(spy).toHaveBeenCalledTimes(2);
    }));
});
