"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_RENDER_MODE_FLAG = void 0;
exports.withDomHydration = withDomHydration;
exports.withI18nSupport = withI18nSupport;
exports.withIncrementalHydration = withIncrementalHydration;
const application_ref_1 = require("../application/application_ref");
const console_1 = require("../console");
const di_1 = require("../di");
const injector_compatibility_1 = require("../di/injector_compatibility");
const errors_1 = require("../errors");
const view_container_ref_1 = require("../linker/view_container_ref");
const i18n_apply_1 = require("../render3/i18n/i18n_apply");
const element_1 = require("../render3/instructions/element");
const element_container_1 = require("../render3/instructions/element_container");
const shared_1 = require("../render3/instructions/shared");
const template_1 = require("../render3/instructions/template");
const text_1 = require("../render3/instructions/text");
const document_1 = require("../render3/interfaces/document");
const transfer_state_1 = require("../transfer_state");
const performance_1 = require("../util/performance");
const zone_1 = require("../zone");
const event_replay_1 = require("./event_replay");
const cleanup_1 = require("./cleanup");
const i18n_1 = require("./i18n");
const tokens_1 = require("./tokens");
const utils_1 = require("./utils");
const views_1 = require("./views");
const registry_1 = require("../defer/registry");
const node_lookup_utils_1 = require("./node_lookup_utils");
const triggering_1 = require("../defer/triggering");
/**
 * Indicates whether the hydration-related code was added,
 * prevents adding it multiple times.
 */
let isHydrationSupportEnabled = false;
/**
 * Indicates whether the i18n-related code was added,
 * prevents adding it multiple times.
 *
 * Note: This merely controls whether the code is loaded,
 * while `setIsI18nHydrationSupportEnabled` determines
 * whether i18n blocks are serialized or hydrated.
 */
let isI18nHydrationRuntimeSupportEnabled = false;
/**
 * Indicates whether the incremental hydration code was added,
 * prevents adding it multiple times.
 */
let isIncrementalHydrationRuntimeSupportEnabled = false;
/**
 * Defines a period of time that Angular waits for the `ApplicationRef.isStable` to emit `true`.
 * If there was no event with the `true` value during this time, Angular reports a warning.
 */
const APPLICATION_IS_STABLE_TIMEOUT = 10000;
/**
 * Brings the necessary hydration code in tree-shakable manner.
 * The code is only present when the `provideClientHydration` is
 * invoked. Otherwise, this code is tree-shaken away during the
 * build optimization step.
 *
 * This technique allows us to swap implementations of methods so
 * tree shaking works appropriately when hydration is disabled or
 * enabled. It brings in the appropriate version of the method that
 * supports hydration only when enabled.
 */
function enableHydrationRuntimeSupport() {
    if (!isHydrationSupportEnabled) {
        isHydrationSupportEnabled = true;
        (0, utils_1.enableRetrieveHydrationInfoImpl)();
        (0, element_1.enableLocateOrCreateElementNodeImpl)();
        (0, text_1.enableLocateOrCreateTextNodeImpl)();
        (0, element_container_1.enableLocateOrCreateElementContainerNodeImpl)();
        (0, template_1.enableLocateOrCreateContainerAnchorImpl)();
        (0, view_container_ref_1.enableLocateOrCreateContainerRefImpl)();
        (0, views_1.enableFindMatchingDehydratedViewImpl)();
        (0, shared_1.enableApplyRootElementTransformImpl)();
    }
}
/**
 * Brings the necessary i18n hydration code in tree-shakable manner.
 * Similar to `enableHydrationRuntimeSupport`, the code is only
 * present when `withI18nSupport` is invoked.
 */
function enableI18nHydrationRuntimeSupport() {
    if (!isI18nHydrationRuntimeSupportEnabled) {
        isI18nHydrationRuntimeSupportEnabled = true;
        (0, i18n_apply_1.enableLocateOrCreateI18nNodeImpl)();
        (0, i18n_1.enablePrepareI18nBlockForHydrationImpl)();
        (0, i18n_1.enableClaimDehydratedIcuCaseImpl)();
    }
}
/**
 * Brings the necessary incremental hydration code in tree-shakable manner.
 * Similar to `enableHydrationRuntimeSupport`, the code is only
 * present when `enableIncrementalHydrationRuntimeSupport` is invoked.
 */
function enableIncrementalHydrationRuntimeSupport() {
    if (!isIncrementalHydrationRuntimeSupportEnabled) {
        isIncrementalHydrationRuntimeSupportEnabled = true;
        (0, utils_1.enableRetrieveDeferBlockDataImpl)();
    }
}
/**
 * Outputs a message with hydration stats into a console.
 */
