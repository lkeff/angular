"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsCardExtension = void 0;
const helpers_1 = require("../../helpers");
const utils_1 = require("../../utils");
// Capture group 1: all attributes on the opening tag
// Capture group 2: all content between the open and close tags
const cardRule = /^[^<]*<docs-card\s([^>]*)>((?:.(?!\/docs-card))*)<\/docs-card>/s;
const titleRule = /title="([^"]*)"/;
const linkRule = /link="([^"]*)"/;
const hrefRule = /href="([^"]*)"/;
const imgSrcRule = /imgSrc="([^"]*)"/;
exports.docsCardExtension = {
    name: 'docs-card',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^\s*<docs-card\s*/m)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = cardRule.exec(src);
        if (match) {
            const attr = match[1].trim();
            const title = titleRule.exec(attr);
            const link = linkRule.exec(attr);
            const href = hrefRule.exec(attr);
            const imgSrc = imgSrcRule.exec(attr);
            const body = match[2].trim();
            const token = {
                type: 'docs-card',
                raw: match[0],
                title: title ? title[1] : '',
                body: body !== null && body !== void 0 ? body : '',
                href: href ? href[1] : undefined,
                link: link ? link[1] : undefined,
                imgSrc: imgSrc ? imgSrc[1] : undefined,
                tokens: [],
            };
            this.lexer.blockTokens(token.body, token.tokens);
            return token;
        }
        return undefined;
    },
    renderer(token) {
        return token.imgSrc ? getCardWithSvgIllustration(this, token) : getStandardCard(this, token);
    },
};
function getStandardCard(renderer, token) {
    if (token.href) {
        return `
    <a href="${token.href}" ${(0, helpers_1.anchorTarget)(token.href)} class="docs-card">
      <div>
        <h3>${token.title}</h3>
        ${renderer.parser.parse(token.tokens)}
      </div>
      <span>${token.link ? token.link : 'Learn more'}</span>
    </a>
    `;
    }
    return `
  <div class="docs-card">
    <div>
      <h3>${token.title}</h3>
      ${renderer.parser.parse(token.tokens)}
    </div>
    ${token.link ? `<span>${token.link}</span>` : ''}
  </div>
  `;
}
function getCardWithSvgIllustration(renderer, token) {
    // We can assume that all illustrations are svg files
    // We need to read svg content, instead of renering svg with `img`,
    // cause we would like to use CSS variables to support dark and light mode.
    const illustration = (0, utils_1.loadWorkspaceRelativeFile)(token.imgSrc);
    if (token.href) {
        return `
      <a href="${token.href}" ${(0, helpers_1.anchorTarget)(token.href)} class="docs-card docs-card-with-svg">
        ${illustration}
        <div class="docs-card-text-content">
          <div>
            <h3>${token.title}</h3>
            ${renderer.parser.parse(token.tokens)}
          </div>
          <span>${token.link ? token.link : 'Learn more'}</span>
        </div>
      </a>
      `;
    }
    return `
    <div class="docs-card docs-card-with-svg">
      ${illustration}
      <div class="docs-card-text-content">
      <h3>${token.title}</h3>
      ${renderer.parser.parse(token.tokens)}
      </div>
    </div>
    `;
}
