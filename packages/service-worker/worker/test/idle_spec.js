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
const idle_1 = require("../src/idle");
const scope_1 = require("../testing/scope");
const utils_1 = require("../testing/utils");
(function () {
    // Skip environments that don't support the minimum APIs needed to run the SW tests.
    if (!(0, utils_1.envIsSupported)()) {
        return;
    }
    describe('IdleScheduler', () => {
        let scope;
        let idle;
        beforeEach(() => {
            scope = new scope_1.SwTestHarnessBuilder().build();
            idle = new idle_1.IdleScheduler(scope, 1000, 3000, {
                log: (v, context) => console.error(v, context),
            });
        });
        // Validate that a single idle task executes when trigger()
        // is called and the idle timeout passes.
        it('executes scheduled work on time', () => __awaiter(this, void 0, void 0, function* () {
            // Set up a single idle task to set the completed flag to true when it runs.
            let completed = false;
            idle.schedule('work', () => __awaiter(this, void 0, void 0, function* () {
                completed = true;
            }));
            // Simply scheduling the task should not cause it to execute.
            expect(completed).toEqual(false);
            // Trigger the idle mechanism. This returns a Promise that should resolve
            // once the idle timeout has passed.
            const trigger = idle.trigger();
            // Advance the clock beyond the idle timeout, causing the idle tasks to run.
            scope.advance(1100);
            // It should now be possible to wait for the trigger, and for the idle queue
            // to be empty.
            yield trigger;
            yield idle.empty;
            // The task should now have run.
            expect(completed).toEqual(true);
        }));
        it('waits for multiple tasks to complete serially', () => __awaiter(this, void 0, void 0, function* () {
            // Schedule several tasks that will increase a counter according to its
            // current value. If these tasks execute in parallel, the writes to the counter
            // will race, and the test will fail.
            let counter = 2;
            idle.schedule('double counter', () => __awaiter(this, void 0, void 0, function* () {
                let local = counter;
                yield Promise.resolve();
                local *= 2;
                yield Promise.resolve();
                counter = local * 2;
            }));
            idle.schedule('triple counter', () => __awaiter(this, void 0, void 0, function* () {
                // If this expect fails, it comes out of the 'await trigger' below.
                expect(counter).toEqual(8);
                // Multiply the counter by 3 twice.
                let local = counter;
                yield Promise.resolve();
                local *= 3;
                yield Promise.resolve();
                counter = local * 3;
            }));
            // Trigger the idle mechanism once.
            const trigger = idle.trigger();
            // Advance the clock beyond the idle timeout, causing the idle tasks to run, and
            // wait for them to complete.
            scope.advance(1100);
            yield trigger;
            yield idle.empty;
            // Assert that both tasks executed in the correct serial sequence by validating
            // that the counter reached the correct value.
            expect(counter).toEqual(2 * 2 * 2 * 3 * 3);
        }));
        // Validate that a single idle task does not execute until trigger() has been called
        // and sufficient time passes without it being called again.
        it('does not execute work until timeout passes with no triggers', () => __awaiter(this, void 0, void 0, function* () {
            // Set up a single idle task to set the completed flag to true when it runs.
            let completed = false;
            idle.schedule('work', () => __awaiter(this, void 0, void 0, function* () {
                completed = true;
            }));
            // Trigger the queue once. This trigger will start a timer for the idle timeout,
            // but another trigger() will be called before that timeout passes.
            const firstTrigger = idle.trigger();
            // Advance the clock a little, but not enough to actually cause tasks to execute.
            scope.advance(500);
            // Assert that the task has not yet run.
            expect(completed).toEqual(false);
            // Next, trigger the queue again.
            const secondTrigger = idle.trigger();
            // Advance the clock beyond the timeout for the first trigger, but not the second.
            // This should cause the first trigger to resolve, but without running the task.
            scope.advance(600);
            yield firstTrigger;
            expect(completed).toEqual(false);
            // Schedule a third trigger. This is the one that will eventually resolve the task.
            const thirdTrigger = idle.trigger();
            // Again, advance beyond the second trigger and verify it didn't resolve the task.
            scope.advance(500);
            yield secondTrigger;
            expect(completed).toEqual(false);
            // Finally, advance beyond the third trigger, which should cause the task to be
            // executed finally.
            scope.advance(600);
            yield thirdTrigger;
            yield idle.empty;
            // The task should have executed.
            expect(completed).toEqual(true);
        }));
        it('executes tasks after max delay even with newer triggers', () => __awaiter(this, void 0, void 0, function* () {
            // Set up a single idle task to set the completed flag to true when it runs.
            let completed = false;
            idle.schedule('work', () => __awaiter(this, void 0, void 0, function* () {
                completed = true;
            }));
            // Trigger the queue once. This trigger will start a timer for the idle timeout,
            // but another `trigger()` will be called before that timeout passes.
            const firstTrigger = idle.trigger();
            // Advance the clock a little, but not enough to actually cause tasks to execute.
            scope.advance(999);
            expect(completed).toBe(false);
            // Next, trigger the queue again.
            const secondTrigger = idle.trigger();
            // Advance the clock beyond the timeout for the first trigger, but not the second.
            // This should cause the first trigger to resolve, but without running the task.
            scope.advance(999);
            yield firstTrigger;
            expect(completed).toBe(false);
            // Next, trigger the queue again.
            const thirdTrigger = idle.trigger();
            // Advance the clock beyond the timeout for the second trigger, but not the third.
            // This should cause the second trigger to resolve, but without running the task.
            scope.advance(999);
            yield secondTrigger;
            expect(completed).toBe(false);
            // Next, trigger the queue again.
            const forthTrigger = idle.trigger();
            // Finally, advance the clock beyond `maxDelay` (3000) from the first trigger, but not beyond
            // the timeout for the forth. This should cause the task to be executed nonetheless.
            scope.advance(3);
            yield Promise.all([thirdTrigger, forthTrigger]);
            // The task should have executed.
            expect(completed).toBe(true);
        }));
    });
})();
