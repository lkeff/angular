"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntheticValue = void 0;
/**
 * A value produced which originated in a `ForeignFunctionResolver` and doesn't come from the
 * template itself.
 *
 * Synthetic values cannot be further evaluated, and attempts to do so produce `DynamicValue`s
 * instead.
 */
class SyntheticValue {
    constructor(value) {
        this.value = value;
    }
}
exports.SyntheticValue = SyntheticValue;
