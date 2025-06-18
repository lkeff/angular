"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBinding = updateBinding;
exports.getBinding = getBinding;
exports.bindingUpdated = bindingUpdated;
exports.bindingUpdated2 = bindingUpdated2;
exports.bindingUpdated3 = bindingUpdated3;
exports.bindingUpdated4 = bindingUpdated4;
const assert_1 = require("../util/assert");
const comparison_1 = require("../util/comparison");
const errors_1 = require("./errors");
const state_1 = require("./state");
const tokens_1 = require("./tokens");
// TODO(misko): consider inlining
/** Updates binding and returns the value. */
function updateBinding(lView, bindingIndex, value) {
    return (lView[bindingIndex] = value);
}
/** Gets the current binding value. */
function getBinding(lView, bindingIndex) {
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, bindingIndex);
    ngDevMode &&
        (0, assert_1.assertNotSame)(lView[bindingIndex], tokens_1.NO_CHANGE, 'Stored value should never be NO_CHANGE.');
    return lView[bindingIndex];
}
/**
 * Updates binding if changed, then returns whether it was updated.
 *
 * This function also checks the `CheckNoChangesMode` and throws if changes are made.
 * Some changes (Objects/iterables) during `CheckNoChangesMode` are exempt to comply with VE
 * behavior.
 *
 * @param lView current `LView`
 * @param bindingIndex The binding in the `LView` to check
 * @param value New value to check against `lView[bindingIndex]`
 * @returns `true` if the bindings has changed. (Throws if binding has changed during
 *          `CheckNoChangesMode`)
 */
function bindingUpdated(lView, bindingIndex, value) {
    ngDevMode && (0, assert_1.assertNotSame)(value, tokens_1.NO_CHANGE, 'Incoming value should never be NO_CHANGE.');
    ngDevMode &&
        (0, assert_1.assertLessThan)(bindingIndex, lView.length, `Slot should have been initialized to NO_CHANGE`);
    const oldValue = lView[bindingIndex];
    if (Object.is(oldValue, value)) {
        return false;
    }
    else {
        if (ngDevMode && (0, state_1.isInCheckNoChangesMode)()) {
            // View engine didn't report undefined values as changed on the first checkNoChanges pass
            // (before the change detection was run).
            const oldValueToCompare = oldValue !== tokens_1.NO_CHANGE ? oldValue : undefined;
            if (!(0, comparison_1.devModeEqual)(oldValueToCompare, value)) {
                const details = (0, errors_1.getExpressionChangedErrorDetails)(lView, bindingIndex, oldValueToCompare, value);
                (0, errors_1.throwErrorIfNoChangesMode)(oldValue === tokens_1.NO_CHANGE, details.oldValue, details.newValue, details.propName, lView);
            }
            // There was a change, but the `devModeEqual` decided that the change is exempt from an error.
            // For this reason we exit as if no change. The early exit is needed to prevent the changed
            // value to be written into `LView` (If we would write the new value that we would not see it
            // as change on next CD.)
            return false;
        }
        lView[bindingIndex] = value;
        return true;
    }
}
/** Updates 2 bindings if changed, then returns whether either was updated. */
function bindingUpdated2(lView, bindingIndex, exp1, exp2) {
    const different = bindingUpdated(lView, bindingIndex, exp1);
    return bindingUpdated(lView, bindingIndex + 1, exp2) || different;
}
/** Updates 3 bindings if changed, then returns whether any was updated. */
function bindingUpdated3(lView, bindingIndex, exp1, exp2, exp3) {
    const different = bindingUpdated2(lView, bindingIndex, exp1, exp2);
    return bindingUpdated(lView, bindingIndex + 2, exp3) || different;
}
/** Updates 4 bindings if changed, then returns whether any was updated. */
function bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4) {
    const different = bindingUpdated2(lView, bindingIndex, exp1, exp2);
    return bindingUpdated2(lView, bindingIndex + 2, exp3, exp4) || different;
}
