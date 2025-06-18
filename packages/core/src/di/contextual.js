"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInInjectionContext = runInInjectionContext;
exports.isInInjectionContext = isInInjectionContext;
exports.assertInInjectionContext = assertInInjectionContext;
const errors_1 = require("../errors");
const injector_profiler_1 = require("../render3/debug/injector_profiler");
const inject_switch_1 = require("./inject_switch");
const injector_compatibility_1 = require("./injector_compatibility");
const r3_injector_1 = require("./r3_injector");
/**
 * Runs the given function in the [context](guide/di/dependency-injection-context) of the given
 * `Injector`.
 *
 * Within the function's stack frame, [`inject`](api/core/inject) can be used to inject dependencies
 * from the given `Injector`. Note that `inject` is only usable synchronously, and cannot be used in
 * any asynchronous callbacks or after any `await` points.
 *
 * @param injector the injector which will satisfy calls to [`inject`](api/core/inject) while `fn`
 *     is executing
 * @param fn the closure to be run in the context of `injector`
 * @returns the return value of the function, if any
 * @publicApi
 */
function runInInjectionContext(injector, fn) {
    let internalInjector;
    if (injector instanceof r3_injector_1.R3Injector) {
        (0, r3_injector_1.assertNotDestroyed)(injector);
        internalInjector = injector;
    }
    else {
        internalInjector = new injector_compatibility_1.RetrievingInjector(injector);
    }
    let prevInjectorProfilerContext;
    if (ngDevMode) {
        prevInjectorProfilerContext = (0, injector_profiler_1.setInjectorProfilerContext)({ injector, token: null });
    }
    const prevInjector = (0, injector_compatibility_1.setCurrentInjector)(internalInjector);
    const previousInjectImplementation = (0, inject_switch_1.setInjectImplementation)(undefined);
    try {
        return fn();
    }
    finally {
        (0, injector_compatibility_1.setCurrentInjector)(prevInjector);
        ngDevMode && (0, injector_profiler_1.setInjectorProfilerContext)(prevInjectorProfilerContext);
        (0, inject_switch_1.setInjectImplementation)(previousInjectImplementation);
    }
}
/**
 * Whether the current stack frame is inside an injection context.
 */
function isInInjectionContext() {
    return (0, inject_switch_1.getInjectImplementation)() !== undefined || (0, injector_compatibility_1.getCurrentInjector)() != null;
}
/**
 * Asserts that the current stack frame is within an [injection
 * context](guide/di/dependency-injection-context) and has access to `inject`.
 *
 * @param debugFn a reference to the function making the assertion (used for the error message).
 *
 * @publicApi
 */
function assertInInjectionContext(debugFn) {
    // Taking a `Function` instead of a string name here prevents the unminified name of the function
    // from being retained in the bundle regardless of minification.
    if (!isInInjectionContext()) {
        throw new errors_1.RuntimeError(-203 /* RuntimeErrorCode.MISSING_INJECTION_CONTEXT */, ngDevMode &&
            debugFn.name +
                '() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`');
    }
}
