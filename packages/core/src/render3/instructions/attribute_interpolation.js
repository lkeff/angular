"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵattributeInterpolate1 = ɵɵattributeInterpolate1;
exports.ɵɵattributeInterpolate2 = ɵɵattributeInterpolate2;
exports.ɵɵattributeInterpolate3 = ɵɵattributeInterpolate3;
exports.ɵɵattributeInterpolate4 = ɵɵattributeInterpolate4;
exports.ɵɵattributeInterpolate5 = ɵɵattributeInterpolate5;
exports.ɵɵattributeInterpolate6 = ɵɵattributeInterpolate6;
exports.ɵɵattributeInterpolate7 = ɵɵattributeInterpolate7;
exports.ɵɵattributeInterpolate8 = ɵɵattributeInterpolate8;
exports.ɵɵattributeInterpolateV = ɵɵattributeInterpolateV;
const state_1 = require("../state");
const tokens_1 = require("../tokens");
const interpolation_1 = require("./interpolation");
const shared_1 = require("./shared");
/**
 *
 * Update an interpolated attribute on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate1('title', 'prefix', v0, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵattributeInterpolate1(attrName, prefix, v0, suffix, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation1)(lView, prefix, v0, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)((0, state_1.getTView)().data, tNode, 'attr.' + attrName, (0, state_1.getBindingIndex)() - 1, prefix, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵattributeInterpolate1;
}
/**
 *
 * Update an interpolated attribute on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate2('title', 'prefix', v0, '-', v1, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵattributeInterpolate2(attrName, prefix, v0, i0, v1, suffix, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation2)(lView, prefix, v0, i0, v1, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)((0, state_1.getTView)().data, tNode, 'attr.' + attrName, (0, state_1.getBindingIndex)() - 2, prefix, i0, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵattributeInterpolate2;
}
/**
 *
 * Update an interpolated attribute on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate3(
 * 'title', 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵattributeInterpolate3(attrName, prefix, v0, i0, v1, i1, v2, suffix, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation3)(lView, prefix, v0, i0, v1, i1, v2, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)((0, state_1.getTView)().data, tNode, 'attr.' + attrName, (0, state_1.getBindingIndex)() - 3, prefix, i0, i1, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵattributeInterpolate3;
}
/**
 *
 * Update an interpolated attribute on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate4(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵattributeInterpolate4(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, suffix, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation4)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)((0, state_1.getTView)().data, tNode, 'attr.' + attrName, (0, state_1.getBindingIndex)() - 4, prefix, i0, i1, i2, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵattributeInterpolate4;
}
/**
 *
 * Update an interpolated attribute on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate5(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵattributeInterpolate5(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation5)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)((0, state_1.getTView)().data, tNode, 'attr.' + attrName, (0, state_1.getBindingIndex)() - 5, prefix, i0, i1, i2, i3, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵattributeInterpolate5;
}
/**
 *
 * Update an interpolated attribute on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate6(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵattributeInterpolate6(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation6)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)((0, state_1.getTView)().data, tNode, 'attr.' + attrName, (0, state_1.getBindingIndex)() - 6, prefix, i0, i1, i2, i3, i4, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵattributeInterpolate6;
}
/**
 *
 * Update an interpolated attribute on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate7(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵattributeInterpolate7(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation7)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)((0, state_1.getTView)().data, tNode, 'attr.' + attrName, (0, state_1.getBindingIndex)() - 7, prefix, i0, i1, i2, i3, i4, i5, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵattributeInterpolate7;
}
/**
 *
 * Update an interpolated attribute on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate8(
 *  'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param i6 Static value used for concatenation only.
 * @param v7 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵattributeInterpolate8(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation8)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, attrName, interpolatedValue, sanitizer, namespace);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)((0, state_1.getTView)().data, tNode, 'attr.' + attrName, (0, state_1.getBindingIndex)() - 8, prefix, i0, i1, i2, i3, i4, i5, i6, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵattributeInterpolate8;
}
/**
 * Update an interpolated attribute on an element with 9 or more bound values surrounded by text.
 *
 * Used when the number of interpolated values exceeds 8.
 *
 * ```html
 * <div
 *  title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}-{{v8}}-{{v9}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolateV(
 *  'title', ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *
 * @param attrName The name of the attribute to update.
 * @param values The collection of values and the strings in-between those values, beginning with
 * a string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵattributeInterpolateV(attrName, values, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const interpolated = (0, interpolation_1.interpolationV)(lView, values);
    if (interpolated !== tokens_1.NO_CHANGE) {
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, attrName, interpolated, sanitizer, namespace);
        if (ngDevMode) {
            const interpolationInBetween = [values[0]]; // prefix
            for (let i = 2; i < values.length; i += 2) {
                interpolationInBetween.push(values[i]);
            }
            (0, shared_1.storePropertyBindingMetadata)((0, state_1.getTView)().data, tNode, 'attr.' + attrName, (0, state_1.getBindingIndex)() - interpolationInBetween.length + 1, ...interpolationInBetween);
        }
    }
    return ɵɵattributeInterpolateV;
}
