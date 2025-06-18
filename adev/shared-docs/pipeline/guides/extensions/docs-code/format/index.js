"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCode = formatCode;
const diff_1 = require("./diff");
const highlight_1 = require("./highlight");
const region_1 = require("./region");
const jsdom_1 = require("jsdom");
const range_1 = require("./range");
function formatCode(token) {
    if (token.visibleLines !== undefined && token.visibleRegion !== undefined) {
        throw Error('Cannot define visible lines and visible region at the same time');
    }
    (0, region_1.extractRegions)(token);
    (0, diff_1.calculateDiff)(token);
    (0, highlight_1.highlightCode)(token);
    const containerEl = jsdom_1.JSDOM.fragment(`
  <div class="docs-code">
    ${buildHeaderElement(token)}
    <pre class="docs-mini-scroll-track">
      ${token.code}
    </pre>
  </div>
  `).firstElementChild;
    applyContainerAttributesAndClasses(containerEl, token);
    return containerEl.outerHTML;
}
/** Build the header element if a header is provided in the token. */
function buildHeaderElement(token) {
    return token.header ? `<div class="docs-code-header"><h3>${token.header}</h3></div>` : '';
}
function applyContainerAttributesAndClasses(el, token) {
    // Attributes
    // String value attributes
    if (token.diff) {
        el.setAttribute('path', token.diff);
    }
    if (token.path) {
        el.setAttribute('path', token.path);
    }
    if (token.visibleLines) {
        el.setAttribute('visibleLines', (0, range_1.expandRangeStringValues)(token.visibleLines).toString());
    }
    if (token.header) {
        el.setAttribute('header', token.header);
    }
    // Boolean value attributes
    if (token.preview) {
        el.setAttribute('preview', 'true');
    }
    if (token.language === 'mermaid') {
        el.setAttribute('mermaid', 'true');
    }
    // Classes
    if (token.language === 'shell') {
        el.classList.add('shell');
    }
}
