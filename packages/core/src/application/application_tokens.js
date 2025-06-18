"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_CONFIG = exports.IMAGE_CONFIG_DEFAULTS = exports.CSP_NONCE = exports.ANIMATION_MODULE_TYPE = exports.PACKAGE_ROOT_URL = exports.PLATFORM_ID = exports.PLATFORM_INITIALIZER = exports.APP_ID = void 0;
const injection_token_1 = require("../di/injection_token");
const document_1 = require("../render3/interfaces/document");
/**
 * A DI token representing a string ID, used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated} is being used.
 *
 * The token is needed in cases when multiple applications are bootstrapped on a page
 * (for example, using `bootstrapApplication` calls). In this case, ensure that those applications
 * have different `APP_ID` value setup. For example:
 *
 * ```ts
 * bootstrapApplication(ComponentA, {
 *   providers: [
 *     { provide: APP_ID, useValue: 'app-a' },
 *     // ... other providers ...
 *   ]
 * });
 *
 * bootstrapApplication(ComponentB, {
 *   providers: [
 *     { provide: APP_ID, useValue: 'app-b' },
 *     // ... other providers ...
 *   ]
 * });
 * ```
 *
 * By default, when there is only one application bootstrapped, you don't need to provide the
 * `APP_ID` token (the `ng` will be used as an app ID).
 *
 * @publicApi
 */
exports.APP_ID = new injection_token_1.InjectionToken(ngDevMode ? 'AppId' : '', {
    providedIn: 'root',
    factory: () => DEFAULT_APP_ID,
});
/** Default value of the `APP_ID` token. */
const DEFAULT_APP_ID = 'ng';
/**
 * A function that is executed when a platform is initialized.
 *
 * @deprecated from v19.0.0, use providePlatformInitializer instead
 *
 * @see {@link providePlatformInitializer}
 *
 * @publicApi
 */
exports.PLATFORM_INITIALIZER = new injection_token_1.InjectionToken(ngDevMode ? 'Platform Initializer' : '');
/**
 * A token that indicates an opaque platform ID.
 * @publicApi
 */
exports.PLATFORM_ID = new injection_token_1.InjectionToken(ngDevMode ? 'Platform ID' : '', {
    providedIn: 'platform',
    factory: () => 'unknown', // set a default platform name, when none set explicitly
});
/**
 * A DI token that indicates the root directory of
 * the application
 * @publicApi
 * @deprecated
 */
exports.PACKAGE_ROOT_URL = new injection_token_1.InjectionToken(ngDevMode ? 'Application Packages Root URL' : '');
// We keep this token here, rather than the animations package, so that modules that only care
// about which animations module is loaded (e.g. the CDK) can retrieve it without having to
// include extra dependencies. See #44970 for more context.
/**
 * A [DI token](api/core/InjectionToken) that indicates which animations
 * module has been loaded.
 * @publicApi
 */
exports.ANIMATION_MODULE_TYPE = new injection_token_1.InjectionToken(ngDevMode ? 'AnimationModuleType' : '');
// TODO(crisbeto): link to CSP guide here.
/**
 * Token used to configure the [Content Security Policy](https://web.dev/strict-csp/) nonce that
 * Angular will apply when inserting inline styles. If not provided, Angular will look up its value
 * from the `ngCspNonce` attribute of the application root node.
 *
 * @publicApi
 */
exports.CSP_NONCE = new injection_token_1.InjectionToken(ngDevMode ? 'CSP nonce' : '', {
    providedIn: 'root',
    factory: () => {
        var _a, _b;
        // Ideally we wouldn't have to use `querySelector` here since we know that the nonce will be on
        // the root node, but because the token value is used in renderers, it has to be available
        // *very* early in the bootstrapping process. This should be a fairly shallow search, because
        // the app won't have been added to the DOM yet. Some approaches that were considered:
        // 1. Find the root node through `ApplicationRef.components[i].location` - normally this would
        // be enough for our purposes, but the token is injected very early so the `components` array
        // isn't populated yet.
        // 2. Find the root `LView` through the current `LView` - renderers are a prerequisite to
        // creating the `LView`. This means that no `LView` will have been entered when this factory is
        // invoked for the root component.
        // 3. Have the token factory return `() => string` which is invoked when a nonce is requested -
        // the slightly later execution does allow us to get an `LView` reference, but the fact that
        // it is a function means that it could be executed at *any* time (including immediately) which
        // may lead to weird bugs.
        // 4. Have the `ComponentFactory` read the attribute and provide it to the injector under the
        // hood - has the same problem as #1 and #2 in that the renderer is used to query for the root
        // node and the nonce value needs to be available when the renderer is created.
        return ((_b = (_a = (0, document_1.getDocument)().body) === null || _a === void 0 ? void 0 : _a.querySelector('[ngCspNonce]')) === null || _b === void 0 ? void 0 : _b.getAttribute('ngCspNonce')) || null;
    },
});
exports.IMAGE_CONFIG_DEFAULTS = {
    breakpoints: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    placeholderResolution: 30,
    disableImageSizeWarning: false,
    disableImageLazyLoadWarning: false,
};
/**
 * Injection token that configures the image optimized image functionality.
 * See {@link ImageConfig} for additional information about parameters that
 * can be used.
 *
 * @see {@link NgOptimizedImage}
 * @see {@link ImageConfig}
 * @publicApi
 */
exports.IMAGE_CONFIG = new injection_token_1.InjectionToken(ngDevMode ? 'ImageConfig' : '', {
    providedIn: 'root',
    factory: () => exports.IMAGE_CONFIG_DEFAULTS,
});
