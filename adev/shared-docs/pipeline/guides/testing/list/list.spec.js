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
describe('markdown to html', () => {
    let markdownDocument;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const markdownContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('list/list.md'), {
            encoding: 'utf-8',
        });
        markdownDocument = jsdom_1.JSDOM.fragment(yield (0, parse_1.parseMarkdown)(markdownContent, {}));
    }));
    it('should wrap lists in custom classes', () => {
        const orderedList = markdownDocument.querySelector('ol');
        expect(orderedList === null || orderedList === void 0 ? void 0 : orderedList.className).toBe('docs-ordered-list');
        expect(orderedList === null || orderedList === void 0 ? void 0 : orderedList.childElementCount).toBe(3);
        expect(orderedList === null || orderedList === void 0 ? void 0 : orderedList.textContent).toContain('First Item');
        const unorderedList = markdownDocument.querySelector('ul');
        expect(unorderedList === null || unorderedList === void 0 ? void 0 : unorderedList.className).toBe('docs-list');
        expect(unorderedList === null || unorderedList === void 0 ? void 0 : unorderedList.childElementCount).toBe(6);
        expect(unorderedList === null || unorderedList === void 0 ? void 0 : unorderedList.textContent).toContain('matter');
    });
    it('should render list items', () => {
        const unorderedList = markdownDocument.querySelector('ul');
        const linkItem = unorderedList.children[4];
        expect(linkItem.outerHTML).toContain('href="https://angular.dev"');
        const codeItem = unorderedList.children[5];
        expect(codeItem.outerHTML).toContain('<code>SomeClass</code>');
    });
});
