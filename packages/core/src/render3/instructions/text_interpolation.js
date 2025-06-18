"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵtextInterpolate = ɵɵtextInterpolate;
exports.ɵɵtextInterpolate1 = ɵɵtextInterpolate1;
exports.ɵɵtextInterpolate2 = ɵɵtextInterpolate2;
exports.ɵɵtextInterpolate3 = ɵɵtextInterpolate3;
exports.ɵɵtextInterpolate4 = ɵɵtextInterpolate4;
exports.ɵɵtextInterpolate5 = ɵɵtextInterpolate5;
exports.ɵɵtextInterpolate6 = ɵɵtextInterpolate6;
exports.ɵɵtextInterpolate7 = ɵɵtextInterpolate7;
exports.ɵɵtextInterpolate8 = ɵɵtextInterpolate8;
exports.ɵɵtextInterpolateV = ɵɵtextInterpolateV;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const assert_1 = require("../../util/assert");
const view_1 = require("../interfaces/view");
const dom_node_manipulation_1 = require("../dom_node_manipulation");
const state_1 = require("../state");
const tokens_1 = require("../tokens");
const view_utils_1 = require("../util/view_utils");
const interpolation_1 = require("./interpolation");
/**
 *
 * Update text content with a lone bound value
 *
 * Used when a text node has 1 interpolated value in it, an no additional text
 * surrounds that interpolated value:
 *
 * ```html
 * <div>{{v0}}</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate(v0);
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate(v0) {
    ɵɵtextInterpolate1('', v0);
    return ɵɵtextInterpolate;
}
/**
 *
 * Update text content with single bound value surrounded by other text.
 *
 * Used when a text node has 1 interpolated value in it:
 *
 * ```html
 * <div>prefix{{v0}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate1('prefix', v0, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate1(prefix, v0, suffix) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolation1)(lView, prefix, v0, suffix);
    if (interpolated !== tokens_1.NO_CHANGE) {
        textBindingInternal(lView, (0, state_1.getSelectedIndex)(), interpolated);
    }
    return ɵɵtextInterpolate1;
}
/**
 *
 * Update text content with 2 bound values surrounded by other text.
 *
 * Used when a text node has 2 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate2('prefix', v0, '-', v1, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate2(prefix, v0, i0, v1, suffix) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolation2)(lView, prefix, v0, i0, v1, suffix);
    if (interpolated !== tokens_1.NO_CHANGE) {
        textBindingInternal(lView, (0, state_1.getSelectedIndex)(), interpolated);
    }
    return ɵɵtextInterpolate2;
}
/**
 *
 * Update text content with 3 bound values surrounded by other text.
 *
 * Used when a text node has 3 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate3(
 * 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate3(prefix, v0, i0, v1, i1, v2, suffix) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolation3)(lView, prefix, v0, i0, v1, i1, v2, suffix);
    if (interpolated !== tokens_1.NO_CHANGE) {
        textBindingInternal(lView, (0, state_1.getSelectedIndex)(), interpolated);
    }
    return ɵɵtextInterpolate3;
}
/**
 *
 * Update text content with 4 bound values surrounded by other text.
 *
 * Used when a text node has 4 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate4(
 * 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see ɵɵtextInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate4(prefix, v0, i0, v1, i1, v2, i2, v3, suffix) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolation4)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, suffix);
    if (interpolated !== tokens_1.NO_CHANGE) {
        textBindingInternal(lView, (0, state_1.getSelectedIndex)(), interpolated);
    }
    return ɵɵtextInterpolate4;
}
/**
 *
 * Update text content with 5 bound values surrounded by other text.
 *
 * Used when a text node has 5 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate5(
 * 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate5(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolation5)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix);
    if (interpolated !== tokens_1.NO_CHANGE) {
        textBindingInternal(lView, (0, state_1.getSelectedIndex)(), interpolated);
    }
    return ɵɵtextInterpolate5;
}
/**
 *
 * Update text content with 6 bound values surrounded by other text.
 *
 * Used when a text node has 6 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate6(
 *    'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change. @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate6(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolation6)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix);
    if (interpolated !== tokens_1.NO_CHANGE) {
        textBindingInternal(lView, (0, state_1.getSelectedIndex)(), interpolated);
    }
    return ɵɵtextInterpolate6;
}
/**
 *
 * Update text content with 7 bound values surrounded by other text.
 *
 * Used when a text node has 7 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate7(
 *    'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate7(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolation7)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix);
    if (interpolated !== tokens_1.NO_CHANGE) {
        textBindingInternal(lView, (0, state_1.getSelectedIndex)(), interpolated);
    }
    return ɵɵtextInterpolate7;
}
/**
 *
 * Update text content with 8 bound values surrounded by other text.
 *
 * Used when a text node has 8 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate8(
 *  'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
function ɵɵtextInterpolate8(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolation8)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix);
    if (interpolated !== tokens_1.NO_CHANGE) {
        textBindingInternal(lView, (0, state_1.getSelectedIndex)(), interpolated);
    }
    return ɵɵtextInterpolate8;
}
/**
 * Update text content with 9 or more bound values other surrounded by text.
 *
 * Used when the number of interpolated values exceeds 8.
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}-{{v8}}-{{v9}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolateV(
 *  ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *.
 * @param values The collection of values and the strings in between those values, beginning with
 * a string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 *
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵtextInterpolateV(values) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolationV)(lView, values);
    if (interpolated !== tokens_1.NO_CHANGE) {
        textBindingInternal(lView, (0, state_1.getSelectedIndex)(), interpolated);
    }
    return ɵɵtextInterpolateV;
}
/**
 * Updates a text binding at a given index in a given LView.
 */
function textBindingInternal(lView, index, value) {
    ngDevMode && (0, assert_1.assertString)(value, 'Value should be a string');
    ngDevMode && (0, assert_1.assertNotSame)(value, tokens_1.NO_CHANGE, 'value should not be NO_CHANGE');
    ngDevMode && (0, assert_1.assertIndexInRange)(lView, index);
    const element = (0, view_utils_1.getNativeByIndex)(index, lView);
    ngDevMode && (0, assert_1.assertDefined)(element, 'native element should exist');
    (0, dom_node_manipulation_1.updateTextNode)(lView[view_1.RENDERER], element, value);
}
