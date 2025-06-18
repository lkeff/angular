"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = store;
exports.ɵɵreference = ɵɵreference;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const view_1 = require("../interfaces/view");
const state_1 = require("../state");
const view_utils_1 = require("../util/view_utils");
/** Store a value in the `data` at a given `index`. */
function store(tView, lView, index, value) {
    // We don't store any static data for local variables, so the first time
    // we see the template, we should store as null to avoid a sparse array
    if (index >= tView.data.length) {
        tView.data[index] = null;
        tView.blueprint[index] = null;
    }
    lView[index] = value;
}
/**
 * Retrieves a local reference from the current contextViewData.
 *
 * If the reference to retrieve is in a parent view, this instruction is used in conjunction
 * with a nextContext() call, which walks up the tree and updates the contextViewData instance.
 *
 * @param index The index of the local ref in contextViewData.
 *
 * @codeGenApi
 */
function ɵɵreference(index) {
    const contextLView = (0, state_1.getContextLView)();
    return (0, view_utils_1.load)(contextLView, view_1.HEADER_OFFSET + index);
}
