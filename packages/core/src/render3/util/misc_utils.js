"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERPOLATION_DELIMITER = void 0;
exports.ɵɵresolveWindow = ɵɵresolveWindow;
exports.ɵɵresolveDocument = ɵɵresolveDocument;
exports.ɵɵresolveBody = ɵɵresolveBody;
exports.maybeUnwrapFn = maybeUnwrapFn;
/**
 *
 * @codeGenApi
 */
function ɵɵresolveWindow(element) {
    return element.ownerDocument.defaultView;
}
/**
 *
 * @codeGenApi
 */
function ɵɵresolveDocument(element) {
    return element.ownerDocument;
}
/**
 *
 * @codeGenApi
 */
function ɵɵresolveBody(element) {
    return element.ownerDocument.body;
}
/**
 * The special delimiter we use to separate property names, prefixes, and suffixes
 * in property binding metadata. See storeBindingMetadata().
 *
 * We intentionally use the Unicode "REPLACEMENT CHARACTER" (U+FFFD) as a delimiter
 * because it is a very uncommon character that is unlikely to be part of a user's
 * property names or interpolation strings. If it is in fact used in a property
 * binding, DebugElement.properties will not return the correct value for that
 * binding. However, there should be no runtime effect for real applications.
 *
 * This character is typically rendered as a question mark inside of a diamond.
 * See https://en.wikipedia.org/wiki/Specials_(Unicode_block)
 *
 */
exports.INTERPOLATION_DELIMITER = `�`;
/**
 * Unwrap a value which might be behind a closure (for forward declaration reasons).
 */
function maybeUnwrapFn(value) {
    if (value instanceof Function) {
        return value();
    }
    else {
        return value;
    }
}
