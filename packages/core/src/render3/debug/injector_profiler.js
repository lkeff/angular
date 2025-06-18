"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectorProfilerContext = getInjectorProfilerContext;
exports.setInjectorProfilerContext = setInjectorProfilerContext;
exports.setInjectorProfiler = setInjectorProfiler;
exports.injectorProfiler = injectorProfiler;
exports.emitProviderConfiguredEvent = emitProviderConfiguredEvent;
exports.emitInjectorToCreateInstanceEvent = emitInjectorToCreateInstanceEvent;
exports.emitInstanceCreatedByInjectorEvent = emitInstanceCreatedByInjectorEvent;
exports.emitInjectEvent = emitInjectEvent;
exports.emitEffectCreatedEvent = emitEffectCreatedEvent;
exports.runInInjectorProfilerContext = runInInjectorProfilerContext;
const forward_ref_1 = require("../../di/forward_ref");
const injection_token_1 = require("../../di/injection_token");
const assert_1 = require("../../util/assert");
let _injectorProfilerContext;
function getInjectorProfilerContext() {
    !ngDevMode && (0, assert_1.throwError)('getInjectorProfilerContext should never be called in production mode');
    return _injectorProfilerContext;
}
function setInjectorProfilerContext(context) {
    !ngDevMode && (0, assert_1.throwError)('setInjectorProfilerContext should never be called in production mode');
    const previous = _injectorProfilerContext;
    _injectorProfilerContext = context;
    return previous;
}
const injectorProfilerCallbacks = [];
const NOOP_PROFILER_REMOVAL = () => { };
function removeProfiler(profiler) {
    const profilerIdx = injectorProfilerCallbacks.indexOf(profiler);
    if (profilerIdx !== -1) {
        injectorProfilerCallbacks.splice(profilerIdx, 1);
    }
}
/**
 * Adds a callback function which will be invoked during certain DI events within the
 * runtime (for example: injecting services, creating injectable instances, configuring providers).
 * Multiple profiler callbacks can be set: in this case profiling events are
 * reported to every registered callback.
 *
 * Warning: this function is *INTERNAL* and should not be relied upon in application's code.
 * The contract of the function might be changed in any release and/or the function can be removed
 * completely.
 *
 * @param profiler function provided by the caller or null value to disable profiling.
 * @returns a cleanup function that, when invoked, removes a given profiler callback.
 */
function setInjectorProfiler(injectorProfiler) {
    !ngDevMode && (0, assert_1.throwError)('setInjectorProfiler should never be called in production mode');
    if (injectorProfiler !== null) {
        if (!injectorProfilerCallbacks.includes(injectorProfiler)) {
            injectorProfilerCallbacks.push(injectorProfiler);
        }
        return () => removeProfiler(injectorProfiler);
    }
    else {
        injectorProfilerCallbacks.length = 0;
        return NOOP_PROFILER_REMOVAL;
    }
}
/**
 * Injector profiler function which emits on DI events executed by the runtime.
 *
 * @param event InjectorProfilerEvent corresponding to the DI event being emitted
 */
function injectorProfiler(event) {
    !ngDevMode && (0, assert_1.throwError)('Injector profiler should never be called in production mode');
    for (let i = 0; i < injectorProfilerCallbacks.length; i++) {
        const injectorProfilerCallback = injectorProfilerCallbacks[i];
        injectorProfilerCallback(event);
    }
}
/**
 * Emits an InjectorProfilerEventType.ProviderConfigured to the injector profiler. The data in the
 * emitted event includes the raw provider, as well as the token that provider is providing.
 *
 * @param eventProvider A provider object
 */
function emitProviderConfiguredEvent(eventProvider, isViewProvider = false) {
    !ngDevMode && (0, assert_1.throwError)('Injector profiler should never be called in production mode');
    let token;
    // if the provider is a TypeProvider (typeof provider is function) then the token is the
    // provider itself
    if (typeof eventProvider === 'function') {
        token = eventProvider;
    }
    // if the provider is an injection token, then the token is the injection token.
    else if (eventProvider instanceof injection_token_1.InjectionToken) {
        token = eventProvider;
    }
    // in all other cases we can access the token via the `provide` property of the provider
    else {
        token = (0, forward_ref_1.resolveForwardRef)(eventProvider.provide);
    }
    let provider = eventProvider;
    // Injection tokens may define their own default provider which gets attached to the token itself
    // as `ɵprov`. In this case, we want to emit the provider that is attached to the token, not the
    // token itself.
    if (eventProvider instanceof injection_token_1.InjectionToken) {
        provider = eventProvider.ɵprov || eventProvider;
    }
    injectorProfiler({
        type: 2 /* InjectorProfilerEventType.ProviderConfigured */,
        context: getInjectorProfilerContext(),
        providerRecord: { token, provider, isViewProvider },
    });
}
/**
 * Emits an event to the injector profiler when an instance corresponding to a given token is about to be created be an injector. Note that
 * the injector associated with this emission can be accessed by using getDebugInjectContext()
 *
 * @param instance an object created by an injector
 */
function emitInjectorToCreateInstanceEvent(token) {
    !ngDevMode && (0, assert_1.throwError)('Injector profiler should never be called in production mode');
    injectorProfiler({
        type: 4 /* InjectorProfilerEventType.InjectorToCreateInstanceEvent */,
        context: getInjectorProfilerContext(),
        token: token,
    });
}
/**
 * Emits an event to the injector profiler with the instance that was created. Note that
 * the injector associated with this emission can be accessed by using getDebugInjectContext()
 *
 * @param instance an object created by an injector
 */
function emitInstanceCreatedByInjectorEvent(instance) {
    !ngDevMode && (0, assert_1.throwError)('Injector profiler should never be called in production mode');
    injectorProfiler({
        type: 1 /* InjectorProfilerEventType.InstanceCreatedByInjector */,
        context: getInjectorProfilerContext(),
        instance: { value: instance },
    });
}
/**
 * @param token DI token associated with injected service
 * @param value the instance of the injected service (i.e the result of `inject(token)`)
 * @param flags the flags that the token was injected with
 */
function emitInjectEvent(token, value, flags) {
    !ngDevMode && (0, assert_1.throwError)('Injector profiler should never be called in production mode');
    injectorProfiler({
        type: 0 /* InjectorProfilerEventType.Inject */,
        context: getInjectorProfilerContext(),
        service: { token, value, flags },
    });
}
function emitEffectCreatedEvent(effect) {
    !ngDevMode && (0, assert_1.throwError)('Injector profiler should never be called in production mode');
    injectorProfiler({
        type: 3 /* InjectorProfilerEventType.EffectCreated */,
        context: getInjectorProfilerContext(),
        effect,
    });
}
function runInInjectorProfilerContext(injector, token, callback) {
    !ngDevMode &&
        (0, assert_1.throwError)('runInInjectorProfilerContext should never be called in production mode');
    const prevInjectContext = setInjectorProfilerContext({ injector, token });
    try {
        callback();
    }
    finally {
        setInjectorProfilerContext(prevInjectContext);
    }
}
