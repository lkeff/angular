"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_EFFECT_NODE = exports.ROOT_EFFECT_NODE = exports.BASE_EFFECT_NODE = exports.EffectRefImpl = void 0;
exports.effect = effect;
exports.createViewEffect = createViewEffect;
exports.createRootEffect = createRootEffect;
const signals_1 = require("../../../primitives/signals");
const view_1 = require("../interfaces/view");
const view_utils_1 = require("../util/view_utils");
const injector_compatibility_1 = require("../../di/injector_compatibility");
const injector_1 = require("../../di/injector");
const asserts_1 = require("./asserts");
const contextual_1 = require("../../di/contextual");
const destroy_ref_1 = require("../../linker/destroy_ref");
const view_context_1 = require("../view_context");
const noop_1 = require("../../util/noop");
const zoneless_scheduling_1 = require("../../change_detection/scheduling/zoneless_scheduling");
const state_1 = require("../state");
const root_effect_scheduler_1 = require("./root_effect_scheduler");
const injector_profiler_1 = require("../debug/injector_profiler");
class EffectRefImpl {
    constructor(node) {
        this[signals_1.SIGNAL] = node;
    }
    destroy() {
        this[signals_1.SIGNAL].destroy();
    }
}
exports.EffectRefImpl = EffectRefImpl;
/**
 * Registers an "effect" that will be scheduled & executed whenever the signals that it reads
 * changes.
 *
 * Angular has two different kinds of effect: component effects and root effects. Component effects
 * are created when `effect()` is called from a component, directive, or within a service of a
 * component/directive. Root effects are created when `effect()` is called from outside the
 * component tree, such as in a root service.
 *
 * The two effect types differ in their timing. Component effects run as a component lifecycle
 * event during Angular's synchronization (change detection) process, and can safely read input
 * signals or create/destroy views that depend on component state. Root effects run as microtasks
 * and have no connection to the component tree or change detection.
 *
 * `effect()` must be run in injection context, unless the `injector` option is manually specified.
 *
 * @publicApi 20.0
 */