function printHydrationStats(injector) {
    const console = injector.get(console_1.Console);
    const message = `Angular hydrated ${ngDevMode.hydratedComponents} component(s) ` +
        `and ${ngDevMode.hydratedNodes} node(s), ` +
        `${ngDevMode.componentsSkippedHydration} component(s) were skipped. ` +
        ((0, utils_1.isIncrementalHydrationEnabled)(injector)
            ? `${ngDevMode.deferBlocksWithIncrementalHydration} defer block(s) were configured to use incremental hydration. `
            : '') +
        `Learn more at https://angular.dev/guide/hydration.`;
    // tslint:disable-next-line:no-console
    console.log(message);
}
/**
 * Returns a Promise that is resolved when an application becomes stable.
 */
function whenStableWithTimeout(appRef) {
    const whenStablePromise = appRef.whenStable();
    if (typeof ngDevMode !== 'undefined' && ngDevMode) {
        const timeoutTime = APPLICATION_IS_STABLE_TIMEOUT;
        const console = appRef.injector.get(console_1.Console);
        const ngZone = appRef.injector.get(zone_1.NgZone);
        // The following call should not and does not prevent the app to become stable
        // We cannot use RxJS timer here because the app would remain unstable.
        // This also avoids an extra change detection cycle.
        const timeoutId = ngZone.runOutsideAngular(() => {
            return setTimeout(() => logWarningOnStableTimedout(timeoutTime, console), timeoutTime);
        });
        whenStablePromise.finally(() => clearTimeout(timeoutId));
    }
    return whenStablePromise;
}
/**
 * Defines a name of an attribute that is added to the <body> tag
 * in the `index.html` file in case a given route was configured
 * with `RenderMode.Client`. 'cm' is an abbreviation for "Client Mode".
 */
exports.CLIENT_RENDER_MODE_FLAG = 'ngcm';
/**
 * Checks whether the `RenderMode.Client` was defined for the current route.
 */
function isClientRenderModeEnabled() {
    const doc = (0, document_1.getDocument)();
    return ((typeof ngServerMode === 'undefined' || !ngServerMode) &&
        doc.body.hasAttribute(exports.CLIENT_RENDER_MODE_FLAG));
}
/**
 * Returns a set of providers required to setup hydration support
 * for an application that is server side rendered. This function is
 * included into the `provideClientHydration` public API function from
 * the `platform-browser` package.
 *
 * The function sets up an internal flag that would be recognized during
 * the server side rendering time as well, so there is no need to
 * configure or change anything in NgUniversal to enable the feature.
 */
function withDomHydration() {
    const providers = [
        {
            provide: tokens_1.IS_HYDRATION_DOM_REUSE_ENABLED,
            useFactory: () => {
                let isEnabled = true;
                if (typeof ngServerMode === 'undefined' || !ngServerMode) {
                    // On the client, verify that the server response contains
                    // hydration annotations. Otherwise, keep hydration disabled.
                    const transferState = (0, injector_compatibility_1.inject)(transfer_state_1.TransferState, { optional: true });
                    isEnabled = !!(transferState === null || transferState === void 0 ? void 0 : transferState.get(utils_1.NGH_DATA_KEY, null));
                }
                if (isEnabled) {
                    (0, performance_1.performanceMarkFeature)('NgHydration');
                }
                return isEnabled;
            },
        },
        {
            provide: di_1.ENVIRONMENT_INITIALIZER,
            useValue: () => {
                // i18n support is enabled by calling withI18nSupport(), but there's
                // no way to turn it off (e.g. for tests), so we turn it off by default.
                (0, i18n_1.setIsI18nHydrationSupportEnabled)(false);
                if (typeof ngServerMode !== 'undefined' && ngServerMode) {
                    // Since this function is used across both server and client,
                    // make sure that the runtime code is only added when invoked
                    // on the client (see the `enableHydrationRuntimeSupport` function
                    // call below).
                    return;
                }
                if ((0, injector_compatibility_1.inject)(tokens_1.IS_HYDRATION_DOM_REUSE_ENABLED)) {
                    (0, utils_1.verifySsrContentsIntegrity)((0, document_1.getDocument)());
                    enableHydrationRuntimeSupport();
                }
                else if (typeof ngDevMode !== 'undefined' && ngDevMode && !isClientRenderModeEnabled()) {
                    const console = (0, injector_compatibility_1.inject)(console_1.Console);
                    const message = (0, errors_1.formatRuntimeError)(-505 /* RuntimeErrorCode.MISSING_HYDRATION_ANNOTATIONS */, 'Angular hydration was requested on the client, but there was no ' +
                        'serialized information present in the server response, ' +
                        'thus hydration was not enabled. ' +
                        'Make sure the `provideClientHydration()` is included into the list ' +
                        'of providers in the server part of the application configuration.');
                    console.warn(message);
                }
            },
            multi: true,
        },
    ];
    if (typeof ngServerMode === 'undefined' || !ngServerMode) {
        providers.push({
            provide: tokens_1.PRESERVE_HOST_CONTENT,
            useFactory: () => {
                // Preserve host element content only in a browser
                // environment and when hydration is configured properly.
                // On a server, an application is rendered from scratch,
                // so the host content needs to be empty.
                return (0, injector_compatibility_1.inject)(tokens_1.IS_HYDRATION_DOM_REUSE_ENABLED);
            },
        }, {
            provide: application_ref_1.APP_BOOTSTRAP_LISTENER,
            useFactory: () => {
                if ((0, injector_compatibility_1.inject)(tokens_1.IS_HYDRATION_DOM_REUSE_ENABLED)) {
                    const appRef = (0, injector_compatibility_1.inject)(application_ref_1.ApplicationRef);
                    return () => {
                        // Wait until an app becomes stable and cleanup all views that
                        // were not claimed during the application bootstrap process.
                        // The timing is similar to when we start the serialization process
                        // on the server.
                        //
                        // Note: the cleanup task *MUST* be scheduled within the Angular zone in Zone apps
                        // to ensure that change detection is properly run afterward.
                        whenStableWithTimeout(appRef).then(() => {
                            // Note: we have to check whether the application is destroyed before
                            // performing other operations with the `injector`.
                            // The application may be destroyed **before** it becomes stable, so when
                            // the `whenStableWithTimeout` resolves, the injector might already be in
                            // a destroyed state. Thus, calling `injector.get` would throw an error
                            // indicating that the injector has already been destroyed.
                            if (appRef.destroyed) {
                                return;
                            }
                            (0, cleanup_1.cleanupDehydratedViews)(appRef);
                            if (typeof ngDevMode !== 'undefined' && ngDevMode) {
                                (0, utils_1.countBlocksSkippedByHydration)(appRef.injector);
                                printHydrationStats(appRef.injector);
                            }
                        });
                    };
                }
                return () => { }; // noop
            },
            multi: true,
        });
    }
    return (0, di_1.makeEnvironmentProviders)(providers);
}
/**
 * Returns a set of providers required to setup support for i18n hydration.
 * Requires hydration to be enabled separately.
 */
