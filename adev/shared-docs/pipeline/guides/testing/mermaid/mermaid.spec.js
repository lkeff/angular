"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const marked_1 = require("marked");
const docs_code_block_1 = require("../../extensions/docs-code/docs-code-block");
const walk_tokens_1 = require("../../walk-tokens");
describe('markdown to html', () => {
    let markdownDocument;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // This test was flaky, 1st attemp to fix it is by inlining the markdown content
        const markdownContent = `
\`\`\`mermaid
    graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
\`\`\`

\`\`\`mermaid
  pie title Pets adopted by volunteers
      "Dogs" : 386
      "Cats" : 85
      "Rats" : 15
\`\`\`
    `;
        const markedInstance = marked_1.marked.use({
            async: true,
            extensions: [docs_code_block_1.docsCodeBlockExtension],
            walkTokens: walk_tokens_1.walkTokens,
        });
        markdownDocument = jsdom_1.JSDOM.fragment(yield markedInstance.parse(markdownContent));
    }), 15000);
    it('should create an svg for each mermaid code block', () => {
        expect(markdownDocument.querySelectorAll('svg')).toHaveSize(2);
    });
});
