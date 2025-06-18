"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateState = exports.findNodeFromSerializedPosition = exports.findNodeInForest = exports.queryDirectiveForest = exports.buildDirectiveForest = exports.getLatestComponentState = exports.injectorsSeen = exports.idToInjector = exports.nodeInjectorToResolutionPath = exports.injectorToId = void 0;
exports.getInjectorId = getInjectorId;
exports.getInjectorMetadata = getInjectorMetadata;
exports.getInjectorResolutionPath = getInjectorResolutionPath;
exports.getInjectorFromElementNode = getInjectorFromElementNode;
exports.isOnPushDirective = isOnPushDirective;
exports.getInjectorProviders = getInjectorProviders;
exports.serializeInjector = serializeInjector;
exports.serializeProviderRecord = serializeProviderRecord;
exports.getElementInjectorElement = getElementInjectorElement;
exports.isElementInjector = isElementInjector;
exports.serializeResolutionPath = serializeResolutionPath;
const protocol_1 = require("protocol");
const index_1 = require("../directive-forest/index");
const ng_debug_api_1 = require("../ng-debug-api/ng-debug-api");
const state_serializer_1 = require("../state-serializer/state-serializer");
const property_mutation_1 = require("../property-mutation");
const get_roots_1 = require("./get-roots");
const core_enums_1 = require("./core-enums");
exports.injectorToId = new WeakMap();
exports.nodeInjectorToResolutionPath = new WeakMap();
exports.idToInjector = new Map();
exports.injectorsSeen = new Set();
let injectorId = 0;
function getInjectorId() {
    return `${injectorId++}`;
}
function getInjectorMetadata(injector) {
    var _a, _b, _c;
    return (_c = (_b = (_a = (0, ng_debug_api_1.ngDebugClient)()).ɵgetInjectorMetadata) === null || _b === void 0 ? void 0 : _b.call(_a, injector)) !== null && _c !== void 0 ? _c : null;
}
function getInjectorResolutionPath(injector) {
    var _a;
    const ng = (0, ng_debug_api_1.ngDebugClient)();
    if (!(0, ng_debug_api_1.ngDebugApiIsSupported)(ng, 'ɵgetInjectorResolutionPath')) {
        return [];
    }
    return (_a = ng.ɵgetInjectorResolutionPath(injector)) !== null && _a !== void 0 ? _a : [];
}
function getInjectorFromElementNode(element) {
    var _a, _b, _c;
    return (_c = (_b = (_a = (0, ng_debug_api_1.ngDebugClient)()).getInjector) === null || _b === void 0 ? void 0 : _b.call(_a, element)) !== null && _c !== void 0 ? _c : null;
}
function getDirectivesFromElement(element) {
    var _a, _b, _c;
    const ng = (0, ng_debug_api_1.ngDebugClient)();
    let component = null;
    if (element instanceof Element && (0, ng_debug_api_1.ngDebugApiIsSupported)(ng, 'getComponent')) {
        component = ng.getComponent(element);
    }
    return {
        component,
        directives: (_c = (_b = (_a = (0, ng_debug_api_1.ngDebugClient)()).getDirectives) === null || _b === void 0 ? void 0 : _b.call(_a, element)) !== null && _c !== void 0 ? _c : [],
    };
}
const getLatestComponentState = (query, directiveForest) => {
    // if a directive forest is passed in we don't have to build the forest again.
    directiveForest = directiveForest !== null && directiveForest !== void 0 ? directiveForest : (0, exports.buildDirectiveForest)();
    const node = (0, exports.queryDirectiveForest)(query.selectedElement, directiveForest);
    if (!node || !node.nativeElement) {
        return;
    }
    const directiveProperties = {};
    const injector = getInjectorFromElementNode(node.nativeElement);
    const injectors = injector ? getInjectorResolutionPath(injector) : [];
    const resolutionPathWithProviders = !(0, ng_debug_api_1.ngDebugDependencyInjectionApiIsSupported)()
        ? []
        : injectors.map((injector) => ({
            injector,
            providers: getInjectorProviders(injector),
        }));
    const populateResultSet = (dir) => {
        const { instance, name } = dir;
        const metadata = getDirectiveMetadata(instance);
        if (injector && metadata.framework === core_enums_1.Framework.Angular) {
            metadata.dependencies = getDependenciesForDirective(injector, resolutionPathWithProviders, instance.constructor);
        }
        if (query.propertyQuery.type === protocol_1.PropertyQueryTypes.All) {
            directiveProperties[dir.name] = {
                props: (0, state_serializer_1.serializeDirectiveState)(instance),
                metadata,
            };
        }
        if (query.propertyQuery.type === protocol_1.PropertyQueryTypes.Specified) {
            directiveProperties[name] = {
                props: (0, state_serializer_1.deeplySerializeSelectedProperties)(instance, query.propertyQuery.properties[name] || []),
                metadata,
            };
        }
    };
    node.directives.forEach((dir) => populateResultSet(dir));
    if (node.component) {
        populateResultSet(node.component);
    }
    return {
        directiveProperties,
    };
};
exports.getLatestComponentState = getLatestComponentState;
function serializeElementInjectorWithId(injector) {
    let id;
    const element = getElementInjectorElement(injector);
    if (!exports.injectorToId.has(element)) {
        id = getInjectorId();
        exports.injectorToId.set(element, id);
        exports.idToInjector.set(id, injector);
    }
    id = exports.injectorToId.get(element);
    exports.idToInjector.set(id, injector);
    exports.injectorsSeen.add(id);
    const serializedInjector = serializeInjector(injector);
    if (serializedInjector === null) {
        return null;
    }
    return Object.assign({ id }, serializedInjector);
}
function serializeInjectorWithId(injector) {
    if (isElementInjector(injector)) {
        return serializeElementInjectorWithId(injector);
    }
    else {
        return serializeEnvironmentInjectorWithId(injector);
    }
}
function serializeEnvironmentInjectorWithId(injector) {
    let id;
    if (!exports.injectorToId.has(injector)) {
        id = getInjectorId();
        exports.injectorToId.set(injector, id);
        exports.idToInjector.set(id, injector);
    }
    id = exports.injectorToId.get(injector);
    exports.idToInjector.set(id, injector);
    exports.injectorsSeen.add(id);
    const serializedInjector = serializeInjector(injector);
    if (serializedInjector === null) {
        return null;
    }
    return Object.assign({ id }, serializedInjector);
}
// Gets directive metadata. For newer versions of Angular (v12+) it uses
// the global `getDirectiveMetadata`. For prior versions of the framework
// the method directly interacts with the directive/component definition.
const getDirectiveMetadata = (dir) => {
    const getMetadata = (0, ng_debug_api_1.ngDebugClient)().getDirectiveMetadata;
    const metadata = getMetadata === null || getMetadata === void 0 ? void 0 : getMetadata(dir);
    if (metadata) {
        const { framework } = metadata;
        switch (framework) {
            case undefined: // Back compat, older Angular versions did not set `framework`.
            case core_enums_1.Framework.Angular: {
                const meta = metadata;
                return {
                    framework: core_enums_1.Framework.Angular,
                    name: meta.name,
                    inputs: meta.inputs,
                    outputs: meta.outputs,
                    encapsulation: meta.encapsulation,
                    onPush: meta.changeDetection === core_enums_1.ChangeDetectionStrategy.OnPush,
                };
            }
            case core_enums_1.Framework.ACX: {
                const meta = metadata;
                return {
                    framework: core_enums_1.Framework.ACX,
                    name: meta.name,
                    inputs: meta.inputs,
                    outputs: meta.outputs,
                    encapsulation: meta.encapsulation,
                    onPush: meta.changeDetection === core_enums_1.AcxChangeDetectionStrategy.OnPush,
                };
            }
            case core_enums_1.Framework.Wiz: {
                return {
                    framework: core_enums_1.Framework.Wiz,
                    name: metadata.name,
                    props: metadata.props,
                };
            }
            default: {
                throw new Error(`Unknown framework: "${framework}".`);
            }
        }
    }
    // Used in older Angular versions, prior to the introduction of `getDirectiveMetadata`.
    const safelyGrabMetadata = (key) => {
        try {
            return dir.constructor.ɵcmp ? dir.constructor.ɵcmp[key] : dir.constructor.ɵdir[key];
        }
        catch (_a) {
            console.warn(`Could not find metadata for key: ${key} in directive:`, dir);
            return undefined;
        }
    };
    return {
        framework: core_enums_1.Framework.Angular,
        inputs: safelyGrabMetadata("inputs" /* DirectiveMetadataKey.INPUTS */),
        outputs: safelyGrabMetadata("outputs" /* DirectiveMetadataKey.OUTPUTS */),
        encapsulation: safelyGrabMetadata("encapsulation" /* DirectiveMetadataKey.ENCAPSULATION */),
        onPush: safelyGrabMetadata("onPush" /* DirectiveMetadataKey.ON_PUSH */),
    };
};
function isOnPushDirective(dir) {
    const metadata = getDirectiveMetadata(dir.instance);
    switch (metadata.framework) {
        case core_enums_1.Framework.Angular:
            return Boolean(metadata.onPush);
        case core_enums_1.Framework.ACX:
            return Boolean(metadata.onPush);
        case core_enums_1.Framework.Wiz:
            return false;
        default:
            throw new Error(`Unknown framework: "${metadata.framework}".`);
    }
}
function getInjectorProviders(injector) {
    if (isNullInjector(injector)) {
        return [];
    }
    return (0, ng_debug_api_1.ngDebugClient)().ɵgetInjectorProviders(injector);
}
const getDependenciesForDirective = (injector, resolutionPath, directive) => {
    var _a, _b, _c;
    const ng = (0, ng_debug_api_1.ngDebugClient)();
    if (!(0, ng_debug_api_1.ngDebugApiIsSupported)(ng, 'ɵgetDependenciesFromInjectable')) {
        return [];
    }
    let dependencies = (_b = (_a = ng.ɵgetDependenciesFromInjectable(injector, directive)) === null || _a === void 0 ? void 0 : _a.dependencies) !== null && _b !== void 0 ? _b : [];
    const uniqueServices = new Set();
    const serializedInjectedServices = [];
    let position = 0;
    for (const dependency of dependencies) {
        const providedIn = dependency.providedIn;
        const foundInjectorIndex = resolutionPath.findIndex((node) => node.injector === providedIn);
        if (foundInjectorIndex === -1) {
            position++;
            continue;
        }
        const providers = resolutionPath[foundInjectorIndex].providers;
        const foundProvider = providers.find((provider) => provider.token === dependency.token);
        // the dependency resolution path is
        // the path from the root injector to the injector that provided the dependency (1)
        // +
        // the import path from the providing injector to the feature module that provided the
        // dependency (2)
        const dependencyResolutionPath = [
            // (1)
            ...resolutionPath
                .slice(0, foundInjectorIndex + 1)
                .map((node) => serializeInjectorWithId(node.injector)),
            // (2)
            // We slice the import path to remove the first element because this is the same
            // injector as the last injector in the resolution path.
            ...((_c = foundProvider === null || foundProvider === void 0 ? void 0 : foundProvider.importPath) !== null && _c !== void 0 ? _c : []).slice(1).map((node) => {
                return {
                    type: 'imported-module',
                    name: valueToLabel(node),
                    id: getInjectorId(),
                };
            }),
        ];
        let flags = dependency.flags;
        let flagToken = '';
        if (flags !== undefined) {
            // TODO: We need to remove this once the InjectFlags enum is removed from core
            if (typeof flags === 'number') {
                flags = {
                    optional: !!(flags & 8),
                    skipSelf: !!(flags & 4),
                    self: !!(flags & 2),
                    host: !!(flags & 1),
                };
            }
            flagToken = ['optional', 'skipSelf', 'self', 'host']
                .filter((key) => flags[key])
                .join('-');
        }
        const serviceKey = `${dependency.token}-${flagToken}`;
        if (!uniqueServices.has(serviceKey)) {
            uniqueServices.add(serviceKey);
            const service = {
                token: valueToLabel(dependency.token),
                value: valueToLabel(dependency.value),
                flags,
                position: [position],
                resolutionPath: dependencyResolutionPath,
            };
            if (dependency.token && isInjectionToken(dependency.token)) {
                service.token = dependency.token.toString();
            }
            serializedInjectedServices.push(service);
        }
        position++;
    }
    return serializedInjectedServices;
};
const valueToLabel = (value) => {
    if (isInjectionToken(value)) {
        return `InjectionToken(${value['_desc']})`;
    }
    if (typeof value === 'object') {
        return stripUnderscore(value.constructor.name);
    }
    if (typeof value === 'function') {
        return stripUnderscore(value.name);
    }
    return stripUnderscore(value);
};
function stripUnderscore(str) {
    if (str.startsWith('_')) {
        return str.slice(1);
    }
    return str;
}
function serializeInjector(injector) {
    var _a;
    const metadata = getInjectorMetadata(injector);
    if (metadata === null) {
        console.error('Angular DevTools: Could not serialize injector.', injector);
        return null;
    }
    const providers = getInjectorProviders(injector).length;
    if (metadata.type === 'null') {
        return { type: 'null', name: 'Null Injector', providers: 0 };
    }
    if (metadata.type === 'element') {
        const source = metadata.source;
        const name = stripUnderscore(elementToDirectiveNames(source)[0]);
        return { type: 'element', name, providers };
    }
    if (metadata.type === 'environment') {
        if (injector.scopes instanceof Set) {
            if (injector.scopes.has('platform')) {
                return { type: 'environment', name: 'Platform', providers };
            }
            if (injector.scopes.has('root')) {
                return { type: 'environment', name: 'Root', providers };
            }
        }
        return { type: 'environment', name: stripUnderscore((_a = metadata.source) !== null && _a !== void 0 ? _a : ''), providers };
    }
    console.error('Angular DevTools: Could not serialize injector.', injector);
    return null;
}
function serializeProviderRecord(providerRecord, index, hasImportPath = false) {
    var _a;
    let type = 'type';
    let multi = false;
    if (typeof providerRecord.provider === 'object') {
        if (providerRecord.provider.useClass !== undefined) {
            type = 'class';
        }
        else if (providerRecord.provider.useValue !== undefined) {
            type = 'value';
        }
        else if (providerRecord.provider.useFactory !== undefined) {
            type = 'factory';
        }
        else if (providerRecord.provider.useExisting !== undefined) {
            type = 'existing';
        }
        if (providerRecord.provider.multi !== undefined) {
            multi = providerRecord.provider.multi;
        }
    }
    const serializedProvider = {
        token: valueToLabel(providerRecord.token),
        type,
        multi,
        isViewProvider: providerRecord.isViewProvider,
        index,
    };
    if (hasImportPath) {
        serializedProvider['importPath'] = ((_a = providerRecord.importPath) !== null && _a !== void 0 ? _a : []).map((injector) => valueToLabel(injector));
    }
    return serializedProvider;
}
function elementToDirectiveNames(element) {
    const { component, directives } = getDirectivesFromElement(element);
    return [component, ...directives]
        .map((dir) => { var _a, _b; return (_b = (_a = dir === null || dir === void 0 ? void 0 : dir.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ''; })
        .filter((dir) => !!dir);
}
function getElementInjectorElement(elementInjector) {
    if (!isElementInjector(elementInjector)) {
        throw new Error('Injector is not an element injector');
    }
    return getInjectorMetadata(elementInjector).source;
}
function isInjectionToken(token) {
    return token.constructor.name === 'InjectionToken';
}
function isElementInjector(injector) {
    const metadata = getInjectorMetadata(injector);
    return metadata !== null && metadata.type === 'element';
}
function isNullInjector(injector) {
    const metadata = getInjectorMetadata(injector);
    return metadata !== null && metadata.type === 'null';
}
const getRootLViewsHelper = (element, rootLViews = new Set()) => {
    if (!(element instanceof HTMLElement)) {
        return rootLViews;
    }
    const lView = (0, index_1.getLViewFromDirectiveOrElementInstance)(element);
    if (lView) {
        rootLViews.add(lView);
        return rootLViews;
    }
    for (let i = 0; i < element.children.length; i++) {
        getRootLViewsHelper(element.children[i], rootLViews);
    }
    return rootLViews;
};
const buildDirectiveForest = () => {
    const roots = (0, get_roots_1.getRoots)();
    return Array.prototype.concat.apply([], Array.from(roots).map(index_1.buildDirectiveTree));
};
exports.buildDirectiveForest = buildDirectiveForest;
// Based on an ElementID we return a specific component node.
// If we can't find any, we return null.
const queryDirectiveForest = (position, forest) => {
    if (!position.length) {
        return null;
    }
    let node = null;
    for (const i of position) {
        node = forest[i];
        if (!node) {
            return null;
        }
        forest = node.children;
    }
    return node;
};
exports.queryDirectiveForest = queryDirectiveForest;
const findNodeInForest = (position, forest) => {
    const foundComponent = (0, exports.queryDirectiveForest)(position, forest);
    return foundComponent ? foundComponent.nativeElement : null;
};
exports.findNodeInForest = findNodeInForest;
const findNodeFromSerializedPosition = (serializedPosition) => {
    const position = serializedPosition.split(',').map((index) => parseInt(index, 10));
    return (0, exports.queryDirectiveForest)(position, (0, exports.buildDirectiveForest)());
};
exports.findNodeFromSerializedPosition = findNodeFromSerializedPosition;
const updateState = (updatedStateData) => {
    var _a, _b;
    const ng = (0, ng_debug_api_1.ngDebugClient)();
    const node = (0, exports.queryDirectiveForest)(updatedStateData.directiveId.element, (0, exports.buildDirectiveForest)());
    if (!node) {
        console.warn('Could not update the state of component', updatedStateData, 'because the component was not found');
        return;
    }
    if (updatedStateData.directiveId.directive !== undefined) {
        const directive = node.directives[updatedStateData.directiveId.directive].instance;
        (0, property_mutation_1.mutateNestedProp)(directive, updatedStateData.keyPath, updatedStateData.newValue);
        if ((0, ng_debug_api_1.ngDebugApiIsSupported)(ng, 'getOwningComponent')) {
            (_a = ng.applyChanges) === null || _a === void 0 ? void 0 : _a.call(ng, ng.getOwningComponent(directive));
        }
        return;
    }
    if (node.component) {
        const comp = node.component.instance;
        (0, property_mutation_1.mutateNestedProp)(comp, updatedStateData.keyPath, updatedStateData.newValue);
        (_b = ng.applyChanges) === null || _b === void 0 ? void 0 : _b.call(ng, comp);
        return;
    }
};
exports.updateState = updateState;
function serializeResolutionPath(resolutionPath) {
    const serializedResolutionPath = [];
    for (const injector of resolutionPath) {
        let serializedInjectorWithId = null;
        if (isElementInjector(injector)) {
            serializedInjectorWithId = serializeElementInjectorWithId(injector);
        }
        else {
            serializedInjectorWithId = serializeEnvironmentInjectorWithId(injector);
        }
        if (serializedInjectorWithId === null) {
            continue;
        }
        serializedResolutionPath.push(serializedInjectorWithId);
    }
    return serializedResolutionPath;
}
