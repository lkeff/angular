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
        const markdownContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('docs-code/docs-code.md'), { encoding: 'utf-8' });
        markdownDocument = jsdom_1.JSDOM.fragment(yield (0, parse_1.parseMarkdown)(markdownContent, {}));
    }));
    it('converts docs-code elements into a code block', () => {
        var _a;
        const codeBlock = markdownDocument.querySelectorAll('code')[0];
        expect(codeBlock).toBeTruthy();
        expect((_a = codeBlock === null || codeBlock === void 0 ? void 0 : codeBlock.textContent) === null || _a === void 0 ? void 0 : _a.trim()).toBe('this is code');
    });
    it('removes eslint comments from the code', () => {
        var _a;
        const codeBlock = markdownDocument.querySelectorAll('code')[1];
        expect(codeBlock).toBeTruthy();
        expect((_a = codeBlock === null || codeBlock === void 0 ? void 0 : codeBlock.textContent) === null || _a === void 0 ? void 0 : _a.trim()).not.toContain('// eslint');
    });
    it('extract regions from the code', () => {
        var _a, _b;
        // This unit test is sensible to additional node, like text nodes between the lines.
        // The specific index here makes sure there is no space/linebreak between the code lines
        const codeBlock = markdownDocument.querySelectorAll('code')[2];
        expect(codeBlock).toBeTruthy();
        expect((_a = codeBlock === null || codeBlock === void 0 ? void 0 : codeBlock.textContent) === null || _a === void 0 ? void 0 : _a.trim()).toContain(`const x = 'within the region';`);
        expect((_b = codeBlock === null || codeBlock === void 0 ? void 0 : codeBlock.textContent) === null || _b === void 0 ? void 0 : _b.trim()).not.toContain('docregion');
    });
    it('properly shows the diff of two provided file paths', () => {
        const codeBlock = markdownDocument.querySelectorAll('code')[3];
        expect(codeBlock).toBeTruthy();
        const codeLines = codeBlock.querySelectorAll('.line');
        expect(codeLines[8].textContent).toContain('oldFuncName');
        expect(codeLines[8].classList.contains('remove')).toBeTrue();
        expect(codeLines[9].textContent).toContain('newName');
        expect(codeLines[9].classList.contains('add')).toBeTrue();
        expect(codeLines[10].classList.contains('add')).toBeFalse();
        expect(codeLines[10].classList.contains('remove')).toBeFalse();
    });
    it('should load header and html code', () => {
        const codeBlock = markdownDocument.querySelectorAll('code')[4];
        expect(codeBlock).toBeTruthy();
    });
});
