"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsCodeExtension = void 0;
const index_1 = require("./format/index");
const eslint_1 = require("./sanitizers/eslint");
const utils_1 = require("../../utils");
// Capture group 1: all attributes on the opening tag
// Capture group 2: all content between the open and close tags
const singleFileCodeRule = /^\s*<docs-code((?:\s+[\w-]+(?:="[^"]*"|='[^']*'|=[^\s>]*)?)*)\s*(?:\/>|>(.*?)<\/docs-code>)/s;
const pathRule = /path="([^"]*)"/;
const headerRule = /header="([^"]*)"/;
const linenumsRule = /linenums/;
const highlightRule = /highlight="([^"]*)"/;
const diffRule = /diff="([^"]*)"/;
const languageRule = /language="([^"]*)"/;
const visibleLinesRule = /visibleLines="([^"]*)"/;
const visibleRegionRule = /visibleRegion="([^"]*)"/;
const previewRule = /preview/;
exports.docsCodeExtension = {
    name: 'docs-code',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^<docs-code\s/)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        var _a, _b, _c;
        const match = singleFileCodeRule.exec(src);
        if (match) {
            const attr = match[1].trim();
            const path = pathRule.exec(attr);
            const header = headerRule.exec(attr);
            const linenums = linenumsRule.exec(attr);
            const highlight = highlightRule.exec(attr);
            const diff = diffRule.exec(attr);
            const language = languageRule.exec(attr);
            const visibleLines = visibleLinesRule.exec(attr);
            const visibleRegion = visibleRegionRule.exec(attr);
            const preview = previewRule.exec(attr) ? true : false;
            let code = (_b = (_a = match[2]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
            if (path && path[1]) {
                code = (0, utils_1.loadWorkspaceRelativeFile)(path[1]);
                // Remove ESLint Comments
                const fileType = (_c = path[1]) === null || _c === void 0 ? void 0 : _c.split('.').pop();
                code = (0, eslint_1.removeEslintComments)(code, fileType);
            }
            const token = {
                type: 'docs-code',
                raw: match[0],
                code: code,
                path: path === null || path === void 0 ? void 0 : path[1],
                header: header === null || header === void 0 ? void 0 : header[1],
                linenums: !!linenums,
                highlight: highlight === null || highlight === void 0 ? void 0 : highlight[1],
                diff: diff === null || diff === void 0 ? void 0 : diff[1],
                language: language === null || language === void 0 ? void 0 : language[1],
                visibleLines: visibleLines === null || visibleLines === void 0 ? void 0 : visibleLines[1],
                visibleRegion: visibleRegion === null || visibleRegion === void 0 ? void 0 : visibleRegion[1],
                preview: preview,
            };
            return token;
        }
        return undefined;
    },
    renderer(token) {
        return (0, index_1.formatCode)(token);
    },
};
