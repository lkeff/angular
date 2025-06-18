"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionContaining = functionContaining;
/**
 * Jasmine matcher to verify that a function contains the provided code fragments.
 */
function functionContaining(expectedFragments) {
    let _actual = null;
    const matches = (code, fragment) => {
        if (typeof fragment === 'string') {
            return code.includes(fragment);
        }
        else {
            return fragment.test(code);
        }
    };
    return {
        asymmetricMatch(actual) {
            _actual = actual;
            if (typeof actual !== 'function') {
                return false;
            }
            const code = actual.toString();
            for (const fragment of expectedFragments) {
                if (!matches(code, fragment)) {
                    return false;
                }
            }
            return true;
        },
        jasmineToString(pp) {
            if (typeof _actual !== 'function') {
                return `Expected function to contain code fragments ${pp(expectedFragments)} but got ${pp(_actual)}`;
            }
            const errors = [];
            const code = _actual.toString();
            errors.push(`The actual function with code:\n${code}\n\ndid not contain the following fragments:`);
            for (const fragment of expectedFragments) {
                if (!matches(code, fragment)) {
                    errors.push(`- ${fragment}`);
                }
            }
            return errors.join('\n');
        },
    };
}
