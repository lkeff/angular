"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolationV = interpolationV;
exports.interpolation1 = interpolation1;
exports.interpolation2 = interpolation2;
exports.interpolation3 = interpolation3;
exports.interpolation4 = interpolation4;
exports.interpolation5 = interpolation5;
exports.interpolation6 = interpolation6;
exports.interpolation7 = interpolation7;
exports.interpolation8 = interpolation8;
const assert_1 = require("../../util/assert");
const bindings_1 = require("../bindings");
const state_1 = require("../state");
const tokens_1 = require("../tokens");
const stringify_utils_1 = require("../util/stringify_utils");
/**
 * Create interpolation bindings with a variable number of expressions.
 *
 * If there are 1 to 8 expressions `interpolation1()` to `interpolation8()` should be used instead.
 * Those are faster because there is no need to create an array of expressions and iterate over it.
 *
 * `values`:
 * - has static text at even indexes,
 * - has evaluated expressions at odd indexes.
 *
 * Returns the concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
function interpolationV(lView, values) {
    ngDevMode && (0, assert_1.assertLessThan)(2, values.length, 'should have at least 3 values');
    let isBindingUpdated = false;
    let bindingIndex = (0, state_1.getBindingIndex)();
    for (let i = 1; i < values.length; i += 2) {
        // Check if bindings (odd indexes) have changed
        isBindingUpdated = (0, bindings_1.bindingUpdated)(lView, bindingIndex++, values[i]) || isBindingUpdated;
    }
    (0, state_1.setBindingIndex)(bindingIndex);
    if (!isBindingUpdated) {
        return tokens_1.NO_CHANGE;
    }
    // Build the updated content
    let content = values[0];
    for (let i = 1; i < values.length; i += 2) {
        // The condition is to prevent an out-of-bound read
        content += (0, stringify_utils_1.renderStringify)(values[i]) + (i + 1 !== values.length ? values[i + 1] : '');
    }
    return content;
}
/**
 * Creates an interpolation binding with 1 expression.
 *
 * @param prefix static value used for concatenation only.
 * @param v0 value checked for change.
 * @param suffix static value used for concatenation only.
 */
function interpolation1(lView, prefix, v0, suffix = '') {
    const different = (0, bindings_1.bindingUpdated)(lView, (0, state_1.nextBindingIndex)(), v0);
    return different ? prefix + (0, stringify_utils_1.renderStringify)(v0) + suffix : tokens_1.NO_CHANGE;
}
/**
 * Creates an interpolation binding with 2 expressions.
 */
function interpolation2(lView, prefix, v0, i0, v1, suffix = '') {
    const bindingIndex = (0, state_1.getBindingIndex)();
    const different = (0, bindings_1.bindingUpdated2)(lView, bindingIndex, v0, v1);
    (0, state_1.incrementBindingIndex)(2);
    return different ? prefix + (0, stringify_utils_1.renderStringify)(v0) + i0 + (0, stringify_utils_1.renderStringify)(v1) + suffix : tokens_1.NO_CHANGE;
}
/**
 * Creates an interpolation binding with 3 expressions.
 */
function interpolation3(lView, prefix, v0, i0, v1, i1, v2, suffix = '') {
    const bindingIndex = (0, state_1.getBindingIndex)();
    const different = (0, bindings_1.bindingUpdated3)(lView, bindingIndex, v0, v1, v2);
    (0, state_1.incrementBindingIndex)(3);
    return different
        ? prefix + (0, stringify_utils_1.renderStringify)(v0) + i0 + (0, stringify_utils_1.renderStringify)(v1) + i1 + (0, stringify_utils_1.renderStringify)(v2) + suffix
        : tokens_1.NO_CHANGE;
}
/**
 * Create an interpolation binding with 4 expressions.
 */
function interpolation4(lView, prefix, v0, i0, v1, i1, v2, i2, v3, suffix = '') {
    const bindingIndex = (0, state_1.getBindingIndex)();
    const different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex, v0, v1, v2, v3);
    (0, state_1.incrementBindingIndex)(4);
    return different
        ? prefix +
            (0, stringify_utils_1.renderStringify)(v0) +
            i0 +
            (0, stringify_utils_1.renderStringify)(v1) +
            i1 +
            (0, stringify_utils_1.renderStringify)(v2) +
            i2 +
            (0, stringify_utils_1.renderStringify)(v3) +
            suffix
        : tokens_1.NO_CHANGE;
}
/**
 * Creates an interpolation binding with 5 expressions.
 */
