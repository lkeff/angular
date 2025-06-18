"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsCardContainerExtension = void 0;
const cardContainerRule = /^<docs-card-container>(.*?)<\/docs-card-container>/s;
exports.docsCardContainerExtension = {
    name: 'docs-card-container',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^\s*<docs-card-container/m)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = cardContainerRule.exec(src);
        if (match) {
            const body = match[1];
            const token = {
                type: 'docs-card-container',
                raw: match[0],
                cards: body !== null && body !== void 0 ? body : '',
                tokens: [],
            };
            this.lexer.blockTokens(token.cards, token.tokens);
            return token;
        }
        return undefined;
    },
    renderer(token) {
        return `
    <div class="docs-card-grid">
      ${this.parser.parse(token.tokens)}
    </div>
    `;
    },
};
