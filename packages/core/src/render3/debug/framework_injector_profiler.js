"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFrameworkDIDebugData = getFrameworkDIDebugData;
exports.setupFrameworkInjectorProfiler = setupFrameworkInjectorProfiler;
const r3_injector_1 = require("../../di/r3_injector");
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const def_getters_1 = require("../def_getters");
const di_1 = require("../di");
const injector_profiler_1 = require("./injector_profiler");
/**
 * These are the data structures that our framework injector profiler will fill with data in order
 * to support DI debugging APIs.
 *
 * resolverToTokenToDependencies: Maps an injector to a Map of tokens to an Array of
 * dependencies. Injector -> Token -> Dependencies This is used to support the
 * getDependenciesFromInjectable API, which takes in an injector and a token and returns it's
 * dependencies.
 *
 * resolverToProviders: Maps a DI resolver (an Injector or a TNode) to the providers configured
 * within it This is used to support the getInjectorProviders API, which takes in an injector and
 * returns the providers that it was configured with. Note that for the element injector case we
 * use the TNode instead of the LView as the DI resolver. This is because the registration of
 * providers happens only once per type of TNode. If an injector is created with an identical TNode,
 * the providers for that injector will not be reconfigured.
 *
 * standaloneInjectorToComponent: Maps the injector of a standalone component to the standalone
 * component that it is associated with. Used in the getInjectorProviders API, specificially in the
 * discovery of import paths for each provider. This is necessary because the imports array of a
 * standalone component is processed and configured in its standalone injector, but exists within
 * the component's definition. Because getInjectorProviders takes in an injector, if that injector
 * is the injector of a standalone component, we need to be able to discover the place where the
 * imports array is located (the component) in order to flatten the imports array within it to
 * discover all of it's providers.
 *
 *
 * All of these data structures are instantiated with WeakMaps. This will ensure that the presence
 * of any object in the keys of these maps does not prevent the garbage collector from collecting
 * those objects. Because of this property of WeakMaps, these data structures will never be the
 * source of a memory leak.
 *
 * An example of this advantage: When components are destroyed, we don't need to do
 * any additional work to remove that component from our mappings.
 *
 */
class DIDebugData {
    constructor() {
        this.resolverToTokenToDependencies = new WeakMap();
        this.resolverToProviders = new WeakMap();
        this.resolverToEffects = new WeakMap();
        this.standaloneInjectorToComponent = new WeakMap();
    }
    reset() {
        this.resolverToTokenToDependencies = new WeakMap();
        this.resolverToProviders = new WeakMap();
        this.standaloneInjectorToComponent = new WeakMap();
    }
}
let frameworkDIDebugData = new DIDebugData();
function getFrameworkDIDebugData() {
    return frameworkDIDebugData;
}
/**
 * Initalize default handling of injector events. This handling parses events
 * as they are emitted and constructs the data structures necessary to support
 * some of debug APIs.
 *
 * See handleInjectEvent, handleCreateEvent and handleProviderConfiguredEvent
 * for descriptions of each handler
 *
 * Supported APIs:
 *               - getDependenciesFromInjectable
 *               - getInjectorProviders
 */
function setupFrameworkInjectorProfiler() {
    frameworkDIDebugData.reset();
    (0, injector_profiler_1.setInjectorProfiler)(injectorProfilerEventHandler);
}
function injectorProfilerEventHandler(injectorProfilerEvent) {
    const { context, type } = injectorProfilerEvent;
    if (type === 0 /* InjectorProfilerEventType.Inject */) {
        handleInjectEvent(context, injectorProfilerEvent.service);
    }
    else if (type === 1 /* InjectorProfilerEventType.InstanceCreatedByInjector */) {
        handleInstanceCreatedByInjectorEvent(context, injectorProfilerEvent.instance);
    }
    else if (type === 2 /* InjectorProfilerEventType.ProviderConfigured */) {
        handleProviderConfiguredEvent(context, injectorProfilerEvent.providerRecord);
    }
    else if (type === 3 /* InjectorProfilerEventType.EffectCreated */) {
        handleEffectCreatedEvent(context, injectorProfilerEvent.effect);
    }
}
function handleEffectCreatedEvent(context, effect) {
    const diResolver = getDIResolver(context.injector);
    if (diResolver === null) {
        (0, assert_1.throwError)('An EffectCreated event must be run within an injection context.');
    }
    const { resolverToEffects } = frameworkDIDebugData;
    if (!resolverToEffects.has(diResolver)) {
        resolverToEffects.set(diResolver, []);
    }
    resolverToEffects.get(diResolver).push(effect);
}
/**
 *
 * Stores the injected service in frameworkDIDebugData.resolverToTokenToDependencies
 * based on it's injector and token.
 *
 * @param context InjectorProfilerContext the injection context that this event occurred in.
 * @param data InjectedService the service associated with this inject event.
 *
 */
