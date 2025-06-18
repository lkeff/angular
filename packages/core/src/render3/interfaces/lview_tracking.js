"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueLViewId = getUniqueLViewId;
exports.registerLView = registerLView;
exports.getLViewById = getLViewById;
exports.unregisterLView = unregisterLView;
exports.getTrackedLViews = getTrackedLViews;
const assert_1 = require("../../util/assert");
const view_1 = require("./view");
// Keeps track of the currently-active LViews.
const TRACKED_LVIEWS = new Map();
// Used for generating unique IDs for LViews.
let uniqueIdCounter = 0;
/** Gets a unique ID that can be assigned to an LView. */
function getUniqueLViewId() {
    return uniqueIdCounter++;
}
/** Starts tracking an LView. */
function registerLView(lView) {
    ngDevMode && (0, assert_1.assertNumber)(lView[view_1.ID], 'LView must have an ID in order to be registered');
    TRACKED_LVIEWS.set(lView[view_1.ID], lView);
}
/** Gets an LView by its unique ID. */
function getLViewById(id) {
    ngDevMode && (0, assert_1.assertNumber)(id, 'ID used for LView lookup must be a number');
    return TRACKED_LVIEWS.get(id) || null;
}
/** Stops tracking an LView. */
function unregisterLView(lView) {
    ngDevMode && (0, assert_1.assertNumber)(lView[view_1.ID], 'Cannot stop tracking an LView that does not have an ID');
    TRACKED_LVIEWS.delete(lView[view_1.ID]);
}
/** Gets the currently-tracked views. */
function getTrackedLViews() {
    return TRACKED_LVIEWS;
}
