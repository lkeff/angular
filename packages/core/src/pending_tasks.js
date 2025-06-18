"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingTasks = exports.PendingTasksInternal = void 0;
const rxjs_1 = require("rxjs");
const injector_compatibility_1 = require("./di/injector_compatibility");
const defs_1 = require("./di/interface/defs");
const zoneless_scheduling_1 = require("./change_detection/scheduling/zoneless_scheduling");
const error_handler_1 = require("./error_handler");
/**
 * Internal implementation of the pending tasks service.
 */
class PendingTasksInternal {
    constructor() {
        this.taskId = 0;
        this.pendingTasks = new Set();
        this.destroyed = false;
        this.pendingTask = new rxjs_1.BehaviorSubject(false);
    }
    get hasPendingTasks() {
        // Accessing the value of a closed `BehaviorSubject` throws an error.
        return this.destroyed ? false : this.pendingTask.value;
    }
    /**
     * In case the service is about to be destroyed, return a self-completing observable.
     * Otherwise, return the observable that emits the current state of pending tasks.
     */
    get hasPendingTasksObservable() {
        if (this.destroyed) {
            // Manually creating the observable pulls less symbols from RxJS than `of(false)`.
            return new rxjs_1.Observable((subscriber) => {
                subscriber.next(false);
                subscriber.complete();
            });
        }
        return this.pendingTask;
    }
    add() {
        // Emitting a value to a closed subject throws an error.
        if (!this.hasPendingTasks && !this.destroyed) {
            this.pendingTask.next(true);
        }
        const taskId = this.taskId++;
        this.pendingTasks.add(taskId);
        return taskId;
    }
    has(taskId) {
        return this.pendingTasks.has(taskId);
    }
    remove(taskId) {
        this.pendingTasks.delete(taskId);
        if (this.pendingTasks.size === 0 && this.hasPendingTasks) {
            this.pendingTask.next(false);
        }
    }
    ngOnDestroy() {
        this.pendingTasks.clear();
        if (this.hasPendingTasks) {
            this.pendingTask.next(false);
        }
        // We call `unsubscribe()` to release observers, as users may forget to
        // unsubscribe manually when subscribing to `isStable`. We do not call
        // `complete()` because it is unsafe; if someone subscribes using the `first`
        // operator and the observable completes before emitting a value,
        // RxJS will throw an error.
        this.destroyed = true;
        this.pendingTask.unsubscribe();
    }
}
exports.PendingTasksInternal = PendingTasksInternal;
/** @nocollapse */
PendingTasksInternal.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: PendingTasksInternal,
    providedIn: 'root',
    factory: () => new PendingTasksInternal(),
});
/**
 * Service that keeps track of pending tasks contributing to the stableness of Angular
 * application. While several existing Angular services (ex.: `HttpClient`) will internally manage
 * tasks influencing stability, this API gives control over stability to library and application
 * developers for specific cases not covered by Angular internals.
 *
 * The concept of stability comes into play in several important scenarios:
 * - SSR process needs to wait for the application stability before serializing and sending rendered
 * HTML;
 * - tests might want to delay assertions until the application becomes stable;
 *
 * @usageNotes
 * ```ts
 * const pendingTasks = inject(PendingTasks);
 * const taskCleanup = pendingTasks.add();
 * // do work that should block application's stability and then:
 * taskCleanup();
 * ```
 *
 * @publicApi 20.0
 */
class PendingTasks {
    constructor() {
        this.internalPendingTasks = (0, injector_compatibility_1.inject)(PendingTasksInternal);
        this.scheduler = (0, injector_compatibility_1.inject)(zoneless_scheduling_1.ChangeDetectionScheduler);
        this.errorHandler = (0, injector_compatibility_1.inject)(error_handler_1.INTERNAL_APPLICATION_ERROR_HANDLER);
    }
    /**
     * Adds a new task that should block application's stability.
     * @returns A cleanup function that removes a task when called.
     */
    add() {
        const taskId = this.internalPendingTasks.add();
        return () => {
            if (!this.internalPendingTasks.has(taskId)) {
                // This pending task has already been cleared.
                return;
            }
            // Notifying the scheduler will hold application stability open until the next tick.
            this.scheduler.notify(11 /* NotificationSource.PendingTaskRemoved */);
            this.internalPendingTasks.remove(taskId);
        };
    }
    /**
     * Runs an asynchronous function and blocks the application's stability until the function completes.
     *
     * ```ts
     * pendingTasks.run(async () => {
     *   const userData = await fetch('/api/user');
     *   this.userData.set(userData);
     * });
     * ```
     *
     * @param fn The asynchronous function to execute
     * @developerPreview 19.0
     */
    run(fn) {
        const removeTask = this.add();
        fn().catch(this.errorHandler).finally(removeTask);
    }
}
exports.PendingTasks = PendingTasks;
/** @nocollapse */
PendingTasks.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: PendingTasks,
    providedIn: 'root',
    factory: () => new PendingTasks(),
});
