"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootView = getRootView;
exports.getRootContext = getRootContext;
exports.getFirstLContainer = getFirstLContainer;
exports.getNextLContainer = getNextLContainer;
const assert_1 = require("../../util/assert");
const assert_2 = require("../assert");
const context_discovery_1 = require("../context_discovery");
const type_checks_1 = require("../interfaces/type_checks");
const view_1 = require("../interfaces/view");
const view_utils_1 = require("./view_utils");
/**
 * Retrieve the root view from any component or `LView` by walking the parent `LView` until
 * reaching the root `LView`.
 *
 * @param componentOrLView any component or `LView`
 */
function getRootView(componentOrLView) {
    ngDevMode && (0, assert_1.assertDefined)(componentOrLView, 'component');
    let lView = (0, type_checks_1.isLView)(componentOrLView) ? componentOrLView : (0, context_discovery_1.readPatchedLView)(componentOrLView);
    while (lView && !(0, type_checks_1.isRootView)(lView)) {
        lView = (0, view_utils_1.getLViewParent)(lView);
    }
    ngDevMode && (0, assert_2.assertLView)(lView);
    return lView;
}
/**
 * Returns the context information associated with the application where the target is situated. It
 * does this by walking the parent views until it gets to the root view, then getting the context
 * off of that.
 *
 * @param viewOrComponent the `LView` or component to get the root context for.
 */
function getRootContext(viewOrComponent) {
    const rootView = getRootView(viewOrComponent);
    ngDevMode &&
        (0, assert_1.assertDefined)(rootView[view_1.CONTEXT], 'Root view has no context. Perhaps it is disconnected?');
    return rootView[view_1.CONTEXT];
}
/**
 * Gets the first `LContainer` in the LView or `null` if none exists.
 */
function getFirstLContainer(lView) {
    return getNearestLContainer(lView[view_1.CHILD_HEAD]);
}
/**
 * Gets the next `LContainer` that is a sibling of the given container.
 */
function getNextLContainer(container) {
    return getNearestLContainer(container[view_1.NEXT]);
}
function getNearestLContainer(viewOrContainer) {
    while (viewOrContainer !== null && !(0, type_checks_1.isLContainer)(viewOrContainer)) {
        viewOrContainer = viewOrContainer[view_1.NEXT];
    }
    return viewOrContainer;
}
