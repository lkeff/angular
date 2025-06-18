"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsWorkflowExtension = void 0;
// Capture group 1: all content between the open and close tags
const workflowRule = /^<docs-workflow>(.*?)<\/docs-workflow>/s;
exports.docsWorkflowExtension = {
    name: 'docs-workflow',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^\s*<docs-workflow/m)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = workflowRule.exec(src);
        if (match) {
            const steps = match[1];
            const token = {
                type: 'docs-workflow',
                raw: match[0],
                steps: steps !== null && steps !== void 0 ? steps : '',
                tokens: [],
            };
            this.lexer.blockTokens(token.steps, token.tokens);
            return token;
        }
        return undefined;
    },
    renderer(token) {
        return `
    <ol class="docs-steps">
      ${this.parser.parse(token.tokens)}
    </ol>
    `;
    },
};
