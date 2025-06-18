"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestIterable = void 0;
class TestIterable {
    constructor() {
        this.list = [];
    }
    [Symbol.iterator]() {
        return this.list[Symbol.iterator]();
    }
}
exports.TestIterable = TestIterable;
