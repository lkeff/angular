"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dedent = dedent;
exports.matchDebug = matchDebug;
exports.buildFailureMessage = buildFailureMessage;
/** Template string function that can be used to strip indentation from a given string literal. */
function dedent(strings, ...values) {
    let joinedString = '';
    for (let i = 0; i < values.length; i++) {
        joinedString += `${strings[i]}${values[i]}`;
    }
    joinedString += strings[strings.length - 1];
    const lines = joinedString.split('\n');
    while (isBlank(lines[0])) {
        lines.shift();
    }
    while (isBlank(lines[lines.length - 1])) {
        lines.pop();
    }
    let minWhitespacePrefix = lines.reduce((min, line) => Math.min(min, numOfWhiteSpaceLeadingChars(line)), Number.MAX_SAFE_INTEGER);
    return lines.map((line) => line.substring(minWhitespacePrefix)).join('\n');
}
/**
 * Tests to see if the line is blank.
 *
 * A blank line is such which contains only whitespace.
 * @param text string to test for blank-ness.
 */
function isBlank(text) {
    return /^\s*$/.test(text);
}
/**
 * Returns number of whitespace leading characters.
 *
 * @param text
 */
function numOfWhiteSpaceLeadingChars(text) {
    return text.match(/^\s*/)[0].length;
}
/**
 * Jasmine AsymmetricMatcher which can be used to assert `.debug` properties.
 *
 * ```ts
 * expect(obj).toEqual({
 *   create: matchDebug('someValue')
 * })
 * ```
 *
 * In the above example it will assert that `obj.create.debug === 'someValue'`.
 *
 * @param expected Expected value.
 */
function matchDebug(expected) {
    const matcher = function () { };
    let actual = matchDebug;
    matcher.asymmetricMatch = function (objectWithDebug, matchersUtil) {
        return matchersUtil.equals((actual = objectWithDebug.debug), expected);
    };
    matcher.jasmineToString = function (pp) {
        if (actual === matchDebug) {
            // `asymmetricMatch` never got called hence no error to display
            return '';
        }
        return buildFailureMessage(actual, expected, pp);
    };
    return matcher;
}
function buildFailureMessage(actual, expected, pp) {
    const diffs = [];
    listPropertyDifferences(diffs, '', actual, expected, 5, pp);
    return '\n  ' + diffs.join('\n  ');
}
function listPropertyDifferences(diffs, path, actual, expected, depth, pp) {
    if (actual === expected)
        return;
    if (typeof actual !== typeof expected) {
        diffs.push(`${path}: Expected ${pp(actual)} to be ${pp(expected)}`);
    }
    else if (depth && Array.isArray(expected)) {
        if (!Array.isArray(actual)) {
            diffs.push(`${path}: Expected ${pp(expected)} but was ${pp(actual)}`);
        }
        else {
            const maxLength = Math.max(actual.length, expected.length);
            listPropertyDifferences(diffs, path + '.length', expected.length, actual.length, depth - 1, pp);
            for (let i = 0; i < maxLength; i++) {
                const actualItem = actual[i];
                const expectedItem = expected[i];
                listPropertyDifferences(diffs, path + '[' + i + ']', actualItem, expectedItem, depth - 1, pp);
            }
        }
    }
    else if (depth &&
        expected &&
        typeof expected === 'object' &&
        actual &&
        typeof actual === 'object') {
        new Set(Object.keys(expected).concat(Object.keys(actual))).forEach((key) => {
            const actualItem = actual[key];
            const expectedItem = expected[key];
            listPropertyDifferences(diffs, path + '.' + key, actualItem, expectedItem, depth - 1, pp);
        });
    }
    else {
        diffs.push(`${path}: Expected ${pp(actual)} to be ${pp(expected)}`);
    }
}