function interpolation5(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix = '') {
    const bindingIndex = (0, state_1.getBindingIndex)();
    let different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex, v0, v1, v2, v3);
    different = (0, bindings_1.bindingUpdated)(lView, bindingIndex + 4, v4) || different;
    (0, state_1.incrementBindingIndex)(5);
    return different
        ? prefix +
            (0, stringify_utils_1.renderStringify)(v0) +
            i0 +
            (0, stringify_utils_1.renderStringify)(v1) +
            i1 +
            (0, stringify_utils_1.renderStringify)(v2) +
            i2 +
            (0, stringify_utils_1.renderStringify)(v3) +
            i3 +
            (0, stringify_utils_1.renderStringify)(v4) +
            suffix
        : tokens_1.NO_CHANGE;
}
/**
 * Creates an interpolation binding with 6 expressions.
 */
function interpolation6(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix = '') {
    const bindingIndex = (0, state_1.getBindingIndex)();
    let different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex, v0, v1, v2, v3);
    different = (0, bindings_1.bindingUpdated2)(lView, bindingIndex + 4, v4, v5) || different;
    (0, state_1.incrementBindingIndex)(6);
    return different
        ? prefix +
            (0, stringify_utils_1.renderStringify)(v0) +
            i0 +
            (0, stringify_utils_1.renderStringify)(v1) +
            i1 +
            (0, stringify_utils_1.renderStringify)(v2) +
            i2 +
            (0, stringify_utils_1.renderStringify)(v3) +
            i3 +
            (0, stringify_utils_1.renderStringify)(v4) +
            i4 +
            (0, stringify_utils_1.renderStringify)(v5) +
            suffix
        : tokens_1.NO_CHANGE;
}
/**
 * Creates an interpolation binding with 7 expressions.
 */
function interpolation7(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix = '') {
    const bindingIndex = (0, state_1.getBindingIndex)();
    let different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex, v0, v1, v2, v3);
    different = (0, bindings_1.bindingUpdated3)(lView, bindingIndex + 4, v4, v5, v6) || different;
    (0, state_1.incrementBindingIndex)(7);
    return different
        ? prefix +
            (0, stringify_utils_1.renderStringify)(v0) +
            i0 +
            (0, stringify_utils_1.renderStringify)(v1) +
            i1 +
            (0, stringify_utils_1.renderStringify)(v2) +
            i2 +
            (0, stringify_utils_1.renderStringify)(v3) +
            i3 +
            (0, stringify_utils_1.renderStringify)(v4) +
            i4 +
            (0, stringify_utils_1.renderStringify)(v5) +
            i5 +
            (0, stringify_utils_1.renderStringify)(v6) +
            suffix
        : tokens_1.NO_CHANGE;
}
/**
 * Creates an interpolation binding with 8 expressions.
 */
function interpolation8(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix = '') {
    const bindingIndex = (0, state_1.getBindingIndex)();
    let different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex, v0, v1, v2, v3);
    different = (0, bindings_1.bindingUpdated4)(lView, bindingIndex + 4, v4, v5, v6, v7) || different;
    (0, state_1.incrementBindingIndex)(8);
    return different
        ? prefix +
            (0, stringify_utils_1.renderStringify)(v0) +
            i0 +
            (0, stringify_utils_1.renderStringify)(v1) +
            i1 +
            (0, stringify_utils_1.renderStringify)(v2) +
            i2 +
            (0, stringify_utils_1.renderStringify)(v3) +
            i3 +
            (0, stringify_utils_1.renderStringify)(v4) +
            i4 +
            (0, stringify_utils_1.renderStringify)(v5) +
            i5 +
            (0, stringify_utils_1.renderStringify)(v6) +
            i6 +
            (0, stringify_utils_1.renderStringify)(v7) +
            suffix
        : tokens_1.NO_CHANGE;
}
