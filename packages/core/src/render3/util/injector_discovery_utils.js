"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependenciesFromInjectable = getDependenciesFromInjectable;
exports.getInjectorProviders = getInjectorProviders;
exports.getInjectorMetadata = getInjectorMetadata;
exports.getInjectorResolutionPath = getInjectorResolutionPath;
const initializer_token_1 = require("../../di/initializer_token");
const defs_1 = require("../../di/interface/defs");
const internal_tokens_1 = require("../../di/internal_tokens");
const null_injector_1 = require("../../di/null_injector");
const provider_collection_1 = require("../../di/provider_collection");
const r3_injector_1 = require("../../di/r3_injector");
const ng_module_factory_1 = require("../../linker/ng_module_factory");
const array_utils_1 = require("../../util/array_utils");
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const chained_injector_1 = require("../chained_injector");
const framework_injector_profiler_1 = require("../debug/framework_injector_profiler");
const def_getters_1 = require("../def_getters");
const di_1 = require("../di");
const view_1 = require("../interfaces/view");
const injector_utils_1 = require("./injector_utils");
const view_utils_1 = require("./view_utils");
/**
 * Discovers the dependencies of an injectable instance. Provides DI information about each
 * dependency that the injectable was instantiated with, including where they were provided from.
 *
 * @param injector An injector instance
 * @param token a DI token that was constructed by the given injector instance
 * @returns an object that contains the created instance of token as well as all of the dependencies
 * that it was instantiated with OR undefined if the token was not created within the given
 * injector.
 */
function getDependenciesFromInjectable(injector, token) {
    // First we check to see if the token given maps to an actual instance in the injector given.
    // We use `self: true` because we only want to look at the injector we were given.
    // We use `optional: true` because it's possible that the token we were given was never
    // constructed by the injector we were given.
    const instance = injector.get(token, null, { self: true, optional: true });
    if (instance === null) {
        throw new Error(`Unable to determine instance of ${token} in given injector`);
    }
    const unformattedDependencies = getDependenciesForTokenInInjector(token, injector);
    const resolutionPath = getInjectorResolutionPath(injector);
    const dependencies = unformattedDependencies.map((dep) => {
        // injectedIn contains private fields, so we omit it from the response
        const formattedDependency = {
            value: dep.value,
        };
        // convert injection flags to booleans
        const flags = dep.flags;
        formattedDependency.flags = {
            optional: (8 /* InternalInjectFlags.Optional */ & flags) === 8 /* InternalInjectFlags.Optional */,
            host: (1 /* InternalInjectFlags.Host */ & flags) === 1 /* InternalInjectFlags.Host */,
            self: (2 /* InternalInjectFlags.Self */ & flags) === 2 /* InternalInjectFlags.Self */,
            skipSelf: (4 /* InternalInjectFlags.SkipSelf */ & flags) === 4 /* InternalInjectFlags.SkipSelf */,
        };
        // find the injector that provided the dependency
        for (let i = 0; i < resolutionPath.length; i++) {
            const injectorToCheck = resolutionPath[i];
            // if skipSelf is true we skip the first injector
            if (i === 0 && formattedDependency.flags.skipSelf) {
                continue;
            }
            // host only applies to NodeInjectors
            if (formattedDependency.flags.host && injectorToCheck instanceof r3_injector_1.EnvironmentInjector) {
                break;
            }
            const instance = injectorToCheck.get(dep.token, null, {
                self: true,
                optional: true,
            });
            if (instance !== null) {
                // if host flag is true we double check that we can get the service from the first element
                // in the resolution path by using the host flag. This is done to make sure that we've found
                // the correct providing injector, and not a node injector that is connected to our path via
                // a router outlet.
                if (formattedDependency.flags.host) {
                    const firstInjector = resolutionPath[0];
                    const lookupFromFirstInjector = firstInjector.get(dep.token, null, Object.assign(Object.assign({}, formattedDependency.flags), { optional: true }));
                    if (lookupFromFirstInjector !== null) {
                        formattedDependency.providedIn = injectorToCheck;
                    }
                    break;
                }
                formattedDependency.providedIn = injectorToCheck;
                break;
            }
            // if self is true we stop after the first injector
            if (i === 0 && formattedDependency.flags.self) {
                break;
            }
        }
        if (dep.token)
            formattedDependency.token = dep.token;
        return formattedDependency;
    });
    return { instance, dependencies };
}
function getDependenciesForTokenInInjector(token, injector) {
    var _a, _b, _c, _d;
    const { resolverToTokenToDependencies } = (0, framework_injector_profiler_1.getFrameworkDIDebugData)();
    if (!(injector instanceof di_1.NodeInjector)) {
        return (_c = (_b = (_a = resolverToTokenToDependencies.get(injector)) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, token)) !== null && _c !== void 0 ? _c : [];
    }
    const lView = (0, di_1.getNodeInjectorLView)(injector);
    const tokenDependencyMap = resolverToTokenToDependencies.get(lView);
    const dependencies = (_d = tokenDependencyMap === null || tokenDependencyMap === void 0 ? void 0 : tokenDependencyMap.get(token)) !== null && _d !== void 0 ? _d : [];
    // In the NodeInjector case, all injections for every node are stored in the same lView.
    // We use the injectedIn field of the dependency to filter out the dependencies that
    // do not come from the same node as the instance we're looking at.
    return dependencies.filter((dependency) => {
        var _a;
        const dependencyNode = (_a = dependency.injectedIn) === null || _a === void 0 ? void 0 : _a.tNode;
        if (dependencyNode === undefined) {
            return false;
        }
        const instanceNode = (0, di_1.getNodeInjectorTNode)(injector);
        (0, assert_2.assertTNode)(dependencyNode);
        (0, assert_2.assertTNode)(instanceNode);
        return dependencyNode === instanceNode;
    });
}
/**
 * Gets the class associated with an injector that contains a provider `imports` array in it's
 * definition
 *
 * For Module Injectors this returns the NgModule constructor.
 *
 * For Standalone injectors this returns the standalone component constructor.
 *
 * @param injector Injector an injector instance
 * @returns the constructor where the `imports` array that configures this injector is located
 */
