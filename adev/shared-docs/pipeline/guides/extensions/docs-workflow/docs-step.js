"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsStepExtension = void 0;
const heading_1 = require("../../tranformations/heading");
// Capture group 1: all attributes on the opening tag
// Capture group 2: all content between the open and close tags
const stepRule = /^\s*<docs-step([^>]*)>((?:.(?!\/docs-step))*)<\/docs-step>/s;
const titleRule = /title="([^"]*)"/;
exports.docsStepExtension = {
    name: 'docs-step',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^\s*<docs-step/m)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = stepRule.exec(src);
        if (match) {
            const attr = match[1].trim();
            const title = titleRule.exec(attr);
            const body = match[2].trim();
            const token = {
                type: 'docs-step',
                raw: match[0],
                title: title ? title[1] : '',
                body: body,
                tokens: [],
            };
            this.lexer.blockTokens(token.body, token.tokens);
            return token;
        }
        return undefined;
    },
    renderer(token) {
        return `
    <li>
      <span class="docs-step-number" aria-hidden="true"></span>
      ${(0, heading_1.formatHeading)({ text: token.title, depth: 3 })}
      ${this.parser.parse(token.tokens)}
    </li>
    `;
    },
};
