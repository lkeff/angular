"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsCodeMultifileExtension = void 0;
const jsdom_1 = require("jsdom");
// Capture group 1: all attributes on the opening tag
// Capture group 2: all content between the open and close tags
const multiFileCodeRule = /^\s*<docs-code-multifile(.*?)>(.*?)<\/docs-code-multifile>/s;
const pathRule = /path="([^"]*)"/;
const previewRule = /preview/;
exports.docsCodeMultifileExtension = {
    name: 'docs-code-multifile',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^\s*<docs-code-multifile/)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = multiFileCodeRule.exec(src);
        if (match) {
            const attr = match[1].trim();
            const path = pathRule.exec(attr);
            const preview = previewRule.exec(attr) ? true : false;
            const token = {
                type: 'docs-code-multifile',
                raw: match[0],
                path: path === null || path === void 0 ? void 0 : path[1],
                panes: match[2].trim(),
                paneTokens: [],
                preview: preview,
            };
            this.lexer.blockTokens(token.panes, token.paneTokens);
            return token;
        }
        return undefined;
    },
    renderer(token) {
        const el = jsdom_1.JSDOM.fragment(`
    <div class="docs-code-multifile">
    ${this.parser.parse(token.paneTokens)}
    </div>
    `).firstElementChild;
        if (token.path) {
            el.setAttribute('path', token.path);
        }
        if (token.preview) {
            el.setAttribute('preview', `${token.preview}`);
        }
        return el.outerHTML;
    },
};
