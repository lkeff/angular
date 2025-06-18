"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const signals_1 = require("../primitives/signals");
const rxjs_1 = require("rxjs");
const contextual_1 = require("./di/contextual");
const injector_compatibility_1 = require("./di/injector_compatibility");
const destroy_ref_1 = require("./linker/destroy_ref");
const pending_tasks_1 = require("./pending_tasks");
class EventEmitter_ extends rxjs_1.Subject {
    constructor(isAsync = false) {
        var _a, _b;
        super();
        this.destroyRef = undefined;
        this.pendingTasks = undefined;
        this.__isAsync = isAsync;
        // Attempt to retrieve a `DestroyRef` and `PendingTasks` optionally.
        // For backwards compatibility reasons, this cannot be required.
        if ((0, contextual_1.isInInjectionContext)()) {
            // `DestroyRef` is optional because it is not available in all contexts.
            // But it is useful to properly complete the `EventEmitter` if used with `outputToObservable`
            // when the component/directive is destroyed. (See `outputToObservable` for more details.)
            this.destroyRef = (_a = (0, injector_compatibility_1.inject)(destroy_ref_1.DestroyRef, { optional: true })) !== null && _a !== void 0 ? _a : undefined;
            this.pendingTasks = (_b = (0, injector_compatibility_1.inject)(pending_tasks_1.PendingTasksInternal, { optional: true })) !== null && _b !== void 0 ? _b : undefined;
        }
    }
    emit(value) {
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            super.next(value);
        }
        finally {
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    }
    subscribe(observerOrNext, error, complete) {
        var _a, _b, _c;
        let nextFn = observerOrNext;
        let errorFn = error || (() => null);
        let completeFn = complete;
        if (observerOrNext && typeof observerOrNext === 'object') {
            const observer = observerOrNext;
            nextFn = (_a = observer.next) === null || _a === void 0 ? void 0 : _a.bind(observer);
            errorFn = (_b = observer.error) === null || _b === void 0 ? void 0 : _b.bind(observer);
            completeFn = (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.bind(observer);
        }
        if (this.__isAsync) {
            errorFn = this.wrapInTimeout(errorFn);
            if (nextFn) {
                nextFn = this.wrapInTimeout(nextFn);
            }
            if (completeFn) {
                completeFn = this.wrapInTimeout(completeFn);
            }
        }
        const sink = super.subscribe({ next: nextFn, error: errorFn, complete: completeFn });
        if (observerOrNext instanceof rxjs_1.Subscription) {
            observerOrNext.add(sink);
        }
        return sink;
    }
    wrapInTimeout(fn) {
        return (value) => {
            var _a;
            const taskId = (_a = this.pendingTasks) === null || _a === void 0 ? void 0 : _a.add();
            setTimeout(() => {
                var _a;
                try {
                    fn(value);
                }
                finally {
                    if (taskId !== undefined) {
                        (_a = this.pendingTasks) === null || _a === void 0 ? void 0 : _a.remove(taskId);
                    }
                }
            });
        };
    }
}
/**
 * @publicApi
 */
exports.EventEmitter = EventEmitter_;
