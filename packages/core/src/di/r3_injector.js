"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.R3Injector = exports.EnvironmentInjector = void 0;
exports.getNullInjector = getNullInjector;
exports.providerToFactory = providerToFactory;
exports.assertNotDestroyed = assertNotDestroyed;
require("../util/ng_dev_mode");
const errors_1 = require("../errors");
const injector_profiler_1 = require("../render3/debug/injector_profiler");
const definition_factory_1 = require("../render3/definition_factory");
const errors_di_1 = require("../render3/errors_di");
const fields_1 = require("../render3/fields");
const array_utils_1 = require("../util/array_utils");
const empty_1 = require("../util/empty");
const stringify_1 = require("../util/stringify");
const forward_ref_1 = require("./forward_ref");
const initializer_token_1 = require("./initializer_token");
const inject_switch_1 = require("./inject_switch");
const injection_token_1 = require("./injection_token");
const injector_compatibility_1 = require("./injector_compatibility");
const injector_token_1 = require("./injector_token");
const defs_1 = require("./interface/defs");
const provider_1 = require("./interface/provider");
const internal_tokens_1 = require("./internal_tokens");
const null_injector_1 = require("./null_injector");
const provider_collection_1 = require("./provider_collection");
const scope_1 = require("./scope");
const signals_1 = require("@angular/core/primitives/signals");
const di_1 = require("@angular/core/primitives/di");
/**
 * Marker which indicates that a value has not yet been created from the factory function.
 */
const NOT_YET = {};
/**
 * Marker which indicates that the factory function for a token is in the process of being called.
 *
 * If the injector is asked to inject a token with its value set to CIRCULAR, that indicates
 * injection of a dependency has recursively attempted to inject the original token, and there is
 * a circular dependency among the providers.
 */
const CIRCULAR = {};
/**
 * A lazily initialized NullInjector.
 */
let NULL_INJECTOR = undefined;
function getNullInjector() {
    if (NULL_INJECTOR === undefined) {
        NULL_INJECTOR = new null_injector_1.NullInjector();
    }
    return NULL_INJECTOR;
}
/**
 * An `Injector` that's part of the environment injector hierarchy, which exists outside of the
 * component tree.
 *
 * @publicApi
 */
