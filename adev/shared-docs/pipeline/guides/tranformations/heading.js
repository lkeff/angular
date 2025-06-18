"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.headingRender = headingRender;
exports.formatHeading = formatHeading;
const state_1 = require("../state");
const utils_1 = require("../utils");
function headingRender({ depth, tokens }) {
    const text = this === null || this === void 0 ? void 0 : this.parser.parseInline(tokens);
    return formatHeading({ text, depth });
}
function formatHeading({ text, depth }) {
    var _a;
    if (depth === 1) {
        return `
    <header class="docs-header">
      <docs-breadcrumb></docs-breadcrumb>

      ${(0, utils_1.getPageTitle)(text)}
    </header>
    `;
    }
    // Nested anchor elements are invalid in HTML
    // They might happen when we have a code block in a heading
    // regex aren't perfect for that but this one should be "good enough"
    const regex = /<a\s+(?:[^>]*?\s+)?href.*?>(.*?)<\/a>/gi;
    const anchorLessText = text.replace(regex, '$1');
    // extract the extended markdown heading id
    // ex:  ## MyHeading {# myId}
    const customIdRegex = /{#\s*([\w-]+)\s*}/g;
    const customId = (_a = customIdRegex.exec(anchorLessText)) === null || _a === void 0 ? void 0 : _a[1];
    const link = customId !== null && customId !== void 0 ? customId : (0, state_1.getHeaderId)(anchorLessText);
    const label = anchorLessText.replace(/`(.*?)`/g, '<code>$1</code>').replace(customIdRegex, '');
    return `
  <h${depth} id="${link}">
    <a href="#${link}" class="docs-anchor" tabindex="-1" aria-label="Link to ${label}">${label}</a>
  </h${depth}>
  `;
}
