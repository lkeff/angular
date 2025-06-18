"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsPillRowExtension = void 0;
// Capture group 1: all content between the open and close tags
const pillRowRule = /^\s*<docs-pill-row>((?:.(?!docs-pill-row))*)<\/docs-pill-row>/s;
exports.docsPillRowExtension = {
    name: 'docs-pill-row',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^\s*<docs-pill-row/m)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = pillRowRule.exec(src);
        if (match) {
            const body = match[1];
            const token = {
                type: 'docs-pill-row',
                raw: match[0],
                pills: body !== null && body !== void 0 ? body : '',
                tokens: [],
            };
            this.lexer.inlineTokens(token.pills, token.tokens);
            return token;
        }
        return undefined;
    },
    renderer(token) {
        return `
    <nav class="docs-pill-row">
      ${this.parser.parseInline(token.tokens)}
    </nav>
    `;
    },
};
