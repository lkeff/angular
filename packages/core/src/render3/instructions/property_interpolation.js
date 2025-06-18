"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵpropertyInterpolate = ɵɵpropertyInterpolate;
exports.ɵɵpropertyInterpolate1 = ɵɵpropertyInterpolate1;
exports.ɵɵpropertyInterpolate2 = ɵɵpropertyInterpolate2;
exports.ɵɵpropertyInterpolate3 = ɵɵpropertyInterpolate3;
exports.ɵɵpropertyInterpolate4 = ɵɵpropertyInterpolate4;
exports.ɵɵpropertyInterpolate5 = ɵɵpropertyInterpolate5;
exports.ɵɵpropertyInterpolate6 = ɵɵpropertyInterpolate6;
exports.ɵɵpropertyInterpolate7 = ɵɵpropertyInterpolate7;
exports.ɵɵpropertyInterpolate8 = ɵɵpropertyInterpolate8;
exports.ɵɵpropertyInterpolateV = ɵɵpropertyInterpolateV;
const view_1 = require("../interfaces/view");
const state_1 = require("../state");
const tokens_1 = require("../tokens");
const interpolation_1 = require("./interpolation");
const shared_1 = require("./shared");
/**
 *
 * Update an interpolated property on an element with a lone bound value
 *
 * Used when the value passed to a property has 1 interpolated value in it, an no additional text
 * surrounds that interpolated value:
 *
 * ```html
 * <div title="{{v0}}"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate('title', v0);
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵpropertyInterpolate(propName, v0, sanitizer) {
    ɵɵpropertyInterpolate1(propName, '', v0, '', sanitizer);
    return ɵɵpropertyInterpolate;
}
/**
 *
 * Update an interpolated property on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div title="prefix{{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate1('title', 'prefix', v0, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵpropertyInterpolate1(propName, prefix, v0, suffix, sanitizer) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation1)(lView, prefix, v0, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, interpolatedValue, lView[view_1.RENDERER], sanitizer);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, (0, state_1.getBindingIndex)() - 1, prefix, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵpropertyInterpolate1;
}
/**
 *
 * Update an interpolated property on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate2('title', 'prefix', v0, '-', v1, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵpropertyInterpolate2(propName, prefix, v0, i0, v1, suffix, sanitizer) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation2)(lView, prefix, v0, i0, v1, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, interpolatedValue, lView[view_1.RENDERER], sanitizer);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, (0, state_1.getBindingIndex)() - 2, prefix, i0, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵpropertyInterpolate2;
}
/**
 *
 * Update an interpolated property on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate3(
 * 'title', 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
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
function ɵɵpropertyInterpolate3(propName, prefix, v0, i0, v1, i1, v2, suffix, sanitizer) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation3)(lView, prefix, v0, i0, v1, i1, v2, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, interpolatedValue, lView[view_1.RENDERER], sanitizer);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, (0, state_1.getBindingIndex)() - 3, prefix, i0, i1, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵpropertyInterpolate3;
}
/**
 *
 * Update an interpolated property on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate4(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
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
function ɵɵpropertyInterpolate4(propName, prefix, v0, i0, v1, i1, v2, i2, v3, suffix, sanitizer) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation4)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, interpolatedValue, lView[view_1.RENDERER], sanitizer);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, (0, state_1.getBindingIndex)() - 4, prefix, i0, i1, i2, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵpropertyInterpolate4;
}
/**
 *
 * Update an interpolated property on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate5(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
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
function ɵɵpropertyInterpolate5(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix, sanitizer) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation5)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, interpolatedValue, lView[view_1.RENDERER], sanitizer);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, (0, state_1.getBindingIndex)() - 5, prefix, i0, i1, i2, i3, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵpropertyInterpolate5;
}
/**
 *
 * Update an interpolated property on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate6(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
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
function ɵɵpropertyInterpolate6(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix, sanitizer) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation6)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, interpolatedValue, lView[view_1.RENDERER], sanitizer);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, (0, state_1.getBindingIndex)() - 6, prefix, i0, i1, i2, i3, i4, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵpropertyInterpolate6;
}
/**
 *
 * Update an interpolated property on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate7(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
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
function ɵɵpropertyInterpolate7(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix, sanitizer) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation7)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, interpolatedValue, lView[view_1.RENDERER], sanitizer);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, (0, state_1.getBindingIndex)() - 7, prefix, i0, i1, i2, i3, i4, i5, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵpropertyInterpolate7;
}
/**
 *
 * Update an interpolated property on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate8(
 *  'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
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
function ɵɵpropertyInterpolate8(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix, sanitizer) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolation8)(lView, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, interpolatedValue, lView[view_1.RENDERER], sanitizer);
        ngDevMode &&
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, (0, state_1.getBindingIndex)() - 8, prefix, i0, i1, i2, i3, i4, i5, i6, suffix !== null && suffix !== void 0 ? suffix : '');
    }
    return ɵɵpropertyInterpolate8;
}
/**
 * Update an interpolated property on an element with 9 or more bound values surrounded by text.
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
 * ɵɵpropertyInterpolateV(
 *  'title', ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update.
 * @param values The collection of values and the strings in between those values, beginning with a
 * string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
function ɵɵpropertyInterpolateV(propName, values, sanitizer) {
    const lView = (0, state_1.getLView)();
    const interpolatedValue = (0, interpolation_1.interpolationV)(lView, values);
    if (interpolatedValue !== tokens_1.NO_CHANGE) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, interpolatedValue, lView[view_1.RENDERER], sanitizer);
        if (ngDevMode) {
            const interpolationInBetween = [values[0]]; // prefix
            for (let i = 2; i < values.length; i += 2) {
                interpolationInBetween.push(values[i]);
            }
            (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, (0, state_1.getBindingIndex)() - interpolationInBetween.length + 1, ...interpolationInBetween);
        }
    }
    return ɵɵpropertyInterpolateV;
}
