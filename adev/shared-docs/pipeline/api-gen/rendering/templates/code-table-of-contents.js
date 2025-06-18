"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeTableOfContents = CodeTableOfContents;
const preact_render_to_string_1 = require("preact-render-to-string");
const code_line_group_1 = require("./code-line-group");
function CodeTableOfContents(props) {
    const html = `${props.entry.beforeCodeGroups}
  <code>
    ${Array.from(props.entry.codeLinesGroups)
        .map(([_, group]) => (0, preact_render_to_string_1.renderToString)(<code_line_group_1.CodeLineGroup lines={group}/>))
        .join('')}
  </code>
  ${props.entry.afterCodeGroups}`;
    return (<div class="docs-code">
      <pre class="docs-mini-scroll-track" dangerouslySetInnerHTML={{ __html: html }}></pre>
    </div>);
}
