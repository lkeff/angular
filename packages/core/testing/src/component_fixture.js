"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentFixture = void 0;
const core_1 = require("../../src/core");
const pending_tasks_1 = require("../../src/pending_tasks");
const rxjs_1 = require("rxjs");
const defer_1 = require("./defer");
const test_bed_common_1 = require("./test_bed_common");
const application_error_handler_1 = require("./application_error_handler");
/**
 * Fixture for debugging and testing a component.
 *
 * @publicApi
 */
class ComponentFixture {
    /** @nodoc */
    constructor(componentRef) {
        var _a, _b, _c;
        this.componentRef = componentRef;
        this._isDestroyed = false;
        /** @internal */
        this._noZoneOptionIsSet = (0, core_1.inject)(test_bed_common_1.ComponentFixtureNoNgZone, { optional: true });
        /** @internal */
        this._ngZone = this._noZoneOptionIsSet ? new core_1.ɵNoopNgZone() : (0, core_1.inject)(core_1.NgZone);
        // Inject ApplicationRef to ensure NgZone stableness causes after render hooks to run
        // This will likely happen as a result of fixture.detectChanges because it calls ngZone.run
        // This is a crazy way of doing things but hey, it's the world we live in.
        // The zoneless scheduler should instead do this more imperatively by attaching
        // the `ComponentRef` to `ApplicationRef` and calling `appRef.tick` as the `detectChanges`
        // behavior.
        /** @internal */
        this._appRef = (0, core_1.inject)(core_1.ApplicationRef);
        this._testAppRef = this._appRef;
        this.pendingTasks = (0, core_1.inject)(pending_tasks_1.PendingTasksInternal);
        this.appErrorHandler = (0, core_1.inject)(application_error_handler_1.TestBedApplicationErrorHandler);
        this.zonelessEnabled = (0, core_1.inject)(core_1.ɵZONELESS_ENABLED);
        this.scheduler = (0, core_1.inject)(core_1.ɵChangeDetectionScheduler);
        this.rootEffectScheduler = (0, core_1.inject)(core_1.ɵEffectScheduler);
        this.autoDetectDefault = this.zonelessEnabled ? true : false;
        this.autoDetect = (_a = (0, core_1.inject)(test_bed_common_1.ComponentFixtureAutoDetect, { optional: true })) !== null && _a !== void 0 ? _a : this.autoDetectDefault;
        this.subscriptions = new rxjs_1.Subscription();
        // TODO(atscott): Remove this from public API
        this.ngZone = this._noZoneOptionIsSet ? null : this._ngZone;
        this.changeDetectorRef = componentRef.changeDetectorRef;
        this.elementRef = componentRef.location;
        this.debugElement = (0, core_1.getDebugNode)(this.elementRef.nativeElement);
        this.componentInstance = componentRef.instance;
        this.nativeElement = this.elementRef.nativeElement;
        this.componentRef = componentRef;
        if (this.autoDetect) {
            this._testAppRef.externalTestViews.add(this.componentRef.hostView);
            (_b = this.scheduler) === null || _b === void 0 ? void 0 : _b.notify(8 /* ɵNotificationSource.ViewAttached */);
            (_c = this.scheduler) === null || _c === void 0 ? void 0 : _c.notify(0 /* ɵNotificationSource.MarkAncestorsForTraversal */);
        }
        this.componentRef.hostView.onDestroy(() => {
            this._testAppRef.externalTestViews.delete(this.componentRef.hostView);
        });
        // Create subscriptions outside the NgZone so that the callbacks run outside
        // of NgZone.
        this._ngZone.runOutsideAngular(() => {
            this.subscriptions.add(this._ngZone.onError.subscribe({
                next: (error) => {
                    // The rethrow here is to ensure that errors don't go unreported. Since `NgZone.onHandleError` returns `false`,
                    // ZoneJS will not throw the error coming out of a task. Instead, the handling is defined by
                    // the chain of parent delegates and whether they indicate the error is handled in some way (by returning `false`).
                    // Unfortunately, 'onError' does not forward the information about whether the error was handled by a parent zone
                    // so cannot know here whether throwing is appropriate. As a half-solution, we can check to see if we're inside
                    // a fakeAsync context, which we know has its own error handling.
                    // https://github.com/angular/angular/blob/db2f2d99c82aae52d8a0ae46616c6411d070b35e/packages/zone.js/lib/zone-spec/fake-async-test.ts#L783-L784
                    // https://github.com/angular/angular/blob/db2f2d99c82aae52d8a0ae46616c6411d070b35e/packages/zone.js/lib/zone-spec/fake-async-test.ts#L473-L478
                    if (typeof Zone === 'undefined' || Zone.current.get('FakeAsyncTestZoneSpec')) {
                        return;
                    }
                    throw error;
                },
            }));
        });
    }
    /**
     * Trigger a change detection cycle for the component.
     */
    detectChanges(checkNoChanges = true) {
        const originalCheckNoChanges = this.componentRef.changeDetectorRef.checkNoChanges;
        try {
            if (!checkNoChanges) {
                this.componentRef.changeDetectorRef.checkNoChanges = () => { };
            }
            if (this.zonelessEnabled) {
                try {
                    this._testAppRef.externalTestViews.add(this.componentRef.hostView);
                    this._appRef.tick();
                }
                finally {
                    if (!this.autoDetect) {
                        this._testAppRef.externalTestViews.delete(this.componentRef.hostView);
                    }
                }
            }
            else {
                // Run the change detection inside the NgZone so that any async tasks as part of the change
                // detection are captured by the zone and can be waited for in isStable.
                this._ngZone.run(() => {
                    // Flush root effects before `detectChanges()`, to emulate the sequencing of `tick()`.
                    this.rootEffectScheduler.flush();
                    this.changeDetectorRef.detectChanges();
                    this.checkNoChanges();
                });
            }
        }
        finally {
            this.componentRef.changeDetectorRef.checkNoChanges = originalCheckNoChanges;
        }
    }
    /**
     * Do a change detection run to make sure there were no changes.
     */
    checkNoChanges() {
        this.changeDetectorRef.checkNoChanges();
    }
    /**
     * Set whether the fixture should autodetect changes.
     *
     * Also runs detectChanges once so that any existing change is detected.
     *
     * @param autoDetect Whether to autodetect changes. By default, `true`.
     */
    autoDetectChanges(autoDetect = true) {
        if (this._noZoneOptionIsSet && !this.zonelessEnabled) {
            throw new Error('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set.');
        }
        if (autoDetect !== this.autoDetect) {
            if (autoDetect) {
                this._testAppRef.externalTestViews.add(this.componentRef.hostView);
            }
            else {
                this._testAppRef.externalTestViews.delete(this.componentRef.hostView);
            }
        }
        this.autoDetect = autoDetect;
        this.detectChanges();
    }
    /**
     * Return whether the fixture is currently stable or has async tasks that have not been completed
     * yet.
     */
    isStable() {
        return !this.pendingTasks.hasPendingTasks;
    }
    /**
     * Get a promise that resolves when the fixture is stable.
     *
     * This can be used to resume testing after events have triggered asynchronous activity or
     * asynchronous change detection.
     */
    whenStable() {
        if (this.isStable()) {
            return Promise.resolve(false);
        }
        return new Promise((resolve, reject) => {
            this.appErrorHandler.whenStableRejectFunctions.add(reject);
            this._appRef.whenStable().then(() => {
                this.appErrorHandler.whenStableRejectFunctions.delete(reject);
                resolve(true);
            });
        });
    }
    /**
     * Retrieves all defer block fixtures in the component fixture.
     */
    getDeferBlocks() {
        const deferBlocks = [];
        const lView = this.componentRef.hostView['_lView'];
        (0, core_1.ɵgetDeferBlocks)(lView, deferBlocks);
        const deferBlockFixtures = [];
        for (const block of deferBlocks) {
            deferBlockFixtures.push(new defer_1.DeferBlockFixture(block, this));
        }
        return Promise.resolve(deferBlockFixtures);
    }
    _getRenderer() {
        if (this._renderer === undefined) {
            this._renderer = this.componentRef.injector.get(core_1.RendererFactory2, null);
        }
        return this._renderer;
    }
    /**
     * Get a promise that resolves when the ui state is stable following animations.
     */
    whenRenderingDone() {
        const renderer = this._getRenderer();
        if (renderer && renderer.whenRenderingDone) {
            return renderer.whenRenderingDone();
        }
        return this.whenStable();
    }
    /**
     * Trigger component destruction.
     */
    destroy() {
        this.subscriptions.unsubscribe();
        this._testAppRef.externalTestViews.delete(this.componentRef.hostView);
        if (!this._isDestroyed) {
            this.componentRef.destroy();
            this._isDestroyed = true;
        }
    }
}
exports.ComponentFixture = ComponentFixture;
