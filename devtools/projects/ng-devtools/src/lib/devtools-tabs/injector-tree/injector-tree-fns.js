"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectorIdsToRootFromNode = getInjectorIdsToRootFromNode;
exports.generateEdgeIdsFromNodeIds = generateEdgeIdsFromNodeIds;
exports.equalInjector = equalInjector;
exports.findExistingPath = findExistingPath;
exports.transformInjectorResolutionPathsIntoTree = transformInjectorResolutionPathsIntoTree;
exports.grabInjectorPathsFromDirectiveForest = grabInjectorPathsFromDirectiveForest;
exports.splitInjectorPathsIntoElementAndEnvironmentPaths = splitInjectorPathsIntoElementAndEnvironmentPaths;
exports.filterOutInjectorsWithNoProviders = filterOutInjectorsWithNoProviders;
exports.filterOutAngularInjectors = filterOutAngularInjectors;
function getInjectorIdsToRootFromNode(node) {
    const ids = [];
    let currentNode = node;
    while (currentNode) {
        ids.push(currentNode.data.injector.id);
        currentNode = currentNode.parent;
    }
    return ids;
}
function generateEdgeIdsFromNodeIds(nodeIds) {
    const edgeIds = [];
    for (let i = 0; i < nodeIds.length - 1; i++) {
        edgeIds.push(`${nodeIds[i]}-to-${nodeIds[i + 1]}`);
    }
    return edgeIds;
}
function equalInjector(a, b) {
    return a.id === b.id;
}
function findExistingPath(path, value) {
    return path.find((injector) => equalInjector(injector.injector, value)) || null;
}
function transformInjectorResolutionPathsIntoTree(injectorPaths) {
    const injectorTree = [];
    const injectorIdToNode = new Map();
    for (const { path: injectorPath, node } of injectorPaths) {
        let currentLevel = injectorTree;
        for (const [index, injector] of injectorPath.entries()) {
            if (injector.type === 'element' && index === injectorPath.length - 1) {
                injectorIdToNode.set(injector.id, node);
            }
            let existingPath = findExistingPath(currentLevel, injector);
            if (existingPath) {
                currentLevel = existingPath.children;
                continue;
            }
            const next = {
                injector: injector,
                children: [],
            };
            next.injector.node = injectorIdToNode.get(next.injector.id);
            currentLevel.push(next);
            currentLevel = next.children;
        }
    }
    const hiddenRoot = {
        injector: { name: '', type: 'hidden', id: 'N/A' },
        children: injectorTree,
    };
    return hiddenRoot;
}
function grabInjectorPathsFromDirectiveForest(directiveForest) {
    const injectorPaths = [];
    const grabInjectorPaths = (node) => {
        if (node.resolutionPath) {
            injectorPaths.push({ node, path: node.resolutionPath.slice().reverse() });
        }
        node.children.forEach((child) => grabInjectorPaths(child));
    };
    for (const directive of directiveForest) {
        grabInjectorPaths(directive);
    }
    return injectorPaths;
}
function splitInjectorPathsIntoElementAndEnvironmentPaths(injectorPaths) {
    const elementPaths = [];
    const environmentPaths = [];
    const startingElementToEnvironmentPath = new Map();
    injectorPaths.forEach(({ node, path }) => {
        // split the path into two paths,
        // one for the element injector and one for the environment injector
        let environmentPath = [];
        let elementPath = [];
        const firstElementIndex = path.findIndex((injector) => injector.type === 'element');
        if (firstElementIndex === -1) {
            environmentPath = path;
            elementPath = [];
        }
        else {
            environmentPath = path.slice(0, firstElementIndex);
            elementPath = path.slice(firstElementIndex);
        }
        elementPaths.push({
            node,
            path: elementPath,
        });
        environmentPaths.push({
            node,
            path: environmentPath,
        });
        if (elementPath[elementPath.length - 1]) {
            // reverse each path to get the paths starting from the starting element
            startingElementToEnvironmentPath.set(elementPath[elementPath.length - 1].id, environmentPath.slice().reverse());
        }
    });
    return {
        elementPaths: elementPaths.filter(({ path }) => path.every((injector) => injector.type === 'element')),
        environmentPaths,
        startingElementToEnvironmentPath,
    };
}
const ANGULAR_DIRECTIVES = [
    'NgClass',
    'NgComponentOutlet',
    'NgFor',
    'NgForOf',
    'NgIf',
    'NgOptimizedImage',
    'NgPlural',
    'NgPluralCase',
    'NgStyle',
    'NgSwitch',
    'NgSwitchCase',
    'NgSwitchDefault',
    'NgTemplateOutlet',
    'AbstractFormGroupDirective',
    'CheckboxControlValueAccessor',
    'CheckboxRequiredValidator',
    'DefaultValueAccessor',
    'EmailValidator',
    'FormArrayName',
    'FormControlDirective',
    'FormControlName',
    'FormGroupDirective',
    'FormGroupName',
    'MaxLengthValidator',
    'MaxValidator',
    'MinLengthValidator',
    'MinValidator',
    'NgControlStatus',
    'NgControlStatusGroup',
    'NgForm',
    'NgModel',
    'NgModelGroup',
    'NgSelectOption',
    'NumberValueAccessor',
    'PatternValidator',
    'RadioControlValueAccessor',
    'RangeValueAccessor',
    'RequiredValidator',
    'SelectControlValueAccessor',
    'SelectMultipleControlValueAccessor',
    'RouterLink',
    'RouterLinkActive',
    'RouterLinkWithHref',
    'RouterOutlet',
    'UpgradeComponent',
];
const ignoredAngularInjectors = new Set([
    'Null Injector',
    ...ANGULAR_DIRECTIVES,
    ...ANGULAR_DIRECTIVES.map((directive) => `_${directive}`),
]);
function filterOutInjectorsWithNoProviders(injectorPaths) {
    for (const injectorPath of injectorPaths) {
        injectorPath.path = injectorPath.path.filter(({ providers }) => providers === undefined || providers > 0);
    }
    return injectorPaths;
}
function filterOutAngularInjectors(injectorPaths) {
    return injectorPaths.map(({ node, path }) => {
        return { node, path: path.filter((injector) => !ignoredAngularInjectors.has(injector.name)) };
    });
}
