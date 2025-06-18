"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultEquals = defaultEquals;
/**
 * The default equality function used for `signal` and `computed`, which uses referential equality.
 */
function defaultEquals(a, b) {
    return Object.is(a, b);
}
