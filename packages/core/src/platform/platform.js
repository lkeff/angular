"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOW_MULTIPLE_PLATFORMS = void 0;
exports.createPlatform = createPlatform;
exports.createPlatformFactory = createPlatformFactory;
exports.assertPlatform = assertPlatform;
exports.getPlatform = getPlatform;
exports.destroyPlatform = destroyPlatform;
exports.createOrReusePlatformInjector = createOrReusePlatformInjector;
exports.providePlatformInitializer = providePlatformInitializer;
const application_ref_1 = require("../application/application_ref");
const application_tokens_1 = require("../application/application_tokens");
const di_1 = require("../di");
const scope_1 = require("../di/scope");
const errors_1 = require("../errors");
const platform_ref_1 = require("./platform_ref");
const platform_destroy_listeners_1 = require("./platform_destroy_listeners");
let _platformInjector = null;
/**
 * Internal token to indicate whether having multiple bootstrapped platform should be allowed (only
 * one bootstrapped platform is allowed by default). This token helps to support SSR scenarios.
 */
exports.ALLOW_MULTIPLE_PLATFORMS = new di_1.InjectionToken(ngDevMode ? 'AllowMultipleToken' : '');
/**
 * Creates a platform.
 * Platforms must be created on launch using this function.
 *
 * @publicApi
 */
function createPlatform(injector) {
    if (_platformInjector && !_platformInjector.get(exports.ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new errors_1.RuntimeError(400 /* RuntimeErrorCode.MULTIPLE_PLATFORMS */, ngDevMode && 'There can be only one platform. Destroy the previous one to create a new one.');
    }
    (0, application_ref_1.publishDefaultGlobalUtils)();
    (0, application_ref_1.publishSignalConfiguration)();
    _platformInjector = injector;
    const platform = injector.get(platform_ref_1.PlatformRef);
    runPlatformInitializers(injector);
    return platform;
}
/**
 * Creates a factory for a platform. Can be used to provide or override `Providers` specific to
 * your application's runtime needs, such as `PLATFORM_INITIALIZER` and `PLATFORM_ID`.
 * @param parentPlatformFactory Another platform factory to modify. Allows you to compose factories
 * to build up configurations that might be required by different libraries or parts of the
 * application.
 * @param name Identifies the new platform factory.
 * @param providers A set of dependency providers for platforms created with the new factory.
 *
 * @publicApi
 */
function createPlatformFactory(parentPlatformFactory, name, providers = []) {
    const desc = `Platform: ${name}`;
    const marker = new di_1.InjectionToken(desc);
    return (extraProviders = []) => {
        let platform = getPlatform();
        if (!platform || platform.injector.get(exports.ALLOW_MULTIPLE_PLATFORMS, false)) {
            const platformProviders = [
                ...providers,
                ...extraProviders,
                { provide: marker, useValue: true },
            ];
            if (parentPlatformFactory) {
                parentPlatformFactory(platformProviders);
            }
            else {
                createPlatform(createPlatformInjector(platformProviders, desc));
            }
        }
        return assertPlatform(marker);
    };
}
/**
 * Helper function to create an instance of a platform injector (that maintains the 'platform'
 * scope).
 */
function createPlatformInjector(providers = [], name) {
    return di_1.Injector.create({
        name,
        providers: [
            { provide: scope_1.INJECTOR_SCOPE, useValue: 'platform' },
            { provide: platform_destroy_listeners_1.PLATFORM_DESTROY_LISTENERS, useValue: new Set([() => (_platformInjector = null)]) },
            ...providers,
        ],
    });
}
/**
 * Checks that there is currently a platform that contains the given token as a provider.
 *
 * @publicApi
 */
function assertPlatform(requiredToken) {
    const platform = getPlatform();
    if (!platform) {
        throw new errors_1.RuntimeError(401 /* RuntimeErrorCode.PLATFORM_NOT_FOUND */, ngDevMode && 'No platform exists!');
    }
    if ((typeof ngDevMode === 'undefined' || ngDevMode) &&
        !platform.injector.get(requiredToken, null)) {
        throw new errors_1.RuntimeError(400 /* RuntimeErrorCode.MULTIPLE_PLATFORMS */, 'A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
/**
 * Returns the current platform.
 *
 * @publicApi
 */
function getPlatform() {
    var _a;
    return (_a = _platformInjector === null || _platformInjector === void 0 ? void 0 : _platformInjector.get(platform_ref_1.PlatformRef)) !== null && _a !== void 0 ? _a : null;
}
/**
 * Destroys the current Angular platform and all Angular applications on the page.
 * Destroys all modules and listeners registered with the platform.
 *
 * @publicApi
 */
function destroyPlatform() {
    var _a;
    (_a = getPlatform()) === null || _a === void 0 ? void 0 : _a.destroy();
}
/**
 * The goal of this function is to bootstrap a platform injector,
 * but avoid referencing `PlatformRef` class.
 * This function is needed for bootstrapping a Standalone Component.
 */
function createOrReusePlatformInjector(providers = []) {
    // If a platform injector already exists, it means that the platform
    // is already bootstrapped and no additional actions are required.
    if (_platformInjector)
        return _platformInjector;
    (0, application_ref_1.publishDefaultGlobalUtils)();
    // Otherwise, setup a new platform injector and run platform initializers.
    const injector = createPlatformInjector(providers);
    _platformInjector = injector;
    (0, application_ref_1.publishSignalConfiguration)();
    runPlatformInitializers(injector);
    return injector;
}
/**
 * @description
 * This function is used to provide initialization functions that will be executed upon
 * initialization of the platform injector.
 *
 * Note that the provided initializer is run in the injection context.
 *
 * Previously, this was achieved using the `PLATFORM_INITIALIZER` token which is now deprecated.
 *
 * @see {@link PLATFORM_INITIALIZER}
 *
 * @publicApi
 */
function providePlatformInitializer(initializerFn) {
    return (0, di_1.makeEnvironmentProviders)([
        {
            provide: application_tokens_1.PLATFORM_INITIALIZER,
            useValue: initializerFn,
            multi: true,
        },
    ]);
}
function runPlatformInitializers(injector) {
    const inits = injector.get(application_tokens_1.PLATFORM_INITIALIZER, null);
    (0, di_1.runInInjectionContext)(injector, () => {
        inits === null || inits === void 0 ? void 0 : inits.forEach((init) => init());
    });
}
