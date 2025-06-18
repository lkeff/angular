"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsCodeBlockExtension = void 0;
const index_1 = require("./format/index");
// TODO: use regex for code implemented in the marked package: https://github.com/markedjs/marked/blob/4e6acc8b8517eafe0036a914f58b6f53d4b12ca6/src/rules.ts#L72C1-L73C1
/**
 * Regex for discovering code blocks, notably this is more limited than
 * standard discovery of this as it only allows for exactly 3 ticks rather
 * than three or more.
 */
const tripleTickCodeRule = /^\s*`{3}(\S+)[\r\n]+(.*?)[\r\n]+`{3}/s;
exports.docsCodeBlockExtension = {
    name: 'docs-code-block',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^(```)\s/)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = tripleTickCodeRule.exec(src);
        if (match) {
            const token = {
                raw: match[0],
                type: 'docs-code-block',
                code: match[2],
                language: match[1],
            };
            return token;
        }
        return undefined;
    },
    renderer(token) {
        if (token.language === 'mermaid') {
            return token.code;
        }
        return (0, index_1.formatCode)(token);
    },
};
