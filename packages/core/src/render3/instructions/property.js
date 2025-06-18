"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵproperty = ɵɵproperty;
exports.setDirectiveInputsWhichShadowsStyling = setDirectiveInputsWhichShadowsStyling;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const bindings_1 = require("../bindings");
const view_1 = require("../interfaces/view");
const state_1 = require("../state");
const shared_1 = require("./shared");
/**
 * Update a property on a selected element.
 *
 * Operates on the element selected by index via the {@link select} instruction.
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled
 *
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @returns This function returns itself so that it may be chained
 * (e.g. `property('name', ctx.name)('title', ctx.title)`)
 *
 * @codeGenApi
 */
function ɵɵproperty(propName, value, sanitizer) {
    const lView = (0, state_1.getLView)();
    const bindingIndex = (0, state_1.nextBindingIndex)();
    if ((0, bindings_1.bindingUpdated)(lView, bindingIndex, value)) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setPropertyAndInputs)(tNode, lView, propName, value, lView[view_1.RENDERER], sanitizer);
        ngDevMode && (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, bindingIndex);
    }
    return ɵɵproperty;
}
/**
 * Given `<div style="..." my-dir>` and `MyDir` with `@Input('style')` we need to write to
 * directive input.
 */
function setDirectiveInputsWhichShadowsStyling(tView, tNode, lView, value, isClassBased) {
    // We support both 'class' and `className` hence the fallback.
    (0, shared_1.setAllInputsForProperty)(tNode, tView, lView, isClassBased ? 'class' : 'style', value);
}
