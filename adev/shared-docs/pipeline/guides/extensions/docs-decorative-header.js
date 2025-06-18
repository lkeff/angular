"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsDecorativeHeaderExtension = void 0;
const utils_1 = require("../utils");
// Capture group 1: all attributes on the opening tag
// Capture group 2: all content between the open and close tags
const decorativeHeaderRule = /^[^<]*<docs-decorative-header\s([^>]*)>((?:.(?!\/docs-decorative-header))*)<\/docs-decorative-header>/s;
const imgSrcRule = /imgSrc="([^"]*)"/;
const titleRule = /title="([^"]*)"/;
exports.docsDecorativeHeaderExtension = {
    name: 'docs-decorative-header',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^\s*<docs-decorative-header\s*/m)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = decorativeHeaderRule.exec(src);
        if (match) {
            const attr = match[1].trim();
            const body = match[2].trim();
            const imgSrc = imgSrcRule.exec(attr);
            const title = titleRule.exec(attr);
            const token = {
                type: 'docs-decorative-header',
                raw: match[0],
                title: title ? title[1] : '',
                imgSrc: imgSrc ? imgSrc[1] : '',
                body: body !== null && body !== void 0 ? body : '',
            };
            return token;
        }
        return undefined;
    },
    renderer(token) {
        // We can assume that all illustrations are svg files
        // We need to read svg content, instead of renering svg with `img`,
        // cause we would like to use CSS variables to support dark and light mode.
        const illustration = token.imgSrc ? (0, utils_1.loadWorkspaceRelativeFile)(token.imgSrc) : '';
        return `
    <div class="docs-decorative-header-container">
      <div class="docs-decorative-header">
        <div class="docs-header-content">
          <docs-breadcrumb></docs-breadcrumb>

          ${(0, utils_1.getPageTitle)(token.title)}

          <p>${token.body}</p>
        </div>

        <!-- illustration -->
        ${illustration}
      </div>
    </div>
    `;
    },
};
