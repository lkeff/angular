"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENABLE_ROOT_COMPONENT_BOOTSTRAP = void 0;
exports.bootstrap = bootstrap;
exports.setModuleBootstrapImpl = setModuleBootstrapImpl;
const ng_zone_scheduling_1 = require("../change_detection/scheduling/ng_zone_scheduling");
const error_handler_1 = require("../error_handler");
const errors_1 = require("../errors");
const localization_1 = require("../i18n/localization");
const tokens_1 = require("../i18n/tokens");
const image_performance_warning_1 = require("../image_performance_warning");
const platform_destroy_listeners_1 = require("./platform_destroy_listeners");
const i18n_locale_id_1 = require("../render3/i18n/i18n_locale_id");
const ng_zone_1 = require("../zone/ng_zone");
const application_init_1 = require("../application/application_init");
const application_ref_1 = require("../application/application_ref");
const zoneless_scheduling_1 = require("../change_detection/scheduling/zoneless_scheduling");
const di_1 = require("../di");
const stringify_1 = require("../util/stringify");
const lang_1 = require("../util/lang");
/**
 * InjectionToken to control root component bootstrap behavior.
 *
 * This token is primarily used in Angular's server-side rendering (SSR) scenarios,
 * particularly by the `@angular/ssr` package, to manage whether the root component
 * should be bootstrapped during the application initialization process.
 *
 * ## Purpose:
 * During SSR route extraction, setting this token to `false` prevents Angular from
 * bootstrapping the root component. This avoids unnecessary component rendering,
 * enabling route extraction without requiring additional APIs or triggering
 * component logic.
 *
 * ## Behavior:
 * - **`false`**: Prevents the root component from being bootstrapped.
 * - **`true`** (default): Proceeds with the normal root component bootstrap process.
 *
 * This mechanism ensures SSR can efficiently separate route extraction logic
 * from component rendering.
 */
