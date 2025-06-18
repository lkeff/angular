"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripPrefix = stripPrefix;
exports.deepEqual = deepEqual;
exports.isAnchor = isAnchor;
function stripPrefix(val, prefix) {
    return val.startsWith(prefix) ? val.substring(prefix.length) : val;
}
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    else if (!a || !b) {
        return false;
    }
    else {
        try {
            if (a.prototype !== b.prototype || (Array.isArray(a) && Array.isArray(b))) {
                return false;
            }
            return JSON.stringify(a) === JSON.stringify(b);
        }
        catch (e) {
            return false;
        }
    }
}
function isAnchor(el) {
    return el.href !== undefined;
}