function getProviderImportsContainer(injector) {
    const { standaloneInjectorToComponent } = (0, framework_injector_profiler_1.getFrameworkDIDebugData)();
    // standalone components configure providers through a component def, so we have to
    // use the standalone component associated with this injector if Injector represents
    // a standalone components EnvironmentInjector
    if (standaloneInjectorToComponent.has(injector)) {
        return standaloneInjectorToComponent.get(injector);
    }
    // Module injectors configure providers through their NgModule def, so we use the
    // injector to lookup its NgModuleRef and through that grab its instance
    const defTypeRef = injector.get(ng_module_factory_1.NgModuleRef, null, { self: true, optional: true });
    // If we can't find an associated imports container, return null.
    // This could be the case if this function is called with an R3Injector that does not represent
    // a standalone component or NgModule.
    if (defTypeRef === null) {
        return null;
    }
    // In standalone applications, the root environment injector created by bootstrapApplication
    // may have no associated "instance".
    if (defTypeRef.instance === null) {
        return null;
    }
    return defTypeRef.instance.constructor;
}
/**
 * Gets the providers configured on a NodeInjector
 *
 * @param injector A NodeInjector instance
 * @returns ProviderRecord[] an array of objects representing the providers configured on this
 *     injector
 */
function getNodeInjectorProviders(injector) {
    var _a;
    const diResolver = (0, di_1.getNodeInjectorTNode)(injector);
    const { resolverToProviders } = (0, framework_injector_profiler_1.getFrameworkDIDebugData)();
    return (_a = resolverToProviders.get(diResolver)) !== null && _a !== void 0 ? _a : [];
}
/**
 * Gets a mapping of providers configured on an injector to their import paths
 *
 * ModuleA -> imports ModuleB
 * ModuleB -> imports ModuleC
 * ModuleB -> provides MyServiceA
 * ModuleC -> provides MyServiceB
 *
 * getProviderImportPaths(ModuleA)
 * > Map(2) {
 *   MyServiceA => [ModuleA, ModuleB]
 *   MyServiceB => [ModuleA, ModuleB, ModuleC]
 *  }
 *
 * @param providerImportsContainer constructor of class that contains an `imports` array in it's
 *     definition
 * @returns A Map object that maps providers to an array of constructors representing it's import
 *     path
 *
 */