exports.ENABLE_ROOT_COMPONENT_BOOTSTRAP = new di_1.InjectionToken(ngDevMode ? 'ENABLE_ROOT_COMPONENT_BOOTSTRAP' : '');
function isApplicationBootstrapConfig(config) {
    return !config.moduleRef;
}
function bootstrap(config) {
    const envInjector = isApplicationBootstrapConfig(config)
        ? config.r3Injector
        : config.moduleRef.injector;
    const ngZone = envInjector.get(ng_zone_1.NgZone);
    return ngZone.run(() => {
        if (isApplicationBootstrapConfig(config)) {
            config.r3Injector.resolveInjectorInitializers();
        }
        else {
            config.moduleRef.resolveInjectorInitializers();
        }
        const exceptionHandler = envInjector.get(error_handler_1.INTERNAL_APPLICATION_ERROR_HANDLER);
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (envInjector.get(zoneless_scheduling_1.PROVIDED_ZONELESS) && envInjector.get(ng_zone_scheduling_1.PROVIDED_NG_ZONE)) {
                throw new errors_1.RuntimeError(408 /* RuntimeErrorCode.PROVIDED_BOTH_ZONE_AND_ZONELESS */, 'Invalid change detection configuration: ' +
                    'provideZoneChangeDetection and provideZonelessChangeDetection cannot be used together.');
            }
        }
        let onErrorSubscription;
        ngZone.runOutsideAngular(() => {
            onErrorSubscription = ngZone.onError.subscribe({
                next: exceptionHandler,
            });
        });
        // If the whole platform is destroyed, invoke the `destroy` method
        // for all bootstrapped applications as well.
        if (isApplicationBootstrapConfig(config)) {
            const destroyListener = () => envInjector.destroy();
            const onPlatformDestroyListeners = config.platformInjector.get(platform_destroy_listeners_1.PLATFORM_DESTROY_LISTENERS);
            onPlatformDestroyListeners.add(destroyListener);
            envInjector.onDestroy(() => {
                onErrorSubscription.unsubscribe();
                onPlatformDestroyListeners.delete(destroyListener);
            });
        }
        else {
            const destroyListener = () => config.moduleRef.destroy();
            const onPlatformDestroyListeners = config.platformInjector.get(platform_destroy_listeners_1.PLATFORM_DESTROY_LISTENERS);
            onPlatformDestroyListeners.add(destroyListener);
            config.moduleRef.onDestroy(() => {
                (0, application_ref_1.remove)(config.allPlatformModules, config.moduleRef);
                onErrorSubscription.unsubscribe();
                onPlatformDestroyListeners.delete(destroyListener);
            });
        }
        return _callAndReportToErrorHandler(exceptionHandler, ngZone, () => {
            const initStatus = envInjector.get(application_init_1.ApplicationInitStatus);
            initStatus.runInitializers();
            return initStatus.donePromise.then(() => {
                // If the `LOCALE_ID` provider is defined at bootstrap then we set the value for ivy
                const localeId = envInjector.get(tokens_1.LOCALE_ID, localization_1.DEFAULT_LOCALE_ID);
                (0, i18n_locale_id_1.setLocaleId)(localeId || localization_1.DEFAULT_LOCALE_ID);
                const enableRootComponentBoostrap = envInjector.get(exports.ENABLE_ROOT_COMPONENT_BOOTSTRAP, true);
                if (!enableRootComponentBoostrap) {
                    if (isApplicationBootstrapConfig(config)) {
                        return envInjector.get(application_ref_1.ApplicationRef);
                    }
                    config.allPlatformModules.push(config.moduleRef);
                    return config.moduleRef;
                }
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    const imagePerformanceService = envInjector.get(image_performance_warning_1.ImagePerformanceWarning);
                    imagePerformanceService.start();
                }
                if (isApplicationBootstrapConfig(config)) {
                    const appRef = envInjector.get(application_ref_1.ApplicationRef);
                    if (config.rootComponent !== undefined) {
                        appRef.bootstrap(config.rootComponent);
                    }
                    return appRef;
                }
                else {
                    moduleBootstrapImpl === null || moduleBootstrapImpl === void 0 ? void 0 : moduleBootstrapImpl(config.moduleRef, config.allPlatformModules);
                    return config.moduleRef;
                }
            });
        });
    });
}
/**
 * Having a separate symbol for the module boostrap implementation allows us to
 * tree shake the module based boostrap implementation in standalone apps.
 */
let moduleBootstrapImpl;
/**
 * Set the implementation of the module based bootstrap.
 */
function setModuleBootstrapImpl() {
    moduleBootstrapImpl = _moduleDoBootstrap;
}
function _moduleDoBootstrap(moduleRef, allPlatformModules) {
    const appRef = moduleRef.injector.get(application_ref_1.ApplicationRef);
    if (moduleRef._bootstrapComponents.length > 0) {
        moduleRef._bootstrapComponents.forEach((f) => appRef.bootstrap(f));
    }
    else if (moduleRef.instance.ngDoBootstrap) {
        moduleRef.instance.ngDoBootstrap(appRef);
    }
    else {
        throw new errors_1.RuntimeError(-403 /* RuntimeErrorCode.BOOTSTRAP_COMPONENTS_NOT_FOUND */, ngDevMode &&
            `The module ${(0, stringify_1.stringify)(moduleRef.instance.constructor)} was bootstrapped, ` +
                `but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                `Please define one of these.`);
    }
    allPlatformModules.push(moduleRef);
}
function _callAndReportToErrorHandler(errorHandler, ngZone, callback) {
    try {
        const result = callback();
        if ((0, lang_1.isPromise)(result)) {
            return result.catch((e) => {
                ngZone.runOutsideAngular(() => errorHandler(e));
                // rethrow as the exception handler might not do it
                throw e;
            });
        }
        return result;
    }
    catch (e) {
        ngZone.runOutsideAngular(() => errorHandler(e));
        // rethrow as the exception handler might not do it
        throw e;
    }
}
