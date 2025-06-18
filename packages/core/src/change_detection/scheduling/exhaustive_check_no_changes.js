"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhaustiveCheckNoChangesInterval = exhaustiveCheckNoChangesInterval;
const application_ref_1 = require("../../application/application_ref");
const zoneless_scheduling_impl_1 = require("./zoneless_scheduling_impl");
const injector_compatibility_1 = require("../../di/injector_compatibility");
const provider_collection_1 = require("../../di/provider_collection");
const ng_zone_1 = require("../../zone/ng_zone");
const error_handler_1 = require("../../error_handler");
const change_detection_1 = require("../../render3/instructions/change_detection");
function exhaustiveCheckNoChangesInterval(interval) {
    return (0, provider_collection_1.provideEnvironmentInitializer)(() => {
        const applicationRef = (0, injector_compatibility_1.inject)(application_ref_1.ApplicationRef);
        const errorHandler = (0, injector_compatibility_1.inject)(error_handler_1.ErrorHandler);
        const scheduler = (0, injector_compatibility_1.inject)(zoneless_scheduling_impl_1.ChangeDetectionSchedulerImpl);
        const ngZone = (0, injector_compatibility_1.inject)(ng_zone_1.NgZone);
        function scheduleCheckNoChanges() {
            ngZone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (applicationRef.destroyed) {
                        return;
                    }
                    if (scheduler.pendingRenderTaskId || scheduler.runningTick) {
                        scheduleCheckNoChanges();
                        return;
                    }
                    for (const view of applicationRef.allViews) {
                        try {
                            (0, change_detection_1.checkNoChangesInternal)(view._lView, true /** exhaustive */);
                        }
                        catch (e) {
                            errorHandler.handleError(e);
                        }
                    }
                    scheduleCheckNoChanges();
                }, interval);
            });
        }
        scheduleCheckNoChanges();
    });
}
