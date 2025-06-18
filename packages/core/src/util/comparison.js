"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.devModeEqual = devModeEqual;
const iterable_1 = require("./iterable");
function devModeEqual(a, b) {
    const isListLikeIterableA = (0, iterable_1.isListLikeIterable)(a);
    const isListLikeIterableB = (0, iterable_1.isListLikeIterable)(b);
    if (isListLikeIterableA && isListLikeIterableB) {
        return (0, iterable_1.areIterablesEqual)(a, b, devModeEqual);
    }
    else {
        const isAObject = a && (typeof a === 'object' || typeof a === 'function');
        const isBObject = b && (typeof b === 'object' || typeof b === 'function');
        if (!isListLikeIterableA && isAObject && !isListLikeIterableB && isBObject) {
            return true;
        }
        else {
            return Object.is(a, b);
        }
    }
}