function getProviderImportPaths(providerImportsContainer) {
    const providerToPath = new Map();
    const visitedContainers = new Set();
    const visitor = walkProviderTreeToDiscoverImportPaths(providerToPath, visitedContainers);
    (0, provider_collection_1.walkProviderTree)(providerImportsContainer, visitor, [], new Set());
    return providerToPath;
}
/**
 *
 * Higher order function that returns a visitor for WalkProviderTree
 *
 * Takes in a Map and Set to keep track of the providers and containers
 * visited, so that we can discover the import paths of these providers
 * during the traversal.
 *
 * This visitor takes advantage of the fact that walkProviderTree performs a
 * postorder traversal of the provider tree for the passed in container. Because postorder
 * traversal recursively processes subtrees from leaf nodes until the traversal reaches the root,
 * we write a visitor that constructs provider import paths in reverse.
 *
 *
 * We use the visitedContainers set defined outside this visitor
 * because we want to run some logic only once for
 * each container in the tree. That logic can be described as:
 *
 *
 * 1. for each discovered_provider and discovered_path in the incomplete provider paths we've
 * already discovered
 * 2. get the first container in discovered_path
 * 3. if that first container is in the imports array of the container we're visiting
 *    Then the container we're visiting is also in the import path of discovered_provider, so we
 *    unshift discovered_path with the container we're currently visiting
 *
 *
 * Example Run:
 * ```
 *                 ┌──────────┐
 *                 │containerA│
 *      ┌─imports-─┤          ├──imports─┐
 *      │          │  provA   │          │
 *      │          │  provB   │          │
 *      │          └──────────┘          │
 *      │                                │
 *     ┌▼─────────┐             ┌────────▼─┐
 *     │containerB│             │containerC│
 *     │          │             │          │
 *     │  provD   │             │  provF   │
 *     │  provE   │             │  provG   │
 *     └──────────┘             └──────────┘
 * ```
 *
 * Each step of the traversal,
 *
 * ```
 * visitor(provD, containerB)
 * providerToPath === Map { provD => [containerB] }
 * visitedContainers === Set { containerB }
 *
 * visitor(provE, containerB)
 * providerToPath === Map { provD => [containerB], provE => [containerB] }
 * visitedContainers === Set { containerB }
 *
 * visitor(provF, containerC)
 * providerToPath === Map { provD => [containerB], provE => [containerB], provF => [containerC] }
 * visitedContainers === Set { containerB, containerC }
 *
 * visitor(provG, containerC)
 * providerToPath === Map {
 *   provD => [containerB], provE => [containerB], provF => [containerC], provG => [containerC]
 * }
 * visitedContainers === Set { containerB, containerC }
 *
 * visitor(provA, containerA)
 * providerToPath === Map {
 *   provD => [containerA, containerB],
 *   provE => [containerA, containerB],
 *   provF => [containerA, containerC],
 *   provG => [containerA, containerC],
 *   provA => [containerA]
 * }
 * visitedContainers === Set { containerB, containerC, containerA }
 *
 * visitor(provB, containerA)
 * providerToPath === Map {
 *   provD => [containerA, containerB],
 *   provE => [containerA, containerB],
 *   provF => [containerA, containerC],
 *   provG => [containerA, containerC],
 *   provA => [containerA]
 *   provB => [containerA]
 * }
 * visitedContainers === Set { containerB, containerC, containerA }
 * ```
 *
 * @param providerToPath Map map of providers to paths that this function fills
 * @param visitedContainers Set a set to keep track of the containers we've already visited
 * @return function(provider SingleProvider, container: Type<unknown> | InjectorType<unknown>) =>
 *     void
 */
