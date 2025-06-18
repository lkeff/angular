"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.classIndexOf = classIndexOf;
const assert_1 = require("../../util/assert");
/**
 * Returns an index of `classToSearch` in `className` taking token boundaries into account.
 *
 * `classIndexOf('AB A', 'A', 0)` will be 3 (not 0 since `AB!==A`)
 *
 * @param className A string containing classes (whitespace separated)
 * @param classToSearch A class name to locate
 * @param startingIndex Starting location of search
 * @returns an index of the located class (or -1 if not found)
 */
function classIndexOf(className, classToSearch, startingIndex) {
    ngDevMode && (0, assert_1.assertNotEqual)(classToSearch, '', 'can not look for "" string.');
    let end = className.length;
    while (true) {
        const foundIndex = className.indexOf(classToSearch, startingIndex);
        if (foundIndex === -1)
            return foundIndex;
        if (foundIndex === 0 || className.charCodeAt(foundIndex - 1) <= 32 /* CharCode.SPACE */) {
            // Ensure that it has leading whitespace
            const length = classToSearch.length;
            if (foundIndex + length === end ||
                className.charCodeAt(foundIndex + length) <= 32 /* CharCode.SPACE */) {
                // Ensure that it has trailing whitespace
                return foundIndex;
            }
        }
        // False positive, keep searching from where we left off.
        startingIndex = foundIndex + 1;
    }
}