class EnvironmentInjector {
}
exports.EnvironmentInjector = EnvironmentInjector;
class R3Injector extends EnvironmentInjector {
    /**
     * Flag indicating that this injector was previously destroyed.
     */
    get destroyed() {
        return this._destroyed;
    }
    constructor(providers, parent, source, scopes) {
        super();
        this.parent = parent;
        this.source = source;
        this.scopes = scopes;
        /**
         * Map of tokens to records which contain the instances of those tokens.
         * - `null` value implies that we don't have the record. Used by tree-shakable injectors
         * to prevent further searches.
         */
        this.records = new Map();
        /**
         * Set of values instantiated by this injector which contain `ngOnDestroy` lifecycle hooks.
         */
        this._ngOnDestroyHooks = new Set();
        this._onDestroyHooks = [];
        this._destroyed = false;
        // Start off by creating Records for every provider.
        forEachSingleProvider(providers, (provider) => this.processProvider(provider));
        // Make sure the INJECTOR token provides this injector.
        this.records.set(injector_token_1.INJECTOR, makeRecord(undefined, this));
        // And `EnvironmentInjector` if the current injector is supposed to be env-scoped.
        if (scopes.has('environment')) {
            this.records.set(EnvironmentInjector, makeRecord(undefined, this));
        }
        // Detect whether this injector has the APP_ROOT_SCOPE token and thus should provide
        // any injectable scoped to APP_ROOT_SCOPE.
        const record = this.records.get(scope_1.INJECTOR_SCOPE);
        if (record != null && typeof record.value === 'string') {
            this.scopes.add(record.value);
        }
        this.injectorDefTypes = new Set(this.get(internal_tokens_1.INJECTOR_DEF_TYPES, empty_1.EMPTY_ARRAY, { self: true }));
    }
    retrieve(token, options) {
        const flags = (0, injector_compatibility_1.convertToBitFlags)(options) || 0 /* InternalInjectFlags.Default */;
        try {
            return this.get(token, 
            // When a dependency is requested with an optional flag, DI returns null as the default value.
            injector_compatibility_1.THROW_IF_NOT_FOUND, flags);
        }
        catch (e) {
            if ((0, di_1.isNotFound)(e)) {
                return e;
            }
            throw e;
        }
    }
    /**
     * Destroy the injector and release references to every instance or provider associated with it.
     *
     * Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
     * hook was found.
     */
    destroy() {
        assertNotDestroyed(this);
        // Set destroyed = true first, in case lifecycle hooks re-enter destroy().
        this._destroyed = true;
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            // Call all the lifecycle hooks.
            for (const service of this._ngOnDestroyHooks) {
                service.ngOnDestroy();
            }
            const onDestroyHooks = this._onDestroyHooks;
            // Reset the _onDestroyHooks array before iterating over it to prevent hooks that unregister
            // themselves from mutating the array during iteration.
            this._onDestroyHooks = [];
            for (const hook of onDestroyHooks) {
                hook();
            }
        }
        finally {
            // Release all references.
            this.records.clear();
            this._ngOnDestroyHooks.clear();
            this.injectorDefTypes.clear();
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    }
    onDestroy(callback) {
        assertNotDestroyed(this);
        this._onDestroyHooks.push(callback);
        return () => this.removeOnDestroy(callback);
    }
    runInContext(fn) {
        assertNotDestroyed(this);
        const previousInjector = (0, injector_compatibility_1.setCurrentInjector)(this);
        const previousInjectImplementation = (0, inject_switch_1.setInjectImplementation)(undefined);
        let prevInjectContext;
        if (ngDevMode) {
            prevInjectContext = (0, injector_profiler_1.setInjectorProfilerContext)({ injector: this, token: null });
        }
        try {
            return fn();
        }
        finally {
            (0, injector_compatibility_1.setCurrentInjector)(previousInjector);
            (0, inject_switch_1.setInjectImplementation)(previousInjectImplementation);
            ngDevMode && (0, injector_profiler_1.setInjectorProfilerContext)(prevInjectContext);
        }
    }
    get(token, notFoundValue = injector_compatibility_1.THROW_IF_NOT_FOUND, options) {
        assertNotDestroyed(this);
        if (token.hasOwnProperty(fields_1.NG_ENV_ID)) {
            return token[fields_1.NG_ENV_ID](this);
        }
        const flags = (0, injector_compatibility_1.convertToBitFlags)(options);
        // Set the injection context.
        let prevInjectContext;
        if (ngDevMode) {
            prevInjectContext = (0, injector_profiler_1.setInjectorProfilerContext)({ injector: this, token: token });
        }
        const previousInjector = (0, injector_compatibility_1.setCurrentInjector)(this);
        const previousInjectImplementation = (0, inject_switch_1.setInjectImplementation)(undefined);
        try {
            // Check for the SkipSelf flag.
            if (!(flags & 4 /* InternalInjectFlags.SkipSelf */)) {
                // SkipSelf isn't set, check if the record belongs to this injector.
                let record = this.records.get(token);
                if (record === undefined) {
                    // No record, but maybe the token is scoped to this injector. Look for an injectable
                    // def with a scope matching this injector.
                    const def = couldBeInjectableType(token) && (0, defs_1.getInjectableDef)(token);
                    if (def && this.injectableDefInScope(def)) {
                        // Found an injectable def and it's scoped to this injector. Pretend as if it was here
                        // all along.
                        if (ngDevMode) {
                            (0, injector_profiler_1.runInInjectorProfilerContext)(this, token, () => {
                                (0, injector_profiler_1.emitProviderConfiguredEvent)(token);
                            });
                        }
                        record = makeRecord(injectableDefOrInjectorDefFactory(token), NOT_YET);
                    }
                    else {
                        record = null;
                    }
                    this.records.set(token, record);
                }
                // If a record was found, get the instance for it and return it.
                if (record != null /* NOT null || undefined */) {
                    return this.hydrate(token, record, flags);
                }
            }
            // Select the next injector based on the Self flag - if self is set, the next injector is
            // the NullInjector, otherwise it's the parent.
            const nextInjector = !(flags & 2 /* InternalInjectFlags.Self */) ? this.parent : getNullInjector();
            // Set the notFoundValue based on the Optional flag - if optional is set and notFoundValue
            // is undefined, the value is null, otherwise it's the notFoundValue.
            notFoundValue =
                flags & 8 /* InternalInjectFlags.Optional */ && notFoundValue === injector_compatibility_1.THROW_IF_NOT_FOUND
                    ? null
                    : notFoundValue;
            return nextInjector.get(token, notFoundValue);
        }
        catch (e) {
            if ((0, di_1.isNotFound)(e)) {
                // @ts-ignore
                const path = (e[injector_compatibility_1.NG_TEMP_TOKEN_PATH] = e[injector_compatibility_1.NG_TEMP_TOKEN_PATH] || []);
                path.unshift((0, stringify_1.stringify)(token));
                if (previousInjector) {
                    // We still have a parent injector, keep throwing
                    throw e;
                }
                else {
                    // Format & throw the final error message when we don't have any previous injector
                    return (0, injector_compatibility_1.catchInjectorError)(e, token, 'R3InjectorError', this.source);
                }
            }
            else {
                throw e;
            }
        }
        finally {
            // Lastly, restore the previous injection context.
            (0, inject_switch_1.setInjectImplementation)(previousInjectImplementation);
            (0, injector_compatibility_1.setCurrentInjector)(previousInjector);
            ngDevMode && (0, injector_profiler_1.setInjectorProfilerContext)(prevInjectContext);
        }
    }
    /** @internal */
    resolveInjectorInitializers() {
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        const previousInjector = (0, injector_compatibility_1.setCurrentInjector)(this);
        const previousInjectImplementation = (0, inject_switch_1.setInjectImplementation)(undefined);
        let prevInjectContext;
        if (ngDevMode) {
            prevInjectContext = (0, injector_profiler_1.setInjectorProfilerContext)({ injector: this, token: null });
        }
        try {
            const initializers = this.get(initializer_token_1.ENVIRONMENT_INITIALIZER, empty_1.EMPTY_ARRAY, { self: true });
            if (ngDevMode && !Array.isArray(initializers)) {
                throw new errors_1.RuntimeError(-209 /* RuntimeErrorCode.INVALID_MULTI_PROVIDER */, 'Unexpected type of the `ENVIRONMENT_INITIALIZER` token value ' +
                    `(expected an array, but got ${typeof initializers}). ` +
                    'Please check that the `ENVIRONMENT_INITIALIZER` token is configured as a ' +
                    '`multi: true` provider.');
            }
            for (const initializer of initializers) {
                initializer();
            }
        }
        finally {
            (0, injector_compatibility_1.setCurrentInjector)(previousInjector);
            (0, inject_switch_1.setInjectImplementation)(previousInjectImplementation);
            ngDevMode && (0, injector_profiler_1.setInjectorProfilerContext)(prevInjectContext);
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    }
    toString() {
        const tokens = [];
        const records = this.records;
        for (const token of records.keys()) {
            tokens.push((0, stringify_1.stringify)(token));
        }
        return `R3Injector[${tokens.join(', ')}]`;
    }
    /**
     * Process a `SingleProvider` and add it.
     */
    processProvider(provider) {
        // Determine the token from the provider. Either it's its own token, or has a {provide: ...}
        // property.
        provider = (0, forward_ref_1.resolveForwardRef)(provider);
        let token = (0, provider_collection_1.isTypeProvider)(provider)
            ? provider
            : (0, forward_ref_1.resolveForwardRef)(provider && provider.provide);
        // Construct a `Record` for the provider.
        const record = providerToRecord(provider);
        if (ngDevMode) {
            (0, injector_profiler_1.runInInjectorProfilerContext)(this, token, () => {
                // Emit InjectorProfilerEventType.Create if provider is a value provider because
                // these are the only providers that do not go through the value hydration logic
                // where this event would normally be emitted from.
                if ((0, provider_collection_1.isValueProvider)(provider)) {
                    (0, injector_profiler_1.emitInjectorToCreateInstanceEvent)(token);
                    (0, injector_profiler_1.emitInstanceCreatedByInjectorEvent)(provider.useValue);
                }
                (0, injector_profiler_1.emitProviderConfiguredEvent)(provider);
            });
        }
        if (!(0, provider_collection_1.isTypeProvider)(provider) && provider.multi === true) {
            // If the provider indicates that it's a multi-provider, process it specially.
            // First check whether it's been defined already.
            let multiRecord = this.records.get(token);
            if (multiRecord) {
                // It has. Throw a nice error if
                if (ngDevMode && multiRecord.multi === undefined) {
                    (0, errors_di_1.throwMixedMultiProviderError)();
                }
            }
            else {
                multiRecord = makeRecord(undefined, NOT_YET, true);
                multiRecord.factory = () => (0, injector_compatibility_1.injectArgs)(multiRecord.multi);
                this.records.set(token, multiRecord);
            }
            token = provider;
            multiRecord.multi.push(provider);
        }
        else {
            if (ngDevMode) {
                const existing = this.records.get(token);
                if (existing && existing.multi !== undefined) {
                    (0, errors_di_1.throwMixedMultiProviderError)();
                }
            }
        }
        this.records.set(token, record);
    }
    hydrate(token, record, flags) {
        const prevConsumer = (0, signals_1.setActiveConsumer)(null);
        try {
            if (record.value === CIRCULAR) {
                (0, errors_di_1.throwCyclicDependencyError)((0, stringify_1.stringify)(token));
            }
            else if (record.value === NOT_YET) {
                record.value = CIRCULAR;
                if (ngDevMode) {
                    (0, injector_profiler_1.runInInjectorProfilerContext)(this, token, () => {
                        (0, injector_profiler_1.emitInjectorToCreateInstanceEvent)(token);
                        record.value = record.factory(undefined, flags);
                        (0, injector_profiler_1.emitInstanceCreatedByInjectorEvent)(record.value);
                    });
                }
                else {
                    record.value = record.factory(undefined, flags);
                }
            }
            if (typeof record.value === 'object' && record.value && hasOnDestroy(record.value)) {
                this._ngOnDestroyHooks.add(record.value);
            }
            return record.value;
        }
        finally {
            (0, signals_1.setActiveConsumer)(prevConsumer);
        }
    }
    injectableDefInScope(def) {
        if (!def.providedIn) {
            return false;
        }
        const providedIn = (0, forward_ref_1.resolveForwardRef)(def.providedIn);
        if (typeof providedIn === 'string') {
            return providedIn === 'any' || this.scopes.has(providedIn);
        }
        else {
            return this.injectorDefTypes.has(providedIn);
        }
    }
    removeOnDestroy(callback) {
        const destroyCBIdx = this._onDestroyHooks.indexOf(callback);
        if (destroyCBIdx !== -1) {
            this._onDestroyHooks.splice(destroyCBIdx, 1);
        }
    }
}
exports.R3Injector = R3Injector;
function injectableDefOrInjectorDefFactory(token) {
    // Most tokens will have an injectable def directly on them, which specifies a factory directly.
    const injectableDef = (0, defs_1.getInjectableDef)(token);
    const factory = injectableDef !== null ? injectableDef.factory : (0, definition_factory_1.getFactoryDef)(token);
    if (factory !== null) {
        return factory;
    }
    // InjectionTokens should have an injectable def (ɵprov) and thus should be handled above.
    // If it's missing that, it's an error.
    if (token instanceof injection_token_1.InjectionToken) {
        throw new errors_1.RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode && `Token ${(0, stringify_1.stringify)(token)} is missing a ɵprov definition.`);
    }
    // Undecorated types can sometimes be created if they have no constructor arguments.
    if (token instanceof Function) {
        return getUndecoratedInjectableFactory(token);
    }
    // There was no way to resolve a factory for this token.
    throw new errors_1.RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode && 'unreachable');
}
function getUndecoratedInjectableFactory(token) {
    // If the token has parameters then it has dependencies that we cannot resolve implicitly.
    const paramLength = token.length;
    if (paramLength > 0) {
        throw new errors_1.RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode &&
            `Can't resolve all parameters for ${(0, stringify_1.stringify)(token)}: (${(0, array_utils_1.newArray)(paramLength, '?').join(', ')}).`);
    }
    // The constructor function appears to have no parameters.
    // This might be because it inherits from a super-class. In which case, use an injectable
    // def from an ancestor if there is one.
    // Otherwise this really is a simple class with no dependencies, so return a factory that
    // just instantiates the zero-arg constructor.
    const inheritedInjectableDef = (0, defs_1.getInheritedInjectableDef)(token);
    if (inheritedInjectableDef !== null) {
        return () => inheritedInjectableDef.factory(token);
    }
    else {
        return () => new token();
    }
}
function providerToRecord(provider) {
    if ((0, provider_collection_1.isValueProvider)(provider)) {
        return makeRecord(undefined, provider.useValue);
    }
    else {
        const factory = providerToFactory(provider);
        return makeRecord(factory, NOT_YET);
    }
}
/**
 * Converts a `SingleProvider` into a factory function.
 *
 * @param provider provider to convert to factory
 */
