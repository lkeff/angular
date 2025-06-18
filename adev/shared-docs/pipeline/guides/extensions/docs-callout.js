"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsCalloutExtension = exports.CalloutSeverityLevel = void 0;
/** Enum of all available callout severities. */
var CalloutSeverityLevel;
(function (CalloutSeverityLevel) {
    CalloutSeverityLevel["HELPFUL"] = "HELPFUL";
    CalloutSeverityLevel["IMPORTANT"] = "IMPORTANT";
    CalloutSeverityLevel["CRITICAL"] = "CRITICAL";
})(CalloutSeverityLevel || (exports.CalloutSeverityLevel = CalloutSeverityLevel = {}));
// Capture group 1: all attributes on the opening tag
// Capture group 2: all content between the open and close tags
const calloutRule = /^<docs-callout([^>]*)>((?:.(?!\/docs-callout))*)<\/docs-callout>/s;
const titleRule = /title="([^"]*)"/;
const isImportantRule = /important/;
const isCriticalRule = /critical/;
exports.docsCalloutExtension = {
    name: 'docs-callout',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^\s*<docs-callout/m)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = calloutRule.exec(src);
        if (match) {
            const attr = match[1].trim();
            const title = titleRule.exec(attr);
            let severityLevel = CalloutSeverityLevel.HELPFUL;
            if (isImportantRule.exec(attr))
                severityLevel = CalloutSeverityLevel.IMPORTANT;
            if (isCriticalRule.exec(attr))
                severityLevel = CalloutSeverityLevel.CRITICAL;
            const body = match[2].trim();
            const token = {
                type: 'docs-callout',
                raw: match[0],
                severityLevel: severityLevel,
                title: title ? title[1] : '',
                titleTokens: [],
                body: body !== null && body !== void 0 ? body : '',
                bodyTokens: [],
            };
            this.lexer.inlineTokens(token.title, token.titleTokens);
            this.lexer.blockTokens(token.body, token.bodyTokens);
            return token;
        }
        return undefined;
    },
    renderer(token) {
        return `
    <div class="docs-callout docs-callout-${token.severityLevel.toLowerCase()}">
      <h3>${this.parser.parseInline(token.titleTokens)}</h3>
      ${this.parser.parse(token.bodyTokens)}
    </div>
    `;
    },
};
