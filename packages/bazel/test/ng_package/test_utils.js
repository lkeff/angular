"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesObjectWithOrder = matchesObjectWithOrder;
/**
 * Jasmine asymmetric matcher that compares a given object ensuring that it matches deep
 * with the other while also respecting the order of keys. This is useful when comparing
 * the NodeJS `package.json` `exports` field where order matters.
 */
function matchesObjectWithOrder(expected) {
    return {
        asymmetricMatch(actual) {
            // Use JSON stringify to compare the object with respect to the order of keys
            // in the object, and its nested objects.
            return JSON.stringify(actual) === JSON.stringify(expected);
        },
        jasmineToString(prettyPrint) {
            return prettyPrint(expected);
        },
    };
}