function providerToFactory(provider, ngModuleType, providers) {
    let factory = undefined;
    if (ngDevMode && (0, provider_1.isEnvironmentProviders)(provider)) {
        (0, errors_di_1.throwInvalidProviderError)(undefined, providers, provider);
    }
    if ((0, provider_collection_1.isTypeProvider)(provider)) {
        const unwrappedProvider = (0, forward_ref_1.resolveForwardRef)(provider);
        return (0, definition_factory_1.getFactoryDef)(unwrappedProvider) || injectableDefOrInjectorDefFactory(unwrappedProvider);
    }
    else {
        if ((0, provider_collection_1.isValueProvider)(provider)) {
            factory = () => (0, forward_ref_1.resolveForwardRef)(provider.useValue);
        }
        else if ((0, provider_collection_1.isFactoryProvider)(provider)) {
            factory = () => provider.useFactory(...(0, injector_compatibility_1.injectArgs)(provider.deps || []));
        }
        else if ((0, provider_collection_1.isExistingProvider)(provider)) {
            factory = (_, flags) => (0, injector_compatibility_1.ɵɵinject)((0, forward_ref_1.resolveForwardRef)(provider.useExisting), flags !== undefined && flags & 8 /* InternalInjectFlags.Optional */
                ? 8 /* InternalInjectFlags.Optional */
                : undefined);
        }
        else {
            const classRef = (0, forward_ref_1.resolveForwardRef)(provider &&
                (provider.useClass || provider.provide));
            if (ngDevMode && !classRef) {
                (0, errors_di_1.throwInvalidProviderError)(ngModuleType, providers, provider);
            }
            if (hasDeps(provider)) {
                factory = () => new classRef(...(0, injector_compatibility_1.injectArgs)(provider.deps));
            }
            else {
                return (0, definition_factory_1.getFactoryDef)(classRef) || injectableDefOrInjectorDefFactory(classRef);
            }
        }
    }
    return factory;
}
function assertNotDestroyed(injector) {
    if (injector.destroyed) {
        throw new errors_1.RuntimeError(205 /* RuntimeErrorCode.INJECTOR_ALREADY_DESTROYED */, ngDevMode && 'Injector has already been destroyed.');
    }
}
function makeRecord(factory, value, multi = false) {
    return {
        factory: factory,
        value: value,
        multi: multi ? [] : undefined,
    };
}
function hasDeps(value) {
    return !!value.deps;
}
function hasOnDestroy(value) {
    return (value !== null &&
        typeof value === 'object' &&
        typeof value.ngOnDestroy === 'function');
}
function couldBeInjectableType(value) {
    return (typeof value === 'function' ||
        (typeof value === 'object' && value.ngMetadataName === 'InjectionToken'));
}
function forEachSingleProvider(providers, fn) {
    for (const provider of providers) {
        if (Array.isArray(provider)) {
            forEachSingleProvider(provider, fn);
        }
        else if (provider && (0, provider_1.isEnvironmentProviders)(provider)) {
            forEachSingleProvider(provider.ɵproviders, fn);
        }
        else {
            fn(provider);
        }
    }
}