function handleInjectEvent(context, data) {
    const diResolver = getDIResolver(context.injector);
    if (diResolver === null) {
        (0, assert_1.throwError)('An Inject event must be run within an injection context.');
    }
    const diResolverToInstantiatedToken = frameworkDIDebugData.resolverToTokenToDependencies;
    if (!diResolverToInstantiatedToken.has(diResolver)) {
        diResolverToInstantiatedToken.set(diResolver, new WeakMap());
    }
    // if token is a primitive type, ignore this event. We do this because we cannot keep track of
    // non-primitive tokens in WeakMaps since they are not garbage collectable.
    if (!canBeHeldWeakly(context.token)) {
        return;
    }
    const instantiatedTokenToDependencies = diResolverToInstantiatedToken.get(diResolver);
    if (!instantiatedTokenToDependencies.has(context.token)) {
        instantiatedTokenToDependencies.set(context.token, []);
    }
    const { token, value, flags } = data;
    (0, assert_1.assertDefined)(context.token, 'Injector profiler context token is undefined.');
    const dependencies = instantiatedTokenToDependencies.get(context.token);
    (0, assert_1.assertDefined)(dependencies, 'Could not resolve dependencies for token.');
    if (context.injector instanceof di_1.NodeInjector) {
        dependencies.push({ token, value, flags, injectedIn: getNodeInjectorContext(context.injector) });
    }
    else {
        dependencies.push({ token, value, flags });
    }
}
/**
 *
 * Returns the LView and TNode associated with a NodeInjector. Returns undefined if the injector
 * is not a NodeInjector.
 *
 * @param injector
 * @returns {lView: LView, tNode: TNode}|undefined
 */
function getNodeInjectorContext(injector) {
    if (!(injector instanceof di_1.NodeInjector)) {
        (0, assert_1.throwError)('getNodeInjectorContext must be called with a NodeInjector');
    }
    const lView = (0, di_1.getNodeInjectorLView)(injector);
    const tNode = (0, di_1.getNodeInjectorTNode)(injector);
    if (tNode === null) {
        return;
    }
    (0, assert_2.assertTNodeForLView)(tNode, lView);
    return { lView, tNode };
}
/**
 *
 * If the created instance is an instance of a standalone component, maps the injector to that
 * standalone component in frameworkDIDebugData.standaloneInjectorToComponent
 *
 * @param context InjectorProfilerContext the injection context that this event occurred in.
 * @param data InjectorCreatedInstance an object containing the instance that was just created
 *
 */
function handleInstanceCreatedByInjectorEvent(context, data) {
    const { value } = data;
    // It might happen that a DI token is requested but there is no corresponding value.
    // The InstanceCreatedByInjectorEvent will be still emitted in this case (to mirror the InjectorToCreateInstanceEvent) but we don't want to do any particular processing for those situations.
    if (data.value == null) {
        return;
    }
    if (getDIResolver(context.injector) === null) {
        (0, assert_1.throwError)('An InjectorCreatedInstance event must be run within an injection context.');
    }
    // if our value is an instance of a standalone component, map the injector of that standalone
    // component to the component class. Otherwise, this event is a noop.
    let standaloneComponent = undefined;
    if (typeof value === 'object') {
        standaloneComponent = value === null || value === void 0 ? void 0 : value.constructor;
    }
    // We want to also cover if `standaloneComponent === null` in addition to `undefined`
    if (standaloneComponent == undefined || !isStandaloneComponent(standaloneComponent)) {
        return;
    }
    const environmentInjector = context.injector.get(r3_injector_1.EnvironmentInjector, null, { optional: true });
    // Standalone components should have an environment injector. If one cannot be
    // found we may be in a test case for low level functionality that did not explicitly
    // setup this injector. In those cases, we simply ignore this event.
    if (environmentInjector === null) {
        return;
    }
    const { standaloneInjectorToComponent } = frameworkDIDebugData;
    // If our injector has already been mapped, as is the case
    // when a standalone component imports another standalone component,
    // we consider the original component (the component doing the importing)
    // as the component connected to our injector.
    if (standaloneInjectorToComponent.has(environmentInjector)) {
        return;
    }
    // If our injector hasn't been mapped, then we map it to the standalone component
    standaloneInjectorToComponent.set(environmentInjector, standaloneComponent);
}
function isStandaloneComponent(value) {
    const def = (0, def_getters_1.getComponentDef)(value);
    return !!(def === null || def === void 0 ? void 0 : def.standalone);
}
/**
 *
 * Stores the emitted ProviderRecords from the InjectorProfilerEventType.ProviderConfigured
 * event in frameworkDIDebugData.resolverToProviders
 *
 * @param context InjectorProfilerContext the injection context that this event occurred in.
 * @param data ProviderRecord an object containing the instance that was just created
 *
 */
function handleProviderConfiguredEvent(context, data) {
    const { resolverToProviders } = frameworkDIDebugData;
    let diResolver;
    if ((context === null || context === void 0 ? void 0 : context.injector) instanceof di_1.NodeInjector) {
        diResolver = (0, di_1.getNodeInjectorTNode)(context.injector);
    }
    else {
        diResolver = context.injector;
    }
    if (diResolver === null) {
        (0, assert_1.throwError)('A ProviderConfigured event must be run within an injection context.');
    }
    if (!resolverToProviders.has(diResolver)) {
        resolverToProviders.set(diResolver, []);
    }
    resolverToProviders.get(diResolver).push(data);
}
function getDIResolver(injector) {
    let diResolver = null;
    if (injector === undefined) {
        return diResolver;
    }
    // We use the LView as the diResolver for NodeInjectors because they
    // do not persist anywhere in the framework. They are simply wrappers around an LView and a TNode
    // that do persist. Because of this, we rely on the LView of the NodeInjector in order to use
    // as a concrete key to represent this injector. If we get the same LView back later, we know
    // we're looking at the same injector.
    if (injector instanceof di_1.NodeInjector) {
        diResolver = (0, di_1.getNodeInjectorLView)(injector);
    }
    // Other injectors can be used a keys for a map because their instances
    // persist
    else {
        diResolver = injector;
    }
    return diResolver;
}
// inspired by
// https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-canbeheldweakly
function canBeHeldWeakly(value) {
    // we check for value !== null here because typeof null === 'object
    return (value !== null &&
        (typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol'));
}
