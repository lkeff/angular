"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterRenderEffect = afterRenderEffect;
const signals_1 = require("../../../primitives/signals");
const tracing_1 = require("../../application/tracing");
const zoneless_scheduling_1 = require("../../change_detection/scheduling/zoneless_scheduling");
const contextual_1 = require("../../di/contextual");
const injector_1 = require("../../di/injector");
const injector_compatibility_1 = require("../../di/injector_compatibility");
const destroy_ref_1 = require("../../linker/destroy_ref");
const hooks_1 = require("../after_render/hooks");
const manager_1 = require("../after_render/manager");
const view_context_1 = require("../view_context");
const asserts_1 = require("./asserts");
const NOT_SET = /* @__PURE__ */ Symbol('NOT_SET');
const EMPTY_CLEANUP_SET = /* @__PURE__ */ new Set();
const AFTER_RENDER_PHASE_EFFECT_NODE = /* @__PURE__ */ (() => (Object.assign(Object.assign({}, signals_1.SIGNAL_NODE), { consumerIsAlwaysLive: true, consumerAllowSignalWrites: true, value: NOT_SET, cleanup: null, 
    /** Called when the effect becomes dirty */
    consumerMarkedDirty() {
        if (this.sequence.impl.executing) {
            // If hooks are in the middle of executing, then it matters whether this node has yet been
            // executed within its sequence. If not, then we don't want to notify the scheduler since
            // this node will be reached naturally.
            if (this.sequence.lastPhase === null || this.sequence.lastPhase < this.phase) {
                return;
            }
            // If during the execution of a later phase an earlier phase became dirty, then we should not
            // run any further phases until the earlier one reruns.
            this.sequence.erroredOrDestroyed = true;
        }
        // Either hooks are not running, or we're marking a node dirty that has already run within its
        // sequence.
        this.sequence.scheduler.notify(7 /* NotificationSource.RenderHook */);
    },
    phaseFn(previousValue) {
        var _a, _b;
        this.sequence.lastPhase = this.phase;
        if (!this.dirty) {
            return this.signal;
        }
        this.dirty = false;
        if (this.value !== NOT_SET && !(0, signals_1.consumerPollProducersForChange)(this)) {
            // None of our producers report a change since the last time they were read, so no
            // recomputation of our value is necessary.
            return this.signal;
        }
        // Run any needed cleanup functions.
        try {
            for (const cleanupFn of (_a = this.cleanup) !== null && _a !== void 0 ? _a : EMPTY_CLEANUP_SET) {
                cleanupFn();
            }
        }
        finally {
            // Even if a cleanup function errors, ensure it's cleared.
            (_b = this.cleanup) === null || _b === void 0 ? void 0 : _b.clear();
        }
        // Prepare to call the user's effect callback. If there was a previous phase, then it gave us
        // its value as a `Signal`, otherwise `previousValue` will be `undefined`.
        const args = [];
        if (previousValue !== undefined) {
            args.push(previousValue);
        }
        args.push(this.registerCleanupFn);
        // Call the user's callback in our reactive context.
        const prevConsumer = (0, signals_1.consumerBeforeComputation)(this);
        let newValue;
        try {
            newValue = this.userFn.apply(null, args);
        }
        finally {
            (0, signals_1.consumerAfterComputation)(this, prevConsumer);
        }
        if (this.value === NOT_SET || !this.equal(this.value, newValue)) {
            this.value = newValue;
            this.version++;
        }
        return this.signal;
    } })))();
/**
 * An `AfterRenderSequence` that manages an `afterRenderEffect`'s phase effects.
 */
class AfterRenderEffectSequence extends manager_1.AfterRenderSequence {
    constructor(impl, effectHooks, view, scheduler, destroyRef, snapshot = null) {
        // Note that we also initialize the underlying `AfterRenderSequence` hooks to `undefined` and
        // populate them as we create reactive nodes below.
        super(impl, [undefined, undefined, undefined, undefined], view, false, destroyRef, snapshot);
        this.scheduler = scheduler;
        /**
         * While this sequence is executing, this tracks the last phase which was called by the
         * `afterRender` machinery.
         *
         * When a phase effect is marked dirty, this is used to determine whether it's already run or not.
         */
        this.lastPhase = null;
        /**
         * The reactive nodes for each phase, if a phase effect is defined for that phase.
         *
         * These are initialized to `undefined` but set in the constructor.
         */
        this.nodes = [undefined, undefined, undefined, undefined];
        // Setup a reactive node for each phase.
        for (const phase of manager_1.AFTER_RENDER_PHASES) {
            const effectHook = effectHooks[phase];
            if (effectHook === undefined) {
                continue;
            }
            const node = Object.create(AFTER_RENDER_PHASE_EFFECT_NODE);
            node.sequence = this;
            node.phase = phase;
            node.userFn = effectHook;
            node.dirty = true;
            node.signal = (() => {
                (0, signals_1.producerAccessed)(node);
                return node.value;
            });
            node.signal[signals_1.SIGNAL] = node;
            node.registerCleanupFn = (fn) => { var _a; return ((_a = node.cleanup) !== null && _a !== void 0 ? _a : (node.cleanup = new Set())).add(fn); };
            this.nodes[phase] = node;
            // Install the upstream hook which runs the `phaseFn` for this phase.
            this.hooks[phase] = (value) => node.phaseFn(value);
        }
    }
    afterRun() {
        super.afterRun();
        // We're done running this sequence, so reset `lastPhase`.
        this.lastPhase = null;
    }
    destroy() {
        var _a;
        super.destroy();
        // Run the cleanup functions for each node.
        for (const node of this.nodes) {
            for (const fn of (_a = node === null || node === void 0 ? void 0 : node.cleanup) !== null && _a !== void 0 ? _a : EMPTY_CLEANUP_SET) {
                fn();
            }
        }
    }
}
/**
 * @publicApi
 */
function afterRenderEffect(callbackOrSpec, options) {
    var _a, _b;
    ngDevMode &&
        (0, asserts_1.assertNotInReactiveContext)(afterRenderEffect, 'Call `afterRenderEffect` outside of a reactive context. For example, create the render ' +
            'effect inside the component constructor`.');
    !(options === null || options === void 0 ? void 0 : options.injector) && (0, contextual_1.assertInInjectionContext)(afterRenderEffect);
    if (typeof ngServerMode !== 'undefined' && ngServerMode) {
        return hooks_1.NOOP_AFTER_RENDER_REF;
    }
    const injector = (_a = options === null || options === void 0 ? void 0 : options.injector) !== null && _a !== void 0 ? _a : (0, injector_compatibility_1.inject)(injector_1.Injector);
    const scheduler = injector.get(zoneless_scheduling_1.ChangeDetectionScheduler);
    const manager = injector.get(manager_1.AfterRenderManager);
    const tracing = injector.get(tracing_1.TracingService, null, { optional: true });
    (_b = manager.impl) !== null && _b !== void 0 ? _b : (manager.impl = injector.get(manager_1.AfterRenderImpl));
    let spec = callbackOrSpec;
    if (typeof spec === 'function') {
        spec = { mixedReadWrite: callbackOrSpec };
    }
    const viewContext = injector.get(view_context_1.ViewContext, null, { optional: true });
    const sequence = new AfterRenderEffectSequence(manager.impl, [spec.earlyRead, spec.write, spec.mixedReadWrite, spec.read], viewContext === null || viewContext === void 0 ? void 0 : viewContext.view, scheduler, injector.get(destroy_ref_1.DestroyRef), tracing === null || tracing === void 0 ? void 0 : tracing.snapshot(null));
    manager.impl.register(sequence);
    return sequence;
}
