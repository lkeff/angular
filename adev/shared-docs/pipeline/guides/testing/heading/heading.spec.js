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
        const markdownContent = yield (0, promises_1.readFile)(runfiles_1.runfiles.resolvePackageRelative('heading/heading.md'), {
            encoding: 'utf-8',
        });
        markdownDocument = jsdom_1.JSDOM.fragment(yield (0, parse_1.parseMarkdown)(markdownContent, {}));
    }));
    it('should treat # as document headers', () => {
        const header = markdownDocument.querySelector('header');
        expect(header === null || header === void 0 ? void 0 : header.classList.contains('docs-header')).toBeTrue();
    });
    it('should create a self referential link for non document headers', () => {
        const h2 = markdownDocument.querySelector('h2');
        const h2Anchor = h2 === null || h2 === void 0 ? void 0 : h2.firstElementChild;
        const h2HeaderId = h2 === null || h2 === void 0 ? void 0 : h2.getAttribute('id');
        const h2AnchorHref = h2Anchor === null || h2Anchor === void 0 ? void 0 : h2Anchor.getAttribute('href');
        expect(h2HeaderId).toContain('headers-h2');
        expect(h2AnchorHref).toBe(`#${h2HeaderId}`);
    });
    it('should make the docs anchors unreachable by tab', () => {
        const docsAnchors = markdownDocument.querySelectorAll('.docs-anchor');
        for (const anchor of docsAnchors) {
            expect(anchor.getAttribute('tabindex')).toBe('-1');
        }
    });
    it('increments when multiple duplicate header names are found', () => {
        const headers = markdownDocument.querySelectorAll('a.docs-anchor');
        const knownRefs = new Set();
        for (const el of headers) {
            const href = el.getAttribute('href');
            expect(knownRefs.has(href)).toBeFalse();
            knownRefs.add(href);
        }
    });
    it('should remove code block markups', () => {
        const h2List = markdownDocument.querySelectorAll('h2');
        const h2 = h2List[3];
        const h2Anchor = h2 === null || h2 === void 0 ? void 0 : h2.firstElementChild;
        const h2HeaderId = h2 === null || h2 === void 0 ? void 0 : h2.getAttribute('id');
        const h2AnchorHref = h2Anchor === null || h2Anchor === void 0 ? void 0 : h2Anchor.getAttribute('href');
        expect(h2HeaderId).toContain('myclassmymethod-is-the-best');
        expect(h2AnchorHref).toBe(`#${h2HeaderId}`);
    });
    it('should be able to extract non-ascii ids', () => {
        const h2List = markdownDocument.querySelectorAll('h2');
        const h2 = h2List[4];
        const h2Anchor = h2 === null || h2 === void 0 ? void 0 : h2.firstElementChild;
        const h2HeaderId = h2 === null || h2 === void 0 ? void 0 : h2.getAttribute('id');
        const h2AnchorHref = h2Anchor === null || h2Anchor === void 0 ? void 0 : h2Anchor.getAttribute('href');
        expect(h2HeaderId).toContain('ステップ-2---アプリケーションのレイアウトに新しいコンポーネントを追加');
        expect(h2AnchorHref).toBe(`#${h2HeaderId}`);
    });
    it('should be able to extract custom ids', () => {
        const h2List = markdownDocument.querySelectorAll('h2');
        const h2 = h2List[5];
        const h2Anchor = h2 === null || h2 === void 0 ? void 0 : h2.firstElementChild;
        const h2HeaderId = h2 === null || h2 === void 0 ? void 0 : h2.getAttribute('id');
        const h2AnchorHref = h2Anchor === null || h2Anchor === void 0 ? void 0 : h2Anchor.getAttribute('href');
        expect(h2HeaderId).toBe('my-custom-id');
        expect(h2AnchorHref).toBe(`#${h2HeaderId}`);
    });
    it('should be able to parse heading with a valid tag in a code block', () => {
        var _a;
        const h2List = markdownDocument.querySelectorAll('h2');
        const h2 = h2List[6];
        // The anchor element should be to only child
        expect(h2.children.length).toBe(1);
        expect((_a = h2.firstElementChild) === null || _a === void 0 ? void 0 : _a.tagName).toBe('A');
        expect(h2.firstElementChild.innerHTML).toBe('Query for the <code>&lt;h1&gt;</code>');
    });
});
