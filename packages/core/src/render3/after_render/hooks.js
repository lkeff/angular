"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOOP_AFTER_RENDER_REF = void 0;
exports.afterEveryRender = afterEveryRender;
exports.afterNextRender = afterNextRender;
const tracing_1 = require("../../application/tracing");
const di_1 = require("../../di");
const injector_1 = require("../../di/injector");
const injector_compatibility_1 = require("../../di/injector_compatibility");
const destroy_ref_1 = require("../../linker/destroy_ref");
const performance_1 = require("../../util/performance");
const asserts_1 = require("../reactivity/asserts");
const view_context_1 = require("../view_context");
const manager_1 = require("./manager");
function afterEveryRender(callbackOrSpec, options) {
    var _a;
    ngDevMode &&
        (0, asserts_1.assertNotInReactiveContext)(afterEveryRender, 'Call `afterEveryRender` outside of a reactive context. For example, schedule the render ' +
            'callback inside the component constructor`.');
    !(options === null || options === void 0 ? void 0 : options.injector) && (0, di_1.assertInInjectionContext)(afterEveryRender);
    const injector = (_a = options === null || options === void 0 ? void 0 : options.injector) !== null && _a !== void 0 ? _a : (0, injector_compatibility_1.inject)(injector_1.Injector);
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        return exports.NOOP_AFTER_RENDER_REF;
    }
    (0, performance_1.performanceMarkFeature)('NgAfterRender');
    return afterEveryRenderImpl(callbackOrSpec, injector, options, /* once */ false);
}
function afterNextRender(callbackOrSpec, options) {
    var _a;
    !(options === null || options === void 0 ? void 0 : options.injector) && (0, di_1.assertInInjectionContext)(afterNextRender);
    const injector = (_a = options === null || options === void 0 ? void 0 : options.injector) !== null && _a !== void 0 ? _a : (0, injector_compatibility_1.inject)(injector_1.Injector);
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        return exports.NOOP_AFTER_RENDER_REF;
    }
    (0, performance_1.performanceMarkFeature)('NgAfterNextRender');
    return afterEveryRenderImpl(callbackOrSpec, injector, options, /* once */ true);
}
function getHooks(callbackOrSpec) {
    if (callbackOrSpec instanceof Function) {
        return [undefined, undefined, /* MixedReadWrite */ callbackOrSpec, undefined];
    }
    else {
        return [
            callbackOrSpec.earlyRead,
            callbackOrSpec.write,
            callbackOrSpec.mixedReadWrite,
            callbackOrSpec.read,
        ];
    }
}
/**
 * Shared implementation for `afterEveryRender` and `afterNextRender`.
 */
function afterEveryRenderImpl(callbackOrSpec, injector, options, once) {
    var _a;
    const manager = injector.get(manager_1.AfterRenderManager);
    // Lazily initialize the handler implementation, if necessary. This is so that it can be
    // tree-shaken if `afterEveryRender` and `afterNextRender` aren't used.
    (_a = manager.impl) !== null && _a !== void 0 ? _a : (manager.impl = injector.get(manager_1.AfterRenderImpl));
    const tracing = injector.get(tracing_1.TracingService, null, { optional: true });
    const destroyRef = (options === null || options === void 0 ? void 0 : options.manualCleanup) !== true ? injector.get(destroy_ref_1.DestroyRef) : null;
    const viewContext = injector.get(view_context_1.ViewContext, null, { optional: true });
    const sequence = new manager_1.AfterRenderSequence(manager.impl, getHooks(callbackOrSpec), viewContext === null || viewContext === void 0 ? void 0 : viewContext.view, once, destroyRef, tracing === null || tracing === void 0 ? void 0 : tracing.snapshot(null));
    manager.impl.register(sequence);
    return sequence;
}
/** `AfterRenderRef` that does nothing. */
exports.NOOP_AFTER_RENDER_REF = {
    destroy() { },
};
