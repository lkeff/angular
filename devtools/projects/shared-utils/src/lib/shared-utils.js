"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayEquals = void 0;
// works with arrays of string, numbers and booleans
const arrayEquals = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }
    if (a.length === 0) {
        return b.length === 0;
    }
    let equal;
    for (let i = 0; i < a.length; i++) {
        equal = i === 0 ? a[i] === b[i] : a[i] === b[i] && equal;
        if (!equal) {
            break;
        }
    }
    return equal !== null && equal !== void 0 ? equal : false;
};
exports.arrayEquals = arrayEquals;
