"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderer = void 0;
const marked_1 = require("marked");
const shiki_1 = require("../shiki/shiki");
const css_classes_1 = require("../styling/css-classes");
/**
 * Custom renderer for marked that will be used to transform markdown files to HTML
 * files that can be used in the Angular docs.
 */
exports.renderer = {
    code({ lang, text }) {
        const highlightResult = (0, shiki_1.codeToHtml)(text, lang)
            // remove spaces/line-breaks between elements to not mess-up `pre` style
            .replace(/>\s+</g, '><');
        return `
      <div class="docs-code" role="group">
        <pre class="docs-mini-scroll-track">
          ${highlightResult}
        </pre>
      </div>
    `;
    },
    image({ href, title, text }) {
        return `
    <img src="${href}" alt="${text}" title="${title}" class="docs-image">
    `;
    },
    link({ href, tokens }) {
        return `<a href="${href}">${this.parser.parseInline(tokens)}</a>`;
    },
    list({ items, ordered, start }) {
        if (ordered) {
            return `
      <ol class="docs-ordered-list">
        ${items.map((item) => this.listitem(item)).join('')}
      </ol>
      `;
        }
        return `
    <ul class="docs-list">
      ${items.map((item) => this.listitem(item)).join('')}
    </ul>
    `;
    },
    table({ header, rows }) {
        return `
      <div class="docs-table docs-scroll-track-transparent">
        <table>
          <thead>
          ${this.tablerow({ text: header.map((cell) => this.tablecell(cell)).join('') })}
          </thead>
          <tbody>
          ${rows
            .map((row) => this.tablerow({ text: row.map((cell) => this.tablecell(cell)).join('') }))
            .join('')}
          </tbody>
        </table>
      </div>
    `;
    },
    heading({ text, depth, tokens }) {
        const id = text
            .toLowerCase()
            .replaceAll(' ', '-')
            .replace(/[^a-z0-9-]/g, '');
        // Since we have a code transformer `addApiLinksToHtml` which adds anchors
        // to code blocks of known symbols, we add an additional `data-skip-anchor`
        // attribute that prevents the transformation. This is needed since nested
        // anchor tags are illegal and break the HTML.
        const textRenderer = new marked_1.Renderer();
        textRenderer.codespan = ({ text }) => `<code data-skip-anchor>${text}</code>`;
        const parsedText = this.parser.parseInline(tokens, textRenderer);
        // The template matches templates/section-heading.tsx
        return `
      <h${depth} id="${id}" class="${css_classes_1.SECTION_HEADING} ${css_classes_1.SECTION_SUB_HEADING}">
        <a href="#${id}" aria-label="Link to ${text} section" tabIndex="-1">
          ${parsedText}
        </a>
      </h${depth}>
    `;
    },
};
