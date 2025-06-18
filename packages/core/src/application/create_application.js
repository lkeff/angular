"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalCreateApplication = internalCreateApplication;
const ng_zone_scheduling_1 = require("../change_detection/scheduling/ng_zone_scheduling");
const platform_1 = require("../platform/platform");
const errors_1 = require("../render3/errors");
const ng_module_ref_1 = require("../render3/ng_module_ref");
const zoneless_scheduling_1 = require("../change_detection/scheduling/zoneless_scheduling");
const zoneless_scheduling_impl_1 = require("../change_detection/scheduling/zoneless_scheduling_impl");
const bootstrap_1 = require("../platform/bootstrap");
const profiler_1 = require("../render3/profiler");
const error_handler_1 = require("../error_handler");
/**
 * Internal create application API that implements the core application creation logic and optional
 * bootstrap logic.
 *
 * Platforms (such as `platform-browser`) may require different set of application and platform
 * providers for an application to function correctly. As a result, platforms may use this function
 * internally and supply the necessary providers during the bootstrap, while exposing
 * platform-specific APIs as a part of their public API.
 *
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 */
function internalCreateApplication(config) {
    (0, profiler_1.profiler)(8 /* ProfilerEvent.BootstrapApplicationStart */);
    try {
        const { rootComponent, appProviders, platformProviders } = config;
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && rootComponent !== undefined) {
            (0, errors_1.assertStandaloneComponentType)(rootComponent);
        }
        const platformInjector = (0, platform_1.createOrReusePlatformInjector)(platformProviders);
        // Create root application injector based on a set of providers configured at the platform
        // bootstrap level as well as providers passed to the bootstrap call by a user.
        const allAppProviders = [
            (0, ng_zone_scheduling_1.internalProvideZoneChangeDetection)({}),
            { provide: zoneless_scheduling_1.ChangeDetectionScheduler, useExisting: zoneless_scheduling_impl_1.ChangeDetectionSchedulerImpl },
            error_handler_1.errorHandlerEnvironmentInitializer,
            ...(appProviders || []),
        ];
        const adapter = new ng_module_ref_1.EnvironmentNgModuleRefAdapter({
            providers: allAppProviders,
            parent: platformInjector,
            debugName: typeof ngDevMode === 'undefined' || ngDevMode ? 'Environment Injector' : '',
            // We skip environment initializers because we need to run them inside the NgZone, which
            // happens after we get the NgZone instance from the Injector.
            runEnvironmentInitializers: false,
        });
        return (0, bootstrap_1.bootstrap)({
            r3Injector: adapter.injector,
            platformInjector,
            rootComponent,
        });
    }
    catch (e) {
        return Promise.reject(e);
    }
    finally {
        (0, profiler_1.profiler)(9 /* ProfilerEvent.BootstrapApplicationEnd */);
    }
}
