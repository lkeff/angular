"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClosestComponentName = getClosestComponentName;
const context_discovery_1 = require("../render3/context_discovery");
const type_checks_1 = require("../render3/interfaces/type_checks");
const view_1 = require("../render3/interfaces/view");
const view_utils_1 = require("../render3/util/view_utils");
/**
 * Gets the class name of the closest component to a node.
 * Warning! this function will return minified names if the name of the component is minified. The
 * consumer of the function is responsible for resolving the minified name to its original name.
 * @param node Node from which to start the search.
 */
function getClosestComponentName(node) {
    var _a;
    let currentNode = node;
    while (currentNode) {
        const lView = (0, context_discovery_1.readPatchedLView)(currentNode);
        if (lView !== null) {
            for (let i = view_1.HEADER_OFFSET; i < lView.length; i++) {
                const current = lView[i];
                if ((!(0, type_checks_1.isLView)(current) && !(0, type_checks_1.isLContainer)(current)) || current[view_1.HOST] !== currentNode) {
                    continue;
                }
                const tView = lView[view_1.TVIEW];
                const tNode = (0, view_utils_1.getTNode)(tView, i);
                if ((0, type_checks_1.isComponentHost)(tNode)) {
                    const def = tView.data[tNode.directiveStart + tNode.componentOffset];
                    const name = ((_a = def.debugInfo) === null || _a === void 0 ? void 0 : _a.className) || def.type.name;
                    // Note: the name may be an empty string if the class name is
                    // dropped due to minification. In such cases keep going up the tree.
                    if (name) {
                        return name;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        currentNode = currentNode.parentNode;
    }
    return null;
}
