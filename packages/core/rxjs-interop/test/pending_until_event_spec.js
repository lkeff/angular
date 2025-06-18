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
const pending_tasks_1 = require("../../src/pending_tasks");
const rxjs_1 = require("rxjs");
const src_1 = require("../src");
const testing_1 = require("../../testing");
describe('pendingUntilEvent', () => {
    let taskService;
    let injector;
    let appRef;
    beforeEach(() => {
        taskService = testing_1.TestBed.inject(pending_tasks_1.PendingTasksInternal);
        injector = testing_1.TestBed.inject(core_1.EnvironmentInjector);
        appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
    });
    it('should not block stability until subscription', () => __awaiter(void 0, void 0, void 0, function* () {
        const originalSource = new rxjs_1.BehaviorSubject(0);
        const delayedSource = originalSource.pipe((0, rxjs_1.delay)(5), (0, src_1.pendingUntilEvent)(injector));
        expect(taskService.hasPendingTasks).toEqual(false);
        const emitPromise = (0, rxjs_1.firstValueFrom)(delayedSource);
        expect(taskService.hasPendingTasks).toEqual(true);
        yield expectAsync(emitPromise).toBeResolvedTo(0);
        yield expectAsync(appRef.whenStable()).toBeResolved();
    }));
    it('runs the subscription body before stability', () => __awaiter(void 0, void 0, void 0, function* () {
        const source = (0, rxjs_1.of)(1).pipe((0, src_1.pendingUntilEvent)(injector));
        // stable before subscription
        expect(taskService.hasPendingTasks).toEqual(false);
        source.subscribe(() => {
            // unstable within synchronous subscription body
            expect(taskService.hasPendingTasks).toBe(true);
        });
        // stable after above synchronous subscription execution
        yield expectAsync(appRef.whenStable()).toBeResolved();
    }));
    it('only blocks stability until first emit', () => __awaiter(void 0, void 0, void 0, function* () {
        const intervalSource = (0, rxjs_1.interval)(5).pipe((0, src_1.pendingUntilEvent)(injector));
        expect(taskService.hasPendingTasks).toEqual(false);
        yield new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            const subscription = intervalSource.subscribe((v) => __awaiter(void 0, void 0, void 0, function* () {
                if (v === 0) {
                    expect(taskService.hasPendingTasks).toBe(true);
                }
                else {
                    yield expectAsync(appRef.whenStable()).toBeResolved();
                }
                if (v === 3) {
                    subscription.unsubscribe();
                    resolve();
                }
            }));
            expect(taskService.hasPendingTasks).toBe(true);
        }));
    }));
    it('should unblock stability on complete (but no emit)', () => __awaiter(void 0, void 0, void 0, function* () {
        const sub = new rxjs_1.Subject();
        sub.asObservable().pipe((0, src_1.pendingUntilEvent)(injector)).subscribe();
        expect(taskService.hasPendingTasks).toBe(true);
        sub.complete();
        yield expectAsync(appRef.whenStable()).toBeResolved();
    }));
    it('should unblock stability on unsubscribe before emit', () => __awaiter(void 0, void 0, void 0, function* () {
        const sub = new rxjs_1.Subject();
        const subscription = sub.asObservable().pipe((0, src_1.pendingUntilEvent)(injector)).subscribe();
        expect(taskService.hasPendingTasks).toBe(true);
        subscription.unsubscribe();
        yield expectAsync(appRef.whenStable()).toBeResolved();
    }));
    // Note that we cannot execute `finalize` operators that appear _after_ ours before
    // removing the pending task. We need to register the finalize operation on the subscription
    // as soon as the operator executes. A `finalize` operator later on in the stream will
    // be appear later in the finalizers list. These finalizers are both registered and executed
    // serially. We cannot execute our finalizer after other finalizers in the pipeline.
    it('should execute user finalize body before stability (as long as it appears first)', () => __awaiter(void 0, void 0, void 0, function* () {
        const sub = new rxjs_1.Subject();
        let finalizeExecuted = false;
        const subscription = sub
            .asObservable()
            .pipe((0, rxjs_1.finalize)(() => {
            finalizeExecuted = true;
            expect(taskService.hasPendingTasks).toBe(true);
        }), (0, src_1.pendingUntilEvent)(injector))
            .subscribe();
        expect(taskService.hasPendingTasks).toBe(true);
        subscription.unsubscribe();
        yield expectAsync(appRef.whenStable()).toBeResolved();
        expect(finalizeExecuted).toBe(true);
    }));
    it('should not throw if application is destroyed before emit', () => __awaiter(void 0, void 0, void 0, function* () {
        const sub = new rxjs_1.Subject();
        sub.asObservable().pipe((0, src_1.pendingUntilEvent)(injector)).subscribe();
        expect(taskService.hasPendingTasks).toBe(true);
        testing_1.TestBed.resetTestingModule();
        yield expectAsync(appRef.whenStable()).toBeResolved();
        sub.next();
        yield expectAsync(appRef.whenStable()).toBeResolved();
    }));
    it('should unblock stability on error before emit', () => __awaiter(void 0, void 0, void 0, function* () {
        const sub = new rxjs_1.Subject();
        sub
            .asObservable()
            .pipe((0, src_1.pendingUntilEvent)(injector), (0, rxjs_1.catchError)(() => rxjs_1.EMPTY))
            .subscribe();
        expect(taskService.hasPendingTasks).toBe(true);
        sub.error(new Error('error in pipe'));
        yield expectAsync(appRef.whenStable()).toBeResolved();
        sub.next();
        yield expectAsync(appRef.whenStable()).toBeResolved();
    }));
    it('should unblock stability on error in subscription', () => __awaiter(void 0, void 0, void 0, function* () {
        function nextUncaughtError() {
            return new Promise((resolve) => {
                rxjs_1.config.onUnhandledError = (e) => {
                    rxjs_1.config.onUnhandledError = null;
                    resolve(e);
                };
            });
        }
        const sub = new rxjs_1.Subject();
        sub
            .asObservable()
            .pipe((0, src_1.pendingUntilEvent)(injector))
            .subscribe({
            next: () => {
                throw new Error('oh noes');
            },
        });
        expect(taskService.hasPendingTasks).toBe(true);
        const errorPromise = nextUncaughtError();
        sub.next();
        yield expectAsync(errorPromise).toBeResolved();
        yield expectAsync(appRef.whenStable()).toBeResolved();
        const errorPromise2 = nextUncaughtError();
        sub.next();
        yield expectAsync(appRef.whenStable()).toBeResolved();
        yield expectAsync(errorPromise2).toBeResolved();
    }));
    it('finalize and complete are delivered correctly', () => {
        const sub = new rxjs_1.Subject();
        let log = [];
        const obs1 = sub.asObservable().pipe((0, src_1.pendingUntilEvent)(injector), (0, rxjs_1.finalize)(() => {
            log.push('finalize');
        }));
        // complete after subscription
        obs1.subscribe({
            complete: () => {
                log.push('complete');
            },
        });
        sub.complete();
        expect(log).toEqual(['complete', 'finalize']);
        // already completed before subscription
        log.length = 0;
        obs1.subscribe({
            complete: () => {
                log.push('complete');
            },
        });
        expect(log).toEqual(['complete', 'finalize']);
        log.length = 0;
        new rxjs_1.Subject()
            .asObservable()
            .pipe((0, src_1.pendingUntilEvent)(injector), (0, rxjs_1.finalize)(() => {
            log.push('finalize');
        }))
            .subscribe({
            complete: () => {
                log.push('complete');
            },
        })
            .unsubscribe();
        expect(log).toEqual(['finalize']);
    });
    it('should block stability for each new subscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const sub = new rxjs_1.Subject();
        const observable = sub.asObservable().pipe((0, rxjs_1.delay)(5), (0, src_1.pendingUntilEvent)(injector));
        observable.subscribe();
        expect(taskService.hasPendingTasks).toBe(true);
        sub.next();
        observable.subscribe();
        // first subscription unblocks
        yield new Promise((r) => setTimeout(r, 5));
        // still pending because the other subscribed after the emit
        expect(taskService.hasPendingTasks).toBe(true);
        sub.next();
        yield new Promise((r) => setTimeout(r, 3));
        observable.subscribe();
        sub.next();
        // second subscription unblocks
        yield new Promise((r) => setTimeout(r, 2));
        // still pending because third subscription delay not finished
        expect(taskService.hasPendingTasks).toBe(true);
        // finishes third subscription
        yield new Promise((r) => setTimeout(r, 3));
        yield expectAsync(appRef.whenStable()).toBeResolved();
    }));
});
