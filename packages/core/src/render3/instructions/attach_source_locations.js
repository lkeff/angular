"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵattachSourceLocations = ɵɵattachSourceLocations;
const view_1 = require("../interfaces/view");
const node_assert_1 = require("../node_assert");
const state_1 = require("../state");
const view_utils_1 = require("../util/view_utils");
/**
 * Sets the location within the source template at which
 * each element in the current view was defined.
 *
 * @param index Index at which the DOM node was created.
 * @param templatePath Path to the template at which the node was defined.
 * @param locations Element locations to which to attach the source location.
 *
 * @codeGenApi
 */
function ɵɵattachSourceLocations(templatePath, locations) {
    const tView = (0, state_1.getTView)();
    const lView = (0, state_1.getLView)();
    const renderer = lView[view_1.RENDERER];
    const attributeName = 'data-ng-source-location';
    for (const [index, offset, line, column] of locations) {
        const tNode = (0, view_utils_1.getTNode)(tView, index + view_1.HEADER_OFFSET);
        // The compiler shouldn't generate the instruction for non-element nodes, but assert just in case.
        ngDevMode && (0, node_assert_1.assertTNodeType)(tNode, 2 /* TNodeType.Element */);
        const node = (0, view_utils_1.getNativeByIndex)(index + view_1.HEADER_OFFSET, lView);
        // Set the attribute directly in the DOM so it doesn't participate in directive matching.
        if (!node.hasAttribute(attributeName)) {
            const attributeValue = `${templatePath}@o:${offset},l:${line},c:${column}`;
            renderer.setAttribute(node, attributeName, attributeValue);
        }
    }
}
