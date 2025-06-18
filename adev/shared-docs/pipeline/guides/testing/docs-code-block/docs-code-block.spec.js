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
const parse_1 = require("../../../guides/parse");
const runfiles_1 = require("@bazel/runfiles");
const promises_1 = require("fs/promises");
const jsdom_1 = require("jsdom");
const highlight_1 = require("../../extensions/docs-code/format/highlight");
describe('markdown to html', () => {
    let markdownDocument;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, highlight_1.initHighlighter)();
        const markdownContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('docs-code-block/docs-code-block.md'), { encoding: 'utf-8' });
        markdownDocument = jsdom_1.JSDOM.fragment(yield (0, parse_1.parseMarkdown)(markdownContent, {}));
    }));
    it('converts triple ticks into a code block', () => {
        var _a;
        const codeBlock = markdownDocument.querySelector('code');
        expect(codeBlock).toBeTruthy();
        expect((_a = codeBlock === null || codeBlock === void 0 ? void 0 : codeBlock.textContent) === null || _a === void 0 ? void 0 : _a.trim()).toBe('this is a code block');
    });
});