function effect(effectFn, options) {
    var _a, _b;
    ngDevMode &&
        (0, asserts_1.assertNotInReactiveContext)(effect, 'Call `effect` outside of a reactive context. For example, schedule the ' +
            'effect inside the component constructor.');
    !(options === null || options === void 0 ? void 0 : options.injector) && (0, contextual_1.assertInInjectionContext)(effect);
    if (ngDevMode && (options === null || options === void 0 ? void 0 : options.allowSignalWrites) !== undefined) {
        console.warn(`The 'allowSignalWrites' flag is deprecated and no longer impacts effect() (writes are always allowed)`);
    }
    const injector = (_a = options === null || options === void 0 ? void 0 : options.injector) !== null && _a !== void 0 ? _a : (0, injector_compatibility_1.inject)(injector_1.Injector);
    let destroyRef = (options === null || options === void 0 ? void 0 : options.manualCleanup) !== true ? injector.get(destroy_ref_1.DestroyRef) : null;
    let node;
    const viewContext = injector.get(view_context_1.ViewContext, null, { optional: true });
    const notifier = injector.get(zoneless_scheduling_1.ChangeDetectionScheduler);
    if (viewContext !== null) {
        // This effect was created in the context of a view, and will be associated with the view.
        node = createViewEffect(viewContext.view, notifier, effectFn);
        if (destroyRef instanceof destroy_ref_1.NodeInjectorDestroyRef && destroyRef._lView === viewContext.view) {
            // The effect is being created in the same view as the `DestroyRef` references, so it will be
            // automatically destroyed without the need for an explicit `DestroyRef` registration.
            destroyRef = null;
        }
    }
    else {
        // This effect was created outside the context of a view, and will be scheduled independently.
        node = createRootEffect(effectFn, injector.get(root_effect_scheduler_1.EffectScheduler), notifier);
    }
    node.injector = injector;
    if (destroyRef !== null) {
        // If we need to register for cleanup, do that here.
        node.onDestroyFn = destroyRef.onDestroy(() => node.destroy());
    }
    const effectRef = new EffectRefImpl(node);
    if (ngDevMode) {
        node.debugName = (_b = options === null || options === void 0 ? void 0 : options.debugName) !== null && _b !== void 0 ? _b : '';
        const prevInjectorProfilerContext = (0, injector_profiler_1.setInjectorProfilerContext)({ injector, token: null });
        try {
            (0, injector_profiler_1.emitEffectCreatedEvent)(effectRef);
        }
        finally {
            (0, injector_profiler_1.setInjectorProfilerContext)(prevInjectorProfilerContext);
        }
    }
    return effectRef;
}
exports.BASE_EFFECT_NODE = 
/* @__PURE__ */ (() => (Object.assign(Object.assign({}, signals_1.REACTIVE_NODE), { consumerIsAlwaysLive: true, consumerAllowSignalWrites: true, dirty: true, hasRun: false, cleanupFns: undefined, zone: null, kind: 'effect', onDestroyFn: noop_1.noop, run() {
        this.dirty = false;
        if (ngDevMode && (0, signals_1.isInNotificationPhase)()) {
            throw new Error(`Schedulers cannot synchronously execute watches while scheduling.`);
        }
        if (this.hasRun && !(0, signals_1.consumerPollProducersForChange)(this)) {
            return;
        }
        this.hasRun = true;
        const registerCleanupFn = (cleanupFn) => { var _a; return ((_a = this.cleanupFns) !== null && _a !== void 0 ? _a : (this.cleanupFns = [])).push(cleanupFn); };
        const prevNode = (0, signals_1.consumerBeforeComputation)(this);
        // We clear `setIsRefreshingViews` so that `markForCheck()` within the body of an effect will
        // cause CD to reach the component in question.
        const prevRefreshingViews = (0, state_1.setIsRefreshingViews)(false);
        try {
            this.maybeCleanup();
            this.fn(registerCleanupFn);
        }
        finally {
            (0, state_1.setIsRefreshingViews)(prevRefreshingViews);
            (0, signals_1.consumerAfterComputation)(this, prevNode);
        }
    },
    maybeCleanup() {
        var _a;
        if (!((_a = this.cleanupFns) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            // Attempt to run the cleanup functions. Regardless of failure or success, we consider
            // cleanup "completed" and clear the list for the next run of the effect. Note that an error
            // from the cleanup function will still crash the current run of the effect.
            while (this.cleanupFns.length) {
                this.cleanupFns.pop()();
            }
        }
        finally {
            this.cleanupFns = [];
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    } })))();
exports.ROOT_EFFECT_NODE = 
/* @__PURE__ */ (() => (Object.assign(Object.assign({}, exports.BASE_EFFECT_NODE), { consumerMarkedDirty() {
        this.scheduler.schedule(this);
        this.notifier.notify(12 /* NotificationSource.RootEffect */);
    },
    destroy() {
        (0, signals_1.consumerDestroy)(this);
        this.onDestroyFn();
        this.maybeCleanup();
        this.scheduler.remove(this);
    } })))();
exports.VIEW_EFFECT_NODE = 
/* @__PURE__ */ (() => (Object.assign(Object.assign({}, exports.BASE_EFFECT_NODE), { consumerMarkedDirty() {
        this.view[view_1.FLAGS] |= 8192 /* LViewFlags.HasChildViewsToRefresh */;
        (0, view_utils_1.markAncestorsForTraversal)(this.view);
        this.notifier.notify(13 /* NotificationSource.ViewEffect */);
    },
    destroy() {
        var _a;
        (0, signals_1.consumerDestroy)(this);
        this.onDestroyFn();
        this.maybeCleanup();
        (_a = this.view[view_1.EFFECTS]) === null || _a === void 0 ? void 0 : _a.delete(this);
    } })))();
function createViewEffect(view, notifier, fn) {
    var _a;
    const node = Object.create(exports.VIEW_EFFECT_NODE);
    node.view = view;
    node.zone = typeof Zone !== 'undefined' ? Zone.current : null;
    node.notifier = notifier;
    node.fn = fn;
    (_a = view[view_1.EFFECTS]) !== null && _a !== void 0 ? _a : (view[view_1.EFFECTS] = new Set());
    view[view_1.EFFECTS].add(node);
    node.consumerMarkedDirty(node);
    return node;
}
function createRootEffect(fn, scheduler, notifier) {
    const node = Object.create(exports.ROOT_EFFECT_NODE);
    node.fn = fn;
    node.scheduler = scheduler;
    node.notifier = notifier;
    node.zone = typeof Zone !== 'undefined' ? Zone.current : null;
    node.scheduler.add(node);
    node.notifier.notify(12 /* NotificationSource.RootEffect */);
    return node;
}
