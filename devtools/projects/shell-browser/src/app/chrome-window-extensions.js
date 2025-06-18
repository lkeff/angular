"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeExtendedWindowOperations = void 0;
const ng_devtools_backend_1 = require("ng-devtools-backend");
const component_tree_1 = require("../../../ng-devtools-backend/src/lib/component-tree/component-tree");
const initializeExtendedWindowOperations = () => {
    extendWindowOperations(globalThis, { inspectedApplication: chromeWindowExtensions });
};
exports.initializeExtendedWindowOperations = initializeExtendedWindowOperations;
const extendWindowOperations = (target, classImpl) => {
    for (const key of Object.keys(classImpl)) {
        if (target[key] != null) {
            console.warn(`A window function or object named ${key} would be overwritten`);
        }
    }
    Object.assign(target, classImpl);
};
const chromeWindowExtensions = {
    findConstructorByPosition: (serializedId, directiveIndex) => {
        const node = (0, ng_devtools_backend_1.findNodeFromSerializedPosition)(serializedId);
        if (node === null) {
            console.error(`Cannot find element associated with node ${serializedId}`);
            return;
        }
        if (directiveIndex !== undefined) {
            if (node.directives[directiveIndex]) {
                return node.directives[directiveIndex].instance.constructor;
            }
            else {
                console.error(`Could not find the directive in the current node at index ${directiveIndex}`);
                return;
            }
        }
        if (node.component) {
            return node.component.instance.constructor;
        }
        else {
            console.error('This component has no instance and therefore no constructor');
            return;
        }
    },
    findDomElementByPosition: (serializedId) => {
        const node = (0, ng_devtools_backend_1.findNodeFromSerializedPosition)(serializedId);
        if (node === null) {
            console.error(`Cannot find element associated with node ${serializedId}`);
            return undefined;
        }
        return node.nativeElement;
    },
    findPropertyByPosition: (args) => {
        const { directivePosition, objectPath } = JSON.parse(args);
        const node = (0, component_tree_1.queryDirectiveForest)(directivePosition.element, (0, component_tree_1.buildDirectiveForest)());
        if (node === null) {
            console.error(`Cannot find element associated with node ${directivePosition}`);
            return undefined;
        }
        const isDirective = directivePosition.directive !== undefined &&
            node.directives[directivePosition.directive] &&
            typeof node.directives[directivePosition.directive] === 'object';
        if (isDirective) {
            return traverseDirective(node.directives[directivePosition.directive].instance, objectPath);
        }
        if (node.component) {
            return traverseDirective(node.component.instance, objectPath);
        }
    },
};
const traverseDirective = (dir, objectPath) => {
    for (const key of objectPath) {
        if (!dir[key]) {
            return;
        }
        dir = dir[key];
    }
    return dir;
};
