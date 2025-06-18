"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
/**
 * An error returned in rejected promises if the given key is not found in the table.
 */
class NotFound {
    constructor(table, key) {
        this.table = table;
        this.key = key;
    }
}
exports.NotFound = NotFound;