function walkProviderTreeToDiscoverImportPaths(providerToPath, visitedContainers) {
    return (provider, container) => {
        // If the provider is not already in the providerToPath map,
        // add an entry with the provider as the key and an array containing the current container as
        // the value
        if (!providerToPath.has(provider)) {
            providerToPath.set(provider, [container]);
        }
        // This block will run exactly once for each container in the import tree.
        // This is where we run the logic to check the imports array of the current
        // container to see if it's the next container in the path for our currently
        // discovered providers.
        if (!visitedContainers.has(container)) {
            // Iterate through the providers we've already seen
            for (const prov of providerToPath.keys()) {
                const existingImportPath = providerToPath.get(prov);
                let containerDef = (0, defs_1.getInjectorDef)(container);
                if (!containerDef) {
                    const ngModule = container.ngModule;
                    containerDef = (0, defs_1.getInjectorDef)(ngModule);
                }
                if (!containerDef) {
                    return;
                }
                const lastContainerAddedToPath = existingImportPath[0];
                let isNextStepInPath = false;
                (0, array_utils_1.deepForEach)(containerDef.imports, (moduleImport) => {
                    var _a;
                    if (isNextStepInPath) {
                        return;
                    }
                    isNextStepInPath =
                        moduleImport.ngModule === lastContainerAddedToPath ||
                            moduleImport === lastContainerAddedToPath;
                    if (isNextStepInPath) {
                        (_a = providerToPath.get(prov)) === null || _a === void 0 ? void 0 : _a.unshift(container);
                    }
                });
            }
        }
        visitedContainers.add(container);
    };
}
/**
 * Gets the providers configured on an EnvironmentInjector
 *
 * @param injector EnvironmentInjector
 * @returns an array of objects representing the providers of the given injector
 */
function getEnvironmentInjectorProviders(injector) {
    var _a, _b;
    const providerRecordsWithoutImportPaths = (_a = (0, framework_injector_profiler_1.getFrameworkDIDebugData)().resolverToProviders.get(injector)) !== null && _a !== void 0 ? _a : [];
    // platform injector has no provider imports container so can we skip trying to
    // find import paths
    if (isPlatformInjector(injector)) {
        return providerRecordsWithoutImportPaths;
    }
    const providerImportsContainer = getProviderImportsContainer(injector);
    if (providerImportsContainer === null) {
        // We assume that if an environment injector exists without an associated provider imports
        // container, it was created without such a container. Some examples cases where this could
        // happen:
        // - The root injector of a standalone application
        // - A router injector created by using the providers array in a lazy loaded route
        // - A manually created injector that is attached to the injector tree
        // Since each of these cases has no provider container, there is no concept of import paths,
        // so we can simply return the provider records.
        return providerRecordsWithoutImportPaths;
    }
    const providerToPath = getProviderImportPaths(providerImportsContainer);
    const providerRecords = [];
    for (const providerRecord of providerRecordsWithoutImportPaths) {
        const provider = providerRecord.provider;
        // Ignore these special providers for now until we have a cleaner way of
        // determing when they are provided by the framework vs provided by the user.
        const token = provider.provide;
        if (token === initializer_token_1.ENVIRONMENT_INITIALIZER || token === internal_tokens_1.INJECTOR_DEF_TYPES) {
            continue;
        }
        let importPath = (_b = providerToPath.get(provider)) !== null && _b !== void 0 ? _b : [];
        const def = (0, def_getters_1.getComponentDef)(providerImportsContainer);
        const isStandaloneComponent = !!(def === null || def === void 0 ? void 0 : def.standalone);
        // We prepend the component constructor in the standalone case
        // because walkProviderTree does not visit this constructor during it's traversal
        if (isStandaloneComponent) {
            importPath = [providerImportsContainer, ...importPath];
        }
        providerRecords.push(Object.assign(Object.assign({}, providerRecord), { importPath }));
    }
    return providerRecords;
}
function isPlatformInjector(injector) {
    return injector instanceof r3_injector_1.R3Injector && injector.scopes.has('platform');
}
/**
 * Gets the providers configured on an injector.
 *
 * @param injector the injector to lookup the providers of
 * @returns ProviderRecord[] an array of objects representing the providers of the given injector
 */
