"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.markViewDirty = markViewDirty;
const type_checks_1 = require("../interfaces/type_checks");
const view_1 = require("../interfaces/view");
const state_1 = require("../state");
const view_utils_1 = require("../util/view_utils");
/**
 * Marks current view and all ancestors dirty.
 *
 * Returns the root view because it is found as a byproduct of marking the view tree
 * dirty, and can be used by methods that consume markViewDirty() to easily schedule
 * change detection. Otherwise, such methods would need to traverse up the view tree
 * an additional time to get the root view and schedule a tick on it.
 *
 * @param lView The starting LView to mark dirty
 * @returns the root LView
 */
function markViewDirty(lView, source) {
    var _a;
    const dirtyBitsToUse = (0, state_1.isRefreshingViews)()
        ? // When we are actively refreshing views, we only use the `Dirty` bit to mark a view
            64 /* LViewFlags.Dirty */
        : // When we are not actively refreshing a view tree, it is absolutely
            // valid to update state and mark views dirty. We use the `RefreshView` flag in this
            // case to allow synchronously rerunning change detection. This applies today to
            // afterRender hooks as well as animation listeners which execute after detecting
            // changes in a view when the render factory flushes.
            1024 /* LViewFlags.RefreshView */ | 64 /* LViewFlags.Dirty */;
    (_a = lView[view_1.ENVIRONMENT].changeDetectionScheduler) === null || _a === void 0 ? void 0 : _a.notify(source);
    while (lView) {
        lView[view_1.FLAGS] |= dirtyBitsToUse;
        const parent = (0, view_utils_1.getLViewParent)(lView);
        // Stop traversing up as soon as you find a root view that wasn't attached to any container
        if ((0, type_checks_1.isRootView)(lView) && !parent) {
            return lView;
        }
        // continue otherwise
        lView = parent;
    }
    return null;
}
