"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵattribute = ɵɵattribute;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const bindings_1 = require("../bindings");
const state_1 = require("../state");
const shared_1 = require("./shared");
/**
 * Updates the value of or removes a bound attribute on an Element.
 *
 * Used in the case of `[attr.title]="value"`
 *
 * @param name name The name of the attribute.
 * @param value value The attribute is removed when value is `null` or `undefined`.
 *                  Otherwise the attribute value is set to the stringified value.
 * @param sanitizer An optional function used to sanitize the value.
 * @param namespace Optional namespace to use when setting the attribute.
 *
 * @codeGenApi
 */
function ɵɵattribute(name, value, sanitizer, namespace) {
    const lView = (0, state_1.getLView)();
    const bindingIndex = (0, state_1.nextBindingIndex)();
    if ((0, bindings_1.bindingUpdated)(lView, bindingIndex, value)) {
        const tView = (0, state_1.getTView)();
        const tNode = (0, state_1.getSelectedTNode)();
        (0, shared_1.elementAttributeInternal)(tNode, lView, name, value, sanitizer, namespace);
        ngDevMode && (0, shared_1.storePropertyBindingMetadata)(tView.data, tNode, 'attr.' + name, bindingIndex);
    }
    return ɵɵattribute;
}
