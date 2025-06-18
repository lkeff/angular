"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const parse_util_1 = require("../../../src/parse_util");
const r3_ast_1 = require("../../../src/render3/r3_ast");
const template_1 = require("../../../src/render3/view/template");
describe('collectCommentNodes', () => {
    it('should include an array of HTML comment nodes on the returned R3 AST', () => {
        const html = `
      <!-- eslint-disable-next-line -->
      <div *ngFor="let item of items">
        {{item.name}}
      </div>

      <div>
        <p>
          <!-- some nested comment -->
          <span>Text</span>
        </p>
      </div>
    `;
        const templateNoCommentsOption = (0, template_1.parseTemplate)(html, '', {});
        expect(templateNoCommentsOption.commentNodes).toBeUndefined();
        const templateCommentsOptionDisabled = (0, template_1.parseTemplate)(html, '', { collectCommentNodes: false });
        expect(templateCommentsOptionDisabled.commentNodes).toBeUndefined();
        const templateCommentsOptionEnabled = (0, template_1.parseTemplate)(html, '', { collectCommentNodes: true });
        expect(templateCommentsOptionEnabled.commentNodes.length).toEqual(2);
        expect(templateCommentsOptionEnabled.commentNodes[0]).toBeInstanceOf(r3_ast_1.Comment);
        expect(templateCommentsOptionEnabled.commentNodes[0].value).toEqual('eslint-disable-next-line');
        expect(templateCommentsOptionEnabled.commentNodes[0].sourceSpan).toBeInstanceOf(parse_util_1.ParseSourceSpan);
        expect(templateCommentsOptionEnabled.commentNodes[0].sourceSpan.toString()).toEqual('<!-- eslint-disable-next-line -->');
        expect(templateCommentsOptionEnabled.commentNodes[1]).toBeInstanceOf(r3_ast_1.Comment);
        expect(templateCommentsOptionEnabled.commentNodes[1].value).toEqual('some nested comment');
        expect(templateCommentsOptionEnabled.commentNodes[1].sourceSpan).toBeInstanceOf(parse_util_1.ParseSourceSpan);
        expect(templateCommentsOptionEnabled.commentNodes[1].sourceSpan.toString()).toEqual('<!-- some nested comment -->');
    });
});
