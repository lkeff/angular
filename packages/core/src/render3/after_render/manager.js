"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterRenderSequence = exports.AfterRenderImpl = exports.AFTER_RENDER_PHASES = exports.AfterRenderManager = void 0;
const tracing_1 = require("../../application/tracing");
const zoneless_scheduling_1 = require("../../change_detection/scheduling/zoneless_scheduling");
const injector_compatibility_1 = require("../../di/injector_compatibility");
const defs_1 = require("../../di/interface/defs");
const error_handler_1 = require("../../error_handler");
const zone_1 = require("../../zone");
const view_1 = require("../interfaces/view");
const profiler_1 = require("../profiler");
const view_utils_1 = require("../util/view_utils");
class AfterRenderManager {
    constructor() {
        this.impl = null;
    }
    execute() {
        var _a;
        (_a = this.impl) === null || _a === void 0 ? void 0 : _a.execute();
    }
}
exports.AfterRenderManager = AfterRenderManager;
/** @nocollapse */
AfterRenderManager.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: AfterRenderManager,
    providedIn: 'root',
    factory: () => new AfterRenderManager(),
});
exports.AFTER_RENDER_PHASES = (() => [
    0 /* AfterRenderPhase.EarlyRead */,
    1 /* AfterRenderPhase.Write */,
    2 /* AfterRenderPhase.MixedReadWrite */,
    3 /* AfterRenderPhase.Read */,
])();
class AfterRenderImpl {
    constructor() {
        this.ngZone = (0, injector_compatibility_1.inject)(zone_1.NgZone);
        this.scheduler = (0, injector_compatibility_1.inject)(zoneless_scheduling_1.ChangeDetectionScheduler);
        this.errorHandler = (0, injector_compatibility_1.inject)(error_handler_1.ErrorHandler, { optional: true });
        /** Current set of active sequences. */
        this.sequences = new Set();
        /** Tracks registrations made during the current set of executions. */
        this.deferredRegistrations = new Set();
        /** Whether the `AfterRenderManager` is currently executing hooks. */
        this.executing = false;
        // Inject the tracing service to make sure it's initialized.
        (0, injector_compatibility_1.inject)(tracing_1.TracingService, { optional: true });
    }
    /**
     * Run the sequence of phases of hooks, once through. As a result of executing some hooks, more
     * might be scheduled.
     */
    execute() {
        var _a;
        const hasSequencesToExecute = this.sequences.size > 0;
        if (hasSequencesToExecute) {
            (0, profiler_1.profiler)(16 /* ProfilerEvent.AfterRenderHooksStart */);
        }
        this.executing = true;
        for (const phase of exports.AFTER_RENDER_PHASES) {
            for (const sequence of this.sequences) {
                if (sequence.erroredOrDestroyed || !sequence.hooks[phase]) {
                    continue;
                }
                try {
                    sequence.pipelinedValue = this.ngZone.runOutsideAngular(() => this.maybeTrace(() => {
                        const hookFn = sequence.hooks[phase];
                        const value = hookFn(sequence.pipelinedValue);
                        return value;
                    }, sequence.snapshot));
                }
                catch (err) {
                    sequence.erroredOrDestroyed = true;
                    (_a = this.errorHandler) === null || _a === void 0 ? void 0 : _a.handleError(err);
                }
            }
        }
        this.executing = false;
        // Cleanup step to reset sequence state and also collect one-shot sequences for removal.
        for (const sequence of this.sequences) {
            sequence.afterRun();
            if (sequence.once) {
                this.sequences.delete(sequence);
                // Destroy the sequence so its on destroy callbacks can be cleaned up
                // immediately, instead of waiting until the injector is destroyed.
                sequence.destroy();
            }
        }
        for (const sequence of this.deferredRegistrations) {
            this.sequences.add(sequence);
        }
        if (this.deferredRegistrations.size > 0) {
            this.scheduler.notify(7 /* NotificationSource.RenderHook */);
        }
        this.deferredRegistrations.clear();
        if (hasSequencesToExecute) {
            (0, profiler_1.profiler)(17 /* ProfilerEvent.AfterRenderHooksEnd */);
        }
    }
    register(sequence) {
        var _a;
        const { view } = sequence;
        if (view !== undefined) {
            // Delay adding it to the manager, add it to the view instead.
            ((_a = view[view_1.AFTER_RENDER_SEQUENCES_TO_ADD]) !== null && _a !== void 0 ? _a : (view[view_1.AFTER_RENDER_SEQUENCES_TO_ADD] = [])).push(sequence);
            // Mark the view for traversal to ensure we eventually schedule the afterNextRender.
            (0, view_utils_1.markAncestorsForTraversal)(view);
            view[view_1.FLAGS] |= 8192 /* LViewFlags.HasChildViewsToRefresh */;
        }
        else if (!this.executing) {
            this.addSequence(sequence);
        }
        else {
            this.deferredRegistrations.add(sequence);
        }
    }
    addSequence(sequence) {
        this.sequences.add(sequence);
        // Trigger an `ApplicationRef.tick()` if one is not already pending/running, because we have a
        // new render hook that needs to run.
        this.scheduler.notify(7 /* NotificationSource.RenderHook */);
    }
    unregister(sequence) {
        if (this.executing && this.sequences.has(sequence)) {
            // We can't remove an `AfterRenderSequence` in the middle of iteration.
            // Instead, mark it as destroyed so it doesn't run any more, and mark it as one-shot so it'll
            // be removed at the end of the current execution.
            sequence.erroredOrDestroyed = true;
            sequence.pipelinedValue = undefined;
            sequence.once = true;
        }
        else {
            // It's safe to directly remove this sequence.
            this.sequences.delete(sequence);
            this.deferredRegistrations.delete(sequence);
        }
    }
    maybeTrace(fn, snapshot) {
        // Only trace the execution if the snapshot is defined.
        return snapshot ? snapshot.run(tracing_1.TracingAction.AFTER_NEXT_RENDER, fn) : fn();
    }
}
exports.AfterRenderImpl = AfterRenderImpl;
/** @nocollapse */
AfterRenderImpl.ɵprov = (0, defs_1.ɵɵdefineInjectable)({
    token: AfterRenderImpl,
    providedIn: 'root',
    factory: () => new AfterRenderImpl(),
});
class AfterRenderSequence {
    constructor(impl, hooks, view, once, destroyRef, snapshot = null) {
        this.impl = impl;
        this.hooks = hooks;
        this.view = view;
        this.once = once;
        this.snapshot = snapshot;
        /**
         * Whether this sequence errored or was destroyed during this execution, and hooks should no
         * longer run for it.
         */
        this.erroredOrDestroyed = false;
        /**
         * The value returned by the last hook execution (if any), ready to be pipelined into the next
         * one.
         */
        this.pipelinedValue = undefined;
        this.unregisterOnDestroy = destroyRef === null || destroyRef === void 0 ? void 0 : destroyRef.onDestroy(() => this.destroy());
    }
    afterRun() {
        var _a;
        this.erroredOrDestroyed = false;
        this.pipelinedValue = undefined;
        // Clear the tracing snapshot after the initial run. This snapshot only
        // associates the initial run of the hook with the context that created it.
        // Follow-up runs are independent of that initial context and have different
        // triggers.
        (_a = this.snapshot) === null || _a === void 0 ? void 0 : _a.dispose();
        this.snapshot = null;
    }
    destroy() {
        var _a, _b;
        this.impl.unregister(this);
        (_a = this.unregisterOnDestroy) === null || _a === void 0 ? void 0 : _a.call(this);
        const scheduled = (_b = this.view) === null || _b === void 0 ? void 0 : _b[view_1.AFTER_RENDER_SEQUENCES_TO_ADD];
        if (scheduled) {
            this.view[view_1.AFTER_RENDER_SEQUENCES_TO_ADD] = scheduled.filter((s) => s !== this);
        }
    }
}
exports.AfterRenderSequence = AfterRenderSequence;
