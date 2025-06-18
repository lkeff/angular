"use strict";
/*!
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
exports.parseMarkdown = parseMarkdown;
const marked_1 = require("marked");
const hooks_1 = require("./hooks");
const renderer_1 = require("./renderer");
const docs_alert_1 = require("./extensions/docs-alert");
const docs_callout_1 = require("./extensions/docs-callout");
const docs_pill_1 = require("./extensions/docs-pill/docs-pill");
const docs_pill_row_1 = require("./extensions/docs-pill/docs-pill-row");
const docs_video_1 = require("./extensions/docs-video");
const docs_workflow_1 = require("./extensions/docs-workflow/docs-workflow");
const docs_step_1 = require("./extensions/docs-workflow/docs-step");
const docs_card_1 = require("./extensions/docs-card/docs-card");
const docs_card_container_1 = require("./extensions/docs-card/docs-card-container");
const docs_decorative_header_1 = require("./extensions/docs-decorative-header");
const docs_code_block_1 = require("./extensions/docs-code/docs-code-block");
const docs_code_1 = require("./extensions/docs-code/docs-code");
const docs_code_multifile_1 = require("./extensions/docs-code/docs-code-multifile");
const utils_1 = require("./utils");
const walk_tokens_1 = require("./walk-tokens");
function parseMarkdown(markdownContent, context) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, utils_1.setContext)(context);
        marked_1.marked.use({
            hooks: hooks_1.hooks,
            extensions: [
                docs_alert_1.docsAlertExtension,
                docs_callout_1.docsCalloutExtension,
                docs_pill_1.docsPillExtension,
                docs_pill_row_1.docsPillRowExtension,
                docs_video_1.docsVideoExtension,
                docs_workflow_1.docsWorkflowExtension,
                docs_step_1.docsStepExtension,
                docs_card_1.docsCardExtension,
                docs_card_container_1.docsCardContainerExtension,
                docs_decorative_header_1.docsDecorativeHeaderExtension,
                docs_code_block_1.docsCodeBlockExtension,
                docs_code_1.docsCodeExtension,
                docs_code_multifile_1.docsCodeMultifileExtension,
            ],
            walkTokens: walk_tokens_1.walkTokens,
            // The async option causes marked to await walkTokens functions before parsing the tokens and returning an HTML string.
            // We leverage this to allow us to use async libraries like mermaid and building stackblitz examples.
            async: true,
        });
        return marked_1.marked.parse(markdownContent, { renderer: new renderer_1.Renderer() });
    });
}
