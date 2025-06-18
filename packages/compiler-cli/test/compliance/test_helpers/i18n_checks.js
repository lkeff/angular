"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPlaceholdersIntegrity = verifyPlaceholdersIntegrity;
exports.verifyUniqueConsts = verifyUniqueConsts;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const EXTRACT_GENERATED_TRANSLATIONS_REGEXP = /const\s*(.*?)\s*=\s*goog\.getMsg\("(.*?)",?\s*(.*?)\)/g;
/**
 * Verify that placeholders in translation strings match placeholders in the object defined in the
 * `goog.getMsg()` function arguments.
 */
function verifyPlaceholdersIntegrity(output) {
    const translations = extractTranslations(output);
    for (const [msg, args] of translations) {
        const bodyPhs = extractPlaceholdersFromMsg(msg);
        const argsPhs = extractPlaceholdersFromArgs(args);
        if (bodyPhs.size !== argsPhs.size || diff(bodyPhs, argsPhs).size) {
            return false;
        }
    }
    return true;
}
/**
 * Verify that all the variables initialized with `goog.getMsg()` calls have
 * unique names.
 */
function verifyUniqueConsts(output) {
    extract(output, EXTRACT_GENERATED_TRANSLATIONS_REGEXP, (current, state) => {
        const key = current[1];
        if (state.has(key)) {
            throw new Error(`Duplicate const ${key} found in generated output!`);
        }
        return key;
    });
    return true;
}
/**
 * Extract pairs of `[msg, placeholders]`, in calls to `goog.getMsg()`, from the `source`.
 *
 * @param source The source code to parse.
 */
function extractTranslations(source) {
    return extract(source, EXTRACT_GENERATED_TRANSLATIONS_REGEXP, ([, , msg, placeholders]) => [
        msg,
        placeholders,
    ]);
}
/**
 * Extract placeholder names (of the form `{$PLACEHOLDER}`) from the `msg`.
 *
 * @param msg The text of the message to parse.
 */
function extractPlaceholdersFromMsg(msg) {
    const regex = /{\$(.*?)}/g;
    return extract(msg, regex, ([, placeholders]) => placeholders);
}
/**
 * Extract the placeholder names (of the form `"PLACEHOLDER": "XXX"`) from the body of the argument
 * provided as `args`.
 *
 * @param args The body of an object literal containing placeholder info.
 */
function extractPlaceholdersFromArgs(args) {
    const regex = /\s+"(.+?)":\s/g;
    return extract(args, regex, ([, placeholders]) => placeholders);
}
function extract(from, regex, transformFn) {
    const result = new Set();
    let item;
    while ((item = regex.exec(from)) !== null) {
        result.add(transformFn(item, result));
    }
    return result;
}
function diff(a, b) {
    return new Set(Array.from(a).filter((x) => !b.has(x)));
}
