"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementRef = void 0;
exports.injectElementRef = injectElementRef;
exports.createElementRef = createElementRef;
exports.unwrapElementRef = unwrapElementRef;
const state_1 = require("../render3/state");
const view_utils_1 = require("../render3/util/view_utils");
/**
 * Creates an ElementRef from the most recent node.
 *
 * @returns The ElementRef instance to use
 */
function injectElementRef() {
    return createElementRef((0, state_1.getCurrentTNode)(), (0, state_1.getLView)());
}
/**
 * Creates an ElementRef given a node.
 *
 * @param tNode The node for which you'd like an ElementRef
 * @param lView The view to which the node belongs
 * @returns The ElementRef instance to use
 */
function createElementRef(tNode, lView) {
    return new ElementRef((0, view_utils_1.getNativeByTNode)(tNode, lView));
}
/**
 * A wrapper around a native element inside of a View.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * @security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](https://g.co/ng/security).
 *
 * @publicApi
 */
// Note: We don't expose things like `Injector`, `ViewContainer`, ... here,
// i.e. users have to ask for what they need. With that, we can build better analysis tools
// and could do better codegen in the future.
class ElementRef {
    constructor(nativeElement) {
        this.nativeElement = nativeElement;
    }
}
exports.ElementRef = ElementRef;
/**
 * @internal
 * @nocollapse
 */
ElementRef.__NG_ELEMENT_ID__ = injectElementRef;
/**
 * Unwraps `ElementRef` and return the `nativeElement`.
 *
 * @param value value to unwrap
 * @returns `nativeElement` if `ElementRef` otherwise returns value as is.
 */
function unwrapElementRef(value) {
    return value instanceof ElementRef ? value.nativeElement : value;
}
