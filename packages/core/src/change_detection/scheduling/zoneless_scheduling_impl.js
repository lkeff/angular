"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeDetectionSchedulerImpl = void 0;
exports.provideZonelessChangeDetection = provideZonelessChangeDetection;
const rxjs_1 = require("rxjs");
const application_ref_1 = require("../../application/application_ref");
const injectable_1 = require("../../di/injectable");
const injector_compatibility_1 = require("../../di/injector_compatibility");
const provider_collection_1 = require("../../di/provider_collection");
const errors_1 = require("../../errors");
const pending_tasks_1 = require("../../pending_tasks");
const callback_scheduler_1 = require("../../util/callback_scheduler");
const performance_1 = require("../../util/performance");
const ng_zone_1 = require("../../zone/ng_zone");
const zoneless_scheduling_1 = require("./zoneless_scheduling");
const tracing_1 = require("../../application/tracing");
const error_handler_1 = require("../../error_handler");
const CONSECUTIVE_MICROTASK_NOTIFICATION_LIMIT = 100;
let consecutiveMicrotaskNotifications = 0;
let stackFromLastFewNotifications = [];
function trackMicrotaskNotificationForDebugging() {
    consecutiveMicrotaskNotifications++;
    if (CONSECUTIVE_MICROTASK_NOTIFICATION_LIMIT - consecutiveMicrotaskNotifications < 5) {
        const stack = new Error().stack;
        if (stack) {
            stackFromLastFewNotifications.push(stack);
        }
    }
    if (consecutiveMicrotaskNotifications === CONSECUTIVE_MICROTASK_NOTIFICATION_LIMIT) {
        throw new errors_1.RuntimeError(103 /* RuntimeErrorCode.INFINITE_CHANGE_DETECTION */, 'Angular could not stabilize because there were endless change notifications within the browser event loop. ' +
            'The stack from the last several notifications: \n' +
            stackFromLastFewNotifications.join('\n'));
    }
}
let ChangeDetectionSchedulerImpl = (() => {
    let _classDecorators = [(0, injectable_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChangeDetectionSchedulerImpl = _classThis = class {
        constructor() {
            var _a, _b, _c;
            this.applicationErrorHandler = (0, injector_compatibility_1.inject)(error_handler_1.INTERNAL_APPLICATION_ERROR_HANDLER);
            this.appRef = (0, injector_compatibility_1.inject)(application_ref_1.ApplicationRef);
            this.taskService = (0, injector_compatibility_1.inject)(pending_tasks_1.PendingTasksInternal);
            this.ngZone = (0, injector_compatibility_1.inject)(ng_zone_1.NgZone);
            this.zonelessEnabled = (0, injector_compatibility_1.inject)(zoneless_scheduling_1.ZONELESS_ENABLED);
            this.tracing = (0, injector_compatibility_1.inject)(tracing_1.TracingService, { optional: true });
            this.disableScheduling = (_a = (0, injector_compatibility_1.inject)(zoneless_scheduling_1.ZONELESS_SCHEDULER_DISABLED, { optional: true })) !== null && _a !== void 0 ? _a : false;
            this.zoneIsDefined = typeof Zone !== 'undefined' && !!Zone.root.run;
            this.schedulerTickApplyArgs = [{ data: { '__scheduler_tick__': true } }];
            this.subscriptions = new rxjs_1.Subscription();
            this.angularZoneId = this.zoneIsDefined
                ? (_b = this.ngZone._inner) === null || _b === void 0 ? void 0 : _b.get(ng_zone_1.angularZoneInstanceIdProperty)
                : null;
            this.scheduleInRootZone = !this.zonelessEnabled &&
                this.zoneIsDefined &&
                ((_c = (0, injector_compatibility_1.inject)(zoneless_scheduling_1.SCHEDULE_IN_ROOT_ZONE, { optional: true })) !== null && _c !== void 0 ? _c : false);
            this.cancelScheduledCallback = null;
            this.useMicrotaskScheduler = false;
            this.runningTick = false;
            this.pendingRenderTaskId = null;
            this.subscriptions.add(this.appRef.afterTick.subscribe(() => {
                // If the scheduler isn't running a tick but the application ticked, that means
                // someone called ApplicationRef.tick manually. In this case, we should cancel
                // any change detections that had been scheduled so we don't run an extra one.
                if (!this.runningTick) {
                    this.cleanup();
                }
            }));
            this.subscriptions.add(this.ngZone.onUnstable.subscribe(() => {
                // If the zone becomes unstable when we're not running tick (this happens from the zone.run),
                // we should cancel any scheduled change detection here because at this point we
                // know that the zone will stabilize at some point and run change detection itself.
                if (!this.runningTick) {
                    this.cleanup();
                }
            }));
            // TODO(atscott): These conditions will need to change when zoneless is the default
            // Instead, they should flip to checking if ZoneJS scheduling is provided
            this.disableScheduling || (this.disableScheduling = !this.zonelessEnabled &&
                // NoopNgZone without enabling zoneless means no scheduling whatsoever
                (this.ngZone instanceof ng_zone_1.NoopNgZone ||
                    // The same goes for the lack of Zone without enabling zoneless scheduling
                    !this.zoneIsDefined));
        }
        notify(source) {
            var _a, _b;
            if (!this.zonelessEnabled && source === 5 /* NotificationSource.Listener */) {
                // When the notification comes from a listener, we skip the notification unless the
                // application has enabled zoneless. Ideally, listeners wouldn't notify the scheduler at all
                // automatically. We do not know that a developer made a change in the listener callback that
                // requires an `ApplicationRef.tick` (synchronize templates / run render hooks). We do this
                // only for an easier migration from OnPush components to zoneless. Because listeners are
                // usually executed inside the Angular zone and listeners automatically call `markViewDirty`,
                // developers never needed to manually use `ChangeDetectorRef.markForCheck` or some other API
                // to make listener callbacks work correctly with `OnPush` components.
                return;
            }
            let force = false;
            switch (source) {
                case 0 /* NotificationSource.MarkAncestorsForTraversal */: {
                    this.appRef.dirtyFlags |= 2 /* ApplicationRefDirtyFlags.ViewTreeTraversal */;
                    break;
                }
                case 3 /* NotificationSource.DebugApplyChanges */:
                case 2 /* NotificationSource.DeferBlockStateUpdate */:
                case 4 /* NotificationSource.MarkForCheck */:
                case 5 /* NotificationSource.Listener */:
                case 1 /* NotificationSource.SetInput */: {
                    this.appRef.dirtyFlags |= 4 /* ApplicationRefDirtyFlags.ViewTreeCheck */;
                    break;
                }
                case 6 /* NotificationSource.CustomElement */: {
                    // We use `ViewTreeTraversal` to ensure we refresh the element even if this is triggered
                    // during CD. In practice this is a no-op since the elements code also calls via a
                    // `markForRefresh()` API which sends `NotificationSource.MarkAncestorsForTraversal` anyway.
                    this.appRef.dirtyFlags |= 2 /* ApplicationRefDirtyFlags.ViewTreeTraversal */;
                    force = true;
                    break;
                }
                case 12 /* NotificationSource.RootEffect */: {
                    this.appRef.dirtyFlags |= 16 /* ApplicationRefDirtyFlags.RootEffects */;
                    // Root effects still force a CD, even if the scheduler is disabled. This ensures that
                    // effects always run, even when triggered from outside the zone when the scheduler is
                    // otherwise disabled.
                    force = true;
                    break;
                }
                case 13 /* NotificationSource.ViewEffect */: {
                    // This is technically a no-op, since view effects will also send a
                    // `MarkAncestorsForTraversal` notification. Still, we set this for logical consistency.
                    this.appRef.dirtyFlags |= 2 /* ApplicationRefDirtyFlags.ViewTreeTraversal */;
                    // View effects still force a CD, even if the scheduler is disabled. This ensures that
                    // effects always run, even when triggered from outside the zone when the scheduler is
                    // otherwise disabled.
                    force = true;
                    break;
                }
                case 11 /* NotificationSource.PendingTaskRemoved */: {
                    // Removing a pending task via the public API forces a scheduled tick, ensuring that
                    // stability is async and delayed until there was at least an opportunity to run
                    // application synchronization. This prevents some footguns when working with the
                    // public API for pending tasks where developers attempt to update application state
                    // immediately after removing the last task.
                    force = true;
                    break;
                }
                case 9 /* NotificationSource.ViewDetachedFromDOM */:
                case 8 /* NotificationSource.ViewAttached */:
                case 7 /* NotificationSource.RenderHook */:
                case 10 /* NotificationSource.AsyncAnimationsLoaded */:
                default: {
                    // These notifications only schedule a tick but do not change whether we should refresh
                    // views. Instead, we only need to run render hooks unless another notification from the
                    // other set is also received before `tick` happens.
                    this.appRef.dirtyFlags |= 8 /* ApplicationRefDirtyFlags.AfterRender */;
                }
            }
            // If not already defined, attempt to capture a tracing snapshot of this
            // notification so that the resulting CD run can be attributed to the
            // context which produced the notification.
            this.appRef.tracingSnapshot = (_b = (_a = this.tracing) === null || _a === void 0 ? void 0 : _a.snapshot(this.appRef.tracingSnapshot)) !== null && _b !== void 0 ? _b : null;
            if (!this.shouldScheduleTick(force)) {
                return;
            }
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                if (this.useMicrotaskScheduler) {
                    trackMicrotaskNotificationForDebugging();
                }
                else {
                    consecutiveMicrotaskNotifications = 0;
                    stackFromLastFewNotifications.length = 0;
                }
            }
            const scheduleCallback = this.useMicrotaskScheduler
                ? callback_scheduler_1.scheduleCallbackWithMicrotask
                : callback_scheduler_1.scheduleCallbackWithRafRace;
            this.pendingRenderTaskId = this.taskService.add();
            if (this.scheduleInRootZone) {
                this.cancelScheduledCallback = Zone.root.run(() => scheduleCallback(() => this.tick()));
            }
            else {
                this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() => scheduleCallback(() => this.tick()));
            }
        }
        shouldScheduleTick(force) {
            if ((this.disableScheduling && !force) || this.appRef.destroyed) {
                return false;
            }
            // already scheduled or running
            if (this.pendingRenderTaskId !== null || this.runningTick || this.appRef._runningTick) {
                return false;
            }
            // If we're inside the zone don't bother with scheduler. Zone will stabilize
            // eventually and run change detection.
            if (!this.zonelessEnabled &&
                this.zoneIsDefined &&
                Zone.current.get(ng_zone_1.angularZoneInstanceIdProperty + this.angularZoneId)) {
                return false;
            }
            return true;
        }
        /**
         * Calls ApplicationRef._tick inside the `NgZone`.
         *
         * Calling `tick` directly runs change detection and cancels any change detection that had been
         * scheduled previously.
         *
         * @param shouldRefreshViews Passed directly to `ApplicationRef._tick` and skips straight to
         *     render hooks when `false`.
         */
        tick() {
            // When ngZone.run below exits, onMicrotaskEmpty may emit if the zone is
            // stable. We want to prevent double ticking so we track whether the tick is
            // already running and skip it if so.
            if (this.runningTick || this.appRef.destroyed) {
                return;
            }
            // If we reach the tick and there is no work to be done in ApplicationRef.tick,
            // skip it altogether and clean up. There may be no work if, for example, the only
            // event that notified the scheduler was the removal of a pending task.
            if (this.appRef.dirtyFlags === 0 /* ApplicationRefDirtyFlags.None */) {
                this.cleanup();
                return;
            }
            // The scheduler used to pass "whether to check views" as a boolean flag instead of setting
            // fine-grained dirtiness flags, and global checking was always used on the first pass. This
            // created an interesting edge case: if a notification made a view dirty and then ticked via the
            // scheduler (and not the zone) a global check was still performed.
            //
            // Ideally, this would not be the case, and only zone-based ticks would do global passes.
            // However this is a breaking change and requires fixes in g3. Until this cleanup can be done,
            // we add the `ViewTreeGlobal` flag to request a global check if any views are dirty in a
            // scheduled tick (unless zoneless is enabled, in which case global checks aren't really a
            // thing).
            //
            // TODO(alxhub): clean up and remove this workaround as a breaking change.
            if (!this.zonelessEnabled && this.appRef.dirtyFlags & 7 /* ApplicationRefDirtyFlags.ViewTreeAny */) {
                this.appRef.dirtyFlags |= 1 /* ApplicationRefDirtyFlags.ViewTreeGlobal */;
            }
            const task = this.taskService.add();
            try {
                this.ngZone.run(() => {
                    this.runningTick = true;
                    this.appRef._tick();
                }, undefined, this.schedulerTickApplyArgs);
            }
            catch (e) {
                this.taskService.remove(task);
                this.applicationErrorHandler(e);
            }
            finally {
                this.cleanup();
            }
            // If we're notified of a change within 1 microtask of running change
            // detection, run another round in the same event loop. This allows code
            // which uses Promise.resolve (see NgModel) to avoid
            // ExpressionChanged...Error to still be reflected in a single browser
            // paint, even if that spans multiple rounds of change detection.
            this.useMicrotaskScheduler = true;
            (0, callback_scheduler_1.scheduleCallbackWithMicrotask)(() => {
                this.useMicrotaskScheduler = false;
                this.taskService.remove(task);
            });
        }
        ngOnDestroy() {
            this.subscriptions.unsubscribe();
            this.cleanup();
        }
        cleanup() {
            var _a;
            this.runningTick = false;
            (_a = this.cancelScheduledCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this.cancelScheduledCallback = null;
            // If this is the last task, the service will synchronously emit a stable
            // notification. If there is a subscriber that then acts in a way that
            // tries to notify the scheduler again, we need to be able to respond to
            // schedule a new change detection. Therefore, we should clear the task ID
            // before removing it from the pending tasks (or the tasks service should
            // not synchronously emit stable, similar to how Zone stableness only
            // happens if it's still stable after a microtask).
            if (this.pendingRenderTaskId !== null) {
                const taskId = this.pendingRenderTaskId;
                this.pendingRenderTaskId = null;
                this.taskService.remove(taskId);
            }
        }
    };
    __setFunctionName(_classThis, "ChangeDetectionSchedulerImpl");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChangeDetectionSchedulerImpl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChangeDetectionSchedulerImpl = _classThis;
})();
exports.ChangeDetectionSchedulerImpl = ChangeDetectionSchedulerImpl;
/**
 * Provides change detection without ZoneJS for the application bootstrapped using
 * `bootstrapApplication`.
 *
 * This function allows you to configure the application to not use the state/state changes of
 * ZoneJS to schedule change detection in the application. This will work when ZoneJS is not present
 * on the page at all or if it exists because something else is using it (either another Angular
 * application which uses ZoneJS for scheduling or some other library that relies on ZoneJS).
 *
 * This can also be added to the `TestBed` providers to configure the test environment to more
 * closely match production behavior. This will help give higher confidence that components are
 * compatible with zoneless change detection.
 *
 * ZoneJS uses browser events to trigger change detection. When using this provider, Angular will
 * instead use Angular APIs to schedule change detection. These APIs include:
 *
 * - `ChangeDetectorRef.markForCheck`
 * - `ComponentRef.setInput`
 * - updating a signal that is read in a template
 * - when bound host or template listeners are triggered
 * - attaching a view that was marked dirty by one of the above
 * - removing a view
 * - registering a render hook (templates are only refreshed if render hooks do one of the above)
 *
 * @usageNotes
 * ```ts
 * bootstrapApplication(MyApp, {providers: [
 *   provideZonelessChangeDetection(),
 * ]});
 * ```
 *
 * This API is experimental. Neither the shape, nor the underlying behavior is stable and can change
 * in patch versions. There are known feature gaps and API ergonomic considerations. We will iterate
 * on the exact API based on the feedback and our understanding of the problem and solution space.
 *
 * @developerPreview 20.0
 * @see {@link /api/platform-browser/bootstrapApplication bootstrapApplication}
 */
function provideZonelessChangeDetection() {
    (0, performance_1.performanceMarkFeature)('NgZoneless');
    if ((typeof ngDevMode === 'undefined' || ngDevMode) && typeof Zone !== 'undefined' && Zone) {
        const message = (0, errors_1.formatRuntimeError)(914 /* RuntimeErrorCode.UNEXPECTED_ZONEJS_PRESENT_IN_ZONELESS_MODE */, `The application is using zoneless change detection, but is still loading Zone.js. ` +
            `Consider removing Zone.js to get the full benefits of zoneless. ` +
            `In applications using the Angular CLI, Zone.js is typically included in the "polyfills" section of the angular.json file.`);
        console.warn(message);
    }
    return (0, provider_collection_1.makeEnvironmentProviders)([
        { provide: zoneless_scheduling_1.ChangeDetectionScheduler, useExisting: ChangeDetectionSchedulerImpl },
        { provide: ng_zone_1.NgZone, useClass: ng_zone_1.NoopNgZone },
        { provide: zoneless_scheduling_1.ZONELESS_ENABLED, useValue: true },
        { provide: zoneless_scheduling_1.SCHEDULE_IN_ROOT_ZONE, useValue: false },
        typeof ngDevMode === 'undefined' || ngDevMode
            ? [{ provide: zoneless_scheduling_1.PROVIDED_ZONELESS, useValue: true }]
            : [],
    ]);
}
