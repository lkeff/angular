"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwRegistrationOptions = exports.SCRIPT = void 0;
exports.ngswAppInitializer = ngswAppInitializer;
exports.ngswCommChannelFactory = ngswCommChannelFactory;
exports.provideServiceWorker = provideServiceWorker;
const core_1 = require("@angular/core");
const low_level_1 = require("./low_level");
const push_1 = require("./push");
const update_1 = require("./update");
exports.SCRIPT = new core_1.InjectionToken(ngDevMode ? 'NGSW_REGISTER_SCRIPT' : '');
function ngswAppInitializer() {
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        return;
    }
    const options = (0, core_1.inject)(SwRegistrationOptions);
    if (!('serviceWorker' in navigator && options.enabled !== false)) {
        return;
    }
    const script = (0, core_1.inject)(exports.SCRIPT);
    const ngZone = (0, core_1.inject)(core_1.NgZone);
    const appRef = (0, core_1.inject)(core_1.ApplicationRef);
    // Set up the `controllerchange` event listener outside of
    // the Angular zone to avoid unnecessary change detections,
    // as this event has no impact on view updates.
    ngZone.runOutsideAngular(() => {
        // Wait for service worker controller changes, and fire an INITIALIZE action when a new SW
        // becomes active. This allows the SW to initialize itself even if there is no application
        // traffic.
        const sw = navigator.serviceWorker;
        const onControllerChange = () => { var _a; return (_a = sw.controller) === null || _a === void 0 ? void 0 : _a.postMessage({ action: 'INITIALIZE' }); };
        sw.addEventListener('controllerchange', onControllerChange);
        appRef.onDestroy(() => {
            sw.removeEventListener('controllerchange', onControllerChange);
        });
    });
    // Run outside the Angular zone to avoid preventing the app from stabilizing (especially
    // given that some registration strategies wait for the app to stabilize).
    ngZone.runOutsideAngular(() => {
        let readyToRegister;
        const { registrationStrategy } = options;
        if (typeof registrationStrategy === 'function') {
            readyToRegister = new Promise((resolve) => registrationStrategy().subscribe(() => resolve()));
        }
        else {
            const [strategy, ...args] = (registrationStrategy || 'registerWhenStable:30000').split(':');
            switch (strategy) {
                case 'registerImmediately':
                    readyToRegister = Promise.resolve();
                    break;
                case 'registerWithDelay':
                    readyToRegister = delayWithTimeout(+args[0] || 0);
                    break;
                case 'registerWhenStable':
                    readyToRegister = Promise.race([appRef.whenStable(), delayWithTimeout(+args[0])]);
                    break;
                default:
                    // Unknown strategy.
                    throw new core_1.ɵRuntimeError(5600 /* RuntimeErrorCode.UNKNOWN_REGISTRATION_STRATEGY */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                        `Unknown ServiceWorker registration strategy: ${options.registrationStrategy}`);
            }
        }
        // Don't return anything to avoid blocking the application until the SW is registered.
        // Catch and log the error if SW registration fails to avoid uncaught rejection warning.
        readyToRegister.then(() => navigator.serviceWorker
            .register(script, { scope: options.scope })
            .catch((err) => console.error((0, core_1.ɵformatRuntimeError)(5604 /* RuntimeErrorCode.SERVICE_WORKER_REGISTRATION_FAILED */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
            'Service worker registration failed with: ' + err))));
    });
}
function delayWithTimeout(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}
function ngswCommChannelFactory(opts, injector) {
    const isBrowser = !(typeof ngServerMode !== 'undefined' && ngServerMode);
    return new low_level_1.NgswCommChannel(isBrowser && opts.enabled !== false ? navigator.serviceWorker : undefined, injector);
}
/**
 * Token that can be used to provide options for `ServiceWorkerModule` outside of
 * `ServiceWorkerModule.register()`.
 *
 * You can use this token to define a provider that generates the registration options at runtime,
 * for example via a function call:
 *
 * {@example service-worker/registration-options/module.ts region="registration-options"
 *     header="app.module.ts"}
 *
 * @publicApi
 */
class SwRegistrationOptions {
}
exports.SwRegistrationOptions = SwRegistrationOptions;
/**
 * @publicApi
 *
 * Sets up providers to register the given Angular Service Worker script.
 *
 * If `enabled` is set to `false` in the given options, the module will behave as if service
 * workers are not supported by the browser, and the service worker will not be registered.
 *
 * Example usage:
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideServiceWorker('ngsw-worker.js')
 *   ],
 * });
 * ```
 */
function provideServiceWorker(script, options = {}) {
    return (0, core_1.makeEnvironmentProviders)([
        push_1.SwPush,
        update_1.SwUpdate,
        { provide: exports.SCRIPT, useValue: script },
        { provide: SwRegistrationOptions, useValue: options },
        {
            provide: low_level_1.NgswCommChannel,
            useFactory: ngswCommChannelFactory,
            deps: [SwRegistrationOptions, core_1.Injector],
        },
        (0, core_1.provideAppInitializer)(ngswAppInitializer),
    ]);
}
