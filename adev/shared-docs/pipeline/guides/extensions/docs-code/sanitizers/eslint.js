"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEslintComments = removeEslintComments;
/**
 * Remove any ESLint comments from the provided code string. This is particularly useful as we may
 * want to store code formatted for an example that would not be allowed in our repo. For instance,
 * we can disable ESLint to allow for a `console` usage, despite not allowing it typically, so that
 * it can be used in an example in documenation.
 */
function removeEslintComments(input, fileType) {
    if (!input || (fileType !== 'ts' && fileType !== 'js' && fileType !== 'html')) {
        return input;
    }
    return input.replace(regexesForFileTypes[fileType], '');
}
const jsRegexes = [
    /\/\/ *eslint-disable(?:-next-line)?(?: .*)?(?:\n *|$)/,
    /\n? *\/\/ *eslint-(?:disable-line|enable)(?: .*)?(?=\n|$)/,
    /\/\*\s*eslint-disable(?:-next-line)?(?: [\s\S]*?)?\*\/ *(?:\n *)?/,
    /\n? *\/\*\s*eslint-(?:disable-line|enable)(?: [\s\S]*?)?\*\//,
];
const htmlRegexes = [
    /<!--\s*eslint-disable(?:-next-line)?(?: [\s\S]*?)?--> *(?:\n *)?/,
    /\n? *<!--\s*eslint-(?:disable-line|enable)(?: [\s\S]*?)?-->/,
];
const joinRegexes = (regexes) => new RegExp(regexes.map((regex) => `(?:${regex.source})`).join('|'), 'g');
const htmlRegex = joinRegexes(htmlRegexes);
// Note: the js regex needs to also include the html ones to account for inline templates in @Components
const jsRegex = joinRegexes([...jsRegexes, ...htmlRegexes]);
const regexesForFileTypes = {
    js: jsRegex,
    ts: jsRegex,
    html: htmlRegex,
};