function withI18nSupport() {
    return [
        {
            provide: tokens_1.IS_I18N_HYDRATION_ENABLED,
            useFactory: () => (0, injector_compatibility_1.inject)(tokens_1.IS_HYDRATION_DOM_REUSE_ENABLED),
        },
        {
            provide: di_1.ENVIRONMENT_INITIALIZER,
            useValue: () => {
                if ((0, injector_compatibility_1.inject)(tokens_1.IS_HYDRATION_DOM_REUSE_ENABLED)) {
                    enableI18nHydrationRuntimeSupport();
                    (0, i18n_1.setIsI18nHydrationSupportEnabled)(true);
                    (0, performance_1.performanceMarkFeature)('NgI18nHydration');
                }
            },
            multi: true,
        },
    ];
}
/**
 * Returns a set of providers required to setup support for incremental hydration.
 * Requires hydration to be enabled separately.
 * Enabling incremental hydration also enables event replay for the entire app.
 */
function withIncrementalHydration() {
    const providers = [
        (0, event_replay_1.withEventReplay)(),
        {
            provide: tokens_1.IS_INCREMENTAL_HYDRATION_ENABLED,
            useValue: true,
        },
        {
            provide: registry_1.DEHYDRATED_BLOCK_REGISTRY,
            useClass: registry_1.DehydratedBlockRegistry,
        },
        {
            provide: di_1.ENVIRONMENT_INITIALIZER,
            useValue: () => {
                enableIncrementalHydrationRuntimeSupport();
                (0, performance_1.performanceMarkFeature)('NgIncrementalHydration');
            },
            multi: true,
        },
    ];
    if (typeof ngServerMode === 'undefined' || !ngServerMode) {
        providers.push({
            provide: application_ref_1.APP_BOOTSTRAP_LISTENER,
            useFactory: () => {
                const injector = (0, injector_compatibility_1.inject)(di_1.Injector);
                const doc = (0, document_1.getDocument)();
                return () => {
                    const deferBlockData = (0, utils_1.processBlockData)(injector);
                    const commentsByBlockId = (0, node_lookup_utils_1.gatherDeferBlocksCommentNodes)(doc, doc.body);
                    (0, triggering_1.processAndInitTriggers)(injector, deferBlockData, commentsByBlockId);
                    (0, utils_1.appendDeferBlocksToJSActionMap)(doc, injector);
                };
            },
            multi: true,
        });
    }
    return providers;
}
/**
 *
 * @param time The time in ms until the stable timedout warning message is logged
 */
function logWarningOnStableTimedout(time, console) {
    const message = `Angular hydration expected the ApplicationRef.isStable() to emit \`true\`, but it ` +
        `didn't happen within ${time}ms. Angular hydration logic depends on the application becoming stable ` +
        `as a signal to complete hydration process.`;
    console.warn((0, errors_1.formatRuntimeError)(-506 /* RuntimeErrorCode.HYDRATION_STABLE_TIMEDOUT */, message));
}
