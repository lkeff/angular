"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceImpl = void 0;
exports.resource = resource;
const untracked_1 = require("../render3/reactivity/untracked");
const computed_1 = require("../render3/reactivity/computed");
const signal_1 = require("../render3/reactivity/signal");
const effect_1 = require("../render3/reactivity/effect");
const injector_1 = require("../di/injector");
const contextual_1 = require("../di/contextual");
const injector_compatibility_1 = require("../di/injector_compatibility");
const pending_tasks_1 = require("../pending_tasks");
const linked_signal_1 = require("../render3/reactivity/linked_signal");
const destroy_ref_1 = require("../linker/destroy_ref");
function resource(options) {
    var _a, _b, _c;
    (options === null || options === void 0 ? void 0 : options.injector) || (0, contextual_1.assertInInjectionContext)(resource);
    const oldNameForParams = options.request;
    const params = ((_b = (_a = options.params) !== null && _a !== void 0 ? _a : oldNameForParams) !== null && _b !== void 0 ? _b : (() => null));
    return new ResourceImpl(params, getLoader(options), options.defaultValue, options.equal ? wrapEqualityFn(options.equal) : undefined, (_c = options.injector) !== null && _c !== void 0 ? _c : (0, injector_compatibility_1.inject)(injector_1.Injector));
}
/**
 * Base class which implements `.value` as a `WritableSignal` by delegating `.set` and `.update`.
 */
class BaseWritableResource {
    constructor(value) {
        this.isLoading = (0, computed_1.computed)(() => this.status() === 'loading' || this.status() === 'reloading');
        this.value = value;
        this.value.set = this.set.bind(this);
        this.value.update = this.update.bind(this);
        this.value.asReadonly = signal_1.signalAsReadonlyFn;
    }
    update(updateFn) {
        this.set(updateFn((0, untracked_1.untracked)(this.value)));
    }
    hasValue() {
        return this.value() !== undefined;
    }
    asReadonly() {
        return this;
    }
}
/**
 * Implementation for `resource()` which uses a `linkedSignal` to manage the resource's state.
 */
