"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL_PUBLISH_EXPANDO_KEY = void 0;
exports.publishDefaultGlobalUtils = publishDefaultGlobalUtils;
exports.publishGlobalUtil = publishGlobalUtil;
exports.publishExternalGlobalUtil = publishExternalGlobalUtil;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const assert_1 = require("../../util/assert");
const global_1 = require("../../util/global");
const framework_injector_profiler_1 = require("../debug/framework_injector_profiler");
const profiler_1 = require("../profiler");
const api_1 = require("../reactivity/api");
const change_detection_utils_1 = require("./change_detection_utils");
const defer_1 = require("./defer");
const discovery_utils_1 = require("./discovery_utils");
const injector_discovery_utils_1 = require("./injector_discovery_utils");
const signal_debug_1 = require("./signal_debug");
const chrome_dev_tools_performance_1 = require("../debug/chrome_dev_tools_performance");
/**
 * This file introduces series of globally accessible debug tools
 * to allow for the Angular debugging story to function.
 *
 * To see this in action run the following command:
 *
 *   bazel run //packages/core/test/bundling/todo:devserver
 *
 *  Then load `localhost:5432` and start using the console tools.
 */
/**
 * This value reflects the property on the window where the dev
 * tools are patched (window.ng).
 * */
exports.GLOBAL_PUBLISH_EXPANDO_KEY = 'ng';
const globalUtilsFunctions = {
    /**
     * Warning: functions that start with `ɵ` are considered *INTERNAL* and should not be relied upon
     * in application's code. The contract of those functions might be changed in any release and/or a
     * function can be removed completely.
     */
    'ɵgetDependenciesFromInjectable': injector_discovery_utils_1.getDependenciesFromInjectable,
    'ɵgetInjectorProviders': injector_discovery_utils_1.getInjectorProviders,
    'ɵgetInjectorResolutionPath': injector_discovery_utils_1.getInjectorResolutionPath,
    'ɵgetInjectorMetadata': injector_discovery_utils_1.getInjectorMetadata,
    'ɵsetProfiler': profiler_1.setProfiler,
    'ɵgetSignalGraph': signal_debug_1.getSignalGraph,
    'ɵgetDeferBlocks': defer_1.getDeferBlocks,
    'getDirectiveMetadata': discovery_utils_1.getDirectiveMetadata,
    'getComponent': discovery_utils_1.getComponent,
    'getContext': discovery_utils_1.getContext,
    'getListeners': discovery_utils_1.getListeners,
    'getOwningComponent': discovery_utils_1.getOwningComponent,
    'getHostElement': discovery_utils_1.getHostElement,
    'getInjector': discovery_utils_1.getInjector,
    'getRootComponents': discovery_utils_1.getRootComponents,
    'getDirectives': discovery_utils_1.getDirectives,
    'applyChanges': change_detection_utils_1.applyChanges,
    'isSignal': api_1.isSignal,
    'enableProfiling': chrome_dev_tools_performance_1.enableProfiling,
};
let _published = false;
/**
 * Publishes a collection of default debug tools onto`window.ng`.
 *
 * These functions are available globally when Angular is in development
 * mode and are automatically stripped away from prod mode is on.
 */
function publishDefaultGlobalUtils() {
    if (!_published) {
        _published = true;
        if (typeof window !== 'undefined') {
            // Only configure the injector profiler when running in the browser.
            (0, framework_injector_profiler_1.setupFrameworkInjectorProfiler)();
        }
        for (const [methodName, method] of Object.entries(globalUtilsFunctions)) {
            publishGlobalUtil(methodName, method);
        }
    }
}
/**
 * Publishes the given function to `window.ng` so that it can be
 * used from the browser console when an application is not in production.
 */
function publishGlobalUtil(name, fn) {
    publishUtil(name, fn);
}
/**
 * Publishes the given function to `window.ng` from package other than @angular/core
 * So that it can be used from the browser console when an application is not in production.
 */
function publishExternalGlobalUtil(name, fn) {
    publishUtil(name, fn);
}
function publishUtil(name, fn) {
    var _a;
    if (typeof COMPILED === 'undefined' || !COMPILED) {
        // Note: we can't export `ng` when using closure enhanced optimization as:
        // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
        // - we can't declare a closure extern as the namespace `ng` is already used within Google
        //   for typings for AngularJS (via `goog.provide('ng....')`).
        const w = global_1.global;
        ngDevMode && (0, assert_1.assertDefined)(fn, 'function not defined');
        (_a = w[exports.GLOBAL_PUBLISH_EXPANDO_KEY]) !== null && _a !== void 0 ? _a : (w[exports.GLOBAL_PUBLISH_EXPANDO_KEY] = {});
        w[exports.GLOBAL_PUBLISH_EXPANDO_KEY][name] = fn;
    }
}
