"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵdomProperty = ɵɵdomProperty;
exports.ɵɵsyntheticHostProperty = ɵɵsyntheticHostProperty;
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
 * Update a DOM property on an element.
 *
 * @param propName Name of property..
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @returns This function returns itself so that it may be chained
 *  (e.g. `domProperty('name', ctx.name)('title', ctx.title)`)
 *
 * @codeGenApi
 */
function ɵɵdomProperty(propName, value, sanitizer) {
    const lView = (0, state_1.getLView)();
    const bindingIndex = (0, state_1.nextBindingIndex)();
    if ((0, bindings_1.bindingUpdated)(lView, bindingIndex, value)) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.setDomProperty)(tNode, lView, propName, value, lView[view_1.RENDERER], sanitizer);
        ngDevMode && (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, bindingIndex);
    }
    return ɵɵdomProperty;
}
// TODO(crisbeto): try to fold this into `domProperty`. Main difference is the renderer.
/**
 * Updates a synthetic host binding (e.g. `[@foo]`) on a component or directive.
 *
 * This instruction is for compatibility purposes and is designed to ensure that a
 * synthetic host binding (e.g. `@HostBinding('@foo')`) properly gets rendered in
 * the component's renderer. Normally all host bindings are evaluated with the parent
 * component's renderer, but, in the case of animation @triggers, they need to be
 * evaluated with the sub component's renderer (because that's where the animation
 * triggers are defined).
 *
 * Do not use this instruction as a replacement for `elementProperty`. This instruction
 * only exists to ensure compatibility with the ViewEngine's host binding behavior.
 *
 * @param index The index of the element to update in the data array
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 *
 * @codeGenApi
 */
function ɵɵsyntheticHostProperty(propName, value, sanitizer) {
    const lView = (0, state_1.getLView)();
    const bindingIndex = (0, state_1.nextBindingIndex)();
    if ((0, bindings_1.bindingUpdated)(lView, bindingIndex, value)) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        const currentDef = (0, state_1.getCurrentDirectiveDef)(tView.data);
        const renderer = (0, shared_1.loadComponentRenderer)(currentDef, tNode, lView);
        (0, shared_1.setDomProperty)(tNode, lView, propName, value, renderer, sanitizer);
        ngDevMode && (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, propName, bindingIndex);
    }
    return ɵɵsyntheticHostProperty;
}
