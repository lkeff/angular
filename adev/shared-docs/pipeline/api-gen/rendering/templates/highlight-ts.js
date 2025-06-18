"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightTypeScript = HighlightTypeScript;
const raw_html_1 = require("./raw-html");
const shiki_1 = require("../shiki/shiki");
/** Component to render a header of the CLI page. */
function HighlightTypeScript(props) {
    const result = (0, shiki_1.codeToHtml)(props.code, 'typescript');
    const withScrollTrack = result.replace(/^(<pre class="shiki)/, '$1 docs-mini-scroll-track');
    return <raw_html_1.RawHtml value={withScrollTrack} className="docs-code"/>;
}
