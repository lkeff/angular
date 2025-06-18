"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToClientEvents = void 0;
const operators_1 = require("rxjs/operators");
const shared_utils_1 = require("shared-utils");
const component_inspector_1 = require("./component-inspector/component-inspector");
const component_tree_1 = require("./component-tree/component-tree");
const highlighter_1 = require("./highlighter");
const hooks_1 = require("./hooks");
const capture_1 = require("./hooks/capture");
const router_tree_1 = require("./router-tree");
const ng_debug_api_1 = require("./ng-debug-api/ng-debug-api");
const set_console_reference_1 = require("./set-console-reference");
const state_serializer_1 = require("./state-serializer/state-serializer");
const utils_1 = require("./utils");
const supported_apis_1 = require("./ng-debug-api/supported-apis");
const subscribeToClientEvents = (messageBus, depsForTestOnly) => {
    const inspector = { ref: null };
    messageBus.on('shutdown', shutdownCallback(messageBus));
    messageBus.on('getLatestComponentExplorerView', getLatestComponentExplorerViewCallback(messageBus));
    messageBus.on('queryNgAvailability', checkForAngularCallback(messageBus));
    messageBus.on('startProfiling', startProfilingCallback(messageBus));
    messageBus.on('stopProfiling', stopProfilingCallback(messageBus));
    messageBus.on('setSelectedComponent', selectedComponentCallback(inspector));
    messageBus.on('getNestedProperties', getNestedPropertiesCallback(messageBus));
    messageBus.on('getRoutes', getRoutesCallback(messageBus));
    messageBus.on('updateState', component_tree_1.updateState);
    messageBus.on('enableTimingAPI', hooks_1.enableTimingAPI);
    messageBus.on('disableTimingAPI', hooks_1.disableTimingAPI);
    messageBus.on('getInjectorProviders', getInjectorProvidersCallback(messageBus));
    messageBus.on('logProvider', logProvider);
    messageBus.on('log', ({ message, level }) => {
        console[level](`[Angular DevTools]: ${message}`);
    });
    if ((0, shared_utils_1.appIsAngularInDevMode)() && (0, shared_utils_1.appIsSupportedAngularVersion)() && (0, shared_utils_1.appIsAngularIvy)()) {
        inspector.ref = setupInspector(messageBus);
        // Often websites have `scroll` event listener which triggers
        // Angular's change detection. We don't want to constantly send
        // update requests, instead we want to request an update at most
        // once every 250ms
        (0, utils_1.runOutsideAngular)(() => {
            (0, hooks_1.initializeOrGetDirectiveForestHooks)(depsForTestOnly)
                .profiler.changeDetection$.pipe((0, operators_1.debounceTime)(250))
                .subscribe(() => messageBus.emit('componentTreeDirty'));
        });
    }
};
exports.subscribeToClientEvents = subscribeToClientEvents;
//
// Callback Definitions
//
const shutdownCallback = (messageBus) => () => {
    messageBus.destroy();
};
const getLatestComponentExplorerViewCallback = (messageBus) => (query) => {
    // We want to force re-indexing of the component tree.
    // Pressing the refresh button means the user saw stuck UI.
    (0, hooks_1.initializeOrGetDirectiveForestHooks)().indexForest();
    const forest = prepareForestForSerialization((0, hooks_1.initializeOrGetDirectiveForestHooks)().getIndexedDirectiveForest(), (0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)());
    // cleanup injector id mappings
    for (const injectorId of component_tree_1.idToInjector.keys()) {
        if (!component_tree_1.injectorsSeen.has(injectorId)) {
            const injector = component_tree_1.idToInjector.get(injectorId);
            if ((0, component_tree_1.isElementInjector)(injector)) {
                const element = (0, component_tree_1.getElementInjectorElement)(injector);
                if (element) {
                    component_tree_1.nodeInjectorToResolutionPath.delete(element);
                }
            }
            component_tree_1.idToInjector.delete(injectorId);
        }
    }
    component_tree_1.injectorsSeen.clear();
    if (!query) {
        messageBus.emit('latestComponentExplorerView', [{ forest }]);
        return;
    }
    const state = (0, component_tree_1.getLatestComponentState)(query, (0, hooks_1.initializeOrGetDirectiveForestHooks)().getDirectiveForest());
    if (state) {
        const { directiveProperties } = state;
        messageBus.emit('latestComponentExplorerView', [{ forest, properties: directiveProperties }]);
    }
    else {
        // if the node is not found in the tree, we assume its gone and send the tree as is.
        messageBus.emit('latestComponentExplorerView', [{ forest }]);
    }
};
const checkForAngularCallback = (messageBus) => () => checkForAngular(messageBus);
const getRoutesCallback = (messageBus) => () => getRoutes(messageBus);
const startProfilingCallback = (messageBus) => () => (0, capture_1.start)((frame) => {
    messageBus.emit('sendProfilerChunk', [frame]);
});
const stopProfilingCallback = (messageBus) => () => {
    messageBus.emit('profilerResults', [(0, capture_1.stop)()]);
};
const selectedComponentCallback = (inspector) => (position) => {
    var _a;
    const node = (0, component_tree_1.queryDirectiveForest)(position, (0, hooks_1.initializeOrGetDirectiveForestHooks)().getIndexedDirectiveForest());
    (0, set_console_reference_1.setConsoleReference)({ node, position });
    (_a = inspector.ref) === null || _a === void 0 ? void 0 : _a.highlightByPosition(position);
};
const getNestedPropertiesCallback = (messageBus) => (position, propPath) => {
    const emitEmpty = () => messageBus.emit('nestedProperties', [position, { props: {} }, propPath]);
    const node = (0, component_tree_1.queryDirectiveForest)(position.element, (0, hooks_1.initializeOrGetDirectiveForestHooks)().getIndexedDirectiveForest());
    if (!node) {
        return emitEmpty();
    }
    const current = position.directive === undefined ? node.component : node.directives[position.directive];
    if (!current) {
        return emitEmpty();
    }
    let data = current.instance;
    for (const prop of propPath) {
        data = (0, utils_1.unwrapSignal)(data[prop]);
        if (!data) {
            console.error('Cannot access the properties', propPath, 'of', node);
        }
    }
    messageBus.emit('nestedProperties', [
        position,
        { props: (0, state_serializer_1.serializeDirectiveState)(data) },
        propPath,
    ]);
    return;
};
//
// Subscribe Helpers
//
// todo: parse router tree with framework APIs after they are developed
const getRoutes = (messageBus) => {
    var _a;
    const forest = prepareForestForSerialization((0, hooks_1.initializeOrGetDirectiveForestHooks)().getIndexedDirectiveForest(), (0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)());
    if (forest.length === 0)
        return;
    const rootInjector = ((_a = forest[0].resolutionPath) !== null && _a !== void 0 ? _a : []).find((i) => i.name === 'Root');
    if (!rootInjector)
        return;
    const route = getRouterConfigFromRoot(rootInjector);
    if (!route)
        return;
    messageBus.emit('updateRouterTree', [[route]]);
};
const getSerializedProviderRecords = (injector) => {
    var _a;
    if (!component_tree_1.idToInjector.has(injector.id)) {
        return;
    }
    const providerRecords = (0, component_tree_1.getInjectorProviders)(component_tree_1.idToInjector.get(injector.id));
    const allProviderRecords = [];
    const tokenToRecords = new Map();
    for (const [index, providerRecord] of providerRecords.entries()) {
        const record = (0, component_tree_1.serializeProviderRecord)(providerRecord, index, injector.type === 'environment');
        allProviderRecords.push(record);
        const records = (_a = tokenToRecords.get(providerRecord.token)) !== null && _a !== void 0 ? _a : [];
        records.push(record);
        tokenToRecords.set(providerRecord.token, records);
    }
    const serializedProviderRecords = [];
    for (const [token, records] of tokenToRecords.entries()) {
        const multiRecords = records.filter((record) => record.multi);
        const nonMultiRecords = records.filter((record) => !record.multi);
        for (const record of nonMultiRecords) {
            serializedProviderRecords.push(record);
        }
        const [firstMultiRecord] = multiRecords;
        if (firstMultiRecord !== undefined) {
            // All multi providers will have the same token, so we can just use the first one.
            serializedProviderRecords.push({
                token: firstMultiRecord.token,
                type: 'multi',
                multi: true,
                // todo(aleksanderbodurri): implememnt way to differentiate multi providers that
                // provided as viewProviders
                isViewProvider: firstMultiRecord.isViewProvider,
                index: records.map((record) => record.index),
            });
        }
    }
    return serializedProviderRecords;
};
const getProviderValue = (serializedInjector, serializedProvider) => {
    if (!component_tree_1.idToInjector.has(serializedInjector.id)) {
        return;
    }
    const injector = component_tree_1.idToInjector.get(serializedInjector.id);
    const providerRecords = (0, component_tree_1.getInjectorProviders)(injector);
    if (typeof serializedProvider.index === 'number') {
        const provider = providerRecords[serializedProvider.index];
        return injector.get(provider.token, null, { optional: true });
    }
    else if (Array.isArray(serializedProvider.index)) {
        const provider = serializedProvider.index.map((index) => providerRecords[index]);
        return injector.get(provider[0].token, null, { optional: true });
    }
    else {
        return;
    }
};
const getRouterConfigFromRoot = (injector) => {
    var _a;
    const serializedProviderRecords = (_a = getSerializedProviderRecords(injector)) !== null && _a !== void 0 ? _a : [];
    const routerInstance = serializedProviderRecords.find((provider) => provider.token === 'Router');
    if (!routerInstance) {
        return;
    }
    const routerProvider = getProviderValue(injector, routerInstance);
    return (0, router_tree_1.parseRoutes)(routerProvider);
};
const checkForAngular = (messageBus) => {
    const ngVersion = (0, shared_utils_1.getAngularVersion)();
    const appIsIvy = (0, shared_utils_1.appIsAngularIvy)();
    if (!ngVersion) {
        return;
    }
    if (appIsIvy && (0, shared_utils_1.appIsAngularInDevMode)() && (0, shared_utils_1.appIsSupportedAngularVersion)()) {
        (0, hooks_1.initializeOrGetDirectiveForestHooks)();
    }
    messageBus.emit('ngAvailability', [
        {
            version: ngVersion.toString(),
            devMode: (0, shared_utils_1.appIsAngularInDevMode)(),
            ivy: appIsIvy,
            hydration: (0, shared_utils_1.isHydrationEnabled)(),
            supportedApis: (0, supported_apis_1.getSupportedApis)(),
        },
    ]);
};
const setupInspector = (messageBus) => {
    const inspector = new component_inspector_1.ComponentInspector({
        onComponentEnter: (id) => {
            messageBus.emit('highlightComponent', [id]);
        },
        onComponentLeave: () => {
            messageBus.emit('removeComponentHighlight');
        },
        onComponentSelect: (id) => {
            messageBus.emit('selectComponent', [id]);
        },
    });
    messageBus.on('inspectorStart', inspector.startInspecting);
    messageBus.on('inspectorEnd', inspector.stopInspecting);
    messageBus.on('createHighlightOverlay', (position) => {
        inspector.highlightByPosition(position);
    });
    messageBus.on('removeHighlightOverlay', highlighter_1.unHighlight);
    messageBus.on('createHydrationOverlay', inspector.highlightHydrationNodes);
    messageBus.on('removeHydrationOverlay', inspector.removeHydrationHighlights);
    return inspector;
};
// Here we drop properties to prepare the tree for serialization.
// We don't need the component instance, so we just traverse the tree
// and leave the component name.
const prepareForestForSerialization = (roots, includeResolutionPath = false) => {
    const serializedNodes = [];
    for (const node of roots) {
        const serializedNode = {
            element: node.element,
            component: node.component
                ? {
                    name: node.component.name,
                    isElement: node.component.isElement,
                    id: (0, hooks_1.initializeOrGetDirectiveForestHooks)().getDirectiveId(node.component.instance),
                }
                : null,
            directives: node.directives.map((d) => ({
                name: d.name,
                id: (0, hooks_1.initializeOrGetDirectiveForestHooks)().getDirectiveId(d.instance),
            })),
            children: prepareForestForSerialization(node.children, includeResolutionPath),
            hydration: node.hydration,
            defer: node.defer,
            onPush: node.component ? (0, component_tree_1.isOnPushDirective)(node.component) : false,
            // native elements are not serializable
            hasNativeElement: !!node.nativeElement,
        };
        serializedNodes.push(serializedNode);
        if (includeResolutionPath) {
            serializedNode.resolutionPath = getNodeDIResolutionPath(node);
        }
    }
    return serializedNodes;
};
function getNodeDIResolutionPath(node) {
    // Some nodes are not linked to HTMLElements, for example @defer blocks
    if (!node.nativeElement) {
        return undefined;
    }
    const nodeInjector = (0, component_tree_1.getInjectorFromElementNode)(node.nativeElement);
    if (!nodeInjector) {
        return [];
    }
    // There are legit cases where an angular node will have non-ElementInjector injectors.
    // For example, components created with createComponent require the API consumer to
    // pass in an element injector, else it sets the element injector of the component
    // to the NullInjector
    if (!(0, component_tree_1.isElementInjector)(nodeInjector)) {
        return [];
    }
    const element = (0, component_tree_1.getElementInjectorElement)(nodeInjector);
    if (!component_tree_1.nodeInjectorToResolutionPath.has(element)) {
        const resolutionPaths = (0, component_tree_1.getInjectorResolutionPath)(nodeInjector);
        component_tree_1.nodeInjectorToResolutionPath.set(element, (0, component_tree_1.serializeResolutionPath)(resolutionPaths));
    }
    const serializedPath = component_tree_1.nodeInjectorToResolutionPath.get(element);
    for (const injector of serializedPath) {
        component_tree_1.injectorsSeen.add(injector.id);
    }
    return serializedPath;
}
const getInjectorProvidersCallback = (messageBus) => (injector) => {
    var _a;
    if (!component_tree_1.idToInjector.has(injector.id)) {
        return;
    }
    const providerRecords = (0, component_tree_1.getInjectorProviders)(component_tree_1.idToInjector.get(injector.id));
    const allProviderRecords = [];
    const tokenToRecords = new Map();
    for (const [index, providerRecord] of providerRecords.entries()) {
        const record = (0, component_tree_1.serializeProviderRecord)(providerRecord, index, injector.type === 'environment');
        allProviderRecords.push(record);
        const records = (_a = tokenToRecords.get(providerRecord.token)) !== null && _a !== void 0 ? _a : [];
        records.push(record);
        tokenToRecords.set(providerRecord.token, records);
    }
    const serializedProviderRecords = [];
    for (const [token, records] of tokenToRecords.entries()) {
        const multiRecords = records.filter((record) => record.multi);
        const nonMultiRecords = records.filter((record) => !record.multi);
        for (const record of nonMultiRecords) {
            serializedProviderRecords.push(record);
        }
        const [firstMultiRecord] = multiRecords;
        if (firstMultiRecord !== undefined) {
            // All multi providers will have the same token, so we can just use the first one.
            serializedProviderRecords.push({
                token: firstMultiRecord.token,
                type: 'multi',
                multi: true,
                // todo(aleksanderbodurri): implememnt way to differentiate multi providers that
                // provided as viewProviders
                isViewProvider: firstMultiRecord.isViewProvider,
                index: records.map((record) => record.index),
            });
        }
    }
    messageBus.emit('latestInjectorProviders', [injector, serializedProviderRecords]);
};
const logProvider = (serializedInjector, serializedProvider) => {
    if (!component_tree_1.idToInjector.has(serializedInjector.id)) {
        return;
    }
    const injector = component_tree_1.idToInjector.get(serializedInjector.id);
    const providerRecords = (0, component_tree_1.getInjectorProviders)(injector);
    console.group(`%c${serializedInjector.name}`, `color: ${serializedInjector.type === 'element' ? '#a7d5a9' : '#f05057'}; font-size: 1.25rem; font-weight: bold;`);
    // tslint:disable-next-line:no-console
    console.log('injector: ', injector);
    if (typeof serializedProvider.index === 'number') {
        const provider = providerRecords[serializedProvider.index];
        // tslint:disable-next-line:no-console
        console.log('provider: ', provider);
        // tslint:disable-next-line:no-console
        console.log(`value: `, injector.get(provider.token, null, { optional: true }));
    }
    else if (Array.isArray(serializedProvider.index)) {
        const providers = serializedProvider.index.map((index) => providerRecords[index]);
        // tslint:disable-next-line:no-console
        console.log('providers: ', providers);
        // tslint:disable-next-line:no-console
        console.log(`value: `, injector.get(providers[0].token, null, { optional: true }));
    }
    console.groupEnd();
};