class ResourceImpl extends BaseWritableResource {
    constructor(request, loaderFn, defaultValue, equal, injector) {
        super(
        // Feed a computed signal for the value to `BaseWritableResource`, which will upgrade it to a
        // `WritableSignal` that delegates to `ResourceImpl.set`.
        (0, computed_1.computed)(() => {
            var _a, _b;
            const streamValue = (_b = (_a = this.state()).stream) === null || _b === void 0 ? void 0 : _b.call(_a);
            return streamValue && isResolved(streamValue) ? streamValue.value : this.defaultValue;
        }, { equal }));
        this.loaderFn = loaderFn;
        this.defaultValue = defaultValue;
        this.equal = equal;
        this.resolvePendingTask = undefined;
        this.destroyed = false;
        this.status = (0, computed_1.computed)(() => projectStatusOfState(this.state()));
        this.error = (0, computed_1.computed)(() => {
            var _a, _b;
            const stream = (_b = (_a = this.state()).stream) === null || _b === void 0 ? void 0 : _b.call(_a);
            return stream && !isResolved(stream) ? stream.error : undefined;
        });
        // Extend `request()` to include a writable reload signal.
        this.extRequest = (0, linked_signal_1.linkedSignal)({
            source: request,
            computation: (request) => ({ request, reload: 0 }),
        });
        // The main resource state is managed in a `linkedSignal`, which allows the resource to change
        // state instantaneously when the request signal changes.
        this.state = (0, linked_signal_1.linkedSignal)({
            // Whenever the request changes,
            source: this.extRequest,
            // Compute the state of the resource given a change in status.
            computation: (extRequest, previous) => {
                const status = extRequest.request === undefined ? 'idle' : 'loading';
                if (!previous) {
                    return {
                        extRequest,
                        status,
                        previousStatus: 'idle',
                        stream: undefined,
                    };
                }
                else {
                    return {
                        extRequest,
                        status,
                        previousStatus: projectStatusOfState(previous.value),
                        // If the request hasn't changed, keep the previous stream.
                        stream: previous.value.extRequest.request === extRequest.request
                            ? previous.value.stream
                            : undefined,
                    };
                }
            },
        });
        this.effectRef = (0, effect_1.effect)(this.loadEffect.bind(this), {
            injector,
            manualCleanup: true,
        });
        this.pendingTasks = injector.get(pending_tasks_1.PendingTasks);
        // Cancel any pending request when the resource itself is destroyed.
        injector.get(destroy_ref_1.DestroyRef).onDestroy(() => this.destroy());
    }
    /**
     * Called either directly via `WritableResource.set` or via `.value.set()`.
     */
    set(value) {
        if (this.destroyed) {
            return;
        }
        const current = (0, untracked_1.untracked)(this.value);
        const state = (0, untracked_1.untracked)(this.state);
        if (state.status === 'local' && (this.equal ? this.equal(current, value) : current === value)) {
            return;
        }
        // Enter Local state with the user-defined value.
        this.state.set({
            extRequest: state.extRequest,
            status: 'local',
            previousStatus: 'local',
            stream: (0, signal_1.signal)({ value }),
        });
        // We're departing from whatever state the resource was in previously, so cancel any in-progress
        // loading operations.
        this.abortInProgressLoad();
    }
    reload() {
        // We don't want to restart in-progress loads.
        const { status } = (0, untracked_1.untracked)(this.state);
        if (status === 'idle' || status === 'loading') {
            return false;
        }
        // Increment the request reload to trigger the `state` linked signal to switch us to `Reload`
        this.extRequest.update(({ request, reload }) => ({ request, reload: reload + 1 }));
        return true;
    }
    destroy() {
        this.destroyed = true;
        this.effectRef.destroy();
        this.abortInProgressLoad();
        // Destroyed resources enter Idle state.
        this.state.set({
            extRequest: { request: undefined, reload: 0 },
            status: 'idle',
            previousStatus: 'idle',
            stream: undefined,
        });
    }
    loadEffect() {
        return __awaiter(this, void 0, void 0, function* () {
            const extRequest = this.extRequest();
            // Capture the previous status before any state transitions. Note that this is `untracked` since
            // we do not want the effect to depend on the state of the resource, only on the request.
            const { status: currentStatus, previousStatus } = (0, untracked_1.untracked)(this.state);
            if (extRequest.request === undefined) {
                // Nothing to load (and we should already be in a non-loading state).
                return;
            }
            else if (currentStatus !== 'loading') {
                // We're not in a loading or reloading state, so this loading request is stale.
                return;
            }
            // Cancel any previous loading attempts.
            this.abortInProgressLoad();
            // Capturing _this_ load's pending task in a local variable is important here. We may attempt to
            // resolve it twice:
            //
            //  1. when the loading function promise resolves/rejects
            //  2. when cancelling the loading operation
            //
            // After the loading operation is cancelled, `this.resolvePendingTask` no longer represents this
            // particular task, but this `await` may eventually resolve/reject. Thus, when we cancel in
            // response to (1) below, we need to cancel the locally saved task.
            let resolvePendingTask = (this.resolvePendingTask =
                this.pendingTasks.add());
            const { signal: abortSignal } = (this.pendingController = new AbortController());
            try {
                // The actual loading is run through `untracked` - only the request side of `resource` is
                // reactive. This avoids any confusion with signals tracking or not tracking depending on
                // which side of the `await` they are.
                const stream = yield (0, untracked_1.untracked)(() => {
                    return this.loaderFn({
                        params: extRequest.request,
                        // TODO(alxhub): cleanup after g3 removal of `request` alias.
                        request: extRequest.request,
                        abortSignal,
                        previous: {
                            status: previousStatus,
                        },
                    });
                });
                // If this request has been aborted, or the current request no longer
                // matches this load, then we should ignore this resolution.
                if (abortSignal.aborted || (0, untracked_1.untracked)(this.extRequest) !== extRequest) {
                    return;
                }
                this.state.set({
                    extRequest,
                    status: 'resolved',
                    previousStatus: 'resolved',
                    stream,
                });
            }
            catch (err) {
                if (abortSignal.aborted || (0, untracked_1.untracked)(this.extRequest) !== extRequest) {
                    return;
                }
                this.state.set({
                    extRequest,
                    status: 'resolved',
                    previousStatus: 'error',
                    stream: (0, signal_1.signal)({ error: err }),
                });
            }
            finally {
                // Resolve the pending task now that the resource has a value.
                resolvePendingTask === null || resolvePendingTask === void 0 ? void 0 : resolvePendingTask();
                resolvePendingTask = undefined;
            }
        });
    }
    abortInProgressLoad() {
        var _a;
        (0, untracked_1.untracked)(() => { var _a; return (_a = this.pendingController) === null || _a === void 0 ? void 0 : _a.abort(); });
        this.pendingController = undefined;
        // Once the load is aborted, we no longer want to block stability on its resolution.
        (_a = this.resolvePendingTask) === null || _a === void 0 ? void 0 : _a.call(this);
        this.resolvePendingTask = undefined;
    }
}
exports.ResourceImpl = ResourceImpl;
/**
 * Wraps an equality function to handle either value being `undefined`.
 */
function wrapEqualityFn(equal) {
    return (a, b) => (a === undefined || b === undefined ? a === b : equal(a, b));
}
function getLoader(options) {
    if (isStreamingResourceOptions(options)) {
        return options.stream;
    }
    return (params) => __awaiter(this, void 0, void 0, function* () {
        try {
            return (0, signal_1.signal)({ value: yield options.loader(params) });
        }
        catch (err) {
            return (0, signal_1.signal)({ error: err });
        }
    });
}
function isStreamingResourceOptions(options) {
    return !!options.stream;
}
/**
 * Project from a state with `ResourceInternalStatus` to the user-facing `ResourceStatus`
 */
function projectStatusOfState(state) {
    switch (state.status) {
        case 'loading':
            return state.extRequest.reload === 0 ? 'loading' : 'reloading';
        case 'resolved':
            return isResolved((0, untracked_1.untracked)(state.stream)) ? 'resolved' : 'error';
        default:
            return state.status;
    }
}
function isResolved(state) {
    return state.error === undefined;
}
