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
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const pending_tasks_1 = require("../../src/pending_tasks");
describe('PendingTasks', () => {
    it('should wait until all tasks are completed', () => __awaiter(void 0, void 0, void 0, function* () {
        const pendingTasks = testing_1.TestBed.inject(pending_tasks_1.PendingTasksInternal);
        const taskA = pendingTasks.add();
        const taskB = pendingTasks.add();
        const taskC = pendingTasks.add();
        pendingTasks.remove(taskA);
        pendingTasks.remove(taskB);
        pendingTasks.remove(taskC);
        expect(yield hasPendingTasks(pendingTasks)).toBeFalse();
    }));
    it('should allow calls to remove the same task multiple times', () => __awaiter(void 0, void 0, void 0, function* () {
        const pendingTasks = testing_1.TestBed.inject(pending_tasks_1.PendingTasksInternal);
        expect(yield hasPendingTasks(pendingTasks)).toBeFalse();
        const taskA = pendingTasks.add();
        expect(yield hasPendingTasks(pendingTasks)).toBeTrue();
        pendingTasks.remove(taskA);
        pendingTasks.remove(taskA);
        pendingTasks.remove(taskA);
        expect(yield hasPendingTasks(pendingTasks)).toBeFalse();
    }));
    it('should be tolerant to removal of non-existent ids', () => __awaiter(void 0, void 0, void 0, function* () {
        const pendingTasks = testing_1.TestBed.inject(pending_tasks_1.PendingTasksInternal);
        expect(yield hasPendingTasks(pendingTasks)).toBeFalse();
        pendingTasks.remove(Math.random());
        pendingTasks.remove(Math.random());
        pendingTasks.remove(Math.random());
        expect(yield hasPendingTasks(pendingTasks)).toBeFalse();
    }));
    it('contributes to applicationRef stableness', () => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const pendingTasks = testing_1.TestBed.inject(pending_tasks_1.PendingTasksInternal);
        const taskA = pendingTasks.add();
        yield expectAsync(applicationRefIsStable(appRef)).toBeResolvedTo(false);
        pendingTasks.remove(taskA);
        yield expectAsync(applicationRefIsStable(appRef)).toBeResolvedTo(true);
        const taskB = pendingTasks.add();
        yield expectAsync(applicationRefIsStable(appRef)).toBeResolvedTo(false);
        pendingTasks.remove(taskB);
        yield expectAsync(applicationRefIsStable(appRef)).toBeResolvedTo(true);
    }));
});
describe('public PendingTasks', () => {
    it('should allow adding and removing tasks influencing stability', () => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const pendingTasks = testing_1.TestBed.inject(core_1.PendingTasks);
        const removeTaskA = pendingTasks.add();
        yield expectAsync(applicationRefIsStable(appRef)).toBeResolvedTo(false);
        removeTaskA();
        // stability is delayed until a tick happens
        yield expectAsync(applicationRefIsStable(appRef)).toBeResolvedTo(false);
        testing_1.TestBed.inject(core_1.ApplicationRef).tick();
        yield expectAsync(applicationRefIsStable(appRef)).toBeResolvedTo(true);
    }));
    it('should allow blocking stability with run', () => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const pendingTasks = testing_1.TestBed.inject(core_1.PendingTasks);
        let resolveFn;
        pendingTasks.run(() => {
            return new Promise((r) => {
                resolveFn = r;
            });
        });
        yield expectAsync(applicationRefIsStable(appRef)).toBeResolvedTo(false);
        resolveFn();
        yield expectAsync(testing_1.TestBed.inject(core_1.ApplicationRef).whenStable()).toBeResolved();
    }));
    it('should stop blocking stability if run promise rejects', () => __awaiter(void 0, void 0, void 0, function* () {
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        const pendingTasks = testing_1.TestBed.inject(core_1.PendingTasks);
        const errorHandler = testing_1.TestBed.inject(core_1.ErrorHandler);
        const spy = spyOn(errorHandler, 'handleError');
        let rejectFn;
        pendingTasks.run(() => {
            return new Promise((_, reject) => {
                rejectFn = reject;
            });
        });
        yield expectAsync(applicationRefIsStable(appRef)).toBeResolvedTo(false);
        rejectFn();
        yield expectAsync(appRef.whenStable()).toBeResolved();
        expect(spy).toHaveBeenCalled();
    }));
});
function applicationRefIsStable(applicationRef) {
    return (0, rxjs_1.firstValueFrom)(applicationRef.isStable);
}
function hasPendingTasks(pendingTasks) {
    return (0, rxjs_1.of)(rxjs_1.EMPTY)
        .pipe((0, operators_1.withLatestFrom)(pendingTasks.hasPendingTasksObservable), (0, operators_1.map)(([_, hasPendingTasks]) => hasPendingTasks))
        .toPromise();
}