function getInjectorProviders(injector) {
    if (injector instanceof di_1.NodeInjector) {
        return getNodeInjectorProviders(injector);
    }
    else if (injector instanceof r3_injector_1.EnvironmentInjector) {
        return getEnvironmentInjectorProviders(injector);
    }
    (0, assert_1.throwError)('getInjectorProviders only supports NodeInjector and EnvironmentInjector');
}
/**
 *
 * Given an injector, this function will return
 * an object containing the type and source of the injector.
 *
 * |              | type        | source                                                      |
 * |--------------|-------------|-------------------------------------------------------------|
 * | NodeInjector | element     | DOM element that created this injector                      |
 * | R3Injector   | environment | `injector.source`                                           |
 * | NullInjector | null        | null                                                        |
 *
 * @param injector the Injector to get metadata for
 * @returns an object containing the type and source of the given injector. If the injector metadata
 *     cannot be determined, returns null.
 */
function getInjectorMetadata(injector) {
    var _a;
    if (injector instanceof di_1.NodeInjector) {
        const lView = (0, di_1.getNodeInjectorLView)(injector);
        const tNode = (0, di_1.getNodeInjectorTNode)(injector);
        (0, assert_2.assertTNodeForLView)(tNode, lView);
        return { type: 'element', source: (0, view_utils_1.getNativeByTNode)(tNode, lView) };
    }
    if (injector instanceof r3_injector_1.R3Injector) {
        return { type: 'environment', source: (_a = injector.source) !== null && _a !== void 0 ? _a : null };
    }
    if (injector instanceof null_injector_1.NullInjector) {
        return { type: 'null', source: null };
    }
    return null;
}
function getInjectorResolutionPath(injector) {
    const resolutionPath = [injector];
    getInjectorResolutionPathHelper(injector, resolutionPath);
    return resolutionPath;
}
function getInjectorResolutionPathHelper(injector, resolutionPath) {
    const parent = getInjectorParent(injector);
    // if getInjectorParent can't find a parent, then we've either reached the end
    // of the path, or we need to move from the Element Injector tree to the
    // module injector tree using the first injector in our path as the connection point.
    if (parent === null) {
        if (injector instanceof di_1.NodeInjector) {
            const firstInjector = resolutionPath[0];
            if (firstInjector instanceof di_1.NodeInjector) {
                const moduleInjector = getModuleInjectorOfNodeInjector(firstInjector);
                if (moduleInjector === null) {
                    (0, assert_1.throwError)('NodeInjector must have some connection to the module injector tree');
                }
                resolutionPath.push(moduleInjector);
                getInjectorResolutionPathHelper(moduleInjector, resolutionPath);
            }
            return resolutionPath;
        }
    }
    else {
        resolutionPath.push(parent);
        getInjectorResolutionPathHelper(parent, resolutionPath);
    }
    return resolutionPath;
}
/**
 * Gets the parent of an injector.
 *
 * This function is not able to make the jump from the Element Injector Tree to the Module
 * injector tree. This is because the "parent" (the next step in the reoslution path)
 * of a root NodeInjector is dependent on which NodeInjector ancestor initiated
 * the DI lookup. See getInjectorResolutionPath for a function that can make this jump.
 *
 * In the below diagram:
 * ```ts
 * getInjectorParent(NodeInjectorB)
 *  > NodeInjectorA
 * getInjectorParent(NodeInjectorA) // or getInjectorParent(getInjectorParent(NodeInjectorB))
 *  > null // cannot jump to ModuleInjector tree
 * ```
 *
 * ```
 *                ┌───────┐                ┌───────────────────┐
 *    ┌───────────┤ModuleA├───Injector────►│EnvironmentInjector│
 *    │           └───┬───┘                └───────────────────┘
 *    │               │
 *    │           bootstraps
 *    │               │
 *    │               │
 *    │          ┌────▼─────┐                 ┌─────────────┐
 * declares      │ComponentA├────Injector────►│NodeInjectorA│
 *    │          └────┬─────┘                 └─────▲───────┘
 *    │               │                             │
 *    │            renders                        parent
 *    │               │                             │
 *    │          ┌────▼─────┐                 ┌─────┴───────┐
 *    └─────────►│ComponentB├────Injector────►│NodeInjectorB│
 *               └──────────┘                 └─────────────┘
 *```
 *
 * @param injector an Injector to get the parent of
 * @returns Injector the parent of the given injector
 */
