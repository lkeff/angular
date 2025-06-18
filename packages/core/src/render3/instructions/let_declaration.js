"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵdeclareLet = ɵɵdeclareLet;
exports.ɵɵstoreLet = ɵɵstoreLet;
exports.ɵɵreadContextLet = ɵɵreadContextLet;
const errors_1 = require("../../errors");
const performance_1 = require("../../util/performance");
const view_1 = require("../interfaces/view");
const state_1 = require("../state");
const tnode_manipulation_1 = require("../tnode_manipulation");
const view_utils_1 = require("../util/view_utils");
const storage_1 = require("./storage");
/** Object that indicates the value of a `@let` declaration that hasn't been initialized yet. */
const UNINITIALIZED_LET = {};
/**
 * Declares an `@let` at a specific data slot. Returns itself to allow chaining.
 *
 * @param index Index at which to declare the `@let`.
 *
 * @codeGenApi
 */
function ɵɵdeclareLet(index) {
    const tView = (0, state_1.getTView)();
    const lView = (0, state_1.getLView)();
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    const tNode = (0, tnode_manipulation_1.getOrCreateTNode)(tView, adjustedIndex, 128 /* TNodeType.LetDeclaration */, null, null);
    (0, state_1.setCurrentTNode)(tNode, false);
    (0, storage_1.store)(tView, lView, adjustedIndex, UNINITIALIZED_LET);
    return ɵɵdeclareLet;
}
/**
 * Instruction that stores the value of a `@let` declaration on the current view.
 * Returns the value to allow usage inside variable initializers.
 *
 * @codeGenApi
 */
function ɵɵstoreLet(value) {
    (0, performance_1.performanceMarkFeature)('NgLet');
    const tView = (0, state_1.getTView)();
    const lView = (0, state_1.getLView)();
    const index = (0, state_1.getSelectedIndex)();
    (0, storage_1.store)(tView, lView, index, value);
    return value;
}
/**
 * Retrieves the value of a `@let` declaration defined in a parent view.
 *
 * @param index Index of the declaration within the view.
 *
 * @codeGenApi
 */
function ɵɵreadContextLet(index) {
    const contextLView = (0, state_1.getContextLView)();
    const value = (0, view_utils_1.load)(contextLView, view_1.HEADER_OFFSET + index);
    if (value === UNINITIALIZED_LET) {
        throw new errors_1.RuntimeError(314 /* RuntimeErrorCode.UNINITIALIZED_LET_ACCESS */, ngDevMode && 'Attempting to access a @let declaration whose value is not available yet');
    }
    return value;
}
