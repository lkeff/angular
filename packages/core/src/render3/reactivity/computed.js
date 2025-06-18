"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.computed = computed;
const signals_1 = require("../../../primitives/signals");
/**
 * Create a computed `Signal` which derives a reactive value from an expression.
 */
function computed(computation, options) {
    const getter = (0, signals_1.createComputed)(computation, options === null || options === void 0 ? void 0 : options.equal);
    if (ngDevMode) {
        getter.toString = () => `[Computed: ${getter()}]`;
        getter[signals_1.SIGNAL].debugName = options === null || options === void 0 ? void 0 : options.debugName;
    }
    return getter;
}