function getInjectorParent(injector) {
    var _a;
    if (injector instanceof r3_injector_1.R3Injector) {
        return injector.parent;
    }
    let tNode;
    let lView;
    if (injector instanceof di_1.NodeInjector) {
        tNode = (0, di_1.getNodeInjectorTNode)(injector);
        lView = (0, di_1.getNodeInjectorLView)(injector);
    }
    else if (injector instanceof null_injector_1.NullInjector) {
        return null;
    }
    else if (injector instanceof chained_injector_1.ChainedInjector) {
        return injector.parentInjector;
    }
    else {
        (0, assert_1.throwError)('getInjectorParent only support injectors of type R3Injector, NodeInjector, NullInjector');
    }
    const parentLocation = (0, di_1.getParentInjectorLocation)(tNode, lView);
    if ((0, injector_utils_1.hasParentInjector)(parentLocation)) {
        const parentInjectorIndex = (0, injector_utils_1.getParentInjectorIndex)(parentLocation);
        const parentLView = (0, injector_utils_1.getParentInjectorView)(parentLocation, lView);
        const parentTView = parentLView[view_1.TVIEW];
        const parentTNode = parentTView.data[parentInjectorIndex + 8 /* NodeInjectorOffset.TNODE */];
        return new di_1.NodeInjector(parentTNode, parentLView);
    }
    else {
        const chainedInjector = lView[view_1.INJECTOR];
        // Case where chainedInjector.injector is an OutletInjector and chainedInjector.injector.parent
        // is a NodeInjector.
        // todo(aleksanderbodurri): ideally nothing in packages/core should deal
        // directly with router concerns. Refactor this so that we can make the jump from
        // NodeInjector -> OutletInjector -> NodeInjector
        // without explicitly relying on types contracts from packages/router
        const injectorParent = (_a = chainedInjector.injector) === null || _a === void 0 ? void 0 : _a.parent;
        if (injectorParent instanceof di_1.NodeInjector) {
            return injectorParent;
        }
    }
    return null;
}
/**
 * Gets the module injector of a NodeInjector.
 *
 * @param injector NodeInjector to get module injector of
 * @returns Injector representing module injector of the given NodeInjector
 */
function getModuleInjectorOfNodeInjector(injector) {
    let lView;
    if (injector instanceof di_1.NodeInjector) {
        lView = (0, di_1.getNodeInjectorLView)(injector);
    }
    else {
        (0, assert_1.throwError)('getModuleInjectorOfNodeInjector must be called with a NodeInjector');
    }
    const inj = lView[view_1.INJECTOR];
    const moduleInjector = inj instanceof chained_injector_1.ChainedInjector ? inj.parentInjector : inj.parent;
    if (!moduleInjector) {
        (0, assert_1.throwError)('NodeInjector must have some connection to the module injector tree');
    }
    return moduleInjector;
}
